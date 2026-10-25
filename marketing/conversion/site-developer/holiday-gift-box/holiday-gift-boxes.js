/* MemoBrick holiday: gift boxes made of 1x1 bricks floating in the page background.
   They sit behind the content, drift at different speeds as the page scrolls
   (parallax), and stay at the page edges so they never cover text or buttons.
   Turned off for people who ask their device for reduced motion (boxes stay still).
   window.MB_GIFT_BOX_URLS = { red, green, blue, purple } gives the image urls. */
(function () {
  "use strict";
  var urls = window.MB_GIFT_BOX_URLS || {};
  if (!urls.red) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phone = window.innerWidth < 760;

  // side: l/r, top: % of the first screen, size: px, speed: parallax factor, tilt: degrees
  var boxes = phone ? [
    { c: "red", side: "r", top: 12, size: 54, speed: 0.35, tilt: 10 },
    { c: "green", side: "l", top: 60, size: 46, speed: 0.6, tilt: -8 },
    { c: "purple", side: "r", top: 120, size: 50, speed: 0.45, tilt: 6 },
    { c: "blue", side: "l", top: 180, size: 44, speed: 0.7, tilt: -12 }
  ] : [
    { c: "red", side: "l", top: 18, size: 110, speed: 0.35, tilt: -10 },
    { c: "green", side: "r", top: 70, size: 92, speed: 0.55, tilt: 9 },
    { c: "blue", side: "l", top: 120, size: 80, speed: 0.7, tilt: 7 },
    { c: "purple", side: "r", top: 165, size: 104, speed: 0.4, tilt: -6 },
    { c: "red", side: "r", top: 240, size: 76, speed: 0.65, tilt: 12 },
    { c: "green", side: "l", top: 290, size: 98, speed: 0.45, tilt: -9 }
  ];

  var css = document.createElement("style");
  css.textContent =
    ".mb-giftbg{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}" +
    ".mb-giftbg img{position:absolute;display:block;height:auto;will-change:transform;" +
    "filter:drop-shadow(0 10px 14px rgba(29,29,31,.16));opacity:.95}";
  document.head.appendChild(css);

  var layer = document.createElement("div");
  layer.className = "mb-giftbg";
  layer.setAttribute("aria-hidden", "true");
  var els = boxes.map(function (b) {
    var img = document.createElement("img");
    img.src = urls[b.c]; img.alt = ""; img.width = b.size; img.decoding = "async";
    img.style.width = b.size + "px";
    // peek in from the screen edge: only the free margin beside the content shows the box
    var margin = Math.max(0, (window.innerWidth - 1280) / 2);
    var inset = phone ? -Math.round(b.size * 0.35) : Math.min(24, margin - b.size * 0.85);
    img.style[b.side === "l" ? "left" : "right"] = Math.round(inset) + "px";
    img.style.top = b.top + "vh";
    layer.appendChild(img);
    return { el: img, b: b };
  });
  document.body.insertBefore(layer, document.body.firstChild);

  function place() {
    var y = window.scrollY || 0;
    els.forEach(function (o) {
      var move = still ? 0 : -y * o.b.speed;
      var spin = still ? 0 : Math.sin((y + o.b.top * 9) / 500) * 4;
      o.el.style.transform = "translateY(" + move.toFixed(1) + "px) rotate(" + (o.b.tilt + spin).toFixed(1) + "deg)";
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; place(); });
  }, { passive: true });
  place();
})();
