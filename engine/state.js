/* حالة التطبيق: تعريفها الكامل، وترقية المحفوظ القديم، وحفظها.
   أي حقل جديد يُضاف إلى defaultState أولاً، وإلا انهار التطبيق عند أول استخدام. */
import {LESSONS,UNITS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {SCENES} from '../content/scenes.js';
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
  tab:'home',q:null,open:null,openUnit:null,place:null,
  rev:null,                 // رأيُ المراجع الاختياريّ: لحظيّ، لا يُحفظ ولا يُصدَّر
  syncBusy:false,           // مزامنةٌ جارية: لحظيّ، وmigrate تُسقطه عمداً
  errs:{},                  // عدّاد أخطاء الجرامر المتكررة بنصّها
  days:{},                  // سجلّ الأيّام: ما تمّ وما صحّ وما أُخطئ فيه
  plan:null,                // خطّة المتعلّم: دقائقه وأيّامه وغرضه
  setup:null,               // مفاوضةُ الخطّة الجارية — لحظيّة لا تُحفظ
  skipped:{},               // وحدات تخطّاها اختبار تحديد المستوى
  attempts:{},              // عدد محاولات كل اختبار: النجاح من السابعة ليس كالأولى
  drill:null,               // تدريب موجَّه إلزامي بعد الرسوب في بوابة
  tr:null,                  // اختبار الترجمة الجاري (لحظي، لا يُستورد)
  snd:null,                 // تدريب الأصوات الجاري (لحظي)
  cx:null,                  // اختبار المحادثة الجاري (لحظي)
  wx:null,                  // اختبار الكتابة الجاري (لحظي)
  dx:null,                  // اختبار الإملاء الجاري (لحظي)
  rx:null,                  // اختبار القراءة الجاري (لحظي)
  cxSeen:[],                // مشاهد المحادثة التي جرّبها، فلا تتكرّر
  levelDone:{},             // المستويات التي اجتاز امتحانها النهائي
  res:{},                   // سجلّ الاختبارات: {last,best,n,at} لكل اختبار
  skills:{},                // لكل وحدة: ما أتمّه فيها من المهارات الأربع {read,write,dict,tr}
  words:{},                 // لكل وحدة: أعلى نتيجةٍ في محطّة المفردات
  scenes:{},                // المشاهد الحيّة المُؤدّاة: مفتاحُ المشهد -> true
  srs:{},                   // صناديق المراجعة المتباعدة: نصّ السؤال -> {b,due,seen}
  ruleOpen:null,            // بطاقة القاعدة المفتوحة حالياً
  theme:'light',            // النهاري هو الافتراضي، والليلي اختيار
  goal:10,                  // هدف دقائق الكلام اليومي
  /* sc:null — لم يَختر مشهداً بعد، فيُفتح له أوّلُ مشهدٍ حرّ. وكان
     صفراً، وهو «درس ٤٫١»، فكان التبويبُ يَستقبله بدرسٍ لا بمشهدٍ حرّ. */
  chat:{sc:null,ti:0,miss:0,stage:'reply',ok:null,g:null,said:null,fixed:null,pr:null,fb:null,hint:false,cat:'الكل'}
}}

/* الحالة المحفوظة قد تأتي من ملف يستورده المتعلم من شخص آخر، فهي مدخل
   غير موثوق لا مجرد ذاكرة متصفحه. لا ننسخ منها إلا ما نعرفه بالاسم:
   المفاتيح المعروفة، والأنواع المتوقعة، والقيم ضمن حدودها. */
/* مفاتيح srs نصوصُ أسئلة، والملفّ المستورد غير موثوق، فلا نقبل إلا
   ما يطابق سؤالاً موجوداً عندنا حرفاً بحرف. ما عداه يُطرح. */
/* أرقام الوحدات من المحتوى: لا تُكتب يدوياً فتتخلّف عند إضافة وحدة. */
const UNIT_NS=UNITS.map(u=>u.n).sort((a,b)=>a-b);

const QKEYS=new Set(LESSONS.flatMap(l=>l.items.map(i=>i.q)).filter(Boolean));

