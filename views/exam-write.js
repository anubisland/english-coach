/* شاشة اختبار الكتابة.

   مبدأ الشاشة: لا خيار يُضغط في أي نوع — حتى «رتّب الكلمات» يكتبها المتعلّم
   بيده، والكلمات المعروضة تذكير بالمفردات لا أزرار تُنقر. الضغط ترتيبٌ
   بالتجربة، والكتابة إنتاج. */
import {S} from '../engine/state.js';
import {examWriteTask, examWriteBag, examWriteResult} from '../engine/exam-write.js';
import {WRITE_KINDS} from '../content/write-tasks.js';
import {card, ar, esc, count} from './ui.js';

export function examWriteView() {
  const w = S.wx;
  if (!w) return introHtml();
  if (w.finished) return reportHtml();
  return taskHtml(w);
}

function introHtml() {
  return card('اختبار الكتابة',
    `<p class="muted">إحدى عشرة مسألة من أربعة أنواع: ترتيب كلمات، وإكمال ناقص،
       وكتابة جملة تؤدّي معنى عربياً، وكتابة موجّهة في آخرها.</p>
     <p class="muted" style="margin-top:6px"><b>لا خيارات في هذا الاختبار.</b>
       تكتب كل إجابة بيدك، لأن اختيار الصواب حين تراه غير إنشائه من فراغ.</p>
     ${S.wxBest ? `<p class="muted" style="margin-top:8px">أفضل نتيجة لك:
        <b style="color:var(--ind2)">${ar(S.wxBest)}٪</b></p>` : ''}
     <div class="row" style="justify-content:flex-start;margin-top:12px">
       <button class="btn" onclick="examWriteStart(0)">ابدأ الاختبار</button></div>
     <div class="row" style="justify-content:flex-start;margin-top:8px">
       ${[1, 2, 3].map(u => `<button class="btn ghost" style="padding:9px 14px;font-size:12.5px"
         onclick="examWriteStart(${u})">الوحدة ${ar(u)} فقط</button>`).join('')}</div>`);
}

function taskHtml(w) {
  const t = examWriteTask();
  if (!t) return card('اختبار الكتابة', '<p class="muted">انتهى.</p>');
  const r = w.shown;

  return `<div class="card">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="bar" style="flex:1;margin:0"><i style="width:${w.i / w.items.length * 100}%"></i></div>
        <span class="muted" style="font-size:12px;font-weight:700">${ar(w.i + 1)} من ${ar(w.items.length)}</span></div>
      <p class="muted" style="margin-top:10px;font-size:12px">${esc(WRITE_KINDS[t.k] || '')}</p>
      <p style="margin-top:4px;font-weight:700">${esc(t.ar)}</p>
      ${promptHtml(t)}
    </div>

    <div class="card">
      ${inputHtml(t, r)}
      ${r ? feedbackHtml(t, r) : `<div class="row" style="justify-content:flex-start;margin-top:10px">
        <button class="btn" onclick="examWriteAnswer()">صحّح</button></div>`}
    </div>

    <div class="row"><button class="btn ghost" style="background:transparent;color:var(--faint)"
      onclick="examWriteQuit()">إنهاء بلا نتيجة</button></div>`;
}

function promptHtml(t) {
  if (t.k === 'order') {
    const bag = examWriteBag() || t.w;
    return `<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;direction:ltr">
      ${bag.map(x => `<span class="en" style="padding:6px 11px;border-radius:10px;background:var(--surf2);
        border:1.5px solid var(--line);font-size:14px;font-weight:600">${esc(x)}</span>`).join('')}</div>`;
  }
  if (t.k === 'gap')
    return `<p class="en" dir="ltr" style="margin-top:10px;text-align:left;font-size:17px">
      ${esc(t.before)} <b style="color:var(--ind2)">_____</b> ${esc(t.after)}</p>`;
  if (t.k === 'free')
    return `<div style="background:var(--surf2);border-radius:14px;padding:12px;margin-top:10px">
      <b style="font-size:13px;color:var(--ind2)">المطلوب في نصّك (${ar(t.min)} جمل على الأقل)</b>
      <ul style="margin:6px 18px 0 0;padding:0">${t.ask.map(a =>
        `<li class="muted" style="font-size:12.5px">${esc(a.t)}</li>`).join('')}</ul></div>`;
  if (t.must && t.must.length)
    return `<p class="muted" style="margin-top:8px;font-size:12px">استعمل:
      <span class="en" style="font-weight:600">${esc(t.must.map(m => m.split('|')[0]).join('، '))}</span></p>`;
  return '';
}

