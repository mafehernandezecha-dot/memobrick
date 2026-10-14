# Meta: 4 Christmas gift ads for our buyer, created PAUSED

- Type: ad-change (create 4 new ads, PAUSED; launching is a separate approval)
- Executor: ads-analyst (Facebook connector, free)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB, Sales, Purchases, Proven Videos, Oct26 (120252562193330597)
- Ad set: US, Broad 25+, Purchase, Excl Customers (120252562197040597), Advantage+ audience on, Advantage+ placements
- Current value: no ad in the account mentions Christmas, the Dec 15 order-by date, EARLYHOLIDAY20 or FOX
- New value: 4 new ads, status PAUSED, no budget change
- Expires: 2026-10-21

## Why these ads

Mario's buyer profile (`marketing/outreach/gift-guide-pr/buyer-profile.md`): a US woman 35 to 64 buying a personalized photo gift for her partner, kids, parents or pet; Christmas is 44% of the year's orders. The ads running now are evergreen ("the best gifts aren't things...") and none speak to Christmas, the order-by date, or the live code.

Each ad reuses a video that already sold for us, so there is nothing new to upload and no new footage rights to check:

| Ad | Video (already in the ad account) | Last holiday or recent evidence |
|---|---|---|
| X1 Family Christmas | 2786059298433030 ("bonding experience", family building together) | Family theme: best ad of the last 28 days was the family post (8 Meta purchases) |
| X2 Partner | 1954866981751623 (Merriage_video) | Nov 1 to Dec 15 2025: 128 Meta purchases, $29.49 each, Meta ROAS 3.63 |
| X3 Pet | 2447135395648728 (Dog_vid) | Last 28 days: 2 purchases at $25.45, Meta ROAS 3.70; pet ads last holiday ROAS 4.1 to 5.3 |
| X4 Grandparents and mom | 2786059298433030 (same family video, different text) | Buyers 45 to 64 likely buy for parents and grandchildren (buyer profile); MOMINBRICKS 32 orders |

Landing page for all four: the gift collection, which converted search visitors at 6.3% last holiday and was the top social landing page last holiday (3,879 social sessions, 8.9% add to cart):
`https://mymemobrick.com/collections/the-gift-for-everyone?utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}`

Call to action button: Shop now. Placements: Advantage+ (automatic). Formats: the connector uses each video as uploaded; I will ask Hugo (social) for a 4:5 and a 9:16 cut of X1 and X3 before the launch item, because Facebook Feed brought 47 of the last 90 days' 77 Meta purchases (Meta ROAS 1.52) while Reels and Stories converted worse (0.49 to 0.68).

## Ad copy (offers and facts checked: EARLYHOLIDAY20 active since 2026-10-12; "Order by Dec 15" and "As seen on FOX" are in the offers-calendar Facts table)

### X1 Family Christmas

Primary text:

This Christmas, give your family a photo they can build together.

Upload your favorite family picture, see it as a custom brick mosaic right away, and choose your kit size. Then build it side by side and hang it on the wall.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your family photo, in bricks

Description: As seen on FOX

### X2 Partner

Primary text:

A Christmas gift for your partner, made from your favorite photo of the two of you.

Upload it, see it in bricks, and build your custom brick mosaic together, one 1×1 brick at a time.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your love story, brick by brick

Description: As seen on FOX

### X3 Pet

Primary text:

Their best friend, turned into a custom brick mosaic.

Upload a favorite photo of the dog or cat, see it in bricks, and give a gift the whole family builds and keeps on the wall.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: Your pet's photo, in bricks

Description: A personalized photo gift

### X4 Grandparents and mom

Primary text:

Looking for a gift for mom or the grandparents this Christmas?

Turn a family photo into a DIY brick mosaic kit they can build with the grandkids. Prefer help with the design? Our designers can send you a free proof first.

Order by Dec 15 for Christmas. 20% off with code EARLYHOLIDAY20.

Headline: A family photo they will keep

Description: As seen on FOX

No ratings, reviews, customer names or quotes. No "LEGO". The free proof is offered as optional, as `product-facts.md` allows.

## Exact steps once approved

1. `ads_create_creative` four times (page 105916444396794 and the Instagram account the ad set already uses), video IDs above, texts above, CTA SHOP_NOW, link above.
2. `ads_create_ad` four times in ad set 120252562197040597, status PAUSED, names "XMAS, Family", "XMAS, Partner", "XMAS, Pet", "XMAS, Grandparents".
3. Read back with `ads_get_ad_entities` and `ads_get_ad_preview`, and put the preview links in my report.

## Expected effect on orders

None while paused. Once launched (target Oct 20, inside the same $60/day): if they reach last holiday's $30 per Meta purchase, about 2 Meta purchases a day, which has meant roughly 1 Shopify-tracked order a day. That is the single biggest lever to bring Facebook and Instagram visits back up without more spend.

## Risk

Low while paused. If Eden sets an end date for EARLYHOLIDAY20 before Dec 15, all four texts must be changed that day (ads are immutable; I would replace them). The code end date is still unconfirmed in `offers-calendar.md`.

## How I will judge it 7 days after launch

Link CTR at or above the ad set's 1.6%, landing page views at least 80% of link clicks, cost per Meta purchase under $40, and at least 3 Shopify orders with utm_campaign 120252562193330597 in the week. Losers (no purchase after $60 each) get paused.
