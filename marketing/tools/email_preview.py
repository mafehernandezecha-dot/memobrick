"""Render a Memobrick email draft as the customer will see it.

Usage: python3 marketing/tools/email_preview.py [--phone] <draft.md> [<draft.md> ...]

Reads the draft's "## Subject", "## Preview text" and "## Body" sections,
builds a branded email page (<stem>-preview.html), screenshots it with headless
Chrome (<stem>-preview.png) and adds a "## Preview" section to the top of the
draft that shows the image. It also writes <stem>-omnisend.html: the email body
alone, inline styled and table based, ready to paste into an Omnisend custom
HTML block. With --phone it also saves <stem>-preview-phone.png at phone width.

Drafts without those sections (for example flow test drafts) are read from
inline lines such as "Subject: `...`", "Headline:", "Body:", "Block 1,
heading:" and "Button:" instead.

Design blocks. Inside "## Body", besides plain markdown (paragraphs, **bold**,
*italic*, [links](url), ![alt](image), lists, and # / ## serif headlines,
### small pink eyebrow), a line that is an HTML comment draws a designed block.
Markdown viewers hide the comments, so the draft still reads as plain text.
Fields are separated by "|"; a block may span several lines.

  <!-- hero: image | Headline | subline | alt text -->
  <!-- image: image | alt text | caption -->
  <!-- pair: photo image | mosaic image | caption | left label | right label -->
  <!-- steps: Upload your photo | See it in bricks: 40+ colors | Build it together -->
  <!-- band: A short feeling line on navy -->
  <!-- quote: A line to set apart | attribution -->
  <!-- divider -->
  <!-- products:
       image | 20×20 kit | 4,096 bricks, about 4 hours | https://link
       image | 30×30 kit | 9,216 bricks, about 9 hours | https://link -->

A step written "Title: detail" shows the title in bold. A paragraph starting
with "P.S." is set as a quiet postscript. Images are https URLs (needed in
Omnisend) or paths relative to the draft.

Needs Python 3, Pillow and a Chrome or Chromium browser. Set CHROME to the
browser path if it is not found.
"""

import glob
import html
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

NAVY = "#1B264F"
PINK = "#D66A7E"
SOFT_BG = "#F4EFEA"  # warm cream page background
CREAM = "#FBF6F1"  # cream panels inside the card
BLUSH = "#FBECEE"  # soft pink panels
MUTED = "#5A6182"
BRICKS = [PINK, NAVY, "#F2B8C3", "#E9B949", "#8FB3D9", PINK, NAVY]
STEP_COLORS = [PINK, NAVY]  # step icons carry white numbers, so only strong colors
SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"
SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
FONT_LINK = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap"
FROM_NAME = "Memobrick"
SITE = "mymemobrick.com"
SITE_URL = "https://mymemobrick.com"
WINDOW_WIDTH = 680
PHONE_WIDTH = 390

MERGE_TAG = re.compile(r"\[\[\s*([^\]|]+?)\s*(?:\|\s*(?:default\s*:\s*)?\"?([^\]\"]*)\"?\s*)?\]\]")
LINK = re.compile(r"(?<!!)\[([^\]]+)\]\(([^)\s]+)\)")
IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)\)")
BLOCK = re.compile(r"<!--\s*([a-z]+)\s*(?::(.*?))?-->", re.S | re.I)
COMMENT = re.compile(r"<!--.*?-->", re.S)

# ---------- parsing ----------

def parse_sections(text):
    """Return {lowercased heading: content} for every "## " section."""
    sections = {}
    current = None
    lines = []
    for line in text.splitlines():
        m = re.match(r"^##\s+(.+?)\s*$", line)
        if m:
            if current is not None:
                sections[current] = "\n".join(lines).strip()
            current = m.group(1).strip().lower()
            lines = []
        elif current is not None:
            lines.append(line)
    if current is not None:
        sections[current] = "\n".join(lines).strip()
    return sections


def _find(sections, *names):
    """The first section named exactly like one of names, else one that starts with it
    (so "## Subject (A/B)" counts, but "## Subject options" never beats "## Subject")."""
    for name in names:
        if name in sections:
            return sections[name]
    for name in names:
        for key, value in sections.items():
            if key.startswith(name + " "):
                return value
    return ""


def _strip_ticks(value):
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] == "`":
        value = value[1:-1]
    return value.strip()


