# Google PMax #2: stop PMax from buying "memobrick" brand searches

- Type: ad-change
- Executor: ads-analyst
- Platform: Google Ads, customer 6724994049
- Campaign: USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv (23775628961)
- Expires: 2026-10-17

## Evidence

The owner's Oct 6 notes say PMax #2 has brand negatives. The live search-term report says they are not working:

| PMax search term (last 30 days) | Cost | Clicks | Conv | Conv value |
|---|---|---|---|---|
| memobrick | $117.57 | 64 | 5 | $302.40 |
| memobrick frame | $7.83 | 15 | 2 | $114.00 |
| memo brick | $6.26 | 14 | 0 | $0 |
| memobrick reviews | $4.63 | 3 | 0 | $0 |
| **Brand total** | **$136.29** | 96 | 7 | $416.40 |

That is 45% of PMax's search spend and 7 of its 10.5 search conversions. People searching our name were going to find us anyway: the brand Search campaign (17949461961) bids on "memobrick" exact and has room (budget $35/day, spending about $9/day), and the site ranks for its own name. So PMax's 2.92 ROAS is flattered by brand buyers, and its true non-brand result (about $170 for about 3.5 conversions) is hidden.

## Exact change

Add campaign-level negative keywords to 23775628961:

| Keyword | Match type |
|---|---|
| memobrick | phrase |
| memo brick | phrase |
| memo bricks | phrase |
| memobricks | phrase |
| my memobrick | phrase |

Current value: none of these are active negatives on the campaign (brand terms are serving). New value: the five negatives above. Nothing else changes.

Tool: `add_negative_keywords` through the `google_ads` router with campaign_id 23775628961, then read back with `analyze_pmax_search_terms` after 3 days. If the tool refuses negatives on a Performance Max campaign, I will report it and give the owner these clicks instead: Google Ads > Campaigns > PMax #2 > Settings > Brand exclusions > New brand list "Memobrick" > add "Memobrick" > Save; or Tools > Shared library > Negative keyword lists > add the list and apply it to the PMax campaign.

## Expected effect on orders

Neutral on orders: brand searchers are caught by the brand Search campaign and organic results. Up to about $120 a month moves out of PMax brand clicks. Brand clicks in Search cost more each ($2.75 vs $1.84), so some of that saving returns as brand Search spend. The main gain is an honest PMax number before I decide whether to scale it for Black Friday.

## Risk

If the brand Search campaign's ads are weak or limited, a few brand clicks could go unserved; I will check its impression share (84% now) daily for 3 days. PMax may lose some conversion volume in reports while it relearns.

## How I will judge it in 7 days

- Brand terms cost under $5 in PMax's search-term report.
- Brand Search campaign impression share stays above 80%.
- Shopify search/google orders hold (7d baseline 6).
- PMax non-brand conversions and cost per conversion reported for the first time on their own.
