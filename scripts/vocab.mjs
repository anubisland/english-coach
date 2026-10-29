/* عمودُ المفردات: يستخرج ما يستعمله مستوًى من كلماتٍ ويقيسه بهدفه.

   ولماذا يُستخرج ولا يُكتب يداً؟ لأنّ قائمةً مكتوبةً يداً تنفصل عن
   المحتوى بعد أوّل تعديل: يُضاف درسٌ فيه كلماتٌ جديدة ولا تُضاف إلى
   القائمة، فيقول البرنامج «تعرف ٥٦٨» وهي ستّمئة. وهذا يقرأ البنوك
   نفسها في كلّ مرّة.

   والعتبةُ: ما ورد ثلاثاً فأكثر يُعَدّ مقصوداً، وما ورد مرّةً أو
   مرّتين فعَرَضٌ لا تعليم. والثلاثُ اختيارُنا نحن لا رقمٌ من بحثٍ —
   وNation يذكر للاكتساب العارض ثمانيةً إلى عشرٍ، لكنّ كلمةً تُشرَح
   في درسٍ وتُعاد في تمرينٍ وإملاءٍ أقربُ إلى التعليم المقصود منها
   إلى العارض. فالعتبةُ معلنةٌ هنا ليُحاجَّ فيها، لا مخفيّة. */
import fs from 'fs';
import {STANDARD} from '../content/standard.js';
import {wordsUpTo} from '../content/words.js';
import {UNITS, LESSONS} from '../content/lessons.js';
import {READS} from '../content/read-texts.js';
import {WRITE} from '../content/write-tasks.js';
import {TRANSLATE} from '../content/translate.js';
import {CONVO} from '../content/convo.js';
import {SCENES} from '../content/scenes.js';

export const CORE_MIN = 3;

/* كلُّ نصٍّ إنجليزيٍّ في وحدةٍ ما، مقروناً بوحدته. */
function sources(units) {
  const out = [];
  const push = (u, s) => { if (s) out.push([u, String(s)]) };
  const lessonUnit = new Map(LESSONS.map(l => [l.id, l.u]));

  /* الصوابُ وحده يُعَدّ مفردةً.

     والخيارُ الفاسد مقصودُ الفساد: bigs وbookes وchilds وputing
     كلُّها في البنك، وعدُّها «مفرداتٍ تعلّمها المتعلّم» يرفع الرقم
     بما يَضرّ — فيُقال «تعرف خمسمئة كلمة» ومئةٌ منها أغلاطٌ كُتبت
     ليتجنّبها. وسؤالُ التصحيح كذلك: متنُه هو الجملةُ الخاطئة. */
  LESSONS.filter(l => units.includes(l.u)).forEach(l => {
    (l.s || []).forEach(x => push(l.u, x));
    l.items.forEach(i => {
      if (i.k !== 'correct') push(l.u, i.q);
      if (Array.isArray(i.o) && typeof i.a === 'number') push(l.u, i.o[i.a]);
      (Array.isArray(i.ok) ? i.ok : [i.ok]).forEach(o => push(l.u, o));
      (i.w || []).forEach(o => push(l.u, o));
    });
  });
  READS.filter(r => units.includes(r.u)).forEach(r => {
    push(r.u, r.text);
    (r.qs || []).forEach(q => push(r.u, q.q));
  });
  WRITE.filter(x => units.includes(x.u)).forEach(x => {
    (x.ok || []).forEach(o => push(x.u, o));
    (x.w || []).forEach(o => push(x.u, o));
  });
  /* en مصفوفةُ صيغٍ مقبولة. وString(arr).split(',')[0] كان يأخذ
     أوّلَها ظاهراً، لكنّه يقطع كذلك عند أيّ فاصلةٍ **داخل** الجملة:
     «Close the door, please.» تصير «Close the door». */
  TRANSLATE.filter(x => units.includes(x.u))
    .forEach(x => push(x.u, Array.isArray(x.en) ? x.en[0] : String(x.en)));
  CONVO.filter(c => units.includes(c.u)).forEach(c => c.turns.forEach(t => {
    push(c.u, t.p);
    if (Array.isArray(t.o) && typeof t.a === 'number') push(c.u, t.o[t.a]);
  }));
  SCENES.filter(s => s.les && units.includes(lessonUnit.get(s.les)))
    .forEach(s => (s.turns || []).forEach(t => push(lessonUnit.get(s.les), t.p || t)));
  return out;
}

/* أسماءُ الأعلام ليست مفردات: من عرف Mahmoud لم يعرف كلمةً من
   الإنجليزيّة. وهي تُعرَف بأنّها تأتي في المتن دائماً بحرفٍ كبير،
   فيُجمَع ما كان كذلك ويُستبعَد — ولا تُكتب قائمةً يدويّةً تنسى
   الاسمَ الجديد. */
