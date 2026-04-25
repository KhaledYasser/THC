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
- [ ] Request ACM cert for thc.pom100.com (us-east-1)
- [ ] Create DNS validation record in Route53
- [ ] Wait for cert ISSUED
- [ ] Create S3 bucket thc.pom100.com
- [ ] Upload site to S3
- [ ] Package & deploy Lambda, enable Function URL
- [ ] Create CloudFront distribution with cert + S3 origin
- [ ] Create Route53 A-alias record thc.pom100.com → CloudFront
- [ ] Test end-to-end (site load, add to cart, checkout, Stripe page)
