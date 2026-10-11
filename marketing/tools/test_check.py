import datetime
import pathlib
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).parent))

import check  # noqa: E402

AGENT_TEMPLATE = """---
name: {name}
description: Weekly sales scorecard.
---

## Job
One trusted weekly view of sales.

Output folder: {folder}

## Inputs
Shopify analytics.

## Cadence
Mon 6:00.

## Steps
Follow the memobrick-run skill.

## Outputs
Scorecard row.
{never}"""

APPROVAL_SAMPLE = """# Approvals 2026-W42

## A-2026W42-001
- Agent: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/christmas-photo-gifts.md
- Reason: Christmas hub page, needs crawl time before December
- Expires: 2026-10-25
- Status: pending
"""


def approval(item_id, agent="seo-blog-writer", expires="2026-10-25", status="pending"):
    return (
        f"## {item_id}\n- Agent: {agent}\n- Type: publish\n- Draft: d.md\n"
        f"- Reason: r\n- Expires: {expires}\n- Status: {status}\n"
    )


class CheckTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = pathlib.Path(self.tmp.name)
        (self.root / ".claude/agents").mkdir(parents=True)
        (self.root / "marketing/analytics/growth-analyst").mkdir(parents=True)

    def tearDown(self):
        self.tmp.cleanup()

    def write_agent(self, filename="growth-analyst", name="growth-analyst",
                    folder="marketing/analytics/growth-analyst/", never="\n## Never\nChange budgets.\n"):
        path = self.root / ".claude/agents" / f"{filename}.md"
        path.write_text(AGENT_TEMPLATE.format(name=name, folder=folder, never=never))
        return path

    def test_frontmatter_parsed(self):
        text = "---\nname: growth-analyst\ndescription: x\n---\nbody"
        self.assertEqual(check.parse_frontmatter(text), {"name": "growth-analyst", "description": "x"})

    def test_valid_agent_file_passes(self):
        self.assertEqual(check.check_agent_file(self.write_agent(), self.root), [])

    def test_agent_name_mismatch_fails(self):
        errors = check.check_agent_file(self.write_agent(name="wrong"), self.root)
        self.assertTrue(any("name" in e for e in errors), errors)

    def test_agent_missing_section_fails(self):
        errors = check.check_agent_file(self.write_agent(never=""), self.root)
        self.assertTrue(any("## Never" in e for e in errors), errors)

    def test_agent_missing_output_folder_fails(self):
        errors = check.check_agent_file(self.write_agent(folder="marketing/nope/"), self.root)
        self.assertTrue(any("Output folder" in e for e in errors), errors)

    def test_em_dash_lines(self):
        self.assertEqual(check.find_em_dashes("ok\nbad — here\nfine"), [2])
        self.assertEqual(check.find_em_dashes("a - b -- c"), [])

    def test_parse_approvals_valid(self):
        items, errors = check.parse_approvals(APPROVAL_SAMPLE)
        self.assertEqual(errors, [])
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["id"], "A-2026W42-001")
        self.assertEqual(items[0]["expires"], datetime.date(2026, 10, 25))
        self.assertEqual(items[0]["status"], "pending")

    def test_status_normalized(self):
        items, _ = check.parse_approvals(approval("A-1", status=" Approved "))
        self.assertEqual(items[0]["status"], "approved")
        items, _ = check.parse_approvals(approval("A-2", status="changes: shorter title"))
        self.assertEqual(items[0]["status"], "changes: shorter title")

    def test_missing_field_is_error(self):
        text = approval("A-3").replace("- Expires: 2026-10-25\n", "")
        items, errors = check.parse_approvals(text)
        self.assertEqual(items, [])
        self.assertTrue(any("A-3" in e for e in errors), errors)

    def test_bad_date_is_error(self):
        items, errors = check.parse_approvals(approval("A-4", expires="Oct 25"))
        self.assertEqual(items, [])
        self.assertTrue(any("A-4" in e for e in errors), errors)

    def test_approved_items_for_filters(self):
        text = (
            approval("A-5", status="approved")
            + approval("A-6", expires="2026-10-10", status="approved")
            + approval("A-7")
            + approval("A-8", agent="social-planner", status="approved")
        )
        items, _ = check.parse_approvals(text)
        result = check.approved_items_for(items, "seo-blog-writer", datetime.date(2026, 10, 11))
        self.assertEqual([i["id"] for i in result], ["A-5"])

    def test_layout_reports_missing(self):
        errors = check.check_layout(self.root)
        self.assertEqual(len(errors), len(check.REQUIRED_LAYOUT))


if __name__ == "__main__":
    unittest.main()
