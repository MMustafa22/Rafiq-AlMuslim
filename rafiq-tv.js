/* رفيق المسلم — دعم التلفزيونات الذكية وأجهزة Android TV
   تنقّل بالريموت (الأسهم + OK + زر الرجوع)، وخطوط وأزرار أكبر للشاشات الكبيرة. */
(function () {
  "use strict";

  var CSS = [
    "html.rfq-tv body{font-size:18px}",
    "html.rfq-tv #mainApp.container{max-width:1800px}",
    "html.rfq-tv .home-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))!important;gap:14px!important}",
    "html.rfq-tv .home-tile{min-height:150px!important;padding:16px 10px!important;border-radius:18px!important}",
    "html.rfq-tv .home-tile .ht-icon{width:56px!important;height:56px!important;font-size:1.75rem!important}",
    "html.rfq-tv .home-tile .ht-label{font-size:1.1rem!important;line-height:1.4}",
    "html.rfq-tv .home-tile:hover{transform:none}",
    "html:not(.rfq-tv) .rfq-tv-only{display:none!important}",
    "html.rfq-tv :focus{outline:none}",
    "html.rfq-tv :focus-visible,html.rfq-tv .rfq-focus{outline:4px solid #f4c95d!important;outline-offset:4px!important;box-shadow:0 0 0 8px rgba(244,201,93,.22),0 12px 32px rgba(0,0,0,.45)!important;transform:scale(1.03);z-index:3;position:relative}",
    "html.rfq-tv .home-tile.rfq-focus{background-image:linear-gradient(165deg,rgba(244,201,93,.18),rgba(16,185,129,.08))!important}",
    "html.rfq-tv .kh-dot,html.rfq-tv #rafiqHubToggle{box-shadow:0 0 0 3px rgba(244,201,93,.35)}",
    "html.rfq-tv .rfq-tv-hint{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9990;padding:9px 18px;border-radius:999px;background:rgba(8,15,28,.94);border:1px solid rgba(244,201,93,.4);color:#ffe9a8;font:800 .82rem Tajawal,sans-serif;pointer-events:none;opacity:0;transition:opacity .3s}",
    "html.rfq-tv .rfq-tv-hint.show{opacity:1}",
    "@media (min-width:1600px){html.rfq-tv .home-grid{grid-template-columns:repeat(6,minmax(0,1fr))!important}}"
  ].join("");

  var SEL = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])";
  var KEY_BACK = 4; // Android TV back key-code

  function detect() {
    var ua = navigator.userAgent || "";
    if (/Android TV|GoogleTV|BRAVIA|AFT[BMN]|SmartTV|Smart-TV|HbbTV|NetCast|Tizen|Web0S|webOS|TV Safari/i.test(ua)) return true;
    if (/\bTV\b/i.test(ua) && !/Mobile/i.test(ua)) return true;
    try {
      if (window.matchMedia && window.matchMedia("(min-width:1500px) and (pointer:coarse)").matches) return true;
    } catch (e) {}
    return false;
  }

  function visible(el) {
    if (!el || el.disabled) return false;
    if (el.closest("[hidden],.rfq-tv-skip")) return false;
    var r = el.getBoundingClientRect();
    if (r.width < 6 || r.height < 6) return false;
    var cs = getComputedStyle(el);
    return cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
  }

  function items() {
    var host = document.querySelector(".page.active") || document.getElementById("mainApp") || document.body;
    var list = Array.prototype.slice.call(document.querySelectorAll(SEL)).filter(visible);
    var inHost = list.filter(function (el) { return host.contains(el); });
    return inHost.length ? inHost : list;
  }

  var current = null;
  function focusEl(el) {
    if (!el) return;
    if (current && current !== el) current.classList.remove("rfq-focus");
    current = el;
    el.classList.add("rfq-focus");
    try {
      el.focus({ preventScroll: false });
      el.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    } catch (e) {}
  }

  function move(dir) {
    var list = items();
    if (!list.length) return;
    if (!current || list.indexOf(current) < 0) { focusEl(list[0]); return; }
    var cr = current.getBoundingClientRect();
    var cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
    var best = null, bestScore = Infinity;
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (el === current) continue;
      var r = el.getBoundingClientRect();
      var x = r.left + r.width / 2, y = r.top + r.height / 2;
      var dx = x - cx, dy = y - cy;
      var primary = 0, secondary = 0;
      if (dir === "right") { if (dx <= 8) continue; primary = dx; secondary = Math.abs(dy); }
      if (dir === "left") { if (dx >= -8) continue; primary = -dx; secondary = Math.abs(dy); }
      if (dir === "down") { if (dy <= 8) continue; primary = dy; secondary = Math.abs(dx); }
      if (dir === "up") { if (dy >= -8) continue; primary = -dy; secondary = Math.abs(dx); }
      var score = primary + secondary * 2.2;
      if (score < bestScore) { bestScore = score; best = el; }
    }
    focusEl(best || list[(list.indexOf(current) + (dir === "up" || dir === "left" ? -1 : 1) + list.length) % list.length]);
  }

  function hint(text) {
    var el = document.querySelector(".rfq-tv-hint");
    if (!el) {
      el = document.createElement("div");
      el.className = "rfq-tv-hint";
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(hint.t);
    hint.t = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function goHome() {
    try {
      if (document.getElementById("readerView") && document.getElementById("readerView").style.display !== "none" && typeof window.backToIndex === "function") {
        window.backToIndex();
        return true;
      }
      if (typeof window.shPg === "function") { window.shPg("mainApp"); return true; }
    } catch (e) {}
    return false;
  }

  function install() {
    var st = document.createElement("style");
    st.id = "rfq-tv-style";
    st.textContent = CSS;
    document.head.appendChild(st);
    document.documentElement.classList.add("rfq-tv");

    document.addEventListener("keydown", function (e) {
      var k = e.keyCode || e.which;
      if (k === KEY_BACK) {
        if (goHome()) { e.preventDefault(); return; }
      }
      var overlayOpen = document.querySelector(".rm-modal.show,.dl-overlay.open,.tafseer-overlay.open,[id$='Overlay'].show,#zakatOverlay.show");
      if (overlayOpen && (e.key === "Escape" || k === KEY_BACK)) return;
      var map = { ArrowRight: "right", ArrowLeft: "left", ArrowUp: "up", ArrowDown: "down" };
      if (map[e.key]) {
        e.preventDefault();
        move(map[e.key]);
        return;
      }
      if (e.key === "Escape") {
        if (goHome()) e.preventDefault();
      }
    }, true);

    document.addEventListener("focusin", function (e) {
      if (e.target && e.target.nodeType === 1 && e.target.matches(SEL)) {
        if (current && current !== e.target) current.classList.remove("rfq-focus");
        current = e.target;
        e.target.classList.add("rfq-focus");
        if (e.target.classList.contains("home-tile")) {
          hint((e.target.textContent || "").trim().slice(0, 40));
        }
      }
    });

    document.addEventListener("click", function () { hint(""); }, true);

    setTimeout(function () {
      var first = items()[0];
      if (first) focusEl(first);
    }, 900);
  }

  if (detect()) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
    else install();
  }
  window.rfqTvMode = function () { if (!document.documentElement.classList.contains("rfq-tv")) install(); };
})();
