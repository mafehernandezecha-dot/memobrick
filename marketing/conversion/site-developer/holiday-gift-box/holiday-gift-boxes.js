/* MemoBrick holiday: 3D gift boxes and a few loose 1x1 bricks floating in the page background.
   They sit behind the content, peek in from the screen edges, and drift at different
   speeds as the page scrolls (parallax) with a gentle sway. People who ask their device
   for reduced motion see them standing still.
   window.MB_GIFT_ART = { "box-cube-red": url, ..., "brick-blue": url } gives the image urls. */
(function () {
  "use strict";
  var art = window.MB_GIFT_ART || {};
  if (!art["box-cube-red"]) return;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phone = window.innerWidth < 760;

  // a: art name, side: l/r, top: vh from the top of the page, size: px wide, speed: parallax, tilt: degrees
  var items = phone ? [
    { a: "box-cube-red", side: "r", top: 14, size: 64, speed: 0.3, tilt: 8 },
    { a: "box-tall-green", side: "l", top: 75, size: 50, speed: 0.55, tilt: -7 },
    { a: "brick-blue", side: "r", top: 105, size: 18, speed: 0.85, tilt: 20 },
    { a: "box-wide-purple", side: "r", top: 150, size: 66, speed: 0.42, tilt: 5 },
    { a: "box-cube-orange", side: "l", top: 215, size: 56, speed: 0.6, tilt: -10 }
  ] : [
    { a: "box-cube-red", side: "l", top: 16, size: 132, speed: 0.3, tilt: -8 },
    { a: "brick-blue", side: "l", top: 48, size: 26, speed: 0.9, tilt: 18 },
    { a: "box-tall-green", side: "r", top: 62, size: 96, speed: 0.5, tilt: 7 },
    { a: "brick-orange", side: "r", top: 100, size: 22, speed: 1.05, tilt: -24 },
    { a: "box-wide-blue", side: "l", top: 118, size: 150, speed: 0.62, tilt: 5 },
    { a: "box-cube-purple", side: "r", top: 160, size: 122, speed: 0.38, tilt: -6 },
    { a: "brick-red", side: "l", top: 205, size: 24, speed: 0.95, tilt: 30 },
    { a: "box-tall-orange", side: "r", top: 240, size: 92, speed: 0.58, tilt: 10 },
    { a: "box-wide-green", side: "l", top: 285, size: 140, speed: 0.44, tilt: -7 },
    { a: "brick-purple", side: "r", top: 320, size: 24, speed: 1.0, tilt: -15 }
  ];

  var css = document.createElement("style");
  css.textContent =
    ".mb-giftbg{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}" +
    ".mb-giftbg img{position:absolute;display:block;height:auto;max-width:none;will-change:transform;" +
    "filter:drop-shadow(0 12px 16px rgba(29,29,31,.18))}";
  document.head.appendChild(css);

  var layer = document.createElement("div");
  layer.className = "mb-giftbg";
  layer.setAttribute("aria-hidden", "true");
  var margin = Math.max(0, (window.innerWidth - 1280) / 2);   // free space beside the 1280px content
  var els = items.map(function (it, i) {
    var img = document.createElement("img");
    img.src = art[it.a]; img.alt = ""; img.decoding = "async";
    img.style.width = it.size + "px";
    var brick = it.a.indexOf("brick") === 0;
    // boxes peek in from the edge; loose bricks sit inside the free margin
    var inset = phone ? -Math.round(it.size * (brick ? -0.4 : 0.3))
      : brick ? Math.max(6, margin * 0.35) : Math.min(28, margin - it.size * 0.8);
    img.style[it.side === "l" ? "left" : "right"] = Math.round(inset) + "px";
    img.style.top = it.top + "vh";
    layer.appendChild(img);
    return { el: img, it: it, phase: i * 1.7 };
  });
  document.body.insertBefore(layer, document.body.firstChild);

  function place() {
    var y = window.scrollY || 0;
    els.forEach(function (o) {
      var move = still ? 0 : -y * o.it.speed;
      var sway = still ? 0 : Math.sin(y / 420 + o.phase) * 5;
      var drift = still ? 0 : Math.sin(y / 650 + o.phase) * 8;
      o.el.style.transform = "translate(" + drift.toFixed(1) + "px," + move.toFixed(1) + "px) rotate(" + (o.it.tilt + sway).toFixed(1) + "deg)";
    });
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; place(); });
  }, { passive: true });
  place();
})();
