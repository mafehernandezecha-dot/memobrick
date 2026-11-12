# Article publish bundle, 2026-11-12

One approval publishes all 13 checked article drafts below on the Shopify blog "news". Executor: seo-blog-writer.

Every draft was checked by seo-technical (check notes in `marketing/seo/technical/checks/<slug>.md`). Every target URL returned 404 on 2026-11-12 (not yet published). All internal links in these drafts returned 200 on 2026-11-12, except `best-photo-for-a-brick-mosaic`, which is itself in this bundle (publish it before `photo-to-brick-mosaic-maker`).

Hash is `git hash-object <draft>` (first 12 characters) on 2026-11-12. If a draft no longer matches its hash, publish the others and leave that one for a fresh check.

| # | Draft | Hash | Handle | Title | Covers queue item |
|---|---|---|---|---|---|
| 1 | marketing/seo/writer/drafts/best-photo-for-a-brick-mosaic.md | 8efd8db7f2ab | best-photo-for-a-brick-mosaic | Best Photo for a Brick Mosaic: 7 Simple Tips | A-2026W44-056 (lapses Nov 12) |
| 2 | marketing/seo/writer/drafts/photo-to-brick-mosaic-maker.md | a58bcd1ae4ff | photo-to-brick-mosaic-maker | Photo to Brick Mosaic Maker: Upload, Preview, Build | A-2026W45-021 |
| 3 | marketing/seo/writer/drafts/custom-brick-portrait-from-photo.md | e5119d1848b0 | custom-brick-portrait-from-photo | Custom LEGO-Style Portrait From Your Photo | new (checked today) |
| 4 | marketing/seo/writer/drafts/black-friday-personalized-photo-gifts.md | 86b46fe32ee2 | personalized-gifts-black-friday | Personalized Black Friday Gifts Made From a Photo | A-2026W45-023 |
| 5 | marketing/seo/writer/drafts/personalized-stocking-stuffers.md | 55bcb07cd212 | personalized-stocking-stuffers | Personalized Stocking Stuffers Made From a Photo | A-2026W44-055 (lapses Nov 12) |
| 6 | marketing/seo/writer/drafts/christmas-gifts-for-dog-lovers.md | ea58cad5b735 | christmas-gifts-for-dog-lovers | Christmas Gifts for Dog Lovers: Their Dog in Bricks | A-2026W44-070 |
| 7 | marketing/seo/writer/drafts/christmas-gift-for-mom-from-kids.md | c5dedef589f0 | christmas-gift-for-mom-from-kids | A Christmas Gift for Mom From the Kids, in Bricks | A-2026W44-068 |
| 8 | marketing/seo/writer/drafts/photo-christmas-gift-for-husband.md | f789c5d4e0dd | photo-christmas-gift-for-husband | A Photo Christmas Gift for Your Husband He Can Build | A-2026W45-006 |
| 9 | marketing/seo/writer/drafts/christmas-gift-for-girlfriend-photo.md | 385107c89b8e | christmas-gift-for-girlfriend-photo | A Christmas Gift for Your Girlfriend, Built From a Photo | A-2026W45-013 |
| 10 | marketing/seo/writer/drafts/christmas-gift-for-boyfriend-who-loves-lego.md | 015707d3efae | christmas-gift-for-boyfriend-who-loves-lego | Christmas Gift for a Boyfriend Who Loves Building | A-2026W45-016 |
| 11 | marketing/seo/writer/drafts/babys-first-christmas-gift.md | 2597e5c9019b | babys-first-christmas-gift | Baby's First Christmas Gift: A Photo Keepsake to Build | A-2026W46-001 |
| 12 | marketing/seo/writer/drafts/christmas-gift-for-dad-from-kids.md | a27753bb32f1 | christmas-gift-for-dad-from-kids | A Christmas Gift for Dad From the Kids, Built From a Photo | A-2026W46-003 |
| 13 | marketing/seo/writer/drafts/christmas-gift-in-memory-of-a-loved-one.md | 739c7b17b459 | christmas-gift-in-memory-of-a-loved-one | A Christmas Gift in Memory of a Loved One | A-2026W46-010 |

## What happens when approved
- seo-blog-writer publishes each article live in the order above, with its title, meta description, handle, featured image and alt, Article plus FAQPage JSON-LD from its check note.
- Before each publish: confirm the handle still returns 404 (no duplicate), re-check prices in Shopify that day.
- Offer lines: the 9 drafts that print EARLYHOLIDAY20 already say codes do not combine with each other, other offers or free shipping. If publishing after Nov 22, drop the EARLYHOLIDAY20 line (each draft's publish notes say so).
- New articles use the theme's default article template, so they look different from Eden's GemPages articles. Eden can rebuild any of them in GemPages from the approved text after it is live.
- No redirects needed.

## After publishing (seo-technical, next run)
Verify each URL: 200, one canonical, Article and FAQPage valid, listed in `sitemap_blogs_1.xml`. Then the next Search Console indexing list (10 a day) is, in this order: 1, 2, 3, 6, 7, 8, 9, 10, 12, 13; then 4, 5, 11 the following day.
