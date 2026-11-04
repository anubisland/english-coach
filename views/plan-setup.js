/* وضعُ الخطّة: مفاوضةٌ لا استمارة.

   والفرق أنّ الاستمارة تأخذ منه أرقاماً ثمّ تَسكت، والمفاوضةَ
   تُريه نتيجةَ اختياره — «تَفرغ يوم كذا» — فيَقبل أو يُساوم،
   ويَعلم ثمنَ الاستعجال قبل أن يَلتزم به.

   وثلاثةُ أسئلةٍ لا أكثر، ثمّ عرضٌ وجواب. من سُئل عشرةً أغلق. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {WHY, setPlan, forecast, levelLeft, arDate, arWeeks} from '../engine/plan.js';
import {currentLevel} from '../engine/cefr.js';
import {ar, esc, svg} from './ui.js';
import {sayAr, stopAr, hasVoiceAr} from '../engine/voice-ar.js';
import {launch} from '../engine/quiz.js';

/* المشهدُ مرتّبٌ على خطوات: ثلاثُ خطواتٍ يَعرف فيها البرنامجَ، ثمّ
   خطوةٌ تَنتقل به إلى السؤال، ثمّ ثلاثةُ أسئلة، ثمّ النتيجة.

   ولا يُجمَع تعريفٌ وسؤالٌ في شاشةٍ واحدة: من قرأ شرحاً ثمّ وجد
   تحته سؤالاً لم يَقرأ الشرح. */
const FIRST = -3;
const D = () => S.setup || (S.setup = {step: FIRST, why: null, mins: null, days: null});

export function planStart(){
  /* ومن رأى التعريفَ لا يُعاد عليه، إلّا أن يطلبه من الإعدادات. */
  S.setup={step:(S.introSeen&&S.placed)?0:FIRST,why:null,mins:null,days:null};
  S.tab='plan'; save(); hooks.render();
}
export function planIntro(){ S.setup={step:FIRST,why:null,mins:null,days:null}; S.tab='plan'; save(); hooks.render() }
export function planIntroDone(){
  S.introSeen = true; S.setup = null; save();
  launch('place');
}

export function planNext(){ const d=D(); d.step++; save(); hooks.render() }
export function planPick(k,v){ const d=D(); d[k]=v; d.step++; save(); hooks.render() }
export function planBack(){ const d=D(); if(d.step>FIRST)d.step--; save(); hooks.render() }


export function planAccept(){
  const d=D();
  setPlan({why:d.why, mins:d.mins, days:d.days});
  S.setup=null; S.tab='home'; save(); hooks.render();
}

const say = (txt, sub) => `<div class="coach-row">
  <div class="coach-ava">${svg('mic',17,'#fff')}</div>
  <div class="coach-says">${txt}${sub?`<span class="coach-sub">${sub}</span>`:''}</div></div>`;

const opts = (k, list) => `<div class="coach-opts">${
  list.map(o=>`<button class="btn ghost coach-opt" onclick="planPick('${k}',${
    typeof o.v==='string'?`'${o.v}'`:o.v})">${o.t}${
    o.hint?`<span>${o.hint}</span>`:''}</button>`).join('')}</div>`;

