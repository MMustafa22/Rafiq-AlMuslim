/* د. إبراهيم الفقي — سلسلة «الطريق إلى النجاح» (28 حلقة).
   نفس أسلوب صفحة خواطر الشعراوي: استماع مباشر، تنزيل للجهاز، وحفظ داخل التطبيق للاستماع دون إنترنت.
   ملفات الصوت تبقى على Internet Archive ولا تُضمَّن في تحديث التطبيق. */
(function(){
'use strict';
if(window.__RFQ_FEKI__)return;
window.__RFQ_FEKI__=true;

var SOURCE='https://archive.org/details/Tareq-alnaja7';
var ARCHIVE='https://archive.org/download/Tareq-alnaja7/';
var SIZES=[6409787,6476870,6668504,6841121,6414803,6984063,6522845,6739766,6775710,6129127,6716151,6767142,6975913,6614796,5973229,6406234,6834016,6167789,5887756,7024605,6835270,6879573,6985357,6927847,6945820,7181340,6655547,8128475];
/* مواضيع الحلقات (من قائمة القناة الرسمية لبرنامج طريق النجاح) */
var TOPICS=["فن الاتصال","تحسين الدخل","أهمية شرب المياه","القيم","القرار والاختيار والمسؤولية","العلاقات بالآخرين","الرضا والاستمتاع","التميز","الثقة في النفس","التسامح","الاهتمام العائلي","أين أنت الآن","الاستحقاق","اعرف شخصيتك","المرونة التامة","أضرار التدخين","معنى الحياة","سامح نفسك","حسّن نفسك","حب الأخوة","ترتيب القيم","اهتم بصحتك","إنجازاتك الشخصية","العطاء بالمال","الحب","التعلم من الماضي","استقلال الشخصية","الإصرار على النجاح"];
var items=[];
for(var n=1;n<=28;n++){
  var pad=('00'+n).slice(-3);
  items.push({id:n,file:'الطريق إلى النجاح - الحلقة '+pad+'.mp3',title:TOPICS[n-1]||('الحلقة '+pad),topic:TOPICS[n-1]||'',ep:'الحلقة '+pad,size:SIZES[n-1]||0,url:ARCHIVE+pad+'.mp3'});
}
var CATALOG={source:SOURCE,items:items};

var DB='rafiq-feki-offline-v1', STORE='episodes', PAGE_SIZE=30, page=0, query='', onlySaved=false, saved=new Set(), currentUrl=null, audio=null, currentEpisode=null, bulkRunning=false, bulkCancel=false;

var css='#feki.page{padding-bottom:40px}.fk-wrap{max-width:900px;margin:0 auto;padding:18px 14px 32px;direction:rtl}'+
'.fk-head{border-radius:22px;padding:24px 20px;text-align:center;background:linear-gradient(145deg,rgba(37,52,86,.97),rgba(12,30,44,.97));border:1px solid rgba(214,177,92,.38);box-shadow:0 14px 36px rgba(0,0,0,.18);color:#f8edce}'+
'.fk-head .fk-em{font-size:2.1rem}.fk-head h1{font-family:Tajawal,sans-serif;font-size:1.6rem;margin:6px 0;color:#f1d18a}.fk-head p{margin:5px auto;line-height:1.8;max-width:660px;color:#e5e7eb}'+
'.fk-meta{font-size:.82rem;color:#cbd5e1}.fk-cite{margin:12px 0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);padding:10px 13px;border-radius:12px;line-height:1.7;font-size:.78rem}.fk-cite a{color:#f4d58d}'+
'.fk-controls{display:grid;grid-template-columns:1fr 200px;gap:9px;margin:14px 0}.fk-controls input{width:100%;border:1px solid rgba(212,175,55,.35);border-radius:12px;padding:11px 12px;background:var(--panel-input-bg,#fff);color:var(--panel-input-text,#14202b);font:inherit}'+
'.fk-filter{display:flex;gap:7px;overflow:auto;padding:1px 0 8px}.fk-pill,.fk-pagebtn,.fk-action{border:1px solid rgba(212,175,55,.35);border-radius:999px;background:rgba(212,175,55,.08);color:var(--text-primary,#e5e7eb);padding:8px 12px;font:700 .78rem Tajawal,sans-serif;white-space:nowrap;cursor:pointer}'+
'.fk-pill.on{background:#caa95c;color:#14221c}'+
'.fk-now{position:sticky;top:6px;z-index:12;border-radius:14px;padding:10px;margin:10px 0;background:rgba(11,31,28,.97);border:1px solid rgba(212,175,55,.45);color:#f6edda;box-shadow:0 8px 20px #0002}.fk-now[hidden]{display:none}.fk-now strong{display:block;font-size:.83rem;margin-bottom:6px}.fk-now audio{width:100%;height:38px}'+
'.fk-list{display:grid;gap:9px;margin:10px 0}.fk-episode{padding:12px;border:1px solid rgba(148,163,184,.2);border-radius:14px;background:var(--panel-card-bg,rgba(255,255,255,.055));display:grid;grid-template-columns:1fr auto;gap:5px 10px;align-items:center}'+
'.fk-title{font-weight:800;line-height:1.7;color:var(--text-primary,#eef2f7);font-size:.9rem}.fk-sub{font-size:.7rem;color:var(--text-secondary,#94a3b8)}'+
'.fk-actions{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}.fk-action{padding:7px 10px;font-size:.71rem}'+
'.fk-action.play{background:rgba(16,185,129,.15);border-color:rgba(16,185,129,.5);color:#34d399}.fk-action.save{background:rgba(212,175,55,.15);color:#f2d68d}.fk-action.saved{background:rgba(16,185,129,.18);border-color:#10b981;color:#34d399}.fk-action:disabled{opacity:.5;cursor:wait}'+
'.fk-paging{display:flex;align-items:center;justify-content:center;gap:10px;margin:15px 0}.fk-empty,.fk-status{text-align:center;padding:14px;color:var(--text-secondary,#a8b1bd);font-size:.82rem}.fk-status{min-height:28px}'+
'.fk-safe{font-size:.71rem;line-height:1.7;color:var(--text-secondary,#9ca3af);margin-top:10px}.fk-back{display:inline-block;margin:0 0 12px;border:1px solid rgba(212,175,55,.4);border-radius:999px;background:rgba(212,175,55,.1);color:inherit;font:800 .82rem Tajawal,sans-serif;padding:8px 14px;cursor:pointer}.fk-back:focus-visible{outline:3px solid #f4c95d;outline-offset:3px}'+
'.fk-storage{font-size:.76rem;line-height:1.75;color:#0b3b2a;background:#d7f5e3;border:1px solid #7dd3ae;padding:9px 12px;border-radius:12px;margin:10px 0}'+
'.fk-bulk-bar{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:12px 0}.fk-bulk-bar span{font-size:.73rem;color:#f1d18a}'+
'.fk-bulk-button{font-weight:800!important;background:rgba(16,185,129,.16)!important;border-color:rgba(16,185,129,.55)!important;color:#a7f3d0!important}.fk-bulk-button:hover{filter:brightness(1.15)}'+
'.fk-now-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px}'+
'.fk-car-btn{display:inline-block;border:1px solid rgba(212,175,55,.45);border-radius:999px;background:rgba(212,175,55,.14);color:inherit;font:800 .74rem Tajawal,sans-serif;padding:6px 12px;cursor:pointer;white-space:nowrap}.fk-car-btn:focus-visible{outline:3px solid #f4c95d;outline-offset:3px}'+
' @media(max-width:560px){.fk-controls{grid-template-columns:1fr}.fk-episode{grid-template-columns:1fr}.fk-actions{justify-content:flex-start}.fk-action{flex:1}.fk-head h1{font-size:1.35rem}}';

function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ar(n){return Number(n||0).toLocaleString('ar-EG')}

function dbOpen(){return new Promise(function(resolve,reject){var req=indexedDB.open(DB,1);req.onupgradeneeded=function(){var d=req.result;if(!d.objectStoreNames.contains(STORE))d.createObjectStore(STORE,{keyPath:'file'})};req.onsuccess=function(){resolve(req.result)};req.onerror=function(){reject(req.error)}})}
function tx(mode,fn){return dbOpen().then(function(d){return new Promise(function(resolve,reject){var t=d.transaction(STORE,mode),s=t.objectStore(STORE),r=fn(s);t.oncomplete=function(){d.close();resolve(r&&r.result)};t.onerror=function(){d.close();reject(t.error)};t.onabort=function(){d.close();reject(t.error)}})})}
function getSaved(file){return tx('readonly',function(s){return s.get(file)}).then(function(v){return v||null})}
function refreshSaved(){return tx('readonly',function(s){return s.getAllKeys()}).then(function(keys){saved=new Set(keys);render()}).catch(function(){});}

function status(t){var e=document.getElementById('fkStatus');if(e)e.textContent=t||''}
function filtered(){var q=query.trim().toLocaleLowerCase('ar');return CATALOG.items.filter(function(x){return (!onlySaved||saved.has(x.file))&&(q===''||(x.title+' '+x.topic+' '+x.file).toLocaleLowerCase('ar').indexOf(q)>=0)})}

function render(){
  var list=document.getElementById('fkList');if(!list)return;
  var arr=filtered(),max=Math.max(0,Math.ceil(arr.length/PAGE_SIZE)-1);
  page=Math.min(page,max);
  var subset=arr.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  document.getElementById('fkCount').textContent=ar(arr.length)+' حلقة مطابقة من '+ar(CATALOG.items.length);
  list.innerHTML=subset.map(function(x){
    var isSaved=saved.has(x.file);
    return '<article class="fk-episode"><div><div class="fk-title">'+esc(x.ep+' · '+(x.topic||x.title))+'</div><div class="fk-sub">'+esc(x.file.replace(/\.mp3$/i,''))+' · '+(x.size/1048576).toFixed(1)+' ميجابايت</div></div><div class="fk-actions">'+
      '<button class="fk-action play" data-act="play" data-id="'+x.id+'">▶ استماع</button>'+
      '<button class="fk-action" data-act="download" data-id="'+x.id+'" title="تنزيل ملف MP3 مستقل إلى جهازك">⬇ تنزيل للجهاز</button>'+
      '<button class="fk-action save '+(isSaved?'saved':'')+'" data-act="save" data-id="'+x.id+'">'+(isSaved?'✓ محفوظة دون إنترنت':'حفظ دون إنترنت')+'</button>'+
      (isSaved?'<button class="fk-action" data-act="remove" data-id="'+x.id+'">حذف النسخة المحفوظة</button>':'')+
    '</div></article>';
  }).join('')||'<div class="fk-empty">لا توجد حلقات مطابقة للبحث.</div>';
  document.getElementById('fkPageLabel').textContent=ar(page+1)+' / '+ar(max+1);
  document.getElementById('fkPrev').disabled=page<=0;
  document.getElementById('fkNext').disabled=page>=max;
}

function notifyOther(){try{if(window.rfqNotifyAudioStart==='function')window.rfqNotifyAudioStart('feki')}catch(e){}}
function showNow(title){document.getElementById('fkNowTitle').textContent=title;var now=document.getElementById('fkNow');now.hidden=false;try{now.scrollIntoView({behavior:'smooth',block:'nearest'})}catch(e){}}

function playLocalBlob(blob,title){currentEpisode=null;notifyOther();var src=URL.createObjectURL(blob);if(currentUrl){try{URL.revokeObjectURL(currentUrl)}catch(e){}}currentUrl=src;audio.src=src;audio.play().catch(function(){status('تم تجهيز الحلقة؛ اضغط تشغيل من المشغّل لبدء الاستماع.')});showNow(title)}
function playItem(x){
  getSaved(x.file).then(function(rec){
    if(rec&&rec.blob){saved.add(x.file);playLocalBlob(rec.blob,x.file);status('تشغيل النسخة المحفوظة داخل التطبيق — تعمل دون إنترنت.');return}
    notifyOther();
    if(currentUrl){try{URL.revokeObjectURL(currentUrl)}catch(e){}currentUrl=null}
    currentEpisode=x;audio.src=x.url;audio.load();
    audio.play().catch(function(){status('اضغط تشغيل من المشغّل، أو تحقق من الاتصال بالمصدر.')});
    showNow(x.file);
    status('تشغيل مباشر من Internet Archive. بعد اكتمال الحلقة سيُحفظ ملفها تلقائيًا للاستماع دون إنترنت.');
  }).catch(function(){
    currentEpisode=x;audio.src=x.url;audio.play().catch(function(){});showNow(x.file);
    status('تشغيل مباشر من المصدر؛ تعذر التحقق من النسخة المحفوظة.');
  });
}

function cacheFinishedEpisode(x){
  var persistent=Promise.resolve(false);
  try{if(navigator.storage&&navigator.storage.persist)persistent=navigator.storage.persist()}catch(e){}
  getSaved(x.file).then(function(rec){
    if(rec&&rec.blob){saved.add(x.file);render();status('الحلقة محفوظة بالفعل للاستماع دون إنترنت.');return}
    status('اكتمل الاستماع. جارٍ حفظ نسخة كاملة دون إنترنت — اترك الاتصال حتى تظهر رسالة اكتمال الحفظ.');
    return Promise.resolve(persistent).catch(function(){return false}).then(function(){
      return fetch(x.url,{mode:'cors'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob()}).then(function(blob){
        if(!blob.size)throw new Error('الملف فارغ');
        return tx('readwrite',function(st){return st.put({file:x.file,title:x.title,blob:blob,size:blob.size,savedAt:Date.now()})});
      });
    }).then(function(){saved.add(x.file);render();status('تم حفظ '+x.file+' داخل التطبيق. تقدر تسمعها بعد كده من غير إنترنت.')});
  }).catch(function(e){status('انتهت الحلقة لكن تعذر حفظها للاستماع دون إنترنت ('+(e.message||'')+'). استخدم «حفظ دون إنترنت» أو «تنزيل للجهاز».')});
}

function saveItem(x,btn){
  btn.disabled=true;btn.textContent='جارٍ التنزيل والحفظ…';
  status('يتم تنزيل الحلقة ('+(x.size/1048576).toFixed(1)+' ميجابايت) وحفظها محليًا. لا تغلق الصفحة حتى يكتمل.');
  var persist=Promise.resolve(false);
  try{if(navigator.storage&&navigator.storage.persist)persist=navigator.storage.persist()}catch(e){}
  Promise.resolve(persist).catch(function(){return false}).then(function(persistent){
    return fetch(x.url,{mode:'cors'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob()}).then(function(blob){
      if(!blob.size)throw new Error('empty');
      return tx('readwrite',function(s){return s.put({file:x.file,title:x.title,blob:blob,size:blob.size,savedAt:Date.now()})}).then(function(){return persistent});
    });
  }).then(function(persistent){
    saved.add(x.file);
    status('تم حفظ الحلقة على هذا الجهاز. '+(persistent?'وافق المتصفح على طلب حماية التخزين من الإزالة التلقائية.':'قد يحذف المتصفح النسخة عند الحاجة إلى مساحة؛ ومسح بيانات الموقع يحذفها. تنزيل الملف للجهاز يظل الأوثق.'));
    render();
  }).catch(function(e){btn.disabled=false;btn.textContent='حفظ دون إنترنت';status('تعذر الحفظ داخل التطبيق ('+(e.message||'خطأ')+'). استخدم «تنزيل للجهاز» أو جرّب بعد الاتصال.');});
}

function downloadItem(x,btn){
  btn.disabled=true;btn.textContent='جارٍ تجهيز التنزيل…';
  status('إذا كانت الحلقة محفوظة في مكتبة التطبيق فسنستخدم النسخة نفسها؛ وإلا ننزّلها الآن إلى جهازك.');
  getSaved(x.file).catch(function(){return null}).then(function(rec){
    if(rec&&rec.blob)return rec.blob;
    return fetch(x.url,{mode:'cors'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob()});
  }).then(function(blob){
    var u=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=u;a.download=x.file;document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(u)},60000);
    btn.disabled=false;btn.textContent='⬇ تنزيل للجهاز';
    status('بدأ تنزيل '+x.title+' كملف مستقل إلى مجلد التنزيلات في جهازك.');
  }).catch(function(e){
    btn.disabled=false;btn.textContent='⬇ تنزيل للجهاز';
    status('تعذر التنزيل داخل الصفحة؛ افتح مصدر الأرشيف مباشرة. '+(e.message||''));
    window.open(x.url+'?download=1','_blank','noopener');
  });
}

