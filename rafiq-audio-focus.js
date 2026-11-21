/* رفيق المسلم — صوت واحد فقط في البرنامج.
   أي تشغيل جديد (قرآن، ابتهالات، خواطر، أذكار، أذان) يوقف أي صوت آخر يعمل،
   ويعمل هذا أيضًا بين الصفحة وإطار المصحف عبر postMessage. */
(function(){
'use strict';
if(window.__RFQ_AUDIO_FOCUS__)return;
window.__RFQ_AUDIO_FOCUS__=true;
var CLAIM='rfq-audio-claim',STOP='rfq-audio-stop';
var frameId='f'+Math.random().toString(36).slice(2)+Date.now().toString(36);
var mine=null;
function mediaEls(){return Array.prototype.slice.call(document.querySelectorAll('audio,video'))}
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
/* إيقاف كل الأصوات العاملة (خواطر، ابتهالات، أي مشغّل) لأجل الأذان/الإقامة ثم استئنافها. */
var salahHold=[];
function carRefresh(){try{if(window.RafiqCar&&window.RafiqCar.isOpen())window.RafiqCar.refresh()}catch(e){}}
window.rfqSuspendMediaForSalah=function(reason){
  if(salahHold.length)return;
  mediaEls().forEach(function(m){
    try{
      if(m.paused||!m.src||m.__rfqSalahAudio)return;
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
      if(!m||!m.isConnected||!m.src||m.src!==item.src)continue;
      if(!m.paused)continue;
      if(isFinite(item.time)&&item.time>0&&Math.abs((m.currentTime||0)-item.time)>0.5)m.currentTime=item.time;
      var pr=m.play();
      if(pr&&pr.catch)pr.catch(function(){});
    }catch(e){}
  }
  carRefresh();
};
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
