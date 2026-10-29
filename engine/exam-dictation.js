/* اختبار الإملاء: يسمع الجملة ويكتبها.

   لماذا اختبارٌ مستقلّ وقد صار نوعاً داخل الدروس؟ لأن التمرين داخل الدرس
   يأتي بعد شرح القاعدة وبين أمثلتها، فالمتعلّم يتوقّع ما سيسمع. والاختبار
   يسحب من الدروس كلّها بلا ترتيب، فيُقاس سمعُه مجرّداً عن التوقّع.

   وهو أصدق قياسٍ للاستماع في البرنامج: لا خيارات تُخمَّن، ولا نصّ يُقرأ —
   ما كتبه هو ما سمعه. */
import {LESSONS} from '../content/lessons.js';
import {S, save, keepResult} from './state.js';
import {reachedUnit} from './progress.js';
import {hooks} from './bus.js';
import {typedOk} from './quiz.js';

const N = 10;

/* من الدروس التي بلغها وحدها.

   كان يسحب من المنهج كلِّه، فيُملي على مَن في الوحدة الثالثة جملةً
   من C2 — وهو لم يرَ كلماتها بعد. والإملاءُ قياسُ سمعٍ لما تعلّمه،
   لا امتحانُ ما لم يصل إليه. */
export function dictationPool() {
  const upto = reachedUnit();
  return LESSONS.filter(l => l.u <= upto)
    .flatMap(l => l.items.filter(i => i.k === 'listen'));
}

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]] }
  return x;
}

export function examDictStart() {
  S.dx = {items: shuffle(dictationPool()).slice(0, N), i: 0, done: [], shown: null, finished: false, plays: 0};
  S.tab = 'examdict';
  save(); hooks.render();
}

export function examDictQuit() { S.dx = null; S.tab = 'course'; save(); hooks.render() }

export function examDictItem() {
  const d = S.dx;
  return d && d.i < d.items.length ? d.items[d.i] : null;
}

/* عدد مرّات السماع يُحصى ويُعرض: من احتاج خمس مرّات ليس كمن كفته واحدة،
   ولا نمنعه — المنع يقيس السرعة لا الفهم. */
export function examDictPlay(rate) {
  const d = S.dx, it = examDictItem();
  if (!d || !it) return;
  d.plays++;
  hooks.say(it.ok[0], rate || 1);
}

export function examDictAnswer(text) {
  const d = S.dx, it = examDictItem();
  if (!d || !it || d.shown) return;
  const el = typeof document !== 'undefined' && document.getElementById('dxTxt');
  const said = String(text === undefined ? (el && el.value) || '' : text).trim();
  d.shown = {said, ok: typedOk(said, it.ok), model: it.ok[0], plays: d.plays};
  d.done.push(d.shown);
  save(); hooks.render();
}

export function examDictNext() {
  const d = S.dx;
  if (!d || !d.shown) return;
  d.shown = null; d.plays = 0; d.i++;
  if (d.i >= d.items.length) d.finished = true;
  save(); hooks.render();
}

export function examDictResult() {
  const d = S.dx;
  if (!d || !d.done.length) return null;
  const right = d.done.filter(x => x.ok).length;
  const pc = Math.round(right / d.done.length * 100);
  const plays = d.done.reduce((s, x) => s + x.plays, 0) / d.done.length;
  return {pc, right, n: d.done.length, plays: Math.round(plays * 10) / 10,
    items: d.done, band: dictBand(pc)};
}

export function dictBand(pc) {
  if (pc >= 85) return {t:'سمعٌ دقيق', c:'var(--green)', d:'تميّز ما تسمعه وتكتبه صحيحاً.'};
  if (pc >= 65) return {t:'جيد', c:'var(--green)', d:'تسمع الجملة وتفوتك كلمة. أعد السماع قبل أن تكتب.'};
  if (pc >= 45) return {t:'مقبول', c:'var(--amber)', d:'تلتقط الكلمات المفردة ويصعب عليك ربطها.'};
  return {t:'يحتاج تدريباً', c:'var(--coral)', d:'ارجع إلى تدريب الأصوات، فكثير من الخطأ سمعٌ لا كتابة.'};
}

export function examDictFinish() {
  const r = examDictResult();
  if (r) { keepResult('dictation', r.pc); S.xp += Math.round(r.pc / 5) }
  S.dx = null; S.tab = 'course';
  save(); hooks.render();
}
