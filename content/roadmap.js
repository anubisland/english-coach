/* خريطة المنهج كما تُعرض للمتعلّم.

   تُطابق ROADMAP.md، وتُحدَّث معه. وسببُ وجودها على الشاشة لا في
   التقارير وحدها: أنّ التقارير المتفرّقة أخفت الصورة الكاملة، فظُنّ
   أنّ البناء في ستّة مستويات وهو في نصف المستوى الأول. فالخريطة
   تُعرض الآن، ويرى المتعلّم موقعه من السلّم كلّه لا من درسه وحده. */

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

/* مراحل البناء، بحالة كل درس. «done» يعني موجوداً في البرنامج الآن. */
export const STAGES = [
  {id:'a1-core', t:'أساسيات A1', level:'A1', state:'done', units:[
    {n:1, t:'فعل الكينونة', lessons:[
      {id:'1.1', t:'I am / You are', state:'done'},
      {id:'1.2', t:'He / She / It is', state:'done'},
      {id:'1.3', t:'أسئلة مع is / are', state:'done'}]},
    {n:2, t:'المضارع البسيط', lessons:[
      {id:'2.1', t:'المضارع مع I / you / we / they', state:'done'},
      {id:'2.2', t:'he / she / it + s', state:'done'},
      {id:'2.3', t:'النفي مع do / does', state:'done'}]},
    {n:3, t:'الأدوات والوجود', lessons:[
      {id:'3.1', t:'a / an', state:'done'},
      {id:'3.2', t:'the', state:'done'},
      {id:'3.3', t:'There is / There are', state:'done'}]}
  ]},

  {id:'a1-rest', t:'إكمال A1', level:'A1', state:'done', units:[
    {n:4, t:'الأشياء والناس من حولي', lessons:[
      {id:'4.1', t:'الجمع: book → books', state:'done'},
      {id:'4.2', t:'الملكية: my / your وصيغة ’s', state:'done'},
      {id:'4.3', t:'this / that / these / those', state:'done'},
      {id:'4.4', t:'have got للملكية', state:'done'}]},
    {n:5, t:'الفعل والزمن والقدرة', lessons:[
      {id:'5.1', t:'can / can’t', state:'done'},
      {id:'5.2', t:'الأمر والنهي', state:'done'},
      {id:'5.3', t:'المضارع المستمرّ', state:'done'},
      {id:'5.4', t:'الأرقام والوقت والتواريخ', state:'done'}]}
  ]},

  {id:'a2', t:'المستوى A2', level:'A2', units:[
    {n:6, t:'الماضي', lessons:[
      {id:'6.1', t:'was / were', state:'done'},
      {id:'6.2', t:'الأفعال المنتظمة في الماضي', state:'done'},
      {id:'6.3', t:'الأفعال غير المنتظمة', state:'done'}]},
    {n:7, t:'المستقبل', lessons:[
      {id:'7.1', t:'going to', state:'done'},
      {id:'7.2', t:'will', state:'done'}]},
    {n:8, t:'المقارنة', lessons:[
      {id:'8.1', t:'bigger / the biggest', state:'done'},
      {id:'8.2', t:'as … as والمقارنة غير المنتظمة', state:'done'}]},
    {n:9, t:'الكمّ والربط', lessons:[
      {id:'9.1', t:'some / any / much / many', state:'done'},
      {id:'9.2', t:'because / when / so', state:'done'}]}
  ]},

  {id:'b1', t:'المستوى B1', level:'B1', units:[
    {n:10, t:'الحاضر التامّ', lessons:[
      {id:'10.1', t:'have / has + التصريف الثالث', state:'done'},
      {id:'10.2', t:'ever وnever وjust وyet', state:'done'},
      {id:'10.3', t:'since وfor', state:'done'}]},
    {n:11, t:'الماضي المستمرّ والسرد', lessons:[
      {id:'11.1', t:'was / were + ing', state:'done'},
      {id:'11.2', t:'while وwhen في السرد', state:'done'}]},
    {n:12, t:'الشرط', lessons:[
      {id:'12.1', t:'الشرط الأوّل: if + مضارع → will', state:'done'},
      {id:'12.2', t:'الشرط الثاني: if + ماضٍ → would', state:'done'}]},
    {n:13, t:'الأفعال الناقصة الموسّعة', lessons:[
      {id:'13.1', t:'should وmust وhave to', state:'done'},
      {id:'13.2', t:'may وmight وcould للاحتمال', state:'done'}]},
    {n:14, t:'المبنيّ للمجهول وجملة الوصل', lessons:[
      {id:'14.1', t:'is / was + التصريف الثالث', state:'done'},
      {id:'14.2', t:'who وwhich وthat', state:'done'}]}
  ]},

  {id:'b2', t:'المستوى B2', level:'B2', units:[
    {n:15, t:'الأزمنة التامّة الموسّعة', lessons:[
      {id:'15.1', t:'الماضي التامّ: had + التصريف الثالث', state:'done'},
      {id:'15.2', t:'الحاضر التامّ المستمرّ', state:'done'}]},
    {n:16, t:'الكلام المنقول', lessons:[
      {id:'16.1', t:'said و told وتغيّر الزمن', state:'done'},
      {id:'16.2', t:'نقل السؤال والأمر', state:'done'}]},
    {n:17, t:'الشرط الثالث والتمنّي', lessons:[
      {id:'17.1', t:'الشرط الثالث: لو كان قد…', state:'done'},
      {id:'17.2', t:'wish و if only', state:'done'}]},
    {n:18, t:'المصدر والـ ing', lessons:[
      {id:'18.1', t:'متى to + الفعل ومتى الـ ing', state:'done'},
      {id:'18.2', t:'أفعالٌ يتغيّر معناها بينهما', state:'done'}]},
    {n:19, t:'الربط المتقدّم والأسلوب', lessons:[
      {id:'19.1', t:'although و however و despite', state:'done'},
      {id:'19.2', t:'ترتيب الصفات والظروف', state:'done'}]}
  ]},

  {id:'c1', t:'المستوى C1', level:'C1', units:[
    {n:20, t:'التركيب المعقّد', lessons:[
      {id:'20.1', t:'الجملة المقلوبة للتأكيد', state:'done'},
      {id:'20.2', t:'الصيغة المُجزَأة: It is … that', state:'done'}]},
    {n:21, t:'الأسلوب والسجلّ', lessons:[
      {id:'21.1', t:'الرسميّ والعاميّ: متى هذا ومتى ذاك', state:'done'},
      {id:'21.2', t:'التلطيف والتحفّظ في الرأي', state:'done'}]},
    {n:22, t:'المصاحبات والتعابير', lessons:[
      {id:'22.1', t:'ما يصاحب الكلمةَ من الكلمات', state:'done'},
      {id:'22.2', t:'الأفعال المركّبة الشائعة', state:'done'}]}
  ]},

  {id:'c2', t:'المستوى C2', level:'C2', units:[
    {n:23, t:'الدقّة والإيجاز', lessons:[
      {id:'23.1', t:'اختيار الكلمة الأدقّ بين المترادفات', state:'done'},
      {id:'23.2', t:'الإيجاز: حذف ما لا يفيد', state:'done'}]},
    {n:24, t:'النصّ الطويل', lessons:[
      {id:'24.1', t:'بناء الحجّة في فقرات', state:'done'}]}
  ]}
];

/* حالةُ المستوى والمرحلة تُشتقّ من الدروس، ولا تُكتب بيد.

   كانت مكتوبةً في موضعين — LEVELS وSTAGES — فافترقا: تمّ A2 وبقي
   «doing»، وبُنيت دروس B1 وبقي «todo». والحقيقة الواحدة تُكتب مرّة،
   وإلا تخلّف أحد الموضعين وأخبر المتعلّم بغير الواقع. */
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
