/* ============================================================
   رفيق المسلم — حماية من تعطّل التخزين
   ------------------------------------------------------------
   في بعض المتصفحات/الأوضاع (تصفح خاص، WebView مقيّد، تخزين محجوب بالإعدادات،
   امتلاء الحصة) يرمي الوصول إلى localStorage/sessionStorage استثناءً، فتتعطّل
   صفحات كاملة (مثل الصحابة). هذا الملف يُحمَّل أولًا؛ فإن لم يعمل التخزين
   يستبدله بتخزين مؤقت في الذاكرة لتعمل كل الصفحات، ويُنبّه المستخدم مرة واحدة
   أن التقدّم لن يُحفظ بعد إغلاق التطبيق.
   ============================================================ */
(function () {
  'use strict';
  if (window.__RFQ_STORAGE_SHIM__) return;
  window.__RFQ_STORAGE_SHIM__ = true;
  var broken = [];

  function works(name) {
    try {
      var s = window[name], k = '__rfq_probe__';
      s.setItem(k, '1'); var ok = s.getItem(k) === '1'; s.removeItem(k);
      return ok;
    } catch (e) { return false; }
  }

  function memoryStorage() {
    var data = Object.create(null);
    var api = {
      getItem: function (k) { k = String(k); return k in data ? data[k] : null; },
      setItem: function (k, v) { data[String(k)] = String(v); },
      removeItem: function (k) { delete data[String(k)]; },
      clear: function () { data = Object.create(null); },
      key: function (i) { var ks = Object.keys(data); return i >= 0 && i < ks.length ? ks[i] : null; }
    };
    Object.defineProperty(api, 'length', { configurable: true, get: function () { return Object.keys(data).length; } });
    if (typeof Proxy !== 'function') return api;
    return new Proxy(api, {
      get: function (t, p) { if (p in t) return t[p]; return typeof p === 'string' && p in data ? data[p] : undefined; },
      set: function (t, p, v) { if (p in t) return false; data[String(p)] = String(v); return true; },
      deleteProperty: function (t, p) { delete data[String(p)]; return true; },
      has: function (t, p) { return p in t || (typeof p === 'string' && p in data); },
      ownKeys: function () { return Object.keys(data); },
      getOwnPropertyDescriptor: function (t, p) { return typeof p === 'string' && p in data ? { enumerable: true, configurable: true, value: data[p] } : undefined; }
    });
  }

  ['localStorage', 'sessionStorage'].forEach(function (name) {
    if (works(name)) return;
    broken.push(name);
    var mem = memoryStorage();
    try { Object.defineProperty(window, name, { configurable: true, get: function () { return mem; } }); } catch (e) {}
  });

  if (!broken.length) return;
  window.__RFQ_STORAGE_VOLATILE__ = true;
  try { console.warn('[Rafiq] التخزين غير متاح (' + broken.join(', ') + '): استُخدم تخزين مؤقت في الذاكرة.'); } catch (e) {}

  /* تنبيه واحد في الصفحة الرئيسية فقط (لا في الإطارات الداخلية) */
  function notice() {
    try {
      if (window.top !== window || !document.body || document.getElementById('rfqStorageNotice')) return;
      var d = document.createElement('div');
      d.id = 'rfqStorageNotice'; d.setAttribute('role', 'alert');
      d.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:2147483600;padding:9px 14px;background:#7c2d12;color:#fff;font:700 .8rem/1.6 Tajawal,sans-serif;text-align:center;direction:rtl';
      d.innerHTML = '⚠️ التخزين في المتصفح معطّل (ربما وضع التصفح الخاص): لن يُحفظ تقدّمك وإعداداتك بعد إغلاق التطبيق. <button type="button" style="margin-inline-start:8px;border:0;border-radius:8px;padding:3px 10px;font:inherit;cursor:pointer">حسنًا</button>';
      d.querySelector('button').onclick = function () { d.remove(); };
      document.body.appendChild(d);
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', notice); else notice();
})();
