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

---

# email-campaign-writer 2026-10-20, second run (03:20 to 03:40 ET): approvals applied

## Summary

Applied all three approved items in Omnisend and read each one back. Oct 20 Early Bird (sends today 11:00 ET) and Oct 27 Last Call now carry EARLYHOLIDAY20 20% with no 15% and no end-date wording; both are scheduled at their original times and audiences.
Created and scheduled "Q4 | Oct 29 | Who Else Is On Your List (Past Buyers)" for Thu Oct 29 10:00 ET, with a new 30-day recent-buyer exclusion, the 3 images uploaded to Omnisend, UTM campaign tag set, and a test email sent to memobrickofficial@gmail.com.

## Done

- **A-2026W42-040, done.** Campaign `6ab3ae8ca46e779522c6446f` "Q4 | Oct 20 | Early Bird 15% (Warm + Past Buyers)". Restored to draft, content replaced with `improve-oct20-early-bird-omnisend.html` in a custom HTML block between the owner's logo header and footer (merge tag `[[contact.first_name|default:"there"]]` restored in place of the static "Hi there"), subject and preheader patched, rescheduled. Read back at 03:25 ET: status `scheduled`, `scheduledAt` 2026-10-20T15:00:00Z (11:00 ET), subject "Early Bird: 20% off your Memobrick, code inside", preheader "Use code EARLYHOLIDAY20 at checkout and cross one gift off your list early.", audience unchanged (Warm `6ab3a047...` + Past Buyers `6ab3a04c...`, excluding Unengaged 180d `6ab3a050...`). Content and Omnisend render contain EARLYHOLIDAY20 and no "15%". Removed with the personal-code block: the two banner images with "15%" printed in them and the footer line "One code per customer. Not combinable with other offers." The campaign's internal name still says "15%" (not seen by subscribers; left as the owner named it).
- **A-2026W42-041, done.** Campaign `6ab5038abbe86b0610261a72` "Q4 | Oct 27 | Early Bird LAST CALL 15% (replaces booster)". Wrote `marketing/email/campaign-writer/improve-oct27-last-call.md` with `-preview.png`, `-preview-phone.png`, `-preview.html`, `-omnisend.html` (copy check passes). Applied offer wording only, keeping the owner's native blocks, layout, audience and send time: subject "Reminder: 20% off your Memobrick, code inside" (was "⏰ Last call: 15% off your Memobrick ends tomorrow"), preheader "Your 20% code is inside: EARLYHOLIDAY20.", intro now says 20% with EARLYHOLIDAY20, the personal 15% discount block became the same dashed box with the public code and a "Claim my 20% →" button, the top banner with "15%" printed in it was swapped for the text-free store photo used on Oct 20, the second banner with "15% off" printed in it was removed, and the "One code per customer" footer line was removed. Read back: status `scheduled`, 2026-10-27T15:00:00Z (11:00 ET), audience unchanged (also still excludes Ordered in last 21 days). Render contains no "15%", no "last call", no "ends". Judgment call for Eden: "Last call" and the alarm emoji were treated as end-date wording and removed, because the code has no end date.
- **A-2026W42-042, done.** No campaign named "Who Else" existed. Created segment "Ordered in last 30 days - Exclude" `6ad718993431610c1a61467d` (Shopify placed order in last 30 days; 57 contacts, status ready). Uploaded the 3 images by URL (commit-pinned GitHub raw links at ec1da17, which includes the MemoBrick Studio dog mosaic from 6bd7703): grandparents `6ad7189c31a0ed8db8a644aa`, dog photo `6ad7189d266bd3daf8bb5752`, dog mosaic `6ad7189fc0dfbec6e740f838`; byte sizes match the repo files. Created campaign `6ad718cfb7f7dabccf47ecd6` from the draft and `-omnisend.html` (logo header and address footer as in the Oct 20 email; local image paths replaced with the Omnisend image URLs; merge tag restored). Omnisend stripped alt text that contained a colon, so the two dog alts are now "A golden retriever smiling at the camera" and "The same golden retriever, made of small square bricks". UTM tags set and read back: source `omnisend`, medium `email`, campaign `2026-10-past-customers-xmas`. Test email sent to memobrickofficial@gmail.com (204). Scheduled and read back: status `scheduled`, 2026-10-29T14:00:00Z (10:00 ET), subject "Who else is on your list this year?", include Past Buyers - Subscribed (9,007), exclude `6ad718993431610c1a61467d` and Unengaged 180d.
- Holiday plan and the three draft files updated with the applied status.

## Proposed for approval

None.

## Blocked or unknown

- Final recipient count for Oct 29: Omnisend's API gives segment sizes only (Past Buyers 9,007; recent-buyer exclusion 57; the unengaged overlap is not exposed). It will be at most 8,950; Eden can see the exact number on the campaign page in Omnisend.
- Images in the Oct 29 custom HTML block point to `https://app.omnisend.com/images/...` (the URLs the upload returned). This sandbox cannot load Omnisend-hosted images, so I could not view them. The test email to memobrickofficial@gmail.com is the check.
- The Omnisend images in the Oct 20 and Oct 27 emails (logo, strip, "How it works", size cards) could not be viewed from here either. Only the two banners were known to carry "15%" and both are gone; the "How it works" image's alt text has no offer.
- Sizes and prices on the Oct 27 size cards (16×16" from $69.88, 20×20" from $99.88) are the owner's original copy and were not re-checked in Shopify (out of scope: offer wording only).

## Sales impact

The two biggest sends of the next 10 days (Warm + Past Buyers, about 14,000 people) now match the 20% offer people see on the site and in ads, instead of offering less in the inbox. That removes a reason to wait. The Oct 29 email reaches 9,007 past buyers, the people most likely to buy again, two days after the Oct 27 send, pointing to the collection where the code applies. Expected: better purchases per delivered email than the Oct 6 benchmark ($0.016 per recipient, 1 order).

## Next run

- Wed Oct 21: Oct 20 send results (delivered, clicks, orders, revenue per recipient, unsubscribes) into `performance-2026-10.md`.
- Before Oct 29: confirm Eden saw the test email and the images load.
