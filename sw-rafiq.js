/* ═══════════════════════════════════════════════════════════════
   🛰️  رفيق المسلم — Service Worker الموحّد المتكامل
   الإصدار:7.0 — نظام التحديث التلقائي الذكي
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ أوفلاين كامل — كل الملفات محفوظة في الكاش
   ✅ Network-First للـ APIs + Cache fallback
   ✅ تحديث تلقائي فوري عند رفع نسخة جديدة
   ✅ Stale-While-Revalidate للملفات الثابتة
   ✅ إشعارات مواقيت الصلاة والأذكار في الخلفية
   ✅ TimestampTrigger للمتصفحات الداعمة (Chrome)
   ✅ فحص تحديث كل 30 دقيقة + عند العودة للتطبيق
   ═══════════════════════════════════════════════════════════════ */
'use strict';

const SW_VERSION   = '7.33.0';
const VERSION_HASH = 'rm-v98-20260906-calm-switch-fix-v208.2'; // غيّر هذا عند كل تحديث

/* ─── أسماء الكاشات — بتتغير مع كل نسخة عشان نمسح القديم تلقائي ── */
const CACHE_STATIC = 'rafiq-static-' + VERSION_HASH;
const CACHE_API    = 'rafiq-api-v4';
const CACHE_FONTS  = 'rafiq-fonts-v4';

/* ─── كل الملفات الأساسية للتطبيق ──────────────────────────── */
const STATIC_FILES = [
  './',
  './index.html',
  './manifest.json',
  './prayer-qibla-notif.js',
  './sw-rafiq.js',
  './service-worker.js',
  './noor.html',
  './noor-stories.js',
  './quran.html',
  './riyad-al-salihin.html',
  './sahaba.html',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png',
  './intro.js',
  './rafiq-audio.js',
  // (v202+v207) تسجيلات أذكار الصباح المحلية — 35 ملفاً (dhikr-39 استُبدلت بmasaa-14 في v205، dhikr-27 أُضيفت في v207 بتسجيل المستخدم المرفق)
  './audio/adhkar-sabah/dhikr-02.mp3',
  './audio/adhkar-sabah/dhikr-03.mp3',
  './audio/adhkar-sabah/dhikr-04.mp3',
  './audio/adhkar-sabah/dhikr-05.mp3',
  './audio/adhkar-sabah/dhikr-06.mp3',
  './audio/adhkar-sabah/dhikr-07.mp3',
  './audio/adhkar-sabah/dhikr-08.mp3',
  './audio/adhkar-sabah/dhikr-09.mp3',
  './audio/adhkar-sabah/dhikr-10.mp3',
  './audio/adhkar-sabah/dhikr-11.mp3',
  './audio/adhkar-sabah/dhikr-12.mp3',
  './audio/adhkar-sabah/dhikr-13.mp3',
  './audio/adhkar-sabah/dhikr-14.mp3',
  './audio/adhkar-sabah/dhikr-15.mp3',
  './audio/adhkar-sabah/dhikr-16.mp3',
  './audio/adhkar-sabah/dhikr-17.mp3',
  './audio/adhkar-sabah/dhikr-18.mp3',
  './audio/adhkar-sabah/dhikr-19.mp3',
  './audio/adhkar-sabah/dhikr-20.mp3',
  './audio/adhkar-sabah/dhikr-24.mp3',
  './audio/adhkar-sabah/dhikr-25.mp3',
  './audio/adhkar-sabah/dhikr-26.mp3',
  './audio/adhkar-sabah/dhikr-27.mp3',   // (v207) تسجيل المستخدم المرفق — أصبحنا وأصبح الملك لله (ذكر #27)
  './audio/adhkar-sabah/dhikr-28.mp3',
  './audio/adhkar-sabah/dhikr-29.mp3',
  './audio/adhkar-sabah/dhikr-30a.mp3',
  './audio/adhkar-sabah/dhikr-30b.mp3',
  './audio/adhkar-sabah/dhikr-32.mp3',
  './audio/adhkar-sabah/dhikr-33.mp3',
  './audio/adhkar-sabah/dhikr-34.mp3',
  './audio/adhkar-sabah/dhikr-35.mp3',
  './audio/adhkar-sabah/dhikr-36.mp3',
  './audio/adhkar-sabah/dhikr-37.mp3',
  './audio/adhkar-sabah/dhikr-38.mp3',
  './audio/adhkar-sabah/dhikr-40.mp3',
  // (v205+v207) تسجيلات أذكار المساء والنوم المدمجة — 24 ملفاً (تطابق نصي 100%)
  // (v207) masaa-26 = تسجيل المستخدم المرفق لنوم #12 (اللهم خلقت نفسي وأنت تتوفاها) — بدل masaa-13 المحذوف
  './audio/adhkar-masaa/masaa-01.mp3',  './audio/adhkar-masaa/masaa-02.mp3',  './audio/adhkar-masaa/masaa-03.mp3',  './audio/adhkar-masaa/masaa-04.mp3',  './audio/adhkar-masaa/masaa-05.mp3',  './audio/adhkar-masaa/masaa-06.mp3',  './audio/adhkar-masaa/masaa-07.mp3',  './audio/adhkar-masaa/masaa-08.mp3',  './audio/adhkar-masaa/masaa-09.mp3',  './audio/adhkar-masaa/masaa-10.mp3',  './audio/adhkar-masaa/masaa-11.mp3',  './audio/adhkar-masaa/masaa-12.mp3',  './audio/adhkar-masaa/masaa-14.mp3',  './audio/adhkar-masaa/masaa-16.mp3',  './audio/adhkar-masaa/masaa-17.mp3',  './audio/adhkar-masaa/masaa-18.mp3',  './audio/adhkar-masaa/masaa-19.mp3',  './audio/adhkar-masaa/masaa-20.mp3',  './audio/adhkar-masaa/masaa-21.mp3',  './audio/adhkar-masaa/masaa-22.mp3',  './audio/adhkar-masaa/masaa-23.mp3',  './audio/adhkar-masaa/masaa-24.mp3',
  './audio/adhkar-masaa/masaa-25.mp3',
  './audio/adhkar-masaa/masaa-26.mp3'
  // ملاحظة تاريخية: حُذفت ملفات الأذكار المدمجة القديمة (sabah/masaa/nawm.mp3)
  // القرآن: everyayah + mp3quran (4 قرّاء: الحصري/المنشاوي/المعيقلي/القطامي) | الأدعية: حمد الدريهم (hisnmuslim.com + jsDelivr)
];

