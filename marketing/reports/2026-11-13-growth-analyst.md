# growth-analyst 2026-11-13

## Summary
Daily pulse, run on the store clock of Nov 12 at about 21:50 ET. Yesterday (Nov 11): 4 orders and $457.48 against a goal of 5 and $550. That misses by 1 order and $92.52.
Main finding: the lost draft orders are Etsy sales that someone typed into Shopify by hand. Every one has a shipping line titled "etsy" and the payment "manual". The last one was entered on May 25 2026. Last year Etsy orders were 59 of the 192 orders in this 30-day window, and they ran 73 to 92 a week in early December.
Proof invoices for real products (card-paid draft orders) are not broken. There were 9 in October, against 8 last year.

## Done
- Task board (Nov 12 row), all three items done:
  1. Nov 11 is stored in marketing/sales/latest.json as a full day: 4 orders, $457.48.
  2. The draft order profile is below. The full weekly table is in marketing/analytics/growth-analyst/2026-11-13-queries.md. No customer fields were read.
  3. The pace line for this week is under Against goal.
- Refreshed the referred funnel. Oct 13 to Nov 11 2026 vs Oct 14 to Nov 12 2025 (same weekdays):
  - Sessions: 2,858 vs 4,077 (-30%).
  - Add to cart: 215 vs 428 (7.5% vs 10.5%).
  - Reached checkout: 122 vs 180.
  - Purchased: 42 vs 74.
- Sales channel, same windows:
  - Online Store: 62 orders vs 132.
  - Draft Orders: 13 vs 60.
  - Shop: 1 vs 0.
- Rewrote the weak points in latest.json. Etsy is now first. The old "proof or invoice path" wording is replaced, because the profile ruled that path out. Added `etsyProfile` to the draft orders block.

### Draft order profile, Jan 2025 to Jun 2026
| What | Finding |
|---|---|
| Created by | The "Draft Orders" app, typed by hand. No tags at all. |
| Line items | Custom items with no product link: "memobrick 16x16", "Memobrick 20x20", "X2 memobrick 20x30", "Upgrade to 20x20" |
| Shipping line | Titled **etsy** ("Etsy", "ETSY", "etsy 2 day shipping"): $12 in 2025, $13.50 in 2026 |
| Payment | `manual`, marked paid. No card went through Shopify. |
| Prices | A list of $98 / $141 / $213 / $299 / $399 for 16x16 / 20x20 / 20x30 / 30x30 / 30x40. Often exactly 30% off: $68.60 / $98.70 / $149.10 / $209.30 / $279.30. |
| When entered | Weekdays: Monday 321 of 1,157, weekends 53. Mostly 11:00 to 18:00 ET. Entered in batches a few minutes apart (for example, 12 orders between 13:46 and 15:38 ET on Nov 10 2025). |
| Monthly count | 2025: 39 to 70 a month, then Nov 91 and Dec 261. 2026: Jan 63, Feb 47, Mar 52, Apr 50, May 28, Jun to Nov 0 paid (only $0 replacements). |
| Last Etsy order | May 25 2026. None of the 49 draft orders since then has an "etsy" shipping line. |
| Last year's holiday weeks | Weeks starting Nov 10: 41, Nov 17: 15, Nov 24: 29, Dec 1: 92, Dec 8: 73, Dec 15: 58, Dec 22: 24 |

What the data supports: Etsy orders reached Shopify every week for at least 17 months and then stopped at the end of May. The data cannot tell us why. The Etsy shop may be closed, on vacation, delisted or no longer selling. Or Etsy orders may still come in but now get fulfilled outside Shopify. Eden can answer this with one look at the Etsy shop.

### Against goal
- **Yesterday, Nov 11:** 4 orders, $457.48 vs 5 and $550. Missed by 1 order and $92.52.
- **This week, Nov 9 to 15:**
  - Through Nov 11: 11 orders and $1,249.46 vs the week goal of 35 and $3,850.
  - Still needed: 24 orders and $2,600.54 in Nov 12 to 15, which is 6 a day.
  - Nov 12 so far (partial): 3 orders, $610.42. With those, 21 orders are left for the rest of the week.
  - Same week last year: 91 orders.
- **November, Nov 1 to 11:** 30 orders and $3,497.08 vs a goal of 55 and $6,050. The gap is 25 orders and $2,552.92. Same days last year: 78 orders and $8,952.40.
- **Full month:** the goal is 255 orders and $27,750. That leaves 225 orders and $24,252.92 for Nov 12 to 30, most of it at 12 a day from Nov 16. The 30-day pace is 2.5 a day.

## Proposed for approval
None

## Blocked or unknown
- marketing/data/latest.md still says nothing has been pulled, so there are no Google Ads, GA4, Search Console or Meta snapshots. The open requests in marketing/data/requests.md already cover what I need, so I added no new line.
- Why Etsy orders stopped after May 25 is unknown from Shopify data. Only Eden can check the Etsy shop. I have no Etsy connection.
- No Adspirer calls. Live site not needed.
- No experiment check today. That is a Monday step.

## Sales impact
Measurement only, but this is the clearest lead on lost orders so far. Last year Etsy brought about 59 orders in these 30 days and about 260 from Nov 10 to Dec 21. Etsy is the biggest single source missing this year, and it needs no site, ad or email work, only Eden checking the Etsy shop. If the shop can sell again before the Dec 1 to 15 rush, even a third of last year's pace would be about 20 to 30 orders a week. This addresses weak point 1 (Etsy) and the goal gap.

## Next run
Daily pulse tomorrow, with Nov 12 stored as a full day. Monday Nov 16: scorecard row for Nov 9 to 15 and the experiment checks.
