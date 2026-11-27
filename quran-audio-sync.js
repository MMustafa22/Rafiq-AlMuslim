/* رفيق المسلم — مزامنة التلاوة مع المصحف
   تُفضّل توقيتات MP3Quran الفعلية لكل قارئ/سورة. ملفات JSON محلية اختيارية.
   عند غياب بيانات موثوقة لهذا التسجيل، لا ندّعي الدقة ونستخدم موضعًا تقديريًا.
*/
(function () {
  "use strict";
  var ap = null, wired = false, lastSynced = null, lastAyahG = 0;
  var pageOf = null, surahOffset = null, weightsReady = false, PAUSE = 0;
  var timingCache = Object.create(null), timingPending = Object.create(null);
  var timingFailed = Object.create(null);
  /* reader ID داخل quran.html -> moshaf/read ID في MP3Quran Timing API.
     كل معرّف هنا مُتحقَّق منه فعليًا: حُلَّ عنوان ملف السورة في التطبيق (301) إلى
     عنوان CDN النهائي، وطوبق حرفيًا مع moshaf.server من واجهة mp3quran الرسمية.
     لا تُعدَّل هذه الأرقام بالتخمين: معرّف خاطئ = توقيت تلاوة أخرى = آية غير متزامنة. */
  var MP3QURAN_READ_ID = {
    "15":9, "129":53, "185":106, "197":112, "107":118,
    "121":121, "129001":125, "287":302, "112":4, "48":5,
    "301":12, "217":217, "82":20, "302":33, "30":30,
    "106":31, "305":46, "132":54, "304":81, "178":102,
    "250":107, "227":86, "239":92, "60":241, "10924":10924,
    /* التسجيلات المجودة: لكل قارئ مصحفه المجود المستقل عند mp3quran */
    "900001":10912, "900002":113, "900003":119, "900004":122,
    "900005":288, "900006":51,
    /* شعبان الصياد: ملفّاته تُوجَّه فعليًا إلى مصحف المنشاوي المرتل */
    "129003":112
  };

  function ensureWeights() {
    try {
      if (weightsReady) return true;
      var lens = window.RFQ_AYAH_LEN;
      if (!lens || lens.length !== 114) return false;
      surahOffset = [0]; var acc = 0;
      for (var s = 0; s < lens.length; s++) {
        if (!lens[s] || !lens[s].length) return false;
        acc += lens[s].length; surahOffset.push(acc);
      }
      if (acc !== 6236) return false;
      PAUSE = Number(window.RFQ_AYAH_PAUSE) || 0; weightsReady = true; return true;
    } catch (e) { return false; }
  }
  function ensurePages() {
    try {
      if (pageOf) return true;
      var keys = window.RFQ_PAGE_KEYS;
      if (!keys || !keys.length) return false;
      var map = new Map(), count = 0;
      for (var p = 0; p < keys.length; p++) for (var i = 0; i < (keys[p] || []).length; i++) {
        map.set(keys[p][i][0] * 1000 + keys[p][i][1], p + 1); count++;
      }
      if (count !== 6236) return false;
      pageOf = map; return true;
    } catch (e) { return false; }
  }
  function mappedPosition(surah, frac) {
    var lens = window.RFQ_AYAH_LEN[surah - 1];
    if (!lens || !lens.length) return null;
    var total = 0, i;
    for (i = 0; i < lens.length; i++) total += lens[i] + PAUSE;
    var target = total * frac, acc = 0;
    for (i = 0; i < lens.length; i++) { acc += lens[i] + PAUSE; if (acc >= target) return { ayah: i + 1, total: lens.length, precision: "estimated" }; }
    return { ayah: lens.length, total: lens.length, precision: "estimated" };
  }
  /* يحوّل رقم الآية العام (1..6236) إلى سورة/آية ونسبة بدايتها داخل السورة.
     تُستخدم لاستئناف آخر آية مسموعة من بدايتها مع أي قارئ. */
  function ayahInfo(g) {
    try {
      if (!ensureWeights()) return null;
      g = Number(g);
      if (!(g >= 1 && g <= 6236)) return null;
      var s = 1;
      while (s < 114 && surahOffset[s] < g) s++;
      var ayah = g - surahOffset[s - 1];
      var lens = window.RFQ_AYAH_LEN[s - 1];
      if (!lens || !lens.length) return null;
      var total = 0, acc = 0, i;
      for (i = 0; i < lens.length; i++) total += lens[i] + PAUSE;
      for (i = 0; i < ayah - 1; i++) acc += lens[i] + PAUSE;
      return { surah: s, ayah: ayah, total: lens.length, startFraction: total > 0 ? acc / total : 0 };
    } catch (e) { return null; }
  }
  function readerId() {
    try { if (typeof selectedRecId !== "undefined" && selectedRecId != null) return String(selectedRecId); } catch (e) {}
    try { if (window.selectedRecId != null) return String(window.selectedRecId); } catch (e) {}
    try { var r = window.RFQ_AUDIO && window.RFQ_AUDIO.currentReciter(); if (r) return String(r.id); } catch (e) {}
    return "default";
  }
  function normalizeTimings(data, surah) {
    var rows = Array.isArray(data) ? data : data && (data.ayahs || data.timings || data.data);
    if (!Array.isArray(rows)) return null;
    var out = [];
    rows.forEach(function (row) {
      if (!row) return;
      var ayah = Number(row.ayah || row.ayah_number || row.verse || row.numberInSurah);
      var start = Number(row.start_ms != null ? row.start_ms : row.start_time != null ? row.start_time : row.start);
      var end = Number(row.end_ms != null ? row.end_ms : row.end_time != null ? row.end_time : row.end);
      /* MP3Quran ayat_timing API reports start_time/end_time in milliseconds. */
      if (row.start_ms == null && row.end_ms == null && (start > 0 || end > 0)) { /* retain API ms */ }
      if (ayah > 0 && isFinite(start) && isFinite(end) && end > start) out.push({ ayah: ayah, start: start / 1000, end: end / 1000 });
    });
    out.sort(function (a, b) { return a.start - b.start; });
    if (!out.length) return null;
    var expected = 1;
    try { expected = (window.RFQ_AYAH_LEN[surah - 1] || []).length || 1; } catch (e) {}
    return { surah: surah, ayahs: out, end: out[out.length - 1].end, count: out.length, expected: expected, source: "timestamps" };
  }
  /* لا نثق بملف توقيت إلا إذا طابق الملف الصوتي المشغَّل: عدد الآيات ومدة النهاية.
     يمنع هذا إبراز آية من تلاوة أخرى (وهو ما كان يحدث عند ربط القارئ بمصحف مختلف). */
  function timingsMatchAudio(data, duration) {
    if (!data || !data.ayahs || data.ayahs.length < 2) return false;
    if (data.expected > 1 && data.ayahs.length < data.expected) return false;
    if (!isFinite(duration) || duration < 2) return true;
    var diff = Math.abs(data.end - duration);
    return diff <= Math.max(6, duration * 0.04);
  }
  function loadTimings(reader, surah) {
    var key = reader + ":" + surah;
    if (timingCache[key]) return Promise.resolve(timingCache[key]);
    if (timingFailed[key] && Date.now() - timingFailed[key] < 60000) return Promise.resolve(null);
    if (timingPending[key]) return timingPending[key];
    var embedded = window.RFQ_AUDIO_TIMINGS;
    if (embedded && embedded[reader] && embedded[reader][surah]) {
      var norm = normalizeTimings(embedded[reader][surah], surah);
      if (norm) { timingCache[key] = norm; return Promise.resolve(norm); }
    }
    var path = "data/audio-timings/" + encodeURIComponent(reader) + "/" + surah + ".json";
    timingPending[key] = fetch(path).then(function (r) { if (!r.ok) throw new Error("no local timings"); return r.json(); })
      .then(function (d) { var n = normalizeTimings(d, surah); if (!n) throw new Error("invalid timings"); timingCache[key] = n; return n; })
      .catch(function () {
        /* معرّف الحصري المرجعي هو رقم مصحفه نفسه (118) وليس معرّف قارئ في التطبيق */
        var readId = MP3QURAN_READ_ID[String(reader)] || (String(reader) === REFERENCE_READ ? Number(REFERENCE_READ) : 0);
        if (!readId) throw new Error("no verified timing reader");
        return fetch("https://www.mp3quran.net/api/v3/ayat_timing?read=" + encodeURIComponent(readId) + "&surah=" + encodeURIComponent(surah))
          .then(function (r) { if (!r.ok) throw new Error("timing API HTTP " + r.status); return r.json(); })
          .then(function (d) {
            var n = normalizeTimings(d, surah);
            if (!n || n.ayahs.length < 2) throw new Error("no usable exact timings");
            timingCache[key] = n; return n;
          });
      })
      .catch(function () { timingFailed[key] = Date.now(); return null; })
      .then(function (result) { delete timingPending[key]; return result; });
    return timingPending[key];
  }
  /* نموذج توقيت بديل للقرّاء الذين لا تنشر لهم mp3quran توقيتات آيات:
     نأخذ توقيتات الحصري المرتل (مصحف 118) لنفس السورة ونستخدم نسب مدة كل آية
     كأوزان على مدة الملف المشغَّل. أدق بكثير من تقدير أطوال الحروف، ولا يغيّر الصوت. */
  var REFERENCE_READ = "118";
  function profilePosition(ref, seconds, duration) {
    if (!ref || !ref.ayahs || ref.ayahs.length < 2) return null;
    if (!isFinite(duration) || duration < 2 || !isFinite(seconds)) return null;
    var first = ref.ayahs[0].start, total = ref.end - first;
    if (!(total > 0)) return null;
    var ratio = Math.max(0, Math.min(1, seconds / duration));
    var t = first + ratio * total;
    for (var i = 0; i < ref.ayahs.length; i++) if (t < ref.ayahs[i].end) return { ayah: ref.ayahs[i].ayah, total: ref.ayahs.length, precision: "profile" };
    return { ayah: ref.ayahs[ref.ayahs.length - 1].ayah, total: ref.ayahs.length, precision: "profile" };
  }
  function getTimedPosition(data, seconds) {
    if (!data || !data.ayahs) return null;
    var rows = data.ayahs;
    var previous = null;
    for (var i = 0; i < rows.length; i++) {
      if (seconds >= rows[i].start && seconds < rows[i].end) return { ayah: rows[i].ayah, total: window.RFQ_AYAH_LEN ? window.RFQ_AYAH_LEN[data.surah - 1].length : rows.length, precision: "exact" };
      if (seconds >= rows[i].end) previous = rows[i];
      else if (seconds < rows[i].start && previous) return { ayah: previous.ayah, total: window.RFQ_AYAH_LEN ? window.RFQ_AYAH_LEN[data.surah - 1].length : rows.length, precision: "exact" };
    }
    if (seconds < rows[0].start) return { ayah: rows[0].ayah, total: rows.length, precision: "exact" };
    if (seconds >= rows[rows.length - 1].end) return { ayah: rows[rows.length - 1].ayah, total: rows.length, precision: "exact" };
    return null;
  }
  function readCurrentPage() {
    try { if (typeof currentPage === "number" && currentPage >= 1) return currentPage; } catch (e) {}
    try { var v = parseInt(localStorage.getItem("rm_quran_last") || "", 10); if (v >= 1) return v; } catch (e) {}
    return null;
  }
  function updateBadge(ayah, total, precision) {
    try {
      var b = document.getElementById("mpAyahBadge"); if (!b) return;
      b.textContent = ayah + "/" + total;
      b.title = precision === "exact" ? "توقيت آية دقيق" : precision === "profile" ? "تقدير مبني على نموذج توقيت حقيقي (لا تتوفر توقيتات منشورة لهذا القارئ)" : "موضع تقريبي لعدم توفر ملف توقيت لهذا القارئ";
      b.dataset.precision = precision || "estimated"; b.classList.add("show"); b.classList.remove("repeat");
    } catch (e) {}
  }
  /* هل هناك صوت مسموع فعلًا؟ (مكتوم أو صفر = المستخدم يقرأ بصمت فلا نقلب الصفحة) */
  function audible() {
    try {
      if (!ap || ap.paused || ap.ended) return false;
      if (ap.muted || ap.volume <= 0.01) return false;
      return true;
    } catch (e) { return false; }
  }
  var lastPlaybackTime = -1;
  /* يُصفَّر عند أي بداية جديدة (تشغيل/تنقّل/سورة جديدة/نهاية) حتى لا يظل المؤشر
     عالقًا عند أعلى زمن بلغته سورة سابقة (كان يمنع قلب الصفحات حتى يتجاوز الزمنَ القديم). */
  function resetFollow() { lastPlaybackTime = -1; lastSynced = null; }
  function followPage(surah, ayah) {
    if (!audible()) return;              // لا نغيّر صفحة المصحف إلا وقارئ يعمل بصوت مسموع
    var t = Number(ap.currentTime) || 0;
    /* رجوع الزمن للخلف = تنقّل أو سورة جديدة: ابدأ المتابعة من جديد */
    if (t < lastPlaybackTime - 0.3) { lastPlaybackTime = -1; lastSynced = null; }
    /* لا نقلب الصفحة إلا إذا كان الصوت يتقدّم فعلًا (لا عنصر معلّق يبدو شغالًا بلا صوت) */
    if (!(t > lastPlaybackTime + 0.05)) return;
    lastPlaybackTime = t;
    if (!ensurePages()) return;
    /* الصفحة تُشتق من (سورة، آية) مباشرة من خريطة الصفحات؛ فلا حاجة لشرط "صاحب الصفحة"
       الذي كان يمنع قلب 399 آية في الصفحات المشتركة بين سورتين (مثل نهاية النساء ص106). */
    var page = pageOf.get(surah * 1000 + ayah), cur = readCurrentPage();
    if (!page || !cur) return;
    /* تُقلب الصفحة مرة واحدة عند تغيّر صفحة التلاوة (أو عند التشغيل/التنقّل)،
       فإن قلّبت أنت صفحة يدويًا لا تُسحب منك حتى تنتقل التلاوة لصفحة جديدة. */
    var changed = page !== lastSynced;
    lastSynced = page;
    if (changed && page !== cur && typeof window.loadPage === "function") {
      window.__rfqAudioPageSync = true;
      try { window.loadPage(page); } finally { window.__rfqAudioPageSync = false; }
    }
  }
  function sync(reason) {
    try {
      if (!ap || !ap.src || ap.error || ap.seeking) return;
      if (ap.paused || ap.ended) return; // إذا كان المشغّل متوقفاً، لا نغيّر الصفحة ولا نُقاطع القارئ
      try { if (typeof _mpSeekDragging !== "undefined" && _mpSeekDragging) return; } catch (e) {}
      var rv = document.getElementById("readerView"); if (!rv || getComputedStyle(rv).display === "none") return;
      var dur = ap.duration, surah = parseInt(ap.getAttribute("data-surah") || "", 10);
      if (!isFinite(dur) || dur < 2 || !(surah >= 1 && surah <= 114) || !ensureWeights()) return;
      var frac = Math.max(0, Math.min(1, ap.currentTime / dur));
      var timed = timingCache[readerId() + ":" + surah];
      if (timed && !timingsMatchAudio(timed, dur)) timed = null;
      var pos = getTimedPosition(timed, ap.currentTime);
      if (!pos) pos = profilePosition(timingCache[REFERENCE_READ + ":" + surah], ap.currentTime, dur);
      if (!pos) pos = mappedPosition(surah, frac);
      if (!pos) return;
      var g = surahOffset[surah - 1] + pos.ayah;
      if (g !== lastAyahG) {
        lastAyahG = g; updateBadge(pos.ayah, pos.total, pos.precision);
        try { localStorage.setItem("rm_quran_last_ayah", String(g)); } catch (e) {}
        try { if (window.RafiqQuranI18n) window.RafiqQuranI18n.highlightAyah(g); } catch (e) {}
      }
      followPage(surah, pos.ayah);
      var timingKey = readerId() + ":" + surah;
      /* لا نعيد جدولة تحميل توقيت فشل بالفعل: كل نداء sync يُطلق تحميلًا جديدًا
         ثم يعيد استدعاء sync، فبدون هذا الشرط يتحول الفشل إلى حلقة لا نهائية تُجمّد الصفحة
         (يحدث مع القرّاء الذين لا تنشر لهم mp3quran توقيتات، مثل المعيقلي). */
      if (!timingCache[timingKey] && !timingPending[timingKey] && !timingFailed[timingKey]) {
        loadTimings(readerId(), surah).then(function (data) {
          if (!data && readerId() !== REFERENCE_READ && !timingCache[REFERENCE_READ + ":" + surah]) {
            loadTimings(REFERENCE_READ, surah).then(function () { if (ap && !ap.paused) sync("reference-ready"); });
          }
          if (ap && !ap.paused) sync("timings-ready");
        });
      }
    } catch (e) {}
  }
  function pinVoice(el) {
    try {
      var pin = function () { try { el.preservesPitch = true; el.mozPreservesPitch = true; el.webkitPreservesPitch = true; if (el.playbackRate !== 1) el.playbackRate = 1; } catch (e) {} };
      pin(); el.addEventListener("play", pin); el.addEventListener("loadedmetadata", pin);
      el.addEventListener("ratechange", function () { try { if (el.playbackRate !== 1) el.playbackRate = 1; } catch (e) {} });
    } catch (e) {}
  }
  function wire() {
    try {
      if (wired) return; ap = document.getElementById("quranAudioPlayer"); if (!ap) return; wired = true; pinVoice(ap);
      var pa = document.getElementById("pageReadAudio"); if (pa) pinVoice(pa);
      ap.addEventListener("timeupdate", function () { sync("tick"); });
      ap.addEventListener("play", function () { resetFollow(); sync("play"); });
      ap.addEventListener("seeked", function () { resetFollow(); if (!ap.paused) sync("seek"); });
      ap.addEventListener("loadedmetadata", function () {
        resetFollow();
        loadTimings(readerId(), parseInt(ap.getAttribute("data-surah") || "", 10)).then(function () {
          if (ap && !ap.paused) sync("metadata");
        });
      });
      ap.addEventListener("ended", function () { resetFollow(); });
      ap.addEventListener("emptied", function () { resetFollow(); });
    } catch (e) {}
  }
  window.__rmAudioSync = {
    ayahInfo: ayahInfo,
    lastGlobal: function () { return lastAyahG; },
    pageOfAyah: function (surah, ayah) { if (!ensurePages()) return null; return pageOf.get(Number(surah) * 1000 + Number(ayah)) || null; },
    state: function () { return { lastSynced: lastSynced, lastAyahG: lastAyahG, weightsReady: !!weightsReady, pagesReady: !!pageOf, reader: readerId(), readId: MP3QURAN_READ_ID[readerId()] || null, exactTimingFilesLoaded: Object.keys(timingCache).length }; },
    /* فحص: أي آية عند ثانية معيّنة اعتمادًا على التوقيتات الدقيقة المحمّلة */
    exactAt: function (surah, seconds) { var d = timingCache[readerId() + ":" + surah]; return d ? getTimedPosition(d, Number(seconds)) : null; },
    timingInfo: function (surah) { var d = timingCache[readerId() + ":" + surah]; return d ? { count: d.count, expected: d.expected, end: d.end } : null; },
    exactFor: function (reader, surah, seconds) { var d = timingCache[String(reader) + ":" + surah]; return d ? getTimedPosition(d, Number(seconds)) : null; },
    profileAt: function (surah, seconds, duration) { return profilePosition(timingCache[REFERENCE_READ + ":" + surah], Number(seconds), Number(duration)); },
    _timingsMatchAudio: timingsMatchAudio,
    sync: function () { sync("debug"); },
    mapped: function (surah, frac) { if (!ensureWeights() || !ensurePages()) return null; var pos = mappedPosition(surah, frac); return pos ? { ayah: pos.ayah, total: pos.total, page: pageOf.get(surah * 1000 + pos.ayah), precision: pos.precision } : null; },
    loadTimings: loadTimings,
    /* حدود نطاق آيات بالثواني من توقيتات دقيقة فقط (للتكرار). يرجع null إن لم تتوفر توقيتات تطابق الصوت. */
    ayahBounds: function (surah, from, to) {
      var d = timingCache[readerId() + ":" + surah];
      if (!d || !d.ayahs || !ap || !timingsMatchAudio(d, ap.duration)) return null;
      var a = null, b = null;
      d.ayahs.forEach(function (r) { if (r.ayah === from) a = r; if (r.ayah === to) b = r; });
      return (a && b && b.end > a.start) ? { start: a.start, end: b.end, total: d.expected } : null;
    }
  };
  wire(); if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  window.addEventListener("online", function () {
    timingFailed = Object.create(null);
    if (ap && ap.getAttribute("data-surah")) loadTimings(readerId(), parseInt(ap.getAttribute("data-surah"), 10)).then(function () { sync("online"); });
  });
})();

