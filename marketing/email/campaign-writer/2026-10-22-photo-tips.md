# Campaign draft: 2026-10-22 photo tips

## Preview

![Email preview](2026-10-22-photo-tips-preview.png)

- Status: draft (dry run, not created in Omnisend)
- Campaign name (Omnisend): Q4 | Oct 22 | Which Photo Makes the Best Mosaic (Warm)

## Subject

Which photo makes the best mosaic?

## Preview text

A few simple tips before you upload your favorite picture.

## Body

Hi [[contact.first_name|there]],

Choosing the photo is the most personal part of making a Memobrick. It is also the part people ask us about most. Here are a few simple tips that help a photo turn into a custom brick mosaic you will love.

**Pick a clear, close photo.** Faces and pets read best when they fill most of the picture. If you can, crop in close before you upload.

**Look for good light.** Daylight photos with soft, even light keep the details and colors easy to see.

**Keep the background simple.** A plain wall, the sky, or a soft blur lets your people or pets stand out.

**Choose a moment that matters.** A favorite trip, a first day home, a family laugh. The best gifts start with a photo that already means something.

The nice part is that you do not have to guess. Upload your photo on our website and you will see it as a mosaic right away, in 40+ colors of 1×1 bricks. Try a couple of photos, compare them, and pick the one that feels right. Personal help is available if you would like a second opinion.

When you are ready, your DIY brick mosaic kit becomes a personalized photo gift that someone builds, displays, and keeps.

[Try your photo](https://mymemobrick.com/?utm_source=omnisend&utm_medium=email&utm_campaign=2026-10-photo-tips)

Warmly,
The Memobrick team

## Call to action

- Button: Try your photo
- Link: https://mymemobrick.com/?utm_source=omnisend&utm_medium=email&utm_campaign=2026-10-photo-tips
- Note: points to the homepage because the exact upload page URL is not recorded anywhere in the repo. Owner can swap in the upload page URL, keeping the same UTM parameters.

## Offer

None. No campaign discount is active in `offers-calendar.md`. Do not add a code. Not stacked with the automated 20% recovery or reactivation codes.

## Audience segment

Warm Audience: Opened/Clicked 180d, Bought 365d, or New 60d (Omnisend segment 6ab3a047d52351bd34134eb5). This segment includes email-subscribed contacts only.

## Exclusions

- Recent purchasers in the last 14 days. No 14-day segment exists in Omnisend; use "Ordered in last 21 days - Exclude from deadline pushes" (6ab4c0626a51901673723534), which is slightly stricter, unless the owner prefers a new 14-day segment.
- Unsubscribed (excluded automatically: the Warm segment requires email subscribed).
- Also exclude "Unengaged 180d - Exclude from campaigns" (6ab3a050426f40d1edc2e691), matching the existing Q4 campaigns.

## Send time (ET)

Thursday 2026-10-22, 11:00 ET (15:00 UTC). No timezone optimization.

Frequency note: an Omnisend campaign "Q4 | Oct 20 | Early Bird 15%" is already scheduled to the same audience two days earlier, using an offer that is not in `offers-calendar.md`. If the owner pauses that campaign, this email can take the Tuesday Oct 20 slot instead.

## Success measure

- Purchases per delivered email (attributed orders / delivered).
- Revenue per recipient (attributed revenue / delivered).
- Benchmark: the Oct 6 Gift Guide Launch to the same Warm segment reached about $0.016 revenue per sent and 0.02% orders per sent. Target: beat both. Secondary: click rate above the 0.8% recent Warm average.

## Checks

- No em dashes (`python3 marketing/tools/check.py copy` passes).
- No customer quotes, reviews, delivery promises, order-by dates, Miami claim, or scarcity.
- Website creates the design; no claim that a designer makes it and no manual proof implied.
