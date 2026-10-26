# Meta Christmas campaign: all past videos and a gift-pictures carousel (A-2026W44-005, follow-up)

- Follows `2026-10-26-meta-christmas-created.md` and `2026-10-26-meta-christmas-ads-added.md`. The approved draft `meta-christmas-campaign-paused-2026-10-26.md` was not edited.
- Eden's requests, passed on by the coordinator: "i mean more than 3 videos", then "all the videos in ads in the last 2 years", then "lets do one with the pictures from gifts".
- Where: campaign "MB | Sales | Christmas 2026 | Last year winners" (120252787078920597, $40 a day), ad set 120252787082260597 (US, 25+, Facebook Feed and Reels, 7-day click, past customers excluded).
- **Everything is PAUSED.** `ads_activate_entity` was not called. Launching is a separate approval.
- Review: https://www.facebook.com/adsmanager/manage/ads?act=1493067227536648&selected_campaign_ids=120252787078920597

## What was added

- **31 new video ads plus 1 carousel.** The ad set now holds 34 ads: XMAS26 Couple and XMAS26 Dog from earlier today, plus the 32 added here. That is under Meta's limit of 50 ads per ad set.
- Read back: all 34 ads are status PAUSED. Meta shows them as PAUSED, PENDING_REVIEW or IN_PROCESS, which are normal review states for new ads. The campaign has no errors.
- Other campaigns, checked at the same read:
  - ALWAYON PROMO -v1: ACTIVE, $20 a day.
  - Proven Videos: PAUSED, $60 a day.
  - Neither was touched.

The new ads share these settings:
- Page: Memobrick (105916444396794).
- Headline "A personalized photo gift". Description "As seen on FOX". Button Shop now.
- Link: https://mymemobrick.com/collections/the-gift-for-everyone
- UTMs go in the ad's URL parameters field (`url_tags`), so the placeholders stay intact: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`. The read tool can't show `url_tags`. It was sent with every creative and Meta accepted it, so check one ad's "URL parameters" field in Ads Manager to confirm.
- Fresh copy from the draft, matched to the video's subject:
  - couple: "Turn your favorite photo of the two of you into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. Order by December 15 to receive it before Christmas."
  - pet: "Your pet, in 1×1 bricks. Upload a favorite photo, see it as a mosaic, and build a personalized photo gift for Christmas. Order by December 15 to receive it before Christmas."
  - general (the couple text without "of the two of you"): "Turn your favorite photo into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. Order by December 15 to receive it before Christmas."
- No old copy was reused. No codes, nothing about free shipping, no "lego" wording, no "Fox News".

### XMAS26 Gift Pictures (carousel), ad 120252787593110597, creative 1207902275152664

10 cards, each using the product's first image (Meta copied it into the account), with a Shop now button that links to the product page. UTMs are set the same way as the video ads.

| # | Card headline | Product page |
|---|---|---|
| 1 | Gift Kit: they pick the photo | /products/unlimited-memobrick (Art Gift Kit, new main picture "give it now, they pick the photo") |
| 2 | 10x10 in mini kit | /products/custom-bricked-mosaic-10x10 |
| 3 | 16x16 in portrait kit | /products/1-big-board |
| 4 | 20x20 in portrait kit | /products/2-2-boards |
| 5 | 20x30 in vertical kit | /products/2-3-boards |
| 6 | 30x20 in horizontal kit | /products/3-2-boards |
| 7 | 40x20 in horizontal kit | /products/4-2-boards |
| 8 | 30x30 in portrait kit | /products/3-3-boards |
| 9 | 20x50 in vertical kit | /products/2-5-boards |
| 10 | 50x20 in horizontal kit | /products/5-2-boards |

- Primary text: the general copy above. Main link: the gift collection page.
- Note: the Art Gift Kit is **not** in the gift collection in Shopify. It was put first because it was asked for by name. Cards 2 to 10 are the first nine products in the collection's own order. The gift card and the larger sizes were left out because of the 10-card limit.

## How the videos were found

- Source: every ad in account 1493067227536648 that spent money between 2024-10-26 and 2026-10-26 (237 ads), plus "PV: Photo to mosaic 1x1", which has no spend yet.
- 90 of those ads are images, catalog or dynamic ads, or Page posts with no video, so they were left out.
- That left 79 distinct video IDs. Some IDs are re-uploads of the same footage: same thumbnail file and same length. Each re-upload was counted once.
- Spend and purchases below are Meta's numbers for the 2-year window, summed over every ad that used the video. They are not Shopify numbers and not lifetime figures.

