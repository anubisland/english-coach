/* مشاهد الحوار المرتبطة بالوحدات. */

export const CONVO=[
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
{p:`That is ten dollars. Thank you.`,o:[`Here you are. Thank you.`,`Here you is. Thank you.`,`You here are. Thank you.`],a:0,tip:`Here you are عبارة شائعة عند الدفع`}]}
];
