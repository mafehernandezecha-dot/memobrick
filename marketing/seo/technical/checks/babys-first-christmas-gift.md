# Draft check: babys-first-christmas-gift (2026-11-09)

- Draft: `marketing/seo/writer/drafts/babys-first-christmas-gift.md`
- Target URL: `https://mymemobrick.com/blogs/news/babys-first-christmas-gift` (404 today, handle free)

| Check | Result |
|---|---|
| Title (54 chars) | Pass |
| Meta description (129 chars) | Pass |
| One H1, H2 order, FAQ as H3 | Pass |
| FAQPage JSON-LD (5 questions) | Matches the visible FAQ |
| Links | 200: grandparents article, personalized-christmas-photo-gifts, babys-first-year-photo-mosaic, brick-mosaic-sizes (200 earlier today), editor, free-preview, 10x10 product, frame-big-board, featured image. 429 (rate limit, not re-tested): /products/1-big-board, /products/unlimited-memobrick (writer reported 200 today) |
| Prices ($35.00, $69.88, $99.88, frames $49.00/$65.00), Dec 15 2026 | Match the writer's Shopify check; 20x20 $65.00 frame to re-check on publish day |
| Offer claims | Dated codes only; drop the EARLYHOLIDAY20 line after Nov 22 |
| Safety note (small bricks, adults build) | Present |
| Copy check | Passes |

Issues fixed: none needed.

## Publish notes
- Default article template (not GemPages); Eden can rebuild it in GemPages after it is live.
- Add the Article JSON-LD below plus the draft's FAQPage JSON-LD. Excerpt = meta description.
- Redirect: none needed.
- Reverse links: add one line from `christmas-gifts-for-grandparents-from-grandkids` and the hub `personalized-christmas-photo-gifts` (API edit, separate approval).

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Baby's First Christmas Gift: A Photo Keepsake to Build","description":"A baby's first Christmas gift the family keeps: turn a favorite baby photo into a custom brick mosaic kit. Order by Dec 15, 2026.","mainEntityOfPage":"https://mymemobrick.com/blogs/news/babys-first-christmas-gift","image":"https://mymemobrick.com/cdn/shop/files/Custom-Bricked-Mosaic-Portrait-16x16_-Memobrick-61979964.png?width=1200","author":{"@type":"Organization","name":"Memobrick"},"publisher":{"@type":"Organization","name":"Memobrick"}}
</script>
```
