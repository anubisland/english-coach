/* جُمل الترجمة من العربية إلى الإنجليزية.
   أصدق مقياس في التطبيق: لا خيارات ولا جملة يقلّدها، وهي تكشف أخطاء
   التداخل مع العربية بالذات — حذف فعل الكون، ونسيان أداة التنكير، وغيرها.

   en: صيغ مقبولة. الأولى هي النموذجية، والبقية بدائل صحيحة لا نعاقب عليها. */
export const TRANSLATE = [
  /* ===== الوحدة 4: الأشياء والناس ===== */
  {ar:'عندي أخوان.', u:4, skill:'plural', en:['I have two brothers.','I have got two brothers.']},
  {ar:'في الغرفة ثلاثة كراسٍ.', u:4, skill:'plural', en:['There are three chairs in the room.']},
  {ar:'هذه حقيبتي.', u:4, skill:'possessive', en:['This is my bag.']},
  {ar:'سيارة عمر جديدة.', u:4, skill:'possessive', en:["Omar's car is new.",'Omar’s car is new.']},
  {ar:'هؤلاء أصدقائي.', u:4, skill:'demonstrative', en:['These are my friends.']},
  {ar:'ذلك البيت كبير.', u:4, skill:'demonstrative', en:['That house is big.']},
  {ar:'معها هاتف جديد.', u:4, skill:'have-got', en:['She has got a new phone.','She has a new phone.']},
  {ar:'هل معك قلم؟', u:4, skill:'have-got', en:['Have you got a pen?','Do you have a pen?']},
  /* ===== الوحدة 5: القدرة والأمر والزمن ===== */
  {ar:'أستطيع السباحة.', u:5, skill:'can', en:['I can swim.']},
  {ar:'لا تستطيع المجيء اليوم.', u:5, skill:'can', en:['She cannot come today.',"She can't come today."]},
  {ar:'هل يمكنك مساعدتي؟', u:5, skill:'can', en:['Can you help me?']},
  {ar:'افتح النافذة من فضلك.', u:5, skill:'imperative', en:['Please open the window.','Open the window, please.']},
  {ar:'لا تتأخّر غداً.', u:5, skill:'imperative', en:["Don't be late tomorrow.",'Do not be late tomorrow.']},
  {ar:'أنا أعمل الآن.', u:5, skill:'present-cont', en:['I am working now.']},
  {ar:'يقوم القطار في السادسة.', u:5, skill:'numbers-time', en:['The train leaves at six.']},
  {ar:'عيد ميلادي في مايو.', u:5, skill:'numbers-time', en:['My birthday is in May.']},
  /* ===== الوحدة 1: فعل الكون ===== */
  {ar:'أنا طالب.', u:1, skill:'be-subject',
   en:['I am a student.', "I'm a student."]},
  {ar:'هي أختي.', u:1, skill:'be-subject',
   en:['She is my sister.', "She's my sister."]},
  {ar:'نحن جاهزون.', u:1, skill:'be-subject',
   en:['We are ready.', "We're ready."]},
  {ar:'القهوة ساخنة.', u:1, skill:'be-subject',
   en:['The coffee is hot.']},
  {ar:'هم في المدرسة.', u:1, skill:'be-subject',
   en:['They are at school.', "They're at school.", 'They are in school.']},
  {ar:'أبي ليس في البيت.', u:1, skill:'be-negative',
   en:['My father is not at home.', "My father isn't at home.", "My father's not at home."]},
  {ar:'هل أنت متعب؟', u:1, skill:'be-question',
   en:['Are you tired?']},
  {ar:'ما اسمك؟', u:1, skill:'be-question',
   en:['What is your name?', "What's your name?"]},

  /* ===== الوحدة 2: المضارع البسيط ===== */
  {ar:'أذهب إلى العمل كل يوم.', u:2, skill:'present-base',
   en:['I go to work every day.']},
  {ar:'نلعب كرة القدم يوم الجمعة.', u:2, skill:'present-base',
   en:['We play football on Friday.', 'We play football on Fridays.']},
  {ar:'هو يعمل في بنك.', u:2, skill:'present-s',
   en:['He works in a bank.', 'He works at a bank.']},
  {ar:'هي تشاهد التلفاز ليلاً.', u:2, skill:'present-s',
   en:['She watches TV at night.', 'She watches television at night.']},
  {ar:'أختي تذهب إلى المدرسة بالحافلة.', u:2, skill:'present-s',
   en:['My sister goes to school by bus.']},
  {ar:'لا أحب السمك.', u:2, skill:'present-neg',
   en:["I don't like fish.", 'I do not like fish.']},
  {ar:'هم لا يسكنون هنا.', u:2, skill:'present-neg',
   en:["They don't live here.", 'They do not live here.']},
  {ar:'هل يعمل أخوك هنا؟', u:2, skill:'present-neg',
   en:['Does your brother work here?']},

  /* ===== الوحدة 3: الأدوات و There is ===== */
  {ar:'معي تفاحة.', u:3, skill:'article-a-an',
   en:['I have an apple.', "I've got an apple."]},
  {ar:'هي طبيبة.', u:3, skill:'article-a-an',
   en:['She is a doctor.', "She's a doctor."]},
  {ar:'أخي مهندس.', u:3, skill:'article-a-an',
   en:['My brother is an engineer.', "My brother's an engineer."]},
  {ar:'أغلق الباب من فضلك.', u:3, skill:'article-the',
   en:['Close the door, please.', 'Please close the door.']},
  {ar:'أحب الموسيقى.', u:3, skill:'article-the',
   en:['I love music.', 'I like music.']},
  {ar:'الشمس حارة اليوم.', u:3, skill:'article-the',
   en:['The sun is hot today.']},
  {ar:'هناك بنك قرب البيت.', u:3, skill:'there-is-are',
   en:['There is a bank near the house.', "There's a bank near the house."]},
  {ar:'هناك مطعمان في الشارع.', u:3, skill:'there-is-are',
   en:['There are two restaurants in the street.', 'There are two restaurants on the street.']}
];
