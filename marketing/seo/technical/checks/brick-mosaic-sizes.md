# Draft check: brick-mosaic-sizes (2026-10-23)

- Draft: `marketing/seo/writer/drafts/brick-mosaic-sizes.md`
- Target URL: `https://mymemobrick.com/blogs/news/brick-mosaic-sizes` (live site fetched: returns 404 today, so the handle is free; no redirect uses it)

## On-page checks

| Check | Result | Status |
|---|---|---|
| Title | "Which Brick Mosaic Size Should You Choose?", 42 characters, keyword phrase present | pass |
| Meta description | 125 characters, size range and benefit present | pass |
| Headings | One H1; H2 then H3 with no skipped levels; FAQ questions are H3 | pass |
| Keyword in first sentence | Yes ("Brick mosaic sizes run from 16×16 to 40×50 inches") | pass |
| Facts | Size table matches `marketing/shared/product-facts.md` (baseplates, pieces, hours, people); people counts only where Shopify lists them; frame sizes match the Frames table; no prices quoted; December 15 matches the offers calendar | pass |
| Internal links | 4 links, all HTTP 200 on the live site: `/blogs/news/personalized-christmas-photo-gifts`, `/blogs/news/gift-for-someone-who-has-everything`, `/collections/the-gift-for-everyone`, `/pages/faqs` | pass |
| Forbidden link | No `/pages/free-preview`, no mention of the "Yes" assembled option | pass |
| Em dashes | None | pass |
| Images | None in draft. Publisher: add a featured image with alt text (for example the size lineup) and set the excerpt to the meta description | note for publisher |

## Issues found and fixed

None. Only the Status line was changed to `Status: checked`.

## Publishing notes

Publish in blog `news` on the default `article.liquid` template (not a GemPages template) so BlogPosting and Breadcrumb schema come from the theme; confirm after publishing that the page shows BlogPosting. Add the FAQPage block below to the article body only.

## JSON-LD (FAQPage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What size brick mosaic should I get?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start with the photo. One or two faces suit a smaller size. A group suits a larger one. Then think about wall space and how long you want to build. Upload your photo and use the preview to compare."
      }
    },
    {
      "@type": "Question",
      "name": "How many pieces are in a brick mosaic kit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the size. A 16×16 has 2,500 pieces, a 20×20 has 4,096, a 30×30 has 9,216, and a 40×50 has 20,480. All pieces are 1×1 bricks."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estimates run from about 2.5 hours for a 16×16 to about 20 hours for a 40×50. You can split the build across several evenings."
      }
    },
    {
      "@type": "Question",
      "name": "Is a frame included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Frames are sold separately."
      }
    },
    {
      "@type": "Question",
      "name": "Which size fits a family photo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The product pages list 1 to 4 people for 30×30, 1 to 5 for 30×40, 40×40 and 30×50, and 1 to 6 for 40×50. Use the preview to see how your photo looks."
      }
    },
    {
      "@type": "Question",
      "name": "Can Memobrick design it for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if you want help. Memobrick's designers can create the design and send a free proof before production. It is optional, and you can always use the editor on your own."
      }
    },
    {
      "@type": "Question",
      "name": "When do I order for Christmas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Order by December 15, 2026 to receive your kit before Christmas."
      }
    }
  ]
}
</script>
```

## Internal link suggestions (after publishing)

- From `personalized-christmas-photo-gifts` (live), link "which brick mosaic size" to this page.
- From `gift-for-someone-who-has-everything` (live), link "size guide" to this page.
- From the 20x20, 16x16 and 20x30 kit product descriptions, add a link "compare all sizes" (a separate site change if wanted).

## Redirects needed

None.
