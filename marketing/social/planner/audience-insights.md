# Audience insights

Kept by the social planner. Evidence only; every line says where it comes from. Updated 2026-10-15 (second version; the evidence is unchanged because no snapshots exist yet).

## Data gaps (read first)

- **Own organic posts: no data yet.** `marketing/data/` has no Meta, TikTok or Pinterest snapshots (the morning pull has never run), and the Meta connector shows no Instagram account linked to the PhotoBrick ad account (`ads_get_ig_accounts` returned none), so `ads_get_ig_media` cannot list our posts. No post in `content-calendar.md` has reached Published with Results yet. Requests for these snapshots are in `marketing/data/requests.md`.
- **Organic social orders:** Shopify's referrer report does not split by UTM, so orders from `utm_medium=organic` links cannot be counted from here yet. The W43 posts all carry per-channel UTMs so they can be counted once posting starts.
- Until own-post data exists, the "proven" 70% of the plan rests on paid Meta results and Shopify sales below, not on organic engagement.

## What sells (Shopify, read-only, last 90 days to 2026-10-14)

| Product | Orders | Net sales |
|---|---|---|
| 16×16 portrait kit | 48 | $2,676 |
| 20×20 portrait kit | 39 | $4,175 |
| 20×30 portrait kit | 20 | $3,755 |
| 10×10 one face | 14 | $273 |
| 30×20 portrait kit | 9 | $1,341 |
| 30×30 portrait kit | 8 | $2,464 |
| Frames (20×30, 20×20, 16×16, 30×30) | 43 | about $2,800 |

Referrers, same 90 days: Google search 79 orders ($7,248), direct 57, own site and email 27, Facebook (social) 20 ($2,251), Instagram (social) 6 ($620). Facebook brings about 3 times the orders Instagram does: plan every post for Facebook as carefully as for Instagram.

## What converts in ads (Meta, PhotoBrick account, last 90 days)

| Ad | Spend | CTR | Purchases | Cost per purchase |
|---|---|---|---|---|
| FAM BLUE BACKGROUND (family photo) | $530.96 | 1.80% | 8 | $66.37 |
| MEN | $97.05 | 2.25% | 3 | $32.35 |
| PV Dog_vid (dog video) | $50.90 | 1.72% | 2 | $25.45 |
| anniversary | $72.47 | 1.74% | 2 | $36.24 |
| MEN (second ad) | $109.91 | 2.08% | 2 | $54.96 |
| New Sales Ad | $141.64 | 1.01% | 2 | $70.82 |
| menvid | $101.87 | 1.04% | 1 | $101.87 |
| surprice husband | $111.94 | 0.91% | 0 | n/a |
| PV Merriage_video | $44.16 | 1.54% | 0 | n/a |

Small numbers, so treat these as signals, not proof.

## Top 3 themes (evidence)

1. **Family photo as the gift.** Best-selling ad by purchases (8, family photo ad). Buyer profile: US women 35 to 64 buying for family; Christmas weeks carry 44% of the year's orders.
2. **Pets, especially dogs.** Cheapest purchases of any ad ($25.45, dog video, 2 purchases). A competitor in the niche (Pixel Brick Art) is running "Turn Your Dog Into Mosaic Brick Art" now (Ad Library, started October 2026, too new to call proven).
3. **Couples and partners (anniversary, gifts for him).** "MEN" ads have the best CTR (2.08% to 2.25%) and 5 purchases; "anniversary" 2 purchases at $36.24. BEMYVALENTINE was the most used code of the year (buyer profile).

## Top 3 formats (evidence)

1. **Short video of the real product** (dog video, family video ads): the only formats with purchases under $40.
2. **Static family-photo image** (FAM BLUE BACKGROUND): most purchases in total, at a higher cost.
3. **Building close-ups and process**: owner's brief says the audience loves seeing the 1×1 bricks placed; no organic numbers yet. Tested this week (W43) as slow-motion close-ups.

## Hooks that worked

- Family photo turned into the gift (family ad).
- "For him" angle (MEN ads, best CTR).
- Pet on video (dog video, cheapest purchases).

## Best days and times

Unknown: no organic data yet. W43 tests weekday evenings at 19:00 ET and weekend late mornings at 11:00 ET (when a woman 35 to 64 browsing on her phone is likely free). Replace with real data once `marketing/data/meta/<date>-content-30d.csv` arrives.

## Stop doing

- Ads with low CTR and no purchases: "surprice husband" (0.91%, $111.94, 0 purchases) and the older "family blue backgroud" ($116.01, 0.86%, 0). Avoid surprise-reaction framing without the product in the first second.
- Reposting videos already on Instagram (owner sent back A-2026W41-002 on 2026-10-14: "generate a video or publish a video that is not in the instagram account yet"). Every reel from W43 on is a new edit.
- Brick-hobby and toy angles (buyer profile: LEGO and free-template searches spent about $172 in 28 days with 0 purchases).

