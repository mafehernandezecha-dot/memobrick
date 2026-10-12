# Meta: cut ALWAYON PROMO -v1 from $40 to $20 a day

- Type: ad-change
- Executor: ads-analyst
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: ALWAYON PROMO -v1 (120252425110090597), objective Sales, ad set VARIUS INTEREST (120252425110150597)
- Current value: daily_budget $40.00
- New value: daily_budget $20.00
- Expires: 2026-10-17

## Evidence (Shopify first)

| Window | Spend | Shopify orders (utm_campaign = this campaign) | Shopify net sales | Shopify ROAS | Meta's own ROAS |
|---|---|---|---|---|---|
| Last 7 days | $447.48 | 3 | $310.16 | 0.69 | 1.24 |
| Last 28 days (whole life) | $717.44 | 7 | $779.31 | 1.09 | 1.76 |

Break-even is 3.0 on Shopify net sales. Even Meta's own number is far below it. The main ad, "FAM BLUE BACKGORUND" (120252425110140597), took $515.79 of the $717 at $64.47 per Meta-reported purchase. With an average order of about $109, break-even cost per purchase is about $36. The two cheaper ads ("MEN" $31.58, "anniversary" $35.67) have only 3 and 2 purchases: too early to call winners.

Meta as a whole: $2,030 spent in 28 days for 9 Shopify-tracked orders ($1,003). That is $226 of ad spend per order.

## Why a cut and not a pause

Meta is the only paid source of new buyers outside search, and Black Friday starts Nov 16. A smaller budget keeps the pixel learning and the ad set alive while the new "Proven Videos" campaign (120252562193330597, $40/day, 6 days old, too early) gets a fair test. If PROMO -v1 is still under 1.5 on Shopify in 7 days, I will propose a pause.

## Expected effect on orders

About 1 fewer Shopify order a week (it brought 3 last week) and about $140 a week saved. Meta's total daily budget goes from $80 to $60. **This lowers total daily ad spend.** Meta usually spends a smaller budget on its cheapest buyers first, so cost per order should fall.

## Risk

The ad set may re-enter learning after a 50% budget change. Delivery could swing for 2 to 3 days.

## How I will judge it in 7 days

- Read-back shows daily_budget $20.
- Shopify orders with utm_campaign 120252425110090597: at least 2 in 7 days at Shopify ROAS of 1.2 or better. Below that, I propose a pause.

Tool: `ads_update_entity` (entity_type campaign, id 120252425110090597, daily_budget 2000 cents), then read back with `ads_get_ad_entities`.
