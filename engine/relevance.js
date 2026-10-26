/* هل الردّ يُجيب عن السؤال المطروح؟

   كان القياس كلمةً مفتاحية في regex واحد: سؤال «Where are you from?»
   قاعدته /from/i، فيقبل «x from y» إجابةً صحيحة. وقِسنا ذلك فوجدنا ١١٪
   من الإجابات التافهة تمرّ، وفي دورٍ واحد تمرّ كلّها.

   فأضفنا شرطاً ثانياً: **شكل الجواب**. نستنتج نوع السؤال من نصّه، ثم
   نطلب في الردّ قرينةً من جنس ما يُسأل عنه — عددٌ لسؤال «كم»، وزمنٌ
   لسؤال «متى»، ومكانٌ لسؤال «أين».

   وحدود هذا صريحة: ليس فهماً للمعنى، بل قياسٌ لشكل الجواب وقدرِه. يُمسك
   الردّ الفارغ وصدى الكلمة والجواب من جنسٍ آخر، ولا يُمسك جواباً كاذباً
   مبنيّاً بناءً سليماً — وذلك ما لا يُقاس بلا فهم حقيقي للّغة. */

const PLACE = /\b(in|at|on|near|next to|opposite|behind|front of|from|here|there|home|house|street|city|town|country|school|work|office|bank|park|shop|market|hospital|station|airport|hotel|restaurant|cafe|room|floor|egypt|cairo|london|alexandria|upstairs|downstairs|left|right|straight)\b/i;

const TIME = /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|o'?clock|am|pm|morning|afternoon|evening|night|today|tomorrow|yesterday|now|soon|later|early|late|always|usually|sometimes|never|every|after|before|monday|tuesday|wednesday|thursday|friday|saturday|sunday|week|month|year|day|minute|hour|january|february|march|april|may|june|july|august|september|october|november|december|spring|summer|autumn|winter|weekend|birthday)\b/i;

const NUM = /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty|forty|fifty|hundred|none|no|some|many|a few|a lot|both|half|only|just|single|couple)\b/i;

const PERSON = /\b(i|me|my|he|she|him|her|his|we|us|our|they|them|their|you|your|name|mr|mrs|miss|doctor|friend|brother|sister|father|mother|son|daughter|wife|husband|boss|manager|teacher|nobody|somebody|everyone)\b/i;

