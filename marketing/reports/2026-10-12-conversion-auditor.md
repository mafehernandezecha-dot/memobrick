# conversion-auditor 2026-10-12

## Summary

- "Visitors are up" is bot traffic. About 6,300 desktop direct sessions added almost no carts. Real (referred) visitors are down 63% and designer-proof draft orders are down from 67 to 3. Together those explain most of the lost orders.
- On the site, the drop is at add to cart, mostly on phones (5.5% against 6.9% for referred phone sessions). Cart, checkout and purchase are as good as last year or better.
- Walked the 20×20, 16×16 and home paths on phone and desktop up to the checkout page (no order placed). Proposed 5 site changes, one of them an A/B test.

## Done

- **Funnel (Shopify analytics, read-only).** Measured the last 7 and 30 days against the same dates in 2025, split by device, referrer, landing page and sales channel. Full tables are in `marketing/conversion/auditor/audit-2026-10-12.md`.
- **Journey walks (Playwright, Chromium).** Phone 390×844 from the 20×20 page, the 16×16 page and the home page. Desktop 1440×900 from the 20×20 page and the home page. Each walk was product page → editor → upload a generated test image (a flower drawing, never a customer photo) → design it myself → crop → colors → Finish Editing (adds to cart) → cart → checkout page.
  - Stopped at checkout on every run. No payment details, no order, no email entered.
  - Also checked the Pro Design path and the desktop editor layout.
  - 57 screenshots are in `marketing/conversion/auditor/2026-10-12/`.
- **Read-only Shopify checks:**
  - shipping profiles: US uses carrier-calculated USPS/UPS rates, plus an automatic "Free Shipping on US Orders Over $125" active since 2026-08-11
  - discount `EARLYBIRD20`: ACTIVE, 20%, no end date, used 4 times
- **Ranked 8 problems** by likely lost orders in the audit file.
- **Wrote 5 site-change drafts** with exact before and after from the theme files. The CSS rule was checked against the live `memobrick.css`.
- **Appended experiment CA-20261012-01** (email gate timing) to `marketing/shared/experiments.md`.
- **Saved a reusable walk script** at `marketing/conversion/auditor/tools/journey.mjs` for next Wednesday.
- **Copy check:** `check.py copy` passes on all 5 site-change files. One em dash was fixed in `pro-design-keep-size.md`.
- **Approvals:** this agent had no approved items. It is never an Executor; site changes go to seo-technical.

### Funnel by device, last 30 days against the same 30 days last year

| Device | Sessions | Add to cart | Purchased | Last year: sessions | Add to cart | Purchased |
|---|---|---|---|---|---|---|
| Phone | 3,924 | 142 (3.6%) | 45 | 5,919 | 382 (6.5%) | 92 |
| Desktop | 6,649 | 116 (1.7%) | 11 | 2,205 | 194 (8.8%) | 27 |
| Phone, referred only | 1,569 | 86 (5.5%) | 23 | 4,222 | 291 (6.9%) | 48 |
| Desktop, referred only | 314 | 16 (5.1%) | 6 | 834 | 67 (8.0%) | 14 |

Last 7 days: phone 791 sessions, 38 carts (4.8%) and 16 orders, against 1,778, 141 (7.9%) and 30. Desktop 432, 19 (4.4%) and 6, against 603, 57 (9.5%) and 6.

## Proposed for approval

### P-conversion-auditor-20261012-1
- Agent: conversion-auditor
- Executor: seo-technical
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/home-phone-cta-above-fold.md
- Reason: seo-technical adds the Create My MemoBrick button and "Kits from $35" under the home headline on phones only. Today the button sits below the first phone screen on our biggest landing page, and home-page phone visitors add to cart at 6.6% against 12.5% last year.
- Expires: 2026-11-15
- Status: pending

### P-conversion-auditor-20261012-2
- Agent: conversion-auditor
- Executor: seo-technical
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/desktop-editor-sticky-topbar.md
- Reason: seo-technical makes the desktop editor's price and Finish Editing bar sticky. After upload it scrolls off screen, so desktop visitors see no way to order (desktop add to cart is 5.1% against 8.0%).
- Expires: 2026-11-15
- Status: pending

### P-conversion-auditor-20261012-3
- Agent: conversion-auditor
- Executor: seo-technical
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/email-gate-defer-ab-test.md
- Reason: seo-technical starts a 50/50 test that moves the "save your design" email ask from right after upload to a later slide-in, with a decision rule by 2026-11-15. Today two pop-ups in a row block the editor and phone add to cart is down.
- Expires: 2026-10-25
- Status: pending

### P-conversion-auditor-20261012-4
- Agent: conversion-auditor
- Executor: seo-technical
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/cart-show-design-and-delivery.md
- Reason: seo-technical makes the cart show the customer's own mosaic instead of a stock photo, hides raw internal fields (including a file URL that runs off phone screens), and adds the verified "Order by December 15" line before the holiday rush.
- Expires: 2026-12-10
- Status: pending

