/* شاشة الاختبار: السؤال، والخيارات، والشرح عند الخطأ، والنتيجة. */
import {LESSONS} from '../content/lessons.js';
import {S,logError} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {ITEM_RULE,UNIT_NS} from '../engine/progress.js';
import {speakTurn,startFrom,itemTyped} from '../engine/quiz.js';
import {card,svg,ar,ruleCard,toggleRule,esc} from './ui.js';

export function speakPanel(q,it){if(q.kind!=='conv'||q.picked==null)return '';if(q.typed)return `<p class=muted style='margin-top:8px'>كُتبت ولم تُنطق — <b style="color:var(--amber)">لم يُقَس النطق</b>${q.heard?'<br>ما كتبته: «'+esc(q.heard)+'»':''}</p>`;
  if(q.spoke!=null)return `<p class=muted style='margin-top:8px'>دقة النطق: ${ar(q.spoke)}٪${q.heard?'<br>سمعتُ: «'+esc(q.heard)+'»':''}</p>`;return `<div style='background:#EEF2FF;border-radius:14px;padding:12px;margin-top:12px'><div class=muted>الآن قل الجملة الصحيحة بصوتك أو اكتبها:</div><div class=en style='font-size:18px;margin:8px 0;font-weight:700'>${it.o[it.a]}</div><div class=row><button class=btn onclick='mic2()'>🎙️ تحدّث</button></div><div class=row style='margin-top:8px'><input id=ctxt2 class=en placeholder='Type it' style='direction:ltr;max-width:220px;margin:0;padding:10px;border:2px solid var(--line);border-radius:12px'><button class='btn' onclick='typed2()'>✓</button></div>${q.heard?`<p class=muted style='margin-top:8px'>سمعتُ: «${q.heard}»</p>`:''}${q.feedback?`<p class=muted style='margin-top:8px'>${q.feedback}</p>`:''}</div>`}

export function mic2(){const R=window.SpeechRecognition||window.webkitSpeechRecognition;const q=S.q;if(!R){q.feedback='التعرف على الصوت غير مدعوم هنا، اكتب الجملة في المربع';hooks.render();return}const r=new R();r.lang='en-US';r.onresult=e=>speakTurn(e.results[0][0].transcript.trim());r.onerror=e=>{q.feedback='تعذّر التسجيل ('+e.error+')';hooks.render()};
 try{r.start()}catch(x){logError('بدء التسجيل',x);q.feedback='تعذّر بدء التسجيل. اضغط مرة واحدة فقط، أو اكتب الجملة في المربع';hooks.render()}}
export function typed2(){const el=document.getElementById('ctxt2');speakTurn(el?el.value.trim():'',true)}

export function itemRuleHtml(q,it){
  const id=ITEM_RULE.get(it);if(!id)return '';
  /* المعيار هو صحّة الإجابة لا مطابقة فهرس الخيار: التمرين المكتوب لا فهرس له. */
  if(q.choiceOk&&S.ruleOpen!==id)
    return `<div class="row" style="margin-top:8px"><button class='btn ghost' onclick="toggleRule('${id}')">راجع القاعدة</button></div>`;
  return ruleCard(id,'brief');
}
/* الرسوب في بوابة لا يعرض «أعد المحاولة»، بل يوجّه إلى تدريب ما أخطأ فيه. */

/* المراجعة ليست بوابة تُجتاز، فلا يصحّ أن يُقال فيها «المطلوب كذا إجابات»:
   المقصود منها تحريك الصناديق، وما أخطأ فيه سيعود إليه غداً وحده. */
function resultNote(q){
  if(q.kind==='review'){
    const miss=q.items.length-q.score;
    return miss?'ما أخطأت فيه رجع إلى صندوق اليوم وسيعود غداً، وما أصبتَ طال أجله.'
      :'أصبتَ في كلّها، فطالت آجالها جميعاً. لن تعود قريباً.';
  }
  return q.pass?'أحسنت، تابع إلى الخطوة التالية':'المطلوب '+ar(q.need)+' إجابات صحيحة';
}

