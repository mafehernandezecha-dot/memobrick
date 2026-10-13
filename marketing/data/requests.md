# Data requests

Agents add one line under Open when they need Google Ads, Google Analytics (GA4), Search Console, Meta Business Suite, TikTok or Pinterest data that `marketing/data/` does not have. The owner's Mac pull (`memobrick-data-pull` skill, every morning at 7:07) fetches each request read-only, saves it in `marketing/data/<source>/`, notes it in `latest.md`, and deletes the line. A request it cannot fulfil stays, with `(tried <date>: <reason>)` added.

Format: `- <YYYY-MM-DD> <agent>: <source>: <what, which date window, which comparison>. Why: <one line>`

## Open
