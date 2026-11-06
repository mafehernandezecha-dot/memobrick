# Draft check: photo-to-brick-mosaic-maker (2026-11-06)

- Draft: `marketing/seo/writer/drafts/photo-to-brick-mosaic-maker.md`
- Target URL: `https://mymemobrick.com/blogs/news/photo-to-brick-mosaic-maker` (live: 404 today, handle is free)

| Check | Result |
|---|---|
| Title (51 chars) | Pass |
| Meta description (136 chars) | Pass |
| One H1, H2 then H3 order | Pass |
| FAQPage JSON-LD (6 questions) | Parses; matches the visible FAQ |
| Prices, piece counts, build times | Match product-facts.md ($69.88, $99.88, $209.99, $431.98) |
| "40+ colors" | On the brand approved list |
| Dec 15, 2026 order date | Correct |
| Links | editor, free-preview, size guide, hub A, last-minute: 200. `best-photo-for-a-brick-mosaic`: 404 until A-2026W44-056 publishes (two links) |
| Copy check | Passes |

Issues fixed: none needed.

## Publish note

Two links point to the best-photo article, which is still unpublished. Publish it first (it is on the publish sheet for Eden) or the two links 404 for a few days. The publish step should also add the Article JSON-LD below; the draft only carries FAQPage.

## JSON-LD to add (Article)

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Photo to Brick Mosaic Maker: Upload, Preview, Build","description":"Upload a photo, see it as a custom brick mosaic in 40+ colors, pick a size and order a DIY kit. Try the Memobrick editor, no commitment.","mainEntityOfPage":"https://mymemobrick.com/blogs/news/photo-to-brick-mosaic-maker","author":{"@type":"Organization","name":"Memobrick"},"publisher":{"@type":"Organization","name":"Memobrick"}}
</script>
```

## Internal links to add from existing live articles

- `brick-mosaic-sizes` and `personalized-christmas-photo-gifts`: one line linking to this page once it is live.
