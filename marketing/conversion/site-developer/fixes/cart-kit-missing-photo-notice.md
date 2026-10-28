# Cart notice for a custom kit with no photo (A-2026W44-019), built 2026-10-28

Built and tested by: site-developer (Jenny). Approved item: A-2026W44-019 (Wilson's draft `marketing/conversion/auditor/site-changes/cart-kit-missing-photo-notice.md`).
Status: in theme copy **"Memobrick proof and cart fixes", id 189322330332** (unpublished), together with A-2026W44-018. Eden publishes it. See `fixes/freeproof-form-fallback.md` for why it is a new copy.

## Problem
A custom photo kit can reach checkout with no design and no photo on the line (order #21109, second line). The cart page shows it like a finished line, so the customer gets no hint, and the team has to chase a photo after payment.

## Change: templates/cart.liquid
Live md5 13f6c57bb371bb521b378e0bb574c50a, copy md5 3f9188860173dc2d1ef499567d804c50. Files: `theme-files/proof-cart-2026-10-28/before|after/templates/cart.liquid`.

Before:
```liquid
          {% if forloop.last %}
            <a href="/pages/editor#editor" ...>Edit this design again</a>
          {% endif %}
```
After:
```liquid
          {%- assign needs_photo = false -%}
          {%- if item.product.type == 'Custom Photo Mosaic Kit' -%}
            {%- if item.properties['Design ID'] == blank and item.properties['Final Design'] == blank and item.properties['_design'] == blank and item.properties['Original photo'] == blank and item.properties['_Build Instructions'] == blank -%}
              {%- assign needs_photo = true -%}
            {%- endif -%}
          {%- endif -%}
          {% if needs_photo %}
            <div class="mb-kit-nophoto" role="status" style="...amber box...">
              This kit has no photo yet. <a href="/pages/editor#editor" ...>Add your photo</a> so we can make your design, then remove this line.
            </div>
          {% elsif forloop.last %}
            <a href="/pages/editor#editor" ...>Edit this design again</a>
          {% endif %}
```
Changes from Wilson's version: it uses the product type "Custom Photo Mosaic Kit" instead of title words. All 22 custom kits have that type (checked in Shopify today). Frames ("Mosaic Frame"), ready-made art kits ("Brick Mosaic Art Kit"), the gift card and the Art Gift Kit (type empty, photo comes later by gift link) never match. It also counts `_design`, `_Build Instructions` and the Pro Design `Original photo` as a design.

Out of scope (as in the draft): the cart drawer in memobrick.js. The editor path always adds a design, so the drawer does not see photo-less lines from the editor.

## Tests (preview of 189322330332, phone 390x844 and desktop 1440x900, stopped at the cart, no checkout)
- Real editor path with a generated test picture (no person): cart shows the line with its design, no notice, "Edit this design again" as today. Phone and desktop.
- Added a 20x20 kit with no properties and a 20x20 frame through /cart/add.js: the notice shows on the bare kit line only; the frame and the editor line have none. No horizontal scroll. Phone and desktop.
- Live (before), same cart: no notice on the bare kit.
- Test carts were cleared afterwards.

Screenshots (`marketing/conversion/site-developer/2026-10-28-proof-fallback-cart-notice/`): after-phone/desktop-cart-editor-line.jpg, before-/after-phone-cart-mixed.jpg, before-/after-desktop-cart-mixed.jpg.

Preview: https://mymemobrick.com/cart?preview_theme_id=189322330332 (add a kit first)

## Expected effect
Rare today (1 line in 7 days), so a small effect on orders. It prevents paid orders that cannot be made without a follow-up email, which matters more in the December rush. Cart display only: no order email, checkout or fulfillment change.

## Undo
Publish "Memobrick fixes" (189310075100) again, or restore the Before block.
