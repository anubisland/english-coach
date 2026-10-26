/* خريطة الرحلة: خط متصل ومحطات — درس، ومحادثة، وبوابة وحدة. */
import {UNITS,LESSONS} from '../content/lessons.js';
import {S,save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {unitLessons,convoList,unitOpen,lessonOpen,convoOpen,examOpen,unitDone,currentUnit,LAST_UNIT,LEVELS_BUILT,levelExamOpen} from '../engine/progress.js';
import {RULE} from '../content/rules.js';
import {card,svg,ar,ruleCard,esc,count,resultLine} from './ui.js';
import {nextStep} from './home.js';

export function stop(o){
  const card=`<div class="stopCard ${o.cls||''}"><span style="flex:1;min-width:0">
      <b>${o.title}</b><span class="muted" style="display:block;font-size:11.5px">${o.meta}</span></span>
      ${o.act?`<span class="btn ghost" style="margin:0;padding:8px 13px;min-height:0;font-size:12px">${o.cls==='now'?'تابع':'افتح'}</span>`:''}</div>`;
  return `<div class="unit"${o.id?` id="${o.id}"`:''}><div class="spine ${o.lit?'lit':''} ${o.first?'first':''} ${o.last?'last':''}"><i></i>${o.dot}</div>
    <div class="stop">${o.act?`<a href="javascript:void(0)" onclick="${o.act}" style="text-decoration:none;color:inherit;display:block">${card}</a>`:card}</div></div>`;
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
    const LS=unitLessons(u.n);
    const skipped=!!S.skipped[u.n];
    const ls=LS.map((l,i)=>{const ok=!!S.lessons[l.id],av=lessonOpen(l);
      /* في وحدة تخطّاها اختبار المستوى لا توجد «محطة حالية»: كلها متاحة
         للمراجعة، وإبراز أولها يناقض وسم «تخطّيتها». */
      const now=av&&!ok&&!skipped;
      return stop({
        id:'st-l-'+l.id,
        first:i===0,
        lit:ok||now,
        dot:ok?`<div class="dot done">${svg('check',13,'var(--onGreen)')}</div>`
            :now?'<div class="dot now"></div>'
            :skipped?'<div class="dot"></div>'
            :`<div class="dot">${svg('lock',11)}</div>`,
        cls:now?'now':(av?'':'locked'),
        title:`${l.id} — ${l.t}`,
        meta:av?(ok?'متقن · اضغط للمراجعة':(skipped?'متاح للمراجعة · '+count(l.items.length,'تمرين','تمارين'):count(l.items.length,'تمرين','تمارين'))):'يفتح بعد الدرس السابق',
        act:av?`openLesson('${l.id}')`:''
      })}).join('');
    const gate=`${cpBtn(u.n)}${retBtn(u.n)}`;
    const extra=unitOpen(u.n)?convoHtml(u.n)+stop({
      id:'st-g-'+u.n,
      last:true,lit:!!S.cp[u.n],
      dot:S.cp[u.n]?`<div class="dot done">${svg('check',13,'var(--onGreen)')}</div>`:`<div class="dot mic">${svg('shield',13)}</div>`,
      cls:'locked',
      title:`بوابة الوحدة ${ar(u.n)}`,
      meta:S.cp[u.n]?'مُجتازة':'٨ أسئلة · تحتاج ٧ صحيحة'
    }).replace('</div></div>',`<div class="row" style="justify-content:flex-start">${gate}</div></div></div>`):'';
    h+=card(`الوحدة ${u.n}: ${u.t} ${unitStatus(u.n)}`, unitOpen(u.n)?(unitDone(u.n)?'<details><summary class=muted>عرض دروس الوحدة للمراجعة</summary>'+ls+extra+'</details>':ls+extra):'<p class="muted">🔒 تُفتح بعد اجتياز اختبار الوحدة السابقة واختبار استبقائها</p>');
  }
  h+=card('اختبار الإملاء',
    '<p class="muted">عشر جمل تسمعها وتكتبها — أصدق قياس للاستماع في البرنامج.</p>'
    +resultLine('dictation')
    +'<div class="row" style="justify-content:flex-start"><button class="btn" onclick="examDictStart()">ابدأ اختبار الإملاء</button></div>');
  h+=card('اختبار القراءة',
    '<p class="muted">نصّ قصير من الحياة اليومية ثم أسئلة عليه، ويُقاس زمن قراءتك معه.</p>'
    +resultLine('read')
    +'<div class="row" style="justify-content:flex-start"><button class="btn" onclick="examReadStart()">ابدأ اختبار القراءة</button></div>');
  h+=card('اختبار الكتابة',
    '<p class="muted">إحدى عشرة مسألة تكتبها بيدك: ترتيب كلمات، وإكمال ناقص، وكتابة جملة، وكتابة موجّهة. لا خيارات.</p>'
    +resultLine('write')
    +'<div class="row" style="justify-content:flex-start"><button class="btn" onclick="examWriteStart(0)">ابدأ اختبار الكتابة</button></div>');
  h+=card('اختبار الترجمة',
    '<p class="muted">ست جمل عربية تكتب ترجمتها بنفسك — بلا خيارات ولا جملة أمامك تقلّدها. وهو أصدق مقياس لما تستطيع إنتاجه فعلاً.</p>'
    +'<div class="row" style="justify-content:flex-start"><button class="btn" onclick="startTranslation()">ابدأ اختبار الترجمة</button></div>');
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
export function goToStep(){
  const nx=nextStep();
  if(!nx)return;
  const el=document.getElementById&&document.getElementById(nx.anchor);
  if(el&&el.scrollIntoView)el.scrollIntoView({block:'center',behavior:'smooth'});
}
export function openLesson(id){S.open=id;S.tab='course';save();hooks.render();window.scrollTo(0,0)}
export function cpBtn(u){
  if(!unitLessons(u).every(l=>S.lessons[l.id])||!convoList(u).every(c=>S.conv[c.id])) return '';
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
