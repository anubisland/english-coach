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

  if(d.step===0) return wrap(
    say('قبل أن نبدأ، أُريد أن أعرف منك ثلاثة أشياء — لأبنيَ لك خطّةً تمشي عليها، لا لأسألك وأسكت.')
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