def cta_from_section(section):
    """Read "- Button: x" and "- Link: y" from a ## Call to action section."""
    button = re.search(r"^\s*[-*]?\s*Button:\s*(.+)$", section, re.M | re.I)
    link = re.search(r"^\s*[-*]?\s*Link:\s*(\S+)", section, re.M | re.I)
    if button and link:
        return _strip_ticks(button.group(1)), link.group(1).strip()
    return None


INLINE_KEYS = [
    (re.compile(r"^Subject:\s*(.+)$", re.I), "subject"),
    (re.compile(r"^(?:Preheader|Preview text):\s*(.+)$", re.I), "preview"),
    (re.compile(r"^Headline:\s*(.+)$", re.I), "headline"),
    (re.compile(r"^Block (\d+), heading:\s*(.+)$", re.I), "heading"),
    (re.compile(r"^Block (\d+), body:\s*(.+)$", re.I), "block"),
    (re.compile(r"^(?:Body|Closing line):\s*(.+)$", re.I), "para"),
    (re.compile(r"^Button:\s*(.+)$", re.I), "button"),
]


def parse_inline_email(text):
    """Fallback for drafts that list copy as "Subject: `...`" style lines.

    Uses the last section whose heading mentions "new copy" or "variant" (the
    version waiting for approval), else the whole draft.
    """
    sections = parse_sections(text)
    scope = text
    for key, value in sections.items():
        if "new copy" in key or "variant" in key:
            scope = value
    subject = preview = ""
    body = []
    cta = None
    headings = {}  # block number -> heading, shown only if the block has copy
    for raw in scope.splitlines():
        line = raw.strip()
        for pattern, kind in INLINE_KEYS:
            m = pattern.match(line)
            if not m:
                continue
            number = m.group(1) if kind in ("heading", "block") else None
            value = m.group(m.lastindex).strip()
            ticked = re.match(r"`([^`]*)`", value)
            if kind == "button":
                label = ticked.group(1) if ticked else value
                link = re.search(r"https?://[^\s)`]+", value)
                cta = (label.strip(), link.group(0).rstrip(".,") if link else "#")
                body.append(f"[{cta[0]}]({cta[1]})")
            elif not ticked:
                pass  # notes such as "Block 3, body: omitted." are not copy
            elif kind == "subject":
                subject = ticked.group(1)
            elif kind == "preview":
                preview = ticked.group(1)
            elif kind == "headline":
                body.append("# " + ticked.group(1))
            elif kind == "heading":
                headings[number] = ticked.group(1)
            else:
                if number in headings:
                    body.append("## " + headings.pop(number))
                body.append(ticked.group(1))
            break
    return {"subject": subject, "preview": preview, "body": "\n\n".join(body), "cta": cta}


def parse_draft(text):
    """Return {"subject", "preview", "body", "cta"} from a draft's markdown."""
    sections = parse_sections(text)
    subject = _find(sections, "subject")
    body = _find(sections, "body")
    if not subject and not body:
        return parse_inline_email(text)
    full_body = body_section(text)
    if full_body:
        body = full_body
    subject = " ".join(_strip_ticks(l) for l in subject.splitlines() if l.strip())
    preview = _find(sections, "preview text", "preheader")
    preview = " ".join(_strip_ticks(l) for l in preview.splitlines() if l.strip())
    return {
        "subject": subject,
        "preview": preview,
        "body": body,
        "cta": cta_from_section(_find(sections, "call to action")),
    }


# "## " headings that end the Body; any other "## " line inside the Body is a
# serif headline of the email.
DRAFT_SECTIONS = (
    "call to action", "cta", "offer", "audience", "segment", "exclusion", "send time", "schedule",
    "success", "check", "design", "notes", "images", "image notes", "subject", "preview", "creative",
    "concept", "links", "status", "reason", "test", "result", "approval", "omnisend", "body",
)


def body_section(text):
    """The text under "## Body", up to the next draft section heading."""
    lines = text.splitlines()
    start = next((i for i, l in enumerate(lines) if re.match(r"^##\s+body\s*$", l, re.I)), None)
    if start is None:
        return None
    body = []
    for line in lines[start + 1:]:
        m = re.match(r"^##\s+(.+?)\s*$", line)
        if m and m.group(1).strip().lower().startswith(DRAFT_SECTIONS):
            break
        body.append(line)
    return "\n".join(body).strip()


def is_email(parsed):
    return bool(parsed["subject"] or parsed["body"])


# ---------- markdown to html ----------

def merge_tags(text):
    """Show Omnisend merge tags as their fallback, e.g. [[contact.first_name|there]] -> there."""
    return MERGE_TAG.sub(lambda m: m.group(2) if m.group(2) is not None else "", text)


