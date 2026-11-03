# Meta: Billo UGC holiday campaign (2026-11-03)

- Eden's request (chat, 2026-11-03), word for word: "Build a campaign with ALL the videos made in billo and make sure the audience is high intent purchase for holidays", then "And include Lego lovers".
- Update 1 (same day), word for word: "Ok about the new ad add more audiences" and "Add more audiences relates for customer potential customers". Also: "I don't want you do make changes if I don't approve", so only this paused campaign was touched.
- Update 2 (same day), word for word: "Make sure everything the objective is purchase only".
- Queue item: **A-2026W45-054** (pending). Executor: ads-analyst. Type: ad-change.
- Account PhotoBrick 1493067227536648, Page 105916444396794, pixel 3444389275577775. Facebook connector only; no Google or Adspirer calls.
- **Everything is PAUSED and has spent $0.** `ads_activate_entity` was never called. No other campaign, budget or status was changed (read back after the update: Proven Winners $40 ACTIVE, Christmas $20 ACTIVE, ALWAYON $20 ACTIVE, exactly as before). The campaign spends nothing until Eden approves A-054 and it is switched on.
- Review in Ads Manager: https://www.facebook.com/adsmanager/manage/campaigns?act=1493067227536648&selected_campaign_ids=120252917166090597

## What was built (read back 2026-11-03)

| Level | Name | ID | State |
|---|---|---|---|
| Campaign | MB \| Sales \| Billo UGC \| Holiday26 | 120252917166090597 | PAUSED. Sales objective, campaign budget (CBO) $30/day placeholder, lowest cost, no cap. Meta attached the store catalog (1094886087542510) by itself; no catalog ads are used. |
| Ad set 1 | Warm high-intent \| Visitors 30-180d + ATC + IC + IG/FB engagers 180d \| Excl Purch \| US 24+ | 120252917169280597 | PAUSED. Purchase (OFFSITE_CONVERSIONS) on the pixel, 7-day click + 1-day view, US, 24+, Advantage+ placements. Advantage+ audience OFF (reason: custom audiences only), so it reaches only these people. |
| Ad set 2 | Cold high-intent holiday \| Engaged Shoppers AND (Gift/Xmas OR LEGO lovers OR Family/Pets) \| Excl Purch \| US 24+ | 120252917175580597 | PAUSED. Same optimization, US, 24+, Advantage+ placements, Advantage+ audience ON (see the note below). |
| Ad sets 3 to 11 | 9 more audiences, added in update 1 (see "More audiences" below) | listed below | PAUSED. Same settings as ad set 2: Purchase on the pixel, US, 24+, past buyers excluded, Advantage+ placements and audience. |
| Ads | The same 9 Billo videos in every ad set: 11 ad sets, **99 ads** | listed below | All PAUSED. Meta shows the first ones IN_PROCESS or PENDING_REVIEW, the normal review states. `ads_get_errors` on the whole campaign after update 1: no errors. |

Not done: no VALUE optimization (Meta rejected it on Sales before), no budget changes to any other campaign, nothing switched on, nothing deleted.

## Audiences

### Ad set 1: Warm high-intent (people who already showed buying intent)

Included (any of):

| Audience | ID | What it is |
|---|---|---|
| MB_SiteVisitors_30d | 120250587705320597 | all site visitors 30 days + FB/IG shop views |
| website visitor 180 | 120252332021860597 | all site visitors 180 days + shop views |
| MB_AddToCart_30d | 120252819244900597 | add to cart, 30 days |
| MB_ATC_IC_14d | 120250587702740597 | add to cart or checkout started, 14 days |
| AddToCart | 120249604963530597 | add to cart (Jun 2026 audience) |
| InitiateCheckout | 120249605046470597 | checkout started, 180 days (pixel + FB/IG shops) |
| IG engaged | 120249605329830597 | anyone who engaged with @memobrick on Instagram, 180 days (about 2,000 to 2,400 people) |
| **MB_FB_PageEngaged_180d (new today)** | **120252917161590597** | anyone who engaged with the Memobrick Facebook Page, 180 days. It did not exist, so I created it (engagement audience, prefilled). |

