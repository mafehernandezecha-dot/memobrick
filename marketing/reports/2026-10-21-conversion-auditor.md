# conversion-auditor 2026-10-21

## Summary
- URGENT bug found: since the Oct 20 product title rewrite, all 22 custom kit pages lost the "Design your own" and "Upload your photo" buttons; the only button is "Buy now", which skips the photo and goes to checkout.
- Funnel 7 days: add to cart 5.1% against 8.6% last year, purchases 17 against 37. Phone cart to checkout fell from 65% to 45% after the Oct 14 cart page; the no-shipping-box cart went live Oct 20 (too early to judge).
- Phone and desktop walks from the home page work to checkout; walks from product pages cannot reach the editor.

## Done
- Approvals: this agent is never an Executor; nothing to act on.
- Funnel from Shopify (7 and 30 days vs last year, by device, referrer, landing page). Full tables: `marketing/conversion/auditor/audit-2026-10-21.md`.
- Walked phone 20x20 product, desktop 20x20 product, phone and desktop from home; timed each step; stopped at checkout page, no data entered. Screenshots in `marketing/conversion/auditor/2026-10-21/`. Test image was generated.
- Root-caused problem 1 to `product.title contains "Custom Bricked Mosaic"` (theme `templates/product.liquid` line 67) against the new titles from A-2026W42-043. Draft fix: `marketing/conversion/auditor/site-changes/product-page-creator-check-title.md`.
- Follow-up: cart without shipping box published Oct 20, phone checkout reach 6 of 11 carts on the partial day; re-check Oct 27.

## Proposed for approval

### P-conversion-auditor-20261021-1
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/product-page-creator-check-title.md
- Reason: If approved, site-developer changes the creator check in the product template so the 22 custom kit pages show the editor buttons again instead of a "Buy now" that sends a kit with no photo to checkout, builds it in a theme copy and gives Eden the publish link; urgent because every kit page visitor is affected today.
- Expires: 2026-10-28
- Status: pending

## Blocked or unknown
- Owner, today: until the theme fix is live, consider the fallback in the draft (restore old titles on the 22 kits with seo-technical's `restore.py`), and check recent kit orders (Oct 20 and 21) for any with no design attached, so the team can ask those customers for a photo. I did not read orders.
- Owner: on a real phone, add a kit through the editor and look at the cart picture (in my sandbox the mosaic image showed broken; probably the blocked cdn.shopify.com, unconfirmed). Shop Pay and iPhone Safari are not testable here.
- No GA4 or Meta snapshot exists (`marketing/data/latest.md` "Updated: never"), so no cross-check. Requests are already open.
- Owner steps from 2026-10-12 still open: test the free-proof form, confirm production and delivery time, test checkout on an iPhone.
- Page load is 4.3 to 4.6 s on phone; cause not diagnosed.

## Sales impact
Targets the add-to-cart step on kit-page visits (Google and gift-collection traffic, the visitors who convert best). Without the fix those visitors cannot start the editor from the page's main button, and anyone who taps Buy now gets a photo-less order. Expected: restores the kit-page path that produced most of last year's carts; plausible 5 to 15 orders a month, not measured yet.

## Next run
Wednesday 2026-10-28. Check kit-page to editor rate once fixed, phone cart to checkout vs the 65% target, and the Meta/GA4 snapshots if they exist. Update `tools/journey.mjs` product step (Buy now / editor buttons) after the fix.