function removeItem(x){
  tx('readwrite',function(s){return s.delete(x.file)}).then(function(){
    saved.delete(x.file);status('حُذفت النسخة المحفوظة من التطبيق فقط؛ الملف الأصلي على الإنترنت لم يتأثر.');render();
  }).catch(function(){status('تعذر حذف النسخة المحلية.')});
}

function sleep(ms){return new Promise(function(resolve){setTimeout(resolve,ms)})}
function bulkButton(){return document.getElementById('fkDownloadAll')}
function downloadAllEpisodes(){
  if(bulkRunning){bulkCancel=true;status('جارٍ إيقاف التنزيل بعد الملف الحالي…');return}
  var total=CATALOG.items.reduce(function(a,x){return a+(Number(x.size)||0)},0);
  if(!window.confirm('سيبدأ تنزيل '+ar(CATALOG.items.length)+' ملف MP3 بحجم إجمالي يقارب '+(total/1048576).toFixed(1)+' ميجابايت. تأكد من توفر مساحة كافية واتصال ثابت. هل تريد المتابعة؟'))return;
  bulkRunning=true;bulkCancel=false;
  var btn=bulkButton();if(btn)btn.textContent='إيقاف تنزيل الكل';
  var folderPromise=Promise.resolve(null);
  if(window.showDirectoryPicker&&window.isSecureContext){try{folderPromise=window.showDirectoryPicker({mode:'readwrite'}).catch(function(e){if(e&&e.name==='AbortError')throw e;return null})}catch(e){folderPromise=Promise.resolve(null)}}
  folderPromise.then(function(folder){
    var list=CATALOG.items;
    function report(i,x){if(i===1||i%5===0||i===list.length)status('تنزيل السلسلة: '+ar(i)+' / '+ar(list.length)+' — '+x.file+(folder?' (إلى المجلد الذي اخترته)':' (قد يطلب المتصفح السماح بالتنزيلات المتعددة)'))}
    function getBulkBlob(x){
      if(!saved.has(x.file))return fetch(x.url,{mode:'cors'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob()});
      return getSaved(x.file).catch(function(){return null}).then(function(rec){if(rec&&rec.blob)return rec.blob;return fetch(x.url,{mode:'cors'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.blob()})});
    }
    function writeBlobToHandle(blob,handle){
      return handle.createWritable().then(function(w){
        if(!blob.stream){return blob.arrayBuffer().then(function(b){return w.write(b).then(function(){return w.close()})})}
        var reader=blob.stream().getReader();
        function pump(){if(bulkCancel)return reader.cancel().then(function(){return w.abort()});return reader.read().then(function(v){if(v.done)return w.close();return w.write(v.value).then(pump)})}
        return pump();
      });
    }
    function oneToFolder(x){return getBulkBlob(x).then(function(blob){return folder.getFileHandle(x.file,{create:true}).then(function(h){return writeBlobToHandle(blob,h)})})}
    function oneAsDownload(x){return getBulkBlob(x).then(function(blob){var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=x.file;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},120000)})}
    var chain=Promise.resolve();
    list.forEach(function(x,i){chain=chain.then(function(){if(bulkCancel)return;report(i+1,x);return (folder?oneToFolder(x):oneAsDownload(x)).then(function(){if(!folder)return sleep(1100)}).catch(function(e){bulkCancel=true;throw new Error(x.file+': '+(e.message||'تعذر التنزيل'))})})});
    return chain.then(function(){status(bulkCancel?'تم إيقاف التنزيل بناءً على طلبك. الملفات التي اكتملت موجودة في المجلد/التنزيلات.':'اكتمل تنزيل جميع ملفات السلسلة ('+ar(list.length)+' ملف).')})
      .catch(function(e){status('توقف التنزيل عند '+(e.message||'خطأ')+'. يمكنك الضغط على «تنزيل السلسلة كلها» للبدء من جديد أو تنزيل الحلقة منفردة.')})
      .finally(function(){bulkRunning=false;bulkCancel=false;if(btn)btn.textContent='⬇ تنزيل السلسلة كلها'});
  }).catch(function(e){
    bulkRunning=false;bulkCancel=false;if(btn)btn.textContent='⬇ تنزيل السلسلة كلها';
    status(e&&e.name==='AbortError'?'أُلغيت عملية اختيار المجلد.':'تعذر بدء التنزيل الجماعي.');
  });
}

