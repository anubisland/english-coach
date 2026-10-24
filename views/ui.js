/* عناصر الواجهة المشتركة: الأيقونات، البطاقة، التنبيه، النطق، بطاقة القاعدة. */
import {RULE} from '../content/rules.js';
import {S,save,logError,saveFailed,bootWarn} from '../engine/state.js';
import {hooks} from '../engine/bus.js';

export const ICON={
 home:'<path d="M3 10.2 12 3l9 7.2V20a1.4 1.4 0 0 1-1.4 1.4H4.4A1.4 1.4 0 0 1 3 20v-9.8Z"/>',
 map:'<circle cx="17" cy="5.5" r="2.6"/><circle cx="7" cy="18.5" r="2.6"/><path d="M17 8.1v3.4a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3"/>',
 mic:'<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
 check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
 lock:'<rect x="4.5" y="10.5" width="15" height="10" rx="2.4"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>',
 shield:'<path d="M12 3l7.5 3v5.4c0 4.5-3.1 8.4-7.5 9.6-4.4-1.2-7.5-5.1-7.5-9.6V6L12 3Z"/>',
 flame:'<path d="M12 3c0 3-4 4.2-4 8a4 4 0 0 0 8 0c0-1.3-.6-2.3-1.2-3.2C16.6 9 18 11 18 13.5A6 6 0 0 1 6 14C6 9 12 8 12 3Z"/>',
 sound:'<path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6"/>',
 alert:'<path d="M12 8.5v4.2M12 16.4h.01M10.3 3.9 2.6 17.2A1.9 1.9 0 0 0 4.3 20h15.4a1.9 1.9 0 0 0 1.7-2.8L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z"/>',
 book:'<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5v-15Z"/><path d="M8 3v18"/>'
};
export function svg(name,size,color){
  return `<svg width="${size||20}" height="${size||20}" viewBox="0 0 24 24" fill="none" stroke="${color||'currentColor'}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
}

export function toast(t){const e=document.getElementById('toast');if(!e)return;e.textContent=t;e.style.display='block';clearTimeout(e._t);e._t=setTimeout(()=>e.style.display='none',1800)}
/* الفشل الشائع للنطق غير متزامن (لا إذن، أو لا صوت إنجليزي مثبّت) ويصل عبر onerror لا عبر throw. */

export function say(t,r=0.9){
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=r;
    u.onerror=ev=>{logError('نطق الجملة',(ev&&ev.error)||ev);toast('تعذّر تشغيل الصوت، جرّب Chrome أو Edge')};
    speechSynthesis.speak(u);
  }catch(e){logError('تشغيل الصوت',e);toast('الصوت غير متاح في هذا المتصفح، جرّب Chrome أو Edge')}
}

export function card(h,b){return `<div class="card"><h2>${h}</h2>${b}</div>`}
/* تحذير يبقى ظاهراً ما دام سببه قائماً، بخلاف التنبيه العابر. */

export function banners(){
  let h='';
  if(saveFailed)h+='<div class="card warn"><h2>⚠️ تقدّمك لا يُحفظ في هذا المتصفح</h2><p class="muted">أكمل درسك الآن لكن لا تغلق الصفحة. جرّب نافذة عادية بدل التصفح الخاص، أو متصفحاً آخر.</p></div>';
  if(bootWarn)h+='<div class="card warn"><h2>⚠️ تعذّرت قراءة تقدّمك السابق</h2><p class="muted">بدأنا من جديد. '+bootWarn+'</p></div>';
  return h;
}

/* يعرض التحليل لا الرقم وحده: أي كلمة سُمعت، وأي صوت هو المشتبه به،
   وكيف يُنطق — مع مدخل مباشر إلى تدريب ذلك الصوت. */
export function pronHtml(p){
  if(p.typed)return `<div style='margin-top:10px'><p class=muted>كُتبت ولم تُنطق — <b style="color:var(--amber)">لم يُقَس النطق</b></p>`
    +(p.miss&&p.miss.length?`<p class=muted>كلمات ناقصة: ${esc(p.miss.join('، '))}</p>`:'')+'</div>';

  /* لم يصل صوت: نقول ذلك ولا نعرض صفراً. الصفر هنا كذب واثق. */
  if(p.nothing)return `<div style="margin-top:10px;background:var(--surf2);border-radius:14px;padding:12px">
    <span class=muted>${esc(p.nothing)}</span></div>`;

  const tone=p.sc>=80?'var(--green)':p.sc>=55?'var(--amber)':'var(--coral)';
  const chips=(p.items||[]).map(i=>{
    const c=i.state==='ok'?'var(--green)':i.state==='near'?'var(--amber)':'var(--coral)';
    const mark=i.state==='ok'?'':i.state==='near'?'≈':'✗';
    return `<span class="en" style="display:inline-block;margin:3px 3px 0 0;padding:4px 9px;border-radius:9px;
      background:var(--surf2);border:1.5px solid ${c};font-size:13px">${esc(i.w)}${mark?' '+mark:''}</span>`;
  }).join('');

  const sus=(p.suspects||[]).map(x=>`<div style="background:var(--surf2);border-radius:14px;padding:12px;margin-top:9px">
      <div style="display:flex;align-items:center;gap:8px">
        <b style="flex:1;font-size:13.5px;color:var(--ind2)">${esc(x.sound.t)}</b>
        <span class="muted" style="font-size:11.5px">${esc(x.sound.bad)}</span></div>
      <p class="muted" style="margin-top:6px">${emph(x.sound.fix)}</p>
      <button class="btn ghost" style="background:var(--surf);margin-top:8px"
        onclick="startSound('${x.id}')">درّبني على هذا الصوت</button></div>`).join('');

  return `<div style="margin-top:10px">
    <p>دقة النطق: <b style="color:${tone};font-size:19px">${ar(p.sc)}٪</b></p>
    ${p.heard?`<p class=muted style="font-size:12px">سمعتُ: «${esc(p.heard)}»</p>`:''}
    ${chips?`<div style="margin-top:8px;direction:ltr;text-align:left">${chips}</div>`:''}
    ${sus||(p.sc<100?`<p class=muted style="margin-top:9px">لم أستطع ردّ الخطأ إلى صوت بعينه —
      استمع إلى الجملة وكرّرها كلمةً كلمة.</p>`:'')}
  </div>`;
}

