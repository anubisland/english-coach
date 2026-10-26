/* تقييم الترجمة.

   درجة الجملة من محورين، ونعرضهما منفصلين حتى يعرف المتعلم سبب درجته:
     التطابق (70٪) — كم اقتربت جملته من صيغة مقبولة، كلمةً بكلمة
     الجرامر  (30٪) — ملاحظات محرّك GR على ما كتبه

   لا نعطي درجة واحدة غامضة: من يخسر في التطابق يحتاج مفردات،
   ومن يخسر في الجرامر يحتاج قاعدة — وهما علاجان مختلفان. */
import {TRANSLATE} from '../content/translate.js';
import {checkGrammar, fixText} from './grammar.js';

/* نوحّد الصيغة قبل المقارنة: الحالة، وعلامات الترقيم، والمسافات،
   والاختصارات الشائعة — فـ I'm و I am إجابة واحدة لا اثنتان. */
export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/\bi'm\b/g, 'i am').replace(/\b(he|she|it)'s\b/g, '$1 is')
    .replace(/\b(we|you|they)'re\b/g, '$1 are')
    .replace(/\bdon't\b/g, 'do not').replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bisn't\b/g, 'is not').replace(/\baren't\b/g, 'are not')
    .replace(/\bi've\b/g, 'i have').replace(/\bthere's\b/g, 'there is')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const words = s => normalize(s).split(' ').filter(Boolean);

/* أطول تسلسل مشترك: يكافئ الترتيب الصحيح لا مجرد وجود الكلمات.
   «student a am I» ليست كـ «I am a student». */
function lcs(a, b) {
  const n = a.length, m = b.length;
  const d = Array.from({length: n + 1}, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      d[i][j] = a[i] === b[j] ? d[i + 1][j + 1] + 1 : Math.max(d[i + 1][j], d[i][j + 1]);
  return d[0][0];
}

/* الكلمة الناقصة أثقل من الزائدة: من كتب «I student» حذف فعل الكون،
   وهو أشهر خطأ للمتعلم العربي، فلا يصحّ أن يقترب من الصواب.
   لذلك نبني الدرجة على التغطية (كم من الجملة المطلوبة أنتجه) لا على
   تشابه متوازن يعامل الحذف كالزيادة. */
function similarity(said, target) {
  const a = words(said), b = words(target);
  if (!a.length || !b.length) return 0;
  const common = lcs(a, b);
  const recall = common / b.length;                 // كم من المطلوب أنتج
  const extra = Math.max(0, (a.length - common) / a.length);  // كم زاد
  return Math.max(0, recall * (1 - 0.5 * extra));
}

export function gradeOne(item, said) {
  const text = String(said || '').trim();
  if (!text) return {score: 0, match: 0, grammar: 0, notes: [], best: item.en[0], exact: false, empty: true};

  let best = item.en[0], match = 0;
  item.en.forEach(acc => {
    const s = similarity(text, acc);
    if (s > match) { match = s; best = acc }
  });

  const exact = match === 1;
  const notes = exact ? [] : checkGrammar(text);
  const grammar = Math.max(0, 1 - notes.length * 0.34);

  /* الجرامر لا يُنقذ جملة ليست الجملة المطلوبة: من كتب جملة أخرى سليمة
     لا يستحق ثلاثين بالمئة على سلامتها. فوزن الجرامر يتلاشى كلما ابتعد. */
  const grammarWeight = Math.min(1, match * 1.6);

  return {
    score: Math.round(match * 70 + grammar * 30 * grammarWeight),
    match: Math.round(match * 100),
    grammar: Math.round(grammar * 100),
    notes, best, exact,
    fixed: exact ? text : fixText(text),
    said: text
  };
}

/* يسحب عدداً من الجمل موزّعة على الوحدات المتاحة. */
export function pickTranslation(n, maxUnit) {
  /* بلا سقفٍ مكتوب: من لم يمرّر سقفاً أراد البنك كلّه. */
  const pool = TRANSLATE.filter(t => t.u <= (maxUnit || Infinity));
  const byUnit = {};
  pool.forEach(t => { (byUnit[t.u] = byUnit[t.u] || []).push(t) });
  const shuffled = u => byUnit[u].slice().sort(() => Math.random() - 0.5);
  const units = Object.keys(byUnit).map(Number).sort();
  const out = [];
  const queues = {};
  units.forEach(u => { queues[u] = shuffled(u) });
  while (out.length < n) {
    let added = false;
    for (const u of units) {
      if (out.length >= n) break;
      if (queues[u].length) { out.push(queues[u].shift()); added = true }
    }
    if (!added) break;
  }
  return out;
}

/* الحصيلة: نسبة عامة، ومحاور، وتفصيل لكل مهارة. */
export function summarize(items, results) {
  const n = results.length || 1;
  const avg = k => Math.round(results.reduce((a, r) => a + r[k], 0) / n);
  const bySkill = {};
  items.forEach((it, i) => {
    const s = it.skill;
    bySkill[s] = bySkill[s] || {ok: 0, n: 0};
    bySkill[s].n++;
    bySkill[s].ok += results[i].score;
  });
  Object.keys(bySkill).forEach(s => {
    bySkill[s] = Math.round(bySkill[s].ok / bySkill[s].n);
  });
  return {
    percent: avg('score'),
    match: avg('match'),
    grammar: avg('grammar'),
    exact: results.filter(r => r.exact).length,
    total: n,
    bySkill
  };
}
