# Meta: Billo UGC holiday campaign (2026-11-03)

- Eden's request (chat, 2026-11-03), word for word: "Build a campaign with ALL the videos made in billo and make sure the audience is high intent purchase for holidays", then "And include Lego lovers".
- Queue item: **A-2026W45-054** (pending). Executor: ads-analyst. Type: ad-change.
- Account PhotoBrick 1493067227536648, Page 105916444396794, pixel 3444389275577775. Facebook connector only; no Google or Adspirer calls.
- **Everything is PAUSED.** `ads_activate_entity` was not called. The campaign spends nothing until Eden approves A-054 and it is switched on.
- Review in Ads Manager: https://www.facebook.com/adsmanager/manage/campaigns?act=1493067227536648&selected_campaign_ids=120252917166090597

## What was built (read back 2026-11-03)

| Level | Name | ID | State |
|---|---|---|---|
| Campaign | MB \| Sales \| Billo UGC \| Holiday26 | 120252917166090597 | PAUSED. Sales objective, campaign budget (CBO) $30/day placeholder, lowest cost, no cap. Meta attached the store catalog (1094886087542510) by itself; no catalog ads are used. |
| Ad set 1 | Warm high-intent \| Visitors 30-180d + ATC + IC + IG/FB engagers 180d \| Excl Purch \| US 24+ | 120252917169280597 | PAUSED. Purchase (OFFSITE_CONVERSIONS) on the pixel, 7-day click + 1-day view, US, 24+, Advantage+ placements. Advantage+ audience OFF (reason: custom audiences only), so it reaches only these people. |
| Ad set 2 | Cold high-intent holiday \| Engaged Shoppers AND (Gift/Xmas OR LEGO lovers OR Family/Pets) \| Excl Purch \| US 24+ | 120252917175580597 | PAUSED. Same optimization, US, 24+, Advantage+ placements, Advantage+ audience ON (see the note below). |
| Ads | 9 Billo videos in each ad set, 18 ads | listed below | All PAUSED. Meta shows them IN_PROCESS or PENDING_REVIEW, the normal review states. `ads_get_errors` on the campaign, both ad sets and two ads: no errors. |

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

### Excluded in both ad sets (past buyers)

- customers_export.csv 120218644952060597
- purchase 730 days sep 25 120252332056620597
- MB_Purchasers_180d_EXCLUDE 120250587721690597
- Purchase 120249604850310597

## The Billo videos: every one found, and what happened to it

How I found them:
- I read every ad in the account that ever spent money (263 ads) and their creatives (255).
- I read the video library: titles containing "billo" or "MEMOBRICK_video_original".
- Meta gives every creative its own copy of a video, without the file name. So I matched each ad's video to the Billo source file by exact length, down to the millisecond, plus Meta's thumbnail file.
- Rule: one ad per distinct footage. A second cut of the same footage gets its own ad only when it really differs (a different opening or length).

### Included: 9 videos from 7 Billo files (18 ads, 9 per ad set)

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

## Budget

Today Meta spends $80/day: Proven Winners $40 (launched Nov 1, first check Nov 4), Christmas $20, ALWAYON $20.

- Christmas: Shopify ROAS **0.31 to 0.69** since Oct 26 (break-even 3.0, cut line 2.0).
- ALWAYON: **0 tagged Shopify orders** last week.
- The rule for raising total spend (Shopify ROAS above 2.8 over 7 days with 5+ orders) is **not met** by any Meta campaign.

| Option | Billo UGC | Christmas | ALWAYON | Proven Winners | Total Meta |
|---|---|---|---|---|---|
| **A (recommended): keep $80** | **$30** | **paused** (whole campaign, incl. come-back ad set) | **$10** (from $20) | $40, untouched | **$80** |
| B: add spend | $40 | paused | $20 | $40 | **$100: +$20/day, +25%, above the 20% one-step limit, and the 2.8 ROAS rule is not met** |

- **Why A.** It moves money from the two campaigns with no Shopify proof into the footage with the longest purchase history. Total spend stays the same.
  - Christmas's best-selling ads (Dog v4, couple_vid v2, Couple v3, mom_video v2) are the same creatives as Billo rows 1, 3, 5 and 6. Most of the Christmas campaign moves over intact.
  - The warm ad set covers the come-back ad set's people (30-day visitors and add to carts) and more.
- **What A gives up.** Christmas's come-back ad set brought the only clean Shopify order (#21129, BACK anniversary). The anniversary video is not Billo, so it isn't in this campaign. It keeps running in Proven Winners (WIN | anniversary), so it isn't lost.
- **Why not B.** It raises spend without proof, against the standing rule. Choose B only as a deliberate holiday bet. If you do, I'd pause it again on Nov 17 if Shopify ROAS is under 2.0.
- **Under CBO, the warm ad set could take most of the $30.** It is the smaller, hotter audience. If after 3 days the cold ad set gets under $8/day, I'll propose an $8 minimum on it.
- **18 ads on $30/day is thin.** Meta will concentrate spend on 2 or 3 ads per ad set within a few days. That is fine for a "find the winner" week. No ads are switched off by hand in the first 7 days.

## Overlap with A-2026W45-053 (Christmas rotation)

- A-053 (pending) rotates the Christmas main ad set to 4 live ads: Dog v4, anniversary, couple_vid v2 and gen_vid. 3 of those 4 are the same creatives this campaign uses (rows 1 and 3, and Couple v3 in row 6 is the one A-053 pauses).
  - If both run, the two campaigns bid against each other for the same people with the same videos, and Shopify tags split between them. That makes both harder to judge.
- **Recommendation: drop A-053** (reject it) if Eden approves A-054 with option A, since option A pauses Christmas.
  - If Eden picks option B, Christmas is paused too, so A-053 is still moot.
  - Only if Eden rejects A-054 should A-053 go ahead as written.

## How it runs on approval (what "approved" does)

**Option A:**
1. Pause the Christmas campaign 120252787078920597.
2. ALWAYON 120252425110090597: daily budget from $20 to $10.
3. Billo UGC 120252917166090597: keep $30, switch on the campaign, both ad sets and all 18 ads (or fewer, if Eden switches some off after the previews).
4. Read every setting back and log before and after in this file.

**Option B:** the same, but Billo goes to $40 and ALWAYON stays at $20.

**No edits for 7 days after launch**, then the standing rules:
- Raise the budget one step only if Shopify ROAS is above 2.8 on 5+ tagged orders.
- Cut or pause under 2.0 after 7 days.
- Per ad: swap out any ad with $15+ spent and 0 add to carts.

**How I'll judge it (Nov 10 review, 7 days after launch):**
- Shopify orders and net sales with utm_campaign=120252917166090597 (rows 1 to 8) or billo-holiday26 (row 9), split warm and cold by utm_term.
- Target: Shopify ROAS 3.0, or at least 2.0 with 3+ orders, to keep it running.
