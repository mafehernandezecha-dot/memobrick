# Blog indexing check, 2026-10-28

Special run for Eden ("make sure the blogs are published and running on Google"). Read only. Nothing on the live site was changed.

## How this was checked

- **Live site:** reachable today. I fetched every published article on mymemobrick.com (56, from Shopify's article list) with a normal browser user agent, plus `robots.txt`, `sitemap.xml`, `sitemap_blogs_1.xml`, `sitemap_articles_1.xml` and the blog index pages `/blogs/news?page=1` to `5`.
- **Store records:** Shopify Admin API, read only: articles (handle, title, published, template), SEO title and description fields, and URL redirects.
- **Google:** Google and Bing could not be reached from here (the network proxy refuses them). Search Console data is not in `marketing/data/` yet (`latest.md` says "Updated: never"). So **every index status below is an estimate**, built from: the page is crawlable (200, no noindex, self canonical, in the sitemap), the page has links and a description, and whether the page showed up in a third-party web search index (the WebSearch tool, which is not Google) for `site:mymemobrick.com/blogs` and related queries.
- **Not checked:** the page after JavaScript runs. GemPages draws buttons and product cards with JavaScript; Google renders JavaScript, so some of those links may exist for Google even though they are missing from the HTML. The finding below is about the HTML.

## What is fine

- All 56 published articles return **200**, have **no noindex** (no robots meta, no X-Robots-Tag), and have a **self-referencing canonical**.
- All 56 are in `sitemap_articles_1.xml`, which `sitemap.xml` lists. `robots.txt` allows `/blogs/` and points to the sitemap.
- The blog index `/blogs/news` links to all 54 `news` articles over 5 pages, so Google can find them by crawling too.
- The earlier fixes are live: the Ikram duplicate 301s to `theperfect-holiday`, `/pages/blog-post` 301s to the summer souvenirs article, and the old `why-personalized-gifts-create-stronger-emotional-connections(-2)` URLs 301 to `test-blog-post-07072026`.
- The homepage carries four `google-site-verification` tags, so the site **is verified in Search Console for some Google account**. Which account, and whether Eden's login sees the property, is unknown.

## What is broken (ranked by likely sales impact)

1. **Two title tags and two meta descriptions on every page of the site.** The SearchPie SEO app (app embed `sb-snippets`) writes a second `<title>` and `<meta name="description">` after the theme's. On 36 articles SearchPie's description is just `  Memobrick` (two spaces and the shop name). On product pages its description differs from the Shopify SEO description. Google has to guess which to use. Fix: `site-changes/disable-searchpie-meta-tags.md`.
2. **36 of 56 articles have no meta description at all, and 8 more only have a 320-character auto excerpt cut mid-sentence.** The GemPages articles keep their text inside GemPages, so `article.content` is empty, the theme has nothing to fall back on, and the SEO description field is empty too. Only 12 articles have a written description (the 3 October articles, the 8 oldest, and the Thanksgiving article). Content work: listed in `content-fixes.md` (first listed 2026-10-11, still open).
3. **35 articles (all GemPages) have 3 links or fewer in their HTML: no menu, no footer, no link to the editor, the free-proof page or a product page.** Product cards and buttons are GemPages JavaScript widgets, not `<a href>` links. 13 pages have zero links of any kind; the best have a single "see the frame" link. For Google this means the articles pass no strength to products, and a reader who lands from Google has no visible route to `/pages/editor` unless the GemPages widgets load. The three new articles (default template) are fine: 33 to 43 links each, editor link, product links. Fix: Eden adds one plain text link line in GemPages (`gempages-changes-2026-10-28.md`, items 1 and 2).
4. **Christmas cannibalization.** Ten published pages target "personalized Christmas gift / build a Christmas memory together". See the consolidation plan below.
5. **Messy handles in Google results.** `baby-carrier-...` (a baby article and a motorcycle article), `test-blog-post-07072026`, `copy-of-...`, four `duplicate-from-...`, two `...and-39-...` and six random suffixes. Fix: `site-changes/clean-article-handles.md`.
6. **The FOX article** shows in search with the broken SEO title `** Named One of the Best Holiday Gifts by Fox News** -`, and its title, handle, tags, image alt and body say "Fox News". Fix: `site-changes/retitle-fox-article.md`.
7. **Heading problems.** 20 articles have no H1 in the HTML; `why-personalized-gifts-...` and `baby-carrier-aug-14-20-11-55` have 8 H1s each and `baby-carrier-jul-10-22-19-45` has 4 (GemPages product card titles). Eden fixes these in GemPages (`gempages-changes-2026-10-28.md`, item 3).
8. **Old redirects wasting links.** Ten `/blogs/news/theperfect-holiday-thoughtful-gifts...` URLs (Facebook shares) redirect to the homepage instead of a holiday article. Included in the consolidation change.

## Indexing (estimates)

| Estimate | Articles | Why |
|---|---|---|
| Seen in a search index today | 4: `the-ideal-present`, `memobrick-named-one-of-the-best-holiday-gifts-by-fox-news`, `turn-your-favorite-family-stories-into-something-you-can-see`, `theperfect-holiday` (indexed under the old Ikram URL, which now 301s to it). Plus the blog index `/blogs/news` | Returned by the third-party index for `site:mymemobrick.com/blogs` queries |
| Likely indexed | 5 more of the oldest articles (2022 to 2025): `best-family-activity-with-memobrick`, `memobrick-ideas-for-game-night`, the two single-article blogs, `blog-memorial` | Years old, crawlable, have descriptions and menu links |
| Unknown, at risk | 44, nearly all published 2026-07 to 2026-09 | Crawlable and in the sitemap, but no description, few or no links, ten near-identical Christmas angles. Pages like this often end up as "Crawled, currently not indexed". None of them came up in the third-party index except `turn-your-favorite-family-stories-...` |
| Too new to judge | 3: `personalized-christmas-photo-gifts` (Oct 14), `gift-for-someone-who-has-everything` (Oct 21), `brick-mosaic-sizes` (Oct 26) | Healthy pages; not yet seen in the index |

To replace these estimates with facts, I added a read-only request for the Search Console Pages report and URL inspection results to `marketing/data/requests.md`, and the Chrome task `chrome-tasks/2026-10-28-search-console-indexing.md` asks Google to index the hubs.

## Christmas consolidation plan

Keep two hubs, one per search intent, and merge the rest into them:

| Hub | URL | Intent | Why this page |
|---|---|---|---|
| **A: Christmas gifts** | `/blogs/news/personalized-christmas-photo-gifts` | "personalized Christmas photo gifts", "custom photo Christmas gift" | Built for the head term: clean title and description, one H1, FAQ and Article schema, 43 real links, editor link. Newest and healthiest page |
| **B: Christmas family activity** | `/blogs/news/a-holiday-activity-everyone-can-actually-join` | "Christmas family activity", "gift to build together" | 1,900 words, one H1, the clearest activity angle. Needs a meta description and real links to hub A and the editor (content-fixes) |

Merge with 301 (article set to hidden, never deleted):

| From (/blogs/news/) | 301 to | Overlap |
|---|---|---|
| `theperfect-holiday` | hub A | 2023 "holiday gift" page with no H1; older links point at it |
| `the-christmas-gift-that-turns-a-favorite-moment-into-an-experience` | hub A | Same gift intent as A; its FAQ and size section are worth folding into A |
| `this-christmas-give-them-a-memory-they-can-build` | hub A | Same gift intent, no H1 or H2 of its own |
| `dont-wait-until-december-personalized-christmas-gifts-to-order-now` | hub A | Order-early intent; A's "Plan ahead" section covers it with the real Dec 15 date. When the new `last-minute-personalized-christmas-gifts` article is live, the redirect can be moved there |
| `make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov` | hub A | Same gift intent ("gift for everyone on your list" is A's own H1) |
| `the-most-fun-christmas-gifts-are-the-ones-you-create-together` | hub B | "Create together" is B's intent; no H1 |
| `give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl` | hub B | "Build together", mostly a product grid |
| `make-your-holiday-gathering-more-than-just-dinner` | hub B | Holiday table activity, same as B |

Keep, linked to the hubs: `gift-for-someone-who-has-everything`, the FOX article (renamed), `thoughtful-thanksgiving-gifts-...` (Thanksgiving is its own intent), and the three new drafts (`last-minute-personalized-christmas-gifts`, `christmas-gifts-for-grandparents-from-grandkids`, `photo-christmas-gift-for-wife`), which target recipients or deadlines the hubs do not.

Timing: doing this now (Oct 28) gives Google about five weeks to move the signals before the December peak. Waiting for Search Console data would leave too little time. The text overlap between these pages is low (5-word shingle Jaccard 0.09 or less, `article-inventory.md`), so the problem is intent overlap, not copied text.

Full steps: `site-changes/consolidate-christmas-articles.md`.

## Per-article results

"Links in HTML" counts links anywhere in the raw HTML; on the old template the editor link is the site menu. "2 tags" means the theme's title plus SearchPie's.

| # | Article (/blogs/news/ unless noted) | HTTP | noindex | Canonical | Title tags on page | Meta description | Sitemap | Links in HTML: products / editor / free proof | Index (estimate) | Plan |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `best-family-activity-with-memobrick` | 200 | no | self | 2 tags | ok (156) | yes | 2 / yes / no | likely indexed | keep |
| 2 | `the-ideal-present` | 200 | no | self | 2 tags | ok (167) | yes | 2 / yes / no | seen in a search index | keep |
| 3 | `memobrick-ideas-for-game-night` | 200 | no | self | 2 tags | ok (141) | yes | 2 / yes / no | likely indexed | keep |
| 4 | `theperfect-holiday` | 200 | no | self | 2 tags | ok (215) | yes | 4 / no / no | seen in a search index | merge, 301 to hub A |
| 5 | `/blogs/experience-the-ultimate-bonding-activity-with-memobrick/experience-the-ultimate-bonding-activity-with-memobrick` | 200 | no | self | 2 tags | ok (159) | yes | 3 / yes / no | likely indexed | keep |
| 6 | `/blogs/the-top-superlative-ways-to-disconnect-kids-from-technology/the-top-superlative-ways-to-disconnect-kids-from-technology` | 200 | no | self | 2 tags | ok (156) | yes | 2 / yes / no | likely indexed | keep |
| 7 | `memobrick-named-one-of-the-best-holiday-gifts-by-fox-news` | 200 | no | self | 2 tags | ok (151) | yes | 3 / yes / no | seen in a search index | rename to `memobrick-as-seen-on-fox` (301) |
| 8 | `blog-memorial` | 200 | no | self | 2 tags | ok (183) | yes | 4 / no / no | likely indexed | keep |
| 9 | `graduation-gift-ideas-theyll-treasure-forever` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 3 / yes / no | unknown, at risk | keep |
| 10 | `fathers-day-gift-ideas-that-go-beyond-the-usual-tools-and-gadgets` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 6 / no / no | unknown, at risk | keep |
| 11 | `baby-carrier-jul-10-22-19-45` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `babys-first-year-photo-mosaic` (301) |
| 12 | `test-blog-post-07072026` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 2 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `why-personalized-gifts-create-stronger-emotional-connections` (301) |
| 13 | `duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `summer-vacation-souvenirs-you-build` (301) |
| 14 | `duplicate-from-military-homecoming-gifts-that-celebrate-being-together-again` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `military-homecoming-gifts` (301) |
| 15 | `fun-screen-free-family-activities-that-bring-everyone-together-kbstga` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `fun-screen-free-family-activities` (301) |
| 16 | `creative-wedding-thank-you-gifts-for-parents-and-bridesmaids-ifqdgg` | 200 | no | self | 2 tags | auto excerpt, cut at 320 | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `wedding-thank-you-gifts-for-parents-and-bridesmaids` (301) |
| 17 | `the-best-personalized-valentineand-39-s-day-gifts-that-last-beyond-flowers` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `personalized-valentines-day-gifts-that-last` (301) |
| 18 | `looking-beyond-photo-frames-try-these-personalized-photo-gift-ideas-vrrphy` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `personalized-photo-gift-ideas-beyond-frames` (301) |
| 19 | `moving-away-give-a-personalized-gift-theyand-39-ll-always-remember` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `moving-away-personalized-gift` (301) |
| 20 | `heartwarming-personalized-gifts-every-grandparent-will-love-mxezkd` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep handle until Jan 4, 2027 (seasonal), then rename `personalized-gifts-for-grandparents` |
| 21 | `duplicate-from-celebrate-the-pets-who-fill-your-home-with-love` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `celebrate-the-pets-who-fill-your-home-with-love` (301) |
| 22 | `how-custom-photo-mosaics-become-beautiful-home-decor-qsfiky` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no | unknown, at risk | rename to `custom-photo-mosaic-home-decor` (301) |
| 23 | `thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10` | 200 | no | self | 2 tags | ok (157) | yes | 0 / no / no | unknown, at risk | keep handle until after Thanksgiving, then rename `thanksgiving-gifts-that-bring-families-together` |
| 24 | `duplicate-from-how-to-preserve-your-favorite-travel-memories-in-a-unique-way` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `how-to-preserve-your-favorite-travel-memories` (301) |
| 25 | `birthday-photos-that-deserve-to-become-more-than-memories` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no | unknown, at risk | keep |
| 26 | `from-screen-to-keepsake-turn-their-favorite-character-into-something-special` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 27 | `copy-of-why-your-funniest-photos-might-make-the-best-keepsakes` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `made-with-heart-the-human-touch-behind-every-memobrick` (301) |
| 28 | `what-if-your-next-gift-was-also-an-experience` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 29 | `the-best-keepsakes-come-from-the-moments-you-least-expect` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 30 | `why-personalized-gifts-feel-so-much-better-than-generic-gifts` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 31 | `turn-your-childs-imagination-into-something-you-can-build` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 32 | `the-christmas-gift-that-turns-a-favorite-moment-into-an-experience` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 2 / no / no (no menu or footer links in HTML) | unknown, at risk | merge, 301 to hub A |
| 33 | `some-memories-deserve-more-than-a-place-on-your-phone` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no | unknown, at risk | keep |
| 34 | `the-gift-they-will-want-to-show-everyone` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 2 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 35 | `the-gift-that-starts-a-conversation` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 36 | `why-your-funniest-photos-might-make-the-best-keepsakes` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 37 | `the-most-fun-christmas-gifts-are-the-ones-you-create-together` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | merge, 301 to hub B |
| 38 | `from-little-drawings-to-lasting-memories-turn-their-art-into-a-keepsake` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 39 | `the-little-moments-in-life-that-deserve-a-place-on-your-wall` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 6 / no / no | unknown, at risk | keep |
| 40 | `baby-carrier-aug-14-20-11-55` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | rename to `gift-for-motorcycle-riders` (301) |
| 41 | `the-art-on-your-wall-should-have-a-story` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 42 | `this-christmas-give-them-a-memory-they-can-build` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | merge, 301 to hub A |
| 43 | `turn-your-favorite-couple-photos-into-something-you-can-treasure` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 44 | `make-your-holiday-gathering-more-than-just-dinner` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no | unknown, at risk | merge, 301 to hub B |
| 45 | `the-photos-you-almost-deleted-could-become-your-favorite-keepsakes` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 2 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 46 | `the-perfect-gift-for-someone-who-loves-their-car` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 2 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 47 | `mothers-day-gifts-that-turn-favorite-memories-into-keepsakes` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 48 | `a-holiday-activity-everyone-can-actually-join` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep: hub B (Christmas family activity) |
| 49 | `building-art-one-piece-at-a-time` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | keep |
| 50 | `turn-your-favorite-family-stories-into-something-you-can-see` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no | seen in a search index | keep |
| 51 | `give-more-than-a-gift-personalized-christmas-memories-to-build-together-yfpbkl` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no (no menu or footer links in HTML) | unknown, at risk | merge, 301 to hub B |
| 52 | `dont-wait-until-december-personalized-christmas-gifts-to-order-now` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 1 / no / no (no menu or footer links in HTML) | unknown, at risk | merge, 301 to hub A |
| 53 | `make-christmas-memories-last-personalized-gifts-theyll-treasure-for-years-qcaqov` | 200 | no | self | 2 tags | missing (only "Memobrick") | yes | 0 / no / no | unknown, at risk | merge, 301 to hub A |
| 54 | `personalized-christmas-photo-gifts` | 200 | no | self | 2 tags | ok (135) | yes | 3 / yes / no | too new to judge | keep: hub A (Christmas gifts) |
| 55 | `gift-for-someone-who-has-everything` | 200 | no | self | 2 tags | ok (129) | yes | 3 / yes / no | too new to judge | keep |
| 56 | `brick-mosaic-sizes` | 200 | no | self | 2 tags | ok (125) | yes | 3 / yes / no | too new to judge | keep |
