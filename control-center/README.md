# MEMOBRICK CONTROL CENTER

One inventory database for **bricks, baseplates and tools**, shared by the
**Website Editor**, **MemoBrick Studio** and **Shopify**. Both editors send the
exact brick grid they generated. The Control Center counts the bricks itself,
reserves them when an order is paid, and deducts them when the order is packed.

```
 Website editor ──(design matrix, at add-to-cart)──┐
 MemoBrick Studio ──(design matrix, on save/finish)─┼──▶ CONTROL CENTER ──▶ PostgreSQL
 Shopify ──(signed order webhooks)──────────────────┘     (one source of truth)
```

No editor and no Shopify product keeps its own stock number. Every quantity on
the dashboard comes from one table, and every change to it goes through one
ledger (Inventory History).

---

## What it found in the editors (and uses)

| Fact | Where it comes from |
| --- | --- |
| **Exact bricks per color.** The final grid is `S.cells`, one palette index per stud. The palette is `S.usedPal`, with name, hex, MemoBrick code and supplier code. | Both editors' engine (`memobrick.js`). |
| **40 colors, codes 001–040.** Identical in the website source, the live minified build and the Studio. A test re-reads the theme to prove it. | `BRICKS` table in the editors. |
| **Boards.** 16×16" = one 16×16 board (50×50 studs). Every other size = `bx × by` 10×10 boards (32×32 studs). | `SIZES` table: "32 studs per 10 inches". |
| **Kit contents.** One bag per color (packs of 100, rounded up), the baseplates, and **1 brick separator**. | The build booklet's "What's in the box". |
| **Order link.** Website cart lines carry a `Design ID` property. | The editor's add-to-cart (`MB_addToCart`). |

Inventory SKUs are `BRK-001` … `BRK-040`, `BOARD-10`, `BOARD-16` and
`TOOL-SEPARATOR`. A color sent by an editor is matched by **MemoBrick code**,
then supplier code, then hex, then name, all onto the same SKU. A color that
can't be matched is **rejected, never invented**.

## How a mosaic moves through the system

1. **Design.** The website sends the design when the customer adds it to the cart. The Studio sends it every time a project is saved. A change creates a new **revision**, and older revisions are kept. Nothing is deducted.
2. **Availability.** Each design shows what it needs against what's available. Shortages are listed. Colors are never swapped automatically.
3. **Payment.** When Shopify reports the order **paid**, the exact quantities are **reserved**, and the design revision is **pinned** to the order permanently. Unpaid, failed or expired payments reserve nothing.
4. **Production.** Paid orders appear on the Production page with a picking list.
5. **Packing.** "Confirm picked & packed" deducts the materials and releases the reservation in one step. A packed order can't be packed again, so nothing is ever deducted twice.
6. **Cancellation, refund or edit.**
   - Reservations are released or adjusted automatically.
   - Materials that were already packed need an explicit **Return materials to stock**, which is recorded and can only happen once.
   - Shopify order edits (quantity, removed items) adjust the reservation.

Safety rules:
- **Duplicate webhooks** are recognised by Shopify's webhook ID and skipped. Different events carrying the same facts (e.g. `orders/paid` and `orders/updated`) change nothing the second time, because reservations are calculated as a target, not added.
- **Out-of-order webhooks** are ignored if they're older than what was already applied.
- **Concurrent orders** lock the stock rows they touch. In testing, 20 orders paid at the same instant reserved exactly 20 × their needs.
- **Design arrives after the order** (slow connection): the order waits ("waiting for design") and reserves as soon as the design arrives.
- **A purchased website design is frozen.** The public endpoint can't change it.
- **Studio designs and Shopify orders:** if a Studio project's order number matches a Shopify order, finishing it in the Studio attaches the Studio design to that order. If the Shopify order arrives later, the Studio order is merged into it. Either way, materials are reserved **once**.

### Bricks: exact or packed?

The editors count the **exact** bricks, for example White 3,096. The kit ships
bags of 100 rounded up, so **3,100** leaves the shelf. Both numbers are shown
everywhere. By default, reservations and deductions use the **packed** quantity,
because that's the physical stock that leaves. You can switch to exact counts
under Settings → Kit contents. Settings changes apply to designs saved after the
change.

### Blank is not zero

Every quantity starts **blank (not counted)**. Blank items:
- never raise low-stock alerts;
- show "not counted" instead of 0;
- can't be packed from or restocked until you enter their first count.

---

## Running it

Requires Node 20+ and PostgreSQL 13+.

```bash
cd control-center
npm install
cp .env.example .env              # fill in DATABASE_URL and the first admin
export $(grep -v '^#' .env | xargs)
npm start                         # creates the tables and the 43 items on first start
```

Open http://localhost:8080 and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

