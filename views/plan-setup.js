/* وضعُ الخطّة: مفاوضةٌ لا استمارة.

   والفرق أنّ الاستمارة تأخذ منه أرقاماً ثمّ تَسكت، والمفاوضةَ
   تُريه نتيجةَ اختياره — «تَفرغ يوم كذا» — فيَقبل أو يُساوم،
   ويَعلم ثمنَ الاستعجال قبل أن يَلتزم به.

   وثلاثةُ أسئلةٍ لا أكثر، ثمّ عرضٌ وجواب. من سُئل عشرةً أغلق. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {WHY, setPlan, forecast, priceOf, levelLeft, arDate, arWeeks} from '../engine/plan.js';
import {currentLevel} from '../engine/cefr.js';
import {ar, esc} from './ui.js';

const D = () => S.setup || (S.setup = {step: 0, why: null, mins: null, days: null});

export function planStart(){ S.setup={step:0,why:null,mins:null,days:null}; S.tab='plan'; save(); hooks.render() }
export function planPick(k,v){ const d=D(); d[k]=v; d.step++; save(); hooks.render() }
export function planBack(){ const d=D(); if(d.step>0)d.step--; save(); hooks.render() }

export function planFaster(){ const d=D(); d.want=Math.max(1,(d.weeks||4)-2); d.step=4; save(); hooks.render() }
export function planEasier(){ const d=D(); d.mins=Math.max(5,d.mins-5); d.step=3; save(); hooks.render() }

export function planAccept(){
  const d=D();
  setPlan({why:d.why, mins:d.mins, days:d.days});
  S.setup=null; S.tab='home'; save(); hooks.render();
}

const say = (txt, sub) => `<div class="coach-row">
  <div class="coach-ava">م</div>
  <div class="coach-says">${txt}${sub?`<span class="coach-sub">${sub}</span>`:''}</div></div>`;

const opts = (k, list) => `<div class="coach-opts">${
  list.map(o=>`<button class="btn ghost coach-opt" onclick="planPick('${k}',${
    typeof o.v==='string'?`'${o.v}'`:o.v})">${o.t}${
    o.hint?`<span>${o.hint}</span>`:''}</button>`).join('')}</div>`;

export function planView(){
  const d=D(), lv=currentLevel();

  /* ويُعرّفه بنفسه قبل أن يَسأله.

     وكان يُفتَح على «مفردات الوحدة — الوحدة ١»، والمبتدئُ لا يَعرف
     ما الوحدةُ ولا كم هي ولا إلى أين تُفضي. فلا يُسأل عن خطّةٍ من
     لا يَعلم ما الذي يُخطَّط له. */
  if(d.step===-1) return wrap(
    say('أهلاً بك. أنا مدرّبُك، وسأكون معك من أوّل كلمةٍ إلى آخر مستوى.',
        'كلُّ الشرح بالعربيّة، والكلامُ بالإنجليزيّة.')
    + `<div class="coach-card" style="text-align:start">
         <p style="margin:0 0 10px"><b>الطريقُ ستّةُ مستويات</b> —
           من <span class="en">A1</span> للمبتدئ إلى <span class="en">C2</span> للمتقن،
           وهي المستوياتُ المعتمدةُ في العالم.</p>
         <p class="muted" style="margin:0">وفي كلّ مستوًى عدّةُ وحدات،
           والوحدةُ موضوعٌ واحدٌ تُتمّه قبل أن تنتقل.</p>
       </div>`
    + `<div class="coach-opts">
         <button class="btn coach-opt" onclick="planPick('seen',1)">وبعدين؟</button>
       </div>`);

  if(d.step===0 && !d.seen) { d.step=-1; return planView() }

  if(d.step===0) return wrap(
    say('والوحدةُ الواحدة تمشي فيها على هذا الترتيب:')
    + `<div class="coach-card" style="text-align:start">
         <ol style="margin:0;padding-inline-start:20px;line-height:2.1;font-size:14.5px">
           <li><b>كلماتٌ جديدة</b> — تتعلّمها قبل أن تراها في جملة</li>
           <li><b>دروسُ القاعدة</b> — شرحٌ بالعربيّة ثمّ تمارين</li>
           <li><b>حوار</b> — تُطبّق القاعدةَ في كلامٍ لا في فراغ</li>
           <li><b>قراءةٌ وإملاءٌ وكتابةٌ وترجمة</b> — المهاراتُ الأربع</li>
           <li><b>تكلَّم بصوتك</b> — مشهدٌ حيٌّ أُصحّح لك فيه نطقَك</li>
           <li><b>اختبارُ الوحدة</b> — لا تمضي حتّى تجتازه</li>
         </ol>
       </div>`
    + say('وقبل أن نبدأ، ثلاثةُ أسئلةٍ لأبنيَ لك خطّةً تمشي عليها.')
    + say('لماذا تتعلّم الإنجليزيّة؟', 'بها أعرف ما أُقدّم لك أوّلاً.')
    + opts('why', WHY));

  if(d.step===1) return wrap(
    say('كم دقيقةً تقدر أن تُذاكر في اليوم؟', 'قُل ما تقدر عليه فعلاً، لا ما تتمنّاه — سأُحاسبك عليه.')
    + opts('mins', [{v:5,t:'٥ دقائق'},{v:10,t:'١٠ دقائق'},{v:20,t:'٢٠ دقيقة'},{v:40,t:'٤٠ دقيقة'}])
    + back());

  if(d.step===2) return wrap(
    say('وكم يوماً في الأسبوع؟', 'لن أُحاسبك في يومٍ لم تَعِد به.')
    + opts('days', [{v:3,t:'٣ أيّام'},{v:5,t:'٥ أيّام'},{v:6,t:'٦ أيّام'},{v:7,t:'كلَّ يوم'}])
    + back());

  /* العرض: نتيجةُ اختياره كما هي. */
  if(d.step===3){
    const f=forecast(d.mins,d.days,lv);
    d.weeks=f.weeks;
    const L=levelLeft(lv);
    return wrap(
      say(`بـ<b>${ar(d.mins)}</b> دقيقةً، <b>${ar(d.days)}</b> أيّامٍ في الأسبوع:`)
      + `<div class="coach-card">
           <div class="coach-big">${arWeeks(f.weeks)}</div>
           <p>تُنهي <span class="en">${esc(lv)}</span> يوم <b>${arDate(f.date)}</b>.</p>
           <p class="muted">بقيت لك ${ar(L.left)} محطّةً — نحو ${ar(f.stationsPerWeek)} في الأسبوع.</p>
         </div>`
      + say('يناسبك؟')
      + `<div class="coach-opts">
           <button class="btn coach-opt" onclick="planAccept()">ماشي، نبدأ</button>
           <button class="btn ghost coach-opt" onclick="planFaster()">عايزه أسرع</button>
           <button class="btn ghost coach-opt" onclick="planEasier()">ده كتير عليّ</button>
         </div>`);
  }

  /* المساومة: أراد أن يُسرع، فيُقال له الثمن قبل أن يلتزم. */
  const want=d.want||1;
  const price=priceOf(want, d.days, lv);
  const dt=new Date(); dt.setDate(dt.getDate()+want*7);
  return wrap(
    say(`عشان تُنهي <span class="en">${esc(lv)}</span> في <b>${arWeeks(want,true)}</b>
         — يوم <b>${arDate(dt)}</b> — تحتاج:`)
    + `<div class="coach-card">
         <div class="coach-big">${ar(price)} <span>دقيقة يوميّاً</span></div>
         <p class="muted">بدل ${ar(d.mins)}، و${ar(d.days)} أيّامٍ في الأسبوع كما هي.</p>
       </div>`
    + say('تقدر عليها؟', 'لو قلتَ نعم، سأُذكّرك بها يوم تتأخّر.')
    + `<div class="coach-opts">
         <button class="btn coach-opt" onclick="planPick('mins',${price})">أقدر، خلّيها</button>
         <button class="btn ghost coach-opt" onclick="planBack()">لأ، ارجع للأولى</button>
       </div>`);
}

const back = () => `<div class="coach-opts" style="margin-top:4px">
  <button class="btn ghost coach-opt sm" onclick="planBack()">↩ رجوع</button></div>`;

const wrap = inner => `<div class="coach-wrap">${inner}</div>`;
