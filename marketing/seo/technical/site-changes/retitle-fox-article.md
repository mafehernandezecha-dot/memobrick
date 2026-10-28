# Site change: Retitle the FOX article to "As seen on FOX" and remove "Fox News" from blog articles

Source: owner rule (never write "Fox News"; use "As seen on FOX"), `blog-indexing-2026-10-28.md` broken item 6. Proposed 2026-10-28.

Where: Shopify admin, Blog posts and Navigation > URL redirects, done by seo-technical through the Admin API after a backup. Only the strings listed here change.

Open before approving: https://mymemobrick.com/blogs/news/memobrick-named-one-of-the-best-holiday-gifts-by-fox-news (live, 200; it shows in search with the broken title `** Named One of the Best Holiday Gifts by Fox News** -`).

## 1. The FOX article (Article 728638685404)

| Field | Before | After |
|---|---|---|
| Title (H1) | `Memobrick Named One of the Best Holiday Gifts by Fox News` | `As Seen on FOX: Memobrick in a Holiday Gift Guide` |
| Handle | `memobrick-named-one-of-the-best-holiday-gifts-by-fox-news` | `memobrick-as-seen-on-fox` (with the 301 from the old URL, `redirectNewHandle: true`) |
| SEO title (`global.title_tag`) | `** Named One of the Best Holiday Gifts by Fox News** - ` | `As Seen on FOX: Memobrick Custom Brick Mosaic Gift` (50 characters) |
| Meta description (`global.description_tag`) | ` When it comes to holiday shopping, finding a gift that’s both unique and memorable can be a challenge. That’s why Memobrick, a company that  - Memobrick` | `Memobrick was featured in a FOX holiday gift guide. See why a custom brick mosaic made from your own photo makes a gift they will remember.` (139 characters) |
| Featured image alt | `**Memobrick Named One of the Best Holiday Gifts by Fox News** - Memobrick` | `Custom brick mosaic by Memobrick, as seen on FOX` |
| Tags | `best gift, fox news, lego, lego picture, memobrick` | `best gift, as seen on fox, lego, lego picture, memobrick` |
| Body, paragraph 1 | `was featured in Steve Noviello's holiday gift guide on Fox News, recognised as one of the top gifts of the season.` | `was featured in Steve Noviello's holiday gift guide on FOX, recognised as one of the top gifts of the season.` |
| Body, last paragraph, link text | `on <a href="https://www.fox4news.com/gift-guide/steve-noviello-favorite-products-2022" target="_blank" rel="noopener">Fox 4 News</a>.` | `on <a href="https://www.fox4news.com/gift-guide/steve-noviello-favorite-products-2022" target="_blank" rel="noopener">FOX</a>.` |

Before the handle change, check that no redirect exists at `/blogs/news/memobrick-as-seen-on-fox` (none on 2026-10-28).

## 2. Other blog articles that write "Fox News"

| Article | Before | After |
|---|---|---|
| `the-ideal-present` (586995597532), paragraph 3, link text | `<span data-contrast="none">Fox News</span>` | `<span data-contrast="none">FOX</span>` |
| `fathers-day-gift-ideas-that-go-beyond-the-usual-tools-and-gadgets` (751000387804), last paragraph | `See how Memobrick has been recognized as <a href="/blogs/news/memobrick-named-one-of-the-best-holiday-gifts-by-fox-news">one of the best holiday gifts by Fox News</a>.` | `See why Memobrick was picked for a holiday gift guide, <a href="/blogs/news/memobrick-as-seen-on-fox">as seen on FOX</a>.` |

`fathers-day-...` is a GemPages article: its visible text has no "Fox News" (checked on the live HTML 2026-10-28); the phrase sits in the Shopify article body, which the page prints in its Article schema description. Editing the body through the API fixes that schema text and changes nothing visitors see. `the-ideal-present` and the FOX article use the theme's default template, so their body edits are visible.

`theperfect-holiday` (a GemPages v6 article) also shows "FOX NEWS GIFT GUIDE" in a GemPages text block. It is merged into the Christmas hub by `consolidate-christmas-articles.md`; if that item is rejected, the text needs a GemPages edit by Eden (item 4 in `gempages-changes-2026-10-28.md`).

## Not part of this change

The homepage says "As seen on Fox News", "MemoBrick on Fox News." and has a logo with alt "Fox News". That is the theme's homepage, owned by site-developer; it is flagged in the run report.

## Verify

- The old URL returns one 301 to `/blogs/news/memobrick-as-seen-on-fox`, which returns 200 with the new title tag and description.
- `curl` of the 3 articles finds no "Fox News" (case-insensitive) in the HTML, except the fox4news.com URL itself.

## Undo

Restore the fields from the backup and delete the new redirect.
