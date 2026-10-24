const fs=require('fs');
function rep(p,pairs){let s=fs.readFileSync(p,'utf8');
 for(const [a,b] of pairs){const n=s.split(a).length-1;
  if(n!==1){console.error('x '+p+' ('+n+'): '+a.slice(0,70));process.exit(1)}
  s=s.replace(a,b)}
 fs.writeFileSync(p,s);console.log('ok '+p)}

const CARD = `  reviewCard()+
  (nx?card('تابع من حيث توقفت',`;

rep('views/home.js',[
["import {card,svg,ar,esc} from './ui.js';",
 "import {reviewStats} from '../engine/quiz.js';\nimport {BOXES} from '../engine/srs.js';\nimport {card,svg,ar,count,esc} from './ui.js';"],
["  (nx?card('تابع من حيث توقفت',", CARD]
]);

const FN = `
/* بطاقة المراجعة على رأس الصفحة لا في ذيلها: المستحقّ اليوم أولى من
   درس جديد، لأنّ ما ُينسى يضيع وما لم يُدرس بعد ينتظر.

   وإن لم يستحقّ شيء لا نعرض بطاقة فارغة، بل نطمئنه أن الموعد آتٍ. */
function reviewCard(){
  const r=reviewStats();
  if(!r.tracked)return '';

  if(!r.due)
    return card('المراجعة المتباعدة',
      '<p class="muted">لا شيء مستحقّ اليوم. '
      +(r.soon?'يستحقّ غداً '+count(r.soon,'سؤال','أسئلة')+'.':'ولا غداً.')+'</p>'
      +boxBar(r));

  return card('مراجعة اليوم',
    '<p class="muted">استحقّ '+count(r.due,'سؤال','أسئلة')
    +' مراجعتها اليوم — أسئلة أجبتَ عنها من قبل، تعود قبل أن تُنسى.</p>'
    +boxBar(r)
    +'<div class="row" style="justify-content:flex-start;margin-top:10px">'
    +'<button class="btn" onclick="launch(\'review\')">ابدأ المراجعة</button></div>');
}

/* شريط الصناديق: يرى المتعلّم أين هو من الإتقان لا رقماً مجرّداً. */
function boxBar(r){
  const tones=['var(--coral)','var(--amber)','var(--ind2)','var(--ind)','var(--green)'];
  return '<div style="display:flex;gap:4px;margin-top:10px;align-items:flex-end">'
    +r.boxes.map((n,i)=>'<div style="flex:1;text-align:center">'
      +'<div style="height:'+(6+Math.min(26,n*2))+'px;background:'+tones[i]
      +';border-radius:6px;opacity:'+(n?1:0.25)+'"></div>'
      +'<span class="muted" style="font-size:10.5px">'+ar(n)+'</span></div>').join('')
    +'</div>'
    +'<p class="muted" style="font-size:11.5px;margin-top:5px">من صندوق اليوم إلى صندوق '
    +ar(BOXES[BOXES.length-1])+' يوماً · أتقنت '+ar(r.mastered)+' من '+ar(r.tracked)+'</p>';
}
`;

let s=fs.readFileSync('views/home.js','utf8');
fs.writeFileSync('views/home.js', s+FN);
console.log('ok reviewCard');

rep('views/quiz.js',[
["  if(q.pass)\n    return q.kind==='drill'",
 `  /* المراجعة لا تُعاد: ما أخطأت فيه رجع إلى صندوق اليوم وسيعود غداً وحده،
     وإعادته الآن تقيس الذاكرة القريبة لا المحفوظ — وهذا ينقض المقصود. */
  if(q.kind==='review')
    return '<button class="btn" onclick="goHome()">تمام</button>';
  if(q.pass)
    return q.kind==='drill'`]
]);
