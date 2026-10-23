# site-developer 2026-10-23

## Summary
A-2026W43-001 is live: Eden published "Memobrick kit page fix" (188955361500 is now MAIN, product.liquid 54578873 confirmed) and the kit page shows both creator buttons, no "Buy now", on phone and desktop.
No approved item to apply (check.py printed nothing). Finished the Art Gift Kit flow build (theme copy 188683092188) and proposed it.

## Done
- Live check of https://mymemobrick.com/products/2-2-boards at 390 and 1440 wide: "Design your own MemoBrick" and "Order with Pro Design" present, no "Buy now" (screenshots in marketing/conversion/site-developer/2026-10-23-live-check/). The queue still says pending for 001 and 002; the coordinator can archive 001 as done and close 002.
- Gift kit flow: the copy's assets/memobrick-gift-redeem.js was stale (5b7a0c05); re-uploaded the repo version (2e616f05, confirmed) and retested on phone, all 14 steps pass. Desktop rerun failed from the sandbox bot challenge; a second attempt was denied by the permission check and I did not work around it. Details in fixes/gift-kit-flow.md.
- Live theme list: 20 themes, no live change besides the publish.

## Proposed for approval
### P-site-developer-20261023-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/gift-kit-flow.md
- Reason: Eden publishes the tested theme copy "Memobrick gift kit flow" (3 files: product.liquid, theme.liquid, new gift-redeem.js) so Art Gift Kit links open the Creator in gift mode with no payment and no email pop-up; I then confirm it live. Undo: republish "Memobrick kit page fix". Before gift season.
- Expires: 2026-10-30
- Status: pending

## Blocked or unknown
- Desktop gift-flow retest today not completed (bot challenge, then permission denial of the rerun). Yesterday's desktop run passed. Eden: tell me if you want a desktop rerun before publishing.
- Owner: confirm the gift kit is 20x20 and credit 99 (kitSize/kitCredit in theme.liquid), and who reads the gift ship-to emails.
- Follow-up on cart fixes: read phone cart to checkout on Oct 27 (target 65% or more). Not done today.
- Still open from before: owner checks of Oct 20 and 21 kit orders with no design attached; compare cart shipping quotes with checkout using a real address.

## Sales impact
The kit page fix is confirmed live, which restores the path from kit pages to the editor. The gift flow protects gift kit orders from stalling after purchase; it does not raise add to cart directly.

## Next run
If the gift item is approved and published, confirm live md5s (product e75546db, theme.liquid 18b1a623, redeem js 2e616f05), run the gift test on phone and desktop. Otherwise remind Eden.
