/* خطّةُ المتعلّم: ما يُضبَط به البرنامجُ عليه.

   وكان البرنامج يفتح على شاشةٍ اسمُها «اليوم» ولم يَسأل صاحبَه يوماً
   كم يريد أن يُذاكر ولا بمَ يريد أن يَبدأ. فأيُّ معنًى لـ«اليوم» إن
   لم تكن ثمّةَ خطّةٌ يُقاس إليها؟

   وفيها شقّان: تركيزُه — وبه تُرتَّب محطّاتُ كلّ وحدة، وهو المقصودُ
   الأوّل من السؤال، وموضعُه engine/focus.js — وعهدُ عادته: كم يوماً
   في الأسبوع وكم دقيقةً في اليوم، وعليه وحدَه يُحاسَب. */
import {S, save} from './state.js';
import {UNIT_NS, levelUnits} from './progress.js';
import {currentLevel} from './cefr.js';
import {unitPlan} from './unit-plan.js';
import {dayKey, shiftDay, dayReport} from './journal.js';
import {isFocus, FOCUS_FALLBACK} from './focus.js';

/* لماذا يتعلّم — وأثرُه في ترتيب محطّات الوحدة، لا في موعدٍ يُحسَب
   له. وانظر engine/focus.js: هناك يُقرأ هذا الجواب. */
export const WHY = [
  {v:'work',  t:'شغلي',            hint:'فتُقدَّم لك الكتابةُ والترجمة'},
  {v:'travel',t:'سفري',            hint:'فيُقدَّم لك السماعُ والكلام'},
  {v:'study', t:'دراستي',          hint:'فتُقدَّم لك القراءةُ والكتابة'},
  {v:'talk',  t:'أتكلّم مع الناس',  hint:'فيُقدَّم لك الكلامُ والسماع'}
];

export const hasPlan = () => !!(S.plan && S.plan.mins && S.plan.days);

export function setPlan(p){
  S.plan = {
    why:  isFocus(p.why) ? p.why : FOCUS_FALLBACK,
    mins: clamp(p.mins, 5, 120),
    days: clamp(p.days, 1, 7),
    from: dayKey()
  };
  /* ودقائقُ الخطّة هي هدفُ اليوم نفسُه: رقمان لمعنًى واحدٍ يختلفان
     يوماً ما، فيُقاس المتعلّمُ بأحدهما ويُعرَض عليه الآخر. */
  S.goal = S.plan.mins;
  save();
  return S.plan;
}
export function clearPlan(){ S.plan=null; save() }

const clamp=(v,lo,hi)=>{const n=Math.round(Number(v));return Number.isFinite(n)?Math.min(hi,Math.max(lo,n)):lo};

/* ما بقي من المستوى بالمحطّات.

   وكان يُحسَب معها تقديرُ دقائقها ليُشتَقّ منه موعدُ الفراغ — ورُفع
   الموعدُ فرُفع التقدير: عددٌ لا يَقرؤه أحدٌ خيرٌ ألّا يُحسَب. */
export function levelLeft(lv){
  let left=0, total=0;
  levelUnits(lv||currentLevel()).forEach(u=>{
    /* وما أعفاه منه اختبارُ التحديد ليس عليه.

       وكان يُحسَب في الباقي، فيُقال لمن وُضع في الوحدة الثالثة إنّ
       أمامه وحدتين أُعفي منهما — فيَطول الموعدُ بغير حقّ، ويُحاسَب
       على ما لم يُطلَب منه. */
    const off = !!S.skipped[u];
    unitPlan(u).forEach(st=>{
      total++;
      if(!st.done && !off) left++;
    });
  });
  return {left, total, done: total-left};
}

/* أين هو ممّا وَعد به هذا الأسبوع.

   والقياسُ على العادة لا على موعدٍ محسوب: «وعدتَ بخمسة أيّامٍ
   وعملتَ ثلاثة» وعدُه هو، يُحاسَب عليه بحقّ. أمّا «تَفرغ من المستوى
   يوم كذا» فرقمٌ اشتقّه البرنامجُ بالقسمة ثمّ حمّله عليه ديناً —
   وصاحبُ البرنامج اشتراه ليتعلّم، لا ليُلاحَق بموعدٍ لم يَضعه.

   فرُفع الموعدُ ورُفعت معه forecast وpriceOf وarDate وarWeeks. */
export function paceStatus(now){
  if(!hasPlan()) return null;
  const p=S.plan, key=dayKey(now);
  const week=[]; for(let i=0;i<7;i++) week.push(shiftDay(key,-i));

  let stations=0, worked=0;
  week.forEach(d=>{
    const r=dayReport(d);
    if(!r) return;
    stations += r.stations;
    if(r.stations || r.total) worked++;
  });

  /* ولا يُحسَب ها هنا ما بقي من المستوى: كان حقلاً لا يَقرؤه أحد،
     ومَسحُه يَمشي على وحدات المستوى كلِّها في كلّ رسمةٍ لشاشة
     «اليوم». وهو من بقايا الموعد المرفوع. */
  return {
    plan:p, stations, worked,
    owed: Math.max(0, p.days - worked),
    kept: worked >= p.days
  };
}

/* أرقامٌ عربيّةٌ هنديّةٌ كسائر أرقام الواجهة. */
const AR_D='٠١٢٣٤٥٦٧٨٩';
export const arNum = n => String(n).replace(/\d/g, d=>AR_D[+d]);
