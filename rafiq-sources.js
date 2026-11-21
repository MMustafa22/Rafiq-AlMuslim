/* ============================================================
   رفيق المسلم — المصادر والمراجع المعتمدة في محتوى التطبيق
   يُستخدم في موضعين:
   1) quran.html  → لوحة «📚 المصادر» المنسدلة (openSourcesPanel)
   2) sources.html → صفحة المصادر الكاملة (RafiqSources.render)
   ============================================================ */
(function () {
  'use strict';

  var SOURCES = [
    {
      icon: '📖', cat: 'القرآن الكريم',
      items: [
        { t: 'مصحف المدينة (النسخة المزخرفة بإطارها الأخضر)', d: 'مجمع الملك فهد لطباعة المصحف الشريف — المدينة المنورة. رواية حفص عن عاصم. تُعرض الصور من مستودع QuranHub/quran-pages-images على GitHub وبنسخة مضمنة داخل التطبيق.', u: 'https://github.com/QuranHub/quran-pages-images' },
        { t: 'مصحف التجويد بالألوان', d: 'إصدار دار المعرفة — تلوين أحكام التجويد. تُعرض الصور من موقع المكتبة الإسلامية.', u: 'https://www.islamicbook.ws' },
        { t: 'نصوص الآيات والبحث والترجمات', d: 'AlQuran Cloud API (Al Islamic Network) — نص عثماني وترجمات معاني بـ13 لغة.', u: 'https://alquran.cloud' }
      ]
    },
    {
      icon: '📘', cat: 'التفسير',
      items: [
        { t: 'التفسير الميسّر', d: 'مجمع الملك فهد لطباعة المصحف الشريف — المدينة المنورة. نسخة مضمنة تعمل بدون إنترنت.', u: 'https://shamela.ws/book/22726' },
        { t: 'تيسير الكريم الرحمن في تفسير كلام المنان (تفسير السعدي)', d: 'عبد الرحمن بن ناصر السعدي (ت 1376هـ). نسخة مضمنة + بيانات من tafsir_api (spa5k).', u: 'https://shamela.ws/book/153' }
      ]
    },
    {
      icon: '🕌', cat: 'الفقه',
      items: [
        { t: 'الفقه الميسّر في ضوء الكتاب والسنة', d: 'إعداد نخبة من أهل العلم، بإشراف مجمع الملك فهد لطباعة المصحف الشريف — الطبعة الأولى 1424هـ، وقدّم له معالي الشيخ صالح بن عبد العزيز آل الشيخ.', u: 'https://shamela.ws/book/22726' }
      ]
    },
    {
      icon: '🤲', cat: 'الأذكار والأدعية',
      items: [
        { t: 'حصن المسلم من أذكار الكتاب والسنة', d: 'سعيد بن علي بن وهف القحطاني. أذكار الصباح والمساء والنوم مع توثيق الأحاديث وتخريجها.', u: 'https://www.hesnalmuslim.com' },
        { t: 'أصوات الأذكار', d: 'تلاوات الأذكار بصوت الشيخ حمد الدريهم من موقع حصن المسلم ومستودع Adhkar-json.', u: 'https://www.hisnmuslim.com' }
      ]
    },
    {
      icon: '🐪', cat: 'السيرة والقصص',
      items: [
        { t: 'السيرة النبوية (سيرة ابن هشام)', d: 'عبد الملك بن هشام (ت 213هـ) — تهذيب لسيرة ابن إسحاق. النص الكامل من ويكي مصدر (ملكية عامة).', u: 'https://ar.wikisource.org' },
        { t: 'البداية والنهاية — قسم السيرة النبوية', d: 'الحافظ إسماعيل بن عمر بن كثير القرشي الدمشقي (ت 774هـ). أساس قسم «الكتاب» للسيرة.', u: 'https://shamela.ws/book/15' },
        { t: 'قصص الأنبياء', d: 'الحافظ ابن كثير، تحقيق مصطفى عبد الواحد (دار الكتب العلمية). النص الكامل من ويكي مصدر.', u: 'https://ar.wikisource.org' },
        { t: 'رياض الصالحين', d: 'الإمام أبو زكريا يحيى بن شرف النووي (ت 676هـ). الأحاديث النبوية مع تخريجها.', u: 'https://ar.wikisource.org' }
      ]
    },
    {
      icon: '🎧', cat: 'التلاوات والأذان',
      items: [
        { t: 'موسوعة القرآن MP3 (mp3quran.net)', d: 'تلاوات كاملة لأكثر من 230 قارئًا — المصدر الرئيسي لملفات التلاوة.', u: 'https://mp3quran.net' },
        { t: 'Quranic Audio (quranicaudio.com)', d: 'مصدر احتياطي للتلاوات عالية الجودة.', u: 'https://quranicaudio.com' },
        { t: 'أصوات الأذان', d: 'مستودع adhan-mp3 عبر Statically CDN.', u: 'https://cdn.statically.io' },
        { t: 'القراء المجوّدون (تلاوات مجوّدة مختارة)', d: 'أرشيف الإنترنت (archive.org) — نعينع والمنشاوي والطبلاوي وغيرهم.', u: 'https://archive.org' }
      ]
    },
    {
      icon: '⏰', cat: 'المواقيت والتقويم',
      items: [
        { t: 'حساب مواقيت الصلاة', d: 'مكتبة adhan-js مفتوحة المصدر (Batoul Apps — رخصة MIT) تعمل بدون إنترنت، مع AlAdhan API كمصدر مساند.', u: 'https://github.com/batoulapps/adhan-js' },
        { t: 'تحديد الموقع للقبلة والمواقيت', d: 'واجهات BigDataCloud و ipwho.is المجانية لتحديد المدينة تقريبيًا عند تعذّر GPS.', u: 'https://www.aladhan.com/prayer-times-api' }
      ]
    }
  ];

  var NOTE = 'كل المحتوى الشرعي في التطبيق من مصادره المعتمدة المذكورة أعلاه، والأخطاء إن وقعت فمنّا ومن الشيطان. التطبيق وسيلة تعليمية للقراءة، والمرجع في الفتوى أهل العلم الموثوقون. جميع الحقوق لمؤلفي الكتب ومصادرها الأصلية محفوظة لهم.';

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function itemHTML(it) {
    return '<div class="src-item">' +
      '<div class="src-t">' + esc(it.t) + '</div>' +
      '<div class="src-d">' + esc(it.d) + '</div>' +
      (it.u ? '<a class="src-u" href="' + esc(it.u) + '" target="_blank" rel="noopener noreferrer" dir="ltr">' + esc(it.u.replace(/^https?:\/\//, '').replace(/\/$/, '')) + '</a>' : '') +
      '</div>';
  }

  function listHTML() {
    var h = '';
    SOURCES.forEach(function (g) {
      h += '<div class="src-cat"><div class="src-cat-h"><span class="src-cat-ic">' + g.icon + '</span><b>' + esc(g.cat) + '</b></div>';
      g.items.forEach(function (it) { h += itemHTML(it); });
      h += '</div>';
    });
    return h;
  }

  /* ---------- لوحة المصادر داخل صفحة القرآن ---------- */
  function buildPanel() {
    if (document.getElementById('sourcesOverlay')) return;
    var css = '' +
'.src-ov{display:none;position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,.65);backdrop-filter:blur(5px);align-items:flex-end;justify-content:center}' +
'.src-ov.open{display:flex}' +
'.src-panel{background:var(--panel-bg,#fffdf5);color:var(--panel-text,#2a1800);width:100%;max-width:560px;max-height:86dvh;display:flex;flex-direction:column;border-radius:22px 22px 0 0;border-top:2px solid var(--gold,#d4af37);animation:srcUp .35s cubic-bezier(.22,1,.36,1)}' +
'@keyframes srcUp{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
'.src-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--panel-border,rgba(160,120,32,.3));flex-shrink:0}' +
'.src-head b{font-size:1.05rem;color:var(--gold,#a07820)}' +
'.src-x{background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.4);color:var(--gold,#a07820);width:36px;height:36px;border-radius:50%;font-size:1rem;cursor:pointer;flex-shrink:0}' +
'.src-body{overflow-y:auto;padding:14px 18px 26px;flex:1}' +
'.src-cat{margin-bottom:16px}' +
'.src-cat-h{display:flex;align-items:center;gap:8px;font-size:1rem;font-weight:800;margin-bottom:8px;padding-bottom:6px;border-bottom:1px dashed rgba(160,120,32,.3)}' +
'.src-cat-ic{font-size:1.2rem}' +
'.src-item{background:var(--panel-item-bg,rgba(160,120,32,.05));border:1px solid var(--panel-item-border,rgba(160,120,32,.15));border-radius:12px;padding:10px 12px;margin-bottom:8px}' +
'.src-t{font-weight:800;font-size:.92rem;line-height:1.6}' +
'.src-d{font-size:.8rem;opacity:.85;line-height:1.8;margin-top:3px}' +
'.src-u{display:inline-block;margin-top:5px;font-size:.74rem;color:#2563eb;text-decoration:none;word-break:break-all}' +
'.src-note{font-size:.76rem;line-height:1.9;opacity:.8;padding:10px 12px;border-radius:10px;background:rgba(212,175,55,.08);border:1px dashed rgba(212,175,55,.35)}';
    var st = document.createElement('style'); st.id = 'rm-src-css'; st.textContent = css;
    document.head.appendChild(st);

    var ov = document.createElement('div');
    ov.className = 'src-ov'; ov.id = 'sourcesOverlay';
    ov.innerHTML =
      '<div class="src-panel" role="dialog" aria-label="المصادر المعتمدة">' +
        '<div class="src-head"><b>📚 المصادر المعتمدة في المحتوى</b><button class="src-x" aria-label="إغلاق">✕</button></div>' +
        '<div class="src-body">' + listHTML() + '<div class="src-note">' + esc(NOTE) + '</div></div>' +
      '</div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    ov.querySelector('.src-x').addEventListener('click', close);
    document.body.appendChild(ov);

    function close() {
      ov.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('open')) close();
    });
  }
  function openPanel() {
    buildPanel();
    var ov = document.getElementById('sourcesOverlay');
    if (ov) { ov.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  if (typeof window !== 'undefined') {
    window.openSourcesPanel = openPanel;
  }

  /* ---------- واجهة صفحة المصادر الكاملة ---------- */
  window.RafiqSources = {
    data: SOURCES,
    note: NOTE,
    listHTML: listHTML,
    render: function (bodyId, noteId) {
      var b = document.getElementById(bodyId);
      if (!b) return;
      b.innerHTML = listHTML();
      var n = document.getElementById(noteId);
      if (n) n.textContent = NOTE;
    }
  };
})();
