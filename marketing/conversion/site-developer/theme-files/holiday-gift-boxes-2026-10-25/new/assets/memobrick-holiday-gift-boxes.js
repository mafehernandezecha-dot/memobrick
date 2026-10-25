/* MemoBrick holiday: gift boxes made of 1x1 bricks floating in the page background.
   They sit behind the content, drift at different speeds as the page scrolls
   (parallax), and stay at the page edges so they never cover text or buttons.
   Turned off for people who ask their device for reduced motion (boxes stay still).
   The boxes are drawn here from the same brick pattern as make_gift_box.py, so no image files are needed. */
(function () {
  "use strict";
  var PATTERN = [
    "...RRR....RRR...", "..RSSRR..RRSSR..", "..RRSSRRRRSSRR..", "....RRRRRRRR....",
    "LLLLLLLRRLLLLLLL", "LLLLLLLRRLLLLLLL", "KKKKKKKSSKKKKKKK",
    ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.",
    ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.", ".BBBBBBRRBBBBBB.",
    ".DDDDDDSSDDDDDD."
  ];
  var COLORS = {
    red: ["#d6223b", "#ffc83d"], green: ["#1f9d63", "#ef4b6c"],
    blue: ["#3b8cf0", "#ffc83d"], purple: ["#9b5cf0", "#2bbf7a"]
  };
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16), out = "#";
    [n >> 16, (n >> 8) & 255, n & 255].forEach(function (c) {
      out += ("0" + Math.max(0, Math.min(255, Math.floor(c * f))).toString(16)).slice(-2);
    });
    return out;
  }
  // a gift box made of 1x1 bricks (each cell a brick with its stud), as an image url
  function boxUrl(name) {
    var box = COLORS[name][0], ribbon = COLORS[name][1], cell = 24;
    var colors = { B: box, D: shade(box, 0.78), L: shade(box, 1.12), K: shade(box, 0.85), R: ribbon, S: shade(ribbon, 0.8) };
    var w = PATTERN[0].length * cell, h = PATTERN.length * cell, cx = cell / 2, cy = cell / 2 - 1, r = cell * 0.3;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ' + w + " " + h + '"><defs>';
    Object.keys(colors).forEach(function (k) {
      var c = colors[k];
      svg += '<g id="' + k + '"><rect x="1" y="1" width="22" height="22" rx="3" fill="' + c + '"/>' +
        '<rect x="1" y="19" width="22" height="4" rx="2" fill="' + shade(c, 0.8) + '"/>' +
        '<circle cx="' + cx + '" cy="' + (cy + 1.5) + '" r="' + r + '" fill="' + shade(c, 0.78) + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + shade(c, 1.08) + '"/>' +
        '<circle cx="' + (cx - r * 0.35).toFixed(2) + '" cy="' + (cy - r * 0.35).toFixed(2) + '" r="' + (r * 0.28).toFixed(2) + '" fill="#fff" fill-opacity=".45"/></g>';
    });
    svg += "</defs>";
    PATTERN.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] !== ".") svg += '<use xlink:href="#' + row[x] + '" x="' + x * cell + '" y="' + y * cell + '"/>';
      }
    });
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg + "</svg>");
  }
  var urls = {};
  Object.keys(COLORS).forEach(function (k) { urls[k] = boxUrl(k); });
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
