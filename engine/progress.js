/* قواعد الفتح والتقدّم: ما المتاح الآن، وما الخطوة التالية. */
import {UNITS,LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {PLACE2} from '../content/place.js';
import {S} from './state.js';

export const unitLessons=u=>LESSONS.filter(l=>l.u===u);
export const unitItems=u=>unitLessons(u).flatMap(l=>l.items);
export const itemsUpTo=u=>[1,2,3].filter(x=>x<=u).flatMap(unitItems);
export const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
export const PLACE=LESSONS.flatMap(l=>l.items).map(i=>Object.assign({},i,{lv:1})).concat(PLACE2);
export const unitOpen=u=>u===1||(!!S.cp[u-1]&&!!S.ret[u-1]);
export const lessonOpen=l=>{if(!unitOpen(l.u))return false;const ls=unitLessons(l.u);const i=ls.indexOf(l);return i===0||!!S.lessons[ls[i-1].id]};
export const examOpen=()=>[1,2,3].every(u=>S.cp[u])&&[1,2].every(u=>S.ret[u]);
export const convoList=u=>CONVO.filter(c=>c.u===u);
export const convoOpen=c=>{const L=convoList(c.u),i=L.indexOf(c);return unitOpen(c.u)&&unitLessons(c.u).every(l=>S.lessons[l.id])&&(i===0||!!S.conv[L[i-1].id])};

/* أي قاعدة تخصّ هذا التمرين؟ نشتقّها من درسه بدل وسمها في تسعين تمريناً. */
export const ITEM_RULE=new Map();
LESSONS.forEach(l=>{if(l.rules&&l.rules.length)l.items.forEach(it=>ITEM_RULE.set(it,l.rules[0]))});

export const unitDone=n=>unitLessons(n).every(l=>S.lessons[l.id])&&convoList(n).every(c=>S.conv[c.id])&&!!S.cp[n]&&(n===3||!!S.ret[n]);
