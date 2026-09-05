/* ═══════════════════════════════════════════════════════════════════════
   رفيق الصوت — مشغّل الأذكار الصوتي v208 (عداد متزامن + قلب صفحة + سابق)
   ← v208: مزامنة العدادات مع الصوت: عند تشغيل الذكر تُنقر الدائرة
      تلقائياً مع كل تكرار/جولة يكتمل (تسبيحات النوم كل نطق = نقرة على
      عداده الفرعي، والأذكار المكررة كل جولة = نقرة)، وعند اكتمال العداد
      يُضغط «سأقرأها» تلقائياً؛ والذكر «مرة واحدة» يُعلَّم «تمّ» عند انتهاء
      صوته. + قلب صفحة الأذكار تلقائياً لتتبع الذكر الجاري (في وضعي
      «الاستماع» و«تشغيل الكل» والتنقل التلقائي). + إصلاح زر «السابق»:
      يعمل الآن في كل الأوضاع مع إبراز البطاقة، وعند أول الذكر يعود إلى
      الذكر السابق كاملاً، وضغطة واحدة داخل عنصر مشغّل >3 ث تعيده من أوله.
      + ذكر النوم #3: الله أكبر 34 مرة (كما في حديث فاطمة رضي الله عنها).
   ← v207: رُكّب تسجيل المستخدم المرفق الجديد على ذكر #27 صباح
      «أصبحنا وأصبح الملك لله» (audio/adhkar-sabah/dhikr-27.mp3) — كان يُقرأ
      نصياً منذ v203 لعدم وجود تسجيل له حينها؛ يتكرر 3 مرات تلقائياً
      (بناءً على count «3 مرات» في بيانات الذكر).
      + رُكّب تسجيل المستخدم المرفق الجديد على ذكر #12 نوم «اللهم خلقت
      نفسي وأنت تتوفاها» (audio/adhkar-masaa/masaa-26.mp3) بدل التسجيل
      السابق (masaa-13 حُذف كيتيم).
      + الآن (v207) كل ذكر في الأقسام الثلاثة له تسجيل صوتي —
        التغطية 100%: صباح 35 محلي + 7 قرآني، مساء 28 + 8، نوم 11 + 4.
   ← v206: تكرار كل جزء بعدد مراته (rep): أعوذ ×3 ثم الآية مرة (صباح #24
      ومساء #23)، وسبحان الله العظيم وبحمده ×3 ثم الدعاء مرة (صباح #30)،
      وتسبيحات النوم 33+33+33 بالترتيب: أكبر ← سبحان ← حمد (نوم #3).
      + نوم #13: تسجيل واحد يطابق النص بالضبط (masaa-10) بدل جزأين
      كانا يكرران الصلاة الإبراهيمية مرتين.
      + مساء #19: نفس تسجيل الصباح المتطابق (dhikr-19).
      + إيقاف الأذكار مؤقتاً أثناء الأذان/الإقامة/تذكير ما بعد الأذان
      ثم استكمالها تلقائياً من نفس النقطة (athMP_suspendForSalah).
   ← v205: أذكار المساء والنوم تعمل بالتسجيلات المدمجة المرفقة (24 ملفاً
      في audio/adhkar-masaa/) حصرياً — أُزيلت كل روابط حمد الدريهم البعيدة
      (hisnmuslim.com) من قسمي المساء والنوم بالكامل.
      + الصلاة الإبراهيمية من المرفق في صباح #39 ومساء #35 (استبدال الطلب).
      + تصحيح حديث حذيفة (نوم #9): «اللهم باسمك أموت وأحيا» — موافق
        لصحيح البخاري 6324 (كان الترتيب معكوساً).
      + آية الحفظ (صباح #41) بتسجيل المرفق «فالله خير حفظا».
   ← v204: إصلاح جوهري — أُزيلت خاصية crossOrigin='anonymous' التي كانت
      تمنع تحميل الملفات المحلية عند فتح التطبيق مباشرة من المجلد (file://).
      + رسالة إرشادية عند فشل تحميل أي تسجيل محلي.
   ← v203: أذكار الصباح بالتسجيلات المرفقة (35 ملفاً في audio/adhkar-sabah/).
   ═══════════════════════════════════════════════════════════════════════
   • الآيات القرآنية (آية + سورة كاملة): 4 قرّاء بترتيب المستخدم —
     1) الحصري (الافتراضي) 2) المنشاوي 3) ماهر المعيقلي 4) القطامي
     عبر everyayah.com (+ mp3quran.net للسور الكاملة لماهر)
   • الأذكار غير القرآنية (الأقسام الثلاثة):
     – التسجيلات المدمجة المرفقة حصراً: audio/adhkar-sabah/ (صباح)
       و audio/adhkar-masaa/ (مساء ونوم) — تعمل بلا إنترنت إطلاقاً
       وبلا أي مصدر بعيد (v205: أُزيل صوت حمد الدريهم من كل الأقسام).
   • التكرار حسب الملف بالضبط: كل ذكر (آيات أو دعاء) يتكرر بعدد
     مراته في ملف البيانات — «مرة واحدة» مرة، «3 مرات» ثلاثاً،
     «4 مرات» أربعاً، «7 مرات» سبعاً (وما زاد كـ 100 يُحدّ عند 7).
   • عند اختيار قارئ من المربع المنبثق: المربع يختفي فوراً
     والقارئ المختار يبدأ التلاوة في الحال (بدون زر إضافي).
   • "تشغيل الكل" = بنفس ترتيب البرنامج بالضبط:
     كل ذكر يُشغّل في موقعه الطبيعي داخل القسم —
     ذكر قرآني → آيات بصوت القارئ المختار،
     ذكر صباحي دعائي → التسجيل المدمج المرفق لنفس الذكر،
     ذكر دعائي (أي قسم) → التسجيل المدمج المرفق لنفس الذكر.
   • منطق التكرار الدورى Round-Robin (للطابور الكامل):
     عند تشغيل ذكر فيه عدة عناصر (مثل الإخلاص+الفلق+الناس) و count=3:
     يبني الطابور: [إخلاص(جولة1)، فلق(جولة1)، ناس(جولة1)،
                    إخلاص(جولة2)، فلق(جولة2)، ناس(جولة2)،
                    إخلاص(جولة3)، فلق(جولة3)، ناس(جولة3)]
     ثم ينتقل تلقائياً للذكر التالي في القسم — هكذا حتى آخر ذكر.
   • معالجة الأذكار غير القرآنية في "تشغيل الكل":
     كل ذكر دعائي له تسجيل حقيقي يُشغّل في موقته بترتيب البرنامج
     (بدون تخطي ولا إلحاق في النهاية) — وفي أذكار الصباح يشترط
     وجود تسجيل مدمج مطابق للنص (لا مصدر بعيد إطلاقاً).
   • وسم الجولة (Round Indicator): يظهر بوضوح في الـ mini-player وعلى
     البطاقة النشطة — "الجولة X/Y" — مع تأثير نبضي جذاب
   • بدون استنساخ صوتي — كل الأصوات حقيقية من قرّاء مشهورين

   المصادر المفتوحة المرجعية (لاستلال الهيكلة والبيانات والصوت):
   - MuslimPack/HisnElmoslem_App على GitHub (هيكلة أذكار منظمة)
   - Seen-Arabic/Morning-And-Evening-Adhkar-DB (JSON مع حقل audio)
   - rn0x/Adhkar-json (حصن المسلم: نص + صوت حمد الدريهم لكل ذكر)
   - Islamic-APIs على GitHub (واجهات برمجية للقرآن والأذكار)
   - everyayah.com (آيات قرآنية بصوت القُرّاء المعروفين)
   - mp3quran.net (سور كاملة بصوت ماهر المعيقلي)
   - hisnmuslim.com (تسجيلات حمد الدريهم الأصلية لحصن المسلم)
═══════════════════════════════════════════════════════════════════════ */

