"""Checks for the Memobrick marketing agent system.

Usage:
  python3 marketing/tools/check.py agents
  python3 marketing/tools/check.py layout
  python3 marketing/tools/check.py copy <file> [<file> ...]
  python3 marketing/tools/check.py approvals <file> [--agent NAME --today YYYY-MM-DD]
  python3 marketing/tools/check.py data [<folder>]

Exits 0 when everything passes, 1 when errors are found.
"""

import csv
import datetime
import hashlib
import pathlib
import re
import subprocess
import sys

REPO_ROOT = pathlib.Path(__file__).resolve().parents[2]

AGENT_SECTIONS = ["## Job", "## Inputs", "## Cadence", "## Steps", "## Outputs", "## Never"]
RUN_LINE = "Follow the memobrick-run skill."
APPROVAL_FIELDS = ["agent", "executor", "type", "draft", "commit", "reason", "expires", "status"]
STATUS_PATTERN = re.compile(r"^(pending|approved|rejected|changes:.*)$")
APPROVAL_TYPES = {"publish", "send", "ad-change", "offer", "site-change"}
EM_DASH = "—"
ITEM_ID = re.compile(r"^[A-Z]-\S+$")

REQUIRED_LAYOUT = [
    "marketing/README.md",
    "marketing/shared/scorecard.md",
    "marketing/shared/experiments.md",
    "marketing/shared/offers-calendar.md",
    "marketing/shared/content-calendar.md",
    "marketing/shared/customer-questions.md",
    "marketing/shared/contacts-log.md",
    "marketing/approvals/TEMPLATE.md",
    ".claude/skills/memobrick-brand/SKILL.md",
    ".claude/skills/memobrick-approvals/SKILL.md",
    ".claude/skills/memobrick-run/SKILL.md",
    "marketing/data/latest.md",
    "marketing/data/requests.md",
]


def parse_frontmatter(text):
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}
    result = {}
    for line in lines[1:]:
        if line.strip() == "---":
            return result
        key, sep, value = line.partition(":")
        if sep:
            result[key.strip()] = value.strip()
    return {}


