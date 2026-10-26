# Meta: pause the Proven Videos campaign

- Type: ad-change
- Executor: ads-analyst (through the Facebook connector, once it is re-authorized)
- Platform: Meta, ad account PhotoBrick (1493067227536648)
- Campaign: MB | Sales | Purchases | Proven Videos | Oct26 (120252562193330597)
- Current value (last read Oct 16, plus Eden's Oct 22 ad changes, not re-read since): campaign ACTIVE, $60 a day
- New value: campaign PAUSED. Budget left at $60 so it can be resumed as is. Nothing else changes: ALWAYON PROMO -v1 (120252425110090597) stays as it is, no ad, ad set or audience is edited or deleted.
- Before applying: read the campaign. If it is already paused, or its budget is not $60, or Eden has moved the Christmas ads into a different campaign, stop and report instead of changing anything.
- Expires: 2026-10-31

## Evidence (Shopify, the source of truth)

- Since the Oct 14 consolidation (two weeks, Oct 12 to 25), Shopify recorded 669 visits tagged with this campaign, 27 add to carts and **2 orders worth $90.91** (Oct 12 week: 333 visits, 1 order $55.91; Oct 19 week: 336 visits, 1 order $35.00).
- At its $60 daily budget that is up to $840 of spend for $90.91 of sales: a Shopify ROAS of **about 0.11** against the 3.0 break-even. Exact spend for these two weeks is missing (Meta not readable this session); even if it spent only half its budget the ROAS would be about 0.2.
- It is the biggest Meta line and the weakest: the small ALWAYON PROMO -v1 campaign ($20 a day) brought 3 orders / $244.18 from 98 visits in the same two weeks.
- Meta's own Oct 16 read already showed the gap: 6 Meta purchases in a week while Shopify saw 1 tagged order.

## Expected effect on orders

About 1 order a week at risk (what it has been bringing), about $60 a day (up to $420 a week) saved. The money is held for the Christmas campaign in `meta-christmas-campaign-paused-2026-10-26.md`, which only spends if Eden approves its separate launch. **This lowers total daily ad spend.**

## Risk

- Some buyers who saw these ads may come back later without a tag (direct or Google). Shopify cannot show that; the store's untagged orders over the next 7 days will show whether anything dropped.
- The 4 Christmas ads inside this campaign stop too. They got almost no delivery (about $6 in two days on Oct 16).

## How I will judge it in 7 days

Shopify orders (all, and facebook/paid by utm_campaign) for Oct 27 to Nov 2 against Oct 19 to 25 (19 orders, 2 Meta-tagged). If whole-store orders hold within normal range while Meta spend drops by about $60 a day, the pause stays.
