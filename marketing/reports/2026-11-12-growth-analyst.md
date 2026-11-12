# growth-analyst 2026-11-12

## Summary
Daily pulse (Thursday run, store clock Nov 11 evening). Yesterday (Nov 10): 5 orders, $640.07 vs goal 5 and $550. It is the first day to meet both goals since Oct 3. Nov 11 so far (partial): 3 orders, $367.58.
New finding: Google search visits that land on the home page fell from 1,557 to 482. That is 1,075 of the 1,184 lost search sessions (91%), and purchasing sessions there fell from 38 to 7.
May 18 hit only draft orders. Site sessions, cart rate and Online Store orders did not drop that week.

## Done
- Task board (Nov 11 row): done. Both cuts are below and in marketing/analytics/growth-analyst/2026-11-12-queries.md. Nov 10 is stored as a full day in marketing/sales/latest.json.
- Refreshed the referred funnel (Oct 12 to Nov 10 vs Oct 13 to Nov 11 2025, same weekdays). Sessions were 2,827 vs 4,131 (-32%). Add to cart was 203 vs 425 (7.2% vs 10.3%). Reached checkout was 115 vs 178 and purchased was 40 vs 73. Checkout to purchase was 35% vs 41%.
- Draft orders over 31 days (Oct 11 to Nov 10 vs Oct 12 to Nov 11 2025): 14 vs 61. Online Store: 62 vs 133.
- Rewrote all three weak points in latest.json. Added `searchLandingPages` and `may18Check` to the funnel block.

### Cut 1: Google search sessions by landing page, Oct 12 to Nov 8 2026 vs Oct 13 to Nov 9 2025 (sessions / carts / purchased)
| Landing page | 2026 | 2025 |
|---|---|---|
| Home page / | 482 / 46 / 7 | 1,557 / 211 / 38 |
| Gift collection | 216 / 20 / 7 | 88 / 8 / 2 |
| /products/2-2-boards | 93 / 5 / 3 | not in top 15 |
| /products/custom-bricked-mosaic-10x10 | 27 / 8 / 2 | not in top 15 |
| /products/1-big-board | 27 / 4 / 2 | not in top 15 |
| /collections/photo-frames | 11 / 0 / 0 | 21 / 4 / 4 |
| /products/frame-4x4 | not in top 15 | 66 / 2 / 1 |
| Artist Collection pages (8 in the 2025 top 15) | 1 in top 15 (2 / 0 / 0) | 142 / 6 / 0 |
- Nearly the whole search loss is visits landing on the home page. Search visits to the gift collection rose about 2.5 times and bring purchases, and so do the size product pages.
- The lost Artist Collection visits brought no purchases last year either, so they matter little for sales.
- From this data alone, we cannot tell whether the home page visits came from brand-name searches ("memobrick"), the Brand ad campaign, or organic results. This is the question the open Search Console (Nov 2) and Google Ads (Nov 5) requests in marketing/data/requests.md would answer.

### Cut 2: weeks of Apr 27 to Jun 15 2026
| Week | Referred sessions | Referred carts (rate) | Online Store orders | Draft orders |
|---|---|---|---|---|
| Apr 27 | 923 | 62 (6.7%) | 20 | 6 |
| May 4 | 1,232 | 81 (6.6%) | 32 | 12 |
| May 11 | 1,151 | 70 (6.1%) | 15 | 11 |
| May 18 | 1,090 | 86 (7.9%) | 20 | 4 |
| May 25 | 1,155 | 93 (8.1%) | 42 | 6 |
| Jun 1 | 927 | 68 (7.3%) | 21 | 3 |
| Jun 8 | 1,281 | 88 (6.9%) | 28 | 3 |
| Jun 15 | 1,230 | 81 (6.6%) | 22 | 2 |
- Traffic and the online checkout stayed steady through May 18, and the week of May 25 was the best Online Store week of the period. Only draft orders broke.
- So the cause is in how proof requests reach the owner or get invoiced (the form, the inbox, the designer, or the invoice step), not in site traffic or checkout.
- Facebook & Instagram channel: 1 order each in the weeks of May 18 and Jun 8.

### Against goal
- Yesterday, Nov 10: 5 orders, $640.07 vs 5 and $550. Both goals were met.
- This week, Nov 9 to 15, so far (Nov 9 to 10): 7 orders, $791.98 vs 35 and $3,850. The rest of the week needs 28 orders and $3,058 in 5 days (about 5.6 a day). Same week last year: 91 orders.
- November, Nov 1 to 10: 26 orders, $3,039.60 vs 50 and $5,500 (gap 24 orders, $2,460). Last year, same days: 72 orders, $8,520.88.
- Full-month goal: 255 orders and $27,750. That leaves 229 orders and $24,710 for Nov 11 to 30, mostly at the Black Friday rate of 12 a day from Nov 16. The current pace is about 2.6 a day.

## Proposed for approval
None

## Blocked or unknown
- marketing/data/latest.md still says nothing has been pulled, so no Google Ads, GA4, Search Console or Meta snapshot exists. The open Search Console (Nov 2) and Google Ads (Nov 5) requests already cover the brand vs non-brand question, so I added no new line.
- Why draft orders fell the week of May 18 is unknown from Shopify data. Only the owner can say what changed.
- Live site not needed this run. No Adspirer calls were made.

## Sales impact
Measurement only, no direct orders. It narrows two fixes:
1. Search: the loss is concentrated on home page landings, which is usually where people searching the brand name or clicking a Brand ad arrive. The ads analyst's Friday paid vs organic split should check the Brand campaign and any "memobrick" negative keyword first. Growing search traffic to the gift collection is already working.
2. Draft orders: the site is ruled out as the cause, so the fix is the owner checking the proof and invoice path. Last year's pattern is worth 10 to 15 orders a week before Christmas.

## Next run
Daily pulse tomorrow, when Nov 11 will be stored as a full day. Monday Nov 16: scorecard row for Nov 9 to 15.
