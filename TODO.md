# TODO — Design Update to Use stitch_thc_egypt_website_redesign

## Plan Breakdown

- [x] Step 1: Create `site/about.html` (new page) adapting the stitch `about_us` mockup
  - [x] Hero section (light gradient + office image overlay)
  - [x] Mission & Vision bento grid (2/3 + 1/3 asymmetric cards with ghost icons)
  - [x] Stats row (500+ / 15+ / 8 / 24-7)
  - [x] "A Legacy of Innovation" history timeline (alternating left/right timeline items)
  - [x] "What Drives Us" values section (3 cards)
  - [x] CTA section linking to services.html / partners.html
  - [x] Uses shared `tailwind-config.js`, `layout.js` header/footer, `.reveal` animations
- [x] Step 2: Update `site/js/layout.js`
  - [x] Add `{ href: 'about.html', label: 'About', key: 'about' }` to NAV (between Services and Partners)
  - [x] Fix footer "About Us" link: `services.html` → `about.html`
  - [x] Nav responsive polish: lg breakpoint for nav links (instead of md), xl for cart/account icons, compact "Get Quote" button, whitespace-nowrap on logo
- [x] Step 3: Polish `site/index.html`
  - [x] Upgrade Mission & Vision section to bento grid (2/3 + 1/3 with ghost rocket icon) matching stitch style
  - [x] "Learn more about us" link → about.html
- [x] Step 4: Update `site/css/style.css`
  - [x] Burger menu media query 768px → 1023px (matches new lg breakpoint)
- [x] Step 5: Testing
  - [x] Local HTTP server verified on :8080
  - [x] About page: hero, bento, stats, timeline, values, CTA all render correctly
  - [x] ABOUT nav link active (primary color + underline)
  - [x] Home page bento Mission/Vision upgrade matches stitch design
  - [x] Footer "About Us" → about.html works
  - [x] Services, Products, Categories, Partners, News pages all render with refreshed nav
  - [x] Nav fits all 7 items at 1024px viewport without wrapping
