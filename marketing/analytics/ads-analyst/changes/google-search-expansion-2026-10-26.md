# Google Search holiday expansion: keywords, negatives, ads and bidding (proposal, 2026-10-26)

- Type: ad-change
- Executor: ads-analyst (Google: Chrome task for the owner's Mac)
- Proposal IDs: P-ads-analyst-20261026-5 (this file: keywords, negatives, ads), P-ads-analyst-20261026-6 (bid strategy, `changes/google-holiday-gifts-bidding-2026-10-26.md`), P-ads-analyst-20261026-7 (optional LEGO-search ad group, `changes/google-holiday-gifts-lego-exact-optional.md`)
- Platform: Google Ads, customer 672-499-4049
- Campaign: "MB | Search | Holiday Gifts | Purchases | Q4 2026" (24325020428), $10/day, ends Dec 15
- Chrome task (apply, after approval only): `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-search-expansion.md` (Status: waiting for approval)
- Chrome task (read only, any time): `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-keyword-planner-read.md`
- Expires: 2026-10-31
- Requested by: Eden, 2026-10-26 ("we need to add much for search terms and key words as well", and whether to switch to Maximize Conversions)

**Nothing in Google Ads has been changed.** This is a proposal. Adspirer has no free calls until Nov 6 and no Google snapshot exists, so every live Google figure below that I could not read is marked **missing**.

## Summary

| Part | What | Count |
|---|---|---|
| 1 | New keywords in 7 new tight ad groups plus the existing "Christmas Photo Gifts" ad group | **90** (86 phrase, 4 exact) |
| 2 | Shared negative list "MB negatives 2026-10-26" on Holiday Gifts (and the paused NonBrand campaign) | **52** |
| 3 | One responsive search ad per new ad group (15 headlines, 4 descriptions, no pins) | **7 ads** |
| 4 | Bidding: Maximize Conversion Value without a target now; tROAS later only with 15+ conversions in 30 days | separate item -6 |
| 4 | Budget: stays $10/day until Nov 15; then $15, $20, $25 a day only if each week passes the Shopify ROAS 3.0 gate | proposed again Nov 13 |
| 5 | Chrome prompts: apply (after approval) and Keyword Planner read (now) | 2 files |

## What this is built on (and what is missing)

| Input | What it gave | State |
|---|---|---|
| Oct 13 search-term plan (`changes/google-search-terms-2026-10-13.md`) | 23 buyer keywords and 35 negatives | **Never applied.** The Oct 14 Chrome run stopped at the first write (permission check) and the campaign names in that prompt did not match. This proposal replaces its Holiday Gifts parts (B1, B2, B4). |
| Oct 14 Chrome run, Part A (read only, Jul 15 to Oct 13) | Converted search terms: [lego portrait] 1.5 conv, [lego portrait maker] 2 conv, "custom lego mosaic" 1.5 conv (PMax), "turn picture into lego set" 4 conv / $698.99 (PMax), "lego photos" 2 conv (PMax). 31 of 35 negatives passed the check | Used: those 4 converting terms are never negatives here |
| Oct 14 Chrome run, existing lists | "brand searches" (4,682 keywords, 5 campaigns), "Keywords Negativas" (2,923, 11 campaigns), "Keywords Negativas Photobrick" (11, 4) | Contents unknown. They could block new keywords or our brand; the apply prompt checks this read-only |
| Oct 13 audit | Holiday Gifts Search IS 12.3%, lost to rank about 76%, lost to budget 11.3% (Oct 6 to 11); generic keyword "unique personalized christmas gifts" QS 3 | Old (Oct 11). Current keywords, QS and IS: **missing** |
| Today's audit (`reports/2026-10-26-ads-analyst-audit.md`) | Google search visitors convert 3.0%; gift collection 7.7% (6 of 78), /products/2-2-boards 1.9% | Shopify, live today |
| Shopify catalog (read today) | Custom kits 10x10 $35 to 60x60 $853; "Art Gift Kit, Buy Now, Personalise Later" (/products/unlimited-memobrick) $35 to $853, no photo needed to buy; gift collection "Custom Photo Brick Mosaic Kits" (/collections/the-gift-for-everyone, 23 products); Free Proof page /pages/free-preview. **No pet page or pet collection exists.** | Live |
| Shopify best sellers | Q4 2025: 16x16 345 orders, 20x20 156, 10x10 one face 138, 20x30 72, 30x20 49, frames about 120. Last 60 days: 20x20 34, 16x16 21, 20x30 10, 10x10 10, 30x20 8, Art Gift Kit 2 | Live |
| Last holiday (Shopify, Google referrer) | Q4 2025: 313 Google orders, $31,960 (about $102 each). Weekly: 15 to 17 in early November, then 35 (Nov 17), 41, 44, 48 (Dec 8), 37 (Dec 15) | Live (from Oct 13 audit) |
| Search Console | | **missing**: never pulled (open requests from Oct 14 and Oct 20 in `marketing/data/requests.md`). No query evidence here comes from Search Console |
| Keyword volumes and CPCs | | **missing**: the read-only Keyword Planner prompt fetches them |
| Current bid strategy, 30-day cost, conversions, CPC, current keywords | | **missing**: Eden's read-only Chrome report |
| SEO keyword map (`marketing/seo/strategist/keyword-map.md`) | Gift themes and existing blog targets (volumes unknown there too) | Used for themes |

Evidence codes in the keyword tables: "Oct 13 plan" means the keyword was picked in the Oct 13 audit from product and page fit (no conversion data of its own); "SEO keyword map" means the SEO strategist targets it; "none yet" means it is new and is judged only by its first 14 days.

## LEGO: keywords vs ad text

The `memobrick-brand` skill does not mention LEGO. It lists the approved terms ("custom brick mosaic", "personalized photo gift", "DIY brick mosaic kit", "40+ colors", "1×1 bricks") and every earlier ads decision follows them: the Oct 13 plan said "no LEGO keywords anywhere" and "never use LEGO in titles", because LEGO is another company's trademark. So:

- **Ad text: never "LEGO"**, in any headline, description, path or asset. Not in this proposal, not in the optional group.
- **Keywords: none in the main proposal.** The non-trademark forms ("custom brick portrait", "brick portrait from photo", "photo to brick mosaic") carry the same intent.
- **Optional (P-ads-analyst-20261026-7):** 4 exact-match LEGO keywords that did convert in the last 90 days, in their own ad group with the same no-LEGO ad. Using a trademark as a keyword is generally allowed by Google in the US; using it in ad text is what gets restricted. This is Eden's call; the brand skill does not cover it, so I would rather ask than assume. If she rejects -7, the apply prompt adds "lego" as a phrase negative on Holiday Gifts only, so this campaign never pays for LEGO searches while PMax #2 keeps catching the ones that convert.

## 1. Keyword expansion

Rules: phrase match for the theme, exact for the clearest buyer forms; no broad match (too loose at $10/day); default bid (Smart bidding sets it); no keyword contains "lego". Tier 1 ad groups go live at approval. Tier 2 ad groups are created **paused** and switched on Nov 16 with the first budget step, so $10/day is not spread over 8 ad groups during the learning weeks.

| # | Ad group | New or existing | Tier | Keywords | Landing page |
|---|---|---|---|---|---|
| 1 | Photo to Brick Mosaic | new | 1 (on at approval) | 14 | /collections/the-gift-for-everyone |
| 2 | Pet Portrait Gift | new | 1 | 12 | /collections/the-gift-for-everyone (no pet page exists; see Landing pages) |
| 3 | Couple & Anniversary Gift | new | 1 | 12 | /collections/the-gift-for-everyone |
| 4 | Gifts for Parents & Grandparents | new | 1 | 13 | /collections/the-gift-for-everyone |
| 5 | Family Photo Gift | new | 2 (created paused, on Nov 16) | 10 | /collections/the-gift-for-everyone |
| 6 | Christmas Photo Gifts | existing | 1 (existing ad group) | 10 | existing ad (already /collections/the-gift-for-everyone) |
| 7 | DIY Brick Art Kit | new | 2 (created paused, on Nov 16) | 10 | /collections/the-gift-for-everyone |
| 8 | Gift Kit, Photo Later | new | 2 (created paused, on Nov 16) | 9 | /products/unlimited-memobrick |
| | **Total** | | | **90** | |

#### 1. Photo to Brick Mosaic

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"photo to brick mosaic"` | phrase | Exact product description; strongest buy intent | Oct 13 plan; 'turn picture into lego set' 4 conv / $698.99 in PMax (90d) shows this intent buys |
| `"brick mosaic from photo"` | phrase | Same intent, other word order | as above |
| `"custom brick mosaic"` | phrase | Approved brand term; SEO keyword map targets it to the gift collection | SEO keyword map (C); approved term |
| `[custom brick mosaic kit]` | exact | Highest-intent exact form | approved term |
| `"brick mosaic kit"` | phrase | Product category search | Oct 13 plan |
| `"photo mosaic kit"` | phrase | Shopper may not say brick yet | Oct 13 plan |
| `"custom photo mosaic"` | phrase | Broader mosaic intent | Oct 13 plan |
| `"turn photo into mosaic"` | phrase | How-to-buy phrasing that matches the editor | Oct 13 plan |
| `"mosaic portrait from photo"` | phrase | Portrait wording | Oct 13 plan |
| `"custom brick portrait"` | phrase | The non-trademark form of 'custom lego portrait' | [lego portrait] 1.5 conv, [lego portrait maker] 2 conv in 90d (Oct 14 check) |
| `"brick portrait from photo"` | phrase | Same, other word order | as above |
| `"brick art from photo"` | phrase | Art wording | none yet |
| `[turn photo into brick art]` | exact | Exact how-to-buy phrasing | none yet |
| `"diy photo mosaic"` | phrase | DIY intent | Oct 13 plan |

#### 2. Pet Portrait Gift

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"custom pet portrait gift"` | phrase | Pets are a named product use; tags 'pet-gift' on every kit | SEO keyword map (pets hub); Meta dog and cat videos ROAS 2.6 to 4.1 Q4 2025 |
| `"pet portrait from photo"` | phrase | Photo-based pet gift | as above |
| `"custom pet portrait"` | phrase | Biggest pet portrait phrase | Oct 13 plan |
| `"custom dog portrait"` | phrase | Dog owners are the largest pet group | 2025 dog video results |
| `"custom cat portrait"` | phrase | Cat version | 2025 cat video results |
| `"dog portrait gift"` | phrase | Gift wording | none yet |
| `"cat portrait gift"` | phrase | Gift wording | none yet |
| `"pet photo gift"` | phrase | Wider pet gift intent | SEO keyword map |
| `"personalized dog gift"` | phrase | Gift for a dog lover | none yet |
| `"pet photo mosaic"` | phrase | Mosaic plus pet | SEO keyword map (A) |
| `"pet memorial gift"` | phrase | Memorial gifts are a real use; copy stays gentle | SEO keyword map (memorial hub); Oct 13 plan |
| `"dog memorial gift"` | phrase | Same, dog | none yet |

#### 3. Couple & Anniversary Gift

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"anniversary gift from photo"` | phrase | Couples are a core buyer; 'couple-gift' tag on every kit | SEO keyword map; Oct 13 plan; Meta couple video ROAS 3.49 (oct_29 2025) |
| `"personalized anniversary gift"` | phrase | Largest anniversary phrase | SEO keyword map |
| `"photo anniversary gift"` | phrase | Short form | none yet |
| `"couple photo gift"` | phrase | Couple intent | SEO keyword map; Oct 13 plan |
| `"personalized couple gift"` | phrase | Couple intent | none yet |
| `"personalized gift for husband"` | phrase | Christmas buyer for a partner | none yet |
| `"personalized gift for wife"` | phrase | Same | none yet |
| `"personalized gift for boyfriend"` | phrase | Same | none yet |
| `"personalized gift for girlfriend"` | phrase | Same | none yet |
| `"personalized christmas gift for wife"` | phrase | Seasonal partner gift | none yet |
| `"personalized christmas gift for husband"` | phrase | Seasonal partner gift | none yet |
| `"wedding photo gift"` | phrase | Wedding photo is a common upload | SEO keyword map (wedding article) |

#### 4. Gifts for Parents & Grandparents

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"personalized christmas gift for mom"` | phrase | Every kit is tagged gift-for-mom; mom is the top gift search | Shopify tags; existing Family ad headline |
| `"personalized gift for mom"` | phrase | Year-round form | none yet |
| `"photo gift for mom"` | phrase | Photo-led | none yet |
| `"personalized christmas gift for dad"` | phrase | gift-for-dad tag | Shopify tags |
| `"personalized gift for dad"` | phrase | Year-round form | none yet |
| `"photo gift for dad"` | phrase | Photo-led | none yet |
| `"personalized gifts for grandparents"` | phrase | Grandparents get the most family photos | SEO keyword map (grandparents article) |
| `"photo gift for grandparents"` | phrase | Photo-led | Oct 13 plan |
| `"christmas gift for grandparents"` | phrase | Seasonal | none yet |
| `"photo gift for grandma"` | phrase | Grandma form | none yet |
| `"personalized gift for grandma"` | phrase | Grandma form | none yet |
| `"photo gift for grandpa"` | phrase | Grandpa form | none yet |
| `"personalized gift for parents"` | phrase | Both parents | none yet |

#### 5. Family Photo Gift

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"family photo gift"` | phrase | Family photos are the most common upload | SEO keyword map; Oct 13 plan |
| `"family photo gift ideas"` | phrase | Research-to-buy | SEO keyword map |
| `"personalized family gift"` | phrase | Family intent | none yet |
| `"family christmas gift"` | phrase | One gift for the household | none yet |
| `"christmas gift for the whole family"` | phrase | Same | none yet |
| `"family activity gift"` | phrase | The build is the activity | Oct 13 plan; SEO blog articles |
| `"christmas family activity"` | phrase | Seasonal activity | SEO keyword map (B) |
| `"custom family portrait"` | phrase | Portrait wording | none yet |
| `"family portrait gift"` | phrase | Gift wording | none yet |
| `"screen free family activity"` | phrase | Matches the 'screen-free' angle of the blog | SEO keyword map (B) |

#### 6. Christmas Photo Gifts

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"personalized christmas photo gifts"` | phrase | Main Christmas phrase; SEO hub keyword | SEO keyword map (S, B) |
| `"custom photo christmas gift"` | phrase | Same intent | SEO keyword map (S) |
| `"christmas gift from photo"` | phrase | Same intent | Oct 13 plan |
| `"photo gift for christmas"` | phrase | Same intent | Oct 13 plan |
| `"unique christmas gift from a photo"` | phrase | Unique-gift buyer | SEO keyword map (S) |
| `"personalized photo gift"` | phrase | Approved term | Oct 13 plan |
| `[personalized photo gifts]` | exact | Exact form of the approved term | Oct 13 plan |
| `"custom christmas gift"` | phrase | Wider; watch cost | none yet |
| `"personalized christmas gift"` | phrase | Widest phrase here; watch cost, pause if $15 and 0 orders | none yet |
| `"photo christmas present"` | phrase | Present wording | none yet |

#### 7. DIY Brick Art Kit

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"diy photo gift"` | phrase | DIY plus photo | none yet |
| `"diy gift kit"` | phrase | Kit buyer | none yet |
| `"build your own portrait"` | phrase | Build intent | Oct 13 plan |
| `"brick art kit"` | phrase | Category | Oct 13 plan |
| `"photo art kit"` | phrase | Category | Oct 13 plan |
| `"diy mosaic kit"` | phrase | Mosaic DIY buyers | none yet |
| `"mosaic kit for adults"` | phrase | Adult craft buyer | none yet |
| `"creative gift for adults"` | phrase | Gift wording | none yet |
| `"diy christmas gift kit"` | phrase | Seasonal | none yet |
| `"unique diy gift"` | phrase | Gift wording | none yet |

#### 8. Gift Kit, Photo Later

| Keyword (as typed in Google Ads) | Match | Reason | Evidence |
|---|---|---|---|
| `"personalized gift kit"` | phrase | The product name buyers use | Shopify: Art Gift Kit, 2 orders / $188 in 60d; /products/unlimited-memobrick 14 Google visits, 4 add to cart, 1 order (30d) |
| `[personalized gift kit]` | exact | Exact form | as above |
| `"custom gift kit"` | phrase | Same | none yet |
| `"last minute personalized gift"` | phrase | Buyer short on time; no photo needed today | last 2025 strong week ended Dec 15 |
| `"last minute personalized christmas gift"` | phrase | Seasonal | as above |
| `"last minute photo gift"` | phrase | Photo wording | as above |
| `"last minute custom gift"` | phrase | Custom wording | as above |
| `"gift for someone who has everything"` | phrase | SEO brief exists; the photo makes it personal | SEO keyword map (A, S) |
| `"unique gift for someone who has everything"` | phrase | Longer form | as above |

### Optional (P-ads-analyst-20261026-7): ad group "Brick Portrait Searches (exact)"

Only if Eden approves item -7. Exact match only; these are the 4 LEGO-brand searches that converted in the 90-day check. Same ad as "Photo to Brick Mosaic" (no LEGO in the text), same landing page. Tier 1.

| Keyword | Match | Evidence |
|---|---|---|
| `[lego portrait]` | exact | Oct 14 check: 1.0 Search #2, 0.5 Sales-Search-aug 26 |
| `[lego portrait maker]` | exact | Oct 14 check: 1.0 PMax All Products, 1.0 Brand AI Max |
| `[custom lego mosaic]` | exact | Oct 14 check: PMax #2 category, 70 clicks |
| `[turn picture into lego set]` | exact | Oct 14 check: PMax #2 category |

### Landing pages

| Page | Used by | State | Note |
|---|---|---|---|
| /collections/the-gift-for-everyone ("Custom Photo Brick Mosaic Kits") | 6 of 7 new ad groups and the existing ones | live, 7.7% of Google visitors order | Best page we have |
| /products/unlimited-memobrick ("Art Gift Kit, Buy Now, Personalise Later", $35 to $853) | Gift Kit, Photo Later | live; 14 Google visits, 4 add to cart, 1 order in 30 days | Fits "last minute" and "gift for someone who has everything": no photo needed to buy |
| Editor (photo upload) | none directly | the URL of a standalone editor page is **unknown**; the editor opens from product pages | Do not send ads to a product page (1.9%) until a test says otherwise |
| Pet page | Pet Portrait Gift | **does not exist** | Suggest to the site developer: a pet collection or page (dog and cat examples, same kits). Until then the gift collection is used. Swap the pet ad's Final URL once it exists (small ad-change) |
| /pages/free-preview ("Free Proof") | none | live | Candidate sitelink "Free Design Proof"; not part of this proposal |

### Already in the account (not re-added)

- "Christmas Photo Gifts" (197804230541) and "Gifts For Family & Couples" (199189087365) keep their current keywords and ads. Their keyword list, costs and conversions are **missing**; the apply prompt writes them down first and skips any new keyword that already exists in the campaign. In 14 days I will propose pausing any old keyword with $15+ and no Shopify order.
- Brand campaign "Search Campaign #1 - 2026" (17949461961): the Oct 13 plan to add [photobrick], "photo brick", "photobrick usa" was never applied. It is out of scope here (this is the Holiday Gifts campaign); I will propose it again with the brand budget review.

## 2. Negative keywords

A new shared list **"MB negatives 2026-10-26"**, applied at campaign level to Holiday Gifts and to the paused "MB | Search | NonBrand | Photo-to-Brick | Purchases" (it stays paused). Not applied to the brand campaign or PMax #2 in this item (PMax #2 is where LEGO-style searches convert; its negatives stay as they are).

Never in the list: memobrick, memo brick, photobrick, photo brick (checked by script). Never in the list: anything that converted in the 90-day check: [lego portrait], [lego portrait maker], [custom lego mosaic], "lego set" (it would block "turn picture into lego set", 4 conv), and [custom lego photo] (the "lego photos" PMax category converted 2 and could not be opened). "free" alone is not blocked, because buyers search "free shipping" and "free proof". Every phrase negative was checked by script against all 90 new keywords and the 4 optional ones: no conflicts.

| Negative | Match | Why |
|---|---|---|
| [lego album covers], [lego album cover maker], [lego from picture], [lego photo editor], [make me into a lego character], [the kiss lego], [music album lego], [lego albums], [make yourself into lego], [customize legos to look like you], [lego photo mosaic], [lego picture custom] | exact | Spent with 0 conversions (Sep 14 to Oct 11) and passed the 90-day check on Oct 14 |
| "lego album", "album cover lego", "lego character", "lego minifigure", "minifig", "lego store" | phrase | Album-cover, minifigure and store shoppers want a different product; passed the 90-day check |
| "for free", "free download", "free printable", "printable", "pdf", "download", "template", "svg", "coloring page", "how to make", "tutorial" | phrase | People looking for a free file or a how-to, not a kit |
| "jobs", "careers" | phrase | Job seekers |
| "app", "filter", "generator" | phrase | People looking for a photo filter or app (the "AI Lego filter" question in `customer-questions.md`), not a physical kit |
| "duplo", "minecraft" | phrase | Toy and game searches |
| "near me", "same day", "walgreens", "cvs", "costco" | phrase | Store pickup or same-day print intent; we ship kits |
| "puzzle", "mug", "blanket", "canvas", "ornament", "calendar", "photo book", "shirt", "pillow", "necklace", "photo print" | phrase | Searchers who named a different photo product. The generic gift keywords would otherwise pay for them |

If P-ads-analyst-20261026-7 is **not** approved, the apply prompt also adds **"lego" (phrase) as a campaign negative on Holiday Gifts only**.

## 3. Ads

One responsive search ad per new ad group, 15 headlines (all 30 characters or less) and 4 descriptions (all 90 or less), checked by script. Nothing pinned. Facts used, each checked today: "Order by December 15" (Facts table, the only date), "As Seen On FOX" (never "Fox News"), "Free Design Proof on Request" (optional, never required), "Ships From Miami, Florida" and "made and shipped from Miami, Florida" (Facts table, verified), "Kits From $35" (10x10 one-face kit and the Art Gift Kit start at $35 in Shopify today), sizes 10x10 to 60x60 in (Shopify), kit contents (product-facts.md). **No discount code and no shipping claim**, so nothing combines a code with free shipping; EARLYHOLIDAY20 has no end date set, so new ads do not use it (the existing Oct 14 ads already carry it). No reviews, ratings, customer quotes or delivery promises. No "LEGO". No em dashes (copy check passed).

The Gift Kit ad leaves out "Order by December 15": for that kit the recipient picks the photo later, and when the Christmas cutoff falls for that path is **unknown**. Eden: if the same Dec 15 date applies to the gift kit, tell me and I will add it.

### Ad 1: ad group "Photo to Brick Mosaic"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: mosaic / photo
- Pin: nothing
- Headlines:
  1. Turn Your Photo Into Bricks
  2. Photo to Brick Mosaic
  3. Your Photo as Brick Art
  4. See Your Photo in Bricks
  5. Upload a Photo, See a Preview
  6. DIY Brick Mosaic Kit
  7. Build It, Then Hang It Up
  8. Sizes From 10x10 to 60x60 in
  9. Personalized Photo Gift
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. Upload a photo, see it as a brick mosaic, and pick your size. We send the whole kit.
  2. Every kit has 1x1 bricks, baseplates, a printed color map and a tool. Build, then display.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 2: ad group "Pet Portrait Gift"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / pets
- Pin: nothing
- Headlines:
  1. Your Pet in Bricks
  2. Custom Pet Portrait Kit
  3. Turn Your Dog Into Brick Art
  4. Turn Your Cat Into Brick Art
  5. A Gift for Pet Lovers
  6. Pet Portrait From a Photo
  7. Build Your Pet's Portrait
  8. A Keepsake of Your Best Friend
  9. See Your Pet in Bricks
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. Turn your favorite pet photo into a DIY brick mosaic kit. Build it, then hang it up.
  2. A personal gift for dog and cat lovers, made from a photo that matters to them.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 3: ad group "Couple & Anniversary Gift"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / couples
- Pin: nothing
- Headlines:
  1. A Gift for Your Partner
  2. Anniversary Gift From a Photo
  3. Your Couple Photo in Bricks
  4. Personalized Anniversary Gift
  5. Build Your Favorite Memory
  6. A Date Night You Build
  7. Gift for Your Wife or Husband
  8. Christmas Gift for a Partner
  9. Your Wedding Photo in Bricks
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. Turn your favorite photo of the two of you into a brick mosaic you build together.
  2. A personal anniversary or Christmas gift. Build it on a date night, then hang it up.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 4: ad group "Gifts for Parents & Grandparents"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / family
- Pin: nothing
- Headlines:
  1. Christmas Gift for Mom
  2. Christmas Gift for Dad
  3. Photo Gift for Grandparents
  4. A Gift for Grandma and Grandpa
  5. Gifts for Mom, Dad and Grandma
  6. Your Family Photo in Bricks
  7. Personalized Gift for Parents
  8. The Grandkids' Photo in Bricks
  9. A Gift From the Grandkids
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. A gift for mom, dad or grandparents, made from a family photo that matters to them.
  2. Turn the grandkids' photo into a DIY brick mosaic kit. Build it together, then hang it.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 5: ad group "Family Photo Gift"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / family
- Pin: nothing
- Headlines:
  1. Your Family Photo in Bricks
  2. A Gift the Family Builds
  3. Build It as a Family
  4. A Screen-Free Family Activity
  5. Family Photo Gift Kit
  6. Custom Family Portrait Kit
  7. A Christmas Activity for All
  8. Personalized Family Gift
  9. See Your Photo in Bricks
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. Turn a family photo into a DIY brick mosaic kit. Build it together over the holidays.
  2. A screen-free activity for the whole family, and a keepsake to hang when you finish.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 6: ad group "DIY Brick Art Kit"

- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: diy / kit
- Pin: nothing
- Headlines:
  1. DIY Brick Mosaic Kit
  2. A Gift They Build Themselves
  3. Build Your Own Photo Portrait
  4. A Creative Gift for Adults
  5. Brick Art Kit From Your Photo
  6. A Calm, Screen-Free Build
  7. Bricks, Baseplates, Map, Tool
  8. Build It at Home, at Your Pace
  9. See Your Photo in Bricks
  10. Custom Brick Mosaic Kit
  11. Kits From $35
  12. Order by December 15
  13. As Seen On FOX
  14. Free Design Proof on Request
  15. Ships From Miami, Florida
- Descriptions:
  1. Every kit has 1x1 bricks sorted by color, baseplates, a printed color map and a tool.
  2. Upload a photo, see it as a mosaic, and build it at home. A gift and an activity in one.
  3. Want help? Our designers can make your design and send a free proof before production.
  4. Order by December 15 for Christmas. Every kit is made and shipped from Miami, Florida.

### Ad 7: ad group "Gift Kit, Photo Later"

- Final URL: https://mymemobrick.com/products/unlimited-memobrick
- Display path: gifts / kit
- Pin: nothing
- Headlines:
  1. Buy Now, Pick the Photo Later
  2. They Choose the Photo
  3. A Personalized Gift Kit
  4. No Photo Needed to Order
  5. Send a Personalization Link
  6. For Someone Who Has It All
  7. A Last-Minute Personal Gift
  8. They Design, We Make the Kit
  9. Gift Kits From $35
  10. Pick a Size, They Pick a Photo
  11. Custom Brick Mosaic Kit
  12. As Seen On FOX
  13. Ships From Miami, Florida
  14. Personalized Photo Gift
  15. See Their Photo in Bricks
- Descriptions:
  1. Buy the kit today, no photo needed. They pick the photo they love and approve the design.
  2. Once they approve their design, we make the brick mosaic kit and ship it straight to them.
  3. A personal gift for someone who has everything: their own photo, built in 1x1 bricks.
  4. Gift kits from $35. As seen on FOX. Made and shipped from Miami, Florida.

The existing ad groups "Christmas Photo Gifts" and "Gifts For Family & Couples" keep their Oct 14 ads (already on the gift collection page); no new ad there.

## 4. Bidding and budget

### Maximize Conversions or Maximize Conversion Value?

Current bid strategy: **missing** (Eden's Chrome report will show it). The recommendation depends on it only in how we get there:

| Today's strategy (from Eden's report) | Do this |
|---|---|
| Manual CPC, Maximize Clicks or Enhanced CPC | Switch to **Maximize Conversion Value, no target**, in the same run as the new keywords (one learning period instead of two) |
| Maximize Conversions (no target) | Switch to **Maximize Conversion Value, no target**, same run |
| Maximize Conversions with a target CPA, or a target ROAS already set | Switch to Maximize Conversion Value and **remove the target** (the campaign has far fewer than 15 conversions a month) |
| Maximize Conversion Value, no target | Keep it. No bidding change |

Why value, not count:
- **Orders range from $35 to $853.** Maximize Conversions treats a $35 10x10 mini kit (138 orders last Q4, mostly a cheap add-on) the same as a $349 40x40. With a small budget it learns to buy the cheapest conversions, which is the opposite of Eden's ROAS 3.0 rule. Maximize Conversion Value bids more for searches that tend to buy bigger kits.
- **Eden's rule is a value rule** (Shopify net sales / spend at least 3.0). Value bidding is the strategy that aims at the same thing.
- **Low volume hurts both equally.** Neither has enough campaign data on its own; both lean on the account's purchase history (the same "Google Shopping App Purchase" primary action). The $10/day budget caps how far value bidding can overspend while it learns.

Watch-outs:
- Google's conversion value includes about $30 extra per new customer (set in the account), so Google's own ROAS reads higher than Shopify's. Judge on Shopify (the Final URL suffix is set: utm_campaign = 24325020428, utm_term = keyword).
- Primary conversion must be Purchase only. The call actions were moved to secondary on Oct 14 (A-2026W42-020); the apply prompt confirms the campaign uses the account goals.
- Learning takes about 7 days. Switching on Oct 27 to 29 means it is done by Nov 5, before the Nov 16 season. **Do not change the strategy between Nov 16 and Dec 15**: a reset in the busiest weeks costs more than it saves.
- If Google shows "Limited" or the campaign spends under half its budget for 5 days in a row, I will report it; the fallback is Maximize Conversions (not manual).

### When to add target ROAS 300%

Only when **all** of these are true:
1. The campaign has **15 or more Google purchase conversions in the last 30 days** (Google's own minimum for target ROAS to work).
2. At least 14 days of Shopify orders tagged utm_campaign = 24325020428, so the gap between Google value and Shopify net sales is known.
3. It is before Nov 13 (or after Dec 15). Not during the peak.

Then set the Google target so that Shopify lands at 3.0: **Google tROAS = 300% x (Google conversion value / Shopify net sales for this campaign)**. Example: if Google reports $1.25 for every $1.00 Shopify shows, set 375%, not 300%. A 300% target typed in as-is would let the campaign run at a Shopify ROAS of about 2.4 in that example.

At $10 to $25 a day this campaign is unlikely to reach 15 conversions a month before Dec 15. So in practice: **Maximize Conversion Value without a target for the whole season, steered by budget gates on Shopify ROAS.**

### Budget, Nov 16 to Dec 15

No budget change in this item. The plan, to be proposed on Nov 13 with real numbers:

| Dates | Daily budget | Gate to move up (all measured on Shopify, google / cpc / 24325020428) | Season spend if every step passes |
|---|---|---|---|
| Oct 27 to Nov 15 | $10 (unchanged) | learning; tier 1 ad groups only | $200 |
| Nov 16 to 22 | **$15 (+$5/day)** and tier 2 ad groups on | Oct 30 to Nov 12: Shopify ROAS 3.0+ with at least 2 orders, and Search lost IS (budget) above 10% | $105 |
| Nov 23 to 30 | **$20 (+$5/day)** | previous 7 days ROAS 3.0+ with at least 2 orders | $160 |
| Dec 1 to 15 | **$25 (+$5/day)** | previous 7 days ROAS 3.0+ with at least 3 orders | $375 |
| any time | back to $10 | ROAS under 2.0 after $100 or more spent since the last step | |

- **Each +$5 step adds about 5% to the account's total daily Google budgets (about $93), and about 20 to 25% to actual Google spend (about $21.50 a day last measured).** Each is proposed as its own ad-change with the numbers.
- Break-even at the full plan: $840 of spend from Oct 27 to Dec 15 needs **$2,520 of Shopify net sales, about 25 orders** at last year's $102 average Google order. Last year Google search brought 35 to 48 orders a week (paid and organic together) from Nov 17 to Dec 8.
- Google may spend up to twice the daily budget on a single day, but not more than about 30.4 times the daily budget in a month.
- Why not more now: Holiday Gifts has no Shopify-proven ROAS yet, and on Oct 11 it lost about 76% of its impressions to rank and only 11% to budget. Better keywords and a better landing page fix rank; money does not.

What would change this plan:
- **Eden's Chrome report**: if lost IS (budget) is already high and Google conversions are coming in, the first step can come sooner; if spend is far below $10/day, budget is not the limit and no step is needed.
- **Keyword Planner CPCs**: if top-of-page bids on the tier 1 keywords are mostly above $3, $10/day buys 3 clicks a day and I will cut tier 1 to the 3 best ad groups instead of raising budget.
- **The first 14 days of search terms and Shopify UTM orders** (by keyword via utm_term).
- **PMax #2 and Brand**: if PMax #2 shows a Shopify ROAS above Holiday Gifts', the season money goes there first.
- **The Facts table**: "Holiday ad budget" is still unknown. If Eden sets a total, the plan fits inside it.

## Expected effect on orders

Estimate (CPCs and current volume are missing): at $10/day, about 1 to 3 orders a week from Holiday Gifts by mid November (today: unknown, likely under 1); 3 to 6 a week from Nov 16 to Dec 15 if the budget steps pass. The bigger effect is quality: specific keywords that match the ad and the page should lift CTR and Quality Score, which wins impressions now lost to rank without paying more per click.

## Risk

- New phrase keywords spend on searches that do not buy. Capped by the $10 budget; the negative list and the 14-day keyword review limit it.
- The existing shared lists ("brand searches", 4,682 keywords) may block some new keywords. The apply prompt checks and reports; it does not edit those lists.
- A bid strategy switch resets learning for about a week (done before the season on purpose).
- Generic phrases ("personalized christmas gift", "custom christmas gift", "personalized gift for mom") can be expensive. Rule: pause any new keyword at $15 spend with 0 Shopify orders (measured by utm_term).

## How I will judge it in 7 and 14 days

- Search terms report: no spend on the negatives; at least half of spend on terms that match an ad group theme.
- Shopify: orders and net sales with utm_source = google, utm_medium = cpc, utm_campaign = 24325020428, split by utm_term; ROAS against the campaign's cost.
- Google: CTR above 3.93% (week of Oct 5), average Quality Score of new keywords 5 or more, Search lost IS (rank) below 70%.
- Total Google spend unchanged (budget stays $10).

## 5. Chrome prompts

- Apply (after approval only): `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-search-expansion.md`. Its first line stays `Status: waiting for approval` until Eden approves A-items for P-ads-analyst-20261026-5 (and optionally -6, -7); then I set it to `Status: ready` with the item IDs and the Mac runs it that evening, or Eden pastes it into Claude in Chrome herself. Parts for -6 and -7 run only if those items are approved.
- Keyword Planner (read only, no approval needed, nothing is changed): `marketing/analytics/ads-analyst/chrome-tasks/2026-10-26-keyword-planner-read.md`. Eden can paste it any time; the result goes back into that file and I use it to trim the list before the apply run. Also added to `marketing/data/requests.md` so the morning pull can fetch it.

