#!/usr/bin/env bash
set -euo pipefail

# ===== Config =====
DOMAIN="thc-egypt.org"
BUCKET="thc-egypt.org"
REGION="us-east-1"
HOSTED_ZONE_ID="Z01691553VW8I2G65I833"
LAMBDA_NAME="thc-stripe-checkout"
LAMBDA_ROLE_NAME="thc-stripe-checkout-role"

# Optional: export STRIPE_SECRET_KEY=sk_test_... before running to enable real Stripe Checkout.
# If unset/invalid, the Lambda falls back to a self-hosted demo checkout page.
STRIPE_SECRET_KEY="${STRIPE_SECRET_KEY:-}"

say() { echo -e "\033[1;32m==>\033[0m $*"; }
fail() { echo -e "\033[1;31mERROR:\033[0m $*" >&2; exit 1; }

# ===== 1. ACM certificate (us-east-1) =====
say "Checking/requesting ACM cert for $DOMAIN"
CERT_ARN=$(aws acm list-certificates --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='$DOMAIN' && Status=='ISSUED'].CertificateArn | [0]" --output text)

if [ -z "$CERT_ARN" ] || [ "$CERT_ARN" = "None" ]; then
  say "Requesting new certificate"
  CERT_ARN=$(aws acm request-certificate --region us-east-1 \
    --domain-name "$DOMAIN" --validation-method DNS \
    --query "CertificateArn" --output text)
  say "Cert ARN: $CERT_ARN"
  sleep 10

  # Retrieve validation CNAME
  V_NAME=""; V_VALUE=""
  for i in $(seq 1 30); do
    READ=$(aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" \
      --query "Certificate.DomainValidationOptions[0].ResourceRecord" --output json)
    V_NAME=$(echo "$READ" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("Name","") if d else "")')
    V_VALUE=$(echo "$READ" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(d.get("Value","") if d else "")')
    if [ -n "$V_NAME" ] && [ -n "$V_VALUE" ]; then break; fi
    sleep 3
  done
  [ -n "$V_NAME" ] || fail "Could not retrieve validation record"

  say "Creating validation CNAME in Route53: $V_NAME -> $V_VALUE"
  cat > /tmp/thc-validate.json <<EOF
{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"$V_NAME","Type":"CNAME","TTL":60,"ResourceRecords":[{"Value":"$V_VALUE"}]}}]}
EOF
  aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --change-batch file:///tmp/thc-validate.json >/dev/null

  say "Waiting for cert to be ISSUED (this can take several minutes)..."
  for i in $(seq 1 60); do
    ST=$(aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" --query "Certificate.Status" --output text)
    echo "  status: $ST"
    [ "$ST" = "ISSUED" ] && break
    sleep 15
  done
  [ "$ST" = "ISSUED" ] || fail "Certificate did not issue in time"
fi
say "Cert ARN: $CERT_ARN"

# ===== 2. S3 bucket =====
say "Creating S3 bucket $BUCKET"
if ! aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  aws s3api create-bucket --bucket "$BUCKET" --region "$REGION"
fi
# Disable the block-public-access (needed so OAC / policy work)
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"
# Set website hosting as well (optional; CloudFront will use S3 REST origin via OAC)
aws s3 website "s3://$BUCKET/" --index-document index.html --error-document index.html || true

# ===== 3. Lambda for Stripe Checkout =====
say "Setting up Lambda $LAMBDA_NAME"
# IAM role
ROLE_ARN=$(aws iam get-role --role-name "$LAMBDA_ROLE_NAME" --query "Role.Arn" --output text 2>/dev/null || true)
if [ -z "$ROLE_ARN" ] || [ "$ROLE_ARN" = "None" ]; then
  cat > /tmp/thc-trust.json <<'EOF'
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}
EOF
  ROLE_ARN=$(aws iam create-role --role-name "$LAMBDA_ROLE_NAME" --assume-role-policy-document file:///tmp/thc-trust.json --query "Role.Arn" --output text)
  aws iam attach-role-policy --role-name "$LAMBDA_ROLE_NAME" --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
  sleep 10
fi
say "Lambda role: $ROLE_ARN"

# Zip Lambda code
rm -f /tmp/thc-lambda.zip
(cd lambda && zip -q -r /tmp/thc-lambda.zip index.mjs)

if aws lambda get-function --function-name "$LAMBDA_NAME" >/dev/null 2>&1; then
  say "Updating Lambda code"
  aws lambda update-function-code --function-name "$LAMBDA_NAME" --zip-file fileb:///tmp/thc-lambda.zip --publish >/dev/null
  aws lambda wait function-updated --function-name "$LAMBDA_NAME"
  aws lambda update-function-configuration --function-name "$LAMBDA_NAME" \
    --environment "Variables={STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY,ALLOWED_ORIGIN=https://$DOMAIN}" >/dev/null
else
  say "Creating Lambda function"
  aws lambda create-function --function-name "$LAMBDA_NAME" \
    --runtime nodejs20.x --handler index.handler --role "$ROLE_ARN" \
    --zip-file fileb:///tmp/thc-lambda.zip --timeout 15 \
    --environment "Variables={STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY,ALLOWED_ORIGIN=https://$DOMAIN}" >/dev/null
fi

# Function URL
FN_URL=$(aws lambda get-function-url-config --function-name "$LAMBDA_NAME" --query "FunctionUrl" --output text 2>/dev/null || true)
if [ -z "$FN_URL" ] || [ "$FN_URL" = "None" ]; then
  FN_URL=$(aws lambda create-function-url-config --function-name "$LAMBDA_NAME" --auth-type NONE \
    --cors "AllowOrigins=*,AllowMethods=POST,AllowHeaders=content-type" --query "FunctionUrl" --output text)
  aws lambda add-permission --function-name "$LAMBDA_NAME" --statement-id "AllowPublicInvoke" \
    --action "lambda:InvokeFunctionUrl" --principal "*" --function-url-auth-type NONE >/dev/null 2>&1 || true
fi
say "Lambda Function URL: $FN_URL"

# ===== 4. Upload site with runtime config.js =====
say "Generating config.js and uploading site"
cat > site/config.js <<EOF
window.THC_CHECKOUT_URL = "$FN_URL";
EOF

aws s3 sync site/ "s3://$BUCKET/" --delete \
  --cache-control "public, max-age=300" \
  --exclude "*.DS_Store"

# ===== 5. CloudFront distribution =====
say "Setting up CloudFront distribution"
DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items != null && contains(Aliases.Items, '$DOMAIN')].Id | [0]" \
  --output text)

