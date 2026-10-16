# ads-analyst 2026-10-16 (Meta improvement run, Eden's request)

## Summary

Meta is losing money on Shopify evidence (7 days: $511.91 spent, 1 tagged order, ROAS 0.23) for three reasons: Instagram placements take 46% of spend and almost never sell, the money sits in old ads (ALWAYON PROMO -v1 is back on since 9:30 today; its ad set spent $214 last week for 0 purchases) while the Christmas ads get nothing, and the tracking cannot be trusted to steer.
Hugo's reels are cut to face-safe 4:5 versions and already uploaded to the Meta media library (no upload needed by Eden). A-2026W42-038 is done (paused ad created).
Five Meta proposals below keep the total at $60/day; Eden has four clicks to make (list at the end).

## Account summary

| | Last 7 days | Last 28 days |
|---|---|---|
| Meta spend | $511.91 | about $1,920 (placements total) |
| Meta-reported purchases | 6 / $776.52 | 23 |
| Shopify orders tagged facebook/paid | 1 / $116.29 | 9 (incl. 2 with blank source) / $935.10 |
| Shopify-based Meta ROAS | 0.23 | about 0.49 ($935 / $1,920; break-even 3.0) |
| Meta daily budget now | $80 (Proven Videos $60 + PROMO -v1 $20) | |

Numbers: `marketing/analytics/ads-analyst/2026-10-16-numbers.md` (section "Meta deep dive").

## The 3 biggest reasons Meta is weak

1. **Instagram eats almost half the money and does not sell.** 28 days: Instagram placements $879 (46% of spend) for 6 of 23 Meta purchases; Instagram Reels $271 for 0 purchases, and only 56% of its clicks even loaded the page (Instagram Feed 69%; Facebook Feed 84%, Facebook Reels 97%). Shopify agrees: in 14 days Instagram sent 111 sessions and 0 completed checkouts; Facebook sent 523 and 6. No Instagram account is connected to the ad account, so these ads show under the Facebook Page name. This is also where the drop in landing page views per click (76% vs 93% last year) comes from.
2. **The budget sits on tired ads and the Christmas message gets no delivery.** ALWAYON PROMO -v1 was turned back on in Ads Manager at 9:30 today ($20/day): its VARIUS INTEREST ad set spent $214.47 last week for 2 add to carts and 0 purchases, at a $25 CPM (Proven Videos $15.54), with "The Lego Group" as an interest and a "dog" ad that says #legoart with five stars. Inside Proven Videos, Meta gives Dog_vid 61% of spend (last 3 days $105.52 of $172) and the 4 Christmas ads $6.83 together, so nobody sees the code, the Dec 15 date or a Christmas reason to buy. Nothing has run from the retargeting side since the old campaign was paused.
3. **The numbers Meta optimizes on are inflated and our own tagging is patchy.** Meta counted 6 purchases last week; Shopify saw 1 tagged order. The pixel received 29 server and 13 browser Purchase events for about 20 store orders (a steady 2 server : 1 browser pattern), which points to two server senders; if their event IDs differ, Meta counts some sales twice. Every ad set also counts 1-day view-through buyers. 47 of 57 orders in 28 days carry no UTM, and the connector cannot read the URL parameters of the old page-post ads, so we cannot see which ads really sell. Match quality is excellent (Purchase EMQ 9.3), so the problem is duplication and tagging, not data quality.

## Ranked plan

1. **Stop the leak today** (P-ads-analyst-20261016-2 and -6): pause ALWAYON PROMO -v1 again ($20/day saved) and pause 3 ads with spend and no add to cart, one of which breaks the brand rules.
2. **Fix tracking before spending more** (Eden, 10 minutes, list below): Shopify data sharing to Maximum, find and switch off the second Purchase sender, add URL parameters to every active ad.
3. **Give Christmas a guaranteed $15 a day on Facebook placements** (P-ads-analyst-20261016-3), out of the same $60.
4. **Add Hugo's reels as 3 paused ads** in that ad set (P-ads-analyst-20261016-4); launching is a separate item once Eden has seen the previews.
5. **Retargeting at $10 a day** for site visitors, cart starters, video viewers and IG engagers, with new creative only (P-ads-analyst-20261016-5); Proven Videos goes to $50 so the total stays $60.
6. **Connect the Instagram account**, then re-test Instagram Feed and Stories only with the new reels (not Reels placement) in November.
7. Judge everything on Oct 23 on Shopify orders by utm_campaign and utm_content, not on Meta's count.