def resolve_src(src, base_dir):
    """Keep image paths relative: the preview HTML sits next to the draft, so a
    path relative to the draft works in the browser and in the committed file."""
    if re.match(r"^(https?:|data:|file:)", src) or base_dir is None:
        return src
    if not (pathlib.Path(base_dir) / src).exists():
        print(f"warning: image {src} not found next to the draft", file=sys.stderr)
    return src


def inline_html(text, base_dir=None):
    """Convert inline markdown (bold, italic, links, images, merge tags) to HTML."""
    text = merge_tags(text)
    tokens = []

    def stash(fragment):
        tokens.append(fragment)
        return f"\x00{len(tokens) - 1}\x00"

    text = IMAGE.sub(lambda m: stash(
        f'<img src="{html.escape(resolve_src(m.group(2), base_dir), quote=True)}" alt="{html.escape(m.group(1), quote=True)}" '
        f'style="display:block;max-width:100%;height:auto;border-radius:8px;margin:0 auto;">'), text)
    text = LINK.sub(lambda m: stash(
        f'<a href="{html.escape(m.group(2), quote=True)}" style="color:{PINK};text-decoration:underline;">'
        f"{_emphasis(html.escape(m.group(1)))}</a>"), text)
    text = _emphasis(html.escape(text, quote=False))
    return re.sub(r"\x00(\d+)\x00", lambda m: tokens[int(m.group(1))], text)


def _emphasis(text):
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"__(.+?)__", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w_])_(?!\s)(.+?)(?<!\s)_(?![\w_])", r"<em>\1</em>", text)
    return text


def _attr(value):
    return html.escape(value, quote=True)


def _img(src, alt, base_dir, width, radius=0, extra=""):
    """An email-safe image: fixed width attribute, fluid on small screens."""
    return (f'<img src="{_attr(resolve_src(src, base_dir))}" alt="{_attr(merge_tags(alt))}" width="{width}" '
            f'style="display:block;width:100%;max-width:{width}px;height:auto;border:0;outline:none;'
            f'border-radius:{radius}px;margin:0 auto;{extra}">')


def _row(inner, padding="0 40px", bg="#ffffff", cls="pad"):
    """One row of the email card. Every row sets its own background (dark mode safe)."""
    klass = f' class="{cls}"' if cls else ""
    return (f'<tr><td{klass} bgcolor="{bg}" style="padding:{padding};background-color:{bg};">'
            f"{inner}</td></tr>")


def button_html(label, href):
    return (
        '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:28px auto;"><tr>'
        f'<td bgcolor="{PINK}" style="background:{PINK};border-radius:999px;">'
        f'<a href="{html.escape(href, quote=True)}" style="display:inline-block;padding:16px 38px;color:#ffffff;'
        f'font-family:{SANS};font-weight:700;font-size:17px;letter-spacing:0.2px;text-decoration:none;'
        f'border-radius:999px;">{inline_html(label)}</a>'
        "</td></tr></table>"
    )


def find_button(body, cta):
    """Pick the button: ## Call to action if given, else the last link in the body."""
    if cta:
        return cta
    links = list(LINK.finditer(merge_tags(COMMENT.sub("", body))))
    if links:
        last = links[-1]
        return last.group(1), last.group(2)
    return None


# ---------- design blocks ----------

def split_fields(args):
    """Split "a | b | c" into stripped fields (newlines inside a field become spaces)."""
    if not args or not args.strip():
        return []
    return [" ".join(part.split()) for part in args.split("|")]


def _field(fields, index, default=""):
    return fields[index] if len(fields) > index and fields[index] else default


def hero_block(args, base_dir=None):
    fields = split_fields(args)
    src, headline, subline = _field(fields, 0), _field(fields, 1), _field(fields, 2)
    alt = _field(fields, 3, headline)
    rows = []
    if src:
        rows.append(_row(_img(src, alt, base_dir, 600), padding="0", cls=""))
    text = ""
    if headline:
        text += (f'<h1 class="hero-title" style="margin:0;font-family:{SERIF};font-size:36px;line-height:1.15;'
                 f'font-weight:600;color:{NAVY};">{inline_html(headline, base_dir)}</h1>')
    if subline:
        text += (f'<p style="margin:14px 0 0;font-family:{SANS};font-size:13px;line-height:1.5;letter-spacing:2px;'
                 f'text-transform:uppercase;font-weight:700;color:{PINK};">{inline_html(subline, base_dir)}</p>')
    if text:
        rows.append(_row(f'<div style="text-align:center;">{text}</div>', padding="34px 40px 10px", bg=CREAM))
        rows.append(_row(divider_block(None, compact=True, inner=True), padding="0 40px 30px", bg=CREAM))
    return "\n".join(rows)


