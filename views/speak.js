/* شاشة المحادثة: فقاعات الحوار، وقلم المصحّح، والمقاييس. */
import {SCENES} from '../content/scenes.js';
import {S} from '../engine/state.js';
import {chatClamp,penDiff} from '../engine/chat.js';
import {card,svg,ar,pronHtml,ruleCard} from './ui.js';

/* ترتيب العرض: الأقرب إلى درس المتعلم أولاً، ثم اتساعاً نحو الحياة العامة. */
const CAT_ORDER=['درس','يومي','اجتماعي','تسوّق','سفر','صحة','عمل'];

export function chatMeters(c){
  const gn=(c.g||[]).length;
  const m=[
    {l:'صلة',  t:c.ok?'مناسبة':'لا تناسب', v:c.ok?100:12, c:c.ok?'var(--teal)':'var(--coral)'},
    {l:'جرامر',t:gn?ar(gn)+' ملاحظة':'سليم', v:gn?Math.max(25,100-gn*30):100, c:gn?'var(--amber)':'var(--green)'}
  ];
  if(c.pr)m.push({l:'نطق',t:ar(c.pr.sc)+'٪',v:c.pr.sc,c:c.pr.sc>=75?'var(--green)':'var(--amber)'});
  else m.push({l:'نطق',t:'لم يُقس بعد',v:0,c:'var(--line)'});
  return `<div class="meters">${m.map(x=>
    `<div class="meter"><b>${x.l} · ${x.t}</b><u><i style="width:${x.v}%;background:${x.c}"></i></u></div>`).join('')}</div>`;
}

