/* خريطة الرحلة: خط متصل ومحطات — درس، ومحادثة، وبوابة وحدة. */
import {UNITS,LESSONS} from '../content/lessons.js';
import {S,save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {unitLessons,convoList,unitOpen,lessonOpen,convoOpen,examOpen,unitDone,currentUnit,LAST_UNIT,LEVELS_BUILT,levelExamOpen,gateOpen} from '../engine/progress.js';
import {RULE} from '../content/rules.js';
import {card,svg,ar,ruleCard,esc,count,resultLine} from './ui.js';
import {nextStep} from './home.js';
import {unitPlan,nextInUnit} from '../engine/unit-plan.js';

export function stop(o){
  const card=`<div class="stopCard ${o.cls||''}"><span style="flex:1;min-width:0">
      <b>${o.title}</b><span class="muted" style="display:block;font-size:11.5px">${o.meta}</span></span>
      ${o.act?`<span class="btn ghost" style="margin:0;padding:8px 13px;min-height:0;font-size:12px">${o.cls==='now'?'تابع':'افتح'}</span>`:''}</div>`;
  /* foot: ما يُلحَق تحت البطاقة داخل عمودها — أزرارُ البوابة مثلاً.

     وكان يُحقَن بـreplace على أوّل '</div></div>'، وأوّلُها قفلُ
     النقطةِ والعمودِ الرفيع لا جسمُ البطاقة، فكان نصُّ البوابة يقع
     في شريط الخطّ فيُقرأ حرفاً تحت حرف. */
  return `<div class="unit"${o.id?` id="${o.id}"`:''}><div class="spine ${o.lit?'lit':''} ${o.first?'first':''} ${o.last?'last':''}"><i></i>${o.dot}</div>
    <div class="stop">${o.act?`<a href="javascript:void(0)" onclick="${o.act}" style="text-decoration:none;color:inherit;display:block">${card}</a>`:card}${
      o.foot?`<div class="row" style="justify-content:flex-start;margin-top:8px">${o.foot}</div>`:''}</div></div>`;
}
export function convoHtml(u){
  const L=convoList(u);
  return L.map(c=>{const ok=!!S.conv[c.id],av=convoOpen(c);
    return stop({
      id:'st-c-'+c.id,
      lit:ok,
      dot:ok?`<div class="dot done mic">${svg('check',13,'var(--onGreen)')}</div>`
          :`<div class="dot mic">${svg('mic',12)}</div>`,
      cls:av&&!ok?'':(av?'':'locked'),
      title:'محادثة: '+c.t,
      meta:av?(ok?'مكتملة · اضغط للإعادة':'تدرّب على القاعدة في حوار'):'بعد إتقان دروس الوحدة',
      act:av?`launch('conv','${c.id}')`:''
    })}).join('');
}

/* محطّاتُ الوحدة من unitPlan وحده.

   وكانت الخريطةُ تبني مسارَها بنفسها — دروساً فمحادثة — والمهاراتُ
   الأربع بطاقاتٍ في ذيل الصفحة خارج المسار. فيمضي المتعلّم إلى آخر
   المنهج ولم يقرأ نصّاً ولا كتب جملةً ولا أُملي عليه، وهي نصفُ ما
   تقيسه الشهادة. وبرنامجٌ يُطرح للناس لا يقوم على أن يتذكّر صاحبُه
   أن ينزل إلى الأسفل.

   والترتيب شرطٌ لا عرض: المحطّةُ تُفتح حين يبلغها، فيُمشى الطريقُ
   طريقاً لا بطاقاتٍ متناثرة. وما تمّ يبقى مفتوحاً للمراجعة. */
function planStops(n){
  const open=unitOpen(n), skipped=!!S.skipped[n];
  const nextId=(nextInUnit(n)||{}).id;
  return unitPlan(n).map((st,i)=>{
    const now=open&&!skipped&&st.id===nextId;
    const av=open&&(st.done||now||skipped);
    const mic=st.kind==='convo'?' mic':'';
    return stop({
      id:st.id,
      first:i===0,
      lit:st.done||now,
      dot:st.done?`<div class="dot done${mic}">${svg('check',13,'var(--onGreen)')}</div>`
          :now?'<div class="dot now"></div>'
          :av?`<div class="dot${mic}"></div>`
          :`<div class="dot${mic}">${svg('lock',11)}</div>`,
      cls:now?'now':(av?'':'locked'),
      title:st.t,
      /* المتخطّاةُ بالاختبار: محطّاتُها مفتوحةٌ ولم تُنجَز، فيُقال
         صراحةً إنّها للمراجعة — لا تُترك بلا بيانٍ فيظنّها ناقصة. */
      meta:!av?'تُفتح حين تبلغها'
          :st.done?st.meta+' · اضغط للإعادة'
          :skipped?'متاح للمراجعة · '+st.meta
          :st.meta,
      act:av?st.act:''
    });
  }).join('');
}

/* سطرُ الحال وزرُّ الطيّ: ما يراه المتعلّم عن وحدةٍ مطويّة.

   ويُقال فيه ما أُنجز وما بقي، فلا يُفتَح إلّا لحاجة. */
function unitSummary(n, expanded){
  const plan=unitPlan(n), done=plan.filter(x=>x.done).length;
  const left=plan.length-done;
  const txt=left===0?'كلُّ محطّاتها تمّت'
    :`${ar(done)} من ${ar(plan.length)} محطّات · بقي ${ar(left)}`;
  const bar=plan.length?Math.round(done/plan.length*100):0;
  return `<div class="row" style="justify-content:space-between;align-items:center;gap:10px;margin:0 0 ${expanded?'10px':'0'}">
      <span class="muted" style="flex:1;min-width:0;font-size:12.5px">${txt}</span>
      <button class="btn ghost" style="margin:0;padding:8px 14px;min-height:0;font-size:12.5px;white-space:nowrap"
        onclick="toggleUnit(${n})">${expanded?'اطوِ ▴':'افتح ▾'}</button></div>
    <div style="height:4px;border-radius:2px;background:var(--line);overflow:hidden;margin-bottom:${expanded?'12px':'2px'}">
      <i style="display:block;height:100%;width:${bar}%;background:var(--ind)"></i></div>`;
}

/* الطيُّ والفتح: وحدةٌ واحدةٌ مفتوحةٌ في كلّ وقت. ومن طوى المفتوحةَ
   بقيت الشاشةُ كلُّها مطويّةً حتى يختار. */
export function toggleUnit(n){
  S.openUnit = (S.openUnit===n) ? -1 : n;
  save();
  hooks.render();
}

export function unitStatus(n){
  if(unitDone(n))return '<span class="pill">✅ مكتملة</span>';
  if(S.skipped[n])return '<span class="pill" style="background:var(--surf2);color:var(--mute)">⏭️ تخطّيتها بالاختبار</span>';
  if(n===currentUnit())return '<span class="pill" style="background:var(--soft);color:var(--ind2)">📍 الوحدة الحالية</span>';
  if(unitOpen(n))return '<span class="pill" style="background:var(--surf2);color:var(--mute)">مفتوحة</span>';
  return '<span class="pill" style="background:var(--surf2);color:var(--faint)">🔒 مقفلة</span>';
}
export function courseView(){
  if(!S.placed) return card('ابدأ بتحديد المستوى أولاً','<div class="row"><button class="btn" onclick="launch(\'place\')">اختبار تحديد المستوى</button></div>');
  const nx=nextStep();
  /* أعلى الصفحة يجيب عن «إلى أين الآن؟» قبل أي شيء آخر،
     فلا يضطر المتعلم للتمرير بحثاً عن الوحدة التالية. */
  let h=(nx?`<div class="card" style="background:var(--ind);border-color:var(--ind)">
      <h2 style="color:#fff">الخطوة التالية</h2>
      <p style="color:#fff;font-size:15px;font-weight:600;line-height:1.6">${nx.label}</p>
      <div class="row" style="justify-content:flex-start">
        <button class="btn" style="background:rgba(255,255,255,.22);color:#fff" onclick="${nx.act}">${nx.cta}</button>
        <button class="btn" style="background:transparent;color:#E4E0FF" onclick="goToStep()">أرني مكانها</button>
      </div></div>`
    :card('🎉 أتممت المستوى','<p class="muted">لم يبقَ شيء مفتوح الآن. راجع ما شئت من المحطات بالأسفل.</p>'))
;
  const openLes=S.open?LESSONS.find(x=>x.id===S.open):null;
  if(S.open&&!openLes)S.open=null;
  if(openLes){const l=openLes;
    h+=card(`الدرس ${l.id}: ${l.t}`,`<p>${l.ex}</p>${l.more?`<div class='muted' style='margin-top:10px;line-height:1.9'>${l.more}</div>`:''}${(l.rules||[]).map(r=>ruleCard(r,'full')).join('')}<div class="en muted" style="margin-top:10px;line-height:1.9">${l.s.map(x=>'• '+x).join('<br>')}</div>
      <div class="row"><button class="btn" onclick="launch(\'lesson\',\'${l.id}\')">ابدأ تمارين الدرس</button><button class="btn ghost" onclick="S.open=null;hooks.render()">إغلاق</button></div>`);}
  for(const u of UNITS){
    const ls=planStops(u.n);
    const gate=`${cpBtn(u.n)}${retBtn(u.n)}`;
    const extra=unitOpen(u.n)?stop({
      id:'st-g-'+u.n,
      last:true,lit:!!S.cp[u.n],
      dot:S.cp[u.n]?`<div class="dot done">${svg('check',13,'var(--onGreen)')}</div>`:`<div class="dot mic">${svg('shield',13)}</div>`,
      cls:'locked',
      title:`بوابة الوحدة ${ar(u.n)}`,
      meta:S.cp[u.n]?'مُجتازة':'٨ أسئلة · تحتاج ٧ صحيحة',
      foot:gate
    }):'';
    /* وحدةٌ واحدةٌ مفتوحةٌ في الشاشة: التي عليها الدور، أو التي
       فتحها المتعلّم بنفسه.

       وكانت كلُّ وحدةٍ مفتوحةٍ تُفرَد بمحطّاتها كاملةً، فمن بلغ
       الوحدةَ العاشرة وجد أمامه مئةَ محطّةٍ مصفوفةً، ولا يَصل إلى
       ما هو فيه إلّا بتمريرٍ طويلٍ من أوّل الصفحة في كلّ مرّة.

       والمطويُّ يُغني عن ذلك: عنوانٌ وسطرُ حال، ويُفتح بلمسة. */
    const expanded = S.openUnit===u.n || (S.openUnit===undefined||S.openUnit===null) && u.n===currentUnit();
    h+=card(`الوحدة ${u.n}: ${u.t} ${unitStatus(u.n)}`,
      unitOpen(u.n)
        ? unitSummary(u.n, expanded) + (expanded?ls+extra:'')
        : '<p class="muted">🔒 تُفتح بعد اجتياز اختبار الوحدة السابقة واختبار استبقائها</p>');
  }
  /* امتحانٌ لكل مستوى بُني، لا امتحان واحد: ولولا ذلك لسأل امتحانُ A1
     عن الماضي والمستقبل بمجرّد إضافة وحدات A2. */
  LEVELS_BUILT.forEach(lv=>{
    const open=levelExamOpen(lv), done=!!S.levelDone[lv];
    const body=done?`<p>🎉 أتممت ${lv}</p>`
      :open?`<div class="row"><button class="btn" onclick="launch('exam','${lv}')">ابدأ الامتحان النهائي</button></div>`
      :`<p class="muted">🔒 يُفتح بعد اجتياز وحدات ${lv}</p>`;
    h+=card(`الامتحان النهائي لـ ${lv}`, body);
  });
  return h;
}
/* ينقل الشاشة إلى محطة الخطوة التالية على الخط. */
/* ومع الطيّ لا يكفي التمرير: المحطّةُ المقصودةُ قد تكون في وحدةٍ
   مطويّةٍ فلا وجودَ لها في الصفحة. فتُفتَح وحدتُها، ثمّ يُمرَّر
   إليها بعد إعادة الرسم. */
export function goToStep(){
  const nx=nextStep();
  if(!nx)return;
  if(nx.unit&&S.openUnit!==nx.unit){S.openUnit=nx.unit;save();hooks.render()}
  const scroll=()=>{
    const el=document.getElementById&&document.getElementById(nx.anchor);
    if(el&&el.scrollIntoView)el.scrollIntoView({block:'center',behavior:'smooth'});
  };
  if(typeof requestAnimationFrame==='function')requestAnimationFrame(scroll); else scroll();
}
export function openLesson(id){S.open=id;S.tab='course';save();hooks.render();window.scrollTo(0,0)}
export function cpBtn(u){
  /* الشرطُ من gateOpen لا من قائمةٍ هنا: كان يفحص الدروسَ والمحادثة
     وحدهما، فتُفتح البوابةُ على وحدةٍ لم تُقرأ ولم تُكتب ولم تُملَ
     ولم تُترجَم — وهي نصفُ ما تقيسه الشهادة.

     ومن نزل إلى الخريطة كان يجد الزرَّ مفتوحاً وإن منعته «الخطوةُ
     التالية»، فيبقى البابُ مفتوحاً من جهةٍ ومُقفَلاً من أخرى. */
  if(!gateOpen(u)){
    const left=nextInUnit(u);
    return left?`<p class="muted" style="margin:0">تبقى قبل البوابة: <b>${esc(left.t)}</b></p>`:'';
  }
  if(S.cp[u]) return '<span class="pill">✓ اختبار الوحدة مُجتاز</span>';
  if(S.drill&&S.drill.unit===u) return drillBtn();
  return `<button class="btn" onclick="launch('cp',${u})">اختبار الوحدة ${ar(u)}</button>`;
}

/* الرسوب لا يُعيدك إلى الاختبار نفسه، بل إلى ما أخطأت فيه منه. */
export function drillBtn(){
  const names=(S.drill.skills||[]).map(s=>esc((RULE[s]&&RULE[s].t)||s)).join(' · ');
  return `<div style="width:100%">
    <p class="muted" style="margin-bottom:6px">تحتاج تثبيت: <b style="color:var(--amber)">${names||'ما أخطأت فيه'}</b></p>
    <button class="btn" onclick="launch('drill',${Number(S.drill.unit)||1})">درّبني على ما أخطأت فيه</button></div>`;
}
export function retBtn(u){
  if(!S.cp[u]||u===LAST_UNIT) return '';
  if(S.ret[u]) return '<span class="pill">✓ الاستبقاء مُجتاز</span>';
  if(S.drill&&S.drill.unit===u) return '';          // التدريب أولاً، ويظهر عند البوابة
  return `<button class="btn ghost" onclick="launch('ret',${u})">اختبار الاستبقاء</button>`;
}
