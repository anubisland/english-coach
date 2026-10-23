/* بنك القواعد: بطاقة لكل قاعدة، وفيها حقل ar يشرح لماذا يخطئ العربي هنا بالذات. */

export const RULES=[
{id:'be-subject',
 t:'فعل الكون: am / is / are',
 rule:'الفعل يتبع الفاعل دائماً: I ← am، وhe / she / it ← is، وyou / we / they ← are.',
 why:'أكثر قاعدة استعمالاً في الإنجليزية. ستحتاجها في كل جملة تعرّف بها نفسك، أو تصف حالك، أو تتحدث فيها عن أحد.',
 table:[['I','am'],['he / she / it','is'],['you / we / they','are']],
 more:[
  'الاسم المفرد يعامَل معاملة he أو she أو it، فنستخدم معه is: <span class=en>My name is Omar.</span>',
  'اسمان يربطهما and يصيران جمعاً، فنستخدم are: <span class=en>Ahmed and Sara are here.</span>',
  'الاختصار في الكلام: <span class=en>I\'m</span> و<span class=en>he\'s</span> و<span class=en>they\'re</span>. المعنى نفسه، لكنه أقرب للكلام الطبيعي.'],
 ex:[
  {en:'I am a student.',ar:'أنا طالب.'},
  {en:'She is my sister.',ar:'هي أختي.'},
  {en:'We are ready.',ar:'نحن جاهزون.'},
  {en:'The coffee is hot.',ar:'القهوة ساخنة.'}],
 bad:['<span class=en>I is tired.</span> ← الصواب <span class=en>I am tired.</span>',
      '<span class=en>He are my brother.</span> ← الصواب <span class=en>He is my brother.</span>',
      '<span class=en>I student.</span> ← جملة بلا فعل، والصواب <span class=en>I am a student.</span>'],
 ar:'العربية تقول «أنا طالب» بكلمتين بلا فعل، لأن فعل الكون محذوف في المضارع. الإنجليزية لا تقبل جملة بلا فعل أبداً، فتضيف am. ولهذا ينسى المتعلّم العربي هذا الفعل تحديداً أكثر من أي شيء آخر. القاعدة العملية: إن لم يكن في جملتك فعل، فأنت تحتاج am أو is أو are.'},

{id:'be-negative',
 t:'النفي مع فعل الكون',
 rule:'نضع not بعد الفعل مباشرة: I am not، he is not، they are not.',
 why:'النفي نصف الكلام. من لا يتقنه يستطيع أن يقول ما هو كائن، ولا يستطيع أن يقول ما ليس كائناً.',
 table:[['I am not','I\'m not'],['he / she / it is not','isn\'t'],['you / we / they are not','aren\'t']],
 more:[
  'الاختصار: <span class=en>isn\'t</span> و<span class=en>aren\'t</span>. أما <span class=en>am not</span> فلا اختصار لها، ونقول <span class=en>I\'m not</span>.',
  'لا نضيف do أو does مع فعل الكون أبداً: النفي بـ not وحدها.'],
 ex:[
  {en:'I am not late.',ar:'لست متأخراً.'},
  {en:'He is not tired.',ar:'هو ليس متعباً.'},
  {en:'They are not at home.',ar:'هم ليسوا في البيت.'}],
 bad:['<span class=en>I don\'t be ready.</span> ← الصواب <span class=en>I am not ready.</span>',
      '<span class=en>He not is tired.</span> ← الصواب <span class=en>He is not tired.</span>'],
 ar:'العربية تضع أداة النفي قبل الجملة: «لستُ متأخراً»، «ليس متعباً». الإنجليزية تضعها بعد الفعل لا قبله. فإن ترجمت ترتيب العربية حرفياً خرجت بجملة مقلوبة مثل <span class=en>not I am late</span>.'},

{id:'be-question',
 t:'السؤال مع is / are',
 rule:'نقدّم الفعل على الفاعل: Are you ready؟ وIs she your sister؟',
 why:'بهذه القاعدة تسأل وتُجيب، وبها تبدأ أي محادثة حقيقية.',
 table:[['Am I …?','مع I'],['Is he / she / it …?','مع المفرد'],['Are you / we / they …?','مع الجمع']],
 more:[
  'مع كلمة استفهام تأتي الكلمة أولاً ثم الفعل: <span class=en>What is your name?</span> و<span class=en>Where are my keys?</span>',
  'الجواب القصير يعيد الفعل ولا يكرر الجملة: <span class=en>Yes, I am.</span> و<span class=en>No, she isn\'t.</span>',
  'لا نقول <span class=en>Yes, I\'m.</span> — الجواب القصير بالإيجاب لا يُختصر.'],
 ex:[
  {en:'Are you ready?',ar:'هل أنت جاهز؟'},
  {en:'Is she your sister?',ar:'هل هي أختك؟'},
  {en:'What is your name?',ar:'ما اسمك؟'},
  {en:'Where are my keys?',ar:'أين مفاتيحي؟'}],
 bad:['<span class=en>You are ready?</span> ← الصواب <span class=en>Are you ready?</span>',
      '<span class=en>What your name?</span> ← الصواب <span class=en>What is your name?</span>'],
 ar:'العربية تسأل بإضافة «هل» في أول الجملة دون تغيير ترتيبها: «أنت جاهز» تصير «هل أنت جاهز؟». الإنجليزية ليس فيها كلمة تقابل «هل» — التقديم نفسه هو السؤال. فمن يبحث عن ترجمة لـ«هل» لن يجدها، وسيقول <span class=en>You are ready?</span> بنبرة سؤال، وهي ليست سؤالاً سليماً.'},

{id:'present-base',
 t:'المضارع البسيط مع I / you / we / they',
 rule:'الفعل يبقى كما هو بلا أي تغيير: I work، you work، we work، they work.',
 why:'المضارع البسيط هو زمن الروتين والحقائق: ما تفعله كل يوم، وما تحبه، وما تعمله. وهو أكثر الأزمنة استعمالاً في الكلام اليومي.',
 table:[['I / you / we / they','الفعل كما هو'],['السؤال','Do + الفاعل + الفعل']],
 more:[
  'في السؤال نبدأ بـ Do ويبقى الفعل كما هو: <span class=en>Do you like coffee?</span>',
  'لا نضيف s هنا أبداً، حتى مع أفعال مثل <span class=en>go</span> أو <span class=en>watch</span>.',
  'نستخدمه للعادة لا للحظة: <span class=en>I work in a bank</span> تعني عملي، لا أنني أعمل الآن.'],
 ex:[
  {en:'I go to work every day.',ar:'أذهب إلى العمل كل يوم.'},
  {en:'They play football on Friday.',ar:'يلعبون كرة القدم يوم الجمعة.'},
  {en:'Do you like coffee?',ar:'هل تحب القهوة؟'}],
 bad:['<span class=en>I goes to work.</span> ← الصواب <span class=en>I go to work.</span>',
      '<span class=en>You likes coffee?</span> ← الصواب <span class=en>Do you like coffee?</span>'],
 ar:'العربية تغيّر الفعل مع كل ضمير: أذهب، تذهب، نذهب، يذهبون. فيتوقع المتعلّم العربي تغييراً مماثلاً في الإنجليزية ويبحث عن صيغة لكل ضمير. الحقيقة أبسط بكثير: الفعل لا يتغيّر إطلاقاً إلا مع he و she و it. هذه بشرى لا عبء — احفظ صيغة واحدة تكفيك مع أربعة ضمائر.'},

{id:'present-s',
 t:'المضارع البسيط مع he / she / it: إضافة s',
 rule:'مع he و she و it وأي اسم مفرد نضيف s إلى الفعل: he works، she goes، it runs.',
 why:'هذا أشهر خطأ يقع فيه المتعلّم العربي على الإطلاق، ويستمر معه سنوات إن لم يُعالَج مبكراً. إتقانه وحده يرفع مستوى كلامك فوراً.',
 table:[['الحالة العادية','+ s: work ← works'],['ينتهي بـ s, sh, ch, x, o','+ es: watch ← watches'],['ينتهي بـ ساكن + y','ies: cry ← cries'],['have','has']],
 more:[
  'الاسم المفرد يعامَل معاملة he أو she أو it: <span class=en>My brother plays</span> و<span class=en>The baby cries</span>.',
  'الفعل <span class=en>have</span> شاذ ويصير <span class=en>has</span>: <span class=en>She has a car.</span>',
  'إن انتهى الفعل بحرف علة + y فلا نغيّره: <span class=en>play ← plays</span> لا <span class=en>plies</span>.'],
 ex:[
  {en:'He works in a bank.',ar:'يعمل في بنك.'},
  {en:'She watches TV at night.',ar:'تشاهد التلفاز ليلاً.'},
  {en:'My sister goes to school by bus.',ar:'أختي تذهب إلى المدرسة بالحافلة.'},
  {en:'The baby cries a lot.',ar:'الرضيع يبكي كثيراً.'}],
 bad:['<span class=en>He work in a bank.</span> ← الصواب <span class=en>He works in a bank.</span>',
      '<span class=en>She watchs TV.</span> ← الصواب <span class=en>She watches TV.</span>',
      '<span class=en>My brother play football.</span> ← الصواب <span class=en>My brother plays football.</span>'],
 ar:'العربية تضع علامة المذكّر والمؤنّث في <b>أول</b> الفعل: «يذهب» و«تذهب». فحين ينتقل العربي إلى الإنجليزية يبحث عن العلامة في أول الفعل ولا يجدها، فيظن أن لا علامة أصلاً — بينما هي موجودة في <b>آخره</b>: حرف s صغير سهل النسيان. القاعدة العملية: قبل أن تنطق أي فعل، اسأل نفسك «هل الفاعل هو أو هي أو هذا؟» فإن كان الجواب نعم، فالفعل ينتهي بـ s.'},

{id:'present-neg',
 t:'النفي والسؤال مع do / does',
 rule:'نستخدم don\'t مع I / you / we / they، وdoesn\'t مع he / she / it، ويعود الفعل بعدهما بلا s.',
 why:'بهذه القاعدة تقول ما لا تفعله وما لا تحبه، وتسأل الآخرين. بدونها نصف كلامك مفقود.',
 table:[['I / you / we / they','don\'t + الفعل'],['he / she / it','doesn\'t + الفعل'],['السؤال','Do / Does + الفاعل + الفعل']],
 more:[
  'حرف s ينتقل إلى does ويختفي من الفعل: <span class=en>She works</span> تصير <span class=en>She doesn\'t work</span>.',
  'الأمر نفسه في السؤال: <span class=en>Does she work here?</span> لا <span class=en>Does she works here?</span>',
  'مع فعل الكون (am / is / are) لا نستخدم do إطلاقاً، بل not وحدها.'],
 ex:[
  {en:"I don't like fish.",ar:'لا أحب السمك.'},
  {en:"She doesn't drink coffee.",ar:'هي لا تشرب القهوة.'},
  {en:'Does your brother live here?',ar:'هل يسكن أخوك هنا؟'}],
 bad:['<span class=en>She doesn\'t drinks coffee.</span> ← الصواب <span class=en>She doesn\'t drink coffee.</span>',
      '<span class=en>I not like fish.</span> ← الصواب <span class=en>I don\'t like fish.</span>',
      '<span class=en>Do he work here?</span> ← الصواب <span class=en>Does he work here?</span>'],
 ar:'العربية تنفي بأداة واحدة قبل الفعل: «لا أحب». الإنجليزية تحتاج فعلاً مساعداً (do أو does) ثم not، ثم يعود الفعل إلى أصله. فيقع العربي في خطأين متتاليين: ينسى do أصلاً فيقول <span class=en>I not like</span>، أو يتذكرها لكن يُبقي الـ s فيقول <span class=en>She doesn\'t likes</span>. تذكّر أن الـ s انتقلت إلى does، ولا تُكتب مرتين.'},

{id:'article-a-an',
 t:'أداة التنكير: a / an',
 rule:'نضع a أو an قبل الاسم المفرد غير المحدد. والاختيار بالصوت: an قبل صوت متحرك، وa قبل غيره.',
 why:'الإنجليزية لا تقبل اسماً مفرداً عارياً. حذف الأداة من أوضح علامات غير الناطق بالإنجليزية.',
 table:[['يبدأ بصوت ساكن','a book, a car'],['يبدأ بصوت متحرك','an apple, an hour'],['الجمع','بلا أداة: books']],
 more:[
  'العبرة بالصوت لا بالحرف: نقول <span class=en>a university</span> لأنها تُنطق «يونيفرستي» بصوت ساكن.',
  'وبالمثل <span class=en>an hour</span> لأن حرف h لا يُنطق، فتبدأ بصوت متحرك.',
  'مع الجمع لا نستخدم a ولا an: <span class=en>I have books</span> لا <span class=en>a books</span>.'],
 ex:[
  {en:'I have an apple.',ar:'معي تفاحة.'},
  {en:'She is a doctor.',ar:'هي طبيبة.'},
  {en:'He is an engineer.',ar:'هو مهندس.'}],
 bad:['<span class=en>She is doctor.</span> ← الصواب <span class=en>She is a doctor.</span>',
      '<span class=en>I have a apple.</span> ← الصواب <span class=en>I have an apple.</span>'],
 ar:'العربية ليس فيها أداة تنكير إطلاقاً: «كتاب» وحدها تعني a book. فالمتعلّم العربي لا يتردد بين a وan فحسب، بل ينسى الأداة كلها فيقول <span class=en>She is doctor</span>. القاعدة العملية: كل اسم مفرد في جملتك يحتاج أداة — a أو an أو the — ولا يقف عارياً أبداً.'},

{id:'article-the',
 t:'أداة التعريف: the',
 rule:'نستخدم the للشيء المعروف للمتكلم والمستمع معاً، أو الذي لا نظير له.',
 why:'الفرق بين a وthe هو الفرق بين «أي واحد» و«هذا بالذات». وهو فرق يغيّر المعنى لا الشكل.',
 table:[['أول ذكر','a: I saw a dog.'],['بعد أن صار معروفاً','the: The dog was big.'],['وحيد لا نظير له','the sun, the moon']],
 more:[
  'إذا كان الشيء معروفاً للمستمع نستخدم the: <span class=en>Close the door</span> — باب بعينه يعرفه.',
  'الأشياء الوحيدة تأخذ the دائماً: <span class=en>the sun</span> و<span class=en>the moon</span>.',
  '<b>الأهم:</b> لا نستخدم the مع العموميات: <span class=en>I love music</span> لا <span class=en>the music</span>.'],
 ex:[
  {en:'The sun is very hot today.',ar:'الشمس حارة جداً اليوم.'},
  {en:'Close the door, please.',ar:'أغلق الباب من فضلك.'},
  {en:'I love music.',ar:'أحب الموسيقى.'}],
 bad:['<span class=en>I love the music.</span> ← الصواب <span class=en>I love music.</span> عند الحديث عن الموسيقى عموماً.',
      '<span class=en>Close door.</span> ← الصواب <span class=en>Close the door.</span>'],
 ar:'هنا فخّ معاكس لفخّ a / an. العربية فيها «الـ» وهي قريبة من the، فيطمئن المتعلّم ويستخدمها كثيراً — لكن العربية تضع «الـ» مع العموميات أيضاً: «أحب الموسيقى»، «الصبر جميل». والإنجليزية تحذفها في هذه الحالة تماماً: <span class=en>I love music</span>. فالخطأ الشائع ليس نسيان the، بل الإفراط فيها.'},

{id:'there-is-are',
 t:'There is / There are',
 rule:'نستخدم There is مع المفرد، وThere are مع الجمع، للإخبار بوجود شيء ما.',
 why:'بهذه الصيغة تصف أي مكان: بيتك، حيّك، مكتبك. وهي عمود وصف المكان في المحادثة.',
 table:[['مفرد','There is a bank.'],['جمع','There are two banks.'],['النفي','There is not / There are not'],['السؤال','Is there …? / Are there …?']],
 more:[
  'في السؤال نقدّم الفعل: <span class=en>Is there a bank near here?</span>',
  'في النفي: <span class=en>There is not a pharmacy here.</span> أو اختصاراً <span class=en>There isn\'t</span>.',
  'الاختيار يتبع الاسم الذي بعدها مباشرة، لا عدد الأشياء كلها في الجملة.'],
 ex:[
  {en:'There is a bank on the corner.',ar:'هناك بنك عند الناصية.'},
  {en:'There are two restaurants near the bank.',ar:'هناك مطعمان قرب البنك.'},
  {en:'Is there a pharmacy here?',ar:'هل يوجد صيدلية هنا؟'}],
 bad:['<span class=en>There is two banks.</span> ← الصواب <span class=en>There are two banks.</span>',
      '<span class=en>There are a bank.</span> ← الصواب <span class=en>There is a bank.</span>'],
 ar:'العربية قريبة هنا، فنقول «هناك بنك» و«يوجد بنك». لكن العربية لا تغيّر الصيغة بين المفرد والجمع: «هناك بنك» و«هناك بنوك» بالكلمة نفسها. الإنجليزية تغيّرها حتماً: is للمفرد وare للجمع. فالقرب يخدع — المعنى ينتقل بسهولة، والصيغة لا.'}
];

export const RULE=Object.fromEntries(RULES.map(r=>[r.id,r]));
