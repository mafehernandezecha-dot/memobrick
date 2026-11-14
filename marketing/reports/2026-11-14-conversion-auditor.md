# conversion-auditor 2026-11-14

## Summary
Abandoned checkouts Nov 1 to 13 under $125 with shipping: 13. Shipping was 15% or more of the subtotal on 9 of 12 kit carts (75%), and the median shipping was $12.85.
Buyers paid about the same: 10 of 16 paid orders under $125 also paid 15% or more (median $11.18). So shipping is not the main reason people leave the 16x16 and 20x20.
The exception is the $35 10x10 mini. Shipping added 34% to 44%, 3 to 4 checkouts were abandoned, and 0 were ordered in Nov 1 to 13.

## Done
- Task board (shipping table for carts under $125): done. The table and both numbers are in `marketing/conversion/auditor/audit-2026-11-14.md`. Read-only: amount, code and product fields only, with no names, emails, addresses or order numbers.
  - Share of carts with shipping at 15% of subtotal or more: **9 of 12 kit carts (75%)**. Counting the $0 proof line, it is 10 of 13.
  - Median shipping: **$12.85** (range $7.72 to $15.53).
  - Phone or desktop: unknown for every row. Abandoned checkout records have no device field.
- Added check against buyers: 16 paid web orders under $125 in the same days had a median shipping cost of $11.18 (16.4% of subtotal), and 10 of the 16 paid 15% or more.
- 10x10 mini: 0 orders on any channel Nov 1 to 13 (Shopify sales by product). It had 3 abandoned checkouts with $12.08 to $15.53 shipping, plus 1 with no address.
- Correction: my Nov 12 table showed $12.08 shipping on the Nov 8 10x10 checkout. That checkout has no shipping line. The Nov 2 to 11 count with shipping was 13, not 14.
- Approvals: the checker printed nothing for me as Executor.

## Proposed for approval
None (task board: no proposal today).

## Blocked or unknown
- Device per abandoned checkout cannot be read from Shopify. GA4 checkout steps by device would answer it, but the Nov 11 request is still open and there are no GA4 snapshots (`marketing/data/latest.md`).
- Owner, shipping decision (yours, Facts 2026-10-12). The data points to the 10x10 mini, not the whole store. Options I can measure from the day they go live:
  1. Set a flat US rate (for example $5.95) on the 10x10 mini only. In Settings > Shipping and delivery > General profile, create a custom shipping profile for the 10x10 product with a flat US rate.
  2. Lower the free-shipping threshold for the Black Friday weeks.
  Keeping the current rates is also a valid choice. The 16x16 and 20x20 buyers pay the same share.
- The sample is small: 12 abandoned and 16 paid carts. The medians differ by about $1.70.

## Sales impact
- Weak point: checkout completion is 33% against 43% last year, and Black Friday traffic starts Nov 16. This run brings no order by itself, but it gives Eden the fact she needs for the shipping decision. Shipping is the likely blocker on the $35 10x10 only, which is 0 orders in 13 days. On the best sellers (16x16, 20x20), buyers pay the same shipping, so the checkout drop there needs other causes. The code that removes free shipping on $125+ carts is covered by pending A-2026W46-017.
- If the owner sets a cheap flat rate on the 10x10, the 3 to 4 abandoned checkouts a fortnight suggest about 1 more order a week. That is a guess.

## Next run
Wednesday 2026-11-18: full weekly funnel and walk. Measure phone checkout completion for Nov 9 to 15. Re-run this shipping table for Nov 14 to 17, and check the 10x10 checkouts if its shipping changes.
