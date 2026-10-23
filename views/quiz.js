/* شاشة الاختبار: السؤال، والخيارات، والشرح عند الخطأ، والنتيجة. */
import {LESSONS} from '../content/lessons.js';
import {S,logError} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {ITEM_RULE} from '../engine/progress.js';
import {speakTurn} from '../engine/quiz.js';
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
export function quizView(){
  const q=S.q;
  if(q.done){
    if(q.kind==='place'){const p=S.place;
      return card('نتيجة تحديد المستوى',`<p>مستواك: <b class="en" style="font-size:26px">${S.level}</b></p>
        <p class="muted">دقتك في أسئلة A1: ${Math.round(p.a1*100)}%${p.n2>=2?'، وفي أسئلة A2: '+Math.round(p.a2*100)+'%':''}</p>
        <div class="row"><button class="btn" onclick="closeQ()">ابدأ الدورة</button></div>`);}
    const pc=Math.round(q.score/q.items.length*100);
    const tips=q.wrong.map(x=>`<p class="muted">💡 ${x.tip}</p>`).join('');
    return `<div class="card" style="text-align:center;padding-top:22px">
        <div class="dsp" style="font-size:52px;line-height:1;color:${q.pass?'var(--green)':'var(--amber)'}">${ar(q.score)}<span style="font-size:24px;color:var(--mute)">/${ar(q.items.length)}</span></div>
        <div class="bar" style="max-width:220px;margin:14px auto 0"><i style="width:${pc}%;background:${q.pass?'var(--green)':'var(--amber)'}"></i></div>
        <h2 style="margin-top:14px">${q.pass?'🎉 اجتزت '+q.title:'لم تجتز بعد'}</h2>
        <p class="muted">${q.pass?'أحسنت، تابع إلى الخطوة التالية':'المطلوب '+ar(q.need)+' إجابات صحيحة'}</p>
        <div class="row" style="margin-top:6px">${q.pass?'<button class="btn" onclick="closeQ()">متابعة</button>':'<button class="btn" onclick="retryQ()">أعد المحاولة</button><button class="btn ghost" onclick="closeQ()">رجوع</button>'}</div>
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
