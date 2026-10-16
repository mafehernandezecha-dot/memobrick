# Meta: pause 3 active ads with spend and no add to cart

- Type: ad-change
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Expires: 2026-10-21
- Total daily budget: unchanged (campaign budgets; Meta moves the money to the other ads)

## Exact changes

| Ad | Ad ID | Ad set | Current | New | Evidence (last 28 days unless noted) |
|---|---|---|---|---|---|
| PV, gen_vid | 120252562202700597 | US, Broad 25+ (Proven Videos) | ACTIVE | PAUSED | Same creative ran as "gen_vid" in Prospecting: $37.02, 18 link clicks, 0 add to cart. Here: $0.35, 0 clicks. Meta has stopped choosing it. |
| PV, POV reasons | 120252612708140597 | US, Broad 25+ (Proven Videos) | ACTIVE | PAUSED | $2.81, 80 impressions, 0 link clicks, 0 add to cart since Oct 14. Its text uses emoji checklists and no offer. |
| dog | 120252425110120597 | VARIUS INTEREST (ALWAYON PROMO -v1) | ACTIVE | PAUSED | $19.46, 7 link clicks, 0 add to cart. Its text carries #legoart and five stars, which the brand rules do not allow (LEGO trademark, star ratings). Pause even if Eden keeps the campaign on. |

Not included: ads with spend and add to carts (Dog_vid, Merriage_video, couple_vid, MEN, anniversary, FAM BLUE BACKGORUND, MOTHER AND DAUGHTER #1). The 4 Christmas ads are too new (under $6 each).

Steps: `ads_update_entity` `{"status":"PAUSED"}` on each ad (live pause), read back with `ads_get_ad_entities`.

## Expected effect on orders

Small: about $3 a day stops going to ads that bring no carts, and fewer ads compete for impressions in Proven Videos. Removes a brand-rule violation from live ads.

## Risk

Very low. Each creative stays in the account and can be turned back on.

## How I will judge it in 7 days

Read-back PAUSED; Proven Videos cost per add to cart at or below the last 7 days' $21.45 ($278.88 / 13).
