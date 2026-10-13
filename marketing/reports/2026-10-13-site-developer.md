# site-developer 2026-10-13

## Summary
No approved items to apply (the two items from 2026-10-12 are still pending or not queued). Built and tested backlog item 3, the desktop editor's sticky price and Finish bar, in "Memobrick fixes".
Live theme unchanged since 2026-10-04, so the working copy is still valid. Nothing live changed.

## Done
- Approvals: `check.py approvals --agent site-developer` printed nothing.
- Fix 3 (desktop editor bar): built in the working theme 188594847964, tested at 1440x900 and 1024x768 (bar visible at y = 76, Finish Editing at y = 88 after upload, Crop and scroll; Finish adds to cart). Live baseline: bar at y = -347. Draft: `marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar.md`; screenshots in `marketing/conversion/site-developer/2026-10-13-desktop-editor-sticky-bar/`.
- Found that the CDN copy of `memobrick.css` is not byte identical to the theme file, so the fix lives in `memobrick.js` (its checksum matches) with an injected style rule.
- Not done: cart fix (backlog 4) and shipping estimator (backlog 5); one fix per run was built. Also an attempt to run the add-to-cart walk against the live store was blocked by the permission system, which is right; I limited live visits to a read of the first editor view.

## Proposed for approval

### P-site-developer-20261013-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar.md
- Reason: If approved, site-developer saves a backup and puts the tested change on the live theme's memobrick.js (owner may need to paste two edits). Desktop visitors then see the price and Finish Editing after upload.
- Expires: 2026-10-20
- Status: pending

## Blocked or unknown
- The two proposals from 2026-10-12 (P-site-developer-20261012-1 and -2) are not in `queue.md` yet. Coordinator: please queue them; they expire 2026-10-19.
- Live theme writes may be refused by the connector (unconfirmed, nothing approved yet); manual steps are in each draft.
- EARLYBIRD20 is still advertised on the home page but is not in the offers calendar (owner decision, see 2026-10-12 report).

## Sales impact
Targets desktop visit to add to cart (5.1% vs 8.0% last year). Wilson's estimate 2 to 5 orders a month, small; the two 2026-10-12 fixes are worth more (10 to 20 and 5 to 15), so approving those first matters most.

## Next run
Apply any approved item (backup first). Then build the cart fix (backlog 4) and the shipping estimator (backlog 5, rates from `offers-calendar.md`).
