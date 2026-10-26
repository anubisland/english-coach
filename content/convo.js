/* مشاهد الحوار المرتبطة بالوحدات. */

export const CONVO=[
{id:'c7',u:4,t:'في السوق: كم وكم ثمنه',turns:[
{p:`How many apples would you like?`,o:[`I would like six apples.`,`I would like six apple.`,`I like six apples would.`],a:0,tip:`العدد أكبر من واحد فنجمع: apples`},
{p:`And how much is this box?`,o:[`This box is ten pounds.`,`These box is ten pounds.`,`This boxes is ten pounds.`],a:0,tip:`المفرد يأخذ this والفعل is`},
{p:`Is this your bag?`,o:[`Yes, it is my bag.`,`Yes, it is me bag.`,`Yes, it is mine bag.`],a:0,tip:`قبل الاسم نستخدم my لا me`}]},
{id:'c8',u:4,t:'التعارف على العائلة',turns:[
{p:`Have you got any brothers?`,o:[`Yes, I have got two brothers.`,`Yes, I have got two brother.`,`Yes, I has got two brothers.`],a:0,tip:`مع I نستخدم have، والعدد يستلزم الجمع`},
{p:`What are their names?`,o:[`Their names are Omar and Ali.`,`Their name are Omar and Ali.`,`Them names are Omar and Ali.`],a:0,tip:`الجمع names، وصفة الملكية their`},
{p:`Is that your sister over there?`,o:[`Yes, that is my sister.`,`Yes, those is my sister.`,`Yes, that is me sister.`],a:0,tip:`المفرد البعيد يأخذ that`}]},
{id:'c9',u:5,t:'طلب المساعدة',turns:[
{p:`Can you help me, please?`,o:[`Yes, I can help you.`,`Yes, I can to help you.`,`Yes, I cans help you.`],a:0,tip:`بعد can الفعل مجرّد بلا to وبلا s`},
{p:`Can your brother drive?`,o:[`Yes, he can drive.`,`Yes, he cans drive.`,`Yes, he can drives.`],a:0,tip:`can لا تتغيّر مع he`},
{p:`Please don't be late tomorrow.`,o:[`I won't be late, I promise.`,`I don't be late, I promise.`,`I no be late, I promise.`],a:0,tip:`النفي للمستقبل بـ won't`}]},
{id:'c10',u:5,t:'ماذا يحدث الآن؟',turns:[
{p:`What are you doing?`,o:[`I am waiting for the bus.`,`I waiting for the bus.`,`I am wait for the bus.`],a:0,tip:`المضارع المستمرّ: am ثم الفعل + ing`},
{p:`What time does the bus come?`,o:[`It comes at a quarter past eight.`,`It comes on a quarter past eight.`,`It comes in a quarter past eight.`],a:0,tip:`الساعة تأخذ at`},
{p:`Do you travel on Friday?`,o:[`Yes, I travel on Friday.`,`Yes, I travel in Friday.`,`Yes, I travel at Friday.`],a:0,tip:`يوم الأسبوع يأخذ on`}]},
{id:'c1',u:1,t:'التعارف مع زميل جديد',turns:[
{p:`Hi! What is your name?`,o:[`My name is Ahmed.`,`I is Ahmed.`,`Name my Ahmed.`],a:0,tip:`للتعريف بالاسم نقول: My name is ...`},
{p:`Nice to meet you. Where are you from?`,o:[`I am from Egypt.`,`I from Egypt am.`,`Egypt I am from.`],a:0,tip:`I am from ثم اسم البلد`},
{p:`Are you a student or a teacher?`,o:[`I am a student.`,`I am an student.`,`I student am.`],a:0,tip:`student يبدأ بصوت ساكن فنستخدم a`}]},
{id:'c2',u:1,t:'الحديث عن الناس',turns:[
{p:`Is that your brother?`,o:[`Yes, he is my brother.`,`Yes, he are my brother.`,`Yes, is he my brother.`],a:0,tip:`مع he نستخدم is`},
{p:`Is she your friend?`,o:[`No, she is not my friend.`,`No, she not is my friend.`,`No, is she not my friend.`],a:0,tip:`النفي: الفاعل ثم is ثم not`},
{p:`Are they happy today?`,o:[`Yes, they are happy.`,`Yes, they is happy.`,`Yes, are they happy.`],a:0,tip:`مع they نستخدم are`}]},
{id:'c3',u:2,t:'يومي مع الناس',turns:[
{p:`What do you do in the morning?`,o:[`I work at eight.`,`I works at eight.`,`I am work at eight.`],a:0,tip:`مع I نستخدم الفعل بدون s`},
{p:`Does your sister study at night?`,o:[`Yes, she studies at night.`,`Yes, she study at night.`,`Yes, she studying at night.`],a:0,tip:`مع she نضيف s: studies`},
{p:`Do you like coffee?`,o:[`Yes, I like coffee.`,`Yes, I likes coffee.`,`Yes, I am like coffee.`],a:0,tip:`بعد I نستخدم like بدون s`}]},
{id:'c4',u:2,t:'في المطعم',turns:[
{p:`Welcome! What would you like to order?`,o:[`I would like a salad, please.`,`I want salad please to.`,`Salad I like please.`],a:0,tip:`I would like ... please جملة مهذبة للطلب`},
{p:`Would you like something to drink?`,o:[`No, thanks. I don't want a drink.`,`No, thanks. I doesn't want.`,`No thanks, I not drink.`],a:0,tip:`مع I نستخدم don't`},
{p:`Do you want it here or to go?`,o:[`Here, please. Thank you.`,`Here, I am please.`,`Here please I am.`],a:0,tip:`الرد الواضح والمهذب`}]},
{id:'c5',u:3,t:'السؤال عن الاتجاهات',turns:[
{p:`Excuse me, is there a bank near here?`,o:[`Yes, there is one on the corner.`,`Yes, there are one on the corner.`,`Yes, is there one on the corner.`],a:0,tip:`مع المفرد نستخدم there is`},
{p:`Where is the train station?`,o:[`It is next to the park.`,`It is the next to park.`,`Next park it is to.`],a:0,tip:`It is + مكان`},
{p:`Thank you. Is there a pharmacy too?`,o:[`Yes, there is a pharmacy near the bank.`,`Yes, there are a pharmacy near the bank.`,`Yes, is there a pharmacy near bank.`],a:0,tip:`there is مع المفرد، وthe bank معروف`}]},
{id:'c6',u:3,t:'الطلب في المقهى',turns:[
{p:`What can I get for you?`,o:[`I would like an orange juice, please.`,`I would like a orange juice, please.`,`Orange juice an I like.`],a:0,tip:`orange يبدأ بحرف علة فنستخدم an`},
{p:`Anything else?`,o:[`Yes, a sandwich, please.`,`Yes, an sandwich, please.`,`Yes, sandwich a please.`],a:0,tip:`sandwich يبدأ بصوت ساكن فنستخدم a`},
{p:`That is ten dollars. Thank you.`,o:[`Here you are. Thank you.`,`Here you is. Thank you.`,`You here are. Thank you.`],a:0,tip:`Here you are عبارة شائعة عند الدفع`}]},
{id:'c11',u:6,t:'أين كنتَ أمس؟',turns:[
{p:`Where were you yesterday? I called you twice.`,o:[`I was at my brother's house.`,`I were at my brother's house.`,`I am at my brother's house.`],a:0,tip:`مع I نستخدم was لا were`},
{p:`Was the traffic bad?`,o:[`Yes, the roads were very busy.`,`Yes, the roads was very busy.`,`Yes, the roads are very busy.`],a:0,tip:`الجمع roads يأخذ were`},
{p:`Did you get home late?`,o:[`Yes, I arrived at ten.`,`Yes, I arrive at ten.`,`Yes, I did arrived at ten.`],a:0,tip:`الماضي المنتظم: arrive → arrived`}]},
{id:'c12',u:6,t:'ماذا فعلتَ في العطلة؟',turns:[
{p:`What did you do last weekend?`,o:[`I went to the market with my family.`,`I goed to the market with my family.`,`I did went to the market with my family.`],a:0,tip:`go شاذّ: ماضيه went`},
{p:`Did you buy anything nice?`,o:[`I bought a book and some bread.`,`I buyed a book and some bread.`,`I did bought a book and some bread.`],a:0,tip:`buy شاذّ: ماضيه bought`},
{p:`Did your sister come with you?`,o:[`No, she didn't come. She was tired.`,`No, she didn't came. She was tired.`,`No, she not came. She was tired.`],a:0,tip:`بعد didn’t يعود الفعل مجرّداً`}]},
{id:'c13',u:7,t:'ما خطّتك للعطلة؟',turns:[
{p:`What are you going to do next week?`,o:[`I am going to visit my family.`,`I going to visit my family.`,`I am going to visits my family.`],a:0,tip:`قبل going to لا بدّ من am، والفعل بعدها مجرّد`},
{p:`Nice! Is your brother going to travel too?`,o:[`Yes, he is going to come with me.`,`Yes, he are going to come with me.`,`Yes, he is going to comes with me.`],a:0,tip:`المفرد الغائب يأخذ is، والفعل مجرّد`},
{p:`How long are you going to stay?`,o:[`We are going to stay for a week.`,`We is going to stay for a week.`,`We going to stay for a week.`],a:0,tip:`مع we نقول are going to`}]},
{id:'c14',u:7,t:'وعدٌ وقرار',turns:[
{p:`This bag is very heavy.`,o:[`I will help you.`,`I will helps you.`,`I will to help you.`],a:0,tip:`القرار في لحظته يأخذ will، والفعل مجرّد`},
{p:`Thank you! Will you be at the meeting tomorrow?`,o:[`Yes, I will be there at nine.`,`Yes, I will am there at nine.`,`Yes, I am will be there at nine.`],a:0,tip:`بعد will يأتي be لا am`},
{p:`Do you think it will rain tonight?`,o:[`No, I think it won't rain.`,`No, I think it will not rains.`,`No, I think it doesn't will rain.`],a:0,tip:`نفي will هو won’t والفعل بعده مجرّد`}]},
{id:'c15',u:8,t:'أيّهما أفضل؟',turns:[
{p:`Which phone do you like, this one or that one?`,o:[`This one is better than that one.`,`This one is more better than that one.`,`This one is gooder than that one.`],a:0,tip:`good شاذّة: better وحدها بلا more`},
{p:`But this one is more expensive, isn't it?`,o:[`Yes, but it is faster.`,`Yes, but it is more faster.`,`Yes, but it is more fast.`],a:0,tip:`الصفة القصيرة تأخذ er ولا تُجمع مع more`},
{p:`Which is the best shop in the city?`,o:[`The shop near the station is the best.`,`The shop near the station is the most best.`,`The shop near the station is the goodest.`],a:0,tip:`التفضيل الشاذّ: the best`}]},
{id:'c16',u:8,t:'موازنة بين مدينتين',turns:[
{p:`Is your new city bigger than the old one?`,o:[`Yes, it is much bigger.`,`Yes, it is much more bigger.`,`Yes, it is much big.`],a:0,tip:`big → bigger، ولا more معها`},
{p:`Is it as quiet as your old street?`,o:[`No, it is not as quiet as my old street.`,`No, it is not as quieter as my old street.`,`No, it is not as quiet than my old street.`],a:0,tip:`المساواة as … as والصفة بينهما مجرّدة`},
{p:`And the weather? Is it worse?`,o:[`In winter it is worse than here.`,`In winter it is more worse than here.`,`In winter it is badder than here.`],a:0,tip:`bad شاذّة: worse وحدها`}]},
{id:'c17',u:9,t:'في البقالة',turns:[
{p:`Good morning. Do you need anything today?`,o:[`Yes, I need some bread, please.`,`Yes, I need any bread, please.`,`Yes, I need many bread, please.`],a:0,tip:`الإثبات يأخذ some، وbread غير معدود`},
{p:`Of course. Is there anything else?`,o:[`Have you got any milk?`,`Have you got any milks?`,`Have you got many milk?`],a:0,tip:`السؤال يأخذ any`},
{p:`Yes, we have. How many eggs would you like?`,o:[`Six eggs, please. And not much sugar.`,`Six eggs, please. And not many sugar.`,`Six egg, please. And not much sugar.`],a:0,tip:`eggs معدود فيأخذ many، وsugar غير معدود فيأخذ much`}]},
{id:'c18',u:9,t:'لماذا تأخّرت؟',turns:[
{p:`You look tired. Why did you come late?`,o:[`I came late because the bus was full.`,`I came late because so the bus was full.`,`I came late because the full bus.`],a:0,tip:`بعد because جملة تامّة، ولا تُجمع مع so`},
{p:`Oh, I see. What did you do then?`,o:[`It was raining, so I took a taxi.`,`It was raining, because I took a taxi.`,`Because it was raining so I took a taxi.`],a:0,tip:`so يليها النتيجة، وواحدة منهما تكفي`},
{p:`Do you always take the bus?`,o:[`When I have time, I walk to work.`,`Because I have time, I walk to work.`,`When I have time, so I walk to work.`],a:0,tip:`when للزمن`}]},
{id:'c19',u:10,t:'ماذا أنجزتَ اليوم؟',turns:[
{p:`Have you finished the report?`,o:[`Yes, I have finished it.`,`Yes, I have finish it.`,`Yes, I have finished it yesterday.`],a:0,tip:`بعد have التصريف الثالث، ولا يُذكر معه زمنٌ منتهٍ`},
{p:`Good. Has your brother sent the email?`,o:[`No, he hasn't sent it yet.`,`No, he haven't sent it yet.`,`No, he hasn't send it yet.`],a:0,tip:`مع he نقول has، والثالث sent`},
{p:`Have you ever worked on a project like this?`,o:[`No, I have never done this before.`,`No, I haven't never done this before.`,`No, I have never did this before.`],a:0,tip:`never نفيٌ بنفسها، وdo ثالثه done`}]},
{id:'c20',u:10,t:'منذ متى؟',turns:[
{p:`How long have you lived in this city?`,o:[`I have lived here for five years.`,`I have lived here since five years.`,`I live here for five years.`],a:0,tip:`المدّة تأخذ for، والزمن حاضرٌ تامّ`},
{p:`And how long have you worked at the company?`,o:[`I have worked there since 2021.`,`I have worked there for 2021.`,`I worked there since 2021.`],a:0,tip:`السنة نقطةُ بداية فتأخذ since`},
{p:`Have you already met the new manager?`,o:[`Yes, I have already met him.`,`Yes, I have met him yet.`,`Yes, I have already meet him.`],a:0,tip:`already للإثبات، وmeet ثالثه met`}]},
{id:'c21',u:11,t:'ماذا كنتَ تفعل؟',turns:[
{p:`I called you at eight. What were you doing?`,o:[`I was cooking dinner.`,`I was cook dinner.`,`I were cooking dinner.`],a:0,tip:`was ثم الفعل بـ ing`},
{p:`And your brother? Was he at home?`,o:[`He was sleeping on the sofa.`,`He were sleeping on the sofa.`,`He was sleep on the sofa.`],a:0,tip:`مع he نقول was، والفعل بـ ing`},
{p:`Did anything happen while you were cooking?`,o:[`Yes, the lights went out.`,`Yes, the lights were going out.`,`Yes, the lights go out.`],a:0,tip:`الحدث القاطع ماضٍ بسيط`}]},
{id:'c22',u:11,t:'احكِ لي ما جرى',turns:[
{p:`You look upset. What happened?`,o:[`While I was walking home, I lost my keys.`,`While I lost my keys, I was walking home.`,`While I walked home, I lost my keys.`],a:0,tip:`while للخلفية الطويلة المستمرّة`},
{p:`Oh no. Were you alone?`,o:[`No, my sister was walking with me.`,`No, my sister were walking with me.`,`No, my sister was walk with me.`],a:0,tip:`المفرد يأخذ was، والفعل بـ ing`},
{p:`Did you find them in the end?`,o:[`Yes, a man found them while we were looking.`,`Yes, a man was finding them while we looked.`,`Yes, a man find them while we were looking.`],a:0,tip:`القاطع بسيط، والخلفية مستمرّة`}]},
{id:'c23',u:12,t:'اتّفاقٌ وشرط',turns:[
{p:`Will you come to the meeting tomorrow?`,o:[`If I finish my work, I will come.`,`If I will finish my work, I will come.`,`If I finish my work, I come.`],a:0,tip:`بعد if مضارعٌ بسيط، والجواب will`},
{p:`And if the meeting is late?`,o:[`If it is late, I will leave early.`,`If it will be late, I will leave early.`,`If it is late, I leave early.`],a:0,tip:`الشرط مضارع، والجواب will`},
{p:`What would you do if you had more time?`,o:[`If I had more time, I would learn Spanish.`,`If I would have more time, I would learn Spanish.`,`If I had more time, I will learn Spanish.`],a:0,tip:`الشرط المتخيَّل ماضٍ، والجواب would`}]},
{id:'c24',u:12,t:'لو كنتُ مكانك',turns:[
{p:`I have a bad headache and a lot of work.`,o:[`If I were you, I would rest.`,`If I was you, I would rest.`,`If I were you, I will rest.`],a:0,tip:`في الشرط المتخيَّل were، والجواب would`},
{p:`But my manager is waiting for the report.`,o:[`If you explained, he would understand.`,`If you would explain, he would understand.`,`If you explain, he would understand.`],a:0,tip:`بعد if ماضٍ بسيط لا would`},
{p:`Maybe. What if he says no?`,o:[`If he says no, you will have to finish it.`,`If he will say no, you will have to finish it.`,`If he says no, you have to finished it.`],a:0,tip:`شرطٌ ممكن: مضارعٌ ثم will`}]},
{id:'c25',u:13,t:'في العيادة',turns:[
{p:`I have had a headache for three days.`,o:[`You should see a doctor.`,`You should to see a doctor.`,`You shoulds see a doctor.`],a:0,tip:`بعد should الفعل مجرّد بلا to`},
{p:`Do I need to come back next week?`,o:[`No, you don't have to come back.`,`No, you mustn't come back.`,`No, you don't have to came back.`],a:0,tip:`don’t have to إعفاء، وmustn’t منع`},
{p:`Can I take this medicine with coffee?`,o:[`No, you mustn't take it with coffee.`,`No, you don't have to take it with coffee.`,`No, you mustn't to take it with coffee.`],a:0,tip:`المنع mustn’t لا don’t have to`}]},
{id:'c26',u:13,t:'ربّما ولعلّ',turns:[
{p:`Do you think the train will be late?`,o:[`It might be late.`,`It might to be late.`,`It mights be late.`],a:0,tip:`بعد might الفعل مجرّد بلا to وبلا s`},
{p:`Should we wait or take a taxi?`,o:[`We could take a taxi.`,`We could to take a taxi.`,`We coulds take a taxi.`],a:0,tip:`could ناقصٌ لا يقبل to ولا s`},
{p:`Will your friend be able to help us?`,o:[`She may be able to help.`,`She may can help.`,`She may helps.`],a:0,tip:`ناقصان لا يجتمعان: may be able to`}]},
{id:'c27',u:14,t:'خبرٌ في الجريدة',turns:[
{p:`When was this bridge built?`,o:[`It was built in 1990.`,`It was build in 1990.`,`It built in 1990.`],a:0,tip:`المجهول: be + التصريف الثالث`},
{p:`And the new library? Is it finished?`,o:[`The windows were cleaned last week.`,`The windows was cleaned last week.`,`The windows were clean last week.`],a:0,tip:`الجمع يأخذ were، والثالث cleaned`},
{p:`Is English spoken at the new office?`,o:[`Yes, English is spoken there.`,`Yes, English is speak there.`,`Yes, English speaks there.`],a:0,tip:`المجهول في المضارع: is + الثالث`}]},
{id:'c28',u:14,t:'مَن ذاك ومَا ذاك؟',turns:[
{p:`Who was the man at the door?`,o:[`He is the man who called me yesterday.`,`He is the man which called me yesterday.`,`He is the man who he called me yesterday.`],a:0,tip:`للعاقل who، ولا يُعاد الضمير`},
{p:`And what is that book on the table?`,o:[`It is the book which I read last week.`,`It is the book who I read last week.`,`It is the book which I read it last week.`],a:0,tip:`لغير العاقل which، ولا ضمير زائد`},
{p:`Where do you work now?`,o:[`This is the shop where I work.`,`This is the shop which I work.`,`This is the shop who I work.`],a:0,tip:`المكان يأخذ where`}]}
];
