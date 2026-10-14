# site-developer 2026-10-14

## Summary
Five approved fixes (A-2026W42-009, -010, -013, -021, -022) are backed up, built and tested together in the private copy, but none is live: the Shopify connector refuses every write to the live theme.
The owner can put them live in about 10 minutes (paste 4 files) or with one click (publish the tested copy): `marketing/conversion/site-developer/fixes/live-apply-2026-10-14.md`.

## Done
Second run today (live run at the owner's request). The morning run's notes follow at the end.

- Approvals: `check.py approvals --agent site-developer` printed A-2026W42-009, -010, -022, -013 and -021. A-2026W42-011 and -012 (rejected) were not touched. A-2026W42-008 needs re-approval and is replaced by -022, so it was not acted on.
- Rebase check: the live theme `memobrick-theme-v27-print-8mm` (188646719708) still shows updatedAt 2026-10-13T10:04:49Z, and its four target files still match the checksums in `working-theme.md` (memobrick.js cb938c92..., cart.liquid e494bd6a..., memobrick-email-gate.js 5a95f0f5..., memobrick-site.liquid 5516bd77...). No rebase needed.
- Backups of the four live files, byte-identical to the live theme (checksums match Shopify's): `marketing/conversion/site-developer/backups/2026-10-14-*/`.
- A-2026W42-013 built: one edit in the Pro Design part of `assets/memobrick.js`. Wilson's draft pointed at `memobrick.src.js`, but the site loads the built `memobrick.js`, so the edit is in that file. Combined live file = live + 022 + 021 + 013 (md5 88f83c4a454dcf58bc1d9c1118777f77). The 022 + 021 step reproduces yesterday's tested copy exactly (5fb7938f...). Build script: `theme-files/live-bundle-2026-10-14/build.py`.
- Uploaded that file to the "Memobrick fixes" copy (188683092188) and tested on phone 390x844 and desktop 1440x900:
  - `/pages/editor?size=20x20#design` selects 20 x 20" at $99.88. 16x16 selects it at $69.88. 40x30 opens all sizes with 40 x 30" selected at $278. No size still shows "Choose a size". The live site today shows "Choose a size" in all four cases.
  - Whole bundle in the preview: phone home button at y = 403 with "Kits from $35." and hidden on desktop; sticky bar style present; email pop-up A/B code loaded; cart shows the $125 free-shipping line, "Add $90.00 more to get free shipping.", the Dec 15 line and the ZIP estimator, with no sideways scroll.
  - Only third-party scripts blocked in this sandbox gave page errors; the theme gave none.
- Live write: `themeFilesUpsert` on the live theme was refused ("Theme file writes against the live storefront are blocked"). It was not retried and nothing else was tried. Rechecked afterwards: the live updatedAt and checksums are unchanged.
- Compared all files between the copy and the live theme (about 400 assets, config, layout, sections, snippets and templates): only the four fixed files differ, so the owner can also safely publish the copy.
- Owner steps, the live check to run afterwards, and undo: `marketing/conversion/site-developer/fixes/live-apply-2026-10-14.md`. Reusable checks: `tools/verify-bundle.mjs` and `tools/prodesign-size.mjs`. Screenshots: `2026-10-14-pro-design-keep-size/` (before, after, live-before and preview-bundle).
- Follow-up on earlier fixes: none is live yet, so there is nothing to measure.

Morning run (earlier today): rebuilt the working copy on v27, built and tested the cart fix and the v27 sticky bar, and proposed both (now A-2026W42-021 and -022).

## Proposed for approval
None. All five fixes are already approved; only the owner's paste or publish is missing.

## Blocked or unknown
- **Owner, needed to go live:** the connector blocks writes to the live theme, so I cannot do it. Pick one:
  1. Paste 4 files in Edit code (links and checksums are in `fixes/live-apply-2026-10-14.md`; start with `assets/memobrick.js`).
  2. Publish the "Memobrick fixes" theme. It is identical to live apart from the four fixed files. Afterwards, check one GemPages page. To undo, publish v27 again.
  
  Then tell me, and I will check the checksums and run the live phone and desktop check. Items 009 and 010 expire 2026-10-19, and 021 and 022 on 2026-10-21.
- Still open from this morning: compare the cart's quoted rates with checkout for the same address (owner, 2 minutes, no payment). Also confirm whether the $125 free-shipping discount covers Alaska, Hawaii and Puerto Rico.
- Shopify's cookie banner covers part of the sandbox screenshots. The measurements come from the page itself.

## Sales impact
Nothing has changed for customers yet. Once live, the five fixes target the biggest site losses found in the 2026-10-12 audit:
- phone home page (add to cart 6.6% vs 12.5% last year)
- pop-ups and keyboard after upload (phone add to cart 4.8% vs 7.9%)
- desktop editor (5.1% vs 8.0%)
- shipping cost not shown until checkout (checkout completion 26%)
- Pro Design visitors having to pick their size again (designer orders 3 vs 67 last year)

Combined estimates from Wilson's audit are about 17 to 40 more orders per 30 days. The sooner they go live, the more of the pre-Christmas traffic they reach.

## Next run
If the owner has pasted or published: check the live checksums, run `verify-bundle.mjs live` and `prodesign-size.mjs live`, save after-screenshots, then start measuring (referred sessions only, baselines in each draft). If not, remind the coordinator. Then build the next fix from Wilson's latest audit.

## Morning run (kept as written; its proposals are now A-2026W42-021 and -022)

### Morning: Summary
No approved item to apply. Live theme changed to v27 on 2026-10-13, so I rebuilt the working copy (id 188683092188) and found the pending sticky-bar draft (A-2026W42-008) is now unsafe.
Built and tested two fixes: cart (mosaic image, hidden internal fields, Dec 15 line, real shipping-rate estimator) and the sticky bar rebuilt on v27.

### Morning: Done
- Approvals: `check.py approvals` returned no item for site-developer. Nothing applied, no live writes.
- Live theme is now `memobrick-theme-v27-print-8mm` (id 188646719708, updated 2026-10-13T10:04:49Z); the 2026-10-12 working copy no longer existed. Created a new "Memobrick fixes" copy, id 188683092188 (`working-theme.md`).
- Compared live files with my earlier bases: `memobrick-email-gate.js` and `memobrick-site.liquid` are unchanged (items A-2026W42-010 and -009 are still valid). `memobrick.js` changed (md5 cb938c92...), so the earlier sticky-bar file (A-2026W42-008) would have overwritten v27 changes. Rebuilt it on v27 and marked the old draft STALE.
- Cart fix built and tested in the preview, phone 390x844 and desktop 1440x900: customer mosaic as line image (cart page and drawer), "Build-at-home kit", internal fields hidden, no sideways scroll, "Order by December 15" line that removes itself on Dec 16, "Free US shipping on orders $125 and up" with the amount still needed, and a state plus ZIP estimator that reads Shopify's own shipping-rate endpoints. Rates tested: FL, NY, CA, AK, HI (20x20) and TX, MT, AK (16x16) all returned real carrier rates that vary by address and size; a $199.76 cart shows the free-shipping message. No made-up prices in the theme.
- Desktop editor sticky bar rechecked on the v27 preview: bar sticky at y = 76, Finish Editing at y = 88, still at 76 after scrolling.
- Follow-up on earlier fixes: none applied yet, so nothing to measure.

### Morning: Proposed for approval

#### P-site-developer-20261014-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/cart-design-delivery-shipping.md
- Reason: If approved, I apply the new cart page (customer's mosaic, hidden internal fields, Dec 15 line, shipping estimator with real rates and the $125 free-shipping message) and the cart drawer image edit to the live theme after backing up both files; cart to checkout and checkout completion should improve.
- Expires: 2026-10-21
- Status: pending

#### P-site-developer-20261014-2
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar-v27.md
- Reason: If approved, I apply the sticky price and Finish Editing bar on desktop to the live memobrick.js (rebuilt on v27); replaces A-2026W42-008, whose file would overwrite v27 changes, so please reject A-2026W42-008.
- Expires: 2026-10-21
- Status: pending

### Morning: Blocked or unknown
- Coordinator: A-2026W42-008 should be rejected or superseded by P-site-developer-20261014-2 (its draft is built on the old theme). A-2026W42-009 and -010 remain valid. Wilson's draft `auditor/site-changes/cart-show-design-and-delivery.md` is superseded by P-site-developer-20261014-1.
- Quoted rates vs checkout: not compared. Doing so needs an email and address in checkout, which would create an abandoned-checkout record. Owner check, 2 minutes, no payment: add a 20x20 to the cart, get rates for your ZIP, click Checkout, enter the same address, compare the shipping step.
- Owner to confirm in Shopify (Discounts, "Free Shipping on US Orders Over $125") that the discount covers Alaska, Hawaii and Puerto Rico; the cart box says "US". Puerto Rico and territories are not in the state menu.
- Shopify's bot check blocked my browser (HTTP 429) after bursts of requests for about an hour; handled by waiting. cdn.shopify.com is blocked in this sandbox, so the cart thumbnail was tested with a locally served generated image; the live editor writes a cdn.shopify.com address, which loads for real visitors.
- Live theme writes through the connector are still untested (nothing approved yet); manual steps are in each draft.
- EARLYBIRD20 is still advertised on the home page but is not in the offers calendar (open owner decision from 2026-10-12).

### Morning: Sales impact
Cart to checkout is 83% and checkout completion is 26% (referred sessions, 30 days); not seeing shipping cost until checkout is a likely reason people drop. The cart fix shows their own design and the real shipping cost before checkout: expect a small gain, hard to measure at about 2.6 orders a day. The sticky bar (desktop editor, add to cart 5.1% against 8.0% last year) is worth 2 to 5 orders a month by Wilson's estimate. Both wait for owner approval; the remaining big loss (referred traffic down 65%) is not a site problem.

### Morning: Next run
Apply any approved item (backup first, files and md5s are in the drafts, recheck live md5s). Then look at the phone editor pop-up flow with the email gate fix in the new copy, and follow up on applied fixes in Shopify analytics.
