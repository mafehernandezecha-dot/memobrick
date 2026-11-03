# site-developer 2026-11-03

## Summary
Eden's request: 15 chat questions and answers plus a greeting for the Shopify Inbox chat, ordered by how much they help people buy.
There is a Claude-in-Chrome prompt that reads the current settings and saves nothing until Eden types "save". Queued as A-2026W45-055 (pending).
The Inbox agent (AI auto-replies) is planned as phase 2. It waits until the store texts that contradict each other are fixed.

## Done
- Request (Eden, 2026-11-03): "I need an agent to add commons questions an answers to the chat with the intention of converting more customers and make the chat more smart".
- Sources: customer-questions.md, product-facts.md, offers-calendar.md, the WhatsApp agent rules, the live home page, Creator, Art Gift Kit page, free-preview page, refund and shipping policies (all fetched 2026-11-03), and Shopify prices (read-only, 2026-11-03; they match product-facts).
- Checked what Shopify Inbox can do today: greeting (theme App embeds), instant answers (unlimited, up to 100 shown, the tappable list under the greeting), Shopify Magic suggested replies for staff, the Inbox agent (free, needs new customer accounts) and the Knowledge Base app. Source: Shopify Help Center pages found through web search, because help.shopify.com is blocked from this session.
- Drafts: marketing/conversion/site-developer/chat-faq-2026-11-03.md (Q&As, greeting, plan, sources, upkeep dates, undo) and marketing/conversion/site-developer/chat-faq-chrome-prompt.txt. Copy check passes on both.
- Added A-2026W45-055 to queue.md as the caller asked (normally the coordinator does this).
- Task board row: not read this run. The task came straight from Eden through the caller.
- Applied fixes: none this run.

## Proposed for approval
Already in queue.md as A-2026W45-055, using this proposal:

### P-site-developer-20261103-1
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/chat-faq-2026-11-03.md
- Reason: Shopify Inbox chat gets a new greeting and 15 instant answers, entered by Claude in Chrome on Eden's Mac with chat-faq-chrome-prompt.txt, which saves nothing until Eden types "save". The Inbox agent stays off.
- Expires: 2026-11-10
- Status: pending

## Blocked or unknown
- help.shopify.com and third-party blogs are blocked here. Still unknown: the field character limits, whether links in answers are clickable, and whether answers can be reordered. The Chrome prompt checks all three before saving.
- Age guidance is unknown. No age is stated; answer 11 says little ones build with an adult.
- Store texts that contradict each other. Eden needs to decide these before the Inbox agent goes on:
  - Home page FAQ promises free replacements "for as long as you own the kit", but the refund policy summary says a 14-day window.
  - The refund policy summary gives a full refund before shipping, but the policy text charges a $20 restocking fee.
  - The shipping policy says "United States only" and also offers international shipping. It gives 1 to 2 day processing and still has a Covid-19 notice.
  - "2–4 business days" appears on the home page and in the Creator.
  - /pages/faq returns 404.
- Inbox agent requirements (new customer accounts) are not checked. The Chrome prompt only reads that setting.

## Sales impact
Chat visitors are people deciding to buy. They now get an answer in one tap on price, size, Christmas timing (order by Dec 15), the free preview and proof, and gifting without a photo. 12 of the 15 answers link to the Creator, the free proof page or the Gift Kit. There is no chat volume data to estimate the effect. After a week, check chat conversations in Inbox and Creator visits.

## Next run
After Eden approves, she runs the Chrome prompt. Then check the live chat on phone and desktop. Swap or turn off answer 10 on Nov 23, and change answer 3 and the greeting on Dec 16. Propose phase 2 (Inbox agent and Knowledge Base) once the store-text conflicts are decided.
