/* هل محتوى المستوى داخلَ مستواه؟

   التركيبُ قد يُدرَّس في موضعه الصحيح ثمّ يتسرّب إلى جملةٍ حاملةٍ في
   مستوًى أدنى: درسُ الملكيّة في A1 يسأل «Have you seen ___ bag?»،
   فالمقصودُ your وهو A1، لكنّ الجملةَ حاضرٌ تامٌّ وهو B1. والمتعلّم
   يقرأ الجملة كلَّها لا الفراغَ وحده.

   وهذا ما لا يجده مدقّقُ التراكيب: هو يسأل «أنُعلّم هذا؟» لا «أنستعمل
   ما لم نُعلّمه بعد؟». فهما سؤالان، ولكلٍّ أداتُه.

   يُقاس المحتوى كلُّه — دروساً ونصوصاً وكتابةً وترجمةً وحواراً — لا
   الدروسَ وحدها، فالتسرّبُ في النصّ كالتسرّب في التمرين. */
import {UNITS, LESSONS} from '../content/lessons.js';
import {READS} from '../content/read-texts.js';
import {WRITE} from '../content/write-tasks.js';
import {TRANSLATE} from '../content/translate.js';
import {CONVO} from '../content/convo.js';

const PP = 'been|seen|gone|done|made|taken|given|written|eaten|finished|started'
  + '|lived|worked|visited|bought|come|read|had|left|met|paid|put|said|sent|told';

/* لكلّ تركيبٍ أعلى: نمطُه، وأدنى مستوًى يصحّ فيه. */
export const ABOVE = [
  {t: 'الحاضر التامّ', lv: 'B1',
   re: new RegExp(`\\b(have|has|haven't|hasn't|have not|has not)\\s+(?:\\w+\\s+)?(?:${PP})\\b`, 'i')},
  {t: 'المستقبل will', lv: 'A2', re: /\b(will|won't|will not)\s+\w+/i},
  {t: 'going to', lv: 'A2', re: /\bgoing to\s+\w+/i},
  {t: 'الماضي البسيط', lv: 'A2',
   re: /\b(was|were|went|did|saw|took|came|gave|made|bought|ate)\b/i},
  {t: 'الشرط', lv: 'B1', re: /\bif\b[^.?!]*\b(will|would|'d)\b/i},
  {t: 'المبنيّ للمجهول', lv: 'B1', re: /\b(is|are|was|were)\s+(?:\w+\s+)?\w+ed\s+by\b/i},
  {t: 'الكلام المنقول', lv: 'B1', re: /\b(said|told)\s+(?:\w+\s+)?that\b/i}
];

const ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const rank = lv => ORDER.indexOf(lv);

/* كلُّ نصٍّ إنجليزيٍّ في المستوى، مع موضعه ليُعرَف أين يُصلَح. */
function texts(lv) {
  const units = UNITS.filter(u => (u.lv || 'A1') === lv).map(u => u.n);
  const out = [];
  const add = (where, s) => { if (s) out.push([where, String(s)]) };

  LESSONS.filter(l => units.includes(l.u)).forEach(l => {
    (l.s || []).forEach(x => add('الدرس ' + l.id, x));
    l.items.forEach(i => {
      add('الدرس ' + l.id, i.q);
      (i.o || []).forEach(o => add('الدرس ' + l.id, o));
      (Array.isArray(i.ok) ? i.ok : [i.ok]).forEach(o => add('الدرس ' + l.id, o));
    });
  });
  READS.filter(r => units.includes(r.u)).forEach(r => add('نصّ ' + r.id, r.text));
  WRITE.filter(x => units.includes(x.u))
    .forEach(x => (x.ok || []).forEach(o => add('كتابة و' + x.u, o)));
  /* الجملةُ كاملةً لا مقطوعةً عند أوّل فاصلة: التسرّبُ يقع بعد
     الفاصلة غالباً — «I am here, and I went home yesterday» — فكان
     الحارسُ يراها «I am here» ويَخضرّ. */
  TRANSLATE.filter(x => units.includes(x.u))
    .forEach(x => add('ترجمة و' + x.u, Array.isArray(x.en) ? x.en[0] : String(x.en)));
  CONVO.filter(c => units.includes(c.u)).forEach(c => c.turns.forEach(t => {
    add('حوار ' + c.id, t.p);
    (t.o || []).forEach(o => add('حوار ' + c.id, o));
  }));
  return out;
}

/* ما تسرّب: تركيبٌ مستواه أعلى من المستوى المفحوص.

   والخياراتُ الخاطئةُ تُفحَص كما تُفحَص الصحيحة: المتعلّم يقرؤها
   كلَّها، فلا فرق بينها في التعريض. */
export function leaks(lv) {
  const out = [];
  texts(lv).forEach(([where, s]) => ABOVE.forEach(a => {
    if (rank(a.lv) > rank(lv) && a.re.test(s))
      out.push({where, t: a.t, lv: a.lv, s: s.trim().slice(0, 70)});
  }));
  return out;
}

if (process.argv[1] && process.argv[1].endsWith('level-fit.mjs')) {
  const lv = process.argv[2] || 'A1';
  const found = leaks(lv);
  console.log(`# تراكيبُ فوق ${lv} في محتوى ${lv}`);
  if (!found.length) { console.log('✅ لا تسرّب.') }
  else {
    const by = {};
    found.forEach(f => (by[f.t] = by[f.t] || []).push(f));
    Object.entries(by).forEach(([t, list]) => {
      console.log(`\n## ${t} (${list[0].lv}) — ${list.length} موضعاً`);
      list.slice(0, 8).forEach(f => console.log(`  ${f.where} | ${f.s}`));
      if (list.length > 8) console.log(`  … و${list.length - 8} غيرها`);
    });
  }
}
