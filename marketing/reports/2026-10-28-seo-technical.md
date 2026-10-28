# seo-technical 2026-10-28 (executor run: approved blog fixes A-2026W44-022 to 026)

## Summary
Applied 022 (Christmas consolidation), 023 (14 clean handles), 024 (FOX retitle) through the API, all verified live: every old URL returns one 301 to a 200 page, no chains or loops, and no published article says "Fox News".
025 (SearchPie duplicate titles) could not be applied: the connector blocks live-theme writes, so Eden has exact click steps. 026 (Search Console) is ready for Eden to paste: Part A today, Part B on Oct 29 or later.

## Done
Full log with IDs: `marketing/seo/technical/applied-2026-10-28.md`. Backups committed before each write in `marketing/seo/technical/backups/2026-10-28-*`.
- **A-2026W44-025: not applied, blocked.** Live `settings_data.json` read, matched the draft and was backed up. `themeFilesUpsert` on the live theme was refused by the connector ("Theme file writes against the live storefront are blocked"). SearchPie's own setting has no API. Click steps for Eden: `marketing/seo/technical/eden-steps-2026-10-28.md` section 1. Every page still has 2 titles and up to 2 descriptions.
- **A-2026W44-024: applied.** Article 728638685404 is now "As Seen on FOX: Memobrick in a Holiday Gift Guide" at https://mymemobrick.com/blogs/news/memobrick-as-seen-on-fox (old URL 301s there), with new SEO title, description, alt text and tags. "Fox News" was removed from `the-ideal-present` (visible) and from the Father's Day body (schema text). Crawl of all 56 published articles: no "Fox News" left. No GemPages step needed.
- **A-2026W44-022: applied.** 8 new 301s created, then the 8 posts were unpublished (kept, not deleted). The Ikram redirect and 10 `theperfect-holiday-thoughtful-gifts` redirects now go to hub A instead of the homepage. Hub A's 3 link fixes were made as drafted. Sandra's new `last-minute-personalized-christmas-gifts` (A-2026W44-021) linked to `dont-wait-until-december-...`; it now points to hub A (only the href changed). The other two new articles link to no merged post.
- **A-2026W44-023: applied.** Deleted redirect 487176011996 first. Renamed 14 handles with 301s and fixed the Valentine's title. Repointed `...-connections-2` and `/pages/blog-post` to avoid chains. Hub A's pets link now goes to the new handle. Grandparents (after Jan 4) and Thanksgiving (after Nov 27) are held as drafted.
- **A-2026W44-026: ready.** `marketing/seo/technical/chrome-tasks/2026-10-28-search-console-indexing.md` now opens with a "Paste this" section and separate Part A and Part B blocks, and has a `## Result` section.
- GemPages change list updated (`gempages-changes-2026-10-28.md`): new addresses, item 4 no longer needed, item 5 (FOX: nothing to do), item 6 (two GemPages articles still link to old handles; they work through the 301s).

## Proposed for approval
None.

