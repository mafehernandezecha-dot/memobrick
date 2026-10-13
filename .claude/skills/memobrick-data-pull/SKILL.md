---
name: memobrick-data-pull
description: Read-only morning pull of Google Ads, Google Analytics (GA4), Search Console, Meta Business Suite, TikTok and Pinterest numbers into marketing/data/, using Claude in Chrome on the owner's Mac, so the agents need no paid connector calls. Load when a local scheduled task says to follow the memobrick-data-pull skill.
---

# Memobrick data pull

This runs on the owner's Mac every day at 7:07 (the `com.memobrick.data-pull` launchd job, installed with `os/scripts/install-mac-tasks.sh`). It reads the owner's own dashboards in Chrome through Claude in Chrome and saves small snapshots in `marketing/data/`, which the agents read instead of spending Adspirer calls (only 150 free a month) or paying for more. The owner approved reading Google Ads, Analytics, Search Console and Instagram insights this way.

**This run only reads.** It never changes anything in any account. Finish within 45 minutes: if time runs short, save what you have and list the rest as `not pulled (time)`.

## Files

- Snapshots: `marketing/data/<source>/<YYYY-MM-DD>-<report>.csv` (or `.md` for a small table you read off the screen). Sources: `google-ads`, `ga4`, `search-console`, `meta`, `tiktok`, `pinterest`. The date is today on this Mac (`date '+%Y-%m-%d'`).
- `marketing/data/latest.md`: the index. Its first line is always `Updated: <YYYY-MM-DD HH:MM>` (Mac local time); the Mac job skips the run when that date is today.
- `marketing/data/requests.md`: extra data the agents asked for, under `## Open`.
- Raw downloads go to `~/Library/Application Support/Memobrick/data-pull-raw/<YYYY-MM-DD>/`, never into the repo. The Mac job deletes that folder's contents after 14 days.

## Steps

1. `git pull origin main` in the memobrick folder. Get today: `date '+%Y-%m-%d'` and the time: `date '+%H:%M'`. Work out the date windows, ending yesterday (today is partial):
   - last 7 days, last 30 days, and the same 30 calendar days one year earlier;
   - for Search Console, last 28 days and the same 28 days one year earlier (its data lags about 2 days; use the range the tool offers and write the real dates).
   Make the raw folder: `mkdir -p ~/Library/Application\ Support/Memobrick/data-pull-raw/<today>`.
