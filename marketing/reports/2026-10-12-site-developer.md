# site-developer 2026-10-12

## Summary

First run. I made the private working theme "Memobrick fixes" (id 188594847964). In it I built and tested the two fixes likely to win back the most orders: fewer pop-ups and no keyboard after a photo upload, and a button with a price on the first phone screen of the home page.
Both work on phone and desktop in the preview, and Finish Editing still adds to the cart. Both are proposed below. Nothing on the live site changed.

## Done

- Approvals: `check.py approvals --agent site-developer` printed nothing, so there was nothing to apply.
- Working theme: duplicated the live theme memobrick-theme-v25 (188263596252) as "Memobrick fixes", **188594847964**, unpublished. Preview: https://mymemobrick.com/?preview_theme_id=188594847964. Recorded in `marketing/conversion/site-developer/working-theme.md`.
- Read the current files from the live theme. The repo theme folders are out of date (different checksums for all three files I checked), so all the work is based on the live files.
- **Fix 1, pop-ups after upload (backlog item 1).** Both pop-ups are theme code (`#designChoice` in `assets/memobrick.js` and `assets/memobrick-email-gate.js`, switched on in Theme settings), not an app, so the theme can fix them. Changed `assets/memobrick-email-gate.js`: (a) on phones and tablets the email box no longer grabs focus, so the keyboard stays closed; (b) Wilson's A/B test CA-20261012-01 is built: arm B gets no email pop-up after upload, only the calm slide-in card later, and the arm is written to the cart as `ab_email_gate`; (c) the slide-in's "Save my design" button now fits inside the card on a 390 px phone. Tested arms A and B on phone and desktop, plus the arm B slide-in. Draft: `marketing/conversion/site-developer/fixes/email-gate-ab-no-keyboard.md`.
- **Fix 2, phone home page (backlog item 2).** Changed `sections/memobrick-site.liquid`: under the headline, on screens up to 900 px, there is now a "Create My MemoBrick" button and the line "See your photo in bricks in seconds. Kits from $35." The price is read live from Shopify (10×10 kit). The button moved from y = 1,072 to y = 403 on a 390×844 phone (y = 394 on 360×740). Desktop is unchanged. Wilson's CSS would not have worked, because the phone hero orders its children with CSS `order`, so the fix uses `order: 2`. Draft: `marketing/conversion/site-developer/fixes/home-phone-cta-above-fold.md`.
- Screenshots (JPEG, 21 to 48 KB each): `marketing/conversion/site-developer/2026-10-12-email-gate-ab-no-keyboard/` and `marketing/conversion/site-developer/2026-10-12-home-phone-cta-above-fold/`.
- Exact new files: `marketing/conversion/site-developer/theme-files/<slug>/`. Each checksum in the working theme matches the committed file.
- Test traffic: about 20 preview sessions, about 10 of them with one 20×20 kit in the cart (generated flower image). No email entered, no checkout opened, nothing paid or ordered.

## Proposed for approval

### P-site-developer-20261012-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/email-gate-ab-no-keyboard.md
- Reason: If approved, site-developer saves a backup and puts the tested email pop-up change on the live theme (the owner may need to paste one file). Phones stop opening the keyboard over the design, and A/B test CA-20261012-01 starts in time to finish before Black Friday.
- Expires: 2026-10-19
- Status: pending

### P-site-developer-20261012-2
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/home-phone-cta-above-fold.md
- Reason: If approved, site-developer saves a backup and puts the tested home page change on the live theme (the owner may need to paste 17 lines). Phone visitors then see "Create My MemoBrick" and "Kits from $35" without scrolling.
- Expires: 2026-10-19
- Status: pending

## Blocked or unknown

- **Live theme writes are refused by the Shopify connector.** Its `graphql_mutation` tool says theme file writes are allowed on unpublished themes only. I did not try a live write, because nothing is approved. Once an item is approved, I will save the backup and try `themeFilesUpsert` on the live theme. If the connector refuses it, the owner's manual steps are in each draft under "How it will be applied": Shopify admin, Online Store, Themes, live theme "..." menu, Edit code, open the named file, paste, Save. I then check the live store on phone and desktop. Never publish "Memobrick fixes" as a shortcut: it is a copy from 2026-10-04 and would undo any later live edits.
- **Wilson's drafts for these two fixes name seo-technical as Executor** (`marketing/conversion/auditor/site-changes/email-gate-defer-ab-test.md`, `home-phone-cta-above-fold.md`). My drafts replace them with tested code. Coordinator: please queue only the site-developer items, so the same change is not applied twice.
- **"EARLYBIRD20" is advertised on the live home page** ("Order early & save 20% with code EARLYBIRD20 at checkout") but is not active in `marketing/shared/offers-calendar.md`. Owner: if the code no longer works, the strip promises a discount people cannot get at checkout. If it does work, add it to the offers calendar. On phones the strip also takes about 100 px of the first screen. I did not change it, because offers are the owner's decision.
- Real-phone check: the headless browser cannot show a real keyboard, so I tested whether the email box takes focus when the sheet opens. One tap test on a real iPhone after release would confirm it.
- This sandbox gets Shopify's cookie consent banner (declined in the tests) and cannot reach cdn.shopify.com, shop.app and some pixels. Timings for real visitors may be slightly slower.

## Sales impact

Both fixes target the biggest weak point in the site funnel: phone visit to add to cart (4.8% against 7.9% last year, last 7 days). Fix 1 removes the keyboard and one pop-up between upload and designing. Wilson's estimate is about 10 to 20 orders per 30 days. Fix 2 puts the button and a starting price in front of about 830 real phone home visitors a month. Wilson's estimate is about 5 to 15 orders per 30 days. Neither earns anything until it is live, so approval this week matters: the A/B test needs its weeks before 2026-11-16.

## Next run

- Apply whichever of the two is approved (backup first), then check the live store on phone and desktop.
- Build the next fixes in "Memobrick fixes": the desktop editor's sticky price and Finish bar (backlog 3), then the cart (backlog 4: customer's design instead of the stock photo, hide raw internal fields, no "No (Build at home)"), then the shipping note before checkout (backlog 5, rates read from Shopify delivery profiles).
- Check whether the live theme changed since 2026-10-04. If it did, recreate the working copy.
