# Google Ads audit, 2026-10-13: why we sell 3x less than last year, and how to get it back

By Daniel (ads-analyst), for Eden. Raw numbers: `marketing/analytics/ads-analyst/2026-10-13-numbers.md`. Sales are Shopify net sales after discounts; break-even is a Shopify ROAS of 3.0.

**Data note.** Adspirer was at 150 of 150 included calls today (it resets Nov 6), so I made **zero** Google Ads or Google Analytics calls; past 150 each call is paid. Google figures below come from the Oct 12 pull (windows ending Oct 11). Last year's Google numbers (impression share, search terms) are collected for free by the Chrome task tonight (Part C) and by the export Eden can run (end of this file). Shopify history is complete.

## Top 5 actions, ranked by sales impact

| # | Action | Who | Expected impact |
|---|---|---|---|
| 1 | **Bring back the free-design-proof sales path.** Draft orders (proof sales) fell from 63 in Sep 15 to Oct 12 2025 to 4 this year, and stopped almost completely in the week of May 18, 2026. Find out what changed (proof request form, inbox, staff, site), restore it, and advertise "Free design proof on request" in every ad. | Eden (cause), then ads-analyst (ads) | Up to +2 orders a day now (last year's level), and Q4 2025 had 432 proof orders ($44,177). This is more than half of the gap to last year. |
| 2 | **Run the approved search-term task tonight** (`chrome-tasks/2026-10-13-search-terms.md`): block LEGO, album and freebie searches that never bought, pause 5+ non-converting keywords, add 23 buyer keywords to Holiday Gifts, add the old brand name "photobrick" to the brand campaign. | Owner's Mac (approved in chat) | About $15 to $25 a week of waste stopped; +1 to 2 orders a week by late October at the same spend. Also records last year's impression share for free. |
| 3 | **Send Holiday Gifts clicks to the gift collection and show EARLYHOLIDAY20 in the ads** (P-ads-analyst-20261013-1). The gift collection converted search visitors at 6.3% last holiday vs 2.3% for the page the ads use now. | Approval, then owner's Mac | About +1 order a week now, +3 to 5 a week from Nov 16, same spend. |
| 4 | **Rebuild last year's Google Shopping reach on premade art and frames.** In Q4 2025 about 1,000 search sessions landed on product pages (Mona Lisa, Starry Night, frames, gift collection); this year almost none do, and search sessions overall are down 75%. Check Merchant Center for disapproved or missing products and fix feed titles (see section 5). | Eden (Merchant Center access), then ads-analyst | This is where last year's 313 Q4 Google orders came from; recovering even a third is about +100 orders in the season. |
| 5 | **Holiday budget rule: more money only where Shopify ROAS is 3.0+**, judged on the Part C data and two weeks of post-cleanup numbers, with the first move on Nov 14 so spend is in place before the Nov 17 surge (last year Google orders doubled that week, from 17 to 35). Plus clean conversion tracking (P-ads-analyst-20261013-2). | ads-analyst proposes Nov 14 | Avoids paying for the 2026-style losses (NonBrand, Meta) during the most expensive weeks. |

## 1. What worked before

### The gap, in one table (Sep 15 to Oct 12)

| | 2025 | 2026 | Change |
|---|---|---|---|
| Orders | 157 | 50 | 3.1x fewer |
| Net sales | $16,767 | $5,077 | -70% |
| Online Store orders | 91 | 45 | -46 |
| Draft orders (free proof sales) | 63 | 4 | **-59** |
| Google-referrer orders (paid and organic mixed) | 30 | 15 | -15 |
| Facebook paid (UTM) orders | 20 | 8 | -12 |
| Omnisend email orders | 6 | 0 | -6 |
| Google free listings (product_sync) orders | 4 | 0 | -4 |
| Search sessions | 2,507 | 618 | -75% |
| Sessions with add to cart (whole month of Sep) | 564 | 253 | -55% |

Plain English: the store lost three things at once. (1) The proof-sale path, which used to bring 2 orders a day, stopped in late May. (2) Search traffic fell by three quarters, so Google brings half the orders. (3) Meta and email bring fewer. Ads can fix part of (2) and help (1) by promoting the proof offer; (1) itself needs Eden.

### The seasons to beat (Oct 1 to Dec 31)

| | Q4 2024 | Q4 2025 | Q4 2026 goal (sales-goals.json) |
|---|---|---|---|
| Orders | about 1,729 | 1,281 | about 5/day Oct to Nov 15, 12/day Nov 16 to 30, 20/day Dec 1 to 15 |
| Net sales | $193,836 | $132,500 | |
| Google-referrer orders | 531 ($58,038) | 313 ($31,960) | |
| Draft (proof) orders | 418 | 432 ($44,177) | |
| Facebook paid UTM orders | | 169 ($14,711) | |

Timing (Google-referrer orders a week, 2025): 7 to 8 a week through mid-October, 14 the week of Oct 20, 15 to 17 in early November, then **35 (Nov 17), 41 (Nov 24), 44 (Dec 1), 48 (Dec 8), 37 (Dec 15)**, 27 (Dec 22). The season really starts the week before Thanksgiving and the last strong week ends Dec 15, which matches "Order by Dec 15 for Christmas".

### What sold

- Products, Q4 2025: custom line items in draft orders 412 orders ($40,361); Portrait 16x16 345 ($23,634); 20x20 156 ($21,014); 20x30 72 ($12,955); 30x20 49; 10x10 one face 138 (cheap add-on); frames about 100 orders. In 2026 the 16x16 dropped most (345 in Q4 2025 vs 57 in Jul to Oct 2026), which fits a lost entry-level gift buyer.
- Offers, Q4 2025: 70% of orders used no code. Codes: FLASHSALE 77 orders, HELLOFALL 70, HOLIDAYPREP 48, cyber20 45 (Cyber week), EXTRA10 12. Codes helped but did not drive the season; the product as a gift did. None of those codes is active; only EARLYHOLIDAY20 is (1 use so far).
- Landing pages for search visitors, Q4 2025: home 7,269 sessions at 3.4% checkout; **gift collection 528 at 6.3%**; Mona Lisa 20x20 209 at 4.8%; photo frames 90 at 11%; other premade art pages about 550 at under 1%.

### Which campaigns and keywords

Not readable today (quota). What is known from the Oct 12 pull: the paused campaigns that ran this summer (Search #2 $896 ROAS 1.81, Sales-Search-aug 26 $607 ROAS 1.30, PMax All Products $590 ROAS 1.22) lost money and should stay paused. Last year's campaign list, spend and converting search terms come from Part C of tonight's Chrome task or Eden's export (end of file). I will match them to the Shopify weeks above on Friday.

### How to bring them back

1. Proof path (action 1).
2. Premade art and frames in Shopping (action 4): these pages pulled search buyers last year at no extra creative cost.
3. Gift-intent search with the gift collection as landing page (actions 2 and 3).
4. A code shoppers can use in the ads and on the site in the Black Friday window (EARLYHOLIDAY20 now; any Black Friday code must be created by Eden and listed in offers-calendar.md first).
5. Start the push the week of Nov 10, not Nov 16, because Google buyers doubled the week of Nov 17 last year.

## 2. Search terms: keep, block, add

Windows: Search campaigns last 28 days (2026-09-14 to 10-11); PMax search terms last 30 days. The Chrome task checks every block candidate against the last 90 days (Jul 15 to Oct 13, 2026) and skips any that converted.

### Keep (converted)

| Term | Campaign | Cost | Conv | Note |
|---|---|---|---|---|
| memobrick | Brand Search | $60.58 | 3 | Brand. Keep. |
| memobrick | PMax #2 | $117.57 | 5 ($302.40) | Brand. Not blocked in this task (A-2026W42-004 is on hold, see report). |
| memobrick frame | PMax #2 | $7.83 | 2 ($114.00) | Brand. Keep. |
| photobrick frame | PMax #2 | $8.24 | n/a | Former brand name (store domain photobrickusa). Keep; add as brand keyword. |
| brickme, brick me promo code, brick me reviews | PMax #2 | $6.96 total | 0 | Competitor; too little spend to judge. Keep for now. |

### Block (spent, 0 conversions, not brand)

| Term | Where it spent | Cost | How blocked |
|---|---|---|---|
| lego portrait | NonBrand keyword + search term | $36.89 (keyword) / $9.89 (term) | Exact negative, keyword paused |
| turn picture into lego | NonBrand keyword | $24.49 | Keyword paused |
| turn photo into lego | NonBrand keyword | $17.80 | Keyword paused |
| custom lego portrait | NonBrand keyword | $14.83 | Keyword paused |
| unique personalized christmas gifts | Search keyword, QS 3 | $12.39 | Keyword paused |
| custom lego photo | PMax | $13.96 | Exact negative |
| custom lego mosaic | NonBrand | $7.31 | Exact negative |
| lego photo mosaic, lego picture custom, lego portrait maker | PMax | $6.49, $6.13, $5.36 | Exact negatives |
| lego album covers, lego album cover maker, music album lego, lego albums, the kiss lego | NonBrand | $1.5 to $4.45 each | Exact negatives plus phrase "lego album", "album cover lego" |
| lego from picture, lego photo editor, make me into a lego character, make yourself into lego, customize legos to look like you | NonBrand | $1.5 to $2.5 each | Exact negatives plus phrase "lego character" |
| Non-buyer intent: "for free", "free download", "free printable", "printable", "pdf", "download", "template", "svg", "coloring page", "jobs", "careers", "how to make", "lego store", "lego set", "lego minifigure", "minifig" | Preventive | | Phrase negatives |

Spend on these terms in the windows: about $172 (all $139.89 of NonBrand, plus about $32 of named PMax LEGO terms), with 0 conversions.

### Add (new high-intent terms, Holiday Gifts 24325020428, same $10/day)

| Ad group | Keywords (phrase unless in brackets) |
|---|---|
| Christmas Photo Gifts | custom photo mosaic; photo mosaic kit; brick mosaic kit; custom brick mosaic; brick mosaic portrait; mosaic portrait from photo; turn photo into mosaic; diy photo mosaic; personalized photo gift; [personalized photo gifts]; christmas gift from photo; photo gift for christmas; personalized christmas gift for family |
| Gifts For Family & Couples | anniversary gift from photo; couple photo gift; family photo gift; gift for grandparents photo; custom pet portrait; pet memorial gift; photo art kit; brick art kit; family activity gift; build your own portrait |
| Brand (17949461961) | [photobrick]; photo brick; photobrick usa |

No "LEGO" keywords anywhere.

## 3. Lost impression share

| Campaign | Window | Search IS | Lost IS (budget) | Lost IS (rank) |
|---|---|---|---|---|
| PMax #2 23775628961 | 2026-09-14 to 10-11 | 14.0% | 0.1% | about 86% (derived) |
| NonBrand 24319578231 (paused Oct 12) | 2026-09-14 to 10-11 | 10.7% | 83.6% | about 6% |
| Brand 17949461961 | 2026-09-14 to 10-11 | 84.4% | not returned | up to 15.6% |
| Holiday Gifts 24325020428 | 2026-10-06 to 10-11 | 12.3% | 11.3% | about 76% |
| All campaigns | 2025-09-15 to 10-13 and Q4 2025 | **not read yet** (quota) | | Chrome task Part C tonight, or Eden's export |

Plain English:
- **Brand:** we show for 84% of searches for our name. Fine. The other 16% is mostly people who find us organically anyway.
- **PMax:** it is not short of money (0.1% lost to budget). It shows for only 14% of the searches and shopping slots it could, because its ad rank is low. More budget would not help; better product titles, images and a video would.
- **Holiday Gifts:** it misses about 88 of every 100 chances to show, and about 76 of those are lost to rank, not money. Its keywords were generic and its Quality Score low. The new specific keywords and the gift-collection landing page are the free fix.
- **NonBrand** was the only campaign short of money, and it never sold: correctly paused.
- **Buyers missed vs last year:** Shopify search sessions were 2,507 in Sep 15 to Oct 12 2025 and 618 this year. That is about 1,900 search visits a month, which at last year's 1.4% checkout rate is about 27 orders a month. Part C will say how much of that is paid (impression share) vs organic ranking.

Fixes without raising spend: no budget moves today (no campaign is proven at 3.0 on Shopify). Improve rank through keywords (tonight), landing page (proposal 1), feed titles and images, and a short PMax video (section 5).

## 4. Conversion tracking

| Check | Finding (Oct 12 read) | Status |
|---|---|---|
| Primary purchase conversion | "Google Shopping App Purchase" (809203335), purchase, data-driven, 90-day click, 1-day view | OK |
| Other primaries | "Calls from Smart Campaign Ads" (532070521), "Smart campaign ad clicks to call" (830348821) are primary | Fix: set to secondary (P-ads-analyst-20261013-2) |
| Value | Order value plus about $30 Google adds per new customer | Platform ROAS reads high; judge on Shopify |
| Counted once | "Every" conversion for purchase, correct for a store; only one purchase action is primary | OK |
| Draft-order / proof sales | Not credited to Google (no click ID on draft-order invoices) | Undercounts Google, which matters more if proofs come back. Safest free fix: once Eden says how proofs are requested, add a **secondary** "Proof request" conversion (visible, not used for bidding). Later option: monthly offline conversion upload of paid draft orders with their click ID, only if the proof form captures it. |
| Google paid vs organic in Shopify | Google Ads has no UTMs, so Shopify mixes paid and organic Google | Suggest adding a tracking template `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}` at account level later, as its own proposal, after the holiday copy changes settle |

## 5. Budget, feed, creative, remarketing, holiday plan

**Budget (same total).** Live Google budgets: PMax $48, Brand $35, Holiday Gifts $10 (NonBrand $20 paused) = $93/day maximum; actual spend about $25 to $35/day. No move today: no campaign has 10+ Shopify-confirmed purchases at 3.0. Brand spends about $9/day of its $35, so its budget is not limiting anything. Total spend stays at or below today.

**Merchant Center feed (Eden checks, I cannot read it).** Last holiday's search buyers landed on premade art and frame pages; this year those pages get almost no search visits. In Merchant Center > Products > Needs attention: fix disapproved or limited items. Titles: lead with what people search, for example "Custom Photo Brick Mosaic Kit 20x20 in, Personalized Photo Gift" for the custom kits and "Starry Night Brick Mosaic Kit 20x20 in, DIY Art Kit" for premade art. Never use "LEGO" in titles. Images: one clean white-background shot of the finished mosaic first, one lifestyle shot second.

**Creative gaps.** PMax runs one YouTube video (7_kR3ntRvkI, the photo-to-mosaic clip). Gaps: a 15-second vertical gift video (unboxing, build, reveal) and a "free design proof" message. Owner footage cleared in `marketing/social/footage-rights.md` (Memobrick videos, Videos ad final, video 2026 billo) is enough; I will propose the cut on Friday.

**Remarketing with EARLYHOLIDAY20.** PMax #2's retargeting asset groups get the code in tonight's PMax refresh (A-2026W42-001): "Use Code EARLYHOLIDAY20" and a description with the code in Products - Retargeting, and a "20% off now" long headline in Full Asset - Retargeting, so Google remarketing is covered at no extra spend. Meta retargeting (campaign 120252347640260597, paused, $10/day) could carry the same code; I will judge that with the Meta numbers on Friday.

**Holiday plan, Nov 16 to Dec 15.**

| Date | Step |
|---|---|
| Oct 13 to 16 | Search-term task runs; proposals 1 and 2 decided; Eden checks the proof path and Merchant Center |
| Oct 16 (Friday run) | Read Part C (last year's IS and terms); first week of new keywords |
| Nov 6 | Adspirer quota resets; one wide read of Q4 2025 by campaign and week (2 to 3 calls) |
| Nov 10 to 14 | Propose budget for the season: only campaigns at Shopify ROAS 3.0+ over 14 days get more, each step at most +20%, and any total increase stated in bold for Eden |
| Nov 16 to Dec 20 | Daily pacing check (spend vs Shopify orders, campaigns spending fast with no purchases, disapprovals); propose a pause for anything wasting $50+ a day |
| Dec 15 | Holiday Gifts ends; switch copy to gift cards if Eden lists them as an offer |

## Exports Eden can run (only if the Chrome task cannot read Part C)

Google Ads > Campaigns > set date range > Columns: Campaign, Campaign type, Cost, Clicks, Conversions, Conv. value, Search impr. share, Search lost IS (budget), Search lost IS (rank) > Download (CSV). Three files: Sep 15 to Oct 13 2025, Oct 1 to Dec 31 2025, Oct 1 to Dec 31 2024.
Google Ads > Insights and reports > Search terms > date Oct 1 to Dec 31 2025 > columns Search term, Campaign, Cost, Conversions, Conv. value > Download. Save the CSVs in Drive (any folder named "Google Ads exports") and tell Daniel.
