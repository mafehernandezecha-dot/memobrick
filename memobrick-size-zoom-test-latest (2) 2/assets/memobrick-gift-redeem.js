/* =====================================================================
   MemoBrick — personalise a prepaid Art Gift Kit (no checkout)
   The order confirmation email for "Art Gift Kit — Buy Now, Personalise
   Later" links to:

     /pages/editor?size=20x20&gift=%2321048&email=buyer@example.com

   With ?gift= in the URL the Creator runs in gift mode:
     - prices are hidden and the size is locked to the kit's size
     - the finish buttons read "Submit my design" instead of ordering
     - on submit we ask where to ship it, store the finished design and
       build instructions (same files a normal order carries), then email
       everything to the store through Shopify's contact form
   Nothing is left in the cart and the customer never sees checkout.

   Stand-alone: it only wraps window.MB_addToCart / MB_openCartDrawer /
   MB_cartMessage from memobrick.js. Without ?gift= it does nothing.
===================================================================== */
(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  const order = (params.get("gift") || "").trim().slice(0, 40);
  const PENDING = "mb_gift_pending";
  const giftSize = (params.get("size") || "20x20").trim().replace(/[^0-9x]/g, "") || "20x20";

  function el(html){ const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

  function showDone(doneOrder){
    doneOrder = doneOrder || order;
    if (document.querySelector(".mbg-done")) return;
    const back = el(`
      <div class="mbg-back mbg-done" role="dialog" aria-modal="true" aria-labelledby="mbgD">
        <div class="mbg-card" style="text-align:center">
          <div style="font-size:44px;line-height:1">🎁</div>
          <h3 id="mbgD">Your design is in!</h3>
          <p>We've received your MemoBrick design for gift kit ${esc(doneOrder)}. Our team checks every design and
             will email you before it ships — usually within 2–4 business days.</p>
          <a class="btn btn-red" href="/">Back to MemoBrick</a>
        </div>
      </div>`);
    document.body.appendChild(back);
  }

  // back from Shopify's contact form (directly, or after its spam check):
  // Shopify may drop our query string, so remember the order in sessionStorage
  if (params.get("contact_posted") === "true" || params.get("gift_sent")){
    let pending = "";
    try { pending = sessionStorage.getItem(PENDING) || ""; sessionStorage.removeItem(PENDING); } catch (e){}
    if (pending){
      const show = () => { injectCss(); showDone(pending); };
      if (document.body) show(); else document.addEventListener("DOMContentLoaded", show);
      return;
    }
  }
  if (!order) return;
  const buyerEmail = (params.get("email") || "").trim().slice(0, 120);
  const LABEL = "Submit my design";

  const origAdd = window.MB_addToCart;
  const origMsg = window.MB_cartMessage;
  if (!origAdd) return;

  document.body.classList.add("mb-gift");
  injectCss();
  function injectCss(){
    if (document.querySelector("#mbg-css")) return;
    const css = document.createElement("style");
    css.id = "mbg-css";
    css.textContent = `
    .mb-gift #pcAmt,.mb-gift #pcWas,.mb-gift #pcSave,.mb-gift #bbPrice,
    .mb-gift #mobTopPrice,.mb-gift #mobTopWas,.mb-gift .sizebtn small,
    .mb-gift #mobNotice,.mb-gift .upsize{display:none!important}
    .mb-gift #sizeGrid .sizebtn:not([data-id="${giftSize}"]),
    .mb-gift #sizeCards .size:not([data-id="${giftSize}"]),
    .mb-gift .mob-size:not([data-size="${giftSize}"]),
    .mb-gift .mob-size-rec-pick{display:none!important}
    .mbg-banner{position:relative;z-index:50;background:var(--ink,#1d1d1f);color:#fff;text-align:center;
      font:600 14px/1.4 var(--body,system-ui);padding:10px 16px}
    .mbg-back{position:fixed;inset:0;z-index:2147483000;background:rgba(20,20,30,.55);display:flex;
      align-items:center;justify-content:center;padding:16px}
    .mbg-card{background:#fff;border-radius:20px;max-width:440px;width:100%;max-height:92vh;overflow:auto;
      padding:24px;font-family:var(--body,system-ui);color:var(--ink,#1d1d1f);box-shadow:0 20px 60px rgba(0,0,0,.25)}
    .mbg-card h3{font-family:var(--display,inherit);font-size:24px;letter-spacing:-.02em;margin:0 0 6px}
    .mbg-card p{color:var(--ink-2,#555);font-size:15px;line-height:1.5;margin:0 0 16px}
    .mbg-card label{display:block;font-size:13px;font-weight:600;margin:12px 0 4px}
    .mbg-card input,.mbg-card textarea{width:100%;box-sizing:border-box;border:1px solid #d8d8de;border-radius:12px;
      padding:11px 12px;font:16px var(--body,system-ui)}
    .mbg-card textarea{min-height:84px;resize:vertical}
    .mbg-actions{display:flex;gap:10px;margin-top:18px}
    .mbg-actions .btn{flex:1;justify-content:center}
    .mbg-err{color:var(--b-red,#c8324a);font-size:14px;margin-top:10px;min-height:1em}`;
    document.head.appendChild(css);
  }

  const banner = document.createElement("div");
  banner.className = "mbg-banner";
  banner.textContent = "🎁 Personalising gift kit " + order + " — " + giftSize.replace("x", " × ") +
    "\" already paid. Design it, then tap “" + LABEL + "”.";
  document.body.insertBefore(banner, document.body.firstChild);

  // the finish buttons get their label rewritten by the editor (e.g. after
  // each size change), so keep them saying the right thing
  const relabel = () => ["#orderBtn", "#bbCta", "#edTopFinish", "#mobFinish"].forEach((s) => {
    const b = document.querySelector(s);
    if (b && !b.getAttribute("aria-disabled") && b.textContent.trim() !== LABEL) b.textContent = LABEL;
  });
  relabel(); setInterval(relabel, 800);

  function lockSize(){
    const sel = document.querySelector("#sizeAll");
    if (sel && sel.value !== giftSize && sel.querySelector('option[value="' + giftSize + '"]')){
      sel.value = giftSize;
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    return false;
  }
  setTimeout(lockSize, 400);

  function askDetails(){
    return new Promise((resolve, reject) => {
      const back = el(`
        <div class="mbg-back" role="dialog" aria-modal="true" aria-labelledby="mbgT">
          <form class="mbg-card" novalidate>
            <h3 id="mbgT">Where should we ship it?</h3>
            <p>Your design is ready. Tell us who it's for and we'll build and ship the kit — nothing to pay.</p>
            <label for="mbgName">Recipient's full name</label>
            <input id="mbgName" autocomplete="name" required>
            <label for="mbgEmail">Email (for your proof and tracking)</label>
            <input id="mbgEmail" type="email" autocomplete="email" required>
            <label for="mbgAddr">Shipping address</label>
            <textarea id="mbgAddr" autocomplete="street-address" placeholder="Street, apartment, city, state, ZIP, country" required></textarea>
            <label for="mbgNote">Anything we should know? <span style="font-weight:400">(optional)</span></label>
            <input id="mbgNote">
            <div class="mbg-err" aria-live="polite"></div>
            <div class="mbg-actions">
              <button type="button" class="btn btn-ghost" data-x>Keep editing</button>
              <button type="submit" class="btn btn-red">Send my design</button>
            </div>
          </form>
        </div>`);
      document.body.appendChild(back);
      const f = back.querySelector("form"), err = back.querySelector(".mbg-err");
      back.querySelector("#mbgName").focus();
      const close = () => back.remove();
      back.querySelector("[data-x]").addEventListener("click", () => { close(); reject(new Error("gift-cancelled")); });
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = (id) => back.querySelector(id).value.trim();
        const d = { name: v("#mbgName"), email: v("#mbgEmail"), address: v("#mbgAddr"), note: v("#mbgNote") };
        if (!d.name || !d.address || !/^\S+@\S+\.\S+$/.test(d.email)){
          err.textContent = "Please fill in the name, a valid email and the shipping address.";
          return;
        }
        close(); resolve(d);
      });
    });
  }

  function contactFields(d, props){
    const lines = Object.keys(props || {})
      .filter((k) => typeof props[k] === "string" && props[k].length < 2000)
      .map((k) => k + ": " + props[k]);
    return {
      "form_type": "contact",
      "utf8": "✓",
      "contact[name]": d.name,
      "contact[email]": d.email,
      "contact[Gift kit order]": order,
      "contact[Buyer email]": buyerEmail,
      "contact[Kit size]": giftSize,
      "contact[Ship to]": d.address,
      "contact[Final design]": props["Final Design"] || "(not attached — rebuild from settings below)",
      "contact[Build instructions]": props["_Build Instructions"] || "",
      "contact[body]": "GIFT KIT PERSONALISATION — no payment due, order " + order + " is prepaid.\n\n" +
        (d.note ? "Note: " + d.note + "\n\n" : "") + "Design settings:\n" + lines.join("\n"),
    };
  }

  async function sendToStore(fields){
    const fd = new FormData();
    Object.keys(fields).forEach((k) => fd.append(k, fields[k]));
    try {
      const res = await fetch("/contact", { method: "POST", body: fd, credentials: "same-origin" });
      if (res.ok && /contact_posted=true/.test(res.url)) return true;
    } catch (e){}
    // Shopify asked for a spam check (or fetch failed): submit for real so
    // the customer can pass it; Shopify brings them back here afterwards
    try { sessionStorage.setItem(PENDING, order); } catch (e){}
    const form = document.createElement("form");
    form.method = "post"; form.action = "/contact"; form.style.display = "none";
    const ret = new URL(location.href); ret.searchParams.set("gift_sent", "1");
    fields.return_to = ret.pathname + ret.search;
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
    const o = opts || {};
    if (o.sizeId && o.sizeId !== giftSize){
      lockSize();
      throw new Error("gift-size");
    }
    const details = await askDetails();
    const added = await origAdd(o);
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
    await sendToStore(contactFields(details, props));
    return added;
  };

  window.MB_cartMessage = function (err){
    const k = (err && err.message) || "";
    if (k === "gift-cancelled") return "No problem — your design is still here.";
    if (k === "gift-size") return "Your gift kit is " + giftSize.replace("x", " × ") + "\" — we switched to that size. Check your design, then submit again.";
    return origMsg ? origMsg(err) : "Something went wrong. Please try again.";
  };

  // startCheckout opens the cart drawer after a successful add — show the
  // thank-you instead
  window.MB_openCartDrawer = () => showDone();

})();
