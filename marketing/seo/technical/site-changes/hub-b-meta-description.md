# Site change: meta description for Christmas hub B

Source: `content-fixes.md` (highest priority row), `blog-indexing-2026-10-28.md` row 48. Proposed 2026-10-29.

Where: Shopify admin, blog post SEO field `global.description_tag`, by seo-technical through the Admin API after a backup of the current value. This is a Shopify field, so it works on a GemPages article (the visible page does not change).

Open before approving: https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join (live, 200; the 3 merged posts redirect here).

| Field | Before (live HTML 2026-10-29) | After |
|---|---|---|
| Meta description (`global.description_tag`) | `  Memobrick` (no real text) | `A Christmas activity the whole family can join: build a custom brick mosaic from your photo together. Order by December 15, 2026.` (129 characters) |

Facts used: "order by December 15, 2026" and the family build angle match `product-facts.md` and `offers-calendar.md`. No prices, no claims.

Only this one field changes. Title, handle, body, template and redirects stay as they are.

## Verify
The live page shows this text in `<meta name="description">`. While SearchPie's duplicate tag is still on (A-2026W44-025, Eden), a second empty description still prints; this change does not fix that.

## Undo
Put the old value back (saved in `backups/`).