| # | Ad names that used it | Video ID | Ads | Spend | Meta purchases | Result |
|---|---|---|---|---|---|---|
| 1 | Dog_ vid / Dog / billo dog / PV: Dog_vid | 2447135395648728 | 5 | $11,149.51 | 264 | Skipped: same footage as dogbillo (XMAS26 Dog) |
| 2 | Merriage_video / White_dog_video | 1954866981751623 | 5 | $5,374.94 | 179 | Added: XMAS26 Merriage_video (ad 120252787392180597, couple copy) |
| 3 | couple_vid / jew_couple / connie and son / Advantage+ shopping campaign 03/18/20 | 886528919916887 | 5 | $6,383.47 | 158 | Added: XMAS26 couple_vid (ad 120252787409590597, general copy) |
| 4 | connie_once_upo _time / Pinkdog_video / connie_pink pool / Single_PinkPoolDog | 494468832629304 | 11 | $4,538.61 | 99 | Added: XMAS26 connie_once_upon_a_time (ad 120252787410970597, general copy) |
| 5 | gen_vid / PV: gen_vid | 782945903390689 | 6 | $4,244.50 | 96 | Added: XMAS26 gen_vid (ad 120252787413120597, general copy) |
| 6 | mom_video / Family_mom_vid / mom video / family vid / aleja video | 2129801400784100 | 6 | $3,203.98 | 95 | Added: XMAS26 mom_video (ad 120252787414080597, general copy) |
| 7 | couple_video / Billo_couple_video | 1201815125329540 | 3 | $2,093.69 | 51 | Added: XMAS26 Couple (earlier today) (ad 120252787178270597, couple copy) |
| 8 | Video _Connie_family | 1943437949603462 | 1 | $2,820.66 | 40 | Skipped: same footage as dogbillo (XMAS26 Dog) |
| 9 | White_dog_video / A1_WhiteDogVideo_2.00xROAS_33CPA / A2_WhiteDogVideo_2.00xROAS_ | 581215024133860 | 5 | $1,998.86 | 37 | Skipped: video is titled "Code EXTRA10 for 10% off" (expired code likely on screen) |
| 10 | dogbillo_video / Portrait_dog_video | 1315527356942680 | 3 | $1,192.24 | 35 | Added: XMAS26 Dog (earlier today) (ad 120252787181160597, pet copy) |
| 11 | aly and or / A1_AlyAndOr_1.59xROAS_18purchases | 1249983669275059 | 3 | $2,148.43 | 26 | Added: XMAS26 aly and or (ad 120252787416010597, general copy) |
| 12 | New Video Ad - 01 | 853466077821889 | 1 | $1,556.42 | 18 | Skipped: Page-post video, the connector does not hand it over |
| 13 | timelaps_couple_video / melody video / missmelody | 688684880427384 | 4 | $810.79 | 14 | Added: XMAS26 missmelody couple (ad 120252787417590597, couple copy) |
| 14 | jewvid | 925185682855845 | 1 | $1,066.82 | 13 | Skipped: same footage as couple_vid (added) |
| 15 | yelowbackgound_couple | 2772541656267287 | 2 | $344.66 | 12 | Skipped: same footage as couple_video (XMAS26 Couple) |
| 16 | jew_couple_video | 1340429654089495 | 2 | $316.64 | 10 | Added: XMAS26 jew_couple_video (ad 120252787456380597, couple copy) |
| 17 | pinkdog_video | 1504061087569603 | 1 | $195.09 | 10 | Skipped: Page-post video, the connector does not hand it over |
| 18 | jew_couple / couple_vid | 1847735939507539 | 2 | $950.21 | 8 | Skipped: same footage as couple_vid (added) |
| 19 | connie and son | 706212688069568 | 3 | $396.33 | 7 | Added: XMAS26 connie and son (ad 120252787457180597, general copy) |
| 20 | anniversary / PV: POV reasons / ANNIVERSARY COUPLE | 1405986334768088 | 5 | $274.67 | 5 | Skipped: Page-post video, the connector does not hand it over |
| 21 | aleja video | 2716862915182849 | 1 | $227.50 | 5 | Added: XMAS26 aleja video (ad 120252787457800597, general copy) |
| 22 | New Sales -01 | 874051775265216 | 1 | $148.30 | 5 | Skipped: Page-post video, the connector does not hand it over |
| 23 | New SalesAd - 04 / kidlego VIDEO | 1000212189647562 | 4 | $500.17 | 4 | Added: XMAS26 pet lover 60s (ad 120252787458820597, pet copy) |
| 24 | dog and girl | 1048145828103391 | 1 | $495.30 | 3 | Skipped: same footage as dogbillo (XMAS26 Dog) |
| 25 | New Sales-03 | 4384662451777241 | 1 | $314.78 | 3 | Skipped: Page-post video, the connector does not hand it over |
| 26 | New Ad - 03 | 2808998559444844 | 1 | $276.77 | 3 | Added: XMAS26 unique gift 24s (ad 120252787462320597, general copy) |
| 27 | New Sales Ad and Message | 2916358452048972 | 1 | $194.02 | 3 | Skipped: Page-post video, the connector does not hand it over |
| 28 | Video _family | 1201610298654914 | 1 | $88.96 | 3 | Added: XMAS26 Video _family (ad 120252787466510597, general copy) |
| 29 | alejandra video | 1967398530280821 | 5 | $203.74 | 2 | Added: XMAS26 alejandra video (ad 120252787528900597, general copy) |
| 30 | Custom-LookLike Ad - 03 | 2870455893287286 | 1 | $161.39 | 2 | Skipped: Page-post video, the connector does not hand it over |
| 31 | connie_dog | 1863689430882108 | 2 | $41.41 | 2 | Added: XMAS26 connie_dog (ad 120252787529080597, pet copy) |
| 32 | Family / Family_mom_vid | 703471018704171 | 2 | $315.58 | 1 | Added: XMAS26 Impressive Gift Ideas (ad 120252787530560597, general copy) |
| 33 | A1_NewSales01_2.13xROAS_30CPA | 1300898508621091 | 1 | $164.77 | 1 | Skipped: Page-post video, the connector does not hand it over |
| 34 | A2_NewSales01_2.13xROAS_30CPA | 2017023165677830 | 1 | $155.89 | 1 | Skipped: Page-post video, the connector does not hand it over |
| 35 | dog-girl video | 4149181525352174 | 1 | $124.23 | 1 | Skipped: same footage as dogbillo (XMAS26 Dog) |
| 36 | MOTHER AND DAUGHTER #1 | 2786059298433030 | 3 | $51.97 | 1 | Skipped: Page-post video, the connector does not hand it over |
| 37 | New SalesAd - 03 | 1042153271480713 | 1 | $29.89 | 1 | Added: XMAS26 custom pet mosaic 13s (ad 120252787530870597, pet copy) |
| 38 | Video _Connie_family | 2040635706491291 | 1 | $27.85 | 1 | Skipped: same footage as connie and son (added) |
| 39 | XMAS: Partner | 2452200455306458 | 1 | $5.77 | 1 | Added: XMAS26 love story brick by brick (ad 120252787531650597, couple copy) |
| 40 | New Video Ad - 02 | 2525242631273735 | 1 | $263.02 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 41 | family blue backgroud | 1401730418086407 | 1 | $116.01 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 42 | girl and dog / Single_BeachDog | 2080338042487867 | 2 | $111.68 | 0 | Skipped: same footage as dogbillo (XMAS26 Dog) |
| 43 | aly and or | 937806241480949 | 1 | $35.32 | 0 | Added: XMAS26 Turn Any Photo Into Bricks (ad 120252787532350597, general copy) |
| 44 | dog | 1788694048819709 | 1 | $25.08 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 45 | mom | 2256578195127392 | 1 | $22.78 | 0 | Skipped: same footage as mom_video (added) |
| 46 | dog_video | 1337765857187041 | 1 | $22.25 | 0 | Added: XMAS26 Custom Yours Today (ad 120252787553410597, general copy) |
| 47 | New Ad - 02 | 1357808209734215 | 1 | $21.27 | 0 | Skipped: same footage as the EXTRA10 video above |
| 48 | Custom-LookLike Ad - 01 | 1842352070077357 | 1 | $20.57 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 49 | Video _Connie_family | 1443677927859876 | 1 | $19.53 | 0 | Skipped: same footage as connie and son (added) |
| 50 | Memorial_Cat_Video | 1297511358333651 | 1 | $18.24 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 51 | XMAS: Pet | 1129577313060791 | 1 | $17.86 | 0 | Added: XMAS26 pet photo in bricks (ad 120252787553840597, pet copy) |
| 52 | men | 1081184577704036 | 1 | $16.23 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 53 | mom video | 1697494424894728 | 2 | $16.04 | 0 | Added: XMAS26 anniversary build (ad 120252787554050597, couple copy) |
| 54 | New Ad - 01 | 993208459787459 | 1 | $15.90 | 0 | Skipped: same footage as connie and son (added) |
| 55 | couple anniversary | 1818091919531390 | 1 | $15.53 | 0 | Added: XMAS26 cozy night in (ad 120252787555180597, general copy) |
| 56 | Custom-LookLike Ad - 04 | 27625758090394453 | 1 | $14.38 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 57 | family blue backgroud - Copy | 4036292326678657 | 1 | $13.78 | 0 | Skipped: same footage as couple_video (XMAS26 Couple) |
| 58 | mom and two kids | 1607487151042488 | 1 | $13.19 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 59 | XMAS: Family | 1623249245919809 | 1 | $12.66 | 0 | Added: XMAS26 family photo in bricks (ad 120252787555980597, general copy) |
| 60 | JEW | 1525680145816834 | 2 | $9.62 | 0 | Added: XMAS26 JEW 30s (ad 120252787556570597, general copy) |
| 61 | New Sales-04 | 1400023772185071 | 1 | $9.52 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 62 | New SalesAd -01 / DOG | 1752292086132652 | 2 | $9.29 | 0 | Added: XMAS26 pet into brick art 40s (ad 120252787569560597, pet copy) |
| 63 | Custom-LookLike Ad - 02 | 1499178798368279 | 1 | $8.79 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 64 | White_dog_video | 1471134371370883 | 1 | $8.27 | 0 | Skipped: same footage as mom_video (added) |
| 65 | New Sales-05 | 1039370685218266 | 1 | $7.90 | 0 | Added: XMAS26 favorite photo brick art 24s (ad 120252787569840597, general copy) |
| 66 | Video _Connie_family | 1193972946036376 | 1 | $7.40 | 0 | Skipped: same footage as connie and son (added) |
| 67 | New SalesAd - 02 | 1586453949844167 | 1 | $5.55 | 0 | Added: XMAS26 pet into brick art 18s (ad 120252787570340597, pet copy) |
| 68 | pinkdog_video | 1392502679188907 | 1 | $5.51 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 69 | Single_MothersDay | 787517514113898 | 1 | $4.92 | 0 | Skipped: same footage as Custom Yours Today (added) |
| 70 | New Sales -02 | 1555832326035407 | 1 | $4.51 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 71 | Video _Connie_family | 1244805113642624 | 1 | $3.61 | 0 | Skipped: same footage as connie and son (added) |
| 72 | XMAS: Grandparents | 1683825976757257 | 1 | $3.41 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 73 | PV: pinkdog_video | 1153176547033948 | 1 | $2.97 | 0 | Skipped: Page-post video, the connector does not hand it over |
| 74 | Single_MothersDay - Copy | 1714257606409094 | 1 | $2.28 | 0 | Skipped: same footage as Merriage_video (added) |
| 75 | Single_MothersDay | 26707127818950898 | 1 | $0.38 | 0 | Skipped: same footage as mom_video (added) |
| 76 | Single_BeachDog | 528393928708342 | 1 | $0.16 | 0 | Added: XMAS26 BeachDog (ad 120252787570900597, pet copy) |
| 77 | Single_Build And Hang Branding | 1660468171824122 | 1 | $0.07 | 0 | Skipped: same footage as mom_video (added) |
| 78 | Family_connie_video | 1391193839677761 | 1 | $0.07 | 0 | Added: XMAS26 Turn Photos into Bricks 41s (ad 120252787578200597, general copy) |
| 79 | PV: Photo to mosaic 1x1 | 1096534016427226 | 1 | $0.00 | 0 | Added: XMAS26 photo in bricks 34s (ad 120252787578640597, general copy) |

