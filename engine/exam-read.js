/* إدارة اختبار القراءة: اختيار النصّ، وقياس زمن القراءة، وجمع الإجابات.
   الميزان في engine/read-score.js. */
import {READS, READ} from '../content/read-texts.js';
import {S, save, keepResult} from './state.js';
import {keepSkill} from './unit-plan.js';
import {hooks} from './bus.js';
import {gradeRead, readTotals, countWords, wpm} from './read-score.js';
import {reachedUnit, unitLevel} from './progress.js';

/* النصّ من مستوى المتعلّم، لا من حيث اتّفق.

   كان الاختيار عشوائياً من البنك كلِّه: فيقع المبتدئ على مقالٍ
   حجاجيٍّ من C2، ويُثبت من بلغ C2 قدرتَه بنصٍّ من A1. وهو العيب
   نفسه الذي كان في ورقة الكتابة — ونتيجةُ القراءة خانةٌ واحدة،
   فالنصُّ هو كلُّ ما يفصل قياساً من قياس.

   والمدى ما بلغه لا ما يقف عنده وحده: المراجعة بنصٍّ أسهل مقصودة،
   وإنما يُؤثَر مستواه حين يوجد فيه نصّ. */
/* بوحدةٍ معيَّنة: نصوصُ تلك الوحدة وحدها — فمحطّةُ الوحدة تقيسها هي.

   وكانت المحطّةُ تنادي examReadStart(0, u)، وREAD[0] لا وجودَ له
   (المفاتيحُ نصوصٌ كـr-note)، فتسقط إلى سحبٍ عشوائيٍّ من المستوى
   كلِّه: يُطلَب «قراءةُ الوحدة ١» فيأتي نصُّ الوحدة ٢، ثمّ تُسجَّل
   درجتُه في S.skills[1].read فتُفتح بها بوابةُ وحدةٍ لم تُقرأ. */
export function readPool(unit) {
  const u = Number(unit) || 0;
  if (u) {
    const own = READS.filter(t => t.u === u);
    if (own.length) return own;
  }
  const upto = reachedUnit();
  const reached = READS.filter(t => t.u <= upto);
  if (!reached.length) return READS.slice();
  const here = unitLevel(upto);
  const own = reached.filter(t => unitLevel(t.u) === here);
  return own.length ? own : reached;
}

export function examReadStart(id, unit) {
  const pool = readPool(unit);
  const t = READ[id] || pool[Math.floor(Math.random() * pool.length)];
  /* u تُحمَل من البدء: الخاتمةُ تحتاج أن تعرف لأيّ وحدةٍ تُسجّل. */
  S.rx = {id: t.id, u: Number(unit) || 0, stage: 'read', began: Date.now(), ms: 0, i: 0, ans: {}, done: false};
  S.tab = 'examread';
  save(); hooks.render();
}

export function examReadQuit() { S.rx = null; S.tab = 'course'; save(); hooks.render() }

export function examReadText() { return S.rx ? READ[S.rx.id] : null }

export function examReadQ() {
  const r = S.rx, t = examReadText();
  return r && t && r.i < t.qs.length ? t.qs[r.i] : null;
}

/* زمن القراءة يُختم مرّة واحدة: من عاد إلى النصّ أثناء الأسئلة لا يُحاسَب
   على ذلك الوقت، لأن مراجعة النصّ قراءةٌ مشروعة لا بطء. */
export function examReadDone() {
  const r = S.rx;
  if (!r || r.stage !== 'read') return;
  /* الضغطة الفورية زمنّ أيضاً: نسجلها ولا نجعلها صفراً، لأن الصفر يُسقِط
     محور السرعة بدل أن يرصد أنّ المتعلّم لم يقرأ. */
  r.ms = Math.max(1, Date.now() - r.began);
  r.stage = 'qs';
  save(); hooks.render();
}

export function examReadAnswer(v) {
  const r = S.rx, q = examReadQ();
  if (!r || !q || r.stage !== 'qs') return;
  const val = v === undefined ? fieldValue() : v;
  r.ans[r.i] = val;
  r.i++;
  if (r.i >= examReadText().qs.length) { r.stage = 'result'; r.done = true }
  save(); hooks.render();
}

export function examReadSkip() { examReadAnswer(null) }

export function examReadBack() {
  const r = S.rx;
  if (r && r.stage === 'qs' && r.i > 0) { r.i--; save(); hooks.render() }
}

function fieldValue() {
  const el = document.getElementById('rxTxt');
  return el && el.value ? el.value : '';
}

export function examReadRate() {
  const r = S.rx, t = examReadText();
  return r && t && r.ms ? wpm(countWords(t.text), r.ms) : 0;
}

export function examReadResult() {
  const r = S.rx, t = examReadText();
  if (!r || !t || !r.done) return null;
  const items = t.qs.map((q, i) => ({...gradeRead(q, r.ans[i], t.text), q, i}));
  const out = readTotals(items, examReadRate());
  out.items = items;
  out.text = t;
  return out;
}

export function examReadFinish() {
  const res = examReadResult();
  if (res) {
    keepResult('read', res.pc);
    keepSkill(S.rx && S.rx.u, 'read', res.pc);
    S.xp += Math.round(res.pc / 5);
  }
  S.rx = null; S.tab = 'course';
  save(); hooks.render();
}
