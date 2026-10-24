/* اختبار المحادثة الكاملة: ثمانية أدوار متصلة، بالصوت، بلا تلميح ولا إعادة.

   لماذا بلا تلميح ولا إعادة؟ لأن التدريب يُصحّح، والاختبار يَقيس. لو سمحنا
   بالإعادة لقِسنا المحاولة الأخيرة، وهي ليست ما سيفعله في المطار.

   ولماذا أربعة محاور لا درجة واحدة؟ لأن «٧٠٪» لا تقول شيئاً: من يفهم السؤال
   ويردّ بنحو ركيك يحتاج غير من ينطق نطقاً سليماً جملةً لا صلة لها بالسؤال. */
import {EXAM_SCENES, EXAM_SCENE} from '../content/exam-scenes.js';
import {S, save, logError, keepResult} from './state.js';
import {hooks} from './bus.js';
import {checkGrammar, fixText} from './grammar.js';
import {words} from './pronounce.js';
import {AXES, scoreTurn, examTotals} from './exam-score.js';

export {AXES};

/* المشهد يُختار عشوائياً حتى لا يحفظ أحدٌ ترتيبَه ويستعدّ له. */
/* الموقف لا يتكرّر حتّى تدور المواقف كلّها: إعادة الاختبار على
   مشهد جرّبته تقيس ما حفِظته منه لا قدرتك على الكلام في موقف جديد. */
function freshScene() {
  const seen = Array.isArray(S.cxSeen) ? S.cxSeen : [];
  let pool = EXAM_SCENES.filter(s => seen.indexOf(s.id) < 0);
  if (!pool.length) { S.cxSeen = []; pool = EXAM_SCENES }   // دارت كلّها فنبدأ دورة جديدة
  return pool[Math.floor(Math.random() * pool.length)];
}

export function examConvStart(id) {
  const sc = EXAM_SCENE[id] || freshScene();
  S.cx = {id: sc.id, ti: 0, turns: [], asked: Date.now(), fb: null, busy: false, done: false};
  if (!Array.isArray(S.cxSeen)) S.cxSeen = [];
  if (S.cxSeen.indexOf(sc.id) < 0) S.cxSeen.push(sc.id);
  S.tab = 'examconv';
  save(); hooks.render();
  setTimeout(() => examConvSay(), 400);
}

export function examConvQuit() { S.cx = null; S.tab = 'speak'; save(); hooks.render() }

export function examConvScene() { return S.cx ? EXAM_SCENE[S.cx.id] : null }

export function examConvTurn() {
  const sc = examConvScene();
  return sc && S.cx.ti < sc.turns.length ? sc.turns[S.cx.ti] : null;
}

/* المحاور يتكلّم، ومن هنا تبدأ ساعة الردّ: التأخّر جزء من القياس. */
export function examConvSay() {
  const t = examConvTurn();
  if (!t) return;
  S.cx.asked = Date.now();
  hooks.say(t.p);
}

export function examConvListen() {
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  const c = S.cx;
  if (!c || c.done) return;
  if (!R) {
    c.fb = 'اختبار المحادثة بالصوت، وهذا المتصفح لا يدعم التعرّف على الكلام. افتحه في Chrome أو Edge.';
    hooks.render(); return;
  }
  if (c.busy) { c.fb = 'الميكروفون يعمل الآن — تكلّم.'; hooks.render(); return }

  const r = new R();
  r.lang = 'en-US';
  c.busy = true; c.fb = '🎙️ أسمعك…'; hooks.render();

  r.onresult = e => {
    const best = e.results[0][0];
    examConvAnswer(best.transcript.trim(), typeof best.confidence === 'number' ? best.confidence : null);
  };
  r.onerror = e => { c.busy = false; c.fb = 'تعذّر التسجيل (' + e.error + '). اضغط «أجب» مرة أخرى.'; save(); hooks.render() };
  r.onend = () => { if (c.busy) { c.busy = false; c.fb = 'لم أسمع شيئاً. اضغط «أجب» وتكلّم بصوت أوضح.'; save(); hooks.render() } };

  try { r.start() } catch (x) {
    logError('بدء تسجيل الاختبار', x);
    c.busy = false;
    c.fb = 'تعذّر بدء التسجيل. اضغط «أجب» مرة واحدة فقط.';
    save(); hooks.render();
  }
}

/* الردّ يُسجَّل ولا يُصحَّح: التقرير بعد النهاية، لا بين دورٍ ودور. */
export function examConvAnswer(text, conf) {
  const c = S.cx, t = examConvTurn();
  if (!c || !t || c.done) return;
  c.busy = false;

  const said = String(text || '').trim();
  const rec = scoreTurn(t, said, conf, Date.now() - (c.asked || Date.now()));
  rec.g = checkGrammar(said).map(x => x.ar);
  rec.fixed = fixText(said);
  rec.g.forEach(k => { S.errs[k] = (S.errs[k] || 0) + 1 });

  c.turns.push(rec);
  c.fb = null;
  c.ti++;

  const sc = examConvScene();
  if (c.ti >= sc.turns.length) { c.done = true; c.at = Date.now() }
  save(); hooks.render();
  if (!c.done) setTimeout(() => examConvSay(), 700);
}

/* لمن لا ميكروفون عنده: يُحتسب كل شيء إلا وضوح النطق، ويُعلَّن ذلك في التقرير. */
export function examConvTyped() {
  const el = document.getElementById('cxTxt');
  const v = el && el.value ? el.value.trim() : '';
  if (!v) return;
  if (el) el.value = '';
  examConvAnswer(v, null);
}

export function examConvResult() {
  const c = S.cx;
  if (!c || !c.turns.length) return null;
  const res = examTotals(c.turns);
  res.scene = EXAM_SCENE[c.id];
  res.turns = c.turns;
  return res;
}

/* النتيجة تُحفظ في السجلّ لا في جلسة الاختبار: الجلسة لحظية وتُمحى. */
export function examConvFinish() {
  const res = examConvResult();
  if (res) {
    keepResult('conv', res.pc);
    S.xp += Math.round(res.pc / 5);
  }
  S.cx = null; S.tab = 'speak';
  save(); hooks.render();
}

export function examConvWords(said) { return words(said).length }
