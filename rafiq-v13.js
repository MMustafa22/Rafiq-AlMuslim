/* ============================================================
   رفيق المسلم — تحديثات صفحة القرآن (v13)
   1) هيدر المشغّل قابل للطي: يظهر كاملًا 3 ثوانٍ عند فتح أي صفحة،
      ثم ينكمش إلى شريط اسم السورة + سهم للفتح/الإغلاق يدويًا.
   2) الوضع الأفقي (landscape) على الموبايل: صفحة المصحف بعرض
      الشاشة كاملًا وأزرار التنقل في عمود جانبي مضغوط.
   3) ضغطة مزدوجة في الوضع الأفقي: وضع غمر — الصفحة بالحجم الكبير
      بلا هيدر ولا فوتر ولا أزرار.
   4) إصلاح تباين الوضع النهاري: نصوص الهيدر والشرائح فاتحة
      على خلفيات فاتحة صارت داكنة مقروءة.
   يعتمد على عناصر quran.html: #audioPlayerBox #readerView #navBar
   #pageImageArea #mushafImg .tafseer-btn-wrap
   ============================================================ */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var K_COLLAPSED = 'rm_header_collapsed';   /* تذكّر اختيار المستخدم في فتح/غلق الهيدر */
  var K_LANDSCAPE_BIG = 'rm_landscape_big';  /* تذكّر وضع الغمر في الوضع الأفقي */
  var SHOW_MS = 3000;                        /* مدة ظهور الهيدر الكامل أول مرة */

  /* ============ 1) الهيدر القابل للطي ============ */
  function isCollapsed() {
    try { return localStorage.getItem(K_COLLAPSED) === '1'; } catch (e) { return false; }
  }
  function setCollapsed(v) {
    try { localStorage.setItem(K_COLLAPSED, v ? '1' : '0'); } catch (e) {}
  }

  var css = '' +
/* الهيدر القابل للطي */
'#audioPlayerBox{overflow:hidden}' +
'#audioPlayerBox .mp-unified{transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .35s ease}' +
'#audioPlayerBox.rm-collapsed{padding-top:0!important;padding-bottom:0!important}' +
'#audioPlayerBox.rm-collapsed .mp-unified{max-height:0;opacity:0;pointer-events:none;margin:0}' +
'#audioPlayerBox.rm-collapsed .reciter-notice{display:none!important}' +
'.rm-header-bar{display:flex;align-items:center;gap:8px;padding:7px 12px;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;background:rgba(212,175,55,.08);border-bottom:1px solid rgba(212,175,55,.25)}' +
'body:not(.dark-mode) .rm-header-bar{background:rgba(160,120,32,.08);border-bottom-color:rgba(160,120,32,.22)}' +
'.rm-header-bar .rm-bar-title{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:800;font-size:.92rem;color:var(--gold);direction:rtl}' +
'body:not(.dark-mode) .rm-header-bar .rm-bar-title{color:#6b4a10}' +
'.rm-header-bar .rm-bar-arrow{flex:0 0 auto;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);color:var(--gold);font-size:.85rem;transition:transform .35s ease}' +
'body:not(.dark-mode) .rm-header-bar .rm-bar-arrow{background:rgba(160,120,32,.12);border-color:rgba(160,120,32,.4);color:#7a5010}' +
'#audioPlayerBox.rm-collapsed .rm-bar-arrow{transform:rotate(180deg)}' +
'.rm-header-bar.rm-hidden{display:none}' +
/* أول 3 ثوانٍ: الهيدر الكامل ظاهر ولا يظهر الشريط الصغير */
'#audioPlayerBox.rm-intro .rm-header-bar{display:none}' +
/* العنوان يُعرض في الشريط العلوي فقط: نمنع تكراره في صف الأدوات (نفس النص مرتين) */
'#audioPlayerBox:not(.rm-intro) .current-surah-name{display:none!important}' +

