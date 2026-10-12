# ads-analyst 2026-10-12 (first run, full 90-day audit)

## Summary

Ads spent $2,641.59 in 28 days ($611 Google, $2,030 Meta) and $10,814 in 90 days, against $5,071 and $20,309 of whole-store Shopify net sales. Nothing is at the 3.0 break-even on Shopify: Meta is 0.49 (28d), Google is at most 2.55 even if every Google search order is credited to ads.
Worst live problem: Google ads in 3 campaigns tell shoppers to use code EARLYHOLIDAY20, which does not exist in Shopify. Six changes proposed; together they cut about $40 a day of spend that brought no orders and fix the broken code text.

## Account summary

| | 7 days | 28 days | 90 days |
|---|---|---|---|
| Google spend | $290.73 | $611.47 | $4,343.00 |
| Meta spend | $564.61 | $2,030.12 | $6,471.26 |
| Total ad spend | $855.34 | $2,641.59 | $10,814.26 |
| Shopify net sales, whole store | $2,269.56 (20 orders) | $5,071.41 (48) | $20,309.45 (203) |
| Meta, Shopify-attributed (utm_medium=paid) | $344.04 (3 orders), ROAS 0.61 | $1,003.17 (9), ROAS 0.49 | $2,649.04 (25), ROAS 0.41 |
| Google, Shopify search/google referrer (paid and organic mixed, upper bound) | $765.75 (6), ROAS 2.63 or less | $1,557.13 (15), ROAS 2.55 or less | $7,180.11 (77), ROAS 1.65 or less |
| Google platform-reported (hint only) | 7.98 conv, ROAS 2.90 | 16.98 conv, ROAS 2.31 | 91.99 conv, ROAS 2.07 |
| Meta platform-reported (hint only) | 7 purchases | 20 purchases, ROAS 0.91 | 78 purchases, ROAS 1.04 |

Platform and Shopify revenue are never added together. Raw numbers: `marketing/analytics/ads-analyst/2026-10-12-numbers.md`.

The 3 most important moves:

