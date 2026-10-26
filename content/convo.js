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
{p:`Where do you work now?`,o:[`This is the shop where I work.`,`This is the shop which I work.`,`This is the shop who I work.`],a:0,tip:`المكان يأخذ where`}]},
{id:'c29',u:15,t:'ماذا كان قد حدث؟',turns:[
{p:`Why were you so late to the meeting?`,o:[`When I arrived, it had already started.`,`When I arrived, it has already started.`,`When I arrived, it had already start.`],a:0,tip:`السابق من حدثين ماضيين يأخذ had + الثالث`},
{p:`Did you miss much?`,o:[`They had finished the first part.`,`They have finished the first part.`,`They had finish the first part.`],a:0,tip:`الماضي التامّ: had + الثالث`},
{p:`How long have you been working on this project?`,o:[`I have been working on it for three months.`,`I have working on it for three months.`,`I have been work on it for three months.`],a:0,tip:`التامّ المستمرّ ثلاث قطع: have been + ing`}]},
{id:'c30',u:15,t:'منذ متى وأنت هنا؟',turns:[
{p:`How long have you been waiting?`,o:[`I have been waiting since nine.`,`I have waiting since nine.`,`I have been waited since nine.`],a:0,tip:`have been + ing، والنقطة تأخذ since`},
{p:`Had you been here before today?`,o:[`No, I had never been here before.`,`No, I have never been here before today.`,`No, I had never be here before.`],a:0,tip:`الماضي التامّ: had + been`},
{p:`Do you know this city well?`,o:[`I have known it since I was a child.`,`I have been knowing it since I was a child.`,`I have know it since I was a child.`],a:0,tip:`فعل الحالة لا يأتي مستمرّاً`}]},
{id:'c31',u:16,t:'ماذا قال لك؟',turns:[
{p:`Did you speak to the manager?`,o:[`Yes, he told me that he was busy.`,`Yes, he said me that he was busy.`,`Yes, he told that he was busy.`],a:0,tip:`tell بمفعول، وsay بلا مفعول`},
{p:`What else did he say?`,o:[`He said he would call me later.`,`He said he will call me later.`,`He told he would call me later.`],a:0,tip:`will تتراجع إلى would`},
{p:`Did he ask you anything?`,o:[`He asked where I had put the file.`,`He asked where did I put the file.`,`He asked where I did put the file.`],a:0,tip:`السؤال المنقول جملةٌ خبرية بلا قلب`}]},
{id:'c32',u:16,t:'نقل الأمر',turns:[
{p:`What did the doctor tell you?`,o:[`She told me to rest for a week.`,`She told me rest for a week.`,`She said me to rest for a week.`],a:0,tip:`الأمر المنقول: told me to + الفعل`},
{p:`Anything you should avoid?`,o:[`She told me not to drink coffee.`,`She told me don't drink coffee.`,`She told me to not drinking coffee.`],a:0,tip:`النهي المنقول: not to + الفعل`},
{p:`Did she ask about your work?`,o:[`She asked if I worked at night.`,`She asked do I work at night.`,`She asked if did I work at night.`],a:0,tip:`سؤال نعم/لا المنقول يأخذ if`}]},
{id:'c33',u:17,t:'لو كنتُ أعلم',turns:[
{p:`I am sorry, I did not know about the meeting.`,o:[`If I had known, I would have come.`,`If I would have known, I would have come.`,`If I knew, I would have come.`],a:0,tip:`الشرط الثالث: if + had + الثالث`},
{p:`It is all right. Nobody told you.`,o:[`If someone had told me, I would have been there.`,`If someone had told me, I would be there.`,`If someone told me, I would have been there.`],a:0,tip:`الجواب: would have + الثالث`},
{p:`Do you regret anything about it?`,o:[`I wish I had checked my email.`,`I wish I have checked my email.`,`I wish I would check my email.`],a:0,tip:`التمنّي للماضي: ماضٍ تامّ`}]},
{id:'c34',u:17,t:'ليت الأمر غير هذا',turns:[
{p:`Are you happy with your new job?`,o:[`I wish I had more free time.`,`I wish I have more free time.`,`I wish I will have more free time.`],a:0,tip:`التمنّي للحاضر: ماضٍ بسيط`},
{p:`What would make it better?`,o:[`I wish the office were nearer.`,`I wish the office is nearer.`,`I wish the office will be nearer.`],a:0,tip:`مع الكينونة في التمنّي نقول were`},
{p:`Does your colleague help you?`,o:[`I wish he would answer his phone.`,`I wish he answers his phone.`,`I wish he will answer his phone.`],a:0,tip:`would للانزعاج من فعل غيرك`}]},
{id:'c35',u:18,t:'ماذا تحبّ أن تفعل؟',turns:[
{p:`What do you do in your free time?`,o:[`I enjoy reading and walking.`,`I enjoy to read and to walk.`,`I enjoy read and walk.`],a:0,tip:`بعد enjoy يأتي ing`},
{p:`Are you planning anything this year?`,o:[`I plan to travel in the summer.`,`I plan travelling in the summer.`,`I plan travel in the summer.`],a:0,tip:`بعد plan يأتي to + الفعل`},
{p:`Are you good at languages?`,o:[`I am quite good at learning them.`,`I am quite good at learn them.`,`I am quite good at to learn them.`],a:0,tip:`بعد حرف الجرّ يأتي ing`}]},
{id:'c36',u:18,t:'المعنى يتغيّر',turns:[
{p:`You look well. Did you change anything?`,o:[`Yes, I stopped smoking last year.`,`Yes, I stopped to smoke last year.`,`Yes, I stopped smoke last year.`],a:0,tip:`الإقلاع عن الفعل: stop + ing`},
{p:`Good for you. Are you leaving now?`,o:[`Yes, but remember to lock the door.`,`Yes, but remember locking the door.`,`Yes, but remember lock the door.`],a:0,tip:`التذكير بما لم يقع: remember + to`},
{p:`Did you lock it last night?`,o:[`Yes, I remember locking it.`,`Yes, I remember to lock it.`,`Yes, I remember lock it.`],a:0,tip:`ما وقع فعلاً: remember + ing`}]},
{id:'c37',u:19,t:'مع أنّ وغير أنّ',turns:[
{p:`Did you go out in that weather?`,o:[`Although it was cold, we went out.`,`Despite it was cold, we went out.`,`Although it was cold, but we went out.`],a:0,tip:`الجملة التامّة تأخذ although، ولا تُجمع مع but`},
{p:`Was the match cancelled?`,o:[`Despite the rain, it continued.`,`Although the rain, it continued.`,`Despite it was raining, it continued.`],a:0,tip:`الاسم المجرّد يأخذ despite`},
{p:`Were many people there?`,o:[`It was very cold. However, the ground was full.`,`However it was very cold, the ground was full.`,`It was very cold, however the ground was full.`],a:0,tip:`however بين جملتين مستقلّتين وبفاصلتين`}]},
{id:'c38',u:19,t:'وصفٌ وترتيب',turns:[
{p:`Tell me about the table you bought.`,o:[`It is a beautiful old wooden table.`,`It is a wooden old beautiful table.`,`It is an old beautiful wooden table.`],a:0,tip:`الترتيب: رأي ثم عمر ثم مادّة`},
{p:`And does your brother speak English?`,o:[`He speaks English very well.`,`He speaks very well English.`,`He very well speaks English.`],a:0,tip:`لا يُفصَل الفعل عن مفعوله بظرف`},
{p:`Is he usually on time?`,o:[`He always comes early.`,`He comes always early.`,`Always he comes early.`],a:0,tip:`ظرف التكرار قبل الفعل`}]}
,
{id:'c-c1-1',u:20,t:'مقابلة عمل: التأكيد بالقلب',turns:[
{p:`You have worked in three countries. Was that hard?`,o:[`Never have I regretted it.`,`Never I have regretted it.`,`Never regretted I it.`],a:0,tip:`never المتصدّرة تقلب المساعد والفاعل`},
{p:`And what did you gain there?`,o:[`Not only did I learn the language, I also learned the work.`,`Not only I learned the language, I also learned the work.`,`Not only learned I the language, I also learned the work.`],a:0,tip:`not only تلزمها did مع الفاعل بعدها`},
{p:`When did you decide to come back?`,o:[`Only then did I understand what I wanted.`,`Only then I understood what I wanted.`,`Only then understood I what I wanted.`],a:0,tip:`only then تستلزم القلب بـdid`}]},

