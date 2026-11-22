/* ============================================================
   رفيق المسلم — «القراءة المريحة» لصفحة المصحف
   1) قصّ الهوامش الفاضية تلقائيًا (يكشفها من الصورة نفسها؛ لا يقصّ الإطار ولا الزخرفة)
   2) تكبير تلقائي مريح (١٫٥× افتراضيًا) ويتذكّر اختيارك
   3) صفحة بخلفية داكنة للعين ليلًا، وحركة قلب صفحة هادئة
   كل الاختيارات تُحفظ على الجهاز. يعتمد على quran-zoom.js (RafiqQuranZoom).
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var K_ON = 'rm_cmf_on', K_Z = 'rm_cmf_z', K_NIGHT = 'rm_cmf_night', K_SEEN = 'rm_cmf_seen';
  var MAX_CROP = 0.10;            /* لا نقصّ أكثر من ١٠٪ من أي جهة مهما حدث */
  var st = { on: true, z: 1, night: false };
  var blobs = [];
  var ar = function (n) { return String(n); };
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function isPhone() { return window.matchMedia('(max-width:900px)').matches; }

  var K_FIT = 'rm_cmf_fit_v1';
  function load() {
    var on = lsGet(K_ON); st.on = on === null ? isPhone() : on === '1';   /* افتراضيًا: مفعّل على الموبايل فقط */
    /* مرة واحدة: الصفحة تبدأ بعرض الشاشة كاملًا (١×) بدل تكبير ١٫٥× الذي كان يقصّها عرضًا */
    if (!lsGet(K_FIT)) {
      try { lsSet(K_FIT, '1'); lsSet(K_Z, '1'); lsSet('rm_qz', '1'); } catch (e) {}
      st.z = 1;
    } else {
      var z = parseFloat(lsGet(K_Z)); if (z >= 1 && z <= 4) st.z = z;
    }
    st.night = lsGet(K_NIGHT) === '1';
  }
  function save() { lsSet(K_ON, st.on ? '1' : '0'); lsSet(K_Z, String(st.z)); lsSet(K_NIGHT, st.night ? '1' : '0'); }

  /* ---------------- قصّ الهوامش ---------------- */
  function folderKey() {
    var f = 1; try { if (typeof selectedMushafFolder !== 'undefined') f = selectedMushafFolder === 2 ? 2 : 1; } catch (e) {}
    return 'rm_cmf_crop' + f;
  }
  function readShared() { try { var o = JSON.parse(lsGet(folderKey())); if (o && o.n) return o; } catch (e) {} return null; }
  function detect(img) {
    var nw = img.naturalWidth, nh = img.naturalHeight;
    var sw = Math.min(480, nw), sh = Math.max(1, Math.round(nh * sw / nw));
    var c = document.createElement('canvas'); c.width = sw; c.height = sh;
    var x = c.getContext('2d', { willReadFrequently: true });
    x.fillStyle = '#fff'; x.fillRect(0, 0, sw, sh);      /* الشفاف يصير أبيض */
    x.drawImage(img, 0, 0, sw, sh);
    var d = x.getImageData(0, 0, sw, sh).data;       /* يرمي خطأ إن كانت الصورة من موقع آخر بدون CORS ← نتجاهل القصّ */
    /* لون الخلفية = متوسط الزوايا الأربع */
    var bg = [0, 0, 0], cnt = 0, S = 5;
    [[0, 0], [sw - S, 0], [0, sh - S], [sw - S, sh - S]].forEach(function (p) {
      for (var yy = 0; yy < S; yy++) for (var xx = 0; xx < S; xx++) {
        var i = ((p[1] + yy) * sw + p[0] + xx) * 4; bg[0] += d[i]; bg[1] += d[i + 1]; bg[2] += d[i + 2]; cnt++;
      }
    });
    bg = bg.map(function (v) { return v / cnt; });
    var rows = new Uint16Array(sh), cols = new Uint16Array(sw);
    for (var y = 0; y < sh; y++) for (var xp = 0; xp < sw; xp++) {
      var j = (y * sw + xp) * 4;
      if (Math.abs(d[j] - bg[0]) + Math.abs(d[j + 1] - bg[1]) + Math.abs(d[j + 2] - bg[2]) > 110) { rows[y]++; cols[xp]++; }
    }
    var rt = Math.max(2, sw * 0.006), ct = Math.max(2, sh * 0.006);
    var t = 0, b = sh - 1, l = 0, r = sw - 1;
    while (t < sh && rows[t] < rt) t++;
    while (b > t && rows[b] < rt) b--;
    while (l < sw && cols[l] < ct) l++;
    while (r > l && cols[r] < ct) r--;
    if (t >= b || l >= r) return null;
    var padX = 0.012, padY = 0.01;
    var f = { l: l / sw - padX, r: 1 - (r + 1) / sw - padX, t: t / sh - padY, b: 1 - (b + 1) / sh - padY };
    for (var k in f) f[k] = Math.max(0, Math.min(MAX_CROP, f[k]));
    return f;
  }
  function crop(img) {
    if (img.dataset.rmc) return;
    var f; try { f = detect(img); } catch (e) { img.dataset.rmc = 'x'; return; }
    if (!f) { img.dataset.rmc = 'x'; return; }
    /* قصّ موحّد لكل الصفحات: أصغر قصّ رأيناه، حتى لا يتغيّر حجم الحرف من صفحة لأخرى */
    var sh = readShared();
    if (sh) { sh.l = Math.min(sh.l, f.l); sh.r = Math.min(sh.r, f.r); sh.t = Math.min(sh.t, f.t); sh.b = Math.min(sh.b, f.b); sh.n++; }
    else sh = { l: f.l, r: f.r, t: f.t, b: f.b, n: 1 };
    lsSet(folderKey(), JSON.stringify(sh));
    if (sh.l + sh.r < 0.02 && sh.t + sh.b < 0.02) { img.dataset.rmc = 'x'; return; }   /* لا شيء يستحق القصّ */
    var nw = img.naturalWidth, nh = img.naturalHeight;
    var sx = Math.round(sh.l * nw), sy = Math.round(sh.t * nh);
    var cw = Math.round(nw * (1 - sh.l - sh.r)), ch = Math.round(nh * (1 - sh.t - sh.b));
    var scale = Math.min(1, 2000 / cw);
    var c = document.createElement('canvas'); c.width = Math.round(cw * scale); c.height = Math.round(ch * scale);
    var x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
    x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
    x.drawImage(img, sx, sy, cw, ch, 0, 0, c.width, c.height);
    img.dataset.rmc = 'pending'; img.dataset.rmcOrig = img.currentSrc || img.src;
    img.style.opacity = '0';
    var done = function (blob) {
      if (!blob || !img.isConnected) { img.style.opacity = ''; img.dataset.rmc = 'x'; return; }
      var u = URL.createObjectURL(blob); blobs.push(u); while (blobs.length > 6) URL.revokeObjectURL(blobs.shift());
      img.dataset.rmc = 'done'; img.src = u;
    };
    try { c.toBlob(function (b) { b ? done(b) : c.toBlob(done, 'image/jpeg', 0.94); }, 'image/webp', 0.94); } catch (e) { done(null); }
  }
  function uncrop() {
    var img = $('mushafImg'); if (!img) return;
    if (img.dataset.rmc === 'done' && img.dataset.rmcOrig) { img.dataset.rmc = 'x'; img.src = img.dataset.rmcOrig; }
  }

  document.addEventListener('load', function (e) {
    var t = e.target; if (!t || t.id !== 'mushafImg') return;
    if (t.dataset.rmc === 'done') { t.style.opacity = ''; return; }           /* وصلت الصورة المقصوصة */
    if (st.on && t.naturalWidth > 100) crop(t);
  }, true);

  /* ---------------- حالة التكبير والمظهر ---------------- */
  function Z() { return window.RafiqQuranZoom; }
  function applyZoom(quiet) { var zz = Z(); if (zz) zz.set(st.on ? st.z : 1, quiet !== false); }
  function applyNight() { document.documentElement.classList.toggle('rm-night', st.night); }
  function labelZ(v) { return v <= 1.05 ? 'عادي' : v < 1.4 ? 'قليلًا' : v < 1.8 ? 'مريح' : v < 2.3 ? 'كبير' : 'كبير جدًا'; }

  /* ---------------- الواجهة ---------------- */
  var css = '\
#rmcSheet{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));max-height:88dvh;overflow:auto;transform:translate(-50%,16px);width:min(94vw,400px);z-index:3100;direction:rtl;background:#fffdf0;color:#3a2a00;border:2px solid #b8912a;border-radius:24px;padding:16px;box-shadow:0 22px 60px rgba(0,0,0,.5);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;font-family:Tajawal,sans-serif}\
#rmcSheet.open{opacity:1;pointer-events:auto;transform:translate(-50%,0)}\
body.dark-mode #rmcSheet{background:#13203a;color:#f3ecd2;border-color:rgba(212,175,55,.7)}\
.rmc-h{display:flex;justify-content:space-between;align-items:center;font-weight:900;font-size:1.15rem;margin-bottom:12px}\
.rmc-x{border:0;background:rgba(212,175,55,.22);color:inherit;width:42px;height:42px;border-radius:50%;font-size:1.1rem;cursor:pointer}\
.rmc-row{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:rgba(212,175,55,.13);cursor:pointer;margin-bottom:10px;-webkit-tap-highlight-color:transparent}\
.rmc-row .t{flex:1;font-weight:800;font-size:1rem;line-height:1.5}.rmc-row .t small{display:block;font-weight:600;opacity:.8;font-size:.8rem}\
.rmc-sw{width:58px;height:34px;border-radius:999px;background:#8a8a8a;position:relative;flex:0 0 58px;transition:background .2s}\
.rmc-sw::after{content:"";position:absolute;top:4px;right:4px;width:26px;height:26px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 2px 4px rgba(0,0,0,.4)}\
.rmc-row.on .rmc-sw{background:#2d9a4a}.rmc-row.on .rmc-sw::after{transform:translateX(-24px)}\
.rmc-sizes{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:2px 0 10px}\
.rmc-chip{border:2px solid rgba(184,145,42,.7);background:transparent;color:inherit;border-radius:16px;min-height:66px;font:900 1.15rem Tajawal,sans-serif;cursor:pointer;line-height:1.3}\
.rmc-chip small{display:block;font-weight:700;opacity:.75;font-size:.8rem}\
.rmc-chip.on{background:linear-gradient(135deg,#f6dc8c,#c9972b);color:#2a1c00;border-color:#8a6414}\
.rmc-tip{font-size:.82rem;line-height:1.8;opacity:.85;padding:2px 4px}\
#rmcSheet.off .rmc-sizes,#rmcSheet.off .rmc-tip.z{opacity:.4;pointer-events:none}\
';
  /* قلب الصفحة + الصفحة الداكنة (يُضافان في ملف الـ CSS المرفق) */
  var stl = document.createElement('style'); stl.id = 'rmc-css'; stl.textContent = css; document.head.appendChild(stl);

  function build() {
    if ($('rmcSheet')) return;
    var sh = document.createElement('div'); sh.id = 'rmcSheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-label', 'القراءة المريحة');
    sh.innerHTML =
      '<div class="rmc-h"><span>👓 القراءة المريحة</span><button class="rmc-x" id="rmcX" aria-label="إغلاق">✕</button></div>' +
      '<div class="rmc-row" id="rmcOn" role="switch" tabindex="0"><div class="t">القراءة المريحة<small>تقصّ الهوامش الفاضية وتكبّر الصفحة تلقائيًا</small></div><div class="rmc-sw"></div></div>' +
      '<div class="rmc-sizes" id="rmcSizes">' +
        '<button class="rmc-chip" data-z="1.25">مريح قليلًا<small>1.25×</small></button>' +
        '<button class="rmc-chip" data-z="1.5">مريح<small>1.5×</small></button>' +
        '<button class="rmc-chip" data-z="2">كبير<small>2×</small></button>' +
        '<button class="rmc-chip" data-z="2.5">كبير جدًا<small>2.5×</small></button>' +
      '</div>' +
      '<div class="rmc-row" id="rmcNight" role="switch" tabindex="0"><div class="t">🌙 صفحة داكنة للعين<small>خلفية سوداء وكتابة فاتحة، مريحة ليلًا</small></div><div class="rmc-sw"></div></div>' +
      '<div class="rmc-row" id="rmcFull" role="button" tabindex="0"><div class="t">⛶ ملء الشاشة<small>الصفحة وحدها بدون أي شريط (أو اضغط على الصفحة مرتين)</small></div><span style="font-size:1.6rem">‹</span></div>' +
      '<div class="rmc-tip z">اسحب بإصبعك لأعلى وأسفل لتقرأ الصفحة، ولليمين واليسار عند التكبير. ضغطتان على الصفحة = ملء الشاشة.</div>';
    document.body.appendChild(sh);
    $('rmcX').onclick = function () { sh.classList.remove('open'); };
    document.addEventListener('click', function (e) { if (sh.classList.contains('open') && !sh.contains(e.target) && !(e.target.closest && e.target.closest('#qtComfortBtn'))) sh.classList.remove('open'); });
    var tog = function (id, fn) { var el = $(id); el.onclick = fn; el.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } }; };
    tog('rmcOn', function () { setOn(!st.on); });
    tog('rmcFull', function () { sh.classList.remove('open'); if (typeof window._toggleImmersive === 'function') window._toggleImmersive(); else { var r = $('readerView'); if (r) r.classList.toggle('immersive'); } });
    tog('rmcNight', function () { st.night = !st.night; save(); applyNight(); sync(); });
    Array.prototype.forEach.call(sh.querySelectorAll('.rmc-chip'), function (c) {
      c.onclick = function () { st.z = parseFloat(c.getAttribute('data-z')); if (!st.on) st.on = true; save(); applyZoom(true); reloadCrop(); sync(); };
    });
  }
  function reloadCrop() { var img = $('mushafImg'); if (img && st.on && img.dataset.rmc !== 'done' && img.complete) { img.dataset.rmc = ''; crop(img); } }
  function setOn(v) {
    st.on = !!v; save();
    if (st.on) { applyZoom(true); reloadCrop(); } else { applyZoom(true); uncrop(); }
    sync();
  }
  function sync() {
    var sh = $('rmcSheet'); if (!sh) return;
    sh.classList.toggle('off', !st.on);
    $('rmcOn').classList.toggle('on', st.on); $('rmcOn').setAttribute('aria-checked', st.on ? 'true' : 'false');
    $('rmcNight').classList.toggle('on', st.night); $('rmcNight').setAttribute('aria-checked', st.night ? 'true' : 'false');
    Array.prototype.forEach.call(sh.querySelectorAll('.rmc-chip'), function (c) { c.classList.toggle('on', st.on && Math.abs(parseFloat(c.getAttribute('data-z')) - st.z) < 0.01); });
    var cb = $('qtComfortBtn'); if (cb) cb.title = st.on ? 'القراءة المريحة: ' + labelZ(st.z) + ' ' + ar(st.z) + '×' : 'القراءة المريحة: مغلقة';
  }
  function tick() {
    var rv = $('readerView');
    var vis = rv && getComputedStyle(rv).display !== 'none' && !rv.classList.contains('immersive');
    if (!vis) { var s = $('rmcSheet'); if (s) s.classList.remove('open'); }
  }

  /* قلب الصفحة بحركة هادئة: الصفحة التالية تدخل من اليسار والسابقة من اليمين */
  function wrapNav() {
    var o = window.changePage; if (typeof o !== 'function' || o._rmc) return;
    window.changePage = function (d) { document.documentElement.setAttribute('data-rm-dir', d > 0 ? 'n' : 'p'); return o.apply(this, arguments); };
    window.changePage._rmc = true;
  }

  function boot() {
    load(); build(); applyNight(); wrapNav(); sync();
    if (st.on) setTimeout(function () { applyZoom(true); }, 60);
    setInterval(tick, 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.rmcToggle = function () { build(); var s = $('rmcSheet'); if (s) { sync(); s.classList.toggle('open'); } };
  window.RafiqComfort = { get: function () { return { on: st.on, z: st.z, night: st.night }; }, setOn: setOn };
})();
