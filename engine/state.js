/* حالة التطبيق: تعريفها الكامل، وترقية المحفوظ القديم، وحفظها.
   أي حقل جديد يُضاف إلى defaultState أولاً، وإلا انهار التطبيق عند أول استخدام. */
import {LESSONS} from '../content/lessons.js';
import {RULE} from '../content/rules.js';
import {GR} from './grammar.js';
import {hooks} from './bus.js';

export const K='eng-coach-v3';
export const SCHEMA=4;

/* البنية الكاملة للحالة. كل حقل جديد يُضاف هنا أولاً، وإلا انهار التطبيق عند أول استخدام. */
export function defaultState(){return{
  v:SCHEMA,
  placed:false,             // الدخول الأول يبدأ باختبار تحديد المستوى
  level:'A1',
  lessons:{},conv:{},cp:{},ret:{},exam:false,xp:0,
  tab:'home',q:null,open:null,place:null,
  errs:{},                  // عدّاد أخطاء الجرامر المتكررة
  skipped:{},               // وحدات تخطّاها اختبار تحديد المستوى
  attempts:{},              // عدد محاولات كل اختبار: النجاح من السابعة ليس كالأولى
  drill:null,               // تدريب موجَّه إلزامي بعد الرسوب في بوابة
  tr:null,                  // اختبار الترجمة الجاري (لحظي، لا يُستورد)
  snd:null,                 // تدريب الأصوات الجاري (لحظي)
  cx:null,                  // اختبار المحادثة الجاري (لحظي)
  wx:null,                  // اختبار الكتابة الجاري (لحظي)
  rx:null,                  // اختبار القراءة الجاري (لحظي)
  cxBest:0,                 // أفضل نسبة في اختبار المحادثة
  wxBest:0,                 // أفضل نسبة في اختبار الكتابة
  rxBest:0,                 // أفضل نسبة في اختبار القراءة
  ruleOpen:null,            // بطاقة القاعدة المفتوحة حالياً
  theme:'light',            // النهاري هو الافتراضي، والليلي اختيار
  goal:10,                  // هدف دقائق الكلام اليومي
  chat:{sc:0,ti:0,miss:0,stage:'reply',ok:null,g:null,said:null,fixed:null,pr:null,fb:null,hint:false,cat:'الكل'}
}}

/* الحالة المحفوظة قد تأتي من ملف يستورده المتعلم من شخص آخر، فهي مدخل
   غير موثوق لا مجرد ذاكرة متصفحه. لا ننسخ منها إلا ما نعرفه بالاسم:
   المفاتيح المعروفة، والأنواع المتوقعة، والقيم ضمن حدودها. */
const KNOWN={
  lessons:LESSONS.map(l=>l.id),
  conv:['c1','c2','c3','c4','c5','c6'],
  skills:Object.keys(RULE),
  errs:GR.map(r=>r.ar)
};

function pickKeys(obj,allow){
  const out={};
  allow.forEach(k=>{if(obj[k])out[k]=true});
  return out;
}
function cleanErrs(obj){
  const out={};
  KNOWN.errs.forEach(k=>{
    const v=obj[k];
    if(Number.isFinite(v)&&v>0)out[k]=Math.min(v,99999);
  });
  return out;
}
function cleanAttempts(obj){
  const out={};
  ['cp1','cp2','cp3','ret1','ret2','exam','translate'].forEach(k=>{
    const v=obj[k];
    if(Number.isInteger(v)&&v>0)out[k]=Math.min(v,999);
  });
  return out;
}
function cleanDrill(d){
  if(!d||typeof d!=='object')return null;
  const unit=Number(d.unit);
  if(![1,2,3].includes(unit))return null;
  const skills=Array.isArray(d.skills)?d.skills.filter(s=>KNOWN.skills.includes(s)):[];
  if(!skills.length)return null;
  return {unit,skills,from:d.from==='ret'?'ret':'cp'};
}
function cleanPlace(p){
  const num=v=>Number.isFinite(v)?v:null;
  const acc={};
  if(p.acc&&typeof p.acc==='object')[1,2,3].forEach(u=>{acc[u]=num(p.acc[u])});
  const sug=Number(p.suggest);
  return {
    a1:num(p.a1)||0,a2:num(p.a2)||0,
    n1:num(p.n1)||0,n2:num(p.n2)||0,
    acc,suggest:[1,2,3].includes(sug)?sug:1
  };
}
function cleanChat(c){
  const out={};
  if(Number.isInteger(c.sc)&&c.sc>=0)out.sc=c.sc;
  if(Number.isInteger(c.ti)&&c.ti>=0)out.ti=c.ti;
  if(typeof c.cat==='string'&&c.cat.length<24)out.cat=c.cat;
  if(typeof c.hint==='boolean')out.hint=c.hint;
  /* النصوص اللحظية (ما قاله، والتصحيح، والملاحظات) لا تُستورد إطلاقاً:
     لا قيمة لها بعد الجلسة، وهي أقصر طريق لنصّ غريب إلى الصفحة. */
  out.stage='reply';out.ok=null;out.g=null;out.said=null;out.fixed=null;out.pr=null;out.fb=null;out.miss=0;
  return out;
}

