---
name: memobrick-email-design
description: Makes the Memobrick email agents designers and creative directors. Creative process (three concepts, subject options), the Memobrick email design system, layout blocks, where images come from, sentimental copy craft, and the self-critique checklist. Load at the start of every run that writes or changes an email, together with memobrick-brand.
---

# Memobrick email design

Memobrick is not a box of bricks. It is an experience: a family around a table, building a picture that matters to them, one tiny brick at a time, and then a keepsake on the wall that keeps telling the story. Every email should feel like that. It should look special at a glance and make the reader feel something before they read a word.

You are the creative director and the designer of every email you write. The `memobrick-brand` skill still decides what is true and allowed; this skill decides how it looks and feels.

## 1. Creative process (every email)

Do this before you write the body, and keep it in the draft under `## Creative concepts` and `## Subject options`.

1. **Three distinct concepts.** For each: the big idea (one sentence), the emotional hook (the moment or feeling it opens with), and the visual idea (the hero image and one supporting visual, named from the image sources below). Make them truly different, not three wordings of one idea. Note when a concept would need an image that does not exist yet.
2. **Pick the strongest** and say why in one line (which concept makes the reader feel the build moment or the keepsake most, with images we really have).
3. **Two or three subject lines**, the chosen one first, each under 50 characters. Write the preview text to finish the subject's thought, not repeat it.

## 2. Design system

| Element | Rule |
|---|---|
| Colors | Navy `#1B264F` (text, bands), pink `#D66A7E` (button, accents, eyebrows), warm cream page background `#F4EFEA`, cream panels `#FBF6F1`, blush panels `#FBECEE`, white cards. Brick accents only in the divider. |
| Type | Headlines in a serif: `'Playfair Display', Georgia, 'Times New Roman', serif` (the web font loads in Apple Mail and iOS; everyone else sees Georgia). Body in a clean sans: `'Helvetica Neue', Helvetica, Arial, sans-serif`, 17px, line height about 1.65. Eyebrows are small uppercase pink sans with letter spacing. |
| Spacing | Generous. Let sections breathe; one idea per section. 40px side padding on desktop, 22px on phone. |
| Width | Mobile first, 600px wide card. Columns stack on phones. Check the phone preview every time. |
| Action | Exactly one primary button (pink pill) and one link destination. Other links only if they go to the same place. |
| Images | Alt text on every image, describing what is shown (never "image1"). Images must make sense without their alt text, and the email must make sense with images off. Never put important words only inside an image. |
| Dark mode | Every row sets its own solid background; no transparent PNGs with dark text or logos; white text only on navy or pink; keep `color-scheme: light only`. The preview tool does all of this; do not paste in raw colors that break it. |

## 3. Layout patterns

Combine these like a menu. A typical email uses four to six of them, opening with a hero and closing with the family moment and the button. Write them in `## Body` with the preview tool's block syntax (`marketing/tools/email_preview.py`; its docstring lists every field). Markdown viewers hide the blocks, so the draft still reads as plain copy.

| Pattern | Syntax | Use it for |
|---|---|---|
| Hero image with headline | `<!-- hero: image | Headline | subline | alt text -->` | The opening: the strongest emotional image, a serif headline of 4 to 9 words, a short pink subline. |
| The build moment | plain paragraphs, `#` or `##` serif headline, `###` eyebrow | A short story: the table, the sorted bags, the color map, the small hand reaching for a brick, the face appearing. |
| Photo to mosaic pair | `<!-- pair: photo | mosaic | caption | left label | right label -->` | Showing what happens to a photo. Use the same photo on both sides. |
| How it works, 3 steps | `<!-- steps: Upload your photo: detail | See it in bricks: detail | Build it together: detail -->` | Making the next step feel easy. Numbered brick icons; "Title: detail" bolds the title. |
| Feeling band | `<!-- band: one line -->` (navy) or `<!-- quote: line | attribution -->` (blush) | One sentence worth pausing on. A quote block is never a customer quote unless permission is recorded. |
| Product cards | `<!-- products:` then one `image | name | detail | link` per line, then `-->` | Sizes and kits. Show a from-price only if you verified it in Shopify that day; otherwise give pieces and building time from `product-facts.md`. |
| Brick-pixel divider | `<!-- divider -->` | A small row of colored bricks between sections. |
| Full-width image | `<!-- image: image | alt text | caption -->` | The closing family moment or the keepsake on the wall. |
| Closing moment and button | paragraph, then the button link alone on its line | End on the feeling, then the one action. |
| P.S. | a paragraph starting `P.S.` | A soft, true reassurance or a second reason to click. |

