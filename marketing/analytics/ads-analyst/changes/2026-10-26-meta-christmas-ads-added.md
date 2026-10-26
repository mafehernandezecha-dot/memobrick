# Meta Christmas campaign: ads added (A-2026W44-005, follow-up)

- Follows `2026-10-26-meta-christmas-created.md` (campaign 120252787078920597, ad set 120252787082260597, both PAUSED).
- Eden's reply, passed on by the coordinator: "i think we need to put all the videos", so the cat ad uses the missmelody_cat_video video (option b), not the image, and never CYBER20.
- Landing page: Eden did not choose one. I used the coordinator's pick, https://mymemobrick.com/collections/the-gift-for-everyone, the best-converting gift page. **This can be changed before launch.** I could not read the PROMO -v1 link the draft named (see the earlier record).
- Everything is PAUSED. `ads_activate_entity` was not called. Launching is a separate approval.

## Ads added (read back)

| Ad | Ad ID | Creative ID | Video | Status (read back) |
|---|---|---|---|---|
| XMAS26 Couple | 120252787178270597 | 1463079679094304 | couple_video (source 1201815125329540; Meta saved it as a copy, video 1061990386800777, 40 s, ready) | PAUSED (effective IN_PROCESS: new ad in review, inside a paused campaign) |
| XMAS26 Dog | 120252787181160597 | 4634469320132164 | dogbillo_video 1315527356942680 (29.8 s) | PAUSED (effective IN_PROCESS) |
| XMAS26 Cat | not created | | | see "Not done" |

The two ads share these settings (read back from the creatives):
- Page: Memobrick (105916444396794). Placements are Facebook only, so no Instagram identity was set.
- Primary text:
  - Couple: "Turn your favorite photo of the two of you into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. Order by December 15 to receive it before Christmas."
  - Dog: "Your pet, in 1×1 bricks. Upload a favorite photo, see it as a mosaic, and build a personalized photo gift for Christmas. Order by December 15 to receive it before Christmas."
- Headline "A personalized photo gift". Description "As seen on FOX" (claim supported in `offers-calendar.md`; Meta notes that Facebook Feed does not show the description on video ads). Button Shop now.
- No code, nothing about free shipping, no urgency beyond the real December 15 order-by date.
- Link (as entered): `https://mymemobrick.com/collections/the-gift-for-everyone?utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`

Campaign errors check: none.

## Check before launch

- **UTM placeholders.** On the Dog creative, Meta stored the link with the braces encoded (`%7B%7Bcampaign.id%7D%7D`). The Couple creative was still processing and did not return its link yet. Before launch, open each ad in Ads Manager and check that the Website URL keeps the page and that the tracking fields fill in. If they don't, move the part after `?` into the ad's "URL parameters" field. Without this check, Shopify may show the literal text instead of the IDs.
- Thumbnails came from Meta's small video thumbnails. If they look soft in the preview, choose a frame in Ads Manager.
- The AI-content disclosure was left unset; whether to declare it is Eden's call. These are real 2025 videos.

## Not done

- **XMAS26 Cat.** The missmelody_cat_video ad (120236100280490597, creative 820059717076640) is built from a Page post (105916444396794_408944347427334). The connector gives no video ID for it: the creative shows none, the post ID does not resolve as a video, and no video in the account's library is named for it. I could not find the video to attach new text to. Running the old post as it is would bring back its "lego-style art" text, which breaks the brand rules, so I did not do it. To finish: Eden (or the Chrome routine) opens that ad in Ads Manager and notes the video, or uploads the original file. I then add XMAS26 Cat, PAUSED, with the draft's pet text.
