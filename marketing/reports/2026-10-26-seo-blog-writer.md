# SEO blog writer 2026-10-26

## Summary
- Published approved A-2026W43-006 live: https://mymemobrick.com/blogs/news/brick-mosaic-sizes (renders, HTTP 200).
- Drafted best-photo-for-a-brick-mosaic (brief now Status: drafted), ready for technical check.

## Done
- A-2026W43-006: check.py listed it as approved, unexpired and unchanged; `git diff 788f1ec HEAD` on the draft is empty, so the draft is exactly as approved. Confirmed no article with handle `brick-mosaic-sizes` existed, then ran articleCreate (isPublished true) in blog `news` (default template) with the approved title, handle, meta description (global.description_tag), summary (the meta description), body converted from the draft's markdown (H1 left to the theme title, as on earlier articles) and the FAQPage JSON-LD from marketing/seo/technical/checks/brick-mosaic-sizes.md. Author "Memobrick". Article ID gid://shopify/Article/752007282908, published 2026-10-26T11:41:40Z. Live URL: https://mymemobrick.com/blogs/news/brick-mosaic-sizes. Live check: HTTP 200, page title "Which Brick Mosaic Size Should You Choose? | Memobrick", meta description matches, size table present, FAQPage and BlogPosting schema both present. Stored body re-read from Shopify matches what was sent.
- Draft: marketing/seo/writer/drafts/best-photo-for-a-brick-mosaic.md (Status: ready for check, about 1,230 words, 7-tip checklist, group/couple/pet advice, FAQ with 8 questions, one start-a-design call to action). Title 44 characters, meta description 144. All 5 internal links checked live (HTTP 200), including the new size guide. check.py copy passed (no em dashes). No prices, no faces for 16×16 to 30×20, no resolution or file-size claims, no reviews or customer stories, no press mentions, no holiday code.

## Proposed for approval
None (seo-technical checks the draft and proposes it).

## Blocked or unknown
- No featured image on the size guide article (the check file suggested one with alt text); owner or site-developer can add it.
- marketing/conversion/reviews-ugc/approved-stories.md does not exist, so no customer stories were used.
- Search volume for both keywords unknown (Search Console not pulled).
- Internal links from the Christmas hub, the gift article and the small-size product pages to the size guide are seo-technical's follow-up (listed in its check file).

## Sales impact
The size guide answers the size question that stops search visitors choosing a kit, and goes live ahead of the Black Friday and Christmas periods (goal 12 then 20 orders a day vs about 2.6 now). The photo article targets the stall point for design-starters (draft orders are the largest lost-order cause, 62 of 114) by helping them pick a photo and finish. Search effect builds over weeks as pages index; neither moves today's orders directly.

## Next run
seo-technical to check best-photo-for-a-brick-mosaic and propose it; publish it once approved. Pick up the next ready brief.
