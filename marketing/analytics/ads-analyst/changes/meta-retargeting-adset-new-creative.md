# Meta: a $10 a day retargeting ad set for site visitors, cart starters and video viewers, with new creative

- Type: ad-change (create 1 ad set and 2 ads, and launch them; move $10 a day from Proven Videos so the total stays $60)
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: retargeting (120252347640260597), PAUSED, campaign budget $10/day
- Expires: 2026-10-21
- **Launches live** on approval. Total Meta daily budget: $60 before, $60 after (Proven Videos $60 to $50, retargeting $0 to $10), counting ALWAYON PROMO -v1 as paused. If Eden keeps PROMO on, the total is $80 before and after.

## Why

Nobody who visited, added to cart or watched our videos is being reminded right now: the only retargeting campaign is paused and its ad set uses Advantage+ audience with expansion, so it was not really retargeting (frequency 6.3, $141.64 for 3 Meta purchases in 28 days). Its old ads carry the expired EARLYBIRD20 creatives, so it must not simply be turned back on. Our buyer often needs a second look before a $70 to $150 gift (custom draft orders were 640 of 2,523 orders: people who wanted help first).

## Exact changes

| # | Entity | ID | Field | Current | New |
|---|---|---|---|---|---|
| 1 | Old ad set "retargeting" | 120252347640250597 | status | ACTIVE under a paused campaign | PAUSED (so its EARLYBIRD20-era ads can never run again) |
| 2 | New ad set "RT, visitors, carts, video viewers" | new | targeting | none | US; custom audiences 120251777017470597 (PB, Site Visitors 180d excl. purchasers), 120250587702740597 (MB_ATC_IC_14d), 120250964848490597 (VIDEO VIEWS 360, about 19,300 to 22,700), 120249605329830597 (IG engaged, about 2,200 to 2,600); excluded 120252332056620597 (purchase 730 days) and 120218644952060597 (customers_export.csv); **Advantage+ audience off** (delivery only to these audiences, the one case where Meta allows it); Advantage+ placements |
| 2b | same | new | optimization | none | OFFSITE_CONVERSIONS, Purchase, pixel 3444389275577775, billing IMPRESSIONS; frequency cap 2 impressions per 7 days |
| 3 | 2 new ads in it | new | creative | none | R1 and R2 below, ACTIVE |
| 4 | Campaign retargeting | 120252347640260597 | status / daily_budget | PAUSED, $10 | ACTIVE, $10 |
| 5 | Campaign Proven Videos | 120252562193330597 | daily_budget | $60 | $50 |

## The ads (videos already in the media library, see meta-new-ads-hugo-reels-paused.md for rights and face checks)

### R1 Building, hands only (video 1780519146523716, MB-ad-building-asmr-4x5.mp4, S-20261021-1 with the "Follow to see it finished, reveal on Friday" end card cut off; no AI label needed)

Primary text:

Still thinking about your photo mosaic?

Every Memobrick kit is built from tiny 1×1 bricks, pressed in one at a time. Upload your photo and see your design before you order, or ask our designers for a free proof.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your mosaic is one upload away

### R2 Couple (video 2298349531017066, MB-ad-couple-code-4x5.mp4, AI label on)

Primary text:

Picked the photo yet?

Upload it on our website, see it as a custom brick mosaic, and choose your kit size. Order by Dec 15 to have it before Christmas.

20% off with code EARLYHOLIDAY20.

Headline: 20% off with EARLYHOLIDAY20

Both: call to action Shop now, landing page the editor
`https://mymemobrick.com/pages/editor?utm_source=facebook&utm_medium=paid&utm_campaign=120252347640260597&utm_content=<r1-build | r2-couple>`.
No old creatives, no EARLYBIRD20, no ratings or customer names.

Steps: `ads_update_entity` (old ad set PAUSED), `ads_create_ad_set`, `ads_create_creative` x2, `ads_create_ad` x2, `ads_update_entity` budgets, publish with `ads_activate_entity` listing only the new objects and the retargeting campaign, then read everything back.

## Expected effect on orders

Retargeting usually converts several times better than cold traffic. At $70 a week, the bar is 2 Shopify orders a week (Shopify ROAS about 3 at a $105 average order). Proven Videos loses $10 a day.

## Risk

The site visitor audiences report the minimum size, so most delivery will go to video viewers and IG engaged people; frequency is capped at 2 a week to avoid annoying them. If an audience is too small to deliver, Meta will underspend (no waste).

## How I will judge it in 7 days

Frequency under 3, at least 2 Shopify orders with utm_campaign 120252347640260597, cost per Meta purchase under $35. Under 1 order after $70: propose a pause.