function resultActions(q){
  /* المراجعة لا تُعاد: ما أخطأت فيه رجع إلى صندوق اليوم وسيعود غداً وحده،
     وإعادته الآن تقيس الذاكرة القريبة لا المحفوظ — وهذا ينقض المقصود. */
  if(q.kind==='review')
    return '<button class="btn" onclick="goHome()">تمام</button>';
  if(q.pass)
    return q.kind==='drill'
      ? '<button class="btn" onclick="launch(\'cp\','+q.id+')">أعد اختبار الوحدة</button>'
        +'<button class="btn ghost" onclick="closeQ()">لاحقاً</button>'
      : '<button class="btn" onclick="closeQ()">متابعة</button>';
  if((q.kind==='cp'||q.kind==='ret')&&S.drill&&S.drill.skills&&S.drill.skills.length)
    return `<button class="btn" onclick="launch('drill',${Number(S.drill.unit)||1})">درّبني على ما أخطأت فيه</button>
            <button class="btn ghost" onclick="closeQ()">لاحقاً</button>`;
  return '<button class="btn" onclick="retryQ()">أعد المحاولة</button><button class="btn ghost" onclick="closeQ()">رجوع</button>';
}
export function quizView(){
  const q=S.q;
  if(q.done){
    if(q.kind==='place'){const p=S.place;
      const bars=UNIT_NS.map(u=>{
        const a=p.acc&&p.acc[u];
        const pc=a===null||a===undefined?0:Math.round(a*100);
        return `<div style="margin-top:9px">
          <div style="display:flex;justify-content:space-between;font-size:12px">
            <span class="muted">الوحدة ${ar(u)}</span>
            <span style="font-weight:700;color:${a===null||a===undefined?'var(--faint)':(a>=0.75?'var(--green)':'var(--amber)')}">${a===null||a===undefined?'لم تُقَس':ar(pc)+'٪'}</span></div>
          <div class="bar" style="margin-top:4px"><i style="width:${pc}%;background:${a>=0.75?'var(--green)':'var(--amber)'}"></i></div></div>`;
      }).join('');

      const sug=UNIT_NS.includes(Number(p.suggest))?Number(p.suggest):1;
      return `<div class="card" style="text-align:center;padding-top:22px">
          <span class="muted" style="font-size:12px">من أين تبدأ</span>
          <div class="dsp" style="font-size:42px;line-height:1.15">الوحدة ${ar(sug)}</div>
          <p class="muted" style="margin-top:6px;font-size:12px">هذا الاختبار يحدّد نقطة بدايتك داخل
            أساسيات A1 — لا مستواك في الإنجليزية عموماً.</p>
        </div>
        ${card('أين أنت من كل وحدة؟',bars)}
        ${sug>1
          ? card('نقترح أن تبدأ من الوحدة '+ar(sug),
              '<p class="muted">أجبتَ جيداً عن أسئلة الوحدات قبلها، فيمكنك تخطّيها — وتبقى مفتوحة للمراجعة متى شئت. والقرار لك.</p>'
              +`<div class="row" style="justify-content:flex-start">
                  <button class="btn" onclick="startFrom(${sug})">ابدأ من الوحدة ${ar(sug)}</button>
                  <button class="btn ghost" onclick="startFrom(1)">ابدأ من الأول</button></div>`)
          : card('نبدأ من البداية',
              '<p class="muted">سنبني الأساس خطوة بخطوة من الوحدة الأولى.</p>'
              +'<div class="row" style="justify-content:flex-start"><button class="btn" onclick="startFrom(1)">ابدأ الدورة</button></div>')}`;
    }
    const pc=Math.round(q.score/q.items.length*100);
    const tips=q.wrong.map(x=>`<p class="muted">💡 ${x.tip}</p>`).join('');
    return `<div class="card" style="text-align:center;padding-top:22px">
        <div class="dsp" style="font-size:52px;line-height:1;color:${q.pass?'var(--green)':'var(--amber)'}">${ar(q.score)}<span style="font-size:24px;color:var(--mute)">/${ar(q.items.length)}</span></div>
        <div class="bar" style="max-width:220px;margin:14px auto 0"><i style="width:${pc}%;background:${q.pass?'var(--green)':'var(--amber)'}"></i></div>
        <h2 style="margin-top:14px">${q.pass?'🎉 اجتزت '+q.title:'لم تجتز بعد'}</h2>
        <p class="muted">${resultNote(q)}${
          q.attempt&&q.attempt>1?' · المحاولة '+ar(q.attempt):''}</p>
        <div class="row" style="margin-top:6px">${resultActions(q)}</div>
      </div>${tips?card('ما تحتاج مراجعته',tips):''}`;
  }
  const it=q.items[q.i],total=q.kind==='place'?10:q.items.length;
  const opts=itemTyped(it)?typedPanel(q,it)
    :it.o.map((o,k)=>{let c='';if(q.picked!=null){if(k===it.a)c='ok';else if(k===q.picked)c='bad'}
      return `<button class="opt en ${c}" ${q.picked!=null?'disabled':''} onclick="pick(${k})">${o}</button>`}).join('');
  return `<div class="card">
     <div style="display:flex;align-items:center;gap:11px">
       <div class="bar" style="flex:1;margin:0"><i style="width:${q.i/total*100}%"></i></div>
       <span class="muted" style="font-size:12px;font-weight:700;flex:0 0 auto">${ar(q.i+1)} من ${ar(total)}</span></div>
     <p class="muted" style="margin-top:12px;font-size:12px">${q.title}</p>
     ${itemTyped(it)?askHtml(it):`<div class="mean en" style="font-size:19px;margin-top:6px;line-height:1.7;font-weight:500">${it.q}</div>`}${opts}
     ${speakPanel(q,it)}${q.picked!=null&&(q.kind!=='conv'||q.spoke!=null)?`<p class='muted' style='margin-top:10px'>💡 ${it.tip}</p>${itemRuleHtml(q,it)}<div class="row"><button class="btn" onclick="nextQ()">${q.i+1>=total?'النتيجة':'التالي ←'}</button></div>`:''}
     <div class="row" style="margin-top:4px"><button class="btn ghost" style="background:transparent;color:var(--faint)" onclick="closeQ()">إلغاء</button></div></div>`;
}


