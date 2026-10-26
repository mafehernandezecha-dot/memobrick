# Meta Christmas campaign: what was created (A-2026W44-005)

- Approval: A-2026W44-005, approved by Eden in chat on 2026-10-26 ("ok all"). Draft: `meta-christmas-campaign-paused-2026-10-26.md` (not edited).
- Executor: ads-analyst, Facebook connector, ad account PhotoBrick (1493067227536648) only.
- Launching is a separate approval. Nothing was activated; `ads_activate_entity` was not called.
- **Status: partly built.** Campaign and ad set exist and are PAUSED. **No ads yet** (see "Not done").

## Created (read back after creating)

| Level | ID | Name | Status (read back) | Settings (read back) |
|---|---|---|---|---|
| Campaign | 120252787078920597 | MB \| Sales \| Christmas 2026 \| Last year winners | PAUSED / effective PAUSED | Sales objective (OUTCOME_SALES), auction, campaign budget $40.00 a day, lowest cost (no cap) |
| Ad set | 120252787082260597 | US \| 25+ \| Adv+ \| Excl Customers \| FB Feed+Reels \| 7d click | PAUSED (effective IN_PROCESS, normal for a new paused set under a paused campaign) | Optimize for Purchase (pixel 3444389275577775, PURCHASE), website destination; United States, age 25+, Advantage+ audience on; excludes customers_export.csv (120218644952060597) and purchase 730 days sep 25 (120252332056620597), the same two lists as Proven Videos; placements Facebook Feed and Facebook Reels only; attribution 7-day click only (no view) |

Review in Ads Manager: https://www.facebook.com/adsmanager/manage/campaigns/edit?act=1493067227536648&selected_campaign_ids=120252787078920597

Meta added the account's product catalog (1094886087542510) to the campaign's promoted object on its own; nothing else differs from the draft.

Other campaigns, checked at the same read: ALWAYON PROMO -v1 (120252425110090597) ACTIVE, $20 a day, untouched. Proven Videos (120252562193330597) PAUSED, $60 a day, untouched.

## Not done, and why (stopped rather than improvise)

1. **No ads were created (Couple, Dog).** The draft says the landing page is "the Final URL the ALWAYON PROMO -v1 ads use now (read it first)". Those ads are built from Page posts, and the connector returns an empty link for them (`link_url: ""` for all five creatives). I could not read the URL, so I did not pick one myself. The 2025 videos are found and ready:
   - XMAS26 Couple: couple_video, video ID 1201815125329540 (ad 120236100225710597, $1,201.17 spent Nov 1 to Dec 15, 2025, matches the draft).
   - XMAS26 Dog: dogbillo_video, video ID 1315527356942680 (ad 120236100280500597, $644.66 spent, matches the draft).
   To finish: Eden tells me the landing page (or opens one PROMO -v1 ad in Ads Manager and copies its Website URL). I then create both ads PAUSED with the draft's text and UTMs `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`.
2. **XMAS26 Cat cannot be built as drafted.** "cat - Copy" (ad 120238105228650597, $1,119.67 spent last holiday, so the spend matches) is **not a video** and **not from the oct_29 campaign**. It is an image ad (creative 1581919846495350) in campaign 120238104257040597, and its text uses the expired code CYBER20. The draft's "cat video from oct_29" does not exist as described. The oct_29 cat video that does exist (missmelody_cat_video) spent only $21.46 last holiday, so it is not the "best" cat ad. Eden decides: use the cat image (with the new text, no code), use missmelody_cat_video, or run Couple and Dog only.

## How to judge

Unchanged from the draft: before launch, Eden sees the previews; after launch (separate item), Shopify orders by utm_campaign after every $300 of spend, pause if Shopify-tagged ROAS is under 3.0.
