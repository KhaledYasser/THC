# THC.pom100.com Deployment TODO

## Build
- [x] Explore reference site https://p7joxuvzpiz6m.kimi.show
- [x] Check existing AWS infrastructure (Route53, ALB, ACM)
- [ ] Create site data (products, categories)
- [ ] Create HTML pages (home, products, product detail, cart, checkout, success, cancel)
- [ ] Create CSS styles
- [ ] Create JS (app logic, cart, stripe)
- [ ] Create Lambda for Stripe Checkout Sessions

## Deploy
- [x] Request ACM cert for thc-egypt.org (us-east-1)
- [x] Create DNS validation record in Route53
- [x] Wait for cert ISSUED
- [x] Create S3 bucket thc-egypt.org
- [x] Upload site to S3
- [x] Package & deploy Lambda, enable Function URL
- [x] Create CloudFront distribution with cert + S3 origin
- [x] Create Route53 A-alias record thc-egypt.org → CloudFront
- [ ] Test end-to-end (site load, add to cart, checkout, Stripe page)
