#!/usr/bin/env python3
"""Draw 3D gift boxes and loose bricks made of 1x1 bricks (each with its stud) as SVG.

Usage: make_gift_box.py <out_dir>
Writes box-<shape>-<color>.svg for each shape and color, and brick-<color>.svg (one loose 1x1 brick).
The box is drawn in oblique 3D: the front face, the top (studs facing up) and the right side.
"""
import os
import sys

CELL = 22          # brick size in px
DX, DY = 0.62, -0.42   # one step of depth moves this far right and up (in cells)

COLORS = {          # box, ribbon
    "red": ("#d6223b", "#ffc83d"),
    "green": ("#1f9d63", "#ef4b6c"),
    "blue": ("#3b8cf0", "#ffc83d"),
    "purple": ("#9b5cf0", "#2bbf7a"),
    "orange": ("#ff8a3d", "#3b8cf0"),
}
SHAPES = {          # width, height, depth in bricks
    "cube": (8, 7, 6),
    "tall": (6, 9, 5),
    "wide": (10, 5, 6),
}


def shade(hex_color, f):
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return "#%02x%02x%02x" % tuple(max(0, min(255, int(c * f))) for c in (r, g, b))


def stud(cx, cy, c, r, out):
    out.append(f'<ellipse cx="{cx:.1f}" cy="{cy + 1.6:.1f}" rx="{r:.1f}" ry="{r * 0.8:.1f}" fill="{shade(c, 0.72)}"/>')
    out.append(f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{r:.1f}" ry="{r * 0.8:.1f}" fill="{shade(c, 1.1)}"/>')
    out.append(f'<ellipse cx="{cx - r * 0.35:.1f}" cy="{cy - r * 0.3:.1f}" rx="{r * 0.3:.1f}" ry="{r * 0.22:.1f}" fill="#fff" fill-opacity=".5"/>')


def box_svg(shape, box, ribbon):
    W, H, D = SHAPES[shape]
    c = CELL
    ox, oy = 4, 4 + D * -DY * c + 2.2 * c      # leave room for the top face and the bow
    out = []
    rib_x = {W // 2 - 1, W // 2} if W % 2 == 0 else {W // 2}
    rib_z = {D // 2 - 1, D // 2} if D % 2 == 0 else {D // 2}

    def face_color(is_rib, f):
        return shade(ribbon if is_rib else box, f)

    # right side face (x = W), parallelograms, darker
    for z in range(D):
        for y in range(H):
            col = face_color(z in rib_z, 0.72)
            x0 = ox + W * c + z * DX * c
            y0 = oy + y * c + z * DY * c
            pts = [(x0, y0), (x0 + DX * c, y0 + DY * c), (x0 + DX * c, y0 + DY * c + c), (x0, y0 + c)]
            out.append('<polygon points="%s" fill="%s" stroke="%s" stroke-width="1"/>' %
                       (" ".join(f"{a:.1f},{b:.1f}" for a, b in pts), col, shade(col, 0.8)))
    # front face
    for y in range(H):
        for x in range(W):
            col = face_color(x in rib_x, 1.0)
            px, py = ox + x * c, oy + y * c
            out.append(f'<rect x="{px + .8:.1f}" y="{py + .8:.1f}" width="{c - 1.6:.1f}" height="{c - 1.6:.1f}" rx="2.5" fill="{col}"/>')
            out.append(f'<rect x="{px + .8:.1f}" y="{py + c - 4:.1f}" width="{c - 1.6:.1f}" height="3.2" rx="1.5" fill="{shade(col, 0.82)}"/>')
    # top face, studs up, drawn back to front so near studs overlap far ones
    for z in reversed(range(D)):
        for x in range(W):
            rib = x in rib_x or z in rib_z
            col = face_color(rib, 1.12)
            x0 = ox + x * c + z * DX * c
            y0 = oy + z * DY * c
            pts = [(x0, y0), (x0 + c, y0), (x0 + c + DX * c, y0 + DY * c), (x0 + DX * c, y0 + DY * c)]
            out.append('<polygon points="%s" fill="%s" stroke="%s" stroke-width="1"/>' %
                       (" ".join(f"{a:.1f},{b:.1f}" for a, b in pts), col, shade(col, 0.85)))
            stud(x0 + c / 2 + DX * c / 2, y0 + DY * c / 2 - 2, col, c * 0.27, out)
    # bow: two loops of ribbon bricks standing on the top centre
    bx = ox + (W / 2 - 1) * c + (D / 2) * DX * c
    by = oy + (D / 2) * DY * c - c * 0.9
    for i, (dx, dy) in enumerate([(-1.6, -0.8), (-0.8, -1.4), (0.8, -1.4), (1.6, -0.8), (-0.8, -0.4), (0.8, -0.4), (0, -0.7)]):
        col = shade(ribbon, 1.0 if i < 6 else 0.82)
        px, py = bx + dx * c * 0.9 + c * 0.5, by + dy * c * 0.9
        out.append(f'<rect x="{px:.1f}" y="{py:.1f}" width="{c - 2:.1f}" height="{c - 2:.1f}" rx="3" fill="{col}" stroke="{shade(col, 0.8)}"/>')
        stud(px + (c - 2) / 2, py + (c - 2) / 2 - 1, col, c * 0.26, out)
    w = ox + W * c + D * DX * c + 6
    h = oy + H * c + 6
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-c * 0.6:.0f} {w:.0f} {h + c * 0.6:.0f}" width="{w:.0f}" height="{h + c * 0.6:.0f}">' + "".join(out) + "</svg>"


def brick_svg(color):
    c = 40
    out = [f'<rect x="2" y="12" width="{c}" height="{c - 10}" rx="5" fill="{color}"/>',
           f'<rect x="2" y="{c - 4}" width="{c}" height="6" rx="3" fill="{shade(color, 0.78)}"/>']
    stud(2 + c / 2, 14, color, c * 0.3, out)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {c + 4} {c + 4}" width="{c + 4}" height="{c + 4}">' + "".join(out) + "</svg>"


if __name__ == "__main__":
    d = sys.argv[1]
    os.makedirs(d, exist_ok=True)
    for shape in SHAPES:
        for name, (box, ribbon) in COLORS.items():
            open(os.path.join(d, f"box-{shape}-{name}.svg"), "w").write(box_svg(shape, box, ribbon))
    for name, (box, _) in COLORS.items():
        open(os.path.join(d, f"brick-{name}.svg"), "w").write(brick_svg(box))
