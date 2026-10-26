# Google: add UTM tags so Shopify can tell paid Google orders from free ones

- Type: ad-change
- Executor: ads-analyst (Google: a Chrome task for the owner's Mac; no Adspirer calls)
- Platform: Google Ads, customer 6724994049, account level (Admin > Account settings > Tracking)
- Expires: 2026-11-02

## Exact change

| Setting | Current value | New value |
|---|---|---|
| Account Final URL suffix | empty (Google Ads has no UTM tracking, noted Oct 12 and in the coordinator's open issues) | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={creative}&utm_term={keyword}` |
| Auto-tagging (gclid) | on | unchanged, stays on |

Nothing else changes: no campaign, budget, bid, ad text, keyword, negative or asset group is touched. If a Final URL suffix or tracking template already exists at account or campaign level, the Chrome task stops and asks.

## Why

- Today Shopify sees every Google order as "search / google": 20 orders and $2,094.93 in the last 30 days, paid and free search mixed. So Google's real ROAS on Shopify cannot be measured, only an upper bound (at most about 2.6 for the last 7 days at the last measured spend).
- Eden's rule is that ads must return 3.0 on real sales. That cannot be checked for Google without this tag. Meta ads already carry UTMs, which is how this audit could judge each Meta campaign.
- This matters most from Nov 16, when Google search orders doubled last year (35 to 48 a week) and the budget decisions get bigger.

## Expected effect on orders

None directly. It lets the next audits move Google money toward the campaigns that really sell on Shopify. Costs nothing and adds no monthly fee.

## Risk

Very low. A Final URL suffix does not send ads back for review and does not reset learning. Auto-tagging stays on, so Google's own conversion tracking is unaffected. If a landing page broke with the extra parameters, the Chrome task checks one ad's final URL with "Test" before saving.

## How I will judge it in 7 days

Shopify orders and sessions with utm_source = google and utm_medium = cpc appear, split by utm_campaign (campaign ID). Free Google listings (google / product_sync) and organic search stay separate.
