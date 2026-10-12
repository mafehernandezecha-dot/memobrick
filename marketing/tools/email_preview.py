"""Render a Memobrick email draft as the customer will see it.

Usage: python3 marketing/tools/email_preview.py <draft.md> [<draft.md> ...]

Reads the draft's "## Subject", "## Preview text" and "## Body" sections,
builds a branded email page (<stem>-preview.html), screenshots it with headless
Chrome (<stem>-preview.png) and adds a "## Preview" section to the top of the
draft that shows the image. Drafts without those sections (for example flow
test drafts) are read from inline lines such as "Subject: `...`", "Headline:",
"Body:", "Block 1, heading:" and "Button:" instead.

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
SOFT_BG = "#F4EFEA"
FROM_NAME = "Memobrick"
SITE = "mymemobrick.com"
SITE_URL = "https://mymemobrick.com"
WINDOW_WIDTH = 680

MERGE_TAG = re.compile(r"\[\[\s*([^\]|]+?)\s*(?:\|\s*(?:default\s*:\s*)?\"?([^\]\"]*)\"?\s*)?\]\]")
LINK = re.compile(r"(?<!!)\[([^\]]+)\]\(([^)\s]+)\)")
IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)\)")


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
    for name in names:
        for key, value in sections.items():
            if key == name or key.startswith(name + " "):
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
    subject = " ".join(_strip_ticks(l) for l in subject.splitlines() if l.strip())
    preview = _find(sections, "preview text", "preheader")
    preview = " ".join(_strip_ticks(l) for l in preview.splitlines() if l.strip())
    return {
        "subject": subject,
        "preview": preview,
        "body": body,
        "cta": cta_from_section(_find(sections, "call to action")),
    }


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


def button_html(label, href):
    return (
        '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto;"><tr>'
        f'<td style="background:{PINK};border-radius:999px;">'
        f'<a href="{html.escape(href, quote=True)}" style="display:inline-block;padding:15px 34px;color:#ffffff;'
        f'font-weight:700;font-size:16px;text-decoration:none;border-radius:999px;">{inline_html(label)}</a>'
        "</td></tr></table>"
    )


def find_button(body, cta):
    """Pick the button: ## Call to action if given, else the last link in the body."""
    links = list(LINK.finditer(merge_tags(body)))
    if cta:
        return cta
    if links:
        last = links[-1]
        return last.group(1), last.group(2)
    return None


def body_to_html(body, base_dir=None, cta=None):
    """Convert the email body's simple markdown into HTML blocks.

    The button link is drawn as a pink pill. A paragraph that is only the
    button link is replaced by the button; if the button link is not in the
    body, the button goes after the last paragraph before the sign-off.
    """
    button = find_button(body, cta)
    placed = False
    blocks = re.split(r"\n\s*\n", body.strip()) if body.strip() else []
    out = []
    for block in blocks:
        lines = [l.rstrip() for l in block.splitlines() if l.strip()]
        if not lines:
            continue
        if all(re.match(r"^\s*([-*+]|\d+\.)\s+", l) for l in lines):
            tag = "ol" if re.match(r"^\s*\d+\.", lines[0]) else "ul"
            items = "".join(
                f'<li style="margin:0 0 8px;">{inline_html(re.sub(r"^\s*([-*+]|\d+\.)\s+", "", l), base_dir)}</li>'
                for l in lines)
            out.append(f'<{tag} style="margin:0 0 18px;padding-left:22px;">{items}</{tag}>')
            continue
        heading = re.match(r"^(#{1,3})\s+(.+)$", lines[0])
        if heading and len(lines) == 1:
            size = {1: 26, 2: 20, 3: 17}[len(heading.group(1))]
            out.append(f'<h{len(heading.group(1))} style="margin:8px 0 14px;color:{NAVY};font-size:{size}px;'
                       f'line-height:1.25;font-weight:800;">{inline_html(heading.group(2), base_dir)}</h{len(heading.group(1))}>')
            continue
        joined = " ".join(l.strip() for l in lines)
        only_link = LINK.fullmatch(merge_tags(joined).strip())
        if button and only_link and only_link.group(2) == button[1]:
            out.append(button_html(button[0], button[1]))
            placed = True
            continue
        if IMAGE.fullmatch(joined.strip()):
            out.append(f'<div style="margin:0 0 20px;">{inline_html(joined, base_dir)}</div>')
            continue
        content = "<br>".join(inline_html(l.strip(), base_dir) for l in lines)
        out.append(f'<p style="margin:0 0 18px;">{content}</p>')
    if button and not placed:
        signoff = len(out)
        # Keep a short sign-off ("Warmly, The Memobrick team") below the button.
        if len(out) >= 2 and out[-1].startswith("<p") and len(re.sub(r"<[^>]+>", "", out[-1])) < 60:
            signoff = len(out) - 1
        out.insert(signoff, button_html(button[0], button[1]))
    return "\n".join(out)