def image_block(args, base_dir=None):
    fields = split_fields(args)
    src, alt, caption = _field(fields, 0), _field(fields, 1), _field(fields, 2)
    if not src:
        return ""
    out = [_row(_img(src, alt or caption, base_dir, 600), padding="6px 0 0", cls="")]
    if caption:
        out.append(_row(
            f'<p style="margin:0;text-align:center;font-family:{SERIF};font-style:italic;font-size:17px;'
            f'line-height:1.5;color:{MUTED};">{inline_html(caption, base_dir)}</p>', padding="14px 40px 4px"))
    return "\n".join(out)


def _chip(text):
    return (f'<p style="margin:12px 0 0;text-align:center;"><span style="display:inline-block;padding:5px 14px;'
            f'border-radius:999px;background:{BLUSH};font-family:{SANS};font-size:12px;font-weight:700;'
            f'letter-spacing:1.5px;text-transform:uppercase;color:{PINK};">{inline_html(text)}</span></p>')


def pair_block(args, base_dir=None):
    fields = split_fields(args)
    left, right = _field(fields, 0), _field(fields, 1)
    caption = _field(fields, 2)
    left_label, right_label = _field(fields, 3, "Your photo"), _field(fields, 4, "Your mosaic")
    if not (left and right):
        return ""
    cells = []
    for src, label, side in ((left, left_label, "right"), (right, right_label, "left")):
        alt = f"{label}: {caption}" if caption else label
        pad = "padding-right:8px;" if side == "right" else "padding-left:8px;"
        cells.append(f'<td class="col" width="50%" valign="top" style="width:50%;{pad}">'
                     f"{_img(src, alt, base_dir, 252, radius=10)}{_chip(label)}</td>")
    table = ('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
             + "".join(cells) + "</tr></table>")
    if caption:
        table += (f'<p style="margin:18px 0 0;text-align:center;font-family:{SERIF};font-style:italic;font-size:18px;'
                  f'line-height:1.5;color:{NAVY};">{inline_html(caption, base_dir)}</p>')
    return _row(table, padding="26px 32px 28px", bg=CREAM)


def steps_block(args, base_dir=None):
    steps = split_fields(args)
    if not steps:
        return ""
    width = int(100 / len(steps))
    cells = []
    for number, step in enumerate(steps, 1):
        title, sep, detail = step.partition(":")
        text = (f'<p style="margin:14px 0 0;font-family:{SANS};font-size:16px;line-height:1.35;font-weight:700;'
                f'color:{NAVY};">{inline_html(title.strip(), base_dir)}</p>')
        if sep and detail.strip():
            text += (f'<p style="margin:6px 0 0;font-family:{SANS};font-size:14px;line-height:1.5;color:{MUTED};">'
                     f"{inline_html(detail.strip(), base_dir)}</p>")
        color = STEP_COLORS[(number - 1) % len(STEP_COLORS)]
        icon = ('<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>'
                f'<td width="52" height="52" align="center" valign="middle" bgcolor="{color}" '
                f'style="width:52px;height:52px;border-radius:12px;background:{color};color:#ffffff;'
                f'font-family:{SERIF};font-size:24px;font-weight:600;line-height:52px;text-align:center;">'
                f"{number}</td></tr></table>")
        cells.append(f'<td class="col step" width="{width}%" valign="top" '
                     f'style="width:{width}%;padding:0 10px;text-align:center;">{icon}{text}</td>')
    table = ('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
             + "".join(cells) + "</tr></table>")
    return _row(table, padding="30px 24px 32px", bg=BLUSH)


def band_block(args, base_dir=None):
    text = " ".join(split_fields(args))
    if not text:
        return ""
    return _row(
        f'<p class="band-text" style="margin:0;text-align:center;font-family:{SERIF};font-style:italic;font-size:26px;'
        f'line-height:1.35;font-weight:500;color:#ffffff;">{inline_html(text, base_dir)}</p>',
        padding="40px 48px", bg=NAVY)


def quote_block(args, base_dir=None):
    fields = split_fields(args)
    text, who = _field(fields, 0), _field(fields, 1)
    if not text:
        return ""
    inner = (f'<p style="margin:0;text-align:center;font-family:{SERIF};font-size:54px;line-height:0.8;color:{PINK};">'
             "&ldquo;</p>"
             f'<p style="margin:8px 0 0;text-align:center;font-family:{SERIF};font-style:italic;font-size:23px;'
             f'line-height:1.4;color:{NAVY};">{inline_html(text, base_dir)}</p>')
    if who:
        inner += (f'<p style="margin:14px 0 0;text-align:center;font-family:{SANS};font-size:12px;letter-spacing:1.5px;'
                  f'text-transform:uppercase;font-weight:700;color:{PINK};">{inline_html(who, base_dir)}</p>')
    return _row(inner, padding="34px 48px 34px", bg=BLUSH)


