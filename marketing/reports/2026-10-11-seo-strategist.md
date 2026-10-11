# DRY RUN: seo-strategist 2026-10-11

## Summary

Built the first keyword map (7 hubs plus buyer-question articles) and a 14-item ranked page plan from a full read of all 59 blog articles in Shopify (published and unpublished).
Briefed the top page: a Christmas hub for "personalized christmas photo gifts" that organizes six overlapping Christmas posts instead of adding a seventh.
Live site fetch and Search Console were unavailable; existing content was read through the Shopify Admin API (read only).

## Done

- `marketing/seo/strategist/keyword-map.md`: keywords grouped into Christmas, couples and anniversaries, pets, family, kids, birthdays, memorial, plus the five buyer-question articles. Each has intent, target URL, evidence. All volumes "unknown".
- `marketing/seo/strategist/page-plan.md`: ranked plan. Top 5: (1) Christmas hub, (2) merge duplicate "Perfect Holiday Gift for Mindful Creativity" posts, (3) gift for someone who has everything, (4) what is in the kit, (5) best photo for a brick mosaic.
- `marketing/seo/strategist/briefs/personalized-christmas-photo-gifts.md`: Status ready for writer, page type hub, Existing URL none.
- Appended 4 rows to `marketing/shared/customer-questions.md`.
- Duplicate check: `marketing/seo/technical/` had no audit files at run time, so I listed every blog article, page, collection, and product via Shopify Admin GraphQL (read only). No existing page targets the Christmas head term; the brief lists the pages it must not duplicate.
- Monthly AI-visibility check: skipped this run (dry run instruction; not quick without live tools). Due before 2026-10-31.

## Proposed for approval

None. The duplicate holiday post merge (page plan rank 2) is handed to seo-technical, which owns site changes and redirects.

## Blocked or unknown

- https://mymemobrick.com could not be fetched: the sandbox proxy refused the connection (curl 403) and WebFetch could not resolve the host. Live titles, meta, and rendered content were not checked.
- Search Console not connected. No search volumes, rankings, or impressions.
- `marketing/seo/technical/` audit files did not exist yet.
- Brand skill lacks sizes, faces per size, prices, and build time. Articles on sizes and build time (plan ranks 7 and 8) are blocked until the owner adds verified facts.
- A "Memobrick Gift Card" product is active in Shopify, but offers-calendar lists "Gift cards offered: unknown". Owner should confirm.
- The published page `/pages/free-preview` is titled "Free Proof", which conflicts with the brand rule "never imply a manual proof is required". Flag for owner and seo-technical.
- `page.custom-brick-mosaic-vs-alternatives` exists as a theme template, but no published page with that handle appeared in the first 50 pages returned.

## Next run

- Run the October AI-visibility check (5 gift searches) if tools allow.
- Brief page plan rank 3 (gift for someone who has everything) or rank 4 (what is in the kit).
- Re-read seo-technical audit files and update the plan for duplicates and redirects.
