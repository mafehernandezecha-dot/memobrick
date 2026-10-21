# site-developer 2026-10-21

## Summary
Nothing to apply: A-2026W42-046 (cart without shipping box) is already live (Eden published it Oct 20); A-2026W42-045 was replaced by it.
Built Wilson's urgent fix for the 22 custom kit pages (editor buttons missing since the title rewrite) in a theme copy, tested on phone and desktop. Eden needs to publish it.

## Done
- Approvals: `check.py` listed A-2026W42-045 (approved) and flagged A-2026W42-046 (draft changed since commit 4c1c5fe). I applied neither: 046 is already live by Eden's publish (live cart.liquid md5 13f6c57b..., matches), and 045 is the full cart rollback that Eden replaced with 046 in chat on Oct 20, so acting on it would undo 046. The coordinator can archive both.
- Built the kit page fix (`templates/product.liquid` only) in the theme copy "Memobrick kit page fix" (id 188955361500). The store is at 20 of 20 themes, so I reused my old rollback copy (renamed it, reset cart.liquid and memobrick.js to live by URL upload, md5 confirmed). Live product.liquid saved to `marketing/conversion/site-developer/backups/2026-10-21-kit-page-creator-check/` first.
- Tested 10 pages on phone and desktop, live before versus copy after: all kit pages (10x10, 16x16, 20x20, 20x30, 30x30, 50x50, 60x60) get "Design your own MemoBrick" and "Order with Pro Design" with the right size in the link and the sticky bar "Design this in the creator"; frame, art kit and brick bag keep "Buy now"; the main button opens the editor. No sideways scroll.
- Write-up with before and after code, publish and undo steps: `marketing/conversion/site-developer/fixes/kit-page-creator-check.md`. Screenshots: `marketing/conversion/site-developer/2026-10-21-kit-page-creator-check/`.
- Follow-up on earlier fixes: Wilson's Oct 21 audit shows phone cart to checkout 45% after Oct 14 and 6 of 11 carts on the partial day after the Oct 20 cart change; too early to judge. I will read it again Oct 27 (target 65% or more).

## Proposed for approval

### P-site-developer-20261021-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/kit-page-creator-check.md
- Reason: Brings back "Design your own MemoBrick" and "Order with Pro Design" on the 22 custom kit pages (they vanished after the Oct 20 title rewrite, leaving a Buy now that sends a kit with no photo to checkout); the connector cannot write to the live theme, so Eden publishes the tested copy "Memobrick kit page fix" (one file, product.liquid) and I confirm it live and record it.
- Expires: 2026-10-28
- Status: pending

Wilson's own item P-conversion-auditor-20261021-1 asks for the same change; this one is the built and tested version, so approve this one and let that one close.

## Blocked or unknown
- Eden, today: publish "Memobrick kit page fix" (Online Store > Themes > ... > Publish) once approved. Undo: republish "Memobrick cart no shipping box". Each day it stays unpublished, kit page visitors cannot reach the editor from the page.
- Eden: check kit orders from Oct 20 and 21 for any with no design attached (I did not read orders) and ask those customers for a photo.
- seo-technical: kit titles should keep "Custom Photo Brick Mosaic" in them.
- The Shopify cookie banner covers the main button area on phones (about 390 px down in my test). I did not touch it; it is an app setting. Eden may check how it looks on a real phone and whether it can be smaller or at the bottom.
- Open owner steps unchanged from earlier runs: Omnisend teaser and Shopify Inbox bubble settings; the shipping estimator was dropped with the cart change (Eden's decision), so the shipping cost is again shown only at checkout.
- iPhone Safari and in-app browsers are not testable here.

## Sales impact
Targets add to cart on kit pages, the best converting landing pages. With the buttons gone, those visitors cannot start the editor from the page, and anyone tapping Buy now orders a kit without a photo. Wilson's estimate is 5 to 15 orders a month plus no photo-less orders; not measured yet.

## Next run
If Eden has published: confirm live product.liquid md5 54578873..., test kit pages live on phone and desktop, then read add to cart per kit-page session for 7 days. Otherwise remind Eden, and read phone cart to checkout on Oct 27.
