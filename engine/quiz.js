/* محرّك الاختبارات: الإطلاق، والاختيار، والانتقال، والنتيجة.
   أنواعه: lesson, cp, ret, exam, conv, place. */
import {LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {S,save,addXp,logError} from './state.js';
import {hooks} from './bus.js';
import {unitItems,itemsUpTo,shuffle,PLACE,lessonOpen,unitOf,skillOf,UNIT_NS,LAST_UNIT,levelItems,LEVELS_BUILT} from './progress.js';
import {words,lev} from './pronounce.js';
import {normalize} from './translate.js';
import {record,dueKeys,dueSoon,boxCounts,masteredCount,BOXES} from './srs.js';
import {examItems,examNeed} from './exam-level.js';
import {levelSpec} from '../content/standard.js';
import {wordsItems,keepWords,WORDS_PASS} from './words.js';

/* 12 سؤالاً: ثلاثة لكل وحدة ليكون حكمها ذا معنى، وثلاثة لجسّ A2.
   النتيجة تقرر تخطي وحدات كاملة، فدقتها أهم من قِصَرها. */
export const PLACE_N=12;

export function launch(kind,id){window.scrollTo(0,0);_launch(kind,id)}
export function _launch(kind,id){
  const q={kind,id,i:0,got:[],wrong:[],picked:null,done:false,theta:1};
  if(kind==='lesson'){const l=LESSONS.find(x=>x.id===id);Object.assign(q,{items:l.items,title:'درس '+l.id,need:l.items.length})}
  else if(kind==='cp'){Object.assign(q,{items:shuffle(unitItems(id)).slice(0,8),title:'اختبار الوحدة '+id,need:7})}
  else if(kind==='ret'){Object.assign(q,{items:shuffle(itemsUpTo(id)).slice(0,4),title:'اختبار الاستبقاء (حتى الوحدة '+id+')',need:3})}
  /* الامتحان النهائيّ: سؤالٌ لكلّ تركيبٍ فارقٍ في المستوى — لا عشرةٌ
     عشوائيّة قد تترك نصفَه بلا قياس. وتفصيلُه في exam-level.js.

     وإن لم يُكتَب للمستوى مطلبٌ بعدُ رجع إلى العشوائيّ كما كان، فلا
     ينكسر مستوًى لم يبلغه العمل. */
  else if(kind==='exam'){
    const lv=LEVELS_BUILT.includes(id)?id:LEVELS_BUILT[0];
    const spec=examItems(lv);
    /* السقوطُ إلى العشوائيّ مقبولٌ لمستوًى لم يُكتب مطلبُه بعد،
       ومُنكَرٌ لمستوًى كُتب مطلبُه ثمّ لم يُخرج سؤالاً — الأوّلُ
       انتظار، والثاني عطبٌ في الوصل يجب أن يُسمَع. */
    if(!spec.length&&levelSpec(lv))
      logError('امتحان '+lv,new Error('مطلبُ المستوى مكتوبٌ ولم يُخرج سؤالاً — تحقّق من معرّفات القواعد'));
    const items=spec.length?spec:shuffle(levelItems(lv)).slice(0,10);
    /* ولا امتحانَ بصفر أسئلة: need يصير صفراً فيُحسَب نجاحاً ويُعلَن
       المستوى تامّاً بلا سؤالٍ واحد. */
    if(!items.length){logError('امتحان '+lv,new Error('لا أسئلة'));hooks.toast('تعذّر بناء الامتحان');return}
    Object.assign(q,{lv,items,title:'الامتحان النهائي '+lv,need:examNeed(items.length)});
  }
  /* محطّةُ المفردات: تُولَّد من بنك كلمات الوحدة لا من تمارينها. */
  else if(kind==='words'){
    const items=wordsItems(id);
    Object.assign(q,{items,title:'مفردات الوحدة '+id,need:Math.ceil(items.length*WORDS_PASS/100)});
  }
  else if(kind==='conv'){const c=CONVO.find(x=>x.id===id);Object.assign(q,{title:'محادثة: '+c.t,items:c.turns.map(t=>({q:t.p,o:t.o,a:t.a,tip:t.tip})),need:c.turns.length})}
  /* pickPlace تقرأ q.items لتتجنّب تكرار سؤال، فيجب أن توجد قبل أول نداء. */
  /* تدريب من المهارات التي أخطأ فيها في البوابة وحدها — لا الوحدة كلها. */
  else if(kind==='drill'){
    const d=S.drill||{skills:[]};
    const pool=itemsUpTo(LAST_UNIT).filter(it=>d.skills.indexOf(skillOf(it))>=0);
    const items=shuffle(pool).slice(0,Math.min(6,pool.length));
    Object.assign(q,{items,title:'تدريب موجَّه',need:items.length});
  }
  /* المراجعة: ما استحقّ من صناديق لايتنر، الأقدم استحقاقاً أولاً.
     ولا نضع أكثر من اثني عشر في الجلسة الواحدة: من غاب شهراً لا يصحّ أن
     يُستقبل بمائة سؤال، فيترك البرنامج من ثقلها. الباقي ينتظر الغد. */
  else if(kind==='review'){
    const items=reviewQueue();
    Object.assign(q,{items,title:'مراجعة اليوم',need:items.length});
  }
  else if(kind==='place'){q.title='تحديد المستوى';q.items=[];q.items.push(pickPlace(q))}
  S.q=q;hooks.render();window.scrollTo(0,0);
}
/* السحب العشوائي كان يترك وحدةً بسؤال واحد أو بلا أسئلة، فتصبح دقتها
   بلا معنى ويتعذّر اقتراح نقطة بداية. نوزّع الأسئلة على الوحدات الثلاث،
   ونجسّ A2 فقط بعد أن يثبت الإتقان. */
export function pickPlace(q){
  const used=q.items.map(x=>x.q);
  const pool=PLACE.filter(x=>!used.includes(x.q));
  if(!pool.length)return null;

  const seen={1:0,2:0,3:0};
  q.items.forEach(x=>{const u=unitOf(x);if(u)seen[u]++});

  /* لا نجسّ A2 قبل أن تأخذ كل وحدة ثلاثة أسئلة، وإلا جاءت دقتها من سؤالين
     فلا تكفي للحكم عليها. */
  if(q.theta>=1.5&&UNIT_NS.every(u=>seen[u]>=3)){
    const a2=pool.filter(x=>x.lv===2);
    if(a2.length)return shuffle(a2)[0];
  }

  const a1=pool.filter(x=>x.lv===1);
  if(!a1.length)return shuffle(pool)[0];
  for(const u of UNIT_NS.slice().sort((p,r)=>seen[p]-seen[r])){
    const c=a1.filter(x=>unitOf(x)===u);
    if(c.length)return shuffle(c)[0];
  }
  return shuffle(a1)[0];
}
export function pick(k){
  const q=S.q;if(q.picked!=null)return;
  const it=q.items[q.i],ok=k===it.a;
  q.picked=k;q.choiceOk=ok;if(q.kind!=='conv'){q.got.push(ok);if(!ok)q.wrong.push(it);remember(it,ok)}
  if(q.kind==='place')q.theta=Math.min(2,Math.max(1,q.theta+(ok?0.5:-0.5)));
  hooks.render();
}

/* التمارين المكتوبة: لا خيارات تُضغط، بل جواب يُنشَأ.

   والحكم هنا ثنائي لا درجات بينهما، لأن الدرس لا يُجتاز إلا بإصابة كل التمارين —
   ولكنّا نغفر زلّة حرف في الجواب الطويل: التمرين يقيس القاعدة لا الإملاء. */
export function typedOk(said,list){
  const a=normalize(said);
  if(!a)return false;
  return (list||[]).some(o=>{
    const b=normalize(o);
    return b===a||(b.split(' ').length>1&&lev(b,a)<=1);
  });
}

export function answerTyped(text){
  const q=S.q;if(!q||q.picked!=null)return;
  const it=q.items[q.i];
  if(!itemTyped(it))return;
  const said=String(text===undefined?typedField():text||'').trim();
  if(!said)return;
  const ok=typedOk(said,it.ok);
  q.picked=-1;q.typedAns=said;q.choiceOk=ok;remember(it,ok);
  q.got.push(ok);if(!ok)q.wrong.push(it);
  if(q.kind==='place')q.theta=Math.min(2,Math.max(1,q.theta+(ok?0.5:-0.5)));
  hooks.render();
}

/* من عجز عن الكتابة يرى الجواب، وتُحتسب خطأ: التعلّم لا يمنعه التعثّر. */
export function revealTyped(){
  const q=S.q;if(!q||q.picked!=null)return;
  const it=q.items[q.i];
  if(!itemTyped(it))return;
  q.picked=-1;q.typedAns='';q.choiceOk=false;remember(it,false);
  q.got.push(false);q.wrong.push(it);
  hooks.render();
}

/* كل إجابة تُحرّك السؤال بين الصناديق. والمحادثة مستثناة لأن أدوارها
   ليست تمارين مستقلّة، وتحديد المستوى مستثنى لأنّه قياس قبل التعلّم لا بعده. */
function remember(it,ok){
  if(!it||!it.q||!S.q)return;
  const k=S.q.kind;
  if(k==='conv'||k==='place')return;
  record(S.srs,it.q,ok);
  /* نحفظ عند كل إجابة لا عند نهاية الاختبار: من أغلق الصفحة في منتصف
     الدرس لا يصحّ أن تضيع مواعيد مراجعته، وهي أصل الفائدة هنا. */
  save();
}

/* الطابور يُبنى من نصوص الأسئلة إلى التمارين نفسها، وما لم نعد نجده
   يُتجاهل بلا ضجيج: قد يكون سؤالاً حُذف من البنك بعد أن درسه. */
const BY_Q=new Map(LESSONS.flatMap(l=>l.items).map(i=>[i.q,i]));

export function reviewQueue(n){
  return dueKeys(S.srs).map(k=>BY_Q.get(k)).filter(Boolean).slice(0,n||12);
}

export function reviewStats(){
  return {due:reviewQueue(999).length, soon:dueSoon(S.srs,1),
    boxes:boxCounts(S.srs), mastered:masteredCount(S.srs),
    tracked:Object.keys(S.srs).length, top:BOXES.length};
}

/* ينطق جملة تمرين الإملاء — من الحالة لا من سمة onclick، لئلا يُزرع النصّ في الصفحة فيُقرأ بدل أن يُسمع. */
export function sayItem(rate){
  const q=S.q;
  const it=q&&q.items[q.i];
  if(it&&it.k==='listen'&&it.ok&&it.ok[0])hooks.say(it.ok[0],rate||1);
}

export const itemTyped=it=>!!it&&it.k!=null&&it.k!=='mcq';

function typedField(){const el=document.getElementById('qtxt');return el?el.value:''}
export function nextQ(){window.scrollTo(0,0);
  const q=S.q;q.i++;q.picked=null;q.spoke=null;q.att=0;q.feedback=null;q.choiceOk=null;
  const total=q.kind==='place'?PLACE_N:q.items.length;
  if(q.i>=total)endQ();
  else if(q.kind==='place')q.items.push(pickPlace(q));
  hooks.render();
}
/* المهارات التي سقط فيها في هذا الاختبار، بلا تكرار. */
function missedSkills(q){
  const out=[];
  q.wrong.forEach(it=>{const s=skillOf(it);if(s&&s!=='a2'&&out.indexOf(s)<0)out.push(s)});
  return out;
}
/* مفتاح الاختبار في سجل المحاولات. */
function attemptKey(q){
  if(q.kind==='cp'||q.kind==='ret')return q.kind+q.id;
  if(q.kind==='exam')return 'exam';
  return null;
}
export function endQ(){
  const q=S.q;q.done=true;q.score=q.got.filter(Boolean).length;
  /* نسجّل كل محاولة: النجاح من المحاولة السابعة ليس كالنجاح من الأولى،
     وأي تقرير أداء بلا هذا الرقم يبالغ. */
  const key=attemptKey(q);
  if(key){S.attempts[key]=(S.attempts[key]||0)+1;q.attempt=S.attempts[key]}
  if(q.kind==='review'){q.pass=q.score>=Math.ceil(q.items.length*0.7);addXp(q.score*3)}
  else if(q.kind==='lesson'){q.pass=q.score===q.items.length;if(q.pass){S.lessons[q.id]=true;addXp(20)}}
  else if(q.kind==='cp'){
    q.pass=q.score>=q.need;
    if(q.pass){S.cp[q.id]=true;addXp(50);if(S.drill&&S.drill.unit===q.id)S.drill=null}
    else S.drill={unit:q.id,from:'cp',skills:missedSkills(q)};
  }
  else if(q.kind==='ret'){
    q.pass=q.score>=q.need;
    if(q.pass){S.ret[q.id]=true;addXp(30);if(S.drill&&S.drill.unit===q.id)S.drill=null}
    else S.drill={unit:q.id,from:'ret',skills:missedSkills(q)};
  }
  else if(q.kind==='drill'){
    /* التدريب علاجي، فلا يُجتاز إلا كاملاً. */
    q.pass=q.score===q.items.length;
    if(q.pass){S.drill=null;addXp(25)}
  }
  /* ورقةٌ فارغةٌ لا تُجتاز: وحدةٌ بلا بنك مفرداتٍ تُخرج صفرَ أسئلة،
     فـneed صفرٌ وq.score صفرٌ فتُحسَب نجاحاً، وتُسجَّل NaN نسبةً.
     فلا تُعَدّ محطّةٌ مخدومةً بلا سؤالٍ واحد. */
  else if(q.kind==='words'){
    if(!q.items.length){q.pass=false;return}
    q.pass=q.score>=q.need;
    keepWords(q.id,Math.round(q.score/q.items.length*100));
    if(q.pass)addXp(35);
  }
  else if(q.kind==='conv'){q.pass=q.score===q.items.length;if(q.pass){S.conv[q.id]=true;addXp(40)}}
  else if(q.kind==='exam'){q.pass=q.score>=q.need;if(q.pass){S.exam=true;if(q.lv)S.levelDone[q.lv]=true;addXp(100)}}
  else if(q.kind==='place'){
    const rows=q.items.map((x,i)=>({lv:x.lv,ok:q.got[i]}));
    const r1=rows.filter(r=>r.lv===1),r2=rows.filter(r=>r.lv===2);
    const a1=r1.length?r1.filter(r=>r.ok).length/r1.length:0;
    const a2=r2.length?r2.filter(r=>r.ok).length/r2.length:0;

    /* دقة كل وحدة على حدة: منها نقترح نقطة البداية بدل البدء من الصفر دائماً. */
    const units={};
    q.items.forEach((x,i)=>{
      const u=unitOf(x);
      if(!u)return;
      units[u]=units[u]||{ok:0,n:0};
      units[u].n++;if(q.got[i])units[u].ok++;
    });
    const acc={};UNIT_NS.forEach(u=>{acc[u]=units[u]&&units[u].n>=2?units[u].ok/units[u].n:null});

    /* أول وحدة لم يُتقنها، أو لم نقِسها أصلاً. لا نتخطى ما لم نقِسه. */
    let suggest=1;
    for(const u of UNIT_NS){ if(acc[u]!==null&&acc[u]>=0.75)suggest=u+1; else break }
    if(suggest>LAST_UNIT)suggest=LAST_UNIT;

    /* لا نكتب مستوىً لا محتوى خلفه. كان يُكتب «A2» لمن أجاد أسئلة الجسّ،
       وليس في البرنامج درس واحد من A2 — فهو رقم يُعرض على المستخدم بلا سند.
       ودقّة أسئلة الجسّ تُحفظ في S.place للاستئناس بها، لا لتُعلن مستوىً. */
    S.level='A1';
    S.placed=true;
    S.place={a1,a2,n1:r1.length,n2:r2.length,acc,suggest};
    q.pass=true;
  }
  save();
}

/* النصّ المكتوب ليس نطقاً. كان يُمرَّر إلى الحساب نفسه فيُحتسب «دقة نطق»
   لمن لم ينطق حرفاً — وهو ما يُفقد أي نسبة لاحقة معناها.
   نُبقي الكتابة متاحة (متصفح لا يدعم الصوت، أو مكان لا يُتكلَّم فيه)
   لكن نُعلّمها typed، ولا نعدّها قياساً للنطق. */
export function speakTurn(said,typed){
  const q=S.q;
  if(!q||q.kind!=='conv'||q.spoke!=null||!said)return;
  const it=q.items[q.i];
  const T=words(it.o[it.a]),G=words(said);
  const sc=Math.round(T.filter(w=>G.includes(w)).length/T.length*100);
  q.heard=said;q.att=(q.att||0)+1;

  if(typed){
    /* الكتابة تُجيز الانتقال ولا تُسجَّل درجة نطق. */
    q.spoke=null;q.typed=true;
    const pass=!!q.choiceOk&&sc>=75;
    q.got.push(pass);if(!pass)q.wrong.push(it);
    addXp(pass?5:1);save();hooks.render();return;
  }

  if(sc>=75||q.att>=2){
    q.spoke=sc;q.typed=false;
    const pass=!!q.choiceOk&&sc>=75;
    q.got.push(pass);if(!pass)q.wrong.push(it);
    addXp(pass?10:2);save();
  } else q.feedback='حاول مرة أخرى، لم أسمع: '+T.filter(w=>!G.includes(w)).join(' ');
  hooks.render();
}

/* يبدأ الدورة من وحدة معيّنة: يفتح ما قبلها بالتخطي، ولا يدّعي إتمامه.
   الوحدات المتخطّاة تبقى معروضة ومتاحة للمراجعة. */
export function startFrom(u){
  S.skipped={};
  for(let i=1;i<u;i++)S.skipped[i]=true;
  S.q=null;S.tab='course';S.open=null;save();hooks.render();
  if(hooks.goToStep)hooks.goToStep();
}
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
