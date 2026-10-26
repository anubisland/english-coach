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

/* الوحدات مقسومة على المستويات: الامتحان النهائي لكل مستوى يسحب من
   وحداته وحدها. وبلا هذا كان امتحان A1 يسأل عن الماضي والمستقبل
   بمجرّد إضافة وحدات A2. */
export const unitLevel=u=>{const x=UNITS.find(y=>y.n===u);return (x&&x.lv)||'A1'};
export const levelUnits=lv=>UNIT_NS.filter(u=>unitLevel(u)===lv);
export const levelItems=lv=>levelUnits(lv).flatMap(unitItems);
export const LEVELS_BUILT=[...new Set(UNITS.map(u=>u.lv||'A1'))];
export const LAST_UNIT=UNIT_NS[UNIT_NS.length-1];

export const unitLessons=u=>LESSONS.filter(l=>l.u===u);
export const unitItems=u=>unitLessons(u).flatMap(l=>l.items);
export const itemsUpTo=u=>UNIT_NS.filter(x=>x<=u).flatMap(unitItems);
export const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
/* الوحدة تُفتح بإتمام ما قبلها، أو بتخطّيها بناءً على اختبار تحديد المستوى. */
export const unitOpen=u=>u===1||!!S.skipped[u-1]||(!!S.cp[u-1]&&!!S.ret[u-1]);
export const lessonOpen=l=>{if(!unitOpen(l.u))return false;const ls=unitLessons(l.u);const i=ls.indexOf(l);return i===0||!!S.lessons[ls[i-1].id]};
/* الامتحان النهائي يحتاج اجتياز كل الوحدات، واستبقاء ما قبل الأخيرة. */
/* امتحان المستوى يُفتح باجتياز وحداته هو، لا وحدات البرنامج كلّها. */
export const levelExamOpen=lv=>{
  const us=levelUnits(lv);
  if(!us.length)return false;
  const last=us[us.length-1];
  return us.every(u=>S.cp[u])&&us.filter(u=>u<last).every(u=>S.ret[u]);
};
export const examOpen=(lv)=>levelExamOpen(lv||LEVELS_BUILT[0]);
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
/* أوّل وحدة مفتوحة لم تكتمل. ووحداتٌ كثيرة تكون مفتوحة معاً، فلو وُسمت
   كلّها «الوحدة الحالية» لدلّ السهم على ستّة مواضع ولم يدلّ على شيء. */
/* أبعدُ وحدةٍ بلغها المتعلّم، لا أبعدُ وحدةٍ بُنيت. بها تُختار موادُّ
   الاختبارات العامّة فتنمو معه: مبتدئٌ لا يُسأل عن الماضي، ومن بلغ A2
   لا يبقى يُسأل عن الوحدات الثلاث الأولى وحدها — وكان السقف رقماً
   مكتوباً (٣) فبقيت وحداتٌ كاملة لا يراها أحد. */
export const reachedUnit=()=>{
  const done=UNIT_NS.filter(u=>unitLessons(u).some(l=>S.lessons[l.id]));
  const far=done.length?Math.max(...done):0;
  /* والوحدة التي يعمل فيها الآن داخلةٌ أيضاً، وأدنى ذلك ثلاث. */
  return Math.max(3, Math.min(LAST_UNIT, far+1));
};
export const currentUnit=()=>UNIT_NS.find(u=>unitOpen(u)&&!unitDone(u)&&!S.skipped[u])||null;
