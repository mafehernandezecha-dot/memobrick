# Memobrick OS: where Stage 1 stands

Read this first in a new session.

## Decisions so far
- App: Memobrick OS, a local dashboard where the marketing agents are a LEGO-style office ("El mundo"). UI in Spanish. Owner's name for greetings: not given yet.
- Banner and company everywhere: **Memobrick** (all characters work for Memobrick).
- Cast and roles: `agents.json`. Betty = marketing-coordinator (the one the owner chats with). Armando = the approvals desk (`marketing/approvals/queue.md`), not an AI agent. Mariana = seo-strategist. Machine tags are blank until the owner sets them.
- Portrait style: **photographic LEGO macro shots** made with an image model, matching `reference/*.jpg`. The procedural Three.js builder in `src/minifig/` is NOT the portrait style; keep it only for tiny figures in the 3D office if useful.
- Image generation: Gemini API. The key is a **network secret** (allowed website `generativelanguage.googleapis.com`, header `x-goog-api-key`, no prefix); the proxy adds it, so the session never sees it and the script sends no key. `GEMINI_API_KEY` is only a fallback for local runs. Model override: `GEMINI_IMAGE_MODEL` (default `gemini-2.5-flash-image`). Quick check: `curl -s https://generativelanguage.googleapis.com/v1beta/models | head` should list models, not an auth error.

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
