/* خريطة المنهج كما تُعرض للمتعلّم.

   تُطابق ROADMAP.md، وتُحدَّث معه. وسببُ وجودها على الشاشة لا في
   التقارير وحدها: أنّ التقارير المتفرّقة أخفت الصورة الكاملة، فظُنّ
   أنّ البناء في ستّة مستويات وهو في نصف المستوى الأول. فالخريطة
   تُعرض الآن، ويرى المتعلّم موقعه من السلّم كلّه لا من درسه وحده. */

export const LEVELS = [
  {id:'A1', t:'مبتدئ', state:'done',
   d:'يعرّف بنفسه، ويسأل أسئلة بسيطة، ويتكلّم عن يومه، ويطلب في مطعم.'},
  {id:'A2', t:'مبتدئ متقدّم', state:'doing',
   d:'يتكلّم عن الماضي والمستقبل، ويقارن، ويصل الجمل بـ because و when.'},
  {id:'B1', t:'متوسّط', state:'todo',
   d:'يتابع حديثاً عادياً، ويشرح رأيه، ويكتب رسالة مترابطة.'},
  {id:'B2', t:'متوسّط متقدّم', state:'todo',
   d:'يناقش ويجادل، ويفهم نصّاً طويلاً في تخصّصه.'},
  {id:'C1', t:'متقدّم', state:'todo', d:'يتكلّم بطلاقة في العمل والدراسة.'},
  {id:'C2', t:'إتقان', state:'todo', d:'قريب من المتحدّث الأصلي.'}
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

  {id:'a2', t:'المستوى A2', level:'A2', state:'doing', units:[
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

  {id:'b1', t:'المستوى B1', level:'B1', state:'todo', units:[
    {n:10, t:'الحاضر التامّ', lessons:[
      {id:'10.1', t:'have / has + التصريف الثالث', state:'todo'},
      {id:'10.2', t:'ever وnever وjust وyet', state:'todo'},
      {id:'10.3', t:'since وfor', state:'todo'}]},
    {n:11, t:'الماضي المستمرّ والسرد', lessons:[
      {id:'11.1', t:'was / were + ing', state:'todo'},
      {id:'11.2', t:'while وwhen في السرد', state:'todo'}]},
    {n:12, t:'الشرط', lessons:[
      {id:'12.1', t:'الشرط الأوّل: if + مضارع → will', state:'todo'},
      {id:'12.2', t:'الشرط الثاني: if + ماضٍ → would', state:'todo'}]},
    {n:13, t:'الأفعال الناقصة الموسّعة', lessons:[
      {id:'13.1', t:'should وmust وhave to', state:'todo'},
      {id:'13.2', t:'may وmight وcould للاحتمال', state:'todo'}]},
    {n:14, t:'المبنيّ للمجهول وجملة الوصل', lessons:[
      {id:'14.1', t:'is / was + التصريف الثالث', state:'todo'},
      {id:'14.2', t:'who وwhich وthat', state:'todo'}]}
  ]},

  {id:'b2', t:'المستوى B2 فما فوق', level:'B2', state:'todo', units:[]}
];

export function roadmapCounts() {
  let done = 0, total = 0;
  STAGES.forEach(s => s.units.forEach(u => u.lessons.forEach(l => {
    total++; if (l.state === 'done') done++;
  })));
  return {done, total};
}
