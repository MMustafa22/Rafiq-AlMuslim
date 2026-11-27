/* رفيق المسلم — شاشة السيارة المشتركة (الابتهالات وخواطر الشعراوي).
   شاشة ملء الشاشة بأزرار كبيرة، مع إبقاء الشاشة مضاءة، وإخفاء الشاشة لتوفير البطارية. */
(function(){
'use strict';
if(window.RafiqCar)return;
var EVENTS=['timeupdate','play','pause','ended','loadedmetadata'];
var STYLE='.rfq-car{position:fixed;inset:0;z-index:100100;display:flex;align-items:center;justify-content:center;padding:18px;background:radial-gradient(circle at 50% 15%,#123028,#050b14 72%);color:#f8edce;direction:rtl}.rfq-car[hidden]{display:none}.rfq-car-inner{width:min(780px,100%);display:flex;flex-direction:column;gap:14px;text-align:center}.rfq-car-badge{font:800 .78rem Tajawal,sans-serif;color:#9fb0c6}.rfq-car-sub{font:800 .9rem Tajawal,sans-serif;color:#f1d18a;min-height:1.2em}.rfq-car-title{font:900 clamp(1.1rem,2.6vw,1.7rem)/1.6 Tajawal,sans-serif;color:#fff;min-height:2.2em;display:flex;align-items:center;justify-content:center}.rfq-car-ctrl{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:4px}.rfq-car-ctrl button{width:clamp(82px,16vw,118px);height:clamp(82px,16vw,118px);border-radius:50%;border:2px solid rgba(244,201,93,.55);background:linear-gradient(160deg,rgba(244,201,93,.22),rgba(16,185,129,.12));color:#ffe39a;font-size:clamp(1.7rem,5vw,2.5rem);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}.rfq-car-ctrl button:active{transform:scale(.94)}.rfq-car-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:6px}.rfq-car-row button{min-height:60px;border-radius:16px;border:1px solid rgba(212,175,55,.35);background:rgba(255,255,255,.05);color:#f8edce;font:800 .9rem Tajawal,sans-serif;cursor:pointer}.rfq-car-time{font:800 .95rem Tajawal,sans-serif;color:#9fb0c6;font-variant-numeric:tabular-nums}.rfq-car-blank{position:fixed;inset:0;z-index:100200;background:#000;color:#1f2937;display:flex;align-items:center;justify-content:center;font:800 .9rem Tajawal,sans-serif;cursor:pointer}.rfq-car-blank[hidden]{display:none}html[data-rafiq-theme="light"] .rfq-car{background:radial-gradient(circle at 50% 12%,#fffef9,#f2e8d3 72%);color:#1f2a24}html[data-rafiq-theme="light"] .rfq-car-badge{color:#356b52}html[data-rafiq-theme="light"] .rfq-car-sub{color:#7a5410}html[data-rafiq-theme="light"] .rfq-car-title{color:#12261c;text-shadow:none}html[data-rafiq-theme="light"] .rfq-car-time{color:#43544b}html[data-rafiq-theme="light"] .rfq-car-ctrl button{border:2px solid #a67c1a;background:linear-gradient(160deg,#ffeab4,#e9cf92);color:#46320a;box-shadow:0 6px 16px rgba(120,88,23,.22),inset 0 1px 0 #fff8e2}html[data-rafiq-theme="light"] .rfq-car-row button{border:1px solid rgba(140,102,18,.45);background:#fffdf7;color:#2b2115;box-shadow:0 3px 10px rgba(120,88,23,.12)}html[data-rafiq-theme="light"] .rfq-car-row button:active{background:#f3e6c6}html[data-rafiq-theme="light"] .rfq-car-blank{background:#fdfaf2;color:#3a3226}';
var MARKUP='<div class="rfq-car" id="rfqCar" hidden><div class="rfq-car-inner"><div class="rfq-car-badge">🚗 شاشة السيارة</div><div class="rfq-car-sub" id="rfqCarSub"></div><div class="rfq-car-title" id="rfqCarTitle">اختر ما تسمعه</div><div class="rfq-car-ctrl"><button type="button" data-car="prev" aria-label="السابق">⏮</button><button type="button" data-car="toggle" id="rfqCarToggle" aria-label="تشغيل أو إيقاف">▶</button><button type="button" data-car="next" aria-label="التالي">⏭</button></div><div class="rfq-car-row"><button type="button" data-car="minus">− 10 ثوان</button><button type="button" data-car="plus">+ 10 ثوان</button><button type="button" data-car="hide">🌙 إخفاء الشاشة</button><button type="button" data-car="close">✕ خروج</button></div><div class="rfq-car-time" id="rfqCarTime"></div></div></div><div class="rfq-car-blank" id="rfqCarBlank" hidden>اضغط في أي مكان لإظهار الشاشة</div>';
var isOpen=false,opts=null,wake=null,timer=null,rootEl=null,blankEl=null,prevOverflow=null;
function $(id){return document.getElementById(id)}
function fmt(s){s=Math.max(0,Math.floor(s||0));var m=Math.floor(s/60),x=s%60;return m+':'+(x<10?'0':'')+x}
function ensure(){
  if(rootEl&&document.body.contains(rootEl))return;
  if(!$('rfqCarStyle')){var st=document.createElement('style');st.id='rfqCarStyle';st.textContent=STYLE;document.head.appendChild(st)}
  var host=document.createElement('div');host.innerHTML=MARKUP;
  while(host.firstChild)document.body.appendChild(host.firstChild);
  rootEl=$('rfqCar');blankEl=$('rfqCarBlank');
  rootEl.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-car]'):null;if(b)act(b.getAttribute('data-car'))});
  blankEl.addEventListener('click',function(){blankEl.hidden=true});
}
function state(){var s={};try{s=(opts&&opts.getState&&opts.getState())||{}}catch(e){s={}}return s||{}}
function refresh(){
  if(!isOpen)return;
  var s=state(),t=$('rfqCarTitle'),sub=$('rfqCarSub'),tg=$('rfqCarToggle'),tm=$('rfqCarTime');
  if(t)t.textContent=s.title||'اختر ما تسمعه';
  if(sub)sub.textContent=s.sub||'';
  if(tg)tg.textContent=s.playing?'⏸':'▶';
  if(tm)tm.textContent=(s.time!=null?fmt(s.time):'0:00')+' من '+(s.duration?fmt(s.duration):'—');
}
function toggleAudio(){
  if(opts&&opts.toggle)return opts.toggle();
  var a=opts&&opts.audio;if(!a)return;
  if(a.paused){var p=a.play();if(p&&p.catch)p.catch(function(){})}else{a.pause()}
}
function act(a){
  if(!opts)return;
  if(a==='prev'){if(opts.prev)opts.prev()}
  else if(a==='next'){if(opts.next)opts.next()}
  else if(a==='toggle'){toggleAudio()}
  else if(a==='minus'||a==='plus'){var el=opts.audio;if(el){try{el.currentTime=Math.max(0,(el.currentTime||0)+(a==='plus'?10:-10))}catch(e){}}}
  else if(a==='hide'){if(blankEl)blankEl.hidden=false}
  else if(a==='close'){close()}
  setTimeout(refresh,80);
}
function requestWake(){try{if(navigator.wakeLock&&navigator.wakeLock.request)wake=navigator.wakeLock.request('screen')}catch(e){}}
function releaseWake(){try{if(wake&&wake.then)wake.then(function(w){if(w&&w.release)w.release()})}catch(e){}wake=null}
function onKey(e){
  if(!isOpen)return;
  if(e.key==='Escape'){close()}
  else if(e.key==='ArrowRight'){act('next')}
  else if(e.key==='ArrowLeft'){act('prev')}
  else if(e.key===' '||e.key==='Spacebar'){if(e.preventDefault)e.preventDefault();act('toggle')}
}
function onVisible(){if(isOpen&&document.visibilityState==='visible')requestWake()}
function close(){
  if(!isOpen){if(rootEl)rootEl.hidden=true;if(blankEl)blankEl.hidden=true;return}
  isOpen=false;
  var a=opts&&opts.audio;
  if(a){EVENTS.forEach(function(ev){try{a.removeEventListener(ev,refresh)}catch(e){}})}
  if(timer){clearInterval(timer);timer=null}
  document.removeEventListener('keydown',onKey);
  document.removeEventListener('visibilitychange',onVisible);
  if(blankEl)blankEl.hidden=true;
  if(rootEl)rootEl.hidden=true;
  try{document.body.style.overflow=prevOverflow||'';document.documentElement.style.overflow=''}catch(e){}
  prevOverflow=null;
  releaseWake();
  var cb=opts&&opts.onClose;opts=null;
  if(cb){try{cb()}catch(e){}}
}
function open(o){
  ensure();
  opts=o||{};
  isOpen=true;
  if(rootEl)rootEl.hidden=false;
  try{prevOverflow=document.body.style.overflow;document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden'}catch(e){}
  refresh();requestWake();
  var a=opts.audio;
  if(a){EVENTS.forEach(function(ev){try{a.addEventListener(ev,refresh)}catch(e){}})}
  if(timer)clearInterval(timer);
  timer=setInterval(refresh,1000);
  document.addEventListener('keydown',onKey);
  document.addEventListener('visibilitychange',onVisible);
  var tb=$('rfqCarToggle');
  if(tb){try{tb.focus()}catch(e){}}
}
window.RafiqCar={isOpen:function(){return isOpen},open:open,close:close,refresh:refresh};
})();
