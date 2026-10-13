"""Copies a downloaded report into the repo as a clean UTF-8 CSV, without personal data.

Usage:
  python3 marketing/tools/clean_csv.py <downloaded file> <repo file.csv> [--member <name in zip>]

- Reads Google Ads, GA4, Search Console, Meta, TikTok and Pinterest exports: CSV or
  tab-separated, UTF-8 or UTF-16, or one file inside a .zip (Search Console exports a zip;
  pass --member Queries.csv, Pages.csv, ...).
- Title and date lines above the table are kept as '# ' comment lines.
- Drops columns that hold personal data (email, phone, names of people, addresses, user IDs)
  and replaces any email address or phone number left in a cell with [removed].
- Prints what it kept and dropped. Exits 1 if the file has no table.
"""

import csv
import io
import pathlib
import re
import sys
import zipfile

PII_HEADER = re.compile(
    r"e-?mail|phone|telephone|whats ?app|address|postal|zip ?code|birth"
    r"|\b(first|last|full|customer|user|contact|buyer|billing|shipping)[ _]?name\b"
    r"|^(name|customer|username|user|user id|client id|ip)$",
    re.IGNORECASE,
)
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
PHONE = re.compile(r"(?<![\w.])\+?\d{0,3}[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}(?![\w.])")
REMOVED = "[removed]"


def _is_number(text):
    try:
        float(text.replace(",", "").replace("%", "").replace("$", "").strip())
        return True
    except ValueError:
        return False


def scrub_cell(text):
    """Returns the cell with email addresses and phone numbers replaced."""
    if not text or _is_number(text):
        return text
    text = EMAIL.sub(REMOVED, text)
    return PHONE.sub(REMOVED, text)


def decode(data):
    if data.startswith((b"\xff\xfe", b"\xfe\xff")):
        return data.decode("utf-16")
    return data.decode("utf-8-sig", errors="replace")


def read_rows(text):
    lines = [line for line in text.splitlines() if line.strip()]
    sample = "\n".join(lines[:50])
    delimiter = "\t" if sample.count("\t") > sample.count(",") else ","
    rows = list(csv.reader(lines, delimiter=delimiter))
    return lines, [[cell.strip() for cell in row] for row in rows]


def clean(text):
    """Returns (preamble lines, header, rows, dropped column names)."""
    lines, rows = read_rows(text)
    table = [row for row in rows if not (row and row[0].startswith("#"))]
    widths = [len(row) for row in table if len(row) > 1]
    if not widths:
        raise ValueError("no table found")
    width = max(set(widths), key=widths.count)
    candidates = [i for i, row in enumerate(rows) if len(row) == width and not row[0].startswith("#")]
    # The header has no empty or numeric cells; this skips a date line such as
    # "September 13, 2026 - October 12, 2026" that splits into as many cells.
    start = next((i for i in candidates if all(c and not _is_number(c) for c in rows[i])), candidates[0])
    # Title and date lines above the table, as written (rows and lines match until the header).
    preamble = [line.strip().strip(",\t\"").lstrip("# ").strip() for line in lines[:start]]
    preamble = [scrub_cell(line) for line in preamble if line]
    header = rows[start]
    keep = [i for i, name in enumerate(header) if not PII_HEADER.search(name)]
    dropped = [header[i] for i in range(len(header)) if i not in keep]
    body = []
    for row in rows[start + 1:]:
        if row and row[0].startswith("#"):
            continue
        row = row + [""] * (len(header) - len(row))
        body.append([scrub_cell(row[i]) for i in keep])
    return preamble, [header[i] for i in keep], body, dropped


def main(argv):
    if len(argv) < 2:
        print(__doc__.strip())
        return 1
    source, dest = pathlib.Path(argv[0]).expanduser(), pathlib.Path(argv[1])
    member = argv[argv.index("--member") + 1] if "--member" in argv[2:-1] else None
    if zipfile.is_zipfile(source):
        with zipfile.ZipFile(source) as archive:
            names = archive.namelist()
            if member not in names:
                print(f"{source.name} holds {', '.join(names)}; pass --member <one of them>")
                return 1
            data = archive.read(member)
    else:
        data = source.read_bytes()
    try:
        preamble, header, body, dropped = clean(decode(data))
    except ValueError as error:
        print(f"{source.name}: {error}")
        return 1
    out = io.StringIO()
    for line in preamble:
        out.write(f"# {line}\n")
    writer = csv.writer(out, lineterminator="\n")
    writer.writerow(header)
    writer.writerows(body)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out.getvalue(), encoding="utf-8")
    scrubbed = out.getvalue().count(REMOVED)
    print(f"{dest}: {len(body)} rows, {len(header)} columns"
          + (f"; dropped {', '.join(dropped)}" if dropped else "")
          + (f"; {scrubbed} emails or phone numbers removed" if scrubbed else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
