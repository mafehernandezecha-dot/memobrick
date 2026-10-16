# seo-technical 2026-10-16

## Summary

- Applied 3 of 5 approved site-changes via Shopify (redirects, duplicate article and page hidden). The 2 theme-file changes (A-2026W41-012, -014) could not be applied: Shopify tool blocks writes to the live theme.
- Checked the new draft `gift-for-someone-who-has-everything` and proposed it for publishing.

## Done

- A-2026W41-013: set article 591273525468 (Ikram duplicate) to unpublished; deleted redirect `/blogs/news/theperfect-holiday` -> homepage; created 301 `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` -> `/blogs/news/theperfect-holiday` (redirect id 607155814620). Live site not fetchable, so the 301/200 verification is not done.
- A-2026W41-015: hid page `blog-post`; created `/pages/blog-post` -> summer souvenirs article (redirect id 607155847388).
- A-2026W41-016: changed the "emotional connections" redirect target to `/blogs/news/test-blog-post-07072026`; created `...-connections-2` -> same (redirect id 607155781852).
- A-2026W41-012 and A-2026W41-014: NOT applied (see Blocked). No backup was needed since no theme file was changed.
- Draft check written: `marketing/seo/technical/checks/gift-for-someone-who-has-everything.md`; draft set to `Status: checked`; `check.py copy` passed.
- Wrote `marketing/seo/technical/content-fixes.md`.
- `personalized-christmas-photo-gifts` is already published (handle exists, published); the older P-...-6 item needs no action.
- Not done: no new full audit (first audit exists), article inventory is monthly (next due ~2026-11-11), no Search Console snapshot exists yet (`marketing/data/latest.md` says nothing pulled).

## Proposed for approval

### P-seo-technical-20261016-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/gift-for-someone-who-has-everything.md
- Reason: Publishes this Christmas gift-guide article live on the Shopify blog (add the FAQPage JSON-LD from checks/gift-for-someone-who-has-everything.md); it needs indexing time before the November gift searches.
- Expires: 2026-10-30
- Status: pending

## Blocked or unknown

- Live-theme writes are blocked in the Shopify tool. A-2026W41-012 (remove hardcoded 4.8/747 rating in `templates/product.liquid`) and A-2026W41-014 (BlogPosting/Breadcrumb schema in `layout/theme.liquid`) need the owner to paste the before/after from the site-change files in Shopify admin, or to give a route that allows it. The rating one is the higher risk before Q4.
- The live site is unreachable from here; Shopify records were used as fallback (read for checks, writes only for the approved changes).
- No Search Console data yet, so the "fix top-impression pages first" ordering is not possible. Not added to requests.md here; the coordinator should confirm the Mac pull is running.

## Sales impact

Removing duplicate pages and fixing the wrong redirect protects Christmas ranking for `theperfect-holiday` and sends a stray 404 link to the right article (weak point: referred search traffic down 64%). The new gift article targets high-intent holiday searches; effect is slow (weeks to index), so expect orders from late November. The rating schema fix protects star snippets, not direct sales.

## Next run

Friday 2026-10-23: re-try theme changes if a route exists, check new drafts, confirm redirects once the site is reachable.
