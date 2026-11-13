# Draft check: custom-brick-portrait-from-photo (2026-11-12)

- Draft: `marketing/seo/writer/drafts/custom-brick-portrait-from-photo.md`
- Target URL: `https://mymemobrick.com/blogs/news/custom-brick-portrait-from-photo` (404 today, handle free)

| Check | Result |
|---|---|
| Title (42 chars) | Pass |
| Meta description (139 chars) | Pass |
| One H1, H2 order, H3 under H2, FAQ as H3 | Pass |
| FAQPage JSON-LD (5 questions) | Matches the visible FAQ (JSON uses "1x1"/"16x16" for the × sign; same meaning, fine) |
| Links (all 200 today) | editor (UTM `brick-portrait`), free-preview, gift collection, dog-brick-mosaic, 6 size products, size guide, hub A, wife article, pets article, blog-memorial, featured image |
| Prices | Re-checked live today (products/*.js, "No (Build at home)"): 69.88, 99.88, 189.99, 209.99, 279.00, 431.98. All match |
| Facts | Dec 15 2026 order-by, Miami, free US shipping over $125, not affiliated with LEGO: all in offers-calendar Facts. No discount code, so the code/free-shipping rule does not apply |
| Free proof | Offered as optional |
| Copy check | Passes |

Issues fixed: none needed. Status set to `checked`.

Note for the writer (content, not changed by me): "Shopify lists how many people fit" and "Shopify's estimates" name the platform to the buyer. "Our product pages list" would read more naturally. Optional, not a blocker.

## Publish notes
- Default article template (not GemPages): looks different from the GemPages articles. Eden can rebuild it in GemPages from the approved text after it is live. Excerpt = meta description.
- Redirect: none needed.
- After `best-photo-for-a-brick-mosaic`, `photo-to-brick-mosaic-maker` and `christmas-gifts-for-dog-lovers` are live (all in the 2026-11-12 bundle), the writer can add the links listed in the draft header.

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Custom Brick Portrait From Your Photo","description":"Turn a photo of a person, couple, family or pet into a custom brick portrait you build yourself, in 40+ colors. See it in the editor first.","mainEntityOfPage":"https://mymemobrick.com/blogs/news/custom-brick-portrait-from-photo","image":"https://mymemobrick.com/cdn/shop/files/Custom-Memobrick-Photo-Mosaic-20x20.png?width=1200","author":{"@type":"Organization","name":"Memobrick"},"publisher":{"@type":"Organization","name":"Memobrick"}}
</script>
```
Plus the draft's FAQPage JSON-LD.

## Re-check 2026-11-13
Writer edits from commit 17d4629 (bundle flags). Title, meta description, single H1 and heading order are fine; FAQPage JSON-LD in the draft parses and matches the visible FAQ word for word; all internal links return 200; prices match the live store; copy check passes; handle still 404. Status set to `checked`. New hash in `publish-bundle-2026-11-12.md`.
- Portrait: Article headline changed to "Custom Brick Portrait From Your Photo". The FAQ question "Is a Memobrick LEGO-style portrait made by LEGO?" still says LEGO-style; it is the trademark disclaimer, so I left it (content, not technical).