def divider_block(args=None, base_dir=None, compact=False, inner=False):
    """A short row of little bricks in the brand colors."""
    cells = "".join(
        f'<td width="14" height="14" bgcolor="{color}" style="width:14px;height:14px;background:{color};'
        f'border-radius:3px;font-size:0;line-height:0;">&nbsp;</td>'
        + ('<td width="6" style="width:6px;font-size:0;line-height:0;">&nbsp;</td>' if i < len(BRICKS) - 1 else "")
        for i, color in enumerate(BRICKS))
    table = ('<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" '
             f'style="margin:0 auto;"><tr>{cells}</tr></table>')
    if inner:
        return table
    return _row(table, padding="10px 40px 30px" if not compact else "0 40px 20px")


def products_block(args, base_dir=None):
    items = []
    lines = [l for l in (args or "").replace(";;", "\n").splitlines() if l.strip()]
    for line in lines:
        fields = [f.strip() for f in line.split("|")]
        if len(fields) >= 2:
            items.append(fields + [""] * (4 - len(fields)))
    if not items:
        return ""
    per_row = 2 if len(items) == 4 else min(len(items), 3)
    width = int(100 / per_row)
    img_width = {1: 520, 2: 250, 3: 164}[per_row]
    rows = []
    for start in range(0, len(items), per_row):
        cells = []
        for src, title, detail, link in items[start:start + per_row]:
            image = _img(src, title, base_dir, img_width, radius=10) if src else ""
            if link and image:
                image = f'<a href="{_attr(link)}" style="text-decoration:none;">{image}</a>'
            name = inline_html(title, base_dir)
            if link:
                name = f'<a href="{_attr(link)}" style="color:{NAVY};text-decoration:none;">{name}</a>'
            text = (f'<p style="margin:12px 0 0;font-family:{SERIF};font-size:18px;line-height:1.3;font-weight:600;'
                    f'color:{NAVY};">{name}</p>')
            if detail:
                text += (f'<p style="margin:4px 0 0;font-family:{SANS};font-size:14px;line-height:1.45;color:{MUTED};">'
                         f"{inline_html(detail, base_dir)}</p>")
            cells.append(f'<td class="col" width="{width}%" valign="top" '
                         f'style="width:{width}%;padding:0 8px 22px;text-align:center;">{image}{text}</td>')
        rows.append("<tr>" + "".join(cells) + "</tr>")
    table = ('<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
             + "".join(rows) + "</table>")
    return _row(table, padding="8px 28px 6px")


BLOCK_RENDERERS = {
    "hero": hero_block,
    "image": image_block,
    "pair": pair_block,
    "steps": steps_block,
    "band": band_block,
    "quote": quote_block,
    "divider": divider_block,
    "products": products_block,
}


def render_block(name, args, base_dir=None):
    renderer = BLOCK_RENDERERS.get(name.lower())
    if renderer is None:
        print(f"warning: unknown design block {name!r} skipped", file=sys.stderr)
        return ""
    return renderer(args, base_dir)


# ---------- body ----------

def _is_ps(fragment):
    return fragment.startswith("<p") and "P.S." in re.sub(r"<[^>]+>", "", fragment)[:6]


