/* الرئيسية: حلقة التقدّم، وهدف الكلام، والخطوة التالية، والخطأ المتكرر. */
import {LESSONS} from '../content/lessons.js';
import {S,save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {unitLessons,convoList,unitOpen,lessonOpen,convoOpen,examOpen} from '../engine/progress.js';
import {card,svg,ar} from './ui.js';

/* الخطوة التالية بالضبط، ومعها مرساة محطتها على خط الرحلة.
   كل من يحتاج أن يعرف «إلى أين الآن؟» يسأل هذه الدالة — لا قائمة الدروس. */
export function nextStep(){
  for(const u of [1,2,3]){
    if(!unitOpen(u))continue;
    const l=unitLessons(u).find(x=>lessonOpen(x)&&!S.lessons[x.id]);
    if(l)return{label:`الدرس ${l.id}: ${l.t}`,act:`openLesson('${l.id}')`,cta:'تابع الدرس',anchor:'st-l-'+l.id,unit:u};
    const c=convoList(u).find(x=>convoOpen(x)&&!S.conv[x.id]);
    if(c)return{label:`محادثة: ${c.t}`,act:`launch('conv','${c.id}')`,cta:'ابدأ المحادثة',anchor:'st-c-'+c.id,unit:u};
    if(!S.cp[u])return{label:`بوابة الوحدة ${u}`,act:`launch('cp',${u})`,cta:'ابدأ الاختبار',anchor:'st-g-'+u,unit:u};
    if(u!==3&&!S.ret[u])return{label:`اختبار الاستبقاء للوحدة ${u}`,act:`launch('ret',${u})`,cta:'ابدأ الاختبار',anchor:'st-g-'+u,unit:u};
  }
  if(examOpen()&&!S.exam)return{label:'الامتحان النهائي A1',act:"launch('exam')",cta:'ابدأ الامتحان',anchor:'st-exam',unit:3};
  return null;
}

export function homeView(){
  const done=LESSONS.filter(l=>S.lessons[l.id]).length;
  if(!S.placed) return card('أهلاً بك 👋',
    '<p class="muted">قبل أن نبدأ، اختبار قصير من 10 أسئلة يحدد نقطة انطلاقك. يستغرق دقيقتين، ولا توجد إجابة تُحسب عليك.</p><div class="row"><button class="btn" onclick="launch(\'place\')">ابدأ اختبار تحديد المستوى</button></div>');

  const nx=nextStep();
  const pct=Math.round(done/LESSONS.length*100);
  const top=Object.entries(S.errs||{}).sort((a,b)=>b[1]-a[1])[0];

  return ringCard(pct)+
  `<div class="stats">
    <div class="stat s1"><b>${ar(done)}<span style="font-size:14px">/${ar(LESSONS.length)}</span></b><span>دروس متقنة</span></div>
    <div class="stat s2"><b>${ar(Object.keys(S.cp).length)}<span style="font-size:14px">/٣</span></b><span>وحدات مجتازة</span></div>
    <div class="stat s3"><b>${ar(S.xp)}</b><span>نقاط XP</span></div></div>`+
  (nx?card('تابع من حيث توقفت',
    `<p style="font-size:15px;font-weight:600;line-height:1.6">${nx.label}</p>
     <div class="row" style="justify-content:flex-start"><button class="btn" onclick="${nx.act}">${svg('mic',18,'#fff')} ${nx.cta}</button></div>`):'')+
  (top?card('خطؤك المتكرر',
    `<div style="display:flex;align-items:center;gap:11px">
       <span style="width:40px;height:40px;flex:0 0 40px;display:grid;place-items:center;background:var(--badBg);border-radius:13px;color:var(--coral)">${svg('alert',19)}</span>
       <span style="flex:1;min-width:0"><span class="muted" style="display:block">${top[0]}</span>
       <span class="muted" style="display:block;font-size:12px">تكرر ${ar(top[1])} مرة</span></span>
       <button class="btn ghost" style="margin:0" onclick="go('speak')">درّبني</button></div>`):'')+
  card('الامتحان النهائي',
    `<p class="muted">${S.exam?'🎉 أتممت مستوى A1':'يُفتح بعد اجتياز الوحدات الثلاث واختبارات الاستبقاء'}</p>
     <div class="row" style="justify-content:flex-start"><button class="btn ghost" onclick="go('course')">عرض الرحلة كاملة</button></div>`);
}

/* أرقام عربية-هندية في الواجهة العربية، والإنجليزية تبقى كما هي. */

export function ringCard(pct){
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
  return `<div class="card" style="display:flex;flex-direction:column;align-items:center;padding-top:10px">
    <div style="position:relative;width:186px;height:186px">
      <svg width="186" height="186" viewBox="0 0 200 200" role="img" aria-label="أتممتَ ${pct} بالمئة من دروس المستوى">
        <circle cx="100" cy="100" r="66" fill="none" stroke="var(--line)" stroke-width="13"/>
        <circle cx="100" cy="100" r="66" fill="none" stroke="var(--ind)" stroke-width="13" stroke-linecap="round"
                stroke-dasharray="${C}" stroke-dashoffset="${(C*(1-p)).toFixed(1)}" transform="rotate(-90 100 100)"/>
        ${ticks}
      </svg>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
        <span class="dsp" style="font-size:44px;line-height:1">${ar(pct)}<span style="font-size:20px">٪</span></span>
        <span class="muted" style="font-size:12px">من مستوى <span class="en">${S.level}</span></span>
      </div>
    </div>
    <div class="muted" style="font-size:12px;margin-top:10px">هدف الكلام اليومي</div>
    <div role="group" aria-label="هدف اليوم" style="display:flex;gap:5px;background:var(--surf2);border-radius:999px;padding:4px;margin-top:7px">${goals}</div>
  </div>`;
}
export function setGoal(g){S.goal=g;save();hooks.render()}