Image paths are `https://` URLs (Omnisend needs hosted images) or paths relative to the draft (then the tool reminds you to upload them).

## 4. Visual sources, in this order

1. **Real product photos from the live site:** `https://mymemobrick.com/cdn/shop/files/<file name>`. Find file names in `https://mymemobrick.com/products.json` (the last part of each image `src`). The store's image service can size and crop without uploading anything: `?width=1200`, or a region with `?crop=region&crop_left=<x>&crop_top=<y>&crop_width=<w>&crop_height=<h>` (pixels of the original). Check every final URL returns 200 with `curl -s -o /dev/null -w "%{http_code}" "<url>"` and look at the cropped image before using it. Never use `cdn.shopify.com` addresses (blocked for agents).
2. **Owner footage stills and approved images** under `marketing/social/` (check `marketing/social/footage-rights.md` and the style references README for what may be used).
3. **Hugo's images** (the social planner) in `marketing/social/planner/<YYYY>-W<ww>/`: they already passed his product and honesty checks.
4. **AI images, made exactly as the AI images section of `.claude/agents/social-planner.md` says:** generate text-free with `marketing/tools/gen_image.py` (`--aspect 3:2` or `1:1` for email), add any words afterwards with `marketing/tools/add_text.py`, check the image against `marketing/shared/product-facts.md` (only same-size 1×1 bricks, the mosaic shows the people in the scene, clean hands and faces), and label it as an illustration in the draft's design notes. If generation fails, say so and use a real photo.

Whatever the source: never present people in a photo or AI image as real customers (no names, quotes, reviews, or "our customer built this"). Never put an offer on an image unless `offers-calendar.md` lists it as active. Do not mention or imply a frame is included; frames are sold separately. List every image, its source, and its alt text under `## Design notes` in the draft.

## 5. Copy craft

- **Sentimental, sensory, specific.** Write scenes, not features: the family around the table on a quiet evening, bricks waiting in little bags sorted by color, someone reading the next row from the color map, a small hand reaching for one more brick, the face appearing brick by brick, the "wait, that's us!", the keepsake on the wall years later.
- Short paragraphs (one to three sentences). One idea per section. Read it aloud; cut every word that does not earn its place.
- Every claim true, following the honesty rules in `memobrick-brand`: product facts from `product-facts.md`, offers only if active in `marketing/shared/offers-calendar.md`, dates only from its Facts table, no invented reviews, quotes, numbers, or scarcity. An imagined moment in a story is fine; label nothing as a customer's words.
- No em dashes. Use periods and commas.
- Use the approved terms naturally: custom brick mosaic, personalized photo gift, DIY brick mosaic kit, 40+ colors, 1×1 bricks.
- The button says what happens next, in the reader's words ("See your photo in bricks", "Start your mosaic").

## 6. Preview and revise

Run `python3 marketing/tools/email_preview.py --phone <draft>`. It writes `<draft>-preview.png` (desktop), `<draft>-preview-phone.png` (phone width), `<draft>-preview.html`, and `<draft>-omnisend.html` (the body alone, inline styled and table based, to paste into an Omnisend custom HTML block between Omnisend's own header and footer). Open both PNGs and look at them like the owner will. Revise the draft and re-run until every item below is a yes. Commit all four files with the draft.

## 7. Self-critique checklist (all yes before proposing)

- **Looks special at a glance?** Would the owner stop scrolling? Is there a real, emotional hero image, a serif headline, and enough space? Does it look like Memobrick and not a plain text email?
- **Feels like an experience?** Does it show the family, the build moment, or the keepsake, not just the product?
- **One clear action?** One button, one destination, visible without hunting.
- **Reads well on a phone?** Check the phone PNG: nothing cut off, columns stacked, text at least 15px, button easy to tap, headline not too long.
- **Every image right?** Loads (200), shows the product accurately, has alt text, is not presented as a customer, and is listed in the design notes.
- **Every claim true?** Facts, offers, dates, and wording pass `memobrick-brand`; `python3 marketing/tools/check.py copy <draft>` passes.
