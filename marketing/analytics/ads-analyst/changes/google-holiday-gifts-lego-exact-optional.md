# Google Holiday Gifts: optional exact-match ad group for LEGO-brand searches that converted (proposal, 2026-10-26)

- Type: ad-change
- Executor: ads-analyst (Google: Chrome task for the owner's Mac)
- Proposal: P-ads-analyst-20261026-7 (optional; Eden decides)
- Platform: Google Ads, customer 672-499-4049
- Campaign: "MB | Search | Holiday Gifts | Purchases | Q4 2026" (24325020428)
- Chrome task: `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-search-expansion.md`, Part D (runs only if this item is approved; otherwise Part D2 adds "lego" as a phrase negative on this campaign)
- Expires: 2026-10-31

## Exact change

New ad group "Brick Portrait Searches (exact)", enabled, with 4 exact keywords and one responsive search ad that is word for word the "Photo to Brick Mosaic" ad in `changes/google-search-expansion-2026-10-26.md` (no "LEGO" anywhere in the ad text, path or assets). Final URL https://mymemobrick.com/collections/the-gift-for-everyone.

| Keyword | Evidence (90-day check, Jul 15 to Oct 13, 2026, from the Oct 14 Chrome run) |
|---|---|
| [lego portrait] | 1.0 conversion in Search #2, 0.5 in Sales-Search-aug 26 |
| [lego portrait maker] | 1.0 in PMax All Products, 1.0 in Brand (AI Max) |
| [custom lego mosaic] | 1.5 in PMax #2 (category), 70 clicks |
| [turn picture into lego set] | 4.0, $698.99 value, PMax #2 (category) |

## Why

These searches bought. The brand skill does not cover LEGO; earlier decisions keep it out of all ad text, and this item keeps that rule. Using another company's trademark as a keyword is generally allowed by Google in the US; ad text is what gets restricted. The trade-off is policy and reputation risk against a few orders, so it is Eden's decision, not mine. Over Sep 14 to Oct 11 the broad LEGO keywords in the NonBrand campaign spent $139.89 with 0 conversions; exact match on only these 4 terms is the narrow version.

## Expected effect on orders

Maybe 1 order every week or two; unknown. PMax #2 already catches some of these searches.

## Risk

A trademark complaint could limit the keywords (the ad text has no LEGO, so the ad itself is not affected). Spend on them comes out of the same $10/day. Rule: pause the ad group at $25 spend with 0 Shopify orders (utm_term).

## How I will judge it in 14 days

Shopify orders with utm_term matching these 4 keywords against their cost.