def check_agent_file(path, repo_root):
    path = pathlib.Path(path)
    text = path.read_text()
    errors = []
    meta = parse_frontmatter(text)
    if meta.get("name") != path.stem:
        errors.append(f"{path.name}: frontmatter name {meta.get('name')!r} must equal {path.stem!r}")
    if not meta.get("description"):
        errors.append(f"{path.name}: frontmatter description is missing")

    position = -1
    for section in AGENT_SECTIONS:
        found = re.search(rf"^{re.escape(section)}\s*$", text, re.MULTILINE)
        if not found:
            errors.append(f"{path.name}: missing section {section}")
        elif found.start() < position:
            errors.append(f"{path.name}: section {section} is out of order")
        else:
            position = found.start()

    steps = re.search(r"^## Steps\s*$(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL)
    if steps and RUN_LINE not in steps.group(1).strip().splitlines()[0:1]:
        errors.append(f"{path.name}: Steps must begin with '{RUN_LINE}'")

    folder = re.search(r"^Output folder: (marketing/\S+)\s*$", text, re.MULTILINE)
    if not folder:
        errors.append(f"{path.name}: missing 'Output folder: marketing/...' line")
    elif not (pathlib.Path(repo_root) / folder.group(1)).is_dir():
        errors.append(f"{path.name}: Output folder {folder.group(1)} does not exist")
    return errors


def find_em_dashes(text):
    return [number for number, line in enumerate(text.splitlines(), 1) if EM_DASH in line]


def parse_approvals(text):
    items, errors = [], []
    blocks = []
    for block in re.split(r"^## ", text, flags=re.MULTILINE)[1:]:
        lines = block.splitlines()
        if ITEM_ID.match(lines[0].strip()):
            blocks.append(lines)
    ids = [lines[0].strip() for lines in blocks]
    duplicates = {item_id for item_id in ids if ids.count(item_id) > 1}
    for item_id in sorted(duplicates):
        errors.append(f"{item_id}: duplicate item ID; none of its copies count")
    for lines in blocks:
        item_id = lines[0].strip()
        if item_id in duplicates:
            continue
        fields, repeated = {}, []
        for line in lines[1:]:
            match = re.match(r"^- (\w[\w ]*?):(.*)$", line)
            if match:
                key = match.group(1).strip().lower()
                if key in fields:
                    repeated.append(key)
                fields[key] = match.group(2).strip()
        if repeated:
            errors.append(f"{item_id}: repeated field {', '.join(repeated)}")
            continue
        missing = [name for name in APPROVAL_FIELDS if not fields.get(name)]
        if missing:
            errors.append(f"{item_id}: missing {', '.join(missing)}")
            continue
        try:
            expires = datetime.date.fromisoformat(fields["expires"])
        except ValueError:
            errors.append(f"{item_id}: Expires {fields['expires']!r} is not YYYY-MM-DD")
            continue
        if fields["type"] not in APPROVAL_TYPES:
            errors.append(f"{item_id}: Type {fields['type']!r} is not one of {sorted(APPROVAL_TYPES)}")
            continue
        status = fields["status"].strip()
        status = status.lower() if not status.lower().startswith("changes:") else "changes:" + status[8:]
        if not STATUS_PATTERN.match(status):
            errors.append(f"{item_id}: Status {fields['status']!r} is not pending, approved, rejected, or changes: <note>")
            continue
        items.append({
            "id": item_id,
            "agent": fields["agent"],
            "executor": fields["executor"],
            "type": fields["type"],
            "draft": fields["draft"],
            "commit": fields["commit"],
            "reason": fields["reason"],
            "expires": expires,
            "status": status,
        })
    return items, errors


def check_approval_drafts(items, repo_root):
    root = pathlib.Path(repo_root)
    return [
        f"{item['id']}: Draft {item['draft']!r} does not exist"
        for item in items if not (root / item["draft"]).is_file()
    ]


def _git(repo_root, *args):
    return subprocess.run(["git", "-C", str(repo_root), *args], capture_output=True, text=True)


def draft_unchanged(repo_root, draft, commit):
    # Cloud runs clone with shallow history; fetch the rest before deciding,
    # so an old approval commit is not mistaken for a changed draft.
    if _git(repo_root, "cat-file", "-e", f"{commit}^{{commit}}").returncode != 0:
        if _git(repo_root, "rev-parse", "--is-shallow-repository").stdout.strip() == "true":
            _git(repo_root, "fetch", "--quiet", "--unshallow")
    if _git(repo_root, "diff", "--quiet", commit, "--", draft).returncode == 0:
        return True
    # Adding or refreshing the email preview image (email_preview.py) does not
    # change the copy that was approved.
    before = _git(repo_root, "show", f"{commit}:{draft}")
    path = pathlib.Path(repo_root) / draft
    if before.returncode != 0 or not path.exists():
        return False
    return strip_preview(before.stdout) == strip_preview(path.read_text())


PREVIEW_SECTION = re.compile(r"^## Preview[ \t]*\n\s*!\[Email preview\]\([^)]*\)[ \t]*\n*", re.M)


def strip_preview(text):
    return PREVIEW_SECTION.sub("", text, count=1)


POST_ID = re.compile(r"\bS-\d{8}-\d+\b")
BATCH_ROW = re.compile(r"^\|\s*(S-\d{8}-\d+)\s*\|\s*([^|\s]+)\s*\|\s*([0-9a-f]{40})\s*\|")


def is_batch(item):
    """A weekly social batch: one publish item whose draft is a week.md listing every post."""
    return pathlib.PurePosixPath(item["draft"]).name == "week.md"


def sent_back_posts(item):
    """Post IDs the owner sent back with `changes: <post-id> ...` on a batch item."""
    return set(POST_ID.findall(item["status"])) if item["status"].startswith("changes:") else set()


def parse_batch(text):
    """Rows of week.md: (post ID, post file, blob hash of the post file)."""
    return [match.groups() for match in map(BATCH_ROW.match, text.splitlines()) if match]


def blob_hash(path):
    """The same hash as `git hash-object <path>`."""
    data = pathlib.Path(path).read_bytes()
    return hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()


def batch_approvals(item, repo_root):
    """Lines `<A-ID> <post ID>` for each post a batch item approves, plus errors.

    Posts named in a `changes:` note are skipped; a post whose file no longer
    matches the hash listed in week.md needs re-approval.
    """
    root = pathlib.Path(repo_root)
    rows = parse_batch((root / item["draft"]).read_text())
    if not rows:
        return [], [f"{item['id']}: {item['draft']} lists no posts (| Post ID | Post file | Hash | ...)"]
    ids = [row[0] for row in rows]
    skip = sent_back_posts(item)
    lines, errors = [], []
    for post_id, post_file, listed in rows:
        if post_id in skip:
            continue
        if ids.count(post_id) > 1:
            errors.append(f"{item['id']} {post_id}: listed more than once in {item['draft']}")
        elif not (root / post_file).is_file():
            errors.append(f"{item['id']} {post_id}: post file {post_file} does not exist")
        elif blob_hash(root / post_file) != listed:
            errors.append(f"{item['id']} {post_id}: post file changed since approval; re-approval needed")
        else:
            lines.append(f"{item['id']} {post_id}")
    return lines, errors


def approved_items_for(items, agent, today):
    """Approved, unexpired items for this Executor. A weekly batch with
    `changes: <post-id> ...` stays approved for the posts it does not name."""
    return [
        item for item in items
        if item["executor"] == agent and item["expires"] >= today
        and (item["status"] == "approved" or (is_batch(item) and sent_back_posts(item)))
    ]


def check_layout(repo_root):
    root = pathlib.Path(repo_root)
    return [f"missing {rel}" for rel in REQUIRED_LAYOUT if not (root / rel).is_file()]


def check_data(folder):
    """Finds personal data (email, phone, people's names) in the data snapshots."""
    import clean_csv

    errors = []
    folder = pathlib.Path(folder)
    for path in sorted(p for p in folder.rglob("*") if p.is_file()):
        rel = path.relative_to(folder)
        if path.suffix.lower() not in {".csv", ".md", ".txt", ".tsv", ".json"}:
            errors.append(f"{rel}: only .csv, .md, .txt, .tsv or .json files belong in the data folder")
            continue
        text = path.read_text(errors="replace")
        if path.suffix.lower() in {".csv", ".tsv"}:
            rows = [row for row in csv.reader(line for line in text.splitlines() if line and not line.startswith("#"))]
            for name in rows[0] if rows else []:
                if clean_csv.PII_HEADER.search(name):
                    errors.append(f"{rel}: column {name!r} may hold personal data; drop it")
        for number, line in enumerate(text.splitlines(), 1):
            if clean_csv.EMAIL.search(line):
                errors.append(f"{rel}:{number}: email address")
            elif any(not clean_csv._is_number(cell) for cell in clean_csv.PHONE.findall(line)):
                errors.append(f"{rel}:{number}: phone number")
    return errors


def _option(args, name):
    if name in args:
        index = args.index(name)
        if index + 1 < len(args):
            return args[index + 1]
    return None


def main(argv):
    if not argv:
        print(__doc__.strip())
        return 1
    command, args = argv[0], argv[1:]
    errors = []
    if command == "agents":
        for path in sorted((REPO_ROOT / ".claude/agents").glob("*.md")):
            errors += check_agent_file(path, REPO_ROOT)
    elif command == "layout":
        errors = check_layout(REPO_ROOT)
    elif command == "data":
        errors = check_data(pathlib.Path(args[0]) if args else REPO_ROOT / "marketing/data")
    elif command == "copy":
        if not args:
            errors.append("copy: give at least one file")
        for name in args:
            for number in find_em_dashes(pathlib.Path(name).read_text()):
                errors.append(f"{name}:{number}: em dash in customer copy")
    elif command == "approvals":
        if not args:
            print("approvals: give the approval file")
            return 1
        items, errors = parse_approvals(pathlib.Path(args[0]).read_text())
        errors += check_approval_drafts(items, REPO_ROOT)
        agent = _option(args, "--agent")
        if agent:
            today_text = _option(args, "--today")
            today = datetime.date.fromisoformat(today_text) if today_text else datetime.date.today()
            for item in approved_items_for(items, agent, today):
                if not draft_unchanged(REPO_ROOT, item["draft"], item["commit"]):
                    errors.append(f"{item['id']}: draft changed since commit {item['commit']}; re-approval needed")
                elif is_batch(item):
                    lines, batch_errors = batch_approvals(item, REPO_ROOT)
                    for line in lines:
                        print(line)
                    errors += batch_errors
                else:
                    print(item["id"])
    else:
        print(f"unknown command {command!r}")
        return 1
    for error in errors:
        print(error)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
