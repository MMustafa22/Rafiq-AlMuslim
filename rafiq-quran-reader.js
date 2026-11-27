/* ============================================================
   رفيق المسلم — قراءة صفحات المصحف على الموبايل (v1)
   ------------------------------------------------------------
   1) الصفحة بعرض الشاشة كاملًا وطولها الطبيعي (تُقرأ بالنزول)
      في الوضع الرأسي والأفقي وملء الشاشة — فلا تُقصّ ولا تُقصّر
      عند تدوير الجهاز، والتكبير يعمل في الاتجاهين.
   2) لا تتقلّب الصفحات تلقائيًا إلا إذا كان هناك صوت قارئ يعمل
      فعلًا (غير مكتوم) — أي محاولة قلب متتابعة بدون صوت تُوقف.
   3) لا نستخدم «ملء الشاشة» الأصلي للمتصفح حتى لا تظهر رسالته
      السوداء أثناء القراءة؛ الغمر يتم بـ CSS داخل الصفحة.
   ============================================================ */
(function () {
  'use strict';
  if (window.__RFQ_READER_V1__) return;
  window.__RFQ_READER_V1__ = true;

  /* ---------------- 1) التنسيق ---------------- */
  /* الأنماط انتقلت إلى rafiq-mushaf.css (ملف واحد لكل طبقات المصحف) */

  /* ---------------- 2) حارس قلب الصفحات ---------------- */
  var lastGesture = 0, lastTurnAt = 0, blocked = 0;

  ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(function (t) {
    window.addEventListener(t, function () { lastGesture = Date.now(); }, { capture: true, passive: true });
  });

  function audibleAudio() {
    var list = document.querySelectorAll('audio');
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (!a || a.paused || a.ended) continue;
      if (a.muted || a.volume <= 0.01) continue;
      if (!(a.currentTime > 0)) continue;
      return true;
    }
    return false;
  }

  function installGate() {
    var orig = window.loadPage;
    if (typeof orig !== 'function' || orig.__rfqReaderGate) return false;
    var wrapped = function () {
      var now = Date.now();
      var userAsked = (now - lastGesture) < 1500;
      var playing = audibleAudio();
      /* قلب تلقائي متتابع بدون صوت مسموع = عطل، نمنعه */
      if (!userAsked && !playing && (now - lastTurnAt) < 2500) {
        blocked++;
        try { console.warn('[RFQ] تم منع قلب صفحة تلقائي بدون قارئ يعمل'); } catch (e) {}
        if (blocked >= 3) {
          blocked = 0;
          try { if (typeof window._stopReading === 'function') window._stopReading(); } catch (e) {}
        }
        return;
      }
      lastTurnAt = now;
      return orig.apply(this, arguments);
    };
    wrapped.__rfqReaderGate = true;
    window.loadPage = wrapped;
    return true;
  }

  if (!installGate()) {
    var tries = 0;
    var timer = setInterval(function () {
      if (installGate() || ++tries > 40) clearInterval(timer);
    }, 250);
  }
})();