## Plan rule

About 70% of each week from the themes and formats above (family, pet, couple; real product video and family image), about 30% tests, logged in `marketing/shared/experiments.md`.

## Update 2026-10-15 (W44 plan)

- **Still no organic data.** `marketing/data/latest.md` says "Updated: never"; no Meta, TikTok or Pinterest snapshot exists, nothing from W42 or W43 has been published, and the same requests stay open in `marketing/data/requests.md`. The W44 plan therefore rests on the same paid and Shopify evidence above.
- **Sales weak points that shape W44** (`marketing/sales/latest.json`, 2026-10-14): referred traffic is down 64% year over year (social 1,213 sessions in 30 days), draft orders (designer proof, then invoice) fell from 74 to 6, and October is at 41 orders against a goal of 70. So W44 adds a free-proof carousel (draft orders), a size guide with prices (the 16×16, 20×20 and 20×30 kits sell most), and the verified order-by date with the active code EARLYHOLIDAY20 (Christmas weeks carry 44% of the year's orders).
- **Mix this week:** about 70% from the proven themes (couple and "for him" reel, family and gift reminders, pet) and about 30% tests (free-proof link, price-forward size guide, build-time hook, Halloween pet hook), logged as EXP-SP-20261026-01 to -05.
- **Public ad-library check not repeated this week** (no new evidence source); the Pixel Brick Art dog ad noted on 2026-10-14 is still too new to call proven.
- **Stop doing (added):** repeating one hook two weeks in a row. W43 opened a reel with "Your photo, in 1×1 bricks"; W44 opens with a different line each reel.

## Update 2026-10-22 (W45 plan)

- **Still no organic data.** `marketing/data/latest.md` says "Updated: never" and `marketing/data/` has no Meta, TikTok or Pinterest snapshot. The open requests from 2026-10-14 stay in `marketing/data/requests.md`. The Meta connector for Facebook needs authorizing in this session, so the 90-day post and ad-library checks were not repeated. The first posts went live through Buffer on 2026-10-21 (calendar rows S-20261021-1-ig, -fb, -tt are Published, no Results yet), so there is nothing to learn from yet: the W45 plan again rests on the paid Meta results and Shopify evidence above.
- **Sales weak points that shape W45** (`marketing/sales/latest.json`, 2026-10-21): October 1 to 20 is 52 orders and $6,653 against a goal of 100 and $11,000. Social sessions are 1,285 against 2,569 last year (-50%), and draft orders (designer proof, then invoice) are 11 against 78. So W45 keeps the family, pet and gift-guide themes that carry the volume, answers the photo-choice objection (customer question logged 2026-10-20) in a saveable carousel that ends on the preview and the optional free proof, and puts the verified Dec 15 order-by date and the active code on two posts (Christmas weeks carry 44% of the year's orders).
- **Mix this week:** about 70% from proven themes (family photo gift reel, pet reel, gift guide, how-it-works) and about 30% tests (a tag-someone carousel, a photo-tips carousel, a reel ending on the finished piece on the wall), logged as EXP-SP-20261102-01 to -03.
- **Stop doing (added):** repeating the same subject two weeks running in a series. Guess the photo Friday subjects so far: a cat (W44), a grandmother (W45); keep rotating.
- **Not repeated:** the Pixel Brick Art dog ad is still the only recent competitor signal; no new ad-library evidence this week.

## Update 2026-10-28 (Instagram follower sprint, first organic data)

- **First own-post numbers** (Buffer, Instagram, 8 posts Oct 21 to 26; full table in `followers.md`): reach 1,112, 33 likes, 4 comments, 2 saves, 0 shares, 0 follows, average reel watch 3.05 s. Still a small sample; treat as signals.
- **Formats:** reels reach about 1.9× more people (average 168 vs 90) but carousels get about 4× the engagement rate (8.6% vs 2.3%) and all the comments. Plan reels to reach new people and carousels to turn them into fans; keep both.
- **Hooks:** the reel that opened on real hands pressing 1×1 bricks held people longest (4.09 s) and reached the most (321). The 38 s family reel held them shortest (2.17 s). Open every reel on bricks in the first second and keep reels under 20 s.
- **Best times:** the three 19:00 ET reels reached 321, 195 and 160; the one noon reel 118. Evening stays the main slot; the sprint tests noon for the two extra reels.
- **Stop doing (added):** posts with no reason to share or follow. Nothing so far asked for a comment, a tag that brings a friend, or the viewer's own photo with a promise of a next episode; shares and follows were 0. The sprint adds a numbered series and a "which would you hang" question (EXP-SP-20261029-01 and EXP-SP-20261030-01).
- **Not available:** follower counts (Buffer has no field; the Meta connector has no Instagram account linked) and trending Instagram audio (Buffer needs the channel reconnected through Facebook Login).
