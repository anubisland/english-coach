/* شاشة الاختبار: السؤال، والخيارات، والشرح عند الخطأ، والنتيجة. */
import {LESSONS} from '../content/lessons.js';
import {S,logError} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {ITEM_RULE} from '../engine/progress.js';
import {speakTurn,startFrom} from '../engine/quiz.js';
import {card,svg,ar,ruleCard,toggleRule} from './ui.js';

export function speakPanel(q,it){if(q.kind!=='conv'||q.picked==null)return '';if(q.spoke!=null)return `<p class=muted style='margin-top:8px'>دقة النطق: ${q.spoke}%${q.heard?'<br>سمعتُ: «'+q.heard+'»':''}</p>`;return `<div style='background:#EEF2FF;border-radius:14px;padding:12px;margin-top:12px'><div class=muted>الآن قل الجملة الصحيحة بصوتك أو اكتبها:</div><div class=en style='font-size:18px;margin:8px 0;font-weight:700'>${it.o[it.a]}</div><div class=row><button class=btn onclick='mic2()'>🎙️ تحدّث</button></div><div class=row style='margin-top:8px'><input id=ctxt2 class=en placeholder='Type it' style='direction:ltr;max-width:220px;margin:0;padding:10px;border:2px solid var(--line);border-radius:12px'><button class='btn' onclick='typed2()'>✓</button></div>${q.heard?`<p class=muted style='margin-top:8px'>سمعتُ: «${q.heard}»</p>`:''}${q.feedback?`<p class=muted style='margin-top:8px'>${q.feedback}</p>`:''}</div>`}

export function mic2(){const R=window.SpeechRecognition||window.webkitSpeechRecognition;const q=S.q;if(!R){q.feedback='التعرف على الصوت غير مدعوم هنا، اكتب الجملة في المربع';hooks.render();return}const r=new R();r.lang='en-US';r.onresult=e=>speakTurn(e.results[0][0].transcript.trim());r.onerror=e=>{q.feedback='تعذّر التسجيل ('+e.error+')';hooks.render()};
 try{r.start()}catch(x){logError('بدء التسجيل',x);q.feedback='تعذّر بدء التسجيل. اضغط مرة واحدة فقط، أو اكتب الجملة في المربع';hooks.render()}}
export function typed2(){const el=document.getElementById('ctxt2');speakTurn(el?el.value.trim():'')}

export function itemRuleHtml(q,it){
  const id=ITEM_RULE.get(it);if(!id)return '';
  if(q.picked===it.a&&S.ruleOpen!==id)
    return `<div class="row" style="margin-top:8px"><button class='btn ghost' onclick="toggleRule('${id}')">راجع القاعدة</button></div>`;
  return ruleCard(id,'brief');
}
/* الرسوب في بوابة لا يعرض «أعد المحاولة»، بل يوجّه إلى تدريب ما أخطأ فيه. */
function resultActions(q){
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
      const bars=[1,2,3].map(u=>{
        const a=p.acc&&p.acc[u];
        const pc=a===null||a===undefined?0:Math.round(a*100);
        return `<div style="margin-top:9px">
          <div style="display:flex;justify-content:space-between;font-size:12px">
            <span class="muted">الوحدة ${ar(u)}</span>
            <span style="font-weight:700;color:${a===null||a===undefined?'var(--faint)':(a>=0.75?'var(--green)':'var(--amber)')}">${a===null||a===undefined?'لم تُقَس':ar(pc)+'٪'}</span></div>
          <div class="bar" style="margin-top:4px"><i style="width:${pc}%;background:${a>=0.75?'var(--green)':'var(--amber)'}"></i></div></div>`;
      }).join('');

      const sug=[1,2,3].includes(Number(p.suggest))?Number(p.suggest):1;
      return `<div class="card" style="text-align:center;padding-top:22px">
          <span class="muted" style="font-size:12px">مستواك</span>
          <div class="dsp en" style="font-size:52px;line-height:1.1">${S.level}</div>
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
        <p class="muted">${q.pass?'أحسنت، تابع إلى الخطوة التالية':'المطلوب '+ar(q.need)+' إجابات صحيحة'}</p>
        <div class="row" style="margin-top:6px">${resultActions(q)}</div>
      </div>${tips?card('ما تحتاج مراجعته',tips):''}`;
  }
  const it=q.items[q.i],total=q.kind==='place'?10:q.items.length;
  const opts=it.o.map((o,k)=>{let c='';if(q.picked!=null){if(k===it.a)c='ok';else if(k===q.picked)c='bad'}
    return `<button class="opt en ${c}" ${q.picked!=null?'disabled':''} onclick="pick(${k})">${o}</button>`}).join('');
  return `<div class="card">
     <div style="display:flex;align-items:center;gap:11px">
       <div class="bar" style="flex:1;margin:0"><i style="width:${q.i/total*100}%"></i></div>
       <span class="muted" style="font-size:12px;font-weight:700;flex:0 0 auto">${ar(q.i+1)} / ${ar(total)}</span></div>
     <p class="muted" style="margin-top:12px;font-size:12px">${q.title}</p>
     <div class="mean en" style="font-size:19px;margin-top:6px;line-height:1.7;font-weight:500">${it.q}</div>${opts}
     ${speakPanel(q,it)}${q.picked!=null&&(q.kind!=='conv'||q.spoke!=null)?`<p class='muted' style='margin-top:10px'>💡 ${it.tip}</p>${itemRuleHtml(q,it)}<div class="row"><button class="btn" onclick="nextQ()">${q.i+1>=total?'النتيجة':'التالي ←'}</button></div>`:''}
     <div class="row" style="margin-top:4px"><button class="btn ghost" style="background:transparent;color:var(--faint)" onclick="closeQ()">إلغاء</button></div></div>`;
}

/* ================= التحدث ================= */