### P-conversion-auditor-20261012-5
- Agent: conversion-auditor
- Executor: seo-technical
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/pro-design-keep-size.md
- Reason: seo-technical makes the Pro Design page keep the size chosen on the product page instead of asking again. This is a small fix on the path for visitors who want design help.
- Expires: 2026-12-15
- Status: pending

## Blocked or unknown

**Owner steps (settings and processes only the owner can change):**

1. **Designer-proof sales, the biggest gap.** Draft orders fell from 67 to 3 in the last 30 days against last year, and from 34 in May 2026 to under 10 a month since June.
   - **Test the form.** On your phone, open mymemobrick.com, tap "Not sure yet? Get a free design proof first →", and check that the form appears and accepts a photo. It is a Hulk Form Builder embed that this sandbox could not load.
   - **Count the requests.** In Shopify admin → Apps → Form Builder by HulkApps → Submissions, count the free-proof requests per month since May.
   - **Check the follow-up.** Confirm someone still sends each proof and a draft-order invoice within a day.
   - **Restore the old path if it worked better.** If requests are arriving but not being followed up, that is where the lost orders are. Last year's flow was proof first, pay after approval; Pro Design now asks for payment first. Decide whether to offer "free proof first, pay after" again for visitors who hesitate.
2. **Shipping cost surprise under $125.** US orders under $125 pay carrier-calculated USPS/UPS rates that appear only after an address is typed at checkout. That covers both best sellers, the 16×16 at $69.88 and the 20×20 at $99.88. Options are set in Shopify admin → Settings → Shipping and delivery → General profile → Domestic:
   - add a flat rate, such as standard shipping at a fixed price, so the cart can state it
   - or lower the free-shipping threshold in Discounts → "Free Shipping on US Orders Over $125"
   Tell us which, and we can show the cost before checkout.
3. **Delivery time.** No delivery estimate appears before checkout, except "within 2–4 business days after approval" on product pages, and that is not in the Facts table. Add production time and typical transit time to the Facts table in `marketing/shared/offers-calendar.md` so pages can say "arrives in about X days".
4. **EARLYBIRD20 on the home page.** The home banner says "Order early & save 20% with code EARLYBIRD20 at checkout". The code is ACTIVE in Shopify (20%, no end date), but `offers-calendar.md` does not list it as active, so agents treat it as not live. Either add it to the offers calendar as the active early holiday offer, or end the code in Shopify → Discounts and ask seo-technical to remove the banner. A live 20% code shown to everyone also overlaps the planned 20% holiday offer.
5. **Test checkout on a real iPhone.** The Checkout button redirects to Shop Pay on shop.app (`checkout_universal_redirect`), and iPhone Safari visitors are bounced through `shop.app/accounts/sur` on some page loads. The sandbox cannot reach shop.app. On an iPhone, add a design to the cart, tap Checkout, and confirm that you land on a working checkout showing the Memobrick name. Stop before paying. If it looks wrong, the setting is in Settings → Payments → Shop Pay.
6. **Bot traffic in the session count.** About 6,300 desktop direct sessions in 30 days are not shoppers: US, spikes of 300 to 770 a day, almost no carts. Shopify cannot filter them. Growth-analyst and sales/latest.json should report the add-to-cart rate on referred (non-direct) sessions, otherwise the 2.4% headline understates the site.

**Not verified in the sandbox:** the free-proof form, the Loox review widget, press logos, and the checkout page logo. All of these load from cdn.shopify.com or loox.io, which this environment blocks; their absence in screenshots is not evidence of a site fault. The Shopify ShopifyQL "add to cart by product" metric is not available through this tool, so product-level add to cart was replaced by orders by product.

**Test traffic:** this run added about 12 cart sessions and about 10 checkout page views to today's analytics. No email was entered, so no recovery emails are triggered.

## Sales impact

- **Weak point addressed:** "Visitors stopped adding to cart". This run shows the real causes are about 60% fewer real visitors and the near-stop of designer-proof draft orders (64 of the 119 missing orders). The theme is not the main problem.
- **Proposals 1 to 3:** phone home button, desktop sticky Finish bar and email gate test. They target the visit-to-cart step. If they close a quarter of the phone and desktop add-to-cart gap, that is roughly 8 to 15 more orders a month (an estimate) at current traffic, more in November and December.
- **Proposals 4 and 5:** cart and Pro Design. Small gains, but they protect checkout completion during the holiday rush.
- **Biggest lever: owner step 1 (proof requests and follow-up).** Getting draft orders back to even half of last year's level would add about 30 orders a month, more than all site changes together.

## Next run

- Wednesday 2026-10-14 (weekly Wednesday cadence).
- Re-measure the funnel, with referred-only add to cart as the headline.
- Re-walk the paths with `marketing/conversion/auditor/tools/journey.mjs`.
- Check the funnel step of any change seo-technical has applied.
- Add the 20×30 and 30×20 pages (4 and 3 orders in 30 days) and the Facebook landing pages.
