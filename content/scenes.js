/* مشاهد المحادثة الحيّة: جملة المحاور، وregex للإجابة المقبولة، والإجابة النموذجية. */

export const SCENES=[
{t:'التعارف',cat:'اجتماعي',turns:[
{p:"Hi! I'm Sara. What's your name?",need:/name|i am|i'm|my name/i,model:'My name is Ahmed.'},
{p:'Nice to meet you! Where are you from?',need:/from/i,model:'I am from Egypt.'},
{p:'Oh, really? What do you do?',need:/i am|i'm|i work|i study|student|teacher|engineer|doctor|nurse|driver|manager/i,model:'I am a teacher.'},
{p:'That sounds interesting! Do you like your job?',need:/yes|no|like|love|enjoy|hate|don't|do not/i,model:'Yes, I like it very much.'}]},
{t:'المطعم',cat:'اجتماعي',turns:[
{p:'Welcome! What would you like to order?',need:/like|want|have|please|can i/i,model:'I would like a salad, please.'},
{p:'Would you like something to drink?',need:/yes|no|water|juice|tea|coffee|drink|thanks|thank you/i,model:"No, thanks. I don't want a drink."},
{p:'Do you want it here or to go?',need:/here|go|take|away|stay/i,model:'Here, please. Thank you.'}]},
{t:'درس 1.1: هل أنت طالب؟',cat:'درس',les:'1.1',turns:[
{p:'Hi! Are you a student?',need:/yes|no|i am|i'm|not/i,model:'Yes, I am a student.'},
{p:'Is your friend a student too?',need:/yes|no|he is|she is|he's|she's|not/i,model:'Yes, he is a student.'},
{p:'Are you and your friends at school today?',need:/yes|no|we are|we're|i am|i'm|not/i,model:'Yes, we are at school today.'}]},
{t:'درس 1.2: من هذا؟',cat:'درس',les:'1.2',turns:[
{p:'Who is that man over there?',need:/he is|he's|that is|that's|he|my/i,model:'He is my brother.'},
{p:'Is he a student?',need:/yes|no|he is|he's|not|isn't/i,model:'No, he is not a student. He is a teacher.'},
{p:'Is your sister a teacher too?',need:/yes|no|she is|she's|not/i,model:'Yes, she is a teacher too.'}]},
{t:'درس 1.3: أسئلة وأجوبة',cat:'درس',les:'1.3',turns:[
{p:'Are you ready for the test?',need:/yes|no|i am|i'm|not/i,model:'Yes, I am ready.'},
{p:'Is your room clean?',need:/yes|no|it is|it's|not/i,model:'Yes, it is clean.'},
{p:'Are your friends coming to the party?',need:/yes|no|they are|they're|not/i,model:'Yes, they are coming.'}]},
{t:'درس 2.1: روتينك اليومي',cat:'درس',les:'2.1',turns:[
{p:'What do you do in the morning?',need:/i |i'm|work|go|study|wake|drink|eat|have|usually/i,model:'I wake up early and drink coffee.'},
{p:'Do you work or study?',need:/work|study|both|i am|yes|no/i,model:'I work in an office.'},
{p:'Where do you go on weekends?',need:/go|visit|stay|home|park|friends/i,model:'I usually visit my friends.'}]},
{t:'درس 2.2: أخبرني عن أهلك',cat:'درس',les:'2.2',turns:[
{p:'Tell me about your family. Do you have a brother?',need:/yes|no|have|i have|don't/i,model:'Yes, I have a brother.'},
{p:'What does your brother do?',need:/he |works|studies|plays|goes|teaches|is a|my brother/i,model:'He works in a bank.'},
{p:'Does your sister live here too?',need:/yes|no|she|lives|doesn't/i,model:'No, she lives in another city.'}]},
{t:'درس 2.3: ماذا لا تفعل؟',cat:'درس',les:'2.3',turns:[
{p:'Do you like fish?',need:/no|yes|i don't|i do|don't|do/i,model:"No, I don't like fish."},
{p:'Does your brother drink coffee?',need:/no|yes|he doesn't|he does|doesn't|does/i,model:"No, he doesn't drink coffee."},
{p:'Do you and your friends play football?',need:/yes|no|we|don't|do/i,model:"No, we don't play football."}]},
{t:'درس 3.1: في المقهى',cat:'درس',les:'3.1',turns:[
{p:'What would you like to drink?',need:/a |an |coffee|tea|juice|water|please|like/i,model:'I would like a coffee, please.'},
{p:'Would you like a sandwich too?',need:/yes|no|a |an |sandwich|thanks/i,model:'Yes, I would like a sandwich, please.'},
{p:'Anything else?',need:/no|thanks|nothing|that's all|that is all|apple|a /i,model:"No, thanks. That is all."}]},
{t:'درس 3.2: في الشارع',cat:'درس',les:'3.2',turns:[
{p:'Excuse me, where is the post office?',need:/it is|it's|next|near|on|across|straight|left|right|there/i,model:'It is across from the bank.'},
{p:'Is it far from here?',need:/yes|no|far|close|near|not/i,model:'No, it is very close.'},
{p:'Thanks! Is the bank open today?',need:/yes|no|it is|it's|open|not/i,model:'Yes, it is open today.'}]},
{t:'درس 3.3: في البيت',cat:'درس',les:'3.3',turns:[
{p:'Is there a bank near here?',need:/yes|no|there is|there's|there are|not/i,model:'Yes, there is a bank on the corner.'},
{p:'Are there any restaurants near the bank?',need:/yes|no|there are|there is|there's|not/i,model:'Yes, there are two restaurants.'},
{p:'Is there a pharmacy too?',need:/yes|no|there is|there's|not/i,model:'No, there is not a pharmacy here.'}]},
{t:'الاتجاهات',cat:'سفر',turns:[
{p:'Excuse me, where is the bank?',need:/it is|it's|there|next|near|across|left|right|straight|corner|on the/i,model:'It is next to the park.'},
{p:'Is it far from here?',need:/yes|no|far|close|near|walk|minutes|not/i,model:'No, it is very close.'},
{p:'Thanks a lot! Have a nice day.',need:/thank|you too|bye|same|nice/i,model:'Thank you, you too!'}]},
{t:'المواصلات العامة',cat:'يومي',turns:[
{p:'Excuse me, does this bus go to the city center?',need:/yes|no|does|doesn't|it does|think|sure/i,model:'Yes, it does.'},
{p:'How much is the ticket?',need:/pound|dollar|it is|it's|\d|two|three|five|ten|don't know/i,model:'It is ten pounds.'},
{p:'Where do you get off?',need:/i get off|get off|at|station|stop|next|near/i,model:'I get off at the next stop.'},
{p:'Thank you. Have a good trip!',need:/thank|you too|same|bye|nice/i,model:'Thank you, you too!'}]},

{t:'في النادي',cat:'اجتماعي',turns:[
{p:'Hi! Do you come here every day?',need:/yes|no|i come|every|sometimes|twice|three|week|don't/i,model:'No, I come here three times a week.'},
{p:'What do you usually do first?',need:/i |run|walk|swim|lift|start|warm|usually/i,model:'I usually run for twenty minutes.'},
{p:'Do you like swimming?',need:/yes|no|i like|i love|don't|hate|can't swim|can/i,model:'Yes, I like swimming very much.'},
{p:'Great. See you tomorrow!',need:/see you|bye|tomorrow|thank|too/i,model:'See you tomorrow!'}]},

{t:'في المدرسة',cat:'اجتماعي',turns:[
{p:'Good morning! Are you a new student here?',need:/yes|no|i am|i'm|new|not/i,model:'Yes, I am a new student.'},
{p:'What is your favorite subject?',need:/english|math|science|history|art|sport|favorite|i like|my favorite/i,model:'My favorite subject is English.'},
{p:'Do you have homework today?',need:/yes|no|i have|i don't|homework|much|a lot/i,model:'Yes, I have a lot of homework today.'},
{p:'Good luck with it!',need:/thank|thanks|you too|same/i,model:'Thank you!'}]},

{t:'في السوبر ماركت',cat:'تسوّق',turns:[
{p:'Excuse me, where is the milk?',need:/it is|it's|there|next|near|aisle|back|over|don't know/i,model:'It is in the back, next to the cheese.'},
{p:'Do you have fresh bread?',need:/yes|no|we have|i think|there is|there are|sorry|don't/i,model:'Yes, there is fresh bread at the front.'},
{p:'How much is this water?',need:/pound|dollar|it is|it's|\d|two|three|five/i,model:'It is five pounds.'},
{p:'Thank you for your help.',need:/welcome|no problem|any time|pleasure|thank/i,model:"You're welcome."}]},

{t:'عند الطبيب',cat:'صحة',turns:[
{p:'Good morning. What is the problem?',need:/i have|my |hurt|pain|headache|cold|fever|sick|not feel/i,model:'I have a headache and a fever.'},
{p:'How long have you felt like this?',need:/day|days|week|yesterday|since|two|three|today|morning/i,model:'Since yesterday morning.'},
{p:'Do you take any medicine?',need:/yes|no|i take|i don't|medicine|nothing|only/i,model:"No, I don't take any medicine."},
{p:'All right. Rest and drink water.',need:/thank|ok|okay|i will|all right|yes/i,model:'Thank you, doctor.'}]},

{t:'في الفندق',cat:'سفر',turns:[
{p:'Good evening. Do you have a reservation?',need:/yes|no|i have|my name|reservation|book|not/i,model:'Yes, I have a reservation. My name is Ahmed.'},
{p:'How many nights are you staying?',need:/night|nights|\d|two|three|four|five|one|week/i,model:'Three nights, please.'},
{p:'Is breakfast included?',need:/yes|no|included|it is|it's|extra|i think|ask/i,model:'Yes, breakfast is included.'},
{p:'Here is your key. Enjoy your stay!',need:/thank|thanks|you too|great|nice/i,model:'Thank you very much!'}]},

{t:'مع الجيران',cat:'يومي',turns:[
{p:'Hello! Are you our new neighbor?',need:/yes|no|i am|i'm|new|move|not/i,model:'Yes, I am. I moved here last week.'},
{p:'Welcome! Do you live alone?',need:/yes|no|i live|with|family|alone|wife|husband|brother/i,model:'No, I live with my family.'},
{p:'If you need anything, just ask.',need:/thank|thanks|kind|nice|appreciate|sure/i,model:'Thank you, that is very kind.'}]},

{t:'في العمل',cat:'عمل',turns:[
{p:'Good morning! How is the new project?',need:/good|fine|well|hard|busy|it is|it's|going|difficult|easy/i,model:'It is going well, thank you.'},
{p:'Do you need any help?',need:/yes|no|i need|i don't|help|fine|thank|maybe/i,model:'No thanks, I am fine for now.'},
{p:'When do you finish it?',need:/today|tomorrow|week|monday|friday|finish|by|next|day/i,model:'I finish it on Thursday.'},
{p:'Perfect. Keep up the good work!',need:/thank|thanks|sure|i will|ok/i,model:'Thank you!'}]},

{t:'في المقهى مع صديق',cat:'يومي',turns:[
{p:'What are you drinking?',need:/coffee|tea|juice|water|i am|i'm|drinking|having/i,model:'I am drinking coffee.'},
{p:'How was your weekend?',need:/good|great|nice|quiet|busy|it was|boring|fine|bad/i,model:'It was very nice, thank you.'},
{p:'What did you do?',need:/i |went|stayed|visited|watched|played|slept|read|nothing/i,model:'I visited my family.'},
{p:'That sounds lovely.',need:/yes|thank|it was|indeed|true|really/i,model:'Yes, it was!'}]},

{t:'في الشارع: تطلب المساعدة',cat:'يومي',turns:[
{p:'You look lost. Can I help you?',need:/yes|no|please|i am|i'm|lost|looking|where|thank/i,model:'Yes please, I am looking for the station.'},
{p:'It is not far. Do you want to walk?',need:/yes|no|i want|walk|taxi|bus|far|how long|prefer/i,model:'Yes, I want to walk.'},
{p:'Go straight, then turn left.',need:/thank|straight|left|ok|got it|i see|understand/i,model:'Straight, then left. Thank you!'}]},
{t:'في المطار',cat:'سفر',turns:[
{p:'Good morning! Where are you flying today?',need:/i am|i'm|to |fly|going|cairo|london|dubai|home/i,model:'I am flying to Cairo.'},
{p:'Do you have any bags to check in?',need:/yes|no|i have|one|two|bag|bags|only|just/i,model:'Yes, I have one bag.'},
{p:'Is this your first time here?',need:/yes|no|it is|it's|first|second|not|been/i,model:'No, it is not my first time.'},
{p:'Here is your boarding pass. Gate twelve.',need:/thank|thanks|gate|twelve|got it|ok/i,model:'Thank you very much!'}]},

{t:'في الصيدلية',cat:'صحة',turns:[
{p:'Hello, how can I help you?',need:/i need|i have|do you have|medicine|something for|looking|please/i,model:'I need something for a headache.'},
{p:'Do you have a prescription?',need:/yes|no|i have|i don't|prescription|doctor|not/i,model:"No, I don't have one."},
{p:'Take one tablet after food.',need:/thank|ok|okay|how many|i see|got it|day/i,model:'Thank you. How many times a day?'},
{p:'Twice a day. Get well soon!',need:/thank|thanks|bye|kind|much/i,model:'Thank you very much!'}]},

{t:'عند طبيب الأسنان',cat:'صحة',turns:[
{p:'Which tooth hurts?',need:/this|that|back|front|left|right|top|bottom|tooth|here/i,model:'This tooth at the back.'},
{p:'How long has it hurt?',need:/day|days|week|since|two|three|month|yesterday|long/i,model:'For three days.'},
{p:'Do you brush twice a day?',need:/yes|no|i brush|i do|i don't|once|twice|every/i,model:'Yes, I brush twice a day.'},
{p:'Good. We will clean it today.',need:/thank|ok|okay|hurt|will it|fine|good/i,model:'Thank you, doctor.'}]},

{t:'في البنك',cat:'تسوّق',turns:[
{p:'Good morning. How can I help you?',need:/i want|i need|i would|open|account|money|change|please/i,model:'I want to open an account.'},
{p:'Do you have your ID with you?',need:/yes|no|i have|here|it is|it's|forgot|passport/i,model:'Yes, here it is.'},
{p:'Thank you. Please sign here.',need:/ok|okay|sure|here|thank|yes|done/i,model:'Sure, here you are.'},
{p:'All done. Your card will come by post.',need:/thank|how long|when|days|week|ok/i,model:'Thank you. How long does it take?'}]},

{t:'شراء ملابس',cat:'تسوّق',turns:[
{p:'Can I help you find something?',need:/yes|no|i am|i'm|looking|i need|i want|shirt|jacket|shoes|just/i,model:'Yes, I am looking for a shirt.'},
{p:'What size do you wear?',need:/small|medium|large|size|\d|i wear|i don't know|think/i,model:'I wear a medium.'},
{p:'Would you like to try it on?',need:/yes|no|please|i would|where|can i|sure|not/i,model:'Yes please, where is the fitting room?'},
{p:'It is over there on the right.',need:/thank|thanks|ok|got it|right/i,model:'Thank you!'}]},

{t:'في متجر الهواتف',cat:'تسوّق',turns:[
{p:'Hi! Are you looking for a new phone?',need:/yes|no|i am|i'm|looking|my phone|broken|new|just/i,model:'Yes, my phone is broken.'},
{p:'What is the problem with it?',need:/screen|battery|it doesn't|does not|slow|water|broken|won't|not work/i,model:'The battery does not work.'},
{p:'We can fix it or sell you a new one.',need:/fix|new|how much|cost|price|prefer|i want|cheaper/i,model:'How much does it cost to fix?'},
{p:'About two hundred pounds.',need:/ok|okay|thank|expensive|cheap|i will|think|fine/i,model:'Okay, I will think about it.'}]},

{t:'سيارة أجرة',cat:'سفر',turns:[
{p:'Where to?',need:/to |airport|station|street|hotel|home|center|please/i,model:'To the airport, please.'},
{p:'Are you in a hurry?',need:/yes|no|a little|i am|i'm|not|flight|time|plenty/i,model:'Yes, a little. My flight is at six.'},
{p:'No problem. We will be there in twenty minutes.',need:/thank|great|good|ok|perfect|nice/i,model:'Great, thank you!'},
{p:'Here we are. That is fifty pounds.',need:/here|thank|keep|change|card|cash|you are/i,model:'Here you are. Keep the change.'}]},

{t:'في محطة القطار',cat:'سفر',turns:[
{p:'Next, please. Where are you going?',need:/to |i am|i'm|going|alexandria|cairo|ticket|please/i,model:'I am going to Alexandria.'},
{p:'One way or return?',need:/one way|return|both|single|round|please/i,model:'Return, please.'},
{p:'The next train leaves at nine.',need:/thank|ok|platform|which|where|time|nine|good/i,model:'Thank you. Which platform?'},
{p:'Platform three. Have a good trip!',need:/thank|thanks|you too|bye|three/i,model:'Thank you, you too!'}]},

{t:'مكالمة هاتفية',cat:'عمل',turns:[
{p:'Hello, this is Sara speaking.',need:/hello|hi|this is|it's|i am|speaking|my name/i,model:'Hello Sara, this is Ahmed.'},
{p:'Hi Ahmed! How can I help you?',need:/i want|i need|i am calling|about|question|ask|calling/i,model:'I am calling about the meeting.'},
{p:'Of course. It is at ten tomorrow.',need:/thank|ok|ten|tomorrow|got it|see you|perfect/i,model:'Perfect, see you then.'},
{p:'See you tomorrow. Bye!',need:/bye|goodbye|see you|thank|take care/i,model:'Goodbye!'}]},

{t:'مقابلة عمل',cat:'عمل',turns:[
{p:'Tell me a little about yourself.',need:/i am|i'm|my name|i work|i study|years|i have/i,model:'I am a teacher with five years of experience.'},
{p:'Why do you want this job?',need:/because|i want|i like|i love|learn|grow|good|interest/i,model:'Because I want to learn and grow.'},
{p:'What are you good at?',need:/i am|i'm|good at|i can|strong|work|team|people|english/i,model:'I am good at working with people.'},
{p:'Thank you. We will call you next week.',need:/thank|thanks|look forward|ok|great|waiting/i,model:'Thank you for your time.'}]},

{t:'عند الاستقبال',cat:'عمل',turns:[
{p:'Good morning. Do you have an appointment?',need:/yes|no|i have|at |o'clock|appointment|with|not/i,model:'Yes, I have an appointment at ten.'},
{p:'May I have your name, please?',need:/\b(my name|i am|i'm|it is|it's)\b/i,model:'My name is Ahmed Ali.'},
{p:'Please take a seat. She will come soon.',need:/thank|ok|sure|fine|thanks/i,model:'Thank you.'}]},

{t:'عند الحلاق',cat:'يومي',turns:[
{p:'How would you like your hair?',need:/short|shorter|little|same|style|cut|just|not too/i,model:'Short on the sides, please.'},
{p:'Do you want me to cut the top too?',need:/yes|no|a little|just|please|don't|not|short/i,model:'Just a little, please.'},
{p:'Is this good?',need:/yes|no|perfect|good|great|little more|shorter|fine|thank/i,model:'Yes, it is perfect. Thank you!'}]},

{t:'الحديث عن الطقس',cat:'يومي',turns:[
{p:'Nice day today, isn\'t it?',need:/yes|no|it is|it's|very|nice|beautiful|hot|cold|too/i,model:'Yes, it is very nice.'},
{p:'Is it always this hot here in summer?',need:/yes|no|it is|it's|always|sometimes|usually|hotter|very/i,model:'Yes, it is usually hot in summer.'},
{p:'I prefer the winter. And you?',need:/i prefer|i like|me too|winter|summer|spring|same|also/i,model:'I prefer the winter too.'}]},

{t:'في البيت مع العائلة',cat:'يومي',turns:[
{p:'What are you doing?',need:/i am|i'm|watching|reading|cooking|studying|working|nothing|eating/i,model:'I am reading a book.'},
{p:'Are you hungry? Dinner is ready.',need:/yes|no|i am|i'm|hungry|very|not|later|minute|coming/i,model:'Yes, I am very hungry.'},
{p:'Can you help me with the table?',need:/yes|no|sure|of course|i can|coming|in a|certainly/i,model:'Sure, I am coming.'},
{p:'Thank you, that is kind.',need:/welcome|no problem|any time|of course|pleasure/i,model:"You're welcome."}]},

{t:'دعوة صديق',cat:'اجتماعي',turns:[
{p:'Are you free on Friday?',need:/yes|no|i am|i'm|free|busy|think|why|maybe|work/i,model:'Yes, I am free on Friday.'},
{p:'Would you like to come for dinner?',need:/yes|no|i would|love|like|sure|thank|sorry|can't/i,model:'Yes, I would love to.'},
{p:'Great! Come at seven.',need:/ok|seven|see you|thank|great|perfect|bring/i,model:'Perfect, see you at seven.'},
{p:'Do you eat fish?',need:/yes|no|i eat|i don't|i love|allergic|everything|anything/i,model:"Yes, I eat fish. I don't eat meat."}]},

{t:'في المكتبة',cat:'اجتماعي',turns:[
{p:'Good afternoon. Are you a member?',need:/yes|no|i am|i'm|member|not|first|new|how/i,model:'No, I am not a member yet.'},
{p:'You can join today. Do you have ID?',need:/yes|no|i have|here|it is|forgot|passport/i,model:'Yes, I have my ID here.'},
{p:'How many books would you like?',need:/\d|one|two|three|four|five|books|just|only/i,model:'Three books, please.'},
{p:'You can keep them for two weeks.',need:/thank|ok|two|weeks|got it|fine|great/i,model:'Thank you very much.'}]}
];
