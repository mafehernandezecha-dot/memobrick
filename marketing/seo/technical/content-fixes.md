# Content fixes for the SEO strategist (from the 2026-10-11 audit)

| URL (/blogs/news/ unless noted) | What is missing |
|---|---|
| 43 of 44 GemPages `gp-template` articles (all except the Thanksgiving article) | No meta description; theme fallback is empty because the body is empty |
| 30 articles published 2026-09-06 | No featured image |
| 19 GemPages articles with no H1 (heuristic) | H1; 4 also lack H2: `looking-beyond-photo-frames-...-vrrphy`, `the-best-keepsakes-come-from-the-moments-you-least-expect`, `the-art-on-your-wall-should-have-a-story`, `this-christmas-give-them-a-memory-they-can-build` |
| `baby-carrier-jul-10-22-19-45`, `why-personalized-gifts-feel-so-much-better-than-generic-gifts`, `baby-carrier-aug-14-20-11-55` | Double H1 (first empty) |
| `/collections/avada-best-sellers` | Meta description blank; duplicate of newest-products |
| Blogs `memobrick-can-help-you-have-more-quality-moment`, `the-ideal-present` (blog) | Empty, thin "No posts yet" pages |

## Added 2026-10-28 (blog indexing check, `blog-indexing-2026-10-28.md`)

GemPages articles: visible text, headings and links are edited by Eden in GemPages (`gempages-changes-2026-10-28.md`). Meta descriptions are Shopify fields (`global.description_tag`) and work through the API for every article, GemPages or not.

| URL (/blogs/news/) | What is missing |
|---|---|
| `a-holiday-activity-everyone-can-actually-join` (Christmas hub B) | Meta description: none at all. Highest priority of the list below. Text links to hub A, editor and free proof: Eden, GemPages list item 1 |
| `personalized-christmas-photo-gifts` (hub A, default template) | FAQ "When should I order for Christmas?" still says "As early as you can"; the verified order-by date is Dec 15, 2026. After the consolidation item: fold in the FAQ and "Choosing the Right Size" section of `the-christmas-gift-that-turns-a-favorite-moment-into-an-experience` and the "Holiday Planning Checklist" of `dont-wait-until-december-...` (writer, through the API) |
| 36 articles with description `  Memobrick` (rows marked "missing" in `blog-indexing-2026-10-28.md`) | Meta description. Still open since 2026-10-11. Do the Christmas, Thanksgiving, grandparents, pets and couples articles first |
| 8 articles with a 320-character auto excerpt (graduation, Father's Day, baby, test-blog-post, summer souvenirs, military, screen-free, wedding) | A written meta description under 155 characters |
| `memobrick-named-one-of-the-best-holiday-gifts-by-fox-news` body | Em dashes in customer copy, and "unlimited revisions" (not in product-facts.md; verify or remove). Not touched by the retitle item |
| `duplicate-from-the-best-summer-vacation-souvenirs-...` | Title has an em dash ("Bought—They're Built"); title is a Shopify field, writer can fix through the API |
| `the-ideal-present` | Two H1 tags (body starts with its own H1); image alts "picture lego dog", "lego pic" |
