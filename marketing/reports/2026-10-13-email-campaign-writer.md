# email-campaign-writer 2026-10-13

## Summary
No approved items to act on. The Oct 20 and Oct 27 sends offer 15% while the live public offer is 20% (EARLYHOLIDAY20); I drafted a replacement for Oct 20 and propose it.
Oct 6 and Sept 24 sends: 97 clicks, 1 order ($80.22) from about 9,900 delivered. Clicks are fine; conversion after the click is the gap.
No new campaign drafted: the Warm audience already has 4 sends in 15 days.

## Done
- Approvals check: none approved for me. A-2026W41-004 (photo tips, old version) still pending; the redesigned draft was re-proposed on Oct 12 (P-email-campaign-writer-20261012-1, pending, expires Oct 21). Not re-proposed again.
- Listed Omnisend campaigns and updated `holiday-plan-2026.md` (existing schedule recorded, Facts now verified, gaps: Dec 15 last chance and Dec 16 gift card email).
- Performance written to `marketing/email/campaign-writer/performance-2026-10.md`.
- Reviewed scheduled campaigns. Findings: Oct 20 and Oct 27 conflict with the live 20% code and carry "15%" baked into banner images and an unconfirmed "this week only / ends tomorrow"; Oct 13 (sends 11:00 ET today) has an unverified "Thousands of satisfied customers" banner. No scheduled campaign was changed.
- Wrote `improve-oct20-early-bird.md` with exact before and after, desktop and phone previews (reviewed), and Omnisend paste-in HTML. Copy check passes.
- Note: `email_preview.py` needs Python 3.12 (f-string syntax) and Pillow; I ran it with `python3.12` after installing Pillow.

## Proposed for approval
### P-email-campaign-writer-20261013-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-oct20-early-bird.md
- Reason: Edits the scheduled Omnisend campaign "Q4 | Oct 20 | Early Bird 15%" (6ab3ae8ca46e779522c6446f): restores it to draft, replaces its content with the 20% EARLYHOLIDAY20 version, and reschedules it for the same time (Tue Oct 20, 11:00 ET).
- Expires: 2026-10-19
- Status: pending

## Blocked or unknown
- EARLYHOLIDAY20 end date is unconfirmed; the proposal states none. If it ends before Oct 20, do not approve.
- Oct 27 "LAST CALL 15%" needs the same decision, and an end date, before I can propose a fix.
- Oct 13 Real Customer Builds sends today at 11:00 ET; an approval cannot arrive in time. The owner can check its banner claim directly in Omnisend.
- The upload page URL is still not recorded; buttons use the homepage with UTM.

## Sales impact
Targets the weak point "daily goal missed" in sales/latest.json. The Oct 20 send reaches about 5,000 Warm and past-buyer contacts; giving them the same 20% as the public offer, with a clear code and a December 15 deadline, should lift orders versus the 15% version. The weak point also names low traffic and draft orders, which this run does not move. Expected effect is small but real: even 0.1% orders per delivered is about 5 orders.

## Next run
Tue 2026-10-20: act on approvals (photo tips, Oct 20 edit), report Oct 13 and Oct 14 results, review Oct 27 against the owner's decision.