def email_html(parsed, base_dir=None):
    subject = merge_tags(parsed["subject"]) or "(no subject)"
    preview = merge_tags(parsed["preview"])
    content = body_to_html(parsed["body"], base_dir, parsed.get("cta"))
    font = "'Helvetica Neue', Helvetica, Arial, sans-serif"
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(subject)}</title>
<style>
  html, body {{ margin: 0; padding: 0; background: {SOFT_BG}; }}
  body {{ font-family: {font}; color: {NAVY}; -webkit-font-smoothing: antialiased; }}
  .wrap {{ width: 600px; margin: 0 auto; padding: 24px 0 32px; }}
  .inbox {{ background: #ffffff; border-radius: 12px; padding: 14px 18px; margin-bottom: 16px;
           box-shadow: 0 1px 3px rgba(27,38,79,0.10); display: flex; gap: 12px; align-items: center; }}
  .avatar {{ flex: none; width: 40px; height: 40px; border-radius: 50%; background: {NAVY}; color: #fff;
            font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; }}
  .meta {{ min-width: 0; }}
  .from {{ font-size: 14px; font-weight: 700; }}
  .subject {{ font-size: 15px; font-weight: 700; margin-top: 2px; }}
  .preheader {{ font-size: 13px; color: #6B7190; margin-top: 2px; }}
  .card {{ background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(27,38,79,0.08); }}
  .brand {{ padding: 26px 40px 18px; text-align: center; border-bottom: 1px solid #F0E8E3; }}
  .logo {{ font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: {NAVY}; }}
  .logo span {{ color: {PINK}; }}
  .content {{ padding: 32px 40px 16px; font-size: 16px; line-height: 1.6; color: {NAVY}; }}
  .content strong {{ color: {NAVY}; }}
  .footer {{ padding: 22px 40px 28px; text-align: center; font-size: 12px; line-height: 1.6; color: #6B7190;
            border-top: 1px solid #F0E8E3; background: #FCFAF8; }}
  .footer a {{ color: #6B7190; }}
  .label {{ text-align: center; font-size: 11px; color: #9A9DB0; margin-top: 14px; letter-spacing: 0.3px; }}
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
    <div class="content">
{content}
    </div>
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


def screenshot(html_path, png_path, chrome):
    with tempfile.TemporaryDirectory() as profile:
        cmd = [
            chrome, "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
            "--allow-file-access-from-files", f"--user-data-dir={profile}",
            f"--screenshot={png_path}", f"--window-size={WINDOW_WIDTH},6000",
            pathlib.Path(html_path).resolve().as_uri(),
        ]
        subprocess.run(cmd, check=True, capture_output=True, timeout=120)
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


def render(draft_path, chrome=None, take_screenshot=True):
    draft = pathlib.Path(draft_path)
    text = draft.read_text(encoding="utf-8")
    parsed = parse_draft(text)
    if not is_email(parsed):
        raise ValueError(f"{draft} has no Subject or Body, so it is not an email draft.")
    html_path = draft.with_name(f"{draft.stem}-preview.html")
    png_path = draft.with_name(f"{draft.stem}-preview.png")
    html_path.write_text(email_html(parsed, draft.parent), encoding="utf-8")
    if take_screenshot:
        chrome = chrome or find_chrome()
        if not chrome:
            raise RuntimeError("No Chrome or Chromium found. Set CHROME to the browser path.")
        screenshot(html_path, png_path, chrome)
        draft.write_text(add_preview_section(text, png_path.name), encoding="utf-8")
    return html_path, png_path


def main(argv):
    if not argv:
        print(__doc__.strip())
        return 2
    failed = 0
    for path in argv:
        try:
            html_path, png_path = render(path)
            print(f"{path}: wrote {html_path.name} and {png_path.name}")
        except Exception as err:  # report every draft, then fail
            failed += 1
            print(f"{path}: {err}", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
