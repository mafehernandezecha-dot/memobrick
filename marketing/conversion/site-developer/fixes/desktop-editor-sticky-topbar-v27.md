# Site fix: keep the price and "Finish Editing" in view on desktop (rebuilt on live theme v27)

Built and tested by: site-developer (Jenny), 2026-10-14
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 4)
Replaces `fixes/desktop-editor-sticky-topbar.md`. That draft was built on theme v25 (md5 7217509d...), but the live theme is now memobrick-theme-v27-print-8mm (published 2026-10-13) and its `assets/memobrick.js` is different (md5 cb938c927b6c8e00e8b56bc200f7407f). Applying the old file would overwrite v27's changes. Do not approve the old item; approve this one.

## Problem and effect
Same as the old draft: after an upload on desktop the editor scrolls its price and Finish Editing bar off screen (bar at y = -347 at 1440x900). Desktop add to cart is 5.1% against 8.0% last year. Wilson's estimate: 2 to 5 more orders a month.

## What changes (one file, `assets/memobrick.js`, two exact edits on the live v27 file)
1. After the opening `(()=>{"use strict";` insert:
`{const e=document.createElement("style");e.setAttribute("data-mb-sticky-topbar","");e.textContent="@media(min-width:641px){.ed-topbar{position:sticky;top:60px;z-index:35}}@media(min-width:1021px){.ed-topbar{top:76px}}",document.head.appendChild(e)}`
2. Before: `a=window.innerWidth<1021?60:76,s=`
   After: `a=(window.innerWidth<1021?60:76)+(document.querySelector("#edTopbar")?.offsetHeight||0),s=`
Result file: `marketing/conversion/site-developer/theme-files/desktop-editor-sticky-topbar-v27/assets/memobrick.js`, md5 73b1cb2c54eecdcb698929a00d9d184b (live + 2 edits). If the cart fix is applied first, apply these two edits to the then-live file instead.

## Tested (preview https://mymemobrick.com/?preview_theme_id=188683092188)
Desktop 1440x900: generated image uploaded, pop-up closed: bar `position: sticky`, top 76, Finish Editing at y = 88; after scrolling 700 px the bar is still at 76. Screenshot: `marketing/conversion/site-developer/2026-10-14-cart-design-shipping/after-desktop-editor-bar.jpg`. The earlier v25 tests (1024x768, add to cart) are in `marketing/conversion/site-developer/2026-10-13-desktop-editor-sticky-bar/`.

## Apply and undo
Backup live `assets/memobrick.js`, upsert, check desktop editor and phone, restore the backup if anything breaks. Manual fallback: Edit code, `assets/memobrick.js`, make the two edits.
