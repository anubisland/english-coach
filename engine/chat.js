/* محرّك المحادثة الحيّة: الأدوار، والتصحيح، وقلم المصحّح. */
import {SCENES} from '../content/scenes.js';
import {S,save,logError} from './state.js';
import {hooks} from './bus.js';
import {checkGrammar,fixText} from './grammar.js';
import {pronScore} from './pronounce.js';

export function chatClamp(){const c=S.chat;let moved=false;
  if(!Number.isInteger(c.sc)||c.sc<0||c.sc>=SCENES.length){c.sc=0;c.ti=0;moved=true}
  const t=SCENES[c.sc].turns;
  if(!Number.isInteger(c.ti)||c.ti<0||c.ti>=t.length){c.ti=0;moved=true}
  if(moved){
    logError('ضبط مؤشر المحادثة',new Error('sc/ti خارج الحدود'));
    /* التغذية الراجعة الباقية تخصّ سؤالاً آخر، وعرضها هنا يعلّم المتعلم خطأً. */
    c.stage='reply';c.ok=null;c.g=null;c.said=null;c.fixed=null;c.pr=null;c.hint=false;
    c.fb='تغيّرت المشاهد، فبدأنا من المشهد الأول.';
    save();
  }
}
export function chatTurn(){chatClamp();return SCENES[S.chat.sc].turns[S.chat.ti]}
export function chatSay(){hooks.say(chatTurn().p)}
export function chatListen(cb){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){cb(null,'التعرف على الصوت غير متاح هنا، اكتب الإجابة في المربع');return}const r=new R();r.lang='en-US';r.onresult=e=>cb(e.results[0][0].transcript.trim(),null);r.onerror=e=>cb(null,'تعذّر التسجيل ('+e.error+')');try{r.start()}catch(x){cb(null,'تعذّر بدء التسجيل')}}
export function chatMic(){chatListen((t,err)=>{if(err){S.chat.fb=err;hooks.render();return}chatReply(t)})}
export function chatType(){const v=(document.getElementById('chatTxt')||{}).value;if(v&&v.trim())chatReply(v.trim())}
export function chatReply(text){const c=S.chat,T=chatTurn();c.said=text;c.ok=T.need.test(text);c.g=checkGrammar(text);c.fixed=fixText(text);c.g.forEach(x=>S.errs[x.ar]=(S.errs[x.ar]||0)+1);if(!c.ok)c.miss++;c.stage='fb';c.pr=null;c.fb=null;save();hooks.render()}
export function chatRetry(){const c=S.chat;c.stage='reply';c.ok=null;c.g=null;c.pr=null;c.fb=null;save();hooks.render()}
export function chatModel(){chatListen((t,err)=>{const c=S.chat;if(err){c.fb=err;hooks.render();return}c.pr=pronScore(chatTurn().model,t);c.fb=null;save();hooks.render()})}
export function chatModelTyped(){const v=(document.getElementById('chatPr')||{}).value;if(!v||!v.trim())return;S.chat.pr=pronScore(chatTurn().model,v.trim());save();hooks.render()}
export function chatPick(i){const c=S.chat;c.sc=i;c.ti=0;c.stage='reply';c.ok=null;c.g=null;c.fixed=null;c.pr=null;c.fb=null;c.hint=false;save();hooks.render();setTimeout(chatSay,300)}
export function chatNext(){const c=S.chat,sc=SCENES[c.sc];c.ti++;if(c.ti>=sc.turns.length){c.ti=0;c.sc=(c.sc+1)%SCENES.length}c.miss=0;c.stage='reply';c.ok=null;c.g=null;c.fixed=null;c.pr=null;c.fb=null;c.hint=false;save();hooks.render();setTimeout(chatSay,300)}

export function chatHint(){const c=S.chat;c.hint=!c.hint;save();hooks.render()}
/* يقارن جملة المتعلّم بالمصححة كلمةً بكلمة (أطول تسلسل مشترك)،
   فيظهر الخطأ مشطوباً والصواب فوقه — كما يفعل المدرّس بالقلم. */
export function penDiff(said,fixed){
  const A=String(said||'').split(/\s+/).filter(Boolean);
  const B=String(fixed||'').split(/\s+/).filter(Boolean);
  const norm=w=>w.toLowerCase().replace(/[^\w']/g,'');
  const n=A.length,m=B.length;
  const L=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)
    L[i][j]=norm(A[i])===norm(B[j])?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  /* نجمع العمليات أولاً، ثم ندمج كل حذف يتبعه إضافة في علامة واحدة
     يظهر فيها الصواب فوق الخطأ المشطوب، كما يكتب المدرّس بالقلم. */
  const ops=[];let i=0,j=0;
  while(i<n&&j<m){
    if(norm(A[i])===norm(B[j])){ops.push({k:'=',w:B[j]});i++;j++}
    else if(L[i+1][j]>=L[i][j+1]){ops.push({k:'-',w:A[i]});i++}
    else{ops.push({k:'+',w:B[j]});j++}
  }
  while(i<n)ops.push({k:'-',w:A[i++]});
  while(j<m)ops.push({k:'+',w:B[j++]});

  const merged=[];
  for(let k=0;k<ops.length;k++){
    const a=ops[k],b=ops[k+1];
    if(a.k==='-'&&b&&b.k==='+'){merged.push({k:'~',bad:a.w,good:b.w});k++}
    else if(a.k==='+'&&b&&b.k==='-'){merged.push({k:'~',bad:b.w,good:a.w});k++}
    else merged.push(a);
  }

  const esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  return merged.map(o=>{
    if(o.k==='=')return esc(o.w);
    if(o.k==='~')return '<span class="fix"><u>'+esc(o.good)+'</u><s>'+esc(o.bad)+'</s></span>';
    if(o.k==='-')return '<span class="fix"><s>'+esc(o.w)+'</s></span>';
    return '<span class="fix"><u>'+esc(o.w)+'</u></span>';
  }).join(' ');
}

/* مقاييس من بيانات حقيقية فقط: لا نعرض رقماً لا نحسبه. */