const REASON = /\b(because|so|to|for|since|as|that's why|i want|i need)\b/i;

const YESNO = /\b(yes|no|yeah|yep|nope|sure|of course|certainly|maybe|not|never|always|i do|i don't|i am|i'm|i can|i can't|i have|i haven't|i will|i would|please|thanks|thank you|sorry)\b/i;

/* المجاملات والتوديع جوابات تامّة في موضعها: من قيل له «Bye» فقال
   «Goodbye» لم يُخطئ، ولا يُطالَب بجملة ذات فعل. */
const COURTESY = /\b(goodbye|bye|thanks|thank you|welcome|cheers|see you|good luck|congratulations|nice to meet you|you too|same to you)\b/i;

/* الأفعال المساعدة وأفعال الحال: وجودها دليل جملةٍ لا كلمةٍ مفردة. */
const CLAUSE = /\b(am|is|are|was|were|do|does|did|don't|doesn't|didn't|have|has|had|can|could|will|would|should|must|may|might|want|need|like|live|work|study|go|come|take|get|think|know)\b/i;

/* نوع السؤال من نصّه. الترتيب مقصود: «how many» قبل «how»، و«what time»
   قبل «what»، وإلّا ابتلع العامُّ الخاصَّ. */
export function questionType(prompt) {
  const p = String(prompt || '').toLowerCase();
  /* أداةُ الصدر تحكم: «Where did you live when you were a child?» سؤالٌ
     عن مكان، وwhen فيه ظرفٌ تابع لا أداةُ سؤال. ولولا هذا لسبق الماسحُ
     العامُّ إلى when فطلب ساعةً من سائلٍ يسأل عن مدينة.
     ويُتخطّى ما يتصدّرها من تلطّف: «Excuse me, where is…». */
  const head = p.replace(/^[^a-z]*(excuse me|sorry|please|hi|hello|ok|so|and|but|tell me)[\s,]+/g, '').trim();
  const lead = head.match(/^(how (?:many|much)|how (?:long|old)|what time|when|where|who|why|how|what|which)\b/);
  if (lead) {
    const w = lead[1];
    if (w === 'how many' || w === 'how much') return 'amount';
    if (w === 'how long' || w === 'how old') return 'duration';
    if (w === 'what time' || w === 'when') return 'time';
    if (w === 'where') return 'place';
    if (w === 'who') return 'person';
    if (w === 'why') return 'reason';
    if (w === 'how') return 'manner';
    if (/\bname\b/.test(p)) return 'person';
    return 'thing';
  }
  /* والمبدوء بفعلٍ ناقصٍ أو مساعد سؤالُ «نعم أو لا»، وإن تلاه when أو
     where في جملةٍ تابعة: «Will you call me when you arrive?» لا يُطلب
     فيه وقت. ويسبق الماسحَ العامَّ للسبب نفسه. */
  if (/^\s*(is|are|am|was|were|do|does|did|can|could|would|will|have|has|had|shall|may|might|should|must)\b/.test(head))
    return 'yesno';

  if (/\bhow (many|much)\b/.test(p)) return 'amount';
  /* «how long» و«how old» جوابهما مدّة لا عدد مجرّد: «since yesterday» جواب تامّ. */
  if (/\bhow (long|old)\b/.test(p)) return 'duration';
  if (/\bwhat time\b|\bwhen\b/.test(p)) return 'time';
  if (/\bwhere\b/.test(p)) return 'place';
  if (/\bwho\b|\bwhat.*\bname\b|\byour name\b/.test(p)) return 'person';
  if (/\bwhy\b/.test(p)) return 'reason';
  if (/\bhow\b/.test(p)) return 'manner';
  if (/\bwhat|which\b/.test(p)) return 'thing';
  if (/^\s*(is|are|am|do|does|did|can|could|would|will|have|has|shall|may|should)\b/.test(p)) return 'yesno';
  /* السؤال الذيلي: الأداة يتبعها ضمير ثم علامة استفهام — «isn’t it?». */
  if (/\b(isn't|aren't|wasn't|don't|doesn't|didn't|won't|can't|right)\s+(it|he|she|they|you|we|i)\s*\?/.test(p)) return 'yesno';
  return 'open';
}

const EVIDENCE = {
  amount: NUM, time: TIME, place: PLACE, person: PERSON,
  duration: new RegExp(NUM.source + '|' + TIME.source + '|\\b(since|for|ago|all|whole)\\b', 'i'),
  reason: REASON, manner: /\b(good|fine|well|bad|ok|okay|great|by|with|slowly|quickly|hard|easy|very)\b|\b(am|is|are)\b/i,
  thing: CLAUSE, yesno: new RegExp(YESNO.source + '|' + CLAUSE.source, 'i'),
  /* المجاملات والتوديع جوابات تامّة في موضعها: من قيل له «Bye» فقال
     «Goodbye» لم يُخطئ، ولا يُطالَب بجملة ذات فعل. */
  open: new RegExp(CLAUSE.source + '|' + COURTESY.source, 'i')
};

const words = s => String(s || '').toLowerCase().replace(/[^\w\s']/g, ' ').split(/\s+/).filter(Boolean);

/* ثلاث درجات لا اثنتان: من تكلّم بما لا صلة له ليس كمن سكت، ومن أعطى
   قرينةً ناقصة ليس كمن أصاب. */
export function relevance(prompt, said, need) {
  const w = words(said);
  if (!w.length) return {level: 'off', why: 'لم تُجب.'};

  const type = questionType(prompt);
  const ev = EVIDENCE[type] || CLAUSE;
  const hasEvidence = ev.test(said);
  const hasNeed = need instanceof RegExp ? need.test(said) : true;

  /* القرينة دليلٌ يَكفي لا شرطٌ يُشترط: قوائم الكلمات لا تُحيط بالّلغة،
     فلو جعلناها شرطاً لرفضنا «I usually visit my friends» جواباً عن «أين
     تذهب؟» — وردُّ الصواب خطأً أسوأ من قبول الخطأ صواباً، لأنّه يُشكّك
     المتعلّم فيما أحسن فيه. فمن جاء بقرينة أو بجملةٍ ذات قدر فقد أجاب. */
  /* كلمتان تكفيان: «Thank you» و«Return, please» جوابان تامّان في موضعهما،
     والكلمة الواحدة تبقى صدى إلا في نعم/لا والعدد. */
  /* والعدد والزمن وحدهما يُشترط فيهما الدليل اشتراطاً، لأنّ ألفاظهما
     محصورة تُعدّ: من سُئل «كم» فلم يذكر عدداً لم يُجب. أمّا المكان
     والشخص والشيء فألفاظها لا تُحصى، فنكتفي فيها بالقدر. */
  const strict = type === 'amount' || type === 'time' || type === 'duration';
  const substance = hasEvidence || (!strict && w.length >= 2);

  /* الكلمة الواحدة صدى لا جواب، إلا في نعم/لا والعدد والمدّة والمجاملة:
     من سُئل «Where are you from?» فقال «from» أعاد كلمة السؤال ولم يُجب. */
  const oneWordOk = type === 'yesno' || type === 'amount' || type === 'duration' || COURTESY.test(said);
  if (w.length < 2 && !oneWordOk)
    return {level: 'off', why: 'كلمة واحدة لا تكفي هنا. ' + missing(type)};

  if (hasNeed && substance) return {level: 'on', why: null};
  if (hasNeed) return {level: 'weak', why: strict ? missing(type) : 'جوابك قصير — أتمِمه جملةً.'};
  if (substance) return {level: 'weak', why: 'جوابك جملةٌ تامّة لكنّه لم يمسّ ما سُئلت عنه.'};
  return {level: 'off', why: missing(type)};
}

function missing(type) {
  return {
    amount: 'السؤال عن العدد — اذكر رقماً أو مقداراً.',
    time: 'السؤال عن الوقت — اذكر ساعةً أو يوماً.',
    duration: 'السؤال عن المدّة — اذكر كم من الوقت أو متى بدأ.',
    place: 'السؤال عن المكان — اذكر مكاناً أو حرف جرٍّ للمكان.',
    person: 'السؤال عن شخص — اذكر اسماً أو صلة قرابة.',
    reason: 'السؤال عن السبب — ابدأ بـ because أو to.',
    manner: 'السؤال عن الحال — صِف بصفة أو بجملة تامّة.',
    thing: 'أجب بجملة فيها فعل.',
    yesno: 'ابدأ بـ yes أو no ثم أكمل.',
    open: 'أجب بجملة تامّة فيها فعل.'
  }[type] || 'أجب بجملة تامّة.';
}

export const isRelevant = (prompt, said, need) => relevance(prompt, said, need).level === 'on';
