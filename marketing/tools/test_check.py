import datetime
import pathlib
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).parent))

import check  # noqa: E402
import email_preview  # noqa: E402

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
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/christmas-photo-gifts.md
- Commit: abc1234
- Reason: Christmas hub page, needs crawl time before December
- Expires: 2026-10-25
- Status: pending
"""


def approval(item_id, agent="seo-blog-writer", expires="2026-10-25", status="pending",
             executor=None, draft="d.md", commit="abc1234"):
    return (
        f"## {item_id}\n- Agent: {agent}\n- Executor: {executor or agent}\n- Type: publish\n"
        f"- Draft: {draft}\n- Commit: {commit}\n- Reason: r\n- Expires: {expires}\n- Status: {status}\n"
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

    def test_section_headings_are_not_items(self):
        text = "## Time-sensitive\n\n(none)\n\n" + approval("A-2026W42-002") + "\n## Missing owner inputs\n- Order-by date\n"
        items, errors = check.parse_approvals(text)
        self.assertEqual(errors, [])
        self.assertEqual([i["id"] for i in items], ["A-2026W42-002"])

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

    def test_approved_items_filtered_by_executor(self):
        items, _ = check.parse_approvals(approval("A-9", agent="social-planner", executor="social-publisher", status="approved"))
        today = datetime.date(2026, 10, 11)
        self.assertEqual([i["id"] for i in check.approved_items_for(items, "social-publisher", today)], ["A-9"])
        self.assertEqual(check.approved_items_for(items, "social-planner", today), [])

    def test_missing_executor_is_error(self):
        text = approval("A-10").replace("- Executor: seo-blog-writer\n", "")
        items, errors = check.parse_approvals(text)
        self.assertEqual(items, [])
        self.assertTrue(any("A-10" in e and "executor" in e for e in errors), errors)

    def test_missing_commit_is_error(self):
        text = approval("A-11").replace("- Commit: abc1234\n", "")
        items, errors = check.parse_approvals(text)
        self.assertEqual(items, [])
        self.assertTrue(any("A-11" in e and "commit" in e for e in errors), errors)

    def test_unknown_status_is_error(self):
        items, errors = check.parse_approvals(approval("A-12", status="yes"))
        self.assertEqual(items, [])
        self.assertTrue(any("A-12" in e and "Status" in e for e in errors), errors)

    def test_duplicate_id_is_error(self):
        text = approval("A-13", status="approved") + approval("A-13", status="rejected")
        items, errors = check.parse_approvals(text)
        self.assertEqual(items, [])
        self.assertTrue(any("A-13" in e and "duplicate" in e for e in errors), errors)

    def test_repeated_field_is_error(self):
        text = approval("A-14", status="rejected") + "- Status: approved\n"
        items, errors = check.parse_approvals(text)
        self.assertEqual(items, [])
        self.assertTrue(any("A-14" in e and "status" in e.lower() for e in errors), errors)

    def test_missing_draft_path_reported(self):
        (self.root / "real.md").write_text("x")
        items, _ = check.parse_approvals(approval("A-15", draft="real.md") + approval("A-16", draft="real.md (item 4)"))
        errors = check.check_approval_drafts(items, self.root)
        self.assertEqual(len(errors), 1)
        self.assertIn("A-16", errors[0])

    def test_draft_unchanged_since_commit(self):
        run = lambda *a: subprocess.run(["git", "-C", str(self.root), *a], check=True, capture_output=True, text=True)
        run("init", "-q")
        run("config", "user.email", "t@t")
        run("config", "user.name", "t")
        draft = self.root / "draft.md"
        draft.write_text("v1")
        run("add", "draft.md")
        run("commit", "-qm", "v1")
        sha = run("rev-parse", "HEAD").stdout.strip()
        self.assertTrue(check.draft_unchanged(self.root, "draft.md", sha))
        draft.write_text("v2")
        self.assertFalse(check.draft_unchanged(self.root, "draft.md", sha))
        self.assertFalse(check.draft_unchanged(self.root, "draft.md", "0000000"))

    def test_preview_section_does_not_count_as_draft_change(self):
        run = lambda *a: subprocess.run(["git", "-C", str(self.root), *a], check=True, capture_output=True, text=True)
        run("init", "-q")
        run("config", "user.email", "t@t")
        run("config", "user.name", "t")
        draft = self.root / "draft.md"
        draft.write_text("# Draft\n\n## Subject\n\nHi\n")
        run("add", "draft.md")
        run("commit", "-qm", "v1")
        sha = run("rev-parse", "HEAD").stdout.strip()
        draft.write_text(email_preview.add_preview_section(draft.read_text(), "draft-preview.png"))
        self.assertTrue(check.draft_unchanged(self.root, "draft.md", sha))
        draft.write_text(draft.read_text().replace("Hi", "Hello"))
        self.assertFalse(check.draft_unchanged(self.root, "draft.md", sha))

    def test_layout_reports_missing(self):
        errors = check.check_layout(self.root)
        self.assertEqual(len(errors), len(check.REQUIRED_LAYOUT))


DRAFT = """# Campaign draft: test

