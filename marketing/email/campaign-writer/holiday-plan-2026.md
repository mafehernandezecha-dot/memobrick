# Holiday campaign plan 2026

Updated: 2026-10-11 (dry run). Owner: email-campaign-writer.

Dates and offers come only from `marketing/shared/offers-calendar.md`. As of today its Offers table lists only the two automated 20% codes (abandoned cart/checkout and reactivation, both flow-only), and every Fact (Christmas order-by date, gift cards, Miami claim) is unknown. So every holiday email below that depends on an offer or a deadline is **waiting on owner**.

## Read this first: campaigns already scheduled in Omnisend

Omnisend already holds these Q4 campaigns, created 2026-09-23/24 outside this agent system. They are `scheduled`, so they will send on their own without an approval item. Several use offers or deadlines that are **not** in `offers-calendar.md`. This plan does not duplicate them, and this agent has not changed them.

| Send (ET) | Omnisend name | Campaign ID | Audience | Offer or deadline it implies | In offers-calendar? |
|---|---|---|---|---|---|
| Oct 13, 11:00 | Q4, Real Customer Builds (Warm) | 6ab3ae43a46e779522c64464 | Warm | None in name. Needs approved-stories permission for customer builds | Permission file does not exist |
| Oct 14, 11:00 | Q4, Re-engagement 10% (Unengaged 180d) | 6ab3ae634dae2e28118748a1 | Unengaged 180d | 10% | No |
| Oct 20, 11:00 | Q4, Early Bird 15% (Warm + Past Buyers) | 6ab3ae8ca46e779522c6446f | Warm + Past Buyers | 15% | No |
| Oct 27, 11:00 | Q4, Early Bird LAST CALL 15% | 6ab5038abbe86b0610261a72 | Warm + Past Buyers | 15% | No |
| Nov 3, 11:00 | Q4, Gift Ideas By Person (Warm) | 6ab3aee64dae2e28118748af | Warm | None in name | n/a |
| Nov 19, 11:00 | Q4, VIP Early Access 20% (Past Buyers) | 6ab3af384dae2e28118748b8 | Past Buyers | 20% | No |
| Nov 27, 09:00 | Q4, Black Friday 20% (Warm) | 6ab3af11a46e779522c64477 | Warm | 20% | No |
| Nov 30, 10:00 | Q4, Cyber Monday LAST DAY 20% | 6ab50397de9e4985592a5cb0 | Warm | 20% | No |
| Dec 3, 11:00 | Q4, 12 Days Left (Warm) | 6ab4c08e15171123c190f03b | Warm | Countdown implies a Dec 15 order-by date | No (date unknown) |
| Dec 8, 11:00 | Q4, One Week Left | 6ab4c0b6b1163aea2da5e15b | Warm + Past Buyers | Countdown | No |
| Dec 11, 11:00 | Q4, 4 Days Left | 6ab4c0dddbf3bedf3768c51b | Warm | Countdown | No |
| Dec 14, 12:00 | Q4, Last Call | 6ab4c10215171123c190f03f | Warm + Past Buyers | Countdown | No |

Owner decision needed (see run report): either add these offers and the order-by date to `offers-calendar.md` so the plan below can adopt them, or pause the scheduled campaigns in Omnisend. Until then this agent treats the offers and deadlines as unknown.

## Plan

Default audience: Warm Audience segment (6ab3a047d52351bd34134eb5). Default exclusions: Unengaged 180d (6ab3a050426f40d1edc2e691), recent purchasers, unsubscribed. No 14-day purchaser segment exists; the closest is "Ordered in last 21 days" (6ab4c0626a51901673723534).

| # | Email | Target date | Offer | Status | Notes |
|---|---|---|---|---|---|
| 1 | Gift guide: personalized photo gifts by person and occasion | Mid November (Tue Nov 17 suggested) | None needed | Ready to draft | Already overlaps "Gift Ideas By Person" (Nov 3) and the Oct 6 gift guide launch. Draft as a no-offer guide unless the owner drops the Nov 3 send. Link to SEO gift guide hub once it is published |
| 2 | Black Friday | Fri Nov 27 | unknown | **Waiting on owner** | Needs an active offer in offers-calendar. Omnisend already has a 20% BF send scheduled that is not approved there |
| 3 | Cyber Monday | Mon Nov 30 | unknown | **Waiting on owner** | Same as BF. Omnisend already has a 20% CM send scheduled |
| 4 | Order-by reminder 1 (about two weeks out) | Christmas order-by date minus 12 to 14 days | None needed | **Waiting on owner** | Christmas order-by date is unknown. Do not state a date |
| 5 | Order-by reminder 2 (one week out) | Order-by date minus 7 days | None needed | **Waiting on owner** | Same |
| 6 | Order-by reminder 3 (a few days out) | Order-by date minus 3 to 4 days | None needed | **Waiting on owner** | Same |
| 7 | Last chance | On the order-by date | None needed | **Waiting on owner** | Same |
| 8 | Gift card email | After the order-by date | n/a | **Waiting on owner** | Only if gift cards are offered. Gift cards: unknown |

## Rules for every holiday email

- No discount stacking with the automated 20% recovery or reactivation codes unless an approved offer says so.
- No delivery promise, no "ships from Miami", no order-by date until the Facts table has them verified.
- No customer photos or quotes until `marketing/conversion/reviews-ugc/approved-stories.md` records permission (or the content is a public Loox review).
- One call to action. UTM: `utm_source=omnisend&utm_medium=email&utm_campaign=<yyyy-mm-slug>`.
- Success measure: purchases per delivered email and revenue per recipient.

## What past campaigns showed (last 12 months, Omnisend reports)

- Best performer: "Final Hours: Get Your Memobrick Discount Before It's Gone" (late Nov 2025): 14 orders, about $0.064 revenue per sent. Real deadlines work, which is why the order-by date matters most.
- Next best: "Build the Perfect Gift Before the Rush" (early Nov 2025): 7 orders, about $0.047 per sent. Black Week 20% and Early bird bundle: about $0.038 per sent each.
- Boosters (resends to non-openers) averaged under 3% opens and about $0.005 to $0.029 per sent. Low value; prefer fresh content over resends.
- "Early bird" (Nov 2025, 6,070 sent) had a 4.7% unsubscribe rate and no recorded opens. Avoid sending to cold or unverified lists.
- Since the Warm segment began (Sept 2026), sends reach about 5,000 people with high opens (50 to 55%) and about 0.8 to 1.1% clicks, but few orders: Website Launch 0 orders, Gift Guide Launch 1 order ($80.22, about $0.016 per sent). Clicks are not turning into purchases yet; the landing page step deserves a look by the conversion and flow agents.
