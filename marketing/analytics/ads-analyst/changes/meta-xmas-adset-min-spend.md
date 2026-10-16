# Meta: a Christmas ad set with $15 a day guaranteed, Facebook placements only (same $60 total)

- Type: ad-change (creates 1 ad set and launches it with 4 already approved Christmas ads; pauses the 4 starved copies)
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB | Sales | Purchases | Proven Videos | Oct26 (120252562193330597), campaign budget $60/day, unchanged by this item
- Expires: 2026-10-21
- **Launches live** on approval (the 4 creatives were approved and launched on Oct 14 under A-2026W42-025; they only move to an ad set where they get delivery). Total Meta daily spend does not go up.

## Why

Meta gives almost all of this campaign to one ad. Last 3 days: PV | Dog_vid $105.52 of $172 (61%); the 4 Christmas ads $6.83 together (5 to 181 impressions each). Nobody sees the Christmas message, the Dec 15 date or the code. A separate ad set with a minimum daily spend forces a fair test without raising the budget.

It runs on Facebook only because, in the last 28 days, Facebook placements took $1,031 (54% of spend) and brought 17 of 23 Meta purchases, while Instagram took $879 (46%) for 6 (Instagram Reels $271 for 0, and only 56% of its clicks loaded the page). Shopify agrees: Instagram 111 sessions and 0 completed checkouts in 14 days; Facebook 523 sessions and 6. The account also has no Instagram account connected (see the report), so Instagram ads show under the Facebook Page name.

## Exact changes

| # | Entity | ID | Field | Current | New |
|---|---|---|---|---|---|
| 1 | New ad set "XMAS, FB only, min $15" in campaign 120252562193330597 | new | targeting | none | US, age_min 25, Advantage+ audience on, excluded audiences 120218644952060597 (customers_export.csv) and 120252332056620597 (purchase 730 days), publisher_platforms facebook, facebook_positions feed, facebook_reels, story |
| 1b | same | new | optimization | none | OFFSITE_CONVERSIONS, Purchase on pixel 3444389275577775, billing IMPRESSIONS, 7-day click and 1-day view (same as today) |
| 1c | same | new | daily_min_spend_target | none | $15 (1500 cents); no ad set cap |
| 2 | 4 new ads in that ad set | new | creative_id | none | 1494117202554647 (XMAS Family), 975526582259846 (XMAS Partner), 1081950124824769 (XMAS Pet), 2813008459099718 (XMAS Grandparents), ACTIVE |
| 3 | Old XMAS ads in ad set 120252562197040597 | 120252612740140597, 120252612740850597, 120252612741600597, 120252612742330597 | status | ACTIVE | PAUSED |
| 4 | Campaign 120252562193330597 | | daily_budget | $60 | $60 (no change; $50 only if the retargeting item is approved too) |

If the new-reels item (meta-new-ads-hugo-reels-paused.md) is approved, its 3 paused ads go into this ad set.

Steps: `ads_create_ad_set` (draft), `ads_create_ad` x4 with the creative IDs above, `ads_update_entity` status PAUSED on the 4 old ads, publish only the new ad set and its 4 ads with `ads_activate_entity` (object_ids listed), read everything back with `ads_get_ad_entities`.

## Expected effect on orders

$15 a day ($105 a week) of the same budget goes to Christmas gift messages with the code and the order-by date. At last holiday's Partner-video cost ($29.49 per Meta purchase) that is up to 3 Meta purchases a week, roughly 1 to 2 Shopify orders. Dog_vid keeps $45 a day.

## Risk

The ad set starts in learning; Dog_vid gets $15 a day less. A minimum spend means Meta must spend it even on a bad day.

## How I will judge it in 7 days

Each Christmas ad has at least $15 of spend; link CTR at least 1.6%; landing page views at least 85% of link clicks; at least 1 Shopify order with utm_campaign 120252562193330597 and utm_content xmas-*. Any Christmas ad with $30 spent and no add to cart gets a pause proposal.
