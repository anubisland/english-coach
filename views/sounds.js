/* تدريب الأصوات بالأزواج الصغرى.

   لماذا الأزواج الصغرى؟ لأن الخطأ فيها **يغيّر الكلمة** لا لكنتها:
   من يقول ship بدل sheep لم يُخطئ في اللكنة، بل قال كلمة أخرى.
   ولأن التعرّف على الصوت في المتصفح يردّ أقرب كلمة إنجليزية حقيقية،
   فهو هنا مفيد فعلاً: يخبرنا أيّ الكلمتين نطقتَ.

   انضباطان في هذا الملف، كلاهما مقصود:

   1) النتيجة محسوبة على **المطالبات** لا على المحاولات: كل مطالبة لها خانة
      واحدة تُستبدل عند الإعادة. لو جمعنا المحاولات لعاقبنا من يكرّر حتى يُتقن،
      وهو عكس المقصود من التدريب.

   2) كل ما يأتي من محرّك التعرّف **متأخّراً** يُعيد قراءة S.snd ويتحقّق من
      رقم الجلسة قبل أن يكتب شيئاً. فلو أنهى المتعلّم التدريب أو بدأ صوتاً آخر
      بينما الميكروفون ما زال يعمل، ذهبت النتيجة المتأخّرة إلى العدم بدل أن
      تُسجَّل على المطالبة الخطأ. */
import {S, save, logError} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {SOUNDS, SOUND} from '../content/sounds.js';
import {card, svg, ar, esc, emph} from './ui.js';

let gen = 0;   // رقم الجلسة: يتغيّر مع كل بدء، فتموت نتائج ما قبله

export function startSound(id) {
  const s = SOUND[id];
  if (!s) { logError('تدريب صوت غير معروف', new Error(String(id))); return }
  gen++;
  S.snd = {id, i: 0, side: 0, slots: {}, heard: null, fb: null, live: false};
  S.tab = 'sounds';
  save(); hooks.render();
}

export function closeSound() { gen++; S.snd = null; S.tab = 'speak'; save(); hooks.render() }

/* المطالبة الحالية: الزوج رقم i، وأيّ كلمتيه. مفتاحها هو خانتها في slots. */
function slotKey(d) { return d.i + ':' + d.side }

function current(d) {
  const s = SOUND[d.id];
  const pair = s && s.pairs[d.i];
  return pair ? {s, pair, want: pair[d.side], other: pair[1 - d.side]} : null;
}

/* رسائل محرّك التعرّف بالإنجليزية ولا تفيد المتعلّم؛ نترجمها إلى ما يفعله. */
function micMessage(code) {
  if (code === 'not-allowed' || code === 'service-not-allowed')
    return 'المتصفّح يمنع الميكروفون. اضغط أيقونة القفل بجوار العنوان واسمح بالميكروفون، ثم أعد المحاولة.';
  if (code === 'no-speech') return 'لم يصل صوت. تأكّد أن الميكروفون غير مكتوم وتكلّم أقرب إليه.';
  if (code === 'audio-capture') return 'لا أجد ميكروفوناً متّصلاً بهذا الجهاز.';
  if (code === 'aborted') return 'انقطع التسجيل. اضغط «انطقها» مرة واحدة وانتظر.';
  return 'تعذّر التسجيل (' + code + '). اضغط «انطقها» مرة أخرى.';
}

export function soundListen() {
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  const d = S.snd;
  if (!d || d.done) return;
  if (!R) {
    d.fb = 'التعرّف على الصوت غير متاح في هذا المتصفح. استمع وكرّر، وافتحه في Chrome أو Edge للتقييم.';
    save(); hooks.render(); return;
  }
  if (d.live) { d.fb = 'الميكروفون يعمل الآن — قل الكلمة.'; hooks.render(); return }

  const mine = gen;
  /* الجلسة الحيّة تُعلَن على الشاشة: زرٌّ لا يتغيّر عند الضغط يدعو إلى ضغطه مرّتين. */
  d.live = true; d.fb = '🎙️ أسمعك…'; d.heard = null;
  save(); hooks.render();

  const r = new R();
  r.lang = 'en-US';
  let answered = false;

  r.onresult = e => {
    answered = true;
    const alt = e.results && e.results[0] && e.results[0][0];
    soundHeard(alt ? alt.transcript : '', mine);
  };
  r.onerror = e => {
    answered = true;
    if (!alive(mine)) return;
    S.snd.live = false; S.snd.fb = micMessage(e.error);
    logError('تسجيل تدريب الأصوات', new Error(String(e.error)));
    save(); hooks.render();
  };
  /* تنتهي الجلسة أحياناً بلا نتيجة ولا خطأ — فيبقى الزرّ «يسمع» إلى الأبد. */
  r.onend = () => {
    if (answered || !alive(mine)) return;
    S.snd.live = false;
    S.snd.fb = 'انتهى التسجيل دون أن أسمع شيئاً. اضغط «انطقها» وتكلّم فوراً.';
    save(); hooks.render();
  };

  try { r.start() } catch (x) {
    logError('بدء تسجيل الصوت', x);
    if (!alive(mine)) return;
    S.snd.live = false;
    S.snd.fb = 'تعذّر بدء التسجيل. اضغط مرة واحدة فقط وانتظر.';
    save(); hooks.render();
  }
}

