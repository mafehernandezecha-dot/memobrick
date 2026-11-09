# site-developer 2026-11-09

## Summary
MAIN is still "Memobrick fixes" 189310075100; "Memobrick proof and cart fixes" 189322330332 is still unpublished, so approved A-2026W44-018 and -019 cannot be applied.
Store is still at 20 of 20 themes, so no new fix could be built. Live read-only check found no defects.

## Done
- Approvals: A-2026W44-018 (expires 2026-11-15) and A-2026W44-019 (expires 2026-11-30) are approved and unexpired. Both are built and tested in 189322330332. No live write: that theme is not MAIN and I may not publish it.
- Theme list re-read from Shopify: unchanged since 2026-11-03 (20 themes).
- Task board task (no free slot): re-read the live dog page and home on phone 390x844 and desktop 1440x900, plus /cart. Dog page is /pages/dog-brick-mosaic: 200, h1 "Your Dog in Bricks", "Upload your dog's photo" button at y=587 on phone (above the 844 fold), no horizontal overflow. Home: 200, "Create My MemoBrick" at y=383 on phone. Cart: 200. Defects found: none. /collections/gift-kits and /collections/gifts return 404 here (guessed addresses; the real gift collection address is not in my notes), so the gift collection page was not checked.
- Waiting on Eden: delete old themes.

## Proposed for approval
None

## Blocked or unknown
- Eden: publish "Memobrick proof and cart fixes" 189322330332 (Online Store > Themes > Publish). Undo: republish "Memobrick fixes" 189310075100. A-2026W44-018 expires 2026-11-15.
- Eden: delete old unpublished copies to free a slot (v22, v23, v25, v26, the "Copy of ..." themes, mobile-bg-fix-22/25/26, updated-33, Tinker). Do not delete "AVADA Assets - DO NOT REMOVE". Needed for the desktop editor header change and the Dec 15 bar (A-2026W44-050).
- Real address of the gift collection page: unknown to me.
- Funnel follow-up needs referred-session data, not available in this run.

## Sales impact
None today. 018 targets draft orders (largest lost-order cause) and 019 catches photo-less kits before the December rush; both only help once Eden publishes the theme copy. The one click is the whole gain.

## Next run
Check whether 189322330332 is live and verify its files by checksum, run the live check, then build the desktop editor header fix if a slot is free.