def body_to_html(body, base_dir=None, cta=None):
    """Convert the email body into rows of the email card.

    Plain markdown becomes padded rows; design blocks (HTML comments, see the
    module docstring) become full designed rows. The button link is drawn as a
    pink pill. A paragraph that is only the button link is replaced by the
    button; if the button link is not in the body, the button goes after the
    last paragraph before the sign-off (and before any P.S.).
    """
    button = find_button(body, cta)
    placed = False
    designed_args = []  # (name, args) of each design block, rendered in place below

    def stash(m):
        designed_args.append((m.group(1), m.group(2) or ""))
        return f"\n\n\x01{len(designed_args) - 1}\x01\n\n"

    text = BLOCK.sub(stash, body.strip()) if body.strip() else ""
    text = COMMENT.sub("", text)  # other HTML comments are notes, not copy
    blocks = re.split(r"\n\s*\n", text.strip()) if text.strip() else []
    out = []  # (kind, html): kind is "text" (padded markdown) or "block" (designed row)
    for block in blocks:
        lines = [l.rstrip() for l in block.splitlines() if l.strip()]
        if not lines:
            continue
        token = re.fullmatch(r"\x01(\d+)\x01", block.strip())
        if token:
            name, args = designed_args[int(token.group(1))]
            rendered = render_block(name, args, base_dir)
            if rendered:
                out.append(("block", rendered))
            continue
        if all(re.match(r"^\s*([-*+]|\d+\.)\s+", l) for l in lines):
            tag = "ol" if re.match(r"^\s*\d+\.", lines[0]) else "ul"
            items = "".join(
                f'<li style="margin:0 0 10px;">{inline_html(re.sub(r"^\s*([-*+]|\d+\.)\s+", "", l), base_dir)}</li>'
                for l in lines)
            out.append(("text", f'<{tag} style="margin:0 0 20px;padding-left:22px;">{items}</{tag}>'))
            continue
        heading = re.match(r"^(#{1,3})\s+(.+)$", lines[0])
        if heading and len(lines) == 1:
            level = len(heading.group(1))
            inner = inline_html(heading.group(2), base_dir)
            if level == 3:
                style = (f"margin:6px 0 10px;font-family:{SANS};font-size:13px;line-height:1.4;letter-spacing:2px;"
                         f"text-transform:uppercase;font-weight:700;color:{PINK};")
            else:
                size = {1: 32, 2: 26}[level]
                style = (f"margin:10px 0 16px;font-family:{SERIF};font-size:{size}px;line-height:1.2;"
                         f"font-weight:600;color:{NAVY};")
            out.append(("text", f'<h{level} style="{style}">{inner}</h{level}>'))
            continue
        joined = " ".join(l.strip() for l in lines)
        only_link = LINK.fullmatch(merge_tags(joined).strip())
        if button and only_link and only_link.group(2) == button[1]:
            out.append(("text", button_html(button[0], button[1])))
            placed = True
            continue
        if IMAGE.fullmatch(joined.strip()):
            out.append(("text", f'<div style="margin:0 0 22px;">{inline_html(joined, base_dir)}</div>'))
            continue
        content = "<br>".join(inline_html(l.strip(), base_dir) for l in lines)
        if joined.startswith("P.S."):
            content = re.sub(r"^P\.S\.", f'<strong style="color:{PINK};">P.S.</strong>', content)
            out.append(("text", f'<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:{MUTED};">{content}</p>'))
        else:
            out.append(("text", f'<p style="margin:0 0 18px;">{content}</p>'))
    if button and not placed:
        end = len(out)
        while end > 0 and out[end - 1][0] == "text" and _is_ps(out[end - 1][1]):
            end -= 1
        signoff = end
        # Keep a short sign-off ("Warmly, The Memobrick team") below the button.
        if end >= 2 and out[end - 1][0] == "text" and out[end - 1][1].startswith("<p") \
                and len(re.sub(r"<[^>]+>", "", out[end - 1][1])) < 60:
            signoff = end - 1
        out.insert(signoff, ("text", button_html(button[0], button[1])))
    return "\n".join(_rows(out))


def _rows(out):
    """Group consecutive markdown pieces into padded rows; designed blocks are rows already."""
    rows, buffer = [], []
    for kind, fragment in out:
        if kind == "text":
            buffer.append(fragment)
            continue
        if buffer:
            rows.append(_text_row(buffer, first=len(rows) == 0, last=False))
            buffer = []
        rows.append(fragment)
    if buffer:
        rows.append(_text_row(buffer, first=len(rows) == 0, last=True))
    return rows


def _text_row(fragments, first, last):
    top = "36px" if first else "30px"
    bottom = "20px" if last else "14px"
    inner = (f'<div style="font-family:{SANS};font-size:17px;line-height:1.65;color:{NAVY};">'
             + "\n".join(fragments) + "</div>")
    return _row(inner, padding=f"{top} 40px {bottom}")


# ---------- pages ----------

RESPONSIVE_CSS = f"""
  @media only screen and (max-width: 620px) {{
    .card-table {{ width: 100% !important; }}
    td.pad {{ padding-left: 22px !important; padding-right: 22px !important; }}
    td.col {{ display: block !important; width: 100% !important; padding: 0 0 22px !important; }}
    td.col img {{ max-width: 100% !important; }}
    .hero-title {{ font-size: 30px !important; }}
    .band-text {{ font-size: 22px !important; }}
  }}"""


def card_rows(parsed, base_dir=None):
    return body_to_html(parsed["body"], base_dir, parsed.get("cta"))


