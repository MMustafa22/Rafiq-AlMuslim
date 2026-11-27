# أدوات الصيانة

## فحص الروابط (`check-links.mjs`)
يفحص الروابط الخارجية، وخادم كل قارئ، وتوقيتات mp3quran (ويتحقق من جدول `MP3QURAN_READ_ID`)، ومصادر صور المصحف.

```bash
node tools/check-links.mjs                      # فحص كامل (يحتاج إنترنت)
node tools/check-links.mjs --only=archive.org   # مضيف بعينه
node tools/check-links.mjs --max-per-host=60    # عيّنة سريعة
node tools/check-links.mjs --skip-generic       # القرّاء والتوقيتات والصور فقط
```
التقرير في `reports/link-report.md` و`reports/link-report.json`.
كود الخروج: `0` سليم، `1` فيه ميت، `2` لا اتصال كافٍ للحكم.

الفحص الدوري التلقائي: `.github/workflows/link-check.yml` (كل أحد، ويفتح Issue عند وجود روابط ميتة).
بدون GitHub: أضف في cron على أي سيرفر: `0 5 * * 0 cd /path && node tools/check-links.mjs`.

### كيف تتصرف مع النتيجة
- **قارئ لا تعمل ملفاته:** غيّر `server` في مصفوفة `RECITERS` داخل `quran.html` أو أخفِ القارئ.
- **توقيت غير صالح:** صحّح رقمه في `MP3QURAN_READ_ID` داخل `quran-audio-sync.js` (يرجع التطبيق للتقدير تلقائيًا حتى ذلك الحين).
- **رابط archive.org ميت:** ابحث عن نسخة بديلة أو احذف الحلقة من فهرس الخواطر.