function inputHtml(t, r) {
  const ph = t.k === 'gap' ? 'الكلمة الناقصة' : t.k === 'free' ? 'اكتب نصّك هنا' : 'اكتب الجملة';
  if (r) return `<p class="muted" style="font-size:12px">إجابتك</p>
    <p class="en" dir="ltr" style="text-align:left;font-weight:600;margin-top:3px">${esc(r.said) || '—'}</p>`;
  if (t.k === 'free')
    return `<textarea id="wxTxt" class="en" dir="ltr" rows="5" placeholder="${ph}"
      style="width:100%;box-sizing:border-box;padding:11px 13px;border-radius:13px;border:1.5px solid var(--line);
      background:var(--surf2);color:inherit;resize:vertical"></textarea>`;
  return `<input id="wxTxt" class="en" dir="ltr" placeholder="${ph}"
    style="width:100%;box-sizing:border-box;padding:11px 13px;border-radius:13px;border:1.5px solid var(--line);
    background:var(--surf2);color:inherit">`;
}

function feedbackHtml(t, r) {
  const c = r.sc >= 85 ? 'var(--green)' : r.sc >= 50 ? 'var(--amber)' : 'var(--coral)';
  return `<div style="margin-top:12px;background:var(--surf2);border-radius:14px;padding:12px">
      <div style="display:flex;align-items:baseline;gap:8px">
        <b style="flex:1;color:${c}">${r.sc >= 85 ? '✓ صحيحة' : r.sc >= 50 ? 'قريبة' : 'غير صحيحة'}</b>
        <span style="font-weight:800;color:${c}">${ar(r.sc)}٪</span></div>
      ${r.note ? `<p class="muted" style="margin-top:5px">${esc(r.note)}</p>` : ''}
      ${r.short ? `<p class="muted" style="margin-top:5px">كتبتَ ${count(r.short.wrote, 'جملة', 'جمل')} والمطلوب ${count(r.short.need, 'جملة', 'جمل')}.</p>` : ''}
      ${r.asked ? `<ul style="margin:7px 18px 0 0;padding:0">${r.asked.map(a =>
        `<li class="muted" style="font-size:12.5px;color:${a.ok ? 'var(--green)' : 'var(--coral)'}">
          ${a.ok ? '✓' : '✗'} ${esc(a.t)}</li>`).join('')}</ul>` : ''}
      ${r.g && r.g.length ? `<p class="muted" style="margin-top:6px;font-size:12px">${esc(r.g.join(' · '))}</p>` : ''}
      ${r.sc < 100 ? `<p class="muted" style="margin-top:6px;font-size:12.5px">نموذج:
        <span class="en" dir="ltr" style="font-weight:600">${esc(r.model)}</span></p>` : ''}
    </div>
    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="examWriteNext()">التالية ←</button></div>`;
}

function reportHtml() {
  const r = examWriteResult();
  if (!r) return card('اختبار الكتابة', '<p class="muted">لا نتيجة.</p>');

  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">اختبار الكتابة</span>
      <div class="dsp" style="font-size:56px;line-height:1.1;color:${r.band.c}">${ar(r.pc)}<span style="font-size:24px">٪</span></div>
      <p style="font-weight:800;color:${r.band.c}">${esc(r.band.t)}</p>
      <p class="muted" style="margin-top:6px">${esc(r.band.d)}</p>
    </div>

    ${card('حسب نوع المسألة', r.byKind.map(k => {
      const c = k.sc >= 80 ? 'var(--green)' : k.sc >= 55 ? 'var(--amber)' : 'var(--coral)';
      return `<div style="margin-top:10px">
        <div style="display:flex;align-items:baseline;gap:8px">
          <b style="flex:1;font-size:13.5px">${esc(WRITE_KINDS[k.k])}</b>
          <span class="muted" style="font-size:11px">${count(k.n, 'مسألة', 'مسائل')}</span>
          <span style="font-weight:800;color:${c}">${ar(k.sc)}٪</span></div>
        <div class="bar" style="margin:6px 0 0"><i style="width:${k.sc}%;background:${c}"></i></div></div>`;
    }).join(''))}

    ${r.errs.length ? card('أخطاؤك المتكرّرة', r.errs.map(([e, n]) =>
      `<div class="row" style="justify-content:flex-start;gap:8px;margin-top:6px">
        <span style="font-weight:800;color:var(--coral);min-width:22px">${ar(n)}×</span>
        <span class="muted" style="flex:1">${esc(e)}</span></div>`).join('')) : ''}

    <div class="row" style="margin-top:12px">
      <button class="btn" onclick="examWriteStart(0)">ورقة جديدة</button>
      <button class="btn ghost" onclick="examWriteFinish()">احفظ وارجع</button></div>`;
}
