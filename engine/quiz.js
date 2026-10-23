/* محرّك الاختبارات: الإطلاق، والاختيار، والانتقال، والنتيجة.
   أنواعه: lesson, cp, ret, exam, conv, place. */
import {LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {S,save,addXp} from './state.js';
import {hooks} from './bus.js';
import {unitItems,itemsUpTo,shuffle,PLACE,lessonOpen} from './progress.js';
import {words} from './pronounce.js';

export function launch(kind,id){window.scrollTo(0,0);_launch(kind,id)}
export function _launch(kind,id){
  const q={kind,id,i:0,got:[],wrong:[],picked:null,done:false,theta:1};
  if(kind==='lesson'){const l=LESSONS.find(x=>x.id===id);Object.assign(q,{items:l.items,title:'درس '+l.id,need:l.items.length})}
  else if(kind==='cp'){Object.assign(q,{items:shuffle(unitItems(id)).slice(0,8),title:'اختبار الوحدة '+id,need:7})}
  else if(kind==='ret'){Object.assign(q,{items:shuffle(itemsUpTo(id)).slice(0,4),title:'اختبار الاستبقاء (حتى الوحدة '+id+')',need:3})}
  else if(kind==='exam'){Object.assign(q,{items:shuffle(itemsUpTo(3)).slice(0,10),title:'الامتحان النهائي A1',need:8})}
  else if(kind==='conv'){const c=CONVO.find(x=>x.id===id);Object.assign(q,{title:'محادثة: '+c.t,items:c.turns.map(t=>({q:t.p,o:t.o,a:t.a,tip:t.tip})),need:c.turns.length})}
  /* pickPlace تقرأ q.items لتتجنّب تكرار سؤال، فيجب أن توجد قبل أول نداء. */
  else if(kind==='place'){q.title='تحديد المستوى';q.items=[];q.items.push(pickPlace(q))}
  S.q=q;hooks.render();window.scrollTo(0,0);
}
export function pickPlace(q){
  const used=q.items.map(x=>x.q);const pool=PLACE.filter(x=>!used.includes(x.q));
  const want=q.theta>=1.5?2:1;let c=pool.filter(x=>x.lv===want);if(!c.length)c=pool;
  return shuffle(c)[0];
}
export function pick(k){
  const q=S.q;if(q.picked!=null)return;
  const it=q.items[q.i],ok=k===it.a;
  q.picked=k;q.choiceOk=ok;if(q.kind!=='conv'){q.got.push(ok);if(!ok)q.wrong.push(it)}
  if(q.kind==='place')q.theta=Math.min(2,Math.max(1,q.theta+(ok?0.5:-0.5)));
  hooks.render();
}
export function nextQ(){window.scrollTo(0,0);
  const q=S.q;q.i++;q.picked=null;q.spoke=null;q.att=0;q.feedback=null;q.choiceOk=null;
  const total=q.kind==='place'?10:q.items.length;
  if(q.i>=total)endQ();
  else if(q.kind==='place')q.items.push(pickPlace(q));
  hooks.render();
}
export function endQ(){
  const q=S.q;q.done=true;q.score=q.got.filter(Boolean).length;
  if(q.kind==='lesson'){q.pass=q.score===q.items.length;if(q.pass){S.lessons[q.id]=true;addXp(20)}}
  else if(q.kind==='cp'){q.pass=q.score>=q.need;if(q.pass){S.cp[q.id]=true;addXp(50)}}
  else if(q.kind==='ret'){q.pass=q.score>=q.need;if(q.pass){S.ret[q.id]=true;addXp(30)}}
  else if(q.kind==='conv'){q.pass=q.score===q.items.length;if(q.pass){S.conv[q.id]=true;addXp(40)}}
  else if(q.kind==='exam'){q.pass=q.score>=q.need;if(q.pass){S.exam=true;addXp(100)}}
  else if(q.kind==='place'){
    const rows=q.items.map((x,i)=>({lv:x.lv,ok:q.got[i]}));
    const r1=rows.filter(r=>r.lv===1),r2=rows.filter(r=>r.lv===2);
    const a1=r1.length?r1.filter(r=>r.ok).length/r1.length:0;
    const a2=r2.length?r2.filter(r=>r.ok).length/r2.length:0;
    S.level=(r2.length>=2&&a2>=0.75)?'A2':'A1';S.placed=true;S.place={a1,a2,n1:r1.length,n2:r2.length};q.pass=true;
  }
  save();
}

export function speakTurn(said){const q=S.q;if(!q||q.kind!=='conv'||q.spoke!=null||!said)return;const it=q.items[q.i];const T=words(it.o[it.a]),G=words(said);const sc=Math.round(T.filter(w=>G.includes(w)).length/T.length*100);q.heard=said;q.att=(q.att||0)+1;if(sc>=75||q.att>=2){q.spoke=sc;const pass=!!q.choiceOk&&sc>=75;q.got.push(pass);if(!pass)q.wrong.push(it);addXp(pass?10:2);save()}else{q.feedback='حاول مرة أخرى، لم أسمع: '+T.filter(w=>!G.includes(w)).join(' ')}hooks.render()}

export function retryQ(){const q=S.q;launch(q.kind,q.id)}
/* بعد أي اختبار، الوجهة تأتي من nextStep — لا من قائمة الدروس.
   الاعتماد على LESSONS[i+1] كان يفشل عند آخر درس في الوحدة، لأن الدرس
   الذي يليه في وحدة مقفلة، فتُصفَّر S.open ويرتدّ المتعلم إلى أول المسار. */
export function closeQ(){
  const q=S.q;
  if(q&&q.kind==='place'){S.q=null;S.tab='home';save();hooks.render();return}

  const step=hooks.nextStep&&hooks.nextStep();
  if(q&&q.kind==='lesson'&&!q.pass)S.open=q.id;                      // لم يجتز: أبقِ درسه مفتوحاً
  else if(step&&step.anchor&&step.anchor.startsWith('st-l-'))         // الخطوة التالية درس: افتحه
    S.open=step.anchor.slice(5);
  else S.open=null;

  S.q=null;S.tab='course';save();hooks.render();
  if(hooks.goToStep)hooks.goToStep();
}
/* الخطأ هو لحظة التعليم: نفتح الشرح تلقائياً عنده، ونتركه زراً عند الإجابة الصحيحة. */