## Check before launch

- **Watch every preview before launch.** I can't watch the videos themselves, only their old copy. Things to look for:
  - Old copy that carried codes, so the video may show them on screen too:
    - connie_once_upon_a_time: EARLYHOLIDAY
    - aly and or: EXTRA10
    - JEW 30s: EARLYBIRDB20 / HOLIDAY20
  - Off-season themes: mom_video was a Mother's Day ad, and Memorial pet videos carry a grief theme.
  - "lego" words in on-screen text.
- **Merriage_video:** you paused it on Oct 22 after $160 with 0 purchases this fall, even though it was last year's top video by purchases. It is in, paused; delete it if you still don't want it.
- **Dog_ vid (264 purchases):** it shares its thumbnail file and length with dogbillo, so it was treated as the same footage as XMAS26 Dog. If they are different clips, tell me and I'll add it.
- **XMAS26 Couple and XMAS26 Dog**, made earlier today, have their UTMs inside the link, where Meta changed the placeholders into different characters. The new ads don't have this problem. Swapping those two for URL-parameter versions needs one small follow-up.
- Thumbnails are Meta's small video stills. Pick sharper frames in Ads Manager if any look soft.
- AI-content label: left unset. The Hugo Christmas videos (love story, pet, family) and "photo in bricks 34s" may be AI-made, so Eden decides.
- **34 ads on $40 a day is a lot for one ad set.** Meta will spread the learning thin. Before launch I'd suggest turning on only the 6 to 10 you like best and leaving the rest off.

## Not added (24 videos)

- 24 videos sit behind Page posts that the connector won't hand over, including pinkdog_video, POV reasons, MOTHER AND DAUGHTER #1, the Hugo grandparents video and the dynamic "New Sales" videos. They are listed as "Skipped" in the table.
- To add them: upload the original files, or note the video in Ads Manager.
- 2 more were skipped because of the expired code EXTRA10.
