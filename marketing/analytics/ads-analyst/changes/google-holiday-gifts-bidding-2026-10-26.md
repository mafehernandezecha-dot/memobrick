# Google Holiday Gifts: bid strategy to Maximize Conversion Value, no target (proposal, 2026-10-26)

- Type: ad-change
- Executor: ads-analyst (Google: Chrome task for the owner's Mac)
- Proposal: P-ads-analyst-20261026-6
- Platform: Google Ads, customer 672-499-4049
- Campaign: "MB | Search | Holiday Gifts | Purchases | Q4 2026" (24325020428)
- Chrome task: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-search-expansion.md`, Part E (runs only if this item is approved)
- Expires: 2026-10-31 (after that, a switch would still be learning on Nov 16)

## Exact change

| Setting | Current value | New value |
|---|---|---|
| Bid strategy | **missing** (Eden's read-only Chrome report will show it) | Maximize conversion value, no target ROAS |
| Target CPA or target ROAS | missing | none (removed if one is set) |
| Budget | $10/day | unchanged |
| Conversion goals | account default (Purchase primary; call actions secondary since Oct 14) | unchanged; the task only confirms it |

If the campaign already uses Maximize conversion value with no target, nothing changes.

## Why

Eden asked about Maximize Conversions. For Memobrick, value is the better choice: orders range from $35 (10x10 mini kit) to $853 (60x60), and Maximize Conversions counts a $35 order the same as a $349 one, so with a small budget it drifts to the cheapest orders. Eden's rule is value-based (Shopify ROAS 3.0), and value bidding aims at the same thing. Target ROAS 300% is added later only with 15+ Google conversions in 30 days and 14 days of Shopify UTM data, set to 300% x (Google value / Shopify net sales) so Shopify lands at 3.0. Full reasoning: `changes/google-search-expansion-2026-10-26.md`, section 4.

## Expected effect on orders

Small but real: the same $10/day leans toward searches that buy larger kits. Done in the same run as the new keywords, so there is one learning week (Oct 27 to Nov 5) and it is finished before the Nov 16 season.

## Risk

Learning resets for about 7 days; spend may be uneven. If Google shows "Limited" or the campaign spends under half its budget 5 days in a row, the fallback is Maximize Conversions. No strategy change between Nov 16 and Dec 15.

## How I will judge it in 7 and 14 days

Shopify net sales per order from google / cpc / 24325020428 against the account's Google average (about $102 last Q4); Shopify ROAS against cost; spend at 70% or more of budget.
