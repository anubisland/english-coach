/* شاشة اختبار الترجمة: جملة عربية، يكتب ترجمتها، ثم تقييم فوري. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {RULE} from '../content/rules.js';
import {gradeOne, pickTranslation, summarize} from '../engine/translate.js';
import {card, svg, ar, esc} from './ui.js';
import {penDiff} from '../engine/chat.js';

export const TRANSLATE_N = 6;

export function startTranslation(maxUnit) {
  S.tr = {
    items: pickTranslation(TRANSLATE_N, maxUnit || 3),
    results: [], i: 0, graded: null, done: false
  };
  S.tab = 'translate';
  save(); hooks.render();
}

export function submitTranslation() {
  const t = S.tr;
  if (!t || t.graded) return;
  const el = document.getElementById('trInput');
  const said = el ? el.value : '';
  if (!String(said).trim()) { t.empty = true; hooks.render(); return }
  t.empty = false;
  t.graded = gradeOne(t.items[t.i], said);
  save(); hooks.render();
}

export function nextTranslation() {
  const t = S.tr;
  if (!t || !t.graded) return;
  t.results.push(t.graded);
  t.graded = null;
  t.i++;
  if (t.i >= t.items.length) { t.done = true; t.summary = summarize(t.items, t.results) }
  save(); hooks.render();
}

export function closeTranslation() {
  S.tr = null; S.tab = 'course'; save(); hooks.render();
}

function bar(label, pct, color) {
  return `<div style="margin-top:9px">
    <div style="display:flex;justify-content:space-between;font-size:12px">
      <span class="muted">${label}</span>
      <span style="font-weight:700;color:${color}">${ar(pct)}٪</span></div>
    <div class="bar" style="margin-top:4px"><i style="width:${pct}%;background:${color}"></i></div></div>`;
}
const tone = p => p >= 80 ? 'var(--green)' : p >= 55 ? 'var(--amber)' : 'var(--coral)';

/* قلم المصحّح يفيد حين تكون الجملة قريبة من الصواب. أما إن لم تشترك معها
   في شيء تقريباً فالتصحيحات تتراكم فوق بعضها على الشاشة ولا تعلّم شيئاً،
   فنعرض ما كتبه عارياً والصواب تحته. */
const PEN_MIN = 40;
function attempt(r, size) {
  const usePen = !r.exact && r.match >= PEN_MIN;
  const lh = usePen ? '2.5' : '1.6';
  const body = usePen ? penDiff(r.said, r.best) : esc(r.said);
  return '<p class="en" style="font-size:' + size + 'px;margin-top:6px;line-height:' + lh + '">' + body + '</p>';
}

