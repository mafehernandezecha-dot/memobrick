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

## Update 2026-11-13: which Product block Google can use (read-only)
Re-read the live HTML of 2-2-boards, 1-big-board, 3-2-boards and frame-2-2. Both blocks parse as valid JSON.

| Block | Offer type | price | availability | brand | image | rating | GTIN / MPN | shipping / returns |
|---|---|---|---|---|---|---|---|---|
| Vitals (app) | AggregateOffer with one Offer per variant | yes (lowPrice, highPrice, and per variant) | **yes, per variant (InStock)** | Memobrick | 12 images | yes (4.9 / 202 on 20x20) | no | no |
| Theme | single Offer | yes (lowest variant, for example 99.88) | yes (InStock) | Memobrick | 1 image | no | no | no |

- Correction to gap 2 above: the Vitals block does carry availability, inside each variant Offer. It is not missing.
- Free listings are filled from the Merchant Center feed that the Google & YouTube app sends from Shopify product data, not from the page schema. Google uses page schema to check and auto-update price and availability, and for rich results.
- For merchant listing rich results, Google reads a single `Offer` with price. That is the theme block. The Vitals AggregateOffer fits product snippets (the review stars). So today Google most likely takes price and availability from the theme block and the stars from the Vitals block. Prices in both match the live store.
- Missing for Merchant Center: GTIN and MPN in both blocks, and in the feed unless the Google & YouTube app marks the kits "no identifier". Custom kits have no GTIN, so the fix is the "identifier exists: no" setting, which only the Merchant Center read can confirm (requested 2026-11-11 and 2026-11-12 in `marketing/data/requests.md`). Optional fields `shippingDetails` and `hasMerchantReturnPolicy` are absent from both blocks; Merchant Center takes these from its own account settings.
- Nothing on the page explains the 90% free-listing drop. No proposal today (board row).
