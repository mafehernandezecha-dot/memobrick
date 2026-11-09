# Growth analyst 2026-11-09

## Summary
- Week Nov 2-8: 15 orders, $1,780 net sales vs goal 35 and $3,850 (43% and 46%); -66% orders and -68% sales vs last year. Yesterday (Nov 8): 1 order, $477 vs 5 and $550.
- November so far (Nov 1-8): 19 orders, $2,248 vs goal 40 and $4,400; gap 21 orders and $2,152. Nov 16 goal jumps to 12 orders a day; current run rate is about 2.1 a day.
- Draft orders (12 vs 51 last year) and referred traffic (-36%) are still the two biggest leaks. The gift collection page improved on Nov 6-8; the dog page still converts nothing.

## Done
- Sales pulse: `marketing/sales/latest.json` updated through Nov 8, funnel and weak points refreshed, launch section dated Nov 8.
- Weekly scorecard row added for Nov 2-8 (net sales +21.6% WoW, orders -6.3% WoW; -68.4% and -65.9% YoY). Conversion 0.86% vs 1.64% last year. No omnisend referrer, so email orders stay unknown. Google search 6 orders, Facebook 3, Instagram 0 orders.
- Task board items (all ShopifyQL, "unknown" where it cannot split):
  1. Oct 28-Nov 8, referred: dog page 121 sessions, 1 cart, 0 purchases (all sessions 145, 3 carts); gift collection 278 sessions, 28 carts, 7 purchases, and Nov 6-8 ran 128 sessions with 15 carts (11.7%) vs 6.8% on Oct 28-Nov 5; no /blogs/ landing in the top 15 (LIKE filter unsupported, so not checked below it).
  2. Draft orders by day Sep 15-Nov 8: only 15 in 55 days, 3 before Oct 12, and the busiest days were Oct 14-21 (8). The drop began before Sep 15, so I cannot date it or tie it to a site or ad change without earlier data; last year's daily series would show the usual level. Unknown.
  3. /pages/editor Oct 5-Nov 8: mobile 269 sessions, 30 carts (11.2%); desktop 94, 3 (3.2%).
- Experiments: five social-planner rows whose windows ended (EXP-SP-20261026-02 to -05, EXP-SP-20261030-01) appended as inconclusive, since no social or GA4 snapshots exist. Conversion-auditor tests are not yet released, so nothing to judge.
- Raw queries: `marketing/analytics/growth-analyst/2026-11-09-queries.md`.

## Proposed for approval
None

## Blocked or unknown
- `marketing/data/latest.md` says nothing has been pulled yet (no Google Ads, GA4, Search Console or Meta snapshots). Requests are already in `marketing/data/requests.md`; no new ones added. Paid-versus-organic Google and ad ROAS are unknown.
- Email orders unknown (no omnisend referrer). Ad or post behind each dog page visit unknown (no UTM in ShopifyQL).
- Entry comparison (search, social) not re-queried; last refreshed for Oct 5-Nov 3.
- Anomalies: none moved more than 30% WoW except YoY gaps. Direct sessions 1,017 of 1,750 remain bot-inflated. Instagram shows $49 sales with 0 orders (likely a refund or adjustment; not investigated).

## Sales impact
Analysis only; it does not bring orders directly. It points the owner and agents at: (1) the draft order collapse, about 38% of lost orders (39 of 104); (2) the dog page, 121 referred sessions and 1 cart in 12 days, so ads or posts sending traffic there are wasted until it is fixed; (3) the gift collection page, which is converting better lately and deserves more traffic ahead of Black Friday. Improved: gift collection cart rate. Not improved: everything else.

## Next run
Daily pulse for Nov 9; check whether the gift collection lift holds, and re-run entry comparison (search, social) when time allows.