## Blocked or unknown
- 025 needs Eden (live-theme writes and the SearchPie app are out of the connector's reach). The fallback, turning the embed off, also removes BreadcrumbList on GemPages articles, because SearchPie is their only source of it. The draft said the theme covers breadcrumbs, which is true only on default-template articles. Eden's steps say to try SearchPie's in-app meta switch first.
- Sitemap still regenerating: at 07:55 to 07:58 UTC Shopify served two versions (48 entries without the 8 hidden posts, and 56 with them). Both list the new FOX handle. Neither lists the 14 renamed handles or the 3 new articles yet. The pages, 301s and canonicals are correct. Recheck Friday.
- Still approved and still blocked by the same live-theme limit (not retried, not in this run's scope): A-2026W41-012 (hardcoded 4.8/747 rating) and A-2026W41-014 (article schema). A-2026W43-003 (republish Starry Night and Mona Lisa) shows as approved, but its queue Flag says to wait for Eden's confirmation that the designs can still be made, so it was not touched.
- For site-developer: the homepage still says "As seen on Fox News", "MemoBrick on Fox News." and has a logo with alt "Fox News".
- For seo-blog-writer (Sandra): in `last-minute-personalized-christmas-gifts`, the repointed sentence still reads "Our post on personalized Christmas gifts to order now explains why ordering in November is the calm way". Hub A only covers this in its "Plan ahead" section. A wording touch is hers to decide.
- Status file set to `needs_me` although nothing new was proposed: Eden has two actions waiting (SearchPie switch, Search Console paste).

## Sales impact
Search is the channel that fell most. Christmas searches peak in the next six weeks. Ten competing Christmas pages are now two hubs, and the old Facebook-shared `theperfect-holiday` links now land on a Christmas page with an order path instead of the homepage. So paid and organic visitors from old links reach a page that sells the Christmas kit. The new last-minute article now passes its link to the hub, not a hidden post. The handle and FOX fixes mainly protect click rate and the brand rule, so their sales effect is small. The biggest remaining SEO lever is 025: until Eden switches SearchPie off, 36 articles show "  Memobrick" as their only description. That costs clicks on exactly the pages we want Google to show in December. These are expectations, not measured numbers.

## Next run
- Friday 2026-10-30 weekly run: confirm the sitemap lists the 14 new handles and 3 new articles. Check whether Eden turned SearchPie off (one title per page) and read any Search Console Result she pasted.
- After Nov 27: propose the Thanksgiving handle rename. After Jan 4, 2027: the grandparents rename.

---

# Earlier run today: seo-technical 2026-10-28 (special run: blog on Google)

### Summary
All 56 published articles are live (200), indexable (no noindex, self canonical) and in the sitemap. What holds them back on Google: a second, empty meta description from the SearchPie app on every page, no meta description on 36 articles, almost no crawlable links on 35 GemPages articles, and ten overlapping Christmas pages.
Proposed: merge 8 Christmas pages into 2 hubs, clean 14 handles, retitle the FOX article, stop SearchPie's duplicate tags, and a Search Console indexing task for Eden's Mac.

### Done
- Checked every published article live (status, robots, canonical, title, description, sitemap, links to products, editor and free proof), plus robots.txt, the sitemaps, the blog index and all blog redirects. Results: `marketing/seo/technical/blog-indexing-2026-10-28.md`.
- Index status estimated (Google and Bing are blocked from this environment; no Search Console snapshot exists yet). Seen in a search index: 4 articles plus the blog index. Likely indexed: 5 old ones. Unknown or at risk: 44. Too new: 3. These are estimates, labelled as such in the file.
- Confirmed the 2026-10-20 fixes are live: the Ikram duplicate and `/pages/blog-post` return 301.
- Christmas consolidation plan written (two hubs, 8 merges, 301 map). The old Christmas verdicts in `article-inventory.md` are superseded.
- GemPages change list for Eden (`marketing/seo/technical/gempages-changes-2026-10-28.md`): the coordinator's owner fact applied. Visible text, links and headings on the 47 GemPages articles are hers to change; handles, SEO fields, publish state and redirects stay with the API.
- Content gaps for the strategist added to `content-fixes.md` (hub B meta description first; hub A FAQ still says "As early as you can" instead of the verified Dec 15 date).
- Read-only Search Console request added to `marketing/data/requests.md` (Pages report, sitemaps, blog page performance).
- No drafts were waiting for a check (`Status: ready for check`): none edited.

### Proposed for approval
P-seo-technical-20261028-1 to -5, now queued as A-2026W44-022 to 026 and applied in the executor run above.

### Blocked or unknown
- Google and Bing searches are blocked from this environment (proxy refuses www.google.com and www.bing.com). Index status is estimated from a third-party search index and crawl signals.
- No Search Console snapshot in `marketing/data/` (latest.md: "Updated: never"). Request added.
- Search Console: the homepage has four google-site-verification tags, so the site is verified for some Google account. Which account, and whether Eden's login sees the property, is unknown; step 0 of the Chrome task checks.
- The nightly `memobrick-chrome-tasks` job only runs Google Ads tasks, so the Search Console task has to be pasted by Eden (or that skill extended by its owner).
- JavaScript-rendered links on GemPages pages were not checked (no browser here). The link finding is about the raw HTML Google downloads first.
- For site-developer (not SEO, not proposed here): the homepage says "As seen on Fox News", "MemoBrick on Fox News." and has a logo with alt "Fox News". It also says "Made & Shipped from Miami"; the brand rule allows the Miami claim only when the offers-calendar Facts table shows it verified.
- Coordination: the strategist's new drafts link to pages being merged. `last-minute-personalized-christmas-gifts.md` links to `dont-wait-until-december-...`, and `personalized-christmas-photo-gifts.md` (hub A draft) links to five merged URLs. The writer should point them at the hubs before publishing. The redirects keep the old links working either way.
- Not renamed now, because their season is close: grandparents (`-mxezkd`, after Jan 4, 2027) and Thanksgiving (`-aug-8-10`, after Nov 27).

### Sales impact
Search is the channel that fell most (referred traffic -51%, Google worst), and Christmas searches peak in the next six weeks. Today ten Christmas pages split Google's attention, and most have no description. Merging them into two strong hubs, giving every page one clean title and description, and asking Google to index the hubs should help a Christmas page rank in time for December. That is an expectation, not a measured number.
The GemPages link fix also touches the draft-order weak point (proof requests -85%): 35 articles have no plain link to `/pages/free-preview` or the editor, so a reader from Google has no clear next step. Eden's one-line link in GemPages is the quickest fix.
The handle cleanup and the FOX retitle mainly protect click rate and the owner rule. Their sales effect is small.

### Next run
- Friday 2026-10-30 weekly run: apply whichever items are approved (backup first), verify the 301s and sitemap live, then hand Eden Part B of the Search Console task.
- When the Search Console result is pasted into the task file, replace the estimates in `blog-indexing-2026-10-28.md` with the real index status.
- Check the strategist's three new Christmas drafts when they reach `Status: ready for check`.
