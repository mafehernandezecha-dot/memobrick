"""Checks for the Memobrick marketing agent system.

Usage:
  python3 marketing/tools/check.py agents
  python3 marketing/tools/check.py layout
  python3 marketing/tools/check.py copy <file> [<file> ...]
  python3 marketing/tools/check.py approvals <file> [--agent NAME --today YYYY-MM-DD]

Exits 0 when everything passes, 1 when errors are found.
"""

import datetime
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


def draft_unchanged(repo_root, draft, commit):
    result = subprocess.run(
        ["git", "-C", str(repo_root), "diff", "--quiet", commit, "--", draft],
        capture_output=True,
    )
    return result.returncode == 0


def approved_items_for(items, agent, today):
    return [
        item for item in items
        if item["executor"] == agent and item["status"] == "approved" and item["expires"] >= today
    ]


def check_layout(repo_root):
    root = pathlib.Path(repo_root)
    return [f"missing {rel}" for rel in REQUIRED_LAYOUT if not (root / rel).is_file()]


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
                if draft_unchanged(REPO_ROOT, item["draft"], item["commit"]):
                    print(item["id"])
                else:
                    errors.append(f"{item['id']}: draft changed since commit {item['commit']}; re-approval needed")
    else:
        print(f"unknown command {command!r}")
        return 1
    for error in errors:
        print(error)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
