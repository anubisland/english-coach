/* مشاهد اختبار المحادثة — محجوزة.

   هذه المشاهد **لا تظهر في التدريب إطلاقاً**، وهذا شرط صحّة الاختبار:
   لو امتحنّاه في مشهد تدرّب عليه لقِسنا حفظه لا قدرته على الكلام.
   لذلك لا يستوردها views/speak.js ولا engine/chat.js، بل engine/exam-convo.js وحده.

   كل مشهد ثمانية أدوار متصلة في مكان عام يحتاجه المتعلّم فعلاً.
   وكل دور فيه:
     p      كلام المحاور
     need   ما يجعل الرد **ذا صلة** بالسؤال — لا ما يجعله صحيحاً نحوياً.
            الصلة محور، والنحو محور آخر، ولا نخلط بينهما.
     model  إجابة نموذجية تُعرض في التقرير بعد انتهاء الاختبار لا أثناءه
     want   كلمات يُتوقّع ظهورها، تُستعمل في قياس وضوح النطق */
export const EXAM_SCENES = [
{id:'x-air', t:'في المطار', place:'مكتب تسجيل الركاب', turns:[
 {p:'Good morning. May I see your passport, please?',
  need:/here|yes|sure|of course|passport|my/i, model:'Yes, of course. Here is my passport.', want:['passport','here']},
 {p:'Thank you. Where are you travelling to today?',
  need:/to |going|travel|cairo|london|dubai|home|city|country/i, model:'I am travelling to London.', want:['travelling','London']},
 {p:'How many bags are you checking in?',
  need:/one|two|three|four|bag|none|no bag|only|just|\d/i, model:'Two bags, please.', want:['two','bags']},
 {p:'Did you pack your bags yourself?',
  need:/yes|no|i did|myself|my wife|my husband|my family/i, model:'Yes, I packed them myself.', want:['yes','myself']},
 {p:'Would you like a window seat or an aisle seat?',
  need:/window|aisle|any|either|don't mind|doesn't matter/i, model:'A window seat, please.', want:['window','seat']},
 {p:'Your flight leaves from gate twelve. Do you know where that is?',
  need:/yes|no|where|i don't|not sure|show|tell|help|how/i, model:'No, I do not. Where is gate twelve?', want:['gate','where']},
 {p:'It is on the second floor, past the shops. Is this your first time flying?',
  need:/yes|no|first|second|many|often|times|before|never/i, model:'No, I have flown before.', want:['first','time']},
 {p:'Have a good flight! Do you need anything else?',
  need:/no|yes|thank|thanks|that's all|nothing|help/i, model:'No, thank you. That is all.', want:['thank','all']}]},

{id:'x-clinic', t:'في العيادة', place:'استقبال الطبيب', turns:[
 {p:'Good afternoon. Do you have an appointment?',
  need:/yes|no|appointment|at |o'clock|\d|first time/i, model:'Yes, I have an appointment at four.', want:['appointment','yes']},
 {p:'What is your name, please?',
  need:/name|i am|i'm|my/i, model:'My name is Ahmed Hassan.', want:['name']},
 {p:'Thank you. What is the problem today?',
  need:/pain|hurt|sick|ill|cold|fever|head|stomach|back|throat|tired|cough/i,
  model:'I have a bad headache.', want:['have','headache']},
 {p:'I am sorry to hear that. How long have you had it?',
  need:/day|days|week|weeks|month|since|yesterday|morning|long time|\d/i,
  model:'For three days.', want:['three','days']},
 {p:'Are you taking any medicine for it?',
  need:/yes|no|medicine|pill|tablet|nothing|not taking|don't/i, model:'No, I am not taking anything.', want:['not','taking']},
 {p:'Do you have any other health problems?',
  need:/yes|no|nothing|none|healthy|fine|diabetes|blood|heart|asthma/i, model:'No, I am healthy.', want:['healthy','no']},
 {p:'The doctor will see you in ten minutes. Would you like to sit down?',
  need:/yes|no|thank|thanks|ok|okay|sure|i will|sit/i, model:'Yes, thank you.', want:['thank']},
 {p:'Here is your number. Do you have any questions?',
  need:/no|yes|how|when|where|question|thank|nothing/i, model:'No, I do not have any questions. Thank you.', want:['questions','thank']}]},

{id:'x-bank', t:'في البنك', place:'شبّاك الخدمة', turns:[
 {p:'Good morning. How can I help you today?',
  need:/want|would like|need|open|account|money|card|help|please/i,
  model:'I would like to open an account, please.', want:['open','account']},
 {p:'Certainly. Do you have your ID with you?',
  need:/yes|no|here|id|passport|card|i have|forgot/i, model:'Yes, here it is.', want:['yes','here']},
 {p:'Thank you. What is your address?',
  need:/street|road|city|live|i am|number|cairo|address|\d/i, model:'I live on Green Street, number ten.', want:['live','street']},
 {p:'And do you work here in the city?',
  need:/yes|no|work|study|teacher|engineer|doctor|student|shop|office|company/i,
  model:'Yes, I work in an office near here.', want:['work','office']},
 {p:'Would you like a bank card with the account?',
  need:/yes|no|card|please|want|need|don't/i, model:'Yes, please.', want:['yes','please']},
 {p:'The card will arrive in one week. Is that all right?',
  need:/yes|no|ok|okay|fine|all right|good|sure|problem/i, model:'Yes, that is fine.', want:['fine','yes']},
 {p:'Please sign here. Do you understand everything?',
  need:/yes|no|understand|clear|repeat|again|sorry|explain/i, model:'Yes, I understand.', want:['understand']},
 {p:'Thank you. Do you need anything else today?',
  need:/no|yes|thank|thanks|that's all|nothing/i, model:'No, thank you. That is all.', want:['thank','all']}]},

{id:'x-shop', t:'في السوبرماركت', place:'قسم الخضار والكاشير', turns:[
 {p:'Excuse me, do you need any help?',
  need:/yes|no|looking|want|need|where|find|thank/i, model:'Yes, I am looking for the rice.', want:['looking','for']},
 {p:'The rice is in aisle three. Are you looking for anything else?',
  need:/yes|no|also|too|need|want|bread|milk|eggs|sugar|oil|that's all/i,
  model:'Yes, I also need some milk.', want:['need','milk']},
 {p:'The milk is at the back, next to the eggs. How much do you need?',
  need:/one|two|three|litre|liter|bottle|box|some|a little|a lot|\d/i,
  model:'Two bottles, please.', want:['two','bottles']},
 {p:'All right. Is this everything?',
  need:/yes|no|that's all|everything|also|one more|need/i, model:'Yes, that is everything.', want:['everything','yes']},
 {p:'Your total is fifteen pounds. How would you like to pay?',
  need:/card|cash|money|pay|by |with /i, model:'By card, please.', want:['card','please']},
 {p:'Do you have a shopping bag?',
  need:/yes|no|bag|have|need|want|one|please/i, model:'No, I need one, please.', want:['need','bag']},
 {p:'Here you are. Would you like your receipt?',
  need:/yes|no|receipt|please|thank|don't need/i, model:'Yes, please.', want:['yes','please']},
 {p:'Thank you for shopping with us. Have a good day!',
  need:/thank|thanks|you too|same|good|bye|day/i, model:'Thank you. You too!', want:['thank','you']}]},

{id:'x-hotel', t:'في الفندق', place:'مكتب الاستقبال', turns:[
 {p:'Good evening. Are you checking in tonight?',
  need:/yes|no|reservation|booking|booked|name|room|check/i, model:'Yes, I have a reservation.', want:['yes','reservation']},
 {p:'Under what name, please?',
  need:/name|under|i am|i'm|my/i, model:'Under the name Ahmed Hassan.', want:['name','under']},
 {p:'I have it here. How many nights are you staying?',
  need:/one|two|three|four|five|night|week|\d/i, model:'Three nights.', want:['three','nights']},
 {p:'And is anyone staying with you?',
  need:/yes|no|alone|my wife|my husband|my family|friend|one|two|children|\d/i,
  model:'Yes, my wife is with me.', want:['wife','with']},
 {p:'Your room is on the fourth floor. Do you need help with your bags?',
  need:/yes|no|thank|thanks|help|fine|i can|please/i, model:'No, thank you. I can carry them.', want:['thank','carry']},
 {p:'Breakfast is from seven to ten. What time would you like to eat?',
  need:/at |o'clock|seven|eight|nine|ten|early|late|morning|\d/i, model:'At eight, please.', want:['eight','please']},
 {p:'Is there anything you need in the room?',
  need:/yes|no|need|want|water|towel|wifi|wi-fi|internet|nothing|thank/i,
  model:'Yes, could I have the wifi password?', want:['wifi','have']},
 {p:'Of course, it is on the card. Enjoy your stay!',
  need:/thank|thanks|you|bye|good|great/i, model:'Thank you very much.', want:['thank','much']}]},

{id:'x-school', t:'في مكتب المدرسة', place:'سكرتارية المدرسة', turns:[
 {p:'Good morning. Are you here about one of our pupils?',
  need:/yes|no|want|would like|need|ask|my son|my daughter|about|help|please/i,
  model:'I would like to ask about my son.', want:['ask','about']},
 {p:'Of course. What is your son\'s name?',
  need:/name|is |his|my son|call/i, model:'His name is Omar.', want:['name','his']},
 {p:'And which class is he in?',
  need:/class|grade|year|\d|one|two|three|four|five|six|don't know/i, model:'He is in class four.', want:['class','four']},
 {p:'Thank you. What would you like to know?',
  need:/how|what|when|why|is he|does he|homework|exam|result|behaviour|english|study/i,
  model:'How is he doing in English?', want:['how','English']},
 {p:'He is doing well, but he needs to read more at home. Can he do that?',
  need:/yes|no|can|will|sure|of course|i will|we|try|difficult/i,
  model:'Yes, we will read together every day.', want:['yes','read']},
 {p:'That is very good. Do you have any other children here?',
  need:/yes|no|one|two|daughter|son|only|just|\d/i, model:'Yes, I have a daughter in class two.', want:['daughter','class']},
 {p:'The parents\' meeting is next Tuesday. Can you come?',
  need:/yes|no|can|cannot|can't|work|busy|sure|what time|when/i, model:'Yes, I can come. What time is it?', want:['come','time']},
 {p:'At five in the afternoon. Is there anything else?',
  need:/no|yes|thank|thanks|that's all|nothing|one more/i, model:'No, thank you for your time.', want:['thank','time']}]}
];

export const EXAM_SCENE = Object.fromEntries(EXAM_SCENES.map(s => [s.id, s]));