const SCRIPT = {
  '-3': 'أهلاً بك. أنا مدرّبك في اللغة الإنجليزية، وسأكون معك من أول كلمة إلى آخر مستوى. '
      + 'كل الشرح هنا بالعربية، والكلام بالإنجليزية. '
      + 'والطريق أمامك ستة مستويات، من المستوى الأول للمبتدئ إلى آخر مستوى للمتقن، '
      + 'وهي المستويات المعتمدة في العالم. وفي كل مستوى عدة وحدات، '
      + 'والوحدة موضوع واحد تتمه قبل أن تنتقل إلى غيره.',

  '-2': 'وفي كل وحدة تمشي على ترتيب واحد. '
      + 'تبدأ بكلمات جديدة تتعلمها قبل أن تراها في جملة. '
      + 'ثم دروس القاعدة، شرح بالعربية ثم تمارين عليها. '
      + 'ثم حوار تطبق فيه القاعدة في كلام حقيقي لا في فراغ. '
      + 'ثم المهارات الأربع: قراءة وإملاء وكتابة وترجمة. '
      + 'ثم تتكلم بصوتك في مشهد حي أصحح لك فيه نطقك. '
      + 'وفي آخر الوحدة اختبار، لا تمضي إلى ما بعدها حتى تجتازه.',

  '-1': 'هذا هو البرنامج. يبقى أن نضبطه عليك أنت. '
      + 'ولكي تصل إلى الإتقان نحتاج خطة تمشي عليها، '
      + 'ولكي أضع لك الخطة سأسألك ثلاثة أسئلة قصيرة. '
      + 'ليس فيها إجابة صحيحة وأخرى خاطئة، وتستطيع تغييرها متى شئت. '
      + 'ثم أريك متى تفرغ من مستواك باختيارك أنت.'
};

export function planSay(){
  const d=D();
  const t=SCRIPT[String(d.step)];
  if(!t) return;
  if(d.saying===d.step){ stopAr(); d.saying=null; save(); hooks.render(); return }
  d.saying=d.step; save(); hooks.render();
  sayAr(t, ()=>{ const x=D(); if(x.saying===d.step){ x.saying=null; save(); hooks.render() } });
}

/* زرُّ الصوت: لا يُعرَض إن لم يكن في الجهاز صوتٌ عربيّ. */
const listen = (step) => {
  if(!SCRIPT[String(step)] || !hasVoiceAr()) return '';
  const on = D().saying===step;
  return `<div class="coach-opts" style="margin-bottom:10px">
    <button class="btn ghost coach-opt sm" onclick="planSay()" style="width:max-content">
      ${on ? '⏹ إيقاف' : '🔊 اسمع الشرح'}</button></div>`;
};