def omnisend_html(parsed, base_dir=None):
    """The email body alone, inline styled and table based, for an Omnisend custom HTML block.

    Omnisend adds its own header and footer (with the unsubscribe link)."""
    rows = card_rows(parsed, base_dir)
    local = sorted({m for m in re.findall(r'src="([^"]+)"', rows) if not re.match(r"^(https?:|data:)", m)})
    note = ""
    if local:
        note = ("\n<!-- Upload these images to Omnisend and replace the paths with their URLs: "
                + ", ".join(local) + " -->")
    return f"""<!-- Memobrick email body: paste into an Omnisend custom HTML block. Made by marketing/tools/email_preview.py. -->{note}
<link href="{FONT_LINK}" rel="stylesheet">
<style>{RESPONSIVE_CSS}
</style>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{SOFT_BG}" style="background-color:{SOFT_BG};">
<tr><td align="center" style="padding:0;">
<table role="presentation" class="card-table" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:600px;max-width:600px;background-color:#ffffff;">
{rows}
</table>
</td></tr>
</table>
"""


def email_html(parsed, base_dir=None):
    subject = merge_tags(parsed["subject"]) or "(no subject)"
    preview = merge_tags(parsed["preview"])
    content = card_rows(parsed, base_dir)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>{html.escape(subject)}</title>
