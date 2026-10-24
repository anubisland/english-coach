/* قواعد الفتح والتقدّم: ما المتاح الآن، وما الخطوة التالية. */
import {UNITS,LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {PLACE2} from '../content/place.js';   // تُستخدم في PLACE وفي وسم المهارات
import {S} from './state.js';

/* أرقام الوحدات تُشتقّ من المحتوى لا تُكتب يدوياً.

   كانت مكتوبة [1,2,3] في خمسة عشر موضعاً، فإضافة وحدة رابعة كانت
   تُسقطها من الامتحان النهائي ومن تحديد المستوى ومن فتح الوحدات،
   صامتةً بلا خطأ يظهر. */
export const UNIT_NS=UNITS.map(u=>u.n).sort((a,b)=>a-b);
export const LAST_UNIT=UNIT_NS[UNIT_NS.length-1];

export const unitLessons=u=>LESSONS.filter(l=>l.u===u);
export const unitItems=u=>unitLessons(u).flatMap(l=>l.items);
export const itemsUpTo=u=>UNIT_NS.filter(x=>x<=u).flatMap(unitItems);
export const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
/* الوحدة تُفتح بإتمام ما قبلها، أو بتخطّيها بناءً على اختبار تحديد المستوى. */
export const unitOpen=u=>u===1||!!S.skipped[u-1]||(!!S.cp[u-1]&&!!S.ret[u-1]);
export const lessonOpen=l=>{if(!unitOpen(l.u))return false;const ls=unitLessons(l.u);const i=ls.indexOf(l);return i===0||!!S.lessons[ls[i-1].id]};
/* الامتحان النهائي يحتاج اجتياز كل الوحدات، واستبقاء ما قبل الأخيرة. */
export const examOpen=()=>UNIT_NS.every(u=>S.cp[u])&&UNIT_NS.filter(u=>u<LAST_UNIT).every(u=>S.ret[u]);
export const convoList=u=>CONVO.filter(c=>c.u===u);
export const convoOpen=c=>{const L=convoList(c.u),i=L.indexOf(c);return unitOpen(c.u)&&unitLessons(c.u).every(l=>S.lessons[l.id])&&(i===0||!!S.conv[L[i-1].id])};

/* المهارة التي يقيسها كل تمرين.
   الأساس هو قاعدة درسه، فذلك يصحّ في 87 تمريناً من 94؛ والبقية هنا صراحةً
   لأنها تقيس مهارة أخرى داخل الدرس نفسه (جمل النفي في دروس الإثبات). */
const SKILL_OVERRIDE={
  'I ___ not late, I am on time.':'be-negative',
  'Sara ___ not here now.':'be-negative',
  'He ___ not tired.':'be-negative'
};

export const ITEM_SKILL=new Map();
export const ITEM_UNIT=new Map();
LESSONS.forEach(l=>l.items.forEach(it=>{
  ITEM_SKILL.set(it,SKILL_OVERRIDE[it.q]||(l.rules&&l.rules[0])||null);
  ITEM_UNIT.set(it,l.u);
}));
PLACE2.forEach(it=>{ITEM_SKILL.set(it,'a2');ITEM_UNIT.set(it,0)});

/* اختبار تحديد المستوى يعمل على نُسخ من التمارين (لإضافة lv)، والنسخة
   كائن جديد لا تعرفه الخرائط. نسجّلها هنا، وإلا فقدنا مهارة كل سؤال
   ووحدته — وهو ما يُبنى عليه اقتراح نقطة البداية. */
/* تحديد المستوى يقتصر على الاختيار والكلمة الواحدة: أوّل شاشة يراها
   القادم الجديد لا تطالبه بإنشاء جملة قبل أن نعرف مستواه — والمقصود
   قياسه سريعاً لا إجهاده. أمّا دروسه ففيها الأنواع كلّها. */
const PLACE_KINDS=it=>!it.k||it.k==='mcq'||it.k==='type';
export const PLACE=LESSONS.flatMap(l=>l.items.filter(PLACE_KINDS).map(i=>{
  const copy=Object.assign({},i,{lv:1});
  ITEM_SKILL.set(copy,ITEM_SKILL.get(i));
  ITEM_UNIT.set(copy,l.u);
  return copy;
})).concat(PLACE2);

export const skillOf=it=>ITEM_SKILL.get(it)||null;
export const unitOf=it=>ITEM_UNIT.has(it)?ITEM_UNIT.get(it):null;

/* الوحدة التي تُدرَّس فيها كل مهارة — تُشتقّ من الدروس لا تُكتب يدوياً. */
export const SKILL_UNIT=(()=>{const m={};LESSONS.forEach(l=>(l.rules||[]).forEach(r=>{if(!(r in m))m[r]=l.u}));return m})();

/* للتوافق مع شاشة الاختبار التي تعرض بطاقة القاعدة */
export const ITEM_RULE=ITEM_SKILL;

export const unitDone=n=>unitLessons(n).every(l=>S.lessons[l.id])&&convoList(n).every(c=>S.conv[c.id])&&!!S.cp[n]&&(n===3||!!S.ret[n]);
