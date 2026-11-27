#!/usr/bin/env node
/* ============================================================
   رفيق المسلم — فحص دوري للروابط الخارجية
   ------------------------------------------------------------
   يفحص (بدون أي مكتبات، Node 18+):
     ١) كل رابط خارجي مكتوب في ملفات التطبيق (archive.org وGitHub وغيرها).
     ٢) خادم كل قارئ: السور ١ و٢ و٥٦ و١١٢ و١١٤ (بحسب المتاح للقارئ).
     ٣) واجهة توقيتات mp3quran للقرّاء المربوطين بمعرّف توقيت
        (تتحقق أيضًا من صحة جدول MP3QURAN_READ_ID).
     ٤) مصادر صور المصحف (الصفحتان ١ و٦٠٤).
   يخرج تقريرًا JSON و Markdown في reports/.

   الاستخدام:
     node tools/check-links.mjs                      فحص كامل
     node tools/check-links.mjs --only=github.com    فحص مضيف بعينه
     node tools/check-links.mjs --max-per-host=60    عيّنة من كل مضيف
     node tools/check-links.mjs --skip-generic       القرّاء/التوقيتات/الصور فقط

   أكواد الخروج:
     0 = سليم  |  1 = روابط ميتة أو قرّاء/توقيتات معطّلة  |  2 = لا اتصال (لا يمكن الحكم)
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true];
}));
const TIMEOUT = Number(args.timeout || 15000);
const CONC = Number(args.concurrency || 6);
const MAX_PER_HOST = args['max-per-host'] ? Number(args['max-per-host']) : Infinity;
const ONLY = args.only ? String(args.only).split(',') : null;
const OUT = path.resolve(ROOT, String(args.out || 'reports'));
const UA = 'Mozilla/5.0 (compatible; RafiqLinkCheck/1.0; +https://github.com/)';

/* ---------------- مساعدات ---------------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const pad3 = n => String(n).padStart(3, '0');

async function probe(url, { retries = 2, json = false } = {}) {
  let last = { status: 0, kind: 'unreachable', note: '' };
  for (let attempt = 0; attempt <= retries; attempt++) {
    for (const method of ['HEAD', 'GET']) {
      const ac = new AbortController(); const t = setTimeout(() => ac.abort(), TIMEOUT);
      try {
        const headers = { 'User-Agent': UA, Accept: '*/*' };
        if (method === 'GET' && !json) headers.Range = 'bytes=0-0';
        const res = await fetch(url, { method, headers, redirect: 'follow', signal: ac.signal });
        let body = null;
        if (json && method === 'GET') { try { body = await res.json(); } catch { body = null; } }
        else if (method === 'GET') { try { await res.arrayBuffer(); } catch {} }
        clearTimeout(t);
        const s = res.status;
        if (s >= 200 && s < 400) return { status: s, kind: 'ok', body };
        if (s === 404 || s === 410) { last = { status: s, kind: 'dead' }; if (method === 'GET') return last; continue; }
        if (method === 'HEAD' && (s === 405 || s === 403 || s === 501 || s === 400)) continue; // جرّب GET
        last = { status: s, kind: 'flaky' };
      } catch (e) {
        clearTimeout(t);
        last = { status: 0, kind: 'unreachable', note: (e && (e.cause?.code || e.name)) || 'error' };
        if (method === 'HEAD') continue;
      }
    }
    if (attempt < retries) await sleep(800 * (attempt + 1));
  }
  return last;
}

/* مجمع مهام بحدّ تزامن + مهلة قصيرة بين الطلبات لنفس المضيف */
async function runPool(items, worker, conc = CONC) {
  const out = new Array(items.length); let i = 0;
  const hostLast = new Map();
  async function lane() {
    while (i < items.length) {
      const idx = i++; const it = items[idx];
      const host = it.host || '';
      const wait = Math.max(0, (hostLast.get(host) || 0) + 120 - Date.now());
      if (wait) await sleep(wait); hostLast.set(host, Date.now());
      out[idx] = await worker(it);
    }
  }
  await Promise.all(Array.from({ length: conc }, lane));
  return out;
}

/* يستخرج مصفوفة JS حرفية (RECITERS) من نص ملف ويقيّمها في sandbox */
function extractArray(src, marker) {
  const at = src.indexOf(marker); if (at < 0) return null;
  let i = src.indexOf('[', at), d = 0, ins = null;
  const start = i;
  for (; i < src.length; i++) {
    const c = src[i];
    if (ins) { if (c === '\\') i++; else if (c === ins) ins = null; continue; }
    if (c === '"' || c === "'" || c === '`') { ins = c; continue; }
    if (c === '[') d++; else if (c === ']') { d--; if (d === 0) break; }
  }
  try { return vm.runInNewContext('(' + src.slice(start, i + 1) + ')', {}, { timeout: 2000 }); } catch { return null; }
}

