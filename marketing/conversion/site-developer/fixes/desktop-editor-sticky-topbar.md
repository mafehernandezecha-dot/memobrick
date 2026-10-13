# Site fix: keep the price and "Finish Editing" in view on desktop

Built and tested by: site-developer (Jenny), 2026-10-13
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 4)
Replaces Wilson's draft `marketing/conversion/auditor/site-changes/desktop-editor-sticky-topbar.md` (queue only this one).

## Problem
After an upload on desktop the editor scrolls itself and the top bar (size, price, Finish Editing = add to cart) ends up above the screen. Measured on the live site today at 1440x900: bar at y = -347, Finish Editing at y = -335. Desktop add to cart is 5.1% against 8.0% last year.

## What changes (one file: `assets/memobrick.js`)
The live `memobrick.css` served to visitors differs from the file the API returns (the CDN copy is not byte identical), so I did not edit the CSS. Instead the JS adds a tiny style tag and fixes the auto-scroll offset. Live file md5 7217509d574464c26903961b926d0d96; new file md5 2aec288b13cc132eff1452260b28710d (+305 bytes).

1. At the very start of the script, after `"use strict";`, inserted:
```js
{const e=document.createElement("style");e.setAttribute("data-mb-sticky-topbar","");e.textContent="@media(min-width:641px){.ed-topbar{position:sticky;top:60px;z-index:35}}@media(min-width:1021px){.ed-topbar{top:76px}}",document.head.appendChild(e)}
```
2. In `zs()` (scroll to the workspace), so the panel is not tucked under the bar:
Before: `a=window.innerWidth<1021?60:76,s=`
After: `a=(window.innerWidth<1021?60:76)+(document.querySelector("#edTopbar")?.offsetHeight||0),s=`

Phones (640 px and under) keep their own `#mobFinish` bar; the top bar stays hidden there, so its height counts as 0.

Full new file: `marketing/conversion/site-developer/theme-files/desktop-editor-sticky-topbar/assets/memobrick.js`. It is in the "Memobrick fixes" theme (checksum matches).

## Tested (preview https://mymemobrick.com/?preview_theme_id=188594847964)
- 1440x900 and 1024x768: after upload and closing the pop-ups, bar is `sticky` at y = 76, price and Finish Editing at y = 88, visible. Still at y = 88 after opening Crop and after scrolling 600 px.
- Finish Editing adds the 20x20 to the cart (1 item, generated flower image; no checkout, no payment).
- Not retested on a phone (the rule does not apply at 640 px and under); the home phone and email fixes in the same copy were tested yesterday.
- The live site was only opened for the first-view baseline. I did not run the add-to-cart walk on the live store.
- Screenshots: `marketing/conversion/site-developer/2026-10-13-desktop-editor-sticky-bar/` (`before-1440-first.jpg` live, `after-*` preview).

## Expected effect
About 300 real desktop visits a month reach the editor. Wilson's estimate: 2 to 5 more orders a month. Check desktop non-direct add to cart rate (baseline 5.1%) 14 and 28 days after release.

## How it will be applied
Save a backup of the live `assets/memobrick.js`, `themeFilesUpsert` to the live theme, check phone and desktop, restore the backup if anything breaks. If the connector refuses live writes: Shopify admin, Themes, live theme, Edit code, `assets/memobrick.js`, make the two edits above, Save. Note: if the email-gate or other fixes are applied first, this file is separate from theirs, so they do not conflict.

## How to undo
Restore the backup in `marketing/conversion/site-developer/backups/2026-<date>-desktop-editor-sticky-topbar/memobrick.js`, or remove the two edits.