/* ================= التمارين المكتوبة ================= */

/* تعليمات التمرين المكتوب بالعربية، والمعروض منه إنجليزي معزول الاتجاه. */
function askHtml(it){
  const label={type:'أكمل الناقص',order:'رتّب ثم اكتب',correct:'صحّح الجملة',listen:'استمع واكتب'}[it.k]||'';
  /* الإملاء: لا يُعرض النصّ ألبتة — عرضه يجعله نقلاً لا استماعاً.
     والإعادة مباحة بلا حدّ: المقصود أن يسمع حتى يتبيّن، لا أن يلتقط من أوّل مرّة. */
  if(it.k==='listen')
    return `<p class="muted" style="margin-top:10px;font-size:12px">${label}</p>
      <p style="margin-top:3px;font-weight:700">${esc(it.ar)}</p>
      <div class="row" style="justify-content:flex-start;margin-top:12px">
        <button class="btn" onclick="sayItem()">${svg('sound',18,'#fff')} استمع</button>
        <button class="btn ghost" onclick="sayItem(0.6)">ببطء</button></div>`;
  const body=it.k==='order'
    ? `<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;direction:ltr">${
        (it.w||[]).map(w=>`<span class="en" style="padding:6px 11px;border-radius:10px;background:var(--surf2);
          border:1.5px solid var(--line);font-size:14px;font-weight:600">${esc(w)}</span>`).join('')}</div>`
    : `<div class="mean en" dir="ltr" style="text-align:left;font-size:19px;margin-top:8px;line-height:1.7;font-weight:500">${esc(it.q)}</div>`;
  return `<p class="muted" style="margin-top:10px;font-size:12px">${label}</p>
    ${it.ar?`<p style="margin-top:3px;font-weight:700">${esc(it.ar)}</p>`:''}${body}`;
}

function typedPanel(q,it){
  if(q.picked!=null){
    const ok=q.choiceOk;
    return `<div style="margin-top:12px;background:var(--surf2);border-radius:14px;padding:12px">
        <p class="muted" style="font-size:12px">إجابتك</p>
        <p class="en" dir="ltr" style="text-align:left;margin-top:3px;font-weight:700;
          color:${ok?'var(--green)':'var(--coral)'}">${esc(q.typedAns)||'— لم تكتب —'}</p>
        ${ok?'':`<p class="muted" style="margin-top:6px;font-size:12.5px">الصواب:
          <span class="en" dir="ltr" style="font-weight:700">${esc(it.ok[0])}</span></p>`}
      </div>`;
  }
  return `<input id="qtxt" class="en" dir="ltr" placeholder="${it.k==='type'?'the missing word':'write it here'}"
      style="width:100%;box-sizing:border-box;margin-top:12px;padding:12px 13px;border-radius:13px;
      border:2px solid var(--line);background:var(--surf2);color:inherit;font-size:16px">
    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="answerTyped()">تحقّق</button>
      <button class="btn ghost" style="background:transparent;color:var(--faint)"
        onclick="revealTyped()">لا أعرف</button></div>`;
}

/* ================= التحدث ================= */
