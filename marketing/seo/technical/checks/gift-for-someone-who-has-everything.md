# Draft check: gift-for-someone-who-has-everything (2026-10-16)

- Draft: `marketing/seo/writer/drafts/gift-for-someone-who-has-everything.md`
- Target URL: `https://mymemobrick.com/blogs/news/gift-for-someone-who-has-everything`
- Live site not fetched; handles and pages checked through read-only Shopify queries.

## On-page checks

| Check | Result | Status |
|---|---|---|
| SEO title | "A Gift for the Person Who Has Everything", 40 characters, keyword phrase present | pass |
| Meta description | 129 characters, keyword and benefit present | pass |
| URL handle | `gift-for-someone-who-has-everything`: new, no article or redirect uses it | pass |
| H1 | One H1; H2 > H3 order has no skipped levels; FAQ questions are H3 | pass |
| Keyword in first sentence | Yes | pass |
| Internal links | 8 links, all `https://mymemobrick.com/...`, all targets published (5 articles, the Christmas hub `personalized-christmas-photo-gifts` which is now live, `/collections/the-gift-for-everyone`, `/pages/faqs`) | pass |
| Forbidden link | No `/pages/free-preview` | pass |
| Brand/facts | Free proof is optional (brand file, 2026-10-12); December 15 order-by date matches offers calendar; "40+ colors", frames sold separately, 1×1 bricks match brand and product facts | pass |
| Em dashes | None (`check.py copy` exit 0) | pass |
| Images | None in draft. Add a featured image with alt text and set the excerpt to the meta description before publishing | note for publisher |

## Issues found and fixed

None. Only the Status line was changed to `Status: checked`.

## Publishing notes

Publish in blog `news` on the default `article.liquid` template so BlogPosting and Breadcrumb schema come from the theme. Add the FAQPage block below only.

## JSON-LD (FAQPage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "What do you give someone who has everything?", "acceptedAnswer": {"@type": "Answer", "text": "Give them something they cannot already own. A gift made from a photo only you have, like a custom brick mosaic, is personal by definition, so it cannot duplicate anything on their shelf."}},
    {"@type": "Question", "name": "Is a photo gift too sentimental for someone practical?", "acceptedAnswer": {"@type": "Answer", "text": "It does not have to be. A mosaic is also a build project and a piece of wall art. Practical people often enjoy the building, and the finished piece looks like art, not a scrapbook."}},
    {"@type": "Question", "name": "Does the kit need to be built, or can it arrive assembled?", "acceptedAnswer": {"@type": "Answer", "text": "It is a build-at-home kit. You or the person you give it to places the 1×1 bricks on the baseplates using the building instructions."}},
    {"@type": "Question", "name": "Does it come with a frame?", "acceptedAnswer": {"@type": "Answer", "text": "Frames are sold separately. You can see the options on the product page."}},
    {"@type": "Question", "name": "When do I need to order for Christmas?", "acceptedAnswer": {"@type": "Answer", "text": "Order by December 15, 2026 to receive your kit before Christmas."}},
    {"@type": "Question", "name": "What if I am not sure which photo to use?", "acceptedAnswer": {"@type": "Answer", "text": "Upload a few and compare the previews. Pick the one with clear faces, good light, and a story behind it."}}
  ]
}
</script>
```

## Internal link suggestions (after publishing)

- From `personalized-christmas-photo-gifts` and `dont-wait-until-december-personalized-christmas-gifts-to-order-now`, link "gift for someone who has everything" to this page.
- From `the-ideal-present` and `why-personalized-gifts-feel-so-much-better-than-generic-gifts`, link the same anchor.

## Redirects needed

None.