/* ─── Patterns الـ APIs اللي بيتحفظ ردّها ──────────────────── */
const API_PATTERNS = [
  'api.aladhan.com',
  'api.alquran.cloud',
  'quran.com',
  'mp3quran.net',
  'everyayah.com',
  'islamic.network',
  'hisnmuslim.com',
  'jsdelivr.net',
  'raw.githubusercontent.com',
];

/* ─── ملفات الـ HTML — نستخدمها لفحص التحديث ─────────────── */
const UPDATE_CHECK_FILES = ['./index.html', './prayer-qibla-notif.js', './sw-rafiq.js', './quran.html', './riyad-al-salihin.html', './sahaba.html', './noor.html', './noor-stories.js', './rafiq-audio.js'];

/* ═══════════════════════════════════════════════════════════════
   ⚙️  INSTALL — تحميل كل الملفات في الكاش الجديد
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('install', event => {
  console.log(`[SW] 🛰️ تثبيت الإصدار ${SW_VERSION} (${VERSION_HASH})...`);

  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => {
        return Promise.allSettled(
          STATIC_FILES.map(url =>
            cache.add(url).catch(err =>
              console.warn(`[SW] ⚠️ ما اتحملش: ${url}`, err.message)
            )
          )
        );
      })
      .then(() => {
        console.log(`[SW] ✅ الكاش الجاهز — ${STATIC_FILES.length} ملف`);
        // skipWaiting عشان ياخد السيطرة فوراً
        return self.skipWaiting();
      })
  );
});

/* ═══════════════════════════════════════════════════════════════
   🔄  ACTIVATE — حذف كل الكاشات القديمة + إخطار بالتحديث
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('activate', event => {
  console.log(`[SW] ✅ تفعيل الإصدار ${SW_VERSION}`);

  // الكاشات المسموح بها (النسخة الحالية فقط)
  const ALLOWED_CACHES = new Set([CACHE_STATIC, CACHE_API, CACHE_FONTS]);

  event.waitUntil(
    caches.keys()
      .then(names => {
        const toDelete = names.filter(n => !ALLOWED_CACHES.has(n));
        if (toDelete.length > 0) {
          console.log(`[SW] 🗑️ حذف ${toDelete.length} كاش قديم:`, toDelete);
        }
        return Promise.all(toDelete.map(n => caches.delete(n)));
      })
      .then(() => self.clients.claim())
      .then(() => {
        // بدء فحص الصلاة الدوري
        _startPrayerCheckLoop();
        // بدء فحص التحديث الدوري
        startUpdateChecker();

        return self.clients.matchAll({ includeUncontrolled: true })
          .then(clients => {
            // أخبر كل الصفحات إن في نسخة جديدة
            clients.forEach(c => {
              c.postMessage({ 
                type: 'SW_UPDATED', 
                version: SW_VERSION,
                hash: VERSION_HASH
              });
            });
          });
      })
  );
});

/* ═══════════════════════════════════════════════════════════════
   🌐  FETCH — استراتيجية ذكية حسب نوع الطلب
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* ── 1. Google Fonts → Cache First ─── */
  if (url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(_cacheFirst(req, CACHE_FONTS));
    return;
  }

  /* ── 2. APIs الصلاة والقرآن → Network First + Cache Fallback ─ */
  if (API_PATTERNS.some(p => url.hostname.includes(p) || url.href.includes(p))) {
    event.respondWith(_networkFirst(req, CACHE_API));
    return;
  }

  /* ── 3. ملفات التطبيق الأساسية → Stale-While-Revalidate ─── */
  // نرجع الكاش فوراً (سريع) وفي الخلفية نحدّث الكاش من النت
  // بنقارن بفك ترميز الـ URL عشان أسماء الملفات العربية (%D8%A7...) تتطابق صح مع STATIC_FILES
  var decodedPath = '';
  try { decodedPath = decodeURIComponent(url.pathname); } catch (e) { decodedPath = url.pathname; }
  if (STATIC_FILES.some(f => {
        var name = f.replace('./', '');
        return decodedPath.endsWith('/' + name) || decodedPath.endsWith(name) ||
               url.pathname.endsWith('/' + encodeURIComponent(name)) || url.href.endsWith(encodeURIComponent(name));
      })) {
    event.respondWith(_staleWhileRevalidate(req, CACHE_STATIC));
    return;
  }

  /* ── 4. كل حاجة تانية (مش ملف معروف) → Cache First ────────
     مهم: لو الطلب ده تصفّح صفحة (navigate) لملف مش معروف، ما نرجّعش
     index.html بدلاً منه عند الفشل (ده كان بيخلي فتح أي صفحة حسّها
     "رجعت للرئيسية فجأة"). بدل كده نرجّع رسالة أوفلاين واضحة. ─── */
  if (req.mode === 'navigate' && decodedPath !== '/' && !decodedPath.endsWith('/index.html')) {
    event.respondWith(_cacheFirstNoIndexFallback(req, CACHE_STATIC));
    return;
  }
  event.respondWith(_cacheFirst(req, CACHE_STATIC));
});

