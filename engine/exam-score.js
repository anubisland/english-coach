/* رُبريك اختبار المحادثة: دالّات خالصة، لا حالة ولا شاشة.

   فُصلت عن engine/exam-convo.js عمداً حتى يُختبر الميزان وحده بلا متصفّح،
   ولأن تعديل المعايير شأن، وإدارة الأدوار شأن آخر.

   ولماذا هذه المحاور الأربعة بالذات؟ لأن كلاً منها يُقاس من شيء موجود فعلاً:
     الصلة     من مطابقة الرد لما يطلبه السؤال
     النحو     من عدّاد أخطاء engine/grammar.js
     الوضوح    من ثقة محرّك التعرّف على الكلام — إن لم يفهمك الجهاز
               فالغالب أنّ الإنجليزيّ لن يفهمك. وهو مؤشّر لا حُكم، ونقولها للمتعلّم.
     الطلاقة   من طول الرد وزمن التفكير قبله */

import {relevance as relLevel} from './relevance.js';

export const AXES = [
  {k:'rel', t:'الصلة بالسؤال', w:35, d:'هل أجبتَ عمّا سُئلت؟'},
  {k:'gr',  t:'سلامة النحو',   w:25, d:'أخطاء التركيب في ردودك'},
  {k:'cl',  t:'وضوح النطق',    w:20, d:'كم فهم الجهاز كلامك — مؤشّر لا حُكم'},
  {k:'fl',  t:'الطلاقة',       w:20, d:'طول الرد وسرعة البديهة'}
];

const clamp = n => Math.max(0, Math.min(100, Math.round(n)));

/* الكلمات المتوقّعة تَرفع ولا تَخفض: من أجاب إجابة صحيحة بكلمات أخرى لم يُخطئ. */
function clarity(conf, said, want) {
  if (typeof conf !== 'number') return null;
  const list = Array.isArray(want) ? want : [];
  const low = said.toLowerCase();
  const hit = list.length ? list.filter(w => low.includes(String(w).toLowerCase())).length / list.length : 0;
  return clamp(100 * (conf + (1 - conf) * hit * 0.5));
}

/* الرد القصير جداً ليس كلاماً، والصمت الطويل قبله ليس طلاقة. */
function fluency(n, ms) {
  const len = Math.min(1, n / 4);
  const t = typeof ms === 'number' && ms >= 300 ? ms : 4000;
  const lat = t <= 4000 ? 1 : t >= 15000 ? 0.3 : 1 - 0.7 * ((t - 4000) / 11000);
  return clamp(100 * (0.6 * len + 0.4 * lat));
}

/* من تكلّم ولم يُصب الموضوع أحسنُ ممّن سكت، لكنه لم يُجب: درجة رمزية لا ربع.
   الاختبار يقيس المحادثة، ومن يردّ بما لا صلة له بالسؤال لم يُحادِث. */
function relevance(turn, said) {
  /* الحكم من engine/relevance.js: الكلمة المفتاحية وحدها كانت تُجيز
     «x from y» جواباً عن «Where are you from؟»، فأُضيف إليها شرط شكل الجواب. */
  const lv = relLevel(turn.p, said, turn.need).level;
  /* الجملة التامّة التي لا تمسّ السؤال ليست ربع محادثة ولا خمسيها:
     الفصاحة في غير موضعها لا تُحسب محادثة. */
  return lv === 'on' ? 100 : lv === 'weak' ? 25 : 0;
}

export function scoreTurn(turn, said, conf, ms) {
  const n = String(said || '').trim().split(/\s+/).filter(Boolean).length;
  return {
    said, n, ms: typeof ms === 'number' ? ms : null,
    conf: typeof conf === 'number' ? conf : null,
    rel: relevance(turn, said),
    cl: clarity(conf, String(said || ''), turn.want),
    fl: fluency(n, ms),
    g: []
  };
}

function avg(list) { return list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0 }

/* الأوزان تُعاد قسمتها إذا سقط محور: من اختبر بالكتابة لا يُحاسَب على نطق لم يُقَس. */
function weigh(scores) {
  const live = AXES.filter(a => scores[a.k] !== null);
  const tot = live.reduce((s, a) => s + a.w, 0) || 1;
  return {
    pc: clamp(live.reduce((s, a) => s + scores[a.k] * a.w, 0) / tot),
    axes: AXES.map(a => ({...a, sc: scores[a.k], share: scores[a.k] === null ? 0 : Math.round(a.w / tot * 100)}))
  };
}

export function examTotals(turns) {
  /* النحو يُحسب على ما قيل فعلاً: من لم ينطق لا يستحق ١٠٠٪ في النحو. */
  const said = turns.filter(t => t.n > 0);
  const errs = said.reduce((s, t) => s + (t.g ? t.g.length : 0), 0);
  const clean = turns.map(t => t.cl).filter(v => v !== null);

  const scores = {
    rel: clamp(avg(turns.map(t => t.rel))),
    /* ٦٠ لا ٢٥: خطأ واحد في كل دور يهبط بالنحو إلى ٤٠٪، وهذا وصف صادق لمن
       يقول «I healthy». الميزان الرخو يمنح لقب «متمكّن» لمن لا يُتقن،
       فتسقط مصداقية البرنامج كلّه. */
    gr: said.length ? clamp(100 - (errs / said.length) * 60) : null,
    cl: clean.length ? clamp(avg(clean)) : null,
    fl: clamp(avg(turns.map(t => t.fl)))
  };

  const {pc, axes} = weigh(scores);

  /* سقف تفرضه الصلة: من لم يُجب عن الأسئلة لا ينفعه أن نحوه سليم ونطقه واضح،
     لأنه نطق نُطقاً سليماً كلاماً لا صلة له. جمعُ المحاور جمعاً حرّاً كان يمنح
     ٦٥٪ لمن لم يُجب عن سؤال واحد، وهذه نتيجة لا يمكن الدفاع عنها. */
  const cap = 35 + scores.rel * 0.65;
  const final = Math.min(pc, Math.round(cap));
  return {pc: final, raw: pc, capped: final < pc, axes, errs,
    spoken: clean.length, n: turns.length, band: band(final), weakest: weakest(axes)};
}

export function band(pc) {
  if (pc >= 90) return {t:'متمكّن', c:'var(--green)', d:'تتحدّث في هذا الموقف بثقة. انتقل إلى مستوى أعلى.'};
  if (pc >= 72) return {t:'جيد',    c:'var(--green)', d:'تُفهم وتُجيب. اشتغل على المحور الأضعف وستتجاوز ٩٠٪.'};
  if (pc >= 58) return {t:'مقبول',  c:'var(--amber)', d:'توصل المعنى بصعوبة. أعد الاختبار بعد تدريب المحور الأضعف.'};
  return {t:'يحتاج تدريباً', c:'var(--coral)', d:'الموقف أصعب من مستواك الآن. ارجع إلى الدروس والمحادثة التدريبية ثم عُد.'};
}

function weakest(axes) {
  const live = axes.filter(a => a.sc !== null);
  return live.length ? live.reduce((a, b) => (b.sc < a.sc ? b : a)) : null;
}
