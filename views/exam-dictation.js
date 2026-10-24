/* شاشة اختبار الإملاء: سماعٌ وكتابة، ولا نصّ يُعرض قبل الإجابة. */
import {S} from '../engine/state.js';
import {examDictItem, examDictResult} from '../engine/exam-dictation.js';
import {dictationPool} from '../engine/exam-dictation.js';
import {card, svg, ar, esc, count, resultLine} from './ui.js';

export function examDictView() {
  const d = S.dx;
  if (!d) return introHtml();
  if (d.finished) return reportHtml();
  return askHtml(d);
}

function introHtml() {
  return card('اختبار الإملاء',
    `<p class="muted">عشر جمل تسمعها وتكتبها. لا خيارات ولا نصّ معروض —
       ما تكتبه هو ما سمعته.</p>
     <p class="muted" style="margin-top:6px">والإعادة مباحة بلا حدّ، ويُحصى عدد مرّات سماعك
       ويُعرض في النتيجة: من كفته مرّة ليس كمن احتاج خمساً، ومنعُ الإعادة يقيس
       السرعة لا الفهم.</p>
     ${resultLine('dictation')}
     <div class="row" style="justify-content:flex-start;margin-top:12px">
       <button class="btn" onclick="examDictStart()">${svg('sound', 18, '#fff')} ابدأ الاختبار</button></div>
     <p class="muted" style="margin-top:10px;font-size:11.5px">المخزون:
       ${count(dictationPool().length, 'جملة', 'جمل')}</p>`);
}

function askHtml(d) {
  const it = examDictItem();
  if (!it) return card('اختبار الإملاء', '<p class="muted">انتهى.</p>');
  const r = d.shown;

  return `<div class="card">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="bar" style="flex:1;margin:0"><i style="width:${d.i / d.items.length * 100}%"></i></div>
        <span class="muted" style="font-size:12px;font-weight:700">${ar(d.i + 1)} من ${ar(d.items.length)}</span></div>
      <p style="margin-top:12px;font-weight:700">استمع إلى الجملة ثم اكتبها كاملة.</p>
      <div class="row" style="justify-content:flex-start;margin-top:12px">
        <button class="btn" onclick="examDictPlay()">${svg('sound', 18, '#fff')} استمع</button>
        <button class="btn ghost" onclick="examDictPlay(0.6)">ببطء</button></div>
      ${d.plays ? `<p class="muted" style="margin-top:8px;font-size:11.5px">سمعتَها ${count(d.plays, 'مرّة', 'مرّات')}</p>` : ''}
    </div>

    <div class="card">
      ${r ? resultBox(r) : `<input id="dxTxt" class="en" dir="ltr" placeholder="write what you hear"
        style="width:100%;box-sizing:border-box;padding:12px 13px;border-radius:13px;
        border:2px solid var(--line);background:var(--surf2);color:inherit;font-size:16px">
      <div class="row" style="justify-content:flex-start;margin-top:10px">
        <button class="btn" onclick="examDictAnswer()">تحقّق</button>
        <button class="btn ghost" style="background:transparent;color:var(--faint)"
          onclick="examDictAnswer('')">لم أسمعها</button></div>`}
    </div>

    <div class="row"><button class="btn ghost" style="background:transparent;color:var(--faint)"
      onclick="examDictQuit()">إنهاء بلا نتيجة</button></div>`;
}

function resultBox(r) {
  const c = r.ok ? 'var(--green)' : 'var(--coral)';
  return `<div style="background:var(--surf2);border-radius:14px;padding:12px">
      <b style="color:${c}">${r.ok ? '✓ صحيحة' : '✗ غير صحيحة'}</b>
      <p class="muted" style="margin-top:6px;font-size:12px">ما كتبتَه</p>
      <p class="en" dir="ltr" style="text-align:left;font-weight:600;color:${c}">${esc(r.said) || '— لا شيء —'}</p>
      ${r.ok ? '' : `<p class="muted" style="margin-top:6px;font-size:12px">الصواب</p>
        <p class="en" dir="ltr" style="text-align:left;font-weight:700">${esc(r.model)}</p>`}
    </div>
    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="examDictNext()">التالية ←</button></div>`;
}

function reportHtml() {
  const r = examDictResult();
  if (!r) return card('اختبار الإملاء', '<p class="muted">لا نتيجة.</p>');

  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">اختبار الإملاء</span>
      <div class="dsp" style="font-size:56px;line-height:1.1;color:${r.band.c}">${ar(r.pc)}<span style="font-size:24px">٪</span></div>
      <p style="font-weight:800;color:${r.band.c}">${esc(r.band.t)}</p>
      <p class="muted" style="margin-top:6px">${esc(r.band.d)}</p>
      <p class="muted" style="margin-top:6px">${ar(r.right)} صحيحة من ${ar(r.n)} ·
        سمعتَ كل جملة ${ar(r.plays)} مرّة في المتوسّط</p>
    </div>

    ${card('الجمل واحدة واحدة', r.items.map(x => `
      <div style="background:var(--surf2);border-radius:14px;padding:11px;margin-top:9px">
        <p class="en" dir="ltr" style="text-align:left;font-weight:600;color:${x.ok ? 'var(--green)' : 'var(--coral)'}">
          ${esc(x.said) || '— لم تكتب —'}</p>
        ${x.ok ? '' : `<p class="muted" style="margin-top:4px;font-size:11.5px">الصواب:
          <span class="en" dir="ltr">${esc(x.model)}</span></p>`}
      </div>`).join(''))}

    <div class="row" style="margin-top:12px">
      <button class="btn" onclick="examDictStart()">جمل أخرى</button>
      <button class="btn ghost" onclick="examDictFinish()">احفظ وارجع</button></div>`;
}
