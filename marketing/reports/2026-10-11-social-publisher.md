# DRY RUN: social-publisher 2026-10-11

## Summary

Postiz not connected (POSTIZ_API_URL unset, postiz CLI not installed). Stopped at the connection check.
No approved items exist yet. Nothing scheduled, nothing changed in the calendar.

## Done

- Connection check run. Log: marketing/social/publisher/2026-10-11-log.md.
- Read marketing/shared/content-calendar.md: 3 Ready posts and 2 Creating posts for 2026-W42, none approved.

## Proposed for approval

None

## Blocked or unknown

- Postiz not connected: POSTIZ_API_URL is not set and `postiz` is not on PATH.
- Approved posts waiting: none. No approvals file for 2026-W42 yet.
- Would schedule once approved and connected (Ready, pending approval):
  - S-20261012-1: Instagram, Facebook, TikTok at 2026-10-12 19:00 ET (Drive video, upload with postiz upload; TikTok DIRECT_POST)
  - S-20261015-1: Instagram, Facebook, TikTok at 2026-10-15 12:00 ET
  - S-20261018-1: Instagram, Facebook, TikTok at 2026-10-18 11:00 ET
- Not eligible: S-20261013-1 and S-20261016-1 (Creating, no asset).
- Drive media would need downloading before `postiz upload`; the Drive connector's download step is untested here.

## Next run

- Daily 18:00 ET. Needs Postiz API URL and credentials, the CLI installed, and approved items in marketing/approvals/2026-W42.md.
