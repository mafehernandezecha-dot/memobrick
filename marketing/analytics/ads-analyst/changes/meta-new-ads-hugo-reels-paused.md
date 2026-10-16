# Meta: 3 new ads from Hugo's 4:5 reels, created PAUSED

- Type: ad-change (create 3 creatives and 3 ads, PAUSED; launching is a separate approval)
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB | Sales | Purchases | Proven Videos | Oct26 (120252562193330597)
- Ad set: the new "XMAS, FB only, min $15" ad set if meta-xmas-adset-min-spend.md is approved, otherwise US | Broad 25+ | Purchase | Excl Customers (120252562197040597)
- Current value: no ad uses the new W43 and W44 reels
- New value: 3 ads, status PAUSED, no budget change
- Expires: 2026-10-21

## The videos (already in the ad account's media library, uploaded 2026-10-16, status ready)

| Ad | Video ID | Repo file | Source post | Who appears | AI label |
|---|---|---|---|---|---|
| N1 Family | 1106937725422025 | marketing/analytics/ads-analyst/meta-uploads/MB-ad-family-photo-to-bricks-4x5.mp4 (14 s) | S-20261019-1 4:5 cut, with the 3-second shot of the finished woman-and-cat portrait (10.5 to 13.5 s) cut out | AI mother and daughter photo and mosaic; real hands only | Yes (AI photo) |
| N2 Pet | 962046793130383 | marketing/analytics/ads-analyst/meta-uploads/MB-ad-cat-guess-4x5.mp4 (18 s) | S-20261030-1, 9:16 placed on a blurred 4:5 background | AI cat photo and mosaic; real hands only | Yes (AI cat) |
| N3 Couple | 2298349531017066 | marketing/analytics/ads-analyst/meta-uploads/MB-ad-couple-code-4x5.mp4 (19 s) | S-20261026-1, 9:16 placed on a blurred 4:5 background; end card shows "20% off with code EARLYHOLIDAY20" and "Order by December 15" | AI couple photo and mosaic; real hands, kit box | Yes (AI couple) |

Rights: all real footage is from "footage memobrick 5", marked ok in `marketing/social/footage-rights.md`. I checked frames of every cut: none shows the woman from the cat portrait. Not used, because her face is visible and her consent is unconfirmed: S-20261023-1 (whole video), S-20261028-1 (reveal, 10 to 17 s) and the uncut S-20261019-1 (10.5 to 13.5 s).

Note: the N1 end card says "DM it to us. It could be in our next video." and the N2 end card says "Send us your photo"; the ad text carries the shopping call to action.

## Ad text (offers and facts from offers-calendar.md: EARLYHOLIDAY20 active, Dec 15 order-by date, "As seen on FOX", free design proof on request)

### N1 Family

Primary text:

Your favorite family photo, turned into a custom brick mosaic you build together.

Upload it on our website and see your mosaic right away. Prefer help? Our designers can send you a free proof first. As seen on FOX.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your family photo, in bricks

### N2 Pet

Primary text:

Could you guess it before the zoom out? A cat, made of tiny 1×1 bricks.

Turn your own dog or cat into a custom brick mosaic. Upload a favorite photo, see it in bricks, and build it at home.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your pet's photo, in bricks

### N3 Couple

Primary text:

A Christmas gift for the two of you, made from your favorite photo together.

Upload it, see it as a custom brick mosaic, then build it side by side, one 1×1 brick at a time. As seen on FOX.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your photo, built by hand

All three: call to action Shop now; no description line (Facebook Feed does not show it on video ads); no ratings, reviews, customer names or quotes; the AI people and pets are never called customers.

Landing page (the gift collection, best converting page last holiday):
`https://mymemobrick.com/collections/the-gift-for-everyone?utm_source=facebook&utm_medium=paid&utm_campaign=120252562193330597&utm_content=<n1-family | n2-pet | n3-couple>`

Thumbnails: `marketing/analytics/ads-analyst/meta-uploads/<file>-thumb.jpg` (first second of each cut), passed by their public raw GitHub URL.

AI disclosure: `self_ai_disclosure` OPT_IN on all three (the brand rules require the AI label for AI images). Approving this item approves that setting.

## Exact steps once approved

1. `ads_create_creative` x3 (page 105916444396794, video IDs above, texts above, CTA SHOP_NOW, link above, self_ai_disclosure OPT_IN).
2. `ads_create_ad` x3 in the ad set named above, status PAUSED, names "NEW, Family 4x5", "NEW, Pet cat 4x5", "NEW, Couple code 4x5".
3. Read back with `ads_get_ad_entities` and `ads_get_ad_preview`; preview links in my report. Nothing is published live.

## Expected effect on orders

None while paused. Once launched inside the $15 Christmas ad set: these are the first ads in the account that show the photo turning into bricks plus the code and date in one video. Bar: a Shopify order for every $40 or less of spend, from the gift collection page that converted at 6.3% last holiday.

## Risk

Low while paused. If Eden sets an end date for EARLYHOLIDAY20 before Dec 15, the texts must be replaced (creatives cannot be edited).

## How I will judge it 7 days after launch

Link CTR at least 1.6%, landing page views at least 85% of link clicks, cost per add to cart under $25, and at least 1 Shopify order with utm_content n1-family, n2-pet or n3-couple. Any ad with $30 spent and no add to cart gets a pause proposal.
