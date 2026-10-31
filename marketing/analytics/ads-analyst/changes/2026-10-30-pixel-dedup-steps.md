# Purchase deduplication check for Eden (about 2 minutes)

Not an ad-change item; nothing is changed by Daniel. Why: Meta shows about 2 server Purchase events per order. If they are not matched, Meta counts too many purchases and optimizes on wrong data.

1. Open Events Manager: https://business.facebook.com/events_manager2 , choose the dataset with ID 3444389275577775.
2. Overview tab, click the Purchase event. Look at the "Deduplication" row or the Diagnostics tab for a warning like "Event Deduplication: events not deduplicated" or "Missing event_id".
3. Check the Sources: Browser and Server should both show Purchase, and the "Event match" or "Deduplicated" percentage should be above 0.
4. In Shopify admin, Sales channels, Facebook & Instagram, Data sharing: it should be on one level only (Maximum is fine). Make sure no other tool (a second Meta app, a GTM Meta tag, or the Conversions API partner in Events Manager Settings) also sends Purchase. If there are two senders, turn off the extra one.
5. Tell Daniel the result (percent deduplicated). If the warning shows, send a screenshot.
