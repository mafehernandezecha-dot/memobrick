# Site fix: cart shows the customer's own mosaic, hides internal fields, and shows shipping costs before checkout

Built and tested by: site-developer (Jenny), 2026-10-14
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problems 5 and 6)
Replaces Wilson's draft `marketing/conversion/auditor/site-changes/cart-show-design-and-delivery.md` (its Executor was seo-technical; queue only this one).

## Problem
1. The cart page and drawer show the product stock photo, "No (Build at home)", six internal fields (one is a raw file address that runs off a phone screen) and no delivery information.
2. Shipping cost appears only at checkout. Under $125 the rates are live carrier rates that depend on the address (UPS Ground Saver, UPS Ground, USPS Ground Advantage, UPS 3 Day Select), so there is no single price to quote. Owner decision 2026-10-12: no flat rate and no rate changes; show the real cost earlier.

## What changes (2 files, nothing in checkout, shipping rates, products or discounts)
### 1. `templates/cart.liquid` (live md5 e494bd6a40250dd4c433f2cfdd2ac5cc, new md5 498326618234d9f98c771afe82477a15)
Full new file: `marketing/conversion/site-developer/theme-files/cart-design-delivery-shipping/templates/cart.liquid`. Before: the live file (2,884 bytes, quoted in Wilson's draft). Differences:
- Line image is the customer's `Final Design` picture when the line has one (stock photo as fallback).
- Variant "No (Build at home)" shows as "Build-at-home kit".
- Hidden from view only (still on the order): Final Design, Design ID, Brick grid, Build service, Orientation. Long values wrap.
- New shipping box under the total (US visitors only; other countries see "Shipping is calculated at checkout"):
  - Cart under $125: "Free US shipping on orders $125 and up." and "Add $X more to get free shipping." plus a state menu, ZIP field and "Get rates" button. It calls Shopify's own `/cart/prepare_shipping_rates.json` and `/cart/async_shipping_rates.json` and lists each carrier rate exactly as Shopify returns it. No price is typed into the theme.
  - Cart $125 or more: "Your order qualifies for free US shipping." (no rates list, because the free-shipping discount applies at checkout).
- "Order by December 15 to receive it before Christmas." (offers-calendar, owner verified 2026-10-11). The line removes itself on 2026-12-16 with no edit needed.
- "Taxes are calculated at checkout." replaces "Taxes, discounts and shipping are calculated at checkout."

### 2. `assets/memobrick.js` (cart drawer), two exact string edits on the live file (live md5 cb938c927b6c8e00e8b56bc200f7407f; result md5 ecab543f9b1ab77f80da006b57201455 when applied to that file alone)
Edit A. Before:
`x.items.forEach(k=>{const S=document.createElement("div");if(S.className="cart-drawer-item",k.image){const $=document.createElement("img");$.src=k.image+"&width=120",`
After:
`x.items.forEach(k=>{const S=document.createElement("div"),mbD=k.properties&&/^https:\/\//.test(k.properties["Final Design"]||"")?k.properties["Final Design"]:"";if(S.className="cart-drawer-item",mbD||k.image){const $=document.createElement("img");$.src=mbD||k.image+"&width=120",`
Edit B. Before: `$.textContent=k.variant_title,w.appendChild($)`
After: `$.textContent=/Build at home/.test(k.variant_title)?"Build-at-home kit":k.variant_title,w.appendChild($)`
Full file for this edit alone: `marketing/conversion/site-developer/theme-files/cart-design-delivery-shipping/assets/memobrick.js`. If the desktop sticky-bar fix is applied first, apply these two edits to the then-live file instead (the anchors do not overlap).

## Tested (preview https://mymemobrick.com/?preview_theme_id=188683092188, theme "Memobrick fixes")
Method: browser at 390x844 and 1440x900; the cart was filled with `/cart/add.js` using the same property names the editor writes, and a generated yellow-disc image stood in for the customer's file (cdn.shopify.com is blocked in this sandbox, so the picture was served locally for the test). No real photo, no checkout address, no payment, no order.
- Phone and desktop cart: mosaic thumbnail shown, "Build-at-home kit", no internal fields, no sideways scroll (page width = screen width), December 15 line shown. Drawer: same thumbnail and kit label.
- Real rates through the new form (same values as Shopify's `/cart/shipping_rates` for the same cart):
  - 20x20 build-at-home ($99.88): FL 33101 UPS Ground Saver $6.83, UPS Ground $8.21, Ground Advantage $9.93. NY 10001 $11.02 / $11.61 / $16.21. CA 90210 $13.21 / $13.80 / $19.06 / UPS 3 Day Select $20.16. AK 99501 and HI 96815 Ground Advantage $19.06.
  - 16x16 ($69.88): TX 75201 $13.43 / $16.75 / $17.10. MT 59001 $18.70 / $19.95 / $21.57 / 3 Day Select $29.26. AK 99501 Ground Advantage $19.95. (Rates differ by size and address as expected.)
  - Two 20x20 ($199.76): shows the free-shipping message, no rates.
- Missing state or bad ZIP: a plain message; a failed lookup: "your exact shipping cost shows at checkout".
- Desktop editor sticky bar also rechecked on this copy (see its own draft).
- Screenshots in `marketing/conversion/site-developer/2026-10-14-cart-design-shipping/`: `before-*` (live, Wilson 2026-10-12) and `after-*`.

## Not verified (be aware)
- Quoted rates against the checkout page for the same address: I did not enter an email and address into checkout, because that creates an abandoned-checkout record that could trigger customer emails. The rates come from the same delivery profile and carrier accounts through Shopify's own endpoint. Owner check (2 minutes, no payment): put a 20x20 in the cart, get rates for your ZIP, go to Checkout, enter the same address and compare the shipping options on the shipping step.
- Whether the free-shipping discount covers Alaska, Hawaii and Puerto Rico: the box says "US" as the discount name does. Please confirm in Shopify (Discounts, "Free Shipping on US Orders Over $125", countries). If those are excluded, tell me and I will word the box for them.
- Puerto Rico and other territories are not in the state menu (they see "Shipping is calculated at checkout" only via checkout). Non-US visitors see the checkout note.
- Rates are carrier transit only; delivery dates are not shown because they do not include making the mosaic.
- Not tested with a real editor design end to end in this copy (cart lines were added with the editor's property names).

## Expected effect
Cart to checkout is already 83% (213 of 258 carts in 30 days) and checkout completion is 26% (56 of 213); the unknown shipping cost at checkout is a likely reason people stop. Expected: a few more completed orders a month; small and hard to measure at this volume. Check cart-to-checkout and checkout completion (referred sessions) 14 and 28 days after release.

## How it will be applied
Save backups of live `templates/cart.liquid` and `assets/memobrick.js`, `themeFilesUpsert` both to the live theme, open the live cart on phone and desktop, restore the backups if anything breaks. Re-check the live md5s first; if they changed, rebuild on the new files and propose again. If the connector refuses live writes: Shopify admin, Themes, live theme, Edit code, paste the cart.liquid file and make the two memobrick.js edits.

## How to undo
Restore `marketing/conversion/site-developer/backups/<date>-cart-design-delivery-shipping/` (cart.liquid and memobrick.js), or remove the shipping box and the two edits.
