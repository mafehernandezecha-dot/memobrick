# email-campaign-writer 2026-11-11

## Summary
- Nothing is scheduled to Warm between Nov 3 and Nov 20, so I drafted a short "Order by Dec 15" email for Mon Nov 16 with one button to the gift collection, and proposed it.
- No approved items, so nothing was created or scheduled in Omnisend. The Nov 12 dog email (A-2026W44-060) expires today, still pending.
- The preview tool works again: Nov 16 and Nov 24 drafts now both have desktop and phone previews.

## Done
- Approvals check: no approved items for email-campaign-writer. Pending: A-2026W44-060 (Nov 12, expires today), A-2026W44-061 (Nov 19 VIP edit, expires Nov 18), A-2026W45-010 / A-2026W46-005 (Nov 25 or Nov 24, pick one), A-2026W45-011 (Cyber Monday edit, expires Nov 29).
- Omnisend `get_campaigns` read: schedule unchanged since Nov 10. Nothing sent since Nov 3, so there are no new performance numbers.
- Task board: my row is for my next run (Tue Nov 17). I did the part that brings orders sooner today: the Nov 16 to 18 Warm slot is empty, so the "order by Dec 15, gift collection" email is now drafted and proposed for Mon Nov 16. That gives the owner 4 days to decide instead of 1.
- Draft `marketing/email/campaign-writer/2026-11-16-order-by-dec-15-gift.md`: three concepts, three subjects, real store hero image (200), navy date band, three steps, optional free proof, one button to `/collections/the-gift-for-everyone` (200) with UTM `2026-11-order-by-dec-15-gift`, EARLYHOLIDAY20 until Nov 22 only, Dec 15 only. Blog links from the Nov 10 version were removed so there is one action. check.py copy passes. Previews rendered and reviewed (desktop and phone), revised once (repeated "two dates" subline replaced).
- Rendered the missing Nov 24 previews (`2026-11-24-take-the-photo-at-the-table-preview.png`, `-preview-phone.png`) without changing the draft, so A-2026W46-005 keeps its commit.
- Updated `holiday-plan-2026.md`.

## Proposed for approval

### P-email-campaign-writer-20261111-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-11-16-order-by-dec-15-gift.md
- Reason: Creates and schedules the Omnisend campaign "Q4 | Nov 16 | Order By Dec 15 Gift Collection (Warm)" for Mon Nov 16, 10:00 ET, to Warm minus Past Buyers, recent buyers and Unengaged 180d; EARLYHOLIDAY20 only, one button to the gift collection. Fills the empty Nov 4 to 19 Warm gap on day one of the 12-orders-a-day goal.
- Expires: 2026-11-15
- Status: pending

## Blocked or unknown
- Owner decisions: no email decision recorded since Nov 2. Without one, no new email reaches Warm until Nov 20.
- Preview rendering needs `CHROME=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` and python3.12 here.
- The live site returned 429 once (rate limit). It returned 200 on retry.

## Sales impact
Weak point "Daily goal missed" names me. Warm has had no email since Nov 3. Last year Nov 12 to 17 averaged about 15 orders a day, and real deadline emails were the best performers (about $0.064 per sent). One Nov 16 send to about 5,000 Warm contacts at the Oct 20 rate (0.019% orders per delivered) would bring about 1 order. At the "Final Hours" rate it would bring 3 or more. It lands on the gift collection, which converts best (7 of 40 referred purchasing sessions). It does nothing unless the owner approves it by Nov 15.

## Next run
Tue Nov 17: create any approved sends (Nov 16 if approved by then would already be past, so check by Nov 15 on a daily run), say in one line whether A-2026W44-061 and the Nov 24/25 pair were decided, report the Nov 12 or Nov 16 results if sent, and draft the Dec 15 and Dec 16 gift card emails by Dec 8 and 9.
