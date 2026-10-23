/* حالة التطبيق: تعريفها الكامل، وترقية المحفوظ القديم، وحفظها.
   أي حقل جديد يُضاف إلى defaultState أولاً، وإلا انهار التطبيق عند أول استخدام. */
import {LESSONS} from '../content/lessons.js';
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
  ruleOpen:null,            // بطاقة القاعدة المفتوحة حالياً
  theme:'light',            // النهاري هو الافتراضي، والليلي اختيار
  goal:10,                  // هدف دقائق الكلام اليومي
  chat:{sc:0,ti:0,miss:0,stage:'reply',ok:null,g:null,said:null,fixed:null,pr:null,fb:null,hint:false,cat:'الكل'}
}}

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
  if(saved.place&&typeof saved.place==='object')S.place=saved.place;
  /* الدرس المفتوح مؤشر إلى محتوى قد يختفي بين إصدارين.
     مؤشر ميت كان يُسقط الإقلاع كله ويترك شاشة بيضاء بلا شريط تنقل ولا مخرج. */
  if(typeof saved.open==='string'&&LESSONS.some(l=>l.id===saved.open))S.open=saved.open;
  for(const k of ['lessons','conv','cp','ret','errs'])
    if(saved[k]&&typeof saved[k]==='object')S[k]=saved[k];
  if(saved.chat&&typeof saved.chat==='object')Object.assign(S.chat,saved.chat);
  if(!S.chat.pr||typeof S.chat.pr!=='object')S.chat.pr=null;
  S.v=SCHEMA;
  return S;
}

export const LEVELS=['A1','A2'];
export const VIEWS_KEYS=['home','course','speak'];   // يجب أن يطابق مفاتيح VIEWS في آخر الملف
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