(function(){
'use strict';

/* ══════════════ 1. خريطة أسماء السور إلى أرقامها ══════════════ */
var SURAH_NAMES_TO_NUM = {
  'الفاتحة':1,'البقرة':2,'بقرة':2,'آل عمران':3,'النساء':4,'المائدة':5,
  'الأنعام':6,'الأعراف':7,'الأنفال':8,'التوبة':9,'يونس':10,'هود':11,
  'يوسف':12,'الرعد':13,'إبراهيم':14,'الحجر':15,'النحل':16,'الإسراء':17,
  'الكهف':18,'مريم':19,'طه':20,'الأنبياء':21,'الحج':22,'المؤمنون':23,
  'النور':24,'الفرقان':25,'الشعراء':26,'النمل':27,'القصص':28,
  'العنكبوت':29,'الروم':30,'لقمان':31,'السجدة':32,'الأحزاب':33,
  'سبأ':34,'فاطر':35,'يس':36,'الصافات':37,'ص':38,'الزمر':39,'غافر':40,
  'المؤمن':40,'فصلت':41,'الشورى':42,'الزخرف':43,'الدخان':44,
  'الجاثية':45,'الأحقاف':46,'محمد':47,'الفتح':48,'الحجرات':49,'ق':50,
  'الذاريات':51,'الطور':52,'النجم':53,'القمر':54,'الرحمن':55,
  'الواقعة':56,'الحديد':57,'المجادلة':58,'الحشر':59,'الممتحنة':60,
  'الصف':61,'الجمعة':62,'المنافقون':63,'التغابن':64,'الطلاق':65,
  'التحريم':66,'الملك':67,'القلم':68,'الحاقة':69,'المعارج':70,
  'نوح':71,'الجن':72,'المزمل':73,'المدثر':74,'القيامة':75,
  'الإنسان':76,'المرسلات':77,'النبأ':78,'النازعات':79,'عبس':80,
  'التكوير':81,'الانفطار':82,'المطففين':83,'الانشقاق':84,'البروج':85,
  'الطارق':86,'الأعلى':87,'الغاشية':88,'الفجر':89,'البلد':90,
  'الشمس':91,'الليل':92,'الضحى':93,'الشرح':94,'التين':95,'العلق':96,
  'القدر':97,'البينة':98,'الزلزلة':99,'العاديات':100,'القارعة':101,
  'التكاثر':102,'العصر':103,'الهمزة':104,'الفيل':105,'قريش':106,
  'الماعون':107,'الكوثر':108,'الكافرون':109,'النصر':110,'المسد':111,
  'الإخلاص':112,'الفلق':113,'الناس':114
};

/* ══════════════ 2. عدد آيات كل سورة (مصحف عثماني — 114 سورة) ══════════════ */
var SURAH_AYAT_COUNT = [0,
  7,286,200,176,120,165,206,75,129,109,      // 1-10
  123,111,43,52,99,128,111,110,98,135,       // 11-20
  112,78,118,64,77,227,93,88,69,60,          // 21-30
  34,30,73,54,45,83,182,88,75,85,            // 31-40
  54,53,89,59,37,35,38,29,18,45,             // 41-50
  60,49,62,55,78,96,29,22,24,13,             // 51-60
  14,11,11,18,12,30,30,52,52,44,             // 61-70
  28,28,20,56,40,31,50,40,46,42,             // 71-80
  29,19,36,25,22,17,19,26,30,20,             // 81-90
  15,21,11,8,8,8,19,5,8,8,                   // 91-100
  11,11,8,3,9,5,4,7,3,6,                     // 101-110
  3,5,4,5,6                                  // 111-114
];

/* ══════════════ 3. صوت القرآن — 4 قرّاء بترتيب المستخدم (everyayah.com) ══════════════
   الترتيب المطلوب: الحصري ← المنشاوي ← ماهر المعيقلي ← ناصر القطامي
   (حُذف عبد الباسط بناءً على طلب المستخدم).
   كل المجلدات متحقق من عملها على everyayah.com (اختبار HTTP 200):
     Husary_128/64 · Minshawy_Murattal_128 + Mujawwad_64 ·
     Maher_AlMuaiqly_64 + MaherAlMuaiqly128 · Nasser_Alqatami_128
   القارئ الافتراضي: الحصري (الأول — بناءً على طلب المستخدم).
════════════════════════════════════════════════════════════ */
var RECITERS = [
  { id:'husary',    name:'محمود خليل الحصري',     short:'الحصري',
    everyAyah:'Husary_128kbps',               everyAyahHigh:'Husary_64kbps',
    fullSurah:'https://server13.mp3quran.net/husr/' },
  { id:'minshawy',  name:'محمد الصديق المنشاوي',  short:'المنشاوي',
    everyAyah:'Minshawy_Murattal_128kbps',   everyAyahHigh:'Minshawy_Mujawwad_64kbps',
    fullSurah:'https://server10.mp3quran.net/minsh/' },
  { id:'maher',     name:'ماهر المعيقلي',         short:'المعيقلي',
    everyAyah:'Maher_AlMuaiqly_64kbps',     everyAyahHigh:'MaherAlMuaiqly128kbps',
    fullSurah:'https://server12.mp3quran.net/maher/' },
  { id:'qatami',    name:'ناصر القطامي',           short:'القطامي',
    everyAyah:'Nasser_Alqatami_128kbps',    everyAyahHigh:'Nasser_Alqatami_128kbps',
    fullSurah:'https://server6.mp3quran.net/qtm/' }
];
var RECITER_EVERY_AYAH_BASE = 'https://everyayah.com/data/';
var RECITER_DEFAULT_IDX = 0; // الحصري — الأول بناءً على طلب المستخدم

function _athMP_getReciterIdx(){
  try{
    var id = localStorage.getItem('rfq_reciter2');
    if(id){ for(var i=0;i<RECITERS.length;i++){ if(RECITERS[i].id===id) return i; } }
  }catch(e){}
  return RECITER_DEFAULT_IDX;
}
function _athMP_setReciterIdx(idx){
  if(idx<0||idx>=RECITERS.length) return;
  try{ localStorage.setItem('rfq_reciter2', RECITERS[idx].id); }catch(e){}
  RAQ.reciterIdx = idx;
  // حدّث الـ UI للقارئ الحالي
  var el = document.getElementById('mpReciterName');
  if(el) el.textContent = RECITERS[idx].short;
}
function _athMP_currentReciter(){
  if(RAQ.reciterIdx == null) RAQ.reciterIdx = _athMP_getReciterIdx();
  return RECITERS[RAQ.reciterIdx] || RECITERS[0];
}

// للتوافق مع كود قديم
var EVERY_AYAH_128 = RECITER_EVERY_AYAH_BASE + 'MaherAlMuaiqly128kbps/';
var EVERY_AYAH_64 = RECITER_EVERY_AYAH_BASE + 'Maher_AlMuaiqly_64kbps/';
var ISLAMIC_NET_BASE_64 = 'https://cdn.islamic.network/quran/audio/64/ar.mahermuaiqly/';
var EVERY_AYAH_ALAFASY = RECITER_EVERY_AYAH_BASE + 'Alafasy_128kbps/'; // fallback أخير فقط
var MAHER_FULL_SURAH = 'https://server12.mp3quran.net/maher/';
var ALAFASY_FULL_SURAH = 'https://server8.mp3quran.net/afs/';

/* ══════════════ 4. صوت الأذكار غير القرآنية — تسجيلات مدمجة حصرياً ══════════════
   (v205) لا توجد أي روابط بعيدة هنا — كل الأذكار الدعائية في الأقسام
   الثلاثة تعمل بالتسجيلات المدمجة المرفقة (59 ملفاً محلياً) بلا إنترنت.
   خريطة DHIKR_AUDIO فارغة عمداً (كانت روابط حمد الدريهم من hisnmuslim.com
   قبل v205 — أُزيلت بناءً على طلب المستخدم). المتغيرات التالية باقية
   للتوافق مع الكود القديم فقط ولا تؤثر في التشغيل.
   المفتاح: "رقم القسم-رقم الذكر" (0 صباح / 1 مساء / 2 نوم).
══════════════════════════════════════════════════════════════ */
var DHIKR_AUDIO_CDN = [
  'https://www.hisnmuslim.com/audio/ar/',
  'https://cdn.jsdelivr.net/gh/rn0x/Adhkar-json@main/audio/'
];
var DHIKR_RECITER = 'حمد الدريهم';
// (v205) صُفِّرت الخريطة بالكامل: كل تسجيلات الأذكار الدعائية محلية مدمجة
// الآن (audio/adhkar-sabah/ للصباح و audio/adhkar-masaa/ للمساء والنوم).
// لا يوجد أي مصدر بعيد بصوت حمد الدريهم في أي قسم — بناءً على طلب المستخدم.
// (v207) التغطية مكتملة: كل ذكر دعائي في الأقسام الثلاثة له تسجيل
// محلي (مساء #19 له dhikr-19 منذ v206) — لا يوجد ذكر نصي بعد الآن.
var DHIKR_AUDIO = {};
// للتوافق مع كود قديم (أسماء الأقسام)
var SECTION_AUDIO = [null, null, null];
var SECTION_RECITER = DHIKR_RECITER;
var SECTION_NAMES = ['أذكار الصباح', 'أذكار المساء', 'أذكار النوم'];

/* ══════════════ 4-ج. (v202) التسجيلات المحلية المدمجة — تطابق نصي كامل ══════════════
   59 تسجيلاً صوتياً مدمجاً داخل التطبيق:
   • audio/adhkar-sabah/  (35 ملفاً) — أذكار الصباح (v203 + dhikr-27 في v207).
   • audio/adhkar-masaa/  (24 ملفاً) — أذكار المساء والنوم (v205 + masaa-26 في v207 بدل masaa-13).
   (المصدر 24kHz — حُوِّل إلى MP3 96kbps عالي الجودة لتحميل وتخزين أسرع).
   كل ملف مربوط بذكرٍ يتطابق نصُّه مع نص التسجيل تطابقاً تاماً (تطبيع الحركات
   والهمزات للتحقق، ثم مراجعة يدوية لكل حالة — أو تسجيل المستخدم المرفق
   بعينه كما في v207 لذكر 0-27 و 2-12).
   أولوية التشغيل (v205): كل الأقسام = التسجيل المحلي حصراً — لا fallback
   بعيد إطلاقاً (لا صوت حمد الدريهم في أي مكان).
   يعمل التسجيل المحلي بلا إنترنت إطلاقاً (مُخزَّن مسبقاً في Service Worker).
   المفتاح "القسم-الذكر": 0 صباح / 1 مساء / 2 نوم.
   LOCAL_DHIKR_FULL  : تسجيل واحد يغطي الذكر كاملاً.
   LOCAL_DHIKR_PARTS : تسجيل مستقل لكل جزء — يُشغَّل بترتيب أجزاء الذكر.
   مسارات الملفات: بسيطة (dhikr-XX.mp3) = مجلد الصباح، أو كاملة
   (audio/adhkar-masaa/masaa-XX.mp3) — يدعمها المشغل مباشرة.
   مفاتيح المساء التي تشير لملفات الصباح: نصوصها متطابقة حرفياً.
════════════════════════════════════════════════════════════════════════ */
var LOCAL_DHIKR_DIR = 'audio/adhkar-sabah/';
var LOCAL_DHIKR_FULL = {
  '0-2': 'dhikr-02.mp3',   // صباح — الوصفة النبوية لكفاية أمور الدنيا والآخرة
  '0-3': 'dhikr-03.mp3',   // صباح — الوصفة النبوية للبراءة من النار
  '0-4': 'dhikr-04.mp3',   // صباح — الوصفة النبوية لتكميل نعم الله على العبد
  '0-5': 'dhikr-05.mp3',   // صباح — الوصفة النبوية لشكر نعم الله بالليل والنهار
  '0-6': 'dhikr-06.mp3',   // صباح — الوصفة النبوية للحصول على مرضات الله
  '0-7': 'dhikr-07.mp3',   // صباح — الوصفة النبوية لطلب خيرات الدنيا والآخرة
  '0-8': 'dhikr-08.mp3',   // صباح — الوصفة النبوية للوقاية من المصائب المفاجئة
  '0-9': 'dhikr-09.mp3',   // صباح — إذا انتظر خبراً دعا بهذا الدعاء
  '0-10': 'dhikr-10.mp3',   // صباح — الوصفة النبوية لتسبيح الله تعالى وتحميده
  '0-11': 'dhikr-11.mp3',   // صباح — الوصفة النبوية للصحة والعافية البدنية
  '0-12': 'dhikr-12.mp3',   // صباح — الوصفة النبوية للوقاية من وسوسة الشيطان
  '0-13': 'dhikr-13.mp3',   // صباح — الوصفة النبوية لدخول الجنة — سيد الاستغفار
  '0-14': 'dhikr-14.mp3',   // صباح — الوصفة النبوية لكل عافية
  '0-15': 'dhikr-15.mp3',   // صباح — الوصفة النبوية لإزالة الهموم وأداء الديون
  '0-16': 'dhikr-16.mp3',   // صباح — الوصفة النبوية للحصول على العلم النافع والرزق الحلال
  '0-17': 'dhikr-17.mp3',   // صباح — الوصفة النبوية للنجاة من النار
  '0-18': 'dhikr-18.mp3',   // صباح — الوصفة النبوية لحصول الأجر من الله تعالى حسب شأنه
  '0-19': 'dhikr-19.mp3',   // صباح — الوصفة النبوية للنجاة من المصائب
  '0-20': 'dhikr-20.mp3',   // صباح — الوصفة النبوية لنيل الرزق الأفضل والتحفظ من المكاره
  '0-25': 'dhikr-25.mp3',   // صباح — الوصفة النبوية لقضاء الحوائج وتحقيق سائر الأهداف
  '0-26': 'dhikr-26.mp3',   // صباح — الوصفة النبوية للوقاية من شر الجن
  '0-27': 'dhikr-27.mp3',   // صباح (v207) — الوصفة النبوية للوقاية من الشيطان والسحر (أصبحنا وأصبح الملك لله — تسجيل المستخدم المرفق، يتكرر 3 مرات تلقائياً)
  '0-28': 'dhikr-28.mp3',   // صباح — الوصفة المهمة للوقاية من السحر
  '0-29': 'dhikr-29.mp3',   // صباح — الوصفة النبوية لنيل الحسنات وعفو السيئات
  '0-32': 'dhikr-32.mp3',   // صباح — دعاء أصبحنا — التوكل على الله
  '0-33': 'dhikr-33.mp3',   // صباح — دعاء أصبحنا — طلب خير اليوم
  '0-34': 'dhikr-34.mp3',   // صباح — دعاء صلاح النهار وفلاحه
  '0-35': 'dhikr-35.mp3',   // صباح — دعاء الفطرة والإسلام — أصبحنا على فطرة الإسلام
  '0-36': 'dhikr-36.mp3',   // صباح — خمس كلمات للدنيا وخمس كلمات للآخرة
  '0-37': 'dhikr-37.mp3',   // صباح — التسبيح والتحميد والتهليل والتكبير
  '0-38': 'dhikr-38.mp3',   // صباح — الاستغفار
  '0-39': 'audio/adhkar-masaa/masaa-14.mp3',   // صباح — الصلاة على النبي ﷺ (v205: تسجيل المرفق الإبراهيمي الكامل)
  '0-40': 'dhikr-40.mp3',   // صباح — يا الله! يا حفيظ
  '1-4': 'dhikr-02.mp3',   // مساء — الوصفة النبوية لكفاية أمور الدنيا والآخرة
  '1-8': 'dhikr-06.mp3',   // مساء — الوصفة النبوية لإرضاء الله عبده يوم القيامة
  '1-9': 'dhikr-07.mp3',   // مساء — الوصفة النبوية لتحصيل خيرات الدنيا والآخرة
  '1-10': 'dhikr-08.mp3',   // مساء — الوصفة النبوية للوقاية من فجاءة بلاء
  '1-11': 'dhikr-11.mp3',   // مساء — الوصفة النبوية للعافية البدنية
  '1-12': 'dhikr-12.mp3',   // مساء — الوصفة النبوية للوقاية من وسوسة الشيطان
  '1-13': 'dhikr-13.mp3',   // مساء — الوصفة النبوية لدخول الجنة — سيد الاستغفار
  '1-14': 'dhikr-14.mp3',   // مساء — الوصفة النبوية لكل نوع من العافية
  '1-15': 'dhikr-15.mp3',   // مساء — الوصفة النبوية لتفريج الكرب وأداء الديون
  '1-16': 'dhikr-17.mp3',   // مساء — الوصفة النبوية للنجاة من النار
  '1-17': 'dhikr-18.mp3',   // مساء — الوصفة النبوية لتحصيل الثواب من الله تعالى حسب شأنه
  '1-24': 'dhikr-25.mp3',   // مساء — الوصفة النبوية لقضاء الحوائج وتحقيق سائر الأهداف
  '1-27': 'dhikr-28.mp3',   // مساء — الوصفة المهمة للوقاية من السحر
  '1-30': 'dhikr-09.mp3',   // مساء — دعاء عند انتظار خبر
  '1-33': 'dhikr-37.mp3',   // مساء — التسبيح والتحميد والتهليل والتكبير
  '1-34': 'dhikr-38.mp3',   // مساء — الاستغفار
  '1-35': 'audio/adhkar-masaa/masaa-14.mp3',   // مساء — الصلاة على النبي ﷺ (v205: تسجيل المرفق الإبراهيمي الكامل)
  // ─── (v205) أذكار المساء — تسجيلات المرفق audio/adhkar-masaa/ ───
  '1-5':  'audio/adhkar-masaa/masaa-11.mp3',  // مساء — البراءة من النار (أشهدك وحملة عرشك)
  '1-6':  'audio/adhkar-masaa/masaa-12.mp3',  // مساء — تكميل نعم الله (نعمة وعافية وستر)
  '1-7':  'audio/adhkar-masaa/masaa-17.mp3',  // مساء — شكر النعم (ما أمسى بي من نعمة)
  '1-18': 'audio/adhkar-masaa/masaa-01.mp3',  // مساء — الوقاية من كل حيوان مؤذي (كلمات الله التامات)
  '1-19': 'dhikr-19.mp3',                     // مساء (v206) — الوقاية من المصائب جميعاً (نص مطابق لصباح #19 — نفس التسجيل، بناءً على طلب المستخدم)
  '1-20': 'audio/adhkar-masaa/masaa-18.mp3',  // مساء — طلب عطاء الله عند المغرب (إقبال ليلك)
  '1-21': 'audio/adhkar-masaa/masaa-22.mp3',  // مساء — التسبيح العظيم (عدد ما خلق)
  '1-25': 'audio/adhkar-masaa/masaa-03.mp3',  // مساء — الوقاية من شر الجن (أعوذ بوجه الله الكريم)
  '1-26': 'audio/adhkar-masaa/masaa-06.mp3',  // مساء — الوقاية من السحر والشيطان (أمسينا وأمسى الملك)
  '1-31': 'audio/adhkar-masaa/masaa-05.mp3',  // مساء — دعاء أمسينا (طلب خير المساء)
  '1-32': 'audio/adhkar-masaa/masaa-04.mp3',  // مساء — أمسينا على فطرة الإسلام
  // ─── (v205) أذكار النوم — تسجيلات المرفق audio/adhkar-masaa/ ───
  '2-4':  'audio/adhkar-masaa/masaa-21.mp3',  // نوم — دعاء النوم الجامع (باسمك اللهم أموت وأحيا)
  '2-5':  'audio/adhkar-masaa/masaa-02.mp3',  // نوم — الاستعاذة من شر الشيطان والهوام (من غضبه وعقابه)
  '2-7':  'audio/adhkar-masaa/masaa-16.mp3',  // نوم — الدعاء قبل النوم طلباً للمغفرة (قني عذابك)
  '2-8':  'dhikr-38.mp3',                      // نوم — الاستغفار قبل النوم (نص الاستغفار المتطابق — تسجيل الصباح)
  '2-9':  'audio/adhkar-masaa/masaa-19.mp3',  // نوم — دعاء الاضطجاع (اللهم باسمك أموت وأحيا — المصحح)
  '2-10': 'audio/adhkar-masaa/masaa-09.mp3',  // نوم — دعاء الهم والحزن (رحمة من عندك)
  '2-11': 'audio/adhkar-masaa/masaa-25.mp3',  // نوم — دعاء التقلب في الفراش (لا إله إلا الله الواحد القهار)
  '2-12': 'audio/adhkar-masaa/masaa-26.mp3',  // نوم (v207) — الدعاء الجامع للحفظ (اللهم خلقت نفسي وأنت تتوفاها) — تسجيل المستخدم المرفق الجديد بنفس الاسم، بدل masaa-13 (حُذف)
  '2-13': 'audio/adhkar-masaa/masaa-10.mp3',  // نوم (v206) — الرؤيا الصالحة + الصلاة الإبراهيمية بلا «اللهم بارك» (تسجيل واحد يطابق النص بالضبط)
  '2-15': 'audio/adhkar-masaa/masaa-08.mp3',  // نوم — دعاء التفويض والتوكل (أسلمت نفسي إليك)
};
var LOCAL_DHIKR_PARTS = {
  '0-24': {0:'dhikr-24.mp3'},   // صباح — الوصفة النبوية لاستحقاق دعاء الملائكة وأجر الشهادة
  '0-30': {0:'dhikr-30a.mp3', 1:'dhikr-30b.mp3'},   // صباح — الوصفة النبوية للوقاية من ثلاثة أمراض معضلة
  '0-41': {0:'audio/adhkar-masaa/masaa-24.mp3'},   // صباح (v205) — آية الحفظ «فالله خير حفظا وهو أرحم الراحمين»
  '1-23': {0:'dhikr-24.mp3'},   // مساء — الوصفة النبوية لاستحقاق دعاء الملائكة وأجر الشهادة
  '2-3':  {0:'audio/adhkar-masaa/masaa-07.mp3',    // نوم (v206) — الله أكبر ×33 (نطق واحد يتكرر rep:33)
           1:'audio/adhkar-masaa/masaa-23.mp3',    // سبحان الله ×33
           2:'audio/adhkar-masaa/masaa-20.mp3'},   // الحمد لله ×33 — بالترتيب الذي طلبه المستخدم
  // (v206) نوم #13: نقله لتسجيل كامل واحد في LOCAL_DHIKR_FULL (masaa-10) —
  // كان جزأين (masaa-10 + masaa-14) فيكرر الصلاة الإبراهيمية مرتين ويضيف «اللهم بارك»
};
// هل لهذا الذكر تسجيل محلي مدمج؟ (لعرض شارة 🎙️ على البطاقة)
function RA_hasLocalAudio(t, n){
  var k = t + '-' + n;
  return !!(LOCAL_DHIKR_FULL[k] || LOCAL_DHIKR_PARTS[k]);
}


/* ══════════════ 5. حالة المشغل ══════════════ */
var RAQ = {
  queue: [],            // array of audio items: {type:'quran', surah, from, to, ...}
  idx: 0,               // index of currently playing item
  isPlaying: false,
  audioEl: null,        // <audio> element
  playAllMode: false,
  playAllType: -1,      // 0=morning, 1=evening, 2=sleep
  currentDhikrKey: null,
  isSectionAudio: false, // تم التعطيل — لا ملفات مدمجة بعد الآن
  sectionType: -1,
  reciterIdx: null,     // index into RECITERS — يُهيّأ من localStorage
  _singleDhikrT: null,  // قيد التنقل التلقائي: نوع الذكر المنفرد الجاري تشغيله
  _singleDhikrN: null,  // قيد التنقل التلقائي: رقم الذكر المنفرد الجاري تشغيله
  _salahSuspend: null,  // (v206) إيقاف مؤقت لأجل الأذان/الإقامة: 'azan'|'iqama'|'post'
  _advToken: 0         // (v208) رمز إبطال مهلات الانتقال التلقائي — يمنع صحو الصوت بعد الإغلاق
};

/* ══════════════ 6. تحويل نص "العدد" إلى رقم (للتكرار) ══════════════ */
function parseCount(s){
  if(!s) return 1;
  s = String(s);
  // عدّة مركّبة مثل "34+33+33" (سبحان 33 + الحمد 33 + أكبر 34):
  // التسجيل الواحد يغطي التسلسل كاملاً — فتكرار واحد فقط
  if(s.indexOf('+') > -1) return 1;
  var m = s.match(/(\d+)/);
  var n = m ? parseInt(m[1], 10) : 1;
  if(!n || n < 1) n = 1;
  // حد أقصى 100 — لدعم الأذكار التي تُقال 100 مرة (سبحان الله وبحمده، الاستغفار، الصلاة على النبي)
  if(n > 100) n = 100;
  return n;
}

/* ══════════════ 7. تحليل مرجع السورة (مثل "البقرة: 255") ══════════════ */
function parseSurahRef(ref){
  if(!ref) return null;
  var s = String(ref).replace(/\s+/g,' ').trim();
  // مطابقة: "البقرة: 255" أو "البقرة: 255 – 286" أو "البقرة 255"
  var m = s.match(/^([^\d:：\-–]+?)\s*[:：]?\s*(\d+)(?:\s*[-–]\s*(\d+))?/);
  if(!m) return null;
  var surahName = m[1].trim();
  // إزالة "سورة" إن وُجدت
  surahName = surahName.replace(/^سورة\s+/, '').replace(/^آية\s+/, '').trim();
  // محاولة تطابق اسم السورة
  var surahNum = SURAH_NAMES_TO_NUM[surahName];
  if(!surahNum){
    if(surahName.indexOf('ال')===0){
      surahNum = SURAH_NAMES_TO_NUM[surahName.substring(2)];
    }
    if(!surahNum){
      surahNum = SURAH_NAMES_TO_NUM['ال'+surahName];
    }
  }
  if(!surahNum) return null;
  var from = parseInt(m[2], 10);
  var to = m[3] ? parseInt(m[3], 10) : from;
  var max = SURAH_AYAT_COUNT[surahNum] || 1;
  if(from > max) from = max;
  if(to > max) to = max;
  if(to < from) to = from;
  return {surah: surahNum, from: from, to: to};
}

/* ══════════════ 7ب. استخراج السورة والآيات من تسمية أكثر تعقيداً ══════════════ */
/* مثلاً: "آية الكرسي — البقرة: 255" أو "أول 3 آيات من سورة غافر (المؤمن): 1 – 3" */
function extractSurahAndAyat(lbl){
  if(!lbl) return null;
  var s = String(lbl).replace(/\s+/g,' ').trim();
  // (1) ابحث عن اسم سورة في النص
  var surahNum = null;
  // 1a. "سورة X" — استخرج الكلمة الأولى بعد سورة
  var m1 = s.match(/سورة\s+([^(\d:：\-–)\s]+)/);
  if(m1){
    var name1 = m1[1].trim();
    surahNum = SURAH_NAMES_TO_NUM[name1];
    if(!surahNum && name1.indexOf('ال')===0){
      surahNum = SURAH_NAMES_TO_NUM[name1.substring(2)];
    }
    if(!surahNum){
      surahNum = SURAH_NAMES_TO_NUM['ال'+name1];
    }
  }
  // 1b. لو ما فيش "سورة X"، ابحث عن أي اسم سورة موجود في النص (ككلمة مستقلة)
  if(!surahNum){
    var keys = Object.keys(SURAH_NAMES_TO_NUM);
    // رتّب من الأطول إلى الأقصر (لمطابقة "آل عمران" قبل "عمران")
    keys.sort(function(a,b){ return b.length - a.length; });
    for(var i=0;i<keys.length;i++){
      var k = keys[i];
      // تجاهل الأسماء القصيرة جداً (حرف واحد أو حرفين) — تسبب مطابقات خاطئة في الكلمات
      if(k.length < 3) continue;
      // استخدم حدود للكلمة: السابقة space أو سورة أو بداية النص؛ اللاحقة space أو : أو – أو نهاية
      var escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp('(^|\\s|سورة\\s)' + escaped + '($|[\\s:：,\\-–])');
      if(re.test(s)){
        surahNum = SURAH_NAMES_TO_NUM[k];
        break;
      }
    }
  }
  if(!surahNum) return null;
  // (2) استخرج المرجع الرقمي
  // ابحث عن "X – Y" أولاً
  var m2 = s.match(/(\d+)\s*[-–]\s*(\d+)/);
  if(m2){
    var from = parseInt(m2[1], 10);
    var to = parseInt(m2[2], 10);
    var max = SURAH_AYAT_COUNT[surahNum] || 1;
    if(from > max) from = max;
    if(to > max) to = max;
    if(to < from) to = from;
    return {surah: surahNum, from: from, to: to};
  }
  // ابحث عن نطاق بصيغة "X : Y" (مثل: سورة المؤمن — 1 : 3)
  var m25 = s.match(/(\d+)\s*[:：]\s*(\d+)/);
  if(m25){
    var f25 = parseInt(m25[1], 10), t25 = parseInt(m25[2], 10);
    var mx25 = SURAH_AYAT_COUNT[surahNum] || 1;
    if(f25 > mx25) f25 = mx25;
    if(t25 > mx25) t25 = mx25;
    if(t25 < f25) t25 = f25;
    return {surah: surahNum, from: f25, to: t25};
  }
  // ابحث عن رقم بعد نقطتين
  var m3 = s.match(/[:：]\s*(\d+)/);
  if(m3){
    var ay = parseInt(m3[1], 10);
    var max2 = SURAH_AYAT_COUNT[surahNum] || 1;
    if(ay > max2) ay = max2;
    return {surah: surahNum, from: ay, to: ay};
  }
  // عثر على السورة لكن بدون رقم آية — اعتبرها السورة كاملة
  return {surah: surahNum, from: 1, to: SURAH_AYAT_COUNT[surahNum] || 1, fullSurah: true};
}

/* ══════════════ 8. بناء عناصر الصوت القرآني لذكر ══════════════ */
function getDhikrAudioItems(d2, t){
  var items = [];
  var dhikrTitle = d2.title || '';
  // (أ) إن كان الذكر فيه isAyat و ayat array — كل آية لها ref
  if(d2.isAyat && d2.ayat && d2.ayat.length){
    for(var a=0; a<d2.ayat.length; a++){
      var av = d2.ayat[a];
      // جرّب parseSurahRef أولاً ثم extractSurahAndAyat للتعامل مع التسميات المعقدة
      var parsed = parseSurahRef(av.ref) || extractSurahAndAyat(av.ref);
      if(parsed){
        items.push({
          type:'quran',
          surah: parsed.surah,
          from: parsed.from,
          to: parsed.to,
          fullSurah: !!parsed.fullSurah,
          label: av.ref,
          dhikrTitle: dhikrTitle,
          text: av.text || '',
          isAyatBlock: true
        });
      }
    }
    return items;
  }
  // (ب) اجمع من parts — تسجيل محلي لكل جزء أو قرآن (الأدعية النصية البلا تسجيل تتجاهل)
  if(d2.parts && d2.parts.length){
    for(var p=0; p<d2.parts.length; p++){
      var pv = d2.parts[p];
      var lbl = pv.lbl || '';
      // (v202) تسجيل محلي مدمج لهذا الجزء — أولوية قصوى (تطابق نصي 100%)
      // يُحقن في موقعه الطبيعي بترتيب الأجزاء — قبل منطق القرآن والتجاهلات
      var _lparts = LOCAL_DHIKR_PARTS[t + '-' + d2.n];
      if(_lparts && _lparts[p]){
        // (v206) تكرار خاص لكل جزء (pv.rep): التسجيل الواحد = نطق واحد للجزء
        // فيُدرج بعدد مراته المطلوبة — مثل «أعوذ...» ×3 قبل الآيات، و«سبحان
        // الله العظيم وبحمده» ×3 قبل الدعاء، وتسبيحات النوم ×33 لكل تسبيحة.
        var _rp = (typeof pv.rep === 'number' && pv.rep > 0) ? pv.rep : 1;
        for(var _r=0; _r<_rp; _r++){
          items.push({
            type: 'dhikr_audio', file: _lparts[p], local: true,
            remote: DHIKR_AUDIO[t + '-' + d2.n] || null,
            label: d2.title || 'ذكر',
            dhikrTitle: d2.title || '',
            repIdx: _r + 1, repTotal: _rp,
            repLbl: (pv.tag || pv.lbl || ''),
            partIdx: p // (v208) فهرس الجزء — لمزامنة العدادات الفرعية مع الصوت
          });
        }
        continue;
      }
      // تجاهل التسميات الإرشادية للوقت (مثل "بعد صلاة الفجر") — ليست مرجع آيات
      // (كلمة "الفجر" هنا من الصلاة لا من السورة)
      if(/(بعد|قبل|عند)\s+صلاة/.test(lbl)) continue;
      // "آية الكرسي" وحدها (بدون أرقام) → البقرة 255
      if(lbl.indexOf('آية الكرسي') > -1 && !/[:：\d]/.test(lbl)){
        items.push({
          type: 'quran', surah: 2, from: 255, to: 255,
          label: 'آية الكرسي — البقرة: 255',
          dhikrTitle: dhikrTitle, text: pv.text || ''
        });
        continue;
      }
      // استخدم extractSurahAndAyat للتعامل مع أي شكل تسمية
      var parsed2 = extractSurahAndAyat(lbl);
      if(parsed2){
        // لو السورة كاملة (مثل "سورة الإخلاص")
        if(parsed2.fullSurah){
          items.push({
            type:'quran',
            surah: parsed2.surah,
            from: 1,
            to: SURAH_AYAT_COUNT[parsed2.surah],
            fullSurah: true,
            label: lbl,
            dhikrTitle: dhikrTitle,
            text: pv.text || ''
          });
        } else {
          items.push({
            type:'quran',
            surah: parsed2.surah,
            from: parsed2.from,
            to: parsed2.to,
            label: lbl,
            dhikrTitle: dhikrTitle,
            text: pv.text || ''
          });
        }
        continue;
      }
      // جزء نصي دعائي — سيُغطى بتسجيل الذكر الكامل أدناه عند عدم وجود قرآن
    }
  }
  // (ج) دعم "سورة X" داخل نص الجزء أو العنوان (مثل: "قراءة سورة يس كاملة")
  if(items.length === 0){
    var scanSrc = ((d2.parts && d2.parts[0] && d2.parts[0].text) || '') + ' ' + (d2.title || '');
    var mS = scanSrc.match(/سورة\s+([^\s:،,.()\-–]+)/);
    if(mS){
      var nm = mS[1].replace(/[،,.()]$/, '');
      var sn = SURAH_NAMES_TO_NUM[nm] || SURAH_NAMES_TO_NUM['ال' + nm] ||
               (nm.indexOf('ال') === 0 ? SURAH_NAMES_TO_NUM[nm.substring(2)] : null);
      if(sn){
        items.push({
          type: 'quran', surah: sn, from: 1, to: SURAH_AYAT_COUNT[sn],
          fullSurah: true, label: 'سورة ' + nm,
          dhikrTitle: d2.title || '', text: ''
        });
      }
    }
  }
  // (د-1) (v202) التسجيل المحلي المدمج الكامل — أولوية قصوى (تطابق نصي 100%)
  if(items.length === 0){
    var key = t + '-' + d2.n;
    var lfn = LOCAL_DHIKR_FULL[key];
    if(lfn){
      items.push({
        type: 'dhikr_audio', file: lfn, local: true,
        remote: DHIKR_AUDIO[key] || null,
        label: d2.title || 'ذكر',
        dhikrTitle: d2.title || ''
      });
    }
  }
  // (د-2) (v205) خريطة DHIKR_AUDIO فارغة عمداً — لا مصدر بعيد إطلاقاً.
  // (v207) التغطية مكتملة 100% — لا يوجد ذكر دعائي بلا تسجيل محلي،
  // فيصبح هذا المسار نظرياً (توست «لا يوجد تسجيل صوتي مطابق» حالياً
  // لا يُعرض لأي ذكر في البيانات الحالية).
  return items;
}

/* ══════════════ 9. بناء طابور مكرر لذكر واحد (Round-Robin) ══════════════
   المنطق: لذكر فيه [إخلاص، فلق، ناس] وعدد = 3، نبني الطابور:
   [إخلاص(جولة1)، فلق(جولة1)، ناس(جولة1)،
    إخلاص(جولة2)، فلق(جولة2)، ناس(جولة2)،
    إخلاص(جولة3)، فلق(جولة3)، ناس(جولة3)]
   كل عنصر يُوسم بـ round / totalRounds / itemInRound / itemsPerRound
   لعرض "الجولة X/Y — العنصر I/N" في الـ mini-player والبطاقة.
════════════════════════════════════════════════════════════ */
function buildDhikrQueue(d2, t){
  var baseItems = getDhikrAudioItems(d2, t);
  if(baseItems.length === 0) return [];
  // v190: عدد مرات التكرار من ملف البيانات — ينطبق على الآيات والأدعية معاً
  // «مرة واحدة» تُشغّل مرة، «3 مرات» ثلاث مرات، «7 مرات» سبعاً — كما في الملف
  var count = parseCount(d2.count);
  var perRound = baseItems.length;
  // وسم كل عنصر بمعلومات الجولة (حتى لو count=1 — يُفيد الـ UI)
  function _tag(it, c, i){
    it.round = c;
    it.totalRounds = count;
    it.itemInRound = i;
    it.itemsPerRound = perRound;
    it.dhikrTitle = d2.title || it.dhikrTitle || '';
    return it;
  }
  if(count === 1){
    var out1 = [];
    for(var i=0;i<perRound;i++){
      out1.push(_tag(JSON.parse(JSON.stringify(baseItems[i])), 1, i+1));
    }
    return out1;
  }
  var out = [];
  for(var c=1; c<=count; c++){
    for(var i=0; i<perRound; i++){
      out.push(_tag(JSON.parse(JSON.stringify(baseItems[i])), c, i+1));
    }
  }
  return out;
}

/* ══════════════ 10. بناء URL الصوت للقرآن (يعتمد على القارئ المختار) ══════════════ */
function _globalAyahNum(surah, ayah){
  var g = 0;
  for(var i=1; i<surah; i++){ g += SURAH_AYAT_COUNT[i]; }
  g += ayah;
  return g;
}

function _ayahId(surah, ayah){
  // SSSAAA format: surah 3 digits + ayah 3 digits
  return String(surah).padStart(3,'0') + String(ayah).padStart(3,'0');
}

function buildQuranUrl(item){
  // الأساسي: everyayah.com بصوت القارئ المختار
  var r = _athMP_currentReciter();
  if(item.fullSurah && r.fullSurah){
    // للقارئ الذي يملك رابط سورة كاملة على mp3quran.net (ماهر فقط)
    var s3 = String(item.surah).padStart(3,'0');
    return r.fullSurah + s3 + '.mp3';
  }
  // كل القرّاء: شغّل آية بآية via everyayah.com
  return RECITER_EVERY_AYAH_BASE + r.everyAyah + '/' + _ayahId(item.surah, item.from) + '.mp3';
}

function buildQuranGlobalUrl(item){
  // Fallback 1: القارئ نفسه بجودة عالية (إذا وُجدت)
  var r = _athMP_currentReciter();
  if(r.everyAyahHigh && r.everyAyahHigh !== r.everyAyah){
    return RECITER_EVERY_AYAH_BASE + r.everyAyahHigh + '/' + _ayahId(item.surah, item.from) + '.mp3';
  }
  // لو لا يوجد fallback أعلى — استخدم ماهر كfallback
  return RECITER_EVERY_AYAH_BASE + 'MaherAlMuaiqly128kbps/' + _ayahId(item.surah, item.from) + '.mp3';
}

function buildQuranFallbackUrl(item){
  // Fallback 2: العفاسي على everyayah.com (fallback أخير)
  if(item.fullSurah){
    var s3 = String(item.surah).padStart(3,'0');
    return ALAFASY_FULL_SURAH + s3 + '.mp3';
  }
  return EVERY_AYAH_ALAFASY + _ayahId(item.surah, item.from) + '.mp3';
}

/* ══════════════ 11. إعداد عنصر الصوت ══════════════ */
function _athMP_ensureAudio(){
  if(RAQ.audioEl) return;
  RAQ.audioEl = new Audio();
  // (v204) لا تضع crossOrigin='anonymous' أبداً: عبر file:// (فتح المجلد
  // مباشرة بدون سيرفر) الأصل يكون opaque فيرفض المتصفح تحميل الملفات
  // المحلية بخاصية CORS ويصمت الصوت كلياً (MEDIA_ELEMENT_ERROR). الخاصية
  // غير لازمة أصلاً — لا يوجد createMediaElementSource/AnalyserNode في
  // التطبيق، والتشغيل العادي لعنصر <audio> لا يتطلب CORS إطلاقاً.
  RAQ.audioEl.preload = 'auto';
  RAQ.audioEl.addEventListener('ended', _athMP_onAudioEnded);
  RAQ.audioEl.addEventListener('error', _athMP_onAudioError);
  RAQ.audioEl.addEventListener('timeupdate', _athMP_onTimeUpdate);
}

/* ══════════════ 12. تشغيل طابور ══════════════ */
function athMP_playQueue(items, opts){
  opts = opts || {};
  RAQ.queue = items.slice();
  RAQ.idx = 0;
  RAQ.playAllMode = !!opts.playAll;
  RAQ.playAllType = (opts.playAllType != null) ? opts.playAllType : -1;
  RAQ.isSectionAudio = false;
  RAQ.sectionType = -1;
  _athMP_show();
  _athMP_playCurrent();
}

function _athMP_playCurrent(){
  if(RAQ.idx >= RAQ.queue.length){
    _athMP_onQueueEnd();
    return;
  }
  var item = RAQ.queue[RAQ.idx];
  _athMP_playItem(item);
}

function _athMP_playItem(item){
  // أوقف أي شيء سابق
  if(RAQ.audioEl){ try{ RAQ.audioEl.pause(); }catch(e){} }
  // حدّث الـ UI
  _athMP_updateUIForItem(item);
  // عنصر "section_audio" (قديم — للتوافق فقط)
  if(item.type === 'section_audio'){
    _athMP_playSectionAudio(item.sectionType, item.label || SECTION_NAMES[item.sectionType]);
    return;
  }
  // ذكر دعائي — التسجيل المحلي المدمج
  if(item.type === 'dhikr_audio'){
    _athMP_playDhikrAudio(item);
    return;
  }
  // كل العناصر الأخرى من نوع 'quran'
  _athMP_playQuran(item);
}

function _athMP_playQuran(item){
  var url = buildQuranUrl(item);
  var fallbackUrl1 = buildQuranGlobalUrl(item);
  var fallbackUrl2 = buildQuranFallbackUrl(item);
  _athMP_ensureAudio();
  RAQ.audioEl.src = url;
  RAQ.audioEl._fallbacks = [fallbackUrl1, fallbackUrl2];
  RAQ.audioEl._fallbackIdx = 0;
  RAQ.audioEl._isQuran = true;
  RAQ.isSectionAudio = false;
  document.getElementById('mpIcon').textContent = '📖';
  document.getElementById('athMiniPlayer').classList.remove('is-tts');
  var sub = document.getElementById('mpSub');
  if(sub){
    var lbl = item.label || '';
    if(item.fullSurah){
      lbl = lbl + ' (كاملة)';
    } else if(item.from < item.to){
      lbl = lbl + ' — الآيات ' + item.from + ' إلى ' + item.to;
    }
    // وسم الجولة في الشريط المستطيل (mini-player) بجوار اسم القارئ
    var roundTag = '';
    if(item.totalRounds && item.totalRounds > 1){
      roundTag = '<span class="mp-round-tag">الجولة ' + item.round + '/' + item.totalRounds + '</span> ';
    } else if(item.itemsPerRound && item.itemsPerRound > 1){
      roundTag = '<span class="mp-round-tag">' + item.itemInRound + '/' + item.itemsPerRound + '</span> ';
    }
    var reciter = _athMP_currentReciter();
    sub.innerHTML = roundTag + '<span class="mp-quran-tag">' + reciter.short + '</span> ' + lbl;
  }
  var titleEl = document.getElementById('mpTitle');
  if(titleEl && item.dhikrTitle){
    titleEl.textContent = item.dhikrTitle;
  }
  // حدّث اسم القارئ في زر التبديل
  var reciterEl = document.getElementById('mpReciterName');
  if(reciterEl){
    reciterEl.textContent = _athMP_currentReciter().short;
  }
  RAQ.audioEl.load();
  var p = RAQ.audioEl.play();
  if(p && p.then){
    p.then(function(){
      RAQ.isPlaying = true;
      _athMP_setPlayIcon(true);
    }).catch(function(){
      _athMP_tryFallback();
    });
  } else {
    RAQ.isPlaying = true;
    _athMP_setPlayIcon(true);
  }
}

/* ══════════════ 13. تشغيل ذكر دعائي (تسجيل محلي مدمج) ══════════════
   (v205) كل الأقسام: التسجيل المحلي المدمج فقط — بلا أي fallback بعيد إطلاقاً
   (لا روابط hisnmuslim.com — أُزيل صوت حمد الدريهم من كل الأقسام).
   عند فشل تحميل الملف المحلي: توست إرشادي واضح (مرة واحدة) + الانتقال
   للتالي — لا صمت أبداً.
══════════════════════════════════════════════════════════════ */
function _athMP_playDhikrAudio(item){
  _athMP_ensureAudio();
  // (v205) كل تسجيلات الأذكار الدعائية محلية مدمجة — بلا أي مصدر بعيد.
  // اسم الملف إما مسار كامل (audio/adhkar-masaa/masaa-XX.mp3) أو اسم
  // بسيط في مجلد الصباح (dhikr-XX.mp3).
  var localUrl = (item.file.indexOf('/') > -1)
    ? item.file
    : LOCAL_DHIKR_DIR + item.file;
  var urls = [localUrl];
  RAQ.audioEl.src = urls[0];
  RAQ.audioEl._fallbacks = urls.slice(1);
  RAQ.audioEl._fallbackIdx = 0;
  RAQ.audioEl._isQuran = false;
  RAQ.isSectionAudio = false;
  RAQ.isPlaying = true;
  var icon = document.getElementById('mpIcon');
  if(icon) icon.textContent = '🎧';
  var mp = document.getElementById('athMiniPlayer');
  if(mp) mp.classList.remove('is-tts');
  var sub = document.getElementById('mpSub');
  if(sub){
    // وسم الجولة في الشريط المستطيل (mini-player) بجوار اسم القارئ
    var roundTag = '';
    if(item.repTotal && item.repTotal > 1 && item.repLbl){
      // (v206) وسم التكرار الخاص بالجزء — مثل: «اللَّهُ أَكْبَرُ 12/33»
      roundTag = '<span class="mp-round-tag">' + item.repLbl + ' ' + item.repIdx + '/' + item.repTotal + '</span> ';
    } else if(item.totalRounds && item.totalRounds > 1){
      roundTag = '<span class="mp-round-tag">الجولة ' + item.round + '/' + item.totalRounds + '</span> ';
    }
    // (v205) كل تسجيلات الأذكار محلية مدمجة — وسم موحّد
    var _reciterTag = '<span class="mp-quran-tag" style="background:rgba(52,211,153,.16);color:#34d399;">🎧 بدون إنترنت</span>';
    sub.innerHTML = roundTag + _reciterTag + ' ' +
                    (item.dhikrTitle || item.label || 'ذكر');
  }
  var titleEl = document.getElementById('mpTitle');
  if(titleEl && item.dhikrTitle) titleEl.textContent = item.dhikrTitle;
  RAQ.audioEl.load();
  var p = RAQ.audioEl.play();
  if(p && p.then){
    p.then(function(){
      RAQ.isPlaying = true;
      _athMP_setPlayIcon(true);
    }).catch(function(){
      _athMP_tryFallback();
    });
  } else {
    _athMP_setPlayIcon(true);
  }
}

// (قديم) تشغيل ملف القسم الكامل — للتوافق فقط، لم يعد مستخدماً
function _athMP_playSectionAudio(t, label){
  athToast('ℹ️ تسجيل القسم الكامل غير مستخدم — كل ذكر له تسجيله الصوتي المدمج الخاص', true);
  _athMP_hide();
}

function _athMP_tryFallback(){
  if(!RAQ.audioEl) return;
  var f = RAQ.audioEl._fallbacks || [];
  if(RAQ.audioEl._fallbackIdx < f.length){
    var nextUrl = f[RAQ.audioEl._fallbackIdx];
    RAQ.audioEl._fallbackIdx++;
    RAQ.audioEl.src = nextUrl;
    RAQ.audioEl.load();
    var p = RAQ.audioEl.play();
    if(p && p.then){
      p.catch(function(){ _athMP_tryFallback(); });
    }
  } else {
    _athMP_onQueueEnd(true);
  }
}

/* ══════════════ 13ب. (v208) مزامنة العدادات مع الصوت + الإتمام التلقائي ══════════════
   عند اكتمال كل عنصر صوتي (تكرار/جولة/آية أخيرة) يُنقر العداد المرافق له:
   • ذكر متعدد العدادات (تسبيحات النوم): كل تكرار صوتي لجزء = نقرة على عداده الفرعي
   • ذكر بعداد رئيسي: اكتمال الجولة (أو التكرار الخاص) = نقرة
   • عند اكتمال العداد يُضغط «سأقرأها» تلقائياً (سلوك _cntTap/_cntTapSub الموجود)
   • ذكر «مرة واحدة» بلا عداد: عند انتهاء صوته يُضغط «سأقرأها» تلقائياً
══════════════════════════════════════════════════════════════ */
function RA_tapCounterForItem(item){
  if(!item || item._dhikrT == null || !item._dhikrN) return;
  var t = item._dhikrT, n = item._dhikrN;
  try{
    var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
    var d2 = null;
    for(var i=0;i<arr.length;i++){ if(arr[i].n===n){ d2=arr[i]; break; } }
    if(!d2) return;
    // (أ) ذكر متعدد العدادات: كل تكرار صوتي لجزء = نقرة على عداده الفرعي المقابل
    if(d2.multi && d2.multi.length){
      if(item.type === 'dhikr_audio' && item.partIdx != null && item.repTotal >= 2){
        var pIdx = item.partIdx;
        if(pIdx >= 0 && pIdx < d2.multi.length){
          var sub = n + String.fromCharCode(97 + pIdx);
          var total = d2.multi[pIdx].total;
          var cur = _cntGet(t, sub);
          if(total >= 1 && cur < total){
            _cntTapSub(t, sub, total);
          }
        }
      }
      return; // العدادات الرئيسية لا توجد في المركّب
    }
    // (ب-1) تكرار خاص لجزء (بلا multi) — مثل «أعوذ بكلمات الله» ×3: كل نطق = نقرة
    if(item.type === 'dhikr_audio' && item.repTotal >= 2){
      var totalB = _parseCountNum(d2.count);
      if(totalB >= 2){
        var curB = _cntGet(t, n);
        if(curB < totalB){
          _cntTap(t, n, totalB);
          return;
        }
      }
    }
    // (ب-2) بنية الجولات: اكتمال الجولة (آخر عنصر فيها) = نقرة على العداد الرئيسي
    var totalC = _parseCountNum(d2.count);
    if(totalC >= 2 && item.totalRounds >= 2 && item.itemInRound === item.itemsPerRound){
      var curC = _cntGet(t, n);
      if(curC < totalC){
        _cntTap(t, n, totalC);
      }
    }
  }catch(e){}
}

/* (v208) عند انتهاء ذكر كامل بلا عداد («مرة واحدة») — يُضغط «سأقرأها» تلقائياً */
function RA_autoMarkDone(item){
  if(!item || item._dhikrT == null || !item._dhikrN) return;
  var t = item._dhikrT, n = item._dhikrN;
  try{
    var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
    var d2 = null;
    for(var i=0;i<arr.length;i++){ if(arr[i].n===n){ d2=arr[i]; break; } }
    if(!d2) return;
    if(d2.multi && d2.multi.length) return; // المركّب يكتمل عبر عداداته الفرعية
    var total = _parseCountNum(d2.count);
    if(total >= 2) return; // له عداد — يكتمل تلقائياً عبر النقرات الصوتية
    var done = athDone[t];
    if(done && !done.has(n)){
      athToggle(t, n, d2.pts);
    }
  }catch(e){}
}

/* (v208) قلب صفحة الأذكار تلقائياً لتتبع الذكر الجاري تشغيله:
   إذا كان الذكر في صفحة غير المعروضة والقسم مفتوح — تُقلب الصفحة فوراً. */
function _athMP_ensurePageVisible(t, n){
  try{
    if(typeof athOpen === 'undefined' || athOpen !== t) return;
    if(typeof ATH_PER === 'undefined' || typeof athCurPage === 'undefined') return;
    var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
    var idx = -1;
    for(var i=0;i<arr.length;i++){ if(arr[i].n === n){ idx = i; break; } }
    if(idx < 0) return;
    var page = Math.floor(idx / ATH_PER);
    var totalPages = Math.ceil(arr.length / ATH_PER);
    if(page < 0) page = 0;
    if(page >= totalPages) page = totalPages - 1;
    if(athCurPage[t] !== page){
      athCurPage[t] = page;
      if(typeof athRender === 'function') athRender(t);
    }
  }catch(e){}
}

/* ══════════════ 14. أحداث نهاية التشغيل ══════════════ */
function _athMP_onAudioEnded(){
  if(RAQ.isSectionAudio){
    RAQ.isPlaying = false;
    _athMP_setPlayIcon(false);
    var bar = document.getElementById('mpProgress');
    if(bar) bar.style.width = '100%';
    // إن كان عنصر section_audio ضمن طابور "تشغيل الكل" — انتقل للتالي
    if(RAQ.playAllMode && RAQ.queue && RAQ.idx < RAQ.queue.length - 1){
      RAQ.idx++;
      RAQ.isSectionAudio = false;
      _athMP_clearCardHighlight();
      setTimeout(_athMP_playCurrent, 200);
      return;
    }
    // إن كان آخر عنصر في طابور "تشغيل الكل" — أنهِ
    if(RAQ.playAllMode){
      var sIdx = RAQ.playAllType;
      RAQ.playAllMode = false;
      RAQ.playAllType = -1;
      RAQ.isSectionAudio = false;
      _athMP_setPlayAllBtn(false);
      _athMP_clearCardHighlight();
      athToast('✦ اكتملت ' + SECTION_NAMES[sIdx] + ' — تقبل الله', false);
      setTimeout(_athMP_hide, 1500);
      return;
    }
    // تشغيل منفرد للقسم كاملاً
    athToast('✦ اكتملت ' + SECTION_NAMES[RAQ.sectionType] + ' — تقبل الله', false);
    setTimeout(_athMP_hide, 1500);
    return;
  }
  var item = RAQ.queue[RAQ.idx];
  // إن كانت آية داخل نفس السورة (from < to) — شغّل التالية
  if(item && item.type==='quran' && !item.fullSurah && item.from < item.to){
    item.from++;
    var sub = document.getElementById('mpSub');
    if(sub){
      var lbl = item.label || '';
      lbl = lbl + ' — آية ' + item.from;
      // وسم الجولة في الشريط المستطيل (mini-player) بجوار اسم القارئ
      var roundTag = '';
      if(item.totalRounds && item.totalRounds > 1){
        roundTag = '<span class="mp-round-tag">الجولة ' + item.round + '/' + item.totalRounds + '</span> ';
      }
      sub.innerHTML = roundTag + '<span class="mp-quran-tag">' + _athMP_currentReciter().short + '</span> ' + lbl;
    }
    RAQ.audioEl.src = buildQuranUrl(item);
    RAQ.audioEl._fallbacks = [buildQuranGlobalUrl(item), buildQuranFallbackUrl(item)];
    RAQ.audioEl._fallbackIdx = 0;
    RAQ.audioEl.load();
    var p = RAQ.audioEl.play();
    if(p && p.then){ p.catch(function(){ _athMP_tryFallback(); }); }
    return;
  }
  // (v208) مزامنة العداد مع الصوت + الإتمام التلقائي عند نهاية الذكر
  var _endedItem = RAQ.queue[RAQ.idx];
  if(_endedItem){
    RA_tapCounterForItem(_endedItem);
    var _nx = RAQ.queue[RAQ.idx + 1];
    if(!_nx || _nx._dhikrN !== _endedItem._dhikrN || _nx._dhikrT !== _endedItem._dhikrT){
      RA_autoMarkDone(_endedItem);
    }
  }
  // انتقل للعنصر التالي في الطابور (الغلاف في القسم 22 يتكفل بإبراز البطاقة عند تغيّر الذكر)
  RAQ.idx++;
  _athMP_playCurrent();
}

function _athMP_onAudioError(){
  if(RAQ.isSectionAudio){
    athToast('تعذر تحميل ملف القسم — حاول مرة أخرى', true);
    _athMP_hide();
    return;
  }
  if(RAQ.audioEl && RAQ.audioEl._fallbackIdx < (RAQ.audioEl._fallbacks||[]).length){
    _athMP_tryFallback();
  } else {
    // (v204) فشل تحميل تسجيل محلي بلا أي fallback متبقٍّ: أظهر إرشاداً
    // واضحاً مرة واحدة (بدلاً من الصمت) — أغلب الأسباب: فتح التطبيق من
    // داخل ملف مضغوط دون فك ضغطه، أو رفع index.html دون مجلد audio.
    var _it = RAQ.queue[RAQ.idx];
    if(_it && _it.local && !RAQ._localFailToasted){
      RAQ._localFailToasted = true;
      athToast('⚠️ تعذر تحميل التسجيل المحلي — تأكد من فك ضغط الملف كاملاً ووجود مجلد audio بجوار index.html ثم أعد المحاولة', true);
    }
    RAQ.idx++;
    setTimeout(_athMP_playCurrent, 200);
  }
}

function _athMP_onQueueEnd(failed){
  RAQ.isPlaying = false;
  _athMP_setPlayIcon(false);
  var bar = document.getElementById('mpProgress');
  if(bar) bar.style.width = '100%';
  _athMP_clearCardHighlight();
  if(RAQ.playAllMode && RAQ.playAllType >= 0){
    // انتهى "تشغيل الكل" — القسم كامل
    var sIdx = RAQ.playAllType;
    RAQ.playAllMode = false;
    RAQ.playAllType = -1;
    _athMP_setPlayAllBtn(false);
    athToast('✦ اكتملت ' + SECTION_NAMES[sIdx] + ' — تقبل الله', false);
    setTimeout(_athMP_hide, 1500);
    return;
  }
  // التنقل التلقائي: عند انتهاء ذكر واحد (وليس في وضع "تشغيل الكل")،
  // انتقل تلقائياً إلى الذكر التالي في القسم إن وُجد.
  if(!failed && RAQ._singleDhikrT != null && RAQ._singleDhikrN != null){
    var t = RAQ._singleDhikrT;
    var n = RAQ._singleDhikrN;
    var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
    var idx = -1;
    for(var i=0;i<arr.length;i++){ if(arr[i].n===n){ idx=i; break; } }
    if(idx >= 0 && idx < arr.length - 1){
      var nextDhikr = arr[idx + 1];
      // (v208) رمز إبطال: إن أُغلق المشغل أو بدأ تشغيل جديد خلال مهلة الانتقال أُلغيت
      var _advToken = ++RAQ._advToken;
      // تأخير قصير قبل الانتقال لتجنب الضغط على المتصفح
      athToast('✦ تمّ — الانتقال لـ: ' + nextDhikr.title, false);
      setTimeout(function(){
        if(RAQ._advToken !== _advToken) return; // أُغلق المشغل أو تدخّل المستخدم — ألغِ الانتقال
        // شغّل الذكر التالي تلقائياً (نفس سلوك athPlayDhikr لكن بدون طلب تدخل المستخدم)
        _athMP_stopPlayback();
        var items = buildDhikrQueue(nextDhikr, t);
        if(items.length === 0){
          // الذكر التالي بلا تسجيل — جرّب الذي بعده
          // (للتبسيط: نعرض إشعاراً ولا نتابع تلقائياً)
          athToast('ℹ️ لا يوجد تسجيل للذكر التالي — توقف', false);
          return;
        }
        _athMP_highlightCard(t, nextDhikr.n, true);
        for(var k=0;k<items.length;k++){
          items[k]._dhikrN = nextDhikr.n;
          items[k]._dhikrT = t;
        }
        RAQ._singleDhikrT = t;
        RAQ._singleDhikrN = nextDhikr.n;
        athMP_playQueue(items, {});
      }, 800);
      return;
    }
  }
  if(!failed){
    athToast('✦ تمّ', false);
    setTimeout(_athMP_hide, 1200);
  } else {
    setTimeout(_athMP_hide, 1500);
  }
}

/* ══════════════ 15. تحديث الـ UI ══════════════ */
function _athMP_onTimeUpdate(){
  if(!RAQ.audioEl) return;
  var d = RAQ.audioEl.duration;
  var c = RAQ.audioEl.currentTime;
  if(d && isFinite(d) && d > 0){
    var pct = (c / d) * 100;
    var bar = document.getElementById('mpProgress');
    if(bar) bar.style.width = pct + '%';
  }
}

function _athMP_setPlayIcon(playing){
  var ic = document.getElementById('mpPlayIcon');
  if(!ic) return;
  if(playing){
    ic.innerHTML = '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
  } else {
    ic.innerHTML = '<path d="M8 5v14l11-7z"/>';
  }
}

function _athMP_updateUIForItem(item){
  var titleEl = document.getElementById('mpTitle');
  if(titleEl){
    titleEl.textContent = item.dhikrTitle || 'جارٍ التشغيل...';
  }
}

/* ══════════════ 16. إظهار/إخفاء المشغل ══════════════ */
function _athMP_show(){
  var el = document.getElementById('athMiniPlayer');
  if(el) el.classList.add('show');
}

function _athMP_hide(){
  var el = document.getElementById('athMiniPlayer');
  if(el) el.classList.remove('show');
}

/* ══════════════ 17. تحكم المشغل ══════════════ */
function athMP_toggle(){
  if(!RAQ.queue.length && !RAQ.isSectionAudio) return;
  if(RAQ.isPlaying){
    if(RAQ.audioEl && !RAQ.audioEl.paused){
      RAQ.audioEl.pause();
    }
    RAQ.isPlaying = false;
    _athMP_setPlayIcon(false);
  } else {
    RAQ._salahSuspend = null; // (v206) المستخدم أعاد التشغيل بنفسه — لا استكمال تلقائي
    if(RAQ.audioEl && RAQ.audioEl.src && !RAQ.audioEl.ended){
      var p = RAQ.audioEl.play();
      if(p && p.then){
        p.then(function(){ RAQ.isPlaying=true; _athMP_setPlayIcon(true); }).catch(function(){});
      } else {
        RAQ.isPlaying=true; _athMP_setPlayIcon(true);
      }
    } else {
      _athMP_playCurrent();
    }
  }
}

function athMP_next(){
  if(RAQ.isSectionAudio){
    // لا يوجد "تالي" لملف القسم — نوقفه
    athMP_close();
    return;
  }
  if(!RAQ.queue.length) return;
  if(RAQ.audioEl){ try{ RAQ.audioEl.pause(); }catch(e){} }
  RAQ.idx++;
  // (v208) الإبراز يتكفل به غلاف _athMP_playCurrent عند تغيّر الذكر
  if(RAQ.idx >= RAQ.queue.length){
    _athMP_onQueueEnd();
  } else {
    _athMP_playCurrent();
  }
}

/* (v208) العودة إلى الذكر السابق (وضع التنقل التلقائي): عند أول الطابور
   لا نعيد تشغيل الذكر الحالي من جديد، بل نرجع إلى الذكر السابق الذي له
   تسجيل صوتي — مع قلب الصفحة إليه وإبراز بطاقته. */
function RA_prevWithAudio(t, fromIdx){
  var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
  for(var i = fromIdx - 1; i >= 0; i--){
    var d = arr[i];
    if(!d) continue;
    var items = buildDhikrQueue(d, t);
    if(items.length === 0) continue; // ذكر بلا تسجيل — تجاوزه
    _athMP_stopPlayback();
    for(var k=0;k<items.length;k++){
      items[k]._dhikrN = d.n;
      items[k]._dhikrT = t;
    }
    RAQ._singleDhikrT = t;
    RAQ._singleDhikrN = d.n;
    _athMP_highlightCard(t, d.n, true); // يقلب الصفحة تلقائياً إن لزم
    athMP_playQueue(items, {});
    return true;
  }
  return false;
}

function athMP_prev(){
  if(RAQ.isSectionAudio){
    if(RAQ.audioEl){ try{ RAQ.audioEl.currentTime = 0; }catch(e){} }
    return;
  }
  if(!RAQ.queue.length) return;
  // (v208) داخل العنصر الحالي بأكثر من 3 ثوانٍ وهو شغّال — أعد العنصر من أوله
  // (سلوك المشغلات المعتاد: الضغطة الأولى تعيد، الثانية تنتقل للسابق)
  if(RAQ.isPlaying && RAQ.audioEl && !RAQ.audioEl.paused && isFinite(RAQ.audioEl.currentTime) && RAQ.audioEl.currentTime > 3){
    try{ RAQ.audioEl.currentTime = 0; }catch(e){}
    return;
  }
  if(RAQ.audioEl){ try{ RAQ.audioEl.pause(); }catch(e){} }
  // (v208) عند أول الطابور: ارجع إلى الذكر السابق كاملاً (وليس مجرد إعادة الحالي)
  if(RAQ.idx === 0 && !RAQ.playAllMode){
    var it = RAQ.queue[0];
    if(it && it._dhikrT != null && it._dhikrN){
      var t = it._dhikrT, n = it._dhikrN;
      var arr = (ATH_DATA[t] && ATH_DATA[t].arr) || [];
      var idx = -1;
      for(var i=0;i<arr.length;i++){ if(arr[i].n===n){ idx=i; break; } }
      if(idx > 0 && RA_prevWithAudio(t, idx)) return;
    }
  }
  // عنصر سابق داخل نفس الطابور
  RAQ.idx = Math.max(0, RAQ.idx - 1);
  _athMP_playCurrent();
}

function athMP_close(){
  if(RAQ.audioEl){ try{ RAQ.audioEl.pause(); }catch(e){} RAQ.audioEl = null; }
  RAQ.queue = []; RAQ.idx = 0; RAQ.isPlaying = false;
  RAQ.playAllMode = false; RAQ.playAllType = -1;
  RAQ.isSectionAudio = false; RAQ.sectionType = -1;
  RAQ._salahSuspend = null; // (v206) أُغلق المشغل — لا استكمال تلقائي بعدها
  RAQ._advToken++; // (v208) أبطِل أي مهلة انتقال معلّقة
  _athMP_clearCardHighlight();
  _athMP_setPlayAllBtn(false);
  _athMP_hide();
}

function _athMP_stopPlayback(){
  if(RAQ.audioEl){ try{ RAQ.audioEl.pause(); }catch(e){} }
  RAQ.queue = []; RAQ.idx = 0; RAQ.isPlaying = false;
  RAQ.playAllMode = false; RAQ.playAllType = -1;
  RAQ.isSectionAudio = false; RAQ.sectionType = -1;
  RAQ._singleDhikrT = null; RAQ._singleDhikrN = null;
  RAQ._salahSuspend = null; // (v206) بدأ تشغيلاً جديداً — لا استكمال تلقائي بعدها
  RAQ._advToken++; // (v208) أبطِل أي مهلة انتقال معلّقة
  _athMP_clearCardHighlight();
  _athMP_setPlayAllBtn(false);
}

/* ══════════════ 18. إبراز البطاقة النشطة (مع وسم الجولة) ══════════════ */
var _athMP_lastHlKey = null; // (v208) مفتاح آخر بطاقة مُبرزة — يمنع تكرار الإبراز/التمرير لكل عنصر

function _athMP_highlightCard(t, n, scroll){
  _athMP_clearCardHighlight();
  // (v208) قلب الصفحة تلقائياً لتتبع الذكر الجاري تشغيله
  _athMP_ensurePageVisible(t, n);
  var pfx = ['s','m','n'][t];
  var card = document.getElementById('dk-'+pfx+'-'+n);
  if(card){
    card.classList.add('ath-card-playing');
    if(scroll){
      try{ card.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
    }
  }
  var btn = document.getElementById('athplay-'+pfx+'-'+n);
  if(btn){
    btn.classList.add('playing');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg> إيقاف';
  }
  RAQ.currentDhikrKey = t + '-' + n;
  _athMP_lastHlKey = t + '-' + n;
}

/* إظهار/تحديث وسم الجولة على البطاقة النشطة — معطّل بناءً على طلب المستخدم:
   شارة الجولة تظهر الآن فقط في الشريط المستطيل (mini-player) بجوار اسم القارئ،
   وليس على البطاقة (لتفادي ظهورها بجوار الدرجات). */
function _athMP_showRoundBadge(t, n, round, total){
  // لا تفعل شيئاً — الشارة معروضة في الـ mini-player فقط عبر _athMP_updateRoundTagInMiniPlayer
  return;
}

/* تحديث وسم الجولة في الـ mini-player (الشريط المستطيل) بجوار اسم القارئ */
function _athMP_updateRoundTagInMiniPlayer(item){
  var sub = document.getElementById('mpSub');
  if(!sub || !item) return;
  var roundTag = '';
  if(item.repTotal && item.repTotal > 1 && item.repLbl){
    // (v206) وسم التكرار الخاص بالجزء — مثل: «اللَّهُ أَكْبَرُ 12/33»
    roundTag = '<span class="mp-round-tag">' + item.repLbl + ' ' + item.repIdx + '/' + item.repTotal + '</span> ';
  } else if(item.totalRounds && item.totalRounds > 1){
    roundTag = '<span class="mp-round-tag">الجولة ' + item.round + '/' + item.totalRounds + '</span> ';
  } else if(item.itemsPerRound && item.itemsPerRound > 1){
    roundTag = '<span class="mp-round-tag">' + item.itemInRound + '/' + item.itemsPerRound + '</span> ';
  }
  // حدّث المحتوى مع الإبقاء على اسم القارئ
  if(item.type === 'dhikr_audio'){
    // (v205) كل تسجيلات الأذكار محلية مدمجة — وسم موحّد
    var _reciterTag = '<span class="mp-quran-tag" style="background:rgba(52,211,153,.16);color:#34d399;">🎧 بدون إنترنت</span>';
    sub.innerHTML = roundTag + _reciterTag + ' ' +
                    (item.dhikrTitle || item.label || 'ذكر');
  } else {
    var lbl = item.label || '';
    if(item.fullSurah){
      lbl = lbl + ' (كاملة)';
    } else if(item.from < item.to){
      lbl = lbl + ' — الآيات ' + item.from + ' إلى ' + item.to;
    }
    var reciter = _athMP_currentReciter();
    sub.innerHTML = roundTag + '<span class="mp-quran-tag">' + reciter.short + '</span> ' + lbl;
  }
}

function _athMP_clearRoundBadge(){
  // للحفاظ على التوافق مع الكود القديم — لا حاجة لفعل شيء هنا
  return;
}

function _athMP_clearCardHighlight(){
  _athMP_clearRoundBadge();
  document.querySelectorAll('.ath-card-playing').forEach(function(el){
    el.classList.remove('ath-card-playing');
  });
  document.querySelectorAll('.ath-play-btn.playing').forEach(function(el){
    el.classList.remove('playing');
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> استماع';
  });
  RAQ.currentDhikrKey = null;
  _athMP_lastHlKey = null; // (v208) مسح المفتاح اللاصق أيضاً
}

function _athMP_scrollToCard(t, n){
  var pfx = ['s','m','n'][t];
  var card = document.getElementById('dk-'+pfx+'-'+n);
  if(card){
    try{ card.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
  }
}

/* ══════════════ 19. ضبط زر "تشغيل الكل" ══════════════ */
function _athMP_setPlayAllBtn(playing){
  document.querySelectorAll('.ath-playall-btn').forEach(function(b){
    if(playing){ b.classList.add('playing'); } else { b.classList.remove('playing'); }
  });
}

/* ══════════════ 20. تشغيل ذكر واحد (مع التكرار الدورى) ══════════════ */
function athPlayDhikr(t, n){
  var arr = ATH_DATA[t].arr;
  var d2 = null;
  for(var i=0;i<arr.length;i++){ if(arr[i].n===n){ d2=arr[i]; break; } }
  if(!d2) return;
  // إن كان نفس الذكر شغّال — أوقفه
  if(RAQ.currentDhikrKey === t+'-'+n && RAQ.isPlaying){
    athMP_close();
    return;
  }
  // أوقف أي تشغيل سابق
  _athMP_stopPlayback();
  // ابنِ الطابور مع التكرار
  var items = buildDhikrQueue(d2, t);
  if(items.length === 0){
    // ذكر نصي بلا تسجيل حقيقي مطابق في حصن المسلم — يُعرض كنص فقط
    _athMP_highlightCard(t, n, false);
    athToast('ℹ️ لا يوجد تسجيل صوتي مطابق لهذا الذكر بعد — يُقرأ نصياً', false);
    // أبرز البطاقة 2 ثانية ثم أزل الإبراز
    setTimeout(function(){
      if(RAQ.currentDhikrKey === t+'-'+n && !RAQ.isPlaying){
        _athMP_clearCardHighlight();
      }
    }, 2200);
    return;
  }
  _athMP_highlightCard(t, n, false);
  // ربط كل عنصر بالبطاقة الحالية (للـ UI)
  for(var k=0;k<items.length;k++){
    items[k]._dhikrN = n;
    items[k]._dhikrT = t;
  }
  // تذكّر الذكر الحالي لتفعيل التنقل التلقائي عند انتهائه
  RAQ._singleDhikrT = t;
  RAQ._singleDhikrN = n;
  athMP_playQueue(items, {});
}

/* ══════════════ 21. تشغيل كل الأذكار (Round-Robin لكل ذكر قرآني) ══════════════
   المنطق:
   1) نجمع كل عناصر القرآن لكل ذكر مع التكرار الدورى:
      ذكر #1 (3 سور، 3 مرات) → [إخلاص1، فلق1، ناس1، إخلاص2، فلق2، ناس2، إخلاص3، فلق3، ناس3]
      ذكر #2 (آية الكرسي، 1 مرة)  → [آية_الكرسي1]
      ...
   2) الأذكار غير القرآنية: التسجيل المدمج المرفق يُشغّل في نفس
      موقع الذكر — بترتيب البرنامج بالضبط (دون تخطٍّ).
      ما لا يملك تسجيلاً مطابقاً (لم يبقَ أي ذكر هكذا منذ v207) يُعرض كنص مع
      إشعار عدده في النهاية — مسار احتياطي نظري الآن.
════════════════════════════════════════════════════════════ */
function athPlayAll(t){
  // إن كان نفس القسم شغّال — أوقفه
  if(RAQ.playAllMode && RAQ.playAllType === t){
    athMP_close();
    return;
  }
  // أوقف أي تشغيل سابق
  _athMP_stopPlayback();
  var arr = ATH_DATA[t].arr;
  if(!arr || !arr.length) return;
  var queue = [];
  var firstDhikrN = -1;
  var nonQuranCount = 0;
  for(var i=0;i<arr.length;i++){
    var d2 = arr[i];
    var items = buildDhikrQueue(d2, t);
    if(items.length === 0){
      // ذكر نصي بلا تسجيل مطابق — يُعرض كنص فقط
      nonQuranCount++;
      continue;
    }
    for(var j=0;j<items.length;j++){
      items[j]._dhikrN = d2.n;
      items[j]._dhikrT = t;
      queue.push(items[j]);
      if(firstDhikrN === -1) firstDhikrN = d2.n;
    }
  }
  // إن لم يوجد أي عنصر قرآني في القسم — أبلغ المستخدم
  if(queue.length === 0){
    athToast('ℹ️ ' + SECTION_NAMES[t] + ': كل الأذكار دعاء نصي — لا تسجيلات صوتية مستقلة', false);
    return;
  }
  // إن وُجدت أذكار غير قرآنية — أبلغ المستخدم
  if(nonQuranCount > 0){
    setTimeout(function(){
      athToast('ℹ️ ' + nonQuranCount + ' ذكراً نصياً بلا تسجيل مطابق — باقي الأذكار والآيات ستُقرأ بالصوت', false);
    }, 1000);
  }
  // ابدأ من أول عنصر
  _athMP_setPlayAllBtn(true);
  if(firstDhikrN !== -1){
    _athMP_highlightCard(t, firstDhikrN, true);
  }
  athMP_playQueue(queue, {
    playAll: true,
    playAllType: t
  });
}

/* ══════════════ 22. إبراز البطاقة عند الانتقال بين الأذكار + وسم الجولة ══════════════ */
// (v208) يعمل الآن في كل الأوضاع (منفرد + تشغيل الكل): عند تغيّر الذكر الجاري
// تُبرز بطاقته وتُقلب الصفحة إليه وتُمرَّر إليه — أما داخل نفس الذكر فيبقى
// الإبراز ثابتاً بلا تمرير مزعج لكل عنصر (المفتاح اللاصق يمنع التكرار).
var _origPlayCurrent = _athMP_playCurrent;
_athMP_playCurrent = function(){
  if(RAQ.idx >= RAQ.queue.length){
    _athMP_onQueueEnd();
    return;
  }
  var item = RAQ.queue[RAQ.idx];
  // حدّث إبراز البطاقة إن تغيّر الذكر الجاري (في أي وضع تشغيل)
  if(item && item._dhikrN && item._dhikrN > 0 && item._dhikrT != null){
    var newKey = item._dhikrT + '-' + item._dhikrN;
    if(_athMP_lastHlKey !== newKey){
      _athMP_highlightCard(item._dhikrT, item._dhikrN, true);
    }
    // أظهر وسم الجولة على البطاقة (إن كان count > 1)
    if(item.totalRounds && item.totalRounds > 1){
      _athMP_showRoundBadge(item._dhikrT, item._dhikrN, item.round, item.totalRounds);
    } else {
      _athMP_clearRoundBadge();
    }
  }
  _athMP_playItem(item);
};

/* ══════════════ 23. إغلاق المشغل عند إغلاق الأذكار ══════════════ */
document.addEventListener('athkar:closed', function(){
  if(RAQ.isPlaying || RAQ.queue.length || RAQ.isSectionAudio){
    athMP_close();
  }
});

/* ══════════════ 24. API عمومي ══════════════ */
window.athPlayDhikr = athPlayDhikr;
window.athPlayAll = athPlayAll;
window.athMP_toggle = athMP_toggle;
window.athMP_next = athMP_next;
window.athMP_prev = athMP_prev;
window.athMP_close = athMP_close;
window.RAQ = RAQ;
// (v208) للفحص والاختبار
window.RA_tapCounterForItem = RA_tapCounterForItem;
window.RA_autoMarkDone = RA_autoMarkDone;
window.RA_prevWithAudio = RA_prevWithAudio;
window._athMP_ensurePageVisible = _athMP_ensurePageVisible;
// مكتسبة (للتوافق مع الكود القديم — لكنها الآن لا تفعل شيئاً)
window.athVP_show = function(){};
window.athVP_hide = function(){};
window.athVP_toggle = function(){};
window.athVP_select = function(){};
// مكشوفة للاختبار
window.parseCount = parseCount;
window.parseSurahRef = parseSurahRef;
window.extractSurahAndAyat = extractSurahAndAyat;
window.getDhikrAudioItems = getDhikrAudioItems;
window.buildDhikrQueue = buildDhikrQueue;
window.buildQuranUrl = buildQuranUrl;
window.buildQuranGlobalUrl = buildQuranGlobalUrl;
window.buildQuranFallbackUrl = buildQuranFallbackUrl;
window.SURAH_NAMES_TO_NUM = SURAH_NAMES_TO_NUM;
window.SURAH_AYAT_COUNT = SURAH_AYAT_COUNT;
window.SECTION_AUDIO = SECTION_AUDIO;
window.SECTION_NAMES = SECTION_NAMES;
window.RA_hasLocalAudio = RA_hasLocalAudio;
window.DHIKR_AUDIO = DHIKR_AUDIO;
window.LOCAL_DHIKR_FULL = LOCAL_DHIKR_FULL;
window.LOCAL_DHIKR_PARTS = LOCAL_DHIKR_PARTS;
window.DHIKR_AUDIO_CDN = DHIKR_AUDIO_CDN;
window.DHIKR_RECITER = DHIKR_RECITER;
// API تبديل القارئ (للأزرار في الـ mini-player)
window.RECITERS = RECITERS;
window.athMP_getReciters = function(){ return RECITERS; };
window.athMP_getCurrentReciterIdx = function(){ return _athMP_getReciterIdx(); };
window.athMP_setReciter = function(idx){
  // v190: اضغط على قارئ ← المربع يختفي فوراً ← القارئ المختار يشتغل في الحال
  window.athMP_closeReciterMenu();
  _athMP_setReciterIdx(idx);
  var r = RECITERS[idx];
  if(!r) return;
  // لو فيه طابور موجود (شغّال أو متوقف) — أعد تشغيل العنصر الحالي بالقارئ الجديد
  if(RAQ.queue && RAQ.queue.length > 0 && RAQ.idx < RAQ.queue.length){
    var item = RAQ.queue[RAQ.idx];
    if(item && item.type === 'quran'){
      _athMP_show();
      _athMP_playQuran(item);   // يبدأ فوراً بصوت القارئ المختار
      athToast('🎙️ القارئ: ' + r.name, false);
      return;
    }
    // ذكر دعائي (تسجيل مدمج) — القارئ يُطبّق على الآيات القرآنية
    athToast('🎙️ القارئ: ' + r.name + ' — سيقرأ الآيات القرآنية', false);
    return;
  }
  athToast('🎙️ القارئ: ' + r.name, false);
};
window.athMP_cycleReciter = function(){
  // يتنقل بين القرّاء بشكل دائري
  var cur = _athMP_getReciterIdx();
  var next = (cur + 1) % RECITERS.length;
  _athMP_setReciterIdx(next);
  athToast('🎙️ القارئ: ' + RECITERS[next].name, false);
};
window.athMP_openReciterMenu = function(){
  // افتح قائمة منبثقة لاختيار القارئ
  if(window._athReciterMenuOpen){
    window._athReciterMenuClose && window._athReciterMenuClose();
    return;
  }
  var cur = _athMP_getReciterIdx();
  var html = '<div class="ath-reciter-menu" id="athReciterMenu">';
  html += '<div class="ath-reciter-menu-title">🎙️ اختر القارئ</div>';
  for(var i=0;i<RECITERS.length;i++){
    var r = RECITERS[i];
    var sel = (i===cur) ? ' selected' : '';
    html += '<button class="ath-reciter-item'+sel+'" onclick="athMP_setReciter('+i+')">';
    html += '<span class="ath-reciter-name">'+r.name+'</span>';
    html += '</button>';
  }
  html += '<button class="ath-reciter-close" onclick="athMP_closeReciterMenu()">إغلاق</button>';
  html += '</div>';
  var overlay = document.createElement('div');
  overlay.id = 'athReciterOverlay';
  overlay.className = 'ath-reciter-overlay';
  overlay.innerHTML = html;
  overlay.addEventListener('click', function(e){
    if(e.target === overlay){ window.athMP_closeReciterMenu(); }
  });
  document.body.appendChild(overlay);
  window._athReciterMenuOpen = true;
};
window.athMP_closeReciterMenu = function(){
  var o = document.getElementById('athReciterOverlay');
  if(o && o.parentNode) o.parentNode.removeChild(o);
  window._athReciterMenuOpen = false;
};

/* ══════════════ 25. (v206) إيقاف مؤقت أثناء الأذان/الإقامة ثم استكمال تلقائي ══════════════
   عند بدء الأذان أو الإقامة أو تذكير ما بعد الأذان (من prayer-qibla-notif.js):
   يُوقف مشغّل الأذكار الصوتي فوراً من موقعه الحالي، وبعد انتهاء الصوت
   يُستكمل التشغيل تلقائياً من نفس النقطة بالضبط.
   window.athMP_suspendForSalah(reason) : أوقف مؤقتاً — reason = 'azan'|'iqama'|'post'
   window.athMP_resumeAfterSalah()      : استكمل التشغيل من نقطة التوقف
   لا تفعل شيئاً إن لم يكن المشغل شغّالاً لحظة الطلب — إلغاء آمن تماماً.
════════════════════════════════════════════════════════════════════════ */
window.athMP_suspendForSalah = function(reason){
  if(!RAQ.queue || !RAQ.queue.length) return;          // لا يوجد تشغيل أصلاً
  if(RAQ._salahSuspend) return;                        // موقوف للصلاة بالفعل
  var _playing = RAQ.isPlaying && RAQ.audioEl && !RAQ.audioEl.paused;
  if(!_playing) return;                                // ليس شغّالاً الآن
  RAQ._salahSuspend = reason || 'azan';
  try{ RAQ.audioEl.pause(); }catch(e){}
  RAQ.isPlaying = false;
  _athMP_setPlayIcon(false);
  var _lbl = {azan:'لأجل الأذان', iqama:'لأجل الإقامة', post:'لأجل تذكير الصلاة'}[RAQ._salahSuspend] || 'لأجل الصلاة';
  athToast('⏸️ توقّفت الأذكار مؤقتاً ' + _lbl + ' — ستُستكمل تلقائياً فور انتهائه 🤲', true);
};

window.athMP_resumeAfterSalah = function(){
  if(!RAQ._salahSuspend) return;                       // لم يكن موقوفاً للصلاة
  var _why = RAQ._salahSuspend;
  RAQ._salahSuspend = null;
  if(!RAQ.queue || !RAQ.queue.length) return;          // أُغلق المشغل أثناء التوقف
  _athMP_ensureAudio();
  if(RAQ.audioEl && !RAQ.audioEl.paused && RAQ.audioEl.src){
    // المستخدم أعاده بنفسه أثناء التوقف — اكتفِ بمزامنة الحالة
    RAQ.isPlaying = true;
    _athMP_setPlayIcon(true);
    return;
  }
  if(RAQ.audioEl && RAQ.audioEl.src && !RAQ.audioEl.ended){
    // استكمال من نفس الثانية التي توقف عندها
    var p = RAQ.audioEl.play();
    if(p && p.then){
      p.then(function(){ RAQ.isPlaying = true; _athMP_setPlayIcon(true); }).catch(function(){});
    } else {
      RAQ.isPlaying = true; _athMP_setPlayIcon(true);
    }
  } else {
    // العنصر انتهى أثناء الفجوة — أكمل من العنصر التالي في الطابور
    RAQ.isPlaying = true;
    _athMP_playCurrent();
  }
  var _done = {azan:'الأذان', iqama:'الإقامة', post:'التذكير'}[_why] || 'الصوت';
  athToast('▶️ استكمال الأذكار بعد انتهاء ' + _done + ' — تقبل الله 🤲', false);
};

})();
