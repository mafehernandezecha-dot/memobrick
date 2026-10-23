# seo-technical 2026-10-23

## Summary

Checked the new size-guide draft (brick-mosaic-sizes), no fixes needed, proposed for publishing. Live site was reachable: both earlier articles and the redirects are live and working.
The hardcoded 4.8/747 product rating (approved A-2026W41-012) is still live and still blocked by the Shopify theme-write limit.

## Done

- Approvals: `check.py approvals` printed A-2026W41-012 and A-2026W41-014 (both theme-file changes). Not applied; see Blocked.
- Draft check: `marketing/seo/technical/checks/brick-mosaic-sizes.md` (title 42, meta 125, heading order, facts vs product-facts, 4 internal links all 200, FAQPage JSON-LD). Draft set to `Status: checked`. Copy check passed.
- Live verification (site reachable): `/blogs/news/gift-for-someone-who-has-everything` and `/blogs/news/personalized-christmas-photo-gifts` return 200; the gift article already shows BlogPosting, BreadcrumbList and FAQPage. `/blogs/news/ikram-gempages-the-perfect-holiday-gift-for-mindful-creativity` and `/pages/blog-post` return 301 to their targets, and `/blogs/news/theperfect-holiday` returns 200. robots.txt and sitemap.xml return 200.
- GemPages article `theperfect-holiday` has BreadcrumbList only, no BlogPosting. This is what A-2026W41-014 would fix.
- Product pages still carry the hardcoded `4.8 / 747` aggregateRating in the live theme (`templates/product.liquid`, theme "Memobrick kit page fix"), confirmed by reading the file and the live HTML.

## Proposed for approval

### P-seo-technical-20261023-1
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/brick-mosaic-sizes.md
- Reason: Publishes the brick mosaic size guide live on the Shopify blog (news) at /blogs/news/brick-mosaic-sizes, with FAQ schema. It answers the size question that stops buyers choosing a kit, ahead of the Christmas rush.
- Expires: 2026-11-06
- Status: pending

## Blocked or unknown

- Theme-file writes (A-2026W41-012 rating removal, A-2026W41-014 article schema) remain unapplied. I did not retry: the Shopify tool blocked live-theme writes on Oct 16, the theme is being edited by other work, and re-uploading a whole 20 KB `product.liquid` by hand risks overwriting their changes. Route needed: the owner pastes the before/after from `marketing/seo/technical/site-changes/remove-hardcoded-product-rating.md` in Shopify admin (a one-line delete), or gives a route that allows a theme write. Note the same hardcoded "747 reviews, 4.8" text also appears in visible page text and in `layout/theme.liquid` meta fallbacks; that is a content claim for the site-developer.
- Google and Meta snapshots: `marketing/data/latest.md` says nothing has been pulled yet, so no Search Console page ranking was available to prioritise by impressions. Open requests for Search Console are already in `marketing/data/requests.md` (Oct 14, Oct 20).
- Monthly duplicate-article inventory not rerun (last done Oct 11; next due early November).

## Sales impact

Referred traffic is down 58% and search is the weakest channel. The size guide targets "which size" searches and gives buyers a way to pick a kit, which supports conversion on the custom kits. Removing the false rating protects star snippets sitewide before the Q4 ramp but only once the owner applies it. Expected effect from the article is small and slow (new page, needs indexing); the rating fix is risk protection, not a sales lift.

## Next run

Friday 2026-10-30: check the published size guide is indexed and shows BlogPosting, recheck theme-change route, review any new drafts, use Search Console snapshot if it exists.