{id:'c-c1-2',u:20,t:'مراجعة تقرير: الصيغة المُجزَأة',turns:[
{p:`Who found the mistake in the report?`,o:[`It was Omar who found it.`,`It was Omar which found it.`,`It were Omar who found it.`],a:0,tip:`للعاقل who، وفعل الكينونة مفرد`},
{p:`And what exactly did he find?`,o:[`What he found was a wrong date.`,`What he found were a wrong date.`,`That he found was a wrong date.`],a:0,tip:`صيغة What تُبرز المفعول، وفعلها مفرد`},
{p:`Was the problem in the numbers or the dates?`,o:[`It was the dates that were wrong.`,`It were the dates that were wrong.`,`It was the dates which was wrong.`],a:0,tip:`It was مفردٌ دائماً، ولو كان المُبرَز جمعاً`}]},

{id:'c-c1-3',u:21,t:'بريد العمل: السجلّ الرسميّ',turns:[
{p:`We cannot meet on Monday. How do we write that to the client?`,o:[`We regret that we are unable to meet on Monday.`,`We can't meet on Monday, sorry.`,`We are not able to meet on Monday, no.`],a:0,tip:`الرسميّ يتجنّب الاختصار ويؤثر المفردة اللاتينية`},
{p:`And we want the meeting moved to Thursday.`,o:[`We would be grateful if you could postpone it until Thursday.`,`Can you put it off until Thursday?`,`Please put off the meeting to Thursday.`],a:0,tip:`would be grateful if أرسمُ صيغ الطلب، وpostpone رسميّ`},
{p:`How should the message end?`,o:[`We look forward to hearing from you.`,`Write back soon, please.`,`Waiting your answer.`],a:0,tip:`look forward to hearing from you خاتمةُ الرسالة الرسمية`}]},

