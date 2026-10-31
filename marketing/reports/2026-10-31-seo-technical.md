# Report: seo-technical 2026-10-31 (daily run, covers the missed Fri Oct 30 recheck)

## Summary
Redirect recheck passes: all 14 renamed handles 301 once to the new URL (new URLs 200), plus the two repointed redirects. memobrickofficial.com and photobrickusa.myshopify.com cannot be fetched from here (unknown); Shopify says the primary domain is mymemobrick.com.
New draft `christmas-gift-for-mom-from-kids` checked (all pass; hero image still needed) and proposed for publish, plus one hub A link item. SearchPie still prints two titles, two descriptions and a doubled BreadcrumbList (A-2026W44-025 still waits for Eden).

## Done
- Approvals checker printed A-2026W44-025, A-2026W43-003, A-2026W41-012, A-2026W41-014. None applied: 025 is Eden's switch in the SearchPie app (live check today: `photo-christmas-gift-for-wife` still shows 2 titles, 2 descriptions, BreadcrumbList twice); W43-003 still carries the queue flag that Eden must first confirm the Starry Night and Mona Lisa kits can be made; W41-012 and W41-014 are live-theme edits I cannot make from here (theme folders are read only and no theme write access was granted this run). Nothing retried.
- Task 1, redirect recheck (live curl): all 14 old handles return one 301 straight to the new handle, new handles 200. `/pages/blog-post` 301 to `summer-vacation-souvenirs-you-build`, `...emotional-connections-2` 301 to the kept URL. `www.mymemobrick.com` 301 to the bare domain. memobrickofficial.com and photobrickusa.myshopify.com returned no response from this environment (proxy), so unknown; Bertha's question is not answered from here. Check by hand: open both in a browser and see if they land on mymemobrick.com (the myshopify domain normally redirects to the primary domain by Shopify default).
- Task 2: `site-changes/hub-a-christmas-links.md` written (adds links to six Christmas articles and the Dec 15 sentence; each link only added if its URL is live on apply day).
- Draft check: `checks/christmas-gift-for-mom-from-kids.md`; draft set to `Status: checked`; copy check passed. The 4 other `ready for check` drafts are the calm series, already live and pinned by hash (left untouched).
- 7-day article check: the 5 calm series articles, size guide, gift guide, Christmas hub A, wife, grandparents, last-minute: 200 this run for wife, grandparents, last-minute, hub A; stocking stuffers, best-photo and mom-from-kids return 404 (not approved yet). Sitemap `sitemap_blogs_1.xml` reachable. Not re-parsed schema on every page today (checked 2026-10-29: valid).
- Search Console task: Eden has not pasted a Result in `chrome-tasks/2026-10-28-search-console-indexing.md`. No Search Console snapshot (`marketing/data/latest.md`: "Updated: never"), so no impressions ranking. Next 10 URLs to request are unchanged (Part B of that file).
- Content fixes: nothing new; next in line is the 8 articles with a 320-character auto excerpt (content work for the strategist).

## Proposed for approval

### P-seo-technical-20261031-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/christmas-gift-for-mom-from-kids.md
- Reason: Will publish "A Christmas Gift for Mom From the Kids, in Bricks" live on the Shopify blog, default article template (looks different from the GemPages articles; Eden can rebuild it in GemPages from this text afterward). Checked 2026-10-31: links, prices, FAQ schema pass; no hero image yet.
- Expires: 2026-11-14
- Status: pending

### P-seo-technical-20261031-2
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/hub-a-christmas-links.md
- Reason: Adds links from the Christmas hub (personalized-christmas-photo-gifts) to the new Christmas articles that are live, and the Dec 15 order-by sentence; body text edit only, so Google finds the new pages sooner.
- Expires: 2026-11-14
- Status: pending

## Blocked or unknown
- Eden: A-2026W44-025 (SearchPie meta tags) is still the top SEO fix; every article still shows 2 titles and 2 descriptions.
- Hero image for mom-from-kids is not supplied.
- Other domains (memobrickofficial.com, photobrickusa.myshopify.com): not fetchable from here.
- No Search Console data and no data snapshots yet; none requested again (already in requests).
- The Friday Oct 30 run did not leave a report; this run covers it.

## Sales impact
Linking the hub to the new pages and publishing the mom-from-kids page targets Christmas search, the weakest source (referred sessions -49%). The pages sell only once indexed and linked; the hub link is the fastest way to get crawled. Effect not measured yet.

## Next run
Mon Nov 2: apply any approved item (hub links after the stocking stuffers and photo-tips articles are live), re-check the 7-day articles, SearchPie status.
