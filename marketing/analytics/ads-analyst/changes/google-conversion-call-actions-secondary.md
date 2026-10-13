# Google: make Purchase the only primary conversion (call actions to secondary)

- Type: ad-change
- Executor: ads-analyst (Google: Chrome task for the owner's Mac)
- Platform: Google Ads, customer 6724994049, Goals > Conversions
- Chrome task draft: marketing/analytics/ads-analyst/chrome-tasks/2026-10-13-conversion-call-actions-secondary.md (Status: draft until approved)
- Expires: 2026-10-20

## Exact change

| Conversion action | ID | Current value | New value |
|---|---|---|---|
| Calls from Smart Campaign Ads | 532070521 | Primary | Secondary |
| Smart campaign ad clicks to call | 830348821 | Primary | Secondary |
| Google Shopping App Purchase | 809203335 | Primary, Purchase, every conversion, 90-day click, 1-day view | No change |

Nothing else changes. Nothing is deleted, so it can be undone in one click.

## Why

The owner's rule (Oct 6) is Purchase as the only primary conversion. The 2026-10-12 read showed these two Smart campaign call actions also set to primary. No Smart campaign runs, so they likely count nothing now, but a phone tap counted as a "conversion" would make PMax and Search bid for calls instead of orders.

## What this does not fix (no change proposed)

- Free design proof sales arrive as Shopify draft orders and are not credited to Google. Draft orders were 34% of Q4 2025 orders (432 of 1,281). The safe free fix needs to know how customers ask for a proof (form, email, chat). Once the owner says, I will propose a secondary (not primary) "Proof request" conversion so we can see which campaigns bring proof requests without changing bidding.
- Google adds about $30 of value per new customer (owner's Oct 6 note), so platform ROAS stays higher than Shopify ROAS. I judge on Shopify; no change.

## Expected effect on orders

Neutral now; protects bidding from optimizing to calls during the holiday season.

## Risk

None known. If any call conversions were real orders, they still show as secondary.

## How I will judge it in 7 days

Conversions column shows only Purchase; total primary conversions unchanged or lower by the call count.
