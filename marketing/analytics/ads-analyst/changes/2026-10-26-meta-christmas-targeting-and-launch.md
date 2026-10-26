# Meta Christmas campaign: targeting tweak and launch (A-2026W44-005)

- Eden's approvals, passed on by the coordinator:
  - "ok" for the targeting tweak
  - "launch" for the launch
- Campaign 120252787078920597 "MB | Sales | Christmas 2026 | Last year winners". Budget $50 a day, set by the coordinator; I left it unchanged.
- Ad set 120252787082260597. This stays the only ad set; no warm ad set was created.

## 1. Targeting (ad set), read back

- **Changed:**
  - Advantage+ audience stays on.
  - Age suggestion 35 to 64 sent as `targeting_automation.advantage_audience {age_min_suggestion 35, age_max_suggestion 64}`. The hard minimum age stays 25, and no hard maximum is set (Meta shows 65 as the default top). Meta accepted it, but the read-back only shows `advantage_audience: 1`, so the suggestion can't be seen through the connector. Check it under Audience in Ads Manager.
  - **Lookalike suggestion added:** "Lookalike (US, 1%) - Purchase" (120249606728920597). It already existed, so I did not create a new one. Its seed is the "Purchase" audience (120249604850310597): pixel, Facebook shop and Instagram shop purchasers over 350 days.
- **Carried forward unchanged:**
  - Location: US (home and frequently in).
  - Men and women.
  - Excludes customers_export.csv (120218644952060597) and "purchase 730 days sep 25" (120252332056620597).
  - Placements: Facebook Feed and Facebook Reels only, mobile and desktop.
  - Optimization: Purchase (pixel 3444389275577775).
  - Attribution: 7-day click.

## 2. Couple and Dog rebuilt with UTMs in URL parameters

| Old ad (now DELETED) | New ad | Video |
|---|---|---|
| XMAS26 Couple 120252787178270597 | XMAS26 Couple v2 120252788006280597 | couple_video 1201815125329540 |
| XMAS26 Dog 120252787181160597 | XMAS26 Dog v2 120252788012070597 | dogbillo_video 1315527356942680 |

- Same text, headline, description, Shop now button and gift collection link as before.
- UTMs now go in `url_tags`: `utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.id}}&utm_content={{ad.id}}&utm_term={{adset.id}}`.

## 3. Launch, read back

- **Campaign:** ACTIVE / ACTIVE, $50 a day.
- **Ad set:** ACTIVE / ACTIVE.
- **Ads activated:**

| Ad | ID | Read back |
|---|---|---|
| XMAS26 couple_vid | 120252787409590597 | ACTIVE, PENDING_REVIEW |
| XMAS26 connie_once_upon_a_time | 120252787410970597 | ACTIVE, PENDING_REVIEW |
| XMAS26 mom_video | 120252787414080597 | ACTIVE, IN_PROCESS |
| XMAS26 Couple v2 | 120252788006280597 | ACTIVE, IN_PROCESS |
| XMAS26 Dog v2 | 120252788012070597 | ACTIVE, IN_PROCESS |
| XMAS26 Gift Pictures (carousel) | 120252787593110597 | ACTIVE, IN_PROCESS |

- **Not activated: XMAS26 gen_vid (120252787413120597).** It is still PAUSED (PENDING_REVIEW). This session's permission system blocked the activation ("Real-World Transactions"). I did not try a workaround. Eden can switch it on in Ads Manager, or approve the action in the session.
- **All other ads are PAUSED**, including "aly and or", which was kept off on purpose.
- Meta reported no errors or rejections on the campaign. Several ads are still in Meta's review.
- **Not touched:**
  - ALWAYON PROMO -v1: ACTIVE, $20 a day.
  - Proven Videos: PAUSED, $60 a day.
- **Total Meta budget if everything delivers:** $70 a day (Christmas $50 + PROMO -v1 $20).

## Watch

- connie_once_upon_a_time's old text carried the code EARLYHOLIDAY, the same risk that kept "aly and or" off: the code may also show on screen in the video. Check its preview. Pause it if the code appears.
- mom_video came from a Mother's Day ad. Check the preview for Mother's Day wording.
- Judging, as in the draft: Shopify orders tagged with utm_campaign=120252787078920597 after every $300 of spend. Pause the campaign if Shopify-tagged ROAS is under 3.0 after $300.
