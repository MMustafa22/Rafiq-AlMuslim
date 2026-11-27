/* ============================================================
   رفيق المسلم — تكبير المصحف لكبار السن (واضح وسهل)
   - زر «تكبير» كبير دائم داخل القارئ + لوحة بأزرار ضخمة
   - ثلاثة أحجام جاهزة: عادي / كبير / كبير جدًا
   - قرص بإصبعين (Pinch) + ضغطتان سريعتان + أزرار + / - من الكيبورد
   - الوضع المريح: أزرار تنقّل أكبر + تفسير بخط أكبر
   - يتذكّر اختيارك
   ============================================================ */
(function () {
  'use strict';
  var KZ = 'rm_qz', KE = 'rm_qz_easy', KH = 'rm_qz_hint';
  var MIN = 1, MAX = 4, STEP = 0.25, SNAP_MAX = 1.12;
  var z = 1, easy = false;
  var $ = function (id) { return document.getElementById(id); };
  var ar = function (n) { return String(n); };
  function load() {
    try { var v = parseFloat(localStorage.getItem(KZ)); if (v >= MIN && v <= MAX) z = (v > 1 && v < SNAP_MAX) ? 1 : v; easy = localStorage.getItem(KE) === '1'; } catch (e) {}
  }
  function save() { try { localStorage.setItem(KZ, String(z)); localStorage.setItem(KE, easy ? '1' : '0'); } catch (e) {} }

  /* ---------------- CSS ---------------- */
  /* الأنماط انتقلت إلى rafiq-mushaf.css (ملف واحد لكل طبقات المصحف) */

  /* ---------------- UI ---------------- */
  function build() {
    if ($('rmzDock')) return;
    var d = document.createElement('div'); d.id = 'rmzDock';
    d.innerHTML =
      '<div id="rmzPanel" role="dialog" aria-label="تكبير المصحف">' +
        '<div class="rmz-title"><span>🔍 حجم صفحة المصحف</span><button class="rmz-x" id="rmzClose" aria-label="إغلاق">✕</button></div>' +
        '<div class="rmz-row">' +
          '<button class="rmz-big" id="rmzPlus" aria-label="تكبير">＋</button>' +
          '<div class="rmz-lvl"><b id="rmzLvl">100%</b><span id="rmzLbl">الحجم العادي</span></div>' +
          '<button class="rmz-big" id="rmzMinus" aria-label="تصغير">－</button>' +
        '</div>' +
        '<div class="rmz-presets">' +
          '<button class="rmz-chip" data-z="1">عادي<small>100%</small></button>' +
          '<button class="rmz-chip" data-z="2">كبير<small>200%</small></button>' +
          '<button class="rmz-chip" data-z="3">كبير جدًا<small>300%</small></button>' +
        '</div>' +
        '<div class="rmz-easy" id="rmzEasy" role="switch" aria-checked="false" tabindex="0"><div class="t">👓 الوضع المريح<small>أزرار تنقّل أكبر وتفسير بخط أكبر</small></div><div class="rmz-sw"></div></div>' +
        '<button class="rmz-reset" id="rmzReset">↺ العودة للحجم الأصلي</button>' +
      '</div>' +
      '<button id="rmzMain" aria-label="تكبير الصفحة"><span class="ic">🔍</span><span>تكبير</span></button>';
    document.body.appendChild(d);
    var t = document.createElement('div'); t.id = 'rmzToast'; document.body.appendChild(t);

    $('rmzMain').onclick = function (e) { e.stopPropagation(); $('rmzPanel').classList.toggle('open'); $('rmzMain').classList.remove('pulse'); };
    $('rmzClose').onclick = function () { $('rmzPanel').classList.remove('open'); };
    $('rmzPlus').onclick = function () { setZoom(z + STEP * (z >= 2 ? 2 : 1)); };
    $('rmzMinus').onclick = function () { setZoom(z - STEP * (z > 2 ? 2 : 1)); };
    $('rmzReset').onclick = function () { setZoom(1); };
    Array.prototype.forEach.call(d.querySelectorAll('.rmz-chip'), function (c) { c.onclick = function () { setZoom(parseFloat(c.getAttribute('data-z'))); }; });
    var ez = $('rmzEasy');
    ez.onclick = function () { setEasy(!easy); };
    ez.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEasy(!easy); } };
    document.addEventListener('click', function (e) { var p = $('rmzPanel'); if (p && p.classList.contains('open') && !$('rmzDock').contains(e.target)) p.classList.remove('open'); });
  }

  function toast(m) { var t = $('rmzToast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('show'); }, 2200); }

  function labelFor(v) { return v <= 1.05 ? 'الحجم العادي' : v < 2 ? 'مكبّر قليلًا' : v < 3 ? 'كبير — مريح للقراءة' : 'كبير جدًا'; }

  /* ---------------- التطبيق ---------------- */
  function wrapper() { return $('imgWrapper'); }
  function apply(anchor) {
    var w = wrapper(), area = $('pageImageArea'); if (!w) return;
    var img = w.querySelector('.mushaf-page-img');
    var before = null;
    if (anchor && img) {
      var r = img.getBoundingClientRect();
      before = { x: (w.scrollLeft + w.clientWidth / 2) / Math.max(1, w.scrollWidth), y: (window.innerHeight / 2 - r.top) / Math.max(1, r.height), top: window.scrollY + r.top };
    }
    if (area) area.style.setProperty('--rmz', z);
    w.style.setProperty('--rmz', z);
    w.classList.toggle('rmz-on', z > 1.001);
    document.documentElement.style.setProperty('--rmz-ts', String(1 + Math.min(0.9, (z - 1) * 0.34 + 0.18)));
    requestAnimationFrame(function () {
      if (z <= 1.001) { w.scrollLeft = 0; return; }
      if (before) {
        w.scrollLeft = before.x * w.scrollWidth - w.clientWidth / 2;
        var i2 = w.querySelector('.mushaf-page-img');
        if (i2) { var h = i2.getBoundingClientRect().height; window.scrollTo(0, before.top + before.y * h - window.innerHeight / 2); }
      } else { w.scrollLeft = (w.scrollWidth - w.clientWidth) / 2; }
    });
    var pct = Math.round(z * 100);
    if ($('rmzLvl')) { $('rmzLvl').textContent = ar(pct) + '٪'; $('rmzLbl').textContent = labelFor(z); }
    if ($('rmzPlus')) { $('rmzPlus').disabled = z >= MAX - 0.001; $('rmzMinus').disabled = z <= MIN + 0.001; }
    Array.prototype.forEach.call(document.querySelectorAll('.rmz-chip'), function (c) { c.classList.toggle('on', Math.abs(parseFloat(c.getAttribute('data-z')) - z) < 0.13); });
  }
  function setZoom(v, quiet) {
    v = Math.max(MIN, Math.min(MAX, Math.round(v * 100) / 100));
    z = v; save(); apply(true);
    if (!quiet) toast('🔍 ' + ar(Math.round(z * 100)) + '٪ — ' + labelFor(z));
  }
  function setEasy(on) {
    easy = !!on; save();
    document.documentElement.classList.toggle('rmz-easy', easy);
    var e = $('rmzEasy'); if (e) { e.classList.toggle('on', easy); e.setAttribute('aria-checked', easy ? 'true' : 'false'); }
    toast(easy ? '👓 تم تفعيل الوضع المريح' : 'تم إيقاف الوضع المريح');
  }

  var fitMode = false, zoomBeforeFit = 1, suppressMouseDoubleClickUntil = 0;
  /* ملء الشاشة الحقيقي (يخفي شريط المتصفح) — على الأجهزة التي لا تدعمه (iPhone Safari) يبقى وضع الصفحة الكاملة داخل المتصفح */
  function fsEl() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  /* ملء الشاشة الأصلي للمتصفح يُظهر رسالة سوداء لا يمكن إخفاؤها،
     فنعتمد على وضع الغمر داخل الصفحة (CSS) بدلًا منه. */
  function enterFS() {}
  function exitFS() {}
  /* لو خرج المستخدم من ملء الشاشة بنفسه (Esc أو سحبة الرجوع) نخرج من وضع الصفحة الكاملة أيضًا */
  function onFsChange() {
    if (fsEl() || !fitMode) return;
    var rv = $('readerView');
    if (rv && rv.style.display !== 'none') togglePageFit(false);
    else { fitMode = false; document.documentElement.classList.remove('rmz-fullpage'); }
  }
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);

  /* ============ البوابة الموحّدة لكل الأوضاع ============
     أي مصدر كان (ضغطتان على الصفحة، زر «ملء الشاشة» في ورقة الراحة،
     زر الترجمة، API) — الجميع يمرّ من enterImmersive/exitImmersive
     والخطاف __rmFitHook هنا يزامن: ملء الشاشة الحقيقي + rmz-fullpage
     + حفظ/استعادة التكبير + وضع الأفقي الكبير rm-landscape-big. */
  function claimGesture() {
    var n = Date.now();
    if (n - (window.__rmGesture || 0) < 800) return false; /* إيماءة سابقة ما زالت سارية */
    window.__rmGesture = n;
    return true;
  }
  window.__rmClaimGesture = claimGesture;
  window.__rmFitHook = function (on) {
    on = !!on;
    var was = fitMode;
    if (on && !was) zoomBeforeFit = z;          /* احفظ التكبير قبل دخول الوضع فقط */
    fitMode = on;
    document.documentElement.classList.toggle('rmz-fullpage', on);
    var rv = $('readerView');
    if (rv) rv.classList.remove('immersive-show');
    if (on) { enterFS(); setZoom(1, true); }
    else if (was) { exitFS(); setZoom(zoomBeforeFit, true); }
    try { if (window.RafiqV13 && typeof window.RafiqV13.setBig === 'function') window.RafiqV13.setBig(on); } catch (e) {}
  };

  function togglePageFit(fromTouch) {
    var rv = $('readerView'); if (!rv || rv.style.display === 'none') return;
    var active = !rv.classList.contains('immersive');
    /* المسار الوحيد: enterImmersive/exitImmersive يفعّلان الخطاف __rmFitHook
       فيبقى كل الأنظمة (غمر + ملء شاشة + تكبير + وضع الأفقي) في حالة واحدة */
    if (typeof window.enterImmersive === 'function' && typeof window.exitImmersive === 'function') {
      if (active) window.enterImmersive(); else window.exitImmersive();
    } else {
      rv.classList.toggle('immersive', active);
      if (window.__rmFitHook) window.__rmFitHook(active);
    }
    fitMode = rv.classList.contains('immersive');
    document.documentElement.classList.toggle('rmz-fullpage', fitMode);
    rv.classList.remove('immersive-show');
    if (fromTouch) suppressMouseDoubleClickUntil = Date.now() + 700;
    toast(fitMode ? 'وضع القراءة: الصفحة بملء الشاشة — اضغط مرتين للعودة' : 'تم الرجوع إلى عرض المصحف العادي');
  }

  /* ---------------- اللمس: قرص + ضغطتان + قلب الصفحة ----------------
     قواعد صارمة حتى لا يتحوّل التمرير/السحب إلى تكبير بالخطأ:
       1) القرصة لا تبدأ إلا لو تحرّك الإصبعان معًا في اتجاهين متعاكسين (إبهام ماسك أو
          سحب إصبع واحد أو تمرير بإصبعين لا يُحسب قرصة).
       2) أي تكبير بين 100٪ و112٪ بعد الإيماءة يعود لـ 100٪ (لا تكبير عالق يبتلع سحب قلب الصفحة).
       3) الضغطتان: نافذة 350ms وقرب 70px، وضغطة أوقفت تمريرًا جاريًا لا تُحسب.
       4) لو كانت الصفحة مكبّرة وسحبت عند حافتها يُقلب الصفحة بدل أن لا يحدث شيء.
       5) touchcancel يُنهي القرصة ويثبّت الحالة. */
  var pinch = null, cand = null, lastTap = 0, lastTapXY = null, tapStart = null, one = null, swipeStart = null;
  var lastScrollAt = 0, lastTouchEndAt = 0, multi = false, two = null;   /* multi: الإيماءة الحالية شارك فيها أكثر من إصبع */
  window.__rmLastScrollAt = 0;
  function inArea(t) { var a = $('pageImageArea'); return a && t && a.contains(t); }
  function dist(a, b) { return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); }
  function mid(a, b) { return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }; }
  function snapZ(v) { v = Math.round(v * 20) / 20; return (v > 1 && v < SNAP_MAX) ? 1 : v; }
  function endPinch(msg) {
    var was = pinch; pinch = null; cand = null;
    if (!was) return;
    z = Math.max(MIN, Math.min(MAX, snapZ(z))); save(); apply(true);
    if (msg !== false) toast('🔍 ' + ar(Math.round(z * 100)) + '٪');
  }
  /* آخر مرة تحرّكت فيها الصفحة بالتمرير: لتمييز ضغطة "إيقاف الاندفاع" عن ضغطة حقيقية */
  window.addEventListener('scroll', function (e) {
    var t = e.target;
    if (t === document || (t && t.id === 'imgWrapper')) lastScrollAt = window.__rmLastScrollAt = Date.now();
  }, { capture: true, passive: true });

  window.addEventListener('touchstart', function (e) {
    if (!inArea(e.target)) return;
    var n = e.touches.length, now = Date.now(), w = wrapper();
    if (n === 1) {
      multi = false; two = null;
      pinch = null; cand = null;                       /* لمسة جديدة: لا تُبقِ قرصة قديمة عالقة */
      var t = e.touches[0];
      tapStart = { x: t.clientX, y: t.clientY, t: now, fling: (now - lastScrollAt) < 160 };
      one = { x: t.clientX, y: t.clientY, moved: 0 };
      swipeStart = { x: t.clientX, y: t.clientY, sl: w ? w.scrollLeft : 0 };
      if (z > 1.001) e.stopPropagation();              /* لا تقلّب الصفحة أثناء التحريك */
    } else if (n >= 2) {
      multi = true; tapStart = null; swipeStart = null;
      if (n > 2) { cand = null; return; }
      var a = e.touches[0], b = e.touches[1], d = dist(a, b);
      two = { a0: { x: a.clientX, y: a.clientY }, b0: { x: b.clientX, y: b.clientY }, aL: { x: a.clientX, y: a.clientY }, bL: { x: b.clientX, y: b.clientY } };
      var lim = Math.max(300, 0.7 * window.innerWidth);   /* إبهامان على حافتي الشاشة الأفقية ليسا قرصة */
      if (d < 40 || d > lim || (one && one.moved > 18)) { cand = null; return; }
      cand = { d0: d, m0: mid(a, b), a0: { x: a.clientX, y: a.clientY }, b0: { x: b.clientX, y: b.clientY } };
      e.stopPropagation();
    }
  }, { capture: true, passive: true });

  /* المتصفح يتجاهل التمرير بإصبعين حين يكون التكبير الأصلي ممنوعًا (touch-action). فإن كان
     إبهام ماسك الجهاز وإصبع آخر يسحب نمرّر نحن الصفحة بحركة الإصبع المتحرك. */
  function manualScroll(e, a, b) {
    if (!two || e.touches.length !== 2) return;
    var da = { x: a.clientX - two.aL.x, y: a.clientY - two.aL.y }, db = { x: b.clientX - two.bL.x, y: b.clientY - two.bL.y };
    var sa = Math.hypot(a.clientX - two.a0.x, a.clientY - two.a0.y), sb = Math.hypot(b.clientX - two.b0.x, b.clientY - two.b0.y);
    two.aL = { x: a.clientX, y: a.clientY }; two.bL = { x: b.clientX, y: b.clientY };
    var dx, dy;
    if (sa < 6 && sb >= 6) { dx = db.x; dy = db.y; }          /* a إبهام ثابت: اتبع b */
    else if (sb < 6 && sa >= 6) { dx = da.x; dy = da.y; }     /* b ثابت: اتبع a */
    else { dx = (da.x + db.x) / 2; dy = (da.y + db.y) / 2; }
    if (!dx && !dy) return;
    if (e.cancelable) e.preventDefault();
    var w = wrapper();
    var inner = w && (w.scrollHeight - w.clientHeight > 1) && /(auto|scroll)/.test(getComputedStyle(w).overflowY);
    if (inner) w.scrollTop -= dy; else window.scrollBy(0, -dy);
    if (z > 1.001 && w) w.scrollLeft -= dx;
  }

  window.addEventListener('touchmove', function (e) {
    var n = e.touches.length;
    if (n === 1) {
      if (one) { var t = e.touches[0]; one.moved = Math.max(one.moved, Math.hypot(t.clientX - one.x, t.clientY - one.y)); }
      return;
    }
    if (n !== 2) return;
    var a = e.touches[0], b = e.touches[1];
    if (cand && !pinch) {
      var da = Math.hypot(a.clientX - cand.a0.x, a.clientY - cand.a0.y), db = Math.hypot(b.clientX - cand.b0.x, b.clientY - cand.b0.y);
      var d = dist(a, b), dd = Math.abs(d - cand.d0), m = mid(a, b), dm = Math.hypot(m.x - cand.m0.x, m.y - cand.m0.y);
      if (da >= 8 && db >= 8 && dd >= 14 && dd > 1.3 * dm) pinch = { d: d, z: z };   /* قرصة حقيقية: الإصبعان يتباعدان/يتقاربان معًا */
      else { manualScroll(e, a, b); return; }
    } else if (!cand && !pinch && two) { manualScroll(e, a, b); return; }
    if (pinch) {
      e.preventDefault(); e.stopPropagation();
      var nz = pinch.z * (dist(a, b) / pinch.d);
      nz = Math.max(MIN, Math.min(MAX, nz));
      z = nz; apply(true);
    }
  }, { capture: true, passive: false });

  window.addEventListener('touchend', function (e) {
    lastTouchEndAt = Date.now();
    if (pinch) { if (e.touches.length < 2) endPinch(); e.stopPropagation(); return; }
    if (cand && e.touches.length < 2) cand = null;
    if (multi) {                                  /* إبهام ماسك + إصبع يسحب: لا قلب صفحة ولا ضغطتان */
      if (e.touches.length === 0) { multi = false; two = null; lastTap = 0; }
      if (inArea(e.target)) e.stopPropagation();
      return;
    }
    if (!inArea(e.target)) return;
    var ct = e.changedTouches[0], now = Date.now(), w = wrapper();
    /* مكبّرة وسحبة أفقية واضحة وكانت الصورة عند حافتها في اتجاه السحب (أو التكبير بسيط جدًا): اقلب الصفحة */
    if (z > 1.001 && swipeStart && e.touches.length === 0 && w) {
      var dx = swipeStart.x - ct.clientX, dy = Math.abs(swipeStart.y - ct.clientY);
      if (Math.abs(dx) > 90 && Math.abs(dx) > dy * 1.8 && dy < 80 && typeof window.changePage === 'function') {
        var rtl = getComputedStyle(w).direction === 'rtl', maxL = Math.max(0, w.scrollWidth - w.clientWidth);
        var pos0 = rtl ? -swipeStart.sl : swipeStart.sl, pos1 = rtl ? -w.scrollLeft : w.scrollLeft;
        /* السحب لليسار (dx>0) يحرّك المحتوى نحو الحافة اليمنى: يزيد scrollLeft */
        var atEdgeStart = dx > 0 ? pos0 >= maxL - 2 : pos0 <= 2;
        var atEdgeEnd = dx > 0 ? pos1 >= maxL - 2 : pos1 <= 2;
        var tiny = maxL < 60;                       /* تكبير بسيط: لا فائدة من تحريك الصورة، اقلب الصفحة */
        if ((atEdgeStart && Math.abs(pos1 - pos0) < 2) || (tiny && atEdgeEnd)) {
          e.stopPropagation(); swipeStart = null; tapStart = null; lastTap = 0;
          window.changePage(dx > 0 ? -1 : 1);
          return;
        }
      }
    }
    swipeStart = null;
    if (tapStart) {
      var mv = Math.hypot(ct.clientX - tapStart.x, ct.clientY - tapStart.y), dur = now - tapStart.t, fl = tapStart.fling;
      tapStart = null;
      /* ليست ضغطة: حركة، أو لمسة طويلة، أو لمسة أوقفت تمريرًا جاريًا */
      /* حركة>24: قد تكون سحبة لقلب الصفحة فلا نبتلعها. لمسة ثابتة مرفوضة: نبتلعها حتى لا يحسبها معالج الضغطتين الأصلي في quran.html */
      if (mv > 24 || dur > 350 || fl) { lastTap = 0; if (mv <= 24) e.stopPropagation(); return; }
    }
    var near = lastTapXY && Math.hypot(ct.clientX - lastTapXY.x, ct.clientY - lastTapXY.y) < 70;
    if (now - lastTap < 350 && near) {
      e.stopPropagation(); lastTap = 0;
      if (claimGesture()) togglePageFit(true);
    } else { lastTap = now; lastTapXY = { x: ct.clientX, y: ct.clientY }; e.stopPropagation(); }   /* الضغطات يديرها هذا الملف وحده */
  }, { capture: true, passive: true });

  window.addEventListener('touchcancel', function () {
    tapStart = null; lastTap = 0; one = null; swipeStart = null; cand = null; multi = false; two = null;
    if (pinch) endPinch(false);                         /* ثبّت التكبير ولا تتركه عالقًا */
  }, { capture: true, passive: true });

  window.addEventListener('dblclick', function (e) {
    if (!inArea(e.target)) return;
    /* ضغطة مُركّبة من المتصفح بعد لمسة: اللمس له منطقه الخاص أعلاه، فنتجاهلها */
    if (Date.now() - lastTouchEndAt < 800) { e.preventDefault(); e.stopPropagation(); return; }
    /* ضغطة مُركّبة بعد لمسة (أو إيماءة احتُسبت للتو): ابتلعها ولا تقلب الوضع مرتين */
    if (Date.now() < suppressMouseDoubleClickUntil || !claimGesture()) { e.preventDefault(); e.stopPropagation(); return; }
    e.preventDefault(); e.stopPropagation(); togglePageFit(false);
  }, true);

  /* iPhone/Safari: يتجاهل touch-action للقرص، فنمنع زووم الصفحة الأصلي داخل القارئ */
  ['gesturestart', 'gesturechange'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      var rv = $('readerView');
      if (rv && rv.style.display !== 'none') e.preventDefault();
    }, { passive: false });
  });
  window.addEventListener('keydown', function (e) {
    var rv = $('readerView'); if (!rv || rv.style.display === 'none') return;
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoom(z + STEP); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoom(z - STEP); }
    else if (e.key === '0') { setZoom(1); }
  }, true);
  /* Ctrl + عجلة الماوس على الكمبيوتر */
  window.addEventListener('wheel', function (e) { if (e.ctrlKey && inArea(e.target)) { e.preventDefault(); setZoom(z + (e.deltaY < 0 ? STEP : -STEP), true); } }, { capture: true, passive: false });

  /* ---------------- إظهار الزر داخل القارئ فقط ---------------- */
  function tick() {
    var rv = $('readerView'), d = $('rmzDock'); if (!d) return;
    var vis = rv && rv.style.display !== 'none' && getComputedStyle(rv).display !== 'none' && document.body.style.overflow !== 'hidden';
    d.classList.toggle('show', !!vis);
    if (vis) {
      var w = wrapper(); if (w && (w.classList.contains('rmz-on') !== (z > 1.001) || w.style.getPropertyValue('--rmz') !== String(z))) apply(false);
    } else { var p = $('rmzPanel'); if (p) p.classList.remove('open'); if (fsEl()) exitFS(); }
  }
  function boot() {
    load(); build();
    document.documentElement.classList.toggle('rmz-easy', easy);
    var e = $('rmzEasy'); if (e) { e.classList.toggle('on', easy); e.setAttribute('aria-checked', easy ? 'true' : 'false'); }
    apply(false);
    setInterval(tick, 400);
    /* عند تغيير الصفحة: ابقَ على نفس التكبير وارجع لأعلى الصفحة */
    var w = wrapper();
    if (w) new MutationObserver(function () { requestAnimationFrame(function () { apply(false); }); }).observe(w, { childList: true });
    try {
      if (!localStorage.getItem(KH)) {
        localStorage.setItem(KH, '1');
        setTimeout(function () {
          var rv = $('readerView'); if (rv && rv.style.display !== 'none') {
            toast('اضغط مرتين على الصفحة لوضع القراءة بملء الشاشة، واضغط مرتين للعودة');
          }
        }, 2500);
      }
    } catch (er) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.RafiqQuranZoom = { set: setZoom, get: function () { return z; }, easy: setEasy, fit: function (fromTouch) { togglePageFit(!!fromTouch); }, fitOn: function () { return fitMode; } };
})();
