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
  {k:'word', ar:'ما الكلمة في النص التي تعني «مقابل / أمام»؟', ok:['opposite']}]}
];

export const READ = Object.fromEntries(READS.map(r => [r.id, r]));
