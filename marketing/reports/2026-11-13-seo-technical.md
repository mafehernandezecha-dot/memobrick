# seo-technical 2026-11-13

## Summary
I re-checked the writer's 4 edited drafts. All flags are gone and they are back to `checked`. The bundle file has their new hashes, under the same item A-2026W46-016.
Product schema: Google most likely takes price and availability from the theme block and the stars from Vitals. Both blocks have price, availability, brand and image. Neither has a GTIN or MPN.
Weekly check: nothing new is broken. The biggest lever is still the 13 unpublished articles.

## Done
- **Approvals.** The checker printed A-2026W41-014 (GemPages article schema). It is not applied, because writes to the live theme are blocked by the Shopify connector. A live check of `blog-memorial` found it still has no BlogPosting. I did not retry.
- **Task board 1: done.** I re-checked the dad, memorial, portrait and baby drafts after the writer's commit 17d4629.
  - Build-time lines are gone from all four. The dad FAQ "How long does it take" is now "Does a frame come with it?", and its frame prices ($49.00, $65.00) match the live store.
  - The portrait title is now "Custom Brick Portrait From Your Photo", with the LEGO-Style title kept as Eden's option. I updated the Article JSON-LD headline in its check note to match.
  - The baby draft labels BRICKFRIDAY25 and CYBERBRICK20 as "scheduled".
  - All four pass these checks:
    - one H1
    - FAQPage parses and matches the visible FAQ word for word
    - all 41 unique links return 200
    - every kit price matches the live store
    - copy check passes
    - handles still return 404
  - I set each to `Status: checked`.
  - In `marketing/seo/technical/publish-bundle-2026-11-12.md` I updated the hashes for rows 3, 11, 12 and 13 (a98b16ef2b66, 8889a9df6ef4, 70a3870915d2, 9d093e6329c3) and row 3's title, and added a re-check section. The other 9 drafts are unchanged.
- **Flags gone, for the coordinator:** build times (dad, memorial, portrait, baby), "LEGO-Style" in the portrait title, and the baby codes not marked "scheduled". There are two optional wording notes and neither blocks the bundle:
  - The dad draft lists the same two codes without the word "scheduled". Its dates are correct.
  - The portrait FAQ question still says "LEGO-style", as part of the trademark disclaimer.
- **Task board 2: done, read-only, no proposal.**
  - Free listings come from the Merchant Center feed, not from page schema. Google uses the schema to check price and availability and for rich results.
  - Merchant listings read a single `Offer`, which is the theme block (price and InStock). The Vitals block is an AggregateOffer with stars, which fits product snippets.
  - Correction to yesterday: the Vitals block does have availability, in each variant Offer.
  - Both blocks lack GTIN and MPN. The fix is "identifier exists: no" in the Google & YouTube app or Merchant Center, and only the Merchant Center read already requested can confirm it.
  - Shipping and return fields are absent from both blocks. Merchant Center takes these from its own settings.
  - Details are in `marketing/seo/technical/product-feed-check-2026-11-12.md` (update section).
- **Weekly audit:** `marketing/seo/technical/audit-2026-11-13.md`. robots.txt, the sitemap (56 articles), canonicals and H1s are fine. The double SearchPie titles remain. The dog landing page has two H1s, which I added to `content-fixes.md`. `/pages/free-preview` is noindex, probably on purpose.
- **Search Console Chrome task:** Part B has never been run. Its 9 URLs all return 200, so it is still current. After the bundle is published, the next 10 URLs are listed in the bundle file.

## Proposed for approval
None (board rule 2). A-2026W46-016 keeps its ID. Coordinator: its draft file changed today, so the item's Commit line needs this run's commit, or the checker will report it as changed.

## Blocked or unknown
- Live theme writes are blocked, so A-2026W41-014 cannot be applied. Theme 189322330332 is an unpublished copy, and writes to it are allowed. If Eden says so, the same code can go into it before she publishes it. The item names the live theme, so I did not do this.
- There are no data snapshots, so pages cannot be ranked by impressions. Merchant Center and Search Console are already requested in `marketing/data/requests.md`, so I added no duplicate.

## Sales impact
The bundle can now be approved with one reply and no flags left. It covers 13 Christmas gift articles aimed at gift searches before the Dec 15 order-by date. It brings orders only after it is published and indexed. The weak point is the Google search loss. The schema read rules out the product pages as the cause of the free-listing drop, so the fix is in Merchant Center. The weekly audit itself brings no orders.

## Next run
Sat Nov 14: daily task. If the bundle is approved and published, verify all 13 URLs (200, canonical, schema, sitemap) and put the first 10 on the Search Console list.