/* ─── Stale-While-Revalidate: رجّع الكاش فوراً + حدّث في الخلفية ──
   ده السر! المستخدم يشوف الصفحة فوراً من الكاش،
   بس في نفس الوقت بنحدّث الكاش من النت عشان المرة الجاية ─── */
async function _staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request);

  // حدّث الكاش في الخلفية بدون تأخير المستخدم
  const fetchPromise = fetch(request).then(response => {
    if (response && response.status === 200 && response.type !== 'opaque') {
      const clone = response.clone();
      caches.open(cacheName).then(cache => cache.put(request, clone));
    }
    return response;
  }).catch(() => cached);

  // رجّع الكاش فوراً لو موجود، وإلا انتظر النت
  return cached || fetchPromise;
}

/* ─── Cache First: الكاش أولاً، لو مش موجود جرب النت ───────── */
async function _cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    console.warn('[SW] أوفلاين:', request.url);
    const fallback = await caches.match('./index.html');
    return fallback || new Response('التطبيق غير متاح أوفلاين حالياً', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

/* ─── Cache First بدون فولباك لـ index.html — لصفحات التصفح المباشر
   (زي حياة الصحابة أو رياض الصالحين لو اتفتحوا كـ tab مستقل) ───── */
async function _cacheFirstNoIndexFallback(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response(
      '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"></head><body style="font-family:sans-serif;background:#050b14;color:#f8fafc;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:2rem;"><div><h2>لا يوجد اتصال بالإنترنت</h2><p>افتح التطبيق من الصفحة الرئيسية أولاً وأعد المحاولة.</p></div></body></html>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

/* ─── Network First: النت أولاً، لو فاشل من الكاش ──────────── */
async function _networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) {
      console.log('[SW] 📦 من الكاش (أوفلاين):', request.url);
      return cached;
    }
    return new Response(
      JSON.stringify({ error: 'offline', message: 'لا يوجد اتصال بالإنترنت', cached: false }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/* ═══════════════════════════════════════════════════════════════
   🔄  Background Sync — تحديث تلقائي لما يرجع النت
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('sync', event => {
  if (event.tag === 'rafiq-sync-prayer-times') {
    console.log('[SW] 🔄 Background Sync — تحديث مواقيت الصلاة');
    event.waitUntil(_onNetworkBack());
  }
  if (event.tag === 'rafiq-sync-quran') {
    event.waitUntil(_onNetworkBack('quran'));
  }
});

async function _onNetworkBack(type = 'prayer_times') {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(c => c.postMessage({
    type: 'NETWORK_BACK',
    sync: type,
    message: 'النت رجع — جاري التحديث 🔄'
  }));
}

/* ═══════════════════════════════════════════════════════════════
   🔄  Periodic Background Sync — فحص دوري حتى والتطبيق مغلق
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('periodicsync', event => {
  if (event.tag === 'rm-prayer-check') {
    console.log('[SW] 🔄 Periodic Sync — فحص مواقيت الصلاة');
    event.waitUntil(_checkAndNotify());
  }
});

/* ═══════════════════════════════════════════════════════════════
   ⏰  فحص سريع كل 3 دقائق — يكتشف أوقات الصلاة ويفتح التطبيق
   هذا المؤقت يعمل في الخلفية حتى لو التطبيق مغلق
   ═══════════════════════════════════════════════════════════════ */
let _prayerCheckTimer = null;

function _startPrayerCheckLoop() {
  if (_prayerCheckTimer) clearInterval(_prayerCheckTimer);
  // فحص كل 5 دقائق — تزامن جيد بدون استنزاف البطارية (النافذة تتعامل مع الفائت)
  _prayerCheckTimer = setInterval(() => {
    _checkAndNotify().catch(e => console.warn('[SW] فحص خطأ:', e.message));
  }, 5 * 60 * 1000);
  // أول فحص فوري
  _checkAndNotify().catch(() => {});
}

/* ═══════════════════════════════════════════════════════════════
   🔍  فحص التحديث — بيحصل تلقائياً كل 30 دقيقة
   ═══════════════════════════════════════════════════════════════ */
let _updateCheckTimer = null;

function startUpdateChecker() {
  if (_updateCheckTimer) clearInterval(_updateCheckTimer);
  // فحص كل 60 دقيقة — أقل استنزافاً للبطارية والشبكة
  _updateCheckTimer = setInterval(() => _checkForUpdate(), 60 * 60 * 1000);
  // أول فحص بعد دقيقتين
  setTimeout(() => _checkForUpdate(), 120 * 1000);
}

/* ─── سؤال الصفحات المفتوحة: هل فيه شاشة قراءة مفتوحة دلوقتي؟ ─────
   بيستخدم MessageChannel عشان ياخد رد سريع من كل صفحة متحكم فيها؛
   لو مفيش رد خلال نص ثانية (الصفحة قديمة أو مش بترد) نفترض إنها مش
   مشغولة عشان الفحص التلقائي ما يتوقفش للأبد. ───────────────────── */
async function _anyClientBusy() {
  try {
    const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (clientsList.length === 0) return false;
    const results = await Promise.all(clientsList.map(_askClientBusy));
    return results.some(Boolean);
  } catch (e) {
    return false;
  }
}

function _askClientBusy(client) {
  return new Promise((resolve) => {
    let done = false;
    const channel = new MessageChannel();
    const timer = setTimeout(() => {
      if (!done) { done = true; resolve(false); }
    }, 400);
    channel.port1.onmessage = (e) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(!!(e.data && e.data.busy));
    };
    try {
      client.postMessage({ type: 'RM_CHECK_BUSY' }, [channel.port2]);
    } catch (e) {
      clearTimeout(timer);
      resolve(false);
    }
  });
}

async function _checkForUpdate() {
  try {
    // ⛔ لو أي صفحة مفتوحة بتقرأ محتوى (قرآن/رياض/نور/صحابة) دلوقتي،
    // منأجّل الفحص عشان منعملش حِمل شبكة أو نغيّر الكاش وهي بتستخدم التطبيق.
    // (فحص بسيط: نسأل الصفحات المتحكم فيها هل فيها overlay مفتوح)
    const isBusy = await _anyClientBusy();
    if (isBusy) {
      console.log('[SW] ⏸️ تأجيل فحص التحديث — المستخدم بيستخدم محتوى مفتوح دلوقتي');
      return;
    }

    // نفحص ملف index.html — لو اتحمل نسخة جديدة ≠ الكاش → في تحديث
    const cache = await caches.open(CACHE_STATIC);
    for (const file of UPDATE_CHECK_FILES) {
      try {
        const response = await fetch(file, { 
          cache: 'no-cache',
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        if (!response || response.status !== 200) continue;

        const cachedResponse = await cache.match(file);
        if (!cachedResponse) continue;

        const newText = await response.text();
        const cachedText = await cachedResponse.text();

        // لو المحتوى اختلف → في تحديث!
        if (newText.trim() !== cachedText.trim()) {
          console.log(`[SW] 🔄 اكتشف تحديث في ${file}!`);
          // حدّث الكاش بالنسخة الجديدة
          await cache.put(file, new Response(newText, {
            status: 200,
            headers: response.headers
          }));

          // أخبر التطبيق إن في تحديث
          const clients = await self.clients.matchAll({ includeUncontrolled: true });
          clients.forEach(c => {
            c.postMessage({ 
              type: 'UPDATE_AVAILABLE', 
              version: SW_VERSION,
              file: file
            });
          });

          // بعد ما حدّثنا الملفات الأساسية، نعمل تسجيل جديد للـ SW
          // عشان يشوف باقي التحديثات
          self.registration.update();
          return; // وجدنا تحديث — خلاص
        }
      } catch (e) {
        // ملف ما اتحملش — نكمل للذي بعده
      }
    }
  } catch (e) {
    console.warn('[SW] فشل فحص التحديث:', e.message);
  }
}

// تشغيل فحص التحديث تلقائياً
startUpdateChecker();

/* ═══════════════════════════════════════════════════════════════
   💾  IndexedDB — لحفظ الجدول والإعدادات بشكل دائم
   ═══════════════════════════════════════════════════════════════ */
const DB_NAME        = 'rm-sw-data';
const DB_VERSION     = 1;
const STORE_SCHEDULE = 'schedule';
const STORE_NOTIFIED = 'notified';

function _openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_SCHEDULE))
        db.createObjectStore(STORE_SCHEDULE);
      if (!db.objectStoreNames.contains(STORE_NOTIFIED))
        db.createObjectStore(STORE_NOTIFIED);
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

async function _dbGet(store, key) {
  try {
    const db  = await _openDB();
    const val = await new Promise((res, rej) => {
      const tx  = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = e => res(e.target.result ?? null);
      req.onerror   = e => rej(e.target.error);
    });
    db.close();
    return val;
  } catch (_) { return null; }
}

async function _dbSet(store, key, value) {
  try {
    const db = await _openDB();
    await new Promise((res, rej) => {
      const tx  = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(value, key);
      req.onsuccess = () => res();
      req.onerror   = e => rej(e.target.error);
    });
    db.close();
  } catch (e) { console.warn('[SW] DB error:', e); }
}

/* ═══════════════════════════════════════════════════════════════
   📨  الرسائل من الصفحة → الـ SW
   ═══════════════════════════════════════════════════════════════ */
self.addEventListener('message', event => {
  const msg = event.data;
  if (!msg) return;

  switch (msg.type) {

    case 'PRAYER_SCHEDULE':
      _dbSet(STORE_SCHEDULE, 'times',    msg.times);
      _dbSet(STORE_SCHEDULE, 'settings', msg.settings);
      _dbSet(STORE_SCHEDULE, 'date',     new Date().toDateString());
      _scheduleNextPrayer(msg.times, msg.settings);
      console.log('[SW] 📅 جدول الصلاة محفوظ ✅');
      break;

    case 'SETTINGS_UPDATE':
      _dbSet(STORE_SCHEDULE, 'settings', msg.settings);
      break;

    case 'SW_PING':
      _checkAndNotify();
      _updateForegroundNotification();
      if (event.source) {
        event.source.postMessage({
          type: 'SW_HEARTBEAT',
          version: SW_VERSION,
          hash: VERSION_HASH,
          online: true
        });
      }
      break;

    case 'SW_TEST':
      _showNotification(
        '🔔 اختبار ناجح',
        'التنبيهات تعمل بنجاح ✅',
        '🕌'
      );
      break;

    case 'SKIP_WAITING':
      console.log('[SW] ⚡ تطبيق التحديث...');
      self.skipWaiting();
      break;

    case 'CHECK_VERSION':
      if (event.source) {
        event.source.postMessage({ 
          type: 'SW_VERSION', 
          version: SW_VERSION,
          hash: VERSION_HASH
        });
      }
      break;

    case 'FORCE_UPDATE_CHECK':
      console.log('[SW] 🔍 فحص تحديث إجباري...');
      _checkForUpdate();
      self.registration.update();
      break;

    case 'check_done':
      break;

    case 'CLEAR_ALL_CACHES':
      console.log('[SW] 🧹 مسح كل الكاشات بناءً على طلب المستخدم...');
      event.waitUntil(
        caches.keys()
          .then(names => Promise.all(names.map(n => caches.delete(n))))
          .then(() => {
            console.log('[SW] ✅ تم مسح كل الكاشات');
            if (event.source) {
              event.source.postMessage({ type: 'CACHES_CLEARED' });
            }
          })
      );
      break;
  }
});

/* ═══════════════════════════════════════════════════════════════
   📴 Local-only mode — لا يوجد Push Server
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   🕐  جدولة تنبيهات الصلاة القادمة
   ═══════════════════════════════════════════════════════════════ */
let _nextPrayerTimer = null;

async function _scheduleNextPrayer(times, settings) {
  if (!times || !settings) return;

  const now        = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const preMin     = settings.preAzanMinutes || 15;
  const postMin    = settings.postAzanMinutes || 15;

  const prayers = [
    { key: 'fajr',    label: 'الفجر',   icon: '🌅', isFajr: true  },
    { key: 'duha',    label: 'الضحى',   icon: '☀️', isFajr: false },
    { key: 'dhuhr',   label: 'الظهر',   icon: '🌞', isFajr: false },
    { key: 'asr',     label: 'العصر',   icon: '🌇', isFajr: false },
    { key: 'maghrib', label: 'المغرب',  icon: '🌆', isFajr: false },
    { key: 'isha',    label: 'العشاء',  icon: '🌙', isFajr: false }
  ];

  const athkarList = [
    { key: 'morning', label: 'أذكار الصباح', icon: '🌅', timeStr: settings.morningAthkarTime },
    { key: 'evening', label: 'أذكار المساء',  icon: '🌙', timeStr: settings.eveningAthkarTime },
    { key: 'sleep',   label: 'أذكار النوم',   icon: '😴', timeStr: settings.sleepAthkarTime   },
    { key: 'quran',   label: 'قراءة القرآن',  icon: '📖', timeStr: settings.quranReminderTime  }
  ];

  const supportsTimestampTrigger =
    typeof TimestampTrigger !== 'undefined' &&
    'showTrigger' in Notification.prototype;

  if (supportsTimestampTrigger) {
    console.log('[SW] ⚡ TimestampTrigger — الجدولة العميقة مفعّلة');

    try {
      const old = await self.registration.getNotifications({ tag: 'rafiq-ts' });
      old.forEach(n => n.close());
    } catch (_) {}

    for (const p of prayers) {
      const timeStr = times[p.key];
      if (!timeStr) continue;

      const [h, m]   = timeStr.split(':').map(Number);
      const azanDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
      if (azanDate <= now) continue;

      if (p.key !== 'duha' && settings.azanEnabled !== false) {
        const preDate = new Date(azanDate.getTime() - preMin * 60_000);
        if (preDate > now) {
          self.registration.showNotification(`${p.icon} اقترب وقت ${p.label}`, {
            body:        `باقي ${preMin} دقيقة على أذان ${p.label} — استعد لصلاة ${p.label} 🤲`,
            icon:        _emojiIcon(p.icon),
            tag:         `rafiq-ts-pre-${p.key}`,
            data:        { rmEvent: 'pre', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr },
            showTrigger: new TimestampTrigger(preDate.getTime()),
            dir: 'rtl', lang: 'ar',
            requireInteraction: false
          }).catch(() => {});
        }
      }

      if (p.key === 'duha' || settings.azanEnabled !== false) {
        self.registration.showNotification(`${p.icon} حان وقت ${p.label}`, {
          body:        p.isFajr
            ? 'الصَّلاةُ خَيْرٌ مِنَ النَّوْم — اللهُ أَكْبَر 🕌'
            : p.key === 'duha'
              ? 'صلاة الضحى ركعتان أو أكثر — أجرها عظيم 🤲'
              : `اللهُ أَكْبَر، حَيَّ عَلَى الصَّلاة 🕌`,
          icon:        _emojiIcon(p.icon),
          badge:       _emojiIcon('🕌'),
          tag:         `rafiq-ts-azan-${p.key}`,
          data:        { rmEvent: 'azan', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr },
          showTrigger: new TimestampTrigger(azanDate.getTime()),
          dir: 'rtl', lang: 'ar',
          requireInteraction: true,
          vibrate: [200, 100, 200, 100, 200],
          actions: [
            { action: 'open',    title: '📖 فتح التطبيق' },
            { action: 'dismiss', title: '✕ إغلاق' }
          ]
        }).catch(() => {});
      }

      if (settings.postAzanEnabled && p.key !== 'duha') {
        const postDate = new Date(azanDate.getTime() + postMin * 60_000);
        if (postDate > now) {
          self.registration.showNotification(`${p.icon} تذكير: ${p.label}`, {
            body:        `مرّت ${postMin} دقيقة على أذان ${p.label} — هل صلّيت؟ 🤲`,
            data:        { rmEvent: 'post', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr },
            icon:        _emojiIcon(p.icon),
            tag:         `rafiq-ts-post-${p.key}`,
            showTrigger: new TimestampTrigger(postDate.getTime()),
            dir: 'rtl', lang: 'ar'
          }).catch(() => {});
        }
      }
    }

    for (const a of athkarList) {
      if (!a.timeStr || settings.missedReminderEnabled === false) continue;
      const [h, m] = a.timeStr.split(':').map(Number);
      const aDate  = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
      if (aDate > now) {
        self.registration.showNotification(`${a.icon} موعد ${a.label}`, {
          body:        `حان وقت ${a.label} — لا تفوّت الأجر العظيم 🤲`,
          icon:        _emojiIcon(a.icon),
          tag:         `rafiq-ts-athkar-${a.key}`,
          showTrigger: new TimestampTrigger(aDate.getTime()),
          dir: 'rtl', lang: 'ar'
        }).catch(() => {});
      }
    }

    return;
  }

  /* ══ طريقة ب: setTimeout (باقي المتصفحات) ══════════════════ */
  console.log('[SW] ⏱️ setTimeout — الجدولة التقليدية');

  const _ms = (targetMinutes) => (targetMinutes - nowMinutes) * 60_000;
  const jobs = [];

  for (const p of prayers) {
    const timeStr = times[p.key];
    if (!timeStr) continue;
    const [h, m] = timeStr.split(':').map(Number);
    const pMin   = h * 60 + m;

    if (p.key !== 'duha' && settings.azanEnabled !== false) {
      const ms = _ms(pMin - preMin);
      if (ms > 0) jobs.push({ ms, fn: () => _showNotification(
        `${p.icon} اقترب وقت ${p.label}`,
        `باقي ${preMin} دقيقة على أذان ${p.label} — استعد لصلاة ${p.label} 🤲`,
        p.icon,
        { rmEvent: 'pre', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
      )});
    }

    const msA = _ms(pMin);
    if (msA > 0) jobs.push({ ms: msA, fn: () => _showNotification(
      `${p.icon} حان وقت ${p.label}`,
      p.isFajr
        ? 'الصَّلاةُ خَيْرٌ مِنَ النَّوْم — اللهُ أَكْبَر 🕌'
        : p.key === 'duha'
          ? 'صلاة الضحى ركعتان — أجرها عظيم 🤲'
          : `اللهُ أَكْبَر، حَيَّ عَلَى الصَّلاة 🕌`,
      p.icon,
      { rmEvent: 'azan', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
    )});

    if (settings.postAzanEnabled && p.key !== 'duha') {
      const msP = _ms(pMin + postMin);
      if (msP > 0) jobs.push({ ms: msP, fn: () => _showNotification(
        `${p.icon} تذكير: ${p.label}`,
        `مرّت ${postMin} دقيقة — هل صلّيت؟ 🤲`,
        p.icon,
        { rmEvent: 'post', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
      )});
    }
  }

  for (const a of athkarList) {
    if (!a.timeStr || settings.missedReminderEnabled === false) continue;
    const [h, m] = a.timeStr.split(':').map(Number);
    const msA    = _ms(h * 60 + m);
    if (msA > 0) jobs.push({ ms: msA, fn: () => _showNotification(
      `${a.icon} موعد ${a.label}`,
      `حان وقت ${a.label} — لا تفوّت الأجر العظيم 🤲`, a.icon
    )});
  }

  if (_nextPrayerTimer) clearTimeout(_nextPrayerTimer);
  jobs.sort((a, b) => a.ms - b.ms);

  if (jobs.length > 0) {
    const next = jobs[0];
    console.log(`[SW] ⏰ أقرب تنبيه بعد ${Math.round(next.ms / 60_000)} دقيقة`);
    _nextPrayerTimer = setTimeout(async () => {
      next.fn();
      const t = await _dbGet(STORE_SCHEDULE, 'times');
      const s = await _dbGet(STORE_SCHEDULE, 'settings');
      if (t && s) _scheduleNextPrayer(t, s);
    }, next.ms);
  }
}

/* ═══════════════════════════════════════════════════════════════
   🔍  فحص المواقيت الآن (ping + periodic sync)
   ─────────────────────────────────────────────────────────────
   ⚠️ ملاحظة مهمة: الـ SW مش مضمون يفضل شغال أو يتفتح كل 3 دقايق
   بالظبط — المتصفح ممكن يقفله ويصحّيه بس عند periodicsync أو
   رسالة أو إشعار. عشان كده بدل ما نشترط إن الفحص يحصل بالظبط
   في أول دقيقتين من ميعاد الصلاة، بنسمح بـ "نافذة تعويض" أوسع:
   لو السجعة/الأذان فاتت من شوية (مش لسه فاتت من كتير) وما
   اتبعتش إشعارها، نبعته بصياغة "فاتك" بدل ما نسيبه يضيع خالص.
   ═══════════════════════════════════════════════════════════════ */
const CATCHUP_WINDOW_MIN = 180; // لو فات الميعاد بأكتر من 3 ساعات، ما نبقاش نزعج المستخدم بإشعار متأخر جداً

async function _checkAndNotify() {
  const times     = await _dbGet(STORE_SCHEDULE, 'times');
  const settings  = await _dbGet(STORE_SCHEDULE, 'settings');
  const savedDate = await _dbGet(STORE_SCHEDULE, 'date');

  if (!times || !settings) return;

  const now        = new Date();
  const today      = now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (savedDate !== today) {
    await _dbSet(STORE_SCHEDULE, 'date', today);
    await _dbSet(STORE_NOTIFIED, 'fired', {});
  }

  const fired   = (await _dbGet(STORE_NOTIFIED, 'fired')) || {};
  let   updated = false;

  const prayers = [
    { key: 'fajr',    label: 'الفجر',   icon: '🌅', isFajr: true  },
    { key: 'duha',    label: 'الضحى',   icon: '☀️', isFajr: false },
    { key: 'dhuhr',   label: 'الظهر',   icon: '🌞', isFajr: false },
    { key: 'asr',     label: 'العصر',   icon: '🌇', isFajr: false },
    { key: 'maghrib', label: 'المغرب',  icon: '🌆', isFajr: false },
    { key: 'isha',    label: 'العشاء',  icon: '🌙', isFajr: false }
  ];

  const preMin  = settings.preAzanMinutes  || 15;
  const postMin = settings.postAzanMinutes || 15;

  for (const p of prayers) {
    const timeStr = times[p.key];
    if (!timeStr) continue;
    const [h, m]    = timeStr.split(':').map(Number);
    const prayerMin = h * 60 + m;

    const preKey    = `pre-${p.key}`;
    const preTarget = prayerMin - preMin;
    if (nowMinutes >= preTarget && nowMinutes <= preTarget + 2 &&
        !fired[preKey] && p.key !== 'duha' && settings.azanEnabled !== false) {
      fired[preKey] = true; updated = true;
      await _showNotification(
        `${p.icon} اقترب وقت ${p.label}`,
        `باقي ${preMin} دقيقة على أذان ${p.label} — استعد لصلاة ${p.label} 🤲`,
        p.icon,
        { rmEvent: 'pre', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
      );
    }

    const azanKey  = `azan-${p.key}`;
    const azanLate = nowMinutes - prayerMin; // كام دقيقة فاتت من ميعاد الأذان
    if (azanLate >= 0 && azanLate <= CATCHUP_WINDOW_MIN && !fired[azanKey]) {
      fired[azanKey] = true; updated = true;
      const isCatchup = azanLate > 2;
      await _showNotification(
        isCatchup ? `${p.icon} فاتك أذان ${p.label}` : `${p.icon} حان وقت ${p.label}`,
        isCatchup
          ? `أذان ${p.label} كان من ${azanLate} دقيقة — لسه في وقت للصلاة 🤲`
          : p.isFajr
            ? 'الصَّلاةُ خَيْرٌ مِنَ النَّوْم — اللهُ أَكْبَر 🕌'
            : p.key === 'duha'
              ? 'صلاة الضحى ركعتان — أجرها عظيم 🤲'
              : `اللهُ أَكْبَر، حَيَّ عَلَى الصَّلاة 🕌`,
        p.icon,
        { rmEvent: 'azan', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
      );
    }

    if (settings.postAzanEnabled && p.key !== 'duha') {
      const postKey    = `post-${p.key}`;
      const postTarget = prayerMin + postMin;
      const postLate   = nowMinutes - postTarget;
      if (postLate >= 0 && postLate <= CATCHUP_WINDOW_MIN && !fired[postKey]) {
        fired[postKey] = true; updated = true;
        await _showNotification(
          `${p.icon} تذكير: ${p.label}`,
          `مرّت ${postMin + Math.max(0, postLate - 2)} دقيقة — هل صلّيت؟ 🤲`,
          p.icon,
          { rmEvent: 'post', prayerKey: p.key, prayerLabel: p.label, isFajr: p.isFajr }
        );
      }
    }
  }

  if (settings.missedReminderEnabled !== false) {
    const athkarList = [
      { key: 'morning', label: 'أذكار الصباح', icon: '🌅', timeStr: settings.morningAthkarTime },
      { key: 'evening', label: 'أذكار المساء',  icon: '🌙', timeStr: settings.eveningAthkarTime },
      { key: 'sleep',   label: 'أذكار النوم',   icon: '😴', timeStr: settings.sleepAthkarTime   },
      { key: 'quran',   label: 'قراءة القرآن',  icon: '📖', timeStr: settings.quranReminderTime  }
    ];
    for (const a of athkarList) {
      if (!a.timeStr) continue;
      const [h, m]  = a.timeStr.split(':').map(Number);
      const athMin  = h * 60 + m;
      const athKey  = `athkar-${a.key}`;
      const athLate = nowMinutes - athMin;
      if (athLate >= 0 && athLate <= CATCHUP_WINDOW_MIN && !fired[athKey]) {
        fired[athKey] = true; updated = true;
        await _showNotification(
          `${a.icon} موعد ${a.label}`,
          `حان وقت ${a.label} — لا تفوّت الأجر العظيم 🤲`, a.icon
        );
      }
    }
  }

  if (updated) await _dbSet(STORE_NOTIFIED, 'fired', fired);
}

/* ═══════════════════════════════════════════════════════════════
   👆  النقر على الإشعار — فتح التطبيق
   ═══════════════════════════════════════════════════════════════ */
function _buildLaunchUrl(data = {}) {
  const params = new URLSearchParams();
  if (data.rmEvent) params.set('rm_event', data.rmEvent);
  if (data.prayerKey) params.set('prayer', data.prayerKey);
  if (data.prayerLabel) params.set('label', data.prayerLabel);
  if (data.isFajr) params.set('fajr', '1');
  const base = './index.html';
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const data = event.notification.data || {};
  const launchUrl = _buildLaunchUrl(data);

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clients => {
        for (const c of clients) {
          if ('focus' in c) {
            c.focus();
            c.postMessage({ type: 'notification_click', data });
            return;
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(launchUrl);
        }
      })
  );
});

self.addEventListener('notificationclose', event => {
  console.log('[SW] إشعار أُغلق:', event.notification.tag);
});

/* ═══════════════════════════════════════════════════════════════
   🛡️  إشعار مستمر (Foreground Service) — يمنع الأندرويد من قتل التطبيق
   ═══════════════════════════════════════════════════════════════ */
let _foregroundNotifTag = 'rafiq-foreground';

async function _updateForegroundNotification() {
  try {
    // حساب أقرب صلاة
    const times    = await _dbGet(STORE_SCHEDULE, 'times');
    const settings = await _dbGet(STORE_SCHEDULE, 'settings');
    let nextPrayer = '';
    let nextTime   = '';

    if (times) {
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();
      const prayers = [
        { key: 'fajr', label: 'الفجر' },
        { key: 'dhuhr', label: 'الظهر' },
        { key: 'asr', label: 'العصر' },
        { key: 'maghrib', label: 'المغرب' },
        { key: 'isha', label: 'العشاء' }
      ];
      for (const p of prayers) {
        const t = times[p.key];
        if (!t) continue;
        const [h, m] = t.split(':').map(Number);
        const pMin = h * 60 + m;
        if (pMin > nowMin) {
          nextPrayer = p.label;
          nextTime = t;
          break;
        }
      }
      if (!nextPrayer) {
        nextPrayer = 'الفجر';
        nextTime = times.fajr || '--:--';
      }
    }

    const body = nextPrayer
      ? `🕌 الصلاة القادمة: ${nextPrayer} (${nextTime}) — التنبيهات مفعّلة`
      : '🕌 التنبيهات مفعّلة — سيتم تنبيهك عند كل صلاة';

    await self.registration.showNotification('🛡️ رفيق المسلم', {
      body,
      icon:  _emojiIcon('🕌'),
      badge: _emojiIcon('🕌'),
      tag:   _foregroundNotifTag,
      dir:   'rtl',
      lang:  'ar',
      silent: true,  // بدون صوت — إشعار صامت دائم
      renotify: false,
      requireInteraction: true,
      data: { rmEvent: 'foreground' },
      actions: [
        { action: 'open',    title: '📖 فتح التطبيق' }
      ]
    });
  } catch (e) {
    console.warn('[SW] فشل إشعار Foreground:', e.message);
  }
}

/* ═══════════════════════════════════════════════════════════════
   🎨  دوال مساعدة
   ═══════════════════════════════════════════════════════════════ */

function _emojiIcon(emoji) {
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='82' font-size='80'>${encodeURIComponent(emoji)}</text></svg>`;
}

async function _showNotification(title, body, iconEmoji = '🕌', data = {}, extra = {}) {
  try {
    const isPrayerEvent = data.rmEvent === 'azan' || data.rmEvent === 'pre' || data.rmEvent === 'post';

    await self.registration.showNotification(title, {
      body,
      icon:              _emojiIcon(iconEmoji),
      badge:             _emojiIcon('🕌'),
      dir:               'rtl',
      lang:              'ar',
      tag:               isPrayerEvent ? `rafiq-prayer-${data.prayerKey || 'x'}` : `rafiq-${Date.now()}`,
      requireInteraction: isPrayerEvent,  // إشعارات الصلاة تفضل ظاهرة
      silent:            false,
      renotify:          true,            // حتى لو نفس الـ tag يعيد التنبيه
      vibrate:           isPrayerEvent
        ? [400, 200, 400, 200, 400, 200, 800]  // اهتزاز قوي للصلاة
        : [200, 100, 200, 100, 200],
      data,
      actions: isPrayerEvent ? [
        { action: 'open',    title: '🕌 فتح الأذان' },
        { action: 'dismiss', title: '✕ إغلاق' }
      ] : [
        { action: 'open',    title: '📖 فتح التطبيق' },
        { action: 'dismiss', title: '✕ إغلاق' }
      ],
      ...extra
    });

    // ⚡ فتح التطبيق تلقائياً عند أذان الصلاة (الأذان فقط)
    if (data.rmEvent === 'azan' && data.prayerKey !== 'duha') {
      console.log('[SW] 🚀 فتح التطبيق تلقائياً للأذان...');
      setTimeout(() => _autoOpenApp(data), 800);
    }

    console.log(`[SW] 🔔 ${title}`);
  } catch (e) {
    console.warn('[SW] فشل الإشعار:', e.message);
  }
}

/**
 * 🚀 فتح التطبيق تلقائياً — يحاول يركّز على التبويب المفتوح
 * أو يفتح تبويب جديد لو التطبيق مقفول
 */
async function _autoOpenApp(data = {}) {
  try {
    const launchUrl = _buildLaunchUrl(data);
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });

    // لو التطبيق مفتوح في تبويب — ركّز عليه
    for (const c of allClients) {
      if (c.url.includes('index.html') || c.url.includes(self.location.origin)) {
        await c.focus();
        c.postMessage({ type: 'notification_click', data });
        console.log('[SW] ✅ تم التركيز على التطبيق المفتوح');
        return;
      }
    }

    // لو التطبيق مقفول — افتحه
    if (self.clients.openWindow) {
      const newClient = await self.clients.openWindow(launchUrl);
      console.log('[SW] ✅ تم فتح التطبيق في تبويب جديد');
      // بعد ثانية أرسل رسالة عشان يشغّل الأذان
      if (newClient) {
        setTimeout(() => {
          try { newClient.postMessage({ type: 'notification_click', data }); } catch(_) {}
        }, 2000);
      }
    }
  } catch (e) {
    console.warn('[SW] فشل فتح التطبيق تلقائياً:', e.message);
  }
}

/* ═══════════════════════════════════════════════════════════════ */
console.log(`[SW] 🛰️ رفيق المسلم v${SW_VERSION} (${VERSION_HASH}) — جاهز ✅`);
