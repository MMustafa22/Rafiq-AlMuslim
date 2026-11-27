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

  /* الأنماط انتقلت إلى rafiq-mushaf.css (ملف واحد لكل طبقات المصحف) */

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
    if (e.touches.length === 1) tapStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), fling: (Date.now() - (window.__rmLastScrollAt || 0)) < 160 };
  }, { capture: true, passive: true });
  window.addEventListener('touchend', function (e) {
    if (!isLandscapePhone()) return;
    var a = $('pageImageArea');
    if (!a || !a.contains(e.target)) return;
    var rv = $('readerView'); if (!rv || rv.style.display === 'none') return;
    var ct = e.changedTouches[0], now = Date.now();
    /* ليست ضغطة: حركة، أو لمسة طويلة، أو لمسة أوقفت تمريرًا جاريًا (شائعة في التمرير الأفقي الطويل) */
    if (tapStart && (Math.hypot(ct.clientX - tapStart.x, ct.clientY - tapStart.y) > 24 || now - tapStart.t > 350 || tapStart.fling)) { tapStart = null; lastTap = 0; return; }
    tapStart = null;
    var near = lastTapXY && Math.hypot(ct.clientX - lastTapXY.x, ct.clientY - lastTapXY.y) < 70;
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