/* ---------------- ١) الروابط المكتوبة في الملفات ---------------- */
const SKIP_HOST = /(^|\.)(w3\.org|example\.com|localhost|rafiq\.local|schema\.org|xmlns\.com)$/i;
function collectUrls() {
  const files = fs.readdirSync(ROOT).filter(f => /\.(html|js|json|webmanifest)$/.test(f))
    .concat(fs.existsSync(path.join(ROOT, 'data')) ? fs.readdirSync(path.join(ROOT, 'data')).filter(f => /\.(js|json)$/.test(f)).map(f => 'data/' + f) : []);
  const map = new Map();
  for (const f of files) {
    let s; try { s = read(f); } catch { continue; }
    for (const m of s.matchAll(/https?:\/\/[^\s"'`<>\\]+/g)) {
      let u = m[0].replace(/[.,;:!?\]}]+$/, '');
      /* الأقواس جزء مشروع من بعض الروابط (أسماء ملفات)، نحذف ")" الزائدة فقط */
      while (u.endsWith(')') && (u.match(/\(/g) || []).length < (u.match(/\)/g) || []).length) u = u.slice(0, -1);
      if (/[${}]|%s|%7B|\*|\.\.\./.test(u)) continue;      // قوالب لا يمكن فحصها حرفيًا
      let host; try { host = new URL(u).host; } catch { continue; }
      if (SKIP_HOST.test(host)) continue;
      if (/^https?:\/\/[^/]+\/?$/.test(u) || u.endsWith('/')) continue; // جذور/مجلدات (تُفحص عبر القرّاء)
      if (!map.has(u)) map.set(u, { url: u, host, files: new Set() });
      map.get(u).files.add(f);
    }
  }
  return [...map.values()];
}

/* ---------------- ٢) القرّاء ---------------- */
function reciterJobs() {
  const q = read('quran.html');
  const list = extractArray(q, 'const RECITERS=') || [];
  const jobs = [];
  for (const r of list) {
    if (!r || !r.server) continue;
    const avail = Array.isArray(r.availableSurahs) && r.availableSurahs.length ? new Set(r.availableSurahs) : null;
    const wanted = [1, 2, 56, 112, 114].filter(n => !avail || avail.has(n));
    if (!wanted.length && avail) wanted.push([...avail][0]);
    for (const n of wanted) {
      const base = String(r.server).replace(/\/?$/, '/');
      jobs.push({ type: 'reciter', id: r.id, name: r.name, surah: n, url: `${base}${pad3(n)}.mp3`, host: new URL(base).host });
    }
  }
  return jobs;
}

/* ---------------- ٣) توقيتات mp3quran ---------------- */
function timingJobs() {
  const s = read('quran-audio-sync.js');
  const m = s.match(/MP3QURAN_READ_ID\s*=\s*\{([\s\S]*?)\};/);
  if (!m) return [];
  const map = {}; for (const x of m[1].matchAll(/"(\d+)":\s*(\d+)/g)) map[x[1]] = Number(x[2]);
  const q = read('quran.html'); const names = {};
  for (const r of (extractArray(q, 'const RECITERS=') || [])) names[r.id] = r.name;
  const jobs = [];
  for (const [rid, read_] of Object.entries(map))
    for (const surah of [1, 112]) jobs.push({ type: 'timing', id: rid, name: names[rid] || rid, readId: read_, surah, url: `https://www.mp3quran.net/api/v3/ayat_timing?read=${read_}&surah=${surah}`, host: 'www.mp3quran.net' });
  return jobs;
}
function validTiming(body, surah) {
  const rows = Array.isArray(body) ? body : body && (body.ayahs || body.timings || body.data);
  if (!Array.isArray(rows) || rows.length < (surah === 112 ? 3 : 2)) return false;
  return rows.some(r => r && (r.start_time != null || r.start != null || r.start_ms != null) && (r.ayah != null || r.ayah_number != null || r.verse != null));
}

