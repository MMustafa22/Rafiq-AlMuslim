/* رفيق المسلم — صوت واحد فقط في البرنامج.
   أي تشغيل جديد (قرآن، ابتهالات، خواطر، أذكار، تسبيحة، أذان) يوقف أي صوت آخر يعمل،
   ويعمل هذا أيضًا بين الصفحة وإطار المصحف عبر postMessage.
   ملاحظة مهمة: معظم المشغّلات تُنشئ new Audio() خارج الصفحة (غير موجود في DOM)،
   لذلك نسجّل كل عنصر صوت عند التشغيل حتى لا يفلت من الإيقاف. */
(function(){
'use strict';
if(window.__RFQ_AUDIO_FOCUS__)return;
window.__RFQ_AUDIO_FOCUS__=true;
var CLAIM='rfq-audio-claim',STOP='rfq-audio-stop';
var frameId='f'+Math.random().toString(36).slice(2)+Date.now().toString(36);
var mine=null;
var tracked=[];

function track(el){
  if(!el||!el.addEventListener)return;
  if(tracked.indexOf(el)>-1)return;
  tracked.push(el);
  if(tracked.length>40)tracked=tracked.slice(-40);
  try{
    el.addEventListener('ended',untrack,{once:true});
    el.addEventListener('emptied',untrack,{once:true});
  }catch(e){}
}
function untrack(ev){
  var el=ev&&(ev.currentTarget||ev.target);
  if(!el)return;
  var i=tracked.indexOf(el);
  if(i>-1)tracked.splice(i,1);
}
function mediaEls(){
  var list=Array.prototype.slice.call(document.querySelectorAll('audio,video'));
  for(var i=0;i<tracked.length;i++){
    var el=tracked[i];
    if(list.indexOf(el)>-1)continue;
    if(!el||(!el.src&&!el.currentSrc))continue;
    list.push(el);
  }
  return list;
}
function pauseAll(except){
  mediaEls().forEach(function(m){
    if(m===except||m.__rfqSalahAudio)return;
    try{if(!m.paused)m.pause()}catch(e){}
  });
}
function broadcastStop(key,exceptWin){
  var frames=document.querySelectorAll('iframe');
  for(var i=0;i<frames.length;i++){
    try{
      var w=frames[i].contentWindow;
      if(w&&w!==window&&w!==exceptWin)w.postMessage({__rfqAudio:STOP,key:key},'*');
    }catch(e){}
  }
}
function salahPlaying(){
  var list=mediaEls();
  for(var i=0;i<list.length;i++){if(list[i].__rfqSalahAudio&&!list[i].paused)return list[i]}
  return null;
}
function claim(el){
  mine=frameId+':'+(el&&el.id?el.id:'media');
  pauseAll(el);
  try{if(window.parent&&window.parent!==window)window.parent.postMessage({__rfqAudio:CLAIM,key:mine},'*')}catch(e){}
  broadcastStop(mine,null);
}
var proto=window.HTMLMediaElement&&window.HTMLMediaElement.prototype;
if(proto&&typeof proto.play==='function'&&!proto.play.__rfqAudioFocus){
  var origPlay=proto.play;
  var patchedPlay=function(){
    try{
      track(this);
      /* الأذان/الإقامة له الأولوية: لا يبدأ صوت آخر فوقه ولا يختلط به. */
      if(salahPlaying()&&!this.__rfqSalahAudio){
        try{document.dispatchEvent(new CustomEvent('rfq-salah-audio-blocked'))}catch(e){}
        return Promise.resolve();
      }
      claim(this);
    }catch(e){}
    return origPlay.apply(this,arguments);
  };
  patchedPlay.__rfqAudioFocus=true;
  try{proto.play=patchedPlay}catch(e){}
}
/* عنصر صوت الأذان/الإقامة محمي: أي تشغيل جديد لا يوقفه، والإيقاف لأجل الصلاة لا يمسّه. */
window.rfqProtectSalahAudio=function(el){try{if(el)el.__rfqSalahAudio=true}catch(e){}return el};
/* تسجيل يدوي لأي عنصر صوت لا يمرّ عبر play() مباشرة (نادر). */
window.rfqRegisterMedia=function(el){track(el);return el};
/* إيقاف كل المقاطع الصوتية العاملة الآن (زر/انتقال صفحة). */
window.rfqStopAllAudio=function(except){pauseAll(except||null);broadcastStop('*',null)};
/* إيقاف كل الأصوات العاملة (خواطر، ابتهالات، تسابيح، مشغّل) لأجل الأذان/الإقامة ثم استئنافها. */
var salahHold=[];
function carRefresh(){try{if(window.RafiqCar&&window.RafiqCar.isOpen())window.RafiqCar.refresh()}catch(e){}}
window.rfqSuspendMediaForSalah=function(reason){
  if(salahHold.length)return;
  mediaEls().forEach(function(m){
    try{
      if(m.paused||!m.src||m.__rfqSalahAudio||m.__rfqNoResume)return;
      salahHold.push({el:m,src:m.src,time:m.currentTime||0});
      m.pause();
    }catch(e){}
  });
  carRefresh();
};
window.rfqResumeMediaAfterSalah=function(){
  var list=salahHold;salahHold=[];
  for(var i=0;i<list.length;i++){
    var item=list[i],m=item.el;
    try{
      /* عناصر new Audio() غير موصولة بالصفحة، فلا نشترط isConnected. */
      if(!m||!m.src||m.src!==item.src)continue;
      if(!m.paused)continue;
      if(isFinite(item.time)&&item.time>0&&Math.abs((m.currentTime||0)-item.time)>0.5)m.currentTime=item.time;
      var pr=m.play();
      if(pr&&pr.catch)pr.catch(function(){});
    }catch(e){}
  }
  carRefresh();
};
/* شبكة أمان: نلتقط حدث التشغيل نفسه، فلا يفلت مشغّل غلّف play() قبل تحميل هذا الملف. */
document.addEventListener('play',function(ev){
  var el=ev&&ev.target;
  if(!el||!el.tagName)return;
  var tag=el.tagName.toUpperCase();
  if(tag!=='AUDIO'&&tag!=='VIDEO')return;
  if(el.__rfqSalahAudio)return;
  try{track(el)}catch(e){}
  claim(el);
},true);
/* إيقاف أصوات هذه الصفحة فقط (بدون إرسال إيقاف إلى إطار المصحف). */
window.rfqStopLocalAudio=function(except){pauseAll(except||null)};
window.addEventListener('message',function(ev){
  var d=ev.data;
  if(!d||typeof d!=='object'||!d.__rfqAudio)return;
  if(d.__rfqAudio===CLAIM){
    if(d.key!==mine)pauseAll(null);
    broadcastStop(d.key,ev.source);
  }else if(d.__rfqAudio===STOP){
    if(d.key!==mine)pauseAll(null);
  }
});
})();
