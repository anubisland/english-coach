/* شاشة اختبار المحادثة الكاملة.

   الشاشة هنا متقشّفة عمداً: لا تلميح، ولا إجابة نموذجية، ولا تصحيح بين دور
   ودور — كل ذلك يظهر في التقرير بعد النهاية. الشاشة أثناء الاختبار تعرض
   سؤالاً واحداً وزرّ إجابة، لأن كل ما عدا ذلك مساعدة تُفسد القياس. */
import {S} from '../engine/state.js';
import {examConvScene, examConvTurn, examConvSay, examConvResult} from '../engine/exam-convo.js';
import {EXAM_SCENES} from '../content/exam-scenes.js';
import {card, svg, ar, esc, resultLine} from './ui.js';

export function examConvView() {
  const c = S.cx;
  if (!c) return pickView();
  if (c.done) return reportView();
  return runView(c);
}

function pickView() {
  return card('اختبار المحادثة الكاملة',
    `<p class="muted">ثمانية أسئلة متّصلة في موقف واحد، بالصوت، بلا تلميح وبلا إعادة —
       كما سيحدث معك في الحقيقة. تُقاس أربعة محاور: الصلة بالسؤال، وسلامة النحو،
       ووضوح النطق، والطلاقة.</p>
     <p class="muted" style="margin-top:6px"><b>المواقف محجوزة للاختبار</b>، لم تتدرّب على أيٍّ منها،
       ويُختار واحد منها بالقرعة — فالمقصود قياس كلامك لا ذاكرتك.</p>
     ${resultLine('conv')}
     <div class="row" style="justify-content:flex-start;margin-top:12px">
       <button class="btn" onclick="examConvStart()">${svg('mic', 18, '#fff')} ابدأ الاختبار</button>
     </div>
     <p class="muted" style="margin-top:12px;font-size:11.5px">المواقف المحتملة:
       ${esc(EXAM_SCENES.map(s => s.t).join(' · '))}</p>`);
}

function runView(c) {
  const sc = examConvScene(), t = examConvTurn();
  if (!sc || !t) return card('اختبار المحادثة', '<p class="muted">انتهى الاختبار.</p>');
  const pcDone = c.ti / sc.turns.length * 100;

  return `<div class="card">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="bar" style="flex:1;margin:0"><i style="width:${pcDone}%"></i></div>
        <span class="muted" style="font-size:12px;font-weight:700">${ar(c.ti + 1)} من ${ar(sc.turns.length)}</span></div>
      <p class="muted" style="margin-top:10px;font-size:12px">${esc(sc.t)} — ${esc(sc.place)}</p>
    </div>

    <div class="card">
      <p class="muted" style="font-size:12px">يقول لك</p>
      <p class="en" style="font-size:20px;font-weight:600;margin-top:6px;line-height:1.5">${esc(t.p)}</p>
      <div class="row" style="justify-content:flex-start;margin-top:10px">
        <button class="btn ghost" onclick="examConvSay()">${svg('sound', 16)} أعد السماع</button>
      </div>

      <div class="row" style="justify-content:flex-start;margin-top:14px">
        <button class="btn" onclick="examConvListen()">${svg('mic', 18, '#fff')} أجب</button>
      </div>
      ${c.fb ? `<p class="muted" style="margin-top:10px">${esc(c.fb)}</p>` : ''}

      <details style="margin-top:14px">
        <summary class="muted" style="font-size:12px;cursor:pointer">لا ميكروفون؟ اكتب إجابتك</summary>
        <div class="row" style="justify-content:flex-start;margin-top:8px">
          <input id="cxTxt" class="en" dir="ltr" placeholder="Type your answer"
            style="flex:1;min-width:0;padding:11px 13px;border-radius:13px;border:1.5px solid var(--line);background:var(--surf2);color:inherit">
          <button class="btn ghost" onclick="examConvTyped()">أرسل</button></div>
        <p class="muted" style="margin-top:6px;font-size:11.5px">الكتابة ليست نطقاً، فلن يُحتسب محور وضوح النطق.</p>
      </details>
    </div>

    <div class="row"><button class="btn ghost" style="background:transparent;color:var(--faint)"
      onclick="examConvQuit()">إنهاء بلا نتيجة</button></div>`;
}