/* هل في الحالة المحفوظة أثر عمل سابق؟ */
export function hasProgress(x){
  if(!x||typeof x!=='object')return false;
  if(Number.isFinite(x.xp)&&x.xp>0)return true;
  if(x.exam===true)return true;
  for(const k of ['lessons','conv','cp','ret'])
    if(x[k]&&typeof x[k]==='object'&&Object.keys(x[k]).length)return true;
  return false;
}

/* يرقّي أي حالة محفوظة من إصدار سابق إلى البنية الحالية دون فقد تقدّم المستخدم. */
export function migrate(saved){
  const S=defaultState();
  if(!saved||typeof saved!=='object')return S;
  /* نتحقق من نوع كل قيمة بدل نسخها كما هي: xp كنصّ مثلاً يجعل addXp يدمج بدل أن يجمع. */
  /* من عنده تقدّم محفوظ هو مستخدم قديم: لا نوقفه عند اختبار لم يكن موجوداً حين بدأ. */
  if(saved.placed===true||hasProgress(saved))S.placed=true;
  if(typeof saved.exam==='boolean')S.exam=saved.exam;
  if(Number.isFinite(saved.xp)&&saved.xp>=0)S.xp=saved.xp;
  if(LEVELS.includes(saved.level))S.level=saved.level;
  if(saved.theme==='light'||saved.theme==='dark')S.theme=saved.theme;
  if([5,10,20].includes(saved.goal))S.goal=saved.goal;
  if(VIEWS_KEYS.includes(saved.tab))S.tab=saved.tab;
  if(saved.place&&typeof saved.place==='object')S.place=cleanPlace(saved.place);
  /* الدرس المفتوح مؤشر إلى محتوى قد يختفي بين إصدارين.
     مؤشر ميت كان يُسقط الإقلاع كله ويترك شاشة بيضاء بلا شريط تنقل ولا مخرج. */
  if(typeof saved.open==='string'&&LESSONS.some(l=>l.id===saved.open))S.open=saved.open;
  S.drill=cleanDrill(saved.drill);
  for(const k of ['lessons','conv'])
    if(saved[k]&&typeof saved[k]==='object')S[k]=pickKeys(saved[k],KNOWN[k]);
  for(const k of ['cp','ret','skipped'])
    if(saved[k]&&typeof saved[k]==='object')S[k]=pickKeys(saved[k],['1','2','3']);
  if(saved.errs&&typeof saved.errs==='object')S.errs=cleanErrs(saved.errs);
  if(saved.attempts&&typeof saved.attempts==='object')S.attempts=cleanAttempts(saved.attempts);
  if(saved.chat&&typeof saved.chat==='object')Object.assign(S.chat,cleanChat(saved.chat));
  /* اختبار الترجمة جلسة لحظية: لا يُستورد ولا يُستعاد. */
  S.tr=null;S.snd=null;S.cx=null;S.wx=null;S.rx=null;
  /* نسبة وحدها تُستورد، بعد قسرها عدداً في مداها. */
  S.cxBest=Math.max(0,Math.min(100,Math.round(Number(saved.cxBest))||0));
  S.wxBest=Math.max(0,Math.min(100,Math.round(Number(saved.wxBest))||0));
  S.rxBest=Math.max(0,Math.min(100,Math.round(Number(saved.rxBest))||0));
  S.v=SCHEMA;
  return S;
}

export const LEVELS=['A1','A2'];
export const VIEWS_KEYS=['home','course','speak','settings','translate','sounds','examconv','examwrite','examread'];   // يجب أن يطابق مفاتيح VIEWS في app.js
export let S,bootWarn=null;

/* يُستدعى مرة عند الإقلاع، ومرة لكل اختبار، فالحالة تُبنى لا تُستورد جاهزة. */
export function bootState(){
  saveFailed=false;bootWarn=null;
  try{S=migrate(JSON.parse(localStorage.getItem(K)||'null'))}
  catch(e){
    S=defaultState();logError('قراءة التقدم المحفوظ',e);
    bootWarn='إن كنت تستخدم التصفح الخاص أو حجب بيانات المواقع فجرّب نافذة عادية.';
  }
  return S;
}

/* الفشل الصامت أخفى عطلاً حقيقياً من قبل: كل خطأ يُسجَّل ويظهر للمستخدم. */
export function logError(where,e){
  try{console.error('[مدرب الإنجليزية] '+where+':',e)}catch(_){}
}
/* الحالة دائمة، فالتحذير يجب أن يدوم أيضاً.
   تنبيه يختفي بعد ثانيتين لا يكفي لمن سيُكمل أربعين دقيقة ثم يفقد كل شيء. */
export let saveFailed=false;
export function save(){
  const c=Object.assign({},S);delete c.q;
  try{localStorage.setItem(K,JSON.stringify(c));saveFailed=false}
  catch(e){
    logError('حفظ التقدم',e);
    if(!saveFailed){saveFailed=true;hooks.render()}
  }
}
export function addXp(n){S.xp+=n}
