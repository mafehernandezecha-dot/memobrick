# Improvement: Q4 | Nov 30 | Cyber Monday LAST DAY 20% (Warm)

Campaign `6ab50397de9e4985592a5cb0`, scheduled Mon Nov 30 10:00 ET (15:00 UTC), Warm excluding Unengaged 180d and Ordered in last 21 days. Content `6ab5039753d5cf34b91fece3`. Read from Omnisend on 2026-11-03.

## Why

The owner approved CYBERBRICK20 (20% off, Mon Nov 30 00:00 to 23:59:59 ET, same collections as EARLYHOLIDAY20, no combining) on 2026-10-26. The scheduled email does not use it. It prints an Omnisend-generated personal code ("XXXX-XXXX-XXXX", "Your personal code ends tonight at midnight") and says "20% off every size, every photo", which is not true: the approved code covers only the listed collections. Subject and preheader repeat "personal 20% code". Two risks if it sends as is: a generated code that is not in offers-calendar.md (and may be set up to combine with other things), and a promise of "every size, every photo" that checkout will not honor, which sends confused buyers to support on the biggest day of the week. The public code also matches Shopify, where we can see redemptions.

## Before and after

| Part | Before | After |
|---|---|---|
| Subject | Cyber Monday: last day for 20% off (with clock emoji) | Cyber Monday: last day for 20% off (remove the emoji, rest unchanged) |
| Preheader | Your personal 20% code expires at midnight tonight. | Use CYBERBRICK20 until midnight tonight. Order by Dec 15 for Christmas. |
| Banner image (alt "20% off every Memobrick. Every size, every photo, through Cyber Monday.") | image with 20% and "every Memobrick" printed | replace with a text-free store photo (the mother and daughter hug, `https://mymemobrick.com/cdn/shop/files/Custom-Bricked-Mosaic-Portrait-30x20_-Memobrick-59268336.png?width=1200`), alt "A mother and daughter hugging below a brick mosaic of the same hug" |
| Intro | Hi [[first name]], today is your last chance for 20% off every size, every photo. Design yours online in minutes, and there's still time to have it under the tree. | Hi [[first name]], today is your last chance for 20% off custom brick portraits with code CYBERBRICK20. Design yours online in minutes, and order by December 15 to have it before Christmas. |
| Discount block | personal 20% code, button "Use my 20% today", "Your personal code ends tonight at midnight" | public code box showing CYBERBRICK20, button "Shop Cyber Monday" to https://mymemobrick.com/collections/the-gift-for-everyone?utm_source=omnisend&utm_medium=email&utm_campaign=2026-11-cyber-monday, line "Ends tonight at midnight ET" |
| Size cards | 16x16 from $69.88, 20x20 from $99.88, 30x30 from $209.99, 40x30 from $278 | keep (match product-facts.md; re-check in Shopify the day the edit is applied) |
| Footer line | One code per customer. Not combinable with other offers. | CYBERBRICK20 cannot be combined with other discounts or free shipping. |

Leave the logo header, Dec 15 strip, address footer, audience and send time unchanged. Copy has no em dashes.

## Notes for the owner

- Same fix as the Nov 27 Black Friday item (A-2026W44-014 applied it there). Do this one after the Nov 27 send has shown how the public code behaves.
- No timing urgency: the edit can wait until about Nov 23, but the proposal expires Nov 29 so it is not forgotten.
- If approved, I restore the campaign to draft, apply the edit, reschedule for the same time and read it back.
