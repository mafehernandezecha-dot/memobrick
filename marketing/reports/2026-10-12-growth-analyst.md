# growth-analyst 2026-10-12

## Summary

Week 2026-10-05 to 10-11 (full): 20 orders, $2,269.56 net sales. Up 53.8% and 41.7% on the prior week, down 58.3% and 54.6% on the same week of 2025.
Conversion 1.78% on 1,234 sessions (90-day level 0.91%). Email orders unknown; mymemobrick internal referrer again 7 orders.
No experiment is due for a decision.

## Done

- Ran the weekly ShopifyQL queries for this week, the prior week and the same week of 2025. Raw results: `marketing/analytics/growth-analyst/2026-10-12-queries.md`.
- Added a final full-week row to `marketing/shared/scorecard.md`. It supersedes the partial DRY RUN row from 2026-10-11 (18 orders, $2,068.56); a Sunday order and late data raised the totals to 20 and $2,269.56.

| Metric | This week | Prior week | WoW | Same week 2025 | YoY |
|---|---|---|---|---|---|
| Orders | 20 | 13 | +53.8% | 48 | -58.3% |
| Gross sales | $2,539.54 | $2,029.18 | +25.2% | $5,799.38 | -56.2% |
| Discounts | $105.70 | $128.89 | -18.0% | $253.87 | -58.4% |
| Net sales | $2,269.56 | $1,601.53 | +41.7% | $5,003.43 | -54.6% |
| Total sales | $2,471.50 | $1,805.58 | +36.9% | $5,739.85 | -56.9% |
| AOV | $108.96 | $110.95 | -1.8% | $103.27 | +5.5% |
| Sessions | 1,234 | 2,157 | -42.8% | 2,538 | -51.4% |
| Conversion | 1.78% | 0.70% | +156% | 1.38% | +29% |
| New customers | 16 | 11 | +45% | 38 | -58% |
| Returning customers | 4 | 2 | +100% | 10 | -60% |

### Referrers (orders)

| Referrer | This week | Prior week | Same week 2025 |
|---|---|---|---|
| Google search (search / google) | 6 | 4 | 8 |
| mymemobrick (internal) | 7 | 1 | 2 |
| Direct or unknown (blank) | 4 | 3 | 28 |
| social / facebook | 2 | 4 | 9 |
| search / bing | 0 | 1 | 1 |
| omniviewr | 1 | 0 | 0 |
| Email (omnisend) | unknown | unknown | unknown |

Meta context only, not added to Shopify revenue: PhotoBrick ad account spent $564.59 this week and $506.18 the prior week. Shopify attributed 2 orders to facebook this week.

## Anomalies

1. Orders +53.8% and net sales +41.7% WoW (over 30%). Small base (13 to 20 orders).
2. Sessions -42.8% WoW and conversion +156%. The prior week had spike days with near-zero conversion (see 2026-10-11 queries: 09-23, 10-01). This week has no such days, so part of the conversion gain is a smaller denominator. Cause of the earlier spikes is not determinable from this data.
3. mymemobrick internal referrer: 7 of 20 orders (35%), up from 1. Usually points to lost source tracking. Unconfirmed; the site owner should check.
4. Facebook orders 4 to 2 (-50%) while Meta spend rose 11.5% ($506.18 to $564.59). Tiny numbers; flag only.
5. Bing dropped from 1 order to 0. One-order source, not meaningful.
6. Returning customers 2 to 4 and discounts -18%. Tiny samples.
7. Year over year about -55% to -58% on orders, net sales and sessions. Last year had 28 blank-referrer orders against 4 now; the data does not say why.
8. Conversion is not below half the 90-day level (0.91%), so that rule did not fire. Referrer sources other than Bing remain present.

## Experiments

Only row: EFO-20261011-01 (email-flow-optimizer), status "not started" with no start or end date. No evaluation window, so no result or decision appended.

## Proposed for approval

None

## Blocked or unknown

- Email orders: unknown. No omnisend referrer appears and utm_medium is not available through the referrer grouping.
- Google search mixes paid and organic; they cannot be separated here.
- Cause of the mymemobrick jump and the earlier session spikes: unknown.
- Daily holiday pulse not applicable (outside Nov 16 to Dec 20).

## Next run

Monday 2026-10-19, 6:00 ET weekly scorecard for 2026-10-12 to 10-18. Watch mymemobrick share and whether the EFO test starts.
