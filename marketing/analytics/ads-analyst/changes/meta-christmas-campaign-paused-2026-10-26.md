# Meta: build a Christmas campaign from last holiday's best videos, created PAUSED

- Type: ad-change
- Executor: ads-analyst (through the Facebook connector, once it is re-authorized)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- This item creates the campaign **PAUSED**. Launching it is a separate approval item, proposed once Eden has seen the previews.
- Expires: 2026-11-06

## Exact change

New campaign "MB | Sales | Christmas 2026 | Last year winners", objective Sales, optimize for Purchase, status PAUSED.

| Setting | Value |
|---|---|
| Daily budget | $40 (campaign budget). Funded from the $60 a day freed by `meta-pause-proven-videos-2026-10-26.md`; if both are later live, total Meta spend is $60 a day (PROMO -v1 $20 + this $40), $20 less than the last known $80. |
| Audience | United States, ages 25+, Advantage+ audience on, excluding past purchasers (the customer list and 730-day purchasers already used by Proven Videos) |
| Placements | Facebook Feed and Facebook Reels only. 90 days of Meta data: Facebook Feed 47 purchases for $3,161; all Instagram placements 17 for $2,036; Shopify agrees (Instagram 242 visits, 2 orders in 30 days). |
| Attribution | 7-day click only (no 1-day view), so Meta's count sits closer to Shopify's |
| URL parameters | `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}` |
| Landing page | the Final URL the ALWAYON PROMO -v1 ads use now (read it first: that campaign is the only Meta campaign with steady Shopify orders) |
| Identity | Facebook Page plus the Instagram profile "memobrick" Eden set on Oct 22 |

Ads (one each, video re-used from the 2025 "oct_29" campaign 120236099101980597; only the text below is new):

| Ad | Video from 2025 | Last holiday on Meta (Nov 1 to Dec 15, 2025) |
|---|---|---|
| XMAS26 Couple | couple_video | $1,201, 28 purchases, Meta ROAS 2.57 |
| XMAS26 Cat | cat - Copy | $1,120, 37 purchases, Meta ROAS 2.83 |
| XMAS26 Dog | dogbillo_video | $645, 24 purchases, Meta ROAS 4.12 |

Not used: Merriage_video (Eden paused it on Oct 22 after $160 and 0 purchases this fall), pinkdog_video (carries #lego hashtags), any creative with EARLYBIRD20 or EXTRA10.

Text (all three ads):
- Primary text, couple: "Turn your favorite photo of the two of you into a custom brick mosaic you build together. Upload your photo, see it as a mosaic, and pick a size. Order by December 15 to receive it before Christmas."
- Primary text, cat and dog: "Your pet, in 1×1 bricks. Upload a favorite photo, see it as a mosaic, and build a personalized photo gift for Christmas. Order by December 15 to receive it before Christmas."
- Headline: "A personalized photo gift"
- Description: "As seen on FOX"
- Button: Shop now

No discount code (EARLYHOLIDAY20 has no end date yet) and nothing about free shipping. Copy uses only the Christmas order-by date and the FOX claim from the Facts table.

## Why

- The current Meta setup does not sell on Shopify (Proven Videos about 0.11, PROMO -v1 about 0.87 over the last two weeks, on last known budgets). Last holiday, the oct_29 campaign with these videos returned Meta ROAS 3.49 on $6,027 and 196 Meta purchases, and facebook/paid brought 169 Shopify orders in Q4 2025.
- Store orders doubled in the week of Nov 10 last year and Google search orders in the week of Nov 17; a paused campaign ready now can be launched for that week without a rushed build.

## Expected effect on orders

None until launched. If launched around Nov 9 at $40 a day and it reaches even half of last holiday's rate (one Meta purchase per $60 instead of last year's $30), that is about 5 Meta purchases a week (9 at last year's rate); the launch item will be judged on Shopify-tagged orders, not Meta's count, with a stop rule: pause if Shopify-tagged ROAS is under 3.0 after $300 of spend (Eden's 3.0 rule).

## Risk

- Old videos may have lost their spark; that is why it starts paused and launches as a test.
- Meta may still review paused ads; nothing spends while paused.

## How I will judge it

Before launch: Eden sees the three previews. After launch (separate item): Shopify orders by utm_campaign after every $300 of spend.
