---
name: memobrick-brand
description: Memobrick brand voice, product facts, approved terms, and honesty rules. Load before writing any customer-facing copy (emails, posts, articles, pitches, captions) or any claim about the product.
---

# Memobrick brand

Source: Memobrick Business and Sales Playbook, October 2026.

## What Memobrick is

Memobrick turns personal photos into custom brick mosaic kits. Customers upload a photo on the website, see their mosaic design, choose their options, and order a kit to build a meaningful piece of art from small 1×1 bricks. The experience combines a personalized gift, a creative activity, and a keepsake to display.

## What we sell

- Personalized DIY brick mosaic kits for couples, families, pet lovers, birthdays, anniversaries, holidays, and meaningful memories.
- Kits with the baseplates, 1×1 bricks, building map or instructions, and tool needed for the selected design. Frames and assembled pieces are optional only where offered.
- Website-generated designs and previews that help customers see their photo as a mosaic before ordering. Personal assistance is available when a customer needs help.
- Custom and corporate projects, quoted according to size, quantity, design work, assembly, and delivery requirements.

`marketing/shared/product-facts.md` summarizes sizes, pieces, building times, kit contents, and what the product looks like. Sizes, prices, and variant options come from the live Shopify product data (read-only queries); quote them exactly as Shopify lists them on the day you write. Faces per size and build time are unknown until the owner adds them to the Facts table.

Customers create their design in the website's editor. If they prefer help, Memobrick's designers can create it for them and send a free proof before production (the owner confirmed this offer on 2026-10-12). You may offer that free proof as an option; never say it is required, and never say a designer made a design the customer made in the editor.

## Brand description (use as written)

At Memobrick, we turn your favorite photos into personalized brick mosaic kits. Upload your photo on our website, see it as a mosaic, and choose a kit you can build and display. From family moments to the pets you love, create a meaningful gift from a photo that matters to you.

## Approved terms

- "custom brick mosaic"
- "personalized photo gift"
- "DIY brick mosaic kit"
- "40+ colors"
- "1×1 bricks" (use 1×1 bricks in product visuals)

## Voice

Warm, personal, clear, and helpful. We sound like a real person helping someone make a meaningful gift. Explain the next step simply. One main call to action per message.

| Use | Avoid |
|---|---|
| Short sentences and natural words | Corporate language, exaggerated claims, or robotic phrasing |
| Specific help with their photo or occasion | Generic pressure that ignores their question |
| True deadlines and currently approved offers | Invented scarcity, expired codes, or unsupported delivery promises |
| Honest previews and real customer feedback | Fake reviews, fabricated reactions, or misleading mockups |
| Periods, commas, and simple punctuation | Em dashes in customer copy |

## Honesty rules

- Use only offers and codes listed in `marketing/shared/offers-calendar.md` with status active. Historical codes such as EARLYBIRD20 are not active unless listed.
- Use only dates in the Facts table of `offers-calendar.md`. If the Christmas order-by date says unknown, do not state one.
- The "ships from Miami, Florida" claim may be used only when the Facts table shows it verified by the owner. Shipping from the US does not establish where every component was made.
- Realistic AI lifestyle images (models holding, building, or hanging a mosaic) are allowed for posts and ads, as the owner decided on 2026-10-12. They must show the product accurately (`marketing/shared/product-facts.md`), and must never be presented as a real customer, order, testimonial, or review: no customer names, no quotes, no "our customer built this", no star ratings next to them. Posts using them turn on the platform's AI label when posting.
- Use customer photos, quotes, and reviews only when permission is recorded in `marketing/conversion/reviews-ugc/approved-stories.md` or the content is a public Loox review.
- Unknown facts stay "unknown". Never invent numbers, dates, contacts, rates, or reviews.

## Order workflow is off limits

Agents send nothing to customers about their orders. Never touch order confirmations, shipping or delivery notifications, fulfillment, refunds, or the Omnisend "Post-Purchase: Build & Delight" flow. Shopify handles orders as it does today.

## Order of priorities

First protect paid orders and promised dates. Then help people who already created designs complete their purchases. Then bring in qualified traffic. Never recommend anything that promises more than production capacity allows.

## Before proposing customer copy

Run `python3 marketing/tools/check.py copy <file>` on every customer-facing draft. Fix every reported em dash before proposing it.
