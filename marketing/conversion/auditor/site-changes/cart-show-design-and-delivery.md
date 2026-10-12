# Site change: Show the customer's own mosaic in the cart, hide internal fields, add the Christmas order-by date

Proposed by: conversion-auditor, 2026-10-12
Executor: seo-technical
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 5)

## Problem (seen on the live site, phone and desktop)

After **Finish Editing**, the cart drawer and the `/cart` page show:

- The product's stock photo (a girl holding a mosaic) as the line image, not the mosaic the customer just made. In the drawer the image box was empty in our test.
- `No (Build at home)` as the variant name.
- Six internal fields: `Design ID: MB-20261012-…`, `MemoBrick Size`, `Orientation`, `Brick grid: 64 x 64 studs`, `Build service: Build at home`, and `Final Design: https://cdn.shopify.com/s/files/…png`. That last one is a raw file address that runs off the edge of a phone screen.
- No delivery information. The cart says only "Taxes, discounts and shipping are calculated at checkout."

People bought this as a personalized gift. Seeing their own design at the step where they decide to pay is reassurance we already have and do not show.

Screenshots: `marketing/conversion/auditor/2026-10-12/phone-20x20-10-cart-page.jpg`, `phone-20x20-09-finish-editing-add-to-cart.jpg`, `desktop-20x20-10-cart-page.jpg`.

Cart to checkout is healthy (213 of 258 carts reached checkout in 30 days), so this ranks below the editor problems. It also supports checkout completion (26%), which is the weak point for the email agents.

## Change 1: `templates/cart.liquid`

**Before (lines 12 to 20):**

```liquid
        {% if item.image %}<img src="{{ item.image | image_url: width: 160 }}" alt="{{ item.title | escape }}" width="80" height="80" style="width:80px;height:80px;object-fit:cover;border-radius:8px;flex:0 0 auto">{% endif %}
        <div style="flex:1">
          <b>{{ item.product.title }}</b>
          <div style="font-family:var(--mono);font-size:12px;color:var(--ink-3)">{{ item.variant.title }}</div>
          {% for p in item.properties %}
            {% unless p.last == blank or p.first == '_design' or p.first contains '_' %}
              <div style="font-size:12.5px;color:var(--ink-2)">{{ p.first }}: {{ p.last }}</div>
            {% endunless %}
          {% endfor %}
```

**After:**

```liquid
        {%- assign design_img = item.properties['Final Design'] -%}
        {% if design_img != blank %}
          <img src="{{ design_img }}" alt="Your mosaic design" width="80" height="80" loading="lazy" style="width:80px;height:80px;object-fit:cover;border-radius:8px;flex:0 0 auto;image-rendering:pixelated">
        {% elsif item.image %}<img src="{{ item.image | image_url: width: 160 }}" alt="{{ item.title | escape }}" width="80" height="80" style="width:80px;height:80px;object-fit:cover;border-radius:8px;flex:0 0 auto">{% endif %}
        <div style="flex:1;min-width:0">
          <b>{{ item.product.title }}</b>
          {% if item.variant.title contains 'Build at home' %}
            <div style="font-family:var(--mono);font-size:12px;color:var(--ink-3)">Build-at-home kit</div>
          {% else %}
            <div style="font-family:var(--mono);font-size:12px;color:var(--ink-3)">{{ item.variant.title }}</div>
          {% endif %}
          {% for p in item.properties %}
            {% unless p.last == blank or p.first == '_design' or p.first contains '_' or p.first == 'Final Design' or p.first == 'Design ID' or p.first == 'Brick grid' or p.first == 'Build service' or p.first == 'Orientation' %}
              <div style="font-size:12.5px;color:var(--ink-2);overflow-wrap:anywhere">{{ p.first }}: {{ p.last }}</div>
            {% endunless %}
          {% endfor %}
```

**Before (line 41):**

```liquid
    <p style="font-size:12px;color:var(--ink-3);margin-top:12px">Taxes, discounts and shipping are calculated at checkout.</p>
```

**After:**

```liquid
    <p style="font-size:13px;color:var(--ink-2);margin-top:12px">Order by December 15 to receive it before Christmas. Free shipping on US orders over $125.</p>
    <p style="font-size:12px;color:var(--ink-3);margin-top:4px">Taxes and shipping are calculated at checkout.</p>
```

The properties stay on the line item, so the order still carries Design ID, Brick grid and the Final Design file for production. Only the display changes.

## Change 2: `assets/memobrick.src.js`, cart drawer (around line 8477), then rebuild `assets/memobrick.js`

**Before:**

```js
        if (item.image){
          const img = document.createElement("img");
          img.src = item.image + "&width=120";
```

**After:**

```js
        const designImg = item.properties && item.properties["Final Design"];
        if (designImg || item.image){
          const img = document.createElement("img");
          img.src = designImg ? designImg : item.image + "&width=120";
```

**Before:**

```js
          variant.textContent = item.variant_title;
```

**After:**

```js
          variant.textContent = /Build at home/.test(item.variant_title) ? "Build-at-home kit" : item.variant_title;
```

## Facts used

- "Order by December 15 to receive it before Christmas": Christmas order-by date in the Facts table of `marketing/shared/offers-calendar.md`, verified by the owner on 2026-10-11. Remove the line after December 15, 2026.
- "Free shipping on US orders over $125": active Shopify automatic discount "Free Shipping on US Orders Over $125" (read-only check, 2026-10-12). The cart drawer already says "Add $X more for free shipping".

## Before you apply

- Pull the live `templates/cart.liquid` and `memobrick.js` first. Test on a duplicate theme with one editor design in the cart, at 390×844 and 1440×900.
- Confirm that the thumbnail shows the mosaic and that no line runs off the screen.
- Confirm that the order in Shopify admin still shows every property. Use a test checkout with no payment, or look at the cart JSON at `/cart.js`; do not place an order.

## How we will know it worked

Sessions that reached checkout ÷ sessions with cart additions (83% in the last 30 days), and checkout completion (56 of 213, 26%). Check 28 days after release. A small effect is expected, so it may not be measurable at this volume.
