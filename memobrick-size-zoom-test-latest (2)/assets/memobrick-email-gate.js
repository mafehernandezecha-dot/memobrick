/* =====================================================================
   MemoBrick — "Save your design" email capture

   1st ask  — right after the customer uploads their photo (popup).
   2nd ask  — only if they tapped "Skip", and only at a calm moment:
              • a small slide-in card (no dark backdrop, never blocks the
                editor) once they have been designing for a while AND have
                paused for a few seconds — never in the middle of a drag;
              • or, on desktop, when the mouse heads for the tab bar /
                close button (they are leaving anyway, so asking can't
                push them out).
              Whichever comes first. Never more than 2 asks per visit.
              If they dismiss the 2nd ask too, we stay quiet for a few days.

   The email is saved as a Shopify customer (tagged), which Omnisend
   syncs automatically, so every email ends up in one list.

   Stand-alone on purpose: it only READS the editor. It never changes the
   editor's state, never blocks upload or add-to-cart, and every ask can
   be dismissed. If anything fails, the tool keeps working as before.

   Configured from Theme settings → "Save-your-design email"
   (window.MB_EMAIL_GATE).
===================================================================== */
(() => {
  "use strict";
  const CFG = window.MB_EMAIL_GATE || {};
  if (!CFG.enabled) return;

  const KEY_EMAIL = "mb_email";
  const KEY_SKIP = "mb_email_skipped_at";
  const SKIP_DAYS = Number(CFG.skipDays) || 3;
  const FIRST_DELAY_MS = Math.max(300, (Number(CFG.delay) || 0) * 1000);
  const SECOND_AFTER_MS = Math.max(20, Number(CFG.secondAfter) || 75) * 1000; // designing time after skip
  const IDLE_MS = 4000;             // customer paused this long → calm moment
  const $ = (s) => document.querySelector(s);

  const store = {
    get(k){ try { return localStorage.getItem(k); } catch (e){ return null; } },
    set(k, v){ try { localStorage.setItem(k, v); } catch (e){} }
  };

  // Logged-in customers are already known — remember them and never ask.
  if (CFG.customerEmail){ store.set(KEY_EMAIL, CFG.customerEmail); return; }
  if (store.get(KEY_EMAIL)) return;
  const skippedBefore = Number(store.get(KEY_SKIP) || 0);
  if (skippedBefore && Date.now() - skippedBefore < SKIP_DAYS * 864e5) return;

  let asks = 0;            // how many times we've asked on this visit
  let open = false;        // something of ours is on screen
  let skippedAt = 0;       // when they skipped the 1st ask (this visit)
  let lastActive = Date.now(), activeSinceSkip = 0;
  const known = () => !!store.get(KEY_EMAIL);
  // skipped the 1st ask earlier in this visit, then reloaded? carry on from there
  try {
    const s1 = Number(sessionStorage.getItem("mb_email_skip1") || 0);
    if (s1){ asks = 1; skippedAt = s1; }
  } catch (e){}

  /* ---------- helpers ---------- */
  function inEditor(){
    const view = $("#view-editor"), chip = $("#chipSrc");
    return !!(view && !view.hidden && chip && chip.textContent.trim().indexOf("Your photo") === 0);
  }
  // don't appear on top of the cropper, tour, wall view, tips, cart drawer…
  function somethingElseOpen(){
    const sel = ".cropper, .tipsmodal, .wallview, .instructions, .mb-tour-overlay, [aria-modal='true']";
    return Array.prototype.some.call(document.querySelectorAll(sel), (el) => {
      if (el.hidden || el.closest(".mbeg-back, .mbeg-slide")) return false;
      const cs = getComputedStyle(el);
      return cs.display !== "none" && cs.visibility !== "hidden";
    });
  }
  function esc(s){ return String(s || "").replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }

  /* ---------- 1st ask: right after upload ---------- */
  // The theme first asks how they want to design it (#designChoice): wait
  // for that answer, and only ask for the email if they design it
  // themselves. Choosing our artist goes straight on to checkout.
  function choiceOpen(){ const d = $("#designChoice"); return !!(d && !d.hidden); }
  document.addEventListener("memobrick:photo", () => {
    if (asks > 0 || known()) return;
    asks = 1;
    setTimeout(function tryAsk(){
      if (choiceOpen()){
        document.addEventListener("memobrick:designchoice", (e) => {
          if (e.detail && e.detail.choice === "artist"){ asks = 0; return; }
          setTimeout(() => showModal(1), 700);
        }, { once: true });
        return;
      }
      showModal(1);
    }, FIRST_DELAY_MS);
  });

  /* ---------- 2nd ask: a calm moment, or leaving (desktop) ---------- */
  ["pointerdown", "pointermove", "keydown", "wheel", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, () => {
      lastActive = Date.now();
      if (skippedAt && !activeSinceSkip) activeSinceSkip = lastActive;
    }, { passive: true, capture: true }));

  function secondAskAllowed(){
    return skippedAt && asks === 1 && !open && !known() && !document.hidden &&
           inEditor() && !somethingElseOpen();
  }

  setInterval(() => {
    if (!secondAskAllowed()) return;
    const now = Date.now();
    // they must have actually kept designing after skipping…
    if (!activeSinceSkip || now - skippedAt < SECOND_AFTER_MS) return;
    // …and be paused right now (not mid-drag / mid-slider)
    if (now - lastActive < IDLE_MS) return;
    asks = 2; showSlide();
  }, 1000);

  // desktop exit intent: mouse leaves through the top of the window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget || e.clientY > 10) return;
    if (!secondAskAllowed()) return;
    if (Date.now() - skippedAt < 15000) return;       // not right after they said no
    asks = 2; showModal(2);
  });

  /* ---------- styles ---------- */
  const css = `
  .mbeg-back{position:fixed;inset:0;z-index:9500;background:rgba(21,23,27,.45);display:flex;
    align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .2s ease}
  .mbeg-back.is-open{opacity:1}
  .mbeg{position:relative;width:100%;max-width:420px;background:var(--card,#fff);color:var(--ink,#1D1F24);
    border-radius:var(--r,20px);padding:28px 24px 20px;box-shadow:0 24px 60px -20px rgba(0,0,0,.45);
    font-family:var(--body,Inter,system-ui,sans-serif);transform:translateY(12px);transition:transform .25s ease}
  .mbeg-back.is-open .mbeg{transform:none}
  .mbeg-studs{display:flex;gap:6px;margin-bottom:14px}
  .mbeg-studs i{width:14px;height:14px;border-radius:50%;display:block}
  .mbeg h2{font-family:var(--display,Fredoka,system-ui,sans-serif);font-size:26px;line-height:1.15;margin:0 0 8px;font-weight:600}
  .mbeg p{margin:0 0 16px;color:var(--ink-2,#5E636C);font-size:15px;line-height:1.5}
  .mbeg form{display:flex;flex-direction:column;gap:10px}
  .mbeg input[type=email],.mbeg-slide input[type=email]{font:inherit;font-size:16px;padding:13px 14px;border-radius:12px;
    border:1.5px solid var(--line,rgba(29,31,36,.2));background:#fff;color:inherit;width:100%;min-width:0}
  .mbeg input[type=email]:focus,.mbeg-slide input[type=email]:focus{outline:none;border-color:var(--azur,#0F9BD7);
    box-shadow:0 0 0 3px rgba(15,155,215,.18)}
  .mbeg-go{font:inherit;font-weight:700;font-size:16px;padding:14px;border:0;border-radius:12px;cursor:pointer;
    background:var(--red,#E2382B);color:#fff;white-space:nowrap}
  .mbeg-go[disabled]{opacity:.6;cursor:default}
  .mbeg-skip{background:none;border:0;font:inherit;font-size:14px;color:var(--ink-3,#93979F);cursor:pointer;
    padding:6px;text-decoration:underline;align-self:center}
  .mbeg-x{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;background:none;
    font-size:24px;line-height:1;color:var(--ink-3,#93979F);cursor:pointer;border-radius:50%}
  .mbeg-fine{font-size:12px!important;color:var(--ink-3,#93979F)!important;margin:4px 0 0!important;text-align:center}
  .mbeg-err{color:var(--red,#E2382B);font-size:13px;min-height:1em;margin:0}

  /* 2nd ask: small card, no backdrop — the editor stays fully usable */
  .mbeg-slide{position:fixed;right:20px;bottom:96px;z-index:9400;width:min(360px,calc(100vw - 24px));
    background:var(--card,#fff);color:var(--ink,#1D1F24);border-radius:16px;padding:16px 16px 14px;
    box-shadow:0 18px 44px -14px rgba(0,0,0,.4);border:1px solid var(--line-soft,rgba(29,31,36,.08));
    font-family:var(--body,Inter,system-ui,sans-serif);transform:translateY(20px);opacity:0;
    transition:transform .3s cubic-bezier(.2,.9,.3,1),opacity .25s ease}
  .mbeg-slide.is-open{transform:none;opacity:1}
  .mbeg-slide b{display:block;font-family:var(--display,Fredoka,system-ui,sans-serif);font-size:18px;
    font-weight:600;margin:0 30px 4px 0;line-height:1.2}
  .mbeg-slide p{margin:0 0 10px;font-size:14px;color:var(--ink-2,#5E636C);line-height:1.4}
  .mbeg-slide form{display:flex;gap:8px}
  .mbeg-slide input[type=email]{padding:11px 12px;font-size:16px}
  .mbeg-slide .mbeg-go{padding:11px 14px;font-size:15px}
  .mbeg-slide .mbeg-x{top:6px;right:6px}
  .mbeg-slide .mbeg-err{margin-top:6px}
  @media (max-width:600px){
    .mbeg-back{align-items:flex-end;padding:0}
    .mbeg{max-width:none;border-radius:var(--r,20px) var(--r,20px) 0 0;
      padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))}
    /* phones: sit at the top, clear of the bottom toolbar and Finish button */
    .mbeg-slide{left:12px;right:12px;width:auto;bottom:auto;top:calc(12px + env(safe-area-inset-top,0px));
      transform:translateY(-20px)}
  }`;
  let styleEl = null;
  function ensureStyle(){
    if (styleEl) return;
    styleEl = document.createElement("style"); styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /* ---------- shared submit ---------- */
  function wire(root, form, input, err, go, onDone){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){
        err.textContent = "Please enter a valid email address."; input.focus(); return;
      }
      err.textContent = ""; go.disabled = true; go.textContent = "Saving…";
      save(email).finally(() => {
        store.set(KEY_EMAIL, email);
        document.dispatchEvent(new CustomEvent("memobrick:email", { detail: { email } }));
        onDone();
      });
    });
  }

  /* ---------- popup (1st ask, and desktop exit intent) ---------- */
  function showModal(n){
    if (known() || open) return;
    ensureStyle(); open = true;
    const exit = n === 2;
    const back = document.createElement("div");
    back.className = "mbeg-back";
    back.innerHTML =
      '<div class="mbeg" role="dialog" aria-modal="true" aria-labelledby="mbegTitle">' +
        '<button type="button" class="mbeg-x" aria-label="Close">&times;</button>' +
        '<div class="mbeg-studs" aria-hidden="true"><i style="background:var(--b-red,#E2382B)"></i>' +
          '<i style="background:var(--b-yellow,#FFC72C)"></i><i style="background:var(--b-blue,#0F9BD7)"></i>' +
          '<i style="background:var(--b-green,#34A853)"></i></div>' +
        '<h2 id="mbegTitle">' + esc(exit ? (CFG.exitHeading || "Leaving already? Keep your design 💾")
                                         : (CFG.heading || "Great photo! Let’s save your design 🎨")) + '</h2>' +
        '<p>' + esc(exit ? (CFG.exitText || "Enter your email and your mosaic will be waiting for you when you come back.")
                         : (CFG.text || "Enter your email before you start, so your design is saved and you can come back and finish it anytime.")) + '</p>' +
        '<form novalidate>' +
          '<input type="email" name="email" placeholder="you@email.com" autocomplete="email" inputmode="email" required aria-label="Email address">' +
          '<p class="mbeg-err" role="alert"></p>' +
          '<button type="submit" class="mbeg-go">' + esc(exit ? (CFG.secondButton || "Save my design") : (CFG.button || "Start designing")) + '</button>' +
          '<button type="button" class="mbeg-skip">' + esc(exit ? "No thanks" : (CFG.skip || "Skip for now")) + '</button>' +
          '<p class="mbeg-fine">' + esc(CFG.fine || "We'll also send design tips and offers. Unsubscribe anytime.") + '</p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(back);
    requestAnimationFrame(() => back.classList.add("is-open"));

    const input = back.querySelector("input"), err = back.querySelector(".mbeg-err"),
          go = back.querySelector(".mbeg-go"), form = back.querySelector("form");
    const lastFocus = document.activeElement;
    setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e){} }, 250);

    function close(dismissed){
      open = false;
      if (dismissed) onDismiss(n);
      back.classList.remove("is-open");
      document.removeEventListener("keydown", onKey, true);
      setTimeout(() => { back.remove(); try { lastFocus && lastFocus.focus(); } catch (e){} }, 220);
    }
    function onKey(e){ if (e.key === "Escape"){ e.stopPropagation(); close(true); } }
    document.addEventListener("keydown", onKey, true);
    back.querySelector(".mbeg-x").addEventListener("click", () => close(true));
    back.querySelector(".mbeg-skip").addEventListener("click", () => close(true));
    back.addEventListener("click", (e) => { if (e.target === back) close(true); });

    wire(back, form, input, err, go, () => {
      const box = back.querySelector(".mbeg");
      box.querySelector("h2").textContent = CFG.thanksHeading || "Saved! ✅";
      box.querySelector("p").textContent = CFG.thanksText || "Now have fun creating your mosaic!";
      form.remove();
      setTimeout(() => close(false), 1800);
    });
  }

  /* ---------- slide-in card (2nd ask, calm moment) ---------- */
  function showSlide(){
    if (known() || open) return;
    ensureStyle(); open = true;
    const card = document.createElement("div");
    card.className = "mbeg-slide";
    card.setAttribute("role", "region");
    card.setAttribute("aria-label", "Save your design");
    card.innerHTML =
      '<button type="button" class="mbeg-x" aria-label="Close">&times;</button>' +
      '<b>' + esc(CFG.secondHeading || "Looking great! Save your progress?") + '</b>' +
      '<p>' + esc(CFG.secondText || "Add your email so your design is kept safe. You can keep designing.") + '</p>' +
      '<form novalidate>' +
        '<input type="email" name="email" placeholder="you@email.com" autocomplete="email" inputmode="email" required aria-label="Email address">' +
        '<button type="submit" class="mbeg-go">' + esc(CFG.secondButton || "Save my design") + '</button>' +
      '</form>' +
      '<p class="mbeg-err" role="alert"></p>';
    document.body.appendChild(card);
    requestAnimationFrame(() => card.classList.add("is-open"));
    // note: no auto-focus — on phones that would pop the keyboard over the design

    const input = card.querySelector("input"), err = card.querySelector(".mbeg-err"),
          go = card.querySelector(".mbeg-go"), form = card.querySelector("form");
    function close(dismissed){
      open = false;
      if (dismissed) onDismiss(2);
      card.classList.remove("is-open");
      setTimeout(() => card.remove(), 300);
    }
    card.querySelector(".mbeg-x").addEventListener("click", () => close(true));
    // if they ignore it and keep designing, tuck it away quietly after 25s
    let touched = false;
    card.addEventListener("focusin", () => { touched = true; });
    setTimeout(() => { if (!touched && card.isConnected && !known()) close(true); }, 25000);

    wire(card, form, input, err, go, () => {
      card.querySelector("b").textContent = CFG.thanksHeading || "Saved! ✅";
      card.querySelector("p").textContent = "Your design is safe. Keep going!";
      form.remove(); err.remove();
      setTimeout(() => close(false), 2200);
    });
  }

  function onDismiss(n){
    if (n === 1){
      skippedAt = Date.now(); activeSinceSkip = 0;
      try { sessionStorage.setItem("mb_email_skip1", String(skippedAt)); } catch (e){}
    }
    else store.set(KEY_SKIP, String(Date.now()));   // 2nd no → quiet for a few days
  }

  /* ---------- saving the email ---------- */
  function save(email){
    // 1) Omnisend: link this browser (cart, viewed products) to the email.
    try {
      if (window.omnisend && typeof window.omnisend.identifyContact === "function")
        window.omnisend.identifyContact({ email: email });
    } catch (e){}

    // 2) Shopify customer (newsletter-style form). Omnisend syncs these.
    const body = new URLSearchParams();
    body.set("form_type", "customer");
    body.set("utf8", "✓");
    body.set("contact[email]", email);
    body.set("contact[tags]", CFG.tags || "newsletter,started-design");
    return fetch((CFG.root || "/") + "contact", {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    }).then((r) => {
      if (r.url && r.url.indexOf("/challenge") !== -1 && window.console)
        console.warn("[MemoBrick] Shopify asked for a captcha — customer not created.");
    }).catch(() => {});
  }
})();