1. **Remove the EARLYHOLIDAY20 code and "20% Off" sale text from every live Google ad** (PMax #2 and Holiday Gifts; NonBrand stops when paused). The code is not in Shopify, so shoppers who try it fail at checkout, which feeds the "most checkouts are abandoned" weak point. Owner alternative: create the code and list it as active in `offers-calendar.md`.
2. **Pause Google NonBrand Photo-to-Brick (24319578231).** $139.89 in 7 days, 62 clicks, 0 conversions, all on LEGO-brand queries such as "lego album covers". Saves about $20 a day; about zero orders lost.
3. **Cut Meta ALWAYON PROMO -v1 (120252425110090597) from $40 to $20 a day.** 7 Shopify orders for $717 (ROAS 1.09), 0.69 last week. Saves about $20 a day for about 1 fewer order a week, while the new Proven Videos campaign gets its test.

## Verdict per campaign (live campaigns)

| Campaign | Platform | 28d spend | Evidence | Verdict |
|---|---|---|---|---|
| USA PMAX #2 (23775628961), $48/day | Google | $380.50 | 12.48 platform conv, ROAS 2.92 (3.22 over 90d on 55.5 conv). 45% of its search spend is our own brand name ("memobrick" $117.57), brand negatives not working. Google adds about $30 per new customer to conversion value, so on Shopify terms the ROAS is roughly 1.9 to 2.9. Not budget-limited (lost IS to budget 0.1%). | **Borderline.** Keep; fix copy, add brand negatives, then judge on non-brand only. Do not raise budget. |
| Search Campaign #1 - 2026, brand (17949461961), $35/day | Google | $73.96 | 4.49 conv, ROAS 4.08 platform, $2.75 per brand click, impression share 84% | **Too early** (under 10 purchases). Keep as brand defense; possible holdout test after the holidays. |
| NonBrand Photo-to-Brick (24319578231), $20/day | Google | $139.89 | 0 conversions on 62 clicks, LEGO-brand queries, QS 3 to 6, invalid code in all 4 ads | **Losing.** Pause. |
| Holiday Gifts Q4 2026 (24325020428), $10/day, ends Dec 15 | Google | $17.12 | 14 clicks, 0 conv; ads promise a code that does not exist | **Too early.** Keep; fix copy. |
| ALWAYON PROMO -v1 (120252425110090597), $40/day | Meta | $717.44 | Shopify 7 orders, $779.31, ROAS 1.09 (0.69 last 7 days); Meta says 13 purchases, 1.76 | **Losing.** Halve budget; pause if still under 1.5 next week. |
| Proven Videos Oct26 (120252562193330597), $40/day | Meta | $64.58 | 0 Shopify orders, 1 Meta purchase (Dog_vid, $26.73) | **Too early.** Keep, judge Oct 19. |

Paused campaigns already stopped most of the 90-day waste: Meta "CHRISTMAS SET UP 2024 - Copy" ($495.80 in the last 28 days for one $13.45 purchase), "USA_ALWAYS ON_2026 - Copy" ($918 for 2 Shopify orders), Google Search #2 ($896, ROAS 1.81), Sales-Search-aug 26 ($607, 1.30), PMax All Products ($590, 1.22). None should be resumed.

## Done

- Status set to working, then pushed (commit "ads-analyst: status working").
- Approvals: `check.py approvals` printed no approved items for ads-analyst. Nothing applied.
- Pulled Google Ads (Adspirer) campaign performance for 7, 28 and 90 days, budgets, search terms (Search and PMax), ad text for Holiday Gifts and NonBrand, all PMax asset groups and their text assets, conversion actions, Holiday Gifts dates.
- Pulled Meta campaign data for 7, 28 and 90 days, ad-level data and creative text for both active campaigns, and the benchmark tool (the trend tool returned no data).
- Pulled Shopify orders and net sales by referrer and by UTM for the same windows. Meta's ad UTMs carry the campaign ID, so Meta campaigns can be judged on Shopify orders. Google has no UTMs, so paid and organic Google stay mixed.
- Checked the context from the owner's Oct 6 Google work against the live account:
  - Break-even 3.0 on Shopify net sales: applied.
  - Purchase as the only primary conversion with 1-day view-through: Purchase (809203335) is primary with 90-day click and 1-day view-through, as stated. But two Smart campaign call actions (532070521, 830348821) are also primary. No Smart campaign runs, so they likely count nothing; flagged, no change proposed.
  - PMax #2 brand negatives: **not effective**; "memobrick" is the PMax campaign's top search term. Proposed a fix.
  - PMax #2 paused asset groups: confirmed 3 paused (Full Asset - Keyword, Mother's Day 1, Products - Keyword), 6 enabled.
  - Brand campaign 17949461961: confirmed, enabled, $35/day.
  - Holiday Gifts 24325020428 ends Dec 15: confirmed (starts Oct 6).
  - Ads mention EARLYHOLIDAY20 and "Order by Dec 15": confirmed. Dec 15 is supported by the Facts table. EARLYHOLIDAY20 is not.
- Offer codes used in ads that `offers-calendar.md` does not list as active:
  - **EARLYHOLIDAY20** (and "Early Holiday Sale: 20% Off"): live in PMax #2 (5 enabled asset groups), Holiday Gifts (2 ads), NonBrand (4 ads). **Does not exist in Shopify.**
  - **EXTRA10**: only in paused PMax asset groups 6703639661 and 6703639667. Active in Shopify since 2020 (515 uses) but not in the offers calendar. Those groups must not be resumed with it.
- Other ad text that breaks the brand rules (details in the numbers file, section 6): LEGO trademark headlines in 2 enabled PMax groups; "Artist Reviewed Designs", "Best Gift of 2026", "delivered fast" in PMax; "Sizes From 10x10 to 60x60", "Sizes for 1 to 9 people" in NonBrand; Meta video "PV | Merriage_video" says "ready to build or display" (implies an assembled option that is not offered) and the Meta "dog" ad shows five stars with no source. Meta creative text cannot be edited in place; I will propose replacements next week if the owner wants them.
- Wrote 6 ad-change drafts (below). Copy check passed on all of them.

## Proposed for approval

### P-ads-analyst-20261012-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pmax-remove-invalid-code-and-claims.md
- Reason: If approved, ads-analyst unlinks 19 assets from PMax #2 asset groups (EARLYHOLIDAY20, which does not exist in Shopify, the unlisted 20% sale, LEGO trademark and unsupported claims) so shoppers stop failing a code at checkout.
- Expires: 2026-10-17
- Status: pending

### P-ads-analyst-20261012-2
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-rsa-copy-fix.md
- Reason: If approved, ads-analyst replaces the text of the 2 Holiday Gifts search ads so they stop promising code EARLYHOLIDAY20, keeping the verified Dec 15 order-by date.
- Expires: 2026-10-17
- Status: pending

### P-ads-analyst-20261012-3
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pause-nonbrand-photo-to-brick.md
- Reason: If approved, ads-analyst pauses Google NonBrand Photo-to-Brick (24319578231): $139.89 in 7 days, 0 conversions, LEGO-brand queries; saves about $20 a day.
- Expires: 2026-10-17
- Status: pending

### P-ads-analyst-20261012-4
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pmax-brand-negatives.md
- Reason: If approved, ads-analyst adds 5 "memobrick" negatives to PMax #2 so it stops paying for our own brand searches (45% of its search spend) and its real non-brand result shows.
- Expires: 2026-10-17
- Status: pending

### P-ads-analyst-20261012-5
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-cut-alwayon-promo-v1-budget.md
- Reason: If approved, ads-analyst lowers Meta ALWAYON PROMO -v1 (120252425110090597) from $40 to $20 a day; Shopify ROAS 1.09 over 28 days and 0.69 last week.
- Expires: 2026-10-17
- Status: pending

### P-ads-analyst-20261012-6
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-new-ad-photo-to-mosaic-reel.md
- Reason: If approved, ads-analyst creates one new Meta ad, PAUSED, from the planner's photo-to-mosaic reel in the Proven Videos ad set, linking to the editor; launching it is a separate approval.
- Expires: 2026-10-17
- Status: pending

## Blocked or unknown

- Paid vs organic Google orders cannot be separated in Shopify: Google Ads has no UTM tracking template. Every Google judgment above uses platform numbers or the upper bound. A tracking template (utm_source=google&utm_medium=cpc&utm_campaign={campaignid}) would fix this; I can propose it next week as an ad-change.
- Product margins: unknown (Facts table). Break-even 3.0 from the owner's Oct 6 notes is used instead of a cost-per-purchase margin.
- Holiday ad budget: unknown (Facts table). Needed before any Black Friday scale-up proposal.
- Holiday offer code and dates: unknown. Decide whether EARLYHOLIDAY20 becomes the real code; until then ads must not show it.
- Adspirer monthly quota: 121 of 150 calls were already used at the start of this run (about 20 more used today). Daily pacing from Nov 16 will need quota; the owner may need a higher Adspirer plan or I will lean on the Meta and Shopify connectors for pacing.
- Meta performance-trend tool returned no data for this account, so creative fatigue (falling click-through over time) could not be measured. Current frequencies are low (1.2 to 1.9) except the paused retargeting campaign (6.3).
- Organic social results: none yet (first planner post goes live Oct 12), so no proven organic winner exists to turn into an ad. The new-ad proposal is a test.
- Shopify "mymemobrick" internal referrer took 7 of 20 orders last week. Some of those may be ad-driven orders with lost source; this understates both platforms on Shopify.
- Google search-term data in the cache covered $140.64 of $230.97 Search spend for 28 days; the rest is not visible.

## Sales impact

- Weak point addressed: "Most checkouts are abandoned". Removing a non-existent discount code from Google ads stops shoppers from reaching checkout expecting 20% off and leaving when the code fails. Effect not measurable per order, but it removes a known failure at zero cost.
- Weak point addressed: "Visitors stopped adding to cart". The new Meta ad sends people straight into the photo editor instead of the homepage.
- Spend: proposals 3 and 5 cut about $40 a day (about $280 a week) that brought about 1 Shopify order a week in total. Expected order loss: about 1 a week; money saved can fund what works once a winner is proven before Black Friday.
- No proposal raises spend. PMax is not budget-limited and nothing is at 3.0 on Shopify, so there is no honest case to scale yet.

## Next run

- Friday 2026-10-16: weekly run (7 and 28 days). Apply any approved items, read back and record before and after. Judge Proven Videos and the PMax brand split.
- Nov 16 to Dec 20: daily pacing check (step 6).

## Approved changes applied

Applied 2026-10-12, after the owner's approval in commit e64b4b5. `check.py approvals --agent ads-analyst --today 2026-10-12` printed A-2026W42-001, 002, 003 and 005. Items 004 and 006 are still pending and were not touched. Nothing else was changed.

### A-2026W42-003: pause Google NonBrand Photo-to-Brick (24319578231). Applied.

| | Before | After |
|---|---|---|
| Status | ENABLED | PAUSED |
| Budget | $20.00/day | $20.00/day (unchanged, so it can be resumed as is) |

Tool: `pause_campaign`. It reported ENABLED -> PAUSED, read from the API. I did not spend a separate list call on a second read-back (see the Adspirer quota note below). Friday's run will confirm PAUSED.

### A-2026W42-002: replace the text of the 2 Holiday Gifts RSAs (24325020428). Applied.

Tool: `update_ad_content`, then a read-back of each ad with `get_ad_creative` (fresh, not cached). Final URL (https://mymemobrick.com/products/2-2-boards), path1 "products", budget and bidding are unchanged. Both ads are ENABLED and back under Google review (ad strength PENDING).

Ad 827188828472 (Gifts For Family & Couples, 199189087365):
- Removed: headlines "Early Holiday Sale: 20% Off", "Use Code EARLYHOLIDAY20", "Free Design Preview"; descriptions "Save 20% with code EARLYHOLIDAY20. A Christmas gift they'll never forget." and "Order by Dec 15 for Christmas. Free design preview before you buy."
- Added: headlines "See Your Photo As A Mosaic", "40+ Brick Colors", "Free Design Proof On Request"; descriptions "Upload your photo, see it as a mosaic right away, and pick the kit size you want." and "Order by Dec 15 for Christmas. Preview your mosaic for free before you buy."
- Read-back: the 15 headlines and 4 descriptions exactly match the draft, and no EARLYHOLIDAY20 or "20% Off" text is left.

Ad 827188857755 (Christmas Photo Gifts, 197804230541):
- Same removals and additions. It keeps "Personalized Christmas Gift" as headline 5, as the draft says.
- Read-back: the 15 headlines and 4 descriptions exactly match the draft, and no code or 20% text is left.

### A-2026W42-005: Meta ALWAYON PROMO -v1 (120252425110090597) daily budget. Applied.

| | Before | After |
|---|---|---|
| daily_budget | $40.00 | $20.00 |
| Status | ACTIVE | ACTIVE (IN_PROCESS right after the edit, which is normal) |

Tool: `ads_update_entity` (daily_budget 2000 cents). The response said is_draft false and status_forced_to_paused false, so the change is live, not staged. Read back with `ads_get_ad_entities`: daily_budget 20 USD. Meta's total daily budget goes from $80 to $60.

### A-2026W42-001: unlink invalid-code, 20% sale, LEGO and claim assets from PMax #2 (23775628961). Partly applied: 8 of 19 unlinks.

Why only 8: Adspirer showed 141 of 150 included calls used this month (the quota resets 2026-11-06). Past 150, each call costs $0.50, and the owner did not approve that cost. I spent the 9 included calls on the most harmful links (8 unlinks plus 1 read-back): every link that tells shoppers to use EARLYHOLIDAY20, and four of the five "20% Off" headlines. The tool requires `confirm_delete: true`. It only unlinks: the assets stay in the account's asset library.

Unlinked (confirmed by the `list_pmax_asset_group_assets` read-back):

| Asset | Text | Unlinked from |
|---|---|---|
| 428141051824 | Use Code EARLYHOLIDAY20 | 6703759164 |
| 428043431642 | Save 20% with code EARLYHOLIDAY20. Turn your favorite photo into a brick mosaic kit. | 6703639373, 6703639664, 6703639691 |
| 428231204820 | Early Holiday Sale: 20% Off | 6703639373, 6703639664, 6703639691, 6703758861 |

The read-back shows no EARLYHOLIDAY20 text left in any asset group. Every group still meets Google's minimums.

**Still linked. The owner can remove these by hand in about 5 minutes, or I will do them on Friday through Adspirer if the owner accepts about $5.50 in extra calls (11 x $0.50):**

| Asset group | Asset | Field | Text |
|---|---|---|---|
| 6703759164 (Products - Retargeting) | 428231204820 | Headline | Early Holiday Sale: 20% Off |
| 6703759164 (Products - Retargeting) | 342152803808 | Headline | Best Gift of 2026 - Shop Now |
| 6703759164 (Products - Retargeting) | 342152803829 | Description | Upload your photo and get a custom brick art kit delivered fast. Build lasting memories. |
| 6703758774 (Products - Demographics) | 323306358581 | Headline | Custom Lego Mosaic Portrait |
| 6703758774 (Products - Demographics) | 323306358602 | Headline | LEGO Mosaics: Build Memories |
| 6703758774 (Products - Demographics) | 323306358608 | Headline | Your Personalized Lego Art |
| 6703758861 (Products - Full Audience) | 259246896350 | Headline | Custom LEGO Mosaic Kit |
| 6703758861 (Products - Full Audience) | 259246896359 | Headline | Unique LEGO-style Gift |
| 6703639373 (Full Asset - Full Audience) | 240187201546 | Long headline | Create Photo Art With Meaning Using Memobricks DIY Kits And Artist Reviewed Designs |
| 6703639664 (Full Asset - Retargeting) | 240187201546 | Long headline | (same) |
| 6703639691 (Full Asset - Demographic) | 240187201546 | Long headline | (same) |

Exact clicks in Google Ads (account 672-499-4049):
1. Go to Campaigns, open "USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv", then click Asset groups.
2. Open the asset group named in the table and click Edit asset group.
3. Under Headlines, Long headlines or Descriptions, hover over the text in the table and click the X next to it. Do this for each row in that group.
4. Click Save. Repeat for the other groups: 6703759164 (3 rows), 6703758774 (3), 6703758861 (2), and 6703639373, 6703639664, 6703639691 (1 each).
5. Leave the paused groups 6703639661, 6703639667 and 6703639670 alone. Groups 6703639661 and 6703639667 still say EXTRA10; do not resume them as they are.

## Done (approved items)

- A-2026W42-003: applied. Google campaign 24319578231 ENABLED -> PAUSED.
- A-2026W42-002: applied. RSAs 827188828472 and 827188857755 rewritten and read back. No code or 20% text left. Under Google review.
- A-2026W42-005: applied. Meta campaign 120252425110090597 daily_budget $40 -> $20, live, read back.
- A-2026W42-001: partly applied. 8 of 19 unlinks done (all EARLYHOLIDAY20 links, plus "20% Off" in 4 of 5 groups). 11 links are left for the owner (clicks above) because the Adspirer free call quota ran out. Do not archive this item until the rest are done.