- **Video viewers: not included.** The only video-viewer audiences are 365 days ("VIDEO VIEWS 360" 120250964848490597, "Vid_365"), outside the 30 to 180 day window Eden's brief asked for. The connector can't build a new 180-day video-viewer audience (it needs a list of every video). Eden can add one in Ads Manager > Audiences > Engagement > Video, 180 days, and I'll add it to this ad set.

### Ad set 2: Cold high-intent holiday shoppers + LEGO lovers

Built as **shoppers AND (gift/holiday OR LEGO lovers OR family/pets)** (two narrowing groups):

1. **Must match:** Engaged Shoppers (behavior 6071631541183).
2. **And at least one of:**
   - Holiday gift buyers: Christmas shopping 6003523105642, Gift 6003019539929, Holiday 6003116939014, Online shopping 6003346592981.
   - **LEGO lovers:** The Lego Group 6003936596730, Lego 6003087413270, Legoland 6003201803612, plus related brick and build interests: Collectible toys 6808201392149, Jigsaw puzzle 6003390570744, Do it yourself (DIY) 6003470511564.
   - Family and pets: Family 6003476182657, Parents (All) 6002714398372, Dogs 6003332344237, Cats 6003159378782, Pets 6004037726009.

- Every interest ID comes from ad sets already in this account. The connector has no targeting search, so I couldn't check "LEGO Masters", "LEGO Ideas" or "building sets". None of them was in any past ad set, so they are not added. Eden can add them in Ads Manager under Detailed targeting if Meta offers them.
- **Advantage+ audience is ON** (Meta's default and recommendation). With it on, Meta treats the interests as a starting suggestion and may go wider when it finds buyers. The hard limits stay hard: US, 24+, past buyers excluded. **If Eden wants Meta held strictly to "shoppers AND (gift OR LEGO OR family/pets)"**, she says "turn Advantage+ audience off on the cold ad set" and I switch it. My advice is to leave it on: last week the narrow, hand-picked audiences did not beat broad.

### Excluded in every ad set (past buyers)

- customers_export.csv 120218644952060597
- purchase 730 days sep 25 120252332056620597
- MB_Purchasers_180d_EXCLUDE 120250587721690597
- Purchase 120249604850310597

## More audiences (update 1, 2026-11-03)

Eden asked for more audiences of customers and potential customers. Each one is its own paused ad set inside the Billo campaign, so its results can be read alone. Every ad set has the same 9 Billo ads, the same Purchase optimization and the same 4 past-buyer exclusions as ad sets 1 and 2. No customer list was uploaded: the only customer list used is the one already in the account (customers_export.csv), as the seed of two new lookalikes.

| # | Ad set | ID | Who it reaches |
|---|---|---|---|
| 3 | LAL Buyers 1% | 120252918727670597 | Lookalike (US, 1%) of pixel purchasers (existing, 120249606728920597, the one the Christmas campaign used) + **new** Lookalike (US, 1%) of the customer list customers_export.csv (120252918710460597) |
| 4 | LAL Add to cart 1% | 120252918728120597 | Lookalike (US, 1%) of add to carts (existing, 120249606728960597) |
| 5 | LAL 1-3% wider | 120252918728540597 | **New** Lookalike (US, 3%) of the customer list (120252918710780597) + Lookalike (3%) AddToCart (existing, 120249604985830597) + Lookalike (3%) InitiateCheckout (existing, 120249605068950597) |
| 6 | Gift occasions | 120252918729390597 | Life events: anniversary within 30 days, anniversary within 31 to 60 days, anniversary within 61 to 90 days, newly engaged (3 months, 6 months, 1 year), newlywed (3 months, 6 months, 1 year), upcoming birthday, friends of people with a birthday in the next month |
| 7 | Family | 120252918729920597 | Parents with children 6 to 8, parents with preteens 9 to 12, new parents (baby up to 12 months), interest Grandparent |
| 8 | Pet owners | 120252918739290597 | Interests Dogs, Cats, Pets |
| 9 | Hobby and creative | 120252918740000597 | Jigsaw puzzle, Do it yourself (DIY), Crafts, Creativity, Photo-book |
| 10 | Brick lovers | 120252918740650597 | The Lego Group, Lego, Legoland, Collectible toys (targeting only; no "LEGO" in any ad text) |
| 11 | Men buying gifts | 120252918741730597 | Men 24+ with interests Gift, Christmas shopping, Anniversary, Wedding anniversary, Wife (the MEN ad had the cheapest purchases historically, $27 to $38 each) |

Ad IDs: every ad set has 9 ads named "BILLO \| <footage> \| <cut>", the same 9 creatives as rows 1 to 9 in the table further down. Read back in Ads Manager or with the campaign filter; all 99 are PAUSED.

**Could not be added, and why:**
- **High-value purchasers lookalike:** the account has no value-based customer list, and making one would mean uploading customer data with order values, which Eden asked us not to do. The 1% lookalike of the full customer list (ad set 3) is the closest honest option.
- **Long-distance relationships:** no such option exists in any ad set in this account, and the connector has no targeting search, so I can't look it up.
- **Dog owners / cat owners as behaviors:** Meta has no "owner" option in this account; the Dogs, Cats and Pets interests are used instead.
- **Home decor and photography:** the IDs found in older ad sets (Home Décor Products, Interior design, Photography, Digital photography, Puzzles and brainteasers) and the extra pet and brick interests (Puppy, Dog training, PetSmart, Petco, Lego Creator, Lego Technic and similar) were **rejected by Meta**: "detailed targeting options that were discontinued". I rebuilt those ad sets with only interests that Meta still accepts.
- **LEGO Masters, LEGO Ideas, building sets:** not available (same reasons as above).

**How the audiences behave:**
- **Advantage+ audience is ON in ad sets 3 to 11** (Meta's default). Meta treats the lookalikes, life events, interests and the "men" setting as a starting suggestion, and may show ads to similar people outside them when it finds buyers.
- Hard limits stay in every ad set: US only, 24+, past buyers excluded.
- If Eden wants each ad set held strictly to its audience, she says "turn Advantage+ audience off on the Billo ad sets" and I switch it. My advice: leave it on, because strict small audiences cost more per purchase.
- **The two new lookalikes take a few hours to fill.** Meta builds them from the customer list in the background.

## Purchase-only check (update 2, read back 2026-11-03)

Eden: "Make sure everything the objective is purchase only".

- **Campaign 120252917166090597:** objective OUTCOME_SALES, PAUSED.
- **All 11 ad sets:** optimization_goal = OFFSITE_CONVERSIONS, promoted_object = pixel 3444389275577775, custom_event_type = PURCHASE, PAUSED.
  - Warm high-intent 120252917169280597
  - Cold high-intent holiday 120252917175580597
  - LAL Buyers 1% 120252918727670597
  - LAL Add to cart 1% 120252918728120597
  - LAL 1-3% wider 120252918728540597
  - Gift occasions 120252918729390597
  - Family 120252918729920597
  - Pet owners 120252918739290597
  - Hobby and creative 120252918740000597
  - Brick lovers 120252918740650597
  - Men buying gifts 120252918741730597
- **No other goal anywhere.** No add-to-cart, landing page view, link click, reach, engagement or value optimization. "Add to cart" in the ad set names only describes who is in the audience (people who look like past cart adders); those ad sets still optimize for Purchase.
- Spend for the campaign and every ad set: **$0** (no spend recorded).

## The Billo videos: every one found, and what happened to it

How I found them:
- I read every ad in the account that ever spent money (263 ads) and their creatives (255).
- I read the video library: titles containing "billo" or "MEMOBRICK_video_original".
- Meta gives every creative its own copy of a video, without the file name. So I matched each ad's video to the Billo source file by exact length, down to the millisecond, plus Meta's thumbnail file.
- Rule: one ad per distinct footage. A second cut of the same footage gets its own ad only when it really differs (a different opening or length).

### Included: 9 videos from 7 Billo files (9 ads in each of the 11 ad sets, 99 ads)

All 9 reuse a Christmas creative that is already approved and has passed Meta review, as A-050 did. The only exception is 463980 (see its row).

| # | Billo source file (Drive) | Footage | Length | Creative reused | Cold ad ID | Warm ad ID | Landing page | Copy |
|---|---|---|---|---|---|---|---|---|
| 1 | 18ce1c-billo-193478 (2025), trimmed 10.0 to 39.9 s | Dog portrait (the "dogbillo / Dog_vid" footage: 264 Meta purchases in 2 years, the account's best video) | 29.8 s | 1132439039322081 (XMAS26 Dog v4) | 120252917181570597 | 120252917271410597 | /pages/dog-brick-mosaic | Pet text |
| 2 | 18ce1c-billo-193478, full file | Same dog footage, full cut with the extra 10 s opening | 39.85 s | 1093086900214545 (XMAS26 "Custom Yours Today") | 120252917191110597 | 120252917290570597 | gift collection | General text, short |
| 3 | 5484af-billo-193477 (2025), full | Couple (the "couple_vid / jew couple" footage: 136 + 78 Meta purchases historically) | 30.4 s | 1363284652372893 (XMAS26 couple_vid v2) | 120252917195330597 | 120252917313370597 | gift collection | General text with reasons |
| 4 | 5484af-billo-193477, trimmed 9.9 to 30.4 s | Same couple, short cut that starts later (different hook) | 20.5 s | 1480759740612622 (XMAS26 jew_couple_video) | 120252917199150597 | 120252917331650597 | gift collection | Couple text, short |
| 5 | d9cf32-billo-221731 (2025) | Family / mom build (the "mom_video / Family_mom_vid" footage) | 38.3 s | 1795049168622531 (XMAS26 mom_video v2) | 120252917214320597 | 120252917346070597 | gift collection | General text with reasons |
| 6 | MEMOBRICK_video_original_381968 2 (2025 Billo) | Couple (the "Billo_couple_video / couple_video" footage) | 40 s | 1428926436011403 (XMAS26 Couple v3) | 120252917221930597 | 120252917350420597 | gift collection | Couple text with reasons |
| 7 | MEMOBRICK_video_original_463979 (2026) | Billo family / couple clip (ran last year as "couple anniversary") | 33.0 s | 1708113487394072 (XMAS26 "cozy night in") | 120252917228040597 | 120252917353600597 | gift collection | General text, short |
| 8 | billo-276825 (2026; Drive copy 463982) | Couple building their family mosaic at home, she opens the box laughing | 30.4 s | 1128851729548464 (XMAS26 "family photo in bricks"). This was Hugo's "XMAS \| Family" upload: same length and uploaded 1 minute after the raw Billo file, so it is the Billo footage, not an AI video | 120252917230350597 | 120252917356560597 | gift collection | General text, short |
| 9 | MEMOBRICK_video_original_463980 (2026) | Photo-to-mosaic Billo clip (also runs in Google PMax) | 34.2 s | **New creative 28950805154583324** (no older creative existed). Creating it worked this time | 120252917399250597 | 120252917411770597 | gift collection (UTMs in the link) | General text with reasons |

The copy on these creatives is already in Meta and passed review. Every version is listed here, so nothing is new:

- **General text with reasons** (rows 3, 5, 9): "Turn your favorite photo into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. / As seen on FOX. / Want help with the design? Ask for a free design proof before we make it. / Order by December 15 for Christmas."
- **Couple text with reasons** (row 6): the same with "your favorite photo of the two of you".
- **Pet text** (row 1): "Your pet, in 1×1 bricks. Upload a favorite photo, see it as a mosaic, and build a personalized photo gift for Christmas." Then the same three lines.
- **Short versions** (rows 2, 4, 7, 8): "Turn your favorite photo (of the two of you) into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. Order by December 15 to receive it before Christmas."
- On every ad: headline "A personalized photo gift", description "As seen on FOX", button Shop now.
- Checks:
  - No "LEGO" anywhere in the copy (the LEGO wording still waits on Eden's answer to Mariana; only the targeting uses it).
  - No code, no free shipping line, no "Fox News".
  - "Order by December 15" and the free design proof are verified in `offers-calendar.md`.
- UTMs:
  - Rows 1 to 8 carry the `{{campaign.id}}` / `{{ad.id}}` URL parameters set on the creative, so Shopify will tag orders to this campaign's ad IDs.
  - Row 9 has fixed UTMs in the link: `utm_campaign=billo-holiday26&utm_content=billo-463980`.

**Check before launch (Eden, about 5 minutes in Ads Manager previews):**
- **463980 (row 9):**
  - Nobody has watched this file frame by frame (footage-rights: "review before use").
  - Its new creative has **no Instagram post attached** (`effective_instagram_media_id` empty). The connector still sees no Instagram account. It may show only on Facebook, or Meta may ask for an identity when you switch it on. If it does, choose @memobrick under Identity, or switch only that ad off.
  - Its thumbnail is Meta's small video still. Pick a sharper frame if it looks soft.
- **276825 (row 8):** footage-rights notes a band T-shirt logo and the partner's shirt logo at 3 to 6 s and 13 to 20 s of the raw clip. This ad is that raw clip. If the logos bother you, switch this ad off. Hugo can cut a clean version once the Drive folder is shared by link again.
- **221731 (row 5)** ran as a Mother's Day video in 2025. Check that the video has no Mother's Day text on screen. 463979 and 381968 have not been checked frame by frame either.

### Left out, and why

| Video | Why left out |
|---|---|
| Hugo's A1 "look closer" and A2 "family built at home" (brickme-style-ads-2026-11-01) | Known flaw: they mix footage from different customers in one ad (one couple's mosaic with another family's build), so the ad implies one customer's story that isn't real. Not uploaded to Meta either. |
| A3 pet voice-over (all versions, Meta videos 1128585982890228 and 1156967813941164) | On hold (Eden, Nov 2: "the footage need better direction and focus"). Not Billo footage anyway (Pink Butters / 2022 pet clips). |
| Hugo's S-20261030-2 v2 / v3 ("Same photo. 3 sizes.") | Same mixed-customer flaw as A1/A2: the 463981 couple's selfie and mosaic, then the 276825 creator's home build and finished family mosaic, as if one story. It is also an organic "comment 16, 20 or 30" reel, not a sales ad, and it is not in the Meta library. Both of its Billo sources are in the campaign on their own (row 8; 463981 is blocked, below). |
| MEMOBRICK_video_original_463981 (Billo couple, river selfie) | **Blocked: not in the Meta library.** The Drive file is owner-only (link sharing off since Nov 1) and the Drive connector stops at about 5 to 10 MB, so I can't upload it. To add it: upload the file in Ads Manager (Media library), or turn link sharing back on for the folder. Then I'll build the ad. |
| MEMOBRICK_video_original_386873 2 | Same byte size as billo-221731 (row 5), so most likely a copy. Not in Meta. |
| Second cuts that differ by only 2 to 5 s or only by crop: 221731 trims 2.5 to 38.3 s and 2.8 to 38.3 s (e.g. "XMAS26 Impressive Gift Ideas"), 381968 trims 4.2/4.5 to 40 s, and the 1:1, 4:5, 9:16 and 16:9 crops of 193477/193478/221731/381968/463980 | Same footage and the same opening, so near-duplicates. Advantage+ placements crop for each placement anyway. |
| Old ads of the same footage that carry old copy: "JEW" (193477, says EARLYBIRDB20 and HOLIDAY20, no longer listed as active), "mom video" 1697494424894728 (221731, the "Flowers die in a week... he cried a little" text written as a customer quote, which nobody can verify), "White_dog_video" / "DIY Gift" / "Memories are Art" / "Single_MothersDay" (221731 and 193478 with Mother's Day copy), "dog and girl", "girl and dog", "Video _Connie_family" (193478, old copy) | Expired codes, an unverifiable testimonial, or off-season copy. The same footage is already in with clean Christmas copy. |
| "aly and or" | Excluded on purpose (not Billo either). |
| "Untitled video (5)" | Do not use (Yamaha/Motul logos, AI watermark, not our product). Not in Meta. |
| "review Elizabeth billo video ad" folder | No file named Elizabeth is in the Meta library. The 2025 Billo uploads in Meta are 193477, 193478, 221731 and 381968, and all four are in. If the Elizabeth file is a different clip, it is missing from Meta (same Drive blocker as 463981). |

## Budget (updated after update 1)

Today Meta spends $80/day: Proven Winners $40 (launched Nov 1, first check Nov 4), Christmas $20, ALWAYON $20.

- Christmas: Shopify ROAS **0.31 to 0.69** since Oct 26 (break-even 3.0, cut line 2.0).
- ALWAYON: **0 tagged Shopify orders** last week.
- The rule for raising total spend (Shopify ROAS above 2.8 over 7 days with 5+ orders) is **not met** by any Meta campaign.

**What changed:** 11 ad sets instead of 2. On $30/day that is under $3 per ad set, too little for Meta to learn anything per audience. Two changes to my recommendation:

1. **Billo gets $40/day instead of $30**, still inside $80/day total, by pausing ALWAYON as well as Christmas.
2. **Switch on 6 of the 11 ad sets at launch** and keep 5 paused as reserves, so each live one gets about $6 to $7/day.
   - **On at launch:** Warm high-intent, LAL Buyers 1%, LAL Add to cart 1%, Gift occasions, Pet owners, Men buying gifts. These are closest to past buyers, or to the angles that sold before: dog video, couples and men.
   - **Reserves (stay paused):** Cold high-intent holiday, LAL 1-3% wider, Family, Hobby and creative, Brick lovers. Each reserve replaces the weakest live ad set after 7 days, in the order listed.

| Option | Billo UGC | Christmas | ALWAYON | Proven Winners | Total Meta |
|---|---|---|---|---|---|
| **A (recommended): keep $80** | **$40**, 6 ad sets on | **paused** (whole campaign, incl. come-back ad set) | **paused** | $40, untouched | **$80** |
| B: add spend | $50, 6 ad sets on | paused | $20 | $40 | **$110: +$30/day, +37.5%, above the 20% one-step limit, and the 2.8 ROAS rule is not met** |

- **Why A.** It moves money from the two campaigns with no Shopify proof into the footage with the longest purchase history. Total spend stays the same.
  - Christmas's best-selling ads (Dog v4, couple_vid v2, Couple v3, mom_video v2) are the same creatives as Billo rows 1, 3, 5 and 6, so most of Christmas moves over intact.
  - The warm ad set covers the come-back ad set's people (30-day visitors and add to carts) and more.
- **What A gives up:**
  - Christmas's come-back ad set brought the only clean Shopify order (#21129, BACK anniversary). The anniversary video keeps running in Proven Winners (WIN | anniversary), so it isn't lost.
  - ALWAYON's MEN ad had the best cart rate on Meta last week (5 of 42 visitors). The Billo "Men buying gifts" ad set is aimed at the same buyers. If Eden wants to keep MEN running, the alternative is ALWAYON at $10 and Billo at $30 (4 ad sets on: Warm, LAL Buyers 1%, Gift occasions, Men buying gifts).
- **Why not B.** It raises spend without proof, against the standing rule. Choose it only as a deliberate holiday bet; if Shopify ROAS is under 2.0 on Nov 17 I'd cut it back.
- **9 ads per live ad set is still a lot for $6 to $7/day.** Meta will concentrate spend on 2 or 3 ads per ad set within a few days. That is fine for a "find the winner" week. No ads are switched off by hand in the first 7 days.

## Overlap with A-2026W45-053 (Christmas rotation)

- A-053 (pending) rotates the Christmas main ad set to 4 live ads: Dog v4, anniversary, couple_vid v2 and gen_vid. 3 of those 4 are the same creatives this campaign uses (rows 1 and 3, and Couple v3 in row 6 is the one A-053 pauses).
  - If both run, the two campaigns bid against each other for the same people with the same videos, and Shopify tags split between them. That makes both harder to judge.
- **Recommendation: drop A-053** (reject it) if Eden approves A-054 with option A, since option A pauses Christmas.
  - If Eden picks option B, Christmas is paused too, so A-053 is still moot.
  - Only if Eden rejects A-054 should A-053 go ahead as written.

## How it runs on approval (what "approved" does)

**Option A:**
1. Pause the Christmas campaign 120252787078920597.
2. Pause ALWAYON PROMO -v1 120252425110090597.
3. Billo UGC 120252917166090597: campaign budget $30 to $40/day. Switch on the campaign and the 6 launch ad sets (Warm 120252917169280597, LAL Buyers 1% 120252918727670597, LAL Add to cart 1% 120252918728120597, Gift occasions 120252918729390597, Pet owners 120252918739290597, Men buying gifts 120252918741730597), with their 9 ads each (or fewer, if Eden switches some off after the previews). The 5 reserve ad sets stay paused.
4. Read every setting back, including the Purchase-only check, and log before and after in this file.

**Option B:** the same, but Billo goes to $50 and ALWAYON stays ACTIVE at $20.

**Small version (if Eden wants to keep MEN in ALWAYON):** Christmas paused, ALWAYON $10, Billo $30 with 4 ad sets on (Warm, LAL Buyers 1%, Gift occasions, Men buying gifts). Total $80.

**No edits for 7 days after launch**, then the standing rules:
- Raise the budget one step only if Shopify ROAS is above 2.8 on 5+ tagged orders.
- Cut or pause under 2.0 after 7 days.
- Per ad: swap out any ad with $15+ spent and 0 add to carts.

**How I'll judge it (Nov 10 review, 7 days after launch):**
- Shopify orders and net sales with utm_campaign=120252917166090597 (rows 1 to 8) or billo-holiday26 (row 9), split by ad set with utm_term (one ad set ID per audience).
- Target: Shopify ROAS 3.0, or at least 2.0 with 3+ orders, to keep it running.

## Applied (2026-11-03, A-2026W45-054 approved; PARTIAL, Billo still paused)

- **Approval.** Eden in chat, recorded in the queue by the main session (commit 5132973): "approve: Billo 65, Proven Winners 15 anniversary only, pause Christmas and ALWAYON, reject 053". The checker printed A-2026W45-054 for ads-analyst.
- **Final plan** (not option A, B or small as written above): Billo $65/day with 8 ad sets on; Proven Winners $15/day with the anniversary ad only; Christmas and ALWAYON paused. Total $80/day. A-053 rejected.

### Done by the main session (read back by Daniel)

| Campaign | ID | Status | Daily budget |
|---|---|---|---|
| MB \| Sales \| Billo UGC \| Holiday26 | 120252917166090597 | **PAUSED** (not switched on yet) | $65 |
| MB \| Sales \| Proven Winners \| Nov26 | 120252873643310597 | ACTIVE | $15. WIN \| anniversary 120252873646920597 ACTIVE; WIN \| Dog_vid 120252873647250597 PAUSED |
| MB \| Sales \| Christmas 2026 | 120252787078920597 | PAUSED | $20 (not spending) |
| ALWAYON PROMO -v1 | 120252425110090597 | PAUSED | $20 (not spending) |

**Billo ad sets:**
- All 11 optimize OFFSITE_CONVERSIONS on Purchase, pixel 3444389275577775.
- **ACTIVE (8):**
  - Warm 120252917169280597
  - LAL Buyers 1% 120252918727670597
  - LAL Add to cart 1% 120252918728120597
  - Gift occasions 120252918729390597
  - Pet owners 120252918739290597
  - Men buying gifts 120252918741730597
  - Family 120252918729920597
  - Brick lovers 120252918740650597
- **PAUSED reserves (3):**
  - LAL 1-3% wider 120252918728540597
  - Hobby and creative 120252918740000597
  - Cold 120252917175580597

### Done by Daniel

- Switched on 6 ads:
  - 120252918805250597 (Gift, Couple 381968)
  - 120252918821760597 (Pet, Family 221731)
  - 120252918755720597 (LAL Buyers, Family 221731)
  - 120252917350420597 (Warm, Couple 381968)
  - 120252918813250597 (Family, Couple 193477 30s)
  - 120252918820590597 (Pet, Dog 30s)

### Stopped: permission check denied the rest

- The session's permission check denied 4 of the 10 activations I tried ("Unrequested Commit in a Connected App"):
  - 120252918756280597
  - 120252918814400597
  - 120252918845930597
  - 120252918822010597
- I stopped there, did not retry and did not switch on the campaign. 120252918821120597 was not retried either.
- **Billo is PAUSED, so it is spending $0.** Today's live Meta budget is Proven Winners $15/day only.

### Ads in the 8 live ad sets

**19 of 72 ads are ACTIVE (configured):**

| Ad set | Ads on |
|---|---|
| Warm | 1 of 9 |
| LAL Buyers 1% | 2 of 9 |
| LAL Add to cart 1% | 2 of 9 |
| Gift occasions | 1 of 9 |
| Pet owners | 3 of 9 |
| Men buying gifts | 4 of 9 |
| Family | 3 of 9 |
| Brick lovers | 3 of 9 |

- **53 ads are still PAUSED** in those 8 ad sets.
- **In review.** Many ads still show IN_PROCESS. Four show PENDING_REVIEW:
  - 120252918843120597
  - 120252918821120597
  - 120252918804700597
  - 120252918802710597
- **No disapprovals.**

### To finish

Either of these works:
- Eden switches on the campaign and the paused ads in the 8 ad sets in Ads Manager.
- A session where she accepts the permission prompt does it.

Order: switch on the ads first, then the campaign last.