- Status: draft

## Subject

Which photo makes the best mosaic?

## Preview text

A few simple tips.

## Body

Hi [[contact.first_name|there]],

**Pick a clear photo.** It *really* helps.

- Good light
- Simple background

![Kit](images/kit.png)

[Try your photo](https://mymemobrick.com/?utm_source=omnisend)

Warmly,
The Memobrick team

## Offer

None.
"""


class EmailPreviewTests(unittest.TestCase):
    def test_sections_parsed(self):
        parsed = email_preview.parse_draft(DRAFT)
        self.assertEqual(parsed["subject"], "Which photo makes the best mosaic?")
        self.assertEqual(parsed["preview"], "A few simple tips.")
        self.assertTrue(parsed["body"].startswith("Hi [[contact.first_name|there]],"))
        self.assertTrue(parsed["body"].endswith("The Memobrick team"))
        self.assertIsNone(parsed["cta"])

    def test_missing_sections_are_not_an_email(self):
        parsed = email_preview.parse_draft("# Flow review\n\n## Summary\n\nNumbers.\n")
        self.assertFalse(email_preview.is_email(parsed))
        self.assertEqual(parsed["preview"], "")

    def test_call_to_action_section(self):
        text = DRAFT + "\n## Call to action\n\n- Button: Shop now\n- Link: https://mymemobrick.com/x\n"
        self.assertEqual(email_preview.parse_draft(text)["cta"], ("Shop now", "https://mymemobrick.com/x"))

    def test_inline_flow_draft(self):
        text = (
            "# Test\n\n## Original copy (control, live today)\n\nSubject: `Old`\n\n"
            "## New copy (variant)\n\nSubject: `[[contact.first_name|default:\"Hey\"]], hi`\n\n"
            "Preheader: `Inside.`\n\nHeadline: `Still deciding?`\n\nBlock 1, heading: `Kit`\n\n"
            "Block 1, body: `All bricks.`\n\nBlock 2, heading: `When?`\n\nBlock 2, body: omitted.\n\n"
            "Button: `Finish my order` (link: the cart link)\n"
        )
        parsed = email_preview.parse_draft(text)
        self.assertEqual(email_preview.merge_tags(parsed["subject"]), "Hey, hi")
        self.assertEqual(parsed["preview"], "Inside.")
        self.assertEqual(parsed["body"], "# Still deciding?\n\n## Kit\n\nAll bricks.\n\n[Finish my order](#)")
        self.assertEqual(parsed["cta"], ("Finish my order", "#"))

    def test_merge_tags_show_fallback(self):
        self.assertEqual(email_preview.merge_tags("Hi [[contact.first_name|there]],"), "Hi there,")
        self.assertEqual(email_preview.merge_tags('[[contact.first_name|default:"there"]]'), "there")
        self.assertEqual(email_preview.merge_tags("[[contact.email]]"), "")

    def test_inline_markdown(self):
        out = email_preview.inline_html("**Bold** and *italic* & [link](https://a.com/?x=1&y=2)")
        self.assertIn("<strong>Bold</strong>", out)
        self.assertIn("<em>italic</em>", out)
        self.assertIn("&amp; ", out)
        self.assertIn('href="https://a.com/?x=1&amp;y=2"', out)

    def test_images_resolve_relative_to_draft(self):
        with tempfile.TemporaryDirectory() as tmp:
            (pathlib.Path(tmp) / "images").mkdir()
            (pathlib.Path(tmp) / "images/kit.png").write_bytes(b"")
            out = email_preview.inline_html("![Kit](images/kit.png)", tmp)
        self.assertIn('src="images/kit.png"', out)
        self.assertIn('alt="Kit"', out)
        out = email_preview.inline_html("![Kit](https://cdn.example.com/k.png)", "/repo")
        self.assertIn('src="https://cdn.example.com/k.png"', out)

    def test_body_blocks_and_button(self):
        out = email_preview.body_to_html(email_preview.parse_draft(DRAFT)["body"])
        self.assertIn("Hi there,", out)
        self.assertIn("<ul", out)
        self.assertEqual(out.count("<li"), 2)
        self.assertIn("<img", out)
        self.assertIn(email_preview.PINK, out)
        self.assertIn("border-radius:999px;\">Try your photo</a>", out)
        self.assertLess(out.index("Try your photo"), out.index("Warmly"))
        self.assertIn("Warmly,<br>The Memobrick team", out)

    def test_last_link_is_the_button(self):
        out = email_preview.body_to_html("See [a](https://a.com) first.\n\n[Go](https://b.com)")
        self.assertIn('text-decoration:underline;">a</a>', out)
        self.assertIn("border-radius:999px;\">Go</a>", out)

    def test_cta_button_added_when_not_in_body(self):
        out = email_preview.body_to_html("Hello.\n\nMore.\n\nThanks,\nTeam", cta=("Shop", "https://s.com"))
        self.assertLess(out.index("Shop"), out.index("Thanks"))
        self.assertGreater(out.index("Shop"), out.index("More."))

    def test_email_html_has_inbox_and_footer(self):
        page = email_preview.email_html(email_preview.parse_draft(DRAFT))
        self.assertIn("Memobrick", page)
        self.assertIn("Which photo makes the best mosaic?", page)
        self.assertIn("A few simple tips.", page)
        self.assertIn("mymemobrick.com", page)
        self.assertIn("Unsubscribe", page)
        self.assertIn("width: 600px", page)

    def test_preview_section_added_once(self):
        once = email_preview.add_preview_section(DRAFT, "test-preview.png")
        self.assertTrue(once.startswith(
            "# Campaign draft: test\n\n## Preview\n\n![Email preview](test-preview.png)\n\n- Status"))
        self.assertEqual(email_preview.add_preview_section(once, "test-preview.png"), once)
        self.assertEqual(check.strip_preview(once), DRAFT)


DESIGN_DRAFT = """# Campaign draft: design

## Subject

The photo your family will build together

## Subject options

1. Another subject

## Preview text

Tips inside.

## Body

<!-- hero: https://mymemobrick.com/cdn/shop/files/a.png?width=1200&crop=region | The photo you will build | Simple tips | A family at the table -->

Hi [[contact.first_name|there]],

## How to choose the photo

**Get close.** Faces fill the frame.

<!-- divider -->

[See your photo in bricks](https://mymemobrick.com/?utm_source=omnisend)

Warmly,
The Memobrick team

P.S. Upload it anyway.

## Call to action

- Button: See your photo in bricks
- Link: https://mymemobrick.com/?utm_source=omnisend
"""


class DesignBlockTests(unittest.TestCase):
    def body(self, text):
        return email_preview.body_to_html(text)

    def test_exact_section_beats_prefix(self):
        parsed = email_preview.parse_draft(DESIGN_DRAFT)
        self.assertEqual(parsed["subject"], "The photo your family will build together")

    def test_body_keeps_its_own_headlines(self):
        parsed = email_preview.parse_draft(DESIGN_DRAFT)
        self.assertIn("## How to choose the photo", parsed["body"])
        self.assertTrue(parsed["body"].endswith("P.S. Upload it anyway."))
        self.assertNotIn("Button:", parsed["body"])

    def test_serif_headlines(self):
        out = self.body("# Big\n\n## Medium\n\n### Eyebrow")
        self.assertIn("<h1", out)
        self.assertIn("<h2", out)
        self.assertEqual(out.count(email_preview.SERIF), 2)
        self.assertIn("text-transform:uppercase", out.split("<h3")[1])

    def test_hero(self):
        out = self.body("<!-- hero: https://x.com/a.png?w=1&h=2 | Big headline | small line | Family at the table -->")
        self.assertIn('src="https://x.com/a.png?w=1&amp;h=2"', out)
        self.assertIn('alt="Family at the table"', out)
        self.assertIn('width="600"', out)
        self.assertIn("Big headline</h1>", out)
        self.assertIn("small line", out)
        self.assertIn(email_preview.SERIF, out)

    def test_hero_alt_defaults_to_headline(self):
        out = self.body("<!-- hero: a.png | Big headline -->")
        self.assertIn('alt="Big headline"', out)

    def test_image(self):
        out = self.body("<!-- image: https://x.com/b.png | Couple holding the mosaic | The memory stays. -->")
        self.assertIn('alt="Couple holding the mosaic"', out)
        self.assertIn("The memory stays.", out)

    def test_pair(self):
        out = self.body("<!-- pair: before.jpg | after.jpg | Same smiles, in bricks. -->")
        self.assertIn('src="before.jpg"', out)
        self.assertIn('src="after.jpg"', out)
        self.assertIn('alt="Your photo: Same smiles, in bricks."', out)
        self.assertIn("Your mosaic", out)
        self.assertEqual(out.count('class="col"'), 2)
        out = self.body("<!-- pair: a.jpg | b.jpg | | The photo | The mosaic -->")
        self.assertIn('alt="The photo"', out)
        self.assertIn('alt="The mosaic"', out)

    def test_steps(self):
        out = self.body("<!-- steps: Upload your photo | We design it: in 40+ colors | You build it together -->")
        self.assertEqual(out.count('class="col step"'), 3)
        self.assertIn(">Upload your photo</p>", out)
        self.assertIn(">We design it</p>", out)
        self.assertIn(">in 40+ colors</p>", out)
        for number in ("1", "2", "3"):
            self.assertIn(f">{number}</td>", out)

    def test_band(self):
        out = self.body("<!-- band: The best gifts start with a photo. -->")
        self.assertIn(f'bgcolor="{email_preview.NAVY}"', out)
        self.assertIn("The best gifts start with a photo.", out)
        self.assertIn("color:#ffffff", out)

    def test_quote(self):
        out = self.body("<!-- quote: Built together, kept forever | Memobrick -->")
        self.assertIn("&ldquo;", out)
        self.assertIn("Built together, kept forever", out)
        self.assertIn("Memobrick</p>", out)

    def test_divider(self):
        out = self.body("Hi.\n\n<!-- divider -->\n\nBye.")
        self.assertEqual(out.count('width="14" height="14"'), len(email_preview.BRICKS))
        self.assertLess(out.index("Hi."), out.index('width="14"'))
        self.assertLess(out.index('width="14"'), out.index("Bye."))

    def test_products(self):
        out = self.body("<!-- products:\n"
                        "a.png | 20×20 kit | 4,096 bricks | https://mymemobrick.com/a\n"
                        "b.png | 30×30 kit | 9,216 bricks | https://mymemobrick.com/b\n-->")
        self.assertEqual(out.count('class="col"'), 2)
        self.assertIn("20×20 kit", out)
        self.assertIn("9,216 bricks", out)
        self.assertIn('href="https://mymemobrick.com/b"', out)
        self.assertIn('alt="30×30 kit"', out)

    def test_unknown_block_and_plain_comment_skipped(self):
        import contextlib
        import io
        with contextlib.redirect_stderr(io.StringIO()):
            out = self.body("Hi.\n\n<!-- sparkles: x -->\n\n<!-- just a note -->")
        self.assertNotIn("sparkles", out)
        self.assertNotIn("note", out)
        self.assertIn("Hi.", out)

    def test_block_links_are_not_the_button(self):
        out = self.body("<!-- products: a.png | Kit | x | https://k.com -->\n\nText [Go](https://go.com)")
        self.assertIn("border-radius:999px;\">Go</a>", out)

    def test_ps_stays_below_signoff_and_button(self):
        out = email_preview.body_to_html("Hello.\n\nWarmly,\nTeam\n\nP.S. One more thing.", cta=("Shop", "https://s.com"))
        self.assertLess(out.index("Shop"), out.index("Warmly"))
        self.assertLess(out.index("Warmly"), out.index("P.S."))
        self.assertIn(f'color:{email_preview.PINK};">P.S.</strong>', out)

    def test_every_image_has_alt_text(self):
        page = email_preview.email_html(email_preview.parse_draft(DESIGN_DRAFT))
        import re
        for tag in re.findall(r"<img[^>]*>", page):
            self.assertRegex(tag, r'alt="[^"]+"')

    def test_omnisend_html_is_inline_and_table_based(self):
        out = email_preview.omnisend_html(email_preview.parse_draft(DESIGN_DRAFT))
        self.assertIn('<table role="presentation"', out)
        self.assertIn('width="600"', out)
        self.assertIn("The photo you will build", out)
        self.assertIn("See your photo in bricks", out)
        self.assertNotIn("Unsubscribe", out)  # Omnisend adds its own footer
        self.assertNotIn('class="inbox"', out)
        self.assertNotIn("Upload these images", out)
        out = email_preview.omnisend_html(email_preview.parse_draft(DRAFT))
        self.assertIn("Upload these images to Omnisend", out)
        self.assertIn("images/kit.png", out)

    def test_page_is_phone_ready_and_light_only(self):
        page = email_preview.email_html(email_preview.parse_draft(DESIGN_DRAFT))
        self.assertIn('name="color-scheme" content="light only"', page)
        self.assertIn("max-width: 620px", page)
        self.assertIn("fonts.googleapis.com", page)


if __name__ == "__main__":
    unittest.main()
