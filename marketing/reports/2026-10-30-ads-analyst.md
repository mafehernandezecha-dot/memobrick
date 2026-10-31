# ads-analyst 2026-10-30 (daily pacing and task board)

## Summary
- Meta spent about $94 yesterday (Christmas $75.74, ALWAYON $17.89) against 4 Shopify orders and $472 net. Meta credits 1 purchase ($95) to ALWAYON and none to Christmas.
- Christmas, last 7 days: $257 spent, 1 Meta purchase ($80.72), Meta ROAS about 0.3. Dog v4 (dog page): $83, 31 landing views, 0 add to cart. No budget moves before Nov 2 as ordered.
- Google was not read: no data snapshot has been pulled yet (`marketing/data/latest.md` says "never") and I used no Adspirer calls.

## Done
- Task 1: per-ad read-back for days 2 and 3, in `marketing/analytics/ads-analyst/2026-10-30-numbers.md`.
  - Dog v4 sends clickers to /pages/dog-brick-mosaic: 31 clicks, 31 landing views, 0 add to cart, $83.06. Plainly: it is not working yet. The Christmas main ad set (120252787082260597) is the one that should point at a ready-made design page; proposal in `changes/meta-dog-v4-point-to-ready-made.md`, for the Nov 2 review.
  - Come-back ad set (120252819248880597) is delivering: $20 in the window, so the $10 minimum is met, but only 625 impressions and 3 clicks, frequency 2.4 to 2.8.
  - Only Christmas ad with a purchase: anniversary ($14.94, 1 order, $80.72). Only ALWAYON has Meta ROAS near 3.0 (4 purchases, $437 on $144). These are Meta numbers; Shopify UTM check is due Nov 2.
- Task 2: ViewContent, AddToCart, InitiateCheckout and Purchase all fire on the pixel (3444389275577775) over Oct 28 to 30. The connector gives totals per event, not per page, so the dog page and Calm Build Gift specifically are unconfirmed. Someone needs Meta Pixel Helper on those two pages.
- Task 3: deduplication steps for Eden in `changes/2026-10-30-pixel-dedup-steps.md`. Purchase rows total 22 over three days versus 8 Shopify orders on Oct 28 and 29 alone, so duplicates are likely.
- Paused or off (Meta): old campaign "PV" ads (campaign paused, 7-day spend $184, 1 purchase), old XMAS Family, Partner, Pet and Grandparents ads (campaign paused), and in the Christmas ad set Dog v2, Dog v3, Couple v2, couple_vid, mom_video, connie_once_upon_a_time and Gift Pictures v1. Active: ALWAYON ($20/day, 5 ads), Christmas main ad set (7 ads active), come-back ad set (2 ads active; the no-code ad starts Nov 23).
- Budget rule: no raise. Christmas is below 2.8, ALWAYON has under 5 Shopify-tagged orders confirmed and Meta-only credit.

## Proposed for approval
None approved-needed today. One draft for the Nov 2 review, not yet an active item: `marketing/analytics/ads-analyst/changes/meta-dog-v4-point-to-ready-made.md`.

## Blocked or unknown
- Google Ads not checked: no snapshot yet. I did not add a data request because `requests.md` was not edited this run; the Mac pull has not run at all yet per `latest.md`.
- Shopify orders by referrer / UTM not pulled this run; Meta purchases are platform numbers only.
- Christmas spent $75.74 yesterday with 0 purchases. That is above the $50 waste line, but the Task Board says no moves before Nov 2 (learning week), so I report it and propose nothing. If it is still 0 on Nov 2, the standing rule says propose a cut below 2.0 over 7 days.
- Per-page pixel firing is unconfirmed (above).

## Sales impact
Honest view: today's work finds why the Christmas campaign is not producing orders yet (the dog page converts no one from ads) and sets up the fix for Nov 2. It adds no orders itself. The dedup check protects Meta's optimization quality for Black Friday.

## Next run
- Nov 2 review on Shopify UTM orders: rotation per the Christmas rotation rules (swap out ads with $15+ spend and 0 add to cart, none yet qualify except Dog v4 which has 31 clicks and 0 ATC), the Dog v5 swap, budget rule.
- Read Google once the first snapshot exists.
