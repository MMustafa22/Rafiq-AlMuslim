/* ============================================================
   رفيق المسلم — مؤقت النوم + تكرار الآيات (لتلاوة القارئ)
   ------------------------------------------------------------
   1) مؤقت النوم: 10/15/30/45/60/90 دقيقة أو "عند نهاية السورة".
      عند الانتهاء يخفض الصوت تدريجيًا ثم يوقف التلاوة نهائيًا
      (ولا يجعل منظومة الاسترجاع تعيد تشغيلها).
   2) تكرار الآية: يكرّر الآية الحالية (أو 3/5 آيات متتالية) 2/3/5/10 مرات
      أو بلا حد — للحفظ والتدبّر. يعتمد على توقيتات دقيقة للقارئ؛ فإن لم تتوفر
      لقارئ بعينه يُبلَّغ المستخدم ولا يُفعَّل (لأن التكرار التقريبي يقطع الآيات).
   زر "تكرار الصفحة" القديم (قراءة TTS) لم يُمَس.
   ============================================================ */
(function () {
  'use strict';
  if (window.RFQ_AUDIO_EXTRAS) return;

  var ap = null;
  function $(id) { return document.getElementById(id); }
  function AR(n) { try { return Number(n).toLocaleString('en-US'); } catch (e) { return String(n); } }
  function toast(msg) {
    try {
      var el = $('rfqAxToast');
      if (!el) {
        el = document.createElement('div'); el.id = 'rfqAxToast'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
        document.body.appendChild(el);
      }
      el.textContent = msg; el.classList.add('show');
      clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('show'); }, 3200);
    } catch (e) {}
  }

  /* ---------------------------------------------------------- */
  /* مؤقت النوم                                                  */
  /* ---------------------------------------------------------- */
  var sleep = { deadline: 0, endOfSurah: false, timer: 0, tick: 0, fading: false, savedVol: 1 };

  function sleepActive() { return !!(sleep.deadline || sleep.endOfSurah); }

  function clearSleep(silent) {
    if (sleep.timer) clearTimeout(sleep.timer);
    if (sleep.tick) clearInterval(sleep.tick);
    sleep.timer = 0; sleep.tick = 0; sleep.deadline = 0; sleep.endOfSurah = false;
    if (sleep.fading) { sleep.fading = false; try { if (ap) ap.volume = sleep.savedVol; } catch (e) {} }
    paintButtons();
    if (!silent) toast('تم إلغاء مؤقت النوم');
  }

  function stopForSleep() {
    sleep.fading = false;
    var vol = sleep.savedVol;
    try { if (window.__rfqAudioWant) window.__rfqAudioWant(false); } catch (e) {}
    try { if (ap && !ap.paused) ap.pause(); } catch (e) {}
    try { if (ap) ap.volume = vol; } catch (e) {}
    if (sleep.timer) clearTimeout(sleep.timer);
    if (sleep.tick) clearInterval(sleep.tick);
    sleep.timer = 0; sleep.tick = 0; sleep.deadline = 0; sleep.endOfSurah = false;
    paintButtons();
    toast('🌙 تم إيقاف التلاوة بمؤقت النوم. تصبح على خير');
  }

  function fadeThenStop(ms) {
    if (!ap || sleep.fading) return;
    sleep.fading = true; sleep.savedVol = (typeof ap.volume === 'number') ? ap.volume : 1;
    var start = Date.now(), v0 = sleep.savedVol, total = Math.max(300, ms || 8000);
    var iv = setInterval(function () {
      if (!sleep.fading) { clearInterval(iv); return; }
      var k = Math.min(1, (Date.now() - start) / total);
      try { ap.volume = Math.max(0, v0 * (1 - k)); } catch (e) {}
      if (k >= 1) { clearInterval(iv); stopForSleep(); }
    }, 120);
  }

  function checkDeadline() {
    if (sleep.deadline && Date.now() >= sleep.deadline - 8000 && !sleep.fading) fadeThenStop(Math.max(300, sleep.deadline - Date.now()));
    paintButtons();
  }

  function startSleep(minutes, opts) {
    opts = opts || {};
    clearSleep(true);
    if (minutes === 'surah') {
      sleep.endOfSurah = true;
      toast('⏲ ستتوقف التلاوة عند نهاية هذه السورة');
    } else {
      var ms = Number(minutes) * 60000;
      if (!isFinite(ms) || ms <= 0) return;
      sleep.deadline = Date.now() + ms;
      /* الاعتماد على Date.now حتى لا يفسد تقييد المؤقتات في الخلفية الحساب */
      sleep.timer = setTimeout(checkDeadline, Math.max(0, ms - 8000));
      sleep.tick = setInterval(checkDeadline, opts.tickMs || 1000);
      toast('⏲ ستتوقف التلاوة بعد ' + AR(minutes) + ' دقيقة');
    }
    paintButtons();
  }

  /* "عند نهاية السورة": نمنع الانتقال التلقائي للسورة التالية عند ended فقط */
  function wrapGoSurah() {
    var orig = window.mpGoSurah;
    if (typeof orig !== 'function' || orig.__rfqAx) return;
    var wrapped = function () {
      if (sleep.endOfSurah && ap && ap.ended) { stopForSleep(); return; }
      return orig.apply(this, arguments);
    };
    wrapped.__rfqAx = true;
    window.mpGoSurah = wrapped;
  }

  /* ---------------------------------------------------------- */
  /* تكرار الآيات                                                */
  /* ---------------------------------------------------------- */
  var rep = { on: false, surah: 0, from: 0, to: 0, total: 0, left: 0, inf: false, start: 0, end: 0, iv: 0, busy: false };

  function currentSurah() { return ap ? parseInt(ap.getAttribute('data-surah') || '0', 10) : 0; }
  function currentAyah() {
    try {
      var S = window.__rmAudioSync, s = currentSurah();
      if (!S || !s || !ap) return 0;
      var p = S.exactAt(s, ap.currentTime || 0);
      return p && p.ayah ? p.ayah : 0;
    } catch (e) { return 0; }
  }

  function stopRepeat(silent) {
    if (rep.iv) clearInterval(rep.iv);
    rep.iv = 0;
    var was = rep.on; rep.on = false; rep.left = 0; rep.inf = false;
    paintButtons();
    if (was && !silent) toast('تم إيقاف التكرار');
  }

  function startRepeat(count, span) {
    var S = window.__rmAudioSync;
    if (!ap || !S || !S.ayahBounds) { toast('التكرار غير متاح الآن'); return; }
    if (ap.paused && !(ap.currentTime > 0)) { toast('شغّل التلاوة أولًا ثم اختر التكرار'); return; }
    var surah = currentSurah(), ayah = currentAyah();
    if (!surah || !ayah) {
      /* لا توقيت دقيق لهذا القارئ/السورة: التكرار التقريبي سيقطع الآيات، فلا نفعّله */
      toast('تكرار الآية يحتاج توقيتًا دقيقًا، وهو غير متوفر لهذا القارئ أو هذه السورة. جرّب قارئًا آخر مثل الحصري أو المنشاوي أو العفاسي.');
      return;
    }
    var total = 0;
    try { total = window.RFQ_AYAH_LEN[surah - 1].length; } catch (e) { total = 0; }
    var to = Math.min(ayah + span - 1, total || (ayah + span - 1));
    var b = S.ayahBounds(surah, ayah, to);
    if (!b) { toast('تعذّر تحديد حدود الآية بدقة لهذا القارئ.'); return; }
    stopRepeat(true);
    rep.on = true; rep.surah = surah; rep.from = ayah; rep.to = to; rep.total = total;
    rep.start = b.start; rep.end = b.end;
    rep.inf = (count === 'inf'); rep.left = rep.inf ? 0 : Number(count);
    try { if (window.__rmAudioSync) ap.currentTime = rep.start; } catch (e) {}
    try { var pr = ap.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
    rep.iv = setInterval(repeatTick, 70);
    paintButtons();
    toast('🔂 تكرار ' + (to > ayah ? 'الآيات ' + AR(ayah) + '–' + AR(to) : 'الآية ' + AR(ayah)) + ' ' + (rep.inf ? 'بلا حد' : AR(rep.left) + ' مرات'));
  }

  function repeatTick() {
    if (!rep.on || !ap) return;
    /* تغيّرت السورة أو بدّل المستخدم موضع التشغيل بعيدًا عن النطاق: ألغِ التكرار */
    if (currentSurah() !== rep.surah) { stopRepeat(); return; }
    if (ap.paused || ap.seeking) return;
    var t = ap.currentTime || 0;
    if (t < rep.start - 1.2 || t > rep.end + 1.2) { stopRepeat(); return; }
    if (t >= rep.end - 0.08) {
      if (rep.inf || rep.left > 1) {
        if (!rep.inf) rep.left--;
        try { ap.currentTime = rep.start; } catch (e) {}
        paintButtons();
      } else {
        /* آخر مرة اكتملت: أنهِ التكرار واترك التلاوة تكمل */
        stopRepeat(true);
        toast('✔ اكتمل التكرار، وتستمر التلاوة');
      }
    }
  }

  /* ---------------------------------------------------------- */
  /* الواجهة                                                     */
  /* ---------------------------------------------------------- */
  var ICON_MOON = '<svg class="mp-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12.3 3a9 9 0 1 0 8.7 11.7A7.5 7.5 0 0 1 12.3 3z"/></svg>';
  var ICON_ONE = '<svg class="mp-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/><path d="M10.2 9.4l2-1.2h1.3v7.6h-1.7v-5.6l-1 .6z"/></svg>';

  function paintButtons() {
    var sb = $('mpSleep'), rb = $('mpAyahRepeat');
    if (sb) {
      var txt = '';
      if (sleep.deadline) {
        var left = Math.max(0, sleep.deadline - Date.now());
        txt = AR(Math.ceil(left / 60000)) + 'د';
      } else if (sleep.endOfSurah) txt = 'السورة';
      sb.classList.toggle('ax-on', sleepActive());
      var bd = sb.querySelector('.ax-badge'); if (bd) { bd.textContent = txt; bd.style.display = txt ? '' : 'none'; }
      sb.title = sleepActive() ? 'مؤقت النوم يعمل — اضغط للتغيير أو الإلغاء' : 'مؤقت النوم';
    }
    if (rb) {
      var rt = rep.on ? (rep.inf ? '∞' : '×' + AR(rep.left)) : '';
      rb.classList.toggle('ax-on', rep.on);
      var b2 = rb.querySelector('.ax-badge'); if (b2) { b2.textContent = rt; b2.style.display = rt ? '' : 'none'; }
      rb.title = rep.on ? 'التكرار يعمل — اضغط للتغيير أو الإيقاف' : 'تكرار الآية';
    }
  }

  var menu = null;
  function closeMenu() { if (menu) { menu.remove(); menu = null; } }
  function openMenu(kind) {
    closeMenu();
    var wrap = document.createElement('div');
    wrap.id = 'rfqAxMenu'; wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true');
    var html = '<div class="ax-sheet"><div class="ax-hd"><b>' + (kind === 'sleep' ? '🌙 مؤقت النوم' : '🔂 تكرار الآيات') + '</b><button type="button" class="ax-x" aria-label="إغلاق">✕</button></div>';
    if (kind === 'sleep') {
      html += '<div class="ax-sub">تتوقف التلاوة تدريجيًا بعد المدة المختارة.</div><div class="ax-grid">';
      [10, 15, 30, 45, 60, 90].forEach(function (m) { html += '<button type="button" data-sleep="' + m + '">' + AR(m) + ' دقيقة</button>'; });
      html += '<button type="button" data-sleep="surah" class="ax-wide">عند نهاية هذه السورة</button></div>';
      if (sleepActive()) html += '<button type="button" class="ax-off" data-sleep="off">إلغاء المؤقت</button>';
    } else {
      html += '<div class="ax-sub">اختر عدد الآيات ثم عدد المرات. يبدأ التكرار من الآية التي تسمعها الآن.</div>' +
        '<div class="ax-lbl">عدد الآيات</div><div class="ax-grid ax-row" data-group="span">' +
        '<button type="button" data-span="1" class="ax-sel">آية واحدة</button><button type="button" data-span="3">3 آيات</button><button type="button" data-span="5">5 آيات</button></div>' +
        '<div class="ax-lbl">عدد المرات</div><div class="ax-grid" data-group="count">';
      [2, 3, 5, 10].forEach(function (n) { html += '<button type="button" data-count="' + n + '">' + AR(n) + ' مرات</button>'; });
      html += '<button type="button" data-count="inf" class="ax-wide">بلا حد (حتى أوقفها)</button></div>';
      if (rep.on) html += '<button type="button" class="ax-off" data-rep="off">إيقاف التكرار</button>';
    }
    html += '</div>';
    wrap.innerHTML = html;
    wrap.addEventListener('click', function (e) {
      var t = e.target;
      if (t === wrap || (t.classList && t.classList.contains('ax-x'))) { closeMenu(); return; }
      if (!t.getAttribute) return;
      var sv = t.getAttribute('data-sleep');
      if (sv) { if (sv === 'off') clearSleep(); else startSleep(sv === 'surah' ? 'surah' : Number(sv)); closeMenu(); return; }
      if (t.getAttribute('data-rep') === 'off') { stopRepeat(); closeMenu(); return; }
      var sp = t.getAttribute('data-span');
      if (sp) { [].forEach.call(wrap.querySelectorAll('[data-span]'), function (b) { b.classList.toggle('ax-sel', b === t); }); return; }
      var ct = t.getAttribute('data-count');
      if (ct) {
        var sel = wrap.querySelector('[data-span].ax-sel'), span = sel ? Number(sel.getAttribute('data-span')) : 1;
        closeMenu(); startRepeat(ct === 'inf' ? 'inf' : Number(ct), span);
      }
    });
    document.body.appendChild(wrap); menu = wrap;
    var f = wrap.querySelector('button[data-sleep],button[data-span]'); if (f) try { f.focus(); } catch (e) {}
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  function injectCss() {
    if ($('rfq-ax-css')) return;
    var st = document.createElement('style'); st.id = 'rfq-ax-css';
    st.textContent =
      '#mpSleep,#mpAyahRepeat{position:relative}' +
      '.mp-btn.ax-on{box-shadow:0 0 0 2px #e7c46a,0 0 14px rgba(231,196,106,.55)!important;color:#f4c95d}' +
      '.ax-badge{position:absolute;top:-7px;left:-5px;min-width:18px;padding:1px 5px;border-radius:999px;background:#e7c46a;color:#241a05;font:800 .56rem/1.5 Tajawal,sans-serif;text-align:center;white-space:nowrap;pointer-events:none}' +
      '#rfqAxMenu{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center;direction:rtl;font-family:Tajawal,sans-serif}' +
      '.ax-sheet{width:100%;max-width:460px;max-height:88dvh;overflow:auto;background:#101b2d;color:#eef4fb;border:1px solid rgba(231,196,106,.35);border-radius:20px 20px 0 0;padding:14px 14px calc(16px + env(safe-area-inset-bottom,0px))}' +
      '.ax-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}.ax-hd b{font-size:1.02rem;color:#f4c95d}' +
      '.ax-x{border:0;background:rgba(255,255,255,.08);color:#fff;width:34px;height:34px;border-radius:10px;font-size:1rem;cursor:pointer}' +
      '.ax-sub{font-size:.76rem;color:#9fb0c3;margin:2px 0 10px;line-height:1.8}.ax-lbl{font-size:.74rem;color:#c7d3e0;font-weight:800;margin:8px 0 5px}' +
      '.ax-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.ax-grid.ax-row{grid-template-columns:repeat(3,1fr)}' +
      '.ax-grid button,.ax-off{min-height:46px;border-radius:13px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#eef4fb;font:800 .84rem Tajawal,sans-serif;cursor:pointer}' +
      '.ax-grid button:active,.ax-off:active{transform:scale(.97)}.ax-wide{grid-column:1/-1}' +
      '.ax-grid button.ax-sel{background:linear-gradient(135deg,#f7dfa2,#e7c46a);color:#241a05;border-color:transparent}' +
      '.ax-off{width:100%;margin-top:10px;border-color:rgba(248,113,113,.5);color:#fca5a5;background:rgba(248,113,113,.1)}' +
      '#rfqAxToast{position:fixed;left:50%;bottom:88px;transform:translate(-50%,12px);z-index:2147483001;max-width:92vw;padding:10px 16px;border-radius:14px;background:rgba(16,27,45,.97);color:#eef4fb;border:1px solid rgba(231,196,106,.45);font:700 .8rem/1.7 Tajawal,sans-serif;text-align:center;opacity:0;pointer-events:none;transition:.25s}' +
      '#rfqAxToast.show{opacity:1;transform:translate(-50%,0)}';
    document.head.appendChild(st);
  }

  function insertButtons() {
    var bar = $('mpControls'); if (!bar) return false;
    if ($('mpSleep') && $('mpAyahRepeat')) return true;
    injectCss();
    var anchor = $('mpRepeat') || bar.lastElementChild;
    function mk(id, label, icon, kind) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mp-btn'; b.id = id; b.title = label; b.setAttribute('aria-label', label);
      b.innerHTML = icon + '<span class="ax-badge" style="display:none"></span>';
      b.addEventListener('click', function () { openMenu(kind); });
      return b;
    }
    var rb = mk('mpAyahRepeat', 'تكرار الآية', ICON_ONE, 'repeat');
    var sb = mk('mpSleep', 'مؤقت النوم', ICON_MOON, 'sleep');
    if (anchor && anchor.parentNode === bar) { bar.insertBefore(rb, anchor.nextSibling); bar.insertBefore(sb, rb.nextSibling); }
    else { bar.appendChild(rb); bar.appendChild(sb); }
    paintButtons();
    return true;
  }

  function boot() {
    ap = $('quranAudioPlayer');
    if (!ap) return;
    insertButtons();
    wrapGoSurah();
    /* لو أُعيد بناء المشغّل لاحقًا أعد إدراج الأزرار */
    var box = $('audioPlayerBox');
    if (box && window.MutationObserver) new MutationObserver(function () { if (!$('mpSleep') || !$('mpAyahRepeat')) insertButtons(); }).observe(box, { childList: true, subtree: true });
    ap.addEventListener('timeupdate', function () { if (sleep.deadline) checkDeadline(); });
    /* المستخدم أوقف التلاوة بنفسه: لا نُبقي تكرارًا معلّقًا */
    ap.addEventListener('emptied', function () { if (rep.on) stopRepeat(true); });
  }

  window.RFQ_AUDIO_EXTRAS = {
    sleep: startSleep, cancelSleep: function () { clearSleep(); }, sleepActive: sleepActive,
    repeat: startRepeat, stopRepeat: stopRepeat, repeatState: function () { return { on: rep.on, left: rep.left, inf: rep.inf, from: rep.from, to: rep.to }; },
    _fade: fadeThenStop
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
