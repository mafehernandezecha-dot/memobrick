# email-campaign-writer 2026-10-27

## Summary

Reviewed all Omnisend campaigns. Found two conflicts with approved offers: the Nov 27 Black Friday email still sells 20% (owner approved BRICKFRIDAY25, 25%), and an old "UNUSED" booster is still scheduled to send today 11:07 ET. Drafted a Nov 20 "code ends Sunday" email for the gap.
Oct 13, 14 and 20 results added to `performance-2026-10.md`: 3 orders and $518.71 across 22,738 delivered; the Oct 14 send to Unengaged 180d failed on 31% of sends.

## Done

- No approved items for this agent (checker printed none).
- Omnisend reviewed read-only. Scheduled: Oct 27 Reminder (11:00 ET), Oct 29 Who Else (10:00), Nov 3, Nov 19, Nov 27, Nov 30, Dec 3, 8, 11, 14. Holiday plan updated.
- Performance report written (Oct 13: 0 orders; Oct 14: 2 orders, $387.16, $0.031 per recipient; Oct 20: 1 order, $131.55, $0.025 per recipient).
- Drafted `marketing/email/campaign-writer/2026-11-20-code-ends-sunday.md` with previews (desktop and phone checked against the self-critique list), subject "EARLYHOLIDAY20 ends Sunday night", Warm audience, Fri Nov 20 10:00 ET. Copy check passes.
- Improvement files: `improve-nov27-black-friday.md`, `improve-cancel-oct27-booster.md`. They are plain before/after tables with no email body, so no preview was generated.
- Tool notes: `email_preview.py` fails on Python 3.11 (f-string syntax); I ran it with python3.12 and the headless shell (`CHROME=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`).

## Proposed for approval

### P-email-campaign-writer-20261027-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-cancel-oct27-booster.md
- Reason: Cancels the scheduled booster "UNUSED - old booster" (6ab3ae904dae2e28118748a6) that would resend the Oct 20 email today at 11:07 ET to the same people who get the Oct 27 Reminder.
- Expires: 2026-10-27
- Status: pending

### P-email-campaign-writer-20261027-2
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-nov27-black-friday.md
- Reason: Edits the scheduled "Q4 | Nov 27 | Black Friday 20% (Warm)" campaign (6ab3af11a46e779522c64477) to sell BRICKFRIDAY25 at 25% through Sunday Nov 29, replacing the 20% personal code and the two images with 20% printed in them.
- Expires: 2026-11-25
- Status: pending

### P-email-campaign-writer-20261027-3
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-11-20-code-ends-sunday.md
- Reason: Creates and schedules a new Omnisend campaign "Q4 | Nov 20 | EARLYHOLIDAY20 Ends Sunday (Warm)" for Fri Nov 20, 10:00 ET, to Warm minus Past Buyers, recent buyers and Unengaged 180d, using the real Nov 22 code end date.
- Expires: 2026-11-19
- Status: pending

## Blocked or unknown

- The booster is time-critical (11:07 ET today); the approval will likely not land in time. Eden can cancel it directly in Omnisend.
- Dec 3 to Dec 14 countdown emails and the Nov 19 VIP email content were not read this run; check they do not use expired or unapproved codes.
- Exact Oct 29 recipient count still only visible in Omnisend.

## Sales impact

Addresses the October goal gap (67 orders vs 130). The Black Friday fix puts the approved 25% offer in the biggest send of the year instead of 20%. The Nov 20 email uses a real deadline, the lever behind last year's best email ($0.064 per sent). Expected: at least 3 orders from the Nov 20 send; the others protect rather than add revenue.

## Next run

- Report the Oct 27 Reminder and Oct 29 sends.
- Read the Nov 19 VIP and December campaign content for code conflicts.
- Consider a mid-November email (nothing scheduled Nov 4 to 18).
