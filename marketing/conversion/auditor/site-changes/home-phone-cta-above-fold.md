# Site change: Put the main button on the first phone screen of the home page

Proposed by: conversion-auditor, 2026-10-12
Executor: seo-technical
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 3)

## Problem (seen on the live site, 390×844)

The home page is the top landing page: 5,010 of 10,630 sessions in the last 30 days. Phones bring most real visitors: 1,569 of the 1,910 referred (non-direct) sessions. On a phone the first screen shows the promo strip, the headline and the top of the video. The **Create My MemoBrick** button starts at y = 978 px, below the 844 px screen. The phone header has no button either, and no price appears until the size cards at y ≈ 3,665 px.

Phone visitors from social and search who landed on `/` added to cart at 6.6% in the last 30 days (55 of 828: 25 of 476 social, 30 of 352 search). In the same period last year it was 12.5% (197 of 1,582: 90 of 903 social, 107 of 679 search). The button position is one likely cause among several; the pop-ups after upload are another (see the audit).

Screenshots: `marketing/conversion/auditor/2026-10-12/phone-home-01-home.jpg` and `desktop-home-01-home.jpg` (on desktop the button is visible at y = 558).

## Change

### `sections/memobrick-site.liquid`, inside `<section class="view" id="view-home">`

**Before:**

```liquid
      <h1>{{ section.settings.hero_heading }}</h1>
      <div class="rail" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
```

**After:**

```liquid
      <h1>{{ section.settings.hero_heading }}</h1>
      <div class="hero-cta hero-cta-top">
        <a class="btn btn-red big" href="/pages/editor">{{ section.settings.hero_button_1 }}</a>
        <p class="hero-cta-note">See your photo in bricks in seconds. Kits from {{ all_products['custom-bricked-mosaic-10x10'].price_min | money_without_trailing_zeros }}.</p>
      </div>
      <div class="rail" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
```

### `assets/memobrick.css` (and `assets/memobrick.src.css`), add at the end

```css
.hero-cta-top{display:none}
@media(max-width:640px){.hero-cta-top{display:flex;flex-direction:column;align-items:center;gap:6px;margin:6px 0 14px}.hero-cta-top .hero-cta-note{margin:0;font-size:14px;color:var(--ink-2)}}
```

Customer-facing copy: "See your photo in bricks in seconds. Kits from $35." The price comes live from Shopify. On 2026-10-12 the 10×10 kit (`custom-bricked-mosaic-10x10`) was $35 in Shopify and in the editor's size list. If that product is retired, change the handle to `1-big-board` (16×16, $69.88).

## Before you apply

- Pull the live `sections/memobrick-site.liquid` first. The repo may be behind live.
- Check on a duplicate theme at 390×844 and 360×740 that the button and note sit above the video without a horizontal scroll bar. Also check at 1440×900 that the desktop hero is unchanged (`.hero-cta-top` hidden).

## How we will know it worked

Phone sessions landing on `/` with a cart addition, non-direct referrers. The baseline is 55 of 828 (6.6%), 2026-09-12 to 2026-10-11. Check 14 and 28 days after release.
