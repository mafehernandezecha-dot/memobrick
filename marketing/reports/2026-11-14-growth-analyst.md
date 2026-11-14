# growth-analyst 2026-11-14

## Summary
Daily pulse, run on the store clock of Nov 13 at about 21:47 ET. Yesterday (Nov 12, now a full day): 3 orders and $610.42 vs goal 5 and $550, so 2 orders short but $60.42 over on sales.
Etsy's value this season, from last year's hand-entered Etsy orders: 54 orders ($5,617) on Nov 16 to 30, which is 30% of that period's goal, and 174 orders ($16,704) on Dec 1 to 15, which is 58% of that goal.
Online Store alone (no Etsy) is running at less than half of last year: 30 vs 66 orders for Nov 1 to 12.

## Done
- Task board (Nov 13 row), all three items done:
  1. Nov 12 is stored in marketing/sales/latest.json as a full day: 3 orders, $610.42. Last year's series was re-queried and matches the stored values.
  2. The Etsy value table is below and in the queries file. It is also in latest.json under `funnel.launch.draftOrders.etsyValueByGoalPeriod`.
  3. The Online Store pace line is below and in the queries file. It is also in latest.json under `funnel.launch.draftOrders.onlineStorePace`.
- Refreshed the referred funnel. Oct 14 to Nov 12 2026 vs Oct 15 to Nov 13 2025 (same weekdays):
  - Sessions: 2,873 vs 4,064 (-29%).
  - Add to cart: 224 vs 432 (7.8% vs 10.6%).
  - Reached checkout: 125 vs 180.
  - Purchased: 41 vs 77. Checkout to purchase is 33% vs 43%.
- Sales channel, same 30 days:
  - Online Store: 60 vs 138.
  - Draft Orders: 13 vs 72.
  - Shop: 1 vs 0.
- Updated the three weak points with the new numbers. Weak point 3 now uses the Online Store line, and conversion-auditor is added as an owner because checkout completion has fallen.

### Etsy value by goal period
These are last year's Etsy-profile orders on the same calendar dates. They include a few $0 replacements.

| Period (daily goal) | Etsy last year | Per day | Period goal | Share of order goal | Share of sales goal |
|---|---|---|---|---|---|
| Nov 16 to 30 (12 a day) | 54 orders, $5,617.22 | 3.6 | 180, $19,500 | 30% | 29% |
| Dec 1 to 15 (20 a day) | 174 orders, $16,703.70 | 11.6 | 300, $30,000 | 58% | 56% |

Both periods together come to 228 orders and $22,321, which is 48% of the goal's 480 orders. The one number for Eden: **Etsy was worth about 230 orders and $22,000 over Nov 16 to Dec 15 last year.**

Last year's Online Store alone almost equals the goals: 173 vs 180, then 300 vs 300. So the goals already assume the website gets back to last year's level, with or without Etsy.

### Online Store pace (no draft orders)
| Window | 2026 | Last year | Change |
|---|---|---|---|
| This week, Mon Nov 9 to Thu Nov 12 (vs Nov 10 to 13 2025) | 12 orders, $1,637.48 | 27 orders, $2,730.92 | -56% |
| Nov 1 to 12 | 30 orders, $3,885.10 | 66 orders, $7,481.80 | -55% |

### Against goal (all channels)
- **Yesterday, Nov 12:** 3 orders, $610.42 vs 5 and $550. Short by 2 orders, over by $60.42.
- **This week, Nov 9 to 15:**
  - Through Nov 12: 14 orders and $1,859.88 vs the week goal of 35 and $3,850.
  - Still needed: 21 orders and $1,990.12 in Nov 13 to 15, which is 7 a day.
  - Nov 13 so far (partial): 3 orders, $221.73. That leaves 18 orders for Nov 14 and 15.
  - Last year, same weekdays Mon to Thu: 58 orders. Full week: 101.
- **November, Nov 1 to 12:** 33 orders and $4,107.50 vs a goal of 60 and $6,600. The gap is 27 orders and $2,492.50. Last year, same days: 92 orders and $10,494.32.
- **Full month:** the goal is 255 orders and $27,750. That leaves 222 orders and $23,642.50 for Nov 13 to 30. The 30-day pace is 2.5 a day, against 12 a day from Monday.

## Proposed for approval
None

## Blocked or unknown
- `marketing/data/latest.md` still says nothing has been pulled. There are no Google Ads, GA4, Search Console or Meta snapshots. The open lines in `marketing/data/requests.md` already cover what I need, so I added no new one.
- Why Etsy orders stopped after May 25 is unknown from Shopify data. The public shop read is requested (seo-strategist, Nov 13), and only Eden can confirm.
- No Adspirer calls. Live site not needed.
- No experiment check today. That is a Monday step.

## Sales impact
Measurement only. It gives Eden one number for the Etsy decision: about 230 orders and $22,000 from Nov 16 to Dec 15, with most of it in Dec 1 to 15. It also gives the team a line it can move without Etsy: Online Store orders, now at 45% of last year. This addresses weak point 1 (Etsy) and weak point 3 (goal gap).

## Next run
Daily pulse tomorrow, with Nov 13 stored as a full day. Monday Nov 16: scorecard row for Nov 9 to 15 and the experiment checks. The Online Store line will then be tracked against the 12-a-day goal.
