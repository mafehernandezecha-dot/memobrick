# Google Holiday Gifts: replace the ad text that promises a code that does not exist

- Type: ad-change
- Executor: ads-analyst
- Platform: Google Ads, customer 6724994049
- Campaign: MB | Search | Holiday Gifts | Purchases | Q4 2026 (24325020428), runs 2026-10-06 to 2026-12-15, $10/day
- Ads: 827188828472 (ad group Gifts For Family & Couples, 199189087365) and 827188857755 (ad group Christmas Photo Gifts, 197804230541)
- Expires: 2026-10-17

## The problem

Both responsive search ads say "Early Holiday Sale: 20% Off", "Use Code EARLYHOLIDAY20" and "Save 20% with code EARLYHOLIDAY20". The code does not exist in Shopify (checked 2026-10-12) and the 20% holiday offer is still "planned" in `offers-calendar.md`. Shoppers who try the code at checkout will fail.

## Exact change

Replace all headlines and descriptions on both ads (Google replaces the whole list). Final URL, paths, budget and bidding stay the same.

### Ad 827188828472, new headlines (15)

1. The Gift They'll Build
2. Christmas Gift From A Photo
3. Turn Your Photo Into Brick Art
4. A Gift They Actually Build
5. Perfect For Grandparents
6. Gift For Couples & Families
7. For Someone Who Has It All
8. Order By Dec 15 For Christmas
9. See Your Photo As A Mosaic
10. Custom Brick Mosaic Kits
11. Made From Your Favorite Photo
12. A Sentimental Christmas Gift
13. Memobrick Photo Mosaic Kits
14. 40+ Brick Colors
15. Free Design Proof On Request

### Ad 827188857755, new headlines (15)

Same list, with headline 5 replaced by "Personalized Christmas Gift".

### Both ads, new descriptions (4)

1. Turn a favorite photo into a brick mosaic kit they build at home. Order today.
2. Upload your photo, see it as a mosaic right away, and pick the kit size you want.
3. Order by Dec 15 for Christmas. Preview your mosaic for free before you buy.
4. Perfect for grandparents, couples & families. Fun to build, proud to display.

Current value: the headline and description lists in `marketing/analytics/ads-analyst/2026-10-12-numbers.md` section 6 (three code and 20% lines each). New value: the lists above. All lines fit Google limits (headlines 30 characters or less, descriptions 90 or less). "Order by Dec 15" is the owner-verified date in the Facts table. The free proof is optional and owner-confirmed on 2026-10-12.

Tool: `update_ad_content` through the `google_ads` router for each ad, then read back with `get_ad_creative` and record before and after. If the tool cannot edit an RSA in place, I will create the new RSA paused in the same ad group, pause the old one only after the new one is approved by Google, and report the exact steps.

## Why now

Holiday searches are growing week by week. Fixing the text before volume rises avoids failed-code checkouts.

## Expected effect on orders

Small campaign ($17 spent so far, 0 orders: too early). The fix protects checkout completion; it does not by itself add orders this week.

## Risk

Editing an RSA resets its learning briefly. Click-through may dip slightly without the discount line. If the owner activates a 20% holiday code, I will propose adding it back as a new item.

## How I will judge it in 7 days

- Read-back shows no EARLYHOLIDAY20 or "20% Off" text in either ad, and both ads approved.
- Clicks per day within 30% of the prior week; first Shopify-visible order from holiday terms tracked from Google conversions by query.
