/* خريطة المنهج كما تُعرض للمتعلّم.

   تُطابق ROADMAP.md، وتُحدَّث معه. وسببُ وجودها على الشاشة لا في
   التقارير وحدها: أنّ التقارير المتفرّقة أخفت الصورة الكاملة، فظُنّ
   أنّ البناء في ستّة مستويات وهو في نصف المستوى الأول. فالخريطة
   تُعرض الآن، ويرى المتعلّم موقعه من السلّم كلّه لا من درسه وحده. */

import {UNITS, LESSONS} from './lessons.js';

export const LEVELS = [
  {id:'A1', t:'مبتدئ',
   d:'يعرّف بنفسه، ويسأل أسئلة بسيطة، ويتكلّم عن يومه، ويطلب في مطعم.'},
  {id:'A2', t:'مبتدئ متقدّم',
   d:'يتكلّم عن الماضي والمستقبل، ويقارن، ويصل الجمل بـ because و when.'},
  {id:'B1', t:'متوسّط',
   d:'يتابع حديثاً عادياً، ويشرح رأيه، ويكتب رسالة مترابطة.'},
  {id:'B2', t:'متوسّط متقدّم',
   d:'يناقش ويجادل، ويفهم نصّاً طويلاً في تخصّصه.'},
  {id:'C1', t:'متقدّم', d:'يتكلّم بطلاقة في العمل والدراسة.'},
  {id:'C2', t:'إتقان', d:'قريب من المتحدّث الأصلي.'}
];

/* مراحلُ البناء — ووحداتُها ودروسُها **تُشتقّ من المحتوى**.

   وكانت مكتوبةً يداً بعناوينَ خاصّةٍ بها، فكلُّ درسٍ يُضاف يلزمه
   تعديلٌ هنا وإلّا تخلّفت الخريطةُ عن البرنامج: تدّعي ما ليس فيه
   وتُسقط ما فيه. وهي علّةُ قوائم السماح نفسُها — حقيقةٌ واحدةٌ
   مكتوبةٌ في موضعين تفترقان، فتصدق إحداهما ويكذب الآخر.

   فبقي هنا ما لا يُشتقّ: تقسيمُ A1 إلى مرحلتين، وعنوانُ كلّ
   مرحلة. وما عداه من lessons.js. */
const PLAN = [
  {id:'a1-core', t:'أساسيات A1', level:'A1', units:[1,2,3]},
  {id:'a1-rest', t:'إكمال A1',   level:'A1', units:[4,5]},
  {id:'a2', t:'المستوى A2', level:'A2', units:[6,7,8,9]},
  {id:'b1', t:'المستوى B1', level:'B1', units:[10,11,12,13,14]},
  {id:'b2', t:'المستوى B2', level:'B2', units:[15,16,17,18,19]},
  {id:'c1', t:'المستوى C1', level:'C1', units:[20,21,22]},
  {id:'c2', t:'المستوى C2', level:'C2', units:[23,24]}
];

const unitTitle = n => (UNITS.find(u => u.n === n) || {}).t || ('الوحدة ' + n);

export const STAGES = PLAN.map(p => ({
  id: p.id, t: p.t, level: p.level, state: 'done',
  units: p.units.map(n => ({
    n, t: unitTitle(n),
    lessons: LESSONS.filter(l => l.u === n).map(l => ({id: l.id, t: l.t, state: 'done'}))
  }))
}));

function stateOf(lessons) {
  if (!lessons.length) return 'todo';
  const done = lessons.filter(l => l.state === 'done').length;
  return done === lessons.length ? 'done' : done ? 'doing' : 'todo';
}

STAGES.forEach(st => {
  st.state = stateOf(st.units.flatMap(u => u.lessons));
});
LEVELS.forEach(lv => {
  lv.state = stateOf(STAGES.filter(st => st.level === lv.id)
    .flatMap(st => st.units).flatMap(u => u.lessons));
});

export function roadmapCounts() {
  let done = 0, total = 0;
  STAGES.forEach(s => s.units.forEach(u => u.lessons.forEach(l => {
    total++; if (l.state === 'done') done++;
  })));
  return {done, total};
}
