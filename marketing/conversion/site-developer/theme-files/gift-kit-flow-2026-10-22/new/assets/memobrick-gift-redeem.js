/* =====================================================================
   MemoBrick: personalise a prepaid Art Gift Kit (no checkout)

   The order confirmation email for "Art Gift Kit - Buy Now, Personalise
   Later" links each kit to:

     /pages/editor?gift=%2320002&email=buyer%40example.com&size=20x20

   With ?gift= in the URL the Creator runs in gift mode:
     - prices are hidden; each size shows "Included" or "+$X"
       (gift credit = $99 per kit; sizes it covers are included, bigger
       sizes show the difference, which the owner invoices by a payment
       link before production; nothing is charged on this page)
     - "I have another gift link" adds more gift kits (one bigger mosaic)
     - the finish buttons read "Submit my design"; on submit we ask the
       recipient's name, email and shipping address, store the finished
       design and build instructions exactly like an order does (through
       a cart line that is removed again straight away), then email it
       all to the store through Shopify's contact form
     - the link is marked as used in this browser
   Nothing stays in the cart and the recipient never sees checkout.
   The store checks every order number and buyer email before production.

   Stand-alone: wraps window.MB_addToCart / MB_openCartDrawer /
   MB_cartMessage from memobrick.js. Without ?gift= it does nothing
   (except finishing a submission that went through Shopify's spam check).
===================================================================== */
(() => {
  "use strict";
  const CFG = Object.assign({ kitSize: "20x20", kitCredit: 99, storeEmail: "", shopName: "MemoBrick" }, window.MB_GIFT_CFG || {});
  const params = new URLSearchParams(location.search);
  const PENDING = "mb_gift_pending";
  const USED = "mb_gift_used";
  const EXTRA = "mb_gift_extra";
  const LABEL = "Submit my design";
  const REF_RE = /^#?\d{3,7}(-\d{1,2})?$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, "");
  const normRef = (r) => { r = String(r || "").trim(); return r && r[0] !== "#" ? "#" + r : r; };
  const sizeText = (id) => String(id || "").replace("x", " × ") + " in";
  function el(html){ const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function store(kind){ try { return kind === "local" ? window.localStorage : window.sessionStorage; } catch (e){ return null; } }
  function readJSON(kind, key, dflt){ try { const s = store(kind); const v = s && s.getItem(key); return v ? JSON.parse(v) : dflt; } catch (e){ return dflt; } }
  function writeJSON(kind, key, val){ try { const s = store(kind); s && s.setItem(key, JSON.stringify(val)); } catch (e){} }

  /* ---------------- styles ---------------- */
  function injectCss(){
    if (document.querySelector("#mbg-css")) return;
    const css = document.createElement("style");
    css.id = "mbg-css";
    css.textContent = `
    .mb-gift #pcAmt,.mb-gift #pcWas,.mb-gift #pcSave,.mb-gift #bbPrice,.mb-gift #mobTopPrice,.mb-gift #mobTopWas,.mb-gift #edTopPrice,.mb-gift #edTopWas,
    .mb-gift #mobNotice,.mb-gift #buildBtn,.mb-gift .upsize{display:none!important}
    .mbg-banner{position:relative;z-index:50;background:var(--ink,#1d1d1f);color:#fff;font:500 14px/1.45 var(--body,system-ui);
      padding:10px 16px;display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;justify-content:center;text-align:center}
    .mbg-banner b{font-weight:700}
    .mbg-banner button{font:600 13px var(--body,system-ui);color:#fff;background:transparent;border:1px solid rgba(255,255,255,.55);
      border-radius:999px;padding:5px 12px;cursor:pointer}
    .mbg-addlink{display:block;width:100%;margin:10px 0 4px;font:600 14px var(--body,system-ui);color:var(--ink,#1d1d1f);
      background:#fff6f0;border:1px dashed #e0a98f;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:center}
    .mbg-credit{font:600 14px/1.4 var(--body,system-ui);color:var(--ink,#1d1d1f);background:#fff6f0;border-radius:12px;
      padding:10px 12px;margin:0 0 10px;text-align:center}
    .mbg-back{position:fixed;inset:0;z-index:2147483000;background:rgba(20,20,30,.55);display:flex;
      align-items:center;justify-content:center;padding:16px}
    .mbg-card{background:#fff;border-radius:20px;max-width:460px;width:100%;max-height:92vh;overflow:auto;box-sizing:border-box;
      padding:24px;font-family:var(--body,system-ui);color:var(--ink,#1d1d1f);box-shadow:0 20px 60px rgba(0,0,0,.25)}
    .mbg-card h3{font-family:var(--display,inherit);font-size:24px;letter-spacing:-.02em;margin:0 0 6px}
    .mbg-card p{color:var(--ink-2,#555);font-size:15px;line-height:1.5;margin:0 0 14px}
    .mbg-card label{display:block;font-size:13px;font-weight:600;margin:12px 0 4px}
    .mbg-card input,.mbg-card textarea,.mbg-card select{width:100%;box-sizing:border-box;border:1px solid #d8d8de;border-radius:12px;
      padding:11px 12px;font:16px var(--body,system-ui);background:#fff}
    .mbg-card textarea{min-height:70px;resize:vertical}
    .mbg-row{display:flex;gap:10px}.mbg-row>div{flex:1;min-width:0}
    .mbg-card .mbg-check{display:flex;gap:10px;align-items:flex-start;font-weight:500;font-size:14px;line-height:1.45}
    .mbg-card .mbg-check input{width:auto;margin-top:3px}
    .mbg-note{background:#fff6f0;border-radius:12px;padding:10px 12px;font-size:14px;line-height:1.45;margin:6px 0 4px}
    .mbg-actions{display:flex;gap:10px;margin-top:18px}
    .mbg-actions .btn{flex:1;justify-content:center;text-align:center}
    .mbg-err{color:var(--b-red,#c8324a);font-size:14px;margin-top:10px;min-height:1em}
    .mbg-steps{margin:0 0 14px;padding-left:20px;font-size:15px;line-height:1.5;color:var(--ink-2,#555);text-align:left}
    .mbg-steps li{margin:0 0 6px}
    .mbg-small{font-size:13px!important;color:#888!important}`;
    document.head.appendChild(css);
  }

  /* ---------------- confirmation screen ---------------- */
  function showDone(info){
    injectCss();
    if (document.querySelector(".mbg-done")) return;
    info = info || {};
    const refs = (info.refs || []).join(" + ");
    const mail = info.mailto ? `<p class="mbg-small">Haven't heard from us in a few days? <a href="${esc(info.mailto)}">Email us a copy of your submission</a>.</p>` : "";
    const back = el(`
      <div class="mbg-back mbg-done" role="dialog" aria-modal="true" aria-labelledby="mbgD">
        <div class="mbg-card" style="text-align:center">
          <h3 id="mbgD">Your design is in!</h3>
          <p>Thank you${info.name ? ", " + esc(info.name.split(" ")[0]) : ""}. We've received your design for gift kit ${esc(refs)}.</p>
          <p style="font-weight:600;color:var(--ink,#1d1d1f);margin-bottom:8px">What happens next</p>
          <ol class="mbg-steps">
            <li>We check your design and email you a design proof${info.email ? " at <b>" + esc(info.email) + "</b>" : ""}.</li>
            <li>You reply to approve it, or tell us what to change.</li>
            ${info.diff > 0 ? `<li>We also email you a secure payment link for the difference of <b>${esc(money(info.diff))}</b> for the bigger size.</li>` : ""}
            <li>Once it's approved, we make your kit and ship it to you.</li>
          </ol>
          ${info.designId ? `<p class="mbg-small">Your design reference: ${esc(info.designId)}</p>` : ""}
          ${mail}
          <a class="btn btn-red" href="/">Back to MemoBrick</a>
        </div>
      </div>`);
    document.body.appendChild(back);
  }

  // back from Shopify's spam check after a full-page contact form submit
  const pending = readJSON("session", PENDING, null);
  if (pending && (params.get("contact_posted") === "true" || params.get("gift_sent"))){
    try { sessionStorage.removeItem(PENDING); } catch (e){}
    const show = () => showDone(pending);
    if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
    return;
  }

  /* ---------------- gift mode ---------------- */
  const firstRef = normRef((params.get("gift") || "").slice(0, 20));
  if (!params.has("gift")) return;
  const buyerEmail = (params.get("email") || "").trim().slice(0, 120);
  const giftSize = ((params.get("size") || CFG.kitSize).trim().replace(/[^0-9x]/g, "")) || CFG.kitSize;
  const linkOk = REF_RE.test(firstRef) && EMAIL_RE.test(buyerEmail);

  const origAdd = window.MB_addToCart;
  const origMsg = window.MB_cartMessage;
  if (!origAdd) return;

  // all gift kits in this session: [{ref, email}]
  let kits = [{ ref: firstRef, email: buyerEmail }];
  readJSON("session", EXTRA, []).forEach((k) => {
    if (k && k.ref && k.ref !== firstRef && !kits.some((x) => x.ref === k.ref)) kits.push(k);
  });
  const credit = () => kits.length * CFG.kitCredit;

  function priceOf(id){
    try { const v = window.MB_variantFor && window.MB_variantFor(id, false); if (v && v.price != null) return parseFloat(v.price); } catch (e){}
    return null;
  }
  function diffFor(id){
    if (id === giftSize && kits.length === 1) return 0;
    const p = priceOf(id);
    if (p == null) return 0;
    const d = Math.round((p - credit()) * 100) / 100;
    return d > 0 ? d : 0;
  }
  function currentSize(){
    const sel = document.querySelector("#sizeAll");
    return (sel && sel.value) || giftSize;
  }

  document.body.classList.add("mb-gift");
  injectCss();

  // no "save your design" emails or Omnisend reminders for a prepaid gift:
  // stop the editor's add-to-cart event while we upload the design
  let submitting = false;
  window.addEventListener("memobrick:added", (e) => { if (submitting) e.stopImmediatePropagation(); }, true);

  /* banner */
  const banner = document.createElement("div");
  banner.className = "mbg-banner";
  document.body.insertBefore(banner, document.body.firstChild);
  function drawBanner(){
    if (!linkOk){
      banner.innerHTML = `<span>This personalisation link looks incomplete. Please open the full link from the order email, or contact us${CFG.storeEmail ? " at " + esc(CFG.storeEmail) : ""}.</span>`;
      return;
    }
    const refs = kits.map((k) => esc(k.ref)).join(" + ");
    const what = kits.length === 1
      ? `${esc(sizeText(giftSize))} kit, already paid`
      : `${kits.length} gift kits, ${esc(money(credit()))} gift credit`;
    banner.innerHTML = `<span>Personalising gift kit <b>${refs}</b>: ${what}. Design it, then tap “${LABEL}”.</span>` +
      (kits.length < 6 ? `<button type="button" data-mbg-add>I have another gift link</button>` : "");
    const b = banner.querySelector("[data-mbg-add]");
    if (b) b.addEventListener("click", addKitDialog);
  }
  drawBanner();

  /* used on this device? */
  const used = readJSON("local", USED, {});
  const usedHere = linkOk && used[firstRef];
  if (usedHere){
    const card = el(`
      <div class="mbg-back mbg-used" role="dialog" aria-modal="true" aria-labelledby="mbgU">
        <div class="mbg-card">
          <h3 id="mbgU">This gift link has been used</h3>
          <p>A design for gift kit ${esc(firstRef)} was sent from this device on ${esc(new Date(usedHere.at).toLocaleDateString())}.
             We'll email a design proof to approve. To change something, just reply to that email.</p>
          <p class="mbg-small">Sending a new design replaces the one you sent before.</p>
          <div class="mbg-actions">
            <a class="btn btn-ghost" href="/">Back to MemoBrick</a>
            <button type="button" class="btn btn-red" data-x>Send a new design</button>
          </div>
        </div>
      </div>`);
    document.body.appendChild(card);
    card.querySelector("[data-x]").addEventListener("click", () => card.remove());
  }

  /* add another gift link */
  function parseKit(text, email){
    text = String(text || "").trim();
    let ref = "", em = String(email || "").trim();
    try {
      if (/^https?:\/\//i.test(text) || text.indexOf("gift=") >= 0){
        const u = new URL(text, location.origin);
        ref = normRef(u.searchParams.get("gift") || "");
        em = em || (u.searchParams.get("email") || "").trim();
      } else ref = normRef(text);
    } catch (e){ ref = normRef(text); }
    return { ref: ref.slice(0, 20), email: em.slice(0, 120) };
  }
  function addKitDialog(){
    const back = el(`
      <div class="mbg-back" role="dialog" aria-modal="true" aria-labelledby="mbgA">
        <form class="mbg-card" novalidate>
          <h3 id="mbgA">Add another gift kit</h3>
          <p>Combine gift kits into one bigger mosaic. Paste the other personalisation link, or type its order number and the email it was bought with.</p>
          <label for="mbgLink">Personalisation link or order number</label>
          <input id="mbgLink" placeholder="https://mymemobrick.com/pages/editor?gift=... or #20002" autocomplete="off">
          <label for="mbgLinkEmail">Buyer's email (only if you typed an order number)</label>
          <input id="mbgLinkEmail" type="email" autocomplete="off">
          <div class="mbg-err" aria-live="polite"></div>
          <div class="mbg-actions">
            <button type="button" class="btn btn-ghost" data-x>Cancel</button>
            <button type="submit" class="btn btn-red">Add gift kit</button>
          </div>
        </form>
      </div>`);
    document.body.appendChild(back);
    const err = back.querySelector(".mbg-err");
    back.querySelector("#mbgLink").focus();
    back.querySelector("[data-x]").addEventListener("click", () => back.remove());
    back.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const k = parseKit(back.querySelector("#mbgLink").value, back.querySelector("#mbgLinkEmail").value);
      if (!REF_RE.test(k.ref)){ err.textContent = "Please paste the full link, or an order number like #20002."; return; }
      if (!EMAIL_RE.test(k.email)){ err.textContent = "Please add the email the kit was bought with."; return; }
      if (kits.some((x) => x.ref === k.ref)){ err.textContent = "That gift kit is already added."; return; }
      kits.push(k);
      writeJSON("session", EXTRA, kits.slice(1));
      back.remove();
      drawBanner(); relabel();
    });
  }

  /* labels: finish buttons, size prices, credit line */
  function relabel(){
    ["#orderBtn", "#bbCta", "#edTopFinish", "#mobFinish"].forEach((s) => {
      const b = document.querySelector(s);
      if (b && !b.getAttribute("aria-disabled") && b.textContent.trim() !== LABEL) b.textContent = LABEL;
    });
    document.querySelectorAll("#sizeGrid .sizebtn").forEach((b) => {
      const sm = b.querySelector("small"); if (!sm) return;
      const d = diffFor(b.dataset.id), t = d > 0 ? "+" + money(d) : "Included";
      if (sm.textContent !== t) sm.textContent = t;
    });
    document.querySelectorAll(".mob-size").forEach((b) => {
      const em = b.querySelector("em"); if (!em) return;
      const d = diffFor(b.dataset.size), t = d > 0 ? "+" + money(d) : "Included";
      if (em.textContent !== t) em.textContent = t;
    });
    const d = diffFor(currentSize());
    const msg = d > 0
      ? `Bigger than your gift covers: ${money(d)} difference, paid later by a secure link`
      : "Included in your gift. Nothing to pay";
    const ob = document.querySelector("#orderBtn");
    if (ob){
      let c = document.querySelector("#mbgCredit");
      if (!c){ c = document.createElement("p"); c.id = "mbgCredit"; c.className = "mbg-credit"; ob.parentNode.insertBefore(c, ob); }
      if (c.textContent !== msg) c.textContent = msg;
    }
    [["#mobTopPrice", "mbgMobCredit"], ["#edTopPrice", "mbgEdCredit"]].forEach(([sel, id]) => {
      const top = document.querySelector(sel);
      if (!top || !top.parentNode) return;
      let c = document.getElementById(id);
      if (!c){ c = document.createElement("span"); c.id = id; c.style.cssText = "font-weight:600;font-size:13px"; top.parentNode.insertBefore(c, top); }
      const t = d > 0 ? "+" + money(d) : "Included";
      if (c.textContent !== t) c.textContent = t;
    });
    // "add another gift link" right under the size choices (the top banner scrolls away on phones)
    if (linkOk && kits.length < 6){
      document.querySelectorAll("#sizeGrid, .mob-sizes").forEach((g) => {
        const nx = g.nextElementSibling;
        if (nx && nx.classList.contains("mbg-addlink")) return;
        const b = document.createElement("button");
        b.type = "button"; b.className = "mbg-addlink";
        b.textContent = "Have another gift link? Add it to unlock bigger sizes";
        b.addEventListener("click", addKitDialog);
        g.parentNode.insertBefore(b, g.nextSibling);
      });
    } else document.querySelectorAll(".mbg-addlink").forEach((b) => b.remove());
  }
  relabel(); setInterval(relabel, 700);

  // open at the kit's size (the recipient may still choose another one)
  function setSize(id){
    const sel = document.querySelector("#sizeAll");
    if (sel && sel.value !== id && sel.querySelector('option[value="' + id + '"]')){
      sel.value = id; sel.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (!params.get("keep")) setTimeout(() => setSize(giftSize), 400);

  /* the details form */
  function askDetails(sizeId, diff){
    return new Promise((resolve, reject) => {
      const multi = kits.length > 1;
      const back = el(`
        <div class="mbg-back" role="dialog" aria-modal="true" aria-labelledby="mbgT">
          <form class="mbg-card" novalidate>
            <h3 id="mbgT">Where should we ship it?</h3>
            <p>Your ${esc(sizeText(sizeId))} design is ready. Tell us who it's for and where to send it.${diff > 0 ? "" : " There's nothing to pay."}</p>
            ${diff > 0 ? `<div class="mbg-note">This size is bigger than your gift ${multi ? "kits cover" : "kit covers"}. The difference is <b>${esc(money(diff))}</b>.
              We'll email you a secure payment link for it before we make anything. Prefer no extra cost? Tap “Keep editing” and choose a size marked “Included”.</div>
              <label class="mbg-check"><input type="checkbox" id="mbgDiffOk"> I'd like this size and will pay the ${esc(money(diff))} difference by the payment link.</label>` : ""}
            <label for="mbgName">Recipient's full name</label>
            <input id="mbgName" autocomplete="name" required>
            <label for="mbgEmail">Your email (we send the design proof here)</label>
            <input id="mbgEmail" type="email" autocomplete="email" required>
            <label for="mbgA1">Street address</label>
            <input id="mbgA1" autocomplete="address-line1" required>
            <label for="mbgA2">Apartment, suite, etc. <span style="font-weight:400">(optional)</span></label>
            <input id="mbgA2" autocomplete="address-line2">
            <div class="mbg-row">
              <div><label for="mbgCity">City</label><input id="mbgCity" autocomplete="address-level2" required></div>
              <div><label for="mbgState">State</label><input id="mbgState" autocomplete="address-level1"></div>
            </div>
            <div class="mbg-row">
              <div><label for="mbgZip">ZIP code</label><input id="mbgZip" autocomplete="postal-code" required></div>
              <div><label for="mbgCountry">Country</label><input id="mbgCountry" autocomplete="country-name" value="United States" required></div>
            </div>
            <label for="mbgPhone">Phone <span style="font-weight:400">(optional, for the delivery)</span></label>
            <input id="mbgPhone" type="tel" autocomplete="tel">
            <label for="mbgNote">Anything we should know? <span style="font-weight:400">(optional)</span></label>
            <textarea id="mbgNote"></textarea>
            <div class="mbg-err" aria-live="polite"></div>
            <div class="mbg-actions">
              <button type="button" class="btn btn-ghost" data-x>Keep editing</button>
              <button type="submit" class="btn btn-red">Send my design</button>
            </div>
          </form>
        </div>`);
      document.body.appendChild(back);
      const f = back.querySelector("form"), err = back.querySelector(".mbg-err");
      back.querySelector("[data-x]").addEventListener("click", () => { back.remove(); reject(new Error("gift-cancelled")); });
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = (id) => { const i = back.querySelector(id); return i ? i.value.trim() : ""; };
        const d = { name: v("#mbgName"), email: v("#mbgEmail"), a1: v("#mbgA1"), a2: v("#mbgA2"), city: v("#mbgCity"),
          state: v("#mbgState"), zip: v("#mbgZip"), country: v("#mbgCountry"), phone: v("#mbgPhone"), note: v("#mbgNote") };
        if (!d.name || !EMAIL_RE.test(d.email) || !d.a1 || !d.city || !d.zip || !d.country){
          err.textContent = "Please fill in the name, a valid email and the full shipping address."; return;
        }
        if (diff > 0 && !back.querySelector("#mbgDiffOk").checked){
          err.textContent = "Please tick the box to choose the bigger size, or keep editing to pick an included size."; return;
        }
        back.remove(); resolve(d);
      });
    });
  }

  /* building what the store receives */
  function shipTo(d){
    return [d.name, d.a1, d.a2, [d.city, d.state, d.zip].filter(Boolean).join(", "), d.country, d.phone ? "Phone: " + d.phone : ""]
      .filter(Boolean).join("\n");
  }
  function summary(d, sizeId, diff, props, designId){
    const lines = Object.keys(props || {})
      .filter((k) => typeof props[k] === "string" && props[k].length < 2000 && k !== "Final Design" && k !== "_Build Instructions")
      .map((k) => k + ": " + props[k]);
    return [
      "GIFT KIT PERSONALISATION (no checkout). Prepaid gift kit order(s): " + kits.map((k) => k.ref + " (bought with " + k.email + ")").join(", "),
      "Size chosen: " + sizeText(sizeId) + (kits.length > 1 ? " (combining " + kits.length + " kits, " + money(credit()) + " gift credit)" : ""),
      diff > 0 ? "DIFFERENCE TO INVOICE: " + money(diff) + " (recipient agreed to pay it by a payment link before production)" : "Difference to pay: none",
      "",
      "Ship to:\n" + shipTo(d),
      "Recipient email (for the design proof): " + d.email,
      d.note ? "\nNote from recipient: " + d.note : "",
      "",
      "Final design image: " + (props["Final Design"] || "(not attached, see Design ID below)"),
      "Build instructions: " + (props["_Build Instructions"] || "(not attached)"),
      "Design ID: " + (designId || ""),
      "",
      "Before production: check each order number in Shopify admin, that the buyer email matches, that it is an Art Gift Kit order and that it was not redeemed before. Then reply to this email with the design proof.",
      "",
      "Design settings:", lines.join("\n")
    ].join("\n");
  }
  function contactFields(d, sizeId, diff, props, designId){
    return {
      "form_type": "contact",
      "utf8": "✓",
      "contact[name]": d.name,
      "contact[email]": d.email,
      "contact[Gift kit order]": kits.map((k) => k.ref).join(", "),
      "contact[Buyer email from link]": kits.map((k) => k.email).join(", "),
      "contact[Size chosen]": sizeText(sizeId),
      "contact[Difference to pay]": diff > 0 ? money(diff) : "none",
      "contact[Ship to]": shipTo(d),
      "contact[Final design image]": props["Final Design"] || "(not attached)",
      "contact[Build instructions]": props["_Build Instructions"] || "(not attached)",
      "contact[Design ID]": designId || "",
      "contact[body]": summary(d, sizeId, diff, props, designId)
    };
  }
  function mailto(d, sizeId, diff, props, designId){
    if (!CFG.storeEmail) return "";
    const subject = "Gift kit design " + kits.map((k) => k.ref).join(" + ");
    let body = summary(d, sizeId, diff, props, designId);
    if (body.length > 1500) body = body.slice(0, 1500) + "\n...";
    return "mailto:" + CFG.storeEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  // second, best-effort copy to the owner's design-capture sheet (if set up)
  function backupCopy(d, sizeId, diff, props, designId){
    const cap = window.MB_CAPTURE;
    if (!cap || !cap.url) return;
    try {
      fetch(cap.url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, keepalive: true,
        body: JSON.stringify({ key: cap.key || "", sid: "GIFT-" + (designId || Date.now()), page: location.pathname, email: d.email,
          device: window.innerWidth < 768 ? "Mobile" : "Desktop", kind: "note",
          source: "GIFT KIT " + kits.map((k) => k.ref).join(" + ") + " submitted | " + d.name + " | " + d.email + " | " + sizeText(sizeId) +
            (diff > 0 ? " | difference " + money(diff) : "") + " | " + (props["Final Design"] || designId || "") }) }).catch(() => {});
    } catch (e){}
  }

  async function sendToStore(fields, info){
    const fd = new FormData();
    Object.keys(fields).forEach((k) => fd.append(k, fields[k]));
    try {
      const res = await fetch("/contact", { method: "POST", body: fd, credentials: "same-origin" });
      // Shopify redirects a delivered message to ...?contact_posted=true. Trust that URL even when the
      // page it lands on fails to load (status not ok), so the store never gets the design twice.
      if (/[?&]contact_posted=true/.test(res.url)) return true;
      if (res.ok && res.redirected && !/challenge/.test(res.url)) return true;
    } catch (e){}
    // Shopify asked for a spam check (or the request failed): submit the form
    // for real so the recipient can pass the check; Shopify brings them back
    writeJSON("session", PENDING, info);
    const form = document.createElement("form");
    form.method = "post"; form.action = "/contact"; form.style.display = "none";
    fields.return_to = "/pages/editor?gift_sent=1";
    Object.keys(fields).forEach((k) => {
      const i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = fields[k]; form.appendChild(i);
    });
    document.body.appendChild(form);
    form.submit();
    return new Promise(() => {});   // the page is navigating away
  }

  // replaces "add to cart": upload the files exactly like an order would,
  // take the line straight back out of the cart, and send the store the links
  window.MB_addToCart = async function (opts){
    if (!linkOk) throw new Error("gift-link");
    const o = Object.assign({}, opts || {});
    const sizeId = o.sizeId || currentSize();
    const diff = diffFor(sizeId);
    const details = await askDetails(sizeId, diff);
    o.buildForMe = false;
    if (o.state) o.state = Object.assign({}, o.state, { build: false });
    submitting = true;
    let added;
    try { added = await origAdd(o); } finally { submitting = false; }
    const line = added && added.line;
    if (line && line.key){
      try {
        await fetch("/cart/change.js", { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: line.key, quantity: 0 }) });
      } catch (e){}
    }
    const props = Object.assign({}, line && line.properties);
    Object.keys(props).forEach((k) => {
      if (typeof props[k] === "string" && props[k].indexOf("//") === 0) props[k] = "https:" + props[k];
    });
    const designId = (added && added.designId) || props["Design ID"] || "";
    const info = { refs: kits.map((k) => k.ref), name: details.name, email: details.email, diff: diff, designId: designId,
      mailto: mailto(details, sizeId, diff, props, designId) };
    backupCopy(details, sizeId, diff, props, designId);
    const u = readJSON("local", USED, {});
    kits.forEach((k) => { u[k.ref] = { at: Date.now(), designId: designId }; });
    writeJSON("local", USED, u);
    await sendToStore(contactFields(details, sizeId, diff, props, designId), info);
    window.__mbgLastInfo = info;
    return added;
  };

  window.MB_cartMessage = function (err){
    const k = (err && err.message) || "";
    if (k === "gift-cancelled") return "No problem, your design is still here.";
    if (k === "gift-link") return "This personalisation link looks incomplete. Please open the full link from the order email.";
    return origMsg ? origMsg(err) : "Something went wrong. Please try again.";
  };

  // after a successful submit the editor would open the cart drawer:
  // show the confirmation instead
  window.MB_openCartDrawer = () => showDone(window.__mbgLastInfo || { refs: kits.map((k) => k.ref) });
})();
