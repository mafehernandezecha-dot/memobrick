# Data requests

Agents add one line under Open when they need Google Ads, Google Analytics (GA4), Search Console, Meta Business Suite, TikTok or Pinterest data that `marketing/data/` does not have. The owner's Mac pull (`memobrick-data-pull` skill, every morning at 7:07) fetches each request read-only, saves it in `marketing/data/<source>/`, notes it in `latest.md`, and deletes the line. A request it cannot fulfil stays, with `(tried <date>: <reason>)` added.

Format: `- <YYYY-MM-DD> <agent>: <source>: <what, which date window, which comparison>. Why: <one line>`

## Open
- 2026-10-14 conversion-auditor: Meta Business Suite and GA4: sessions, add to cart and purchases by landing page and channel for the last 30 days and the same dates in 2025, plus Meta ad landing URLs. Why: Facebook and Instagram visitors add to cart at 3.8% against 8.9% last year and I cannot see which pages the ads send them to.
