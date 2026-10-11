# DRY RUN: outreach-gift-guide-pr 2026-10-11

## Summary
Researched 15 gift guide targets and wrote 15 pitches (all under 120 words, all pass the copy check).
5 targets have a public contact route; 10 are "unknown" and need an editor contact found before sending.
Dry run: no Gmail drafts, no emails, no form submissions, no contacts-log rows, no git.

## Done
- Loaded memobrick-brand; read contacts-log.md (empty, so no 30-day conflicts) and offers-calendar.md (Christmas order-by date and Miami fulfillment claim are both unknown, so pitches state no dates and no Florida angle).
- Wrote `marketing/outreach/gift-guide-pr/targets-2026-10-11.md` (15 targets, plus skipped outlets and why).
- Wrote 15 pitches in `marketing/outreach/gift-guide-pr/pitches/`.
- Ran `python3 marketing/tools/check.py copy` on each pitch: all 15 pass.
- Approvals step skipped (dry run). Gmail sent-mail search skipped (dry run; no earlier drafts exist in the log).

## Proposed for approval
The block format below is what a live run would propose. In this dry run nothing is submitted.

### P-outreach-gift-guide-pr-20261011-1
- Agent: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/emily-reviews-2026.md
- Reason: Open 2026 holiday guide on product exchange, wants pitches by Nov 15; email EmilyReviewsCom@gmail.com listed on the call page
- Expires: 2026-10-21
- Status: pending

### P-outreach-gift-guide-pr-20261011-2
- Agent: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/shescribes-2026.md
- Reason: Open 2026 guide; pitch asks only for the free review option (no $25 listing fee); Kimberly@SheScribes.com listed on page
- Expires: 2026-10-21
- Status: pending

### P-outreach-gift-guide-pr-20261011-3
- Agent: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/love-tabitha-2026.md
- Reason: Submissions open; kids and families guide already features a brick set; route is the submission page (method to confirm)
- Expires: 2026-10-21
- Status: pending

### P-outreach-gift-guide-pr-20261011-4
- Agent: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Reason: Couples gift roundup; contact page lists general inquiries to Jen (address must be copied from the page)
- Expires: 2026-10-21
- Status: pending

### P-outreach-gift-guide-pr-20261011-5
- Agent: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/frugal-ginger.md
- Reason: Free sample-based family guides; email on the 2025 submissions page, 2026 call not yet posted
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown
- WebFetch failed with a DNS error on every site, and a curl check was denied. All facts (bylines, dates, emails) come from search-result summaries, not pages I opened. Confirm each address and byline on the live page before sending.
- The search tool refuses goodhousekeeping.com, brides.com, parents.com, people.com, realsimple.com, oprahdaily.com, thespruce.com, so major glossy guides were not researched.
- 10 targets have no public contact route found (CNN Underscored x3, Shop TODAY x2, NCOA, Catster, iHeartDogs, Yahoo Shopping, Mommy's Block Party). Not proposed.
- Exact addresses for Love, Tabitha, The Frugal Ginger, and Green Wedding Shoes were not captured (obfuscated or not in search text).
- Mommy's Block Party and SheScribes offer paid placements. Pitches offer samples only; the owner should not pay.
- Unknown and not stated in any pitch: kit price, Christmas order-by date, fulfillment location, sample kit availability and capacity, US shipping coverage. The owner should confirm sample kits can be produced before approving.
- Pitches sign off as "The Memobrick team" because no owner name or pitch email is listed in the repo.

## Next run
- Find editor contacts for the 10 "unknown" targets (CNN Underscored and Shop TODAY first).
- Check whether The Frugal Ginger posts a 2026 call.
- Search Gmail sent mail for any approved pitches and log them.
- Research 15 new targets, including grandparents, couples, and pet guides from outlets that were blocked this run.
