# Working theme

| Field | Value |
|---|---|
| Name | Memobrick fixes |
| Theme id | 188594847964 (gid://shopify/OnlineStoreTheme/188594847964) |
| Role | UNPUBLISHED (never publish it) |
| Created | 2026-10-12, with themeDuplicate from the live theme |
| Copied from | memobrick-theme-v25, id 188263596252 (MAIN), live theme last updated 2026-10-04T09:25:26Z |
| Preview | https://mymemobrick.com/?preview_theme_id=188594847964 |

## Changes in this copy (all tested 2026-10-12, none live)

| File | Fix | md5 in the copy | Live md5 when copied |
|---|---|---|---|
| assets/memobrick-email-gate.js | email-gate-ab-no-keyboard | 851b9041af3a1e33c16102520c3b92e9 | 5a95f0f5d9c9c7f848a9c313210c36e9 |
| sections/memobrick-site.liquid | home-phone-cta-above-fold | 809e6c2ebf0eef90eeb81352bf190c94 | 5516bd7733c1c1bb254e448f26450ca2 |
| assets/memobrick.js | desktop-editor-sticky-topbar (2026-10-13) | 2aec288b13cc132eff1452260b28710d | 7217509d574464c26903961b926d0d96 |

Recreate this copy if the live theme's `updatedAt` moves past 2026-10-04T09:25:26Z or the live theme id changes.

## How files get into the copy

The connector's `themeFilesUpsert` takes a body of type URL. Each changed file is committed under `marketing/conversion/site-developer/theme-files/<slug>/` and pushed, then upserted from its raw.githubusercontent.com address at that exact commit, and the checksum in the copy is compared with the local file. This avoids retyping large theme files.
