# Product feed check for Google free listings, 2026-11-12

Read-only. Top 5 products by orders, last 60 days (Shopify analytics). Channel status from Shopify Admin (`publishedOnPublication`, Google & YouTube = Publication 66595192986). Schema from the live product page HTML (fetched 2026-11-12, reachable).

| # | Product (orders, 60 days) | Live URL | On Google & YouTube channel | Product schema: price | availability | brand | image | Gap |
|---|---|---|---|---|---|---|---|---|
| 1 | 20x20 kit (40) | /products/2-2-boards | Yes | 99.88 USD | InStock (theme block only) | Memobrick | Yes | Two Product blocks (see below) |
| 2 | 16x16 kit (22) | /products/1-big-board | Yes | 69.88 USD | InStock (theme block only) | Memobrick | Yes | Two Product blocks |
| 3 | 30x20 kit (11) | /products/3-2-boards | Yes | 149.00 USD | InStock (theme block only) | Memobrick | Yes | Two Product blocks |
| 4 | 20x30 kit (10) | /products/2-3-boards | Yes | 149.00 USD | InStock (theme block only) | Memobrick | Yes | Two Product blocks |
| 5 | Black Frame 20x20 (10) | /products/frame-2-2 | **No** | 65.00 USD | InStock (theme block only) | Memobrick | Yes | **Not published to Google & YouTube**, plus two Product blocks |

## Gaps

1. **Frames missing from Google & YouTube.** Not published to the channel: `frame-2-2` (20x20 frame, a top-5 seller), `frame-2-3-3-2` (20x30/30x20 frame, matches kits 3 and 4), `frame-4x5-5x4`, two gift cards (`photobrickusa-gift-card`, `memo-brick-gift-ard`), `heatblast-ben-10-...` and `fire-skull-...` (200 of the active products scanned; Shopify counts 273 of 281 on the channel, so at most one more is missing). Fix: Shopify admin > Products > each frame > Publishing > add Google & YouTube. A Shopify setting, so it needs an approved item; not proposed today (board rule: no new proposals beyond the bundle). Sales effect: small, frames are add-ons, but they can show for "lego mosaic frame" searches.
2. **Two Product entities on every product page.** The Vitals app adds one Product block (per-product rating, for example 4.9 from 202 on the 20x20, but no `availability`), and the theme adds a second (price and `InStock`, no rating). Google may read them as two products and pick the one without availability for merchant listings. Better: one Product block with both rating and availability (switch off Vitals' rich snippet, or add availability to it). Needs a site-change; written up next run if the owner wants it.
3. **No GTIN or MPN.** Custom kits have none. In the Google & YouTube app, products should be set "no GTIN / identifier does not exist" so Merchant Center does not limit them. Cannot see this from Shopify Admin; needs the Merchant Center read already requested by ads-analyst on 2026-11-11 in `marketing/data/requests.md`.
4. **All kits share SKU 14646.** Not a Merchant Center error by itself (Shopify sends its own item IDs), but it is a weak signal and confuses reports. Note only.

## Good news
- The hardcoded 4.8 / 747 rating (item A-2026W41-012) is no longer in the theme's Product block on the live pages; the only rating is the Vitals per-product one. Nothing left to apply for that item.
- Every top kit has price, currency, brand, image and canonical. Each page still has two `<title>` and two meta descriptions (SearchPie, P-seo-technical-20261111-2).

## Why free listings fell (347 to 36 sessions)
Not explained by channel status: all four top kits are on the channel. The cause is most likely in Merchant Center (disapproved or limited items, or a feed or policy issue). The Merchant Center read (ads-analyst, 2026-11-11) is the next step.
