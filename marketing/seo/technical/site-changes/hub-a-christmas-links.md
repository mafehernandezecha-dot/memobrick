# Site change: link Christmas hub A down to the new Christmas articles

Proposed 2026-10-31 (task board 2026-10-30, seo-technical task 2).

Where: Shopify blog post body of hub A, Article 751864185052, template: default (not GemPages, so a body edit shows on the live page). Done by seo-technical through the Admin API after saving the current body to `marketing/seo/technical/backups/2026-10-31-hub-a/`.

Open before approving: https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts (live, 200).

Why: the hub's "More Christmas ideas" list has 4 links and none to the new Christmas pages. Links from the hub are how Google finds and ranks them before Dec 1. The live page already shows links to the wife, grandparents and last-minute articles somewhere outside the body, so those three are only added to the body list for crawl weight.

## Rule when applying

Add a line only if its URL returns 200 on the day of applying. A line whose article is not live yet is skipped and listed in the report; nothing links to a 404. As of 2026-10-31 these three are still 404: `personalized-stocking-stuffers`, `best-photo-for-a-brick-mosaic`, `christmas-gift-for-mom-from-kids` (all waiting for approval to publish).

## Before (body, section "More Christmas ideas from our blog")

```html
<h2>More Christmas ideas from our blog</h2>
<ul>
<li><a href="https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join">A holiday activity everyone can actually join</a></li>
<li><a href="https://mymemobrick.com/blogs/news/gift-for-someone-who-has-everything">A gift for the person who has everything</a></li>
<li><a href="https://mymemobrick.com/blogs/news/brick-mosaic-sizes">Which brick mosaic size should you choose?</a></li>
<li><a href="https://mymemobrick.com/blogs/news/thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10">Thoughtful Thanksgiving gifts that bring families closer together</a></li>
</ul>
```

## After (new lines go after the first item, in this order)

```html
<li><a href="https://mymemobrick.com/blogs/news/photo-christmas-gift-for-wife">A photo Christmas gift for your wife</a></li>
<li><a href="https://mymemobrick.com/blogs/news/christmas-gifts-for-grandparents-from-grandkids">Christmas gifts for grandparents, from the grandkids</a></li>
<li><a href="https://mymemobrick.com/blogs/news/christmas-gift-for-mom-from-kids">A Christmas gift for mom from the kids, in bricks</a></li>
<li><a href="https://mymemobrick.com/blogs/news/last-minute-personalized-christmas-gifts">Last-minute personalized Christmas gifts</a></li>
<li><a href="https://mymemobrick.com/blogs/news/personalized-stocking-stuffers">Personalized stocking stuffers</a></li>
<li><a href="https://mymemobrick.com/blogs/news/best-photo-for-a-brick-mosaic">The best photo for a brick mosaic</a></li>
```

Also in the same body, section "Plan ahead for Christmas", add one sentence at the end: `To receive your kit before Christmas, order by December 15, 2026.` (fact from `product-facts.md` and `offers-calendar.md`.)

Nothing else changes: title, handle, FAQ schema, template, and all other links stay. The FAQ JSON-LD in the body is not touched.

## Verify

Each added link returns 200 and appears in the live HTML once; the body still parses; page stays 200 with one canonical.

## Undo

Put the saved body back with `articleUpdate`.
