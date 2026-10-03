# MemoBrick Studio (team editor)

The MemoBrick photo-to-brick editor, rebuilt as a separate production tool for the team.
It is not connected to Shopify or the website: no prices, no cart, no checkout. Nothing done here
touches the live store.

## Open it

Runs in any modern browser. Nothing needs to be installed.

```bash
cd memobrick-editor
npx serve .            # or: python3 -m http.server 8080
```

Then open the address it prints. To give the whole team one link, upload the `memobrick-editor`
folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages or an internal
server). The page is marked `noindex`, so search engines won't list it.

## How it works: projects

1. **Projects** is the home screen. Click **＋ New project** and enter a name, the order number,
   the customer, a size and any notes.
2. **Add the photo.** The editor opens with the size you picked.
3. **Design.** Everything from the website editor is here: crop and zoom, background removal and
   replacement, adjustments, styles, colors, brick-by-brick hand editing, undo and redo, and
   "See it in your space". **The project saves automatically** every few seconds.
4. **Finish & generate instructions** (top bar, or the Finish button in the editor):
   - saves the project and marks it **Finished**
   - generates and downloads the build-instructions PDF
   - opens the instructions on screen

If a finished project is edited later, it goes back to **In progress**. Finish it again to
regenerate the instructions.

From the Projects screen you can search, filter by status, and use each project's buttons:
**Open**, **Instructions PDF** (regenerates the PDF from the saved design), **Details** (rename,
order, customer, notes), **Duplicate**, **Download file** and **Delete**.

Each project stores its photo, its settings *and the exact finished brick grid*. Reopening a
project, or regenerating its instructions, gives exactly the design that was approved, brick for
brick.

While a project is open, **Files** in the top bar downloads the instructions PDF, the design PNG,
the **picking list** (CSV of brick counts per color, with MemoBrick and supplier codes) and the
project file.

## Sizes

All 22 MemoBrick sizes are available, from 10 × 10" to 70 × 60". That includes 60 × 20" and
70 × 60", which the website hides because they have no Shopify product.

**Custom size** (in the size panel, or "Custom size…" in the New project size list) creates a new
size using the same MemoBrick rules as every kit:

- standard baseplates of 32 × 32 studs, 10" each, from 1 to 10 plates in each direction
- at most 18 brick colors per kit, and no color used for fewer than 30 bricks (the editor's own
  limits, applied automatically)
- if the dimensions match a standard kit, the standard size is used

The size grid shows studs and baseplates for every size. Custom sizes have a dashed outline.

## Where projects are stored, and sharing

Projects are saved in **this browser on this computer** (IndexedDB). They survive closing the tab
and restarting the computer. They are *not* shared automatically between team members or
browsers.

- **Hand a project to a teammate:** use **Download file** on the project, then they use
  **Import project** (or drag the file onto the Projects screen).
- **Back up all:** downloads every project in one file. Import that file to restore everything,
  for example on a new computer. Make backups regularly, because clearing the browser's site
  data deletes stored projects.

## Internet use

The app runs from its own files. The PDF library is bundled, so instructions work offline. Two
optional extras use the internet:

- Fonts (Google Fonts). Without a connection the page uses system fonts.
- Precise face detection (MediaPipe, loaded from jsDelivr). Without a connection the editor uses
  its built-in fallback.

## Folder contents

```
index.html                 the app
assets/memobrick.js        editor engine (team copy of the website editor)
assets/memobrick.css       editor styles
assets/memobrick-size-zoom.js
assets/team.js             projects, autosave, custom sizes, finish → instructions, exports
assets/team.css            team screens and dialogs
assets/jspdf.umd.min.js    PDF library (MIT, see jspdf-LICENSE.txt)
assets/*.jpg, *.webp       sample portrait, photo-tip images, room photos, backgrounds
```

The standard size list is `SIZES` at the top of `assets/memobrick.js`. The brick colors are
`BRICKS` in the same file.
