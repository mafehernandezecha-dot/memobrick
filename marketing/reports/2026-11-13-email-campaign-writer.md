# email-campaign-writer 2026-11-13

## Summary
- No approved items, so nothing was created in Omnisend. A-2026W46-006 (Nov 16 email) is still pending and ready to build.
- Task board checks done: the Nov 19 VIP and Nov 20 "EARLYHOLIDAY20 Ends Sunday" campaigns are both still scheduled, unchanged.
- Line for Betty: "A-2026W46-006 needs approval by Sat Nov 14 18:00."

## Done
- Approvals: `check.py approvals --agent email-campaign-writer --today 2026-11-13` printed nothing. Pending for me: A-2026W46-006 (Nov 16, expires Nov 15), A-2026W44-061 (Nov 19 VIP wording, expires Nov 18), A-2026W45-010 or A-2026W46-005 (Nov 25 or Nov 24, pick one), A-2026W45-011 (Cyber Monday, expires Nov 29).
- Task board 1 (done, read-only Omnisend `get_campaigns`):
  - Nov 19 "Q4 | Nov 19 | VIP Early Access 20% (Past Buyers)", 6ab3af384dae2e28118748b8: scheduled, Thu Nov 19 11:00 ET (16:00 UTC). Segment Past Buyers 6ab3a04c426f40d1edc2e690, excludes Unengaged 180d 6ab3a050426f40d1edc2e691. Last edited Sep 24.
  - Nov 20 "Q4 | Nov 20 | EARLYHOLIDAY20 Ends Sunday (Warm)", 6ae55a1aead775b0ac41ecc5: scheduled, Fri Nov 20 10:00 ET (15:00 UTC). Segment Warm 6ab3a047d52351bd34134eb5, excludes Past Buyers, recent buyers 6ab4c0626a51901673723534 and Unengaged 180d. Last edited Oct 31.
- Task board 2 (done): line for Betty below.
- Nov 16 draft re-checked: unchanged since approval commit 4300178; hero image and UTM gift collection link return 200.
- Rest of the schedule unchanged (Nov 27, Nov 30, Dec 3, 8, 11, 14). Nothing sent since Nov 3, so no new performance numbers.
- Updated `marketing/email/campaign-writer/holiday-plan-2026.md` (Update 2026-11-13).
- No new draft: Nov 16 to 22 is covered by the pending Nov 16 draft, Nov 19 VIP and Nov 20; the task board allows no new proposal today.

## Proposed for approval
None. A-2026W46-006 is already in the queue.

Line for Betty: "A-2026W46-006 needs approval by Sat Nov 14 18:00."

## Blocked or unknown
- Owner decision on A-2026W46-006. Without it, Warm gets no email from Nov 3 until Nov 20.
- Small fix in pending A-2026W44-061: `improve-nov19-vip.md` gives the send as 12:00 ET; it is 11:00 ET (16:00 UTC, after DST ended). Left unedited so the item stays approvable; I will use the live 11:00 ET time if it is approved.
- The Nov 19 VIP excludes only Unengaged 180d, not the recent-buyers segment. Owner's campaign, not changed.
- Warm segment size is not returned by the Omnisend API.

## Sales impact
Weak point "This week needs 24 more orders in 4 days, goal 12 a day from Monday" names me. This run adds no orders by itself; it confirms nothing blocks the Nov 16 send. That send (about 5,000 Warm contacts, Dec 15 deadline, EARLYHOLIDAY20 with one week left, gift collection landing) is the one email that can add orders on the first 12-a-day day, if approved by Sat Nov 14 18:00.

## Next run
Sat Nov 14 and Sun Nov 15: if A-2026W46-006 is approved, create and schedule it for Mon Nov 16 10:00 ET the same run. Tue Nov 17: report Nov 16 results if sent, apply A-2026W44-061 if approved. Draft the Dec 15 order-by-day and Dec 16 gift card emails by Dec 8 and 9.
