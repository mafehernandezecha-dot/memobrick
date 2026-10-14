# site-developer 2026-10-14

## Summary
Eden published "Memobrick fixes", so the 5 approved fixes are live (checksums confirmed). She finds the phone home page busy: I built and tested a calm phone home (one main button with "Kits from $35", free-proof link right under it on the first screen, compact dot row (kept at Eden's request), shorter video, 2 red buttons instead of 5 plus a floating bar). Desktop unchanged.
Preview copy "Memobrick calm home" (188697510108) is ready: https://mymemobrick.com/?preview_theme_id=188697510108 (only the one file differs from live). Proposed as one site-change; Omnisend teaser and Inbox chat settings are Eden's steps.

## Done
Third run today (live run at the owner's request after she published). Earlier runs follow below.

- Live theme is now "Memobrick fixes" (188683092188, MAIN, updatedAt 2026-10-14T07:17:21Z). Its four fixed files match the approved checksums (memobrick.js 88f83c4a..., memobrick-email-gate.js 851b9041..., memobrick-site.liquid 809e6c2e..., cart.liquid 49832661...), so **A-2026W42-009, -010, -013, -021 and -022 are live, applied by the owner's one-click publish** (Option 2 of `fixes/live-apply-2026-10-14.md`). Undo theme: "memobrick-theme-v27-print-8mm" (188646719708), unpublished, untouched.
- New working copy: `themeDuplicate` of the live theme returned no theme and no error, twice. The store has 20 themes, Shopify's limit. Nothing was created, removed or changed in any theme. `working-theme.md` updated.
- Measured the live phone home (390x844): red buttons at y = 403, 1,180, 1,879, 2,856, 5,584 plus a floating "Create My MemoBrick" bar (`#mobCta`) pinned to the bottom from the first scroll; free-proof link at y = 1,432 (17 px tall); 8-dot row under the price line; hero media 557 px (66% of the screen). Desktop: 4 buttons a screen apart, free-proof link on the first screen, already calm.
- Found what draws the floating bubbles: the pink "🎁 Get 20% off" pill is the teaser of the Omnisend pop-up "Exit-Intent 10% Welcome (gentle)" (bottom-left, shown "Always", 15 px bold); the "Chat" bubble is the Shopify Inbox app embed (bottom-right, "Chat with us" text). On phones both sat on top of the floating bar.
- Built the fix: one file, `sections/memobrick-site.liquid` (new md5 6795f9091b0a8bd9361c992806a9ab0b), phone-only CSS in the hero's existing style block plus a class on two button paragraphs. Backup of the live file (byte-identical, 809e6c2e...) in `backups/2026-10-14-calm-phone-home/`.
- Tested the exact change on the live page in a test browser (same CSS and classes added before render, nothing changed on the site) at 390x844, 360x740 and 1440x900: main button y = 383 with "Kits from $35"; free-proof link y = 477, 44 px tap area, fully on the first screen (360x740: y = 468); 2 red buttons on the phone page; no floating bar at any scroll point; dot row hidden; hero media 439 px (52%); video still muted autoplay loop; no sideways scroll; button and link tappable and clear of the bubbles' positions; free-proof link opens the free-proof view; button starts navigation to /pages/editor; desktop positions and height unchanged. Results and screenshots: `2026-10-14-calm-phone-home/`, test tool `tools/calm-home-test.mjs`.
- Draft with diff, test table, Eden's clicks, app steps and undo: `marketing/conversion/site-developer/fixes/calm-phone-home.md`.
- **Revision (Eden: "keep the color dots"):** the dot row now stays on phones, 14 px dots centered just below the free-proof link and above the video; all other changes kept. New md5 883ec9b9756b04c28eb971b7bb625ff9 (commit 2b1bd9f). Retested at 390x844, 360x740 and 1440x900: button y = 383 with "Kits from $35"; proof link y = 477 to 521, fully on the first screen and tappable; dots y = 537 to 551; 2 red buttons; no floating bar; no sideways scroll; desktop unchanged. After-screenshots and `test-results.json` refreshed; the draft and its diff updated. P-site-developer-20261014-3 is unchanged apart from the draft content.
- **"Slot free" relay:** Shopify still lists 20 themes (the 2021 "Copy of Copy of Copy of xx", 128996770012, is still there), and a third `themeDuplicate` again returned no theme. No copy and no preview link yet.
- **Preview copy made.** After Eden freed slots (Shopify then listed 17 themes; she removed "Copy of Copy of Copy of Copy of xx" 136454832348, "Copy for motti 2" 151460577500 and "memobrick-theme-updated-1" 167017840860; the 2021 "Copy of Copy of Copy of xx" is still there), I rechecked the live theme (still "Memobrick fixes" 188683092188, updatedAt 2026-10-14T07:17:21Z, same four checksums) and duplicated it as **"Memobrick calm home", id 188697510108**, unpublished. Pulled main: the calm-home file now also carries the EARLYHOLIDAY20 promo line (A-2026W42-036, commit 1c2cb58), md5 **d641ed44212004aaa1ab2be733f6829f**. Uploaded only that file (checksum confirmed); all 514 files of copy and live compared, only this one differs.
- **Preview tested** at 390x844, 360x740 and 1440x900 (`tools/calm-home-test.mjs preview <dir> 188697510108`, Shopify's cookie banner declined first): button y = 383 with "Kits from $35", proof link y = 477 to 521 fully on the first screen and tappable (opens the free-proof view), dots y = 537 to 551, 2 red buttons, no floating bar, no sideways scroll, promo strip reads EARLYHOLIDAY20, main button opens the editor's upload view on both phones; desktop positions and height identical to live. Preview link: https://mymemobrick.com/?preview_theme_id=188697510108. Screenshots `2026-10-14-calm-phone-home/preview-*.jpg`.

## Proposed for approval

### P-site-developer-20261014-3
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/calm-phone-home.md
- Reason: If approved (and Eden removes one old theme), I make the private copy "Memobrick calm home" with this one-file phone home change, retest it and send the preview link, then Eden publishes it with one click (or pastes the file); phone visitors get one main button with the free-proof link right under it and nothing covering them.
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown
- Theme limit: resolved. Eden removed three old themes; the copy 188697510108 exists. Remaining owner steps: look at the preview, approve P-site-developer-20261014-3, publish "Memobrick calm home" with one click (undo: publish "Memobrick fixes" again).
- **Omnisend teaser (Eden, app setting):** Omnisend > Forms > "Exit-Intent 10% Welcome (gentle)" > Teaser: show it only after the visitor closed the pop-up (now "Always"), font 13 px (now 15), padding 6/12 px (now 10/16), keep bottom-left. This keeps the pill off the first screen and makes it smaller.
- **Shopify Inbox chat (Eden, app embed):** Online Store > Themes > live theme > Customize > App embeds > Shopify Inbox: Button text to the icon-only option (now "Chat with us"), Position bottom right, Save. Do it after publishing the calm copy, or before I make it, so the setting is not lost.
- **Offer check (Eden or coordinator):** the home page's first line says "Order early & save 20% with code EARLYBIRD20". The code is active in Shopify, but `offers-calendar.md` lists only EARLYHOLIDAY20 as active, and the Omnisend pop-up promises 20% while its name and tag say 10%. I did not change any offer text; please confirm which code and percentage the site should show.
- Test limits: this sandbox cannot reach cdn.shopify.com or the apps' servers and its Chromium cannot play H.264, so the hero shows its poster image, review photos are blank, and the two bubbles are shown as grey placeholders at their configured spots. The editor page sends this test browser to Shopify's bot check (shop.app) before and after the change.
- Other floating app embeds turned on (Google & YouTube store widget bottom-left, BixGrow widget, UpPromote message bar, Vitals) could not be seen here; if Eden sees another bubble, its App embeds toggle turns it off.

## Sales impact
The free-proof link moves from 1.7 screens down to the first screen, right under the button: free-proof sales are 4 against 67 last year, and this is the top entry to that offer on the most visited page. The phone home page adds to cart at 6.6% against 12.5% last year; one clear action on a calmer screen with nothing covering it should help. Trade-off: the floating button bar goes away on phones; if phone home-to-editor clicks drop more than 10% in 14 days it comes back in a smaller form. Follow-up for the five fixes that went live today starts now (referred sessions only, baselines in each draft), first reading in 7 days.

## Next run
If Eden freed a theme slot: recheck live id, updatedAt and the live md5 of `sections/memobrick-site.liquid`, duplicate the live theme as "Memobrick calm home", upsert the file from commit 2b1bd9f (md5 883ec9b9...), compare the copy with live, rerun the tests on the preview with `node tools/calm-home-test.mjs after <dir> <new id>` and send the preview link. Run `verify-bundle.mjs live` and `prodesign-size.mjs live` for the five fixes now live and save after-screenshots.

## Second run (kept as written; the owner then published "Memobrick fixes")

### Second run: Summary
Five approved fixes (A-2026W42-009, -010, -013, -021, -022) are backed up, built and tested together in the private copy, but none is live: the Shopify connector refuses every write to the live theme.
The owner can put them live in about 10 minutes (paste 4 files) or with one click (publish the tested copy): `marketing/conversion/site-developer/fixes/live-apply-2026-10-14.md`.

### Second run: Done
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

### Second run: Proposed for approval
None. All five fixes are already approved; only the owner's paste or publish is missing.

### Second run: Blocked or unknown
- **Owner, needed to go live:** the connector blocks writes to the live theme, so I cannot do it. Pick one:
  1. Paste 4 files in Edit code (links and checksums are in `fixes/live-apply-2026-10-14.md`; start with `assets/memobrick.js`).
  2. Publish the "Memobrick fixes" theme. It is identical to live apart from the four fixed files. Afterwards, check one GemPages page. To undo, publish v27 again.
  
  Then tell me, and I will check the checksums and run the live phone and desktop check. Items 009 and 010 expire 2026-10-19, and 021 and 022 on 2026-10-21.
- Still open from this morning: compare the cart's quoted rates with checkout for the same address (owner, 2 minutes, no payment). Also confirm whether the $125 free-shipping discount covers Alaska, Hawaii and Puerto Rico.
- Shopify's cookie banner covers part of the sandbox screenshots. The measurements come from the page itself.

### Second run: Sales impact
Nothing has changed for customers yet. Once live, the five fixes target the biggest site losses found in the 2026-10-12 audit:
- phone home page (add to cart 6.6% vs 12.5% last year)
- pop-ups and keyboard after upload (phone add to cart 4.8% vs 7.9%)
- desktop editor (5.1% vs 8.0%)
- shipping cost not shown until checkout (checkout completion 26%)
- Pro Design visitors having to pick their size again (designer orders 3 vs 67 last year)

Combined estimates from Wilson's audit are about 17 to 40 more orders per 30 days. The sooner they go live, the more of the pre-Christmas traffic they reach.

### Second run: Next run
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
