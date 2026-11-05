/* إدارة اختبار الكتابة: اختيار الأسئلة، والتنقّل، وحفظ النتيجة.
   التصحيح نفسه في engine/write-score.js، لأن تعديل الميزان شأن،
   وإدارة الجلسة شأن آخر. */
import {WRITE} from '../content/write-tasks.js';
import {S, save, keepResult} from './state.js';
import {reachedUnit} from './progress.js';
import {hooks} from './bus.js';
import {gradeWrite, writeTotals} from './write-score.js';
import {keepSkill} from './unit-plan.js';
import {noteSentence} from './book.js';
import {noteError} from './journal.js';

const ORDER = ['order', 'gap', 'build', 'free'];

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]] }
  return x;
}

/* ورقة متوازنة: من كل نوع نصيبه، ومن داخل النوع اختيار عشوائي —
   فلا يحفظ المتعلّم ورقةً بعينها، ولا يغيب نوع عن القياس. */
export function pickWrite(unit) {
  /* بلا وحدةٍ معيَّنة: ما بلغه المتعلّم، لا المنهج كلُّه. وكانت
     الشاشة تنادي pickWrite(0) فتأتيه ورقةٌ فيها A1 وB2 وC1 معاً
     وهو في الوحدة الثالثة. */
  const upto = reachedUnit();
  const pool = WRITE.filter(t => unit ? t.u === unit : t.u <= upto);
  const want = {order: 3, gap: 4, build: 3, free: 1};
  const out = [];
  ORDER.forEach(k => {
    const of = shuffle(pool.filter(t => t.k === k));
    out.push(...of.slice(0, want[k]));
  });
  return out.length ? out : shuffle(WRITE.filter(t => t.u <= upto)).slice(0, 8);
}

export function examWriteStart(unit) {
  const items = pickWrite(Number(unit) || 0);
  S.wx = {items, u: Number(unit) || 0, i: 0, done: [], shown: null, finished: false};
  S.rev = null;   /* رأيُ ورقةٍ سابقة لا يُعرض على ورقةٍ جديدة */
  S.tab = 'examwrite';
  save(); hooks.render();
}

export function examWriteQuit() { S.wx = null; S.rev = null; S.tab = 'course'; save(); hooks.render() }

export function examWriteTask() {
  const w = S.wx;
  return w && w.i < w.items.length ? w.items[w.i] : null;
}

/* الكلمات المبعثرة تُخلط مرّة واحدة وتُحفظ، وإلا تغيّر ترتيبها مع كل رسم. */
export function examWriteBag() {
  const w = S.wx, t = examWriteTask();
  if (!w || !t || t.k !== 'order') return null;
  if (!w.bag || w.bagFor !== w.i) {
    let b = shuffle(t.w);
    if (b.join(' ') === t.w.join(' ') && b.length > 1) b = b.reverse();
    w.bag = b; w.bagFor = w.i;
  }
  return w.bag;
}

export function examWriteAnswer(text) {
  const w = S.wx, t = examWriteTask();
  if (!w || !t || w.shown) return;
  const v = text === undefined ? fieldValue() : String(text);
  /* يُحفظ نصُّ المتعلّم مع نتيجته: الميزان لا يحتاجه، والمراجعُ
     الاختياريّ يحتاج ما كتبه هو لا ما فُهم منه. */
  w.shown = Object.assign(gradeWrite(t, v), {ans: v});
  w.done.push(w.shown);
  keepWritten(w, t, w.shown);
  save(); hooks.render();
}

/* وجملتُه تدخل كتابَه كما تدخله جملةُ المشهد والترجمة.

   وكانت الكتابةُ والإملاءُ خارج السجلّ: يُصحَّحان ثمّ يُرمَيان،
   فيَفتح المتعلّمُ «اليوم» بعد ورقةِ كتابةٍ كاملةٍ فلا يَجد جملةً
   واحدةً من جُمَله — وهو قد كتب عشراً. فنصفُ ما يُنتجه كان يَضيع.

   وتُعَدّ غلطتُه في الدفتر كذلك: «خطؤك المتكرّر» كان يَعُدّ ما
   يَقع في المشاهد وحدها، فيَظهر للمتكلّم ويَغيب عن الكاتب. */
function keepWritten(w, task, got) {
  const said = String(got.ans || '').trim();
  if (said.length < 2) return;
  /* والفراغُ لا يَدخل الكتاب: جوابُه كلمةٌ واحدةٌ لا جملة — وهو
     عينُ ما استُثني لأجله من قياس القواعد. وكتابٌ عنوانُه «كلُّ
     جملةٍ كتبتَها» تَدخله كلمةٌ مفردةٌ يُكذّب عنوانَه، ويَشغل
     أربعةً من أحدَ عشرَ موضعاً في الورقة الواحدة. */
  if (got.k === 'gap') return;

  /* والنصُّ الحرُّ لا نموذجَ له يُقابَل به: فيه فقراتٌ لا جملة،
     وعرضُ «الصواب: ...» عليه كذبٌ. فيُحفَظ بلا تصحيحٍ ويُكتفى
     بقواعده — وwrongLine تَعرفه غلطاً بقواعده تلك. */
  const fix = (got.k !== 'free' && got.sc < 100) ? (got.model || null) : null;
  const rec = noteSentence({text: said, fix, rids: got.rids,
                            src: 'كتابة: ' + KIND_AR[task.k], u: w.u});
  if (!rec) return;

  /* والدفترُ يُعَدّ بما دخل الكتابَ لا بما وَجده الميزان: الكتابُ
     يَحمل أربعةَ أرقامٍ على الأكثر، فلو عُدّ في الدفتر ستّةٌ لصارت
     قاعدتان في «خطؤك المتكرّر» بلا تاريخٍ في errHistory — تُذكَر
     ولا يُستطاع عرضُ جملةٍ واحدةٍ وقعت فيها. */
  const n = rec.r.length;
  rec.r.forEach(noteError);
  (got.g || []).slice(0, n).forEach(ar => { S.errs[ar] = (S.errs[ar] || 0) + 1 });
}

const KIND_AR = {order: 'ترتيب', gap: 'إكمال', build: 'إنشاء', free: 'نصّ حرّ'};

function fieldValue() {
  const el = document.getElementById('wxTxt');
  return el && el.value ? el.value : '';
}

export function examWriteNext() {
  const w = S.wx;
  if (!w || !w.shown) return;
  w.shown = null; w.bag = null; w.i++; S.rev = null;
  if (w.i >= w.items.length) w.finished = true;
  save(); hooks.render();
}

export function examWriteResult() {
  const w = S.wx;
  return w && w.done.length ? writeTotals(w.done) : null;
}

export function examWriteFinish() {
  const r = examWriteResult();
  if (r) {
    keepResult('write', r.pc);
    keepSkill(S.wx && S.wx.u, 'write', r.pc);
    S.xp += Math.round(r.pc / 5);
  }
  S.wx = null; S.tab = 'course';
  save(); hooks.render();
}
