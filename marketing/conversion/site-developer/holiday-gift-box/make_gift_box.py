#!/usr/bin/env python3
"""Draw a gift box made of 1x1 bricks (each cell a brick with its stud) as SVG.

Usage: make_gift_box.py <out.svg> [box_color] [ribbon_color]
The pattern is a 16 x 18 grid: a bow on top, a lid, and a box with a ribbon cross.
"""
import sys

# . empty, B box, D box shade, R ribbon, S ribbon shade, L lid, K lid shade
PATTERN = [
    "...RRR....RRR...",
    "..RSSRR..RRSSR..",
    "..RRSSRRRRSSRR..",
    "....RRRRRRRR....",
    "LLLLLLLRRLLLLLLL",
    "LLLLLLLRRLLLLLLL",
    "KKKKKKKSSKKKKKKK",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.",
    ".DDDDDDSSDDDDDD.",
]


def shade(hex_color, f):
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return "#%02x%02x%02x" % tuple(max(0, min(255, int(c * f))) for c in (r, g, b))


def svg(box="#d6223b", ribbon="#ffc83d", cell=24):
    colors = {"B": box, "D": shade(box, 0.78), "L": shade(box, 1.12), "K": shade(box, 0.85),
              "R": ribbon, "S": shade(ribbon, 0.8)}
    w, h = len(PATTERN[0]) * cell, len(PATTERN) * cell
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>']
    # one brick drawing per colour, reused for every cell of that colour (keeps the file small)
    cx, cy, r = cell / 2, cell / 2 - 1, cell * 0.3
    for k in sorted({ch for row in PATTERN for ch in row if ch != "."}):
        c = colors[k]
        out.append(f'<g id="{k}">'
                   f'<rect x="1" y="1" width="{cell - 2}" height="{cell - 2}" rx="3" fill="{c}"/>'
                   f'<rect x="1" y="{cell - 5}" width="{cell - 2}" height="4" rx="2" fill="{shade(c, 0.8)}"/>'
                   f'<circle cx="{cx}" cy="{cy + 1.5}" r="{r}" fill="{shade(c, 0.78)}"/>'
                   f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{shade(c, 1.08)}"/>'
                   f'<circle cx="{cx - r * 0.35:.2f}" cy="{cy - r * 0.35:.2f}" r="{r * 0.28:.2f}" fill="#fff" fill-opacity=".45"/></g>')
    out.append("</defs>")
    for y, row in enumerate(PATTERN):
        for x, ch in enumerate(row):
            if ch != ".":
                out.append(f'<use xlink:href="#{ch}" x="{x * cell}" y="{y * cell}"/>')
    out.append("</svg>")
    return "".join(out)


if __name__ == "__main__":
    a = sys.argv[1:]
    open(a[0], "w").write(svg(*(a[1:3] or [])))