export function ruleCard(id,mode){
  const r=RULE[id];if(!r)return '';
  const open=S.ruleOpen===id;
  if(mode==='brief'&&!open)
    return `<div class="card" style="background:var(--surf2)">
      <h2 style="color:var(--ind2)">${r.t}</h2>
      <p class="muted">${r.rule}</p>
      <button class="btn ghost" style="background:var(--surf)" onclick="toggleRule('${id}')">الشرح كاملاً</button></div>`;
  const rows=r.table.map(x=>`<tr><td class="en">${x[0]}</td><td>${x[1]}</td></tr>`).join('');
  const exs=r.ex.map(x=>`<div style="margin-top:8px"><span class="en" style="font-weight:600;font-size:14.5px">${x.en}</span><br><span class="muted" style="font-size:12.5px">${x.ar}</span></div>`).join('');
  return `<div class="card" style="background:var(--surf2)">
    <h2 style="color:var(--ind2)">${r.t}</h2>
    <p style="line-height:1.9;font-size:14.5px">${r.rule}</p>
    <p class="muted" style="margin-top:8px">${r.why}</p>
    <table class="g">${rows}</table>
    ${r.more.map(x=>`<p class="muted" style="margin-top:8px">• ${x}</p>`).join('')}
    <p style="margin-top:14px;font-weight:700;font-size:13.5px">أمثلة</p>${exs}
    <p style="margin-top:14px;font-weight:700;font-size:13.5px">أخطاء شائعة</p>
    ${r.bad.map(x=>`<p class="muted" style="margin-top:6px">✗ ${x}</p>`).join('')}
    <div style="background:var(--bg);border-radius:14px;padding:13px;margin-top:14px;border-right:3px solid var(--green)">
      <b style="color:var(--green);font-size:13.5px">لماذا يخطئ العربي هنا؟</b>
      <p class="muted" style="margin-top:6px">${r.ar}</p></div>
    ${mode==='brief'?`<button class="btn ghost" style="background:var(--surf)" onclick="toggleRule('${id}')">إخفاء الشرح</button>`:''}
  </div>`;
}
export function toggleRule(id){S.ruleOpen=S.ruleOpen===id?null:id;save();hooks.render()}

/* أي نصّ قد يأتي من حالة محفوظة يمرّ من هنا قبل أن يدخل الصفحة. */
/* تشديد خفيف داخل نصوص الشرح: يُهرَّب النص كاملاً أولاً، ثم تُحوَّل **…** وحدها
   إلى <b>. آمن لأن أي وسم في المصدر صار بالفعل &lt;. */
export function emph(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}

export function esc(t){
  return String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
/* تمييز العدد في العربية: 3–10 جمع مجرور، و11 فأكثر مفرد منصوب.
   «12 تمارين» خطأ في تطبيق لتعليم اللغة. */
export function count(n, singular, plural) {
  const x = Number(n) || 0;
  if (x === 1) return singular;
  if (x === 2) return singular + 'ان';
  if (x >= 3 && x <= 10) return ar(x) + ' ' + plural;
  return ar(x) + ' ' + singular + 'اً';
}
export function ar(n){return String(n).replace(/[0-9]/g,c=>'٠١٢٣٤٥٦٧٨٩'[+c])}
