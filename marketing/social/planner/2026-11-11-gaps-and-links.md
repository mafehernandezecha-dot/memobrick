# Social gaps Nov 14 to 22, and the link check (2026-11-11)

Task board 2026-11-11, social-planner row (CARRIED, smaller version). Checked against `check.py approvals --agent social-publisher --today 2026-11-11` (prints nothing: no social post is approved for any day) and the content calendar (last post published Nov 1).

## Days Nov 14 to 22 with no approved post

All 9 days. Each one already has a finished post waiting on one decision.

| Day | Post waiting | In item | Item expires |
|---|---|---|---|
| Sat Nov 14 | S-20261114-1 (grandparents carousel) | A-2026W44-059 (W46) | Nov 14 |
| Sun Nov 15 | S-20261115-1 (code ends Nov 22 carousel) | A-2026W44-059 (W46) | Nov 14 |
| Mon Nov 16 | S-20261116-1 (which photo to pick) | W47, now P-social-planner-20261111-1 (replaces A-2026W45-015) | Nov 21 |
| Tue Nov 17 | S-20261117-1 (camera roll to wall reel) | same | Nov 21 |
| Wed Nov 18 | S-20261118-1 (gift for mom) | same | Nov 21 |
| Thu Nov 19 | S-20261119-1 (pet Episode 3 reel) | same | Nov 21 |
| Fri Nov 20 | S-20261120-1 (guess the photo reel) | same | Nov 21 |
| Sat Nov 21 | S-20261121-1 (for the one you love) | same | Nov 21 |
| Sun Nov 22 | S-20261122-1 (code last day) | same | Nov 21 |

Nov 16 is the first day of the 12 orders a day goal, and EARLYHOLIDAY20 ends Nov 22: W47 is the week where an approval is worth the most.

## Link check: where each post lands

Evidence: the gift collection is the best entry page (Oct 28 to Nov 8: 278 referred sessions, 28 carts, 7 purchases; 11.7% cart rate Nov 6 to 8). `/pages/dog-brick-mosaic` had 121 referred sessions, 1 cart, 0 purchases. No `/blogs/` page reached the top 15 landing pages. Shopify orders Oct 28 to Nov 10: 8 of 37 first or last landed on the gift collection; none carried `utm_medium=organic` or `utm_medium=group`. All pages below return 200 (checked 2026-11-11).

| Post | Day | Before | Lands on | Swap |
|---|---|---|---|---|
| S-20261114-1 | Nov 14 | `/blogs/news/christmas-gifts-for-grandparents-from-grandkids` | blog article (links on to the editor) | Not changed: W46 is in A-2026W44-059 (expires Nov 14); a change would need a new item. If Eden approves W46, she can add `changes: S-20261114-1 link the gift collection`. |
| S-20261115-1 | Nov 15 | `/pages/editor` | editor | none |
| S-20261116-1 | Nov 16 | `/pages/editor` | editor | now `/pages/editor?size=20x20&<UTM>#editor` |
| S-20261117-1 | Nov 17 | `/pages/editor` (also YouTube) | editor | same as above |
| S-20261118-1 | Nov 18 | `/blogs/news/personalized-christmas-photo-gifts` | blog article | **now the gift collection**; caption "Find her gift at the link in our bio." |
| S-20261119-1 | Nov 19 | `/pages/editor` (also YouTube) | editor | `?size=20x20…#editor` |
| S-20261120-1 | Nov 20 | `/pages/editor` (also YouTube) | editor | `?size=20x20…#editor` |
| S-20261121-1 | Nov 21 | `/blogs/news/photo-christmas-gift-for-wife` | blog article | **now the gift collection**; caption "Find their gift at the link in our bio." |
| S-20261122-1 | Nov 22 | `/pages/editor` | editor | `?size=20x20…#editor` |
| W47 Story 2 | Nov 18 | blog article | blog | now the gift collection, sticker text "Find her gift" |
| W47 Story 3 | Nov 21 | `/pages/editor` | editor | `?size=20x20…#editor` |
| S-20261123-1 | Nov 23 | `/pages/dog-brick-mosaic` | dog page (0 purchases) | **now the editor** `?size=20x20…#editor` |
| S-20261124-1, 25, 27, 28, 29 | Nov 24 to 29 | `/pages/editor` | editor | `?size=20x20…#editor` |
| S-20261126-1 | Nov 26 | `/pages/dog-brick-mosaic` (also YouTube) | dog page | **now the editor** `?size=20x20…#editor` |
| W48 Stories 2 and 3 | Nov 25, 28 | `/pages/editor` | editor | `?size=20x20…#editor` |

Every link keeps its own UTM (`utm_source=<channel>&utm_medium=organic&utm_campaign=<post campaign>`), placed before `#editor`. The content calendar rows for W47 and W48 carry the new URLs. Because the post files changed, W47 and W48 are proposed again (P-social-planner-20261111-1 and -2 in `marketing/reports/2026-11-11-social-planner.md`); the old items A-2026W45-015 and A-2026W45-019 can be archived.
