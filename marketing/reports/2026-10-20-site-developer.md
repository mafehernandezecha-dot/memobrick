# site-developer 2026-10-20

## Summary
No approved item for me and no audit newer than 2026-10-14, so nothing built or applied. No writes to Shopify.
Exited early as instructed.

## Done
- `check.py approvals` listed nothing to apply. Checked auditor folder: latest audit is still 2026-10-14.

## Proposed for approval
None.

## Blocked or unknown
- Open owner steps unchanged: Omnisend teaser and Shopify Inbox bubble settings (`fixes/calm-phone-home.md`); compare cart shipping quotes with checkout for one address; confirm the free-shipping discount covers AK, HI, PR.
- Page-speed lead (Meta landing views 76% of clicks) still needs Wilson's next audit.

## Sales impact
None today (no change shipped). First funnel reading of the live fixes (referred sessions only) due 2026-10-21.

## Next run
Read the 7-day funnel and Wilson's next audit; build the top new problem in a fresh copy of the live theme.

---

# site-developer 2026-10-20, second run: cart rollback (A-2026W42-045)

## Summary
Built the approved rollback of the Oct 14 cart page in a theme copy, "Memobrick cart rollback" (188955361500), because live theme writes are refused. Tested on phone and desktop: Checkout reaches Shopify checkout from the cart page and the drawer. Eden needs to publish it.
No technical blocker found in the current cart page. The drop is on phones only (71% to 44%); desktop on the same template went 95% to 100%.

## Done
- Confirmed the live theme "Memobrick calm home" (188697510108) and its checksums; saved the live cart.liquid and memobrick.js to `marketing/conversion/site-developer/backups/2026-10-20-cart-rollback/` (commit 77abf26).
- Live write refused by the connector. Duplicated live to "Memobrick cart rollback" (188955361500) and wrote the pre-Oct-14 cart.liquid plus memobrick.js with only the two 021 drawer edits reversed; checksums confirmed. 022, 013, 009/036 and 010 kept.
- Before and after tests and screenshots: `marketing/conversion/site-developer/2026-10-20-cart-rollback/`.
- Write-up with publish steps, undo, root cause notes and watch plan: `marketing/conversion/site-developer/fixes/cart-rollback-2026-10-20.md`.

## Proposed for approval
None. (Optional follow-up offered in the write-up: a copy that keeps the mosaic picture and hidden fields but drops the shipping box and December 15 line, which would need its own approval.)

## Blocked or unknown
- Eden: publish "Memobrick cart rollback" (Online Store > Themes > ... > Publish). Undo: republish "Memobrick calm home".
- The rollback brings back the stock photo and six visible internal fields in the cart (including the Final Design file address).
- iPhone Safari and Instagram/TikTok in-app browsers could not be tested (shop.app is blocked here). Owner check on a real iPhone in Instagram: add a kit, tap Checkout, stop before paying.

## Sales impact
Targets the cart-to-checkout drop (82% to 62% store-wide since Oct 14; the drop is all on phones). If the cart page caused it, mobile should go back toward 71% within a week, which is about 3 to 4 more checkouts a week at the current volume. If it does not recover, the cart page was not the cause, and the next places to look are phone traffic mix and in-app browsers.

## Next run
Once Eden publishes: confirm the live checksums match the copy, then read cart-to-checkout by device every day for 7 days (referred sessions) against 82% overall, 71% mobile and 95% desktop.