export function chatFeedback(c,T){
  const clean=!c.g||!c.g.length;
  let h='<div class="stream">';

  /* فقاعة المتعلّم: نصّه كما قاله، والتصحيح داخله لا تحته */
  h+=`<div class="bub me"><p class="en" style="font-size:15.5px;line-height:${clean?'1.6':'2.6'};margin:0">${
    clean?String(c.said||'').replace(/[&<>]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[x])):penDiff(c.said,c.fixed)}</p></div>`;

  h+='</div>';
  h+=chatMeters(c);

  /* ملاحظة المصحّح بالعربية */
  h+=`<div class="card" style="margin-top:12px;border-right:3px solid ${c.ok?'var(--green)':'var(--amber)'}">`;
  h+=c.ok?'<h2 style="color:var(--green)">فهمت إجابتك</h2>'
         :'<h2 style="color:var(--amber)">إجابتك لا تناسب هذا السؤال</h2>';
  if(!clean){
    h+=c.g.map(x=>`<p class="muted">• ${x.ar}</p>`).join('');
    h+=`<p style="margin-top:9px;font-size:13px;color:var(--mute)">والصحيح أن تقول:</p>
        <p class="en" style="font-size:15.5px;font-weight:600;color:var(--green);margin-top:3px">${c.fixed}</p>`;
  } else h+='<p class="muted">جرامر إجابتك سليم ✅</p>';
  h+=`<p style="margin-top:9px;font-size:13px;color:var(--mute)">الإجابة النموذجية:</p>
      <p class="en" style="font-size:15.5px;font-weight:600;margin-top:3px">${T.model}</p>`;
  h+='</div>';

  if(!clean)h+=c.g.filter(x=>x.rid).map(x=>ruleCard(x.rid,'brief')).join('');

  /* خطوة النطق */
  h+=`<div class="card"><h2>قل الإجابة النموذجية بصوتك</h2>`;
  if(c.pr)h+=pronHtml(c.pr);
  if(c.fb)h+=`<p class="muted">${c.fb}</p>`;
  h+=`<div class="row" style="justify-content:flex-start">
        <button class="btn" onclick="chatModel()">${svg('mic',18,'#fff')} تحدّث</button>
        <button class="btn ghost" onclick="chatNext()">السؤال التالي ←</button></div>
      <div class="row" style="justify-content:flex-start;margin-top:8px">
        <input id="chatPr" class="en" placeholder="أو اكتبها" style="flex:1;min-width:0;padding:11px 13px;border:2px solid var(--line);border-radius:14px;background:var(--surf2);color:var(--ink)">
        <button class="btn ghost" style="margin:0" onclick="chatModelTyped()">✓</button></div>`;
  if(!c.ok)h+=`<div class="row" style="justify-content:flex-start;margin-top:8px"><button class="btn ghost" onclick="chatRetry()">أعد الإجابة</button></div>`;
  return h+'</div>';
}
export function speakView(){
  chatClamp();
  const c=S.chat,sc=SCENES[c.sc],T=sc.turns[c.ti];
  const top=Object.entries(S.errs||{}).sort((a,b)=>b[1]-a[1]).slice(0,3);

  /* 38 مشهداً لا تُعرض في شريط واحد: نصنّفها، ثم نعرض مشاهد التصنيف المختار.
     ويبقى تصنيف المشهد الحالي مختاراً تلقائياً حتى لا يختفي من أمام المتعلم. */
  const cats=['الكل',...CAT_ORDER.filter(k=>SCENES.some(x=>x.cat===k))];
  const pickedCat=cats.includes(c.cat)?c.cat:'الكل';
  const chip=(on)=>'margin:0;padding:7px 13px;min-height:0;border-radius:999px;font-size:12px;white-space:nowrap'
    +(on?'':';background:var(--surf2);color:var(--mute)');

  const catBar=`<div style="display:flex;gap:6px;overflow-x:auto;padding:2px 0 6px">${
    cats.map(k=>`<button class="btn${k===pickedCat?'':' ghost'}" style="${chip(k===pickedCat)}" onclick="chatCat('${k}')">${k}${k==='الكل'?' ('+ar(SCENES.length)+')':''}</button>`).join('')}</div>`;

  const list=SCENES.map((x,i)=>({x,i})).filter(o=>pickedCat==='الكل'||o.x.cat===pickedCat);
  const picker=catBar+`<div style="display:flex;gap:7px;overflow-x:auto;padding:2px 0 4px;-webkit-overflow-scrolling:touch">${
    list.map(o=>`<button class="btn${o.i===c.sc?'':' ghost'}" style="${chip(o.i===c.sc)};font-size:12.5px;padding:8px 14px" onclick="chatPick(${o.i})">${o.x.les?'درس '+o.x.les:o.x.t}</button>`).join('')}</div>`;

  /* نقاط تقدّم المشهد */
  const dots=sc.turns.map((_,i)=>
    `<span style="width:17px;height:4px;border-radius:2px;background:${i<c.ti?'var(--green)':i===c.ti?'var(--ind)':'var(--line)'}"></span>`).join('');

  let out=`<div class="card" style="padding:14px 16px 16px">
    <div style="display:flex;align-items:center;gap:10px">
      <span style="flex:1;min-width:0"><b style="font-size:14.5px">${sc.t}</b>
        <span class="muted" style="display:block;font-size:11.5px">السؤال ${ar(c.ti+1)} من ${ar(sc.turns.length)}</span></span>
      <span style="display:flex;gap:4px">${dots}</span></div>

    <div class="stream">
      <div class="bub them">
        <p class="en" style="font-size:15.5px;margin:0">${T.p}</p>
        <button class="btn ghost" style="margin-top:7px;padding:6px 11px;min-height:0;font-size:11.5px;background:transparent;color:var(--ind2)" onclick="chatSay()">${svg('sound',13)} استمع</button>
      </div>
    </div>`;

  if(c.stage==='reply'){
    out+=`<div class="row" style="justify-content:flex-start;margin-top:14px">
        <button class="btn" onclick="chatMic()">${svg('mic',18,'#fff')} أجب بصوتك</button>
        <button class="btn ghost" onclick="chatHint()">${c.hint?'إخفاء المثال':'ساعدني'}</button></div>
      <div class="row" style="justify-content:flex-start;margin-top:8px">
        <input id="chatTxt" class="en" placeholder="أو اكتب إجابتك" style="flex:1;min-width:0;padding:11px 13px;border:2px solid var(--line);border-radius:14px;background:var(--surf2);color:var(--ink)">
        <button class="btn" style="margin:0" onclick="chatType()">✓</button></div>`;
    if(c.hint)out+=`<p class="muted" style="margin-top:9px">مثال: <b class="en">${T.model}</b></p>`;
    if(c.fb)out+=`<p class="muted" style="margin-top:9px">${c.fb}</p>`;
    out+='</div>';
  } else {
    out+='</div>'+chatFeedback(c,T);
  }

  out=picker+out;
  if(top.length)out+=card('أخطاؤك المتكررة',
    top.map(([k,v])=>`<p class="muted">• ${k} <span style="color:var(--coral)">(${ar(v)})</span></p>`).join(''));
  return out;
}
