// Usage (Node 18+):  node tools/check-reciters.mjs [--quick] [path/to/quran.html]
// Checks every reciter/surah URL: reachable, real MP3 bytes, and HTTP Range (seek/stream) support.
import { readFileSync } from "node:fs";
const args = process.argv.slice(2);
const quick = args.includes("--quick");
const file = args.find(a => !a.startsWith("--")) || new URL("../quran.html", import.meta.url);
const html = readFileSync(file, "utf8");
const start = html.indexOf("const RECITERS=") + "const RECITERS=".length;
const RECITERS = JSON.parse(html.slice(start, html.indexOf("];", start) + 1));

const jobs = [];
for (const r of RECITERS) {
  let list = r.availableSurahs || Array.from({ length: 114 }, (_, i) => i + 1);
  if (quick) list = [list[0], list[Math.floor(list.length / 2)], list[list.length - 1]];
  const srv = r.server.endsWith("/") ? r.server : r.server + "/";
  for (const n of list) jobs.push({ r, n, url: `${srv}${String(n).padStart(3, "0")}.mp3` });
}

async function check({ url }) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 25000);
  try {
    const res = await fetch(url, { headers: { Range: "bytes=0-4095" }, redirect: "follow", signal: ctl.signal });
    const bytes = new Uint8Array(await res.arrayBuffer());
    const id3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
    const sync = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;
    if (!res.ok) return "HTTP " + res.status;
    if (!id3 && !sync) return "not an MP3 (" + (res.headers.get("content-type") || "?") + ")";
    if (res.status !== 206) return "OK-but-no-Range (status " + res.status + ")";
    return null;
  } catch (e) { return e.name === "AbortError" ? "timeout" : String(e.cause?.code || e.message); }
  finally { clearTimeout(t); }
}

const problems = new Map(); let done = 0;
async function worker(q) {
  while (q.length) {
    const j = q.shift(); const err = await check(j); done++;
    if (err) { const k = `${j.r.name} [${j.r.id}]`; (problems.get(k) || problems.set(k, []).get(k)).push(`${j.n}: ${err}`); }
    if (done % 50 === 0) process.stderr.write(`\r${done}/${jobs.length}`);
  }
}
await Promise.all(Array.from({ length: 6 }, () => worker(jobs)));
console.log(`\nChecked ${done} files for ${RECITERS.length} reciters.`);
if (!problems.size) console.log("All good ✔");
for (const [k, v] of problems) console.log(`\n✖ ${k}  (${v.length} problem${v.length > 1 ? "s" : ""})\n   ` + v.slice(0, 8).join("\n   ") + (v.length > 8 ? "\n   …" : ""));
process.exit(problems.size ? 1 : 0);
