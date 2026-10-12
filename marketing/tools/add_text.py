"""Put exact headline, subline and button text on a social image.

Usage: python3 marketing/tools/add_text.py <in.png> <out.png> --headline "..." [--sub "..."] [--button "..."]
       [--place top-left|top-center|bottom-left] [--button-place bottom-left|bottom-center] [--light]

Generate the picture with no text, then add the words here, so every letter is
right. Navy serif headline, sans-serif subline, pink pill button. --light uses
white text for dark backgrounds.
"""
import argparse
import subprocess

from PIL import Image, ImageDraw, ImageFont

NAVY, PINK, WHITE = (27, 38, 79), (214, 106, 126), (255, 255, 255)


def font(pattern, size):
    path = subprocess.run(["fc-match", "-f", "%{file}", pattern], capture_output=True, text=True).stdout
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, width):
    lines, line = [], ""
    for word in text.split():
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=fnt) <= width or not line:
            line = test
        else:
            lines.append(line)
            line = word
    return lines + ([line] if line else [])


def block(draw, lines, fnt, x, y, fill, align, width, gap):
    for ln in lines:
        w = draw.textlength(ln, font=fnt)
        lx = x + (width - w) / 2 if align == "center" else x
        draw.text((lx, y), ln, font=fnt, fill=fill)
        y += fnt.size * gap
    return y


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--headline", required=True)
    ap.add_argument("--sub")
    ap.add_argument("--button")
    ap.add_argument("--place", default="top-left", choices=["top-left", "top-center", "bottom-left"])
    ap.add_argument("--button-place", default="bottom-left", choices=["bottom-left", "bottom-center"])
    ap.add_argument("--light", action="store_true")
    a = ap.parse_args()

    im = Image.open(a.src).convert("RGB")
    W, H = im.size
    d = ImageDraw.Draw(im)
    ink = WHITE if a.light else NAVY
    margin = int(W * 0.06)
    width = int(W * (0.88 if a.place == "top-center" else 0.62))
    align = "center" if a.place == "top-center" else "left"
    x = (W - width) // 2 if align == "center" else margin

    hf = font("Caladea:bold", int(W * 0.075))
    sf = font("Inter:style=Medium", int(W * 0.032))
    hl = wrap(d, a.headline, hf, width)
    sl = wrap(d, a.sub, sf, width) if a.sub else []
    total = len(hl) * hf.size * 1.12 + (len(sl) * sf.size * 1.35 + hf.size * 0.35 if sl else 0)
    y = margin if a.place.startswith("top") else H - margin * 2.6 - total
    y = block(d, hl, hf, x, y, ink, align, width, 1.12)
    if sl:
        block(d, sl, sf, x, y + hf.size * 0.35, ink, align, width, 1.35)

    if a.button:
        bf = font("Inter:style=SemiBold", int(W * 0.036))
        tw = d.textlength(a.button, font=bf)
        bw, bh = tw + bf.size * 2.4, bf.size * 2.3
        bx = margin if a.button_place == "bottom-left" else (W - bw) / 2
        by = H - margin - bh
        d.rounded_rectangle((bx, by, bx + bw, by + bh), radius=bh / 2, fill=PINK)
        d.text((bx + (bw - tw) / 2, by + bh / 2), a.button, font=bf, fill=WHITE, anchor="lm")
    im.save(a.out)
    print(f"wrote {a.out}")


if __name__ == "__main__":
    main()
