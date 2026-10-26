/* ربط البرنامج بالإطار الأوروبي المرجعي (CEFR).

   لماذا؟ لأن «مستوى A1» كلمةٌ من عندنا بلا سند ما لم تُنسب إلى مرجع.
   والإطار يصف كل مستوى بقدراتٍ محدّدة («يستطيع أن…»)، فإذا رُبط كل درس
   واختبار بقدرةٍ منها صارت النتيجة قابلة للمراجعة: «أثبتَّ سبعاً من
   تسع» بدل «٨٥٪» التي لا تُحيل إلى شيء.

   والبنية هنا **لكل مستوى** لا لمستوى واحد: كانت A1 وحدها مكتوبةً في
   المحرّك والشاشة، فإضافة A2 كانت تحتاج نسخ المنظومة كلّها. فصارت
   خريطةً من المستوى إلى قدراته ونواقصه.

   والأهمّ: ما لا يغطّيه البرنامج مذكورٌ هنا صراحةً. إخفاؤه يجعل
   المتعلّم يظنّ أنّه أتمّ المستوى وهو لم يتمّ نصفه. */

export const CEFR = {
  A1: {
    t: 'مبتدئ',
    caps: [
      {id:'intro', t:'يُعرّف بنفسه: اسمه وبلده وعمله',
       skill:'المحادثة', lessons:['1.1','1.2'], exam:'conv', scene:'x-air'},
      {id:'people', t:'يصف شخصاً من أسرته أو أصدقائه',
       skill:'الكتابة', lessons:['1.2'], exam:'write'},
      {id:'ask', t:'يسأل أسئلة بسيطة ويفهم جوابها',
       skill:'المحادثة', lessons:['1.3'], exam:'conv', scene:'x-bank'},
      {id:'routine', t:'يتحدّث عن يومه وعمله ودراسته',
       skill:'الكتابة', lessons:['2.1','2.2'], exam:'write'},
      {id:'likes', t:'يقول ما يحبّ وما لا يحبّ',
       skill:'الكتابة', lessons:['2.3'], exam:'write'},
      {id:'place', t:'يصف مكاناً ويسأل عن الاتجاهات',
       skill:'المحادثة', lessons:['3.3'], exam:'conv', scene:'x-shop'},
      {id:'read-note', t:'يفهم رسالة شخصية قصيرة',
       skill:'القراءة', lessons:['1.1','1.2'], exam:'read', scene:'r-note'},
      {id:'read-sign', t:'يفهم إعلاناً أو جدولاً بسيطاً',
       skill:'القراءة', lessons:['3.1','3.2'], exam:'read', scene:'r-sign'},
      {id:'things', t:'يتحدّث عن الأشياء من حوله وعددها',
       skill:'الكتابة', lessons:['4.1','4.3'], exam:'write'},
      {id:'belong', t:'يقول لمن يكون الشيء، ويصف ما يملك',
       skill:'المحادثة', lessons:['4.2','4.4'], exam:'conv', scene:'x-hotel'},
      {id:'ability', t:'يقول ما يستطيع وما لا يستطيع، ويطلب بأدب',
       skill:'المحادثة', lessons:['5.1','5.2'], exam:'conv', scene:'x-clinic'},
      {id:'now-time', t:'يصف ما يحدث الآن، ويحدّد المواعيد',
       skill:'الكتابة', lessons:['5.3','5.4'], exam:'write'},
      {id:'listen', t:'يفهم جملاً بطيئة واضحة ويكتبها',
       skill:'الاستماع', lessons:['1.1','2.1','3.3'], exam:'dictation'}
    ],
    /* لم يبقَ من قدرات A1 ما لا يغطّيه البرنامج. والقائمة تبقى موضعاً
       لما يُكتشف لاحقاً: إعلانُه أصدق من حذف القائمة وادّعاء التمام. */
    gaps: []
  },

  A2: {
    t: 'مبتدئ متقدّم',
    caps: [
      {id:'past-tell', t:'يحكي ما حدث له أمس وأين كان',
       skill:'المحادثة', lessons:['6.1','6.2'], exam:'conv', scene:'x-school'},
      {id:'past-write', t:'يكتب عن حدثٍ مضى بأفعاله الصحيحة',
       skill:'الكتابة', lessons:['6.2','6.3'], exam:'write'},
      {id:'plan-tell', t:'يُخبر عن خططه ونيّاته لما هو آت',
       skill:'المحادثة', lessons:['7.1'], exam:'conv', scene:'x-school'},
      {id:'future-write', t:'يَعِد ويتكهّن ويكتب عمّا سيكون',
       skill:'الكتابة', lessons:['7.1','7.2'], exam:'write'},
      {id:'compare-say', t:'يوازن بين شيئين ويقول أيّهما أفضل',
       skill:'المحادثة', lessons:['8.1'], exam:'conv', scene:'x-shop'},
      {id:'compare-write', t:'يصف الفرق والمساواة بصيغ المقارنة الصحيحة',
       skill:'الكتابة', lessons:['8.1','8.2'], exam:'write'},
      {id:'ask-quantity', t:'يسأل عمّا يوجد وكم يوجد، ويطلب ما يحتاج',
       skill:'المحادثة', lessons:['9.1'], exam:'conv', scene:'x-shop'},
      {id:'connect-write', t:'يصل كلامه بالسبب والنتيجة والزمن',
       skill:'الكتابة', lessons:['9.2'], exam:'write'}
    ],
    /* تُنقل واحدةً واحدة إلى caps كلّما بُني درسها، فتُقاس التغطية
       من الواقع لا من الوعد. */
    gaps: [
    ]
  }
,

  /* بقيّة السلّم: مذكورة وإن لم يُبنَ منها شيء. وذكرُها هو المقصود —
     لو حُذفت لظنّ المتعلّم أنّ السلّم ينتهي عند آخر ما بنيناه. */
  /* B1 مُعلَنُ النواقص قبل أن يُبنَ: تُنقل الواحدة إلى caps حين يُبنى
     درسُها، فيقرأ المتعلّم على الشاشة ما بقي لا ما تمّ وحده. */
  B1: {t:'متوسّط', caps: [
      {id:'perfect-tell', t:'يربط ما مضى بحاضره: ما أنجزه وما لم ينجزه بعد',
       skill:'المحادثة', lessons:['10.1','10.2'], exam:'conv', scene:'x-school'},
      {id:'perfect-write', t:'يكتب عن تجربته ومدّتها بالصيغة الصحيحة',
       skill:'الكتابة', lessons:['10.1','10.3'], exam:'write'},
      {id:'narrate-tell', t:'يحكي ما جرى: خلفيةٌ طويلة يقطعها حدث',
       skill:'المحادثة', lessons:['11.1','11.2'], exam:'conv', scene:'x-clinic'},
      {id:'cond-write', t:'يشترط ويَعِد ويفترض ما ليس بواقع',
       skill:'الكتابة', lessons:['12.1','12.2'], exam:'write'},
      {id:'advise-tell', t:'ينصح ويُلزم ويتكلّم عن المحتمل بحذر',
       skill:'المحادثة', lessons:['13.1','13.2'], exam:'conv', scene:'x-clinic'},
      {id:'passive-read', t:'يفهم الخبر والإعلان حين يُبنى الفعل لمجهول',
       skill:'القراءة', lessons:['14.1'], exam:'read'},
      {id:'relative-write', t:'يصل جملتيه في واحدة موصولة بـ who و which',
       skill:'الكتابة', lessons:['14.2'], exam:'write'}
    ], gaps: [
  ]},
  /* B2 مُعلَنُ النواقص قبل أن يُبنَ، كما كان B1. */
  B2: {t:'متوسّط متقدّم', caps: [
      {id:'sequence-tell', t:'يرتّب حدثين في الماضي فيُفهم أيّهما قبل',
       skill:'المحادثة', lessons:['15.1'], exam:'conv', scene:'x-school'},
      {id:'duration-write', t:'يُبرز المدّة والاستمرار لا النتيجة وحدها',
       skill:'الكتابة', lessons:['15.2'], exam:'write'},
      {id:'report-tell', t:'ينقل كلام غيره وسؤاله وأمره بأمانة',
       skill:'المحادثة', lessons:['16.1','16.2'], exam:'conv', scene:'x-bank'},
      {id:'regret-write', t:'يتحسّر على ما فات ويتمنّى ما ليس بواقع',
       skill:'الكتابة', lessons:['17.1','17.2'], exam:'write'},
      {id:'verbform-write', t:'يختار صيغة الفعل التابع فلا ينقلب معناه',
       skill:'الكتابة', lessons:['18.1','18.2'], exam:'write'},
      {id:'contrast-write', t:'يخالف ويستدرك، ويرتّب صفاته وظروفه',
       skill:'الكتابة', lessons:['19.1','19.2'], exam:'write'}
    ], gaps: [
  ]},
  /* C1 يختلف في نوعه عمّا قبله: ما مضى قواعدُ لها صوابٌ وخطأ يمسكهما
     محرّك الأنماط، وC1 أسلوبٌ وسجلٌّ ومصاحبات. فما بُني منه هو ما
     يُقاس، وما لا يُقاس يبقى في النواقص ويُعلَن سببُه — لا يُعَدّ
     قدرةً مبنيّة لأنّ درسه كُتب. */
  C1: {t:'متقدّم', caps: [
      {id:'emphasis-write', t:'يؤكّد ويُبرز بالتركيب لا بالتكرار',
       skill:'الكتابة', lessons:['20.1','20.2'], exam:'write'},
      {id:'register-write', t:'يختار سجلّه: رسميٌّ للعمل وعاميٌّ للصحبة',
       skill:'الكتابة', lessons:['21.1'], exam:'write'},
      {id:'hedge-write', t:'يتحفّظ فيما لا يقطع به، ولا يجزم بلا دليل',
       skill:'الكتابة', lessons:['21.2'], exam:'write'},
      {id:'colloc-write', t:'يصاحب الكلمةَ بما يصاحبها عند أهلها',
       skill:'الكتابة', lessons:['22.1'], exam:'write'},
      {id:'phrasal-write', t:'يستعمل الفعل المركّب ويضع ضميره في موضعه',
       skill:'الكتابة', lessons:['22.2'], exam:'write'}
    ], gaps: [
    {t:'السخرية والتلميح والمجاز', why:'يحتاج قارئاً بشرياً — لا يقيسه محرّك الأنماط'}
  ]},
  C2: {t:'إتقان', caps: [
      {id:'precise-write', t:'يختار الكلمة الأدقّ لا الأقربَ معنىً',
       skill:'الكتابة', lessons:['23.1'], exam:'write'},
      {id:'concise-write', t:'يوجز فيقول كلَّ المعنى بأقلّ لفظ',
       skill:'الكتابة', lessons:['23.2'], exam:'write'},
      {id:'argue-write', t:'يبني حجّته في فقرات: فكرةٌ وسندٌ وإغلاق',
       skill:'الكتابة', lessons:['24.1'], exam:'write'}
    ], gaps: [
    {t:'السخرية والتلميح والمجاز', why:'يحتاج قارئاً بشرياً — لا يقيسه محرّك الأنماط'}
  ]}
};

export const LEVEL_IDS = Object.keys(CEFR);

export function levelCoverage(id) {
  const lv = CEFR[id];
  if (!lv) return 0;
  const total = lv.caps.length + lv.gaps.length;
  return total ? Math.round(lv.caps.length / total * 100) : 0;
}

/* تُبقى للتوافق مع ما يستوردها، ومصدرها الخريطة أعلاه لا نسخة ثانية. */
export const CEFR_A1 = CEFR.A1.caps;
export const CEFR_GAPS = CEFR.A1.gaps;
export const A1_COVERAGE = levelCoverage('A1');
export const CEFR_BY_ID = Object.fromEntries(
  LEVEL_IDS.flatMap(id => CEFR[id].caps.map(c => [c.id, {...c, level: id}])));
