/* ============================================================
   رفيق المسلم — المصحف الذكي (أونلاين + أوفلاين)
   1) كل صفحة تفتحها وأنت أونلاين تُسجَّل في الكاش فلا تُحمَّل مرة ثانية.
   2) بعد الصفحة الحالية يُحمَّل 5 صفحات تالية بنفس شكل المصحف المعروض.
   3) كروت «اختيار المصحف»: حمّل أيًّا من المصحفين (المدينة / التجويد) كاملًا وبدّل بينهما.
   يعتمد على دوال quran.html: dlTask / dlFetchOne / dlMark ومخزن quran-mushaf-v1.
   ============================================================ */
(function () {
  'use strict';
  var CN = 'quran-mushaf-v1', AHEAD = 5, TOTAL = 604;
  var $ = function (id) { return document.getElementById(id); };
  var ar = function (n) { return String(n); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var NAMES = { 1: 'مصحف المدينة', 2: 'مصحف التجويد' };
  var SUBS = { 1: 'النسخة بالإطار الأخضر المزخرف', 2: 'أحكام التجويد بالألوان' };

  function folder() { try { return selectedMushafFolder === 2 ? 2 : 1; } catch (e) { return 1; } }
  function pad(n) { return String(n).padStart(3, '0'); }
  function localUrl(f, n) { return './mushaf/' + f + '/' + pad(n) + '.avif'; }
  function remoteUrl(f, n) { try { return mushafRemoteUrl(f, n); } catch (e) { return 'https://www.islamicbook.ws/' + f + '/' + n + '.jpg'; } }
  /* مفتاح الكاش ← [المصحف، الصفحة] (محلي، islamicbook، أو GitHub للمدينة) */
  function parseKey(url, forDelete) {
    var x = url.match(/islamicbook\.ws\/(\d)\/(\d+)\./) || url.match(/\/mushaf\/(\d)\/(\d+)\.avif/);
    if (x) return [+x[1], +x[2]];
    x = url.match(/QuranHub\/quran-pages-images\/main\/kfgqpc\/hafs-wasat\/(\d+)\.jpg/); if (x) return [1, +x[1]];
    x = forDelete && url.match(/Quran-PNG\/master\/(\d+)\.png/);                      /* نسخة قديمة: تُحذف فقط ولا تُحسب */
    return x ? [1, +x[1]] : null;
  }
  function online() { return navigator.onLine !== false; }
  function saveData() { try { return !!(navigator.connection && navigator.connection.saveData); } catch (e) { return false; } }

  /* ---------- هل الصفحة محفوظة؟ (نفحص الرابطين: المحلي والبعيد) ---------- */
  async function cached(f, n) {
    try {
      var c = await caches.open(CN), us = [localUrl(f, n), remoteUrl(f, n)];
      for (var i = 0; i < us.length; i++) {
        var r = await c.match(us[i]);
        if (!r) continue;
        if (r.type === 'opaque') return true;
        var ct = (r.headers.get('content-type') || '');
        if (r.ok && /image|octet-stream/i.test(ct)) return true;
        if (r.ok) { try { await c.delete(us[i]); } catch (e) {} }   /* ليست صورة (صفحة خطأ) ← نحذفها */
      }
    } catch (e) {}
    return false;
  }

  /* ---------- تأكد أن الصفحة في الكاش (يحمّلها فقط إن لم تكن محفوظة) ---------- */
  var inflight = {};
  function ensure(f, n) {
    var k = f + ':' + n; if (inflight[k]) return inflight[k];
    var p = (async function () {
      if (await cached(f, n)) return 'have';
      if (!online()) return 'offline';
      try {
        var t = dlTask('img' + f, n);
        var ok = await dlFetchOne(t, 2);
        if (ok) { try { dlMark(t.t, t.n); } catch (e) {} return 'got'; }
      } catch (e) { if (e && (e.name === 'QuotaExceededError' || /quota/i.test(String(e.message)))) return 'quota'; }
      return 'fail';
    })();
    inflight[k] = p;
    var clear = function () { delete inflight[k]; }; p.then(clear, clear);
    return p;
  }

  /* ---------- الصفحة الحالية + 5 صفحات بعدها ---------- */
  var gen = 0;
  function waitImg(g) {
    return new Promise(function (res) {
      var t0 = Date.now();
      (function poll() {
        if (g !== gen) return res(false);
        var im = $('mushafImg');
        if ((im && im.complete && im.naturalWidth > 0) || Date.now() - t0 > 8000) return res(true);
        setTimeout(poll, 250);
      })();
    });
  }
  async function windowAhead(p) {
    var g = ++gen, f = folder();
    if (!window.caches || !online()) return;
    await waitImg(g); if (g !== gen) return;
    await ensure(f, p);                                   /* تسجيل الصفحة الحالية */
    if (saveData()) return;                               /* وفّر باقة المستخدم */
    for (var i = 1; i <= AHEAD; i++) {
      if (g !== gen || !online() || p + i > TOTAL) return;
      var r = await ensure(f, p + i);
      if (r === 'quota') return;
      if (r === 'got') await sleep(150);
    }
  }
  window._prefetchAdjacentPages = function (p) { windowAhead(+p || 1); };

  /* ---------- جرد المحفوظ لكل مصحف ---------- */
  async function scan() {
    var out = { 1: new Set(), 2: new Set() };
    try {
      var c = await caches.open(CN), ks = await c.keys();
      ks.forEach(function (rq) { var k = parseKey(rq.url); if (k && out[k[0]]) out[k[0]].add(k[1]); });
    } catch (e) {}
    return out;
  }

  /* ---------- التحميل الكامل لمصحف ---------- */
  var bulk = { run: false, cancel: false, f: 0, done: 0, total: 0, fail: 0, msg: '' };
  async function downloadAll(f) {
    if (bulk.run) return;
    if (!online()) { bulk.msg = 'لا يوجد إنترنت الآن. جرّب لما يرجع الاتصال.'; render(); return; }
    bulk = { run: true, cancel: false, f: f, done: 0, total: 0, fail: 0, msg: '' };
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
    var have = (await scan())[f];
    var start = 1; try { if ($('readerView') && $('readerView').style.display !== 'none') start = Math.max(1, Math.min(TOTAL, currentPage)); } catch (e) {}
    var order = [];                                       /* نبدأ من صفحتك ثم نكمل للنهاية ثم نرجع للبداية */
    for (var i = 0; i < TOTAL; i++) { var n = ((start - 1 + i) % TOTAL) + 1; if (!have.has(n)) order.push(n); }
    bulk.total = order.length; bulk.done = 0; render();
    var idx = 0, stop = false;
    async function worker() {
      while (!stop && !bulk.cancel && idx < order.length) {
        if (!online()) { stop = true; bulk.msg = 'انقطع الاتصال — اضغط «تحميل» لتكمل من حيث توقفت.'; break; }
        var n = order[idx++];
        var r = await ensure(f, n);
        if (r === 'quota') { stop = true; bulk.msg = 'مساحة الجهاز ممتلئة. امسح شيئًا ثم أعد المحاولة.'; break; }
        if (r === 'got' || r === 'have') bulk.done++; else bulk.fail++;
        if ((bulk.done + bulk.fail) % 5 === 0) render();
      }
    }
    await Promise.all([worker(), worker(), worker()]);
    bulk.run = false;
    if (!bulk.msg) bulk.msg = bulk.cancel ? 'تم الإيقاف. اللي اتحمّل محفوظ، وتقدر تكمل بعدين.' : (bulk.fail ? 'اكتمل التحميل. تعذّر ' + ar(bulk.fail) + ' صفحة — اضغط «تحميل» لإعادة المحاولة.' : '✅ اكتمل: المصحف جاهز للقراءة بدون إنترنت.');
    try { if (typeof dlPersist === 'function') dlPersist(); } catch (e) {}
    render();
  }
  async function removeAll(f) {
    if (bulk.run) return;
    if (!confirm('هتحذف ' + NAMES[f] + ' المحفوظ على الجهاز. متأكد؟')) return;
    try {
      var c = await caches.open(CN), ks = await c.keys();
      await Promise.all(ks.map(function (rq) {
        var k = parseKey(rq.url, true);
        return k && k[0] === f ? c.delete(rq) : null;
      }));
    } catch (e) {}
    bulk.msg = 'تم حذف ' + NAMES[f] + ' من الجهاز.'; render();
  }

  /* ---------- الواجهة: داخل كروت «اختيار المصحف» ---------- */
  var css = '\
.rmo-off{padding:6px 10px 12px;direction:rtl;cursor:default}\
.rmo-bar{height:12px;border-radius:999px;background:rgba(138,138,138,.3);overflow:hidden;margin:2px 0 6px}\
.rmo-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#d7a93a,#2d9a4a);transition:width .3s}\
.rmo-cnt{font-size:.82rem;font-weight:800;line-height:1.5;color:#5a4000;text-align:center}\
body.dark-mode .rmo-cnt{color:#f3ecd2}\
.rmo-btns{display:flex;gap:8px;margin-top:8px}\
.rmo-btn{flex:1;min-height:50px;border:0;border-radius:14px;font:900 .98rem Tajawal,sans-serif;cursor:pointer;color:#2a1c00;background:linear-gradient(135deg,#f6dc8c,#c9972b);box-shadow:0 3px 0 #8a6414;-webkit-tap-highlight-color:transparent}\
.rmo-btn:active{transform:translateY(2px);box-shadow:0 1px 0 #8a6414}\
.rmo-btn[disabled]{opacity:.5;box-shadow:none}\
.rmo-btn.stop{background:#e8c0b8;box-shadow:0 3px 0 #a0554a}\
.rmo-btn.del{flex:0 0 50px;background:transparent;border:2px solid rgba(184,145,42,.6);box-shadow:none;color:inherit}\
#rmoMsg{font-size:.9rem;line-height:1.8;font-weight:700;text-align:center;padding:10px 6px 0;color:#5a4000}\
body.dark-mode #rmoMsg{color:#f3ecd2}\
@media (max-width:560px){\
#mushafPickerOverlay .dl-body>div[style*="grid"]{grid-template-columns:1fr!important}\
#mushafPickerOverlay .mushaf-card{display:grid;grid-template-columns:34% 1fr;align-items:center}\
#mushafPickerOverlay .mushaf-card-img{grid-column:1;grid-row:1 / span 3;height:100%;aspect-ratio:3/4}\
#mushafPickerOverlay .mushaf-card-lbl,#mushafPickerOverlay .mushaf-card-sel,#mushafPickerOverlay .rmo-off{grid-column:2}\
#mushafPickerOverlay .mushaf-card-lbl{border-top:0;padding:12px 10px 2px;text-align:right}\
#mushafPickerOverlay .mushaf-card-lbl strong{font-size:1.18rem}\
#mushafPickerOverlay .mushaf-card-lbl span{font-size:.86rem;display:block;line-height:1.6}\
#mushafPickerOverlay .mushaf-card-sel{font-size:.9rem;text-align:right;padding:2px 10px}\
}';
  var stl = document.createElement('style'); stl.id = 'rmo-css'; stl.textContent = css; document.head.appendChild(stl);

  function decorate() {
    [1, 2].forEach(function (f) {
      var card = $('mcrd-' + f); if (!card || card.querySelector('.rmo-off')) return;
      var off = document.createElement('div'); off.className = 'rmo-off'; off.setAttribute('data-f', f);
      off.innerHTML = '<div class="rmo-bar"><i></i></div><div class="rmo-cnt"></div><div class="rmo-btns"></div>';
      off.addEventListener('click', function (e) {                       /* لا يختار المصحف عند الضغط على أزرار التحميل */
        e.stopPropagation();
        var b = e.target.closest('button[data-act]'); if (!b) return;
        var a = b.getAttribute('data-act');
        if (a === 'dl') downloadAll(f); else if (a === 'stop') bulk.cancel = true; else if (a === 'del') removeAll(f);
      });
      card.appendChild(off);
    });
    var body = document.querySelector('#mushafPickerOverlay .dl-body');
    if (body && !$('rmoMsg')) { var m = document.createElement('div'); m.id = 'rmoMsg'; body.appendChild(m); }
  }
  async function render() {
    decorate();
    var sc = await scan();
    [1, 2].forEach(function (f) {
      var off = document.querySelector('#mcrd-' + f + ' .rmo-off'); if (!off) return;
      var have = sc[f].size, running = bulk.run && bulk.f === f, full = have >= TOTAL;
      var pct = running && bulk.total ? Math.round(((TOTAL - bulk.total) + bulk.done) / TOTAL * 100) : Math.round(have / TOTAL * 100);
      pct = Math.min(100, pct);
      off.querySelector('.rmo-bar i').style.width = pct + '%';
      off.querySelector('.rmo-cnt').textContent = running ? 'جارٍ التحميل… ' + ar(have) + ' من ' + ar(TOTAL) + ' صفحة'
        : (full ? '✅ جاهز للقراءة بدون إنترنت' : (have ? 'محمّل ' + ar(have) + ' من ' + ar(TOTAL) + ' صفحة' : 'غير محمّل للقراءة بدون إنترنت'));
      var btns = off.querySelector('.rmo-btns');
      btns.innerHTML = running ? '<button class="rmo-btn stop" data-act="stop">⏹ إيقاف</button>'
        : '<button class="rmo-btn" data-act="dl"' + ((bulk.run || full) ? ' disabled' : '') + '>' + (full ? 'تم التحميل' : (have ? '⬇ أكمل التحميل' : '⬇ حمّل للأوفلاين')) + '</button>' +
          ((have && !bulk.run) ? '<button class="rmo-btn del" data-act="del" aria-label="حذف من الجهاز">🗑</button>' : '');
    });
    var m = $('rmoMsg'); if (m) m.textContent = !online() ? '📴 أنت بدون إنترنت — المصحف المحمّل يفتح عادي.' : (bulk.msg || 'الصفحات اللي بتفتحها أونلاين بتتحفظ تلقائيًا، ويتحمّل 5 بعدها.');
  }

  /* اختيار المصحف: المدينة = القراءة المريحة شغالة، التجويد = الصفحة العادية (وتقدر تغيّرها من «وضع قراءة مريح») */
  function wrapPicker() {
    var open0 = window.openMushafPicker;
    if (typeof open0 === 'function' && !open0._rmo) {
      window.openMushafPicker = function () { var r = open0.apply(this, arguments); render(); return r; };
      window.openMushafPicker._rmo = true;
    }
    var pick0 = window.pickMushaf;
    if (typeof pick0 === 'function' && !pick0._rmo) {
      window.pickMushaf = function (f) {
        try { if (window.RafiqComfort) window.RafiqComfort.setOn(+f === 1); } catch (e) {}
        try {
          if (!online()) scan().then(function (sc) {
            if (!sc[+f === 2 ? 2 : 1].size && typeof window.showQuranUxToast === 'function') window.showQuranUxToast('المصحف ده مش محمّل على جهازك. اتصل بالإنترنت أو حمّله من هنا.');
          });
        } catch (e) {}
        return pick0.apply(this, arguments);
      };
      window.pickMushaf._rmo = true;
    }
  }
  function boot() { wrapPicker(); decorate(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.rmoOpen = function () { if (typeof openMushafPicker === 'function') openMushafPicker(); };
  window.RafiqMushafSmart = { ensure: ensure, scan: scan, downloadAll: downloadAll, open: window.rmoOpen };
})();
