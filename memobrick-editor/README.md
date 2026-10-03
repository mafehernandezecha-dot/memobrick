# MemoBrick Editor — Team version

The same photo-to-brick editor the website uses, as its own separate app for the team.
It is not connected to Shopify in any way: it has no cart, no checkout and no store login, and
nothing you do here touches the live website.

## How to open it

It runs in any modern browser (Chrome, Edge, Safari or Firefox). Nothing needs to be installed.

**Option A: local web server (recommended)**

```bash
cd memobrick-editor
npx serve .            # or: python3 -m http.server 8080
```

Then open the address it prints, for example http://localhost:3000.

**Option B: host it for the whole team.** Upload the `memobrick-editor` folder as-is to any static
host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, an internal server). Each person then just
opens the link. The page is marked `noindex`, so search engines won't list it.

Opening `index.html` by double-clicking it also mostly works. A local server is still the safer
choice, because some browsers restrict pages opened straight from a file.

## What's the same as the website

Everything in the editor: photo upload, crop chooser, face-aware processing, all 22 sizes,
zoom and crop, background removal and replacement, adjustments, styles, the 40-color brick
palette, color exclusion, brick-by-brick hand editing, undo and redo, the "see it in your space"
wall mockup, the guided tour, and the mobile editor layout.

## What's different (team features)

| Website | Team version |
| --- | --- |
| "Order / Finish" adds to the Shopify cart | **Export** opens the production pack |
| Build instructions only reachable after an order | Preview or download them any time |
| Design lost when the tab closes | **Save project** / **Open project** files |
| Marketing pages, cart, reviews and "let us design it" links | Removed |

**Export production pack** (top-right **Export** button, or the editor's own Finish button):

- **Design image**: the final mosaic as a PNG.
- **Build instructions**: the printable PDF booklet that ships with the kit.
- **Picking list**: a CSV with brick counts per color, including MemoBrick and supplier codes.
- **Project file**: see below.
- **Preview instructions**: opens the booklet on screen.
- **Download everything**: all four files at once.

Type an order number or customer name in **Order / reference** first, so the file names include it.

**Project files** (`.memobrick.json`) save the photo together with every setting: size, crop,
adjustments, palette, excluded colors and hand edits. Use **Open project**, or drag the file onto
the page, to pick up exactly where you or a teammate left off. You can share them by email,
Drive or Slack.

## Internet use

The app runs from its own files. It goes online only for two optional extras:

- **Fonts** (Google Fonts). Without a connection the page falls back to system fonts.
- **Precise face detection** (MediaPipe, loaded from jsDelivr). Without a connection the editor
  uses its built-in fallback detection automatically.

The PDF library is bundled in `assets/`, so PDF export works offline.

## Folder contents

```
index.html                 the app
assets/memobrick.js        editor engine
assets/memobrick.css       editor styles
assets/memobrick-size-zoom.js
assets/team.js             team features: export, picking list, project files
assets/team.css            team bar and export dialog styles
assets/jspdf.umd.min.js    PDF library (MIT, see jspdf-LICENSE.txt)
assets/*.jpg, *.webp       sample portrait, photo-tip images, room photos, backgrounds
```

Prices and sizes match the website's built-in list (`SIZES` at the top of `assets/memobrick.js`).
Change them there if they ever need to differ.
