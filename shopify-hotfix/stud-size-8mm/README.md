# Hotfix: build instructions at the real stud size (8 mm)

For the live theme **memobrick-theme-v25** (files checked by MD5 against the live store on 2026-10-12):

| File | Live MD5 | Change |
| --- | --- | --- |
| `assets/memobrick.js` | `7217509d574464c26903961b926d0d96` | `const gt=254/32` → `const gt=8` |
| `assets/memobrick.src.js` | `15cac71bc0fe401816de11933cd12f83` | `const BRICK_MM = 254/32` → `const BRICK_MM = 8` |

Nothing else differs. The instructions drew each stud at 254/32 = 7.9375 mm (from the
"32 studs = 10 inches" size name); the physical baseplates use 8 mm, so a 32×32 board
printed 254 mm instead of 256 mm. Tested: a PDF made by the fixed live code measures
8.000 mm per stud and 256.0 mm per board, "Printed at true size".
