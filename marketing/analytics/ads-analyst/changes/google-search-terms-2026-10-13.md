# Google: search-term cleanup and new buyer keywords (approved by owner in chat 2026-10-13)

- Type: ad-change
- Executor: ads-analyst (Google: Chrome task for the owner's Mac)
- Approval: Approved by owner in chat 2026-10-13 ("delete the ones not working and add new ones based on your analysis of what would work best for Memobrick")
- Platform: Google Ads, customer 6724994049
- Chrome task: marketing/analytics/ads-analyst/chrome-tasks/2026-10-13-search-terms.md (Status: ready)
- Expires: 2026-10-18

## Exact change

| Part | Campaign | Current value | New value |
|---|---|---|---|
| B1, B2 | Holiday Gifts 24325020428, NonBrand 24319578231 (paused), PMax #2 23775628961 | No shared negative list; LEGO, album and freebie searches serve | Shared list "MB negatives 2026-10-13": 16 exact LEGO terms that spent with 0 conversions and 19 phrase negatives for non-buyer intent. Each term is checked against the 90-day search-term report first and skipped if it converted |
| B3 | Search campaigns | [lego portrait] $36.89, [turn picture into lego] $24.49, "turn photo into lego" $17.80, [custom lego portrait] $14.83, "unique personalized christmas gifts" $12.39 (28 days, all 0 conv) | Paused (not removed), plus any other non-brand keyword with $15+ and 0 conversions in 90 days |
| B4 | Holiday Gifts 24325020428 | Generic Christmas gift keywords, IS 12.3%, about 76% lost to rank | 23 new phrase/exact buyer keywords (photo mosaic, brick mosaic kit, personalized photo gift, anniversary, couple, family, pet portrait), no "LEGO" terms |
| B5 | Brand 17949461961 | No keyword for the former brand name | [photobrick], "photo brick", "photobrick usa" (the store's Shopify domain is photobrickusa; "photobrick frame" spent $8.24 in PMax) |
| C | All | | Read only: impression share and lost IS by campaign for Sep 15 to Oct 13 2026, the same dates in 2025, and Q4 2025; top 25 converting search terms in Q4 2025 |

No budget, bid strategy, ad, asset or status change. Brand terms (memobrick, memo brick, photobrick) are never added as negatives. Competitor terms (brickme, brick me) stay: under $7 spent in 30 days, not meaningful waste. "free" alone is not blocked, because buyers search "free shipping"; only "for free", "free download" and "free printable" are.

## Why

In the last 28 to 30 days every paid LEGO-brand search (Search and PMax) spent with 0 conversions: all $139.89 of NonBrand spend and about $32 of named PMax LEGO terms. LEGO is another company's trademark, so these ads also carry policy risk. Holiday Gifts loses about 76% of its possible impressions to ad rank, because its keywords are generic ("unique personalized christmas gifts", QS 3). Specific product-intent keywords ("photo mosaic kit", "custom brick mosaic") match the ad and the page better, which raises Quality Score and ad rank without raising bids or budget.

## Expected effect on orders

Small but immediate: about $15 to $25 a week stops going to searches that never bought, and the same $10/day in Holiday Gifts reaches people looking for a photo mosaic gift. Expect +1 to 2 orders a week from Holiday Gifts by late October if CTR and Quality Score rise. The larger value is Part C: last year's impression share and converting terms, which decide the Nov 16 to Dec 15 budget plan.

## Risk

A negative could block a rare buyer; the 90-day check in Part A guards against blocking anything that converted. New keywords could spend the $10/day on clicks that do not buy; spend cannot rise because the budget is unchanged.

## How I will judge it in 7 days

- Search-term report: no spend on the blocked terms.
- Holiday Gifts: CTR above 3.93% (last week), average Quality Score of new keywords 5 or more, at least 1 conversion and 1 matching Shopify google-referrer order by Oct 20.
- Total Google spend unchanged or lower.
