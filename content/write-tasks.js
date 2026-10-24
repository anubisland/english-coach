/* بنك اختبار الكتابة.

   لا خيارات في هذا البنك إطلاقاً — ولا سؤال واحد من نوع «اختر الصحيح».
   سببه أن الاختيار يقيس التعرّف، والكتابة تقيس الإنتاج، وبينهما فرق:
   من يعرف الصواب حين يراه قد لا يستطيع إنشاءه من فراغ.

   أربعة أنواع، من المقيّد إلى الحرّ:
     order  رتّب كلمات مبعثرة — يقيس ترتيب الجملة وحده بلا عبء مفردات
     gap    اكتب الكلمة الناقصة — يقيس قاعدة بعينها
     build  اكتب جملة تؤدّي معنى عربياً، بكلمات مطلوبة
     free   كتابة موجّهة بقائمة شروط معلومة للمتعلّم قبل أن يكتب

   ok: صيغ مقبولة كلها، أولاها النموذجية. ما خرج عنها يُقاس بالتقارب لا يُرفض. */
export const WRITE = [
  /* ===== رتّب الكلمات ===== */
  {k:'order', u:1, skill:'be-subject', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['student','a','am','I'], ok:['I am a student']},
  {k:'order', u:1, skill:'be-subject', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['is','brother','he','my'], ok:['He is my brother']},
  {k:'order', u:1, skill:'be-question', ar:'اكتب السؤال الصحيح مستعملاً هذه الكلمات كلّها.',
   w:['you','from','are','where'], ok:['Where are you from']},
  {k:'order', u:1, skill:'be-subject', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['not','they','are','here'], ok:['They are not here']},
  {k:'order', u:2, skill:'present-s', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['works','she','an','in','office'], ok:['She works in an office']},
  {k:'order', u:2, skill:'present-base', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['every','I','to','go','day','school'], ok:['I go to school every day']},
  {k:'order', u:2, skill:'present-neg', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['like','not','does','he','fish'], ok:['He does not like fish']},
  {k:'order', u:2, skill:'present-base', ar:'اكتب السؤال الصحيح مستعملاً هذه الكلمات كلّها.',
   w:['coffee','do','like','you'], ok:['Do you like coffee']},
  {k:'order', u:3, skill:'there-is-are', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['a','there','bank','is','here','near'], ok:['There is a bank near here']},
  {k:'order', u:3, skill:'there-is-are', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['two','are','on','there','the','chairs','table'], ok:['There are two chairs on the table']},
  {k:'order', u:3, skill:'article-a-an', ar:'اكتب الجملة الصحيحة مستعملاً هذه الكلمات كلّها.',
   w:['an','would','I','orange','like','juice'], ok:['I would like an orange juice']},
  {k:'order', u:3, skill:'be-question', ar:'اكتب السؤال الصحيح مستعملاً هذه الكلمات كلّها.',
   w:['the','is','where','station','train'], ok:['Where is the train station']},

  /* ===== اكتب الكلمة الناقصة ===== */
  {k:'gap', u:1, skill:'be-subject', ar:'فعل الكون المناسب مع I.',
   before:'I', after:'a teacher.', ok:['am']},
  {k:'gap', u:1, skill:'be-subject', ar:'فعل الكون المناسب مع she.',
   before:'She', after:'my sister.', ok:['is']},
  {k:'gap', u:1, skill:'be-subject', ar:'فعل الكون المناسب مع they.',
   before:'They', after:'at school.', ok:['are']},
  {k:'gap', u:1, skill:'article-a-an', ar:'أداة التنكير: انتبه لأول حرف في engineer.',
   before:'He is', after:'engineer.', ok:['an']},
  {k:'gap', u:1, skill:'article-a-an', ar:'أداة التنكير: انتبه لأول حرف في car.',
   before:'She has', after:'car.', ok:['a']},
  {k:'gap', u:1, skill:'be-question', ar:'ابدأ السؤال بفعل الكون المناسب.',
   before:'', after:'you ready?', ok:['are']},
  {k:'gap', u:2, skill:'present-s', ar:'صرّف الفعل work مع he.',
   before:'He', after:'in a hospital.', ok:['works']},
  {k:'gap', u:2, skill:'present-s', ar:'صرّف الفعل study مع she.',
   before:'She', after:'English every night.', ok:['studies']},
  {k:'gap', u:2, skill:'present-base', ar:'صرّف الفعل live مع they.',
   before:'They', after:'in Cairo.', ok:['live']},
  {k:'gap', u:2, skill:'present-neg', ar:'أداة النفي المناسبة مع I.',
   before:'I', after:'like fish.', ok:["don't",'do not']},
  {k:'gap', u:2, skill:'present-neg', ar:'أداة النفي المناسبة مع he.',
   before:'He', after:'like fish.', ok:["doesn't",'does not']},
  {k:'gap', u:2, skill:'present-neg', ar:'ابدأ السؤال بالأداة المناسبة مع she.',
   before:'', after:'she work here?', ok:['does']},
  {k:'gap', u:2, skill:'present-base', ar:'ابدأ السؤال بالأداة المناسبة مع you.',
   before:'', after:'you speak English?', ok:['do']},
  {k:'gap', u:3, skill:'there-is-are', ar:'المناسب مع المفرد.',
   before:'There', after:'a pharmacy on the corner.', ok:['is']},
  {k:'gap', u:3, skill:'there-is-are', ar:'المناسب مع الجمع.',
   before:'There', after:'three shops in this street.', ok:['are']},
  {k:'gap', u:3, skill:'prepositions', ar:'حرف الجر المناسب: البنك بجوار الحديقة.',
   before:'The bank is next', after:'the park.', ok:['to']},
  {k:'gap', u:3, skill:'prepositions', ar:'حرف الجر المناسب: أعمل في مكتب.',
   before:'I work', after:'an office.', ok:['in']},
  {k:'gap', u:3, skill:'prepositions', ar:'حرف الجر المناسب: أستيقظ في السابعة.',
   before:'I wake up', after:'seven.', ok:['at']},
  {k:'gap', u:3, skill:'article-a-an', ar:'أداة التعريف أو التنكير: مطعم معروف ذكرناه قبل قليل.',
   before:'Let us go to', after:'restaurant we saw yesterday.', ok:['the']},

  /* ===== اكتب جملة ===== */
  {k:'build', u:1, skill:'be-subject', ar:'اكتب بالإنجليزية: أنا لست طبيباً.',
   must:['not'], ok:['I am not a doctor.',"I'm not a doctor."]},
  {k:'build', u:1, skill:'be-subject', ar:'اكتب بالإنجليزية: هم أصدقائي.',
   must:['friends'], ok:['They are my friends.',"They're my friends."]},
  {k:'build', u:1, skill:'be-question', ar:'اكتب سؤالاً بالإنجليزية: ما اسمك؟',
   must:['name'], ok:['What is your name?',"What's your name?"]},
  {k:'build', u:1, skill:'be-subject', ar:'اكتب بالإنجليزية: أختي معلّمة.',
   must:['sister'], ok:['My sister is a teacher.']},
  {k:'build', u:2, skill:'present-s', ar:'اكتب بالإنجليزية: أخي يعمل في بنك.',
   must:['works'], ok:['My brother works in a bank.']},
  {k:'build', u:2, skill:'present-base', ar:'اكتب بالإنجليزية: أشرب القهوة كل صباح.',
   must:['coffee'], ok:['I drink coffee every morning.']},
  {k:'build', u:2, skill:'present-neg', ar:'اكتب بالإنجليزية: هي لا تحبّ السمك.',
   must:["doesn't|does not"], ok:['She does not like fish.',"She doesn't like fish."]},
  {k:'build', u:2, skill:'present-base', ar:'اكتب سؤالاً بالإنجليزية: أين تعمل؟',
   must:['work'], ok:['Where do you work?']},
  {k:'build', u:3, skill:'there-is-are', ar:'اكتب بالإنجليزية: يوجد مستشفى قريب من بيتي.',
   must:['hospital'], ok:['There is a hospital near my house.']},
  {k:'build', u:3, skill:'there-is-are', ar:'اكتب بالإنجليزية: يوجد أربعة طلاب في الغرفة.',
   must:['four'], ok:['There are four students in the room.']},
  {k:'build', u:3, skill:'prepositions', ar:'اكتب بالإنجليزية: الصيدلية أمام المدرسة.',
   must:['pharmacy'], ok:['The pharmacy is in front of the school.']},
  {k:'build', u:3, skill:'article-a-an', ar:'اكتب بالإنجليزية: أريد تفاحة من فضلك.',
   must:['apple'], ok:['I would like an apple, please.','I want an apple, please.']},

  /* ===== كتابة موجّهة =====
     الشروط معلومة للمتعلّم قبل أن يكتب، وتُقاس واحداً واحداً بعد أن يكتب.
     الكتابة الحرّة بلا شروط لا تُقاس بعدل، والشرط الخفيّ ظلم. */
  {k:'free', u:1, skill:'be-subject', ar:'عرّف بنفسك في ثلاث جمل.', min:3,
   ask:[{t:'اذكر اسمك', re:/\b(my name is|i am|i’m|i'm)\b/i},
        {t:'اذكر بلدك', re:/\bfrom\b/i},
        {t:'اذكر عملك أو دراستك', re:/\b(work|study|student|teacher|engineer|doctor|nurse|driver|manager)\b/i}],
   ok:['My name is Ahmed. I am from Egypt. I work in an office.']},
  {k:'free', u:1, skill:'be-subject', ar:'صِف فرداً من أسرتك في ثلاث جمل.', min:3,
   ask:[{t:'اذكر صلة القرابة', re:/\b(brother|sister|father|mother|son|daughter|wife|husband)\b/i},
        {t:'استعمل is', re:/\bis\b/i},
        {t:'اذكر صفة أو عملاً', re:/\b(kind|tall|short|young|old|nice|good|busy|works|studies|teacher|doctor|student)\b/i}],
   ok:['My brother is twenty years old. He is a student. He is very kind.']},
  {k:'free', u:2, skill:'present-base', ar:'اكتب عن يومك في أربع جمل.', min:4,
   ask:[{t:'اذكر وقتاً', re:/\b(at|in the)\s+(\w+)|morning|evening|night|seven|eight|nine|ten/i},
        {t:'استعمل فعلاً في المضارع', re:/\b(wake|go|work|study|eat|drink|read|watch|come|get)\b/i},
        {t:'استعمل كلمة تكرار', re:/\b(every|always|usually|sometimes|never|often)\b/i},
        {t:'اذكر مكاناً', re:/\b(home|school|work|office|university|shop|market|gym)\b/i}],
   ok:['I wake up at six every morning. I drink coffee at home. Then I go to work. I usually come back at five.']},
  {k:'free', u:2, skill:'present-neg', ar:'اكتب ثلاث جمل عمّا تحبّ وما لا تحبّ.', min:3,
   ask:[{t:'استعمل like', re:/\blike\b/i},
        {t:'استعمل نفياً', re:/\b(don’t|don't|do not|doesn’t|doesn't|does not|not)\b/i},
        {t:'اذكر شيئين مختلفين على الأقل', re:/\b(and|but)\b/i}],
   ok:['I like tea and coffee. I do not like fish. My sister likes fish but I do not.']},
  {k:'free', u:3, skill:'there-is-are', ar:'صِف الشارع الذي تسكن فيه في أربع جمل.', min:4,
   ask:[{t:'استعمل there is', re:/\bthere is\b/i},
        {t:'استعمل there are', re:/\bthere are\b/i},
        {t:'اذكر حرف جر للمكان', re:/\b(near|next to|in front of|behind|between|on|opposite)\b/i},
        {t:'اذكر مكانين عامّين', re:/\b(shop|bank|school|park|pharmacy|mosque|church|market|restaurant|cafe|hospital)\b/i}],
   ok:['There is a small shop near my house. There are two schools in my street. The bank is next to the park. There is a nice cafe opposite the mosque.']},
  {k:'free', u:3, skill:'prepositions', ar:'اكتب أربع جمل ترشد بها شخصاً إلى محطة القطار.', min:4,
   ask:[{t:'استعمل فعل أمر', re:/\b(go|turn|take|walk|cross|stop)\b/i},
        {t:'اذكر اتجاهاً', re:/\b(right|left|straight|ahead)\b/i},
        {t:'اذكر حرف جر للمكان', re:/\b(near|next to|in front of|behind|between|on|at|opposite|after)\b/i},
        {t:'اذكر علامة في الطريق', re:/\b(bank|school|park|shop|corner|street|road|bridge|market|mosque)\b/i}],
   ok:['Go straight ahead. Turn right at the bank. Walk to the end of the street. The station is next to the park.']}
];

export const WRITE_KINDS = {
  order: 'رتّب الكلمات', gap: 'أكمل الناقص', build: 'اكتب الجملة', free: 'كتابة موجّهة'
};