{id:'c-c1-4',u:21,t:'عرض نتائج: التحفّظ في الرأي',turns:[
{p:`Is the new method faster than the old one?`,o:[`It appears to be faster in most cases.`,`It is always faster, everyone knows that.`,`It is faster, and nobody doubts it.`],a:0,tip:`appears to be وin most cases أدبُ التحفّظ`},
{p:`Does the data prove that?`,o:[`The data suggest a clear link between them.`,`The data prove a clear link between them.`,`The data show, without any doubt, a link.`],a:0,tip:`suggest تنسب ولا تطلق، وprove جزمٌ يحتاج دليلاً قاطعاً`},
{p:`So the cost will fall?`,o:[`The cost is likely to fall next year.`,`The cost will certainly fall next year.`,`The cost must fall next year.`],a:0,tip:`is likely to بدل will certainly`}]},

{id:'c-c1-5',u:22,t:'في المكتب: ما يصاحب الكلمة',turns:[
{p:`Have you decided about the new office?`,o:[`We made a decision yesterday.`,`We did a decision yesterday.`,`We gave a decision yesterday.`],a:0,tip:`make a decision — مصاحبةٌ تُحفظ`},
{p:`And did the team finish the study?`,o:[`They did the research last month.`,`They made the research last month.`,`They gave the research last month.`],a:0,tip:`do research لا make research`},
{p:`Shall I write the main points down?`,o:[`Yes, please take notes.`,`Yes, please do notes.`,`Yes, please pay notes.`],a:0,tip:`take notes — وmake notes فصيحةٌ أيضاً`}]},

{id:'c-c1-6',u:22,t:'ترتيبات: الأفعال المركّبة',turns:[
{p:`The meeting is at three, but Sara cannot come.`,o:[`Then we should put it off.`,`Then we should put off it.`,`Then we should off put it.`],a:0,tip:`الضمير يُفصَل: put it off`},
{p:`Who will take care of the visitors?`,o:[`Hana will look after them.`,`Hana will look them after.`,`Hana will after look them.`],a:0,tip:`look after لا يُفصَل أبداً`},
{p:`And what about the old chairs?`,o:[`We can give them away.`,`We can give away them.`,`We can away give them.`],a:0,tip:`give away قابلٌ للفصل، والضمير يُفصَل`}]}
];
