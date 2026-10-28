# seo-technical 2026-10-28 (special run: blog on Google)

## Summary
All 56 published articles are live (200), indexable (no noindex, self canonical) and in the sitemap. What holds them back on Google: a second, empty meta description from the SearchPie app on every page, no meta description on 36 articles, almost no crawlable links on 35 GemPages articles, and ten overlapping Christmas pages.
Proposed: merge 8 Christmas pages into 2 hubs, clean 14 handles, retitle the FOX article, stop SearchPie's duplicate tags, and a Search Console indexing task for Eden's Mac.

## Done
- Checked every published article live (status, robots, canonical, title, description, sitemap, links to products, editor and free proof), plus robots.txt, the sitemaps, the blog index and all blog redirects. Results: `marketing/seo/technical/blog-indexing-2026-10-28.md`.
- Index status estimated (Google and Bing are blocked from this environment; no Search Console snapshot exists yet). Seen in a search index: 4 articles plus the blog index. Likely indexed: 5 old ones. Unknown or at risk: 44. Too new: 3. These are estimates, labelled as such in the file.
- Confirmed the 2026-10-20 fixes are live: the Ikram duplicate and `/pages/blog-post` return 301.
- Christmas consolidation plan written (two hubs, 8 merges, 301 map). The old Christmas verdicts in `article-inventory.md` are superseded.
- GemPages change list for Eden (`marketing/seo/technical/gempages-changes-2026-10-28.md`): the coordinator's owner fact applied. Visible text, links and headings on the 47 GemPages articles are hers to change; handles, SEO fields, publish state and redirects stay with the API.
- Content gaps for the strategist added to `content-fixes.md` (hub B meta description first; hub A FAQ still says "As early as you can" instead of the verified Dec 15 date).
- Read-only Search Console request added to `marketing/data/requests.md` (Pages report, sitemaps, blog page performance).
- No drafts were waiting for a check (`Status: ready for check`): none edited.

## Proposed for approval

### P-seo-technical-20261028-1
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/consolidate-christmas-articles.md
- Reason: If approved, seo-technical hides 8 overlapping Christmas articles (kept saved, not deleted), 301s them into the two Christmas hubs, repoints 11 old redirects that dump visitors on the homepage, and fixes hub A's links; doing it now gives Google five weeks before the December peak.
- Expires: 2026-11-04
- Status: pending

### P-seo-technical-20261028-2
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/clean-article-handles.md
- Reason: If approved, seo-technical renames 14 articles with test-like handles (baby-carrier, test-blog-post, copy-of, duplicate-from, random suffixes) to clean ones, with a 301 from each old URL and no redirect chains.
- Expires: 2026-11-11
- Status: pending

### P-seo-technical-20261028-3
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/retitle-fox-article.md
- Reason: If approved, seo-technical retitles the 2024 FOX article to "As Seen on FOX", gives it the handle memobrick-as-seen-on-fox with a 301, fixes its broken search title and description, and removes "Fox News" from two other articles, per the owner rule.
- Expires: 2026-11-04
- Status: pending

### P-seo-technical-20261028-4
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/disable-searchpie-meta-tags.md
- Reason: If approved, seo-technical turns off SearchPie's meta tag output (or its app embed, after a backup) so every page has one title and one description instead of two, the second often just "Memobrick".
- Expires: 2026-11-11
- Status: pending

### P-seo-technical-20261028-5
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/chrome-tasks/2026-10-28-search-console-indexing.md
- Reason: If approved, seo-technical marks the task ready and Eden pastes it into Claude in Chrome on her Mac: it resubmits the sitemap, records which blog URLs Google has indexed, and requests indexing for the Christmas hubs and new articles (Part B again after items 1 to 3 are applied).
- Expires: 2026-11-04
- Status: pending

## Blocked or unknown
- Google and Bing searches are blocked from this environment (proxy refuses www.google.com and www.bing.com). Index status is estimated from a third-party search index and crawl signals.
- No Search Console snapshot in `marketing/data/` (latest.md: "Updated: never"). Request added.
- Search Console: the homepage has four google-site-verification tags, so the site is verified for some Google account. Which account, and whether Eden's login sees the property, is unknown; step 0 of the Chrome task checks.
- The nightly `memobrick-chrome-tasks` job only runs Google Ads tasks, so the Search Console task has to be pasted by Eden (or that skill extended by its owner).
- JavaScript-rendered links on GemPages pages were not checked (no browser here). The link finding is about the raw HTML Google downloads first.
- For site-developer (not SEO, not proposed here): the homepage says "As seen on Fox News", "MemoBrick on Fox News." and has a logo with alt "Fox News". It also says "Made & Shipped from Miami"; the brand rule allows the Miami claim only when the offers-calendar Facts table shows it verified.
- Coordination: the strategist's new drafts link to pages being merged. `last-minute-personalized-christmas-gifts.md` links to `dont-wait-until-december-...`, and `personalized-christmas-photo-gifts.md` (hub A draft) links to five merged URLs. The writer should point them at the hubs before publishing. The redirects keep the old links working either way.
- Not renamed now, because their season is close: grandparents (`-mxezkd`, after Jan 4, 2027) and Thanksgiving (`-aug-8-10`, after Nov 27).

## Sales impact
Search is the channel that fell most (referred traffic -51%, Google worst), and Christmas searches peak in the next six weeks. Today ten Christmas pages split Google's attention, and most have no description. Merging them into two strong hubs, giving every page one clean title and description, and asking Google to index the hubs should help a Christmas page rank in time for December. That is an expectation, not a measured number.
The GemPages link fix also touches the draft-order weak point (proof requests -85%): 35 articles have no plain link to `/pages/free-preview` or the editor, so a reader from Google has no clear next step. Eden's one-line link in GemPages is the quickest fix.
The handle cleanup and the FOX retitle mainly protect click rate and the owner rule. Their sales effect is small.

## Next run
- Friday 2026-10-30 weekly run: apply whichever items are approved (backup first), verify the 301s and sitemap live, then hand Eden Part B of the Search Console task.
- When the Search Console result is pasted into the task file, replace the estimates in `blog-indexing-2026-10-28.md` with the real index status.
- Check the strategist's three new Christmas drafts when they reach `Status: ready for check`.