export function translateView() {
  const t = S.tr;
  if (!t) return card('اختبار الترجمة',
    `<p class="muted">جُمل بالعربية تكتب ترجمتها بنفسك — بلا خيارات ولا جملة أمامك تقلّدها.</p>
     <div class="row" style="justify-content:flex-start">
       <button class="btn" onclick="startTranslation(3)">ابدأ</button></div>`);

  if (t.done) {
    const s = t.summary;
    const skills = Object.entries(s.bySkill)
      .sort((a, b) => a[1] - b[1])
      .map(([k, v]) => `<div style="display:flex;justify-content:space-between;font-size:12.5px;margin-top:7px">
          <span class="muted">${esc((RULE[k] && RULE[k].t) || k)}</span>
          <span style="font-weight:700;color:${tone(v)}">${ar(v)}٪</span></div>`).join('');

    const lines = t.items.map((it, i) => {
      const r = t.results[i];
      return `<div style="padding:11px 0;border-bottom:1px solid var(--line)">
        <div style="display:flex;align-items:baseline;gap:8px">
          <span style="font-weight:700;color:${tone(r.score)};font-size:13px">${ar(r.score)}٪</span>
          <span class="muted" style="flex:1">${esc(it.ar)}</span></div>
        ${attempt(r, 14)}
        ${r.exact ? '' : `<p class="en" style="font-size:13.5px;color:var(--green);font-weight:600">${esc(r.best)}</p>`}
        ${r.notes.length ? r.notes.map(x => `<p class="muted" style="font-size:12px">• ${esc(x.ar)}</p>`).join('') : ''}
      </div>`;
    }).join('');

    return `<div class="card" style="text-align:center;padding-top:22px">
        <span class="muted" style="font-size:12px">نتيجة الترجمة</span>
        <div class="dsp" style="font-size:54px;line-height:1.1;color:${tone(s.percent)}">${ar(s.percent)}<span style="font-size:26px">٪</span></div>
        <p class="muted">${ar(s.exact)} من ${ar(s.total)} جمل صحيحة تماماً</p>
      </div>
      ${card('المحوران', bar('قرب الترجمة من الصواب', s.match, tone(s.match)) + bar('سلامة الجرامر', s.grammar, tone(s.grammar)))}
      ${card('حسب المهارة', skills)}
      ${card('جملة جملة', lines)}
      <div class="row" style="margin-top:12px">
        <button class="btn" onclick="startTranslation(3)">أعد الاختبار</button>
        <button class="btn ghost" onclick="closeTranslation()">رجوع</button></div>`;
  }

  const it = t.items[t.i];
  const g = t.graded;

  return `<div class="card">
    <div style="display:flex;align-items:center;gap:11px">
      <div class="bar" style="flex:1;margin:0"><i style="width:${t.i / t.items.length * 100}%"></i></div>
      <span class="muted" style="font-size:12px;font-weight:700">${ar(t.i + 1)} / ${ar(t.items.length)}</span></div>

    <p class="muted" style="margin-top:12px;font-size:12px">ترجم إلى الإنجليزية</p>
    <p style="font-size:19px;font-weight:600;line-height:1.7;margin-top:4px">${esc(it.ar)}</p>

    ${g ? '' : `<div class="row" style="justify-content:flex-start;margin-top:12px">
        <input id="trInput" class="en" placeholder="اكتب الترجمة" autocomplete="off"
               style="flex:1;min-width:0;padding:13px;border:2px solid var(--line);border-radius:14px;background:var(--surf2);color:var(--ink);font-size:16px">
      </div>
      ${t.empty ? '<p class="muted" style="color:var(--amber)">اكتب ترجمتك أولاً</p>' : ''}
      <div class="row" style="justify-content:flex-start">
        <button class="btn" onclick="submitTranslation()">تحقّق</button></div>`}

    ${g ? `<div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">
        <div style="display:flex;align-items:baseline;gap:9px">
          <span class="dsp" style="font-size:30px;color:${tone(g.score)}">${ar(g.score)}٪</span>
          <span class="muted" style="font-size:12px">تطابق ${ar(g.match)}٪ · جرامر ${ar(g.grammar)}٪</span></div>
        ${attempt(g, 16)}
        ${g.exact
          ? '<p style="color:var(--green);font-weight:600;font-size:13.5px">صحيحة تماماً</p>'
          : `<p class="muted" style="font-size:12.5px">الصيغة المقبولة:</p>
             <p class="en" style="color:var(--green);font-weight:600;font-size:15px">${esc(g.best)}</p>`}
        ${g.notes.map(x => `<p class="muted" style="font-size:12.5px">• ${esc(x.ar)}</p>`).join('')}
        <div class="row" style="justify-content:flex-start;margin-top:10px">
          <button class="btn" onclick="nextTranslation()">${t.i + 1 >= t.items.length ? 'النتيجة' : 'التالية ←'}</button></div>
      </div>` : ''}

    <div class="row" style="margin-top:6px">
      <button class="btn ghost" style="background:transparent;color:var(--faint)" onclick="closeTranslation()">إلغاء</button></div>
  </div>`;
}
