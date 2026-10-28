Status: ready (A-2026W44-026, approved by Eden 2026-10-28)

# Search Console task for Eden: paste this into Claude in Chrome

The nightly Chrome job only runs Google Ads tasks, so it will not run this one. You run it on your Mac, about 15 minutes each part.

## Paste this

1. **First (2 minutes):** switch off SearchPie's meta tags, steps in `marketing/seo/technical/eden-steps-2026-10-28.md` section 1. Doing it before Google recrawls means Google sees one clean title per page. If you cannot do it today, run Part A anyway.
2. Open Chrome, open the Claude in Chrome extension, and paste **Part A** below. Today (Oct 28) or any day.
3. On a **later day** (Oct 29 or after; Google allows about 10 indexing requests a day), paste **Part B**. The site changes it needs (Christmas consolidation, FOX retitle, clean handles) were all applied on Oct 28, so Part B is ready.
4. After each part, paste Claude's result into the `## Result` section at the end of this file (on GitHub: pencil, edit, commit to main).

### Part A

```
You are helping me in Google Search Console for my store mymemobrick.com. I approved these steps. Do exactly this and nothing else.

Rules for the whole task:
- Never sign in, sign out, type a password or code, or solve a CAPTCHA. If you see a login page or an account chooser, try only the Google accounts already signed in in this Chrome; if none of them shows the mymemobrick.com property, stop and tell me "Search Console: property not found in any signed-in account".
- Never use Removals, never add or remove users or owners, never change any setting, never delete or add a sitemap other than the one named below, never click "Validate fix", and never touch another property.
- If Google shows a quota message ("Quota exceeded"), stop requesting, write down which URLs were done, and finish.

STEP 0. Find the property
Open https://search.google.com/search-console. Choose the property for mymemobrick.com (a "Domain" property mymemobrick.com, or the URL-prefix property https://mymemobrick.com/). Write down which one you used and which Google account it was in.

STEP 1. Sitemap
Indexing > Sitemaps. Write down every sitemap listed with its status, last read date and discovered pages. If https://mymemobrick.com/sitemap.xml is listed, open it and use "Resubmit" if that option exists; if it is not listed, type sitemap.xml in "Add a new sitemap" and click Submit. Do not remove any sitemap.

STEP 2. Pages report (read only)
Indexing > Pages. Write down the totals for Indexed and Not indexed, and every "Why pages aren't indexed" reason with its count. Open the reasons "Crawled - currently not indexed", "Discovered - currently not indexed" and "Duplicate without user-selected canonical" (if present) and write down every URL in them that contains /blogs/.

STEP 3. Inspect and request indexing (PART A, any day)
For each URL below, paste it into the "Inspect any URL" bar at the top. Write down the result line exactly ("URL is on Google", "URL is not on Google", or the coverage reason) and the "Last crawl" date. If the page is reachable, click "Request indexing" and wait for "Indexing requested". If the inspection says the page is a redirect or returns 404, do not request indexing; just write it down.
 1. https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts
 2. https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join
 3. https://mymemobrick.com/blogs/news/gift-for-someone-who-has-everything
 4. https://mymemobrick.com/blogs/news/brick-mosaic-sizes
 5. https://mymemobrick.com/blogs/news/thoughtful-thanksgiving-gifts-that-bring-families-closer-together-aug-8-10
 6. https://mymemobrick.com/blogs/news
 7. https://mymemobrick.com/blogs/news/last-minute-personalized-christmas-gifts
 8. https://mymemobrick.com/blogs/news/christmas-gifts-for-grandparents-from-grandkids
 9. https://mymemobrick.com/blogs/news/photo-christmas-gift-for-wife
URLs 7 to 9 are new articles; if one is not published yet (404), skip it and say so.

STEP 4. Inspect only (no request), write down the result line for each:
 - https://mymemobrick.com/blogs/news/dont-wait-until-december-personalized-christmas-gifts-to-order-now
 - https://mymemobrick.com/blogs/news/the-christmas-gift-that-turns-a-favorite-moment-into-an-experience
 - https://mymemobrick.com/blogs/news/the-most-fun-christmas-gifts-are-the-ones-you-create-together
 - https://mymemobrick.com/blogs/news/theperfect-holiday
 - https://mymemobrick.com/blogs/news/memobrick-named-one-of-the-best-holiday-gifts-by-fox-news

At the end, give me one block of text with everything you wrote down, step by step, so I can paste it into GitHub.
```

### Part B (a different day from Part A)

```
You are helping me in Google Search Console for my store mymemobrick.com. I approved these steps. Do exactly this and nothing else.

Rules for the whole task:
- Never sign in, sign out, type a password or code, or solve a CAPTCHA. If you see a login page or an account chooser, try only the Google accounts already signed in in this Chrome; if none of them shows the mymemobrick.com property, stop and tell me "Search Console: property not found in any signed-in account".
- Never use Removals, never add or remove users or owners, never change any setting, never delete or add a sitemap other than the one named below, never click "Validate fix", and never touch another property.
- If Google shows a quota message ("Quota exceeded"), stop requesting, write down which URLs were done, and finish.

Run only PART B below (PART A was done on an earlier day).

Inspect each URL and click "Request indexing" if it is reachable:
 1. https://mymemobrick.com/blogs/news/memobrick-as-seen-on-fox
 2. https://mymemobrick.com/blogs/news/why-personalized-gifts-create-stronger-emotional-connections
 3. https://mymemobrick.com/blogs/news/babys-first-year-photo-mosaic
 4. https://mymemobrick.com/blogs/news/gift-for-motorcycle-riders
 5. https://mymemobrick.com/blogs/news/celebrate-the-pets-who-fill-your-home-with-love
 6. https://mymemobrick.com/blogs/news/personalized-photo-gift-ideas-beyond-frames
 7. https://mymemobrick.com/blogs/news/personalized-valentines-day-gifts-that-last
 8. https://mymemobrick.com/blogs/news/personalized-christmas-photo-gifts
 9. https://mymemobrick.com/blogs/news/a-holiday-activity-everyone-can-actually-join
Then Indexing > Sitemaps: Resubmit sitemap.xml again.

At the end, give me one block of text with everything you wrote down, step by step, so I can paste it into GitHub.
```

## Background

Claude in Chrome task: Search Console, resubmit the sitemap and request indexing for the Christmas hubs (proposal P-seo-technical-20261028-5)

Approval: A-2026W44-026, approved by Eden in chat on 2026-10-28 ("approve 022 to 026"). Set ready by seo-technical on 2026-10-28.

How to run it: the nightly `memobrick-chrome-tasks` job only runs Google Ads tasks from `marketing/analytics/ads-analyst/chrome-tasks/`, so it will not pick this file up. Eden runs it herself: open Chrome on the Mac, open the Claude in Chrome extension, and paste the text in the box. It takes about 15 minutes. Part B is run on a later day; the site changes it depends on were applied on 2026-10-28.

Search Console status: the homepage has four `google-site-verification` tags, so mymemobrick.com is verified for some Google account. Which account, and whether Eden's login can open the property, is unknown. Step 0 checks this and stops if the property is not there.

Google limits "Request indexing" to roughly 10 URLs per property per day, so each part asks for at most 10.

After the run, paste the result into a `## Result` section at the end of this file (on GitHub: pencil, edit, commit to main), and change the first line to `Status: done <YYYY-MM-DD>`. seo-technical reads it on the next run and replaces the estimates in `blog-indexing-2026-10-28.md` with the real index status.

## Result

Part A (date):

(paste here)

Part B (date):

(paste here)
