# site-developer 2026-10-15

## Summary
No new fix built: nothing is waiting in Wilson's latest audit that is not already live or proposed. Live theme is "Memobrick calm home" (188697510108, MAIN, published by Eden 2026-10-14), which carries all fixes.
Live phone and desktop check passed for A-2026W42-009, -010, -013, -021, -022 and the calm home with EARLYHOLIDAY20 (A-2026W42-036).

## Done
- `check.py approvals` printed A-2026W42-009, -021, -022, -010, -013 (all already live since Eden's publish on 2026-10-14) and "A-2026W42-036: missing commit" (not actionable by me; its content is live anyway through the calm home file). No live write by me this run; connector writes to MAIN are refused, so Eden's publishes are the route.
- Live file checksums (MAIN 188697510108): memobrick.js 88f83c4a..., memobrick-email-gate.js 851b9041..., sections/memobrick-site.liquid d641ed44... (the calm-home file with EARLYHOLIDAY20). All match the approved builds. Undo themes still present and untouched: "Memobrick fixes" 188683092188 (previous live) and v27 188646719708.
- Live check with `tools/verify-bundle.mjs live` at phone 390x844 and desktop 1440x900: phone main button at y = 383 with "Kits from $35", hidden on desktop; sticky bar style present; email gate A/B code loaded; Pro Design keeps 20 x 20; cart shows free-shipping line, "Add $90.00 more to get free shipping.", Dec 15 line and ZIP estimator; no sideways scroll. Results in `marketing/conversion/site-developer/2026-10-15-live-check/` (screenshots).
- Follow-up: one day live, too early to read. Auditor's 2026-10-14 numbers are the baseline (7-day phone add to cart 4.8%, desktop 3.7%; home landing 2.4%). First reading due 2026-10-21, referred sessions only.

## Proposed for approval
None. P-site-developer-20261014-3 (calm home) is already live because Eden published the copy; the coordinator can close it.

## Blocked or unknown
- A-2026W42-036 shows "missing commit" in the checker; coordinator should close it as live via the calm home publish.
- Still open for Eden: Omnisend teaser and Shopify Inbox bubble settings (steps in `fixes/calm-phone-home.md`); compare cart shipping quotes with checkout for one address; confirm free-shipping discount covers AK, HI, PR.
- The sandbox's playwright path in the saved tools is stale (`os/node_modules`); use /opt/node-tools/node_modules/playwright-core.

## Sales impact
Nothing new shipped today. The live fixes target phone home add to cart (2.4% of home sessions), editor pop-ups, desktop editor, cart clarity and shipping surprise. Judged at the first reading on 2026-10-21.

## Next run
Wait for the 7-day reading (2026-10-21); read Wilson's next audit for any new problem and build the top one in a fresh copy of the live theme.
