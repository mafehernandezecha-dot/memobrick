# Site change: Keep the size the visitor picked when they choose Pro Design

Proposed by: conversion-auditor, 2026-10-12
Executor: seo-technical
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 6)

## Problem (seen on the live site, phone)

On the 20×20 product page, **Order with Pro Design** links to `/pages/editor?size=20x20#design`. The Pro Design page then shows "Choose a size" with no size selected, and dashes where the bricks, baseplates and price should be. The visitor has to pick the size they already picked. In the theme code, the Checkout button shows an error until a size is picked (`#svcSizeErr`). We read this in the code and did not test it live.

Screenshot: `marketing/conversion/auditor/2026-10-12/phone-pro-01-landing.jpg`.

Pro Design orders matter most right now. Draft-order sales (designer proofs) fell from 67 orders to 3 against the same 30 days last year, so every visitor who asks for design help is worth keeping.

## Change: `assets/memobrick.src.js`, function `designerService()`, then rebuild `assets/memobrick.js`

**Before:**

```js
  const svc = { file: null, sizeId: null, showAll: false };
  const POPULAR = ["16x16", "20x20", "20x30", "30x30"];
```

**After:**

```js
  const POPULAR = ["16x16", "20x20", "20x30", "30x30"];
  const askedSize = new URLSearchParams(location.search).get("size");
  const knownSize = askedSize && SIZES.some((z) => z.id === askedSize) ? askedSize : null;
  const svc = { file: null, sizeId: knownSize, showAll: !!knownSize && POPULAR.indexOf(knownSize) === -1 };
```

Then make sure `drawSizes(); summary();` run once at start-up (they are probably already called; if not, add them at the end of `designerService()` before it returns).

## Before you apply

- Pull the live `memobrick.js` first. On a duplicate theme, open these and confirm that the matching size card is selected and the summary shows its price:
  - `/pages/editor?size=20x20#design`
  - `?size=16x16`
  - `?size=40x30`, which is not a popular size, so "Show all sizes" should already be open
- Confirm that `/pages/editor#design` with no size still shows "Choose a size".
- Stop at the checkout page. Do not place an order.

## How we will know it worked

Pro Design orders show as orders whose line items carry the Pro Design property (check with read-only Admin queries). The baseline is unknown, so record the count from release.
