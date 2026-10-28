# Site change: Stop SearchPie writing a second title and meta description on every page

Source: `blog-indexing-2026-10-28.md` broken item 1. Proposed 2026-10-28.

## What is wrong

Every page on mymemobrick.com has two `<title>` tags and two `<meta name="description">` tags. The theme writes the first set from the Shopify SEO fields. The SearchPie SEO & Speed app embed (`shopify://apps/searchpie-seo-speed/blocks/sb-snippets`, snippet `sb-write-meta-tags`) writes a second set further down the `<head>`.

Examples from 2026-10-28 (open in a browser, View Source, search for `SearchPie meta tags`):

| Page | Theme description (first) | SearchPie description (second) |
|---|---|---|
| https://mymemobrick.com/blogs/news/the-most-fun-christmas-gifts-are-the-ones-you-create-together | none | `  Memobrick` |
| https://mymemobrick.com/blogs/news | `News — brick mosaic tips, size guides and stories from MemoBrick customers.` | `  Memobrick` |
| https://mymemobrick.com/pages/editor | `Design your own custom brick photo mosaic in the free online Creator ...` | empty |
| https://mymemobrick.com/products/2-2-boards | `Turn your photo into a 20x20 inch brick mosaic kit with 4,096 bricks. ...` | `Turn a favorite photo into a 20x20 inch custom brick mosaic you build yourself. ...` |

Google has to choose between them, and on 36 blog articles the only description it can find is `  Memobrick`. The theme already writes the title, description, canonical, Open Graph tags and breadcrumbs, so SearchPie's copies add nothing.

## Before

Live theme, `config/settings_data.json`, `current.blocks`:

```json
"1793219247286972479": { "type": "shopify://apps/searchpie-seo-speed/blocks/sb-snippets/29f6c508-9bb9-4e93-9f98-b637b62f3552", "disabled": false, ... }
```

(Values from the repo copy of the theme; read the live file first and stop if it differs.)

## After

Preferred, smallest change: in Shopify admin > Apps > SearchPie, turn off the meta tag output (the feature that writes title and meta description tags) and leave its other features as they are. If SearchPie has no separate switch for that, use the fallback.

Fallback: set that app embed to `"disabled": true` in the live theme's `config/settings_data.json` (same as Online Store > Themes > Customize > App embeds > SearchPie SEO & Speed: off). Nothing else in the file changes. This also turns off SearchPie's other snippets in that embed (`sb-detect-broken-link`, `internal-link`, `social-tags`, `sb-nx`, `sb-local-seo`); the theme already outputs Open Graph tags and breadcrumbs.

Backup first: save the live `config/settings_data.json` to `marketing/seo/technical/backups/2026-10-28-searchpie/` and commit it.

## Verify

On the 4 example pages and the homepage: exactly one `<title>` and at most one `<meta name="description">`, the theme's. Open Graph tags still present once each.

## Undo

Turn the setting (or the embed) back on, or restore the backed-up `settings_data.json`.
