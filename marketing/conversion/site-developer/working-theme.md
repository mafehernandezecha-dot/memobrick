# Working theme

## Now (2026-10-14, about 07:40 UTC)

| Field | Value |
|---|---|
| Live theme (MAIN) | "Memobrick fixes", id 188683092188, published by Eden on 2026-10-14 (theme updatedAt 2026-10-14T07:17:21Z) |
| Live files of the 5 approved fixes | checked by checksum: memobrick.js 88f83c4a454dcf58bc1d9c1118777f77, memobrick-email-gate.js 851b9041af3a1e33c16102520c3b92e9, memobrick-site.liquid 809e6c2ebf0eef90eeb81352bf190c94, cart.liquid 498326618234d9f98c771afe82477a15 (A-2026W42-009, -010, -013, -021, -022 are live) |
| Undo theme | "memobrick-theme-v27-print-8mm", id 188646719708, UNPUBLISHED. Never change or delete it |
| Working copy | **none.** The store has 20 themes (Shopify's limit), so `themeDuplicate` returns no theme. Waiting for Eden to remove one old theme; after her "slot free" message Shopify still listed 20 themes and duplicate still failed (step 1 in `fixes/calm-phone-home.md`) |
| Next copy | name "Memobrick calm home", duplicated from the live theme 188683092188, plus `sections/memobrick-site.liquid` from `theme-files/calm-phone-home/` (md5 883ec9b9756b04c28eb971b7bb625ff9, commit 2b1bd9f, with the dot row kept) |

Before making the copy: recheck the live theme id and updatedAt, and that live `sections/memobrick-site.liquid` is still 809e6c2ebf0eef90eeb81352bf190c94. If it changed, rebuild the calm-home edit on the new file.

## How files get into a copy

The connector's `themeFilesUpsert` takes a body of type URL (the result list comes back empty but the files are written; confirm by checksum). Each changed file is committed under `marketing/conversion/site-developer/theme-files/<slug>/` and pushed, then upserted from its raw.githubusercontent.com address at that exact commit. Writes to the live (MAIN) theme are refused by the connector. Browser tests: the sandbox gets a bot challenge after bursts of requests (navigations then fail with ERR_TUNNEL_CONNECTION_FAILED or go to shop.app); wait a few minutes and use a fresh browser context.

## History

- 2026-10-12: copy 188594847964 (later gone).
- 2026-10-14 02:53 UTC: copy "Memobrick fixes" 188683092188 from v27; got the 5 approved fixes; Eden published it on 2026-10-14.
