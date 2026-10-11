# DRY RUN: growth-analyst 2026-10-11

Week covered: Monday 2026-10-05 to Sunday 2026-10-11. This run happened on Sunday, so today is partial (12 sessions and 0 orders so far). Final numbers will differ slightly.

## Summary

18 orders and $2,068.56 net sales: up 38.5% and 29.2% on last week, down 62.5% and 58.7% on the same week of 2025.
Sessions halved (2,157 to 1,069) while orders rose, so conversion jumped to 1.87% from 0.70%. The prior weeks had high-session, near-zero-conversion spike days that this week did not.
No running experiments to review.

## Done

- Ran the four ShopifyQL queries for this week, the prior week (2026-09-28 to 10-04), and the same week of 2025 (2025-10-06 to 10-12), plus the 90-day conversion and a daily sessions check. Raw results: `marketing/analytics/growth-analyst/2026-10-11-queries.md`.
- Added one Weekly row to `marketing/shared/scorecard.md`.

### Scorecard

| Metric | This week (partial) | Prior week | WoW | Same week 2025 | YoY |
|---|---|---|---|---|---|
| Orders | 18 | 13 | +38.5% | 48 | -62.5% |
| Gross sales | $2,325.54 | $2,029.18 | +14.6% | $5,799.38 | -59.9% |
| Discounts | $92.70 | $128.89 | -28.1% | $253.87 | -63.5% |
| Net sales | $2,068.56 | $1,601.53 | +29.2% | $5,003.43 | -58.7% |
| Total sales | $2,258.89 | $1,805.58 | +25.1% | $5,739.85 | -60.6% |
| AOV | $109.90 | $110.95 | -0.9% | $103.27 | +6.4% |
| Sessions | 1,069 | 2,157 | -50.4% | 2,538 | -57.9% |
| Conversion | 1.87% | 0.70% | +169% | 1.38% | +36% |
| New customers | 14 | 11 | +27% | 38 | -63% |
| Returning customers | 4 | 2 | +100% | 10 | -60% |

90-day conversion (2026-07-13 to 10-10): 0.92%.

### Referrers (orders)

| Referrer | This week | Prior week | Same week 2025 |
|---|---|---|---|
| search / google | 4 | 4 | 8 |
| mymemobrick (internal) | 7 | 1 | 2 |
| Direct or unknown (blank) | 4 | 3 | 28 |
| social / facebook | 2 | 4 | 9 |
| search / bing | 0 | 1 | 1 |
| omniviewr | 1 | 0 | 0 |

Email orders: unknown. No referrer name contains "omnisend", and the referrer query does not report utm_medium.

Meta context only, never added to Shopify revenue: the PhotoBrick ad account spent $481.79 this week and $506.18 last week. Shopify attributed 2 and 4 orders to facebook.

### Anomalies

1. **Sessions -50.4% WoW while orders rose 38.5%.** Daily data shows the prior two weeks had spike days with near-zero conversion (09-23: 868 sessions, 0.12%; 10-01: 588 sessions, 0.17%). This week had no spike day. That pattern fits low-quality or bot traffic in earlier weeks, but the data cannot confirm the cause. Treat the conversion jump (+169%) as partly a denominator effect, not proof of better shopping.
2. **mymemobrick internal referrer jumped from 1 to 7 orders** (39% of orders). An internal referrer usually means attribution lost the true source, for example a redirect between domains or a return from checkout. Possible tracking issue; worth a check by whoever owns the site setup.
3. **Facebook orders -50% (4 to 2)** while Meta spend was down only 4.8%. Small numbers; flag only.
4. **Discounts -28.1% WoW.** Small dollar amounts.
5. **Returning customers +100% (2 to 4).** Tiny sample; not meaningful.
6. **Bing disappeared** (1 to 0). A one-order source; not meaningful on its own.
7. **Year over year down about 60%** on orders, net sales, and sessions. Last year's week had 28 direct or unknown orders against 4 this year; the referrer data does not say why.

Conversion (1.87%) is not below half the 90-day level (0.92%), so that rule did not fire.

### Experiments

`marketing/shared/experiments.md` has no rows. Nothing to judge.

## Proposed for approval

None

## Blocked or unknown

- Email orders: unknown. utm_medium is not available from the referrer grouping used here.
- Google organic: `search / google` does not separate organic from paid Google. The column is labeled "organic" but may include paid clicks if any run.
- Today (2026-10-11) is incomplete, so this week's row is partial. The Monday 6:00 ET run would capture the full week.
- The Meta ad account is not named in the agent file. I used "PhotoBrick" (1493067227536648), the only active, queryable account under the photobrickusa business. Three other photobrickusa accounts are closed.
- The scorecard baseline calls `mymemobrick` an internal referrer. Its jump this week may be a tracking artifact. Unconfirmed.

## Next run

Monday 2026-10-12, 6:00 ET weekly scorecard (in production, it would recompute 10-05 to 10-11 in full). Watch whether session spikes return and whether mymemobrick stays high.
