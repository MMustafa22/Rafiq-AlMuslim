/* ============================================================
   رفيق المسلم — إصلاح المصحف في الوضع الأفقي (عرض الموبايل)
   ------------------------------------------------------------
   المشكلة ١ (ضغطتان / وضع الغمر): كانت الصفحة تُوسَّط رأسيًا بـ flex
     فيضيع الجزء العلوي منها خارج منطقة التمرير فتختفي آيات.
     الحل: الصفحة تبدأ من أعلى (display:block) بعرض الشاشة كاملًا،
     وتُمرَّر رأسيًا حتى آخر آية، وتبدأ دائمًا من أول سطر.
   المشكلة ٢ (الأزرار الجانبية): كانت تطفو فوق الصفحة وتخفي الإطار
     المزخرف. الحل: نحجز عرض الأزرار على يمين الصفحة، فيظهر الإطار
     كاملًا، والأزرار صارت عمودًا متناسقًا قابلًا للتمرير إن زاد طوله.
   يُحمَّل هذا الملف آخر ملف، وقواعده أعلى أولوية من بقية الأنظمة.
   ============================================================ */
(function () {
  'use strict';
  if (window.__RFQ_LANDSCAPE_FIX__) return;
  window.__RFQ_LANDSCAPE_FIX__ = true;

  var L = '@media (orientation:landscape) and (max-height:520px)';
  var RV = 'html body div#readerView';
  var IM = RV + '.immersive,' + RV + '.rm-landscape-big';           /* وضع الغمر */
  var NORMAL = RV + ':not(.immersive):not(.rm-landscape-big)';       /* القراءة العادية */

  var css = '';
  css += ':root{--rfq-side:64px}\n';

  css += L + '{\n';

  /* ---------- ١) القراءة العادية: احجز مكان الأزرار على اليمين ---------- */
  css += NORMAL + ' .page-image-area{padding:0 var(--rfq-side) 0 0!important;box-sizing:border-box!important;width:100%!important;background:var(--rm-paper,#fffdf5)!important}\n';
  css += NORMAL + ' .img-wrapper{width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:0!important;overflow-x:hidden!important;overflow-y:visible!important;display:block!important;height:auto!important}\n';
  css += NORMAL + ' .img-wrapper.rmz-on{overflow-x:auto!important;overflow-y:visible!important}\n';
  css += NORMAL + ' .img-wrapper .mushaf-page-img,' + NORMAL + ' .img-wrapper.rmz-on .mushaf-page-img{display:block!important;width:calc(var(--rmz,1) * 100%)!important;max-width:none!important;height:auto!important;max-height:none!important;margin:0 auto!important;object-fit:contain!important}\n';

  /* عمود الأزرار: متناسق، ظاهر، ولا يتجاوز ارتفاع الشاشة */
  css += 'html body div#navBar.nav-bar{' +
    'position:fixed!important;top:50%!important;right:0!important;left:auto!important;bottom:auto!important;' +
    'transform:translateY(-50%)!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;' +
    'flex-wrap:nowrap!important;gap:6px!important;width:calc(var(--rfq-side) - 4px)!important;min-width:0!important;max-width:none!important;' +
    'height:auto!important;min-height:0!important;max-height:calc(100dvh - 10px)!important;overflow-y:auto!important;overflow-x:hidden!important;' +
    '-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:6px 5px!important;box-sizing:border-box!important;' +
    'background:linear-gradient(180deg,#fffdf0,#f3e8c6)!important;border:1px solid rgba(160,120,32,.55)!important;border-right:0!important;' +
    'border-radius:14px 0 0 14px!important;box-shadow:-4px 4px 14px rgba(75,55,20,.22)!important;z-index:900!important;grid-template-columns:none!important}\n';
  css += 'html body div#navBar.nav-bar::-webkit-scrollbar{display:none}\n';
  css += 'html body #navBar .nav-btn{' +
    'flex:0 0 auto!important;grid-column:auto!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;' +
    'width:100%!important;min-width:0!important;max-width:none!important;min-height:38px!important;padding:4px 2px!important;' +
    'writing-mode:horizontal-tb!important;text-orientation:mixed!important;white-space:normal!important;word-break:keep-all!important;' +
    'font:800 .62rem/1.25 Tajawal,sans-serif!important;border-radius:11px!important;border:1px solid rgba(120,85,10,.55)!important;' +
    'background:linear-gradient(180deg,#f6d878,#c9972b)!important;color:#2a1c00!important;' +
    'box-shadow:0 2px 0 #8a6414,0 4px 8px rgba(0,0,0,.18)!important}\n';
  css += 'html body #navBar .nav-btn:active{transform:translateY(2px)!important;box-shadow:0 0 0 #8a6414!important}\n';
  css += 'html body #navBar .nav-jump-wrap{flex:0 0 auto!important;width:100%!important;min-height:0!important;padding:3px!important;border-radius:11px!important;' +
    'background:#fffdf5!important;border:1px solid rgba(160,120,32,.55)!important;box-sizing:border-box!important}\n';
  css += 'html body #navBar .nav-jump-input{width:100%!important;max-width:none!important;height:34px!important;padding:0 2px!important;font-size:.85rem!important;text-align:center!important;box-sizing:border-box!important}\n';

  /* ---------- ٢) الغمر (ضغطتان): الصفحة بعرض الشاشة من أول سطر لآخر سطر ---------- */
  css += IM.split(',').map(function (s) { return s + ' #audioPlayerBox,' + s + ' #navBar,' + s + ' .tafseer-btn-wrap'; }).join(',') + '{display:none!important}\n';
  css += IM.split(',').map(function (s) { return s + ' .page-image-area'; }).join(',') +
    '{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;min-height:0!important;padding:0!important;margin:0!important;' +
    'z-index:2500!important;overflow:hidden!important;display:block!important;background:var(--rm-paper,#fffdf5)!important}\n';
  css += IM.split(',').map(function (s) { return s + ' .img-wrapper'; }).join(',') +
    '{display:block!important;position:relative!important;width:100vw!important;max-width:100vw!important;height:100dvh!important;max-height:100dvh!important;min-height:0!important;' +
    'padding:0 0 env(safe-area-inset-bottom,0px)!important;margin:0!important;border:0!important;box-shadow:none!important;border-radius:0!important;' +
    'overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;' +
    'align-items:flex-start!important;justify-content:flex-start!important;background:var(--rm-paper,#fffdf5)!important}\n';
  css += IM.split(',').map(function (s) { return s + ' .img-wrapper.rmz-on'; }).join(',') + '{overflow-x:auto!important}\n';
  css += IM.split(',').map(function (s) { return s + ' .img-wrapper .mushaf-page-img,' + s + ' .img-wrapper.rmz-on .mushaf-page-img'; }).join(',') +
    '{display:block!important;width:calc(var(--rmz,1) * 100vw)!important;max-width:none!important;height:auto!important;max-height:none!important;' +
    'margin:0 auto!important;object-fit:contain!important;object-position:top center!important;border-radius:0!important}\n';

  css += '}\n'; /* نهاية media */

  /* مؤشر موضع التمرير (شريط رفيع) يظهر في الغمر الأفقي فقط */
  css += '#rfqScrollBar{display:none}\n';
  css += 'html.rfq-imm-land #rfqScrollBar{display:block;position:fixed;top:0;left:0;width:4px;height:100dvh;z-index:2600;background:rgba(160,120,32,.15);pointer-events:none}\n';
  css += 'html.rfq-imm-land #rfqScrollBar i{display:block;width:100%;background:linear-gradient(180deg,#f0d060,#b8912a);border-radius:0 4px 4px 0;height:20%}\n\n';

  var st = document.createElement('style');
  st.id = 'rfq-landscape-fix';
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------------- سلوك: ابدأ من أول سطر + مؤشر التمرير ---------------- */
  var $ = function (id) { return document.getElementById(id); };
  var mq = window.matchMedia ? window.matchMedia('(orientation:landscape) and (max-height:520px)') : null;
  function isLandPhone() { return !!(mq && mq.matches); }
  function inImmersive() {
    var rv = $('readerView');
    return !!(rv && (rv.classList.contains('immersive') || rv.classList.contains('rm-landscape-big')));
  }
  function wrapper() { return $('imgWrapper'); }
  function resetTop() {
    var w = wrapper(); if (!w) return;
    w.scrollTop = 0;
    requestAnimationFrame(function () { w.scrollTop = 0; });
    setTimeout(function () { w.scrollTop = 0; }, 250);
  }
  function ensureBar() {
    var b = $('rfqScrollBar');
    if (!b) { b = document.createElement('div'); b.id = 'rfqScrollBar'; b.innerHTML = '<i></i>'; document.body.appendChild(b); }
    return b;
  }
  function updateBar() {
    var on = isLandPhone() && inImmersive();
    document.documentElement.classList.toggle('rfq-imm-land', on);
    if (!on) return;
    var w = wrapper(), b = ensureBar(), i = b.firstChild; if (!w || !i) return;
    var max = Math.max(1, w.scrollHeight - w.clientHeight);
    var ratio = Math.min(1, w.clientHeight / Math.max(1, w.scrollHeight));
    var h = Math.max(12, ratio * 100);
    i.style.height = h + '%';
    i.style.transform = 'translateY(' + ((w.scrollTop / max) * (100 - h) / h * 100) + '%)';
  }

  var wasImm = false;
  function onState() {
    var now = inImmersive() && isLandPhone();
    if (now && !wasImm) resetTop();       /* دخول الغمر: ابدأ من أول الصفحة */
    wasImm = now;
    updateBar();
  }

  function boot() {
    var rv = $('readerView'), w = wrapper();
    if (rv && window.MutationObserver) new MutationObserver(onState).observe(rv, { attributes: true, attributeFilter: ['class'] });
    if (w && window.MutationObserver) new MutationObserver(function () { if (isLandPhone()) resetTop(); updateBar(); }).observe(w, { childList: true });
    if (w) w.addEventListener('scroll', updateBar, { passive: true });
    /* تغيّر الصفحة: الصورة تُستبدل — ارجع لأول سطر */
    document.addEventListener('load', function (e) {
      var t = e.target; if (t && t.id === 'mushafImg') { if (isLandPhone()) resetTop(); updateBar(); }
    }, true);
    window.addEventListener('resize', function () { setTimeout(onState, 120); });
    window.addEventListener('orientationchange', function () { setTimeout(onState, 300); });
    onState();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
