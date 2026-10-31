# email-campaign-writer 2026-10-30

## Summary

Both approved Omnisend items are done and verified: Black Friday email now sells BRICKFRIDAY25 at 25% (A-2026W44-014), and the Nov 20 "EARLYHOLIDAY20 ends Sunday" campaign is scheduled (A-2026W44-015). Omnisend connected fine.
New: Nov 12 dog email drafted, and a wording fix for the Nov 19 VIP email. The "UNUSED" booster did send on Oct 27 (17 unsubscribes).

## Done

- Task board task 1: done. The earlier "not done" had no connection error this run.
- A-2026W44-014: campaign 6ab3af11a46e779522c64477 restored to draft, content 6ab3af11da0f3ee429c3d923 replaced (20% banners removed, public code box BRICKFRIDAY25, button to the gift collection with UTM, "Ends Sunday, Nov 29 at midnight ET", intro and footer as in the draft), subject "Black Friday: 25% off, code inside", preheader "Use BRICKFRIDAY25 through Sunday night.", sent for Nov 27 14:00 UTC. Read back: status scheduled, same audience. Size prices re-checked against live products.json today (unchanged). Not in the draft: I also set footer side padding to 24px (the old footer had 0 and relied on text padding); campaign name left as is, still says "20%".
- A-2026W44-015: no existing campaign with that name. Created by copying the sent Oct 29 campaign (so header and footer match), replaced its content with the draft's HTML (hero, pair using the Omnisend-hosted dog images from Oct 29, steps, button with UTM), set name, subject "EARLYHOLIDAY20 ends Sunday night", the draft's preheader, audience Warm minus Past Buyers, recent buyers and Unengaged 180d, scheduled Nov 20 15:00 UTC. Campaign ID 6ae55a1aead775b0ac41ecc5, status scheduled (confirmed in the scheduled list). Note: I did not re-check in Shopify that EARLYHOLIDAY20 still ends Nov 22; the offers calendar says so.
- Sent results for Oct 27 and Oct 29 added to `marketing/email/campaign-writer/performance-2026-10.md`.
- Scheduled campaigns reviewed: Nov 19 VIP, Dec 3, Dec 8 read; Dec 11 and Dec 14 not read. Findings in `improve-nov19-vip.md`.
- Holiday plan updated.
- Nov 12 draft `2026-11-12-your-dog-in-bricks.md` with desktop and phone previews checked, Omnisend HTML, copy check passed.

## Proposed for approval

### P-email-campaign-writer-20261030-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-11-12-your-dog-in-bricks.md
- Reason: Creates and schedules a new Omnisend campaign "Q4 | Nov 12 | Your Dog In Bricks (Warm)" for Thu Nov 12, 10:00 ET, to Warm minus Past Buyers, recent buyers and Unengaged 180d, one button to the live dog page; fills the Nov 4 to 18 gap.
- Expires: 2026-11-11
- Status: pending

### P-email-campaign-writer-20261030-2
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-nov19-vip.md
- Reason: Edits the scheduled Nov 19 "VIP Early Access" campaign (6ab3af384dae2e28118748b8) so it stops saying "Black Friday price a week early, 20% off everything" (Black Friday is 25%, and 20% is already public until Nov 22). Wording only, same personal code.
- Expires: 2026-11-18
- Status: pending

## Blocked or unknown

- Dec 11 and Dec 14 campaign content not read. Dec 3 and Dec 8 contain unverifiable claims (see improve-nov19-vip.md notes).
- The Nov 12 draft leaves out the three Christmas articles on purpose (one destination rule); say if you want them in a P.S.
- Gift card email after Dec 15 not drafted.
- Offer Nov 27 internal name still says 20%; changing it needs your OK.

## Sales impact

Protects the biggest send of the year (Nov 27, Warm list) by advertising the owner's 25% offer; creates the Nov 20 deadline email, the best lever on record (about $0.064 per sent last year). The Nov 12 draft adds one pet-angle send in the empty Nov 4 to 18 window, tied to the dog page also used by the Meta ad; target at least 2 orders. October weak point: orders below the daily goal (5), and Oct 27 and 29 sends produced only 1 order from about 8,000 sends.

## Next run

- Read Dec 11 and Dec 14 content; propose fixes if needed.
- Report the Nov 3 send.
- Draft a gift card email for after Dec 15.
