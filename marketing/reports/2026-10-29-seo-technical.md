# Report: seo-technical 2026-10-29 (daily run)

## Summary
No new approved items to apply (A-2026W44-022 to 024 and 026 were applied or handed to Eden on 2026-10-28; 025, W41-012 and W41-014 still need Eden or the live theme; W43-003 still waits for Eden's design confirmation). All 11 recent or changed articles are live, in the sitemap, with one canonical and valid FAQ/BlogPosting schema.
Check notes written for 7 drafts (5 calm series already live, best-photo and stocking stuffers not yet). Proposed: publish best-photo, and a meta description for Christmas hub B.

## Done
- Approvals checker run: printed A-2026W44-022 to 025, A-2026W41-012, A-2026W43-003, A-2026W41-014 (and 026 as changed since commit, needs re-approval; it is a Chrome task whose Part A/B text was not changed in substance). Nothing new to apply: 022 to 024 and 026 are done (see `applied-2026-10-28.md`); 025, W41-012, W41-014 are live-theme/app changes blocked as reported yesterday; W43-003 waits for Eden's confirmation (queue flag). Nothing retried.
- 7-day article check on the live site (the 5 calm series articles, 3 Christmas gap articles, size guide, gift guide, Christmas hub A): all 200, no noindex, 1 canonical, all in `sitemap_articles_1.xml` (56 entries), JSON-LD parses (BlogPosting, BreadcrumbList, FAQPage). Internal links to the editor, free proof and products return 200.
- Still wrong on every one of them: 2 titles and 2 meta descriptions (SearchPie's copy, with a leading space), and BreadcrumbList printed twice. Same cause as 025.
- Draft checks written: `marketing/seo/technical/checks/` for best-photo-for-a-brick-mosaic, personalized-stocking-stuffers (prices, codes and links verified live), and the 5 calm series articles (post-publish). Set `Status: checked` on best-photo and stocking stuffers; left the 5 calm drafts untouched (pinned by hash in A-2026W44-020, already published). Copy check passed on the two edited drafts.
- Search Console task: no Result pasted yet in `chrome-tasks/2026-10-28-search-console-indexing.md`; still waiting for Eden. No Search Console snapshot exists (`marketing/data/latest.md`: "Updated: never"), so no impressions ranking this run.
- Content fixes: hub B meta description proposed below; new notes added to `content-fixes.md`.

## Proposed for approval

### P-seo-technical-20261029-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/best-photo-for-a-brick-mosaic.md
- Reason: Will publish "Best Photo for a Brick Mosaic: 7 Simple Tips" live on the Shopify blog, default article template (looks different from the GemPages articles; Eden can rebuild it in GemPages from this text afterward). Checked 2026-10-29: links, facts, FAQ schema; helps photo-quality questions that lead to orders.
- Expires: 2026-11-12
- Status: pending

### P-seo-technical-20261029-2
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/hub-b-meta-description.md
- Reason: Replaces the empty meta description ("  Memobrick") on the Christmas family-activity hub with a real 129-character one (order by Dec 15); Shopify field only, no visible change.
- Expires: 2026-11-12
- Status: pending

Not proposed again: `personalized-stocking-stuffers` is already proposed by the writer as P-seo-blog-writer-20261029-1; my check notes are in `checks/personalized-stocking-stuffers.md` and the draft is now `Status: checked`.

## Blocked or unknown
- Eden: A-2026W44-025 (turn off SearchPie meta tags) is now the most valuable open SEO action. Every article, including the 11 new ones, shows two titles and two descriptions. Caution: switching SearchPie fully off also removes its BreadcrumbList from GemPages articles (see yesterday's report); use the in-app meta-tags switch first.
- A-2026W44-026 shows "draft changed since commit"; Eden already approved it and can use the file as is. If the coordinator wants it clean, it can be re-queued.
- External research links in the calm series could not be opened from here (proxy blocks them).
- No Search Console data; Google and Bing blocked from this environment.
- The sitemap now lists all 56 articles; the 14 renamed handles are to be confirmed Friday.

## Sales impact
New default-template Christmas and stocking-stuffer pages only sell once Google shows a clean snippet and the page is indexed. Hub B's empty description costs clicks on the page that carries the family-activity Christmas search; fixing it plus publishing the stocking-stuffer and photo-tips articles (the latter feeds the editor and proof path) targets the search channel that fell most. Expected effect, not measured.

## Next run
- Friday 2026-10-30: weekly run. Verify the 14 new handles in the sitemap, SearchPie status, any Search Console result Eden pastes, apply any approved item (backup first).
