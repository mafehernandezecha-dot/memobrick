# Google Merchant Center: Shopify product data audit (2026-11-02)

Trigger: Google Ads recommendation "most of the products in your campaigns are not approved in Merchant Center". Eden: "can you work on each item from shopify to be approved on google?"
Read-only check of active Shopify products (150+). The Merchant Center reasons themselves are not visible from this session; the list below is what the Shopify data shows.

## Likely causes found in Shopify
1. No product identifiers. Custom kits have no GTIN, and the Google channel fields (namespace mm-google-shopping: custom_product, condition) are empty on every product checked. Google expects identifier_exists = no for custom/handmade items.
2. The same SKU "14646" on almost every variant of different products (Google may read it as the MPN, so many products share one MPN).
3. Trademark risk: "Heatblast Art Piece..." (a Ben 10 character). Licensed characters get disapproved for counterfeit/trademark.
4. Sale prices: many compare-at prices are far above the price (e.g. 40x50 kit $431.98 vs $750; 50x30 $334.99 vs $580). Google requires strike-through prices that were really charged.
5. Weight 0 on some items (Palm Sunset Paradise, 9 brick bags 17-25, Heatblast, Art Gift Kit, gift cards).
6. Duplicates and messy listings: "Baboon Abstract..." x2, "Goldfish Abstract..." x2; old-style titles ("Yelow Cat HOME DECOR BRICKED MOSAIC PORTRAIT 20X30", "Lady Bricked Mosaic..."); empty or "puzzle" product types; "Palm Sunset Paradise" handle says 20x20, title says 16x16.
7. Gift cards (2 products) are usually not eligible for Shopping ads.

## Needed from Eden
Merchant Center > Products > Needs attention: screenshot of the issue list (issue name + number of products). That shows which of the above is the real cause before anything changes.

## Done by Eden's Claude in Chrome (2026-11-02)
- Google & YouTube: listing countries 58 -> United States only (automatic country sync now off); local inventory off (0 of 2 locations).
- Microsoft Channel: reconnected; country already United States; no local inventory option. App setup wizard still at step 1 of 4 (not finished).
- Custom product = true on 278 products (bulk editor). Condition not settable there (Google not flagging it).
- Off Google & YouTube and Microsoft: Gift Card (Choose an Amount), Gift Card (Choose a Size), Heatblast. Online Store unchanged.
- Merchant Center (US), right after the change: Missing local inventory data 7,485 (96.5%); Missing shipping weight 2 (the 2 gift cards); Invalid product price 1 (Memobrick Proof, $0). No account-level issues, no missing barcode issue.

## Next
- Recheck Merchant Center Nov 4-5: "Missing local inventory data" should drop now that local inventory is off. It affects local (in-store) listings, which Memobrick does not have.
- Take "Memobrick Proof" (and "Free MemoBrick Proof") off Google & YouTube: a $0 service item should not be a Shopping product.
- Gift cards: will drop out of Merchant Center after the next sync; if not, exclude them in Merchant Center.
- Google Ads: confirm campaign locations are United States.
