# Draft check: black-friday-personalized-photo-gifts (2026-11-07)

- Draft: `marketing/seo/writer/drafts/black-friday-personalized-photo-gifts.md`
- Target URL: `https://mymemobrick.com/blogs/news/personalized-gifts-black-friday` (404 today, handle free)

| Check | Result |
|---|---|
| Title (49 chars) | Pass |
| Meta description (140 chars) | Pass |
| One H1, H2 order, FAQ H3 | Pass |
| FAQPage JSON-LD (6 questions) | Matches the visible FAQ |
| Prices ($69.88, $99.88, $149.00, $189.99), Dec 15 2026 | Match the draft's own Shopify check |
| Links (11 URLs) | All 200 |
| Offer claims | Only EARLYHOLIDAY20 (ends Nov 22) printed; BF codes not named. Remove the EARLYHOLIDAY20 line after Nov 22. |
| Copy check | Passes |

Issues fixed: none needed.

## Publish notes
- Default article template (not GemPages); Eden can rebuild in GemPages after it is live.
- Add Article JSON-LD below plus the draft's FAQPage JSON-LD.
- Nov 26/27 offer edit is a separate approval. Needs a live URL by about Nov 20 to be indexed before Nov 27.

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Personalized Black Friday Gifts Made From a Photo","description":"Personalized gifts for Black Friday: a custom brick mosaic kit made from your photo. Sizes from $69.88. Order by Dec 15, 2026 for Christmas.","mainEntityOfPage":"https://mymemobrick.com/blogs/news/personalized-gifts-black-friday","author":{"@type":"Organization","name":"Memobrick"},"publisher":{"@type":"Organization","name":"Memobrick"}}
</script>
```

## Internal links to add from live articles
- `personalized-christmas-photo-gifts`, `last-minute-personalized-christmas-gifts`, `brick-mosaic-sizes`: one line each (link plan: marketing/seo/strategist/link-plan-2026-11-07.md section 1).

## Re-check 2026-11-14
Writer edits from commit 3105e18 (build-time lines removed; build-time table column replaced by "Fits" from Shopify, "1 to 3 people" on the 40×20 matches the product page). No build time, hours or evenings about our kit remain in the body or the JSON-LD. Title, meta description, single H1 and heading order are fine. FAQPage JSON-LD parses and matches the visible FAQ word for word. All internal links return 200. Every price matches the live store today. Copy check passes. Handle still 404. Status set to `checked`; new hash in `publish-bundle-2026-11-12.md`.