2. Read `marketing/data/requests.md`. Each line under `## Open` is an extra report to pull in step 3 at its source (read-only, same rules). A request that needs a change, another site, another account, or personal data is not done: add `(tried <today>: <reason>)` to its line.
3. Pull each source below, in this order. For each one:
   - Open it in Chrome. If you see a login page, a CAPTCHA, a 2-step verification prompt, a "choose an account" page that does not show the right account, or the wrong account or property, **stop that source**: do not sign in, type a password or code, or pick another account. Write `needs owner: <one short reason>` for it in `latest.md` and go to the next source.
   - Prefer the page's own export (Download / Export / Share > Download file > CSV). After clicking it, find the file: `ls -t ~/Downloads | head -5`, and check its name and time match. Move it out of Downloads into the raw folder: `mv ~/Downloads/<file> ~/Library/Application\ Support/Memobrick/data-pull-raw/<today>/`. Then write the clean copy into the repo:
     `python3 marketing/tools/clean_csv.py "<raw file>" marketing/data/<source>/<today>-<report>.csv` (add `--member Queries.csv` etc. for a zip). This drops email, phone, name and address columns and scrubs any email or phone left in a cell. Never copy or move a raw download into the repo.
   - If there is no export or it fails, read the visible table (all rows that matter, at least the top 50 by cost or clicks) and write it as a small CSV or markdown table yourself. Never write a person's name, email, phone number or address.
   - Allowed to make reading possible: date range, comparison, sorting, table rows per page, showing or hiding a column in a table, opening a report. Never press Save, Apply to account, Create, Schedule, Share with someone, Publish, Boost, Edit, Pause, Enable, Remove, or Accept on a recommendation, and never save a report, view, column set, exploration, segment or filter.

   **a. Google Ads** (ads.google.com, account 672-499-4049; check the account number at the top before reading anything):
   - Campaigns table, all campaigns including paused and removed ones that spent: cost, clicks, conversions, conv. value, search impression share, search lost IS (budget), search lost IS (rank). Three files: `campaigns-7d`, `campaigns-30d`, `campaigns-30d-last-year`.
   - Search terms, last 30 days, all campaigns: search term, match type, campaign, ad group, cost, clicks, conversions, conv. value: `search-terms-30d`.
   - Performance Max: for each PMax campaign, its asset groups with status and ad strength (`pmax-asset-groups`), and each asset group's assets with type, text or file name, status and performance label where shown (`pmax-assets`).
   **b. Google Analytics (GA4)** (analytics.google.com, the mymemobrick.com property; check the property name at the top). Last 30 days compared with the same period last year:
   - Reports > Acquisition > Traffic acquisition by Session default channel group: sessions, add-to-carts, purchases (ecommerce purchases or the purchase key event), total revenue: `channels-30d-yoy`.
   - Reports > Engagement > Landing page, same metrics, top 50 landing pages: `landing-pages-30d-yoy`.
   If a metric is not in the standard report, note it as missing in `latest.md`; do not build or save an exploration.
   **c. Search Console** (search.google.com/search-console, property mymemobrick.com). Performance > Search results, Compare: last 28 days vs the same period last year, clicks, impressions, CTR and position on. Export > Download CSV (a zip): `queries-28d-yoy` from `Queries.csv` and `pages-28d-yoy` from `Pages.csv`.
   **d. Meta Business Suite** (business.facebook.com > Insights, the Memobrick Facebook Page and Instagram account). Last 30 days:
   - Content: every Instagram and Facebook post and reel, with date, type, caption start (first 60 characters), permalink, reach, likes (reactions), comments, saves, shares and plays where shown. Use Export data when offered. `content-30d` (one file, with a platform column).
   - Audience or Overview: followers now and follower change over the 30 days, for Instagram and Facebook: `followers-30d` (a small markdown table is fine).
   **e. TikTok** (tiktok.com/tiktokstudio/analytics) and **f. Pinterest** (analytics.pinterest.com), only if already logged in to the Memobrick account: last 30 days overview (views or impressions, engagement, followers and change) and per post or pin results where listed: `overview-30d` and `posts-30d`. A login page here is `not logged in`, not an error.
4. **Tidy:** `git rm` snapshot files in `marketing/data/<source>/` dated more than 60 days ago (history keeps them). Never touch other folders.
5. **Write `marketing/data/latest.md`**, replacing it:
   ```
   Updated: <YYYY-MM-DD HH:MM>

   # Data snapshots
   <one line: pulled by the memobrick-data-pull skill on the owner's Mac, read-only>

   ## Reports
   | Source | Report | File | Window | Compared with | Status |
   ```
   One row per report: the repo path of the newest file, the exact dates (`2026-09-13 to 2026-10-12`), the comparison dates, and `ok`, `ok (read from screen)`, `partial: <why>`, `needs owner: <why>`, `not logged in` or `not pulled (time)`. Keep rows for reports that failed today pointing at the last good file and its date. Then `## Needs owner` (one line each: site and what Eden must do, for example `Google Ads: log in again in Chrome`) and `## Requests fulfilled this run` (each request and its file).
6. **Clear requests:** delete the lines under `## Open` in `requests.md` that you fulfilled; leave the rest with their `(tried ...)` note.
7. **Check for personal data:** `python3 marketing/tools/check.py data`. If it reports anything, fix that file (drop the column or the value) and run it again until it passes. Never commit a file it flags.
8. Commit only `marketing/data/`: `git add marketing/data` then `git commit -m "data-pull: <YYYY-MM-DD>"` (add ` (needs owner)` when any source needed the owner), then `git pull --rebase origin main && git push origin main`. If `git status` shows other changed files, leave them alone and do not add them.
9. Reply with one line per source: pulled (which reports), needs owner and why, or not logged in.

## Never

- Change any setting, campaign, budget, bid, keyword, asset, audience, conversion, post, comment, message, page, profile or account, or accept any recommendation.
- Save, schedule or share a report, view, exploration, segment, filter or column set.
- Sign in, enter a password or verification code, solve a CAPTCHA, or switch to an account you were not already in.
- Put personal data in the repo: no emails, names, phone numbers or addresses of customers or anyone else. Raw downloads stay outside the repo.
- Leave a downloaded file in ~/Downloads, or commit anything outside `marketing/data/`.
- Use Adspirer or any other paid connector; this skill exists so they are not needed.
