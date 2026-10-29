# Draft check: best-photo-for-a-brick-mosaic (2026-10-29)

- Draft: `marketing/seo/writer/drafts/best-photo-for-a-brick-mosaic.md`
- Target URL: `https://mymemobrick.com/blogs/news/best-photo-for-a-brick-mosaic` (live: 404 today, handle is free)

| Check | Result |
|---|---|
| Title | "Best Photo for a Brick Mosaic: 7 Simple Tips", 44 characters. Pass |
| Meta description | 144 characters. Pass |
| Headings | One H1, H2 then H3, no skipped level. Pass |
| Internal links (5) | `/blogs/news/brick-mosaic-sizes`, `/blogs/news/gift-for-someone-who-has-everything`, `/blogs/news/personalized-christmas-photo-gifts`, `/collections/the-gift-for-everyone`, `/pages/faqs`: all 200 live. Pass |
| Facts | People counts per size match the product pages (same as the checked size guide); December 15, 2026 matches the offers calendar; no prices. Pass |
| Em dashes | None. Pass |
| Free proof wording | "optional", matches product-facts. Pass |

Issues found and fixed: none. Status line set to `Status: checked`.

Suggestions: add a link to `/pages/editor` in "See it before you order" (the editor is the main sales path; the draft only links the collection). Writer's call, not changed. Featured image and alt are not in the draft: publisher adds one (real product photo or Studio example captioned as an example).

Publishing notes: default `article.liquid` template (not GemPages), so BlogPosting and Breadcrumb schema come from the theme; add the FAQPage JSON-LD below. Set the excerpt to the meta description. Eden can rebuild it in GemPages after it is live.

## JSON-LD (FAQPage, 8 questions from the draft)

```html
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is the best photo for a brick mosaic?","acceptedAnswer":{"@type":"Answer","text":"A clear, well-lit photo with the subject large in the frame and a simple background. Sharp faces and good contrast between the subject and the background help most."}},
{"@type":"Question","name":"Can I use a group photo?","acceptedAnswer":{"@type":"Answer","text":"Yes. Fewer people read better, and larger sizes fit more. The product pages list 1 to 3 people for 40×20, up to 1 to 6 people for 40×50. Use the preview to check your photo."}},
{"@type":"Question","name":"Can I use a photo of my dog or cat?","acceptedAnswer":{"@type":"Answer","text":"Yes. Choose a photo where the face fills the frame and the eyes are visible, with a background that contrasts with their fur."}},
{"@type":"Question","name":"Does a phone photo work?","acceptedAnswer":{"@type":"Answer","text":"Yes. Upload the original photo from your phone rather than a screenshot or a photo sent through a messaging app."}},
{"@type":"Question","name":"What if my photo is old or a little blurry?","acceptedAnswer":{"@type":"Answer","text":"Upload it and check the preview. If it looks soft, try a sharper copy or a scan of the original print. The preview shows you how it will look before you order."}},
{"@type":"Question","name":"Can I see the mosaic before I buy?","acceptedAnswer":{"@type":"Answer","text":"Yes. The website shows your photo as a mosaic before you order, and you can adjust colors and details."}},
{"@type":"Question","name":"Can Memobrick design it for me?","acceptedAnswer":{"@type":"Answer","text":"Yes, if you want help. Memobrick's designers can create the design and send a free proof before production. It is optional."}},
{"@type":"Question","name":"When do I order for Christmas?","acceptedAnswer":{"@type":"Answer","text":"Order by December 15, 2026 to receive your kit before Christmas."}}]}
</script>
```

Redirect needed: none. Link suggestions in: the size guide and `personalized-stocking-stuffers` (replace its size-guide line), and hub A.
