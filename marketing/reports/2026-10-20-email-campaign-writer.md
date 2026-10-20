# email-campaign-writer 2026-10-20

## Summary

Drafted Eden's Christmas email to past customers, "Who else is on your list?", for Thu Oct 29 10:00 ET to the existing Past Buyers segment (9,007 subscribed buyers). Previews checked on desktop and phone. Nothing was created, sent or scheduled.
Omnisend UTMs are on. Shopify shows 281 sessions from Omnisend emails (Sep 22 to Oct 19). The "13 visits" number comes from the referrer report, which misses most email clicks.

## Done

- Draft: `marketing/email/campaign-writer/2026-10-29-who-else-on-your-list.md`, with `-preview.png`, `-preview-phone.png`, `-preview.html`, `-omnisend.html` and three cropped images (`2026-10-29-who-else-grandparents.jpg`, `-dog-photo.jpg`, `-dog-mosaic.jpg`) that the owner uploads in Omnisend when approving.
- Creative process: three concepts. Chosen: "Who else is on your list?" Subject options: "Who else is on your list this year?" (chosen), "Your next Memobrick is for someone else", "Grandma, the dog, or your sister?".
- Self-critique on both PNGs: real hero image and serif headline; family, grandparents and pet moments; one button and one destination; the phone layout stacks cleanly with readable text; every image loads, has alt text and is labeled (store photo or AI illustration); `check.py copy` passes.
- Segment (read-only): "Past Buyers - Subscribed (Q4 gifting)" `6ab3a04c426f40d1edc2e690` (email subscribed and at least 1 Shopify order) has 9,007 contacts. There is no 30-day recent-buyer segment. The 21-day one has 48 contacts. The draft says to create "Ordered in last 30 days" when the item is approved. It also excludes Unengaged 180d (17,571 contacts, but it never holds anyone who bought in the last 365 days).
- EARLYHOLIDAY20, checked in Shopify (read-only): active, no end date, 20%, applies only to these collections: Custom Bricks Portrait (`the-gift-for-everyone`), Memobrick Frame, Artist Collection, Bricks and Accessories, Newest products, Best Sellers, AVADA Best Sellers. It combines with no other discount. The copy says "custom brick portraits", not sitewide.
- Links: `/collections/the-gift-for-everyone` and `/pages/editor` both return 200. The single button goes to the gift collection with `utm_source=omnisend&utm_medium=email&utm_campaign=2026-10-past-customers-xmas`.
- UTM check (`get_campaigns_id_utm` on the Oct 13, Oct 14 and Oct 20 campaigns): tagging is on, with source `omnisend`, medium `email`, and campaign `campaign: <name> (<id>)`. In Shopify, the sessions report for Sep 22 to Oct 19 shows `omnisend / email` with 281 sessions: Website Launch 74, Real Customer Builds 67, Gift Guide 55, Re-engagement 29, flows 52. The referrer view shows only `email / gmail` with 13, because email apps usually strip the referrer and those visits land in "direct". So missing UTMs are not the problem. The weak step is after the click: those 281 sessions produced 9 add-to-carts and 0 completed checkouts in Shopify's session data, while Omnisend credited 4 campaign orders by its own attribution.
- Holiday plan updated (new gap row 6, plus notes on the expired Oct 20 item, the code's scope and the UTM finding).

## Proposed for approval

### P-email-campaign-writer-20261020-1
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-10-29-who-else-on-your-list.md
- Reason: Creates the new Omnisend campaign "Q4 | Oct 29 | Who Else Is On Your List (Past Buyers)" and schedules it for Thu Oct 29, 10:00 ET. It goes to Past Buyers - Subscribed (9,007), minus anyone who ordered in the last 30 days (a new segment is created for this) and minus Unengaged 180d. It offers EARLYHOLIDAY20 on custom brick portraits, and the owner uploads 3 images first.
- Expires: 2026-10-28
- Status: pending

## Blocked or unknown

- **The approved A-2026W42-007 expired before this run (Expires 2026-10-19), so I did not apply it.** "Q4 | Oct 20 | Early Bird 15%" (6ab3ae8ca46e779522c6446f) will send today at 11:00 ET to Warm + Past Buyers with its original 15% "this week only" copy, while the live code is 20%. If Eden wants the 20% version, she can edit the campaign in Omnisend before 11:00 ET, using `improve-oct20-early-bird-omnisend.html`, or pause it.
- "Q4 | Oct 27 | Early Bird LAST CALL 15%" goes to the same past buyers two days before this email and still says 15% and "ends tomorrow". The owner needs to decide on it, since a 20% email on Oct 29 after a "last call" for 15% looks inconsistent.
- The final recipient count after exclusions depends on overlap with Unengaged 180d. Omnisend shows it at scheduling time.
- A-2026W42-014 (photo tips) is `changes:` (new first image). It still needs revising and was outside this request.
- The three images are local files. Omnisend needs them uploaded (the draft notes say so).

## Sales impact

- This addresses the "48 orders in October vs 90 goal" weak point, which names this agent. Past buyers already trust the product, and 14.8% of customers buy again. On 9,007 contacts, matching last year's best Q4 email ($0.064 per sent) would mean about $500 to $580 and 5 to 6 orders. This fall's sends to this audience did $0.016 to $0.018 per sent, so that is the floor to beat.
- The UTM finding changes the diagnosis: email does bring visits (about 10 a day). What it fails to do is turn those visits into checkouts. That points to the landing step and the offer, not to tracking.

## Next run

- If approved: create the 30-day segment, create and schedule the campaign, set its UTM campaign tag, and record the ID and final count.
- Revise the photo tips email for A-2026W42-014 (new first image).
- Report Oct 13, Oct 14 and Oct 20 results in `performance-2026-10.md`.
