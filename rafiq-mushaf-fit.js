/* رفيق المسلم — يضبط نسبة صفحة المصحف من الصورة الفعلية فلا تتمطط أبدًا */
(function () {
  'use strict';
  var K = 'rm_pg_ratio', root = document.documentElement;
  function setRatio(img) {
    if (!img || img.naturalWidth < 50 || img.naturalHeight < 50) return;
    var r = img.naturalWidth / img.naturalHeight;
    if (!(r > 0.3 && r < 1.2)) return;
    r = r.toFixed(4);
    root.style.setProperty('--pg-ratio', r);
    try { localStorage.setItem(K, r); } catch (e) {}
  }
  try { var s = parseFloat(localStorage.getItem(K)); if (s > 0.3 && s < 1.2) root.style.setProperty('--pg-ratio', String(s)); } catch (e) {}
  /* load لا يطفو، فنلتقطه في مرحلة الالتقاط لأن الصورة تُستبدل مع كل صفحة */
  document.addEventListener('load', function (e) { var t = e.target; if (t && t.id === 'mushafImg') setRatio(t); }, true);
  var cur = document.getElementById('mushafImg'); if (cur && cur.complete) setRatio(cur);
})();
