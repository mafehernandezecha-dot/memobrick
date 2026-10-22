# One offer per order: say it before checkout (proposal, 2026-10-21)

**Owner decision 2026-10-21 (chat): "leave it". Rejected: no cart line; keep codes and free shipping as they are. Do not propose again unless the owner asks.**

Built by: site-developer (Jenny). Status: **pending, Eden decides.** Nothing has changed on the store or theme.
Evidence: `marketing/conversion/site-developer/2026-10-21-code-vs-free-shipping/README.md` (live checkout tests, screenshots).

## What the test showed

Shopify does **not** pick the better deal. Whenever a customer types a discount code (EARLYHOLIDAY20 or BRICK10) on a US order that has free shipping over $125, Shopify **always applies the code and drops free shipping**. It does this even when free shipping was worth more:

- $134 order of two frames to Los Angeles: free shipping saved $31.56, the 20% code saves $26.80. With the code the customer pays **$138.76 instead of $134.00**.
- $140 order of four 10x10 kits to Los Angeles with UPS 3 Day Select: free shipping saved $55.02, the code $28.00. The customer pays **$167.02 instead of $140.00**.
- Same $134 frames order with BRICK10 (10%): the customer pays **$152.16 instead of $134.00**.

There is no visible message. The shipping line just changes from "FREE" to the price. The customer can get free shipping back by removing the code (the X on the code chip), but nothing tells them.

For most carts the code wins anyway and that is the better deal for the customer (a $149 kit: code saves $29.80, free shipping only $12.35). The customer loses only on orders of $125 to about $160 with heavy items (frames) or a faster shipping choice, and more often with 10% codes (BRICK10, Collabs codes), because 10% of $125 to $300 is close to the shipping price.

## The options (no paid app)

| Option | What it does | Cost / risk |
|---|---|---|
| **A. One line in the cart (recommended)** | When the cart is $125 or more, show one short line under "You've unlocked free shipping!" in the cart drawer and above Checkout on the cart page: **"One offer per order: a discount code replaces free shipping."** Under $125 nothing changes. | Small theme edit (memobrick.js drawer text and templates/cart.liquid). Customers who would lose money can skip the code. |
| B. Leave it as it is | Shopify keeps applying the code. | Rare overpayments of a few dollars, and a possible "where did my free shipping go" email. |
| C. Let codes combine with free shipping | Change combinesWith so code and free shipping stack. | **Breaks your rule** (one offer per order) and costs margin on every coded order over $125. Not recommended. |

Not possible without Shopify Plus or an app: text next to the discount box inside Shopify's checkout page, or making Shopify pick the better of the two automatically (that would need a Shopify Function, which is out).

Note: "the code wins" is already what Shopify does, so no combinesWith change is needed for that.

## If approved (option A)

Approving this item approves the wording and the placement only. I then build it in an unpublished theme copy (after the kit page fix copy 188955361500 is published, because the store is at 20 of 20 themes), test it on phone and desktop with a $125+ and an under-$125 cart, and bring it back as a new site-change item with the preview link, before and after screenshots and the exact code. Nothing goes live from this approval.

Planned change (for review):
- `assets/memobrick.js`, cart drawer, where it now writes "You've unlocked free shipping!": add a second small line below it, "One offer per order: a discount code replaces free shipping.", only while the drawer total is $125 or more.
- `templates/cart.liquid`: the same line in small grey text above the Checkout button, only when `cart.total_price >= 12500` and the visitor's country is US.

Expected effect: no change in add to cart. It prevents a few customers from paying more than they had to and the support questions that follow ("I had free shipping, then it disappeared"). Small sales impact; mostly trust.

Undo: republish the previous theme (or remove the line from the two files).
