# Draft check: personalized-christmas-photo-gifts (DRY RUN, 2026-10-11)

- Draft: `marketing/seo/writer/drafts/personalized-christmas-photo-gifts.md`
- Brief: `marketing/seo/strategist/briefs/personalized-christmas-photo-gifts.md`
- Target URL: `https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts`
- Checklist: `searchfit-seo:on-page-seo`
- Live site unreachable (egress proxy). Link targets and the handle were checked through read-only Shopify Admin queries and `article-inventory.md`.

## On-page checks

| Check | Result | Status |
|---|---|---|
| SEO title | "Personalized Christmas Photo Gifts: A Brick Mosaic Guide", 56 characters (under 60), keyword at the start | pass |
| Meta description | 135 characters (under 155), contains the keyword, ends with what the reader gets | pass |
| URL handle | `personalized-christmas-photo-gifts`: short, keyword only, no suffix. No existing article or redirect uses this path (Shopify `articles` and `urlRedirects` queries returned none) | pass |
| H1 | Exactly one: "Personalized Christmas Photo Gifts for Everyone on Your List". Differs from the SEO title on purpose (brief options 1 and 2); both carry the keyword | pass |
| Heading order | H1 > H2 > H3 with no skipped levels. FAQ questions are H3 under the FAQ H2 | pass |
| Keyword in first 100 words | Yes, first sentence | pass |
| Length | About 1,000 words of body copy, inside the brief's 1,000 to 1,400 range | pass |
| Internal links | 14 links, descriptive anchors, all `https://mymemobrick.com/...`. All 11 article targets are published (article-inventory rows 21, 22, 31, 33, 37, 38, 43, 44, 49, 52, 53, 54). `/collections/the-gift-for-everyone` exists ("Custom Bricks Portrait"). `/pages/faqs` exists and is published | pass |
| Forbidden link | No link to `/pages/free-preview` | pass |
| External links | None | n/a |
| Images and alt text | No images in the draft. Add a featured image with alt text before publishing (30 articles already lack one; see audit issue 2). Use only an owner-approved real photo or a labeled illustration | note for publisher |
| Em dashes | None (`check.py copy` exit 0) | pass |
| Duplication | New hub; it summarizes and links the existing Christmas posts rather than repeating them | pass |

## Issues found and fixed

None. No technical change to the draft was needed. Only the Status line was changed, to `Status: checked`.

## Notes for publishing

- Publish in blog `news` on the default `templates/article.liquid`, not a GemPages template. The default template outputs the theme's BlogPosting and Breadcrumb schema, byline, and date; GemPages templates do not (audit issue 2). If the theme's BlogPosting is present, use only the FAQPage block below to avoid two Article entities, or remove the theme one.
- Set the Shopify excerpt (or summary) to the meta description so the blog index card is not blank.
- Several linked articles have messy handles that a later site-change may rename (`duplicate-from-celebrate-the-pets...`, `-mxezkd`, `-yfpbkl`, `-qcaqov`). Any rename needs a 301, and this article's links should then be updated to the new handles.

## JSON-LD

Article plus FAQPage (from `searchfit-seo:schema-markup`). `datePublished`, `dateModified`, and `image` are not known until publishing; add them then (or let the theme's BlogPosting supply them).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Personalized Christmas Photo Gifts for Everyone on Your List",
  "description": "Turn a favorite photo into a personalized Christmas gift. See how a custom brick mosaic works, who it suits, and what comes in the kit.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts"
  },
  "author": { "@type": "Organization", "name": "Memobrick", "url": "https://mymemobrick.com" },
  "publisher": { "@type": "Organization", "name": "Memobrick", "url": "https://mymemobrick.com" },
  "keywords": "personalized christmas photo gifts, custom brick mosaic, DIY brick mosaic kit, personalized photo gift"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good personalized Christmas gift from a photo?",
      "acceptedAnswer": { "@type": "Answer", "text": "Choose something that keeps the photo in view and gives it meaning. A custom brick mosaic turns a favorite photo into wall art they build themselves, so it is both a keepsake and a holiday activity." }
    },
    {
      "@type": "Question",
      "name": "How does a custom brick mosaic work?",
      "acceptedAnswer": { "@type": "Answer", "text": "You upload a photo on our website, see your mosaic design, choose your options, and order a kit. Then you build the mosaic from 1×1 bricks using the building map." }
    },
    {
      "@type": "Question",
      "name": "What is included in a Memobrick kit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Kits include the baseplates, 1×1 bricks, building map or instructions, and tool needed for your design." }
    },
    {
      "@type": "Question",
      "name": "Can I see my mosaic before I order?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. The website shows you a preview of your mosaic design after you upload your photo, so you can try different photos before you order." }
    },
    {
      "@type": "Question",
      "name": "Is a frame included?",
      "acceptedAnswer": { "@type": "Answer", "text": "Frames are optional and only available where offered. You can check the options when you choose your kit." }
    },
    {
      "@type": "Question",
      "name": "When should I order for Christmas?",
      "acceptedAnswer": { "@type": "Answer", "text": "As early as you can. Each kit is made from your own photo, so starting your design now gives you the most breathing room. Check our frequently asked questions at https://mymemobrick.com/pages/faqs for current details." }
    }
  ]
}
</script>
```

## Internal link suggestions (after publishing)

These are edits to other live articles, so they are site work for later, not part of this draft:

- From the Christmas hub `dont-wait-until-december-personalized-christmas-gifts-to-order-now`, and from each Christmas post listed in the draft, add one link back to this page with the anchor "personalized Christmas photo gifts".
- From `looking-beyond-photo-frames-try-these-personalized-photo-gift-ideas-vrrphy`, link "Christmas photo gift ideas" to this page.
- Note: `article-inventory.md` names `dont-wait-until-december...` as the Christmas hub, while the strategist's brief sets this new page as the Christmas hub. The strategist should settle which one is the hub before back-links are added, to avoid two competing hubs.

## Redirects needed

None. The handle is new and has no existing redirect or article.
