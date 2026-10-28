# Site change: Consolidate the Christmas articles into two hubs

Source: `marketing/seo/technical/blog-indexing-2026-10-28.md` (Christmas consolidation plan). Proposed 2026-10-28.

Where: Shopify admin (Blog posts, Navigation > URL redirects), done by seo-technical through the Admin API after a backup.

Open both URLs of each row before approving. Every "from" page is live today (200).

## Hubs (kept)

- Hub A: https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts (Article 751864185052)
- Hub B: https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join (Article 751467167964)

## Before

These 8 articles are published and compete with the hubs:

| # | Article ID | URL |
|---|---|---|
| 1 | 591249015004 | https://mymemobrick.com/blogs/news/theperfect-holiday |
| 2 | 751466414300 | https://mymemobrick.com/blogs/news/the-christmas-gift-that-turns-a-favorite-moment-into-an-experience |
| 3 | 751466741980 | https://mymemobrick.com/blogs/news/this-christmas-give-them-a-memory-they-can-build |
| 4 | 751467364572 | https://mymemobrick.com/blogs/news/dont-wait-until-december-personalized-christmas-gifts-to-order-now |
| 5 | 751467397340 | https://mymemobrick.com/blogs/news/make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov |
| 6 | 751466578140 | https://mymemobrick.com/blogs/news/the-most-fun-christmas-gifts-are-the-ones-you-create-together |
| 7 | 751467331804 | https://mymemobrick.com/blogs/news/give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl |
| 8 | 751466807516 | https://mymemobrick.com/blogs/news/make-your-holiday-gathering-more-than-just-dinner |

Existing redirects that this change touches:

- `UrlRedirect/607155814620`: `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` → `/blogs/news/theperfect-holiday`
- `UrlRedirect/445674651868`: `/blogs/news/theperfect-holiday-thoughtful-gifts` → `https://mymemobrick.com/`
- `UrlRedirect/445291987164`: `/blogs/news/theperfect-holiday-thoughtful%20gifts` → `https://mymemobrick.com/`
- 8 more `/blogs/news/theperfect-holiday-thoughtful-gifts?fbclid=...` paths → `https://mymemobrick.com/` (IDs 445706600668, 445706633436, 445706666204, 445706698972, 445707059420, 445707092188, 445707124956, 445707157724)

Hub A body links to six of the pages being merged (in "For the whole family to build together", "Plan ahead for Christmas" and "More Christmas ideas from our blog").

## After

0. **Backup first:** save each of the 8 articles (title, handle, body, SEO fields, template, published date) and hub A's body to `marketing/seo/technical/backups/2026-10-28-christmas-consolidation/`, plus the 11 redirects above, and commit before writing.
1. **Hide (unpublish) articles 1 to 8.** Do not delete them.
2. **Add 301 redirects:**

| From | To |
|---|---|
| `/blogs/news/theperfect-holiday` | `/blogs/news/personalized-christmas-photo-gifts` |
| `/blogs/news/the-christmas-gift-that-turns-a-favorite-moment-into-an-experience` | `/blogs/news/personalized-christmas-photo-gifts` |
| `/blogs/news/this-christmas-give-them-a-memory-they-can-build` | `/blogs/news/personalized-christmas-photo-gifts` |
| `/blogs/news/dont-wait-until-december-personalized-christmas-gifts-to-order-now` | `/blogs/news/personalized-christmas-photo-gifts` |
| `/blogs/news/make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov` | `/blogs/news/personalized-christmas-photo-gifts` |
| `/blogs/news/the-most-fun-christmas-gifts-are-the-ones-you-create-together` | `/blogs/news/a-holiday-activity-everyone-can-actually-join` |
| `/blogs/news/give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl` | `/blogs/news/a-holiday-activity-everyone-can-actually-join` |
| `/blogs/news/make-your-holiday-gathering-more-than-just-dinner` | `/blogs/news/a-holiday-activity-everyone-can-actually-join` |

3. **Repoint existing redirects** (no chains, no homepage dumps):
   - `UrlRedirect/607155814620` (Ikram URL): target `/blogs/news/theperfect-holiday` → `/blogs/news/personalized-christmas-photo-gifts`
   - `UrlRedirect/445674651868`, `445291987164` and the 8 `?fbclid=` ones: target `https://mymemobrick.com/` → `/blogs/news/personalized-christmas-photo-gifts`
4. **Fix hub A's links** so it does not link to redirected pages (technical link fix only, wording otherwise unchanged). In the body of Article 751864185052:
   - Before: `We share more in <a href="https://mymemobrick.com/blogs/news/the-most-fun-christmas-gifts-are-the-ones-you-create-together">the most fun Christmas gifts are the ones you create together</a> and <a href="https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join">a holiday activity everyone can actually join</a>.`
     After: `We share more in <a href="https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join">a holiday activity everyone can actually join</a>.`
   - Before: ` Read more in <a href="https://mymemobrick.com/blogs/news/dont-wait-until-december-personalized-christmas-gifts-to-order-now">don't wait until December: personalized Christmas gifts to order now</a>.`
     After: (removed; the sentence before it stays)
   - Before: the four `<li>` items under "More Christmas ideas from our blog" (this-christmas..., give-more-than-a-gift..., the-christmas-gift-that..., make-christmas-memories-last...)
     After:
     ```html
     <li><a href="https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join">A holiday activity everyone can actually join</a></li>
     <li><a href="https://mymemobrick.com/blogs/news/gift-for-someone-who-has-everything">A gift for the person who has everything</a></li>
     <li><a href="https://mymemobrick.com/blogs/news/brick-mosaic-sizes">Which brick mosaic size should you choose?</a></li>
     <li><a href="https://mymemobrick.com/blogs/news/thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10">Thoughtful Thanksgiving gifts that bring families closer together</a></li>
     ```
   If the seo-blog-writer has already republished hub A with other wording by the time this is applied, apply the same three link fixes to the current text and touch nothing else.

## Not part of this change

- Folding the best sections of the merged pages into the hubs. Hub A uses the default template, so the seo-blog-writer can add sections through the API (FAQ and size section of #2, the holiday checklist of #4). Hub B and all 8 merged pages are GemPages articles: anything moved into hub B is rebuilt by Eden in the GemPages editor, from the change list in `marketing/seo/technical/gempages-changes-2026-10-28.md`. The redirects and unpublishing in this item do not depend on that work and can go first; nothing visible is lost because the merged pages stay saved (hidden) in Shopify and GemPages.
- When `last-minute-personalized-christmas-gifts` is published, the redirect for #4 can be moved to it. That would be a new item.

## Verify

- Each "from" URL returns one 301 straight to its hub (no second hop), and both hubs return 200.
- The Ikram URL and `/blogs/news/theperfect-holiday-thoughtful-gifts` return one 301 to hub A.
- `sitemap_articles_1.xml` no longer lists the 8 hidden articles.
- Hub A HTML has no link to any of the 8 merged URLs.

## Undo

Republish the article from the backup and delete its redirect. Shopify only follows a redirect when the page is missing, so a republished article shows again at once; the redirect is deleted so it cannot cause a loop later.
