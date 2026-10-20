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

---

# site-developer 2026-10-20, third run: cart without the shipping box (A-2026W42-046)

## Summary
Eden chose the targeted change instead of the full rollback. Built "Memobrick cart no shipping box" (188955623644) from the live theme: the cart page loses only the shipping box, the State/ZIP estimator and the December 15 line. Tested with real editor designs on phone and desktop through to the checkout Contact step. Waiting for Eden to publish.

## Done
- Live theme rechecked (same checksums). New copy duplicated from live; only `templates/cart.liquid` changed (498326618234d9f98c771afe82477a15 to 13f6c57bb371bb521b378e0bb574c50a). Diff and file: `marketing/conversion/site-developer/theme-files/cart-no-shipping-box-2026-10-20/`.
- Tests and screenshots: `marketing/conversion/site-developer/2026-10-20-cart-no-shipping-box/`. Write-up: `marketing/conversion/site-developer/fixes/cart-no-shipping-box-2026-10-20.md`. The full rollback write-up is marked superseded.

## Proposed for approval
None.

## Blocked or unknown
- Eden: publish "Memobrick cart no shipping box" (Themes > ... > Publish). Do not publish "Memobrick cart rollback". Undo: republish "Memobrick calm home".
- The store is at 20 of 20 themes. I cannot delete themes; Eden can remove "Memobrick cart rollback" (188955361500), which is no longer needed.
- The drawer's older "Add $X more for free shipping" bar (live before Oct 14) was kept; ask if it should go too.

## Sales impact
Targets the phone cart-to-checkout drop (71% to 44% since Oct 14) while keeping the mosaic picture and the hidden fields. Target: phone 65% or more within 7 days of publishing.

## Next run
After publishing: confirm the live cart.liquid md5 is 13f6c57bb371bb521b378e0bb574c50a, then read cart-to-checkout by device every day for 7 days.
