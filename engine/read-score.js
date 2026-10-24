/* ميزان اختبار القراءة: دوالّ خالصة، لا حالة ولا شاشة.

   ثلاثة محاور، وكلٌّ يُقاس من شيء موجود:
     الفهم    من أسئلة صح/خطأ والإجابة القصيرة
     المفردات من استخراج الكلمة من النصّ بسياقها
     السرعة   من زمن القراءة الفعلي مقسوماً على كلمات النصّ

   والسرعة وزنها خفيف عمداً: من يفهم ببطء قارئ، ومن يسرع ولا يفهم ليس
   بقارئ. وزنها الثقيل يكافئ التسرّع، وهو عكس ما نريد تعليمه. */
import {normalize} from './translate.js';
import {lev} from './pronounce.js';

const clamp = n => Math.max(0, Math.min(100, Math.round(n)));

export const READ_AXES = [
  {k:'comp', t:'الفهم',    w:65, d:'هل فهمت ما قرأت؟'},
  {k:'vocab', t:'المفردات', w:25, d:'معاني الكلمات داخل سياقها'},
  {k:'speed', t:'سرعة القراءة', w:10, d:'كلمة في الدقيقة — مؤشّر لا حُكم'}
];

export function countWords(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

/* A1 المعتاد بين ٦٠ و٩٠ كلمة في الدقيقة. دون الأربعين تهجٍّ، وفوق المئة
   لم يقرأ النصّ. ولذلك السرعة العالية لا تُكافأ بلا فهم — والفهم محور آخر. */
export function wpm(words, ms) {
  const mins = Math.max(0.05, (Number(ms) || 0) / 60000);
  return Math.round(words / mins);
}

export function speedScore(rate) {
  if (!rate || rate < 1) return 0;
  if (rate >= 60 && rate <= 110) return 100;
  if (rate < 60) return clamp((rate / 60) * 100);
  /* فوق ١١٠ لم يقرأ بل قلّب الصفحة. */
  return clamp(100 - (rate - 110) * 1.2);
}

/* الإجابة القصيرة: نقبل ما يؤدّي المعنى لا صيغة بعينها، ونغفر زلّة الإملاء
   — فالاختبار اختبار قراءة لا إملاء.

   وسعة التسامح بقدر طول الجواب: في عبارة من عدّة كلمات، حرفان مقلوبان
   زلّةٌ بيّنة («big prak»). أمّا في كلمة واحدة قصيرة فحرفٌ واحد قد يصنع
   كلمة أخرى بالكامل — «there» ليست زلّةً في «three»، بل جواب آخر. */
function tolerance(target) {
  return target.split(' ').filter(Boolean).length > 1 ? 2 : 1;
}

/* وللكلمة المستخرجة حَكَمٌ أدقّ: النصّ نفسه. إن كان ما كتبه المتعلّم كلمةً
   أخرى موجودة في النصّ فقد اختار الكلمة الخطأ، ولم تَزِلّ يدُه. */
function matchShort(said, list, text) {
  const a = normalize(said);
  if (!a) return 0;
  if (list.some(o => normalize(o) === a)) return 100;

  const inText = text ? normalize(text).split(' ').includes(a) : false;
  if (!inText && list.some(o => lev(normalize(o), a) <= tolerance(normalize(o)))) return 90;

  /* احتواء الجواب الصحيح داخل جملة أطول مقبول: «they are in a big park». */
  if (list.some(o => a.includes(normalize(o)) || normalize(o).includes(a))) return 80;
  return 0;
}

export function gradeRead(q, answer, source) {
  if (q.k === 'tf') {
    const got = answer === true || answer === 'true';
    const skipped = answer === null || answer === undefined;
    return {sc: skipped ? 0 : (got === q.a ? 100 : 0), axis: 'comp', skipped};
  }
  const said = String(answer || '').trim();
  /* النصّ يُمرَّر لأسئلة المفردات وحدها: هناك الكلمة أمام عينه ينقلها. */
  const sc = matchShort(said, q.ok, q.k === 'word' ? source : null);
  return {sc, axis: q.k === 'word' ? 'vocab' : 'comp', said, skipped: !said};
}

export function readTotals(items, rate) {
  const by = k => items.filter(x => x.axis === k);
  const avg = l => l.length ? l.reduce((s, x) => s + x.sc, 0) / l.length : null;

  const scores = {
    comp: avg(by('comp')) === null ? null : clamp(avg(by('comp'))),
    vocab: avg(by('vocab')) === null ? null : clamp(avg(by('vocab'))),
    speed: rate ? speedScore(rate) : null
  };

  const live = READ_AXES.filter(a => scores[a.k] !== null);
  const tot = live.reduce((s, a) => s + a.w, 0) || 1;
  const raw = clamp(live.reduce((s, a) => s + scores[a.k] * a.w, 0) / tot);

  /* الفهم سقفٌ على السرعة والمفردات: من لم يفهم النصّ لم يقرأه، مهما
     أسرع ومهما عرف من كلمات مفردة. */
  const cap = scores.comp === null ? 100 : 30 + scores.comp * 0.7;
  const pc = Math.min(raw, Math.round(cap));

  /* فرق بين واقعة السقف وبين إعلانها: الرسالة تقول «سرعتك ومفرداتك
     أحسن من هذه النسبة»، فلا تُعرض إلا حين تكون صادقة: فهمٌ منخفض
     مع محورٍ آخر عالٍ. وإظهارها على نقصان نقطة إنذار كاذب. */
  const others = Math.max(scores.vocab === null ? 0 : scores.vocab, scores.speed === null ? 0 : scores.speed);
  const capExplains = scores.comp !== null && scores.comp < 55 && others >= 75;

  return {pc, raw, capped: pc < raw, capExplains, rate,
    axes: READ_AXES.map(a => ({...a, sc: scores[a.k],
      share: scores[a.k] === null ? 0 : Math.round(a.w / tot * 100)})),
    n: items.length, right: items.filter(x => x.sc >= 80).length,
    band: readBand(pc)};
}

export function readBand(pc) {
  if (pc >= 88) return {t:'قراءة سليمة', c:'var(--green)', d:'تفهم النصّ وتستخرج منه. جرّب نصّاً أطول.'};
  if (pc >= 72) return {t:'جيدة', c:'var(--green)', d:'تفهم الفكرة وتفوتك تفاصيل. اقرأ مرّتين قبل الإجابة.'};
  if (pc >= 55) return {t:'مقبولة', c:'var(--amber)', d:'تفهم الكلمات ويصعب عليك الربط بينها. ركّز على المفردات.'};
  return {t:'تحتاج تدريباً', c:'var(--coral)', d:'ارجع إلى مفردات الوحدة ونصوصها القصيرة ثم عُد.'};
}

export function rateNote(rate) {
  if (!rate) return null;
  if (rate < 40) return 'تقرأ كلمةً كلمة. اقرأ المجموعة القصيرة دفعةً واحدة بدل الوقوف على كل كلمة.';
  if (rate < 60) return 'سرعتك دون المعتاد قليلاً، وهي طبيعية في البداية.';
  if (rate <= 110) return 'سرعتك في المعتاد لهذا المستوى.';
  return 'أسرع من المعتاد — تأكّد أنك تقرأ النصّ لا تمرّ عليه.';
}
