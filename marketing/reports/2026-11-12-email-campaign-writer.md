# email-campaign-writer 2026-11-12

## Summary
- Checked: nothing is scheduled to Warm from Nov 12 to Nov 19, and EARLYHOLIDAY20 is active in Shopify until Sun Nov 22 23:59 ET.
- No approved items, so nothing was created in Omnisend. The Nov 16 email (A-2026W46-006) is ready to build the moment it is approved.
- Note for Betty: "Approve A-2026W46-006 by Sat Nov 14 18:00 so it can be built for Mon Nov 16."

## Done
- Approvals: `check.py approvals` printed nothing for email-campaign-writer. A-2026W44-060 (Nov 12 dog email) expired Nov 11 undecided, so no Nov 12 send. Still pending: A-2026W46-006 (Nov 16, expires Nov 15), A-2026W44-061 (Nov 19 VIP wording fix, expires Nov 18), A-2026W45-010 or A-2026W46-005 (Nov 25 or Nov 24, pick one), A-2026W45-011 (Cyber Monday fix, expires Nov 29).
- Task board (done): Omnisend `get_campaigns` read. Nothing is scheduled to the Warm segment (6ab3a047d52351bd34134eb5) between Nov 12 and Nov 19. The only send in that window is the Nov 19 VIP Early Access to Past Buyers. The next Warm send is Fri Nov 20 10:00 ET (6ae55a1aead775b0ac41ecc5). Warm segment size: the Omnisend segments API does not return a count; last known reach is about 5,000 sends per Warm campaign (Nov 3 Gift Ideas).
- Task board (done): Shopify read-only check. EARLYHOLIDAY20 is ACTIVE, from Oct 12, ends 2026-11-22 23:59:59 ET, no usage limit, does not combine, 15 uses so far.
- Nov 16 draft re-checked: unchanged since its approval commit 4300178 (so an approval stays valid), hero image and gift collection link return 200, `check.py copy` passes.
- Sent campaigns: nothing has sent since Nov 3 (already reported in `performance-2026-10.md`), so no new performance numbers.
- No new draft: next week (Nov 16 to 22) is covered by the pending Nov 16 draft, the Nov 19 VIP and the Nov 20 campaign. A further proposal would only add another owner decision without adding a send slot.
- Updated `marketing/email/campaign-writer/holiday-plan-2026.md`.

## Proposed for approval
None. A-2026W46-006 is already in the queue.

Note for Betty: "Approve A-2026W46-006 by Sat Nov 14 18:00 so it can be built for Mon Nov 16."

## Blocked or unknown
- Owner decision on A-2026W46-006. Without it, Warm gets no email from Nov 3 to Nov 20, 17 days in the run-up to Black Friday.
- Warm segment size: not available from the Omnisend API.
- If A-2026W46-006 is approved after Nov 15, it expires and cannot be built; it would need a new proposal with a new date.

## Sales impact
Weak point "Daily goal missed" names me (Nov 1 to 10 averaged 2.6 orders a day against 5; the goal rises to 12 a day from Nov 16). This run adds no orders by itself. The one email change that brings orders this week is the Nov 16 send to about 5,000 Warm contacts with a real Dec 15 deadline and EARLYHOLIDAY20 (one week left on the code), landing on the gift collection: expected 1 order at the Oct 20 rate, 3 or more at last year's deadline-email rate. Its prerequisites (no clash on the Warm list, code active through the send) are now confirmed.

## Next run
Daily check through Nov 15: if A-2026W46-006 is approved, create and schedule it for Mon Nov 16 10:00 ET the same run. Tue Nov 17: report the Nov 16 results if sent, apply A-2026W44-061 if approved before Nov 18, and draft the Dec 15 order-by-day and Dec 16 gift card emails by Dec 8 and 9.
