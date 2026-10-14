# Meta: move ALWAYON PROMO -v1's $20 a day into Proven Videos (same total)

- Type: ad-change
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Expires: 2026-10-19
- Total Meta daily budget: $60 before, $60 after. **No increase in total spend.**

## Exact changes

| # | Entity | ID | Field | Current | New |
|---|---|---|---|---|---|
| 1 | Campaign ALWAYON PROMO -v1 | 120252425110090597 | status | ACTIVE ($20/day) | PAUSED |
| 2 | Campaign MB, Sales, Purchases, Proven Videos, Oct26 | 120252562193330597 | daily_budget | $40 (4000 cents) | $60 (6000 cents) |
| 3 | Ad "PV, pinkdog_video" in ad set 120252562197040597 | 120252562205030597 | status | ACTIVE | PAUSED |
| 4 | New ad "PV, MEN post" in ad set 120252562197040597 (US, Broad 25+, Purchase, Excl Customers) | new | creative_id | none | 1119742773912869 (the "MEN" page post, unchanged text) |
| 5 | New ad "PV, POV reasons" in the same ad set | new | creative_id | none | 1622993222707677 (the "anniversary" POV video, unchanged text) |

Items 4 and 5 copy two existing, already-approved creatives into the better ad set. **This item launches them (status ACTIVE)**, because they are not new copy, only the same ads moving from the campaign being paused. No other ad, audience, placement, bid or setting changes.

## Why (numbers from the Facebook connector, read 2026-10-14, and Shopify)

| | ALWAYON PROMO -v1 | Proven Videos |
|---|---|---|
| Spend, last 7 days (to Oct 12) | $400.06 | $105.94 (started Oct 10) |
| Meta purchases / Meta purchase ROAS, 7 days | 3 / 1.11 | 2 / 1.78 |
| Cost per Meta purchase, 7 days | $133.35 | $52.97 |
| CPM (cost of 1,000 views), 7 days | $24.34 | $13.71 |
| Cost per link click, 7 days | $2.53 | $1.58 |
| Shopify orders with this campaign's UTM, Sep 16 to Oct 13 | 7 / $779.31 | 1 / $55.91 |
| Shopify ROAS, 28 days | about 1.06 ($779 / $737) | too early |
| Delivery status | Ad set "Learning limited" (learning status FAIL); its interests include "The Lego Group" | Learning, 2 conversions |

- PROMO -v1 is a clear loser on Shopify (about 1.06 vs the 3.0 target) and Meta itself says it cannot exit learning.
- Proven Videos holds last holiday's best Meta ad ("Merriage_video": 128 Meta purchases at $29.49 each, Meta ROAS 3.63, Nov 1 to Dec 15 2025) and the pet videos (dogbillo 24 purchases, ROAS 4.12). It reaches people for about half the cost per view, so the same $20 buys about 70% more impressions and about 60% more clicks.
- One campaign instead of two gives Meta's learning twice the purchase signals, which is what an account at 2 to 3 purchases a week needs.
- "PV, pinkdog_video" actually runs the Connie creative with the hashtags #lego and #legolover (LEGO is a trademark). It spent $1.84 in 28 days, so pausing it costs nothing.
- The "MEN" post ($32.35 per Meta purchase, 3 purchases) and the "POV" video ($36.24, 2 purchases) were the cheapest ads in PROMO -v1. Too few purchases to call winners, so they move rather than get more money.

## Expected effect on orders

About +5 visits a day from the same $20 (CPC $1.58 vs $2.53). Roughly +0.5 to 1 Shopify order a week now, and a stronger, single learning campaign ready for the Christmas ads (separate item) before Nov 17.

## Risk

Proven Videos' learning resets with a 50% budget change; delivery can swing for 2 to 3 days. Pausing PROMO -v1 loses about 1 Shopify order a week it was bringing (at a loss).

## How it is applied

1. `ads_update_entity` campaign 120252425110090597 `{"status":"PAUSED"}`.
2. `ads_update_entity` campaign 120252562193330597 `{"daily_budget":6000}`.
3. `ads_update_entity` ad 120252562205030597 `{"status":"PAUSED"}`.
4. `ads_create_ad` twice in ad set 120252562197040597 with creative_id 1119742773912869 and 1622993222707677.
5. The connector writes edits as a draft: publish with `ads_activate_entity`, then read everything back with `ads_get_ad_entities` and record before and after in the run report.

## How I will judge it 7 days later

- Read-back: PROMO -v1 paused, Proven Videos $60/day, two new ads active, pinkdog ad paused.
- Proven Videos: Shopify orders with utm_campaign 120252562193330597 of at least 3 in 7 days and a Shopify ROAS of 1.5 or better (from 1.06 for PROMO -v1). If cost per Meta purchase is above $80 after $300 of spend, I propose cutting back.
