# Publish batch: calm building series (5 articles), 2026-10-28

Approving this batch publishes all five articles below on the Shopify blog `news`, in this order (hub first, so the others link to a live page). Writer: seo-blog-writer (Sandra). Brief: `marketing/seo/briefs/2026-10-28-autism-calm-building-research.md`.

Approval works like the weekly social batch: `approved` approves every article; `changes: <handle> <note>` sends back only the named article(s); `rejected` rejects all five. If an article file no longer matches its Hash, that article needs re-approval.

| Order | Handle | Article file | Hash | Title | Target keyword |
|---|---|---|---|---|---|
| 1 (hub) | brick-mosaic-calm-activity-autistic-kids-adults | marketing/seo/writer/drafts/brick-mosaic-calm-activity-autistic-kids-adults.md | 76bffa0d7db9dac7cb8e54f07285047f8a69331a | Brick Mosaics: A Calm Activity for Autistic Kids and Adults | calming activities for autistic kids and adults |
| 2 | build-together-reader-sorter-builder | marketing/seo/writer/drafts/build-together-reader-sorter-builder.md | 5d5251d17ed9582fe54f4a0538c4a3fa2f58fa65 | How to Build Together: Reader, Sorter, Builder | turn-taking activities for autistic kids |
| 3 | sensory-friendly-building-tips | marketing/seo/writer/drafts/sensory-friendly-building-tips.md | 1b1ca5ae40bfee95c6ebf314216af6c565957fd3 | Sensory-Friendly Building Tips for Brick Mosaics | sensory-friendly activities |
| 4 | special-interest-brick-mosaic | marketing/seo/writer/drafts/special-interest-brick-mosaic.md | 09b8868751af4d0dcd14307f9218070cc3903886 | Turning a Special Interest Into a Brick Mosaic | gift ideas for autistic adults with special interests |
| 5 | brick-mosaics-occupational-therapists-teachers | marketing/seo/writer/drafts/brick-mosaics-occupational-therapists-teachers.md | d4174c322fa1f9e6100d0b51e7b9f8230f88a748 | Brick Mosaics for OTs and Special-Education Teachers | fine motor activities for occupational therapy |

## Recommendation for Eden: two readers for the hub

Before the hub goes live, or soon after, have it read by:

1. one autistic adult, or a parent of an autistic child, and
2. one occupational therapist.

They can catch wording that feels off to the community and any line a professional would read as a health claim. This is your choice: you can wait for their read before approving, or approve now and make their changes after publishing.

## What was checked (2026-10-28)

- Copy check (`marketing/tools/check.py copy`): all five pass, no em dashes.
- Hard rules in the brief: no claim that Memobrick treats, helps, improves or is therapy for autism or anything medical; each article says plainly it is not therapy where relevant; the LEGO-therapy trial is described as small and not statistically significant in the main analysis; "No study has tested brick mosaics" is stated; identity-first language is explained once in the hub; no quotes, testimonials or "families tell us" lines; small-parts note in every article. No age is stated, because `product-facts.md` and the Shopify product text list no age warning.
- Product facts: sizes, bricks, baseplates and build times match `marketing/shared/product-facts.md` and live Shopify data; no prices or discount codes quoted; free proof worded as optional.
- Links (live site, 2026-10-28): editor, free proof page, collection, products 1-big-board, 2-2-boards and 3-3-boards return 200; contact-us returned 200 earlier today (then 429 rate limit). The five series handles return 404, so they are free; they go live with this batch.
- Images: only Shopify product photos of labeled brick bags (no people, no mosaic). Optional Studio-export and AI-scene slots are listed in each file and not made yet; publish without them unless they are made under the Studio-only rule.
- Not re-verified: the research source URLs from the brief could not be opened from this environment (network blocked), so the citations are as the brief gives them.

## Publishing notes

- Blog `news`, default `article.liquid` template. Body is everything above `<!-- END OF ARTICLE BODY -->` in each file, from the H1 down (the H1 becomes the article title shown on the page; Title above is the SEO title).
- Add each file's FAQPage JSON-LD to the article body, set the excerpt to the meta description, and use the listed featured image and alt text.
- Before publishing, confirm no article with each handle exists, and that the free-proof form on `/pages/free-preview` works (see A-2026W44-018); if it does not, swap the free proof links for the editor link.
- Look: most existing articles in blog `news` are built in GemPages. These five will publish through the Shopify API on the theme's default article template, so they will look different from the GemPages articles. Eden can choose to rebuild the hub (or any of them) in GemPages from the approved text after it is live; title, meta, handle and redirects stay as set through the API.
