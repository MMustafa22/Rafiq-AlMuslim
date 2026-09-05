/* ============================================================
   🕌 رفيق المسلم - نظام المواقيت والقبلة والتنبيهات المتكامل
   ملف: prayer-qibla-notif.js
   الإصدار: 2.0 - النسخة المذهلة
   ============================================================ */

(function() {
  'use strict';

  /* ============================================================
     📍 قاعدة بيانات الدول والمحافظات
     ============================================================ */
  const COUNTRIES_DATA = {
    'مصر': {
      code: 'EG',
      cities: {
        'القاهرة': { lat: 30.0444, lng: 31.2357 },
        'الجيزة': { lat: 30.0131, lng: 31.2089 },
        'الإسكندرية': { lat: 31.2001, lng: 29.9187 },
        'أسيوط': { lat: 27.1809, lng: 31.1837 },
        'الأقصر': { lat: 25.6872, lng: 32.6396 },
        'أسوان': { lat: 24.0889, lng: 32.8998 },
        'المنصورة': { lat: 31.0409, lng: 31.3785 },
        'طنطا': { lat: 30.7865, lng: 31.0004 },
        'الزقازيق': { lat: 30.5877, lng: 31.5022 },
        'الإسماعيلية': { lat: 30.5965, lng: 32.2715 },
        'السويس': { lat: 29.9668, lng: 32.5498 },
        'بورسعيد': { lat: 31.2653, lng: 32.3019 },
        'دمياط': { lat: 31.4175, lng: 31.8144 },
        'الفيوم': { lat: 29.3084, lng: 30.8428 },
        'بني سويف': { lat: 29.0661, lng: 31.0994 },
        'المنيا': { lat: 28.0871, lng: 30.7618 },
        'سوهاج': { lat: 26.5569, lng: 31.6948 },
        'قنا': { lat: 26.1551, lng: 32.7160 },
        'الغردقة': { lat: 27.2579, lng: 33.8116 },
        'شرم الشيخ': { lat: 27.9158, lng: 34.3300 },
        'مرسى مطروح': { lat: 31.3543, lng: 27.2373 },
        'العريش': { lat: 31.1313, lng: 33.7984 },
        'الطور': { lat: 28.2416, lng: 33.6224 },
        'كفر الشيخ': { lat: 31.1107, lng: 30.9388 },
        'المحلة الكبرى': { lat: 30.9698, lng: 31.1668 },
        'شبين الكوم': { lat: 30.5536, lng: 31.0117 },
        'بنها': { lat: 30.4596, lng: 31.1809 },
        'الخارجة': { lat: 25.4517, lng: 30.5466 }
      }
    },
    'السعودية': {
      code: 'SA',
      cities: {
        'مكة المكرمة': { lat: 21.3891, lng: 39.8579 },
        'المدينة المنورة': { lat: 24.5247, lng: 39.5692 },
        'الرياض': { lat: 24.7136, lng: 46.6753 },
        'جدة': { lat: 21.4858, lng: 39.1925 },
        'الدمام': { lat: 26.4207, lng: 50.0888 },
        'الخبر': { lat: 26.2172, lng: 50.1971 },
        'الطائف': { lat: 21.2703, lng: 40.4158 },
        'تبوك': { lat: 28.3998, lng: 36.5700 },
        'بريدة': { lat: 26.3260, lng: 43.9750 },
        'أبها': { lat: 18.2164, lng: 42.5053 },
        'حائل': { lat: 27.5219, lng: 41.7170 },
        'نجران': { lat: 17.4924, lng: 44.1277 },
        'جازان': { lat: 16.8892, lng: 42.5611 },
        'الأحساء': { lat: 25.3839, lng: 49.5854 },
        'ينبع': { lat: 24.0890, lng: 38.0617 },
        'الجبيل': { lat: 27.0046, lng: 49.6606 },
        'خميس مشيط': { lat: 18.3061, lng: 42.7297 },
        'عرعر': { lat: 30.9753, lng: 41.0381 },
        'سكاكا': { lat: 29.9697, lng: 40.2064 },
        'الباحة': { lat: 20.0129, lng: 41.4677 }
      }
    },
    'الإمارات': {
      code: 'AE',
      cities: {
        'دبي': { lat: 25.2048, lng: 55.2708 },
        'أبوظبي': { lat: 24.4539, lng: 54.3773 },
        'الشارقة': { lat: 25.3463, lng: 55.4209 },
        'عجمان': { lat: 25.4052, lng: 55.5136 },
        'رأس الخيمة': { lat: 25.7895, lng: 55.9432 },
        'الفجيرة': { lat: 25.1288, lng: 56.3265 },
        'أم القيوين': { lat: 25.5647, lng: 55.5526 },
        'العين': { lat: 24.2075, lng: 55.7447 }
      }
    },
    'الكويت': {
      code: 'KW',
      cities: {
        'مدينة الكويت': { lat: 29.3759, lng: 47.9774 },
        'حولي': { lat: 29.3326, lng: 48.0289 },
        'الفروانية': { lat: 29.2775, lng: 47.9589 },
        'الأحمدي': { lat: 29.0769, lng: 48.0838 },
        'الجهراء': { lat: 29.3375, lng: 47.6581 },
        'مبارك الكبير': { lat: 29.2008, lng: 48.0556 }
      }
    },
    'قطر': {
      code: 'QA',
      cities: {
        'الدوحة': { lat: 25.2854, lng: 51.5310 },
        'الريان': { lat: 25.2919, lng: 51.4244 },
        'الوكرة': { lat: 25.1715, lng: 51.6065 },
        'الخور': { lat: 25.6840, lng: 51.5057 },
        'الشحانية': { lat: 25.3667, lng: 51.1833 }
      }
    },
    'البحرين': {
      code: 'BH',
      cities: {
        'المنامة': { lat: 26.2285, lng: 50.5860 },
        'المحرق': { lat: 26.2572, lng: 50.6111 },
        'الرفاع': { lat: 26.1300, lng: 50.5550 },
        'مدينة عيسى': { lat: 26.1736, lng: 50.5476 },
        'مدينة حمد': { lat: 26.1158, lng: 50.5125 }
      }
    },
    'عمان': {
      code: 'OM',
      cities: {
        'مسقط': { lat: 23.5880, lng: 58.3829 },
        'صلالة': { lat: 17.0151, lng: 54.0924 },
        'صحار': { lat: 24.3471, lng: 56.7090 },
        'نزوى': { lat: 22.9333, lng: 57.5333 },
        'صور': { lat: 22.5667, lng: 59.5289 },
        'البريمي': { lat: 24.2503, lng: 55.7836 }
      }
    },
    'الأردن': {
      code: 'JO',
      cities: {
        'عمان': { lat: 31.9454, lng: 35.9284 },
        'الزرقاء': { lat: 32.0728, lng: 36.0876 },
        'إربد': { lat: 32.5556, lng: 35.8500 },
        'العقبة': { lat: 29.5267, lng: 35.0078 },
        'الكرك': { lat: 31.1854, lng: 35.7047 },
        'معان': { lat: 30.1962, lng: 35.7361 },
        'المفرق': { lat: 32.2807, lng: 36.2024 },
        'السلط': { lat: 32.0389, lng: 35.7272 }
      }
    },
    'فلسطين': {
      code: 'PS',
      cities: {
        'القدس': { lat: 31.7683, lng: 35.2137 },
        'غزة': { lat: 31.5017, lng: 34.4668 },
        'رام الله': { lat: 31.9038, lng: 35.2034 },
        'نابلس': { lat: 32.2211, lng: 35.2544 },
        'الخليل': { lat: 31.5326, lng: 35.0998 },
        'بيت لحم': { lat: 31.7054, lng: 35.2024 },
        'جنين': { lat: 32.4597, lng: 35.3008 },
        'طولكرم': { lat: 32.3104, lng: 35.0286 },
        'أريحا': { lat: 31.8607, lng: 35.4444 },
        'رفح': { lat: 31.2965, lng: 34.2402 },
        'خان يونس': { lat: 31.3469, lng: 34.3060 }
      }
    },
    'لبنان': {
      code: 'LB',
      cities: {
        'بيروت': { lat: 33.8938, lng: 35.5018 },
        'طرابلس': { lat: 34.4367, lng: 35.8497 },
        'صيدا': { lat: 33.5634, lng: 35.3711 },
        'صور': { lat: 33.2733, lng: 35.1937 },
        'بعلبك': { lat: 34.0058, lng: 36.2181 },
        'زحلة': { lat: 33.8463, lng: 35.9019 },
        'جونيه': { lat: 33.9808, lng: 35.6178 }
      }
    },
    'سوريا': {
      code: 'SY',
      cities: {
        'دمشق': { lat: 33.5138, lng: 36.2765 },
        'حلب': { lat: 36.2021, lng: 37.1343 },
        'حمص': { lat: 34.7324, lng: 36.7137 },
        'حماة': { lat: 35.1318, lng: 36.7578 },
        'اللاذقية': { lat: 35.5138, lng: 35.7833 },
        'دير الزور': { lat: 35.3359, lng: 40.1408 },
        'الرقة': { lat: 35.9594, lng: 39.0094 },
        'درعا': { lat: 32.6189, lng: 36.1021 },
        'إدلب': { lat: 35.9306, lng: 36.6339 },
        'طرطوس': { lat: 34.8959, lng: 35.8867 }
      }
    },
    'العراق': {
      code: 'IQ',
      cities: {
        'بغداد': { lat: 33.3152, lng: 44.3661 },
        'البصرة': { lat: 30.5085, lng: 47.7804 },
        'الموصل': { lat: 36.3489, lng: 43.1577 },
        'أربيل': { lat: 36.1911, lng: 44.0090 },
        'النجف': { lat: 32.0000, lng: 44.3333 },
        'كربلاء': { lat: 32.6160, lng: 44.0249 },
        'كركوك': { lat: 35.4681, lng: 44.3922 },
        'السليمانية': { lat: 35.5650, lng: 45.4329 },
        'الأنبار': { lat: 33.4258, lng: 43.2992 },
        'بابل': { lat: 32.4670, lng: 44.4203 },
        'ديالى': { lat: 33.7733, lng: 44.7544 },
        'دهوك': { lat: 36.8669, lng: 42.9503 }
      }
    },
    'المغرب': {
      code: 'MA',
      cities: {
        'الرباط': { lat: 34.0209, lng: -6.8416 },
        'الدار البيضاء': { lat: 33.5731, lng: -7.5898 },
        'فاس': { lat: 34.0181, lng: -5.0078 },
        'مراكش': { lat: 31.6295, lng: -7.9811 },
        'طنجة': { lat: 35.7595, lng: -5.8340 },
        'أكادير': { lat: 30.4278, lng: -9.5981 },
        'مكناس': { lat: 33.8935, lng: -5.5473 },
        'وجدة': { lat: 34.6814, lng: -1.9086 },
        'تطوان': { lat: 35.5889, lng: -5.3626 },
        'القنيطرة': { lat: 34.2610, lng: -6.5802 },
        'سلا': { lat: 34.0531, lng: -6.7985 },
        'العيون': { lat: 27.1418, lng: -13.1873 }
      }
    },
    'تونس': {
      code: 'TN',
      cities: {
        'تونس': { lat: 36.8065, lng: 10.1815 },
        'صفاقس': { lat: 34.7406, lng: 10.7603 },
        'سوسة': { lat: 35.8256, lng: 10.6411 },
        'القيروان': { lat: 35.6781, lng: 10.0963 },
        'بنزرت': { lat: 37.2746, lng: 9.8739 },
        'قابس': { lat: 33.8815, lng: 10.0982 },
        'المنستير': { lat: 35.7770, lng: 10.8262 },
        'قفصة': { lat: 34.4225, lng: 8.7842 },
        'المهدية': { lat: 35.5047, lng: 11.0622 },
        'نابل': { lat: 36.4513, lng: 10.7357 }
      }
    },
    'الجزائر': {
      code: 'DZ',
      cities: {
        'الجزائر العاصمة': { lat: 36.7538, lng: 3.0588 },
        'وهران': { lat: 35.6976, lng: -0.6337 },
        'قسنطينة': { lat: 36.3650, lng: 6.6147 },
        'عنابة': { lat: 36.9000, lng: 7.7667 },
        'سطيف': { lat: 36.1898, lng: 5.4108 },
        'باتنة': { lat: 35.5559, lng: 6.1742 },
        'بسكرة': { lat: 34.8505, lng: 5.7331 },
        'تلمسان': { lat: 34.8828, lng: -1.3167 },
        'بجاية': { lat: 36.7525, lng: 5.0844 },
        'تيزي وزو': { lat: 36.7118, lng: 4.0480 },
        'ورقلة': { lat: 31.9539, lng: 5.3375 },
        'غرداية': { lat: 32.4914, lng: 3.6731 }
      }
    },
    'ليبيا': {
      code: 'LY',
      cities: {
        'طرابلس': { lat: 32.8872, lng: 13.1913 },
        'بنغازي': { lat: 32.1149, lng: 20.0686 },
        'مصراتة': { lat: 32.3754, lng: 15.0925 },
        'البيضاء': { lat: 32.7627, lng: 21.7551 },
        'الزاوية': { lat: 32.7571, lng: 12.7276 },
        'سبها': { lat: 27.0377, lng: 14.4283 },
        'سرت': { lat: 31.2089, lng: 16.5887 },
        'درنة': { lat: 32.7556, lng: 22.6378 },
        'طبرق': { lat: 32.0836, lng: 23.9763 }
      }
    },
    'السودان': {
      code: 'SD',
      cities: {
        'الخرطوم': { lat: 15.5007, lng: 32.5599 },
        'أم درمان': { lat: 15.6440, lng: 32.4773 },
        'بورتسودان': { lat: 19.6175, lng: 37.2164 },
        'كسلا': { lat: 15.4509, lng: 36.4011 },
        'الأبيض': { lat: 13.1839, lng: 30.2176 },
        'القضارف': { lat: 14.0347, lng: 35.3838 },
        'نيالا': { lat: 12.0489, lng: 24.8807 },
        'الفاشر': { lat: 13.6308, lng: 25.3500 },
        'دنقلا': { lat: 19.1700, lng: 30.4750 }
      }
    },
    'اليمن': {
      code: 'YE',
      cities: {
        'صنعاء': { lat: 15.3694, lng: 44.1910 },
        'عدن': { lat: 12.7855, lng: 45.0187 },
        'تعز': { lat: 13.5795, lng: 44.0209 },
        'الحديدة': { lat: 14.7978, lng: 42.9545 },
        'إب': { lat: 13.9667, lng: 44.1833 },
        'المكلا': { lat: 14.5424, lng: 49.1242 },
        'ذمار': { lat: 14.5430, lng: 44.4051 },
        'حضرموت': { lat: 16.0000, lng: 49.0000 },
        'مأرب': { lat: 15.4694, lng: 45.3263 }
      }
    },
    'موريتانيا': {
      code: 'MR',
      cities: {
        'نواكشوط': { lat: 18.0735, lng: -15.9582 },
        'نواذيبو': { lat: 20.9341, lng: -17.0381 },
        'كيهيدي': { lat: 16.4202, lng: -13.4006 },
        'كيفة': { lat: 16.6242, lng: -11.4044 },
        'روصو': { lat: 16.5138, lng: -15.8053 }
      }
    },
    'الصومال': {
      code: 'SO',
      cities: {
        'مقديشو': { lat: 2.0469, lng: 45.3182 },
        'هرجيسا': { lat: 9.5616, lng: 44.0650 },
        'بوصاصو': { lat: 11.2842, lng: 49.1816 },
        'كيسمايو': { lat: -0.3582, lng: 42.5454 }
      }
    },
    'تركيا': {
      code: 'TR',
      cities: {
        'إسطنبول': { lat: 41.0082, lng: 28.9784 },
        'أنقرة': { lat: 39.9334, lng: 32.8597 },
        'إزمير': { lat: 38.4192, lng: 27.1287 },
        'بورصة': { lat: 40.1828, lng: 29.0665 },
        'أنطاليا': { lat: 36.8969, lng: 30.7133 },
        'أضنة': { lat: 37.0000, lng: 35.3213 },
        'غازي عنتاب': { lat: 37.0662, lng: 37.3833 },
        'قونيا': { lat: 37.8714, lng: 32.4843 },
        'طرابزون': { lat: 41.0027, lng: 39.7168 }
      }
    },
    'باكستان': {
      code: 'PK',
      cities: {
        'إسلام آباد': { lat: 33.6844, lng: 73.0479 },
        'كراتشي': { lat: 24.8607, lng: 67.0011 },
        'لاهور': { lat: 31.5204, lng: 74.3587 },
        'فيصل آباد': { lat: 31.4504, lng: 73.1350 },
        'راولبندي': { lat: 33.5651, lng: 73.0169 },
        'بيشاور': { lat: 34.0151, lng: 71.5249 },
        'ملتان': { lat: 30.1575, lng: 71.5249 },
        'حيدر آباد': { lat: 25.3960, lng: 68.3578 }
      }
    },
    'إندونيسيا': {
      code: 'ID',
      cities: {
        'جاكرتا': { lat: -6.2088, lng: 106.8456 },
        'سورابايا': { lat: -7.2575, lng: 112.7521 },
        'باندونغ': { lat: -6.9175, lng: 107.6191 },
        'ميدان': { lat: 3.5952, lng: 98.6722 },
        'سيمارانغ': { lat: -6.9667, lng: 110.4167 },
        'مكاسر': { lat: -5.1477, lng: 119.4327 }
      }
    },
    'ماليزيا': {
      code: 'MY',
      cities: {
        'كوالالمبور': { lat: 3.1390, lng: 101.6869 },
        'جورج تاون': { lat: 5.4145, lng: 100.3292 },
        'إيبوه': { lat: 4.5975, lng: 101.0901 },
        'شاه علم': { lat: 3.0733, lng: 101.5185 },
        'جوهور باهرو': { lat: 1.4927, lng: 103.7414 },
        'كوتا كينابالو': { lat: 5.9804, lng: 116.0735 }
      }
    },
    'بنغلاديش': {
      code: 'BD',
      cities: {
        'دكا': { lat: 23.8103, lng: 90.4125 },
        'شيتاغونغ': { lat: 22.3569, lng: 91.7832 },
        'خولنا': { lat: 22.8456, lng: 89.5403 },
        'راجشاهي': { lat: 24.3636, lng: 88.6241 },
        'سيلهيت': { lat: 24.8949, lng: 91.8687 }
      }
    }
  };

  /* ============================================================
     🕋 ثوابت الكعبة المشرفة لحساب القبلة
     ============================================================ */
  const KAABA = { lat: 21.4225, lng: 39.8262 };

  /* ============================================================
     🔊 روابط أذان الشيخ ناصر القطامي 🕋
     CDN: jsDelivr (CORS مفتوح + سرعة عالية + قابل للكاش)
     المصدر الأصلي: github.com/Kiwifu/adhan-mp3
     ============================================================ */
  const SOUNDS = {
    // الأذان الموحّد — ناصر القطامي (الرياض) لكل الصلوات ~ 2.1MB / 2 دقيقة
    // صوت واحد لكل الأوقات — الفجر وباقي الصلوات نفس الصوت
    azan:     'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
    // أذان الفجر — نفس الصوت (موحّد)
    azanFajr: 'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
    // النسخة عالية الجودة (نسخة قصيرة) — تُستخدم بعد الأذان لمقطع "حي على الصلاة"
    takbeer:  'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_-_HQ_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A).mp3'
  };

  /**
   * مصادر الأذان الاحتياطية — أذان ناصر القطامي من 3 ميرورات مختلفة
   */
  const AZAN_SOURCES = [
    // 1) jsDelivr CDN (المصدر الأساسي — أسرع وأكثر استقراراً)
    {
      azan:    'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      fajr:    'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      takbeer: 'https://cdn.jsdelivr.net/gh/Kiwifu/adhan-mp3@main/Nasser_Al_Qatami_-_HQ_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A).mp3'
    },
    // 2) GitHub Raw (احتياطي مباشر — قد يكون أبطأ)
    {
      azan:    'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      fajr:    'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      takbeer: 'https://raw.githubusercontent.com/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_-_HQ_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A).mp3'
    },
    // 3) Statically.io (CDN احتياطي ثانٍ يعمل مع GitHub)
    {
      azan:    'https://cdn.statically.io/gh/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      fajr:    'https://cdn.statically.io/gh/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_2_-_Riyadh_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A_-_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6).mp3',
      takbeer: 'https://cdn.statically.io/gh/Kiwifu/adhan-mp3/main/Nasser_Al_Qatami_-_HQ_(%D9%86%D8%A7%D8%B5%D8%B1_%D8%A7%D9%84%D9%82%D8%B7%D8%A7%D9%85%D9%8A).mp3'
    }
  ];

  /* ============================================================
     ⏱️ توقيت مقطع "حي على الصلاة" داخل ملف أذان ناصر القطامي
     ============================================================ */
  // ملف الأذان مدته ~ 120 ثانية. ترتيب الأذان:
  //   • الله أكبر × 4    (0–15 ثا)
  //   • أشهد أن لا إله إلا الله × 2  (15–40 ثا)
  //   • أشهد أن محمداً رسول الله × 2 (40–65 ثا)
  //   • حي على الصلاة × 2   (65–88 ثا) ← هذا اللي محتاجينه
  //   • حي على الفلاح × 2   (88–110 ثا)
  //   • الله أكبر + لا إله إلا الله (110–120 ثا)
  const HAYYA_ALA_SALAH_START_SEC = 65; // ثانية بداية "حي على الصلاة"
  const HAYYA_ALA_SALAH_END_SEC   = 88; // ثانية النهاية

  /* ============================================================
     📢 نص الإقامة — لا يوجد ملف صوتي مخصص لها في مصادرنا الحالية،
     فتُنطق عبر SpeechSynthesis (المتاح أوفلاين على أغلب الأجهزة)
     مع نغمة برمجية احتياطية أخيرة عند تعذّر النطق
     ============================================================ */
  const IQAMA_TEXT_LINES = [
    { ar: 'اللهُ أكْبَر، اللهُ أكْبَر',                  rate: 0.85 },
    { ar: 'أشْهَدُ أنْ لا إِلَهَ إلّا اللهُ',                rate: 0.85 },
    { ar: 'أشْهَدُ أنَّ مُحَمَّداً رَسُولُ اللهِ',           rate: 0.85 },
    { ar: 'حَيَّ عَلَى الصَّلاة',                          rate: 0.8  },
    { ar: 'حَيَّ عَلَى الفَلاح',                           rate: 0.8  },
    { ar: 'قَدْ قَامَتِ الصَّلاة، قَدْ قَامَتِ الصَّلاة',     rate: 0.72 },
    { ar: 'اللهُ أكْبَر، اللهُ أكْبَر',                  rate: 0.85 },
    { ar: 'لا إِلَهَ إلّا اللهُ',                          rate: 0.78 }
  ];

  /* ============================================================
     💾 نظام كاش الصوت — IndexedDB
     يحفظ ملفات MP3 كـ Blob محلياً ويرجعها offline
     ============================================================ */

  const AUDIO_DB_NAME    = 'rm-audio-cache';
  const AUDIO_DB_VERSION = 1;
  const AUDIO_STORE      = 'files';

  // مخزن Blob في الذاكرة لتسريع التشغيل (تفادي قراءة IDB في كل مرة)
  const _blobUrlCache = {};

  /* ============================================================
     🔊 إصلاح الصوت — AudioContext مشترك عالمي
     سبب الصمت: المتصفح يوقف AudioContext تلقائياً
     حتى يحدث تفاعل من المستخدم (click/touch)
     الحل: نفتح AudioContext مرة واحدة ونُبقيه حياً
     ============================================================ */
  let _globalAudioCtx    = null;
  let _audioUnlocked     = false;
  let _pendingAzanIsFajr = false;
  let _pendingAzanPlay   = false;
  let _iqamaTimer        = null; // مؤقّت تشغيل الإقامة تلقائياً بعد انتهاء الأذان
  let _iqamaAt           = null; // (v206) وقت تشغيل الإقامة المجدول — لقرار استكمال الأذكار

  /* ═══ (v206) تكامل مشغّل الأذكار مع الأذان/الإقامة ═══
     عند تشغيل الأذان أو الإقامة أو تذكير ما بعد الأذان (مرّت 15 دقيقة
     على الأذان): يُوقف مشغّل الأذكار (rafiq-audio.js) مؤقتاً من موقعه،
     ثم يُستكمل تلقائياً فور انتهاء الصوت — من نفس الثانية بالضبط. */
  function _pauseDhikrForSalah(reason) {
    try { if (typeof window.athMP_suspendForSalah === 'function') window.athMP_suspendForSalah(reason); } catch (e) {}
  }
  function _resumeDhikrForSalah(from) {
    try { if (typeof window.athMP_resumeAfterSalah === 'function') window.athMP_resumeAfterSalah(from); } catch (e) {}
  }
  function _maybeResumeDhikrAfterAzan() {
    // الإقامة مزمعة خلال دقيقة؟ إذن نبقى موقوفين حتى تنتهي ثم يستكمل المشغل (closeIqamaModal)
    if (_iqamaTimer && _iqamaAt && (_iqamaAt - Date.now()) <= 60000) return;
    _resumeDhikrForSalah('azan');
  }

  /** إنشاء أو إرجاع الـ AudioContext المشترك */
  function _getGlobalCtx() {
    if (!_globalAudioCtx || _globalAudioCtx.state === 'closed') {
      try {
        _globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.error('[RM] AudioContext غير مدعوم:', e);
        return null;
      }
    }
    return _globalAudioCtx;
  }

  /** إيقاظ الـ AudioContext — يعيد Promise<AudioContext|null> */
  async function _resumeAudioCtx() {
    const ctx = _getGlobalCtx();
    if (!ctx) return null;
    if (ctx.state === 'suspended') {
      try { await ctx.resume(); } catch (e) {}
    }
    return ctx;
  }

  /**
   * فك قفل الصوت عند أول تفاعل — ضروري لسياسة Autoplay في المتصفحات
   */
  function _unlockAudio() {
    if (_audioUnlocked) return;
    _audioUnlocked = true;

    const ctx = _getGlobalCtx();
    if (!ctx) return;

    ctx.resume().then(() => {
      // تشغيل buffer صامت لإلغاء قفل الصوت نهائياً
      try {
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
        console.log('[RM] 🔊 الصوت مُفعَّل ✅');
      } catch (e) {}

      // لو كان في أذان في الانتظار — شغّله الآن
      if (_pendingAzanPlay) {
        _pendingAzanPlay = false;
        playAzan(_pendingAzanIsFajr);
      }
    }).catch(() => {});
  }

  // فك قفل الصوت عند أي تفاعل من المستخدم
  ['click', 'touchstart', 'keydown', 'pointerdown'].forEach(ev =>
    document.addEventListener(ev, _unlockAudio, { passive: true })
  );

  /** فتح (أو إنشاء) قاعدة بيانات الصوت */
  function _openAudioDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(AUDIO_DB_NAME, AUDIO_DB_VERSION);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(AUDIO_STORE)) {
          db.createObjectStore(AUDIO_STORE);
        }
      };
      req.onsuccess = e => resolve(e.target.result);
      req.onerror   = e => reject(e.target.error);
    });
  }

  /** حفظ Blob في IDB */
  async function _saveAudioBlob(key, blob) {
    try {
      const db = await _openAudioDB();
      await new Promise((resolve, reject) => {
        const tx    = db.transaction(AUDIO_STORE, 'readwrite');
        const store = tx.objectStore(AUDIO_STORE);
        const req   = store.put(blob, key);
        req.onsuccess = () => resolve();
        req.onerror   = e => reject(e.target.error);
      });
      db.close();
      console.log('[RM-Cache] \u2705 \u062d\u064f\u0641\u0638 \u0627\u0644\u0635\u0648\u062a: ' + key);
    } catch (e) {
      console.warn('[RM-Cache] \u0641\u0634\u0644 \u062d\u0641\u0638 ' + key + ':', e);
    }
  }

  /** قراءة Blob من IDB — يرجع null لو مش موجود */
  async function _loadAudioBlob(key) {
    try {
      const db   = await _openAudioDB();
      const blob = await new Promise((resolve, reject) => {
        const tx    = db.transaction(AUDIO_STORE, 'readonly');
        const store = tx.objectStore(AUDIO_STORE);
        const req   = store.get(key);
        req.onsuccess = e => resolve(e.target.result || null);
        req.onerror   = e => reject(e.target.error);
      });
      db.close();
      return blob;
    } catch (_) {
      return null;
    }
  }

  /**
   * جلب صوت — أولاً من الكاش، وإلا من النت ثم يحفظه
   * يرجع: objectURL (string) أو null
   */
  async function _getAudioUrl(key, remoteUrl) {
    // 1) مخزن الذاكرة السريع
    if (_blobUrlCache[key]) return _blobUrlCache[key];

    // 2) IndexedDB
    const cached = await _loadAudioBlob(key);
    if (cached) {
      const url = URL.createObjectURL(cached);
      _blobUrlCache[key] = url;
      console.log('[RM-Cache] 📦 محمّل من الكاش: ' + key);
      return url;
    }

    // 3) الشبكة — يجرب remoteUrl أولاً ثم المصادر الاحتياطية
    if (!navigator.onLine) {
      console.warn('[RM-Cache] ⚠️ لا إنترنت ولا كاش لـ: ' + key);
      return null;
    }

    // بناء قائمة المصادر: remoteUrl أولاً ثم AZAN_SOURCES كاحتياط
    const sourceType = key.includes('fajr') ? 'fajr' : key.includes('takbeer') ? 'takbeer' : 'azan';
    const candidates = [remoteUrl];
    if (typeof AZAN_SOURCES !== 'undefined') {
      AZAN_SOURCES.forEach(src => {
        const candidate = src[sourceType] || src.azan;
        if (candidate && !candidates.includes(candidate)) candidates.push(candidate);
      });
    }

    for (const candidateUrl of candidates) {
      try {
        console.log('[RM-Cache] 🌐 جلب من: ' + candidateUrl);
        const resp = await fetch(candidateUrl, { signal: AbortSignal.timeout(15000) });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const blob = await resp.blob();
        await _saveAudioBlob(key, blob);
        const url = URL.createObjectURL(blob);
        _blobUrlCache[key] = url;
        return url;
      } catch (e) {
        console.warn('[RM-Cache] فشل جلب من ' + candidateUrl + ' :', e.message);
      }
    }

    console.error('[RM-Cache] ❌ فشلت كل المصادر لـ: ' + key);
    return null;
  }

  /**
   * تحميل أصوات الأذان بشكل مؤجل.
   * لا نحمّل الملفات الثلاثة عند الإقلاع؛ التشغيل نفسه يطلب الصوت عند الحاجة.
   * هذا يحافظ على الوظيفة ويمنع استهلاك الشبكة/البطارية أثناء فتح التطبيق فقط.
   */
  let _audioPrefetchDone = false;
  let _audioPrefetchQueued = false;
  let _audioUserInteracted = false;

  function _audioPrefetchAllowed() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(connection && connection.saveData);
    const slowNetwork = !!(connection && /^(slow-2g|2g)$/.test(connection.effectiveType || ''));
    const batterySaver = document.documentElement.classList.contains('rfq-battery-saver');
    return !document.hidden && !saveData && !slowNetwork && !batterySaver && navigator.onLine;
  }

  async function prefetchAllAudio(options = {}) {
    if (_audioPrefetchDone || !navigator.onLine) return;
    if (!options.force && !_audioPrefetchAllowed()) return;
    _audioPrefetchDone = true;
    console.log('[RM-Cache] 🔄 تحميل مسبق مؤجل للأصوات...');
    await Promise.allSettled([
      _getAudioUrl('takbeer',  SOUNDS.takbeer),
      _getAudioUrl('azan',     SOUNDS.azan),
      _getAudioUrl('azanFajr', SOUNDS.azanFajr)
    ]);
    console.log('[RM-Cache] ✅ انتهى التحميل المسبق');
  }

  function scheduleAudioPrefetch() {
    if (!_audioUserInteracted || _audioPrefetchDone || _audioPrefetchQueued) return;
    _audioPrefetchQueued = true;
    const run = () => {
      _audioPrefetchQueued = false;
      prefetchAllAudio();
    };
    if (document.hidden) {
      _audioPrefetchQueued = false;
      return;
    }
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 30000 });
    } else {
      window.setTimeout(run, 2500);
    }
  }

  // ننتظر أول تفاعل بدل بدء شبكة إضافية أثناء شاشة البداية.
  ['pointerdown', 'keydown', 'touchstart'].forEach(type => {
    window.addEventListener(type, () => {
      _audioUserInteracted = true;
      scheduleAudioPrefetch();
    }, { once: true, passive: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) scheduleAudioPrefetch();
  }, { passive: true });

  // إعادة المحاولة بشكل خفيف عند عودة الاتصال، بدون تحميل أثناء الخلفية.
  window.addEventListener('online', () => {
    console.log('[RM-Cache] 🌐 عاد الاتصال — تجهيز الكاش الصوتي عند الخمول');
    scheduleAudioPrefetch();
  }, { passive: true });

  /* ============================================================
     💾 مفاتيح التخزين المحلي
     ============================================================ */
  const STORAGE_KEYS = {
    location: 'rm_pq_location',
    method: 'rm_pq_method',
    manualTimes: 'rm_pq_manual_times',
    manualMode: 'rm_pq_manual_mode',
    notifSettings: 'rm_pq_notif_settings',
    lastCheck: 'rm_pq_last_check',
    completedToday: 'rm_pq_completed_today',
    aodSuggested: 'rm_pq_aod_suggested',
    bgReliabilityTipShown: 'rm_pq_bg_tip_shown'
  };

  /* ============================================================
     ⚙️ الإعدادات الافتراضية
     ============================================================ */
  const DEFAULT_SETTINGS = {
    location: { country: 'مصر', city: 'القاهرة', lat: 30.0444, lng: 31.2357 },
    method: 5, // طريقة الحساب: 5 = الهيئة المصرية العامة للمساحة
    manualMode: false,
    manualTimes: {
      fajr: '04:30',
      duha: '06:50',
      dhuhr: '12:00',
      asr: '15:30',
      maghrib: '18:00',
      isha: '19:30'
    },
    notifSettings: {
      azanEnabled: true,
      azanSoundEnabled: true,
      preAzanMinutes: 15,
      preAzanSoundType: 'beep3',
      smartGuardianEnabled: true,
      guardianLeadMinutes: 20,
      guardianDimModeEnabled: true,
      postAzanEnabled: true,
      postAzanMinutes: 15,
      iqamaEnabled: true,
      iqamaDelaySeconds: 4,
      morningAthkarTime: '05:30',
      eveningAthkarTime: '17:00',
      sleepAthkarTime: '22:00',
      quranReminderTime: '20:00',
      missedReminderEnabled: true,
      missedCheckHour: 23,
      vibrationEnabled: true,
      desktopNotifEnabled: true,
      alarmSoundEnabled: true,
      alarmRepeatCount: 3
    },
    notifVolume: 0.8
  };

  /* ============================================================
     🗂️ الحالة العامة
     ============================================================ */
  let state = {
    settings: loadSettings(),
    currentTimes: null,
    azanAudio: null,
    checkInterval: null,
    currentHeading: 0,
    targetQibla: 0,
    notifiedPrayers: new Set(),
    notifiedAthkar: new Set(),
    swRegistration: null,
    swPingInterval: null,
    wakeLockSentinel: null,
    smartGuardTimer: null,
    smartGuardReleaseTimer: null,
    smartGuardClockInterval: null,
    smartGuardExactTimers: [],
    smartGuardActive: false,
    _lastNextPrayerIdx: -1
  };

  /* ============================================================
     📦 وظائف التخزين
     ============================================================ */
  function saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Save error:', e);
      return false;
    }
  }

  function loadData(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  function loadSettings() {
    const loaded = {
      location: loadData(STORAGE_KEYS.location, DEFAULT_SETTINGS.location),
      method: loadData(STORAGE_KEYS.method, DEFAULT_SETTINGS.method),
      manualMode: loadData(STORAGE_KEYS.manualMode, DEFAULT_SETTINGS.manualMode),
      manualTimes: loadData(STORAGE_KEYS.manualTimes, DEFAULT_SETTINGS.manualTimes),
      notifSettings: loadData(STORAGE_KEYS.notifSettings, DEFAULT_SETTINGS.notifSettings),
      notifVolume: loadData(STORAGE_KEYS.notifVolume, DEFAULT_SETTINGS.notifVolume)
    };
    // ضمان وجود الإعدادات الجديدة في حالة تحديث من نسخة قديمة
    if (!loaded.notifSettings.preAzanSoundType) {
      loaded.notifSettings.preAzanSoundType = DEFAULT_SETTINGS.notifSettings.preAzanSoundType;
    }
    if (typeof loaded.notifSettings.smartGuardianEnabled !== 'boolean') {
      loaded.notifSettings.smartGuardianEnabled = DEFAULT_SETTINGS.notifSettings.smartGuardianEnabled;
    }
    if (!loaded.notifSettings.guardianLeadMinutes) {
      loaded.notifSettings.guardianLeadMinutes = DEFAULT_SETTINGS.notifSettings.guardianLeadMinutes;
    }
    if (typeof loaded.notifSettings.guardianDimModeEnabled !== 'boolean') {
      loaded.notifSettings.guardianDimModeEnabled = DEFAULT_SETTINGS.notifSettings.guardianDimModeEnabled;
    }
    if (typeof loaded.notifSettings.iqamaEnabled !== 'boolean') {
      loaded.notifSettings.iqamaEnabled = DEFAULT_SETTINGS.notifSettings.iqamaEnabled;
    }
    if (!loaded.notifSettings.iqamaDelaySeconds) {
      loaded.notifSettings.iqamaDelaySeconds = DEFAULT_SETTINGS.notifSettings.iqamaDelaySeconds;
    }
    return loaded;
  }

  /* ============================================================
     Service Worker — التنبيهات
     ============================================================ */

  /** تسجيل الـ SW وربطه بالتطبيق */
  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      console.warn('[RM] Service Workers غير مدعومة في هذا المتصفح');
      return null;
    }

    try {
      /* نبحث عن الـ SW في نفس المجلد أو في الجذر */
      const swUrl = _resolveSWPath();
      const reg   = await navigator.serviceWorker.register(swUrl, { scope: './' });
      state.swRegistration = reg;

      console.log('[RM] SW مسجّل بنجاح ✅', reg.scope);

      /* استماع للرسائل القادمة من الـ SW */
      navigator.serviceWorker.addEventListener('message', onSWMessage);

      /* انتظر حتى يكون الـ SW جاهزاً */
      await navigator.serviceWorker.ready;

      /* تسجيل Periodic Background Sync لو مدعوم */
      await tryRegisterPeriodicSync(reg);

      return reg;
    } catch (err) {
      console.error('[RM] فشل تسجيل SW:', err);
      return null;
    }
  }

  /** اكتشاف مسار ملف الـ SW تلقائياً */
  function _resolveSWPath() {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    for (const s of scripts) {
      if (s.src.includes('prayer-qibla-notif')) {
        return s.src.replace('prayer-qibla-notif.js', 'sw-rafiq.js');
      }
    }
    return './sw-rafiq.js';
  }

  /** تسجيل Periodic Background Sync — يحافظ على الـ SW حيّ في الخلفية
   *  ⚠️ حدود حقيقية لازم تعرفها:
   *  - متاح بس في كروم على أندرويد لما التطبيق يبقى مُثبَّت (PWA)، ومش متاح في iOS/Safari خالص.
   *  - قيمة minInterval دي مجرد "طلب"، المتصفح هو اللي بيقرر الفترة الفعلية حسب
   *    نشاط المستخدم مع التطبيق (Site Engagement) — غالباً هتبقى ساعات مش دقايق،
   *    مهما بعتنا رقم صغير زي 60 ثانية.
   *  - عشان كده الفحص جوه الـ SW (_checkAndNotify) بيعمل "تعويض" للمواعيد
   *    الفايتة بدل ما يعتمد إنه هيتنده بالظبط في الميعاد.
   */
  async function tryRegisterPeriodicSync(reg) {
    if (!('periodicSync' in reg)) {
      console.log('[RM] Periodic Background Sync مش مدعوم في المتصفح ده (متوقع في iOS/Safari)');
      return;
    }
    try {
      const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
      if (status.state === 'granted') {
        await reg.periodicSync.register('rm-prayer-check', {
          minInterval: 15 * 60 * 1000 // 15 دقيقة — طلب فقط، المتصفح بيقرر الفترة الفعلية
        });
        console.log('[RM] Periodic Background Sync مسجّل ✅ (الفترة الفعلية بيحددها المتصفح)');
      } else {
        console.log('[RM] Periodic Sync إذن غير ممنوح:', status.state, '— جرّب تفتح التطبيق أكتر وتثبّته عشان يزيد Site Engagement');
      }
    } catch (e) {
      console.log('[RM] Periodic Sync غير متاح:', e.message);
    }
  }

  /** إرسال جدول الصلاة والإعدادات للـ SW */
  async function sendScheduleToSW() {
    if (!state.currentTimes || !state.settings) return;

    const sw = await getSWController();
    if (!sw) return;

    sw.postMessage({
      type:     'PRAYER_SCHEDULE',
      times:    state.currentTimes,
      settings: state.settings.notifSettings
    });
    console.log('[RM] جدول الصلاة أُرسل للـ SW ✅');
  }

  /** إرسال تحديث الإعدادات فقط للـ SW */
  async function sendSettingsToSW() {
    if (!state.settings) return;

    const sw = await getSWController();
    if (!sw) return;

    sw.postMessage({
      type:     'SETTINGS_UPDATE',
      settings: state.settings.notifSettings
    });
  }

  /** الحصول على الـ SW Controller الحالي (ينتظر لو محتاج) */
  async function getSWController() {
    if (!('serviceWorker' in navigator)) return null;
    if (navigator.serviceWorker.controller) {
      return navigator.serviceWorker.controller;
    }
    /* انتظر حتى يتولى الـ SW السيطرة */
    try {
      await navigator.serviceWorker.ready;
      return navigator.serviceWorker.controller;
    } catch {
      return null;
    }
  }

  /** نبضات خفيفة جداً للـ SW عند بقاء التطبيق مرئياً — لتقليل استهلاك البطارية */
  function startSWHeartbeat() {
    if (state.swPingInterval) clearInterval(state.swPingInterval);
    state.swPingInterval = setInterval(async () => {
      if (document.visibilityState !== 'visible') return;
      const sw = await getSWController();
      if (sw) sw.postMessage({ type: 'SW_PING' });
    }, 5 * 60 * 1000); // كل 5 دقائق فقط
  }

  function _playEventFromPayload(payload = {}) {
    const prayerName = payload.prayerLabel || 'الصلاة القادمة';
    if (payload.rmEvent === 'pre') {
      playPreAzanSound(prayerName);
    } else if (payload.rmEvent === 'azan') {
      if (payload.prayerKey === 'duha') {
        showNotification('☀️ حان وقت صلاة الضحى', 'صلاة الضحى ركعتان أو أكثر - أجرها عظيم', '☀️');
        playNotifSound();
      } else {
        showNotification(`🕌 حان وقت ${prayerName}`, `بدأ الآن أذان ${prayerName}`, '🕌', { alarm: false }); // الأذان نفسه صوته كافي
        playAzan(!!payload.isFajr);
      }
    } else if (payload.rmEvent === 'post') {
      showNotification(`🤲 تذكير ${prayerName}`, `حان الآن التذكير بعد أذان ${prayerName}`, '🤲');
      playPostAzanSound();
    }
  }

  /**
   * handleLaunchFromURL — معالجة فتح التطبيق من الإشعار
   * تتحقق من وجود rm_event في URL وتفتح نافذة الأذان تلقائياً
   * يدعم: pre / azan / post
   */
  function handleLaunchFromURL() {
    try {
      const params = new URLSearchParams(window.location.search);
      const rmEvent = params.get('rm_event');
      if (!rmEvent) return;

      const prayerKey   = params.get('prayer') || '';
      const prayerLabel = params.get('label')   || '';
      const isFajr      = params.get('fajr') === '1';

      // النقر على الإشعار gesture → افتح القفل الصوتي مباشرة
      _audioUnlocked = true;

      if (rmEvent === 'azan') {
        if (prayerKey === 'duha') {
          showNotification('☀️ حان وقت صلاة الضحى', 'صلاة الضحى ركعتان أو أكثر - أجرها عظيم', '☀️');
          playNotifSound();
        } else {
          showAzanModal(isFajr);
          playAzan(isFajr);
          showNotification(`🕌 حان وقت ${prayerLabel}`, `بدأ الآن أذان ${prayerLabel}`, '🕌', { alarm: false }); // الأذان نفسه صوته كافي
        }
      } else if (rmEvent === 'pre') {
        showNotification(
          `⏰ اقترب وقت ${prayerLabel}`,
          `باقي قليل على أذان ${prayerLabel} — استعد للصلاة 🤲`,
          '🕌'
        );
        playPreAzanSound(prayerLabel);
      } else if (rmEvent === 'post') {
        showNotification(`🤲 تذكير ${prayerLabel}`, `حان الآن التذكير بعد أذان ${prayerLabel}`, '🤲');
        playPostAzanSound();
      }
    } catch (_) {}
  }

  /** معالجة رسائل الـ SW */
  function onSWMessage(event) {
    const msg = event.data;
    if (!msg) return;

    if (msg.type === 'SW_READY') {
      console.log('[RM] SW جاهز للعمل ✅', msg.version);
      showInAppToast('✅ التنبيهات', 'تم تفعيل التنبيهات ووضع الحارس الذكي', '🔔');
    }

    if (msg.type === 'SW_HEARTBEAT') {
      /* الـ SW لا يزال يعمل — لا شيء يلزم */
    }

    if (msg.type === 'SW_UPDATED') {
      console.log('[RM-Update] 🔄 تم تحديث الـ SW للإصدار', msg.version);
      showInAppToast('🔄 تم التحديث', 'تم تحديث التطبيق للإصدار الأحدث', '✅');
    }

    if (msg.type === 'UPDATE_AVAILABLE') {
      console.log('[RM-Update] 🚀 اكتشف الـ SW تحديث جديد!');
      _showUpdateBanner();
    }

    if (msg.type === 'notification_click' && msg.data) {
      // النقر على الإشعار gesture → افتح القفل الصوتي
      _audioUnlocked = true;
      _playEventFromPayload(msg.data);
    }
  }


  async function fetchPrayerTimes(lat, lng, method = 5) {
    try {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=${method}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        return parseTimings(data.data.timings, data.data.date);
      }
      return null;
    } catch (e) {
      console.error('Fetch prayer times error:', e);
      return null;
    }
  }

  function parseTimings(timings, dateInfo) {
    // الـ API بترجع الأوقات بالتوقيت المحلي للـ coordinates تلقائياً — لا يحتاج تحويل
    const sunrise = timings.Sunrise.substring(0, 5);
    const [sh, sm] = sunrise.split(':').map(Number);
    const duhaMin = sh * 60 + sm + 20;
    const duhaH   = Math.floor(duhaMin / 60) % 24;
    const duhaM   = duhaMin % 60;
    const duha    = `${String(duhaH).padStart(2,'0')}:${String(duhaM).padStart(2,'0')}`;

    return {
      fajr:    timings.Fajr.substring(0, 5),
      duha,
      dhuhr:   timings.Dhuhr.substring(0, 5),
      asr:     timings.Asr.substring(0, 5),
      maghrib: timings.Maghrib.substring(0, 5),
      isha:    timings.Isha.substring(0, 5),
      sunrise,
      date:    dateInfo
    };
  }

  /* ============================================================
     🕐 تحويل التوقيت إلى 12 ساعة
     ============================================================ */
  function to12Hour(time24) {
    if (!time24) return '--:--';
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'م' : 'ص';
    let hour12 = h % 12;
    if (hour12 === 0) hour12 = 12;
    return `${hour12}:${String(m).padStart(2,'0')} ${period}`;
  }

  function timeToMinutes(time24) {
    if (!time24) return 0;
    const [h, m] = time24.split(':').map(Number);
    return h * 60 + m;
  }

  /* ============================================================
     🧭 حساب اتجاه القبلة
     ============================================================ */
  function calculateQibla(lat, lng) {
    const lat1 = lat * Math.PI / 180;
    const lat2 = KAABA.lat * Math.PI / 180;
    const dLng = (KAABA.lng - lng) * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    
    return bearing;
  }

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /* ============================================================
     ⏰ صوت المنبه التنبيهي — صوت قوي يجذب الانتباه
     نمط: نبضات متصاعدة مكررة تشبه المنبه الرقمي
     ============================================================ */
  function playAlarmSound(repeatCount) {
    if (state.settings?.notifSettings?.alarmSoundEnabled === false) return;
    const repeats = repeatCount || state.settings?.notifSettings?.alarmRepeatCount || 3;
    const vol = (state.settings?.notifVolume ?? 0.8) * 0.55;

    _resumeAudioCtx().then(ctx => {
      if (!ctx) return;
      const T = ctx.currentTime;

      for (let r = 0; r < repeats; r++) {
        const base = T + r * 0.7; // كل جولة 0.7 ثانية

        // النبضة الأولى — تردد عالي حاد
        const osc1 = ctx.createOscillator();
        const g1   = ctx.createGain();
        osc1.type = 'square';
        osc1.frequency.setValueAtTime(880, base);
        osc1.frequency.linearRampToValueAtTime(1100, base + 0.08);
        g1.gain.setValueAtTime(vol, base);
        g1.gain.exponentialRampToValueAtTime(0.001, base + 0.15);
        osc1.connect(g1); g1.connect(ctx.destination);
        osc1.start(base); osc1.stop(base + 0.16);

        // النبضة الثانية — تردد أعلى
        const osc2 = ctx.createOscillator();
        const g2   = ctx.createGain();
        osc2.type = 'square';
        osc2.frequency.setValueAtTime(1100, base + 0.16);
        osc2.frequency.linearRampToValueAtTime(1320, base + 0.24);
        g2.gain.setValueAtTime(vol * 0.9, base + 0.16);
        g2.gain.exponentialRampToValueAtTime(0.001, base + 0.32);
        osc2.connect(g2); g2.connect(ctx.destination);
        osc2.start(base + 0.16); osc2.stop(base + 0.33);

        // النبضة الثالثة — الذروة
        const osc3 = ctx.createOscillator();
        const g3   = ctx.createGain();
        osc3.type = 'sawtooth';
        osc3.frequency.setValueAtTime(1320, base + 0.33);
        osc3.frequency.linearRampToValueAtTime(880, base + 0.50);
        g3.gain.setValueAtTime(vol, base + 0.33);
        g3.gain.exponentialRampToValueAtTime(0.001, base + 0.55);
        osc3.connect(g3); g3.connect(ctx.destination);
        osc3.start(base + 0.33); osc3.stop(base + 0.56);
      }
    }).catch(() => {});
  }

  /* ============================================================
     🔔 التنبيهات
     ============================================================ */
  async function requestNotifPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    
    const result = await Notification.requestPermission();
    const granted = result === 'granted';

    if (granted) {
      console.log('[RM] تم منح إذن الإشعارات — سيعمل النمط المحلي المتاح على هذا الجهاز');
    }

    return granted;
  }

  function showNotification(title, body, icon = '🕌', options = {}) {
    // إشعار داخل التطبيق
    showInAppToast(title, body, icon);

    // تشغيل صوت المنبه التنبيهي (ما لم يُطلب عدم تشغيله)
    if (options.alarm !== false && state.settings?.notifSettings?.alarmSoundEnabled !== false) {
      playAlarmSound();
    }

    // إشعار النظام
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body: body,
          icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">' + icon + '</text></svg>',
          badge: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">' + icon + '</text></svg>',
          vibrate: state.settings.notifSettings.vibrationEnabled ? [200, 100, 200] : [],
          tag: 'rafiq-muslim-' + Date.now(),
          requireInteraction: options.important ? true : false,
          silent: false,
          renotify: true
        });
        setTimeout(() => notif.close(), 10000);
      } catch (e) {}
    }

    // اهتزاز قوي للإشعارات المهمة
    if (state.settings.notifSettings.vibrationEnabled && navigator.vibrate) {
      const pattern = options.important
        ? [300, 100, 300, 100, 300, 200, 500] // اهتزاز قوي للصلاة
        : [200, 100, 200, 100, 200]; // اهتزاز عادي
      navigator.vibrate(pattern);
    }
  }

  function showInAppToast(title, body, icon) {
    let toast = document.createElement('div');
    toast.className = 'rm-toast';
    toast.innerHTML = `
      <div class="rm-toast-icon">${icon}</div>
      <div class="rm-toast-content">
        <div class="rm-toast-title">${title}</div>
        <div class="rm-toast-body">${body}</div>
      </div>
      <button class="rm-toast-close">×</button>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 50);
    
    const closeBtn = toast.querySelector('.rm-toast-close');
    closeBtn.onclick = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    };
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }
    }, 8000);
  }

  /* ============================================================
     🎵 تشغيل الأصوات
     ============================================================ */
  /**
   * جدولة تشغيل الإقامة تلقائياً بعد فاصل قصير من انتهاء الأذان
   * @param {number} extraDelayMs - مدة إضافية (مثلاً لتغطية مدة الأذان البرمجي الاحتياطي)
   */
  function _scheduleAutoIqama(extraDelayMs = 0) {
    if (state.settings?.notifSettings?.iqamaEnabled === false) return;
    if (_iqamaTimer) clearTimeout(_iqamaTimer);
    const delaySec = state.settings?.notifSettings?.iqamaDelaySeconds ?? 4;
    _iqamaAt = Date.now() + extraDelayMs + delaySec * 1000; // (v206) لقرار استكمال الأذكار
    _iqamaTimer = setTimeout(() => {
      _iqamaTimer = null;
      _iqamaAt = null;
      playIqama();
    }, extraDelayMs + delaySec * 1000);
  }

  async function playAzan(isFajr = false, autoIqama = true) {
    stopAzan();

    if (!state.settings.notifSettings.azanSoundEnabled) return;

    // (v206) أوقف مشغّل الأذكار الصوتي مؤقتاً طوال مدة الأذان — يُستكمل تلقائياً بعد انتهائه
    _pauseDhikrForSalah('azan');

    // لو الصوت مش مفعَّل بعد (لم يتفاعل المستخدم) — احفظ الطلب وأظهر رسالة
    if (!_audioUnlocked) {
      _pendingAzanPlay   = true;
      _pendingAzanIsFajr = isFajr;
      // محاولة تفعيل صامتة
      _unlockAudio();
      // أظهر نافذة الأذان المرئية دائماً
      showAzanModal(isFajr);
      // أظهر toast يطلب من المستخدم النقر للصوت
      showInAppToast(
        '🔊 انقر للصوت',
        'المتصفح يحتاج تفاعلاً منك — اضغط أي مكان لتسمع الأذان',
        '🕌'
      );
      return;
    }

    const key       = isFajr ? 'azanFajr' : 'azan';
    const remoteUrl = isFajr ? SOUNDS.azanFajr : SOUNDS.azan;

    // جلب من الكاش أو الشبكة
    const url = await _getAudioUrl(key, remoteUrl);

    if (url) {
      state.azanAudio = new Audio(url);
      state.azanAudio.volume = state.settings.notifVolume;
      if (autoIqama) {
        // عند انتهاء الأذان كاملاً — تُجدوَل الإقامة تلقائياً
        state.azanAudio.addEventListener('ended', () => _scheduleAutoIqama(0), { once: true });
      }
      // (v206) بعد انتهاء الأذان: استكمل الأذكار إلا لو الإقامة مزمعة خلال دقيقة
      state.azanAudio.addEventListener('ended', () => {
        setTimeout(_maybeResumeDhikrAfterAzan, 300);
      }, { once: true });
      try {
        await state.azanAudio.play();
      } catch (e) {
        console.warn('[RM] Azan HTML5 play blocked:', e.message);
        // fallback: صوت برمجي
        _playAzanFallback();
        if (autoIqama) _scheduleAutoIqama(6500); // تقريباً مدة الأذان البرمجي الاحتياطي
        setTimeout(_maybeResumeDhikrAfterAzan, 6900); // (v206) بعد انتهاء الأذان البرمجي
      }
    } else {
      console.warn('[RM] لا يوجد صوت أذان خارجي — استخدام الصوت البرمجي');
      _playAzanFallback();
      if (autoIqama) _scheduleAutoIqama(6500);
      setTimeout(_maybeResumeDhikrAfterAzan, 6900); // (v206) بعد انتهاء الأذان البرمجي
    }

    // عرض نافذة الأذان دائماً حتى بدون صوت
    showAzanModal(isFajr);
  }

  function stopAzan() {
    if (_iqamaTimer) { clearTimeout(_iqamaTimer); _iqamaTimer = null; }
    if (state.azanAudio) {
      try {
        state.azanAudio.pause();
        state.azanAudio.currentTime = 0;
      } catch (e) {}
      state.azanAudio = null;
    }
  }

  function playBeepSound(times = 1) {
    _resumeAudioCtx().then(ctx => {
      if (!ctx) return;
      for (let i = 0; i < times; i++) {
        setTimeout(() => {
          try {
            const oscillator = ctx.createOscillator();
            const gainNode   = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.frequency.value = 800;
            gainNode.gain.value        = (state.settings?.notifVolume ?? 0.8) * 0.3;
            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.3);
          } catch (e) {}
        }, i * 500);
      }
    }).catch(() => {});
  }

  /* ============================================================
     🔊 الأصوات الإسلامية — مقامات عربية أصيلة
     ============================================================ */

  /**
   * مساعد مشترك: بناء شبكة الصوت مع reverb وفلتر دفء
   * يستخدم الـ AudioContext المشترك العالمي
   */
  function _buildAudioGraph(ctx) {
    // فلتر دفء
    const filter = ctx.createBiquadFilter();
    filter.type            = 'lowpass';
    filter.frequency.value = 2200;
    filter.Q.value         = 0.9;

    // reverb بـ delay
    const delay  = ctx.createDelay(0.25);
    const dryGn  = ctx.createGain();
    const wetGn  = ctx.createGain();
    delay.delayTime.value = 0.18;
    dryGn.gain.value      = 1.0;
    wetGn.gain.value      = 0.22;
    delay.connect(wetGn);
    wetGn.connect(filter);
    dryGn.connect(filter);
    filter.connect(ctx.destination);

    return { dryGn, delay }; // يُوصَّل الـ osc بـ dryGn وبالـ delay
  }

  /**
   * تشغيل نغمة واحدة بأغلفة زمنية ناعمة
   */
  function _playNote(ctx, dest, delayNode, freq, startTime, dur, vol, type = 'sine') {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type            = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(dest);
    gain.connect(delayNode);

    const attack  = Math.min(0.04, dur * 0.15);
    const release = Math.min(0.12, dur * 0.35);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + attack);
    gain.gain.setValueAtTime(vol, startTime + dur - release);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur + 0.05);

    osc.start(startTime);
    osc.stop(startTime + dur + 0.08);
  }

  /**
   * صوت أذان برمجي — يُستخدم لو فشل تحميل ملف الأذان الخارجي
   * يعزف نمط "الله أكبر" بنغمات Web Audio API بمقام بياتي أصيل
   */
  async function _playAzanFallback() {
    try {
      const ctx = await _resumeAudioCtx();
      if (!ctx) { playBeepSound(3); return; }

      const vol = (state.settings?.notifVolume ?? 0.8) * 0.5;
      const { dryGn, delay } = _buildAudioGraph(ctx);
      const T = ctx.currentTime;

      // نمط "الله أكبر الله أكبر" — مقام بياتي D
      // D4=293.66  F4=349.23  G4=392.00  A4=440.00  C5=523.25
      const ALLAHU_AKBAR = [
        // الله أكبر (دورة 1)
        [293.66, T+0.00, 0.30, vol,       'triangle'], // D4  الـ
        [349.23, T+0.28, 0.25, vol,       'sine'    ], // F4  لا
        [392.00, T+0.52, 0.40, vol,       'triangle'], // G4  هُ (ذروة)
        [349.23, T+0.90, 0.20, vol*0.85, 'sine'    ], // F4  أَكـ
        [293.66, T+1.10, 0.50, vol,       'triangle'], // D4  بَر

        // الله أكبر (دورة 2)
        [293.66, T+1.80, 0.28, vol,       'triangle'],
        [349.23, T+2.06, 0.23, vol,       'sine'    ],
        [392.00, T+2.28, 0.38, vol,       'triangle'],
        [349.23, T+2.64, 0.18, vol*0.85, 'sine'    ],
        [293.66, T+2.82, 0.55, vol,       'triangle'],

        // أشهد أن لا إله إلا الله — خط لحني نازل
        [440.00, T+3.60, 0.30, vol*0.9,  'sine'    ], // A4
        [392.00, T+3.88, 0.25, vol*0.9,  'sine'    ], // G4
        [349.23, T+4.12, 0.22, vol*0.85, 'sine'    ], // F4
        [293.66, T+4.34, 0.60, vol,       'triangle'], // D4 استقرار

        // رنين ختامي
        [587.33, T+5.10, 0.50, vol*0.25, 'sine'    ], // D5
        [293.66, T+5.20, 0.60, vol*0.35, 'triangle']  // D4
      ];

      ALLAHU_AKBAR.forEach(([f, t, d, v, type]) =>
        _playNote(ctx, dryGn, delay, f, t, d, v, type)
      );
    } catch (e) {
      playBeepSound(3); // آخر fallback: 3 beeps
    }
  }

  /* ============================================================
     🗣️ نطق جمل متتابعة عبر SpeechSynthesis
     (يُستخدم كاحتياط عند تعذّر الصوت الحقيقي — للأذان وللإقامة)
     ============================================================ */
  /**
   * @param {string[]} phrases - الجمل المطلوب نطقها بالترتيب
   * @param {number[]} rates  - سرعة كل جملة (اختياري)
   * @param {Object}   opts   - { onDone }
   * @returns {boolean} true لو تم جدولة النطق فعلياً، false لو SpeechSynthesis غير متاح
   */
  function _speakChained(phrases, rates = [], opts = {}) {
    if (!('speechSynthesis' in window) || !phrases || !phrases.length) return false;
    try {
      window.speechSynthesis.cancel(); // إلغاء أي نطق سابق معلّق

      const pickArabicVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        return voices.find(v => /^ar/i.test(v.lang)) || null;
      };

      let arVoice = pickArabicVoice();
      let i = 0;

      const speakNext = () => {
        if (i >= phrases.length) {
          if (typeof opts.onDone === 'function') opts.onDone();
          return;
        }
        const utter = new SpeechSynthesisUtterance(phrases[i]);
        utter.lang    = 'ar-SA';
        if (arVoice) utter.voice = arVoice;
        utter.rate    = rates[i] ?? 0.85;
        utter.pitch   = 1;
        utter.volume  = state.settings?.notifVolume ?? 0.9;
        utter.onend   = () => { i++; speakNext(); };
        utter.onerror = () => { i++; speakNext(); };
        window.speechSynthesis.speak(utter);
      };

      // بعض المتصفحات (Chrome) تحمّل قائمة الأصوات بشكل غير متزامن
      if (!arVoice) {
        window.speechSynthesis.onvoiceschanged = () => { arVoice = pickArabicVoice(); };
      }

      speakNext();
      return true;
    } catch (e) {
      console.warn('[RM] _speakChained error:', e);
      return false;
    }
  }

  /**
   * نغمة الإقامة البرمجية — احتياط أخير لو SpeechSynthesis غير متاح إطلاقاً
   * نفس مقام الأذان (بياتي) لكن بإيقاع أسرع يميّز جملة "قد قامت الصلاة"
   */
  async function _playIqamaFallbackTone() {
    try {
      const ctx = await _resumeAudioCtx();
      if (!ctx) { playBeepSound(2); return; }

      const vol = (state.settings?.notifVolume ?? 0.8) * 0.5;
      const { dryGn, delay } = _buildAudioGraph(ctx);
      const T = ctx.currentTime;

      const IQAMA_PATTERN = [
        // الله أكبر، الله أكبر
        [293.66, T+0.00, 0.26, vol,      'triangle'],
        [392.00, T+0.30, 0.30, vol,      'triangle'],
        [293.66, T+0.66, 0.26, vol*0.9,  'triangle'],
        [392.00, T+0.96, 0.30, vol*0.9,  'triangle'],

        // قد قامت الصلاة (سريعة) × 2 — الجملة المميزة للإقامة
        [440.00, T+1.55, 0.18, vol,      'sine'    ],
        [392.00, T+1.74, 0.16, vol,      'sine'    ],
        [349.23, T+1.91, 0.16, vol,      'sine'    ],
        [293.66, T+2.10, 0.34, vol,      'triangle'],

        [440.00, T+2.60, 0.16, vol*0.9,  'sine'    ],
        [392.00, T+2.78, 0.15, vol*0.9,  'sine'    ],
        [349.23, T+2.94, 0.15, vol*0.9,  'sine'    ],
        [293.66, T+3.12, 0.40, vol*0.9,  'triangle'],

        // رنين ختامي
        [587.33, T+3.80, 0.45, vol*0.25, 'sine'    ],
        [293.66, T+3.90, 0.55, vol*0.35, 'triangle']
      ];

      IQAMA_PATTERN.forEach(([f, t, d, v, type]) =>
        _playNote(ctx, dryGn, delay, f, t, d, v, type)
      );
    } catch (e) {
      playBeepSound(2);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     🕌 1. قبل الأذان — إشعار نصي فقط، بدون أي صوت أذان
     الأذان الكامل يعمل فقط عند دخول وقت الصلاة
     ─────────────────────────────────────────────────────────── */
  function playPreAzanSound(prayerName = 'الصلاة القادمة') {
    const soundType = state.settings?.notifSettings?.preAzanSoundType ?? 'beep3';
    if (soundType === 'beep') {
      playBeepSound(2);
    } else if (soundType === 'beep3') {
      playBeepSound(3);
    } else if (soundType === 'beep4') {
      playBeepSound(4);
    }
    // soundType === 'none' => لا يوجد صوت - إشعار نصي فقط
    showInAppToast(`⏰ اقترب وقت ${prayerName}`, `باقي قليل على أذان ${prayerName} — استعد للصلاة 🤲`, '🕌');
  }

  /* ─────────────────────────────────────────────────────────────
     🤲 بعد الأذان — صوت ناصر القطامي يقول "حي على الصلاة"
     يستخرج مقطع "حي على الصلاة" من ملف الأذان الكامل
     عبر تحديد currentTime والإيقاف بعد 23 ثانية
     ─────────────────────────────────────────────────────────── */
  async function playPostAzanSound() {
    // أوقف أي أذان شغّال حالياً
    stopAzan();

    // (v206) أوقف مشغّل الأذكار مؤقتاً طوال مقطع «حي على الصلاة» (~45 ثا) — يُستكمل بعده
    _pauseDhikrForSalah('post');
    setTimeout(() => _resumeDhikrForSalah('post'),
      (HAYYA_ALA_SALAH_END_SEC + 22 - HAYYA_ALA_SALAH_START_SEC) * 1000 + 1500);

    // جلب ملف الأذان من الكاش أو الشبكة
    const url = await _getAudioUrl('azan', SOUNDS.azan);

    if (!url) {
      console.warn('[RM] لا يوجد ملف أذان متاح — fallback إلى SpeechSynthesis');
      _speakChained(
        ['حي على الصلاة', 'حي على الصلاة', 'حي على الفلاح', 'حي على الفلاح'],
        [1.18, 1.13, 1.06, 1.01]
      );
      setTimeout(() => _resumeDhikrForSalah('post'), 12000); // (v206) النطق البرمجي أقصر — استكمال أسرع
      return;
    }

    try {
      const audio = new Audio(url);
      audio.volume   = state.settings?.notifVolume ?? 0.9;
      audio.preload  = 'auto';
      state.azanAudio = audio;

      // عند جاهزية الملف — اقفز إلى مقطع "حي على الصلاة"
      const onReady = () => {
        try {
          audio.currentTime = HAYYA_ALA_SALAH_START_SEC;
          audio.play().catch(e => {
            console.warn('[RM] playPostAzanSound blocked:', e.message);
            _speakChained(
              ['حي على الصلاة', 'حي على الصلاة', 'حي على الفلاح', 'حي على الفلاح'],
              [1.18, 1.13, 1.06, 1.01]
            );
          });
        } catch (e) {
          console.warn('[RM] currentTime seek failed:', e);
        }
      };

      // مراقبة الوقت — أوقف عند نهاية "حي على الفلاح"
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= HAYYA_ALA_SALAH_END_SEC + 22) {
          // (88 + 22 = 110) يغطي "حي على الصلاة" × 2 و "حي على الفلاح" × 2
          try { audio.pause(); audio.currentTime = 0; } catch (e) {}
        }
      });

      if (audio.readyState >= 2) {
        onReady();
      } else {
        audio.addEventListener('loadedmetadata', onReady, { once: true });
        audio.addEventListener('canplay',         onReady, { once: true });
      }
    } catch (e) {
      console.warn('[RM] playPostAzanSound error:', e);
      _speakChained(
        ['حي على الصلاة', 'حي على الصلاة', 'حي على الفلاح', 'حي على الفلاح'],
        [1.18, 1.13, 1.06, 1.01]
      );
    }
  }

  /* ─────────────────────────────────────────────────────────────
     📿 3.5 صوت سبحان الله — يُشغَّل مع تنبيهات الأذكار
     يحاول تشغيل assets/audio/subhanallah.mp3 ثم يرجع للصوت البرمجي
     ─────────────────────────────────────────────────────────── */
  function playTasbeehSound() {
    const audioPath = 'assets/audio/subhanallah.mp3';
    const vol = state.settings?.notifVolume ?? 0.8;
    const audio = new Audio(audioPath);
    audio.volume = vol;
    audio.play().catch(() => {
      // الملف غير موجود — استخدم صوت الأذكار البرمجي
      playNotifSound();
    });
  }

  /* ─────────────────────────────────────────────────────────────
     📿 3. تنبيه الأذكار العامة — مقام حجاز (روحاني خاشع)
     ─────────────────────────────────────────────────────────── */
  async function playNotifSound() {
    try {
      const ctx = await _resumeAudioCtx();
      if (!ctx) { playBeepSound(1); return; }

      const vol = (state.settings?.notifVolume ?? 0.8) * 0.38;
      const { dryGn, delay } = _buildAudioGraph(ctx);
      const T = ctx.currentTime;

      /*
       * مقام حجاز / ري:
       *  D4=293.66  Eb4=311.13  F#4=369.99  G4=392.00
       *  Ab4=415.30 Bb4=466.16  C5=523.25   D5=587.33
       */
      const THIKR = [
        [293.66, T+0.00, 0.28, vol,       'triangle'], // D4
        [311.13, T+0.24, 0.16, vol*0.8,  'sine'    ], // Eb4 (نغمة حجاز المميزة)
        [369.99, T+0.42, 0.26, vol,       'sine'    ], // F#4
        [392.00, T+0.70, 0.30, vol,       'triangle'], // G4
        [415.30, T+1.00, 0.35, vol,       'triangle'], // Ab4 (ذروة)
        [392.00, T+1.35, 0.22, vol*0.85, 'sine'    ], // G4  نزول
        [369.99, T+1.55, 0.18, vol*0.75, 'sine'    ], // F#4
        [311.13, T+1.73, 0.16, vol*0.65, 'sine'    ], // Eb4
        [293.66, T+1.90, 0.55, vol,       'triangle'], // D4  استقرار

        // رنين صدى
        [587.33, T+2.20, 0.45, vol*0.20, 'sine'    ], // D5
        [293.66, T+2.30, 0.40, vol*0.30, 'triangle']  // D4
      ];

      THIKR.forEach(([f, t, d, v, type]) =>
        _playNote(ctx, dryGn, delay, f, t, d, v, type)
      );

    } catch (e) { playBeepSound(1); }
  }

  /* ============================================================
     🕌 نافذة الأذان
     ============================================================ */
  function showAzanModal(isFajr = false) {
    const existing = document.getElementById('rm-azan-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'rm-azan-modal';
    modal.className = 'rm-azan-modal';
    modal.innerHTML = `
      <div class="rm-azan-content">
        <div class="rm-azan-mosque">🕌</div>
        <h2 class="rm-azan-title">حان الآن وقت الصلاة</h2>
        <div style="color:#94a3b8;font-size:13px;margin-top:-6px;margin-bottom:12px">🎙️ بصوت الشيخ ناصر القطامي</div>
        <div class="rm-azan-text">
          ${isFajr ? 'الصَّلاةُ خَيْرٌ مِنَ النَّوْم' : ''}<br>
          اللهُ أَكْبَر، اللهُ أَكْبَر<br>
          أَشْهَدُ أَنْ لا إِلَهَ إِلا الله<br>
          أَشْهَدُ أَنَّ مُحَمَّداً رَسُولُ الله<br>
          حَيَّ عَلَى الصَّلاة<br>
          حَيَّ عَلَى الفَلاح
        </div>
        <button class="rm-azan-stop" onclick="window.RafiqMuslim.stopAzan()">إيقاف الأذان</button>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  function closeAzanModal(resumeDhikr = true) {
    stopAzan();
    // (v206) إيقاف الأذان يدوياً (زر الإيقاف) → استكمل الأذكار الموقوفة لأجله فوراً
    if (resumeDhikr) _resumeDhikrForSalah('azan');
    const modal = document.getElementById('rm-azan-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     📢 الإقامة — تُشغَّل تلقائياً بعد انتهاء الأذان كاملاً
     ============================================================ */
  function _iqamaPhrases() { return IQAMA_TEXT_LINES.map(l => l.ar); }
  function _iqamaRates()   { return IQAMA_TEXT_LINES.map(l => l.rate); }

  async function playIqama() {
    if (_iqamaTimer) { clearTimeout(_iqamaTimer); _iqamaTimer = null; }
    if (state.settings?.notifSettings?.iqamaEnabled === false) return;
    if (!state.settings?.notifSettings?.azanSoundEnabled) return;

    // (v206) أوقف مشغّل الأذكار مؤقتاً طوال الإقامة — يُستكمل تلقائياً بعد انتهائها
    _pauseDhikrForSalah('iqama');
    closeAzanModal(false); // إغلاق نافذة الأذان قبل عرض نافذة الإقامة (الإقامة الآن — بلا استكلال)
    showIqamaModal();

    // ── صوت المنبه التنبيهي بدل النطق الصوتي للإقامة ──
    // نكرر المنبه بنفس عدد التكرارات المضبوط في إعدادات المنبه
    const repeats = state.settings?.notifSettings?.alarmRepeatCount || 3;
    playAlarmSound(repeats);

    // إغلاق نافذة الإقامة تلقائياً بعد انتهاء المنبه
    // كل جولة منبه ≈ 0.7 ثانية + هامش ≈ 1.5 ثانية لكل جولة
    const closeMs = Math.max(4000, repeats * 1500);
    _iqamaTimer = setTimeout(closeIqamaModal, closeMs);
  }

  function showIqamaModal() {
    const existing = document.getElementById('rm-iqama-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'rm-iqama-modal';
    modal.className = 'rm-azan-modal show rm-iqama-modal';
    modal.innerHTML = `
      <div class="rm-azan-content rm-iqama-content">
        <div class="rm-azan-mosque">📢</div>
        <h2 class="rm-azan-title rm-iqama-title">قَدْ قَامَتِ الصَّلاة</h2>
        <div class="rm-azan-text">
          اللهُ أَكْبَر، اللهُ أَكْبَر<br>
          أَشْهَدُ أَنْ لا إِلَهَ إِلا الله<br>
          أَشْهَدُ أَنَّ مُحَمَّداً رَسُولُ الله<br>
          حَيَّ عَلَى الصَّلاة، حَيَّ عَلَى الفَلاح<br>
          قَدْ قَامَتِ الصَّلاة، قَدْ قَامَتِ الصَّلاة
        </div>
        <button class="rm-azan-stop rm-iqama-stop" onclick="window.RafiqMuslim.closeIqamaModal()">🤲 بدء الصلاة</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function closeIqamaModal() {
    if (_iqamaTimer) { clearTimeout(_iqamaTimer); _iqamaTimer = null; }
    _iqamaAt = null;
    // (v206) انتهت الإقامة — استكمل الأذكار الموقوفة لأجلها من نفس النقطة
    _resumeDhikrForSalah('iqama');
    const modal = document.getElementById('rm-iqama-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }


  /* ============================================================
     🛡️ الحارس الذكي للصلاة — دقة أعلى أثناء فتح التطبيق
     يعمل محلياً فقط وباستهلاك منخفض لأنه يُفعّل نفسه قرب الصلاة القادمة فقط
     ============================================================ */
  function _getPrayerListForScheduling() {
    return [
      { key: 'fajr', name: 'الفجر', icon: '🌅', isFajr: true },
      { key: 'duha', name: 'الضحى', icon: '☀️', isFajr: false },
      { key: 'dhuhr', name: 'الظهر', icon: '🌞', isFajr: false },
      { key: 'asr', name: 'العصر', icon: '🌇', isFajr: false },
      { key: 'maghrib', name: 'المغرب', icon: '🌆', isFajr: false },
      { key: 'isha', name: 'العشاء', icon: '🌙', isFajr: false }
    ];
  }

  function _dateFromTimeStr(timeStr) {
    const [h, m] = String(timeStr || '00:00').split(':').map(Number);
    const d = new Date();
    d.setHours(h || 0, m || 0, 0, 0);
    return d;
  }

  function _clearSmartGuardianTimers() {
    if (state.smartGuardTimer) clearTimeout(state.smartGuardTimer);
    if (state.smartGuardReleaseTimer) clearTimeout(state.smartGuardReleaseTimer);
    if (state.smartGuardClockInterval) clearInterval(state.smartGuardClockInterval);
    state.smartGuardTimer = null;
    state.smartGuardReleaseTimer = null;
    state.smartGuardClockInterval = null;
    (state.smartGuardExactTimers || []).forEach(t => clearTimeout(t));
    state.smartGuardExactTimers = [];
  }

  function _updateSmartGuardianOverlay(nextPrayer) {
    const box = document.getElementById('rm-smart-guardian');
    if (!box) return;
    const clock = box.querySelector('[data-role="clock"]');
    const subtitle = box.querySelector('[data-role="subtitle"]');
    if (clock) {
      clock.textContent = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    }
    if (subtitle && nextPrayer?.name) {
      subtitle.textContent = `الحارس الذكي يعمل حتى يمر ${nextPrayer.name} وتذكير ما بعد الأذان`;
    }
  }

  function _showSmartGuardianOverlay(nextPrayer) {
    if (!state.settings?.notifSettings?.guardianDimModeEnabled) return;
    let box = document.getElementById('rm-smart-guardian');
    if (!box) {
      box = document.createElement('div');
      box.id = 'rm-smart-guardian';
      box.style.cssText = `
        position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.92);
        color:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;
        gap:12px;font-family:Tajawal,sans-serif;text-align:center;
      `;
      box.innerHTML = `
        <div style="font-size:17px;font-weight:800;color:#fbbf24">🛡️ وضع الحارس الذكي</div>
        <div data-role="clock" style="font-size:42px;font-weight:900;letter-spacing:1px"></div>
        <div data-role="subtitle" style="font-size:14px;color:#cbd5e1;max-width:290px;line-height:1.8"></div>
        <button style="margin-top:8px;padding:10px 18px;border-radius:999px;border:1px solid rgba(251,191,36,0.45);background:rgba(251,191,36,0.08);color:#fbbf24;font-weight:800;cursor:pointer" onclick="window.RafiqMuslim.disableSmartPrayerGuardian()">إيقاف الحارس</button>
      `;
      document.body.appendChild(box);
    }
    box.style.display = 'flex';
    _updateSmartGuardianOverlay(nextPrayer);
    if (state.smartGuardClockInterval) clearInterval(state.smartGuardClockInterval);
    state.smartGuardClockInterval = setInterval(() => { if (!document.hidden) _updateSmartGuardianOverlay(nextPrayer); }, 30000);
  }

  function _hideSmartGuardianOverlay() {
    const box = document.getElementById('rm-smart-guardian');
    if (box) box.style.display = 'none';
    if (state.smartGuardClockInterval) clearInterval(state.smartGuardClockInterval);
    state.smartGuardClockInterval = null;
  }

  async function _requestSmartGuardianWakeLock() {
    if (!('wakeLock' in navigator)) return false;
    // محاولة تشغيل Wake Lock حتى لو الصفحة في الخلفية
    try {
      state.wakeLockSentinel = await navigator.wakeLock.request('screen');
      state.wakeLockSentinel.addEventListener('release', () => {
        state.wakeLockSentinel = null;
        // إعادة المحاولة بعد ثانية (المتصفح قد يحرره مؤقتاً)
        if (state.smartGuardActive) {
          setTimeout(() => _requestSmartGuardianWakeLock(), 1000);
        }
      }, { once: true });
      return true;
    } catch (e) {
      console.warn('[RM] تعذّر تفعيل Wake Lock:', e.message);
      return false;
    }
  }

  async function releaseSmartPrayerGuardian() {
    _clearSmartGuardianTimers();
    _hideSmartGuardianOverlay();
    state.smartGuardActive = false;
    state.lastGuardianPrayerKey = null;
    if (state.wakeLockSentinel) {
      try { await state.wakeLockSentinel.release(); } catch (_) {}
      state.wakeLockSentinel = null;
    }
  }

  function disableSmartPrayerGuardian() {
    state.settings.notifSettings.smartGuardianEnabled = false;
    saveData(STORAGE_KEYS.notifSettings, state.settings.notifSettings);
    releaseSmartPrayerGuardian();
    showInAppToast('🛑 الحارس الذكي', 'تم إيقاف وضع الحارس الذكي', '🛡️');
  }

  function _triggerExactPrayerEvent(kind, prayer, preMinutes, postMinutes) {
    if (!prayer) return;
    const key = `${kind}-${prayer.key}`;
    if (state.notifiedPrayers.has(key)) return;
    state.notifiedPrayers.add(key);

    if (kind === 'pre') {
      showNotification(`${prayer.icon} اقترب وقت ${prayer.name}`, `باقي ${preMinutes} دقيقة على أذان ${prayer.name} — استعد للصلاة 🤲`, prayer.icon, { important: true });
      playPreAzanSound(prayer.name);
      return;
    }

    if (kind === 'azan') {
      if (prayer.key === 'duha') {
        showNotification('☀️ حان وقت صلاة الضحى', 'صلاة الضحى ركعتان أو أكثر - أجرها عظيم', '☀️', { important: true });
        playNotifSound();
      } else {
        showNotification(`${prayer.icon} حان وقت ${prayer.name}`, `بدأ الآن أذان ${prayer.name}`, prayer.icon, { important: true, alarm: false });
        playAzan(prayer.isFajr);
      }
      return;
    }

    if (kind === 'post' && prayer.key !== 'duha') {
      showNotification(`${prayer.icon} تذكير: ${prayer.name}`, `مرّت ${postMinutes} دقيقة على أذان ${prayer.name} - هل صلّيت؟ 🤲`, prayer.icon, { important: true });
      playPostAzanSound();
    }
  }

  function _scheduleExactForegroundPrayerWindow(prayer) {
    if (!prayer || !state.currentTimes?.[prayer.key]) return;
    const now = new Date();
    const preMinutes = state.settings?.notifSettings?.preAzanMinutes || 15;
    const postMinutes = state.settings?.notifSettings?.postAzanMinutes || 15;
    const azanAt = _dateFromTimeStr(state.currentTimes[prayer.key]);
    const preAt = new Date(azanAt.getTime() - preMinutes * 60_000);
    const postAt = new Date(azanAt.getTime() + postMinutes * 60_000);
    const endAt = new Date(postAt.getTime() + 5 * 60_000);

    const scheduleOne = (when, fn) => {
      const ms = when.getTime() - Date.now();
      if (ms <= 0 || ms > 12 * 60 * 60 * 1000) return;
      state.smartGuardExactTimers.push(setTimeout(fn, ms));
    };

    if (prayer.key !== 'duha' && preAt > now) {
      scheduleOne(preAt, () => _triggerExactPrayerEvent('pre', prayer, preMinutes, postMinutes));
    }
    if (azanAt > now) {
      scheduleOne(azanAt, () => _triggerExactPrayerEvent('azan', prayer, preMinutes, postMinutes));
    }
    if (postAt > now && prayer.key !== 'duha' && state.settings?.notifSettings?.postAzanEnabled) {
      scheduleOne(postAt, () => _triggerExactPrayerEvent('post', prayer, preMinutes, postMinutes));
    }

    const releaseMs = Math.max(30_000, endAt.getTime() - Date.now());
    state.smartGuardReleaseTimer = setTimeout(() => {
      releaseSmartPrayerGuardian();
      armSmartPrayerGuardian('next-after-release');
    }, releaseMs);
  }

  async function _activateSmartPrayerGuardian(prayer) {
    if (!state.settings?.notifSettings?.smartGuardianEnabled) return;
    if (document.visibilityState !== 'visible') return;
    state.smartGuardActive = true;
    state.lastGuardianPrayerKey = prayer.key;
    await _requestSmartGuardianWakeLock();
    _showSmartGuardianOverlay(prayer);
    _scheduleExactForegroundPrayerWindow(prayer);
  }

  function _findNextPrayerForGuardian() {
    if (!state.currentTimes) return null;
    const now = Date.now();
    const prayers = _getPrayerListForScheduling();
    let next = null;
    for (const prayer of prayers) {
      const timeStr = state.currentTimes[prayer.key];
      if (!timeStr) continue;
      const azanAt = _dateFromTimeStr(timeStr);
      const endAt = new Date(azanAt.getTime() + ((state.settings?.notifSettings?.postAzanMinutes || 15) + 5) * 60_000);
      if (endAt.getTime() <= now) continue;
      next = { ...prayer, azanAt };
      break;
    }
    return next;
  }

  function armSmartPrayerGuardian(reason = 'auto') {
    _clearSmartGuardianTimers();
    if (!state.settings?.notifSettings?.smartGuardianEnabled || !state.currentTimes) return;
    const next = _findNextPrayerForGuardian();
    if (!next) return;

    const leadMinutes = state.settings?.notifSettings?.guardianLeadMinutes || 20;
    const startAt = new Date(next.azanAt.getTime() - leadMinutes * 60_000);
    const now = Date.now();

    if (now >= startAt.getTime() && now <= next.azanAt.getTime() + ((state.settings?.notifSettings?.postAzanMinutes || 15) + 5) * 60_000) {
      _activateSmartPrayerGuardian(next);
      return;
    }

    const delay = Math.max(15_000, startAt.getTime() - now);
    state.smartGuardTimer = setTimeout(() => _activateSmartPrayerGuardian(next), delay);
    console.log('[RM] Smart Guardian armed:', reason, next.name, 'in', Math.round(delay / 60000), 'min');
  }

  /* ============================================================
     ⏰ فحص الأوقات والتنبيهات
     ============================================================ */
  function checkPrayerTimes() {
    if (!state.currentTimes) return;
    
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const today = now.toDateString();
    
    // إعادة تعيين الإشعارات في يوم جديد
    const lastCheck = loadData(STORAGE_KEYS.lastCheck, '');
    if (lastCheck !== today) {
      state.notifiedPrayers.clear();
      state.notifiedAthkar.clear();
      saveData(STORAGE_KEYS.lastCheck, today);
      saveData(STORAGE_KEYS.completedToday, {});
    }
    
    const prayers = [
      { key: 'fajr', name: 'الفجر', icon: '🌅', isFajr: true },
      { key: 'duha', name: 'الضحى', icon: '☀️', isFajr: false },
      { key: 'dhuhr', name: 'الظهر', icon: '🌞', isFajr: false },
      { key: 'asr', name: 'العصر', icon: '🌇', isFajr: false },
      { key: 'maghrib', name: 'المغرب', icon: '🌆', isFajr: false },
      { key: 'isha', name: 'العشاء', icon: '🌙', isFajr: false }
    ];
    
    const preMinutes = state.settings.notifSettings.preAzanMinutes;
    
    prayers.forEach(prayer => {
      const time = state.currentTimes[prayer.key];
      if (!time) return;
      
      const prayerMinutes = timeToMinutes(time);
      const preKey  = `pre-${prayer.key}`;
      const azanKey = `azan-${prayer.key}`;
      
      // ─── تنبيه قبل الأذان — إشعار نصي فقط بدون أذان ───
      const preTarget = prayerMinutes - preMinutes;
      if (preMinutes > 0
          && currentMinutes >= preTarget && currentMinutes <= preTarget + 2
          && !state.notifiedPrayers.has(preKey)) {
        state.notifiedPrayers.add(preKey);
        if (prayer.key !== 'duha') {
          showNotification(
            `${prayer.icon} اقترب وقت ${prayer.name}`,
            `باقي ${preMinutes} دقيقة على أذان ${prayer.name} — استعد للصلاة 🤲`,
            prayer.icon
          );
          playPreAzanSound(prayer.name);
        }
      }
      
      // ─── الأذان (نافذة 0–2 دقيقة بعد الوقت) ───
      if (currentMinutes >= prayerMinutes && currentMinutes <= prayerMinutes + 2
          && !state.notifiedPrayers.has(azanKey)) {
        state.notifiedPrayers.add(azanKey);
        
        if (prayer.key === 'duha') {
          showNotification(
            '☀️ حان وقت صلاة الضحى',
            'صلاة الضحى ركعتان أو أكثر - أجرها عظيم',
            '☀️',
            { important: true }
          );
          playNotifSound();
        } else if (state.settings.notifSettings.azanEnabled) {
          showNotification(
            `${prayer.icon} حان وقت ${prayer.name}`,
            prayer.isFajr ? `بدأ الآن أذان ${prayer.name} — الصلاة خير من النوم 🕌` : `بدأ الآن أذان ${prayer.name} 🕌`,
            prayer.icon,
            { important: true, alarm: false } // الأذان نفسه صوته كافي
          );
          playAzan(prayer.isFajr);
        }
      }
      
      // ─── تنبيه بعد الأذان ───
      if (state.settings.notifSettings.postAzanEnabled && prayer.key !== 'duha') {
        const postMin = state.settings.notifSettings.postAzanMinutes || 15;
        const postKey = `post-${prayer.key}`;
        const postTarget = prayerMinutes + postMin;
        if (currentMinutes >= postTarget && currentMinutes <= postTarget + 2
            && !state.notifiedPrayers.has(postKey)) {
          state.notifiedPrayers.add(postKey);
          showNotification(
            `${prayer.icon} تذكير: ${prayer.name}`,
            `مرّت ${postMin} دقيقة على أذان ${prayer.name} - هل صلّيت؟ 🤲`,
            prayer.icon,
            { important: true }
          );
          playPostAzanSound();
        }
      }
    });
    
    // فحص أوقات الأذكار
    checkAthkarTimes(currentMinutes);
    
    // فحص الأذكار والصلوات الفائتة في نهاية اليوم
    if (now.getHours() === state.settings.notifSettings.missedCheckHour && now.getMinutes() === 0) {
      checkMissedTasks();
    }
  }

  function checkAthkarTimes(currentMinutes) {
    if (!state.settings.notifSettings.missedReminderEnabled) return;
    
    const athkar = [
      { key: 'morning', name: 'أذكار الصباح', icon: '🌅', time: state.settings.notifSettings.morningAthkarTime },
      { key: 'evening', name: 'أذكار المساء', icon: '🌙', time: state.settings.notifSettings.eveningAthkarTime },
      { key: 'sleep', name: 'أذكار النوم', icon: '😴', time: state.settings.notifSettings.sleepAthkarTime },
      { key: 'quran', name: 'قراءة القرآن', icon: '📖', time: state.settings.notifSettings.quranReminderTime }
    ];
    
    athkar.forEach(item => {
      if (!item.time) return;
      const itemMinutes = timeToMinutes(item.time);
      const notifKey = `athkar-${item.key}`;
      
      // نافذة ±2 دقيقة
      if (currentMinutes >= itemMinutes && currentMinutes <= itemMinutes + 2
          && !state.notifiedAthkar.has(notifKey)) {
        state.notifiedAthkar.add(notifKey);
        showNotification(
          `${item.icon} موعد ${item.name}`,
          `حان وقت قراءة ${item.name} - لا تفوّت الأجر العظيم`,
          item.icon,
          { important: true }
        );
        playTasbeehSound();
      }
    });
  }

  function checkMissedTasks() {
    const completed = loadData(STORAGE_KEYS.completedToday, {});
    const missed = [];
    
    if (!completed.morning) missed.push('أذكار الصباح');
    if (!completed.evening) missed.push('أذكار المساء');
    if (!completed.sleep) missed.push('أذكار النوم');
    if (!completed.quran) missed.push('قراءة القرآن');
    if (!completed.fajr) missed.push('صلاة الفجر');
    if (!completed.dhuhr) missed.push('صلاة الظهر');
    if (!completed.asr) missed.push('صلاة العصر');
    if (!completed.maghrib) missed.push('صلاة المغرب');
    if (!completed.isha) missed.push('صلاة العشاء');
    
    if (missed.length > 0) {
      showNotification(
        '⚠️ تذكير بالعبادات الفائتة',
        `لم تكمل اليوم: ${missed.join('، ')}`,
        '⚠️'
      );
    }
  }

  /* ============================================================
     🧭 البوصلة - تحديد القبلة
     ============================================================ */
  let _compassStartedAt = 0;
  let _usingAbsolute = false;
  let _absoluteSeen = false;
  let _compassAttached = false;

  async function startCompass() {
    _compassStartedAt = Date.now();
    _usingAbsolute = false;
    _absoluteSeen = false;
    detachCompassListener();

    if (!window.DeviceOrientationEvent) {
      const status = document.getElementById('qibla-status');
      if (status) status.textContent = '⚠️ هذا الجهاز لا يدعم مستشعر اتجاه الهاتف';
      return;
    }

    // طلب إذن المغناطيسية أيضاً؛ بدونها قد تكون قراءة alpha نسبية.
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      let response = 'denied';
      try {
        response = await DeviceOrientationEvent.requestPermission(true);
      } catch (firstError) {
        try { response = await DeviceOrientationEvent.requestPermission(); }
        catch (secondError) { response = 'denied'; }
      }
      if (response !== 'granted') {
        const status = document.getElementById('qibla-status');
        if (status) status.textContent = '⚠️ اسمح بالوصول للبوصلة من إعدادات المتصفح لتحديد القبلة';
        return;
      }
    }

    attachCompassListener();
    const status = document.getElementById('qibla-status');
    if (status) status.textContent = '⏳ حرّك الهاتف ببطء على شكل رقم 8 لمعايرة البوصلة...';
  }

  function attachCompassListener() {
    detachCompassListener();
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
    _compassAttached = true;
  }

  function detachCompassListener() {
    window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    window.removeEventListener('deviceorientation', handleOrientation, true);
    _compassAttached = false;
  }

  function _screenOrientationAngle() {
    const raw = Number(window.screen?.orientation?.angle ?? window.orientation ?? 0);
    return Number.isFinite(raw) ? ((raw % 360) + 360) % 360 : 0;
  }

  function handleOrientation(event) {
    // لو البوصلة مقفولة — اتجاهل كل الـ readings نهائياً
    if (_compassLocked) return;

    const isAbsolute = event.type === 'deviceorientationabsolute' || event.absolute === true;
    if (isAbsolute) {
      _usingAbsolute = true;
      _absoluteSeen = true;
    } else if (_usingAbsolute) {
      // لا نخلط القراءة النسبية مع القراءة المطلقة بعد توفرها.
      return;
    }

    let heading;
    if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null && Number.isFinite(Number(event.webkitCompassHeading))) {
      // iOS Safari: heading مخصص للبوصلة بالنسبة للشمال المغناطيسي.
      heading = Number(event.webkitCompassHeading);
    } else if (event.alpha !== null && Number.isFinite(Number(event.alpha))) {
      // alpha عكس اتجاه عقارب الساعة من الشمال.
      // لا نعتمد القراءة النسبية في أول لحظة حتى تصل قراءة مطلقة إن كانت مدعومة.
      if (!isAbsolute && !_absoluteSeen && Date.now() - _compassStartedAt < 1200) return;
      heading = 360 - Number(event.alpha) + _screenOrientationAngle();
    } else {
      return;
    }
    heading = (heading + 360) % 360;

    // Noise gate: تجاهل الاهتزاز الصغير (أقل من 0.5°)
    if (_rawHeading !== null) {
      const microDiff = ((heading - _rawHeading + 540) % 360) - 180;
      if (Math.abs(microDiff) < 0.5) return;
    }
    _rawHeading = heading;
    state.currentHeading = heading;
    updateCompassUI();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // متغيرات البوصلة
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  let _smoothHeading = null;  // الـ heading المنعّم
  let _rawHeading    = null;  // آخر raw reading
  let _rafId         = null;  // animation frame id
  let _compassLocked = false; // قفل البوصلة — لما تنور خضر
  let _lockFrames    = 0;     // عداد فريمات داخل نطاق القبلة

  function smoothAngle(current, target, factor) {
    let diff = ((target - current + 540) % 360) - 180;
    return current + diff * factor;
  }

  // ━━━ إعادة تحديد القبلة: فتح القفل والبدء من جديد ━━━
  function resetQiblaLock() {
    _compassLocked  = false;
    _lockFrames     = 0;
    _smoothHeading  = null;
    _rawHeading     = null;
    _usingAbsolute  = false;

    const ptr    = document.getElementById('qibla-pointer-wrap');
    const rose   = document.getElementById('qibla-rose');
    const status = document.getElementById('qibla-status');
    const wrap   = document.getElementById('rm-compass-wrap');
    const btn    = document.getElementById('qibla-reset-btn');

    if (ptr)  { ptr.style.transition  = ''; }
    if (rose) { rose.style.transition = ''; }
    if (wrap)   wrap.classList.remove('qibla-locked-glow');
    if (status) {
      status.textContent = '⏳ جاري قراءة البوصلة...';
      status.className   = 'qibla-status';
      delete status.dataset.vibrated;
    }
    if (btn) btn.style.display = 'none';
  }

  function updateCompassUI() {
    const rose   = document.getElementById('qibla-rose');
    const ptr    = document.getElementById('qibla-pointer-wrap');
    const status = document.getElementById('qibla-status');
    if (!rose || !ptr) return;

    // Heavy Smoothing 0.07
    if (_smoothHeading === null) _smoothHeading = state.currentHeading;
    _smoothHeading = smoothAngle(_smoothHeading, state.currentHeading, 0.07);

    const roseAngle    = -_smoothHeading;
    const pointerAngle = state.targetQibla - _smoothHeading;

    rose.style.transform = `rotate(${roseAngle}deg)`;
    ptr.style.transform  = `rotate(${pointerAngle}deg)`;

    const diff         = ((state.targetQibla - _smoothHeading + 360) % 360);
    const adjustedDiff = diff > 180 ? diff - 360 : diff;

    if (status) {
      if (Math.abs(adjustedDiff) < 5) {
        _lockFrames++;
        if (_lockFrames >= 6 && !_compassLocked) {
          // ━━━ HARD LOCK ━━━
          _compassLocked = true;

          ptr.style.transition  = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
          rose.style.transition = 'transform 0.4s ease';
          ptr.style.transform   = 'rotate(0deg)';
          rose.style.transform  = `rotate(${-state.targetQibla}deg)`;

          const wrap = document.getElementById('rm-compass-wrap');
          if (wrap) wrap.classList.add('qibla-locked-glow');

          const btn = document.getElementById('qibla-reset-btn');
          if (btn) btn.style.display = 'flex';

          if (navigator.vibrate) navigator.vibrate([200, 80, 200, 80, 300]);
        }

        status.textContent = '✅ أنت تواجه القبلة — الله أكبر!';
        status.className   = 'qibla-status correct';
        if (!status.dataset.vibrated) {
          status.dataset.vibrated = '1';
        }
      } else {
        _lockFrames = 0;
        const dir = adjustedDiff > 0 ? '← أدر يساراً' : 'أدر يميناً →';
        status.textContent = `${dir}  ${Math.abs(Math.round(adjustedDiff))}°`;
        status.className   = 'qibla-status';
        delete status.dataset.vibrated;
      }
    }

    if (!_compassLocked) {
      const remaining = Math.abs(((state.currentHeading - _smoothHeading + 540) % 360) - 180);
      if (remaining > 0.05) {
        if (_rafId) cancelAnimationFrame(_rafId);
        _rafId = requestAnimationFrame(updateCompassUI);
      }
    }
  }

  /* ============================================================
     🎨 إضافة الأنماط CSS
     ============================================================ */
  function injectStyles() {
    if (document.getElementById('rm-pq-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'rm-pq-styles';
    style.textContent = `
      /* ====== Overlay عام للصفحات ====== */
      .rm-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(135deg, #050b14 0%, #0f172a 50%, #1e293b 100%);
        z-index: 9999;
        overflow-y: auto;
        display: none;
        animation: rmFadeIn 0.4s ease;
        direction: rtl;
      }
      .rm-overlay.show { display: block; }
      
      @keyframes rmFadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      
      .rm-overlay::before {
        content: '';
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: 
          radial-gradient(2px 2px at 20% 30%, rgba(251,191,36,0.4), transparent),
          radial-gradient(2px 2px at 60% 70%, rgba(16,185,129,0.3), transparent),
          radial-gradient(1px 1px at 50% 50%, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 80% 10%, rgba(251,191,36,0.3), transparent),
          radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.4), transparent);
        background-size: 200% 200%;
        animation: rmStars 60s linear infinite;
        pointer-events: none;
        z-index: 0;
      }
      
      @keyframes rmStars {
        from { background-position: 0% 0%; }
        to { background-position: 200% 200%; }
      }
      
      .rm-container {
        max-width: 650px;
        margin: 0 auto;
        padding: 20px 16px 60px;
        position: relative;
        z-index: 1;
      }
      
      /* ====== رأس الصفحة ====== */
      .rm-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(251,191,36,0.2);
        border-radius: 20px;
        margin-bottom: 20px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      }
      
      .rm-header h1 {
        color: #fbbf24;
        font-size: 22px;
        font-weight: 800;
        margin: 0;
        text-shadow: 0 0 20px rgba(251,191,36,0.5);
      }
      
      .rm-back-btn {
        background: linear-gradient(135deg, #b45309, #fbbf24);
        color: #050b14;
        border: none;
        padding: 10px 16px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        font-family: inherit;
      }
      .rm-back-btn:hover { transform: scale(1.05); }
      
      /* ====== بطاقة الموقع ====== */
      .rm-location-card {
        background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(251,191,36,0.1));
        backdrop-filter: blur(10px);
        border: 1px solid rgba(16,185,129,0.3);
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .rm-location-card::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: radial-gradient(circle, rgba(251,191,36,0.1), transparent 70%);
        animation: rmRotate 20s linear infinite;
      }
      
      @keyframes rmRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .rm-location-icon {
        font-size: 36px;
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
      }
      
      .rm-location-text {
        color: #f8fafc;
        font-size: 18px;
        font-weight: 700;
        margin: 4px 0;
        position: relative;
        z-index: 1;
      }
      
      .rm-location-sub {
        color: #94a3b8;
        font-size: 13px;
        position: relative;
        z-index: 1;
      }
      
      /* ====== بطاقة الصلاة ====== */
      .rm-prayer-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 20px;
      }
      
      .rm-prayer-card {
        background: rgba(30, 41, 59, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(251,191,36,0.2);
        border-radius: 18px;
        padding: 18px 12px;
        text-align: center;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
      }
      
      .rm-prayer-card.next {
        background: linear-gradient(135deg, rgba(251,191,36,0.2), rgba(16,185,129,0.15));
        border-color: #fbbf24;
        box-shadow: 0 0 30px rgba(251,191,36,0.3);
        animation: rmGlow 2s ease-in-out infinite;
      }
      
      @keyframes rmGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.3); }
        50% { box-shadow: 0 0 40px rgba(251,191,36,0.6); }
      }
      
      .rm-prayer-name {
        color: #fbbf24;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 4px;
      }
      
      .rm-prayer-time {
        color: #f8fafc;
        font-size: 18px;
        font-weight: 800;
        direction: ltr;
      }
      
      .rm-prayer-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        background: #10b981;
        color: white;
        font-size: 10px;
        padding: 3px 8px;
        border-radius: 10px;
        font-weight: 700;
      }
      
      /* ====== العد التنازلي ====== */
      .rm-countdown {
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border: 2px solid #fbbf24;
        border-radius: 24px;
        padding: 24px;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        overflow: hidden;
      }
      
      .rm-countdown::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(251,191,36,0.2), transparent);
        animation: rmShine 3s linear infinite;
      }
      
      @keyframes rmShine {
        from { left: -100%; }
        to { left: 100%; }
      }
      
      .rm-countdown-label {
        color: #94a3b8;
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .rm-countdown-prayer {
        color: #fbbf24;
        font-size: 26px;
        font-weight: 800;
        margin-bottom: 12px;
        text-shadow: 0 0 20px rgba(251,191,36,0.5);
      }
      
      .rm-countdown-time {
        color: #10b981;
        font-size: 36px;
        font-weight: 900;
        direction: ltr;
        font-family: 'Tajawal', monospace;
        letter-spacing: 2px;
      }
      
      /* ====== أزرار الإعدادات ====== */
      .rm-buttons-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 16px;
      }
      
      .rm-btn {
        background: rgba(30, 41, 59, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(251,191,36,0.3);
        color: #f8fafc;
        padding: 14px;
        border-radius: 14px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .rm-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(251,191,36,0.3); }
      .rm-btn:active { transform: scale(0.98); }
      
      .rm-btn-primary {
        background: linear-gradient(135deg, #b45309, #fbbf24);
        color: #050b14;
        border: none;
      }
      
      .rm-btn-success {
        background: linear-gradient(135deg, #047857, #10b981);
        color: white;
        border: none;
      }
      
      .rm-btn-full { grid-column: span 2; }
      
      /* ====== المودال ====== */
      .rm-modal {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(8px);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .rm-modal.show {
        display: flex;
        animation: rmFadeIn 0.3s ease;
      }
      
      .rm-modal-content {
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border: 1px solid rgba(251,191,36,0.3);
        border-radius: 24px;
        padding: 24px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
      }
      
      .rm-modal-title {
        color: #fbbf24;
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 16px;
        text-align: center;
      }
      
      .rm-modal-close {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.5);
        color: #ef4444;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        font-weight: 700;
      }
      
      /* ====== Form Elements ====== */
      .rm-form-group {
        margin-bottom: 14px;
      }
      
      .rm-label {
        display: block;
        color: #fbbf24;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 6px;
      }
      
      .rm-input, .rm-select {
        width: 100%;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(251,191,36,0.3);
        color: #f8fafc;
        padding: 10px 14px;
        border-radius: 12px;
        font-size: 15px;
        font-family: inherit;
        outline: none;
        transition: all 0.3s;
      }
      .rm-input:focus, .rm-select:focus {
        border-color: #fbbf24;
        box-shadow: 0 0 0 3px rgba(251,191,36,0.2);
      }
      
      .rm-select option {
        background: #0f172a;
        color: #f8fafc;
      }
      
      /* ====== Switch ====== */
      .rm-switch-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: rgba(15, 23, 42, 0.5);
        border-radius: 12px;
        margin-bottom: 8px;
      }
      
      .rm-switch-label {
        color: #f8fafc;
        font-size: 14px;
        font-weight: 600;
      }
      
      .rm-switch {
        position: relative;
        width: 50px;
        height: 28px;
        background: #334155;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
        padding: 0;
      }
      
      .rm-switch::after {
        content: '';
        position: absolute;
        top: 3px;
        right: 3px;
        width: 22px;
        height: 22px;
        background: white;
        border-radius: 50%;
        transition: all 0.3s;
      }
      
      .rm-switch.active {
        background: #10b981;
      }
      
      .rm-switch.active::after {
        right: 25px;
      }
      
      /* ====== Toast ====== */
      .rm-toast {
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        max-width: 400px;
        margin: 0 auto;
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border: 1px solid #fbbf24;
        border-radius: 16px;
        padding: 14px;
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        transform: translateY(-150%);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .rm-toast.show { transform: translateY(0); }
      
      .rm-toast-icon {
        font-size: 32px;
        flex-shrink: 0;
      }
      
      .rm-toast-content { flex: 1; }
      
      .rm-toast-title {
        color: #fbbf24;
        font-weight: 800;
        font-size: 15px;
        margin-bottom: 4px;
      }
      
      .rm-toast-body {
        color: #f8fafc;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .rm-toast-close {
        background: rgba(239,68,68,0.2);
        border: none;
        color: #ef4444;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        font-weight: 700;
      }
      
      /* ====== Azan Modal ====== */
      .rm-azan-modal {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle at center, rgba(251,191,36,0.15), rgba(0,0,0,0.95));
        backdrop-filter: blur(10px);
        z-index: 10002;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .rm-azan-modal.show {
        display: flex;
        animation: rmFadeIn 0.5s ease;
      }
      
      .rm-azan-content {
        background: linear-gradient(135deg, #1e293b, #050b14);
        border: 2px solid #fbbf24;
        border-radius: 28px;
        padding: 30px;
        max-width: 450px;
        width: 100%;
        text-align: center;
        position: relative;
        box-shadow: 0 0 80px rgba(251,191,36,0.5);
      }
      
      .rm-azan-mosque {
        font-size: 48px;
        animation: rmBounce 3s ease-in-out infinite;
        opacity: 0.85;
      }
      
      @keyframes rmBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      
      .rm-azan-title {
        color: #fbbf24;
        font-size: 26px;
        font-weight: 800;
        margin: 16px 0;
        text-shadow: 0 0 20px rgba(251,191,36,0.6);
      }
      
      .rm-azan-text {
        color: #f8fafc;
        font-size: 18px;
        line-height: 2;
        margin: 20px 0;
        font-family: 'Amiri', serif;
      }
      
      .rm-azan-stop {
        background: linear-gradient(135deg, #b45309, #fbbf24);
        color: #050b14;
        border: none;
        padding: 14px 32px;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;
        font-family: inherit;
        margin-top: 10px;
      }

      /* ====== Iqama Modal — نفس آلية نافذة الأذان بلون مميّز (زمردي) ====== */
      .rm-iqama-modal {
        background: radial-gradient(circle at center, rgba(16,185,129,0.18), rgba(0,0,0,0.95));
      }
      .rm-iqama-content {
        border-color: #10b981;
        box-shadow: 0 0 80px rgba(16,185,129,0.45);
      }
      .rm-iqama-title {
        color: #34d399;
        text-shadow: 0 0 20px rgba(16,185,129,0.55);
      }
      .rm-iqama-stop {
        background: linear-gradient(135deg, #059669, #34d399);
      }
      
      /* ====== Qibla Compass — Premium Design ====== */
      .rm-compass-container {
        background: radial-gradient(ellipse at top, rgba(15,23,42,0.95) 0%, rgba(5,11,20,0.98) 100%);
        border: 1px solid rgba(251,191,36,0.2);
        border-radius: 28px;
        padding: 28px 20px 22px;
        margin-bottom: 16px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      .rm-compass-container::before {
        content: '';
        position: absolute;
        top: -60px; left: 50%;
        transform: translateX(-50%);
        width: 260px; height: 260px;
        background: radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%);
        pointer-events: none;
      }

      /* حلقة المسافة */
      .rm-compass-wrap {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto 18px;
      }

      /* الظل الخارجي */
      .rm-compass-wrap::before {
        content: '';
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        background: conic-gradient(from 0deg,
          rgba(251,191,36,0.6), rgba(16,185,129,0.4),
          rgba(251,191,36,0.6), rgba(16,185,129,0.4),
          rgba(251,191,36,0.6));
        filter: blur(8px);
        opacity: 0.5;
        animation: rmCompassGlow 4s linear infinite;
      }
      @keyframes rmCompassGlow {
        from { filter: blur(8px) brightness(1); }
        50%  { filter: blur(12px) brightness(1.4); }
        to   { filter: blur(8px) brightness(1); }
      }

      /* الحلقة الخارجية الذهبية */
      .rm-compass-ring-outer {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: linear-gradient(145deg, #2a1a02, #0f172a, #1a0e00);
        border: 3px solid transparent;
        background-clip: padding-box;
        box-shadow:
          0 0 0 3px #7c3a00,
          0 0 0 5px #fbbf24,
          0 0 0 7px #7c3a00,
          inset 0 2px 4px rgba(251,191,36,0.3),
          0 20px 60px rgba(0,0,0,0.8);
      }

      /* الوجه الداخلي */
      .rm-compass-face {
        position: absolute;
        inset: 14px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 35% 35%, rgba(40,30,10,0.9) 0%, rgba(8,14,26,0.97) 60%, rgba(5,8,18,1) 100%);
        box-shadow:
          inset 0 4px 12px rgba(0,0,0,0.9),
          inset 0 -2px 6px rgba(251,191,36,0.08);
        overflow: hidden;
      }
      .rm-compass-face::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background:
          repeating-conic-gradient(from 0deg,
            rgba(251,191,36,0.04) 0deg 1deg,
            transparent 1deg 6deg);
      }

      /* SVG البوصلة (يدور مع الجهاز) */
      #qibla-rose {
        position: absolute;
        inset: 0;
        width: 100%; height: 100%;
        transform-origin: center center;
        transition: transform 0.15s linear;
      }

      /* سهم القبلة (ثابت، يدور وحده) */
      #qibla-pointer-wrap {
        position: absolute;
        inset: 0;
        transform-origin: center center;
        transition: transform 0.15s linear;
      }

      /* نقطة المركز */
      .rm-compass-jewel {
        position: absolute;
        top: 50%; left: 50%;
        width: 18px; height: 18px;
        background: radial-gradient(circle at 35% 35%, #fff7e0, #fbbf24 50%, #92400e);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 12px rgba(251,191,36,0.9), 0 0 4px #fff;
        z-index: 10;
      }

      /* حالة القبلة */
      .qibla-status {
        font-size: 16px;
        font-weight: 800;
        padding: 12px 16px;
        border-radius: 16px;
        background: rgba(239,68,68,0.12);
        border: 1px solid rgba(239,68,68,0.35);
        color: #fca5a5;
        margin-top: 4px;
        letter-spacing: 0.3px;
        transition: all 0.5s ease;
      }
      /* حلقة خضرا لما البوصلة تتقفل */
      .qibla-locked-glow {
        box-shadow: 0 0 0 3px rgba(52,211,153,0.6),
                    0 0 24px rgba(52,211,153,0.4),
                    0 0 48px rgba(52,211,153,0.2) !important;
        transition: box-shadow 0.5s ease !important;
      }
      .qibla-locked-glow .rm-compass-ring-outer {
        border-color: rgba(52,211,153,0.7) !important;
        box-shadow: 0 0 16px rgba(52,211,153,0.5) !important;
      }

      .qibla-status.correct {
        background: rgba(16,185,129,0.15);
        border-color: rgba(16,185,129,0.6);
        color: #34d399;
        box-shadow: 0 0 20px rgba(16,185,129,0.2);
        animation: rmPulseGreen 1.8s ease-in-out infinite;
      }
      @keyframes rmPulseGreen {
        0%,100% { box-shadow: 0 0 10px rgba(16,185,129,0.2); }
        50%      { box-shadow: 0 0 28px rgba(16,185,129,0.5); }
      }

      /* قراءة الزاوية */
      .rm-qibla-degree-badge {
        display: inline-block;
        background: linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));
        border: 1px solid rgba(251,191,36,0.4);
        color: #fbbf24;
        font-size: 13px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        margin-bottom: 14px;
        letter-spacing: 0.5px;
      }

      .rm-qibla-info {
        background: rgba(15,23,42,0.6);
        border: 1px solid rgba(255,255,255,0.06);
        padding: 14px;
        border-radius: 14px;
        margin-top: 12px;
        color: #94a3b8;
        font-size: 13px;
        line-height: 1.9;
      }
      .rm-qibla-info strong { color: #fbbf24; font-size: 14px; }
      
      /* ====== Time Picker Row ====== */
      .rm-time-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        align-items: center;
        padding: 10px;
        background: rgba(15, 23, 42, 0.5);
        border-radius: 12px;
        margin-bottom: 8px;
      }
      
      .rm-time-name {
        color: #fbbf24;
        font-weight: 700;
        font-size: 15px;
      }
      
      .rm-time-input {
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(251,191,36,0.3);
        color: #f8fafc;
        padding: 8px;
        border-radius: 10px;
        font-size: 14px;
        font-family: inherit;
        text-align: center;
        direction: ltr;
      }

      /* ====== Custom Time Picker (بدون native popup) ====== */
      .rm-tp-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        direction: ltr;
      }
      .rm-tp-select {
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(251,191,36,0.4);
        color: #fbbf24;
        padding: 6px 4px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: 700;
        font-family: inherit;
        text-align: center;
        width: 58px;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
      }
      .rm-tp-select:focus {
        border-color: rgba(251,191,36,0.9);
        box-shadow: 0 0 0 2px rgba(251,191,36,0.2);
      }
      .rm-tp-sep {
        color: #fbbf24;
        font-size: 20px;
        font-weight: 900;
        line-height: 1;
        margin: 0 1px;
        user-select: none;
      }
      .rm-tp-ampm {
        background: rgba(251,191,36,0.15);
        border: 1px solid rgba(251,191,36,0.5);
        color: #fbbf24;
        padding: 6px 4px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 800;
        font-family: inherit;
        text-align: center;
        width: 52px;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        margin-right: 4px;
      }
      .rm-tp-ampm:focus {
        border-color: rgba(251,191,36,0.9);
        box-shadow: 0 0 0 2px rgba(251,191,36,0.2);
      }
      
      /* ====== Section Title ====== */
      .rm-section-title {
        color: #fbbf24;
        font-size: 18px;
        font-weight: 800;
        margin: 20px 0 12px;
        text-align: center;
        position: relative;
        padding: 8px;
      }
      
      .rm-section-title::before,
      .rm-section-title::after {
        content: '✦';
        margin: 0 10px;
        color: rgba(251,191,36,0.5);
      }
      
      /* ====== Quick info ====== */
      .rm-info-card {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 12px;
        padding: 12px;
        margin-bottom: 12px;
        color: #6ee7b7;
        font-size: 13px;
        line-height: 1.6;
      }
      
      /* ====== مسؤول الزر العائم ======
         ⚠️ مهم: في RTL layout، inset-inline-start بيتحول لـ right!
         فلازم نستخدم left/right صراحةً مع !important عشان نضمن اليسار */
      #rm-fab-prayer {
        position: fixed;
        bottom: 20px;
        left: 20px !important;
        right: auto !important;
        top: auto !important;
        z-index: 998;
        background: linear-gradient(135deg, #b45309, #fbbf24);
        color: #050b14;
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(251,191,36,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: rmGlow 2s ease-in-out infinite;
      }
      
      /* ====== Hide Sunrise text in original UI ====== */
      .rm-pq-hide-sunrise { display: none !important; }

      /* ══════ Counter Buttons (＋ / －) ══════ */
      .rm-counter-btn {
        background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05));
        border: 1.5px solid rgba(251,191,36,0.5);
        color: #fbbf24;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        font-size: 18px;
        font-weight: 900;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .rm-counter-btn:hover {
        background: linear-gradient(135deg, rgba(251,191,36,0.3), rgba(251,191,36,0.1));
        transform: scale(1.1);
        box-shadow: 0 0 12px rgba(251,191,36,0.3);
      }
      .rm-counter-btn:active { transform: scale(0.95); }
      .rm-counter-input {
        flex: 1;
        text-align: center;
        font-size: 20px !important;
        font-weight: 800 !important;
        color: #fbbf24 !important;
        padding: 10px 8px !important;
      }

      /* ══════ Volume Card ══════ */
      .rm-volume-card {
        background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(5,11,20,0.95));
        border: 1px solid rgba(251,191,36,0.25);
        border-radius: 20px;
        padding: 20px 16px 16px;
        margin-bottom: 16px;
      }
      .rm-volume-display {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 14px;
      }
      .rm-volume-icon {
        font-size: 32px;
        transition: all 0.3s;
        filter: drop-shadow(0 0 8px rgba(251,191,36,0.5));
      }
      .rm-volume-number {
        font-size: 42px;
        font-weight: 900;
        color: #fbbf24;
        font-family: 'Tajawal', monospace;
        text-shadow: 0 0 20px rgba(251,191,36,0.6);
        min-width: 80px;
        text-align: center;
        letter-spacing: -1px;
        transition: all 0.2s;
      }
      .rm-volume-track-wrap {
        position: relative;
        height: 8px;
        background: rgba(51,65,85,0.8);
        border-radius: 999px;
        margin-bottom: 8px;
        overflow: visible;
      }
      .rm-volume-fill {
        position: absolute;
        top: 0; left: 0;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, #059669, #10b981, #34d399);
        box-shadow: 0 0 10px rgba(16,185,129,0.6);
        pointer-events: none;
        transition: width 0.1s;
      }
      .rm-volume-slider {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 32px;
        transform: translateY(-50%);
        opacity: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
        z-index: 2;
      }
      .rm-volume-labels {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #64748b;
        margin-bottom: 12px;
        padding: 0 2px;
      }
      .rm-vol-preset {
        background: rgba(15,23,42,0.8);
        border: 1px solid rgba(251,191,36,0.3);
        color: #94a3b8;
        padding: 6px 12px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        font-family: inherit;
        transition: all 0.2s;
      }
      .rm-vol-preset:hover {
        border-color: #fbbf24;
        color: #fbbf24;
        background: rgba(251,191,36,0.1);
        transform: translateY(-1px);
      }

      /* ══════ Save Button Pulse ══════ */
      .rm-save-pulse {
        animation: rmSavePulse 2.5s ease-in-out infinite;
        font-size: 16px !important;
        padding: 16px !important;
        letter-spacing: 0.5px;
      }
      @keyframes rmSavePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
        50%       { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
      }

      /* ====== 🌑 Always-On Display — شاشة الحارس الذكي المكثّف ====== */
      .rm-aod-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #000000;
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        direction: rtl;
        font-family: 'Amiri', 'Tajawal', serif;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
      }
      .rm-aod-overlay.show { display: flex; animation: rmAODIn 0.6s ease; }
      @keyframes rmAODIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .rm-aod-overlay::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 50% 35%, rgba(251,191,36,0.06) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.04) 0%, transparent 60%);
        pointer-events: none;
      }
      .rm-aod-clock {
        font-family: 'Amiri', serif;
        font-size: clamp(4.5rem, 18vw, 9rem);
        font-weight: 700;
        line-height: 1;
        background: linear-gradient(135deg, #fbbf24 0%, #fcd34d 50%, #fbbf24 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 30px rgba(251,191,36,0.15);
        letter-spacing: 2px;
        margin-bottom: 8px;
        z-index: 2;
      }
      .rm-aod-period {
        font-size: clamp(1.2rem, 4vw, 1.8rem);
        color: rgba(251,191,36,0.6);
        font-family: 'Tajawal', sans-serif;
        font-weight: 500;
        margin-bottom: 30px;
        z-index: 2;
      }
      .rm-aod-divider {
        width: 60%;
        max-width: 280px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent);
        margin: 0 auto 30px;
        z-index: 2;
      }
      .rm-aod-next-label {
        font-size: clamp(0.9rem, 3vw, 1.1rem);
        color: rgba(248,250,252,0.4);
        font-family: 'Tajawal', sans-serif;
        font-weight: 400;
        margin-bottom: 8px;
        letter-spacing: 1px;
        z-index: 2;
      }
      .rm-aod-next-name {
        font-size: clamp(2rem, 7vw, 3.2rem);
        font-weight: 700;
        background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #10b981 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 14px;
        z-index: 2;
      }
      .rm-aod-countdown {
        font-size: clamp(2.2rem, 9vw, 4rem);
        font-family: 'Amiri', serif;
        font-weight: 700;
        color: rgba(248,250,252,0.85);
        letter-spacing: 4px;
        font-variant-numeric: tabular-nums;
        margin-bottom: 8px;
        z-index: 2;
      }
      .rm-aod-countdown-label {
        font-size: 0.85rem;
        color: rgba(248,250,252,0.35);
        font-family: 'Tajawal', sans-serif;
        letter-spacing: 2px;
        margin-bottom: 40px;
        z-index: 2;
      }
      .rm-aod-footer {
        position: absolute;
        bottom: 24px;
        left: 0; right: 0;
        text-align: center;
        font-size: 0.8rem;
        color: rgba(248,250,252,0.3);
        font-family: 'Tajawal', sans-serif;
        z-index: 2;
      }
      .rm-aod-footer .rm-aod-loc {
        color: rgba(251,191,36,0.5);
        margin-bottom: 4px;
      }
      .rm-aod-hint {
        position: absolute;
        top: 20px;
        right: 0; left: 0;
        text-align: center;
        font-size: 0.75rem;
        color: rgba(248,250,252,0.25);
        font-family: 'Tajawal', sans-serif;
        letter-spacing: 1px;
        z-index: 2;
      }
      .rm-aod-breathe {
        position: absolute;
        top: 50%; left: 50%;
        width: 280px; height: 280px;
        border-radius: 50%;
        border: 1px solid rgba(251,191,36,0.08);
        transform: translate(-50%, -50%);
        animation: rmAODBreathe 4s ease-in-out infinite;
        pointer-events: none;
        z-index: 1;
      }
      .rm-aod-breathe::after {
        content: '';
        position: absolute;
        inset: -40px;
        border-radius: 50%;
        border: 1px solid rgba(16,185,129,0.06);
      }
      @keyframes rmAODBreathe {
        0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.7; }
        50%      { transform: translate(-50%, -50%) scale(1.15); opacity: 0.3; }
      }
      @media (prefers-color-scheme: dark) {
        .rm-aod-overlay { background: #000; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ============================================================
     🖼️ بناء الواجهة - شاشة مواقيت الصلاة
     ============================================================ */
  function buildPrayerTimesUI() {
    let overlay = document.getElementById('rm-prayer-overlay');
    if (overlay) {
      overlay.remove();
    }
    
    overlay = document.createElement('div');
    overlay.id = 'rm-prayer-overlay';
    overlay.className = 'rm-overlay';
    overlay.innerHTML = `
      <div class="rm-container">
        <div class="rm-header">
          <h1>🕌 مواقيت الصلاة</h1>
          <button class="rm-back-btn" onclick="window.RafiqMuslim.closePrayerTimes()">إغلاق ✕</button>
        </div>
        
        <div class="rm-location-card">
          <div class="rm-location-icon">📍</div>
          <div class="rm-location-text" id="rm-loc-text">${state.settings.location.city}، ${state.settings.location.country}</div>
          <div class="rm-location-sub">طريقة الحساب: ${getMethodName(state.settings.method)}</div>
        </div>
        
        <div class="rm-countdown" id="rm-countdown">
          <div class="rm-countdown-label">الصلاة القادمة</div>
          <div class="rm-countdown-prayer" id="rm-next-prayer">--</div>
          <div class="rm-countdown-time" id="rm-countdown-time">00:00:00</div>
        </div>
        
        <div class="rm-prayer-grid" id="rm-prayer-grid">
          <!-- يتم ملؤها ديناميكياً -->
        </div>
        
        <div class="rm-buttons-row">
          <button class="rm-btn" onclick="window.RafiqMuslim.openLocationModal()">📍 تغيير الموقع</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.openManualModal()">✏️ تعديل يدوي</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.openQiblaModal()">🧭 القبلة</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.openNotifModal()">🔔 التنبيهات</button>
          <button class="rm-btn rm-btn-full" onclick="window.RafiqMuslim.openAthkarTimesModal()">⏰ تخصيص أوقات الأذكار</button>
          <button class="rm-btn rm-btn-full" style="background:linear-gradient(135deg,rgba(0,0,0,0.95),rgba(15,23,42,0.9));color:#fbbf24;border:1px solid rgba(251,191,36,0.5);font-weight:800" onclick="window.RafiqMuslim.openAOD()">🌑 وضع العرض الدائم</button>
          <button class="rm-btn rm-btn-success rm-btn-full" onclick="window.RafiqMuslim.refreshPrayerTimes()">🔄 تحديث المواقيت</button>
          <button id="rm-install-app-btn" class="rm-btn rm-btn-full" style="display:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none" onclick="window.RafiqMuslim.promptInstallApp()">📲 تثبيت التطبيق على جهازك</button>
        </div>
        
        <div class="rm-info-card">
          ℹ️ <strong>ملاحظة:</strong> الأذان سيُشغل تلقائياً في وقت كل صلاة. يمكنك التحكم في جميع التنبيهات من الإعدادات.
          <br>🌅 <strong>الضحى:</strong> يبدأ بعد الشروق بـ 20 دقيقة (وقت ارتفاع الشمس).
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    updatePrayerGrid();
    startCountdown();
  }

  function getMethodName(methodId) {
    const methods = {
      1: 'جمعية العلوم الإسلامية - كراتشي',
      2: 'الجمعية الإسلامية لأمريكا الشمالية',
      3: 'رابطة العالم الإسلامي',
      4: 'جامعة أم القرى - مكة المكرمة',
      5: 'الهيئة المصرية العامة للمساحة',
      8: 'مجلس الإمارات للإفتاء',
      9: 'وزارة الأوقاف الكويتية',
      10: 'وزارة الأوقاف القطرية',
      12: 'دائرة الأرصاد الجوية المغربية',
      15: 'وزارة الإفتاء الأردنية'
    };
    return methods[methodId] || 'الهيئة المصرية العامة';
  }

  function updatePrayerGrid() {
    const grid = document.getElementById('rm-prayer-grid');
    if (!grid || !state.currentTimes) return;

    const prayers = [
      { key: 'fajr',    name: 'الفجر',   icon: '🌅' },
      { key: 'duha',    name: 'الضحى',   icon: '☀️' },
      { key: 'dhuhr',   name: 'الظهر',   icon: '🌞' },
      { key: 'asr',     name: 'العصر',   icon: '🌇' },
      { key: 'maghrib', name: 'المغرب',  icon: '🌆' },
      { key: 'isha',    name: 'العشاء',  icon: '🌙' }
    ];

    const now            = new Date();
    let   nextPrayerIdx  = -1;
    let   minMs          = Infinity;

    prayers.forEach((p, i) => {
      const t = state.currentTimes[p.key];
      if (!t) return;
      const pDate = prayerTimeToDate(t, now);
      const diff  = pDate - now;
      if (diff > 0 && diff < minMs) { minMs = diff; nextPrayerIdx = i; }
    });

    if (nextPrayerIdx === -1) nextPrayerIdx = 0;
    state._lastNextPrayerIdx = nextPrayerIdx;

    grid.innerHTML = prayers.map((p, i) => `
      <div class="rm-prayer-card ${i === nextPrayerIdx ? 'next' : ''}">
        ${i === nextPrayerIdx ? '<div class="rm-prayer-badge">القادمة</div>' : ''}
        <div class="rm-prayer-name">${p.name}</div>
        <div class="rm-prayer-time">${to12Hour(state.currentTimes[p.key])}</div>
      </div>
    `).join('');
  }

  function syncGridHighlight() {
    const grid = document.getElementById('rm-prayer-grid');
    if (!grid || !state.currentTimes) return;

    const keys  = ['fajr','duha','dhuhr','asr','maghrib','isha'];
    const now   = new Date();
    let nextIdx = -1;
    let minMs   = Infinity;

    keys.forEach((k, i) => {
      const t = state.currentTimes[k];
      if (!t) return;
      const diff = prayerTimeToDate(t, now) - now;
      if (diff > 0 && diff < minMs) { minMs = diff; nextIdx = i; }
    });

    if (nextIdx === -1) nextIdx = 0;

    if (nextIdx !== state._lastNextPrayerIdx) {
      state._lastNextPrayerIdx = nextIdx;
      updatePrayerGrid();
    }
  }

  /**
   * يحوّل وقت الصلاة "HH:MM" إلى Date object لليوم الحالي.
   * لو الوقت عدى → يرجع نفس الوقت لليوم التالي.
   * هذا يضمن أن الفرق صحيح بغض النظر عن التوقيت الصيفي (DST).
   */
  function prayerTimeToDate(timeStr, referenceNow) {
    const now = referenceNow || _getReliableNow();
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
    if (d <= now) d.setDate(d.getDate() + 1); // الصلاة التالية للغد
    return d;
  }

  /**
   * بعض أجهزة الأندرويد new Date() بترجع UTC بدل التوقيت المحلي.
   * نتحقق: لو فرق الـ timezone offset يدل على مشكلة، نصلحها.
   * الحل: نبني Date بـ Intl لنعرف الوقت المحلي الصح، ونضبط الـ now.
   */
  function _getReliableNow() {
    const now = new Date();

    try {
      // نجيب الوقت المحلي الصح من Intl (مش بيتأثر بضبط الجهاز الغلط)
      const tz = state.settings?.location
        ? _coordsToTimezone(state.settings.location.lat, state.settings.location.lng)
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).formatToParts(now);

      const get = type => parseInt(parts.find(p => p.type === type).value);
      const corrected = new Date(get('year'), get('month') - 1, get('day'),
                                  get('hour'), get('minute'), get('second'));

      // لو الفرق بين الـ corrected والـ now أكبر من 30 دقيقة → الجهاز مش مظبوط
      const diffMin = Math.abs(corrected - now) / 60000;
      if (diffMin > 30) {
        console.warn('[RM] جهاز timezone مش مظبوط — تم التصحيح تلقائياً');
        return corrected;
      }
    } catch (e) { /* ignore */ }

    return now;
  }

  /**
   * تقدير IANA timezone من الـ coordinates (مبسط للمنطقة العربية).
   */
  function _coordsToTimezone(lat, lng) {
    if (lng >= 24 && lng <= 37 && lat >= 22 && lat <= 32) return 'Africa/Cairo';
    if (lng >= 36 && lng <= 56 && lat >= 16 && lat <= 32) return 'Asia/Riyadh';
    if (lng >= 50 && lng <= 60 && lat >= 22 && lat <= 27) return 'Asia/Dubai';
    if (lng >= 44 && lng <= 50 && lat >= 28 && lat <= 34) return 'Asia/Kuwait';
    if (lng >= 50 && lng <= 52 && lat >= 25 && lat <= 27) return 'Asia/Bahrain';
    if (lng >= 51 && lng <= 52 && lat >= 24 && lat <= 26) return 'Asia/Qatar';
    if (lng >= 56 && lng <= 60 && lat >= 21 && lat <= 25) return 'Asia/Muscat';
    if (lng >= 35 && lng <= 39 && lat >= 29 && lat <= 34) return 'Asia/Amman';
    if (lng >= 35 && lng <= 37 && lat >= 33 && lat <= 35) return 'Asia/Beirut';
    if (lng >= 35 && lng <= 42 && lat >= 32 && lat <= 37) return 'Asia/Damascus';
    if (lng >= 38 && lng <= 49 && lat >= 28 && lat <= 38) return 'Asia/Baghdad';
    if (lng >= -6 && lng <= 0  && lat >= 30 && lat <= 36) return 'Africa/Casablanca';
    if (lng >= 8  && lng <= 12 && lat >= 30 && lat <= 38) return 'Africa/Tunis';
    if (lng >= 2  && lng <= 10 && lat >= 18 && lat <= 38) return 'Africa/Algiers';
    if (lng >= 12 && lng <= 25 && lat >= 19 && lat <= 34) return 'Africa/Tripoli';
    if (lng >= 30 && lng <= 38 && lat >= 8  && lat <= 22) return 'Africa/Khartoum';
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  function startCountdown() {
    if (state.countdownInterval) clearInterval(state.countdownInterval);

    const PRAYERS = [
      { key: 'fajr',    name: 'الفجر'   },
      { key: 'duha',    name: 'الضحى'   },
      { key: 'dhuhr',   name: 'الظهر'   },
      { key: 'asr',     name: 'العصر'   },
      { key: 'maghrib', name: 'المغرب'  },
      { key: 'isha',    name: 'العشاء'  }
    ];

    const update = () => {
      if (!state.currentTimes) return;

      const now = new Date(); // الوقت المحلي الحقيقي للجهاز

      let nextPrayer = null;
      let minMs      = Infinity;

      PRAYERS.forEach(p => {
        const t = state.currentTimes[p.key];
        if (!t) return;
        const pDate = prayerTimeToDate(t, now);
        const diff  = pDate - now; // بالمللي ثانية
        if (diff > 0 && diff < minMs) {
          minMs      = diff;
          nextPrayer = p;
        }
      });

      // لو كل صلوات اليوم عدّت → فجر الغد
      if (!nextPrayer) {
        nextPrayer = PRAYERS[0];
        const fajrTomorrow = prayerTimeToDate(state.currentTimes.fajr, now);
        minMs = fajrTomorrow - now;
      }

      const totalSec = Math.max(0, Math.floor(minMs / 1000));
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      const nextEl = document.getElementById('rm-next-prayer');
      const timeEl = document.getElementById('rm-countdown-time');

      if (nextEl) nextEl.textContent = nextPrayer.name;
      if (timeEl) {
        timeEl.textContent =
          `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      }

      // مزامنة تمييز المربعات مع العد التنازلي
      syncGridHighlight();
    };

    update();
    state.countdownInterval = setInterval(() => { if (!document.hidden) update(); }, 1000);
  }

  /* ============================================================
     📍 مودال اختيار الموقع
     ============================================================ */
  function buildLocationModal() {
    let modal = document.getElementById('rm-location-modal');
    if (modal) modal.remove();
    
    modal = document.createElement('div');
    modal.id = 'rm-location-modal';
    modal.className = 'rm-modal';
    modal.innerHTML = `
      <div class="rm-modal-content">
        <button class="rm-modal-close" onclick="window.RafiqMuslim.closeLocationModal()">×</button>
        <h2 class="rm-modal-title">📍 اختر موقعك</h2>
        
        <div class="rm-info-card">
          🌍 اختر دولتك ومدينتك للحصول على مواقيت دقيقة، أو استخدم GPS الجهاز.
        </div>
        
        <div class="rm-form-group">
          <label class="rm-label">الدولة</label>
          <select class="rm-select" id="rm-country-select" onchange="window.RafiqMuslim.onCountryChange()">
            ${Object.keys(COUNTRIES_DATA).map(c => 
              `<option value="${c}" ${c === state.settings.location.country ? 'selected' : ''}>${c}</option>`
            ).join('')}
          </select>
        </div>
        
        <div class="rm-form-group">
          <label class="rm-label">المدينة / المحافظة</label>
          <select class="rm-select" id="rm-city-select">
            ${Object.keys(COUNTRIES_DATA[state.settings.location.country].cities).map(c => 
              `<option value="${c}" ${c === state.settings.location.city ? 'selected' : ''}>${c}</option>`
            ).join('')}
          </select>
        </div>
        
        <div class="rm-form-group">
          <label class="rm-label">طريقة حساب المواقيت</label>
          <select class="rm-select" id="rm-method-select">
            <option value="5" ${state.settings.method === 5 ? 'selected' : ''}>الهيئة المصرية العامة للمساحة</option>
            <option value="4" ${state.settings.method === 4 ? 'selected' : ''}>أم القرى - مكة المكرمة</option>
            <option value="3" ${state.settings.method === 3 ? 'selected' : ''}>رابطة العالم الإسلامي</option>
            <option value="2" ${state.settings.method === 2 ? 'selected' : ''}>الإسلامية لأمريكا الشمالية (ISNA)</option>
            <option value="1" ${state.settings.method === 1 ? 'selected' : ''}>جمعية العلوم الإسلامية - كراتشي</option>
            <option value="8" ${state.settings.method === 8 ? 'selected' : ''}>مجلس الإمارات للإفتاء</option>
            <option value="9" ${state.settings.method === 9 ? 'selected' : ''}>وزارة الأوقاف الكويتية</option>
            <option value="10" ${state.settings.method === 10 ? 'selected' : ''}>وزارة الأوقاف القطرية</option>
            <option value="12" ${state.settings.method === 12 ? 'selected' : ''}>الأرصاد الجوية المغربية</option>
            <option value="15" ${state.settings.method === 15 ? 'selected' : ''}>وزارة الإفتاء الأردنية</option>
          </select>
        </div>
        
        <div class="rm-buttons-row">
          <button class="rm-btn rm-btn-success rm-btn-full" onclick="window.RafiqMuslim.useGPS()">📡 استخدم موقعي الحالي (GPS)</button>
          <button class="rm-btn rm-btn-primary rm-btn-full" onclick="window.RafiqMuslim.saveLocation()">💾 حفظ الموقع</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  function onCountryChange() {
    const countrySelect = document.getElementById('rm-country-select');
    const citySelect = document.getElementById('rm-city-select');
    if (!countrySelect || !citySelect) return;
    
    const country = countrySelect.value;
    const cities = COUNTRIES_DATA[country].cities;
    
    citySelect.innerHTML = Object.keys(cities).map(c => 
      `<option value="${c}">${c}</option>`
    ).join('');
  }

  async function saveLocation() {
    const countrySelect = document.getElementById('rm-country-select');
    const citySelect = document.getElementById('rm-city-select');
    const methodSelect = document.getElementById('rm-method-select');
    
    if (!countrySelect || !citySelect) return;
    
    const country = countrySelect.value;
    const city = citySelect.value;
    const method = parseInt(methodSelect.value);
    const coords = COUNTRIES_DATA[country].cities[city];
    
    state.settings.location = { country, city, ...coords };
    state.settings.method = method;
    state.settings.manualMode = false;
    
    saveData(STORAGE_KEYS.location, state.settings.location);
    saveData(STORAGE_KEYS.method, method);
    saveData(STORAGE_KEYS.manualMode, false);
    
    closeLocationModal();
    showInAppToast('✅ تم الحفظ', `تم تحديث الموقع إلى ${city}, ${country}`, '📍');
    
    await refreshPrayerTimes();
  }

  async function useGPS() {
    if (!navigator.geolocation) {
      alert('متصفحك لا يدعم تحديد الموقع الجغرافي');
      return;
    }
    
    showInAppToast('⏳ جاري التحديد', 'يتم تحديد موقعك الحالي...', '📡');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        state.settings.location = {
          country: 'موقع GPS',
          city: 'موقعك الحالي',
          lat, lng
        };
        state.settings.manualMode = false;
        
        saveData(STORAGE_KEYS.location, state.settings.location);
        saveData(STORAGE_KEYS.manualMode, false);
        
        closeLocationModal();
        showInAppToast('✅ تم بنجاح', 'تم تحديد موقعك بدقة عالية', '📡');
        
        await refreshPrayerTimes();
      },
      (error) => {
        showInAppToast('❌ خطأ', 'تعذر تحديد الموقع: ' + error.message, '⚠️');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function closeLocationModal() {
    const modal = document.getElementById('rm-location-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     ✏️ مودال التعديل اليدوي للمواقيت
     ============================================================ */
  function buildManualModal() {
    let modal = document.getElementById('rm-manual-modal');
    if (modal) modal.remove();
    
    const times = state.settings.manualMode ? state.settings.manualTimes : (state.currentTimes || state.settings.manualTimes);
    
    modal = document.createElement('div');
    modal.id = 'rm-manual-modal';
    modal.className = 'rm-modal';
    modal.innerHTML = `
      <div class="rm-modal-content">
        <button class="rm-modal-close" onclick="window.RafiqMuslim.closeManualModal()">×</button>
        <h2 class="rm-modal-title">✏️ تعديل المواقيت يدوياً</h2>
        
        <div class="rm-info-card">
          ⚠️ عند الحفظ، سيتم استخدام المواقيت اليدوية بدلاً من API. لاستعادة الحساب التلقائي، اضغط "تفعيل التلقائي".
        </div>
        
        <div class="rm-time-row">
          <span class="rm-time-name">🌅 الفجر</span>
          <input type="time" class="rm-time-input" id="rm-time-fajr" value="${times.fajr || '04:30'}">
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">☀️ الضحى</span>
          <input type="time" class="rm-time-input" id="rm-time-duha" value="${times.duha || '06:50'}">
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">🌞 الظهر</span>
          <input type="time" class="rm-time-input" id="rm-time-dhuhr" value="${times.dhuhr || '12:00'}">
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">🌇 العصر</span>
          <input type="time" class="rm-time-input" id="rm-time-asr" value="${times.asr || '15:30'}">
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">🌆 المغرب</span>
          <input type="time" class="rm-time-input" id="rm-time-maghrib" value="${times.maghrib || '18:00'}">
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">🌙 العشاء</span>
          <input type="time" class="rm-time-input" id="rm-time-isha" value="${times.isha || '19:30'}">
        </div>
        
        <div class="rm-buttons-row" style="margin-top:16px">
          <button class="rm-btn" onclick="window.RafiqMuslim.disableManualMode()">🔄 تفعيل التلقائي</button>
          <button class="rm-btn rm-btn-primary" onclick="window.RafiqMuslim.saveManualTimes()">💾 حفظ يدوياً</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  function saveManualTimes() {
    const fajr = document.getElementById('rm-time-fajr').value;
    const duha = document.getElementById('rm-time-duha').value;
    const dhuhr = document.getElementById('rm-time-dhuhr').value;
    const asr = document.getElementById('rm-time-asr').value;
    const maghrib = document.getElementById('rm-time-maghrib').value;
    const isha = document.getElementById('rm-time-isha').value;
    
    state.settings.manualTimes = { fajr, duha, dhuhr, asr, maghrib, isha };
    state.settings.manualMode = true;
    state.currentTimes = { ...state.settings.manualTimes };
    
    saveData(STORAGE_KEYS.manualTimes, state.settings.manualTimes);
    saveData(STORAGE_KEYS.manualMode, true);
    
    closeManualModal();
    showInAppToast('✅ تم الحفظ', 'تم تفعيل المواقيت اليدوية', '✏️');
    
    updatePrayerGrid();
    startCountdown();
  }

  async function disableManualMode() {
    state.settings.manualMode = false;
    saveData(STORAGE_KEYS.manualMode, false);
    closeManualModal();
    showInAppToast('🔄 تم التحويل', 'سيتم حساب المواقيت تلقائياً', '🌐');
    await refreshPrayerTimes();
  }

  function closeManualModal() {
    const modal = document.getElementById('rm-manual-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     🧭 مودال القبلة
     ============================================================ */
  function buildQiblaModal() {
    let modal = document.getElementById('rm-qibla-modal');
    if (modal) modal.remove();
    
    state.targetQibla = calculateQibla(state.settings.location.lat, state.settings.location.lng);
    const distance = calculateDistance(
      state.settings.location.lat, state.settings.location.lng,
      KAABA.lat, KAABA.lng
    );
    
    modal = document.createElement('div');
    modal.id = 'rm-qibla-modal';
    modal.className = 'rm-modal';
    modal.innerHTML = `
      <div class="rm-modal-content" style="max-width:420px">
        <button class="rm-modal-close" onclick="window.RafiqMuslim.closeQiblaModal()">×</button>
        <h2 class="rm-modal-title" style="margin-bottom:10px">🧭 اتجاه القبلة</h2>

        <div class="rm-compass-container">
          <div class="rm-qibla-degree-badge" id="qibla-degree-badge">القبلة: ${state.targetQibla.toFixed(1)}° من الشمال</div>

          <div class="rm-compass-wrap" id="rm-compass-wrap">
            <!-- الحلقة الخارجية -->
            <div class="rm-compass-ring-outer"></div>
            <!-- الوجه الداخلي -->
            <div class="rm-compass-face"></div>

            <!-- وردة الرياح SVG — تدور مع الجهاز -->
            <svg id="qibla-rose" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="faceGrad" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stop-color="#1e2a3a"/>
                  <stop offset="100%" stop-color="#060c16"/>
                </radialGradient>
                <linearGradient id="northGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#ef4444"/>
                  <stop offset="100%" stop-color="#7f1d1d"/>
                </linearGradient>
                <linearGradient id="southGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#e2e8f0"/>
                  <stop offset="100%" stop-color="#64748b"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="glowGold">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <!-- دوائر الدرجات -->
              <circle cx="150" cy="150" r="118" fill="none" stroke="rgba(251,191,36,0.12)" stroke-width="0.8"/>
              <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(251,191,36,0.08)" stroke-width="0.5"/>
              <circle cx="150" cy="150" r="80"  fill="none" stroke="rgba(251,191,36,0.06)" stroke-width="0.5"/>

              <!-- علامات كل 10 درجات -->
              ${Array.from({length:36},(_,i)=>{
                const a=(i*10-90)*Math.PI/180;
                const r1=i%9===0?108:i%3===0?112:114;
                const r2=118;
                const x1=150+r1*Math.cos(a), y1=150+r1*Math.sin(a);
                const x2=150+r2*Math.cos(a), y2=150+r2*Math.sin(a);
                const w=i%9===0?1.5:i%3===0?1:0.6;
                const c=i%9===0?'rgba(251,191,36,0.7)':'rgba(251,191,36,0.3)';
                return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c}" stroke-width="${w}"/>`;
              }).join('')}

              <!-- وردة الرياح الرئيسية -->
              <!-- شمال (أحمر) -->
              <polygon points="150,32 143,150 150,130 157,150" fill="url(#northGrad)" filter="url(#glow)"/>
              <polygon points="150,32 143,150 150,60"  fill="#ff6b6b" opacity="0.3"/>
              <!-- جنوب (رمادي) -->
              <polygon points="150,268 143,150 150,170 157,150" fill="url(#southGrad)" filter="url(#glow)"/>
              <!-- شرق -->
              <polygon points="268,150 150,143 170,150 150,157" fill="rgba(251,191,36,0.6)" filter="url(#glowGold)"/>
              <!-- غرب -->
              <polygon points="32,150 150,143 130,150 150,157" fill="rgba(251,191,36,0.6)" filter="url(#glowGold)"/>
              <!-- أسهم بين الاتجاهات -->
              <polygon points="218,82 154,148 148,154 82,218 92,200 200,92" fill="rgba(251,191,36,0.15)"/>
              <polygon points="218,218 154,152 148,146 82,82 100,92 208,200" fill="rgba(251,191,36,0.08)"/>

              <!-- حلقة الدرجات المركزية -->
              <circle cx="150" cy="150" r="28" fill="rgba(8,14,26,0.95)" stroke="rgba(251,191,36,0.4)" stroke-width="1"/>

              <!-- النصوص: شمال/جنوب/شرق/غرب -->
              <text x="150" y="22" text-anchor="middle" fill="#ef4444" font-size="16" font-weight="900" font-family="'Tajawal',sans-serif" filter="url(#glow)">ش</text>
              <text x="150" y="286" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="700" font-family="'Tajawal',sans-serif">ج</text>
              <text x="284" y="155" text-anchor="middle" fill="rgba(251,191,36,0.8)" font-size="13" font-weight="700" font-family="'Tajawal',sans-serif">ق</text>
              <text x="16"  y="155" text-anchor="middle" fill="rgba(251,191,36,0.8)" font-size="13" font-weight="700" font-family="'Tajawal',sans-serif">غ</text>

              <!-- NE / SE / SW / NW -->
              <text x="232" y="72"  text-anchor="middle" fill="rgba(251,191,36,0.45)" font-size="10" font-family="sans-serif">NE</text>
              <text x="232" y="237" text-anchor="middle" fill="rgba(251,191,36,0.45)" font-size="10" font-family="sans-serif">SE</text>
              <text x="68"  y="237" text-anchor="middle" fill="rgba(251,191,36,0.45)" font-size="10" font-family="sans-serif">SW</text>
              <text x="68"  y="72"  text-anchor="middle" fill="rgba(251,191,36,0.45)" font-size="10" font-family="sans-serif">NW</text>
            </svg>

            <!-- سهم القبلة — يدور مستقلاً -->
            <svg id="qibla-pointer-wrap" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;">
              <defs>
                <linearGradient id="qiblaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#34d399"/>
                  <stop offset="100%" stop-color="#059669"/>
                </linearGradient>
                <filter id="glowGreen">
                  <feGaussianBlur stdDeviation="4" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <!-- جسم السهم -->
              <polygon points="150,45 143,155 150,148 157,155"
                fill="url(#qiblaGrad)" filter="url(#glowGreen)" opacity="0.95"/>
              <!-- ذيل السهم -->
              <polygon points="150,200 145,155 150,160 155,155"
                fill="rgba(16,185,129,0.3)"/>
              <!-- أيقونة الكعبة فوق السهم -->
              <text x="150" y="40" text-anchor="middle" font-size="22" filter="url(#glowGreen)">🕋</text>
              <!-- خط توجيه رفيع -->
              <line x1="150" y1="60" x2="150" y2="145" stroke="rgba(52,211,153,0.25)" stroke-width="1" stroke-dasharray="3,4"/>
            </svg>

            <!-- الجوهرة المركزية -->
            <div class="rm-compass-jewel"></div>
          </div>

          <div class="qibla-status" id="qibla-status">اضغط «تفعيل» لبدء البوصلة</div>

          <!-- زرار إعادة التحديد — يظهر فقط لما البوصلة تتقفل -->
          <button id="qibla-reset-btn"
            onclick="window.RafiqMuslim.resetQiblaLock()"
            style="display:none;margin:10px auto 0;align-items:center;gap:8px;
                   background:linear-gradient(135deg,#1e3a2f,#14532d);
                   border:1.5px solid #34d399;border-radius:12px;
                   color:#34d399;font-size:14px;font-family:Tajawal,sans-serif;
                   font-weight:700;padding:10px 22px;cursor:pointer;
                   box-shadow:0 0 14px rgba(52,211,153,0.25);
                   transition:all 0.2s ease;">
            🔄 إعادة تحديد القبلة
          </button>
        </div>

        <div class="rm-qibla-info">
          📍 الموقع: <strong>${state.settings.location.city}، ${state.settings.location.country}</strong><br>
          🧭 اتجاه القبلة: <strong>${state.targetQibla.toFixed(1)}°</strong> من الشمال<br>
          📏 المسافة للكعبة: <strong>${distance.toFixed(0)} كم</strong>
        </div>

        <div class="rm-buttons-row" style="margin-top:14px">
          <button class="rm-btn rm-btn-success rm-btn-full" onclick="window.RafiqMuslim.activateCompass()">🎯 تفعيل البوصلة</button>
        </div>

        <div class="rm-info-card" style="margin-top:10px;font-size:12px">
          💡 امسك الهاتف أفقياً — السهم الأخضر 🕋 يشير دائماً نحو الكعبة المشرفة
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  function activateCompass() {
    startCompass();
    const status = document.getElementById('qibla-status');
    if (status) status.textContent = '⏳ جاري قراءة البوصلة...';
  }

  function closeQiblaModal() {
    window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    window.removeEventListener('deviceorientation', handleOrientation, true);
    if (_rafId) { cancelAnimationFrame(_rafId); _rafId = null; }
    _smoothHeading = null;
    _rawHeading    = null;
    _compassLocked = false;
    _lockFrames    = 0;
    _usingAbsolute = false;
    const modal = document.getElementById('rm-qibla-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     🔔 مودال إعدادات التنبيهات
     ============================================================ */
  function buildNotifModal() {
    let modal = document.getElementById('rm-notif-modal');
    if (modal) modal.remove();

    const n        = state.settings.notifSettings;
    const vol      = Math.round((state.settings.notifVolume ?? 0.8) * 100);

    modal = document.createElement('div');
    modal.id = 'rm-notif-modal';
    modal.className = 'rm-modal';
    modal.innerHTML = `
      <div class="rm-modal-content">
        <button class="rm-modal-close" onclick="window.RafiqMuslim.closeNotifModal()">×</button>
        <h2 class="rm-modal-title">🔔 إعدادات التنبيهات</h2>

        <div class="rm-info-card">
          🔊 تحكم كامل في جميع التنبيهات والأصوات.
        </div>

        <!-- ══════════ الأذان ══════════ -->
        <div class="rm-section-title">🕌 الأذان</div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">🕌 تفعيل الأذان عند دخول الوقت</span>
          <button class="rm-switch ${n.azanEnabled ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'azanEnabled')"></button>
        </div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">🔊 تشغيل صوت الأذان الكامل</span>
          <button class="rm-switch ${n.azanSoundEnabled ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'azanSoundEnabled')"></button>
        </div>

        <!-- ══════════ الإقامة ══════════ -->
        <div class="rm-section-title">📢 الإقامة</div>

        <div class="rm-info-card" style="font-size:12px;color:#94a3b8;background:rgba(15,23,42,0.6)">
          💡 بعد انتهاء الأذان كاملاً، تُقام الصلاة تلقائياً صوتياً ("قد قامت الصلاة")
        </div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">📢 تشغيل الإقامة تلقائياً بعد الأذان</span>
          <button class="rm-switch ${n.iqamaEnabled !== false ? 'active' : ''}" id="rm-iqama-switch"
            onclick="window.RafiqMuslim.toggleSetting(this, 'iqamaEnabled');
                     document.getElementById('rm-iqama-delay-row').style.display=this.classList.contains('active')?'block':'none'">
          </button>
        </div>

        <div id="rm-iqama-delay-row" class="rm-form-group" style="display:${n.iqamaEnabled !== false ? 'block' : 'none'}">
          <label class="rm-label" style="color:#94a3b8;font-size:13px">⏱️ الفاصل بين الأذان والإقامة (ثانية)</label>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-iqama-delay', -1)">－1</button>
            <input type="number" class="rm-input rm-counter-input" id="rm-iqama-delay" value="${n.iqamaDelaySeconds || 4}" min="0" max="30" style="text-align:center;font-size:20px;font-weight:800;color:#34d399">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-iqama-delay', 1)">＋1</button>
          </div>
        </div>

        <!-- ══════════ قبل الأذان ══════════ -->
        <div class="rm-section-title">⏰ قبل الأذان</div>

        <div class="rm-info-card" style="font-size:12px;color:#94a3b8;background:rgba(15,23,42,0.6)">
          💡 إشعار تنبيهي فقط قبل الأذان — الأذان الكامل يعمل عند دخول وقت الصلاة فقط
        </div>

        <div class="rm-form-group">
          <label class="rm-label">⏳ إشعار قبل الأذان بـ (دقيقة) — 0 = معطّل</label>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-pre-azan', -5)">－5</button>
            <input type="number" class="rm-input rm-counter-input" id="rm-pre-azan" value="${n.preAzanMinutes}" min="0" max="60" style="text-align:center;font-size:20px;font-weight:800;color:#fbbf24">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-pre-azan', 5)">＋5</button>
          </div>
        </div>

        <div class="rm-form-group">
          <label class="rm-label">🔔 صوت تنبيه قبل الأذان</label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px" id="rm-pre-azan-sound-btns">
            ${[
              { val: 'beep',   label: '🔔 نبضتان'     },
              { val: 'beep3',  label: '🔔 ثلاث نبضات' },
              { val: 'beep4',  label: '🔔 أربع نبضات' },
              { val: 'none',   label: '🔇 بدون صوت'   }
            ].map(opt => `
              <button
                id="rm-pre-sound-${opt.val}"
                onclick="window.RafiqMuslim.selectPreAzanSound('${opt.val}')"
                style="
                  flex:1;min-width:110px;padding:9px 6px;border-radius:10px;border:2px solid;
                  font-family:Tajawal,sans-serif;font-size:13px;font-weight:700;cursor:pointer;
                  transition:all 0.2s;
                  ${(n.preAzanSoundType || 'beep3') === opt.val
                    ? 'background:#fbbf24;color:#0f172a;border-color:#fbbf24;'
                    : 'background:rgba(255,255,255,0.05);color:#94a3b8;border-color:rgba(255,255,255,0.12);'}
                "
              >${opt.label}</button>
            `).join('')}
          </div>
          <input type="hidden" id="rm-pre-azan-sound-type" value="${n.preAzanSoundType || 'beep3'}">
          <button
            style="margin-top:8px;padding:6px 14px;border-radius:8px;border:1px solid rgba(251,191,36,0.3);
                   background:rgba(251,191,36,0.08);color:#fbbf24;font-family:Tajawal,sans-serif;
                   font-size:12px;cursor:pointer;"
            onclick="window.RafiqMuslim.testPreAzanSound()">
            ▶ اختبار الصوت
          </button>
        </div>

        <!-- ══════════ بعد الأذان ══════════ -->
        <div class="rm-section-title">🤲 بعد الأذان</div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">🔔 تذكير بعد الأذان</span>
          <button class="rm-switch ${n.postAzanEnabled ? 'active' : ''}" id="rm-post-azan-switch"
            onclick="window.RafiqMuslim.toggleSetting(this,'postAzanEnabled');
                     document.getElementById('rm-post-azan-row').style.display=this.classList.contains('active')?'block':'none'">
          </button>
        </div>

        <div id="rm-post-azan-row" class="rm-form-group" style="display:${n.postAzanEnabled ? 'block' : 'none'}">
          <label class="rm-label" style="color:#94a3b8;font-size:13px">🕐 تذكير بعد الأذان بـ (دقيقة)</label>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-post-azan', -5)">－5</button>
            <input type="number" class="rm-input rm-counter-input" id="rm-post-azan" value="${n.postAzanMinutes || 15}" min="1" max="120" style="text-align:center;font-size:20px;font-weight:800;color:#fbbf24">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-post-azan', 5)">＋5</button>
          </div>
        </div>

        <!-- ═════════️ صوت المنبه ══════════ -->
        <div class="rm-section-title">⏰ صوت المنبه</div>

        <div class="rm-info-card" style="font-size:12px;color:#94a3b8;background:rgba(15,23,42,0.6)">
          💡 صوت تنبيه قوي (منبه رقمي) يشتغل مع كل الإشعارات — الأذان والإقامة وأوقات الأذكار — عشان يلفت انتباهك حتى لو الموبايل بعيد
        </div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">⏰ تشغيل صوت المنبه مع الإشعارات</span>
          <button class="rm-switch ${n.alarmSoundEnabled !== false ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'alarmSoundEnabled')"></button>
        </div>

        <div class="rm-form-group" style="display:${n.alarmSoundEnabled !== false ? 'block' : 'none'}">
          <label class="rm-label" style="color:#94a3b8;font-size:13px">🔔 عدد تكرارات المنبه</label>
          <div style="display:flex;align-items:center;gap:10px">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-alarm-repeat', -1)">－1</button>
            <input type="number" class="rm-input rm-counter-input" id="rm-alarm-repeat" value="${n.alarmRepeatCount || 3}" min="1" max="10" style="text-align:center;font-size:20px;font-weight:800;color:#fbbf24">
            <button class="rm-counter-btn" onclick="window.RafiqMuslim.adjustCounter('rm-alarm-repeat', 1)">＋1</button>
          </div>
        </div>

        <!-- ══════════ مستوى الصوت ══════════ -->
        <div class="rm-section-title">🔊 مستوى الصوت</div>

        <div class="rm-volume-card" id="rm-volume-card">
          <div class="rm-volume-display">
            <span class="rm-volume-icon" id="rm-volume-icon">${vol >= 70 ? '🔊' : vol >= 30 ? '🔉' : vol > 0 ? '🔈' : '🔇'}</span>
            <span class="rm-volume-number" id="rm-volume-number">${vol}%</span>
          </div>
          <div class="rm-volume-track-wrap">
            <input type="range" class="rm-volume-slider" id="rm-volume"
              min="0" max="100" value="${vol}"
              oninput="window.RafiqMuslim.updateVolumeUI(this.value)">
            <div class="rm-volume-fill" id="rm-volume-fill" style="width:${vol}%"></div>
          </div>
          <div class="rm-volume-labels">
            <span>🔇</span>
            <span style="color:#94a3b8;font-size:11px">منخفض</span>
            <span style="color:#94a3b8;font-size:11px">متوسط</span>
            <span style="color:#94a3b8;font-size:11px">عالٍ</span>
            <span>🔊</span>
          </div>
          <div style="display:flex;gap:8px;margin-top:10px;justify-content:center">
            <button class="rm-vol-preset" onclick="window.RafiqMuslim.setVolumePreset(25)">25%</button>
            <button class="rm-vol-preset" onclick="window.RafiqMuslim.setVolumePreset(50)">50%</button>
            <button class="rm-vol-preset" onclick="window.RafiqMuslim.setVolumePreset(75)">75%</button>
            <button class="rm-vol-preset" onclick="window.RafiqMuslim.setVolumePreset(100)">100%</button>
          </div>
        </div>

        <!-- ══════════ إعدادات أخرى ══════════ -->
        <div class="rm-section-title">⚙️ إعدادات أخرى</div>

        <div class="rm-switch-row">
          <span class="rm-switch-label">⚠️ التذكير بالعبادات الفائتة</span>
          <button class="rm-switch ${n.missedReminderEnabled ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'missedReminderEnabled')"></button>
        </div>
        
        <div class="rm-switch-row">
          <span class="rm-switch-label">📳 تفعيل الاهتزاز</span>
          <button class="rm-switch ${n.vibrationEnabled ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'vibrationEnabled')"></button>
        </div>
        
        <div class="rm-switch-row">
          <span class="rm-switch-label">💻 إشعارات النظام</span>
          <button class="rm-switch ${n.desktopNotifEnabled ? 'active' : ''}" onclick="window.RafiqMuslim.toggleSetting(this, 'desktopNotifEnabled')"></button>
        </div>

        <!-- ══════════ أزرار الاختبار ══════════ -->
        <div class="rm-section-title">🎵 اختبار الأصوات</div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
          <button class="rm-btn" onclick="window.RafiqMuslim.testNotif()">🔔 اختبار إشعار</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.playPostAzanSound()">🤲 بعد الأذان</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.playAzan(false)">🕌 أذان عادي</button>
          <button class="rm-btn" onclick="window.RafiqMuslim.playAzan(true)">🌅 أذان الفجر</button>
          <button class="rm-btn" style="border-color:rgba(16,185,129,0.4);color:#34d399" onclick="window.RafiqMuslim.playIqama()">📢 الإقامة فقط</button>
          <button class="rm-btn" style="border-color:rgba(251,191,36,0.5);color:#fbbf24" onclick="window.RafiqMuslim.playAlarmSound()">⏰ المنبه فقط</button>
          <button class="rm-btn" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border:none" onclick="window.RafiqMuslim.testSWNotif()">🔔 اختبار التنبيه</button>
        </div>

        <!-- ══════════ زر الحفظ ══════════ -->
        <button class="rm-btn rm-btn-success rm-btn-full rm-save-pulse" onclick="window.RafiqMuslim.saveNotifSettings()">
          💾 حفظ جميع الإعدادات
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  /**
   * تبديل قيمة Boolean في notifSettings — حفظ فوري + تأجيل مزامنة الـ SW
   * (debounce عشان نتجنب تهنيج الـ UI لو المستخدم ضغط سريع كذا مرة)
   */
  let _settingsSyncTimer = null;
  function _scheduleSettingsSync() {
    if (_settingsSyncTimer) clearTimeout(_settingsSyncTimer);
    _settingsSyncTimer = setTimeout(() => {
      _settingsSyncTimer = null;
      sendSettingsToSW();
    }, 400);
  }

  function toggleSetting(btn, key) {
    if (!state.settings?.notifSettings) return;
    const newVal = !state.settings.notifSettings[key];
    state.settings.notifSettings[key] = newVal;
    if (btn?.classList) btn.classList.toggle('active', newVal);
    saveData(STORAGE_KEYS.notifSettings, state.settings.notifSettings);
    _scheduleSettingsSync(); // debounce بدل إرسال فوري
  }

  function adjustCounter(id, delta) {
    const el = document.getElementById(id);
    if (!el) return;
    const min = parseInt(el.min) || 0;
    const max = parseInt(el.max) || 999;
    el.value = Math.min(max, Math.max(min, (parseInt(el.value) || 0) + delta));
  }

  function updateVolumeUI(val) {
    const v = parseInt(val);
    state.settings.notifVolume = v / 100;
    const numEl  = document.getElementById('rm-volume-number');
    const iconEl = document.getElementById('rm-volume-icon');
    const fillEl = document.getElementById('rm-volume-fill');
    if (numEl)  numEl.textContent  = v + '%';
    if (iconEl) iconEl.textContent = v >= 70 ? '🔊' : v >= 30 ? '🔉' : v > 0 ? '🔈' : '🔇';
    if (fillEl) fillEl.style.width = v + '%';
  }

  function setVolumePreset(val) {
    const slider = document.getElementById('rm-volume');
    if (slider) { slider.value = val; updateVolumeUI(val); }
  }

  async function testSWNotif() {
    const sw = await getSWController();
    if (!sw) {
      showInAppToast('⚠️ التنبيهات', 'النظام غير مفعّل بعد. انتظر ثوانٍ وحاول مجدداً.', '⚠️');
      return;
    }
    sw.postMessage({ type: 'SW_TEST' });
    showInAppToast('🔔 اختبار', 'أُرسل طلب التنبيه — انتظر الإشعار...', '✅');
  }

  function saveNotifSettings() {
    const preMin = parseInt(document.getElementById('rm-pre-azan').value) || 10;
    state.settings.notifSettings.preAzanMinutes = preMin;

    const preAzanSoundEl = document.getElementById('rm-pre-azan-sound-type');
    if (preAzanSoundEl) {
      state.settings.notifSettings.preAzanSoundType = preAzanSoundEl.value || 'beep3';
    }

    const postEl = document.getElementById('rm-post-azan');
    if (postEl) {
      state.settings.notifSettings.postAzanMinutes = parseInt(postEl.value) || 15;
    }

    const iqamaDelayEl = document.getElementById('rm-iqama-delay');
    if (iqamaDelayEl) {
      state.settings.notifSettings.iqamaDelaySeconds = parseInt(iqamaDelayEl.value) || 4;
    }

    const alarmRepeatEl = document.getElementById('rm-alarm-repeat');
    if (alarmRepeatEl) {
      state.settings.notifSettings.alarmRepeatCount = Math.max(1, Math.min(10, parseInt(alarmRepeatEl.value) || 3));
    }
    
    saveData(STORAGE_KEYS.notifSettings, state.settings.notifSettings);
    saveData(STORAGE_KEYS.notifVolume, state.settings.notifVolume);

    closeNotifModal();
    showInAppToast('✅ تم الحفظ', 'تم حفظ إعدادات التنبيهات', '🔔');

    if (state.settings.notifSettings.desktopNotifEnabled) {
      requestNotifPermission();
    }

    // إرسال الإعدادات الجديدة للـ SW (مؤجَّل عشان الإغلاق يكون سريع)
    _scheduleSettingsSync();
    // إعادة تفعيل الحارس الذكي بالجدول الجديد — في idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => armSmartPrayerGuardian('saveNotifSettings'));
    } else {
      setTimeout(() => armSmartPrayerGuardian('saveNotifSettings'), 100);
    }
  }

  function selectPreAzanSound(val) {
    document.getElementById('rm-pre-azan-sound-type').value = val;
    ['beep', 'beep3', 'beep4', 'none'].forEach(v => {
      const btn = document.getElementById('rm-pre-sound-' + v);
      if (!btn) return;
      if (v === val) {
        btn.style.background    = '#fbbf24';
        btn.style.color         = '#0f172a';
        btn.style.borderColor   = '#fbbf24';
      } else {
        btn.style.background    = 'rgba(255,255,255,0.05)';
        btn.style.color         = '#94a3b8';
        btn.style.borderColor   = 'rgba(255,255,255,0.12)';
      }
    });
  }

  function testPreAzanSound() {
    const val = document.getElementById('rm-pre-azan-sound-type')?.value || 'beep3';
    if (val === 'beep') {
      playBeepSound(2);
    } else if (val === 'beep3') {
      playBeepSound(3);
    } else if (val === 'beep4') {
      playBeepSound(4);
    } else {
      showInAppToast('🔇 بدون صوت', 'التنبيه بدون صوت — إشعار نصي فقط', '🔕');
    }
  }

  function testNotif() {
    showNotification('🔔 اختبار التنبيهات', 'هذا اختبار للتأكد من عمل التنبيهات بشكل صحيح', '🕌');
    playNotifSound();
  }

  function closeNotifModal() {
    const modal = document.getElementById('rm-notif-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     ⏰ مودال أوقات الأذكار
     ============================================================ */
  /* ============================================================
     🕐 Custom Time Picker — قائمتا Select بدلاً من input[type=time]
     يحل مشكلة اقتطاع زرار SET في النظام الأصلي
     ============================================================ */
  function _buildTimePicker(id, timeValue) {
    const [hStr, mStr] = (timeValue || '00:00').split(':');
    const h24  = parseInt(hStr) || 0;
    const mVal = parseInt(mStr) || 0;

    // تحويل من 24 ساعة إلى 12 ساعة
    const isPM = h24 >= 12;
    const h12  = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;

    const hourOptions = Array.from({ length: 12 }, (_, i) => {
      const v = i + 1; // 1 → 12
      return `<option value="${v}" ${v === h12 ? 'selected' : ''}>${String(v).padStart(2, '0')}</option>`;
    }).join('');

    const minOptions = Array.from({ length: 60 }, (_, i) =>
      `<option value="${i}" ${i === mVal ? 'selected' : ''}>${String(i).padStart(2, '0')}</option>`
    ).join('');

    return `
      <div class="rm-tp-wrap">
        <select class="rm-tp-ampm" id="${id}-ampm" aria-label="صباحاً أو مساءً">
          <option value="AM" ${!isPM ? 'selected' : ''}>AM</option>
          <option value="PM" ${ isPM ? 'selected' : ''}>PM</option>
        </select>
        <select class="rm-tp-select" id="${id}-h" aria-label="الساعة">${hourOptions}</select>
        <span class="rm-tp-sep">:</span>
        <select class="rm-tp-select" id="${id}-m" aria-label="الدقيقة">${minOptions}</select>
      </div>`;
  }

  function _getTimePickerValue(id) {
    const hEl    = document.getElementById(`${id}-h`);
    const mEl    = document.getElementById(`${id}-m`);
    const ampmEl = document.getElementById(`${id}-ampm`);
    if (!hEl || !mEl || !ampmEl) return '00:00';

    const h12  = parseInt(hEl.value);
    const m    = parseInt(mEl.value);
    const isPM = ampmEl.value === 'PM';

    // تحويل من 12 ساعة إلى 24 ساعة للتخزين
    let h24;
    if (isPM)  { h24 = h12 === 12 ? 12 : h12 + 12; }
    else       { h24 = h12 === 12 ?  0 : h12;       }

    return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  function buildAthkarTimesModal() {
    let modal = document.getElementById('rm-athkar-modal');
    if (modal) modal.remove();
    
    const n = state.settings.notifSettings;
    
    modal = document.createElement('div');
    modal.id = 'rm-athkar-modal';
    modal.className = 'rm-modal';
    modal.innerHTML = `
      <div class="rm-modal-content">
        <button class="rm-modal-close" onclick="window.RafiqMuslim.closeAthkarModal()">×</button>
        <h2 class="rm-modal-title">⏰ تخصيص أوقات الأذكار</h2>
        
        <div class="rm-info-card">
          🌟 حدد الوقت المناسب لكل ذكر، وسيتم تنبيهك في الوقت المحدد. إذا لم تقرأها، سيظهر تذكير بنهاية اليوم.
        </div>
        
        <div class="rm-time-row">
          <span class="rm-time-name">🌅 أذكار الصباح</span>
          ${_buildTimePicker('rm-ath-morning', n.morningAthkarTime)}
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">🌙 أذكار المساء</span>
          ${_buildTimePicker('rm-ath-evening', n.eveningAthkarTime)}
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">😴 أذكار النوم</span>
          ${_buildTimePicker('rm-ath-sleep', n.sleepAthkarTime)}
        </div>
        <div class="rm-time-row">
          <span class="rm-time-name">📖 قراءة القرآن</span>
          ${_buildTimePicker('rm-ath-quran', n.quranReminderTime)}
        </div>
        
        <div class="rm-form-group" style="margin-top:14px">
          <label class="rm-label">⏰ ساعة التذكير بالفائتة (24 ساعة)</label>
          <input type="number" class="rm-input" id="rm-missed-hour" value="${n.missedCheckHour}" min="0" max="23">
        </div>
        
        <div class="rm-buttons-row" style="margin-top:16px">
          <button class="rm-btn rm-btn-primary rm-btn-full" onclick="window.RafiqMuslim.saveAthkarTimes()">💾 حفظ الأوقات</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 50);
  }

  function saveAthkarTimes() {
    state.settings.notifSettings.morningAthkarTime = _getTimePickerValue('rm-ath-morning');
    state.settings.notifSettings.eveningAthkarTime = _getTimePickerValue('rm-ath-evening');
    state.settings.notifSettings.sleepAthkarTime   = _getTimePickerValue('rm-ath-sleep');
    state.settings.notifSettings.quranReminderTime = _getTimePickerValue('rm-ath-quran');
    state.settings.notifSettings.missedCheckHour = parseInt(document.getElementById('rm-missed-hour').value) || 23;
    
    saveData(STORAGE_KEYS.notifSettings, state.settings.notifSettings);
    
    closeAthkarModal();
    showInAppToast('✅ تم الحفظ', 'تم حفظ أوقات الأذكار بنجاح', '⏰');
  }

  function closeAthkarModal() {
    const modal = document.getElementById('rm-athkar-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  /* ============================================================
     🔄 تحديث المواقيت
     ============================================================ */
  async function refreshPrayerTimes() {
    if (state.settings.manualMode) {
      state.currentTimes = { ...state.settings.manualTimes };
    } else {
      showInAppToast('⏳ تحديث', 'جاري جلب المواقيت...', '🌐');
      const times = await fetchPrayerTimes(
        state.settings.location.lat,
        state.settings.location.lng,
        state.settings.method
      );
      if (times) {
        state.currentTimes = times;
        showInAppToast('✅ تم التحديث', 'تم جلب المواقيت بنجاح', '🌐');
      } else {
        state.currentTimes = { ...state.settings.manualTimes };
        showInAppToast('⚠️ تعذر التحديث', 'تم استخدام المواقيت الافتراضية', '⚠️');
      }
    }
    
    // تحديث الواجهة
    updatePrayerGrid();
    startCountdown();

    // إرسال الجدول للـ Service Worker
    sendScheduleToSW();
    armSmartPrayerGuardian('refreshPrayerTimes');
  }

  function closePrayerTimes() {
    const overlay = document.getElementById('rm-prayer-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => { overlay.remove(); if (typeof window.rafiqHubRestore === 'function') window.rafiqHubRestore(); }, 300);
    }
    if (state.countdownInterval) {
      clearInterval(state.countdownInterval);
      state.countdownInterval = null;
    }
  }

  function openPrayerTimes() {
    try {
      if (!state.settings) state.settings = loadSettings();
      buildPrayerTimesUI();
      const overlay = document.getElementById('rm-prayer-overlay');
      if (overlay) overlay.classList.add('show');
      if (!state.currentTimes) refreshPrayerTimes();
    } catch (e) {
      console.error('[RM] openPrayerTimes error:', e);
      alert('تعذّر فتح مواقيت الصلاة: ' + e.message);
    }
  }
  // تسجيل فوري على window لما الملف يتحمل (قبل init)
  window._rmOpenPT = openPrayerTimes;

  /* ============================================================
     🚀 التهيئة والبدء
     ============================================================ */
  async function init() {
    console.log('🕌 Rafiq Muslim - Prayer Times & Qibla System v2.0');

    state.settings = loadSettings();
    injectStyles();
    handleLaunchFromURL();

    // ── جلب المواقيت أولاً (أولوية قصوى) ───────────────────
    // ربط زر مواقيت الصلاة قبل await — يضمن عمل الزرار فوراً
    window.openPrayerTimes = openPrayerTimes;
    const oldBtn = document.getElementById('prayer-times-btn') ||
                   document.querySelector('[onclick*="openPrayerTimes"]') ||
                   document.querySelector('[onclick*="PrayerTimes"]');
    if (oldBtn) {
      oldBtn.onclick = openPrayerTimes;
    }

    await refreshPrayerTimes();
    armSmartPrayerGuardian('init');

    // بدء المؤقت العام (احتياطي لما التطبيق مفتوح)
    if (state.checkInterval) clearInterval(state.checkInterval);
    state.checkInterval = setInterval(() => { if (!document.hidden) checkPrayerTimes(); }, 30000);

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        armSmartPrayerGuardian('visibility-visible');
        // إعادة تشغيل Wake Lock لو الحارس شغال
        if (state.smartGuardActive && !state.wakeLockSentinel) {
          _requestSmartGuardianWakeLock();
        }
        // فحص فوري للأوقات عند العودة للتطبيق
        checkPrayerTimes();
      } else if (state.wakeLockSentinel) {
        try { state.wakeLockSentinel.release(); } catch (_) {}
        state.wakeLockSentinel = null;
      }
    });

    // تحديث المواقيت كل ساعة أثناء عرض التطبيق فقط؛ العودة تفحص الحالة فوراً.
    setInterval(() => { if (!document.hidden) refreshPrayerTimes(); }, 60 * 60 * 1000);

    // تحديث في منتصف الليل
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 5, 0);
    const msToMidnight = midnight - now;
    setTimeout(() => {
      if (!document.hidden) refreshPrayerTimes();
      setInterval(() => { if (!document.hidden) refreshPrayerTimes(); }, 24 * 60 * 60 * 1000);
    }, msToMidnight);

    // ── المهام الثقيلة تتأجل لما الصفحة تكون idle ───────────
    // كده أول فتح للمستخدم بيبقى سريع (مواقيت بس)
    // والمهام الثقيلة (SW، أصوات، إشعارات) تشتغل في الخلفية بدون تأثير
    const _runIdle = (fn) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(fn, { timeout: 3000 });
      } else {
        setTimeout(fn, 800);
      }
    };

    _runIdle(() => {
      // طلب إذن الإشعارات (مش شرط للمستخدم يشوفه فوراً)
      if (state.settings.notifSettings.desktopNotifEnabled) {
        requestNotifPermission();
      }

      // تسجيل Service Worker في الخلفية
      registerServiceWorker().then(() => {
        startSWHeartbeat();
      }).catch(() => {});

      // لا نبدأ تنزيلات صوتية عند الإقلاع؛ أول تفاعل سيجدولها وقت الخمول.
      // التشغيل المباشر يظل يعتمد على _getAudioUrl عند الحاجة.

      // زر عائم احتياطي — فقط لو مفيش زر الفقاعة الذكية (#rafiqHub) في الصفحة
      // عشان نتجنّب ظهور زرين فوق بعض وعمليات DOM غير ضرورية
      if (!document.getElementById('rafiqHub') && !document.getElementById('rm-fab-prayer')) {
        const fab = document.createElement('button');
        fab.id = 'rm-fab-prayer';
        fab.innerHTML = '🕌';
        fab.title = 'مواقيت الصلاة والقبلة';
        fab.onclick = openPrayerTimes;
        document.body.appendChild(fab);
      }

      // إخفاء أي عنصر "الشروق" قديم
      document.querySelectorAll('[id*="sunrise"], [id*="shorouk"], [class*="sunrise"]').forEach(el => {
        if (el.textContent && el.textContent.includes('الشروق')) {
          el.classList.add('rm-pq-hide-sunrise');
        }
      });

      // نظام التحديث التلقائي
      _initAutoUpdate();

      // اقتراح شاشة AOD بعد التثبيت
      _maybeSuggestAOD();

      // نصيحة صادقة (مرة واحدة) عن حدود الإشعارات في الخلفية
      _maybeSuggestBackgroundReliabilityTip();
    });
  }

  /** تنبيه المستخدم مرة واحدة بحدود الإشعارات لما التطبيق مقفول تمامًا،
   *  عشان يعرف يظبط جهازه صح بدل ما يفتكر إن في عطل في التطبيق. */
  function _maybeSuggestBackgroundReliabilityTip() {
    const shown = loadData(STORAGE_KEYS.bgReliabilityTipShown, false);
    if (shown) return;
    saveData(STORAGE_KEYS.bgReliabilityTipShown, true);

    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/.test(ua) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    setTimeout(() => {
      if (isIOS) {
        showInAppToast(
          'ℹ️ نصيحة مهمة',
          'على الآيفون: الإشعارات هتشتغل كويس والتطبيق في الخلفية، بس لو قفلته تماماً من الـ App Switcher ممكن تتأخر. سيبه في الخلفية بدل ما تقفله',
          '📱'
        );
      } else if (_isStandalone()) {
        showInAppToast(
          'ℹ️ نصيحة مهمة',
          'عشان الإشعارات توصلك بانتظام والتطبيق مقفول: افتح إعدادات البطارية للتطبيق واختار "بدون قيود/Unrestricted" بدل توفير الطاقة',
          '🔋'
        );
      }
    }, 4000);
  }

  /* ============================================================
     🔄 نظام التحديث التلقائي الذكي
     ══════════════════════════════════════════════════════════
     ✅ فحص تحديث كل 30 دقيقة
     ✅ فحص عند العودة للتطبيق
     ✅ إشعار تحديث جميل للمستخدم
     ✅ تحديث تلقائي بدون مسح الكاش يدوياً
     ✅ يعمل حتى لو التطبيق مثبت على الموبايل
     ============================================================ */

  let _updateCheckInterval = null;
  let _updateBannerShown   = false;
  let _waitingSW           = null;

  /** تهيئة نظام التحديث التلقائي */
  function _initAutoUpdate() {
    if (!('serviceWorker' in navigator)) return;

    // 1. فحص دوري كل 30 دقيقة
    _updateCheckInterval = setInterval(() => {
      _checkForSWUpdate();
    }, 30 * 60 * 1000);

    // 2. أول فحص بعد 5 ثواني
    setTimeout(() => _checkForSWUpdate(), 5000);

    // 3. استمع لتحديثات الـ SW الجديدة
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[RM-Update] 🔄 الـ SW اتحكمّل جديد — التحديث سيُطبّق عند إعادة التحميل اليدوي');
      // [v4] لا نعمل reload تلقائي عشان نتجنب refresh loop
      try { _showUpdateBanner(); } catch(_) {}
    });

    // 4. استمع لـ updatefound — SW جديد في الانتظار
    if (state.swRegistration) {
      state.swRegistration.addEventListener('updatefound', () => {
        const newSW = state.swRegistration.installing;
        if (newSW) {
          _waitingSW = newSW;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              // في تحديث جاهز!
              console.log('[RM-Update] ✅ تحديث جديد جاهز للتثبيت');
              _showUpdateBanner();
            }
          });
        }
      });
    }

    console.log('[RM-Update] 🔄 نظام التحديث التلقائي مفعّل');
  }

  /** فحص وجود تحديث جديد */
  async function _checkForSWUpdate() {
    try {
      var _ov = document.getElementById && document.getElementById('riyadOverlay');
      if (_ov && _ov.style.display === 'flex') return;
    } catch(_) {}
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        // تحديث الـ registration لاكتشاف SW جديد
        await reg.update();
        
        // لو في SW منتظر → اعرض البانر
        if (reg.waiting) {
          _waitingSW = reg.waiting;
          _showUpdateBanner();
        }
      }

      // فحص إضافي: إرسال طلب للـ SW إنه يفحص هو كمان
      const sw = navigator.serviceWorker.controller;
      if (sw) {
        sw.postMessage({ type: 'FORCE_UPDATE_CHECK' });
      }
    } catch (e) {
      // خطأ في الفحص — مش مشكلة
    }
  }

  /** عرض بانر التحديث الجميل */
  function _showUpdateBanner() {
    if (_updateBannerShown) return;
    _updateBannerShown = true;

    // حقن CSS للبانر
    if (!document.getElementById('rm-update-css')) {
      const style = document.createElement('style');
      style.id = 'rm-update-css';
      style.textContent = `
        @keyframes rmUpdateSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes rmUpdatePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.4); }
          50% { box-shadow: 0 0 40px rgba(251,191,36,0.7); }
        }
        .rm-update-banner {
          position: fixed; bottom: 0; left: 0; right: 0;
          z-index: 100000;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-top: 2px solid #fbbf24;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          font-family: 'Tajawal', sans-serif;
          animation: rmUpdateSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 -4px 30px rgba(0,0,0,0.5);
        }
        .rm-update-icon {
          font-size: 36px; flex-shrink: 0;
          animation: rmUpdatePulse 2s ease-in-out infinite;
          border-radius: 50%;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(251,191,36,0.15), rgba(16,185,129,0.1));
          border: 1px solid rgba(251,191,36,0.3);
        }
        .rm-update-text { flex: 1; }
        .rm-update-title {
          color: #fbbf24; font-size: 16px; font-weight: 800;
          margin-bottom: 4px; text-shadow: 0 0 10px rgba(251,191,36,0.3);
        }
        .rm-update-desc {
          color: #94a3b8; font-size: 13px; font-weight: 500; line-height: 1.5;
        }
        .rm-update-btn {
          background: linear-gradient(135deg, #b45309, #fbbf24);
          color: #050b14; border: none;
          padding: 12px 24px; border-radius: 14px;
          font-size: 15px; font-weight: 800;
          cursor: pointer; font-family: 'Tajawal', sans-serif;
          transition: all 0.3s; flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(251,191,36,0.4);
        }
        .rm-update-btn:hover { transform: scale(1.05); box-shadow: 0 6px 25px rgba(251,191,36,0.6); }
        .rm-update-btn:active { transform: scale(0.98); }
        .rm-update-close {
          position: absolute; top: 8px; left: 8px;
          background: none; border: none; color: #64748b;
          font-size: 18px; cursor: pointer; padding: 4px;
        }
        .rm-update-close:hover { color: #ef4444; }
      `;
      document.head.appendChild(style);
    }

    const banner = document.createElement('div');
    banner.className = 'rm-update-banner';
    banner.innerHTML = `
      <div class="rm-update-icon">🚀</div>
      <div class="rm-update-text">
        <div class="rm-update-title">تحديث جديد متاح!</div>
        <div class="rm-update-desc">تم إضافة ميزات جديدة وتحسينات — اضغط للتحديث الآن</div>
      </div>
      <button class="rm-update-btn" onclick="window.RafiqMuslim.applyUpdate(this)">تحديث ⚡</button>
      <button class="rm-update-close" onclick="this.parentElement.remove()">✕</button>
    `;
    document.body.appendChild(banner);
  }

  /** تطبيق التحديث فوراً */
  function applyUpdate(btnEl) {
    // اختفاء فوري لزرار التحديث (ومنع أي ضغطة تانية عليه) لحظة الضغط
    if (btnEl) {
      btnEl.disabled = true;
      btnEl.textContent = 'جاري التحديث...';
      btnEl.style.opacity = '0.6';
      btnEl.style.pointerEvents = 'none';
    }
    // إخفاء البانر بالكامل فورًا
    try {
      const banner = document.querySelector('.rm-update-banner');
      if (banner) banner.remove();
    } catch (_) {}

    if (_waitingSW) {
      // اسمح بإعادة التحميل مرة واحدة بعد ضغط المستخدم على زر التحديث يدوياً
      window.__RM_ALLOW_RELOAD = true;

      // بعد ما الـ SW الجديد ياخد السيطرة، أعد تحميل الصفحة تلقائياً
      var _reloadedOnce = false;
      navigator.serviceWorker.addEventListener('controllerchange', function _onCtrlChange() {
        navigator.serviceWorker.removeEventListener('controllerchange', _onCtrlChange);
        if (_reloadedOnce) return;
        _reloadedOnce = true;
        window.location.reload();
      });

      // أرسل رسالة للـ SW المنتظر إنه ياخد السيطرة
      _waitingSW.postMessage({ type: 'SKIP_WAITING' });

      // شبكة أمان: لو حدث controllerchange ما جاش خلال ثانيتين (نادر بس ممكن)
      // اعمل reload يدوي عشان المستخدم ميفضلش واقف من غير أي رد فعل
      setTimeout(function () {
        if (!_reloadedOnce) {
          _reloadedOnce = true;
          window.location.reload();
        }
      }, 2000);
    } else {
      // مفيش SW منتظر — ده الوضع الطبيعي لما التحديث يكون في ملف عادي (زي
      // prayer-qibla-notif.js) مش في sw-rafiq.js نفسه. في الحالة دي
      // الكاش يبقى اتحدّث فعلاً جوه _checkForUpdate() قبل ما البانر يظهر،
      // فكل اللي محتاجينه هو إعادة تحميل الصفحة عشان تحمّل النسخة الجديدة.
      window.__RM_ALLOW_RELOAD = true;
      window.location.reload();
    }
  }

  /* ============================================================
     📲 تثبيت التطبيق — PWA Install Prompt
     ============================================================ */
  let _deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    _deferredInstallPrompt = e;
    // إظهار زر التثبيت لو موجود
    const installBtn = document.getElementById('rm-install-app-btn');
    if (installBtn) installBtn.style.display = 'flex';
  });

  window.addEventListener('appinstalled', () => {
    _deferredInstallPrompt = null;
    const installBtn = document.getElementById('rm-install-app-btn');
    if (installBtn) installBtn.style.display = 'none';
    showInAppToast('✅ تم التثبيت', 'تم تثبيت رفيق المسلم على جهازك', '📲');

    // علم "اقتراح AOD" — أول فتح بعد التثبيت نقترح شاشة العرض الدائم
    saveData(STORAGE_KEYS.aodSuggested, false);
  });

  /* ============================================================
     🌑 Always-On Display — شاشة الحارس الذكي المكثّف
     ───────────────────────────────────────────────────────────
     • شاشة سوداء فاترة لتوفير البطارية (AMOLED-friendly)
     • ساعة كبيرة + اسم الصلاة القادمة + عدّاد تنازلي
     • بدون Wake Lock (يحترم إعدادات الجهاز)
     • تفعيل: زرار يدوي + اقتراح تلقائي بعد التثبيت
     ============================================================ */
  let _aodInterval = null;

  function _isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: window-controls-overlay)').matches ||
      window.navigator.standalone === true
    );
  }

  function buildAODScreen() {
    let overlay = document.getElementById('rm-aod-overlay');
    if (overlay) overlay.remove();

    overlay = document.createElement('div');
    overlay.id = 'rm-aod-overlay';
    overlay.className = 'rm-aod-overlay';
    overlay.innerHTML = `
      <div class="rm-aod-breathe"></div>
      <div class="rm-aod-hint">اضغط في أي مكان للإغلاق</div>

      <div class="rm-aod-clock" id="rm-aod-clock">--:--</div>
      <div class="rm-aod-period" id="rm-aod-period">--</div>

      <div class="rm-aod-divider"></div>

      <div class="rm-aod-next-label">الصلاة القادمة</div>
      <div class="rm-aod-next-name" id="rm-aod-next-name">---</div>
      <div class="rm-aod-countdown" id="rm-aod-countdown">00:00:00</div>
      <div class="rm-aod-countdown-label">المتبقّي</div>

      <div class="rm-aod-footer">
        <div class="rm-aod-loc" id="rm-aod-loc">📍 ---</div>
        <div id="rm-aod-date">---</div>
      </div>
    `;

    // الضغط في أي مكان = إغلاق
    overlay.addEventListener('click', closeAOD);
    // منع الإغلاق العرضي بالسكرول
    overlay.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    document.body.appendChild(overlay);
  }

  function _aodTick() {
    if (!state.settings) state.settings = loadSettings();

    // الساعة الحالية
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const period = h >= 12 ? 'مساءً' : 'صباحاً';
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;

    const clockEl = document.getElementById('rm-aod-clock');
    const periodEl = document.getElementById('rm-aod-period');
    if (clockEl) clockEl.textContent = `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
    if (periodEl) periodEl.textContent = period;

    // الصلاة القادمة + العدّاد
    const PRAYERS = [
      { key: 'fajr',    name: 'الفجر'   },
      { key: 'duha',    name: 'الضحى'   },
      { key: 'dhuhr',   name: 'الظهر'   },
      { key: 'asr',     name: 'العصر'   },
      { key: 'maghrib', name: 'المغرب'  },
      { key: 'isha',    name: 'العشاء'  }
    ];

    let nextPrayer = null;
    let minMs = Infinity;

    if (state.currentTimes) {
      PRAYERS.forEach(p => {
        const t = state.currentTimes[p.key];
        if (!t) return;
        const pDate = prayerTimeToDate(t, now);
        const diff = pDate - now;
        if (diff > 0 && diff < minMs) { minMs = diff; nextPrayer = p; }
      });

      // لو كل صلوات اليوم عدّت → فجر الغد
      if (!nextPrayer) {
        nextPrayer = PRAYERS[0];
        const fajrTomorrow = prayerTimeToDate(state.currentTimes.fajr, now);
        minMs = fajrTomorrow - now;
      }
    }

    const nameEl  = document.getElementById('rm-aod-next-name');
    const cdEl    = document.getElementById('rm-aod-countdown');
    if (nameEl) nameEl.textContent = nextPrayer ? nextPrayer.name : '---';

    if (cdEl) {
      const totalSec = Math.max(0, Math.floor(minMs / 1000));
      const hh = Math.floor(totalSec / 3600);
      const mm = Math.floor((totalSec % 3600) / 60);
      const ss = totalSec % 60;
      cdEl.textContent =
        `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
    }

    // التاريخ + الموقع
    const locEl = document.getElementById('rm-aod-loc');
    if (locEl) {
      const loc = state.settings.location;
      locEl.textContent = `📍 ${loc.city}، ${loc.country}`;
    }

    const dateEl = document.getElementById('rm-aod-date');
    if (dateEl) {
      try {
        const fmt = new Intl.DateTimeFormat('ar-EG', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
        dateEl.textContent = fmt.format(now);
      } catch (e) {
        dateEl.textContent = now.toLocaleDateString('ar-EG');
      }
    }
  }

  function openAOD() {
    try {
      if (!state.settings) state.settings = loadSettings();
      buildAODScreen();
      const overlay = document.getElementById('rm-aod-overlay');
      if (!overlay) return;

      // لو مفيش مواقيت محمّلة، نجلبها في الخلفية
      if (!state.currentTimes) {
        refreshPrayerTimes().catch(() => {});
      }

      // أول تحديث فوري، ثم كل ثانية
      _aodTick();
      if (_aodInterval) clearInterval(_aodInterval);
      _aodInterval = setInterval(() => { if (!document.hidden) _aodTick(); }, 1000);

      // إظهار الشاشة
      requestAnimationFrame(() => overlay.classList.add('show'));

      // محاولة منع التعتيم التلقائي لو المتصفح يدعم Wake Lock
      // (المستخدم اختار "لا، حرّ" — لكن نحاول بأقل مستوى للأمان فقط)
      // لو المستخدم ما يريدها، يقدر يضغط للإغلاق
      console.log('[RM-AOD] 🌑 شاشة العرض الدائم مُفعَّلة');
    } catch (e) {
      console.error('[RM-AOD] خطأ في openAOD:', e);
    }
  }

  function closeAOD() {
    const overlay = document.getElementById('rm-aod-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 400);
    }
    if (_aodInterval) {
      clearInterval(_aodInterval);
      _aodInterval = null;
    }
  }

  /** اقتراح تلقائي لـ AOD بعد التثبيت */
  function _maybeSuggestAOD() {
    // لا نقترح إلا لو التطبيق مثبَّت فعلاً
    if (!_isStandalone()) return;

    const suggested = loadData(STORAGE_KEYS.aodSuggested, false);
    if (suggested) return;

    // نقترح مرة واحدة فقط
    saveData(STORAGE_KEYS.aodSuggested, true);

    setTimeout(() => {
      showInAppToast(
        '🌑 شاشة العرض الدائم',
        'تقدر تخلي شاشة مواقيت الصلاة باقية على المنضدة — اضغط "وضع العرض" في صفحة المواقيت',
        '🌙'
      );
    }, 3000);
  }

  async function promptInstallApp() {
    if (!_deferredInstallPrompt) {
      showInAppToast('ℹ️ التثبيت', 'التطبيق مثبَّت بالفعل أو غير متاح التثبيت الآن', '📲');
      return;
    }
    _deferredInstallPrompt.prompt();
    await _deferredInstallPrompt.userChoice;
    _deferredInstallPrompt = null;
  }

  /* ============================================================
     🌍 الواجهة العامة العالمية
     ============================================================ */
  window.RafiqMuslim = {
    // تسجيل الخدمة الخلفية
    registerServiceWorker,
    sendScheduleToSW,
    sendSettingsToSW,
    getSWStatus: () => ({
      supported:  'serviceWorker' in navigator,
      registered: !!state.swRegistration,
      active:     !!navigator.serviceWorker?.controller
    }),
    openPrayerTimes,
    closePrayerTimes,
    refreshPrayerTimes,
    syncGridHighlight,
    
    // الموقع
    openLocationModal: buildLocationModal,
    closeLocationModal,
    onCountryChange,
    saveLocation,
    useGPS,
    
    // يدوي
    openManualModal: buildManualModal,
    closeManualModal,
    saveManualTimes,
    disableManualMode,
    
    // القبلة
    openQiblaModal: buildQiblaModal,
    closeQiblaModal,
    activateCompass,
    resetQiblaLock,
    
    // التنبيهات
    openNotifModal: buildNotifModal,
    closeNotifModal,
    toggleSetting,
    updateVolumeUI,
    setVolumePreset,
    adjustCounter,
    saveNotifSettings,
    testNotif,
    testSWNotif,
    selectPreAzanSound,
    testPreAzanSound,
    
    // الأذكار
    openAthkarTimesModal: buildAthkarTimesModal,
    closeAthkarModal,
    saveAthkarTimes,
    
    // الأذان
    stopAzan: closeAzanModal,
    playAzan,
    playPreAzanSound,
    playPostAzanSound,
    playNotifSound,
    playTasbeehSound,
    playAlarmSound,

    // الإقامة
    playIqama,
    closeIqamaModal,

    // كاش الصوت
    prefetchAllAudio,

    // الحارس الذكي
    disableSmartPrayerGuardian,
    armSmartPrayerGuardian,
    releaseSmartPrayerGuardian,

    // تثبيت التطبيق PWA
    promptInstallApp,

    // التحديث التلقائي
    applyUpdate,
    checkForUpdate: _checkForSWUpdate,

    // Always-On Display
    openAOD,
    closeAOD,
    isStandalone: _isStandalone,
    
    // معلومات
    getState: () => state,
    getSettings: () => state.settings
  };

  /* ============================================================
     ▶️ بدء التشغيل
     ============================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();