/* مخطّطُ المستوى الكامل: كلُّ وحدةٍ × كلُّ عنصرٍ فيها، المطلوبُ والموجودُ والناقص.

   ولماذا يُولَّد ولا يُكتَب يدوياً؟ لأنّ المكتوب يداً يكذب بعد أسبوع:
   يُضاف نصٌّ فلا يُحدَّث الجدول. وهذا يقرأ البنوكَ نفسها في كلّ مرّة. */
import {STANDARD} from '../content/standard.js';
import {UNITS, LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {READS} from '../content/read-texts.js';
import {WRITE} from '../content/write-tasks.js';
import {TRANSLATE} from '../content/translate.js';
import {SCENES} from '../content/scenes.js';
import {wordsOf, topicsOf} from '../content/words.js';

const lv = process.argv[2] || 'A1';
const spec = STANDARD[lv];
if (!spec) { console.error('لا مطلبَ مكتوباً للمستوى ' + lv); process.exit(1) }
const sk = spec.skills;
const units = UNITS.filter(u => (u.lv || 'A1') === lv).sort((a,b)=>a.n-b.n);

const lessonsOf = u => LESSONS.filter(l => l.u === u);
const lessonUnit = new Map(LESSONS.map(l => [l.id, l.u]));
const scenesOf = u => SCENES.filter(s => s.les && lessonUnit.get(s.les) === u);
/* حقل en في الترجمة يحوي البدائل المقبولة مفصولةً بفواصل، فعدُّ
   كلماته كلِّه يقيس البدائلَ لا الجملة. فيُقاس أوّلُها وحده. */
/* أوّلُ الصيغ المقبولة. ولا يُقطَع عند الفاصلة: جملةٌ فيها فاصلةٌ
   تُقاس نصفَ طولها، فتُحسَب داخلَ المدى وهي خارجه. */
const first = s => String(Array.isArray(s) ? s[0] : (s || ''));
const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
/* أطولُ جملةٍ في النصّ — وهي مقياسُ A1 الحقيقيّ. */
const maxSent = t => Math.max(0, ...String(t || '').split(/[.!?]+/)
  .flatMap(x => x.split(String.fromCharCode(10))).map(words));
const rng = a => a.length ? Math.min(...a) + '–' + Math.max(...a) : '—';
const ok = (v, min) => v >= min ? '✅' : '❌';
const outside = (vals, [lo, hi]) => vals.filter(v => v < lo || v > hi).length;
const verdict = (n, min, vals, range) => {
  if (n < min) return '❌ ' + 'عدداً';
  const bad = range ? outside(vals, range) : 0;
  return bad ? '⚠️ ' + bad + ' خارج المدى' : '✅';
};

const L = [];
L.push(`# مخطّط المستوى ${lv} الكامل`, '',
  `كلُّ وحدةٍ وكلُّ عنصرٍ فيها. المطلوبُ من المعيار، والموجودُ من البنوك، والناقصُ هو الفرق.`, '');

/* قالبُ الوحدة أوّلاً: ما هي العناصر أصلاً وبأيّ ترتيب. */
L.push('## قالبُ الوحدة — ثمانيةُ عناصرَ بترتيبها', '');
L.push('| # | العنصر | الخيط | المطلوب في ' + lv + ' |', '|---|---|---|---|');
spec.unitShape.forEach((st, i) => {
  const s = sk[st.k];
  let need = '—';
  if (st.k === 'lesson') need = 'تراكيبُ الوحدة من قائمة ' + lv;
  else if (st.k === 'gate') need = 'لا تُفتح إلّا بتمام ما قبلها';
  else if (s) {
    const bits = [s.n + ' ' + (st.k === 'read' ? 'نصّاً' : 'عنصراً')];
    if (s.words) bits.push(s.words[0] + '–' + s.words[1] + ' كلمة');
    if (s.turns) bits.push(s.turns[0] + '–' + s.turns[1] + ' دوراً');
    if (s.q) bits.push(s.q + ' أسئلة');
    if (s.kinds) bits.push('أنواع: ' + s.kinds.join('، '));
    need = bits.join(' · ');
  }
  L.push(`| ${i+1} | ${st.t} | ${st.strand} | ${need} |`);
});
L.push('');
L.push('**وصفُ الإطار لكلِّ مهارةٍ في ' + lv + ':**', '');
Object.entries(sk).forEach(([k, s]) => L.push(`- **${k}** — «${s.can}» → ${s.t}`));
L.push('');

/* ثمّ كلُّ وحدةٍ على حدة. */
L.push('## الوحدات واحدةً واحدة', '');
const todo = [];
for (const u of units) {
  const ls = lessonsOf(u.n);
  const rd = READS.filter(r => r.u === u.n);
  const wr = WRITE.filter(w => w.u === u.n);
  const tr = TRANSLATE.filter(t => t.u === u.n);
  const cv = CONVO.filter(c => c.u === u.n);
  const sc = scenesOf(u.n);
  const di = ls.flatMap(l => l.items.filter(i => i.k === 'listen'));

  L.push(`### الوحدة ${u.n} — ${u.t}`, '');
  L.push('| العنصر | المطلوب | الموجود | القياس | الحال |', '|---|---|---|---|---|');
  const wd = wordsOf(u.n), tp = topicsOf(u.n);
  L.push(`| المفردات | ${sk.words.n} كلمة · ${sk.words.topics.join('–')} حقول | ${wd.length} | ${tp.length} حقول: ${tp.map(g => g.t).join('، ')} | ${ok(wd.length, sk.words.n)} |`);
  /* وكانت ✅ مكتوبةً لا محسوبة: وحدةٌ دروسُها من غير تراكيب
     المستوى تُعلَن مخدومةً. فتُقاس بقواعدها هي. */
  const rules = new Set(ls.flatMap(l => l.rules || []));
  const mine = spec.grammar.filter(g => g.r && rules.has(g.r));
  L.push(`| الدروس | تراكيبُ المستوى | ${ls.length} | ${mine.length} من تراكيب ${lv}: ${mine.map(g=>g.t).join('، ') || '—'} | ${mine.length ? '✅' : '❌'} |`);
  L.push(`| القراءة | ${sk.read.n} نصّاً · جملةٌ ≤ ${sk.read.sent} كلمة | ${rd.length} | ${rng(rd.map(r=>words(r.text)))} كلمة · أطولُ جملة ${rng(rd.map(r=>maxSent(r.text)))} · ${rng(rd.map(r=>(r.qs||[]).length))} أسئلة | ${verdict(rd.length, sk.read.n, rd.map(r=>maxSent(r.text)), [1, sk.read.sent])} |`);
  L.push(`| الإملاء | ${sk.dict.n} جملة · ${sk.dict.words.join('–')} كلمة | ${di.length} | ${rng(di.map(d=>words(first(d.ok))))} كلمة | ${verdict(di.length, sk.dict.n, di.map(d=>words(first(d.ok))), sk.dict.words)} |`);
  const kinds = sk.write.kinds.map(k => k + ' ' + wr.filter(w=>w.k===k).length).join('، ');
  L.push(`| الكتابة | ${sk.write.n} مهمّة · كلُّ الأنواع | ${wr.length} | ${kinds} | ${ok(wr.length, sk.write.n) === '✅' && sk.write.kinds.every(k=>wr.some(w=>w.k===k)) ? '✅' : '❌'} |`);
  L.push(`| الترجمة | ${sk.tr.n} جملة · ${sk.tr.words.join('–')} كلمة | ${tr.length} | ${rng(tr.map(t=>words(first(t.en))))} كلمة | ${verdict(tr.length, sk.tr.n, tr.map(t=>words(first(t.en))), sk.tr.words)} |`);
  L.push(`| المحادثة | ${sk.convo.n} حوار · ${sk.convo.turns.join('–')} دوراً | ${cv.length} | ${rng(cv.map(c=>(c.turns||[]).length))} دوراً | ${verdict(cv.length, sk.convo.n, cv.map(c=>(c.turns||[]).length), sk.convo.turns)} |`);
  L.push(`| المشهد الحيّ | ${sk.scene.n} مشهد | ${sc.length} | ${sc.map(s=>s.t).join(' · ') || '—'} | ${ok(sc.length, sk.scene.n)} |`);
  L.push(`| البوابة | تُفتح بتمام ما قبلها | — | — | — |`, '');

  const need = [];
  if (rd.length < sk.read.n) need.push(`${sk.read.n - rd.length} نصَّ قراءة`);
  if (di.length < sk.dict.n) need.push(`${sk.dict.n - di.length} جملةَ إملاء`);
  if (wr.length < sk.write.n) need.push(`${sk.write.n - wr.length} مهمّةَ كتابة`);
  sk.write.kinds.filter(k => !wr.some(w=>w.k===k)).forEach(k => need.push(`نوعَ الكتابة «${k}»`));
  if (tr.length < sk.tr.n) need.push(`${sk.tr.n - tr.length} جملةَ ترجمة`);
  if (cv.length < sk.convo.n) need.push(`${sk.convo.n - cv.length} حواراً`);
  if (wd.length < sk.words.n) need.push(`${sk.words.n - wd.length} كلمة`);
  if (sc.length < sk.scene.n) need.push(`${sk.scene.n - sc.length} مشهداً`);
  [['read', rd.map(r=>words(r.text)), sk.read.words],
   ['dict', di.map(d=>words(first(d.ok))), sk.dict.words],
   ['tr',   tr.map(t=>words(first(t.en))), sk.tr.words],
   ['convo',cv.map(c=>(c.turns||[]).length), sk.convo.turns]]
    .map(([k, vals, r]) => [k, outside(vals, r), r])
    .filter(([, n]) => n)
    .forEach(([k, n, r]) => need.push(n + ' ' + k + ' خارج ' + r.join('–')));
  if (need.length) { todo.push([u.n, need]); L.push('**الناقص:** ' + need.join(' · '), '') }
  else L.push('**مخدومةٌ بكلّ عناصرها.** ✅', '');
}

L.push('## ما يُبنى — قائمةُ العمل', '');
if (!todo.length) L.push('لا شيء. المستوى تامٌّ في عناصره.');
else { L.push('| وحدة | ما يُبنى |', '|---|---|'); todo.forEach(([n, need]) => L.push(`| ${n} | ${need.join(' · ')} |`)) }
console.log(L.join('\n'));
