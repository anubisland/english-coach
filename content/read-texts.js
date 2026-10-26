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

The train to Alexandria leaves from platform three. It is not possible to buy food on this train, but there is a small shop next to platform one.

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

He starts work at six. In the morning he takes people to their offices. He usually stops at one o'clock and eats lunch in a small restaurant near the sea.

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

We want somebody who speaks English and Arabic. You do not need many years of experience, but you need to be fast and clean.

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

Doctor Hana works on Monday, Tuesday and Thursday, from nine in the morning until two in the afternoon.

Doctor Karim works in the evening, from five until eight. He does not work on Thursday.

There is a pharmacy in the same building, on the first floor. It is open every day.

If the clinic is closed and your problem is serious, please go to the hospital behind the park.`,
 qs:[
  {k:'tf', q:'Doctor Hana works in the evening.', a:false, why:'من التاسعة صباحاً حتى الثانية ظهراً.'},
  {k:'tf', q:'Doctor Karim works on Thursday.', a:false, why:'He does not work on Thursday.'},
  {k:'tf', q:'The pharmacy opens every day.', a:true, why:'It is open every day.'},
  {k:'short', ar:'أين الصيدلية؟ أجب بالإنجليزية.',
   ok:['on the first floor','first floor','in the same building','on the first floor of the same building']},
  {k:'short', ar:'أين تذهب إذا كانت العيادة مغلقة ومشكلتك خطيرة؟ أجب بالإنجليزية.',
   ok:['to the hospital','the hospital','hospital','the hospital behind the park','go to the hospital']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «خطير»؟', ok:['serious']},
  {k:'word', ar:'ما الكلمة في النص التي تعني «خلف»؟', ok:['behind']}]},

{id:'r-street', u:3, t:'شارعنا', cat:'وصف',
 text:`I live in a quiet street near the market. There are twelve houses in our street and there is one small shop.

Opposite my house there is a school. In the morning there are many children in the street, so it is not quiet then.

There is a bus stop at the end of the street. The bus to the city centre comes every twenty minutes.

There are no cafes in our street, but there is a very good one in the next street.`,
 qs:[
  {k:'tf', q:'There is a school opposite the writer\'s house.', a:true, why:'Opposite my house there is a school.'},
  {k:'tf', q:'The street is quiet in the morning.', a:false, why:'so it is not quiet then.'},
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
Kareem`,
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

The lights came back after three hours.`,
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

If you had a problem with any of this, you would speak to your manager first.`,
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

The room where the oldest objects are kept is closed on Fridays.`,
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

He told everybody to read the new guide before the training.`,
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
Mona`,
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

If you are thinking about it, try running for five minutes only. Remember to begin slowly.`,
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

Even though the evening was cold, we sat outside under the lights. We will certainly go again.`,
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
];

export const READ = Object.fromEntries(READS.map(r => [r.id, r]));