Budget if all are approved: Proven Videos $50 (of which Christmas ad set at least $15), retargeting $10, PROMO -v1 $0. **Total $60/day, $20 less than today.**

## Done

- Status set to working; this report; status set to needs_me.
- Approvals: A-2026W42-038 approved and acted on. Created creative 1039784429084822 (video 1671409811248661, the 1:1 photo-to-mosaic crop already in the account; text, headline, Shop now and editor URL with utm_source=facebook, utm_medium=paid, utm_campaign=120252562193330597, utm_content=photo-to-mosaic-1x1, as in the draft) and ad "PV | Photo to mosaic 1x1" (120252651749520597) in ad set 120252562197040597. Created with status PAUSED; read back effective status PENDING_REVIEW (Meta reviews paused ads too). I could not download the video to check faces (the proxy blocks Meta's video host); the owner approved with the face-check note and footage-rights.md lists the original as ok. Launching needs a separate item. A-2026W42-018 and 019 (Google) still need the owner, as in the morning report.
- Hugo's videos: checked frames of every W43 4:5 cut and every W44 video. Made 4 face-safe 4:5 cuts in `marketing/analytics/ads-analyst/meta-uploads/` (family photo-to-bricks with the cat-portrait shot removed, building ASMR with the "reveal on Friday" end card removed, AI cat guess and AI couple with code on a blurred 4:5 background) plus thumbnails, and uploaded the 4 videos to the Meta media library through the connector's public-URL upload (the repo's raw GitHub links). Video IDs, all status ready: 1106937725422025 (family), 962046793130383 (cat), 2298349531017066 (couple), 1780519146523716 (building). The local-file tools (`ads_creative_upload_local_image`) are not rolled out to this account, and `LOCAL_FILE` upload needs an interactive file picker.
- Face check: the woman from the cat portrait is clearly visible in S-20261023-1 (whole video), S-20261028-1 (the reveal, about 10 to 17 s) and the uncut S-20261019-1 (10.5 to 13.5 s). None of these is used. S-20261021-1 shows only unrecognizable close-ups of that mosaic. S-20261026-1 and S-20261030-1 show AI people and an AI cat, plus hands.
- Diagnosis read through the free Facebook connector (campaigns, ad sets, ads for 3, 7, 14 and 28 days; placements; activity log; datasets, match quality and Purchase event sources; custom audiences; creatives) and Shopify (orders by UTM, social sessions). Zero Adspirer calls. No budget, status or setting was changed except the approved paused ad.
- Offer check: all new copy uses only EARLYHOLIDAY20 (active), Dec 15 (Facts table), "As seen on FOX" and the free design proof on request. Copy check passed on all 5 drafts.

## Proposed for approval

### P-ads-analyst-20261016-2
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-repause-alwayson-promo-v1.md
- Reason: If approved, ads-analyst pauses ALWAYON PROMO -v1 again (Eden turned it back on at 9:30 today; $214 last week for 0 purchases), taking Meta from $80 to $60 a day; reject if it was turned on on purpose.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261016-3
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-xmas-adset-min-spend.md
- Reason: If approved, ads-analyst creates and launches a Facebook-only Christmas ad set with at least $15 a day inside the same $60 campaign, moves the 4 approved Christmas ads into it and pauses their starved copies.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261016-4
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-new-ads-hugo-reels-paused.md
- Reason: If approved, ads-analyst creates 3 PAUSED ads from Hugo's face-safe 4:5 reels (family, pet, couple; AI label on) with EARLYHOLIDAY20 and Dec 15 copy; launching is a separate approval.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261016-5
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-retargeting-adset-new-creative.md
- Reason: If approved, ads-analyst launches a $10 a day retargeting ad set (visitors, cart starters, video viewers, IG engagers) with 2 new ads, pauses the old EARLYBIRD20-era ad set and cuts Proven Videos to $50, so the total stays $60.
- Expires: 2026-10-21
- Status: pending

### P-ads-analyst-20261016-6
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-pause-zero-atc-ads.md
- Reason: If approved, ads-analyst pauses 3 active Meta ads with spend and no add to cart (PV gen_vid, PV POV reasons, and "dog", which shows #legoart and five stars); no budget change.
- Expires: 2026-10-21
- Status: pending

## What Eden must click

1. **Upload: nothing to do.** The 4 cuts are already in Ads Manager > Media library (search "MB-ad-"). If you ever want to upload by hand: Ads Manager > Media library (All tools > Media library) > Upload > choose from `marketing/analytics/ads-analyst/meta-uploads/`: MB-ad-family-photo-to-bricks-4x5.mp4, MB-ad-cat-guess-4x5.mp4, MB-ad-couple-code-4x5.mp4, MB-ad-building-asmr-4x5.mp4.
2. **Shopify data sharing to Maximum:** Shopify admin > Settings > Apps and sales channels > Facebook & Instagram > Open sales channel > Settings > Data sharing settings > turn on Customer data sharing > choose **Maximum** > Save.
3. **Find the second Purchase sender:** Meta Events Manager > photobrickusa's Pixel (3444389275577775) > Overview > click **Purchase** > View details > look at "Event deduplication" and the list of integrations sending server events. If two apps or partner integrations send Purchase from the server (for example the Shopify app plus another app), keep the Shopify Facebook & Instagram app and disconnect the other (Settings > Partner integrations). Also check what still sends PageView to the second dataset "non pixel" (2529105204069600).
4. **URL parameters on every active ad:** Ads Manager > Ads tab > filter Delivery: Active > select all > Edit > scroll to Tracking > URL parameters > paste `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}` > Publish. This should not restart learning.
5. **Connect Instagram:** Meta Business Suite > Settings > Accounts > Instagram accounts > Add (log in to the Memobrick Instagram) > then open that Instagram account > Connected assets / Assign assets > add ad account **PhotoBrick (1493067227536648)**. Tell me when it is done; I cannot connect it through the connector.
6. **Decide on ALWAYON PROMO -v1** (you turned it on at 9:30 today): approve P-2 to pause it, or reject it and tell me why you want it on.
7. **Cat-portrait consent:** if the woman in the cat portrait gives written consent, tell Hugo; until then S-20261023-1 and S-20261028-1 stay out of ads.

## Blocked or unknown

- `ads_creative_upload_local_image` returns "being gradually rolled out" for this account; `LOCAL_FILE` upload needs an interactive picker. I used the public-URL upload from the repo's raw GitHub links instead.
- The repository is **public** on GitHub (that is why the raw links work). It holds sales figures, ad account IDs and marketing plans. Eden may want to make it private; then future video uploads will need the manual Media library steps above.
- I could not watch the 1:1 video for A-2026W42-038 (the proxy blocks Meta's video download host).
- Ad-level URL parameters are not readable through the connector, so I cannot confirm which old ads lack UTMs; Eden's bulk edit (step 4) fixes them all.
- The Shopify Facebook & Instagram data-sharing level cannot be read from here.
- EARLYHOLIDAY20 end date and holiday budget are still unknown in offers-calendar.md.

## Sales impact

Weak point: referred traffic fell and Meta brings almost no tagged orders. If all five items are approved, Meta spend drops $20 a day while $15 a day goes to Christmas gift ads and $10 a day to people who already know us. Expected: from 1 tagged Shopify order a week now to 3 to 5 a week by Oct 30, which is what a Shopify ROAS near 1.0 to 1.5 at $60 a day means; reaching 3.0 needs the November demand curve (orders doubled the week of Nov 10 last year). The tracking fixes do not add orders by themselves but stop Meta from optimizing toward double-counted sales.

## Next run

Daily from Oct 17 until the items are decided: apply approved items, read back, and check that "PV | Photo to mosaic 1x1" is PAUSED after review. Oct 18: Christmas ad delivery. Oct 23 weekly: judge on Shopify utm_campaign and utm_content; propose launching the 3 new reels ads if previews are approved.
