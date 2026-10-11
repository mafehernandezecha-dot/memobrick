"""Build the Stage 1 review images from agents.json.

Usage: python3 scripts/contact-sheet.py [closeup_id ...]
Writes review/contact-sheet.png (every agent) and review/closeups.png
(the given characters, default betty armando mariana) with the white rounded
border the UI will use. Missing portraits show as a gray "Pendiente" tile.
"""
import json
import pathlib
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "review"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BG = (246, 243, 236)
INK = (34, 34, 34)
MUTED = (110, 110, 110)

cfg = json.loads((ROOT / "agents.json").read_text())
dept_color = {d["name"]: d["color"] for d in cfg["departments"]}
status_label = {"active": "Activo", "planned": "Planeado", "extra": "Extra"}


def tile(agent, size):
    """Portrait with a white rounded border, or a placeholder."""
    border = max(6, size // 40)
    radius = size // 7
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius, fill=255)
    canvas.paste((255, 255, 255, 255), (0, 0), mask)
    inner = size - 2 * border
    path = ROOT / agent["avatar"]
    if path.exists():
        img = Image.open(path).convert("RGB").resize((inner, inner), Image.LANCZOS)
    else:
        img = Image.new("RGB", (inner, inner), (205, 205, 205))
        d = ImageDraw.Draw(img)
        f = ImageFont.truetype(BOLD, inner // 9)
        d.text((inner / 2, inner / 2), "Pendiente", font=f, fill=(120, 120, 120), anchor="mm")
    imask = Image.new("L", (inner, inner), 0)
    ImageDraw.Draw(imask).rounded_rectangle((0, 0, inner - 1, inner - 1), radius - border, fill=255)
    canvas.paste(img, (border, border), imask)
    return canvas


def contact_sheet(agents):
    cols, cell, pad, label_h = 6, 300, 36, 92
    rows = -(-len(agents) // cols)
    head = 120
    w = cols * cell + (cols + 1) * pad
    h = head + rows * (cell + label_h) + (rows + 1) * pad
    sheet = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(sheet)
    d.text((pad, 34), f"{cfg['appName']}: el equipo", font=ImageFont.truetype(BOLD, 44), fill=INK)
    have = sum((ROOT / a["avatar"]).exists() for a in agents)
    d.text((pad, 88), f"{have} de {len(agents)} retratos listos", font=ImageFont.truetype(REG, 22), fill=MUTED)
    name_f, role_f = ImageFont.truetype(BOLD, 24), ImageFont.truetype(REG, 17)
    for i, a in enumerate(agents):
        x = pad + (i % cols) * (cell + pad)
        y = head + pad + (i // cols) * (cell + label_h + pad)
        t = tile(a, cell)
        sheet.paste(t, (x, y), t)
        color = dept_color.get(a["department"], "#999999")
        d.rounded_rectangle((x, y + cell + 12, x + 10, y + cell + 36), 3, fill=color)
        d.text((x + 18, y + cell + 10), a["displayName"], font=name_f, fill=INK)
        d.text((x + 18, y + cell + 42), f"{a['department'] or 'Sin área'} · {status_label.get(a['status'], a['status'])}", font=role_f, fill=MUTED)
    return sheet


def closeups(agents, ids):
    picks = [a for i in ids for a in agents if a["character"] == i]
    cell, pad = 620, 48
    w = len(picks) * cell + (len(picks) + 1) * pad
    sheet = Image.new("RGB", (w, cell + 2 * pad + 110), BG)
    d = ImageDraw.Draw(sheet)
    for i, a in enumerate(picks):
        x = pad + i * (cell + pad)
        t = tile(a, cell)
        sheet.paste(t, (x, pad), t)
        d.text((x, pad + cell + 18), a["displayName"], font=ImageFont.truetype(BOLD, 34), fill=INK)
        d.text((x, pad + cell + 62), a["role"], font=ImageFont.truetype(REG, 20), fill=MUTED)
    return sheet


OUT.mkdir(exist_ok=True)
agents = cfg["agents"]
contact_sheet(agents).save(OUT / "contact-sheet.png")
closeups(agents, sys.argv[1:] or ["betty", "armando", "mariana"]).save(OUT / "closeups.png")
print("wrote review/contact-sheet.png and review/closeups.png")
