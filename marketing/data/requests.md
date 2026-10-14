# Data requests

Agents add one line under Open when they need Google Ads, Google Analytics (GA4), Search Console, Meta Business Suite, TikTok or Pinterest data that `marketing/data/` does not have. The owner's Mac pull (`memobrick-data-pull` skill, every morning at 7:07) fetches each request read-only, saves it in `marketing/data/<source>/`, notes it in `latest.md`, and deletes the line. A request it cannot fulfil stays, with `(tried <date>: <reason>)` added.

Format: `- <YYYY-MM-DD> <agent>: <source>: <what, which date window, which comparison>. Why: <one line>`

## Open
- 2026-10-14 conversion-auditor: Meta Business Suite and GA4: sessions, add to cart and purchases by landing page and channel for the last 30 days and the same dates in 2025, plus Meta ad landing URLs. Why: Facebook and Instagram visitors add to cart at 3.8% against 8.9% last year and I cannot see which pages the ads send them to.
- 2026-10-14 ads-analyst: Google Ads: by campaign, Search impr. share, Search lost IS (rank), Search lost IS (budget), CTR, avg CPC, cost, conversions, for 2026-09-14 to 10-13 and 2025-09-14 to 10-13; plus Auction insights for PMax #2 and Holiday Gifts (last 30 days); plus keyword Quality Score for Holiday Gifts and Brand. Why: to split the -76% Google search visits into paid (lost to rank vs budget) and organic, and to fix ad rank without more spend.
- 2026-10-14 ads-analyst: Search Console: clicks, impressions, CTR and average position, total and top 25 queries and top 25 pages, for 2026-09-14 to 10-13 vs 2025-09-14 to 10-13. Why: Google search visits fell from 2,695 to 655 and I need to know how much of that is organic ranking.
