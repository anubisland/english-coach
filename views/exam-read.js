/* شاشة اختبار القراءة.

   ثلاث مراحل: نصّ يُقرأ ويُقاس زمنه، ثم أسئلة والنصّ متاح بجوارها، ثم تقرير.

   ولماذا يبقى النصّ متاحاً أثناء الأسئلة؟ لأن هذا اختبار قراءة لا اختبار
   حفظ. إخفاء النصّ يقيس الذاكرة، وهي قدرة أخرى لا علاقة لها بفهم المكتوب. */
import {S} from '../engine/state.js';
import {examReadText, examReadQ, examReadResult, examReadRate} from '../engine/exam-read.js';
import {countWords, rateNote} from '../engine/read-score.js';
import {READS} from '../content/read-texts.js';
import {card, ar, esc, count, resultLine} from './ui.js';

export function examReadView() {
  const r = S.rx;
  if (!r) return introHtml();
  if (r.stage === 'read') return readingHtml(r);
  if (r.stage === 'qs') return questionHtml(r);
  return reportHtml();
}

function introHtml() {
  return card('اختبار القراءة',
    `<p class="muted">نصّ قصير من الحياة اليومية — رسالة أو إعلان أو جدول —
       ثم أسئلة عليه: صح وخطأ، وإجابات قصيرة تكتبها بيدك، واستخراج كلمات من النصّ.</p>
     <p class="muted" style="margin-top:6px">ويُقاس معه <b>زمن قراءتك</b>، فاقرأ على طبيعتك
       لا مسرعاً ولا متمهّلاً. النصّ يبقى أمامك أثناء الأسئلة — هذا اختبار فهم لا حفظ.</p>
     ${resultLine('read')}
     <div class="row" style="justify-content:flex-start;margin-top:12px">
       <button class="btn" onclick="examReadStart()">ابدأ بنصّ عشوائي</button></div>
     <p class="muted" style="margin-top:12px;font-size:11.5px">النصوص:
       ${esc(READS.map(x => x.t).join(' · '))}</p>`);
}

function textCard(t, open) {
  return `<div class="card">
      <div style="display:flex;align-items:baseline;gap:8px">
        <b style="flex:1">${esc(t.t)}</b>
        <span class="muted" style="font-size:11.5px">${esc(t.cat)} · ${count(countWords(t.text), 'كلمة', 'كلمات')}</span></div>
      ${open ? body(t) : `<details style="margin-top:8px"><summary class="muted" style="font-size:12.5px;cursor:pointer">
        اعرض النصّ مرّة أخرى</summary>${body(t)}</details>`}
    </div>`;
}

function body(t) {
  return `<div class="en" dir="ltr" style="text-align:left;margin-top:10px;line-height:1.85;
    white-space:pre-wrap;font-size:15px">${esc(t.text)}</div>`;
}

function readingHtml(r) {
  const t = examReadText();
  return textCard(t, true)
    + `<div class="card">
        <p class="muted">اقرأ النصّ كاملاً على مهلك المعتاد، ثم اضغط الزرّ — ويُحتسب زمنك حتى تلك اللحظة.</p>
        <div class="row" style="justify-content:flex-start;margin-top:10px">
          <button class="btn" onclick="examReadDone()">انتهيتُ من القراءة ←</button></div>
      </div>
      <div class="row"><button class="btn ghost" style="background:transparent;color:var(--faint)"
        onclick="examReadQuit()">إنهاء بلا نتيجة</button></div>`;
}

function questionHtml(r) {
  const t = examReadText(), q = examReadQ();
  if (!q) return card('اختبار القراءة', '<p class="muted">انتهت الأسئلة.</p>');

  return `<div class="card">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="bar" style="flex:1;margin:0"><i style="width:${r.i / t.qs.length * 100}%"></i></div>
        <span class="muted" style="font-size:12px;font-weight:700">${ar(r.i + 1)} من ${ar(t.qs.length)}</span></div>
      ${askHtml(q)}
      <div class="row" style="justify-content:flex-start;margin-top:12px">
        ${r.i > 0 ? `<button class="btn ghost" onclick="examReadBack()">→ السابق</button>` : ''}
        <button class="btn ghost" style="background:transparent;color:var(--faint)"
          onclick="examReadSkip()">لا أعرف</button></div>
    </div>
    ${textCard(t, false)}`;
}

