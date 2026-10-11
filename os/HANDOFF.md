# Memobrick OS: where the build stands

Read this first in a new session.

## Decisions so far
- App: Memobrick OS, a local dashboard where the marketing agents are a LEGO-style office ("El mundo"). UI in Spanish. Owner's name for greetings: Eden.
- Banner and company everywhere: **Memobrick** (all characters work for Memobrick).
- Cast and roles: `agents.json`. Betty = marketing-coordinator (the one the owner chats with). Armando = the approvals desk (`marketing/approvals/queue.md`), not an AI agent. Mariana = seo-strategist. Machine tags are blank until the owner sets them.
- Portrait style: **photographic LEGO macro shots** made with an image model, matching `reference/*.jpg`. The procedural Three.js builder in `src/minifig/` is NOT the portrait style; keep it only for tiny figures in the 3D office if useful.
- Image generation (current route): the owner generates images for free in the Gemini web app using `prompts/avatars.md` plus the reference images, then pastes them into the chat; save them as `avatars/<id>.png` (1024x1024) and `sprites/raw/<id>.png`. The API route below is kept as a fallback.
- Image generation (API fallback): Gemini API. The key is a **network secret** (allowed website `generativelanguage.googleapis.com`, header `x-goog-api-key`, no prefix); the proxy adds it, so the session never sees it and the script sends no key. `GEMINI_API_KEY` is only a fallback for local runs. Model override: `GEMINI_IMAGE_MODEL` (default `gemini-2.5-flash-image`). Quick check: `curl -s https://generativelanguage.googleapis.com/v1beta/models | head` should list models, not an auth error.

## Next steps (do not skip the approvals)
1. `cd os && node scripts/gen-avatars.mjs --only betty` → `avatars/betty.png`. Show it to the owner. **Wait for approval.** Regenerate with `--force` if they want changes (edit `prompts/avatars.json`).
2. When Betty is approved: `touch avatars/.betty-approved`, then `node scripts/gen-avatars.mjs --all` (Betty's portrait becomes a style reference for the other 21).
3. Sprites: `node scripts/gen-avatars.mjs --sprites --all` → `sprites/raw/`, then `pip install "rembg[cpu]==2.0.67" pillow && python3 scripts/cutout.py` → transparent `sprites/<id>.png`.
4. Contact sheet of all 22 + close-ups of 3 characters. **Wait for approval before Stage 2.**
5. Ghost (idle / not yet created) figures: CSS `filter: grayscale(1) opacity(.45)` on the same images.

## Later stages (from the owner's brief)
2. Sidebar and UI shell. 3. Isometric LEGO office (Three.js, orthographic). 4. Panels, chat with Betty (Claude API, key on the owner's machine) and live data from the repo (`marketing/status/<agent>.json` convention still to be added to the agents).

## Environment notes
- mymemobrick.com is blocked by the cloud environment's network policy; agents use Shopify read-only queries instead.
- api.openai.com is blocked; generativelanguage.googleapis.com is reachable.
- Headless Chromium: `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (used by `npm run portraits` and for screenshots).

## Stage 1: done (approved)
All 22 portraits in `avatars/`, figures in `sprites/`. Review images: `python3 scripts/contact-sheet.py` writes `review/contact-sheet.png` and `review/closeups.png`.

## Stage 2: sidebar and UI shell (built, waiting for approval)
- Run: `cd os && npm install && npm run os`, then open the printed address.
- `server/state.ts` builds everything the app shows from repo files on each request to `/api/state`: `agents.json`, `marketing/approvals/queue.md` (pending items = Te toca and each agent's "te necesita"; Armando holds all of them), `marketing/reports/` (latest date = Para Eden), `marketing/shared/scorecard.md` (latest weekly row), and `marketing/status/<agent>.json` (live state, not written by agents yet).
- Parsers in `server/parse.ts`, tested in `server/parse.test.ts`.
- Screens other than El mundo are placeholders until stage 4. The office scene is stage 3.

## Stage 3: El mundo (built, waiting for approval)
- `src/world/layout.ts` is the floor plan: 11 rooms named after the show, each holding a Memobrick department. Agents are seated by their `character` in agents.json; anyone new goes to the Sala de juntas (tested in `layout.test.ts`).
- `src/world/scene.ts` builds the city block (road loop, buildings, cars, trees, lamps) and the office (walls with studs, floors, furniture, MEMOBRICK pennants) with an orthographic camera. Drag to pan, scroll or pinch to zoom, click a figure to open that agent.
- Figures use the parametric builder in `src/minifig/` with `src/world/looks.ts` matching each approved portrait. States: working (typing, speech bubble with the task), needs Eden (full color plus red badge), idle or not created (gray ghost). Live "working" needs `marketing/status/<agent>.json`, which comes in stage 4.
