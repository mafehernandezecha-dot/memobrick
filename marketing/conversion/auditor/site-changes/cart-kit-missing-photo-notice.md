# Site change: cart warns when a custom kit has no design or photo attached

Proposed by: conversion-auditor, 2026-10-26
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-26.md (problem 3)

## Problem

A custom kit can reach checkout with no design and no photo on the line. Then the team has to
chase the customer for a photo after payment, which delays production and risks a refund.

Evidence (order line properties, keys only, Oct 19 to 25):
- Every web kit order of Oct 20 and 21 had its design: editor orders carry `Design ID`,
  `_design`, `Final Design`, `_Build Instructions`; Pro Design orders carry `Original photo`.
- Order #21109 (Oct 23) had a second kit line (20x30 Vertical) with no properties at all, next to a
  Pro Design line that had its photo. How that line was added is unknown (no add-to-cart form
  without the editor was found on kit pages, home or the gift collection today; kit pages had a
  photo-less "Buy now" from Oct 20 until the kit page fix on Oct 23).

The cart page shows such a line exactly like a finished one, so the customer gets no hint.

## Change: `templates/cart.liquid` (fresh copy of the live theme)

**Before:**

```liquid
          {% if forloop.last %}
            <a href="/pages/editor#editor" style="display:inline-block;margin-top:8px;font-size:12.5px;color:var(--b-blue);font-weight:600;text-decoration:underline">Edit this design again</a>
          {% endif %}
```

**After:**

```liquid
          {%- assign needs_photo = false -%}
          {%- if item.product.title contains 'Custom' and item.product.title contains 'Mosaic' -%}
            {%- if item.properties['Design ID'] == blank and item.properties['Original photo'] == blank and item.properties['Final Design'] == blank -%}
              {%- assign needs_photo = true -%}
            {%- endif -%}
          {%- endif -%}
          {% if needs_photo %}
            <div style="margin-top:8px;padding:10px 12px;border-radius:8px;background:#fff4e5;font-size:13px;color:var(--ink-1)">
              This kit has no photo yet. <a href="/pages/editor#editor" style="color:var(--b-blue);font-weight:600;text-decoration:underline">Add your photo</a> so we can make your design, then remove this line.
            </div>
          {% elsif forloop.last %}
            <a href="/pages/editor#editor" style="display:inline-block;margin-top:8px;font-size:12.5px;color:var(--b-blue);font-weight:600;text-decoration:underline">Edit this design again</a>
          {% endif %}
```

Notes for the builder:
- Check the exact product title words on the live kits (they were rewritten Oct 20, for example
  "Custom Photo Brick Mosaic Portrait 20x20 in - Personalized DIY Photo Gift Kit"). Frames,
  gift cards and gift boxes must not match. If the title test is fragile, use a product tag or
  type instead (for example `item.product.type`), whichever all 22 custom kits share.
- Gift kit products that are redeemed later (the Art Gift Kit) must not show the warning; exclude
  them by handle or tag.
- The cart drawer (memobrick.js) is out of scope for this item.

## Test (theme copy, phone and desktop)

1. Editor path: upload a generated test image, Finish Editing, open `/cart`: no warning, "Edit this design again" shows as today.
2. Pro Design path: no warning.
3. Add a custom kit variant without properties through `/cart/add?id=<variant>&quantity=1` in the preview: the warning shows on that line only.
4. Frame and gift box lines: no warning.
5. Stop at the cart. No checkout, no order.

## Expected effect

Rare today (1 line in 7 days), so a small effect on orders. It prevents paid orders that cannot be
made without a follow-up email, which matters more in the December rush.

## Undo

Restore the Before block.