function askHtml(q) {
  if (q.k === 'tf')
    return `<p class="muted" style="margin-top:10px;font-size:12px">صح أم خطأ؟</p>
      <p class="en" dir="ltr" style="text-align:left;margin-top:4px;font-size:17px;font-weight:600">${esc(q.q)}</p>
      <div class="row" style="justify-content:flex-start;margin-top:12px">
        <button class="btn" onclick="examReadAnswer(true)">صح</button>
        <button class="btn ghost" onclick="examReadAnswer(false)">خطأ</button></div>`;

  return `<p class="muted" style="margin-top:10px;font-size:12px">${
      q.k === 'word' ? 'استخرج الكلمة من النصّ' : 'أجب بالإنجليزية'}</p>
    <p style="margin-top:4px;font-weight:700">${esc(q.ar)}</p>
    <input id="rxTxt" class="en" dir="ltr" placeholder="${q.k === 'word' ? 'the word' : 'your answer'}"
      style="width:100%;box-sizing:border-box;margin-top:10px;padding:11px 13px;border-radius:13px;
      border:1.5px solid var(--line);background:var(--surf2);color:inherit">
    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="examReadAnswer()">أرسل</button></div>`;
}

function reportHtml() {
  const res = examReadResult();
  if (!res) return card('اختبار القراءة', '<p class="muted">لا نتيجة.</p>');
  const note = rateNote(res.rate);

  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">${esc(res.text.t)}</span>
      <div class="dsp" style="font-size:56px;line-height:1.1;color:${res.band.c}">${ar(res.pc)}<span style="font-size:24px">٪</span></div>
      <p style="font-weight:800;color:${res.band.c}">${esc(res.band.t)}</p>
      <p class="muted" style="margin-top:6px">${esc(res.band.d)}</p>
      <p class="muted" style="margin-top:6px">${ar(res.right)} إجابة صحيحة من ${ar(res.n)}</p>
      ${res.capExplains ? `<p class="muted" style="margin-top:8px;font-size:11.5px">
        سرعتك ومفرداتك أحسن من هذه النسبة، لكن الفهم سقفٌ لا يرفعه غيره —
        من لم يفهم النصّ لم يقرأه.</p>` : ''}
    </div>

    ${card('المحاور', res.axes.map(a => axisRow(a)).join('')
      + (note ? `<p class="muted" style="margin-top:10px">⏱️ ${ar(res.rate)} كلمة في الدقيقة — ${esc(note)}</p>` : ''))}

    ${card('الأسئلة واحداً واحداً', res.items.map(x => itemRow(x)).join(''))}

    <div class="row" style="margin-top:12px">
      <button class="btn" onclick="examReadStart()">نصّ آخر</button>
      <button class="btn ghost" onclick="examReadFinish()">احفظ وارجع</button></div>`;
}

function axisRow(a) {
  const off = a.sc === null;
  const c = off ? 'var(--faint)' : a.sc >= 80 ? 'var(--green)' : a.sc >= 55 ? 'var(--amber)' : 'var(--coral)';
  return `<div style="margin-top:11px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <b style="flex:1;font-size:13.5px">${esc(a.t)}</b>
        <span style="font-weight:800;color:${c}">${off ? 'لم يُقَس' : ar(a.sc) + '٪'}</span>
        ${off ? '' : `<span class="muted" style="font-size:11px">وزنه ${ar(a.share)}٪</span>`}</div>
      <div class="bar" style="margin:6px 0 0"><i style="width:${off ? 0 : a.sc}%;background:${c}"></i></div>
      <p class="muted" style="font-size:11.5px;margin-top:3px">${esc(a.d)}</p></div>`;
}

function itemRow(x) {
  const ok = x.sc >= 80;
  const q = x.q;
  const mine = q.k === 'tf'
    ? (x.skipped ? '— لم تُجب —' : (x.sc === 100 ? (q.a ? 'صح' : 'خطأ') : (q.a ? 'خطأ' : 'صح')))
    : (x.said || '— لم تُجب —');
  return `<div style="background:var(--surf2);border-radius:14px;padding:11px;margin-top:9px">
      ${q.k === 'tf'
        ? `<p class="en muted" dir="ltr" style="text-align:left;font-size:12px">${esc(q.q)}</p>`
        : `<p class="muted" style="font-size:12px">${esc(q.ar)}</p>`}
      <p style="margin-top:5px;font-weight:600;color:${ok ? 'var(--green)' : 'var(--coral)'}"
        ${q.k === 'tf' ? '' : 'class="en" dir="ltr" style="margin-top:5px;text-align:left;font-weight:600;color:' + (ok ? 'var(--green)' : 'var(--coral)') + '"'}>
        ${esc(mine)}</p>
      ${ok ? '' : `<p class="muted" style="margin-top:4px;font-size:11.5px">${
        q.k === 'tf' ? esc(q.why) : 'الصواب: <span class="en" dir="ltr">' + esc(q.ok[0]) + '</span>'}</p>`}
    </div>`;
}
