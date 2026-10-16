# Meta: pause ALWAYON PROMO -v1 again (turned back on Oct 16, 9:30 AM)

- Type: ad-change
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: ALWAYON PROMO -v1 (120252425110090597), ad set VARIUS INTEREST (120252425110150597)
- Current value: ACTIVE, $20/day (Eden turned it back on in Ads Manager on 2026-10-16 at 9:30 AM, per the account activity log; it had been paused under A-2026W42-024 on Oct 14)
- New value: PAUSED
- Total Meta daily budget: $80 now, **$60 after** (lowers spend)
- Expires: 2026-10-21

If Eden turned it back on on purpose (for example to keep the "MEN" or "anniversary" ads running), reject this item and say so; I will then propose pausing only its weakest ads instead.

## Evidence

| VARIUS INTEREST ad set | Last 7 days (Oct 9 to 15) |
|---|---|
| Spend | $214.47 |
| Link clicks / landing page views | 76 / 66 |
| Add to cart / checkouts | 2 / 1 |
| Meta purchases | 0 |
| CPM | $25.22 (Proven Videos: $15.54) |
| Cost per link click | $2.82 (Proven Videos: $1.48) |

- Shopify, last 28 days, utm_campaign 120252425110090597: 7 orders, $779.31 on about $737 of spend, a Shopify ROAS of about 1.06 when it ran at $40/day. Break-even is 3.0.
- Its interest list includes "The Lego Group" (not our buyer, see buyer-profile.md), and its "dog" ad (120252425110120597, creative 1089004773715792) carries the hashtag #legoart and five stars in the text, which the brand rules do not allow.
- Since it came back on today it has spent about $22 with 8 link clicks and no add to cart (last 3 days read).

## Exact change

`ads_update_entity` campaign 120252425110090597 `{"status":"PAUSED"}`, then read back with `ads_get_ad_entities` (effective_status PAUSED). Nothing else changes.

## Expected effect on orders

About $140 a week saved for, at most, 1 lost Shopify order a week (it brought 0 Meta purchases last week). The saved money is not re-spent unless another item says so.

## Risk

Low. The "MEN" and "anniversary" creatives stop too; they had 3 and 2 Meta purchases in 28 days, too few to call winners.

## How I will judge it in 7 days

Read-back shows PAUSED; total Meta spend for Oct 17 to 23 at about $60 a day; facebook/paid Shopify orders not lower than the 1 of Oct 9 to 15.
