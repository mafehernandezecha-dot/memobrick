# Google PMax #2: remove the EARLYHOLIDAY20 code, the unlisted 20% sale, LEGO trademark text and unsupported claims

- Type: ad-change
- Executor: ads-analyst
- Platform: Google Ads, customer 6724994049
- Campaign: USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv (23775628961)
- Expires: 2026-10-17

## The problem

The live PMax ads tell shoppers to "Use Code EARLYHOLIDAY20" and "Save 20%". That code does not exist in Shopify (checked 2026-10-12: `codeDiscountNodeByCode("EARLYHOLIDAY20")` returned nothing). Anyone who types it at checkout gets an error. That is a direct cause of the weak point "Most checkouts are abandoned" (213 checkouts, 56 purchases in 30 days). The 20% holiday offer is listed in `offers-calendar.md` as planned, with code and dates still to confirm, so ads may not announce it yet.

Five enabled asset groups also use another company's trademark ("LEGO") in ad text, plus claims that `product-facts.md` does not support. These risk disapproval and mislead buyers.

## Exact change (unlink these assets from these asset groups only; the assets stay in the account library)

| Asset ID | Field | Text | Unlink from asset group(s) |
|---|---|---|---|
| 428231204820 | HEADLINE | Early Holiday Sale: 20% Off | 6703639373, 6703639664, 6703639691, 6703758861, 6703759164 |
| 428043431642 | DESCRIPTION | Save 20% with code EARLYHOLIDAY20. Turn your favorite photo into a brick mosaic kit. | 6703639373, 6703639664, 6703639691 |
| 428141051824 | HEADLINE | Use Code EARLYHOLIDAY20 | 6703759164 |
| 323306358581 | HEADLINE | Custom Lego Mosaic Portrait | 6703758774 |
| 323306358602 | HEADLINE | LEGO Mosaics: Build Memories | 6703758774 |
| 323306358608 | HEADLINE | Your Personalized Lego Art | 6703758774 |
| 259246896350 | HEADLINE | Custom LEGO Mosaic Kit | 6703758861 |
| 259246896359 | HEADLINE | Unique LEGO-style Gift | 6703758861 |
| 240187201546 | LONG_HEADLINE | Create Photo Art With Meaning Using Memobricks DIY Kits And Artist Reviewed Designs | 6703639373, 6703639664, 6703639691 |
| 342152803808 | HEADLINE | Best Gift of 2026 - Shop Now | 6703759164 |
| 342152803829 | DESCRIPTION | Upload your photo and get a custom brick art kit delivered fast. Build lasting memories. | 6703759164 |

Current value: these assets are linked and serving. New value: unlinked. Nothing is added; budget, bidding and status are unchanged.

Minimums are kept in every group after removal (checked against the live asset list): each group keeps at least 12 headlines, 3 long headlines and 4 descriptions. Paused groups 6703639661, 6703639667 and 6703639670 are not touched (they still carry EXTRA10, which is active in Shopify but not listed in `offers-calendar.md`; they must not be resumed with that text).

Tool: `remove_pmax_asset_group_asset` through the `google_ads` router, one call per asset and group (19 unlinks), then read back with `list_pmax_asset_group_assets` and record before and after.

## If the owner would rather keep the code

If the owner creates EARLYHOLIDAY20 in Shopify (20% off) and lists it as active, with dates, in `offers-calendar.md` before approving, reject the first three rows only and approve the rest with `changes: keep code rows`. That is the faster path to a working holiday offer.

## Why now

Every day the code stays in the ads, some shoppers reach checkout expecting 20% off and leave when it fails. Google has started showing the holiday text since Oct 6.

## Expected effect on orders

Fewer abandoned checkouts from Google shoppers who expected a discount. Not measurable to the order, but the risk is removed at zero cost. PMax traffic should hold: all groups keep Excellent-level asset counts.

## Risk

Low. Ad strength may drop a step in some groups while Google relearns. Click-through may dip slightly without a discount headline.

## How I will judge it in 7 days

- Read-back shows none of the listed assets linked to enabled groups.
- PMax #2 spend and conversions in the 7 days after the change are within 25% of the 7 days before.
- Shopify reached-checkout to purchased rate for the week (currently 26%) does not fall.