/* ---------------- ٤) صور المصحف ---------------- */
function imageJobs() {
  const q = read('quran.html'); const urls = new Set();
  for (const m of q.matchAll(/`(https?:\/\/[^`]*\$\{[^`]*)`/g)) {
    for (const n of [1, 604]) {
      const u = m[1].replace(/\$\{String\([^)]*\)\.padStart\(3,\s*["']0["']\)\}/g, pad3(n)).replace(/\$\{(?:n|pageNo|p|page)\}/g, String(n));
      if (!/\$\{/.test(u)) urls.add(u);
    }
  }
  return [...urls].map(u => ({ type: 'image', url: u, host: new URL(u).host }));
}

/* ---------------- التشغيل ---------------- */
(async () => {
  const started = Date.now();
  const report = { checkedAt: new Date().toISOString(), generic: [], reciters: [], timings: [], images: [], summary: {} };

  let generic = args['skip-generic'] ? [] : collectUrls();
  if (ONLY) generic = generic.filter(g => ONLY.some(h => g.host.endsWith(h)));
  if (MAX_PER_HOST !== Infinity) {
    const per = {}; generic = generic.filter(g => (per[g.host] = (per[g.host] || 0) + 1) <= MAX_PER_HOST);
  }
  const filt = a => ONLY ? a.filter(x => ONLY.some(h => x.host.endsWith(h))) : a;
  const rj = filt(reciterJobs()), tj = filt(timingJobs()), ij = filt(imageJobs());

  console.log(`روابط: ${generic.length} | قرّاء: ${rj.length} | توقيتات: ${tj.length} | صور: ${ij.length}`);

  const g = await runPool(generic, async it => ({ ...it, files: [...it.files], ...(await probe(it.url)) }));
  report.generic = g;
  report.reciters = await runPool(rj, async it => ({ ...it, ...(await probe(it.url)) }));
  report.timings = await runPool(tj, async it => {
    const r = await probe(it.url, { json: true });
    const okShape = r.kind === 'ok' ? validTiming(r.body, it.surah) : false;
    const { body, ...rest } = r;
    return { ...it, ...rest, kind: r.kind === 'ok' && !okShape ? 'badshape' : r.kind };
  });
  report.images = await runPool(ij, async it => ({ ...it, ...(await probe(it.url)) }));

  const all = [...report.generic, ...report.reciters, ...report.timings, ...report.images];
  const cnt = k => all.filter(x => x.kind === k).length;
  report.summary = { total: all.length, ok: cnt('ok'), dead: cnt('dead'), badshape: cnt('badshape'), flaky: cnt('flaky'), unreachable: cnt('unreachable'), seconds: Math.round((Date.now() - started) / 1000) };

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'link-report.json'), JSON.stringify(report, null, 2));

  /* ---- تقرير Markdown ---- */
  const md = [];
  md.push(`# تقرير فحص الروابط`, '', `- التاريخ: ${report.checkedAt}`, `- المجموع: ${report.summary.total} | سليم: ${report.summary.ok} | ميت: ${report.summary.dead} | توقيتات غير صالحة: ${report.summary.badshape} | متذبذب: ${report.summary.flaky} | غير قابل للوصول: ${report.summary.unreachable}`, '');
  const bad = x => ['dead', 'badshape'].includes(x.kind);
  const dead = report.generic.filter(bad);
  if (dead.length) { md.push('## روابط ميتة في الملفات', '', '| الرابط | الحالة | الملفات |', '|---|---|---|'); dead.forEach(d => md.push(`| ${d.url} | ${d.status} | ${d.files.join(', ')} |`)); md.push(''); }
  const rb = report.reciters.filter(bad);
  if (rb.length) { md.push('## قرّاء لا تعمل ملفاتهم', '', '| القارئ | السورة | الرابط | الحالة |', '|---|---|---|---|'); rb.forEach(r => md.push(`| ${r.name} (${r.id}) | ${r.surah} | ${r.url} | ${r.status} |`)); md.push(''); }
  const tb = report.timings.filter(bad);
  if (tb.length) { md.push('## توقيتات mp3quran لا تعمل (تحقّق من MP3QURAN_READ_ID)', '', '| القارئ | read | السورة | الحالة |', '|---|---|---|---|'); tb.forEach(t => md.push(`| ${t.name} (${t.id}) | ${t.readId} | ${t.surah} | ${t.kind} ${t.status} |`)); md.push(''); }
  const ib = report.images.filter(bad);
  if (ib.length) { md.push('## مصادر صور المصحف', '', ...ib.map(i => `- ${i.url} → ${i.status}`), ''); }
  const fl = all.filter(x => x.kind === 'flaky' || x.kind === 'unreachable');
  if (fl.length) { md.push(`## متذبذب/غير قابل للوصول (${fl.length}) — أعد الفحص قبل الحكم`, '', ...fl.slice(0, 40).map(x => `- ${x.url} → ${x.status || x.note || x.kind}`), fl.length > 40 ? `- … و${fl.length - 40} آخرين` : '', ''); }
  if (!dead.length && !rb.length && !tb.length && !ib.length) md.push('✅ لا توجد روابط ميتة.');
  fs.writeFileSync(path.join(OUT, 'link-report.md'), md.join('\n'));

  console.log(JSON.stringify(report.summary));
  const failed0 = report.generic.filter(bad).length + report.reciters.filter(bad).length + report.timings.filter(bad).length + report.images.filter(bad).length;
  /* لو نصف الفحوص أو أكثر لم تصل أصلًا فالنتيجة لا تُعتبر "سليمة" (لا اتصال أو حجب) */
  if (all.length && report.summary.unreachable / all.length >= 0.5 && !failed0) {
    console.error(`⚠ ${report.summary.unreachable} من ${all.length} فحصًا لم يصل (لا اتصال أو حجب شبكة). لا يمكن الحكم على سلامة الروابط.`); process.exit(2);
  }
  const failed = dead.length + rb.length + tb.length + ib.length;
  if (failed) { console.error(`✖ ${failed} مشكلة. راجع ${path.join(OUT, 'link-report.md')}`); process.exit(1); }
  console.log('✔ سليم');
})();
