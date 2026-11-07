# site-developer 2026-11-07

## Summary
MAIN is still "Memobrick fixes" 189310075100; "Memobrick proof and cart fixes" 189322330332 is still unpublished, so approved A-2026W44-018 and -019 cannot be applied or checked live.
No new fix built: the store is at 20 of 20 themes, so there is no slot for a working copy.

## Done
- Approvals: A-2026W44-018 (expires 2026-11-15) and A-2026W44-019 (expires 2026-11-30) are approved, unexpired, unchanged. Both are already built and tested in 189322330332. No live write made: that theme is not MAIN and I may not publish.
- Theme list re-read from Shopify: nothing changed since 2026-11-05.
- Task board task: Wilson's file `marketing/conversion/auditor/site-changes/desktop-editor-focus-header.md` exists but is a draft, not a tested fix (no theme copy, no preview, no Executor-ready code). I did not propose it, because I cannot build and test it without a free theme slot. Waiting on a free slot; I will build and queue it right after (expected effect small: about 3 desktop sessions a day).
- Live read-only check (phone 390x844 and desktop 1440x900; home, /pages/editor, /pages/free-preview, /collections/all, /cart): all return 200, no horizontal overflow, headline and proof text present, Dec 15 text on the home page, cart opens. On phone the first create button on the home page sits at y=383 (above the fold). Console errors seen were only blocked third-party scripts (Shop pay loader, TikTok pixel) from this sandbox's network. /pages/dog-memobrick returns 404: I guessed that address; the dog page's real address is not in my notes, so it was not checked. Defects found: none.

## Proposed for approval
None

## Blocked or unknown
- Eden: publish "Memobrick proof and cart fixes" 189322330332 (Online Store > Themes > Publish). Undo: republish "Memobrick fixes" 189310075100. 018 expires 2026-11-15.
- Eden: delete old unpublished copies to free slots (list in the 2026-11-03 report: v22, v23, v25, v26, "Copy of ..." themes, mobile-bg-fix-22/25/26, updated-33, Tinker). Do not delete "AVADA Assets - DO NOT REMOVE". Needed for the desktop editor header change and the Dec 15 bar (A-2026W44-050).
- Funnel follow-up needs referred-session data, not available in this run.
- Dog page address for future live checks: unknown to me.

## Sales impact
None today. 018 targets draft orders (largest lost-order cause) and 019 catches photo-less kits, but both only help once Eden publishes the theme copy. Drop nothing; the one click is the whole gain.

## Next run
Check whether 189322330332 is live and verify its files by checksum, run the live phone and desktop check, then build the desktop editor header fix once a slot is free.
