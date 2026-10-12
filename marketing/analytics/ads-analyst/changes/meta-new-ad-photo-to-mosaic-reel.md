# Meta: new ad from the planner's photo-to-mosaic reel, created paused

- Type: ad-change (create new ad, PAUSED; launching is a separate approval)
- Executor: ads-analyst
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB | Sales | Purchases | Proven Videos | Oct26 (120252562193330597)
- Ad set: US | Broad 25+ | Purchase | Excl Customers (120252562197040597)
- Current value: 5 ads in this ad set, no photo-to-mosaic transformation ad
- New value: 1 new ad, status PAUSED
- Expires: 2026-10-17

## Why this ad

The social planner chose a transformation reel (original photo, mosaic preview on the website, finished piece) as this week's lead post, S-20261012-1 (`marketing/social/planner/2026-W42/S-20261012-1.md`). It has no organic results yet (first post goes live Oct 12), so this ad is a test, not a proven winner. In the same ad set, the only ad with a Shopify-relevant purchase so far is a pet video ("PV | Dog_vid", $26.73 per Meta purchase, 1 purchase: too early). A transformation clip shows the one thing ads never show: the customer's own photo becoming the mosaic in the editor. That speaks to the weak point "Visitors stopped adding to cart" by sending people straight into the editor.

## Asset

- Video: MEMOBRICK_video_original_463980.mp4, Drive https://drive.google.com/file/d/1vDHNcus5_oQl0s6de-ZrbJ-EPpYCLfeZ/view (folder "Memobrick videos", cleared "ok" in `marketing/social/footage-rights.md`). The same file already runs in Google PMax as YouTube video 7_kR3ntRvkI.
- Format: 9:16 for Reels and Stories, captions burned in for silent viewing.
- Before creating the ad I will watch the file and confirm it shows a photo becoming a mosaic and that no face or name appears without permission. If it does not, I stop and report.

## Ad text

Primary text:

One favorite photo. A custom brick mosaic you build yourself.

Upload your photo on our website, see it as a mosaic right away, and pick the kit you want to build and display.

Headline: Your photo, in bricks

Description: 40+ colors. Order by Dec 15 for Christmas.

Call to action button: Shop now

Destination URL: https://mymemobrick.com/pages/editor?utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}

No discount code. No ratings, reviews or customer names. Copy follows the planner's approved caption and `product-facts.md`; the Dec 15 date is in the Facts table.

## Exact steps once approved

1. Upload the video with `ads_creative_upload_media`.
2. Create the creative with `ads_create_creative` (page and Instagram account already used by the ad set's other ads).
3. Create the ad with `ads_create_ad` in ad set 120252562197040597, status PAUSED.
4. Read back with `ads_get_ad_entities` and `ads_get_ad_preview`, and attach the preview in my report.

## Expected effect on orders

None until launched. If launched at the ad set's current $40/day (no budget increase), I expect it to take a share of spend from the weakest videos; the bar is a Shopify order every $110 or less of spend.

## Risk

Low while paused. The editor page as the landing page is untested in ads; if the editor is slow on mobile, add-to-cart could suffer. I will check landing page views against link clicks after launch.

## How I will judge it 7 days after launch

Link CTR at or above the ad set's 1.9%, landing page views at least 70% of link clicks, and at least 1 Shopify order with utm_campaign 120252562193330597 attributed in the period.
