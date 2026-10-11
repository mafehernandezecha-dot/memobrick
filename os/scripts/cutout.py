"""Remove the flat background from sprites/raw/<id>.png and write sprites/<id>.png.

Usage: python3 scripts/cutout.py [id ...]   (no ids = every raw sprite)
Requires: pip install "rembg[cpu]" pillow
"""
import pathlib
import sys

from PIL import Image
from rembg import new_session, remove

ROOT = pathlib.Path(__file__).resolve().parents[1]
RAW = ROOT / "sprites" / "raw"
OUT = ROOT / "sprites"

ids = sys.argv[1:] or [p.stem for p in sorted(RAW.glob("*.png"))]
session = new_session("isnet-general-use")
for character_id in ids:
    src = RAW / f"{character_id}.png"
    if not src.exists():
        print(f"missing {src}")
        continue
    cut = remove(Image.open(src).convert("RGBA"), session=session, alpha_matting=True)
    cut = cut.crop(cut.getbbox())
    cut.save(OUT / f"{character_id}.png")
    print(f"wrote sprites/{character_id}.png {cut.size}")