/* شريط تشغيل مصغّر في فهرس المصحف — حتى لا تتوقف التلاوة عند الرجوع إلى الفهرس */
(function () {
  "use strict";
  if (window.__RFQ_QMINI__) return;
  window.__RFQ_QMINI__ = true;
  var STYLE_ID = "rfq-qmini-style";
  var CSS = "#rfqQuranMini{position:fixed;left:50%;transform:translateX(-50%) translateY(170%);bottom:14px;width:min(520px,calc(100vw - 20px));z-index:9450;display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:15px;border:1px solid rgba(212,175,55,.45);background:linear-gradient(135deg,rgba(10,20,38,.98),rgba(5,12,28,.98));box-shadow:0 12px 34px rgba(0,0,0,.55);font-family:Tajawal,sans-serif;direction:rtl;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}#rfqQuranMini.show{transform:translateX(-50%) translateY(0)}#rfqQuranMini .rfq-qm-info{flex:1;min-width:0}#rfqQuranMini b{display:block;font-size:.82rem;color:#f6edda;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#rfqQuranMini small{display:block;font-size:.68rem;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#rfqQuranMini .rfq-qm-btn{border:1px solid rgba(212,175,55,.4);background:rgba(212,175,55,.12);color:#f6edda;border-radius:10px;padding:7px 10px;font:800 .74rem Tajawal,sans-serif;cursor:pointer;white-space:nowrap}#rfqQuranMini #rfqQmToggle{width:38px;height:38px;border-radius:50%;padding:0;font-size:1rem;flex:none}";
  function el(id) { return document.getElementById(id); }
  function player() { return el("quranAudioPlayer"); }
  function readerHidden() {
    var rv = el("readerView");
    return !rv || rv.style.display === "none" || getComputedStyle(rv).display === "none";
  }
  function build() {
    if (el("rfqQuranMini")) return;
    if (!el(STYLE_ID)) {
      var st = document.createElement("style");
      st.id = STYLE_ID; st.textContent = CSS; document.head.appendChild(st);
    }
    var bar = document.createElement("div");
    bar.id = "rfqQuranMini";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "التلاوة الجارية");
    bar.innerHTML = '<button class="rfq-qm-btn" id="rfqQmToggle" aria-label="تشغيل أو إيقاف">⏸</button>' +
      '<div class="rfq-qm-info"><b id="rfqQmTitle">التلاوة</b><small id="rfqQmSub">المصحف</small></div>' +
      '<button class="rfq-qm-btn" id="rfqQmOpen">فتح الصفحة</button>' +
      '<button class="rfq-qm-btn" id="rfqQmClose" aria-label="إغلاق">✕</button>';
    document.body.appendChild(bar);
    el("rfqQmToggle").addEventListener("click", function () {
      var a = player(); if (!a) return;
      if (a.paused) { var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } else { a.pause(); }
    });
    el("rfqQmOpen").addEventListener("click", function () {
      var idx = el("indexContainer"); if (idx) idx.style.display = "none";
      var rv = el("readerView"); if (rv) rv.style.display = "flex";
      var nb = el("navBar"); if (nb) nb.style.display = "flex";
      window.scrollTo({ top: 0, behavior: "auto" });
      try { if (typeof updateCrumbs === "function") updateCrumbs(); } catch (e) {}
      hide();
    });
    el("rfqQmClose").addEventListener("click", function () {
      var a = player(); if (a) { try { a.pause(); } catch (e) {} }
      hide();
    });
  }
  function labels() {
    var t = el("rfqQmTitle"), s = el("rfqQmSub");
    if (!t || !s) return;
    var nameEl = el("currentSurahName");
    var name = nameEl ? nameEl.textContent.replace(/^[^p{L}]+/u, "").trim() : "";
    t.textContent = name ? "سورة " + name.replace(/^سورةs*/, "") : "التلاوة الجارية";
    var sel = el("readerSelect");
    var rec = sel && sel.options && sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent : "";
    s.textContent = rec ? rec : "المصحف";
  }
  function show() { build(); labels(); var b = el("rfqQuranMini"); if (b) b.classList.add("show"); }
  function hide() { var b = el("rfqQuranMini"); if (b) b.classList.remove("show"); }
  function sync() {
    var a = player();
    if (a && a.src && !a.paused && readerHidden()) { show(); var t = el("rfqQmToggle"); if (t) t.textContent = "⏸"; }
    else { hide(); }
  }
  window.rfqQuranMiniSync = sync;
  window.rfqQuranMiniOpen = function () {
    var idx = el("indexContainer"); if (idx) idx.style.display = "none";
    var rv = el("readerView"); if (rv) rv.style.display = "flex";
    var nb = el("navBar"); if (nb) nb.style.display = "flex";
    hide();
  };
  function wire() {
    var a = player();
    if (!a) { setTimeout(wire, 400); return; }
    ["play", "pause", "ended", "loadeddata"].forEach(function (ev) { a.addEventListener(ev, function () { setTimeout(sync, 60); }); });
    sync();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire, { once: true });
  else wire();
})();
