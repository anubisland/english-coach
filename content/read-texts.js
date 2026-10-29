/* نصوص اختبار القراءة.

   النصوص قصيرة ومن الحياة اليومية التي يحتاجها المتعلّم فعلاً: رسالة من
   صديق، وإعلان في محطّة، وجدول عيادة — لا قطعاً أدبية لا يقرأ مثلها أحد.

   ثلاثة أنواع من الأسئلة، ولكلٍّ سبب:
     tf     صح أو خطأ — يقيس الفهم العام بسرعة
     short  إجابة قصيرة يكتبها بيده — يمنع التخمين، لأن الاختيار يُخمَّن
     word   استخرج الكلمة من النص — يقيس المفردات في سياقها لا محفوظة

   ولا يوجد سؤال «اختر من بين أربعة» واحد: في القراءة بالذات يستطيع المتعلّم
   أن يصيب بالاستبعاد دون أن يفهم جملة واحدة.

   w: عدد كلمات النص، يُحسب آلياً في الاختبار ويُستعمل لقياس سرعة القراءة. */
export const READS = [
{id:'r-family', u:4, t:'رسالة عن العائلة', cat:'رسالة',
 text:`Hello Nour,

I am happy in my new city. Our house is small but it has got three rooms. My brother's room is next to mine.

We have got two cats. Their names are Simba and Luna. My sister loves them very much.

There are many shops in our street. These shops open at nine every day.

Write soon,
Hana`,
 qs:[
  {k:'tf', q:'The house has got three rooms.', a:true, why:'it has got three rooms.'},
  {k:'tf', q:'They have got two dogs.', a:false, why:'النصّ يقول two cats — قطّتان لا كلبان.'},
  {k:'tf', q:'The shops open at nine.', a:true, why:'These shops open at nine every day.'},
  {k:'short', ar:'ما أسماء القطّتين؟ أجب بالإنجليزية.',
   ok:['simba and luna','their names are simba and luna','simba, luna','simba luna']},
  {k:'short', ar:'أين غرفة أخيها؟ أجب بالإنجليزية.',
   ok:['next to mine','next to her room','it is next to mine']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «صغير»؟', ok:['small']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «أسماء»؟', ok:['names']}]},
{id:'r-notice', u:5, t:'إعلان في النادي', cat:'إعلان',
 text:`SPORTS CLUB — NOTICE

The swimming pool is open from seven in the morning until nine at night.

You can swim every day except Monday. On Monday we clean the pool.

Please bring your own towel. Don't bring food to the pool area.

Children under eight cannot swim alone. A parent must be with them.

The gym is closing at eight this week.`,
 qs:[
  {k:'tf', q:'You can swim on Monday.', a:false, why:'every day except Monday — الاثنين مستثنى.'},
  {k:'tf', q:'You must bring your own towel.', a:true, why:'Please bring your own towel.'},
  {k:'tf', q:'A child of six can swim alone.', a:false, why:'Children under eight cannot swim alone.'},
  {k:'short', ar:'في أي ساعة يفتح المسبح صباحاً؟ أجب بالإنجليزية.',
   ok:['at seven','seven','from seven','at seven in the morning','7']},
  {k:'short', ar:'ماذا يُمنع إحضاره إلى المسبح؟ أجب بالإنجليزية.',
   ok:['food','dont bring food',"don't bring food",'no food']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «منشفة»؟', ok:['towel']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «ما عدا»؟', ok:['except']}]},
{id:'r-note', u:1, t:'رسالة من صديق', cat:'رسالة',
 text:`Hi Omar,

I am in Cairo now. I am here with my sister. We are in a small hotel near the river. The hotel is old but it is very clean. My sister is happy because the food is good.

The weather is hot today. We are not at the hotel now. We are in a big park. There are many trees here.

See you soon,
Sami`,
 qs:[
  {k:'tf', q:'Sami is in Cairo with his brother.', a:false, why:'النصّ يقول with my sister — مع أختي.'},
  {k:'tf', q:'The hotel is near the river.', a:true, why:'near the river في السطر الثالث.'},
  {k:'tf', q:'They are at the hotel now.', a:false, why:'النصّ يقول We are not at the hotel now.'},
  {k:'short', ar:'أين هما الآن؟ أجب بالإنجليزية في كلمتين أو ثلاث.',
   ok:['in a big park','in a park','a big park','park','they are in a big park','in the park']},
  {k:'short', ar:'لماذا أخته سعيدة؟ أجب بالإنجليزية.',
   ok:['the food is good','because the food is good','food is good','the food']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «نظيف»؟', ok:['clean']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «قديم»؟', ok:['old']}]},

{id:'r-sign', u:1, t:'إعلان في محطة القطار', cat:'إعلان',
 text:`TRAIN STATION — INFORMATION

The ticket office is open from seven in the morning to nine at night.

Tickets to Alexandria are forty pounds. Children under six are free.

The train to Alexandria leaves from platform three. You cannot buy food on this train. There is a small shop next to platform one.

Please do not smoke in the station.`,
 qs:[
  {k:'tf', q:'The ticket office is open at eight in the morning.', a:true, why:'من السابعة إلى التاسعة، والثامنة بينهما.'},
  {k:'tf', q:'You can buy food on the train.', a:false, why:'النصّ يقول It is not possible to buy food on this train.'},
  {k:'tf', q:'A child of four years does not pay.', a:true, why:'Children under six are free — أقلّ من ستّ سنوات مجاناً.'},
  {k:'short', ar:'كم ثمن التذكرة إلى الإسكندرية؟ أجب بالإنجليزية.',
   ok:['forty pounds','40 pounds','forty','40']},
  {k:'short', ar:'من أي رصيف يقوم القطار؟ أجب بالإنجليزية.',
   ok:['platform three','platform 3','three','3','from platform three']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «رصيف»؟', ok:['platform']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «مجاناً»؟', ok:['free']}]},

{id:'r-day', u:2, t:'يوم في حياة سائق', cat:'وصف',
 text:`Mahmoud is a taxi driver in Alexandria. He gets up at five o'clock every morning. He drinks tea but he does not eat breakfast at home.

He starts work at six. In the morning he takes people to their offices. He usually stops at one o'clock. He eats lunch in a small restaurant near the sea.

He does not work on Friday. On Friday he stays at home with his family and watches football on television.`,
 qs:[
  {k:'tf', q:'Mahmoud eats breakfast at home.', a:false, why:'he does not eat breakfast at home.'},
  {k:'tf', q:'He works on Friday.', a:false, why:'He does not work on Friday.'},
  {k:'tf', q:'He eats lunch near the sea.', a:true, why:'in a small restaurant near the sea.'},
  {k:'short', ar:'في أي ساعة يستيقظ؟ أجب بالإنجليزية.',
   ok:['at five','five','five o clock',"five o'clock",'at five o clock',"at five o'clock",'5']},
  {k:'short', ar:'ماذا يفعل يوم الجمعة؟ أجب بالإنجليزية في جملة قصيرة.',
   ok:['he stays at home','stays at home','he stays at home with his family','watches football',
       'he watches football','he stays home']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «يستيقظ» (كلمتان)؟', ok:['gets up','get up']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «عادةً»؟', ok:['usually']}]},

{id:'r-ad', u:2, t:'إعلان عن وظيفة', cat:'إعلان',
 text:`WE NEED A COOK

A new restaurant in the city centre needs a cook.

You work from four in the afternoon to eleven at night. You do not work on Sunday.

We want somebody who speaks English and Arabic. You do not need many years of experience. You need to be fast and clean.

The money is good. Please call Mr Adel on 0100 555 1234.`,
 qs:[
  {k:'tf', q:'The restaurant needs a driver.', a:false, why:'WE NEED A COOK — طبّاخ لا سائق.'},
  {k:'tf', q:'You work in the morning.', a:false, why:'من الرابعة عصراً إلى الحادية عشرة ليلاً.'},
  {k:'tf', q:'You need to speak two languages.', a:true, why:'somebody who speaks English and Arabic.'},
  {k:'tf', q:'You need many years of experience.', a:false, why:'You do not need many years of experience.'},
  {k:'short', ar:'في أي يوم لا تعمل؟ أجب بالإنجليزية.',
   ok:['sunday','on sunday']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «خبرة»؟', ok:['experience']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «سريع»؟', ok:['fast']}]},

{id:'r-clinic', u:3, t:'مواعيد العيادة', cat:'جدول',
 text:`DOCTOR'S CLINIC — OPENING TIMES

Doctor Hana works on Monday, Tuesday and Thursday. She works from nine in the morning until two in the afternoon.

Doctor Karim works in the evening, from five until eight. He does not work on Thursday.

There is a pharmacy in the same building, on the first floor. It is open every day.

The clinic is closed at night. Please go to the hospital behind the park.`,
 qs:[
  {k:'tf', q:'Doctor Hana works in the evening.', a:false, why:'من التاسعة صباحاً حتى الثانية ظهراً.'},
  {k:'tf', q:'Doctor Karim works on Thursday.', a:false, why:'He does not work on Thursday.'},
  {k:'tf', q:'The pharmacy opens every day.', a:true, why:'It is open every day.'},
  {k:'short', ar:'أين الصيدلية؟ أجب بالإنجليزية.',
   ok:['on the first floor','first floor','in the same building','on the first floor of the same building']},
  {k:'short', ar:'أين تذهب إذا كانت العيادة مغلقة؟ أجب بالإنجليزية.',
   ok:['to the hospital','the hospital','hospital','the hospital behind the park','go to the hospital']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «صيدلية»؟', ok:['pharmacy']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «خلف»؟', ok:['behind']}]},

{id:'r-street', u:3, t:'شارعنا', cat:'وصف',
 text:`I live in a quiet street near the market. There are twelve houses in our street and there is one small shop.

Opposite my house there is a school. In the morning there are many children in the street. It is not quiet then.

There is a bus stop at the end of the street. The bus to the city centre comes every twenty minutes.

There are no cafes in our street. There is a very good cafe in the next street.`,
 qs:[
  {k:'tf', q:'There is a school opposite the writer\'s house.', a:true, why:'Opposite my house there is a school.'},
  {k:'tf', q:'The street is quiet in the morning.', a:false, why:'It is not quiet then.'},
  {k:'tf', q:'There is a cafe in the writer\'s street.', a:false, why:'There are no cafes in our street.'},
  {k:'short', ar:'كم بيتاً في الشارع؟ أجب بالإنجليزية.',
   ok:['twelve','12','twelve houses','there are twelve houses']},
  {k:'short', ar:'كل كم دقيقة يأتي الأتوبيس؟ أجب بالإنجليزية.',
   ok:['every twenty minutes','twenty minutes','every 20 minutes','twenty','20']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «هادئ»؟', ok:['quiet']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «مقابل / أمام»؟', ok:['opposite']}]},
{id:'r-trip', u:6, t:'رسالة عن رحلة مضت', cat:'رسالة',
 text:`Dear Omar,

Last week I travelled to Alexandria with my family. We left early on Friday morning and arrived at eleven.

The hotel was small but it was very clean. Our room was on the third floor.

On Saturday we went to the beach. The water was cold, so we did not swim. We ate fish in a small restaurant near the sea.

My sister bought a blue bag for her friend. I did not buy anything.

We came home on Sunday night. I was tired but happy.

See you soon,
Hana`,
 qs:[
  {k:'tf', q:'They arrived in Alexandria at eleven.', a:true, why:'arrived at eleven.'},
  {k:'tf', q:'They swam in the sea on Saturday.', a:false, why:'The water was cold, so we did not swim.'},
  {k:'tf', q:'Hana bought a bag for her friend.', a:false, why:'أختُها هي التي اشترت الحقيبة، وHana لم تشترِ شيئاً.'},
  {k:'short', ar:'متى غادروا؟ أجب بالإنجليزية.',
   ok:['on friday morning','friday morning','early on friday morning','friday','early friday morning']},
  {k:'short', ar:'ماذا أكلوا قرب البحر؟ أجب بالإنجليزية.',
   ok:['fish','they ate fish','we ate fish']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «وصلنا»؟', ok:['arrived']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «متعَب»؟', ok:['tired']}]},

{id:'r-plan', u:7, t:'خطّة الأسبوع القادم', cat:'رسالة',
 text:`Hi Sara,

Next week is going to be busy for me.

On Monday I am going to start my new job. The office is near the station, so I will walk there every morning.

On Wednesday my brother is going to visit us. He will stay for three days.

We are going to cook dinner together on Thursday. I think it will be fun.

I am not going to travel this month. Maybe in December.

Will you come and see us on Friday? Please call me tonight.

Nour`,
 qs:[
  {k:'tf', q:'Nour is going to start a new job on Monday.', a:true, why:'On Monday I am going to start my new job.'},
  {k:'tf', q:'Her brother will stay for a week.', a:false, why:'He will stay for three days — ثلاثة أيام لا أسبوع.'},
  {k:'tf', q:'Nour is going to travel this month.', a:false, why:'I am not going to travel this month.'},
  {k:'short', ar:'كيف ستذهب إلى العمل كل صباح؟ أجب بالإنجليزية.',
   ok:['walk','she will walk','on foot','i will walk there','walk there']},
  {k:'short', ar:'ماذا سيفعلان يوم الخميس؟ أجب بالإنجليزية.',
   ok:['cook dinner','cook dinner together','they are going to cook dinner','cook']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «مشغول»؟', ok:['busy']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «ربّما»؟', ok:['maybe']}]},

{id:'r-compare', u:8, t:'إعلان: شقّتان للإيجار', cat:'إعلان',
 text:`TWO FLATS FOR RENT

FLAT ONE — Green Street
Three rooms. 2,500 pounds a month.
It is near the market and the bus stop.
The rooms are small but the building is new.

FLAT TWO — Park Road
Two rooms. 3,000 pounds a month.
It is quieter than Flat One, and the rooms are bigger.
It is further from the station — about twenty minutes on foot.

Flat One is cheaper, but Flat Two is more comfortable.
Flat Two is the best choice for a small family.

Call 0100 555 7788 for more information.`,
 qs:[
  {k:'tf', q:'Flat One is cheaper than Flat Two.', a:true, why:'Flat One is cheaper'},
  {k:'tf', q:'Flat Two is nearer to the station.', a:false, why:'It is further from the station — أبعد لا أقرب.'},
  {k:'tf', q:'Flat One has got more rooms than Flat Two.', a:true, why:'ثلاث غرف مقابل غرفتين.'},
  {k:'short', ar:'كم إيجار الشقّة B في الشهر؟ أجب بالإنجليزية.',
   ok:['3000 pounds','3,000 pounds','three thousand pounds','3000','3,000']},
  {k:'short', ar:'أيّ الشقّتين أهدأ؟ أجب بالإنجليزية.',
   ok:['flat two','two','flat two is quieter','the second one']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «أهدأ»؟', ok:['quieter']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «أبعد»؟', ok:['further']}]},

{id:'r-recipe', u:9, t:'وصفة ورسالة قصيرة', cat:'إرشادات',
 text:`A SIMPLE BREAKFAST — for two people

You need:
four eggs, some bread, a little salt, and some cheese.
You do not need any sugar.

First, put a little oil in the pan. When the oil is hot, break the eggs into it.

Do not use much salt, because the cheese is already salty.

Cook for three minutes, so the eggs stay soft.

Note from Mum:
There isn't any bread in the kitchen, so please buy some on your way home.
We have got a lot of cheese, so don't buy any.`,
 qs:[
  {k:'tf', q:'You need four eggs.', a:true, why:'four eggs'},
  {k:'tf', q:'You need some sugar.', a:false, why:'You do not need any sugar.'},
  {k:'tf', q:'There is bread in the kitchen.', a:false, why:"There isn't any bread in the kitchen."},
  {k:'short', ar:'لماذا لا تُكثر الملح؟ أجب بالإنجليزية.',
   ok:['because the cheese is salty','the cheese is already salty','because the cheese is already salty','cheese is salty']},
  {k:'short', ar:'ماذا يطلب منك أن تشتري؟ أجب بالإنجليزية.',
   ok:['bread','some bread','buy some bread']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «مالح»؟', ok:['salty']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «طريّ»؟', ok:['soft']}]},
{id:'r-cv', u:10, t:'رسالة تقديم لوظيفة', cat:'رسالة',
 text:`Dear Mr Hassan,

I am writing about the job in your shop.

I have worked as a seller for four years. I have sold clothes, shoes and bags. I have also worked with computers since 2021.

I have never worked at night, but I can learn. I have already finished a short course in English.

I have not received your last email yet. Could you send it again?

Thank you,
Kareem

I have also helped two shops to organise their stock, and I have trained three new sellers since last year.
I have not managed a team by myself, but I have worked closely with a manager.

I have attached my references. I have known both of them for more than five years.`,
 qs:[
  {k:'tf', q:'Kareem has worked as a seller for four years.', a:true, why:'I have worked as a seller for four years.'},
  {k:'tf', q:'He has worked at night before.', a:false, why:'I have never worked at night'},
  {k:'tf', q:'He has finished an English course.', a:true, why:'I have already finished a short course in English.'},
  {k:'short', ar:'منذ متى يعمل بالحاسوب؟ أجب بالإنجليزية.',
   ok:['since 2021','2021','since twenty twenty one']},
  {k:'short', ar:'ماذا لم يصله بعد؟ أجب بالإنجليزية.',
   ok:['your last email','the last email','an email','the email']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «باع»؟', ok:['sold']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «دورة»؟', ok:['course']}]},

{id:'r-night', u:11, t:'خبرٌ قصير: ليلة العاصفة', cat:'خبر',
 text:`A QUIET NIGHT IN AL-NOUR STREET

Last Tuesday the lights went out in Al-Nour Street.

People were having dinner when the storm started. Some families were watching television and others were already sleeping.

While the wind was blowing, a tree fell on an old car. Nobody was sitting in it, so nobody was hurt.

Mr Samir, who lives at number twelve, said: "I was reading when I heard a loud noise. I looked out of the window and I saw the tree."

The lights came back after three hours.

The electricity company said that four streets were affected. Engineers were working in the rain until after midnight.

Mrs Nadia, who was walking home when the storm began, said that she had never seen the street so dark.
People were opening their doors and calling to each other, and somebody was carrying a lamp from flat to flat.

The council has promised to cut the old trees before the winter.`,
 qs:[
  {k:'tf', q:'The lights went out on Tuesday.', a:true, why:'Last Tuesday the lights went out'},
  {k:'tf', q:'Somebody was hurt in the car.', a:false, why:'Nobody was sitting in it, so nobody was hurt.'},
  {k:'tf', q:'Mr Samir was sleeping when he heard the noise.', a:false, why:'كان يقرأ، لا نائماً: I was reading when I heard a loud noise.'},
  {k:'short', ar:'ماذا سقط على السيارة؟ أجب بالإنجليزية.',
   ok:['a tree','tree','the tree']},
  {k:'short', ar:'بعد كم ساعة عاد النور؟ أجب بالإنجليزية.',
   ok:['three hours','after three hours','3 hours','three']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «عاصفة»؟', ok:['storm']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «ضجيج»؟', ok:['noise']}]},

{id:'r-advice', u:13, t:'إرشادات للموظّف الجديد', cat:'إرشادات',
 text:`NOTES FOR NEW STAFF

You have to arrive before nine o'clock every morning.

You must wear your badge inside the building. You mustn't give it to anyone else.

You don't have to wear a suit, but you should look tidy.

If you are ill, you have to call the office before eight.

You may take your break at any time between twelve and two. You might find the small room quieter than the kitchen.

If you had a problem with any of this, you would speak to your manager first.

You should read the safety notes in the corridor during your first week.
You don't have to learn them by heart, but you must know where the exits are.

Your computer password has to be changed every three months.
You mustn't write it down near your desk, and you shouldn't use the same one for your personal accounts.

If you are not sure about a rule, you should ask rather than guess.`,
 qs:[
  {k:'tf', q:'You must arrive before nine.', a:true, why:'You have to arrive before nine'},
  {k:'tf', q:'You must wear a suit.', a:false, why:"You don't have to wear a suit"},
  {k:'tf', q:'You can give your badge to a friend.', a:false, why:"You mustn't give it to anyone else."},
  {k:'short', ar:'متى تتّصل بالمكتب إن مرضت؟ أجب بالإنجليزية.',
   ok:['before eight','before 8','before eight o clock','before eight oclock']},
  {k:'short', ar:'بين أيّ ساعتين تأخذ استراحتك؟ أجب بالإنجليزية.',
   ok:['between twelve and two','twelve and two','12 and 2','between 12 and 2']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «مرتَّب المظهر»؟', ok:['tidy']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «شارة»؟', ok:['badge']}]},

{id:'r-museum', u:14, t:'إعلان: المتحف الصغير', cat:'إعلان',
 text:`THE SMALL MUSEUM — VISITOR NOTICE

This building was built in 1890. It was used as a school for sixty years.

The museum was opened to the public in 1975. Most of the objects were given by families who lived in this street.

The old photographs which you see on the first floor were taken between 1900 and 1940.

Tickets are sold at the door. Students who show a card pay half price.

The room where the oldest objects are kept is closed on Fridays.

The garden behind the museum was added in 1992.
It is planted with trees which were common in this area a hundred years ago, and each one is marked with a small sign.

School groups are welcomed on weekday mornings, but they must be booked two weeks in advance.
A short talk is given by a guide who knows the history of every room.

The shop, which is run by volunteers, sells copies of the old photographs.`,
 qs:[
  {k:'tf', q:'The building was built in 1890.', a:true, why:'This building was built in 1890.'},
  {k:'tf', q:'The museum was opened in 1890.', a:false, why:'The museum was opened to the public in 1975.'},
  {k:'tf', q:'Students pay the full price.', a:false, why:'Students who show a card pay half price.'},
  {k:'short', ar:'ماذا كان المبنى قبل أن يصير متحفاً؟ أجب بالإنجليزية.',
   ok:['a school','school','it was a school','used as a school']},
  {k:'short', ar:'أيّ يوم تُغلق غرفة أقدم المعروضات؟ أجب بالإنجليزية.',
   ok:['friday','on friday','fridays','on fridays']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «معروضات / أشياء»؟', ok:['objects']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «تُباع»؟', ok:['sold']}]},
{id:'r-report', u:16, t:'تقرير اجتماع', cat:'تقرير',
 text:`NOTES FROM THE TEAM MEETING

The manager said that the new system would start in March.

He told us that the old one had worked well for ten years, but it had become slow.

Sara asked when the training would begin. The manager answered that it would start in February.

Omar asked if the staff had to come at the weekend. The manager said they did not have to, although some of them might want to.

He told everybody to read the new guide before the training.

The committee had asked for the figures twice before the deadline, and had been told each time that they were nearly ready.
When they finally arrived, three of the five tables had been left blank.

It is understood that the delay was caused by a change of software, which had been introduced without training.
Staff who had used the old system for years were given two days to learn the new one.

The chair said that no blame should be attached to individuals. Nevertheless, she asked for a written explanation within a week.`,
 qs:[
  {k:'tf', q:'The new system will start in March.', a:true, why:'the new system would start in March'},
  {k:'tf', q:'The staff have to come at the weekend.', a:false, why:'they did not have to — فهو إعفاء لا إلزام.'},
  {k:'tf', q:'The training begins in February.', a:true, why:'it would start in February'},
  {k:'short', ar:'كم سنةً عمل النظام القديم؟ أجب بالإنجليزية.',
   ok:['ten years','ten','for ten years','10 years']},
  {k:'short', ar:'ماذا طلب المدير من الجميع؟ أجب بالإنجليزية.',
   ok:['to read the new guide','read the new guide','read the guide']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «تدريب»؟', ok:['training']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «بطيء»؟', ok:['slow']}]},

{id:'r-letter', u:17, t:'رسالة أسف', cat:'رسالة',
 text:`Dear Layla,

I am sorry about last Friday.

If I had known about the party, I would have come. Nobody told me, and I had already promised to help my brother.

I wish I had checked my messages that morning. If only I had seen yours!

If you had called me, I would have changed my plans at once.

I hope we can meet soon. If you are free next week, I will cook for you.

Sorry again,
Mona

I had been thinking about writing to you for some time, but I kept postponing it.
Having read your last message twice, I realised that I owed you a proper answer rather than another short note.

You asked whether I regretted the decision. Honestly, I do not. If I had stayed, I would be comfortable now, but I would also be bored.
I wish I had explained this better at the time; nevertheless, I think you understood.

Do write back when you can. I would rather hear a difficult reply than none at all.

One more thing. Having thought about it again, I believe the difficulty was never the decision itself but the way I announced it.`,
 qs:[
  {k:'tf', q:'Mona came to the party.', a:false, why:'If I had known about the party, I would have come — فهي لم تعلم ولم تأتِ.'},
  {k:'tf', q:'Mona had promised to help her brother.', a:true, why:'I had already promised to help my brother'},
  {k:'tf', q:'Mona read her messages that morning.', a:false, why:'I wish I had checked my messages that morning'},
  {k:'short', ar:'ماذا ستفعل لليلى إن كانت متفرّغة؟ أجب بالإنجليزية.',
   ok:['cook for her','cook','she will cook for her','cook for you']},
  {k:'short', ar:'لماذا لم تأتِ مونا؟ أجب بالإنجليزية.',
   ok:['she did not know','nobody told her','she had promised to help her brother','she didnt know']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «وعدتُ»؟', ok:['promised']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «خطط»؟', ok:['plans']}]},

{id:'r-hobby', u:18, t:'مقال قصير: عادةٌ جديدة', cat:'مقال',
 text:`WHY I STARTED RUNNING

Two years ago I decided to change something in my life.

I had always enjoyed walking, but I avoided running because I thought it was too hard.

Then a friend suggested going with her in the morning. I agreed to try it once.

I will never forget feeling so tired after ten minutes. But I kept going, and after a month I stopped feeling tired so quickly.

Now I look forward to running every morning. I have learned that starting is the hardest part.

If you are thinking about it, try running for five minutes only. Remember to begin slowly.

What surprised me was how quickly the habit became ordinary.
Having set aside twenty minutes a day, I stopped thinking of it as an effort and started treating it as part of the morning.

Friends who had tried the same thing told me that they had given up within a month.
In most cases they had chosen something ambitious: an hour, or five days a week, or a target they could not keep on a bad day.

The lesson appears to be simple. A small commitment that survives a difficult week is worth more than a large one that does not.`,
 qs:[
  {k:'tf', q:'The writer used to avoid running.', a:true, why:'I avoided running because I thought it was too hard'},
  {k:'tf', q:'A friend suggested going with her.', a:true, why:'a friend suggested going with her in the morning'},
  {k:'tf', q:'The writer still feels tired after ten minutes.', a:false, why:'after a month I stopped feeling tired so quickly'},
  {k:'short', ar:'ماذا كان الكاتب يستمتع به دائماً؟ أجب بالإنجليزية.',
   ok:['walking','he enjoyed walking','she enjoyed walking']},
  {k:'short', ar:'ما أصعب جزءٍ في رأي الكاتب؟ أجب بالإنجليزية.',
   ok:['starting','the start','beginning','starting is the hardest part']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «اقترحت»؟', ok:['suggested']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «تجنّبتُ»؟', ok:['avoided']}]},

{id:'r-review', u:19, t:'رأيٌ في مطعم', cat:'رأي',
 text:`A REVIEW: THE OLD GARDEN

We went to this small new restaurant on Saturday evening.

Although the street is noisy, the garden at the back is very quiet.

The waiter brought the menu quickly and explained everything well.

Despite the low prices, the food was excellent. I had a large bowl of hot vegetable soup and a plate of fresh white fish.

The place was full. However, we did not wait long for our table.

Even though the evening was cold, we sat outside under the lights. We will certainly go again.

The film has been praised for its photography; nevertheless, several critics have questioned its length.
At nearly three hours, it asks a great deal of an audience that has not been given much reason to wait.

The performances are strong. The lead actor, who had not worked in cinema for a decade, is said to have prepared for a year.
Moreover, the quieter scenes are handled with a confidence that the louder ones lack.

On balance, it is a film worth seeing once. Whether it will be remembered is a different question.`,
 qs:[
  {k:'tf', q:'The street is quiet.', a:false, why:'Although the street is noisy — الشارع صاخب، والحديقة هي الهادئة.'},
  {k:'tf', q:'The prices were low.', a:true, why:'Despite the low prices'},
  {k:'tf', q:'They waited a long time for a table.', a:false, why:'we did not wait long for our table'},
  {k:'short', ar:'أين جلسوا في المساء؟ أجب بالإنجليزية.',
   ok:['outside','outside under the lights','in the garden','under the lights']},
  {k:'short', ar:'ماذا أكل الكاتب؟ أجب بالإنجليزية.',
   ok:['soup and fish','vegetable soup and fish','soup and white fish','soup, fish']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «صاخب»؟', ok:['noisy']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «ممتاز»؟', ok:['excellent']}]}
,
{id:'r-c1-news', u:20, t:'خبر صحفيّ: افتتاح الخطّ', cat:'خبر',
 text:`THE NEW LINE OPENS

Rarely does a city change in a single week. On Monday, however, the new railway line opened to the public.

Not only is the line faster than the old road, it is also cheaper for daily travellers.

No sooner had the first train left than the platform filled again. Hardly had the doors closed when a second crowd arrived.

It was the engineers who finished the work three months early. What surprised the mayor was the cost: it came to less than the first estimate.

Only then did the council agree to plan a second line.`,
 qs:[
  {k:'tf', q:'The new line is cheaper than the old road.', a:true, why:'it is also cheaper for daily travellers'},
  {k:'tf', q:'The work finished three months late.', a:false, why:'finished the work three months early — بل قبل موعدها بثلاثة أشهر'},
  {k:'tf', q:'The cost was higher than the first estimate.', a:false, why:'it came to less than the first estimate'},
  {k:'short', ar:'متى وافق المجلس على خطٍّ ثانٍ؟ أجب بالإنجليزية.',
   ok:['only then','after the first line opened','when the cost was low','only then did the council agree']},
  {k:'short', ar:'من أنهى العمل مبكّراً؟ أجب بالإنجليزية.',
   ok:['the engineers','engineers','it was the engineers']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «نادراً»؟', ok:['rarely']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «رصيف المحطّة»؟', ok:['platform']}]},

{id:'r-c1-mail', u:21, t:'رسالة رسمية: تأجيل الزيارة', cat:'رسالة',
 text:`Dear Mr Hassan,

Thank you for your letter of 3 March.

I regret to inform you that we are unable to receive your team on Monday. The laboratory will be closed for repairs on that day.

We would be grateful if you could postpone the visit until Thursday. Should that date be difficult, please let us know and we will arrange another.

Our staff will assist your team with the forms on arrival. Visitors require a valid pass, which we will provide at the gate.

We apologise for the change and look forward to hearing from you.

Yours sincerely,
Dr Amal Farouk`,
 qs:[
  {k:'tf', q:'The laboratory will be open on Monday.', a:false, why:'The laboratory will be closed for repairs on that day'},
  {k:'tf', q:'The writer suggests Thursday instead.', a:true, why:'postpone the visit until Thursday'},
  {k:'tf', q:'Visitors must bring their own pass.', a:false, why:'we will provide at the gate — المضيف يوفّره'},
  {k:'short', ar:'ما المقابل الرسميّ لـ«put off» في النص؟ أجب بالإنجليزية.',
   ok:['postpone']},
  {k:'short', ar:'ما المقابل الرسميّ لـ«help» في النص؟ أجب بالإنجليزية.',
   ok:['assist']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «يحتاج» رسميّاً؟', ok:['require']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «نعتذر»؟', ok:['apologise','apologize']}]},

{id:'r-c1-adv', u:22, t:'نصيحة عملية: قبل المقابلة', cat:'مقال',
 text:`BEFORE THE INTERVIEW

Do your research first. Read about the company and make a list of questions.

Do not put off your preparation until the last evening. People who leave it late make simple mistakes.

Take notes while you read, and look over them on the morning of the interview.

Pay attention to the time. Arriving early gives a good first impression.

If the panel asks a hard question, take a moment before you answer. It is better to think than to make a mistake in a hurry.

Afterwards, write a short note of thanks. Few candidates do this, and it is remembered.`,
 qs:[
  {k:'tf', q:'The writer advises leaving preparation until the last evening.', a:false, why:'Do not put off your preparation until the last evening'},
  {k:'tf', q:'Arriving early helps the first impression.', a:true, why:'Arriving early gives a good first impression'},
  {k:'tf', q:'Many candidates send a note of thanks.', a:false, why:'Few candidates do this'},
  {k:'short', ar:'ماذا ينصح الكاتب أن تفعل أثناء القراءة؟ أجب بالإنجليزية.',
   ok:['take notes','take notes while you read','make notes']},
  {k:'short', ar:'ماذا تفعل عند سؤالٍ صعب؟ أجب بالإنجليزية.',
   ok:['take a moment','take a moment before you answer','think first','wait and think']},
  {k:'word', ar:'ما الفعل المركّب في النص الذي يعني «يؤجّل»؟', ok:['put off']},
  {k:'word', ar:'ما الفعل المركّب في النص الذي يعني «يراجع»؟', ok:['look over']}]}
,
{id:'r-c2-edit', u:23, t:'دليل تحرير: اكتب أوجز', cat:'مقال',
 text:`WRITE SHORTER

Good writing is not writing more. It is writing less and saying the same thing.

Cut the words that repeat each other. A result needs no adjective before it, and a fact needs no adjective either. Each word should earn its place.

Replace long phrases with short ones. Write because, not due to the fact that. Write now, not at this point in time. Write many, not a large number of.

Be exact as well as short. Use fewer with what you can count and less with what you cannot, and keep amount for money and number for people.

A short sentence is not an empty one. If you cut a word and lose a meaning, put the word back.`,
 qs:[
  {k:'tf', q:'The writer says good writing means writing more.', a:false, why:'Good writing is not writing more'},
  {k:'tf', q:'The writer prefers "because" to "due to the fact that".', a:true, why:'Write because, not due to the fact that'},
  {k:'tf', q:'The writer says to cut a word even if the meaning is lost.', a:false, why:'If you cut a word and lose a meaning, put the word back'},
  {k:'short', ar:'ما الكلمة الموجزة التي تقوم مقام «a large number of»؟ أجب بالإنجليزية.',
   ok:['many']},
  {k:'short', ar:'ما الصواب مع المعدود: fewer أم less؟ أجب بالإنجليزية.',
   ok:['fewer','fewer people']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «دقيق»؟', ok:['exact']},
  {k:'word', ar:'ما الفعل في النص الذي يعني «استبدل»؟', ok:['replace']}]},

{id:'r-c2-essay', u:24, t:'مقال حجاجيّ: النقل العامّ', cat:'مقال',
 text:`SHOULD BUSES BE FREE?

Public transport should be free in large cities. The reason is that free buses serve everyone, not only those who can pay.

Free buses would reduce traffic on every main road. Fewer cars mean cleaner air, and the health of a city is worth more than a ticket. For instance, one European capital cut its traffic by a fifth within two years.

Furthermore, poorer families would save money each month. For them the fare is not a small sum.

On the other hand, some people argue that the cost would fall on the taxpayer. That is a fair point. However, the cost of wider roads and of treating sick lungs is also paid by the taxpayer, and it is paid later and at a higher price.

In conclusion, the benefits appear to outweigh the cost. The question is not whether a city can afford free buses, but whether it can afford the traffic it has now.`,
 qs:[
  {k:'tf', q:'The writer is against free buses.', a:false, why:'Public transport should be free in large cities'},
  {k:'tf', q:'The writer mentions the opposite view.', a:true, why:'On the other hand, some people argue that the cost would fall on the taxpayer'},
  {k:'tf', q:'The writer says the taxpayer pays nothing either way.', a:false, why:'the cost of wider roads and of treating sick lungs is also paid by the taxpayer'},
  {k:'short', ar:'بأيّ رابطٍ فتح الكاتب الرأي المخالف؟ أجب بالإنجليزية.',
   ok:['on the other hand']},
  {k:'short', ar:'بأيّ رابطٍ ختم مقاله؟ أجب بالإنجليزية.',
   ok:['in conclusion']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «الأجرة»؟', ok:['fare']},
  {k:'word', ar:'ما الرابط في النص الذي يدلّ على الزيادة؟', ok:['furthermore']}]}
,
{id:'r-c2-irony', u:24, t:'رسالة إلى صديق: بين السطور', cat:'رسالة',
 text:`Dear Salma,

You asked how the new office is. Wonderful. The lift has been broken since March, so we all get our exercise on the stairs.

My manager is a man of few words. When I handed in my first report he read two pages and said, "This will need another look." I spent the weekend rewriting it.

The team is not bad at all. On my first day Hana saw me standing alone by the door and said, "Have you met anyone yet?" Within ten minutes I knew half the floor. She is very good at breaking the ice.

Yesterday I stayed until eight. As I was leaving, Omar looked up and said, "Half day?" I laughed.

Anyway, I am drowning in work this month, so forgive the short letter. Come and visit when you can. I have an early start tomorrow, so I will stop here.

Yours,
Nadia`,
 qs:[
  {k:'tf', q:'Nadia is pleased that the lift is broken.', a:false, why:'Wonderful — سخرية: يُقال الحسن ويُراد ضدُّه، والقرينةُ أنّ تعطّل المصعد لا يُعجب أحداً'},
  {k:'tf', q:'The manager was satisfied with the first report.', a:false, why:'This will need another look — تلميحٌ بأنّ التقرير يحتاج إعادة كتابة'},
  {k:'tf', q:'Nadia likes her team.', a:true, why:'The team is not bad at all — تقليلٌ يُراد به المدح'},
  {k:'tf', q:'Omar believed that Nadia had worked only half a day.', a:false, why:'Half day? — سخريةٌ لأنّها بقيت إلى الثامنة'},
  {k:'short', ar:'ماذا أرادت هناء بسؤالها «Have you met anyone yet?» — أجب بالإنجليزية.',
   ok:['to introduce her','she wanted to introduce her','to help her meet people','to break the ice','she was offering to introduce her']},
  {k:'short', ar:'بأيِّ جملةٍ ألمحت نادية إلى أنّها تريد إنهاء الرسالة؟ أجب بالإنجليزية.',
   ok:['I have an early start tomorrow','i have an early start','an early start tomorrow']},
  {k:'word', ar:'ما العبارة في النص التي تعني «مثقلٌ بالعمل»؟', ok:['drowning in work','drowning']},
  {k:'word', ar:'ما العبارة في النص التي تعني «يُذهب الحرج بين الناس»؟', ok:['breaking the ice','break the ice']}]},

  /* الوحدة ٤ — نصُّها الثاني. والجمعُ والملكيةُ والإشارةُ وhave got
     كلُّها فيه عاملةً، لا مذكورةً: المتعلّم يقرؤها في سياقٍ قبل أن
     يُسأل عنها. */
  {id:'r-shop4', u:4, t:'في السوق', cat:'وصف',
   text:"This is my father's shop. It is not big, but it has got many things.\n\nThese boxes are new. Those bags are old. We have got twenty bags today.\n\nMy brothers work here on Friday. Their hands are always busy.",
   qs:[
     {k:'tf', q:'The shop is big.', a:false, why:'It is not big.'},
     {k:'tf', q:"The shop belongs to the writer's father.", a:true, why:"This is my father's shop."},
     {k:'tf', q:'They have got twenty bags.', a:true, why:'We have got twenty bags today.'},
     {k:'short', ar:'متى يعمل إخوته؟ أجب بالإنجليزية.', ok:['on friday','friday','they work on friday']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «صناديق»؟', ok:['boxes','box']}]},

  {id:'r-class5', u:5, t:'في الصفّ الآن', cat:'وصف',
   text:"It is nine o'clock. The lesson is starting now.\n\nSara can read English well, but she can't write it fast. Listen to the teacher. Don't open your books now.\n\nTwo students are writing. One student is drinking water. At ten we can go out.",
   qs:[
     {k:'tf', q:'Sara can write English fast.', a:false, why:"she can't write it fast."},
     {k:'tf', q:'The lesson starts at nine.', a:true, why:"It is nine o'clock."},
     {k:'tf', q:'Three students are writing.', a:false, why:'Two students are writing.'},
     {k:'short', ar:'ماذا يفعل طالبٌ واحد؟ أجب بالإنجليزية.', ok:['drinking water','he is drinking water','one student is drinking water']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «استمعْ»؟', ok:['listen']}]},

  /* الوحدة ٦ — الماضي: نفيُه وسؤالُه وظروفُه. */
  {id:'r-school6', u:6, t:'يومٌ لم يسِر كما خُطّط له', cat:'سرد',
   text:"Last Tuesday I woke up late.\n\nI didn't hear my alarm, so I missed the first bus. I ran to the station, but the train left two minutes before I arrived.\n\nI called my manager and told him the problem. He wasn't angry. He said, \"Take the next one.\"\n\nI finally reached the office at ten. It was a bad morning, but the rest of the day went well.",
   qs:[
     {k:'tf', q:'He heard his alarm.', a:false, why:"I didn't hear my alarm."},
     {k:'tf', q:'The train left before he arrived.', a:true, why:'the train left two minutes before I arrived.'},
     {k:'tf', q:'His manager was angry.', a:false, why:"He wasn't angry."},
     {k:'short', ar:'متى وصل إلى المكتب؟ أجب بالإنجليزية.', ok:['at ten','ten','he reached the office at ten']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «فاته»؟', ok:['missed','miss']}]},

  /* الوحدة ٧ — المستقبل: الموعدُ المرتَّب والغرض. */
  {id:'r-move7', u:7, t:'خطّةُ الانتقال', cat:'رسالة',
   text:"Hi Yara,\n\nI'm moving to a new flat next month. The owner is giving me the keys on the first of May.\n\nI'm taking two days off work to carry my things. My brother is helping me, so I don't need a van.\n\nI'm writing to ask you something. Are you free on Saturday? I want you to help me choose the curtains.\n\nWrite back soon,\n\nDina",
   qs:[
     {k:'tf', q:'She is moving next month.', a:true, why:"I'm moving to a new flat next month."},
     {k:'tf', q:'She needs a van.', a:false, why:"My brother is helping me, so I don't need a van."},
     {k:'tf', q:'She wants help with the curtains.', a:true, why:'I want you to help me choose the curtains.'},
     {k:'short', ar:'متى يُعطيه المالكُ المفاتيح؟ أجب بالإنجليزية.', ok:['on the first of may','the first of may','first of may']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «ستائر»؟', ok:['curtains','curtain']}]},

  /* الوحدة ٨ — المقارنة والكيفيّة والكفاية. */
  {id:'r-cities8', u:8, t:'مدينتان', cat:'موازنة',
   text:"I lived in two cities. The first one was bigger and much noisier than the second.\n\nRent there was too expensive for me, and the flats were not big enough for a family. But the work was better and the buses ran more often.\n\nThe second city is quieter and cheaper. People speak more slowly and drive more carefully.\n\nI visit the first city twice a year, but I don't want to live there again.",
   qs:[
     {k:'tf', q:'The first city was quieter.', a:false, why:'the first one was bigger and much noisier.'},
     {k:'tf', q:'Rent in the first city was cheap.', a:false, why:'Rent there was too expensive for me.'},
     {k:'tf', q:'He visits the first city twice a year.', a:true, why:'I visit the first city twice a year.'},
     {k:'short', ar:'كيف يقود الناسُ في المدينة الثانية؟ أجب بالإنجليزية.', ok:['more carefully','carefully','they drive more carefully']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «إيجار»؟', ok:['rent']}]},

  /* الوحدة ٩ — المقدارُ والترتيبُ والحركة. */
  {id:'r-day9', u:9, t:'كيف أُعِدُّ الشاي', cat:'إرشاد',
   text:"First, put a little water in the pot and wait for it to boil.\n\nThen add two spoons of tea and a few leaves of mint. Don't add a lot of sugar at this point.\n\nAfter that, move the pot away from the heat and leave it for three minutes.\n\nFinally, pour the tea into small glasses. If you want it sweeter, add the sugar now.\n\nI make tea this way twice a day, and my guests always ask me for the recipe.",
   qs:[
     {k:'tf', q:'You add the tea before the water boils.', a:false, why:'Then add two spoons of tea'},
     {k:'tf', q:'You should add a lot of sugar at the start.', a:false, why:"Don't add a lot of sugar at this point."},
     {k:'tf', q:'He makes tea twice a day.', a:true, why:'I make tea this way twice a day.'},
     {k:'short', ar:'كم دقيقةً يُترَك الإبريق؟ أجب بالإنجليزية.', ok:['three minutes','three','for three minutes']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «نعناع»؟', ok:['mint']}]},

  /* الوحدة ١٠ — الحاضر التامّ: الخبرةُ والتغيّر. */
  {id:'r-shop10', u:10, t:'محلٌّ صغير صمد', cat:'تقرير',
   text:"Hassan has owned a small bookshop in the old market for twenty-two years.\n\nHe has seen the street change around him. Three cafes have opened since 2019, and two clothes shops have closed. He says he has never thought about moving, although the rent has risen twice in the last five years.\n\n\"I have learnt one thing,\" he told us. \"People still come in for the same reason. They want somebody to talk to about a book.\"\n\nHe has recently started selling coffee at the back of the shop. It was his daughter's idea. She has worked with him since she finished university, and she has already built a small online shop for rare books.\n\nBusiness has not been easy. But Hassan has not lost his customers, and some of them have been coming since they were children.",
   qs:[
     {k:'tf', q:'Hassan has owned the shop for more than twenty years.', a:true, why:'for twenty-two years.'},
     {k:'tf', q:'He has thought about moving the shop.', a:false, why:'he has never thought about moving.'},
     {k:'tf', q:'The coffee was his own idea.', a:false, why:"It was his daughter's idea."},
     {k:'tf', q:'His daughter has built an online shop.', a:true, why:'she has already built a small online shop for rare books.'},
     {k:'short', ar:'كم مقهًى فُتح منذ ٢٠١٩؟ أجب بالإنجليزية.', ok:['three','three cafes','3']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «الإيجار»؟', ok:['rent']}]},

  /* الوحدة ١١ — السرد والماضي المستمرّ. */
  {id:'r-storm11', u:11, t:'ليلةُ العاصفة', cat:'سرد',
   text:"It was raining heavily when the lights went out.\n\nI was reading in the kitchen and my sister was washing the dishes. At first we thought it was only our flat. But while I was looking for a candle, I heard our neighbour shouting in the corridor.\n\nThe whole building was dark. Somebody was knocking on doors to check on the older people on the top floor. My sister took a torch and went up with her.\n\nI stayed by the window. Cars were moving very slowly in the street below, and the wind was pushing the rain against the glass.\n\nThe power came back after two hours. While we were sitting in the dark my sister told me a story about a night like this when she was a child. I had never heard it before.",
   qs:[
     {k:'tf', q:'The writer was reading when the lights went out.', a:true, why:'I was reading in the kitchen.'},
     {k:'tf', q:'Only their flat was dark.', a:false, why:'The whole building was dark.'},
     {k:'tf', q:'The sister went upstairs with the neighbour.', a:true, why:'My sister took a torch and went up with her.'},
     {k:'tf', q:'The power came back in ten minutes.', a:false, why:'The power came back after two hours.'},
     {k:'short', ar:'ماذا كانت أختُه تفعل حين انقطعت الكهرباء؟ أجب بالإنجليزية.', ok:['washing the dishes','she was washing the dishes']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «مصباح يدويّ»؟', ok:['torch']}]},

  /* الوحدة ١٢ — الشرط: نصّان. */
  {id:'r-water12', u:12, t:'لو قلّ الماء', cat:'مقال',
   text:"If a city loses a quarter of its water, life changes in a week.\n\nExperts say that if we do not repair old pipes, we will lose more water under the streets than we drink. In some cities, nearly a third of the clean water never reaches a tap.\n\nIf every family saved ten litres a day, the city would save millions of litres a year. That sounds small, but it is the easiest change to make. If the government raised prices instead, poor families would suffer first.\n\nFarmers face a harder question. If they changed their crops, they would need new machines and new training, and many would not survive the first bad year.\n\nSo the answer is not one decision. If we want a real result, we have to repair, teach and plan at the same time.",
   qs:[
     {k:'tf', q:'Some cities lose about a third of their clean water.', a:true, why:'nearly a third of the clean water never reaches a tap.'},
     {k:'tf', q:'Raising prices would hurt rich families first.', a:false, why:'poor families would suffer first.'},
     {k:'tf', q:'Changing crops is easy for farmers.', a:false, why:'they would need new machines and new training.'},
     {k:'tf', q:'The writer says one decision is enough.', a:false, why:'the answer is not one decision.'},
     {k:'short', ar:'كم لتراً يقترح أن توفّر كلّ أسرةٍ يوميّاً؟ أجب بالإنجليزية.', ok:['ten litres','ten','10 litres']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «أنابيب»؟', ok:['pipes','pipe']}]},

  {id:'r-job12', u:12, t:'لو عاد بي الزمن', cat:'رسالة',
   text:"Dear Mona,\n\nYou asked me what I would do if I could start again. It is a good question, and I have thought about it all week.\n\nIf I were twenty today, I would not choose the same subject. I studied law because my family expected it, and if I am honest, I was afraid to say no. If I had the choice now, I would study design.\n\nBut I would keep two things. If you take away the years in the office, you take away the people I met there, and I would not accept that.\n\nMy advice is simple. If an idea keeps coming back to you for a year, it is not a passing wish. Try it while the risk is small. If it fails, you will still be young enough to change again.\n\nWrite soon,\n\nSamir",
   qs:[
     {k:'tf', q:'He studied law because he wanted to.', a:false, why:'I studied law because my family expected it.'},
     {k:'tf', q:'He would study design if he had the choice now.', a:true, why:'If I had the choice now, I would study design.'},
     {k:'tf', q:'He regrets the people he met at work.', a:false, why:'I would not accept that.'},
     {k:'tf', q:'He advises trying an idea while the risk is small.', a:true, why:'Try it while the risk is small.'},
     {k:'short', ar:'كم مضى على تفكيره في السؤال؟ أجب بالإنجليزية.', ok:['all week','a week','one week']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «رغبة عابرة»؟', ok:['a passing wish','passing wish','wish']}]},

  /* الوحدة ١٣ — الواجب والنصيحة والاستنتاج. */
  {id:'r-rules13', u:13, t:'قواعدُ المبنى', cat:'لائحة',
   text:"NOTICE TO ALL RESIDENTS\n\nVisitors must sign the book at the entrance. The guard has to keep it until the end of the month, so please write clearly.\n\nYou should not leave bicycles in the corridor. If a bicycle blocks the stairs, the fire officer may remove it without warning, and the owner will have to pay for its return.\n\nRubbish has to be in a closed bag before ten at night. Bags left outside the door in the morning might attract animals, and residents on the ground floor have complained about this twice.\n\nThe lift must not carry more than six people. It could stop between floors, and an engineer may take two hours to arrive.\n\nIf you need a repair, you should write to the office rather than call the guard. He cannot approve any work himself.",
   qs:[
     {k:'tf', q:'Visitors must sign a book.', a:true, why:'Visitors must sign the book at the entrance.'},
     {k:'tf', q:'Bicycles are allowed in the corridor.', a:false, why:'You should not leave bicycles in the corridor.'},
     {k:'tf', q:'Rubbish must be out before ten at night.', a:true, why:'Rubbish has to be in a closed bag before ten at night.'},
     {k:'tf', q:'The guard can approve repairs.', a:false, why:'He cannot approve any work himself.'},
     {k:'short', ar:'كم شخصاً يحمل المصعد على الأكثر؟ أجب بالإنجليزية.', ok:['six','six people','6']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «سكّان»؟', ok:['residents','resident']}]},

  /* الوحدة ١٤ — المجهول وجملة الوصل. */
  {id:'r-paper14', u:14, t:'كيف يُصنع الورق', cat:'شرح',
   text:"Paper is made from wood, which is cut into very small pieces at the factory.\n\nThe pieces are mixed with water and chemicals until a soft grey material is produced. This material, which is called pulp, is then cleaned several times. Any ink that comes from recycled paper is removed at this stage.\n\nThe pulp is spread on a wide moving belt that carries it under heavy rollers. Most of the water is pressed out, and the thin sheet which remains is dried by hot air.\n\nFinally the paper is cut to size and packed. Sheets that are not perfect are collected and sent back to the beginning of the process.\n\nAbout half of the paper which is used in Europe is now made from recycled material. The trees that are planted for paper are usually replaced within ten years.",
   qs:[
     {k:'tf', q:'Pulp is made from wood and water.', a:true, why:'The pieces are mixed with water and chemicals.'},
     {k:'tf', q:'Ink from recycled paper stays in the pulp.', a:false, why:'Any ink that comes from recycled paper is removed.'},
     {k:'tf', q:'Imperfect sheets are thrown away.', a:false, why:'Sheets that are not perfect are collected and sent back.'},
     {k:'tf', q:'About half of Europe\u2019s paper is recycled material.', a:true, why:'About half of the paper which is used in Europe is now made from recycled material.'},
     {k:'short', ar:'بمَ يُجفَّف الورق؟ أجب بالإنجليزية.', ok:['hot air','by hot air','dried by hot air']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «عجينة الورق»؟', ok:['pulp']}]},

  {id:'r-town15', u:15, t:'ما الذي تغيّر في البلدة', cat:'تقرير',
   text:"By the time the new road opened in 2019, the town had already changed more than its people realised.\n\nThe factory had closed four years earlier, and most of the younger families had left before the first machines were removed. Those who stayed had been waiting for a decision that never came. When the council finally announced its plan, it had been discussing the site for almost a decade.\n\nThe plan itself was modest. A small business park would replace the factory, and the old railway yard would become a car park. Nobody had expected either to transform the town, and neither did.\n\nWhat changed was less visible. Because the road made the city reachable in forty minutes, people who had been looking for cheaper housing began to arrive. By 2023 the primary school, which had been losing pupils every year since 2011, reported its first increase.\n\nNot everyone welcomed this. Shopkeepers who had served the same families for thirty years found that the newcomers shopped elsewhere. Rents rose faster than wages, and two of the three cafes that had opened in the first year had closed by the end of the second.\n\nThe council now says it had underestimated how quickly the population would change. Critics reply that it had been told, repeatedly, and had chosen not to listen.",
   qs:[
     {k:'tf', q:'The factory closed after the new road opened.', a:false, why:'The factory had closed four years earlier.'},
     {k:'tf', q:'The council discussed the site for nearly ten years.', a:true, why:'it had been discussing the site for almost a decade.'},
     {k:'tf', q:'The school had been gaining pupils since 2011.', a:false, why:'which had been losing pupils every year since 2011.'},
     {k:'tf', q:'All three new cafes survived.', a:false, why:'two of the three cafes … had closed.'},
     {k:'short', ar:'كم دقيقةً صارت المدينةُ على بُعدها بعد الطريق؟ أجب بالإنجليزية.', ok:['forty minutes','forty','40 minutes']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «القادمون الجدد»؟', ok:['newcomers','newcomer']}]},

  {id:'r-remote15', u:15, t:'ثلاث سنوات من العمل عن بُعد', cat:'مقال',
   text:"When the office closed in March, nobody had planned for more than a few weeks.\n\nThree years later, the company has not returned to its old building. Staff who had been commuting for ninety minutes a day now start work at eight and finish at four. Managers who had been sceptical admit that output has not fallen.\n\nBut the picture is not simple. Those who had already built relationships at work adapted easily. New employees, who had never met their colleagues in person, took far longer to feel part of anything. One survey found that staff hired after the change were twice as likely to leave within a year.\n\nThe company has since introduced two office days a week. It says this is a compromise. Critics inside the firm call it the worst of both arrangements: those who live far away must now travel for meetings that could have been calls.\n\nWhat has changed permanently is expectation. Candidates who would once have accepted a daily commute now ask about flexibility in the first interview. A manager who had spent twenty years in the same building told us that he had stopped using the word normal altogether.\n\nThe lesson, perhaps, is that arrangements made in an emergency rarely stay temporary. Having worked differently for three years, few people are willing to pretend the old way was better simply because it was older.",
   qs:[
     {k:'tf', q:'The company returned to its old building.', a:false, why:'the company has not returned to its old building.'},
     {k:'tf', q:'Managers expected output to fall.', a:true, why:'Managers who had been sceptical admit that output has not fallen.'},
     {k:'tf', q:'New employees adapted faster than older staff.', a:false, why:'New employees … took far longer.'},
     {k:'tf', q:'Candidates now ask about flexibility early.', a:true, why:'now ask about flexibility in the first interview.'},
     {k:'short', ar:'كم يوماً في المكتب أدخلت الشركةُ أسبوعيّاً؟ أجب بالإنجليزية.', ok:['two','two days','two office days']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «تسوية»؟', ok:['compromise']}]},

  {id:'r-claim16', u:16, t:'ما قالوه وما قيل عنهم', cat:'تقرير',
   text:"The company announced on Monday that no customer data had been lost.\n\nBy Wednesday its own security team had admitted finding evidence of access to at least two systems. A spokesperson said that the earlier statement had been based on incomplete information, and insisted that the company had not intended to mislead anyone.\n\nRegulators are said to be examining whether the delay broke reporting rules. Under the law, a breach is believed to require notification within seventy-two hours, and the company is understood to have known about the problem for at least five days.\n\nThe chief executive denied hiding anything. He acknowledged that the first announcement had been premature, but refused to accept that it had been dishonest. He suggested publishing a full timeline, and promised to answer questions once the review was complete.\n\nNot everyone was convinced. One former employee, who asked not to be named, claimed that concerns had been raised internally a year earlier and had been dismissed as alarmist. The company declined to comment on that allegation.\n\nHaving been criticised twice before for slow disclosure, the firm is said to be under pressure from its largest investors. It is thought to have hired an external auditor this week, although it has not confirmed this publicly.",
   qs:[
     {k:'tf', q:'The company first said no data had been lost.', a:true, why:'announced on Monday that no customer data had been lost.'},
     {k:'tf', q:'The chief executive admitted being dishonest.', a:false, why:'refused to accept that it had been dishonest.'},
     {k:'tf', q:'A former employee said concerns were raised a year earlier.', a:true, why:'concerns had been raised internally a year earlier.'},
     {k:'tf', q:'The company confirmed hiring an auditor.', a:false, why:'it has not confirmed this publicly.'},
     {k:'short', ar:'في كم ساعةً يُفترض الإبلاغُ عن الاختراق؟ أجب بالإنجليزية.', ok:['seventy-two hours','seventy-two','72 hours']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «ادّعاء»؟', ok:['allegation','claimed','claim']}]},

  {id:'r-choice17', u:17, t:'لو أنّهم اختاروا غير ذلك', cat:'مقال',
   text:"If the city had built the bridge in 1998, the eastern district would be a different place today.\n\nThe plan was ready. Funding had been agreed, and the land had been bought. But a change of council meant the project was shelved, and within two years the money had been moved elsewhere. If the decision had held, traffic would not be crossing the old bridge in both directions now. The hospital on the eastern side would probably have been expanded rather than closed.\n\nIt is easy to be certain about the past. Supporters of the original plan argue that if the bridge had opened, business would have followed. Opponents reply that if the money had gone to the bridge, the two schools built in its place would not exist. Several thousand children would have travelled much further for years.\n\nBoth claims are plausible, and neither can be tested. What can be said is narrower. Had the bridge been built, the eastern district would almost certainly be larger. Whether its residents would be better off is a different question.\n\nToday the council is considering the same route again. If it approves the plan this year, the bridge would open around 2032. Several members have said privately that if they had been on the council in 1998, they would have voted differently. That is, of course, the easiest vote anyone ever casts.",
   qs:[
     {k:'tf', q:'The bridge was built in 1998.', a:false, why:'the project was shelved.'},
     {k:'tf', q:'Two schools were built instead of the bridge.', a:true, why:'the two schools built in its place.'},
     {k:'tf', q:'The writer says both claims can be tested.', a:false, why:'neither can be tested.'},
     {k:'tf', q:'The council is considering the route again.', a:true, why:'the council is considering the same route again.'},
     {k:'short', ar:'متى يُفتح الجسرُ لو أُقرّ هذا العام؟ أجب بالإنجليزية.', ok:['around 2032','2032']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «أُرجئ · رُفّ»؟', ok:['shelved']}]},

  {id:'r-habits18', u:18, t:'أن تبدأ وأن تتوقّف', cat:'مقال',
   text:"Most people who decide to change a habit begin by trying to stop doing something.\n\nResearch suggests this is the harder route. Giving up a behaviour leaves a gap, and the mind tends to fill that gap with the very thing it has just removed. Choosing to start something instead avoids this problem, because the new action occupies the time the old one used to take.\n\nConsider reading. Someone who wants to stop looking at a phone before bed usually fails within a week. Someone who decides to read ten pages instead often continues for months, having replaced one routine with another rather than leaving an empty hour.\n\nScale matters too. People who commit to running five kilometres three times a week frequently give up; those who agree to walk for ten minutes a day rarely do. The small version is easy to keep on a bad day, and keeping it on bad days is what makes it a habit at all.\n\nThere is one exception worth remembering. Where a behaviour is genuinely harmful, stopping cannot be postponed until a replacement is found. But for ordinary habits — eating late, checking messages, putting off difficult work — the evidence points the same way.\n\nThe question is not whether you can force yourself to stop. It is what you intend to do instead, and whether you would still manage it on your worst day.",
   qs:[
     {k:'tf', q:'Stopping a behaviour is the easier route.', a:false, why:'this is the harder route.'},
     {k:'tf', q:'Replacing a habit works better than removing it.', a:true, why:'having replaced one routine with another.'},
     {k:'tf', q:'Large commitments are kept more often.', a:false, why:'People who commit to running five kilometres … frequently give up.'},
     {k:'tf', q:'Harmful behaviour should wait for a replacement.', a:false, why:'stopping cannot be postponed.'},
     {k:'short', ar:'كم صفحةً يقترح النصُّ قراءتَها بدلاً من الهاتف؟ أجب بالإنجليزية.', ok:['ten pages','ten','10 pages']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «استثناء»؟', ok:['exception']}]},

  {id:'r-debate19', u:19, t:'هل تُفيد الواجباتُ المنزليّة؟', cat:'مقال رأي',
   text:"Few school policies divide parents as sharply as homework.\n\nSupporters argue that it builds independence. Moreover, they say, it allows parents to see what is being taught. Without it, the only picture of a child's progress comes from reports written twice a year.\n\nCritics are not persuaded. They point out that the evidence for younger children is weak; indeed, several large studies have found no measurable benefit before the age of eleven. Furthermore, homework tends to widen the gap between pupils, since a quiet room and an adult who can help are not equally available to everyone.\n\nBoth sides tend to overstate their case. Homework is arguably neither the cause of poor results nor the reason for good ones. It may well matter less than how it is set: ten minutes of focused practice appears to help, while an hour of copying does not.\n\nOn balance, the research supports a narrower claim than either camp would like. Homework seems to be useful for older pupils, in moderate amounts, when it revisits something already taught. Beyond that, the benefit is difficult to demonstrate.\n\nSchools that have reduced homework for younger classes report no fall in attainment; nevertheless, some parents have objected strongly, which suggests that the argument is not only about evidence. For many families, homework has become a sign that the school is serious — whatever the research says.",
   qs:[
     {k:'tf', q:'Studies found clear benefits for children under eleven.', a:false, why:'no measurable benefit before the age of eleven.'},
     {k:'tf', q:'The writer says both sides overstate their case.', a:true, why:'Both sides tend to overstate their case.'},
     {k:'tf', q:'Schools reducing homework reported lower attainment.', a:false, why:'report no fall in attainment.'},
     {k:'tf', q:'The writer thinks how homework is set matters.', a:true, why:'It may well matter less than how it is set.'},
     {k:'short', ar:'كم دقيقةً من التدريب المركَّز تبدو نافعة؟ أجب بالإنجليزية.', ok:['ten minutes','ten','10 minutes']},
     {k:'word', ar:'ما الكلمة في النص التي تعني «التحصيل»؟', ok:['attainment']}]}
];

export const READ = Object.fromEntries(READS.map(r => [r.id, r]));
