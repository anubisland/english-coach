/* جُمل الترجمة من العربية إلى الإنجليزية.
   أصدق مقياس في التطبيق: لا خيارات ولا جملة يقلّدها، وهي تكشف أخطاء
   التداخل مع العربية بالذات — حذف فعل الكون، ونسيان أداة التنكير، وغيرها.

   en: صيغ مقبولة. الأولى هي النموذجية، والبقية بدائل صحيحة لا نعاقب عليها. */
export const TRANSLATE = [
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
