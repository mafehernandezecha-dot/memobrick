# Article publish bundle, 2026-11-12

One approval publishes all 13 checked article drafts below on the Shopify blog "news". Executor: seo-blog-writer.

Every draft was checked by seo-technical (check notes in `marketing/seo/technical/checks/<slug>.md`). Every target URL returned 404 on 2026-11-12 (not yet published). All internal links in these drafts returned 200 on 2026-11-12, except `best-photo-for-a-brick-mosaic`, which is itself in this bundle (publish it before `photo-to-brick-mosaic-maker`).

Hash is `git hash-object <draft>` (first 12 characters). Row 1: 2026-11-12. Rows 3, 11, 12, 13: re-checked 2026-11-13. Rows 2 and 4 to 10: re-checked 2026-11-14 after the writer removed the build-time lines. If a draft no longer matches its hash, publish the others and leave that one for a fresh check.

| # | Draft | Hash | Handle | Title | Covers queue item |
|---|---|---|---|---|---|
| 1 | marketing/seo/writer/drafts/best-photo-for-a-brick-mosaic.md | 8efd8db7f2ab | best-photo-for-a-brick-mosaic | Best Photo for a Brick Mosaic: 7 Simple Tips | A-2026W44-056 (lapses Nov 12) |
| 2 | marketing/seo/writer/drafts/photo-to-brick-mosaic-maker.md | d67c3ed95f61 | photo-to-brick-mosaic-maker | Photo to Brick Mosaic Maker: Upload, Preview, Build | A-2026W45-021 |
| 3 | marketing/seo/writer/drafts/custom-brick-portrait-from-photo.md | a98b16ef2b66 | custom-brick-portrait-from-photo | Custom Brick Portrait From Your Photo (Eden may pick the option "Custom LEGO-Style Portrait From Your Photo") | new (re-checked 2026-11-13) |
| 4 | marketing/seo/writer/drafts/black-friday-personalized-photo-gifts.md | 24609995ccba | personalized-gifts-black-friday | Personalized Black Friday Gifts Made From a Photo | A-2026W45-023 |
| 5 | marketing/seo/writer/drafts/personalized-stocking-stuffers.md | 5397c11405a2 | personalized-stocking-stuffers | Personalized Stocking Stuffers Made From a Photo | A-2026W44-055 (lapses Nov 12) |
| 6 | marketing/seo/writer/drafts/christmas-gifts-for-dog-lovers.md | 62c24457b505 | christmas-gifts-for-dog-lovers | Christmas Gifts for Dog Lovers: Their Dog in Bricks | A-2026W44-070 |
| 7 | marketing/seo/writer/drafts/christmas-gift-for-mom-from-kids.md | 4e6bdf7240cb | christmas-gift-for-mom-from-kids | A Christmas Gift for Mom From the Kids, in Bricks | A-2026W44-068 |
| 8 | marketing/seo/writer/drafts/photo-christmas-gift-for-husband.md | bc240a0c40ef | photo-christmas-gift-for-husband | A Photo Christmas Gift for Your Husband He Can Build | A-2026W45-006 |
| 9 | marketing/seo/writer/drafts/christmas-gift-for-girlfriend-photo.md | feb8a0992ec9 | christmas-gift-for-girlfriend-photo | A Christmas Gift for Your Girlfriend, Built From a Photo | A-2026W45-013 |
| 10 | marketing/seo/writer/drafts/christmas-gift-for-boyfriend-who-loves-lego.md | 9fb49d1323fc | christmas-gift-for-boyfriend-who-loves-lego | Christmas Gift for a Boyfriend Who Loves Building | A-2026W45-016 |
| 11 | marketing/seo/writer/drafts/babys-first-christmas-gift.md | 8889a9df6ef4 | babys-first-christmas-gift | Baby's First Christmas Gift: A Photo Keepsake to Build | A-2026W46-001 |
| 12 | marketing/seo/writer/drafts/christmas-gift-for-dad-from-kids.md | 70a3870915d2 | christmas-gift-for-dad-from-kids | A Christmas Gift for Dad From the Kids, Built From a Photo | A-2026W46-003 |
| 13 | marketing/seo/writer/drafts/christmas-gift-in-memory-of-a-loved-one.md | 9d093e6329c3 | christmas-gift-in-memory-of-a-loved-one | A Christmas Gift in Memory of a Loved One | A-2026W46-010 |

## What happens when approved
- seo-blog-writer publishes each article live in the order above, with its title, meta description, handle, featured image and alt, Article plus FAQPage JSON-LD from its check note.
- Before each publish: confirm the handle still returns 404 (no duplicate), re-check prices in Shopify that day.
- Offer lines: the 9 drafts that print EARLYHOLIDAY20 already say codes do not combine with each other, other offers or free shipping. If publishing after Nov 22, drop the EARLYHOLIDAY20 line (each draft's publish notes say so).
- New articles use the theme's default article template, so they look different from Eden's GemPages articles. Eden can rebuild any of them in GemPages from the approved text after it is live.
- No redirects needed.

## After publishing (seo-technical, next run)
Verify each URL: 200, one canonical, Article and FAQPage valid, listed in `sitemap_blogs_1.xml`. Then the next Search Console indexing list (10 a day) is, in this order: 1, 2, 3, 6, 7, 8, 9, 10, 12, 13; then 4, 5, 11 the following day.

## Re-check 2026-11-13 (seo-technical)
The writer edited 4 drafts on 2026-11-13 (commit 17d4629) to clear the flags. I re-checked them; the hashes above are new for rows 3, 11, 12 and 13.
- Build-time lines: gone from the dad, memorial and portrait drafts (and the baby draft). The tables now show "Fits" instead of build time. The dad FAQ "How long does it take" became "Does a frame come with it?" with frame prices $49.00 and $65.00, both matching the live store today.
- Portrait title: now "Custom Brick Portrait From Your Photo" (37 characters), with the LEGO-Style title kept as Eden's option. The Article JSON-LD headline in the check note was updated to match. If Eden picks the option, the publisher uses it for the title, H1 and headline.
- Baby article: BRICKFRIDAY25 and CYBERBRICK20 are now labeled "scheduled", as in the offers calendar.
- All 4: one H1, FAQPage questions and answers match the visible FAQ, every link returns 200, every price matches the live store today, copy check passes, every handle still returns 404.
- The other 9 drafts are unchanged since 2026-11-12 (same hashes).

## Re-check 2026-11-14 (seo-technical)
The writer removed the build-time lines from the other 8 drafts on 2026-11-14 (commit 3105e18). I re-checked them; the hashes above are new for rows 2 and 4 to 10.
- No build time, hours or evenings about the kit remain in any of the 13 drafts, in the body or the FAQPage JSON-LD. Where a table had a build-time column it now shows "Fits" from Shopify (40×20: 1 to 3 people, matching the product page; others "not listed").
- All 8: one H1, clean heading order, title and meta lengths fine, FAQPage parses and matches the visible FAQ, every price matches the live store today, copy check passes, every handle still returns 404.
- Links: 38 unique site URLs across the drafts, all 200 except best-photo-for-a-brick-mosaic (row 1 here, published first).
- Technical fix by me: rows 2 and 5 had FAQPage answer text worded slightly differently from the visible answer. I set the JSON-LD to the visible wording. No visible text changed.
- Rows 1, 3, 11, 12, 13 still match their hashes.
- Open flags on this bundle: none. Remaining notes that do not block it: the mom draft (row 7) still marks its featured image NEEDED (it can go live without one if Eden prefers), and the EARLYHOLIDAY20 lines come out if publishing after Nov 22.