function reportView() {
  const r = examConvResult();
  if (!r) return card('اختبار المحادثة', '<p class="muted">لا نتيجة.</p>');

  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">${esc(r.scene.t)}</span>
      <div class="dsp" style="font-size:56px;line-height:1.1;color:${r.band.c}">${ar(r.pc)}<span style="font-size:24px">٪</span></div>
      <p style="font-weight:800;color:${r.band.c};margin-top:2px">${esc(r.band.t)}</p>
      <p class="muted" style="margin-top:6px">${esc(r.band.d)}</p>
      ${r.capped ? `<p class="muted" style="margin-top:8px;font-size:11.5px">
        نحوك ونطقك أحسن من هذه النسبة، لكنك لم تُجب عن أكثر الأسئلة —
        والصلة بالسؤال تضع سقفاً لا يرفعه شيء آخر.</p>` : ''}
    </div>

    ${card('المحاور الأربعة', r.axes.map(a => axisRow(a)).join('')
      + (r.spoken < r.n ? `<p class="muted" style="margin-top:10px;font-size:11.5px">
          نُطق ${ar(r.spoken)} من ${ar(r.n)} ردوداً؛ ما كُتب لم يدخل في وضوح النطق.</p>` : '')
      + (r.weakest ? `<p class="muted" style="margin-top:10px">أضعف محاورك الآن:
          <b style="color:var(--coral)">${esc(r.weakest.t)}</b> — ابدأ منه.</p>` : ''))}

    ${card('ردودك دوراً دوراً', r.turns.map((t, i) => turnRow(t, r.scene.turns[i])).join(''))}

    <div class="row" style="margin-top:12px">
      <button class="btn" onclick="examConvStart()">موقف آخر</button>
      <button class="btn ghost" onclick="examConvFinish()">احفظ وارجع</button></div>`;
}

function axisRow(a) {
  const sc = a.sc, off = sc === null;
  const c = off ? 'var(--faint)' : sc >= 80 ? 'var(--green)' : sc >= 55 ? 'var(--amber)' : 'var(--coral)';
  return `<div style="margin-top:11px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <b style="flex:1;font-size:13.5px">${esc(a.t)}</b>
        <span style="font-weight:800;color:${c}">${off ? 'لم يُقَس' : ar(sc) + '٪'}</span>
        ${off ? '' : `<span class="muted" style="font-size:11px">وزنه ${ar(a.share)}٪</span>`}</div>
      <div class="bar" style="margin:6px 0 0"><i style="width:${off ? 0 : sc}%;background:${c}"></i></div>
      <p class="muted" style="font-size:11.5px;margin-top:3px">${esc(a.d)}</p></div>`;
}

function turnRow(t, def) {
  const good = t.rel === 100 && !t.g.length;
  return `<div style="background:var(--surf2);border-radius:14px;padding:11px;margin-top:9px">
      <p class="muted en" dir="ltr" style="font-size:11.5px;text-align:left">${esc(def.p)}</p>
      <p class="en" dir="ltr" style="margin-top:5px;text-align:left;font-weight:600;color:${good ? 'var(--green)' : 'var(--coral)'}">
        ${t.said ? esc(t.said) : '— لم تُجب —'}</p>
      ${t.g.length ? `<p class="muted" style="margin-top:4px;font-size:11.5px">${esc(t.g.join(' · '))}</p>` : ''}
      ${t.rel < 100 ? `<p class="muted" style="margin-top:4px;font-size:11.5px">الإجابة المتوقّعة:
        <span class="en" dir="ltr">${esc(def.model)}</span></p>` : ''}</div>`;
}
