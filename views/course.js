/* خريطة الرحلة: خط متصل ومحطات — درس، ومحادثة، وبوابة وحدة. */
import {UNITS,LESSONS} from '../content/lessons.js';
import {S,save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {unitLessons,convoList,unitOpen,lessonOpen,convoOpen,examOpen,unitDone} from '../engine/progress.js';
import {card,svg,ar,ruleCard} from './ui.js';

export function stop(o){
  const card=`<div class="stopCard ${o.cls||''}"><span style="flex:1;min-width:0">
      <b>${o.title}</b><span class="muted" style="display:block;font-size:11.5px">${o.meta}</span></span>
      ${o.act?`<span class="btn ghost" style="margin:0;padding:8px 13px;min-height:0;font-size:12px">${o.cls==='now'?'تابع':'افتح'}</span>`:''}</div>`;
  return `<div class="unit"><div class="spine ${o.lit?'lit':''} ${o.first?'first':''} ${o.last?'last':''}"><i></i>${o.dot}</div>
    <div class="stop">${o.act?`<a href="javascript:void(0)" onclick="${o.act}" style="text-decoration:none;color:inherit;display:block">${card}</a>`:card}</div></div>`;
}
export function convoHtml(u){
  const L=convoList(u);
  return L.map(c=>{const ok=!!S.conv[c.id],av=convoOpen(c);
    return stop({
      lit:ok,
      dot:ok?`<div class="dot done mic">${svg('check',13,'var(--onGreen)')}</div>`
          :`<div class="dot mic">${svg('mic',12)}</div>`,
      cls:av&&!ok?'':(av?'':'locked'),
      title:'محادثة: '+c.t,
      meta:av?(ok?'مكتملة · اضغط للإعادة':'تدرّب على القاعدة في حوار'):'بعد إتقان دروس الوحدة',
      act:av?`launch('conv','${c.id}')`:''
    })}).join('');
}

export function unitStatus(n){if(unitDone(n))return '<span class=pill>✅ مكتملة</span>';if(unitOpen(n))return '<span class=pill style="background:#EEF2FF;color:var(--ind)">📍 الوحدة الحالية</span>';return '<span class=pill style="background:#F3F4F6;color:var(--mute)">🔒 مقفلة</span>'}
export function courseView(){setTimeout(()=>{const p=[...document.querySelectorAll('.pill')].find(e=>e.textContent.includes('الوحدة الحالية'));if(p&&!S.open)p.scrollIntoView({block:'start'})},0);
  if(!S.placed) return card('ابدأ بتحديد المستوى أولاً','<div class="row"><button class="btn" onclick="launch(\'place\')">اختبار تحديد المستوى</button></div>');
  let h=card('اختبار تحديد المستوى (اختياري)',`<p class='muted'>يُنصح به لمعرفة مستواك قبل بدء الوحدات، ولا يلزم لبدء الدورة من A1.</p><div class='row'><button class='btn ghost' onclick="launch('place')">ابدأ الاختبار</button></div>`);
  const openLes=S.open?LESSONS.find(x=>x.id===S.open):null;
  if(S.open&&!openLes)S.open=null;
  if(openLes){const l=openLes;
    h+=card(`الدرس ${l.id}: ${l.t}`,`<p>${l.ex}</p>${l.more?`<div class='muted' style='margin-top:10px;line-height:1.9'>${l.more}</div>`:''}${(l.rules||[]).map(r=>ruleCard(r,'full')).join('')}<div class="en muted" style="margin-top:10px;line-height:1.9">${l.s.map(x=>'• '+x).join('<br>')}</div>
      <div class="row"><button class="btn" onclick="launch(\'lesson\',\'${l.id}\')">ابدأ تمارين الدرس</button><button class="btn ghost" onclick="S.open=null;hooks.render()">إغلاق</button></div>`);}
  for(const u of UNITS){
    const LS=unitLessons(u.n);
    const ls=LS.map((l,i)=>{const ok=!!S.lessons[l.id],av=lessonOpen(l);
      const now=av&&!ok;
      return stop({
        first:i===0,
        lit:ok||now,
        dot:ok?`<div class="dot done">${svg('check',13,'var(--onGreen)')}</div>`
            :now?'<div class="dot now"></div>'
            :`<div class="dot">${svg('lock',11)}</div>`,
        cls:now?'now':(av?'':'locked'),
        title:`${l.id} — ${l.t}`,
        meta:av?(ok?'متقن · اضغط للمراجعة':`${ar(l.items.length)} تمارين`):'يفتح بعد الدرس السابق',
        act:av?`openLesson('${l.id}')`:''
      })}).join('');
    const gate=`${cpBtn(u.n)}${retBtn(u.n)}`;
    const extra=unitOpen(u.n)?convoHtml(u.n)+stop({
      last:true,lit:!!S.cp[u.n],
      dot:S.cp[u.n]?`<div class="dot done">${svg('check',13,'var(--onGreen)')}</div>`:`<div class="dot mic">${svg('shield',13)}</div>`,
      cls:'locked',
      title:`بوابة الوحدة ${ar(u.n)}`,
      meta:S.cp[u.n]?'مُجتازة':'٨ أسئلة · تحتاج ٧ صحيحة'
    }).replace('</div></div>',`<div class="row" style="justify-content:flex-start">${gate}</div></div></div>`):'';
    h+=card(`الوحدة ${u.n}: ${u.t} ${unitStatus(u.n)}`, unitOpen(u.n)?(unitDone(u.n)?'<details><summary class=muted>عرض دروس الوحدة للمراجعة</summary>'+ls+extra+'</details>':ls+extra):'<p class="muted">🔒 تُفتح بعد اجتياز اختبار الوحدة السابقة واختبار استبقائها</p>');
  }
  h+=card('الامتحان النهائي لـ A1', examOpen()&&!S.exam?'<div class="row"><button class="btn" onclick="launch(\'exam\')">ابدأ الامتحان النهائي</button></div>':(S.exam?'<p>🎉 أتممت A1</p>':'<p class="muted">🔒 يُفتح بعد اجتياز الوحدات الثلاث</p>'));
  return h;
}
export function openLesson(id){S.open=id;S.tab='course';save();hooks.render();window.scrollTo(0,0)}
export function cpBtn(u){
  if(!unitLessons(u).every(l=>S.lessons[l.id])||!convoList(u).every(c=>S.conv[c.id])) return '';
  if(S.cp[u]) return '<span class="pill">✓ اختبار الوحدة مُجتاز</span>';
  return `<button class="btn" onclick="launch('cp',${u})">اختبار الوحدة ${u}</button>`;
}
export function retBtn(u){
  if(!S.cp[u]||u===3) return '';
  if(S.ret[u]) return '<span class="pill">✓ الاستبقاء مُجتاز</span>';
  return `<button class="btn ghost" onclick="launch('ret',${u})">اختبار الاستبقاء</button>`;
}