/* هل ما زالت الجلسة التي بدأت التسجيل هي الجارية؟ */
function alive(mine) { return mine === gen && !!S.snd }

export function soundHeard(text, mine) {
  if (mine !== undefined && !alive(mine)) return;
  const d = S.snd;
  if (!d || d.done) return;
  const cur = current(d);
  if (!cur) return;                                   // نتيجة وصلت بعد آخر مطالبة

  const said = String(text || '').toLowerCase().replace(/[^\w\s']/g, '').trim();
  const spoken = said.split(/\s+/).filter(Boolean);

  /* المحرّك يردّ أحياناً عبارة («a pen») عن كلمة واحدة، فنبحث في كلماتها كلها
     بدل الاكتفاء بأولاها، وإلا عاقبنا نطقاً سليماً. */
  let verdict;
  if (!spoken.length) verdict = 'silent';
  else if (spoken.includes(cur.want.toLowerCase())) verdict = 'ok';
  else if (spoken.includes(cur.other.toLowerCase())) verdict = 'swapped';
  else verdict = 'unclear';

  d.live = false;
  d.heard = said;
  d.slots[slotKey(d)] = verdict;                      // الإعادة تستبدل ولا تُضيف
  d.fb = null;
  save(); hooks.render();
}

export function soundNext() {
  const d = S.snd;
  if (!d || d.done) return;
  const s = SOUND[d.id];
  if (!s) { closeSound(); return }
  gen++;                                              // ما زال في الهواء لا يخصّ المطالبة التالية
  d.live = false; d.heard = null; d.fb = null;
  if (d.side === 0) d.side = 1;
  else { d.side = 0; d.i++ }
  if (d.i >= s.pairs.length) d.done = true;
  save(); hooks.render();
}

/* النتيجة على عدد المطالبات، فالمحاولة العاشرة الصحيحة كالأولى. */
export function soundResult(d) {
  const s = SOUND[d.id];
  const total = s ? s.pairs.length * 2 : 0;
  const v = Object.values(d.slots);
  const ok = v.filter(x => x === 'ok').length;
  return {total, answered: v.length, ok,
    swapped: v.filter(x => x === 'swapped').length,
    pc: total ? Math.round(ok / total * 100) : 0};
}

export function soundsView() {
  const d = S.snd;
  if (!d) return pickerHtml();
  if (!SOUND[d.id]) return card('تدريب الأصوات',
    '<p class="muted">لم أعد أجد هذا الصوت.</p>'
    + '<div class="row" style="justify-content:flex-start"><button class="btn" onclick="closeSound()">رجوع</button></div>');
  return d.done ? doneHtml(d) : drillHtml(d);
}

function pickerHtml() {
  return card('تدريب الأصوات',
    `<p class="muted">اختر الصوت الذي تريد تثبيته. كل صوت فيه شرح لسبب صعوبته على العربي، وأزواج كلمات لا تختلف إلا فيه.</p>`
    + SOUNDS.map(s => `<div class="unit" style="padding:0">
        <div class="stop" style="padding:6px 0">
          <a href="javascript:void(0)" onclick="startSound('${s.id}')" class="stopCard" style="text-decoration:none;color:inherit">
            <span style="flex:1;min-width:0"><b>${esc(s.t)}</b>
              <span class="muted" style="display:block;font-size:11.5px">${esc(s.bad)}</span></span>
            <span class="btn ghost" style="margin:0;padding:8px 13px;min-height:0;font-size:12px">درّبني</span>
          </a></div></div>`).join(''));
}

function doneHtml(d) {
  const s = SOUND[d.id], r = soundResult(d);
  const tone = r.pc >= 80 ? 'var(--green)' : r.pc >= 50 ? 'var(--amber)' : 'var(--coral)';
  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">${esc(s.t)}</span>
      <div class="dsp" style="font-size:52px;line-height:1.1;color:${tone}">${ar(r.pc)}<span style="font-size:24px">٪</span></div>
      <p class="muted">${ar(r.ok)} صحيحة من ${ar(r.total)}${
        r.swapped ? ' · نطقتَ الكلمة الأخرى ' + ar(r.swapped) + ' مرة' : ''}</p>
      ${r.answered < r.total ? `<p class="muted" style="font-size:11.5px">لم تُسجَّل ${ar(r.total - r.answered)} مطالبة.</p>` : ''}
    </div>
    ${r.swapped ? card('ما يزال يلتبس عليك', `<p class="muted">${emph(s.fix)}</p>`) : ''}
    <div class="row" style="margin-top:12px">
      <button class="btn" onclick="startSound('${d.id}')">أعد التدريب</button>
      <button class="btn ghost" onclick="closeSound()">رجوع</button></div>`;
}

function drillHtml(d) {
  const {s, want, other} = current(d);
  const pairs = s.pairs;
  const done = d.slots[slotKey(d)] !== undefined;

  return `<div class="card">
      <div style="display:flex;align-items:center;gap:11px">
        <div class="bar" style="flex:1;margin:0"><i style="width:${(d.i * 2 + d.side) / (pairs.length * 2) * 100}%"></i></div>
        <span class="muted" style="font-size:12px;font-weight:700">${ar(d.i + 1)} من ${ar(pairs.length)}</span></div>
      <h2 style="margin-top:12px">${esc(s.t)}</h2>
      <p class="muted">${esc(s.why)}</p>
      ${done ? '' : `<div style="background:var(--surf2);border-radius:14px;padding:12px;margin-top:10px">
        <b style="font-size:13px;color:var(--ind2)">كيف تنطقه</b>
        <p class="muted" style="margin-top:4px">${emph(s.fix)}</p></div>`}
    </div>

    <div class="card">
      <p class="muted" style="font-size:12px">قل هذه الكلمة</p>
      <p class="en dsp" style="font-size:38px;margin-top:4px">${esc(want)}</p>
      <p class="muted" style="font-size:12.5px">وليست <span class="en" style="font-weight:600">${esc(other)}</span> — والفرق بينهما هذا الصوت وحده.</p>

      <div class="row" style="justify-content:flex-start;margin-top:12px">
        <button class="btn ghost" onclick="sayWord(0)">${svg('sound', 16)} استمع</button>
        <button class="btn ghost" onclick="sayWord(1)">${svg('sound', 16)} استمع للأخرى</button>
      </div>
      <div class="row" style="justify-content:flex-start;margin-top:8px">
        <button class="btn" onclick="soundListen()" ${d.live ? 'disabled style="opacity:.6"' : ''}>
          ${svg('mic', 18, '#fff')} ${d.live ? 'أسمعك…' : done ? 'أعد النطق' : 'انطقها'}</button>
        ${done ? `<button class="btn ghost" onclick="soundNext()">التالية ←</button>` : ''}
      </div>

      ${d.fb ? `<p class="muted" style="margin-top:10px">${esc(d.fb)}</p>` : ''}
      ${done ? verdictHtml(d.slots[slotKey(d)], want, other, d.heard, s) : ''}
    </div>

    <div class="row"><button class="btn ghost" style="background:transparent;color:var(--faint)" onclick="closeSound()">إنهاء التدريب</button></div>`;
}

/* الكلمة تُقرأ من الحالة لا من نصٍّ مزروع في onclick: الاقتباس داخل سمة HTML
   يُفكّ قبل أن يراه محلّل الجافاسكربت، فالتهريب هناك لا يحمي شيئاً. */
export function sayWord(which) {
  const d = S.snd;
  const cur = d && current(d);
  if (cur) hooks.say(which ? cur.other : cur.want);
}

/* ثلاث حالات لا واحدة: نطقتها، نطقتَ أختها، أو لم يصل صوت أصلاً.
   جمعها في «لم أتبيّنها» يلوم المتعلّم على عطل في الميكروفون. */
function verdictHtml(verdict, want, other, heard, s) {
  if (verdict === 'ok')
    return `<p style="margin-top:12px;color:var(--green);font-weight:700">✓ نطقتها صحيحة — سمعتُ «${esc(heard)}»</p>`;
  if (verdict === 'swapped')
    return `<div style="margin-top:12px;background:var(--badBg);border-radius:14px;padding:12px">
      <b style="color:var(--coral)">سمعتُ «${esc(other)}» لا «${esc(want)}»</b>
      <p class="muted" style="margin-top:5px">${emph(s.fix)}</p></div>`;
  if (verdict === 'silent')
    return `<div style="margin-top:12px;background:var(--surf2);border-radius:14px;padding:12px">
      <span class="muted">لم يصل صوت. تأكّد أن الميكروفون غير مكتوم، ثم اضغط «أعد النطق».</span></div>`;
  return `<div style="margin-top:12px;background:var(--surf2);border-radius:14px;padding:12px">
      <span class="muted">سمعتُ «${esc(heard)}» ولم أتبيّنها — ليست «${esc(want)}» ولا «${esc(other)}».
      قل الكلمة وحدها، أوضح وأبطأ.</span></div>`;
}