function properNouns(texts) {
  /* الدليلُ الوحيد المعتمَد: حرفٌ كبيرٌ **وسطَ** الجملة.

     ولا يُنقَض بظهورها صغيرةً في موضعٍ آخر: أسماءُ الأعلام تَرِد
     صغيرةً في مصفوفات الإجابات المقبولة (ok:['sara']) لأنّ التصحيح
     لا يبالي بالحرف — فكان sara وahmed يُبرَّآن بذلك ويَدخلان بنك
     المفردات. والكلمةُ العاديّة لا تُكتب كبيرةً وسطَ الجملة أصلاً.

     والعناوينُ بالحروف الكبيرة كلِّها (TRAIN STATION) ليست دليلاً،
     فيُشترط أن يكون أوّلُها كبيراً وبقيّتُها صغيرة. */
  const mid = new Set();
  texts.forEach(s => {
    /* أوّلُ الجملة يُكتب كبيراً لزاماً، فلا يدلّ. فتُحذف بدايةُ كلّ جملة. */
    s.split(/(?<=[.!?\n])\s+/).forEach(part => {
      const ws = part.trim().split(/\s+/);
      ws.forEach((w, i) => {
        const bare = w.replace(/[^A-Za-z']/g, '');
        if (bare.length < 2) return;
        const k = bare.toLowerCase();
        /* أوّلُ الجملة يُكتب كبيراً لزاماً فلا يدلّ. */
        if (i === 0) return;
        if (/^[A-Z][a-z]/.test(bare)) mid.add(k);
      });
    });
  });
  return mid;
}

/* الكلمة: حروفٌ لاتينيّةٌ وما يتّصل بها من فاصلةٍ عليا. */
const tokens = s => s.toLowerCase().replace(/[^a-z' ]+/g, ' ')
  .split(/\s+/).filter(w => w.length > 1 && !w.startsWith("'"));

/* سلّمُ المستويات — والقياسُ تراكميٌّ لأنّ الهدفَ تراكميّ.

   وكان يُقاس محتوى المستوى وحده ويُقارَن بهدفٍ يشمل ما قبله، فقيل
   «A2 تغطيتُه ٢٠٪» وهو يشمل A1 كلَّه. والخطأُ هنا في الاتّجاه الذي
   يَضرّنا، وهو خطأٌ على كلّ حال: المقياسُ يجب أن يقابل هدفَه. */
const LADDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function lexicon(lv) {
  const upto = LADDER.indexOf(lv);
  const units = UNITS
    .filter(u => LADDER.indexOf(u.lv || 'A1') <= upto)
    .map(u => u.n);
  const src = sources(units);
  const names = properNouns(src.map(([, s]) => s));
  const seen = new Map();   // الكلمة → {n: مرّاتها, u: أوّل وحدةٍ وردت فيها}
  src.forEach(([u, s]) => tokens(s).forEach(w => {
    if (names.has(w)) return;
    const e = seen.get(w);
    if (e) { e.n++; if (u < e.u) e.u = u }
    else seen.set(w, {n: 1, u});
  }));
  return [...seen.entries()].map(([w, e]) => ({w, n: e.n, u: e.u}))
    .sort((a, b) => a.u - b.u || b.n - a.n || a.w.localeCompare(b.w));
}

/* ردُّ الصيغة إلى أصلها إن كان الأصلُ في المحتوى نفسه.

   وهدفُ المستوى معانٍ لا صيغ (standard.js يقول ذلك صراحةً)، فعدُّ
   work وworks وworking ثلاثاً ومقارنتُها بستّمئة معنًى يرفع الرقم
   زوراً — في الاتّجاه الذي يُرضينا. والردُّ هنا محافظ: لا يُرَدّ إلى
   أصلٍ إلّا إن كان الأصلُ نفسُه مستعمَلاً في المحتوى، فلا يُختلَق. */
const SUFFIX = [
  [/ies$/, 'y'], [/([sxz]|ch|sh)es$/, '$1'], [/s$/, ''],
  [/ing$/, ''], [/ing$/, 'e'], [/ed$/, ''], [/ed$/, 'e'],
  [/ier$/, 'y'], [/iest$/, 'y'], [/est$/, ''], [/er$/, '']
];

/* أزواجٌ شاذّةٌ لا تبلغها قاعدةٌ لفظيّة. */
const IRREGULAR = {
  is: 'be', are: 'be', am: 'be', was: 'be', were: 'be',
  has: 'have', does: 'do', goes: 'go',
  these: 'this', those: 'that', men: 'man', women: 'woman',
  children: 'child', teeth: 'tooth', feet: 'foot',
  him: 'he', his: 'he', her: 'she', hers: 'she', them: 'they',
  their: 'they', theirs: 'they', us: 'we', our: 'we', ours: 'we',
  me: 'i', my: 'i', mine: 'i', your: 'you', yours: 'you', its: 'it'
};

export function lemmaOf(w, forms) {
  if (IRREGULAR[w] && forms.has(IRREGULAR[w])) return IRREGULAR[w];
  for (const [re, rep] of SUFFIX) {
    if (!re.test(w)) continue;
    const c = w.replace(re, rep);
    if (c.length > 2 && c !== w && forms.has(c)) return c;
  }
  /* المضاعف: stopped → stop · running → run */
  const d = w.replace(/([bcdfglmnprstz])\1(ing|ed)$/, '$1');
  return (d !== w && forms.has(d)) ? d : w;
}

export function lemmas(list) {
  const forms = new Set(list.map(x => x.w));
  return new Set(list.map(x => lemmaOf(x.w, forms)));
}

/* ما يُكتب للبرنامج: الكلمةُ ووحدتُها ومرّاتُها، ليُقال للمتعلّم
   «بلغتَ كذا من كذا» برقمٍ مشتقٍّ من المحتوى لا مكتوبٍ على عجل. */
export function writeBank(lv, list) {
  const core = list.filter(x => x.n >= CORE_MIN);
  /* JSON.stringify لا التنصيص اليدويّ: كلماتٌ كـ don't فيها فاصلةٌ
     عليا تكسر النصّ إن نُصّصت بالفاصلة نفسها. */
  const body = core.map(x => `{w:${JSON.stringify(x.w)},u:${x.u},n:${x.n}}`);
  const out = `/* مفرداتُ ${lv} — مولَّدٌ بـ scripts/vocab.mjs، لا يُحرَّر يداً.

   الكلمةُ هنا ما ورد في محتوى المستوى ${CORE_MIN} مرّاتٍ فأكثر، فهو
   مقصودٌ لا عارض. وw الكلمة، وu أوّلُ وحدةٍ وردت فيها، وn مرّاتُها. */

export const VOCAB_${lv} = [
  ${body.join(',\n  ')}
];

export const VOCAB_${lv}_TARGET = ${STANDARD[lv].vocab.target};
`;
  fs.writeFileSync(`content/vocab-${lv.toLowerCase()}.js`, out);
  return core.length;
}

/* لا يُنفَّذ سطرُ الأمر عند الاستيراد: الاختباراتُ تستورد هذا
   الملفّ، فكان يطبع تقريره وسطها — وأخطرُ منه أنّ --write في argv
   كان يُعيد توليد البنك من داخل الاختبار فيُخضِرّ حارسَه زوراً.
   وlevel-fit.mjs تحترس بهذا الشرط نفسه. */
if (process.argv[1] && process.argv[1].endsWith('vocab.mjs')) main();

function main() {
const lv = process.argv[2] || 'A1';
const list = lexicon(lv);
const core = list.filter(x => x.n >= CORE_MIN);
const once = list.filter(x => x.n === 1);
const target = STANDARD[lv].vocab.target;
const bankCount = wordsUpTo(lv).length;

if (process.argv.includes('--write')) {
  const n = writeBank(lv, list);
  console.log(`كُتب content/vocab-${lv.toLowerCase()}.js — ${n} كلمة`);
}

/* عددان لا واحد، ولكلٍّ معناه — وخلطُهما هو ما يصنع الرقمَ الكاذب:

   · **البنك**: ما تُعلّمه محطّةُ المفردات قصداً، في حقولٍ موضوعيّة.
     وهو ما يُقال للمتعلّم على الشاشة.
   · **المحتوى**: ما وقع في جمل التمارين والنصوص اتّفاقاً. وهو مقياسٌ
     لنا نحن: كم من الكلام يُعيد المفرداتِ فيُثبّتها.

   والأوّلُ أكبرُ دائماً، فمن أخذه وسمّاه «المحتوى» ضخّم. */
console.log(`# مفرداتُ ${lv}`);
console.log('');
console.log(`**البنك المنهجيّ** (ما تُعلّمه محطّةُ المفردات): **${bankCount}** معنًى`
  + ` من هدف ${target} — **${Math.round(bankCount / target * 100)}٪**.`);
console.log('');
console.log('**ما يُعيده المحتوى** (جملُ التمارين والنصوص):');
console.log(`- كلماتٌ مختلفة في المحتوى: **${list.length}**`);
console.log(`- منها مقصودةٌ (${CORE_MIN}+ مرّات): **${core.length}**`);
console.log(`- عارضةٌ (مرّةً واحدة): **${once.length}** — تُرى ولا تُملَك`);
const lem = lemmas(core);
/* النسبةُ بالأصول لا بالصيغ: الهدفُ معانٍ، والصيغُ تضخّمه. */
console.log(`- أصولٌ مختلفة بينها: **${lem.size}**`);
console.log(`- الهدف: ${target} أصلاً → التغطية **${Math.round(lem.size / target * 100)}٪**`);
const perU = {};
core.forEach(x => perU[x.u] = (perU[x.u] || 0) + 1);
console.log(`- جديدٌ في كلّ وحدة: ` +
  Object.keys(perU).sort((a,b)=>a-b).map(u => `و${u}: ${perU[u]}`).join(' · '));
}
