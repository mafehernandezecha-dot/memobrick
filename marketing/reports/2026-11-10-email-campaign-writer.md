## Summary
- Drafted "Take the photo at the table" for the code-free days before Black Friday (Tue Nov 24, Warm, no code, one button to the editor) and proposed it.
- A-2026W45-003 and 004 were not decided: they expired Nov 9 still pending, so nothing was sent or created today.
- Preview PNGs could not be rendered (headless Chrome hangs here, network to Google blocked); HTML files were written.

## Done
- Read sales goals, task board, queue and offers calendar; listed Omnisend campaigns (schedule unchanged, nothing between Nov 20 and Nov 27).
- Task board: wrote `marketing/email/campaign-writer/2026-11-24-take-the-photo-at-the-table.md` with 3 concepts, 2 subjects, preview text, body, UTM link to `/pages/editor` (200), Dec 15 only, no code. Made a text-free AI hero (`2026-11-24-table-hero.png`, labeled illustration, checked: 1×1 bricks only, same people in mosaic). check.py copy passes. Date note: the board said "Tue Nov 25", which is a Wednesday; I used Tue Nov 24.
- Wrote `-preview.html` and `-omnisend.html`. Updated `holiday-plan-2026.md`.
- No sent campaigns since the Nov 3 results already in `performance-2026-10.md`.

## Proposed for approval

### P-email-campaign-writer-20261110-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-11-24-take-the-photo-at-the-table.md
- Reason: Creates and schedules the Omnisend campaign "Q4 | Nov 24 | Take The Photo At The Table (Warm)" for Tue Nov 24, 10:00 ET, to Warm minus recent buyers and Unengaged 180d, no code. Fills the empty Nov 21 to 26 window. Approve this or A-2026W45-010 (Nov 25 heads-up, same list), not both.
- Expires: 2026-11-23
- Status: pending

## Blocked or unknown
- Preview PNGs missing: headless Chrome timed out (Google hosts refused by the proxy). Re-run `python3 marketing/tools/email_preview.py --phone <draft>` where Chrome works before the owner decides; the design checklist for phone width is not verified visually.
- The editor link has little conversion history (Oct 28 to Nov 3: 2 sessions, 0 carts); the draft says how to swap to the gift collection page.
- Hero PNG is 2.4 MB; compress before upload to Omnisend.

## Sales impact
Targets the four code-free days before Black Friday (Nov 24 had 30 orders last year; goal 12 a day from Nov 16). It gets Warm readers to start a design before the Nov 27 25% email. Expect few same-day orders; it will not move today's weak point (draft orders, which the owner's theme publish addresses). The bigger blocker is undecided Nov 10 sends and the pending queue.

## Next run
Nov 17: create approved sends, read Nov 19 and 20 prep, check A-2026W45-010 and P-20261110-1, report any Nov 10 or Nov 12 sends, draft Dec 15 and gift card emails by Dec 8 and 9.
