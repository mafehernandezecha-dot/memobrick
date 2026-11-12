# Site change: cart says free shipping is US only and does not combine with codes

Proposed by: conversion-auditor, 2026-11-12
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-11-12.md (problem 1)

## Problem (live site, phone and desktop, 2026-11-12)

Free US shipping over $125 is an automatic discount, and discount codes do not combine with it
(owner decision, offers-calendar Facts, 2026-10-20). The cart never says so:

- Cart drawer (after Finish Editing): "Add $25.12 more for free shipping" with a progress bar.
  At $125 or more it says "You've unlocked free shipping! 🎉". It does not say US only, and it
  does not say a code removes free shipping. The bar uses the cart total before any code.
- Cart page (`/cart`): only "Taxes are calculated at checkout." Nothing about free shipping or codes.

Evidence, abandoned checkouts Nov 2 to 11 (amounts and codes only, no customer fields): 14 had a
shipping cost added. 2 of them were over $125 with a code and paid shipping although the drawer had
told them free shipping was unlocked: $164.88 of kit and frame with a code, shipping $20.66 added;
$487.99 of two kits with a code, shipping $26.44 added. Together $546.71 of carts after the code.
Phone checkout completion Nov 9 to 11 is 4 of 17 (24%), vs 8 of 13 (62%) the same weekdays last year.

Screenshots: `marketing/conversion/auditor/2026-11-12/phone-drawer-check.jpg`, `desktop-drawer-check.jpg`,
`phone-p20-10-cart-page.jpg`, `desktop-p20-10-cart-page.jpg`.

## Work from a fresh copy of the live theme

The live theme (`/cdn/shop/t/215/`) differs from the repo folder: its cart page reads
"Taxes are calculated at checkout." Make the change on a new copy of the live theme, or add it to
the approved, unpublished copy "Memobrick proof and cart fixes" (189322330332) if that copy is
still current with live. Keep the threshold from the theme setting `free_shipping_threshold`.

## Change 1: cart drawer message (`assets/memobrick.js`, source `memobrick.src.js`, `renderCart`)

**Before:**

```js
          if (cart.total_price >= threshold){
            msg.textContent = "You've unlocked free shipping! 🎉";
          } else {
            const remaining = fmt(threshold - cart.total_price);
            msg.textContent = "Add " + remaining + " more for free shipping";
          }
```

**After:**

```js
          if (cart.total_price >= threshold){
            msg.textContent = "Your order ships free in the US.";
          } else {
            const remaining = fmt(threshold - cart.total_price);
            msg.textContent = "Add " + remaining + " more for free US shipping.";
          }
```

## Change 2: one fixed line under the drawer bar (`snippets/site-header.liquid` and `sections/memobrick-site.liquid`)

**Before:**

```liquid
        <div class="cart-ship-bar" id="cartShipBar" hidden>
          <p class="cart-ship-msg" id="cartShipMsg"></p>
          <div class="cart-ship-track"><div class="cart-ship-fill" id="cartShipFill"></div></div>
        </div>
```

**After:**

```liquid
        <div class="cart-ship-bar" id="cartShipBar" hidden>
          <p class="cart-ship-msg" id="cartShipMsg"></p>
          <div class="cart-ship-track"><div class="cart-ship-fill" id="cartShipFill"></div></div>
          <p class="cart-ship-note" style="font-size:12px;color:var(--ink-3);margin:6px 0 0">Discount codes can't be combined with free shipping.</p>
        </div>
```

## Change 3: cart page (`templates/cart.liquid`, the line under the Total and Checkout row)

**Before (live):**

```
Taxes are calculated at checkout.
```

**After (same element and style as today):**

```liquid
Free US shipping on orders of {{ settings.free_shipping_threshold | default: 125 | times: 100 | money_without_trailing_zeros }} or more. Discount codes can't be combined with free shipping. Taxes and shipping are calculated at checkout.
```

Copy (customer facing):

- "Add $25.12 more for free US shipping."
- "Your order ships free in the US."
- "Discount codes can't be combined with free shipping."
- "Free US shipping on orders of $125 or more. Discount codes can't be combined with free shipping. Taxes and shipping are calculated at checkout."

All four are facts from offers-calendar (Facts: Shipping rates; Discount codes and free shipping).

## Test (theme copy preview, phone 390x844 and desktop 1440x900)

1. Editor path, 20x20 ($99.88), Finish Editing: drawer reads "Add $25.12 more for free US shipping." and the codes line shows under the bar. No horizontal scroll at 390 px.
2. Add a 20x20 frame or pick 20x30 ($149): drawer reads "Your order ships free in the US." and the codes line still shows.
3. Open `/cart`: the new line shows with $125 from the theme setting.
4. Change the setting to 150 in the copy: drawer and cart page follow, then set it back to 125.
5. Stop at the cart. No checkout, no payment, no order.

## Expected effect

Direct: carts of $125 or more that use a code (2 of 14 abandoned checkouts with shipping in
Nov 2 to 11, about one a week, average about $270 after the code). They now know before checkout
that a code adds shipping, so the total is not a surprise. Indirect: every cart now says shipping
is added at checkout. Measure: phone checkout completion (completed / reached checkout, Shopify,
referred sessions) for the 14 days after publish vs the 14 days before; and abandoned checkouts at
$125 or more with a code. A rough expectation is 1 to 2 more orders a week in the Black Friday
weeks, when carts with codes rise. It does not fix shipping cost on carts under $125 with no code
(9 of 14), which only a shipping setting can change (owner decision: keep live rates).

## Undo

Restore the three Before blocks.