<link href="{FONT_LINK}" rel="stylesheet">
<style>
  :root {{ color-scheme: light only; }}
  html, body {{ margin: 0; padding: 0; background: {SOFT_BG}; }}
  body {{ font-family: {SANS}; color: {NAVY}; -webkit-font-smoothing: antialiased; }}
  .wrap {{ width: 600px; max-width: 100%; margin: 0 auto; padding: 24px 0 32px; }}
  .inbox {{ background: #ffffff; border-radius: 12px; padding: 14px 18px; margin: 0 0 16px;
           box-shadow: 0 1px 3px rgba(27,38,79,0.10); display: flex; gap: 12px; align-items: center; }}
  .avatar {{ flex: none; width: 40px; height: 40px; border-radius: 50%; background: {NAVY}; color: #fff;
            font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; }}
  .meta {{ min-width: 0; }}
  .from {{ font-size: 14px; font-weight: 700; }}
  .subject {{ font-size: 15px; font-weight: 700; margin-top: 2px; }}
  .preheader {{ font-size: 13px; color: #6B7190; margin-top: 2px; }}
  .card {{ background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 14px rgba(27,38,79,0.10); }}
  .card-table {{ width: 100%; border-collapse: collapse; }}
  .brand {{ padding: 22px 40px 18px; text-align: center; background: #ffffff; }}
  .logo {{ font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: {NAVY}; }}
  .logo span {{ color: {PINK}; }}
  .footer {{ padding: 22px 40px 28px; text-align: center; font-size: 12px; line-height: 1.6; color: #6B7190;
            border-top: 1px solid #F0E8E3; background: #FCFAF8; }}
  .footer a {{ color: #6B7190; }}
  .label {{ text-align: center; font-size: 11px; color: #9A9DB0; margin-top: 14px; letter-spacing: 0.3px; }}
  @media only screen and (max-width: 620px) {{
    .wrap {{ padding: 12px 10px 24px; box-sizing: border-box; }}
  }}{RESPONSIVE_CSS}
</style>
</head>
<body>
<div class="wrap">
  <div class="inbox">
    <div class="avatar">M</div>
    <div class="meta">
      <div class="from">{FROM_NAME}</div>
      <div class="subject">{html.escape(subject)}</div>
      <div class="preheader">{html.escape(preview)}</div>
    </div>
  </div>
  <div class="card">
    <div class="brand"><div class="logo">Memo<span>brick</span></div></div>
    <table role="presentation" class="card-table" width="600" cellpadding="0" cellspacing="0" border="0">
{content}
    </table>
    <div class="footer">
      <div><a href="{SITE_URL}">{SITE}</a></div>
      <div>You are receiving this email because you signed up at {SITE}.</div>
      <div><a href="#">Unsubscribe</a> or update your preferences.</div>
    </div>
  </div>
  <div class="label">Preview made from the draft. Merge tags show their fallback text.</div>
</div>
</body>
</html>
"""


# ---------- screenshot ----------

def find_chrome():
    candidates = []
    if os.environ.get("CHROME"):
        candidates.append(os.environ["CHROME"])
    candidates += sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"), reverse=True)
    candidates.append("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    for name in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome"):
        found = shutil.which(name)
        if found:
            candidates.append(found)
    for c in candidates:
        if c and os.path.isfile(c) and os.access(c, os.X_OK):
            return c
    return None


def crop_background(png_path, background=SOFT_BG, margin=24):
    """Cut the empty background below the email."""
    from PIL import Image

    img = Image.open(png_path).convert("RGB")
    bg = tuple(int(background[i:i + 2], 16) for i in (1, 3, 5))
    width, height = img.size
    px = img.load()
    step = max(1, width // 120)
    bottom = 0
    for y in range(height - 1, -1, -1):
        if any(sum(abs(a - b) for a, b in zip(px[x, y], bg)) > 12 for x in range(0, width, step)):
            bottom = y
            break
    img.crop((0, 0, width, min(height, bottom + margin))).save(png_path, optimize=True)


def screenshot(html_path, png_path, chrome, width=WINDOW_WIDTH):
    """Screenshot the page. Headless Chrome will not make a window narrower than
    about 500px, so a phone-width shot loads the page in a phone-wide frame."""
    from PIL import Image

    with tempfile.TemporaryDirectory() as profile:
        target = pathlib.Path(html_path).resolve().as_uri()
        window = width
        if width < 500:
            wrapper = pathlib.Path(profile) / "phone.html"
            wrapper.write_text(
                f'<!doctype html><html><body style="margin:0;background:{SOFT_BG};">'
                f'<iframe src="{target}" style="display:block;border:0;width:{width}px;height:8800px;"></iframe>'
                "</body></html>", encoding="utf-8")
            target, window = wrapper.as_uri(), 500
        cmd = [
            chrome, "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
            "--allow-file-access-from-files", f"--user-data-dir={profile}/chrome",
            f"--screenshot={png_path}", f"--window-size={window},9000", "--virtual-time-budget=20000",
            target,
        ]
        subprocess.run(cmd, check=True, capture_output=True, timeout=180)
    if window != width:
        Image.open(png_path).crop((0, 0, width, 9000)).save(png_path)
    crop_background(png_path)


# ---------- draft update ----------

def add_preview_section(text, image_name):
    """Put a "## Preview" section right after the title line (replacing an old one)."""
    # Only the image line belongs to the section; text after it is the draft's own.
    text = re.sub(r"^## Preview[ \t]*\n\s*!\[Email preview\]\([^)]*\)[ \t]*\n*", "", text, count=1, flags=re.M)
    section = f"## Preview\n\n![Email preview]({image_name})\n"
    lines = text.split("\n")
    if lines and lines[0].startswith("# "):
        rest = "\n".join(lines[1:]).lstrip("\n")
        return f"{lines[0]}\n\n{section}\n{rest}"
    return f"{section}\n{text.lstrip(chr(10))}"


def render(draft_path, chrome=None, take_screenshot=True, phone=False):
    draft = pathlib.Path(draft_path)
    text = draft.read_text(encoding="utf-8")
    parsed = parse_draft(text)
    if not is_email(parsed):
        raise ValueError(f"{draft} has no Subject or Body, so it is not an email draft.")
    html_path = draft.with_name(f"{draft.stem}-preview.html")
    png_path = draft.with_name(f"{draft.stem}-preview.png")
    html_path.write_text(email_html(parsed, draft.parent), encoding="utf-8")
    draft.with_name(f"{draft.stem}-omnisend.html").write_text(omnisend_html(parsed, draft.parent), encoding="utf-8")
    if take_screenshot:
        chrome = chrome or find_chrome()
        if not chrome:
            raise RuntimeError("No Chrome or Chromium found. Set CHROME to the browser path.")
        screenshot(html_path, png_path, chrome)
        if phone:
            screenshot(html_path, draft.with_name(f"{draft.stem}-preview-phone.png"), chrome, PHONE_WIDTH)
        draft.write_text(add_preview_section(text, png_path.name), encoding="utf-8")
    return html_path, png_path


def main(argv):
    if not argv:
        print(__doc__.strip())
        return 2
    phone = "--phone" in argv
    paths = [a for a in argv if a != "--phone"]
    if not paths:
        print(__doc__.strip())
        return 2
    failed = 0
    for path in paths:
        try:
            html_path, png_path = render(path, phone=phone)
            extra = f", {pathlib.Path(path).stem}-preview-phone.png" if phone else ""
            print(f"{path}: wrote {html_path.name}, {pathlib.Path(path).stem}-omnisend.html and {png_path.name}{extra}")
        except Exception as err:  # report every draft, then fail
            failed += 1
            print(f"{path}: {err}", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