/* --- إصلاح تباين الوضع النهاري (النص الفاتح على خلفية فاتحة) --- */
'body:not(.dark-mode) .mp-progress-row{color:#5a4000!important}' +
'body:not(.dark-mode) .mp-time{color:#5a4000!important}' +
'body:not(.dark-mode) .audio-playback-status{color:#6b4a10;background:rgba(160,120,32,.08);border-color:rgba(160,120,32,.25)}' +
'body:not(.dark-mode) .reader-label{color:#6b4a10!important}' +
'body:not(.dark-mode) .current-surah-name{color:#6b3d00!important}' +
'body:not(.dark-mode) #curatedAudioMenus .curated-audio-label{color:#6b4a10!important}' +
'body:not(.dark-mode) .reciter-coverage{color:#7a5a10!important}' +
'body:not(.dark-mode) .reciter-coverage.partial{color:#8a6a10!important}' +
'body:not(.dark-mode) .rmo-cnt{color:#5a4000!important}' +
'body:not(.dark-mode) #rmoMsg{color:#5a4000!important}' +
'body:not(.dark-mode) .mp-vol-value{color:#5a4000!important}' +
'body:not(.dark-mode) .tafseer-source{color:rgba(100,60,0,.75)!important}' +

/* --- الوضع الأفقي على الموبايل --- */
'@media (max-height:520px) and (orientation:landscape){' +
'  html body .quran-reading-split{grid-template-columns:minmax(0,1fr)!important;max-width:100%!important;padding:0!important;gap:0!important}' +
'  html body .quran-translation-panel{display:none!important}' +
'  html body #readerView{padding-bottom:0!important}' +
'  html body #readerView .page-image-area{min-height:0!important;background:var(--rm-paper,#fffdf5)!important}' +
'  html body #readerView .img-wrapper{min-height:0!important;background:var(--rm-paper,#fffdf5)!important;border-bottom:0!important;box-shadow:none!important;display:flex;align-items:center;justify-content:center}' +
'  html body #readerView .img-wrapper .mushaf-page-img,html body #readerView .img-wrapper.rmz-on .mushaf-page-img{width:100%!important;height:auto!important;max-height:none!important;max-width:100vw!important;object-fit:contain!important;object-position:center!important;margin:0 auto!important}' +
'  html body #readerView.rm-land-hide-img .mushaf-page-img{height:calc(100dvh - 52px)!important}' +
/* الهيدر المنكمش في الأفقي: شريط رفيع واحد فقط */
'  html body #audioPlayerBox{position:relative!important;padding:0!important;border-bottom:1px solid rgba(160,120,32,.25)}' +
'  html body #audioPlayerBox.rm-collapsed{border-bottom:1px solid rgba(160,120,32,.2)}' +
'  html body #audioPlayerBox.rm-intro .mp-unified{max-height:46dvh!important;opacity:1!important;pointer-events:auto!important;overflow:auto}' +
'  html body #audioPlayerBox:not(.rm-intro):not(.rm-collapsed) .mp-unified{max-height:44dvh!important;opacity:1!important;pointer-events:auto!important;overflow:auto}' +
'  html body .rm-header-bar{padding:4px 10px}' +
'  html body .rm-header-bar .rm-bar-title{font-size:.85rem}' +
/* أزرار التنقل الجانبية: عمود مضغوط على حافة الشاشة بجانب الصفحة */
'  html body div#navBar.nav-bar{position:fixed!important;top:50%!important;right:0!important;bottom:auto!important;left:auto!important;transform:translateY(-50%)!important;display:flex!important;flex-direction:column!important;gap:6px;padding:6px 4px!important;width:auto!important;max-width:none!important;min-width:0!important;grid-template-columns:none!important;background:rgba(250,246,235,.96)!important;border:1px solid rgba(160,120,32,.35)!important;border-right:0!important;border-radius:12px 0 0 12px!important;box-shadow:-3px 3px 14px rgba(75,55,20,.18)!important;z-index:900;height:auto!important;min-height:0!important;box-sizing:border-box}' +
'  html body #navBar .nav-btn{flex:none!important;grid-column:auto!important;min-height:44px!important;min-width:46px!important;width:46px!important;max-width:none!important;padding:6px 4px!important;font-size:.68rem!important;border-radius:10px!important;white-space:normal!important;line-height:1.25!important;writing-mode:vertical-rl!important;text-orientation:mixed!important}' +
'  html body #navBar .nav-jump-wrap{width:auto!important;padding:2px!important;border-radius:10px!important}' +
'  html body #navBar .nav-jump-input{width:44px!important;max-width:none!important;height:38px!important;font-size:.9rem!important;padding:2px!important}' +
'  html body #readerView .img-wrapper.rmz-on{overflow:visible!important;justify-content:center!important}' +
'  html body #readerView.rm-land-side .page-image-area,html body #readerView.rm-land-side .img-wrapper{padding-right:0!important}' +
'  html body #readerView.rm-land-side .mushaf-page-img{max-width:calc(100vw - 62px)!important}' +
'  html body .tafseer-btn-wrap{padding:2px 10px 4px;gap:8px}' +
'  html body .tafseer-btn{padding:8px 8px;font-size:.8rem}' +
/* الغمر في الأفقي: لا هيدر ولا فوتر ولا أزرار — الصفحة بالحجم الكبير */
'  html body #readerView.rm-landscape-big #audioPlayerBox{display:none!important}' +
'  html body #readerView.rm-landscape-big #navBar{display:none!important}' +
'  html body #readerView.rm-landscape-big .tafseer-btn-wrap{display:none!important}' +
'  html body #readerView.rm-landscape-big .page-image-area{position:fixed;inset:0;z-index:2500;background:var(--rm-paper,#fffdf5)!important;display:flex;align-items:center;justify-content:center}' +
'  html body #readerView.rm-landscape-big .img-wrapper{width:100vw!important;height:100dvh!important;display:flex!important;align-items:center!important;justify-content:center!important;min-height:0!important;background:var(--rm-paper,#fffdf5)!important}' +
'  html body #readerView.rm-landscape-big .mushaf-page-img{width:100vw!important;height:auto!important;max-height:100dvh!important;max-width:100vw!important;object-fit:contain!important;object-position:center!important}' +
'}' +
/* الغمر على أي شاشة قصيرة */
'@media (max-height:520px) and (orientation:landscape){' +
'  html body #readerView.rm-landscape-big .page-image-area{position:fixed;inset:0;z-index:2500;background:var(--rm-paper,#fffdf5)!important;display:flex;align-items:center;justify-content:center}' +
'  html body #readerView.rm-landscape-big .img-wrapper{width:100vw!important;height:100dvh!important;display:flex!important;align-items:center!important;justify-content:center!important}' +
'  html body #readerView.rm-landscape-big .mushaf-page-img{width:100vw!important;height:auto!important;max-height:100dvh!important;object-fit:contain!important}' +
'}';

  var stl = document.createElement('style'); stl.id = 'rm-v13-css'; stl.textContent = css;
  document.head.appendChild(stl);

  /* بناء شريط اسم السورة مع السهم */
  function buildBar(box) {
    if ($('rmHeaderBar')) return;
    var bar = document.createElement('div');
    bar.className = 'rm-header-bar rm-hidden'; bar.id = 'rmHeaderBar';
    bar.setAttribute('role', 'button');
    bar.setAttribute('aria-label', 'فتح أو إغلاق شريط التلاوة');
    bar.innerHTML = '<span class="rm-bar-title" id="rmBarTitle">📖 القرآن الكريم</span>' +
                    '<span class="rm-bar-arrow" aria-hidden="true">▾</span>';
    box.insertBefore(bar, box.firstChild);
    bar.addEventListener('click', function () { toggleHeader(); });
  }

  function title() {
    try {
      var t = $('currentSurahName');
      if (t && t.textContent) return t.textContent;
    } catch (e) {}
    return '📖 القرآن الكريم';
  }
  function syncBar() {
    var bar = $('rmHeaderBar'), box = $('audioPlayerBox');
    if (!bar || !box) return;
    bar.querySelector('.rm-bar-title').textContent = title();
  }

  function applyState() {
    var box = $('audioPlayerBox'), bar = $('rmHeaderBar');
    if (!box) return;
    var collapsed = box.classList.contains('rm-collapsed');
    if (bar) {
      bar.classList.toggle('rm-hidden', box.classList.contains('rm-intro'));
      bar.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    syncBar();
  }
  function collapse(intro) {
    var box = $('audioPlayerBox'); if (!box) return;
    box.classList.add('rm-collapsed'); box.classList.remove('rm-intro');
    if (!intro) setCollapsed(true);
    applyState();
  }
  function expand() {
    var box = $('audioPlayerBox'); if (!box) return;
    box.classList.remove('rm-collapsed', 'rm-intro');
    setCollapsed(false);
    applyState();
  }
  function toggleHeader() {
    var box = $('audioPlayerBox'); if (!box) return;
    if (box.classList.contains('rm-collapsed')) expand(); else collapse(false);
  }

  /* ظهور أول 3 ثوانٍ عند فتح صفحة، ثم انكمش (ما لم يكن المستخدم فاتح الهيدر بنفسه) */
  var introTimer = null;
  function playIntro() {
    var box = $('audioPlayerBox'); if (!box) return;
    if (isCollapsed()) { collapse(true); return; }
    box.classList.remove('rm-collapsed'); box.classList.add('rm-intro');
    applyState();
    clearTimeout(introTimer);
    introTimer = setTimeout(function () {
      /* لا نطوي المشغّل أبدًا وهو يعمل: الطي أثناء التلاوة كان يخفي أزرار التشغيل
         فيظن المستخدم أن الصوت لا يعمل (خصوصًا في الفاتحة أول المصحف). */
      var ap = $('quranAudioPlayer');
      if (ap && !ap.paused && !ap.ended) { applyState(); return; }
      collapse(true);
    }, SHOW_MS);
  }
  /* لو المستخدم فتح الهيدر يدويًا أثناء الثلاث ثوانٍ نلغي المؤقت */
  document.addEventListener('click', function (e) {
    if (!introTimer) return;
    var box = $('audioPlayerBox');
    if (box && box.contains(e.target) && !e.target.closest('.rm-header-bar')) {
      clearTimeout(introTimer); introTimer = null;
      box.classList.remove('rm-intro'); setCollapsed(false); applyState();
    }
  });

  /* لف loadPage الأصلي: شغّل العدّاد مع كل صفحة جديدة */
  function wrapLoadPage() {
    var o = window.loadPage;
    if (typeof o !== 'function' || o._rmv13) return;
    var wrapped = function (p) {
      var r = o.apply(this, arguments);
      playIntro(); syncBar();
      return r;
    };
    wrapped._rmv13 = true;
    window.loadPage = wrapped;
  }

  /* تحديث اسم السورة في الشريط عند تغيّره (المشغل يغيّر النص داخليًا) */
  function watchTitle() {
    var t = $('currentSurahName');
    if (!t || typeof MutationObserver === 'undefined') return;
    new MutationObserver(function () { syncBar(); }).observe(t, { childList: true, characterData: true, subtree: true });
  }

  /* ============ 2) + 3) الوضع الأفقي والغمر بالضغط المزدوج ============ */
  function isLandscape() {
    return window.matchMedia('(orientation:landscape)').matches;
  }
  function isLandscapePhone() {
    return window.matchMedia('(max-height:520px) and (orientation:landscape)').matches;
  }
  function bigSaved() {
    try { return localStorage.getItem(K_LANDSCAPE_BIG) === '1'; } catch (e) { return false; }
  }
  function setBigSaved(v) {
    try { localStorage.setItem(K_LANDSCAPE_BIG, v ? '1' : '0'); } catch (e) {}
  }
  function applyBig(on) {
    var rv = $('readerView'); if (!rv) return;
    rv.classList.toggle('rm-landscape-big', !!on);
    setBigSaved(!!on);
    try { if (window._showZoomBadge) window._showZoomBadge(on ? 'وضع القراءة بالعرض الكامل — اضغط مرتين للعودة' : 'تم الرجوع للعرض العادي'); } catch (e) {}
  }
  /* ============ ضغطتان → البوابة الموحّدة ============
     بدل نظام غمر منفصل يركب فوق أنظمة أخرى: كل ضغطة مزدوجة تمرّ
     من بوابة quran-zoom (fit) فتبقى الأنظمة في حالة واحدة فقط. */
  function claimGesture() {
    if (typeof window.__rmClaimGesture === 'function') return window.__rmClaimGesture();
    var n = Date.now();
    if (n - (window.__rmGesture || 0) < 800) return false;
    window.__rmGesture = n;
    return true;
  }
  function toggleFitGateway(fromTouch) {
    if (window.RafiqQuranZoom && typeof window.RafiqQuranZoom.fit === 'function') window.RafiqQuranZoom.fit(fromTouch !== false);
    else toggleBig();
  }
  function toggleBig() {
    var rv = $('readerView'); if (!rv) return;
    if (window.RafiqQuranZoom && typeof window.RafiqQuranZoom.fit === 'function') { window.RafiqQuranZoom.fit(false); return; }
    applyBig(!rv.classList.contains('rm-landscape-big'));
  }
  /* الضغط المزدوج داخل منطقة الصفحة يفعّل الغمر في الوضع الأفقي فقط؛
     في الوضع الرأسي نترك السلوك الأصلي (تكبير الصفحة) كما هو */
  var lastTap = 0, lastTapXY = null, tapStart = null, suppressDbl = 0;
  window.addEventListener('touchstart', function (e) {
    if (!isLandscapePhone()) return;
    var a = $('pageImageArea');
    if (!a || !a.contains(e.target)) return;
    if (e.touches.length === 1) tapStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { capture: true, passive: true });
  window.addEventListener('touchend', function (e) {
    if (!isLandscapePhone()) return;
    var a = $('pageImageArea');
    if (!a || !a.contains(e.target)) return;
    var rv = $('readerView'); if (!rv || rv.style.display === 'none') return;
    var ct = e.changedTouches[0], now = Date.now();
    if (tapStart && Math.hypot(ct.clientX - tapStart.x, ct.clientY - tapStart.y) > 24) { tapStart = null; lastTap = 0; return; }
    tapStart = null;
    var near = lastTapXY && Math.hypot(ct.clientX - lastTapXY.x, ct.clientY - lastTapXY.y) < 120;
    if (now - lastTap < 350 && near) {
      e.stopPropagation(); e.preventDefault();
      lastTap = 0; suppressDbl = Date.now() + 700;
      if (claimGesture()) toggleFitGateway(true); /* إذا سبقها نظام آخر اتركها له — لا تكرار */
    } else { lastTap = now; lastTapXY = { x: ct.clientX, y: ct.clientY }; }
  }, { capture: true, passive: false });
  window.addEventListener('dblclick', function (e) {
    if (!isLandscapePhone()) return;
    var a = $('pageImageArea');
    if (!a || !a.contains(e.target)) return;
    /* إما مضغطة مُركّبة بعد لمسة، أو إيماءة احتُسبت للتو: ابتلعها ولا تكرّر الوضع */
    if (Date.now() < suppressDbl || Date.now() - (window.__rmGesture || 0) < 800) { e.preventDefault(); e.stopPropagation(); return; }
    e.preventDefault(); e.stopPropagation();
    if (claimGesture()) toggleFitGateway(false);
  }, true);
  /* عند تدوير الجهاز: طبّق الوضع المحفوظ في الأفقي، وألغِ الغمر في الرأسي */
  function onOrient() {
    var rv = $('readerView'); if (!rv) return;
    if (rv.style.display === 'none') return;
    if (isLandscapePhone()) {
      rv.classList.add('rm-land-side');
      if (bigSaved()) rv.classList.add('rm-landscape-big');
    } else {
      rv.classList.remove('rm-land-side', 'rm-landscape-big');
    }
  }
  window.addEventListener('orientationchange', function () { setTimeout(onOrient, 250); });
  window.addEventListener('resize', function () { onOrient(); });

  /* ============ التشغيل ============ */
  function boot() {
    var box = $('audioPlayerBox'), rv = $('readerView');
    if (!box || !rv) return;
    buildBar(box);
    if (isCollapsed()) collapse(true);
    /* إذا بدأ التشغيل والمشغّل مطوي، افتحه تلقائيًا لتصبح أزرار التحكم ظاهرة */
    var apEl = $('quranAudioPlayer');
    if (apEl) apEl.addEventListener('play', function () {
      var b = $('audioPlayerBox');
      if (b && b.classList.contains('rm-collapsed')) { b.classList.remove('rm-collapsed', 'rm-intro'); applyState(); }
    });
    wrapLoadPage();
    watchTitle();
    onOrient();
    /* أول دخول لصفحة القراءة (بدون loadPage مباشر) */
    var seen = setInterval(function () {
      if (rv.style.display !== 'none') { clearInterval(seen); playIntro(); syncBar(); }
    }, 300);
    setTimeout(function () { clearInterval(seen); }, 20000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  window.RafiqV13 = {
    toggleHeader: toggleHeader,
    collapse: collapse,
    expand: expand,
    toggleBig: toggleBig,
    /* يُستدعى من بوابة quran-zoom (__rmFitHook) لتزامن وضع الأفقي الكبير
       مع الغمر: bigSaved يتبع حالة الوضع، والكلاس فقط في الأفقي القصير */
    setBig: function (on) {
      var rv = $('readerView'); if (!rv) return;
      setBigSaved(!!on);
      rv.classList.toggle('rm-landscape-big', !!on && isLandscapePhone());
    },
    isBig: function () { var rv = $('readerView'); return !!(rv && rv.classList.contains('rm-landscape-big')); }
  };
})();
