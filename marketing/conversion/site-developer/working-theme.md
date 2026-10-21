# Working theme

## Now (2026-10-21)

| Field | Value |
|---|---|
| Live theme (MAIN) | "Memobrick cart no shipping box", id 188955623644, published by Eden on 2026-10-20 (A-2026W42-046). Checked 2026-10-21: cart.liquid 13f6c57bb371bb521b378e0bb574c50a, memobrick.js 88f83c4a454dcf58bc1d9c1118777f77, product.liquid aaaad07d16b9e81e1dce5b60f65879fe |
| Working copy (to publish) | **"Memobrick kit page fix", id 188955361500**, UNPUBLISHED. It is the old "Memobrick cart rollback" copy, renamed and reset to live (cart.liquid and memobrick.js re-uploaded from the repo by URL, md5 confirmed) plus the new product.liquid 54578873af06ce0965e57ba29b8cd85f. Preview https://mymemobrick.com/products/2-2-boards?preview_theme_id=188955361500. See fixes/kit-page-creator-check.md |
| Undo after publish | republish "Memobrick cart no shipping box" 188955623644 |
| Theme count | 20 of 20, so no new copy can be made; the copy above was reused |
| Tip | `themeFilesUpsert` with body type URL works from a public GitHub raw link of a pushed commit (not from mymemobrick.com or cdn.shopify.com); use it for large files like memobrick.js |

## Previous (2026-10-20)

### Live theme then: "Memobrick calm home" 188697510108 (now unpublished, the undo for the cart change; do not touch)
| Field | Value |
|---|---|
| Live theme (MAIN) | "Memobrick calm home", id 188697510108 (updatedAt 2026-10-14T11:42:00Z). Checked 2026-10-20: cart.liquid 498326618234d9f98c771afe82477a15, memobrick.js 88f83c4a454dcf58bc1d9c1118777f77, memobrick-email-gate.js 851b9041af3a1e33c16102520c3b92e9, memobrick-site.liquid d641ed44212004aaa1ab2be733f6829f |
| Rollback copy | **"Memobrick cart rollback", id 188955361500**, UNPUBLISHED, duplicated from live on 2026-10-20 for A-2026W42-045; only cart.liquid (e494bd6a40250dd4c433f2cfdd2ac5cc) and memobrick.js (75dc4d8d376915dc62242dc28cffbf39) changed. NOT to be published (replaced by A-2026W42-046). See fixes/cart-rollback-2026-10-20.md |
| Targeted copy (to publish) | **"Memobrick cart no shipping box", id 188955623644**, UNPUBLISHED, duplicated from live 2026-10-20 for A-2026W42-046; only cart.liquid changed (13f6c57bb371bb521b378e0bb574c50a). See fixes/cart-no-shipping-box-2026-10-20.md. Preview https://mymemobrick.com/?preview_theme_id=188955623644 |
| Preview (full rollback, not to publish) | https://mymemobrick.com/?preview_theme_id=188955361500 |
| Undo after publish | republish "Memobrick calm home" 188697510108 |
| Theme count | 20 of 20 (at the limit; Eden may remove 188955361500) |

## Previous (2026-10-14)

| Field | Value |
|---|---|
| Live theme (MAIN) | "Memobrick fixes", id 188683092188, published by Eden on 2026-10-14 (theme updatedAt 2026-10-14T07:17:21Z) |
| Live files of the 5 approved fixes | checked by checksum: memobrick.js 88f83c4a454dcf58bc1d9c1118777f77, memobrick-email-gate.js 851b9041af3a1e33c16102520c3b92e9, memobrick-site.liquid 809e6c2ebf0eef90eeb81352bf190c94, cart.liquid 498326618234d9f98c771afe82477a15 (A-2026W42-009, -010, -013, -021, -022 are live) |
| Undo theme | "memobrick-theme-v27-print-8mm", id 188646719708, UNPUBLISHED. Never change or delete it |
| Working copy | **"Memobrick calm home", id 188697510108** (gid://shopify/OnlineStoreTheme/188697510108), UNPUBLISHED, duplicated from the live theme 188683092188 on 2026-10-14 ~10:47 UTC. Never publish it myself |
| Preview | https://mymemobrick.com/?preview_theme_id=188697510108 |
| Changes in the copy | only `sections/memobrick-site.liquid` = `theme-files/calm-phone-home/` at commit 1c2cb58, md5 d641ed44212004aaa1ab2be733f6829f (calm phone home with dots + EARLYHOLIDAY20 promo line, P-site-developer-20261014-3 and A-2026W42-036). All 514 files compared with live by checksum: only this file differs |
| Theme count | 18 after the copy (Eden removed 3 old themes: "Copy of Copy of Copy of Copy of xx" 136454832348, "Copy for motti 2" 151460577500, "memobrick-theme-updated-1" 167017840860) |

Before Eden publishes, or if live changes: recheck the live theme id and updatedAt, and that live `sections/memobrick-site.liquid` is still 809e6c2ebf0eef90eeb81352bf190c94. If it changed, rebuild the calm-home edit on the new file.

## How files get into a copy

The connector's `themeFilesUpsert` takes a body of type URL (the result list comes back empty but the files are written; confirm by checksum). Each changed file is committed under `marketing/conversion/site-developer/theme-files/<slug>/` and pushed, then upserted from its raw.githubusercontent.com address at that exact commit. Writes to the live (MAIN) theme are refused by the connector. Browser tests: the sandbox gets a bot challenge after bursts of requests (navigations then fail with ERR_TUNNEL_CONNECTION_FAILED or go to shop.app); wait a few minutes and use a fresh browser context.

## History

- 2026-10-12: copy 188594847964 (later gone).
- 2026-10-14 02:53 UTC: copy "Memobrick fixes" 188683092188 from v27; got the 5 approved fixes; Eden published it on 2026-10-14.
