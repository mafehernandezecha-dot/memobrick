# DRY RUN: seo-technical 2026-10-11

## Summary

- First full audit done. The top sales risk is the hardcoded 4.8 rating from 747 reviews in the schema of every product. Next are 47 GemPages articles with no Article schema and mostly no meta description, then live duplicate holiday content.
- Duplicate check: 2 live duplicates confirmed (98% and 100% overlap). The other 44 GemPages articles share at most 9% of their text. The real problem is topic cannibalization, which calls for 3 hubs rather than merges.
- The live site could not be fetched (proxy and DNS). The audit used the Shopify Admin API (read only) and live theme files, which were checksum-matched to the repo.

## Done

- **Read the brand and run rules** (memobrick-brand, memobrick-run) and the offers calendar. Steps 1 and 8 (git) and step 3 (approvals) were skipped as dry-run rules require.
- **Read live store data through the Shopify Admin API (read only):**
  - all 59 articles and their SEO fields
  - 5 blogs and 73 pages
  - 7 collections and a sample of 31 products
  - redirects under `/blogs`
  - the main theme's file list, plus the live `layout/theme.liquid` and `templates/product.liquid`
- **Confirmed the repo templates match live.** All 49 article templates in the repo are byte-identical to the live theme.
- **Wrote `marketing/seo/technical/audit-2026-10-11.md`:** 9 issue groups ranked by sales impact, following the `searchfit-seo:technical-seo` checklist.
- **Wrote `marketing/seo/technical/article-inventory.md`:**
  - the template-to-URL map
  - shingle-overlap analysis across 946 article pairs, plus the v6 templates and pages
  - a verdict for each of the 54 published articles
  - 3 named hubs and a 301 map
- **Wrote `marketing/seo/technical/site-changes-2026-10-11.md`:** exact before and after for every proposal below.
- **Draft checks:** there are no drafts with `Status: ready for check` to check. `marketing/seo/writer/drafts/` holds no `.md` files.
- **Copy check:** no customer-facing draft was created or edited, so `check.py copy` was not needed.

## Proposed for approval

### P-seo-technical-20261011-1
- Agent: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes-2026-10-11.md (item 1)
- Reason: The duplicate "[Ikram GemPages] Perfect Holiday Gift" article went live 2026-09-10 and splits ranking with `theperfect-holiday` before the holiday peak. The fix is to unpublish it and 301 it to `theperfect-holiday`.
- Expires: 2026-11-30
- Status: pending

### P-seo-technical-20261011-2
- Agent: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes-2026-10-11.md (item 2)
- Reason: `/pages/blog-post` is a 100% copy of the summer souvenirs article. The fix is to hide the page and 301 it to the article.
- Expires: 2026-12-31
- Status: pending

### P-seo-technical-20261011-3
- Agent: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes-2026-10-11.md (item 3)
- Reason: One redirect sends "emotional connections" traffic to the graduation article, which is the wrong page. The graduation article also links to a 404.
- Expires: 2026-12-31
- Status: pending

### P-seo-technical-20261011-4
- Agent: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes-2026-10-11.md (item 4)
- Reason: A hardcoded 4.8/747 AggregateRating sits on every product. That risks a Google manual action removing star snippets sitewide just before Q4.
- Expires: 2026-11-15
- Status: pending

### P-seo-technical-20261011-5
- Agent: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes-2026-10-11.md (item 5)
- Reason: 47 GemPages articles, including 8 of the 10 Christmas and holiday posts, have no BlogPosting or Breadcrumb schema.
- Expires: 2026-11-30
- Status: pending

## Blocked or unknown

**Live site unreachable.**

- `curl` to mymemobrick.com got a 403 from the egress proxy (policy denial). WebFetch failed DNS for every host, example.com included.
- So none of these were checked: robots.txt, sitemap.xml, status codes, redirect chains, HTTPS headers, rendered H1s, Loox schema output, Core Web Vitals.
- The agent's rule "only propose merges confirmed on the live site" was met with live store records and live theme files, not rendered pages. The owner should open both URLs in proposals 1 and 2 before approving.

**No Search Console or PageSpeed access.** Cannibalization in the Christmas, personalized-gift and family clusters cannot be confirmed with query data, so no merges are proposed for them.

**Owner decisions needed:** these brand conflicts are live on the site today, and they are content issues, not technical ones.

- "Made & shipped from Miami" appears on every product page. The Facts table says the claim is unknown.
- "Free proof before production" and "Our designers build it for you" appear on product pages and in meta fallbacks. The brand file says never imply a manual proof or a designer-made design.
- Review and customer counts are inconsistent: 747, +700, 1,015, 1000+ and 22,500+.
- "Additional 10% off when buying from 2 pcs" appears in the Baby's First Year article. That offer is not in the offers calendar.
- Meta description fallbacks in `layout/theme.liquid` use em dashes.

**Handoff to seo-blog-writer.** 43 GemPages articles need meta descriptions, and 19 need an H1. Both are content edits made in GemPages or the Shopify admin. This agent may not write them under "fix only technical issues in drafts".

**Unknown:** the real redirect count. The Admin API count is capped at 10,000, so the store has at least that many. Many are `fbclid` junk sent to the homepage. A full export is needed for a cleanup plan.

## Next run

- Friday 2026-10-16, 6:00 ET.
- Check drafts marked `ready for check`.
- Re-try the live fetch for robots.txt, the sitemap and rendered pages.
- Verify any approved changes.
- Plan cleanup for the `-1` duplicate products, the AVADA collection, the empty blogs, and the article handle renames (with 301s).
