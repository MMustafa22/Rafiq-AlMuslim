/* يطلب من الـ Service Worker تجهيز الملفات الثقيلة (تفسيران، قصص الأنبياء، الخواطر، صوت الأذكار)
   في الخلفية بعد استقرار الصفحة، وعلى اتصال جيد فقط (ليس توفير بيانات ولا 2G). */
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;
  function okConnection() {
    try {
      var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (!c) return true;
      if (c.saveData) return false;
      return !/(^|-)2g$/.test(c.effectiveType || '');
    } catch (e) { return true; }
  }
  function go() {
    if (!okConnection() || navigator.onLine === false) return;
    navigator.serviceWorker.ready.then(function (reg) {
      var sw = reg.active || navigator.serviceWorker.controller;
      if (sw) sw.postMessage({ type: 'RFQ_WARM' });
    }).catch(function () {});
  }
  function later() { setTimeout(function () { (window.requestIdleCallback || function (f) { setTimeout(f, 300); })(go); }, 8000); }
  if (document.readyState === 'complete') later(); else window.addEventListener('load', later);
})();
