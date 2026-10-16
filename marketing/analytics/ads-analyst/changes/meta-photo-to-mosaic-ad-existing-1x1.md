# Meta: photo-to-mosaic ad from the 1:1 video already in the account, created paused

- Type: ad-change (create new ad, PAUSED; launching is a separate approval)
- Executor: ads-analyst
- Replaces: A-2026W42-006 (could not be done as written, see below)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB | Sales | Purchases | Proven Videos | Oct26 (120252562193330597)
- Ad set: US | Broad 25+ | Purchase | Excl Customers (120252562197040597)
- Current value: no photo-to-mosaic transformation ad
- New value: 1 new ad, status PAUSED, using video 1671409811248661 ("cropped_1X1 ... MEMOBRICK_video_original_463980.mp4", already uploaded in the account), a 1:1 crop of the same file the planner chose
- Expires: 2026-10-21

## Why this replaces A-2026W42-006
The approved item uses the 9:16 original from Google Drive (23 MB). The Facebook connector can upload only from a public URL or an interactive file picker, neither available to a scheduled run, and the Drive link needs sign-in. I also cannot watch the video to check the "no face or name without permission" step. The account already holds a 1:1 crop of the same file, so no upload is needed. Cost of 1:1: it fills less of the screen in Reels and Stories.

## Ad text, destination, steps, judgement
Same as `meta-new-ad-photo-to-mosaic-reel.md` (primary text, headline "Your photo, in bricks", description, Shop now, editor URL with utm_source=facebook&utm_medium=paid, no discount code). Steps: ads_create_creative with video_id 1671409811248661 plus thumbnail, ads_create_ad PAUSED, read back and preview. Before creating, the owner confirms the 1:1 video shows no face or name without permission (footage-rights.md lists the original as "ok").

## Expected effect and risk
No effect while paused. Risk low. Judge 7 days after any launch: link CTR at or above 1.9%, landing views at least 70% of link clicks, at least 1 Shopify order with the campaign UTM.
