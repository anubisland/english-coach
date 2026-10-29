/* مدقّقُ المستوى: يضمّ محتوانا إلى مطلبه فيقول ما ينقص — برقم.

   يقرأ المطلبَ من content/standard.js والمحتوى من بنوكه، ولا يحكم
   من عنده شيئاً. فما يقوله هنا هو ما يُبنى عليه الإكمال. */
import {STANDARD} from '../content/standard.js';
import {wordsUpTo} from '../content/words.js';
import {UNITS, LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {READS} from '../content/read-texts.js';
import {WRITE} from '../content/write-tasks.js';
import {TRANSLATE} from '../content/translate.js';
import {SCENES} from '../content/scenes.js';


const lv = process.argv[2] || 'A1';
const spec = STANDARD[lv];
if (!spec) { console.error('لا مطلبَ مكتوباً للمستوى ' + lv); process.exit(1) }

const units = UNITS.filter(u => (u.lv || 'A1') === lv).map(u => u.n).sort((a,b)=>a-b);
const lessonsOf = u => LESSONS.filter(l => l.u === u);
const titles = units.flatMap(u => lessonsOf(u).map(l => ({u, t: l.t, id: l.id, rules: l.rules})));

/* ١) التراكيب على ثلاث درجات، والفرق بينها ليس لفظياً:
     مُعلَّم  — له درسٌ باسمه يشرحه.
     عارضٌ   — يرد في التمارين بلا شرحٍ ولا تدريبٍ مقصود، فالمتعلّم
               يمرّ به ولا يملكه. وهذا أخطرُ من الغياب، لأنّه يُحسَب
               تغطيةً وليس بتغطية.
     غائب    — لا أثرَ له البتّة. */
/* الدليلُ من الصواب وحده.

   وكان body هو JSON كلِّ تمرينٍ بأكمله — فيه الخياراتُ الفاسدة
   المقصودُ فسادُها، وفيه الشرحُ العربيّ. فتُعَدّ «عارضاً» بنيةٌ لم
   ترد إلّا في خيارٍ كُتب ليُتجنَّب. */
const body = units.flatMap(u => lessonsOf(u).flatMap(l =>
  (l.s || []).concat(l.items.flatMap(i => [
    i.k === 'correct' ? '' : i.q,
    Array.isArray(i.o) && typeof i.a === 'number' ? i.o[i.a] : '',
    ...(Array.isArray(i.ok) ? i.ok : [i.ok || ''])
  ]))
)).join(' ').toLowerCase();

const taught = [], passing = [], missing = [], moved = [];
for (const g of spec.grammar) {
  /* بمعرّف القاعدة وحده: ربطٌ صريحٌ لا يُخطئ. وكان يُقبَل أن يحوي
     **عنوانُ** درسٍ كلمةً من look — وهو ظنٌّ في الاتّجاه الذي
     يُرضينا، والتقريرُ يُقدَّم على أنّه «رقمٌ يُراجَع لا انطباع». */
  const hit = g.r && titles.find(x => (x.rules || []).includes(g.r));
  if (hit) { taught.push({...g, at: hit.id}); continue }
  if (g.defer) { moved.push(g); continue }
  const seen = (g.ex || []).filter(e => body.includes(e));
  (seen.length ? passing : missing).push({...g, seen});
}

/* ٣) التقرير. */
/* بنكُ المفردات لهذا المستوى — اليومَ A1 وحده مبنيٌّ بنكُه. */
/* بالمداخل لا بالهجاء: الهدفُ في الـEVP **معانٍ**، وwatch ساعةً
   وwatch فعلاً معنيان. وكان يُعَدّ بالهجاء فيقول التقريرُ ٤٩٣
   والشاشةُ ٥٠٢ — عددان لشيءٍ واحد، وأحدُهما يقابل غيرَ هدفه. */
const bankWords = wordsUpTo(lv).length;

const L = [];
L.push(`# تقرير تدقيق المستوى ${lv}`, '');
L.push(`الوحدات: ${units.join('، ')} — ${units.length} وحدات.`, '');

L.push(`## التراكيب — مُعلَّمٌ ${taught.length} من ${spec.grammar.length}`, '');
L.push('| التركيب | الحال |', '|---|---|');
taught.forEach(g => L.push(`| ${g.t} | ✅ الدرس ${g.at} |`));
passing.forEach(g => L.push(`| ${g.t} | ⚠️ **عارضٌ بلا درس** (${g.seen.length} شاهداً) |`));
moved.forEach(g => L.push(`| ${g.t} | ↪️ مؤجَّلٌ إلى ${g.defer} بقرارٍ مُسنَد |`));
missing.forEach(g => L.push(`| ${g.t} | ❌ **غائبٌ تماماً** |`));
L.push('');

L.push('## الخلاصة', '',
  `- تراكيبُ مُعلَّمة: **${taught.length}** من ${spec.grammar.length}.`,
  `- تراكيبُ عارضةٌ بلا درس: **${passing.length}** — تُحسَب تغطيةً وليست بتغطية.`,
  `- تراكيبُ غائبةٌ تماماً: **${missing.length}**.`,
  `- مؤجَّلةٌ بقرارٍ مُسنَد: **${moved.length}**.`,
  `- المفردات: **${bankWords}** معنًى في بنك المستوى من هدف ${spec.vocab.target}`
  + ` — التغطية **${Math.round(bankWords / spec.vocab.target * 100)}٪**.`);

console.log(L.join('\n'));
