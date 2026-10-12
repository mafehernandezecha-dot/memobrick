# Site change: Keep the price and "Finish Editing" in view on desktop

Proposed by: conversion-auditor, 2026-10-12
Executor: seo-technical
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 4)

## Problem (seen on the live site, 1440×900)

After a visitor uploads a photo and closes the two pop-ups, the editor scrolls itself so the picture and tool panel sit at the top of the screen. That scroll pushes the editor's top bar (size, price and the **Finish Editing** button, which is the add-to-cart button) above the screen: it sat at y = -335 px. The other order button (`#orderBtn`, "Order the 20 × 20" kit") sat at y = 1764 px, about 860 px below the bottom of the screen. So on the first editor view a desktop visitor sees no price and no way to order. The only red button on screen is the header's "Create My MemoBrick", which starts over.

Screenshots: `marketing/conversion/auditor/2026-10-12/desktop-check-editor-first-view.jpg` and `desktop-20x20-07-adjust-crop.jpg`.

Cause: the live `assets/memobrick.css` sets the bar to `position:static`. The rule is the same live and in the repo (checked 2026-10-12). Then `levelWithPicture()` in `assets/memobrick.js` scrolls the workspace to the top of the screen.

## Change

### 1. `assets/memobrick.css` (and `assets/memobrick.src.css`, so the source stays in step)

**Before:**

```css
.ed-topbar{position:static;display:flex;align-items:center;gap:16px;background:#fff9f5;border-bottom:1px solid #ede4df;padding:12px 24px;color:#292323}
```

**After:**

```css
.ed-topbar{position:sticky;top:76px;z-index:35;display:flex;align-items:center;gap:16px;background:#fff9f5;border-bottom:1px solid #ede4df;padding:12px 24px;color:#292323}
```

Leave the existing `@media(max-width:640px){.ed-topbar{display:none}}` rule as it is. Phones use their own sticky bar (`#mobFinish`), which already works.

### 2. `assets/memobrick.src.js`, function `levelWithPicture()`, then rebuild `assets/memobrick.js` the way the theme normally builds it

This keeps the auto-scroll from tucking the panel under the now sticky bar.

**Before:**

```js
    const header = window.innerWidth < 1021 ? 60 : 76;
```

**After:**

```js
    const bar = document.querySelector("#edTopbar");
    const header = window.innerWidth < 1021 ? 60 : 76 + (bar && bar.offsetParent ? bar.offsetHeight : 0);
```

## Before you apply

- The repo theme is not identical to live everywhere. For example, the editor upload text differs. Pull the live `memobrick.css` and `memobrick.js` first and apply the change to those.
- Apply it on a duplicate theme, then check these at 1440×900 and 1024×768:
  1. Upload a photo, close both pop-ups, and confirm that the size, price and Finish Editing button are visible.
  2. Open each tool (Crop, Background, Colors) and confirm that the panel title is not hidden under the bar.
  3. Click Finish Editing and confirm that the cart drawer opens with the design.
- Publish only after those checks pass.

## How we will know it worked

Desktop non-direct sessions with an add to cart (Shopify sessions table, `referrer_source != 'direct'`, `session_device_type = 'desktop'`). The baseline is 5.1% (16 of 314, 2026-09-12 to 2026-10-11), against 8.0% in the same period last year. Check it 14 and 28 days after release.
