# Google: pause the NonBrand Photo-to-Brick campaign

- Type: ad-change
- Executor: ads-analyst
- Platform: Google Ads, customer 6724994049
- Campaign: MB | Search | NonBrand | Photo-to-Brick | Purchases (24319578231)
- Current value: status ENABLED, budget $20.00/day
- New value: status PAUSED (budget unchanged, so it can be resumed as is)
- Expires: 2026-10-17

## Evidence

- Last 7 days (Oct 5 to 11, its whole life so far): $139.89 spent, 62 clicks, 0 conversions. It took 48% of all Google spend that week.
- Every search term that cost money is a LEGO-brand query, and many have no buying intent for a photo kit: "lego album covers", "lego album cover maker", "make me into a lego character", "the kiss lego", "music album lego", "lego albums". Its keywords have low quality scores ("lego portrait" exact QS 3, $36.89, 0 conversions).
- At the account's 4% click-to-purchase rate, 62 clicks should have produced about 2 purchases. Zero is not proof on its own, but together with the query mix the campaign is losing.
- All four ads promise "Save 20% with code EARLYHOLIDAY20", a code that does not exist in Shopify, plus unsupported claims ("Sizes From 10x10 to 60x60", "Sizes for 1 to 9 people", "Artist-Reviewed Designs"). Pausing stops those too.
- PMax #2 already covers the photo-to-brick queries that convert ("turn picture into lego mosaic", "custom lego portrait") at lower cost per click.

## Expected effect on orders

About zero orders lost (it has produced none) and about $20 a day saved, roughly $140 a week. Google's total daily spend falls from about $41 to about $21 on the last week's pace. **This lowers total daily ad spend; it does not raise it.**

## Risk

A few late conversions could still report (Google's lag is a few days). If any purchase shows up in the next 7 days, I will report it. Some generic queries may go unserved; PMax picks most of them up.

## Rebuild later

If the owner wants a non-brand search campaign for the holidays, I will propose a rebuilt one, paused, with "lego" as a negative, product-based keywords ("photo mosaic kit", "custom brick mosaic", "photo to brick art"), and ad text from `product-facts.md` only.

## How I will judge it in 7 days

- Read-back shows PAUSED.
- Google total conversions and Shopify search/google orders hold within normal range (7d baseline: 8 Google conversions, 6 Shopify google orders) while spend drops by about $140.
