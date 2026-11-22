/* ============================================================
   رفيق المسلم — قراءة صفحات المصحف على الموبايل (v1)
   ------------------------------------------------------------
   ١) الصفحة بعرض الشاشة كاملًا وطولها الطبيعي (تُقرأ بالنزول)
      في الوضع الرأسي والأفقي وملء الشاشة — فلا تُقصّ ولا تُقصّر
      عند تدوير الجهاز، والتكبير يعمل في الاتجاهين.
   ٢) لا تتقلّب الصفحات تلقائيًا إلا إذا كان هناك صوت قارئ يعمل
      فعلًا (غير مكتوم) — أي محاولة قلب متتابعة بدون صوت تُوقف.
   ٣) لا نستخدم «ملء الشاشة» الأصلي للمتصفح حتى لا تظهر رسالته
      السوداء أثناء القراءة؛ الغمر يتم بـ CSS داخل الصفحة.
   ============================================================ */
(function () {
  'use strict';
  if (window.__RFQ_READER_V1__) return;
  window.__RFQ_READER_V1__ = true;

  /* ---------------- ١) التنسيق ---------------- */
  var css = '\
html body #readerView .page-image-area{min-height:0!important;background:var(--rm-paper,#fffdf5)!important}\
html body #readerView .img-wrapper{min-height:0!important;height:auto!important;border-bottom:0!important;overflow:auto!important;-webkit-overflow-scrolling:touch}\
html body #readerView .img-wrapper:not(.rmz-on){justify-content:center!important;align-items:flex-start!important}\
html body #readerView .img-wrapper.rmz-on{justify-content:flex-start!important;align-items:flex-start!important}\
html body #readerView .img-wrapper .mushaf-page-img,\
html body #readerView .img-wrapper.rmz-on .mushaf-page-img{\
  width:calc(var(--rmz,1) * 100%)!important;\
  height:auto!important;max-width:none!important;max-height:none!important;\
  object-fit:contain!important;object-position:top center!important;\
  margin:0 auto!important;display:block!important;border-radius:0!important;box-shadow:none!important}\
/* الوضع الأفقي: نفس القاعدة — الصفحة بعرض الشاشة كاملًا وطولها كامل (بلا تقصير) */\
@media (orientation:landscape){\
  html body #readerView .page-image-area{min-height:0!important}\
  html body #readerView .img-wrapper{height:auto!important;max-height:none!important}\
}\
/* الغمر: الصفحة تملأ الشاشة عرضًا وتُقرأ بالنزول، والتكبير يحرّكها */\
html body #readerView.immersive .page-image-area{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;min-height:0!important;z-index:2200!important;overflow:hidden!important;background:#fffdf5!important}\
html body #readerView.immersive .img-wrapper{width:100vw!important;height:100dvh!important;max-width:none!important;max-height:none!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:auto!important;align-items:flex-start!important;justify-content:center!important;background:#fffdf5!important}\
html body #readerView.immersive .img-wrapper.rmz-on{justify-content:flex-start!important}\
html body #readerView.immersive .img-wrapper .mushaf-page-img,\
html body #readerView.immersive .img-wrapper.rmz-on .mushaf-page-img{\
  width:calc(var(--rmz,1) * 100vw)!important;height:auto!important;\
  max-width:none!important;max-height:none!important;object-fit:contain!important;margin:0 auto!important}\
html body #readerView.rm-landscape-big .img-wrapper .mushaf-page-img,\
html body #readerView.rm-landscape-big .img-wrapper.rmz-on .mushaf-page-img,\
html body #readerView.rm-land-side .img-wrapper .mushaf-page-img,\
html body #readerView.rm-land-side .img-wrapper.rmz-on .mushaf-page-img{\
  width:calc(var(--rmz,1) * 100%)!important;height:auto!important;\
  max-width:none!important;max-height:none!important;object-fit:contain!important}\
html body #readerView.rm-landscape-big .img-wrapper{height:100dvh!important;overflow:auto!important;align-items:flex-start!important}\
html.rm-night body #readerView.immersive .page-image-area,\
html.rm-night body #readerView.immersive .img-wrapper{background:#15120b!important}\
';
  var st = document.createElement('style');
  st.id = 'rfq-reader-v1';
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------------- ٢) حارس قلب الصفحات ---------------- */
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
