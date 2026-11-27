/* ============================================================
   رفيق المسلم — إصلاح المصحف في الوضع الأفقي (عرض الموبايل)
   ------------------------------------------------------------
   المشكلة 1 (ضغطتان / وضع الغمر): كانت الصفحة تُوسَّط رأسيًا بـ flex
     فيضيع الجزء العلوي منها خارج منطقة التمرير فتختفي آيات.
     الحل: الصفحة تبدأ من أعلى (display:block) بعرض الشاشة كاملًا،
     وتُمرَّر رأسيًا حتى آخر آية، وتبدأ دائمًا من أول سطر.
   المشكلة 2 (الأزرار الجانبية): كانت تطفو فوق الصفحة وتخفي الإطار
     المزخرف. الحل: نحجز عرض الأزرار على يمين الصفحة، فيظهر الإطار
     كاملًا، والأزرار صارت عمودًا متناسقًا قابلًا للتمرير إن زاد طوله.
   يُحمَّل هذا الملف آخر ملف، وقواعده أعلى أولوية من بقية الأنظمة.
   ============================================================ */
(function () {
  'use strict';
  if (window.__RFQ_LANDSCAPE_FIX__) return;
  window.__RFQ_LANDSCAPE_FIX__ = true;

  /* الأنماط انتقلت إلى rafiq-mushaf.css (ملف واحد لكل طبقات المصحف) */

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
