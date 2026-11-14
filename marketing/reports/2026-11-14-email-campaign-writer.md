# email-campaign-writer 2026-11-14

## Summary
- No approved items, so nothing was created in Omnisend. A-2026W46-006 (Mon Nov 16 email) is still pending; approval is needed by today 18:00.
- Task board done: Nov 27 Black Friday and Nov 30 Cyber Monday are scheduled; BRICKFRIDAY25 and CYBERBRICK20 dates in Shopify match the offers calendar exactly.
- One mismatch: the Nov 30 email prints an Omnisend personal 20% code, not CYBERBRICK20 (already covered by pending A-2026W45-011).

## Done
- Approvals: `check.py approvals --agent email-campaign-writer --today 2026-11-14` printed nothing. Pending for me: A-2026W46-006 (expires Nov 15), A-2026W44-061 (expires Nov 18), A-2026W45-010 or A-2026W46-005 (pick one), A-2026W45-011 (expires Nov 29).
- Task board 1 (read-only Omnisend `get_campaigns`, `get_campaigns_id`, `get_email_content_id`):
  - Nov 27 "Q4 | Nov 27 | Black Friday 20% (Warm)", 6ab3af11a46e779522c64477: scheduled Fri Nov 27 09:00 ET (14:00 UTC). Segment Warm 6ab3a047d52351bd34134eb5, excludes Unengaged 180d 6ab3a050426f40d1edc2e691 only. Prints BRICKFRIDAY25, 25%, "Ends Sunday, Nov 29 at midnight ET". Correct.
  - Nov 30 "Q4 | Nov 30 | Cyber Monday LAST DAY 20% (replaces booster)", 6ab50397de9e4985592a5cb0: scheduled Mon Nov 30 10:00 ET (15:00 UTC). Warm, excludes Unengaged 180d and recent buyers 6ab4c0626a51901673723534. Prints an Omnisend personal 20% code ("XXXX-XXXX-XXXX", ends tonight), "20% off every size, every photo", banner "20% off every Memobrick ... through Cyber Monday". Rate and day are right; the code is not CYBERBRICK20.
- Task board 2 (read-only Shopify GraphQL):
  - BRICKFRIDAY25: SCHEDULED, 25%, Nov 27 00:00 ET to Nov 29 23:59:59 ET, no minimum, combines with nothing. Matches.
  - CYBERBRICK20: SCHEDULED, 20%, Nov 30 00:00 ET to Nov 30 23:59:59 ET, no minimum, combines with nothing. Matches.
  - EARLYHOLIDAY20: ACTIVE, ends Nov 22 23:59:59 ET. Matches.
- Lines for the coordinator:
  - "Nov 30 Cyber Monday email (6ab50397de9e4985592a5cb0) prints a personal Omnisend 20% code and 'every size, every photo', not CYBERBRICK20; fix is A-2026W45-011, expires Nov 29."
  - "A-2026W46-006 (Nov 16 email) needs approval by Sat Nov 14 18:00."
- Nov 16 draft re-checked: unchanged since commit 4300178; gift collection link returns 200.
- Updated `marketing/email/campaign-writer/holiday-plan-2026.md` (Update 2026-11-14). Nothing sent since Nov 3, so no new performance numbers.
- No new draft: the task board allows no new proposal today, and Nov 16 to 30 is covered by pending drafts and scheduled campaigns.

## Proposed for approval
None. A-2026W46-006 and A-2026W45-011 are already in the queue.

## Blocked or unknown
- Owner decision on A-2026W46-006. Without it, Warm gets no email from Nov 3 until Nov 20, across the first two days of the 12-a-day goal.
- Nov 27 email: the banner image 6a5fb5c27ecb00c4e53cf75e (alt "... Limited-time discount.") could not be viewed through the API, so I cannot confirm it prints no old percentage. Eden can glance at it in Omnisend preview.
- Nov 27 excludes only Unengaged 180d, not the recent-buyers segment; owner's campaign, not changed.
- Warm segment size is not returned by the Omnisend API.

## Sales impact
Addresses the weak point "Online Store orders run at less than half of last year" by protecting Nov 27, the biggest email day: its code and dates are confirmed correct, so no orders are lost to a failed code. The Cyber Monday code mismatch can cost orders (customers who type CYBERBRICK20 from social or the site get a different code in email, and "every size" may not match checkout) until A-2026W45-011 is decided. This run adds no new orders directly; the Nov 16 email (A-2026W46-006) is still the one email that can add orders on Monday, if approved today.

## Next run
Sun Nov 15: if A-2026W46-006 is approved, create and schedule it for Mon Nov 16 10:00 ET. Tue Nov 17: draft next week's gap check, report Nov 16 results if sent, apply A-2026W44-061 if approved. Draft the Dec 15 order-by-day and Dec 16 gift card emails by Dec 8 and 9.
