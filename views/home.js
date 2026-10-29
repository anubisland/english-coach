/* الرئيسية: حلقة التقدّم، وهدف الكلام، والخطوة التالية، والخطأ المتكرر. */
import {LESSONS} from '../content/lessons.js';
import {S,save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {unitLessons,convoList,unitOpen,lessonOpen,convoOpen,examOpen,UNIT_NS,
        levelUnits,unitLevel} from '../engine/progress.js';
import {nextInUnit} from '../engine/unit-plan.js';
import {reviewStats} from '../engine/quiz.js';
import {cefrReport,currentLevel} from '../engine/cefr.js';
import {vocabReport} from '../engine/vocab.js';
import {BOXES} from '../engine/srs.js';
import {card,svg,ar,count,esc} from './ui.js';

/* الخطوة التالية بالضبط، ومعها مرساة محطتها على خط الرحلة.
   كل من يحتاج أن يعرف «إلى أين الآن؟» يسأل هذه الدالة — لا قائمة الدروس. */
export function nextStep(){
  for(const u of UNIT_NS){
    if(!unitOpen(u))continue;
    if(S.skipped[u])continue;            // تخطّاها اختبار المستوى: لا تقترحها

    /* محطّاتُ الوحدة من unitPlan وحدها: درساً فمحادثةً فمهارةً.
       وكانت المهاراتُ الأربع خارج هذه الحلقة، فلا يُرشَد إليها
       أحدٌ أبداً — وهي نصفُ ما تقيسه الشهادة. */
    const st=nextInUnit(u);
    if(st)return{label:st.t,act:st.act,cta:st.cta,anchor:st.id,unit:u};

    if(S.drill&&S.drill.unit===u)
      return{label:'تدريب موجَّه على ما أخطأت فيه',act:`launch('drill',${u})`,cta:'ابدأ التدريب',anchor:'st-g-'+u,unit:u};
    if(!S.cp[u])return{label:`بوابة الوحدة ${ar(u)}`,act:`launch('cp',${u})`,cta:'ابدأ الاختبار',anchor:'st-g-'+u,unit:u};
    if(u!==3&&!S.ret[u])return{label:`اختبار الاستبقاء للوحدة ${u}`,act:`launch('ret',${u})`,cta:'ابدأ الاختبار',anchor:'st-g-'+u,unit:u};
  }
  const last=UNIT_NS[UNIT_NS.length-1];
  if(examOpen()&&!S.exam)return{label:`الامتحان النهائي ${unitLevel(last)}`,
    act:"launch('exam')",cta:'ابدأ الامتحان',anchor:'st-exam',unit:3};
  return null;
}

/* نصيبُ المستوى الحاليّ من دروسه. والحلقة تقيسه هو لا المنهجَ كلَّه:
   كانت تقيس الدروس الستّة والخمسين وتكتب تحتها «من أساسيات A1»،
   فكان الرقمُ شيئاً والعنوانُ شيئاً آخر. */
export function levelProgress(){
  const lv=currentLevel();
  const ls=levelUnits(lv).flatMap(unitLessons);
  const done=ls.filter(l=>S.lessons[l.id]).length;
  return {lv, done, total:ls.length,
    pct: ls.length?Math.round(done/ls.length*100):0};
}

export function homeView(){
  const done=LESSONS.filter(l=>S.lessons[l.id]).length;
  if(!S.placed) return card('أهلاً بك 👋',
    '<p class="muted">قبل أن نبدأ، اختبار قصير من 12 سؤالاً يحدد نقطة انطلاقك. يستغرق دقيقتين، ولا توجد إجابة تُحسب عليك.</p><div class="row"><button class="btn" onclick="launch(\'place\')">ابدأ اختبار تحديد المستوى</button></div>');

  const nx=nextStep();
  const lp=levelProgress();
  const top=Object.entries(S.errs||{}).sort((a,b)=>b[1]-a[1])[0];

  return ringCard(lp)+
  `<div class="stats">
    <div class="stat s1"><b>${ar(done)}<span style="font-size:14px">/${ar(LESSONS.length)}</span></b><span>دروس متقنة</span></div>
    <div class="stat s2"><b>${ar(Object.keys(S.cp).length)}<span style="font-size:14px">/${ar(UNIT_NS.length)}</span></b><span>وحدات مجتازة</span></div>
    <div class="stat s3"><b>${ar(S.xp)}</b><span>نقاط XP</span></div></div>`+
  cefrCard()+
  reviewCard()+
  (nx?card('تابع من حيث توقفت',
    `<p style="font-size:15px;font-weight:600;line-height:1.6">${nx.label}</p>
     <div class="row" style="justify-content:flex-start"><button class="btn" onclick="${nx.act}">${svg('mic',18,'#fff')} ${nx.cta}</button></div>`):'')+
  (top?card('خطؤك المتكرر',
    `<div style="display:flex;align-items:center;gap:11px">
       <span style="width:40px;height:40px;flex:0 0 40px;display:grid;place-items:center;background:var(--badBg);border-radius:13px;color:var(--coral)">${svg('alert',19)}</span>
       <span style="flex:1;min-width:0"><span class="muted" style="display:block">${esc(top[0])}</span>
       <span class="muted" style="display:block;font-size:12px">تكرر ${ar(top[1])} مرة</span></span>
       <button class="btn ghost" style="margin:0" onclick="go('speak')">درّبني</button></div>`):'')+
  card('الامتحان النهائي',
    `<p class="muted">${S.exam?`🎉 أتممت مستوى ${esc(lp.lv)}`
      :`يُفتح بعد اجتياز وحدات ${esc(lp.lv)} واختبارات الاستبقاء`}</p>
     <div class="row" style="justify-content:flex-start"><button class="btn ghost" onclick="go('course')">عرض الرحلة كاملة</button></div>`);
}

/* أرقام عربية-هندية في الواجهة العربية، والإنجليزية تبقى كما هي. */

export function ringCard(lp){
  const pct=typeof lp==='number'?lp:lp.pct;
  const lv=typeof lp==='number'?currentLevel():lp.lv;
  const C=414.7, p=Math.max(0,Math.min(1,pct/100));
  const lens=[6,11,4,13,7,9,5,14,8,6,12,5];
  let ticks='';
  for(let i=0;i<48;i++){
    const a=(-90+i*7.5)*Math.PI/180, len=lens[i%lens.length];
    const x1=(100+81*Math.cos(a)).toFixed(1), y1=(100+81*Math.sin(a)).toFixed(1);
    const x2=(100+(81+len)*Math.cos(a)).toFixed(1), y2=(100+(81+len)*Math.sin(a)).toFixed(1);
    ticks+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${i/48<p?'var(--ind)':'var(--line)'}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  const goals=[5,10,20].map(g=>`<button class="btn${g===S.goal?'':' ghost'}" style="margin:0;padding:8px 15px;min-height:0;border-radius:999px;font-size:12.5px${g===S.goal?'':';background:transparent;color:var(--mute)'}" onclick="setGoal(${g})">${ar(g)} د</button>`).join('');
  return `<div class="card tone1" style="display:flex;flex-direction:column;align-items:center;padding-top:10px">
    <div style="position:relative;width:186px;height:186px">
      <svg width="186" height="186" viewBox="0 0 200 200" role="img" aria-label="أتممتَ ${pct} بالمئة من دروس المستوى">
        <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" stroke-width="13"/>
        <circle cx="100" cy="100" r="66" fill="none" stroke="var(--ind)" stroke-width="13" stroke-linecap="round"
                stroke-dasharray="${C}" stroke-dashoffset="${(C*(1-p)).toFixed(1)}" transform="rotate(-90 100 100)"/>
        ${ticks}
      </svg>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <span class="dsp" style="font-size:44px;line-height:1">${ar(pct)}<span style="font-size:20px">٪</span></span>
        <span class="muted" style="font-size:12px">من أساسيات <span class="en">${esc(lv)}</span></span>
      </div>
    </div>
    <div class="muted" style="font-size:12px;margin-top:10px">هدف الكلام اليومي</div>
    <div role="group" aria-label="هدف اليوم" style="display:flex;gap:5px;background:var(--surf2);border-radius:999px;padding:4px;margin-top:7px">${goals}</div>
  </div>`;
}
export function setGoal(g){S.goal=g;save();hooks.render()}

/* بطاقة المراجعة على رأس الصفحة لا في ذيلها: المستحقّ اليوم أولى من
   درس جديد، لأنّ ما ُينسى يضيع وما لم يُدرس بعد ينتظر.

   وإن لم يستحقّ شيء لا نعرض بطاقة فارغة، بل نطمئنه أن الموعد آتٍ. */
function reviewCard(){
  const r=reviewStats();
  if(!r.tracked)return '';

  if(!r.due)
    return card('المراجعة المتباعدة',
      '<p class="muted">لا شيء مستحقّ اليوم. '
      +(r.soon?'يستحقّ غداً '+count(r.soon,'سؤال','أسئلة')+'.':'ولا غداً.')+'</p>'
      +boxBar(r));

  return card('مراجعة اليوم',
    '<p class="muted">استحقّ '+count(r.due,'سؤال','أسئلة')
    +' مراجعتها اليوم — أسئلة أجبتَ عنها من قبل، تعود قبل أن تُنسى.</p>'
    +boxBar(r)
    +'<div class="row" style="justify-content:flex-start;margin-top:10px">'
    +'<button class="btn" onclick=\'launch("review")\'>ابدأ المراجعة</button></div>');
}

/* شريط الصناديق: يرى المتعلّم أين هو من الإتقان لا رقماً مجرّداً. */
function boxBar(r){
  const tones=['var(--coral)','var(--amber)','var(--ind2)','var(--ind)','var(--green)'];
  return '<div style="display:flex;gap:4px;margin-top:10px;align-items:flex-end">'
    +r.boxes.map((n,i)=>'<div style="flex:1;text-align:center">'
      +'<div style="height:'+(6+Math.min(26,n*2))+'px;background:'+tones[i]
      +';border-radius:6px;opacity:'+(n?1:0.25)+'"></div>'
      +'<span class="muted" style="font-size:10.5px">'+ar(n)+'</span></div>').join('')
    +'</div>'
    +'<p class="muted" style="font-size:11.5px;margin-top:5px">من صندوق اليوم إلى صندوق '
    +ar(BOXES[BOXES.length-1])+' يوماً · أتقنت '+ar(r.mastered)+' من '+ar(r.tracked)+'</p>';
}

/* بطاقة «أين أنت من …»: المستوى منسوباً إلى مرجع لا إلى أنفسنا.

   وكان اسمُ المستوى مكتوباً A1 في العنوان وفي متنه، وcefrReport بلا
   وسيطٍ ترجع A1 دائماً — فكان من بلغ B2 يُقال له «أين أنت من A1»
   ويُعرض عليه عددُ قدرات A1. فالمستوى يُشتقّ الآن ويُمرَّر. */
function cefrCard(){
  const lv=currentLevel();
  const r=cefrReport(lv);
  if(!r.total)return '';
  /* والمفرداتُ سطرٌ ثانٍ: «أثبتَ سبع قدرات» صحيحٌ لكنّه مجرّد، و«بلغتَ
     أربعمئة كلمة» هو ما يقيس به المتعلّم نفسَه. */
  const v = vocabReport(lv);
  return card('أين أنت من <span class="en">'+esc(lv)+'</span>',
    '<p class="muted">أثبتَ <b style="color:var(--ind2)">'+ar(r.proven)+' من '+ar(r.total)
    +'</b> من قدرات <span class="en">'+esc(lv)+'</span> التي يغطّيها البرنامج، وهو يغطّي '
    +ar(r.coverage)+'٪ من <span class="en">'+esc(lv)+'</span> الكامل.</p>'
    +(v?'<p class="muted" style="margin-top:6px">وبلغتَ <b style="color:var(--ind2)">'
      +ar(v.met)+' من '+ar(v.total)+'</b> كلمة'
      +(v.nextCount?'، وفي الوحدة التالية '+ar(v.nextCount)+' جديدة':'')+'.</p>':'')
    +'<div class="bar" style="margin-top:9px"><i style="width:'+Math.round(r.proven/r.total*100)+'%"></i></div>'
    +'<div class="row" style="justify-content:flex-start;margin-top:10px">'
    +'<button class="btn ghost" onclick=\'go("cefr")\'>اعرض التفصيل</button>'
    +'<button class="btn ghost" onclick=\'go("roadmap")\'>خريطة المنهج</button></div>',
    'tone2');
}