const KNOWN={
  lessons:LESSONS.map(l=>l.id),
  /* من المحتوى لا مكتوبةً: كانت ستّةً والبنكُ ثمانٍ وأربعون، فكان
     من أتمّ محادثةَ الوحدة الرابعة يفقدها عند أوّل فتح. */
  conv:CONVO.map(c=>c.id),
  /* skills هنا معرّفاتُ القواعد التي يُبنى منها التدريبُ الموجَّه
     (cleanDrill)، لا درجاتِ المهارات الأربع في S.skills — اسمان
     متشابهان لشيئين، فلا يُحذف أحدهما ظنّاً أنّه الآخر. */
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
  if(!UNIT_NS.includes(unit))return null;
  const skills=Array.isArray(d.skills)?d.skills.filter(s=>KNOWN.skills.includes(s)):[];
  if(!skills.length)return null;
  return {unit,skills,from:d.from==='ret'?'ret':'cp'};
}
function cleanPlace(p){
  const num=v=>Number.isFinite(v)?v:null;
  const acc={};
  if(p.acc&&typeof p.acc==='object')UNIT_NS.forEach(u=>{acc[u]=num(p.acc[u])});
  const sug=Number(p.suggest);
  return {
    a1:num(p.a1)||0,a2:num(p.a2)||0,
    n1:num(p.n1)||0,n2:num(p.n2)||0,
    acc,suggest:UNIT_NS.includes(sug)?sug:1
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
  /* الوحداتُ من المحتوى لا رقماً مكتوباً.

     وكانت ['1','2','3'] — وهي قائمةُ سماحٍ، فما خرج عنها يُحذف بلا
     أثر. فلمّا صار المنهجُ أربعاً وعشرين وحدةً كان من يجتاز بوابةَ
     الرابعة يفقدها عند أوّل فتحٍ للتطبيق: تعود الوحدةُ الخامسةُ
     مقفلةً وبوابةُ الرابعة غيرَ مجتازة، صامتاً بلا خطأ يظهر.

     وأسوأُ منه أنّ mergeInto تُمرّر الوارد من الوسيط بـmigrate،
     فجهازٌ يرفع تقدّمَه في الوحدة الخامسة يُجرَّد منه قبل الدمج. */
  for(const k of ['cp','ret','skipped'])
    if(saved[k]&&typeof saved[k]==='object')S[k]=pickKeys(saved[k],UNIT_NS.map(String));
  if(saved.errs&&typeof saved.errs==='object')S.errs=cleanErrs(saved.errs);
  if(saved.attempts&&typeof saved.attempts==='object')S.attempts=cleanAttempts(saved.attempts);
  if(saved.chat&&typeof saved.chat==='object')Object.assign(S.chat,cleanChat(saved.chat));
  /* اختبار الترجمة جلسة لحظية: لا يُستورد ولا يُستعاد. */
  S.tr=null;S.snd=null;S.cx=null;S.wx=null;S.rx=null;S.dx=null;
  /* نسبة وحدها تُستورد، بعد قسرها عدداً في مداها. */
  S.srs=cleanSrs(saved.srs);
  S.res=cleanRes(saved.res);
  S.skills=cleanSkills(saved.skills);
  S.words=cleanUnitPc(saved.words);
  S.scenes=cleanScenes(saved.scenes);
  S.days=cleanDays(saved.days);
  S.plan=cleanPlan(saved.plan);
  S.levelDone={};
  if(saved.levelDone&&typeof saved.levelDone==='object')
    LEVELS.forEach(lv=>{if(saved.levelDone[lv]===true)S.levelDone[lv]=true});
  S.cxSeen=Array.isArray(saved.cxSeen)?saved.cxSeen.filter(x=>typeof x==='string'&&x.length<32).slice(0,50):[];
  S.v=SCHEMA;
  return S;
}

export const LEVELS=['A1','A2','B1','B2','C1','C2'];
/* كل حقل يُقسر إلى مداه: صندوق خارج ١..٥ أو موعد غير عدد يُفسد الطابور. */
/* سجلّ النتائج يُستورد من ملفّ غير موثوق، فلا يُقبل إلا ما عرفنا مفتاحه،
   وتُقسر أرقامه إلى مداها. */
/* مهاراتُ الوحدة: رقمُ الوحدة مفتاحاً، وأربعُ درجاتٍ لا خامسة.
   ويُقسر كلُّ شيء إلى مداه كسجلّ النتائج — الملفّ المستورَد
   والوسيطُ كلاهما غيرُ موثوق. */
const SKILL_KEYS=['read','write','dict','tr'];
function cleanSkills(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  Object.keys(o).forEach(k=>{
    const u=Number(k);
    /* وحدةٌ معروفةٌ لا رقمٌ في مدًى: كان ١–٩٩٩، فيستطيع من عرف
       رمزَ المزامنة أن يحشو تسعَ مئةِ مفتاحٍ لا تُحذف أبداً — فالدمجُ
       لا ينقص بالتصميم. وcleanDrill في هذا الملفّ تفعل الصواب. */
    if(!UNIT_NS.includes(u))return;
    const e=o[k]; if(!e||typeof e!=='object')return;
    const one={};
    SKILL_KEYS.forEach(sk=>{
      /* رقماً لا ما يُشبه الرقم: Number(null) صفرٌ وNumber(true) واحد
         وNumber('85') خمسةٌ وثمانون. فملفٌّ تالفٌ أو وثيقةٌ من الوسيط
         تُسجّل درجةً لامتحانٍ لم يُؤدَّ — وقد تفتح بوابة. وcleanRes
         وcleanSrs تفحصان النوع قبل القسر، فتُطابَقان. */
      const v=e[sk];
      if(typeof v==='number'&&Number.isFinite(v))one[sk]=Math.max(0,Math.min(100,Math.round(v)));
    });
    if(Object.keys(one).length)out[u]=one;
  });
  return out;
}

/* محطّةُ المفردات: وحدةٌ ونسبة. ويُقسر كلُّ شيءٍ إلى مداه كغيره،
   فالملفُّ المستورَد والوسيطُ كلاهما غيرُ موثوق. */
function cleanUnitPc(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  Object.keys(o).forEach(k=>{
    /* رقماً لا ما يُشبه الرقم، كـcleanSkills: null وtrue و'85' كلُّها
       كانت تمرّ فتُسجَّل درجةً لمحطّةٍ لم تُخَض. */
    const u=Number(k), v=o[k];
    if(!UNIT_NS.includes(u)||typeof v!=='number'||!Number.isFinite(v))return;
    out[u]=Math.max(0,Math.min(100,Math.round(v)));
  });
  return out;
}

/* مشاهدُ المنهج: مفتاحٌ معروفٌ وقيمةٌ صادقة. وغيرُها لا يُقبَل —
   كبقيّة المنقّيات، فالوسيطُ والملفُّ كلاهما غيرُ موثوق. */
const SCENE_KEYS=new Set(SCENES.map(s=>s.les||('t:'+s.t)));
function cleanScenes(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  Object.keys(o).forEach(k=>{ if(SCENE_KEYS.has(k)&&o[k]===true)out[k]=true });
  return out;
}

const RES_SLOTS=['conv','write','read','translate','dictation'];
function cleanRes(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  RES_SLOTS.forEach(k=>{
    const e=o[k]; if(!e||typeof e!=='object')return;
    const num=(v,hi)=>Math.max(0,Math.min(hi,Math.round(Number(v))||0));
    out[k]={last:num(e.last,100),best:num(e.best,100),n:num(e.n,9999),
      at:Number.isFinite(Number(e.at))?Number(e.at):0};
  });
  return out;
}

/* النتيجة الأخيرة هي المعتمدة، والمحاولات تُعرض معها.

   وكان يُحفظ أفضلها وحده، فمن أعاد عشر مرّات واتّفق له ٨٨٪ في التاسعة
   يُسجَّل له ٨٨٪ كأنّها قدرته — وهي وصفٌ لأحسن حظّه لا لقدرته، وذلك
   يُفسد مصداقية الرقم من جذره. */
export function keepResult(slot, pc) {
  const r = S.res[slot] || {};
  S.res[slot] = {last: pc, best: Math.max(r.best || 0, pc), n: (r.n || 0) + 1, at: Date.now()};
  save();
  return S.res[slot];
}

/* سجلُّ الأيّام: مفتاحُه تاريخٌ، وما فيه أعدادٌ وقوائمُ نصوص.

   والملفُّ المستورد غير موثوق، فلا يُقبَل مفتاحٌ ليس تاريخاً ولا
   عددٌ ليس عدداً — وإلّا حُسبت خطّةُ المتعلّم على NaN. */
const DATE_KEY=/^\d{4}-\d{2}-\d{2}$/;
function cleanDays(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  Object.keys(o).forEach(k=>{
    if(!DATE_KEY.test(k))return;
    const d=o[k];
    if(!d||typeof d!=='object')return;
    const num=v=>{const n=Number(v);return Number.isFinite(n)&&n>=0?Math.round(n):0};
    const errs={};
    if(d.errs&&typeof d.errs==='object')
      Object.keys(d.errs).forEach(r=>{if(typeof r==='string'&&r.length<64)errs[r]=num(d.errs[r])});
    out[k]={
      done:Array.isArray(d.done)?d.done.filter(x=>typeof x==='string'&&x.length<96).slice(0,200):[],
      right:num(d.right), wrong:num(d.wrong), errs
    };
  });
  return out;
}

/* الخطّةُ عهدٌ، فتُقبَل كاملةً أو تُترَك: نصفُ خطّةٍ يُحاسَب عليها
   المتعلّمُ بما لم يَعِد به. */
function cleanPlan(p){
  if(!p||typeof p!=='object')return null;
  const n=(v,lo,hi)=>{const x=Math.round(Number(v));return Number.isFinite(x)&&x>=lo&&x<=hi?x:null};
  const mins=n(p.mins,1,240), days=n(p.days,1,7), pace=n(p.pace,1,60);
  if(mins===null||days===null||pace===null)return null;
  return {mins,days,pace,from:DATE_KEY.test(p.from)?p.from:null};
}

function cleanSrs(o){
  const out={};
  if(!o||typeof o!=='object')return out;
  Object.keys(o).forEach(k=>{
    if(!QKEYS.has(k))return;
    const e=o[k];
    if(!e||typeof e!=='object')return;
    const b=Math.max(1,Math.min(5,Math.round(Number(e.b))||1));
    const due=Number(e.due), seen=Number(e.seen);
    out[k]={b,due:Number.isFinite(due)?due:Date.now(),seen:Number.isFinite(seen)?seen:Date.now()};
  });
  return out;
}

export const VIEWS_KEYS=['home','course','speak','settings','translate','sounds','examconv','examwrite','examread','examdict','cefr','roadmap'];   // يجب أن يطابق مفاتيح VIEWS في app.js
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
