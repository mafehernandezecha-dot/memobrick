# Site change: Clean up 14 messy article handles, with 301 redirects

Source: `marketing/seo/technical/blog-indexing-2026-10-28.md` (broken item 5) and `article-inventory.md`. Proposed 2026-10-28.

Where: Shopify admin, Blog posts (handle field) and Navigation > URL redirects, done by seo-technical through the Admin API after a backup. Content, titles (except row 9) and templates stay as they are.

Why: handles such as `baby-carrier-aug-14-20-11-55`, `test-blog-post-07072026` and `duplicate-from-...` show in Google's results and look like test pages, which lowers clicks. A 301 from each old URL keeps any links and ranking the old URL has.

## Before and after

| # | Article ID | Old URL (/blogs/news/, live today) | New handle | Title |
|---|---|---|---|---|
| 1 | 751000420572 | `baby-carrier-jul-10-22-19-45` | `babys-first-year-photo-mosaic` | Celebrate Baby's First Year with a Custom Photo Mosaic |
| 2 | 751466676444 | `baby-carrier-aug-14-20-11-55` | `gift-for-motorcycle-riders` | For the Rider Who Has a Story Behind Every Ride |
| 3 | 751000453340 | `test-blog-post-07072026` | `why-personalized-gifts-create-stronger-emotional-connections` | Why Personalized Gifts Create Stronger Emotional Connections |
| 4 | 751466250460 | `copy-of-why-your-funniest-photos-might-make-the-best-keepsakes` | `made-with-heart-the-human-touch-behind-every-memobrick` | Made With Heart: The Human Touch Behind Every Memobrick |
| 5 | 751257485532 | `duplicate-from-the-best-summer-vacation-souvenirs-arenand-39-t-bought-theyand-39-re-built` | `summer-vacation-souvenirs-you-build` | The Best Summer Vacation Souvenirs Aren't Bought... |
| 6 | 751257583836 | `duplicate-from-military-homecoming-gifts-that-celebrate-being-together-again` | `military-homecoming-gifts` | Military Homecoming Gifts That Celebrate Being Together Again |
| 7 | 751258173660 | `duplicate-from-celebrate-the-pets-who-fill-your-home-with-love` | `celebrate-the-pets-who-fill-your-home-with-love` | Celebrate the Pets Who Fill Your Home with Love |
| 8 | 751466119388 | `duplicate-from-how-to-preserve-your-favorite-travel-memories-in-a-unique-way` | `how-to-preserve-your-favorite-travel-memories` | How to Preserve Your Favorite Travel Memories in a Unique Way |
| 9 | 751257977052 | `the-best-personalized-valentineand-39-s-day-gifts-that-last-beyond-flowers` | `personalized-valentines-day-gifts-that-last` | Title fix: `The Best Personalized Valentine&#39;s Day Gifts That Last Beyond Flowers` → `The Best Personalized Valentine's Day Gifts That Last Beyond Flowers` |
| 10 | 751258075356 | `moving-away-give-a-personalized-gift-theyand-39-ll-always-remember` | `moving-away-personalized-gift` | Moving Away? Give a Personalized Gift They'll Always Remember |
| 11 | 751257649372 | `fun-screen-free-family-activities-that-bring-everyone-together-kbstga` | `fun-screen-free-family-activities` | Fun Screen-Free Family Activities That Bring Everyone Together |
| 12 | 751257747676 | `creative-wedding-thank-you-gifts-for-parents-and-bridesmaids-ifqdgg` | `wedding-thank-you-gifts-for-parents-and-bridesmaids` | Creative Wedding Thank You Gifts for Parents and Bridesmaids |
| 13 | 751258009820 | `looking-beyond-photo-frames-try-these-personalized-photo-gift-ideas-vrrphy` | `personalized-photo-gift-ideas-beyond-frames` | Looking Beyond Photo Frames? Try These Personalized Photo Gift Ideas |
| 14 | 751260696796 | `how-custom-photo-mosaics-become-beautiful-home-decor-qsfiky` | `custom-photo-mosaic-home-decor` | How Custom Photo Mosaics Become Beautiful Home Decor |

None of the new handles is used by another article. Only row 3's new path has a redirect today (see step 1).

Not renamed now, because their season is close and a URL change resets their position for a while: `heartwarming-personalized-gifts-every-grandparent-will-love-mxezkd` (Christmas grandparent gifts; rename to `personalized-gifts-for-grandparents` after Jan 4, 2027) and `thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10` (rename to `thanksgiving-gifts-that-bring-families-together` after Nov 27). These will be separate items.

## Steps

0. **Backup:** save each article's handle, title and SEO fields and the redirects named below to `marketing/seo/technical/backups/2026-10-28-article-handles/` and commit before writing.
1. **Row 3 first:** delete `UrlRedirect/487176011996` (`/blogs/news/why-personalized-gifts-create-stronger-emotional-connections` → `/blogs/news/test-blog-post-07072026`), because that path becomes the article's own URL.
2. **For each row:** change the handle with `articleUpdate` and `redirectNewHandle: true`, so Shopify creates the 301 from the old URL to the new one. For row 9 also set the title as shown.
3. **Repoint redirects that would otherwise chain:**
   - `UrlRedirect/607155781852`: `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections-2` → `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections`
   - `UrlRedirect/607155847388`: `/pages/blog-post` → `/blogs/news/summer-vacation-souvenirs-you-build`
4. **Hand-written links:** in hub A (Article 751864185052) change the link `https://mymemobrick.com/blogs/news/duplicate-from-celebrate-the-pets-who-fill-your-home-with-love` to `https://mymemobrick.com/blogs/news/celebrate-the-pets-who-fill-your-home-with-love`. GemPages "related articles" lists update on their own. Any other old link keeps working through its 301.

## Verify

- Each old URL returns one 301 to its new URL, and each new URL returns 200 with a self canonical.
- `/blogs/news/why-personalized-gifts-create-stronger-emotional-connections-2` and `/pages/blog-post` reach their article in one hop.
- `sitemap_articles_1.xml` lists the new handles.

## Undo

Set the handle back from the backup and delete the redirect Shopify created.