function fkStep(dir){var arr=filtered();if(!arr.length)return;var idx=currentEpisode?arr.indexOf(currentEpisode):-1;if(idx<0)idx=dir<0?0:-1;var next=arr[(idx+dir+arr.length)%arr.length];if(next)playItem(next)}
function fkCarState(){var now=document.getElementById('fkNowTitle');var name=(currentEpisode&&currentEpisode.file)||(now&&now.textContent)||'اختر حلقة من القائمة';return {title:name,sub:'الطريق إلى النجاح — د. إبراهيم الفقي',playing:!!(audio&&!audio.paused),time:audio?audio.currentTime:0,duration:audio?audio.duration:0}}
function fkCarToggle(){if(!audio||!audio.src)return;if(audio.paused)audio.play().catch(function(){});else audio.pause()}
function openFkCar(){if(!window.RafiqCar)return;RafiqCar.open({audio:audio,getState:fkCarState,prev:function(){fkStep(-1)},next:function(){fkStep(1)},toggle:fkCarToggle})}

function ensureUI(){
  if(document.getElementById('feki'))return;
  var style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
  var total=CATALOG.items.reduce(function(a,x){return a+(Number(x.size)||0)},0);
  var p=document.createElement('section');p.id='feki';p.className='container page';
  p.innerHTML='<div class="fk-wrap"><button class="fk-back" onclick="shPg(\'mainApp\')">← رجوع للرئيسية</button>'+
    '<header class="fk-head"><div class="fk-em">🎧</div><h1>د. إبراهيم الفقي</h1>'+
    '<p>سلسلة «الطريق إلى النجاح» كاملة — ٢٨ حلقة صوتية في تطوير الذات والنجاح. استمع مباشرة، أو نزّل الحلقة على جهازك، أو احفظها داخل التطبيق للاستماع دون إنترنت.</p>'+
    '<div class="fk-meta" id="fkCount">جارٍ تجهيز فهرس الحلقات…</div>'+
    '<div class="fk-bulk-bar"><button type="button" class="fk-action fk-bulk-button" id="fkDownloadAll">⬇ تنزيل السلسلة كلها</button><span>٢٨ حلقة · الحجم التقريبي '+(total/1048576).toFixed(0)+' ميجابايت</span></div>'+
    '<div class="fk-cite">مصدر التسجيلات: <a href="'+SOURCE+'" target="_blank" rel="noopener">Internet Archive — سلسلة طريق النجاح للدكتور إبراهيم الفقي</a>. يتم التشغيل والتنزيل من المصدر مباشرة ولا تُضمّن ملفات الصوت ضمن تحديث التطبيق.</div></header>'+
    '<div class="fk-storage" id="fkStorage">الحلقات المحفوظة تبقى في مساحة هذا المتصفح بعد تحديث التطبيق ما دام التطبيق يعمل على النطاق نفسه ولم تُمسح بيانات الموقع. لتنزيل دائم خارج التطبيق اختر «تنزيل للجهاز».</div>'+
    '<div class="fk-now" id="fkNow" hidden><div class="fk-now-head"><strong id="fkNowTitle"></strong><button type="button" class="fk-car-btn" id="fkCarBtn">🚗 شاشة السيارة</button></div><audio id="fkAudio" controls preload="none"></audio></div>'+
    '<div class="fk-controls"><input id="fkSearch" type="search" placeholder="ابحث برقم الحلقة…" aria-label="ابحث في الحلقات"></div>'+
    '<div class="fk-filter"><button class="fk-pill on" id="fkAll">كل الحلقات</button><button class="fk-pill" id="fkSaved">المحفوظة دون إنترنت</button></div>'+
    '<div class="fk-status" id="fkStatus" aria-live="polite"></div>'+
    '<div class="fk-list" id="fkList"></div>'+
    '<div class="fk-paging"><button class="fk-pagebtn" id="fkPrev">السابق</button><span id="fkPageLabel"></span><button class="fk-pagebtn" id="fkNext">التالي</button></div>'+
    '<div class="fk-safe">الزر «تنزيل للجهاز» ينزّل الملف من الأرشيف إلى جهازك. «حفظ دون إنترنت» يخزّنه في بيانات الموقع لهذا المتصفح؛ وهذا التخزين مستقل عن ملفات البرنامج، لكنه قد يتأثر بمسح بيانات المتصفح أو امتلاء المساحة. الحجم الكامل للسلسلة يقارب '+(total/1048576).toFixed(0)+' ميجابايت.</div></div>';
  document.body.appendChild(p);

  audio=document.getElementById('fkAudio');
  audio.addEventListener('ended',function(){var x=currentEpisode;currentEpisode=null;if(x)cacheFinishedEpisode(x)});
  document.getElementById('fkDownloadAll').addEventListener('click',downloadAllEpisodes);
  var carBtn=document.getElementById('fkCarBtn');if(carBtn)carBtn.addEventListener('click',openFkCar);
  document.getElementById('fkSearch').addEventListener('input',function(){query=this.value;page=0;render()});
  document.getElementById('fkPrev').onclick=function(){page=Math.max(0,page-1);render()};
  document.getElementById('fkNext').onclick=function(){page++;render()};
  document.getElementById('fkAll').onclick=function(){onlySaved=false;document.getElementById('fkSaved').classList.remove('on');this.classList.add('on');page=0;render()};
  document.getElementById('fkSaved').onclick=function(){onlySaved=true;document.getElementById('fkAll').classList.remove('on');this.classList.add('on');page=0;render()};
  document.getElementById('fkList').addEventListener('click',function(e){
    var b=e.target.closest('[data-act]');if(!b)return;
    var x=CATALOG.items.filter(function(q){return String(q.id)===b.dataset.id})[0];if(!x)return;
    if(b.dataset.act==='play')playItem(x);
    if(b.dataset.act==='save')saveItem(x,b);
    if(b.dataset.act==='download')downloadItem(x,b);
    if(b.dataset.act==='remove')removeItem(x);
  });
  render();
  refreshSaved();
}

window.openFeki=function(){
  try{ensureUI()}catch(e){if(window.console)console.error('[feki]',e)}
  if(typeof shPg==='function')shPg('feki');
};
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest?e.target.closest('#btnFeki'):null;
  if(!t)return;
  e.preventDefault();
  window.openFeki();
});

function init(){try{ensureUI()}catch(e){if(window.console)console.error('[feki]',e)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.addEventListener('beforeunload',function(){if(currentUrl)try{URL.revokeObjectURL(currentUrl)}catch(e){}});
})();
