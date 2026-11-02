# Meta: replace Dog v4 (dog page) with Dog v5 that lands on the editor

- Type: ad-change
- Executor: ads-analyst (Facebook connector)
- Platform: Meta, campaign 120252787078920597, ad set 120252787082260597
- Expires: 2026-11-07
- Status: proposal

## Evidence (Meta 7 days, Shopify UTM orders)
- Dog v4 sent to /pages/dog-brick-mosaic: $137.39 (38% of the campaign's $358.69), 55 landing views, 0 add to cart. The growth analyst's site data shows 62 referred sessions on that page Oct 28 to Nov 1 and 0 carts. One Shopify order has Dog v4 as first touch (#21125, $79.91), but it was finished through a Google PMax click, so the page did not close it.
- Best-converting landing pages Oct 19 to Nov 1 (all sessions): /pages/editor 113 sessions, 12 carts (10.6%), 5 checkouts completed; /collections/the-gift-for-everyone 363 sessions, 18 carts (5.0%), 7 completed. Dog v2 on the gift collection: 52 landing views, 2 add to cart (3.8%).
- Christmas campaign Shopify ROAS about 0.55 on 2 tagged orders. Under the standing rule this is below 2.0, but the campaign is 7 days old, so I change the worst leak, not the whole campaign.

## Exact change
1. Create "XMAS26 Dog v5 (editor)" in ad set 120252787082260597: same video, text and headline as Dog v4. Link `https://mymemobrick.com/pages/editor` with url_tags `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`. Created paused.
2. Pause Dog v4 (120252819439800597). Then switch Dog v5 on. Log both in the changes file.
3. Fallback if Eden prefers a gift page: /collections/the-gift-for-everyone instead of the editor.
- This is an exception to the rotation rule "keep an ad that brought a Shopify order", because that order closed through Google and the page shows 0 carts. Eden's approval covers the exception.
- No budget change. Total daily spend does not change.

## Expected effect
Same spend (about $50 a day of the campaign) lands on a page with a 10% cart rate instead of 0%. If it only matches the site average of 6%, that is about 2 to 3 more carts a day from this ad; at 40% checkout completion, one order every 1 to 2 days.

## Risk
Low. Cold traffic on the editor may bounce more than warm site traffic (the editor numbers include direct and returning visitors). The dog-specific message is lost. If v5 has under 1 add to cart per 20 landing views after $40, rotate it out.

## How I judge it in 7 days (Nov 9)
Add to cart per landing view above 5% and Shopify orders with utm_content equal to Dog v5's ad ID. Otherwise pause it.
