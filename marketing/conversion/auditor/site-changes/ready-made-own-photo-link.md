# Site change: Offer "your own photo" on ready-made design pages (A/B test)

Proposed by: conversion-auditor, 2026-10-28
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-28.md (problem 3)

## Problem (seen on the live site, 390x844 and 1440x900)

Ready-made design pages (for example `/products/bricked-mosaic-portrait-10x10-yin-yan`, `/products/cute-caterpillar-home-decoration-bricked-mosaic-portrait-16x16`) have one action: "Buy now" (straight to checkout, no cart). On a phone the sticky bar shows only the price and "Buy now". A visitor who likes the idea but wants their own photo has no path to the editor or the free proof except the hamburger menu.

Last 30 days (Shopify, all devices): the two yin-yan URLs had 334 sessions, 0 add to cart, 0 reached checkout. The caterpillar page: 302 sessions, 13 add to cart (4.3%). Combined, 636 sessions and about 4 orders-worth of intent. Screenshots: `marketing/conversion/auditor/2026-10-28/phone-ready-yinyan.jpg`, `phone-ready-caterpillar.jpg`, `desktop-ready-*.jpg`.

Unknown: how many of these sessions are bots or ad crawlers. This is a guess, so it is proposed as an A/B test.

## Change

File: the product template used by ready-made designs (non-creator products), in the repo copy `templates/product.liquid`. The live theme differs from the repo copy, so site-developer applies it to the live MAIN theme template after re-reading it.

**Before** (after the `</form>` of the Buy now form):

```liquid
        </form>
      {% endif %}

      <p class="pdp-note">Made &amp; shipped from Miami within 2–4 business days after approval.</p>
```

**After:**

```liquid
        </form>
        <p class="pdp-note pdp-own-photo"><a href="/pages/editor#editor">Want it with your own photo? Make yours in the editor &rarr;</a></p>
      {% endif %}

      <p class="pdp-note">Made &amp; shipped from Miami within 2–4 business days after approval.</p>
```

The link is a plain text link under the button, shown to half of visitors (arm B). Arm A is unchanged. Use the same 50/50 mechanism as the email-gate test, or a `?` free split in a script that sets an order attribute `ab_ownphoto` = A or B.

## Test (EXP appended to marketing/shared/experiments.md)

- Primary metric: sessions on ready-made pages that reach the editor, then orders per arm.
- Guardrail: ready-made "Buy now" clicks per session must not fall more than 10% in arm B.
- Decision rule: adopt B if editor entries from these pages go up and Buy now clicks hold; keep A otherwise; under 300 sessions per arm, inconclusive.
