# Meta Christmas ad set: repeat check (A-2026W44-005, follow-up)

- Eden: "make sure any video is repeating", meaning no video should repeat in the Christmas ad set 120252787082260597.
- **Result:**
  - 5 repeat ads were deleted. Each was a paused, never-launched ad I created today.
  - **29 ads remain:** 28 videos plus the XMAS26 Gift Pictures carousel. All are PAUSED.
  - Nothing was activated.
  - ALWAYON PROMO -v1 (ACTIVE, $20 a day) and Proven Videos (PAUSED, $60 a day) were not touched.
- Review: https://www.facebook.com/adsmanager/manage/ads?act=1493067227536648&selected_campaign_ids=120252787078920597

## What could and could not be compared

- **Pixel comparison was not possible.**
  - The session's network policy blocks Meta's image and video host (scontent-*.fbcdn.net returns 403 at the proxy).
  - The connector returns no source file for these videos (`download_hd_url` is null for all).
  - So no thumbnails could be downloaded for perceptual hashing, and no frames could be pulled with ffmpeg.
  - The connector also offers no multi-frame thumbnails. It returns one `picture` URL per video.
- **What I used instead**, for every video in the set and for Dog_ vid:
  - **Length to the millisecond.** When a creative is built, Meta makes a new copy of the video with a new ID and the identical length; this happened today, e.g. couple_video became 1061990386800777 at 40 s. So an exact match to 3 decimals is strong evidence of the same file.
  - **The thumbnail's file name.** A shared file name means the exact same image file.
  - **Upload date, title and description.**
  - **Our own records:** `meta-christmas-family-ads-paused.md` says which source video each Christmas ad from Oct 21 was built from.

## Repeats removed (ad set to DELETED)

| Kept | Deleted (ad ID) | Evidence |
|---|---|---|
| XMAS26 Merriage_video (1954866981751623, 18.433 s, 179 Meta purchases) | XMAS26 love story brick by brick (120252787531650597; video 2452200455306458, 18.433 s) | Identical length. Our Oct 21 record says the XMAS Partner ad was built from Merriage_video, and 2452200455306458 is the copy Meta made then. Sure. |
| XMAS26 Dog (dogbillo 1315527356942680, 29.8 s) | XMAS26 pet photo in bricks (120252787553840597; video 1129577313060791, 29.8 s) | The Oct 21 record says XMAS Pet was built from Dog_ vid (2447135395648728). Dog_ vid and dogbillo share the same thumbnail file and the same 29.8 s length. Sure. |
| XMAS26 mom_video (2129801400784100, 38.314 s, 95 purchases) | XMAS26 Video _family (120252787466510597; 1201610298654914, 38.314 s) | Identical length to the millisecond; uploaded on Oct 14 2025 in the batch of copies made for the oct_29 campaign. Fairly sure. |
| XMAS26 mom_video | XMAS26 anniversary build (120252787554050597; 1697494424894728, 38.314 s) | Identical length to the millisecond; a 2026 re-upload. Fairly sure. |
| XMAS26 couple_vid (886528919916887, 30.413 s, 158 purchases) | XMAS26 JEW 30s (120252787556570597; 1525680145816834, 30.413 s) | Identical length to the millisecond; a 2026 re-upload whose old copy carried EARLYBIRDB20 / HOLIDAY20. Fairly sure. |

**Dog_ vid vs dogbillo_video:** same thumbnail file and same length (29.8 s), so they are the same footage. It was **not added**. XMAS26 Dog stays as the one copy. The connector doesn't report aspect ratio, so I couldn't pick on format. If Hugo has a 4:5 or 9:16 cut, uploading it would be the better version for Feed and Reels.

## Kept, but close in length (under 0.5 s apart, different titles and thumbnails)

These are probably different clips, but I could not confirm it without seeing them. Please glance at the previews:

| Video | Length | Other video | Length |
|---|---|---|---|
| family photo in bricks (1623249245919809) | 30.4 s | couple_vid | 30.413 s |
| connie_dog | 30.066 s | connie and son | 30.133 s |
| pet into brick art 40s | 39.936 s | Custom Yours Today | 39.85 s |
| pet into brick art 40s | 39.936 s | Couple | 40.0 s |
| favorite photo brick art 24s | 24.052 s | unique gift 24s | 23.74 s |
| gen_vid | 31.133 s | aly and or | 31.566 s |
| missmelody couple | 21.833 s | aleja video | 22.2 s |

- family photo in bricks was built from the "bonding experience" family video (2786059298433030), per the Oct 21 record, so it is a different source from couple_vid.
- Many of these clips were cut at about 30 s or 40 s, so close lengths alone mean little.

## Remaining 29 ads (all PAUSED)

- Couple
- Dog
- Merriage_video
- couple_vid
- connie_once_upon_a_time
- gen_vid
- mom_video
- aly and or
- missmelody couple
- jew_couple_video
- connie and son
- aleja video
- pet lover 60s
- unique gift 24s
- alejandra video
- connie_dog
- Impressive Gift Ideas
- custom pet mosaic 13s
- Turn Any Photo Into Bricks
- Custom Yours Today
- cozy night in
- family photo in bricks
- pet into brick art 40s
- favorite photo brick art 24s
- pet into brick art 18s
- BeachDog
- Turn Photos into Bricks 41s
- photo in bricks 34s
- Gift Pictures (carousel)
