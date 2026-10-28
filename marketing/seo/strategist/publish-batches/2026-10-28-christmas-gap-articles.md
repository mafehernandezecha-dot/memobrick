# Publish batch: 3 Christmas gap articles (2026-10-28)

Proposed by seo-strategist (Mariana) as ONE publish item at Eden's request. Executor: seo-blog-writer (Sandra). Approving this item approves publishing all three articles below, live on the Shopify blog `news`, each exactly as its draft file stands at the hash listed. A `changes: <handle> <note>` status sends back only the named article; the others stay approved. `rejected` rejects all three.

| # | Handle (live URL /blogs/news/<handle>) | Draft | Draft hash | Featured image | Image hash | Target keyword |
|---|---|---|---|---|---|---|
| 1 | last-minute-personalized-christmas-gifts | marketing/seo/writer/drafts/last-minute-personalized-christmas-gifts.md | dfd8ef1015dee59e65e790f63f54baecc2b343cd | marketing/seo/writer/drafts/images/last-minute-personalized-christmas-gifts-studio.png | ca6474be3db1b6504324ff4e15562dbfcf7ea9b0 | last minute personalized christmas gifts |
| 2 | christmas-gifts-for-grandparents-from-grandkids | marketing/seo/writer/drafts/christmas-gifts-for-grandparents-from-grandkids.md | a4b19cbf4f8f9bccd1d2a92a175bbb5dc9e9ecba | marketing/seo/writer/drafts/images/christmas-gifts-for-grandparents-from-grandkids-studio.png | 14dbb930a5f797b7078c4237543ccb4b78f38d77 | christmas gifts for grandparents from grandkids |
| 3 | photo-christmas-gift-for-wife | marketing/seo/writer/drafts/photo-christmas-gift-for-wife.md | efd30114de85199323ccbce34e3f145bf2ef2106 | marketing/seo/writer/drafts/images/photo-christmas-gift-for-wife-studio.png | b9150f9838c0d0842a5e7fcd26e028b6c755ef4a | christmas gift for wife photo |

Hashes are `git hash-object <file>` at proposal time. If a file no longer matches, that article needs re-approval.

## What the executor does once approved

For each row:

1. Confirm no article and no URL redirect already uses the handle (all three returned 404 on 2026-10-28).
2. Publish with GraphQL `articleCreate` (`isPublished: true`) on blog `news`, default template: title, handle, body (the markdown from the H1 down to the `---` line, converted to HTML, without the H1 since the theme prints the title), summary/excerpt = meta description, SEO description = meta description, featured image from the file listed with its alt text, and the FAQPage JSON-LD block from the draft appended to the body.
3. Check the live URL returns 200 and record the article ID and URL in the run report.

## Checks done before proposing (2026-10-28)

- `python3 marketing/tools/check.py copy` passes on all three (no em dashes).
- Titles 50 to 55 characters; meta descriptions 131 to 143 characters; one H1 each; FAQ as H3 with matching FAQPage JSON-LD.
- Every internal link returned 200 on 2026-10-28 (editor, free proof page, Art Gift Kit, gift card, 6 kit product pages, collection, 8 articles).
- Facts only from the memobrick-brand skill, product-facts.md and Shopify read-only data of 2026-10-28 (kit and frame prices, Art Gift Kit description). Dates and codes only from offers-calendar.md: December 15, 2026 order-by; EARLYHOLIDAY20 to Nov 22; BRICKFRIDAY25 Nov 27 to 29; CYBERBRICK20 Nov 30; no combining with free shipping over $125 US. "As seen on FOX", never "Fox News". Made and shipped from Miami, Florida (Facts table).
- Images: Memobrick Studio exports only (see each draft's `Studio:` line), reused from the W44 social redo; no AI-drawn mosaic. Each is captioned in the draft as an example, not a customer order.

## Not cannibalizing

- #1 is the late-buyer intent; `dont-wait-until-december-...` is the order-early intent. They link to each other.
- #2 is Christmas with the grandkids as givers; `heartwarming-personalized-gifts-every-grandparent-will-love-mxezkd` stays the evergreen grandparents page and is linked.
- #3 is Christmas with a wife as recipient; `turn-your-favorite-couple-photos-...` stays the evergreen couples page and is linked.
- None targets the generic "personalized christmas photo gifts" terms owned by the hub or the September Christmas posts Inesita is auditing.
