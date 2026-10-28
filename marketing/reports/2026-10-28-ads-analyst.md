# ads-analyst 2026-10-28 (executor run, A-2026W44-031)

## Summary
- **Urgent for Eden:** the Christmas ad set 120252787082260597 is PAUSED. Meta paused it when I saved the placement change, and the session blocked me from switching it back on. Only $20/day (ALWAYON) is spending until Eden switches it on.
- Built, all paused for Eden to switch on: Advantage+ placements, the come-back ad set (120252819248880597) with 3 ads, XMAS26 anniversary, and 6 "(reasons)" copies of the running Christmas ads.
- Tracking: Purchase match quality 8/10, and pixel purchases follow Shopify's 29 orders. Most orders send 2 server events, so check deduplication.

## Done
- A-2026W44-031, items 2 to 6. Full record with every ID and Eden's clicks: `marketing/analytics/ads-analyst/changes/2026-10-28-applied.md`.
  - Item 4: done, but the ad set was left paused (see Summary).
  - Item 2: 1 of 3 duplicated, XMAS26 anniversary 120252819256390597. MEN and FAM BLUE were rejected because they are posts with no website link.
  - Item 3: done, paused.
    - New audience MB_AddToCart_30d 120252819244900597.
    - Ad set 120252819248880597 with a $10 minimum spend under the campaign budget.
    - Ads 120252819260220597, 120252819267990597 (code version, stops Nov 22 23:59 ET) and 120252819272170597 (no code, starts Nov 23).
    - The campaign budget is still $50. Eden raises it to $60 when she switches the come-back ad set on.
  - Item 5: 6 new ads built, paused: 120252819276350597, 120252819284130597, 120252819285310597, 120252819285760597, 120252819286360597, 120252819290860597. The old ads are left as they are until Eden swaps them.
  - Item 6: read-only check done.
- Item 1: not done, waiting for the dog page.

## Proposed for approval
None. Everything this run did is covered by A-2026W44-031. The remaining steps are clicks for Eden, listed in the applied record.

## Blocked or unknown
- `ads_activate_entity` was denied by the session's permission check ("Unrequested Commit in a Connected App"). Every switch-on (the ad set, the come-back ad set, the new ads) needs Eden in Ads Manager.
- MEN and FAM BLUE BACKGORUND cannot be copied into a Sales/website ad set through the connector, because they have no link and no button. Their videos are not in the ad library.
- No Instagram account is linked to the ad account in the connector. The ads still get Instagram posts through the Page.
- The 35 to 64 age suggestion can't be read back through the connector.
- About 2 server Purchase events arrive per order. Deduplication is unconfirmed.

## Sales impact
- The paused ad set costs Christmas delivery until Eden switches it on. Last 7 days it spent $120 with 0 purchases, so a few hours off costs little, but it should be back on today.
- Once Eden switches everything on:
  - Instagram placements and the anniversary winner give the Christmas set reach and a creative that sold.
  - The come-back ad set targets the 30-day visitors and carts, the warmest people we have, with the Dec 15 deadline and EARLYHOLIDAY20.
  - Expected effect: the first Shopify-tagged Christmas orders within 7 days.

## Next run
- Confirm Eden's switch-ons by reading the ads back.
- Rebuild Dog v3 with the dog page link once Jenny's page is live (item 1).
- Nov 2 review on Shopify UTMs.
- Nov 23: check the code ad stopped and the no-code ad started.

## Update about 08:15 UTC: item 1 done (dog page)
- New ad **XMAS26 Dog v4 (dog page) 120252819439800597** (creative 1132439039322081) in the Christmas ad set 120252787082260597. Same video, text, headline and description as Dog v3; link https://mymemobrick.com/pages/dog-brick-mosaic, Shop now, usual UTMs in URL parameters.
- Switched on: `ads_activate_entity` was allowed this time. Read back ACTIVE / IN_PROCESS (in Meta review).
- No copy from Dog v2: it uses the same dogbillo video as Dog v3, so v4 replaces both.
- Dog v2 (120252788012070597) and Dog v3 (120252819276350597) left ACTIVE. The 10:10 UTC main-session check pauses them once Dog v4 is approved.
- Sales impact: dog-ad clickers (51 landing views, 0 sales on the general page) now land on a page about their dog with the dog editor, reviews and Dec 15 deadline. Judged on Shopify orders with utm_content=120252819439800597 after 7 days.
- Record: `marketing/analytics/ads-analyst/changes/2026-10-28-applied.md`, section "Item 1".
