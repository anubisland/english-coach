/* خطّةُ المتعلّم: عهدٌ يُتَّفق عليه، ثمّ يُحاسَب عليه.

   وكان البرنامج يفتح على شاشةٍ اسمُها «اليوم» ولم يَسأل صاحبَه يوماً
   كم يريد أن يُذاكر ولا متى يريد أن يَفرغ. فأيُّ معنًى لـ«اليوم» إن
   لم تكن ثمّةَ خطّةٌ يُقاس إليها؟

   والخطّةُ لا تُفترَض ولا تُشتَقّ: تُؤخَذ منه جواباً، ثمّ تُعرَض
   عليه نتيجتُها — «تَفرغ يوم كذا» — فيَقبل أو يُساوم. والمساومةُ
   هي الاتّفاق: من اختار أن يُسرع عَلِم ثمنَه قبل أن يَلتزم. */
import {S, save} from './state.js';
import {UNIT_NS, levelUnits} from './progress.js';
import {currentLevel} from './cefr.js';
import {unitPlan} from './unit-plan.js';
import {dayKey, shiftDay, activeDays, dayReport} from './journal.js';

/* زمنُ المحطّة بالدقائق، تقديراً من نوعها.

   ولا يُؤخَذ متوسّطٌ واحدٌ لكلّ شيء: نصُّ قراءةٍ من ثلاثمئة كلمةٍ
   ليس كبطاقة مفردات، فلو سُوّي بينهما كَذَب الموعدُ المحسوب. */
export const MINS = {
  words: 5, lesson: 4, convo: 4, scene: 5, gate: 7,
  read: 6, write: 7, dict: 4, tr: 5
};
export const stationMins = st => MINS[st.key] || MINS[st.kind] || 5;

/* لماذا يتعلّم — ولهذا أثرٌ في ما يُقدَّم له، لا في سرعته وحدها. */
export const WHY = [
  {v:'work',  t:'شغلي',            hint:'المراسلة والاجتماعات والسجلّ الرسميّ'},
  {v:'travel',t:'سفري',            hint:'المطار والفندق والطريق والطعام'},
  {v:'study', t:'دراستي',          hint:'القراءة الأكاديميّة والكتابة والحجّة'},
  {v:'talk',  t:'أتكلّم مع الناس',  hint:'المحادثة اليوميّة والطلاقة'}
];

export const hasPlan = () => !!(S.plan && S.plan.mins && S.plan.days);

export function setPlan(p){
  S.plan = {
    why:  WHY.some(w=>w.v===p.why) ? p.why : 'talk',
    mins: clamp(p.mins, 5, 120),
    days: clamp(p.days, 1, 7),
    from: dayKey()
  };
  save();
  return S.plan;
}
export function clearPlan(){ S.plan=null; save() }

const clamp=(v,lo,hi)=>{const n=Math.round(Number(v));return Number.isFinite(n)?Math.min(hi,Math.max(lo,n)):lo};

/* ما بقي من المستوى بالمحطّات وبالدقائق. */
export function levelLeft(lv){
  let left=0, mins=0, total=0;
  levelUnits(lv||currentLevel()).forEach(u=>{
    /* وما أعفاه منه اختبارُ التحديد ليس عليه.

       وكان يُحسَب في الباقي، فيُقال لمن وُضع في الوحدة الثالثة إنّ
       أمامه وحدتين أُعفي منهما — فيَطول الموعدُ بغير حقّ، ويُحاسَب
       على ما لم يُطلَب منه. */
    const off = !!S.skipped[u];
    unitPlan(u).forEach(st=>{
      total++;
      if(!st.done && !off){ left++; mins+=stationMins(st) }
    });
  });
  return {left, mins, total, done: total-left};
}

/* الموعدُ المتوقَّع بخطّةٍ مقترحة: كم أسبوعاً، وأيُّ يوم.

   والحسابُ بالدقائق لا بالمحطّات: من وَعد بعشر دقائقَ خمسةَ أيّام
   فله خمسون دقيقةً في الأسبوع، وما يَسَعُه منها هو ما يُنجَز. */
export function forecast(mins, days, lv){
  const {left, mins:need} = levelLeft(lv);
  const perWeek = clamp(mins,1,240) * clamp(days,1,7);
  if(!need) return {weeks:0, date:null, left:0, perWeek, stationsPerWeek:0};
  const weeks = Math.max(1, Math.ceil(need/perWeek));
  const d = new Date();
  d.setDate(d.getDate() + weeks*7);
  return {
    weeks, date:d, left, perWeek,
    stationsPerWeek: Math.max(1, Math.round(left/weeks))
  };
}

/* ما يلزم من دقائق اليوم لبلوغ موعدٍ بعدد أسابيع — ثمنُ الاستعجال. */
export function priceOf(weeks, days, lv){
  const {mins:need} = levelLeft(lv);
  const d = clamp(days,1,7);
  return Math.max(5, Math.ceil(need/(Math.max(1,weeks)*d)/5)*5);
}

/* هدفُ اليوم بالدقائق — وهو ما وَعد به، لا أكثر. */
export const todayMins = () => hasPlan() ? S.plan.mins : 10;

/* أين هو من خطّته هذا الأسبوع. */
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

  const f = forecast(p.mins, p.days);
  const owed = Math.max(0, p.days - worked);
  return {
    plan:p, stations, worked, owed,
    kept: worked >= p.days,
    weeks: f.weeks, date: f.date,
    stationsPerWeek: f.stationsPerWeek,
    onTrack: stations >= f.stationsPerWeek
  };
}

export const startedOn = () => { const a=activeDays(); return a.length?a[a.length-1]:null };

/* تاريخٌ بالعربيّة بلا مكتبة: «٢٢ ديسمبر» — بأرقامٍ عربيّةٍ هنديّة
   كسائر أرقام الواجهة، لا «22 ديسمبر» لاتينيّةً وسط عربيّة. */
const MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو',
              'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const AR_D='٠١٢٣٤٥٦٧٨٩';
export const arNum = n => String(n).replace(/\d/g, d=>AR_D[+d]);
export const arDate = d => d ? arNum(d.getDate())+' '+MONTHS[d.getMonth()] : '';

/* جمعُ العربيّة ليس إضافةَ لاحقة: «أسبوعٌ» و«أسبوعان» و«أسابيع»
   و«أسبوعاً» — وقولُ «٦ أسبوعاً» يُقرأ ركيكاً فيُضعف ثقةَ القارئ.

   والمثنّى يُعرَب: «أسبوعان» مرفوعاً و«أسبوعين» مجروراً، فقولُ
   «في أسبوعان» لحن. فتُؤخَذ الحالُ من موضع الكلمة. */
export function arWeeks(n, oblique){
  if(n===1) return 'أسبوعٌ واحد';
  if(n===2) return oblique?'أسبوعين':'أسبوعان';
  if(n<=10) return arNum(n)+' أسابيع';
  return arNum(n)+' أسبوعاً';
}