OAC_ID=$(aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='thc-oac'].Id | [0]" --output text)
if [ -z "$OAC_ID" ] || [ "$OAC_ID" = "None" ]; then
  OAC_ID=$(aws cloudfront create-origin-access-control --origin-access-control-config '{
    "Name":"thc-oac","Description":"OAC for thc.pom100.com","SigningProtocol":"sigv4","SigningBehavior":"always","OriginAccessControlOriginType":"s3"
  }' --query "OriginAccessControl.Id" --output text)
fi
say "OAC: $OAC_ID"

if [ -z "$DIST_ID" ] || [ "$DIST_ID" = "None" ]; then
  say "Creating new CloudFront distribution"
  cat > /tmp/thc-cf.json <<EOF
{
  "CallerReference": "thc-$(date +%s)",
  "Aliases": {"Quantity": 1, "Items": ["$DOMAIN"]},
  "DefaultRootObject": "index.html",
  "Origins": {"Quantity": 1, "Items": [{
      "Id": "s3-$BUCKET",
      "DomainName": "$BUCKET.s3.$REGION.amazonaws.com",
      "OriginAccessControlId": "$OAC_ID",
      "S3OriginConfig": {"OriginAccessIdentity": ""},
      "CustomHeaders": {"Quantity": 0},
      "ConnectionAttempts": 3,
      "ConnectionTimeout": 10,
      "OriginShield": {"Enabled": false}
  }]},
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-$BUCKET",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {"Quantity": 2, "Items": ["GET","HEAD"], "CachedMethods": {"Quantity": 2, "Items": ["GET","HEAD"]}},
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  },
  "CustomErrorResponses": {"Quantity": 2, "Items": [
    {"ErrorCode": 403, "ResponsePagePath": "/index.html", "ResponseCode": "200", "ErrorCachingMinTTL": 10},
    {"ErrorCode": 404, "ResponsePagePath": "/index.html", "ResponseCode": "200", "ErrorCachingMinTTL": 10}
  ]},
  "Comment": "thc.pom100.com",
  "Enabled": true,
  "ViewerCertificate": {
    "ACMCertificateArn": "$CERT_ARN",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "PriceClass": "PriceClass_100",
  "HttpVersion": "http2",
  "IsIPV6Enabled": true
}
EOF
  CREATE_OUT=$(aws cloudfront create-distribution --distribution-config file:///tmp/thc-cf.json)
  DIST_ID=$(echo "$CREATE_OUT" | python3 -c 'import sys,json; print(json.load(sys.stdin)["Distribution"]["Id"])')
  DIST_DOMAIN=$(echo "$CREATE_OUT" | python3 -c 'import sys,json; print(json.load(sys.stdin)["Distribution"]["DomainName"])')
else
  DIST_DOMAIN=$(aws cloudfront get-distribution --id "$DIST_ID" --query "Distribution.DomainName" --output text)
  say "Using existing distribution $DIST_ID ($DIST_DOMAIN)"
  aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" >/dev/null
fi
say "Distribution: $DIST_ID  $DIST_DOMAIN"

# ===== 6. S3 bucket policy allowing CloudFront OAC =====
say "Applying S3 bucket policy for CloudFront OAC"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
cat > /tmp/thc-bucket-policy.json <<EOF
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"AllowCloudFrontServicePrincipal",
    "Effect":"Allow",
    "Principal":{"Service":"cloudfront.amazonaws.com"},
    "Action":"s3:GetObject",
    "Resource":"arn:aws:s3:::$BUCKET/*",
    "Condition":{"StringEquals":{"AWS:SourceArn":"arn:aws:cloudfront::$ACCOUNT_ID:distribution/$DIST_ID"}}
  }]
}
EOF
aws s3api put-bucket-policy --bucket "$BUCKET" --policy file:///tmp/thc-bucket-policy.json

# ===== 7. Route53 A-alias record =====
say "Creating Route53 A-alias record $DOMAIN -> $DIST_DOMAIN"
cat > /tmp/thc-dns.json <<EOF
{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{
  "Name":"$DOMAIN.","Type":"A",
  "AliasTarget":{"HostedZoneId":"Z2FDTNDATAQYW2","DNSName":"$DIST_DOMAIN.","EvaluateTargetHealth":false}
}}]}
EOF
aws route53 change-resource-record-sets --hosted-zone-id "$HOSTED_ZONE_ID" --change-batch file:///tmp/thc-dns.json >/dev/null

say "===== DEPLOYMENT COMPLETE ====="
say "Site: https://$DOMAIN"
say "Lambda URL: $FN_URL"
say "CloudFront: $DIST_DOMAIN ($DIST_ID)"
