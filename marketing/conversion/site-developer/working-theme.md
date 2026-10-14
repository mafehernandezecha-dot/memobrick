# Working theme

| Field | Value |
|---|---|
| Name | Memobrick fixes |
| Theme id | 188683092188 (gid://shopify/OnlineStoreTheme/188683092188) |
| Role | UNPUBLISHED (never publish it) |
| Created | 2026-10-14, with themeDuplicate from the live theme (the 2026-10-12 copy 188594847964 no longer exists) |
| Copied from | memobrick-theme-v27-print-8mm, id 188646719708 (MAIN), live theme last updated 2026-10-13T10:04:49Z |
| Preview | https://mymemobrick.com/?preview_theme_id=188683092188 |

## Changes in this copy (tested, none live)

| File | Fix | md5 in the copy | Live md5 when copied |
|---|---|---|---|
| assets/memobrick-email-gate.js | email-gate-ab-no-keyboard | 851b9041af3a1e33c16102520c3b92e9 | 5a95f0f5d9c9c7f848a9c313210c36e9 |
| sections/memobrick-site.liquid | home-phone-cta-above-fold | 809e6c2ebf0eef90eeb81352bf190c94 | 5516bd7733c1c1bb254e448f26450ca2 |
| assets/memobrick.js | desktop-editor-sticky-topbar-v27 plus cart drawer edits plus Pro Design keeps size (A-2026W42-013), uploaded 2026-10-14 06:59 UTC from `theme-files/live-bundle-2026-10-14/` | 88f83c4a454dcf58bc1d9c1118777f77 | cb938c927b6c8e00e8b56bc200f7407f |

All four files are approved (A-2026W42-009, -010, -013, -021, -022). Rechecked 2026-10-14 ~07:00 UTC: live updatedAt still 2026-10-13T10:04:49Z, live checksums still the "Live md5" column, and the copy differs from live only in these four files (checked about 400 files). Live writes are refused by the connector; owner steps in `fixes/live-apply-2026-10-14.md`.
| templates/cart.liquid | cart-design-delivery-shipping | 498326618234d9f98c771afe82477a15 | e494bd6a40250dd4c433f2cfdd2ac5cc |

Recreate this copy if the live theme's `updatedAt` moves past 2026-10-13T10:04:49Z or the live theme id changes. When recreating, the earlier fixes must be rebased: the v25 version of memobrick.js (theme-files/desktop-editor-sticky-topbar) is obsolete.

## How files get into the copy

The connector's `themeFilesUpsert` takes a body of type URL (the result list comes back empty but the files are written; confirm by checksum). Each changed file is committed under `marketing/conversion/site-developer/theme-files/<slug>/` and pushed, then upserted from its raw.githubusercontent.com address at that exact commit. Browser tests: the sandbox gets a bot challenge (HTTP 429) after bursts of requests; wait a few minutes and use a plain Chrome user agent.