### Hosting

Any Node host with a PostgreSQL database works, for example Render (Web Service +
PostgreSQL), Railway, Fly.io, or a VPS with Neon or Supabase. Use the included
`Dockerfile`, or run the start command `node src/server.js`.

Set these environment variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | The PostgreSQL connection string. |
| `ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD` | The first admin. Only used when there are no users yet. |
| `SHOPIFY_WEBHOOK_SECRET` | The signing key for Shopify webhooks (see below). |
| `SHOPIFY_SHOP_DOMAIN` | Optional: only accept webhooks from this shop. |
| `CORS_ORIGINS` | The website and Studio addresses allowed to send designs, comma separated. |
| `ALERT_WEBHOOK_URL` | Optional: a Slack, Zapier or Make incoming-webhook URL for low-stock alerts. |

Serve it over **HTTPS**. Sign-in cookies are marked secure when the host
forwards HTTPS.

## Connecting the three systems

### 1. Shopify (orders)

Shopify admin → **Settings → Notifications → Webhooks → Create webhook**. Create
one webhook for each of these events: **Order creation**, **Order payment**,
**Order update**, **Order cancellation**, **Order fulfillment**.

For each webhook:
- Format: **JSON**.
- URL: `https://YOUR-CONTROL-CENTER/webhooks/shopify`.

Shopify shows the signing key under the webhook list ("Your webhooks will be
signed with…"). Put that key in `SHOPIFY_WEBHOOK_SECRET`.

Received events, failures and retries appear under **Settings → Shopify events**.

### 2. Website editor (customer designs)

This adds one small file to the theme. The editor itself is not changed.

1. Theme → Edit code → **Assets** → upload `integrations/website/memobrick-inventory.js`.
2. **Snippets** → add `memobrick-inventory.liquid` with the contents of `integrations/website/memobrick-inventory.liquid`. Put your Control Center address in it.
3. **Layout → theme.liquid**: right after the line that loads `memobrick.js`, add `{% render 'memobrick-inventory' %}`.
4. Add the store's addresses (e.g. `https://mymemobrick.com` and the `.myshopify.com` one) to `CORS_ORIGINS`.

From then on, every add-to-cart sends the exact design. If the Control Center is
unreachable, checkout still works normally. The design is kept in the
customer's browser and retried, and the order shows "waiting for design" until
it arrives.

### 3. MemoBrick Studio (team designs)

1. Control Center → **Settings → Create Studio API key**. Copy it.
2. Redeploy the `memobrick-editor` folder to Netlify. It now includes `inventory-sync.js`.
3. In the Studio, click **Inventory** in the top bar → *Control Center connection*. Paste the address and the key → **Test** → **Save**. This is saved per browser.
4. Add the Studio's address (e.g. `https://memobrickdstudio.netlify.app`) to `CORS_ORIGINS`.

After that:
- **Every save syncs** the project's exact grid. The Inventory button's dot turns green.
- **Finish** sends the project to production. Put the Shopify order number in the project's *Order number* field to attach it to that order instead of creating a new one.
- The **Inventory** panel shows the exact requirements and live stock for the open project.

## First-time setup

1. Sign in and go to **Initial Stock Setup**.
2. Type in counts, or import a CSV with the columns `sku` (or `color_code`), `on_hand`, and optionally `min_level`. Download the template from the same page.
3. Set **minimum levels**. Low-stock alerts start working once an item has both a count and a minimum.
4. **Settings → Team**: add production staff. They can view everything, start production, pack orders and receive deliveries. Only admins can change stock counts, settings and users.

## Daily use

- **Dashboard:** stock by color, alerts, orders needing attention, reserved materials.
- **Production:** picking lists. Tick items as you pick, then **Confirm picked & packed**.
- **Restocking:** record supplier deliveries.
- **Reports:**
  - **What to buy:** reserved + unpaid orders + minimum − on hand.
  - Most-used colors, consumption over time, usage per order.
- **Inventory History:** every movement with its date, quantity, reason, order and person. Exportable as CSV.
- **Settings → Reconciliation:** rebuilds every total from the ledger and the live reservations, and corrects any mismatch with a recorded entry.

## Tests

```bash
DATABASE_URL=postgres://… npm test       # 30 backend tests on a real PostgreSQL
DATABASE_URL=postgres://… npm run test:e2e   # real browsers: both editors + dashboard (needs Playwright + Chromium)
```

**The tests wipe the database they run against.** Point `DATABASE_URL` at an
empty test database, never at the live one.

The end-to-end tests drive the **live minified website editor** (built from the
theme's own section markup) and **MemoBrick Studio** in Chromium. They check
that the Control Center's per-color counts equal each editor's own on-screen
parts list. Shopify itself is simulated with correctly signed webhooks.
