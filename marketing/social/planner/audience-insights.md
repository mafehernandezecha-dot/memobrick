# Audience insights

Kept by the social planner. Evidence only; every line says where it comes from. Updated 2026-10-14 (first version).

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
