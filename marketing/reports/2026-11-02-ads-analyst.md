# ads-analyst 2026-11-02 (weekly review, Meta only)

## Summary
- Meta spent $498 in 7 days (Christmas $359, ALWAYON $139). Shopify tags 2 orders (about $199) to Christmas, so Shopify ROAS is about 0.55; Meta says 0.48. ALWAYON: Meta 1.48, 0 orders tagged by campaign ID. Neither campaign is near the 2.8 raise line; no budget raised.
- Biggest leak: Dog v4 took $137 (38% of Christmas) with 55 landing views and 0 add to cart. Proposed: replace it with Dog v5 pointing to /pages/editor (10.6% cart rate) and keep spend the same.
- Google was not read: no snapshot has ever been pulled and I used no Adspirer calls.

## Done
- Per-ad table, Shopify UTM check and budget rule check in `marketing/analytics/ads-analyst/2026-11-02-numbers.md`.
- Wrote the Dog v5 proposal: `marketing/analytics/ads-analyst/changes/meta-dog-v4-point-to-ready-made.md`.
- Task board task done: Christmas 7-day spend vs Shopify orders, per-ad keep/cut, one P- block. No changes made to the accounts, as the board said.
- Rotation (Sunday review): only Couple v3 (reasons) meets the swap-out test ($18.45, 0 add to cart). Dog v4 would be kept by the "Shopify order" rule, but I propose replacing it with an exception (above). I did not rotate today because the board says no changes; I recommend swapping Couple v3 for the next unused pool ad (a mom or family ad) when Eden approves the item or at the Nov 9 review. All other new ads have under $8 spend and are too early.
- Offer codes: Christmas ads mention EARLYHOLIDAY20 (ends Nov 22), which `offers-calendar.md` lists as active until Nov 22. Google ads' "Order by Dec 15" is not rechecked (no Google data).

## Proposed for approval
### P-ads-analyst-20261102-1
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-dog-v4-point-to-ready-made.md
- Reason: On approval I create Dog v5 (same video, links to /pages/editor) in the Christmas main ad set, pause Dog v4 (55 landing views, 0 carts, $137), then switch v5 on; budget unchanged.
- Expires: 2026-11-07
- Status: pending

## Blocked or unknown
- Christmas campaign budget: the activity log says $60/day (set Oct 28); the read-back today shows $20. I did not touch it. Eden should confirm which is intended; at $20 the campaign cannot learn well and the 7-day read is weaker.
- Google Ads: no snapshot, so no Google spend/ROAS. The Shopify UTM data shows about 5 Google paid orders Oct 28 to Nov 1 (Brand 3, Holiday Gifts 1, PMax 1), so Google is where the paid orders are coming from. Requests are already in `marketing/data/requests.md`; the Mac pull has never run.
- ALWAYON orders cannot be tied by ID: the order UTMs for it are missing or old-style (Facebook_UA).
- Pixel dedup (from Oct 30) is still unverified.

## Sales impact
Moves $50 a day of Meta spend from a page with 0 carts to one with a 10% cart rate. Weak point addressed: Meta/social add to cart rate and zero carts on the dog page. Expected effect: about 1 extra order every 1 to 2 days if the editor page keeps its cart rate with cold traffic; unproven. Honest view: Meta is not yet paying back, Google is producing the paid orders, and the main sales fix is getting the Google data and the budget question settled.

## Next run
- Daily pacing Nov 3 onward when the Nov 16 holiday pacing starts; Friday Nov 6 weekly review (Google included if a snapshot exists).
- Apply P-ads-analyst-20261102-1 if approved and read the settings back.
- Rotation at Nov 9.
