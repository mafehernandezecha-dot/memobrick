# site-developer 2026-10-14

## Summary
No approved item to apply. Live theme changed to v27 on 2026-10-13, so I rebuilt the working copy (id 188683092188) and found the pending sticky-bar draft (A-2026W42-008) is now unsafe.
Built and tested two fixes: cart (mosaic image, hidden internal fields, Dec 15 line, real shipping-rate estimator) and the sticky bar rebuilt on v27.

## Done
- Approvals: `check.py approvals` returned no item for site-developer. Nothing applied, no live writes.
- Live theme is now `memobrick-theme-v27-print-8mm` (id 188646719708, updated 2026-10-13T10:04:49Z); the 2026-10-12 working copy no longer existed. Created a new "Memobrick fixes" copy, id 188683092188 (`working-theme.md`).
- Compared live files with my earlier bases: `memobrick-email-gate.js` and `memobrick-site.liquid` are unchanged (items A-2026W42-010 and -009 are still valid). `memobrick.js` changed (md5 cb938c92...), so the earlier sticky-bar file (A-2026W42-008) would have overwritten v27 changes. Rebuilt it on v27 and marked the old draft STALE.
- Cart fix built and tested in the preview, phone 390x844 and desktop 1440x900: customer mosaic as line image (cart page and drawer), "Build-at-home kit", internal fields hidden, no sideways scroll, "Order by December 15" line that removes itself on Dec 16, "Free US shipping on orders $125 and up" with the amount still needed, and a state plus ZIP estimator that reads Shopify's own shipping-rate endpoints. Rates tested: FL, NY, CA, AK, HI (20x20) and TX, MT, AK (16x16) all returned real carrier rates that vary by address and size; a $199.76 cart shows the free-shipping message. No made-up prices in the theme.
- Desktop editor sticky bar rechecked on the v27 preview: bar sticky at y = 76, Finish Editing at y = 88, still at 76 after scrolling.
- Follow-up on earlier fixes: none applied yet, so nothing to measure.

## Proposed for approval

### P-site-developer-20261014-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/cart-design-delivery-shipping.md
- Reason: If approved, I apply the new cart page (customer's mosaic, hidden internal fields, Dec 15 line, shipping estimator with real rates and the $125 free-shipping message) and the cart drawer image edit to the live theme after backing up both files; cart to checkout and checkout completion should improve.
- Expires: 2026-10-21
- Status: pending

### P-site-developer-20261014-2
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar-v27.md
- Reason: If approved, I apply the sticky price and Finish Editing bar on desktop to the live memobrick.js (rebuilt on v27); replaces A-2026W42-008, whose file would overwrite v27 changes, so please reject A-2026W42-008.
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown
- Coordinator: A-2026W42-008 should be rejected or superseded by P-site-developer-20261014-2 (its draft is built on the old theme). A-2026W42-009 and -010 remain valid. Wilson's draft `auditor/site-changes/cart-show-design-and-delivery.md` is superseded by P-site-developer-20261014-1.
- Quoted rates vs checkout: not compared. Doing so needs an email and address in checkout, which would create an abandoned-checkout record. Owner check, 2 minutes, no payment: add a 20x20 to the cart, get rates for your ZIP, click Checkout, enter the same address, compare the shipping step.
- Owner to confirm in Shopify (Discounts, "Free Shipping on US Orders Over $125") that the discount covers Alaska, Hawaii and Puerto Rico; the cart box says "US". Puerto Rico and territories are not in the state menu.
- Shopify's bot check blocked my browser (HTTP 429) after bursts of requests for about an hour; handled by waiting. cdn.shopify.com is blocked in this sandbox, so the cart thumbnail was tested with a locally served generated image; the live editor writes a cdn.shopify.com address, which loads for real visitors.
- Live theme writes through the connector are still untested (nothing approved yet); manual steps are in each draft.
- EARLYBIRD20 is still advertised on the home page but is not in the offers calendar (open owner decision from 2026-10-12).

## Sales impact
Cart to checkout is 83% and checkout completion is 26% (referred sessions, 30 days); not seeing shipping cost until checkout is a likely reason people drop. The cart fix shows their own design and the real shipping cost before checkout: expect a small gain, hard to measure at about 2.6 orders a day. The sticky bar (desktop editor, add to cart 5.1% against 8.0% last year) is worth 2 to 5 orders a month by Wilson's estimate. Both wait for owner approval; the remaining big loss (referred traffic down 65%) is not a site problem.

## Next run
Apply any approved item (backup first, files and md5s are in the drafts, recheck live md5s). Then look at the phone editor pop-up flow with the email gate fix in the new copy, and follow up on applied fixes in Shopify analytics.