export function planView(){
  const d=D(), lv=currentLevel();

  /* ويُعرّفه بنفسه قبل أن يَسأله.

     وكان يُفتَح على «مفردات الوحدة — الوحدة ١»، والمبتدئُ لا يَعرف
     ما الوحدةُ ولا كم هي ولا إلى أين تُفضي. فلا يُسأل عن خطّةٍ من
     لا يَعلم ما الذي يُخطَّط له. */
  if(d.step===-3) return wrap(
    say('أهلاً بك. أنا مدرّبُك، وسأكون معك من أوّل كلمةٍ إلى آخر مستوى.',
        'كلُّ الشرح بالعربيّة، والكلامُ بالإنجليزيّة.')
    + `<div class="coach-card" style="text-align:start">
         <p style="margin:0 0 10px"><b>الطريقُ ستّةُ مستويات</b> —
           من <span class="en">A1</span> للمبتدئ إلى <span class="en">C2</span> للمتقن،
           وهي المستوياتُ المعتمدةُ في العالم.</p>
         <p class="muted" style="margin:0">وفي كلّ مستوًى عدّةُ وحدات،
           والوحدةُ موضوعٌ واحدٌ تُتمّه قبل أن تنتقل.</p>
       </div>`
    + listen(-3) + next('وبعدين؟'));

  if(d.step===-2) return wrap(
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
    + listen(-2) + next('فهمت، وبعدين؟') + back());

  /* الانتقالةُ: يُقال له لماذا سيُسأل قبل أن يُسأل. */
  /* ومَن لم يُختبَر بعد يُسلَّم إلى الاختبار، لا إلى الأسئلة.

     فالخطّةُ تُحسَب على ما بقي، والاختبارُ قد يُعفيه من وحدات —
     فلو وُضعت قبله تبدّل موعدُ فراغه بعد أن رآه. */
  if(d.step===-1 && !S.placed) return wrap(
    say('هذا هو البرنامج. وقد عرفتَه.')
    + say('والخطوةُ التالية: <b>اختبارُ تحديد المستوى</b> — اثنا عشر سؤالاً تُحدّد من أين تبدأ.',
          'ثمّ نضع خطّتك بعده، لأنّه قد يُعفيك من وحداتٍ فيَقرُب موعدُ فراغك.')
    + listen(-1)
    + `<div class="coach-opts">
         <button class="btn coach-opt" onclick="planIntroDone()">يلّا نعمل الاختبار</button>
       </div>` + back());

  if(d.step===-1) return wrap(
    say('هذا هو البرنامج. يبقى أن نَضبطه عليك أنت.')
    + say('سأسألك <b>ثلاثةَ أسئلة</b> — ثمّ أُريك متى تَفرغ من مستواك باختيارك.',
          'لا إجابةَ صحيحةً وأخرى خاطئة، وتُغيّرها متى شئت.')
    + listen(-1) + next('يلّا نبدأ') + back());

  if(d.step===0) return wrap(
    say('لماذا تتعلّم الإنجليزيّة؟', 'بها أعرف ما أُقدّم لك أوّلاً.')
    + opts('why', WHY) + back());

  if(d.step===1) return wrap(
    say('كم دقيقةً تقدر أن تُذاكر في اليوم؟', 'اختر ما يناسب يومك.')
    + opts('mins', [{v:5,t:'٥ دقائق'},{v:10,t:'١٠ دقائق'},{v:20,t:'٢٠ دقيقة'},{v:40,t:'٤٠ دقيقة'}])
    + back());

  if(d.step===2) return wrap(
    say('وكم يوماً في الأسبوع؟', 'أُسجّل لك في الأيّام التي تختارها.')
    + opts('days', [{v:3,t:'٣ أيّام'},{v:5,t:'٥ أيّام'},{v:6,t:'٦ أيّام'},{v:7,t:'كلَّ يوم'}])
    + back());

  /* نتيجةُ اختياره تُقال له خبراً، ثمّ يُترَك.

     وكان البرنامج يُساومه: «عايزه أسرع؟ إذن عشرون دقيقةً — تقدر
     عليها؟». وهو لم يَشترِ برنامجاً ليُفاوضَه في موعده: اختار، فيُقال
     له ما يَترتّب على اختياره، فإن أراد أن يَفرغ أبكرَ زاد وقتَه
     بنفسه. ولا يُستحلَف على وعد. */
  const f=forecast(d.mins,d.days,lv);
  d.weeks=f.weeks;
  const L=levelLeft(lv);
  return wrap(
    say(`باختيارك — <b>${ar(d.mins)}</b> دقيقةً، <b>${ar(d.days)}</b> أيّامٍ في الأسبوع:`)
    + `<div class="coach-card">
         <div class="coach-big">${arWeeks(f.weeks)}</div>
         <p>تُنهي <span class="en">${esc(lv)}</span> يوم <b>${arDate(f.date)}</b>.</p>
         <p class="muted">بقيت لك ${ar(L.left)} محطّةً — نحو ${ar(f.stationsPerWeek)} في الأسبوع.</p>
       </div>`
    + say('وإن زدتَ وقتَك فرغتَ أبكر، وإن نقصتَ تأخّر — الأمرُ إليك.',
          'ويمكنك تغييرُ هذا متى شئت.')
    + `<div class="coach-opts">
         <button class="btn coach-opt" onclick="planAccept()">ابدأ</button>
         <button class="btn ghost coach-opt" onclick="planBack()">غيّر اختياري</button>
       </div>`);
}

const next = (t) => '<div class="coach-opts"><button class="btn coach-opt" onclick="planNext()">'+t+'</button></div>';

const back = () => `<div class="coach-opts" style="margin-top:4px">
  <button class="btn ghost coach-opt sm" onclick="planBack()">↩ رجوع</button></div>`;

const wrap = inner => `<div class="coach-wrap">${inner}</div>`;
