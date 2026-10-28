/* نقطة الدخول: يربط المحرك بالواجهة، ويعرض الدوال للمعالجات داخل الـ HTML. */
import * as state from './engine/state.js';
import {S,save,logError,bootState} from './engine/state.js';
import {setHooks} from './engine/bus.js';
import * as grammar from './engine/grammar.js';
import * as pronounce from './engine/pronounce.js';
import * as progress from './engine/progress.js';
import * as quiz from './engine/quiz.js';
import * as chat from './engine/chat.js';
import * as ui from './views/ui.js';
import * as home from './views/home.js';
import * as course from './views/course.js';
import * as quizv from './views/quiz.js';   // ليس quizView: الاسم يحجب الدالة
import * as speak from './views/speak.js';
import * as settings from './views/settings.js';
import * as reviewer from './engine/reviewer.js';
import * as reviewerPanel from './views/reviewer-panel.js';
import * as syncPanel from './views/sync-panel.js';
import * as syncEng from './engine/sync.js';
import * as translate from './views/translate.js';
import * as sounds from './views/sounds.js';
import * as examScore from './engine/exam-score.js';
import * as writeScore from './engine/write-score.js';
import * as relevanceEng from './engine/relevance.js';
import * as srs from './engine/srs.js';
import * as readScore from './engine/read-score.js';
import * as examRead from './engine/exam-read.js';
import * as roadmapContent from './content/roadmap.js';
import * as roadmapView from './views/roadmap.js';
import * as cefrEng from './engine/cefr.js';
import * as cefrView from './views/cefr.js';
import * as examDict from './engine/exam-dictation.js';
import * as examDictView from './views/exam-dictation.js';
import * as examReadView from './views/exam-read.js';
import * as examWrite from './engine/exam-write.js';
import * as examWriteView from './views/exam-write.js';
import * as examConv from './engine/exam-convo.js';
import * as examConvView from './views/exam-convo.js';
import * as trEngine from './engine/translate.js';

function toggleTheme(){setTheme(S.theme==='light'?'dark':'light')}
function setTheme(k){S.theme=k==='dark'?'dark':'light';applyTheme();save();render()}
function applyTheme(){
  const el=document.documentElement;
  if(el&&el.setAttribute)el.setAttribute('data-theme',S.theme==='dark'?'dark':'light');
  const b=document.getElementById('themeBtn');
  /* لون شريط المتصفح يتبع الوضع، وإلا بدا التطبيق المثبَّت مقطوعاً عن ترويسته. */
  const tc=document.querySelector&&document.querySelector('meta[name="theme-color"]');
  if(tc&&tc.setAttribute)tc.setAttribute('content',S.theme==='dark'?'#0B0D1C':'#F6F5FB');
  /* الزر يعرض ما سينتقل إليه، لا ما هو فيه. */
  if(b){b.textContent=S.theme==='light'?'🌙':'☀️';b.setAttribute&&b.setAttribute('aria-label',S.theme==='light'?'التبديل إلى الوضع الليلي':'التبديل إلى الوضع النهاري')}
}

function renderNav(){
  const T=[['home','home','اليوم'],['course','map','الرحلة'],['speak','mic','التحدث']];
  document.getElementById('nav').innerHTML='<div class="inner">'+T.map(t=>
    `<button class="tab ${S.tab===t[0]?'on':''}" onclick="go('${t[0]}')">${ui.svg(t[1],21)}<span>${t[2]}</span></button>`).join('')+'</div>';
}

function go(t){S.tab=t;S.q=null;save();render()}

const HEAD={
  /* اسم البرنامج في الشريط، فلا يتكرر هنا. */
  home:['اليوم','الكلام أولاً: شرح، تمرين، ثم محادثة حقيقية'],
  course:['خريطة الرحلة','محطة بعد محطة حتى تتقن المستوى'],
  speak:['المحادثة الحيّة','تكلّم، وسنصحّح لك بالعربية'],
  settings:['الإعدادات','المظهر، والهدف، ونقل تقدّمك'],
  translate:['اختبار الترجمة','من العربية إلى الإنجليزية، بلا خيارات'],
  sounds:['تدريب الأصوات','الأصوات التي يصعب على العربي نطقها'],
  examconv:['اختبار المحادثة','ثمانية أدوار في موقف لم تتدرّب عليه'],
  examwrite:['اختبار الكتابة','تكتب بيدك، بلا خيارات'],
  examread:['اختبار القراءة','نصّ قصير ثم أسئلة عليه'],
  examdict:['اختبار الإملاء','تسمع وتكتب'],
  cefr:['أين أنت من A1','قياسك على الإطار الأوروبي'],
  roadmap:['خريطة المنهج','المستويات الستّة وما بُني منها']
};
function renderHead(){
  const h=HEAD[S.tab]||HEAD.home;
  const t=document.getElementById('hTitle'),p=document.getElementById('hSub');
  if(t)t.textContent=h[0];
  if(p)p.textContent=h[1];
}

function render(){
  const app=document.getElementById('app');
  try{
    applyTheme();
    renderHead();
    renderNav();
    app.innerHTML=ui.banners()+(S.q?quizv.quizView():VIEWS[S.tab]());
  }catch(e){
    /* أي استثناء هنا كان يترك الصفحة فارغة بلا شريط تنقل ولا مخرج. */
    logError('رسم الشاشة',e);
    if(app)app.innerHTML='<div class="card"><h2>تعذّر عرض هذه الشاشة</h2><p class=muted>حدث خطأ غير متوقع، وتقدّمك محفوظ.</p><div class=row><button class=btn onclick="goHome()">العودة إلى الرئيسية</button></div></div>';
  }
}
function goHome(){S.tab='home';S.q=null;S.open=null;save();render()}

/* آخر خط دفاع: أي استثناء داخل أي onclick كان يُجمّد الواجهة بصمت. */
if(window.addEventListener)window.addEventListener('error',ev=>{
  logError('خطأ غير متوقع',(ev&&(ev.error||ev.message))||ev);
  ui.toast('حدث خطأ غير متوقع. أعد تحميل الصفحة إن توقّف التطبيق');
});

const VIEWS={home:home.homeView,course:course.courseView,speak:speak.speakView,settings:settings.settingsView,translate:translate.translateView,sounds:sounds.soundsView,examconv:examConvView.examConvView,examwrite:examWriteView.examWriteView,examread:examReadView.examReadView,examdict:examDictView.examDictView,cefr:cefrView.cefrView,roadmap:roadmapView.roadmapView};

/* المعالجات داخل الـ HTML (onclick) تحتاج أسماءً عامة. */
Object.assign(window,{
  ...state,...grammar,...pronounce,...progress,...quiz,...chat,...ui,...home,...course,...quizv,...speak,...settings,...reviewerPanel,...syncPanel,...translate,...trEngine,...sounds,...examScore,...examConv,...examConvView,...writeScore,...examWrite,...examWriteView,...readScore,...examRead,...examReadView,...examDict,...examDictView,...cefrEng,...cefrView,...roadmapContent,...roadmapView,...srs,...relevanceEng,
  render,renderNav,renderHead,go,goHome,applyTheme,toggleTheme,setTheme
});
/* S مرتبط حيّاً لأنه يُعاد بناؤه عند كل إقلاع. */
Object.defineProperty(window,'S',{get:()=>S,configurable:true});

setHooks({render,toast:ui.toast,say:ui.say,nextStep:home.nextStep,goToStep:course.goToStep});
bootState();
render();

/* المزامنة عند الفتح، ومن بعدُ لا يفعل المتعلّم شيئاً.

   وبعد render لا قبله: الشاشةُ تظهر فوراً بما على الجهاز، ثمّ
   تُحدَّث إن جاء من الوسيط جديد. ولو انتُظرت الشبكةُ أوّلاً لبقي
   أمامه بياضٌ كلّما ضعف اتّصاله.

   والإخفاقُ لا يُزعجه برسالة: هو لم يطلب شيئاً، والتطبيق يعمل بلا
   شبكة كما هو. ويبقى الأثرُ في سطر الإعدادات «زامنتَ قبل كذا»،
   فمن أراد أن يعرف وجد. */
if (syncEng.syncOn()) {
  /* صامتةٌ لأنّه لم يطلبها، ولكنّها تمرّ بالحارس نفسه: نداءان
     على حالةٍ واحدة يكتب أحدهما فوق دمج الآخر، والرسمُ على يدٍ
     تكتب يمحو فقرتها. وخطؤها يُسجَّل وإن لم يُزعج صاحبه. */
  syncPanel.syncRun(true).catch(e => state.logError('مزامنة الإقلاع', e));
}

/* واجهة الوحدة: تتيح للاختبارات إعادة بناء الحالة والوصول إلى كل شيء بأسمائه. */
export * from './content/lessons.js';
export * from './content/rules.js';
export * from './content/scenes.js';
export * from './content/convo.js';
export * from './engine/state.js';
export * from './engine/grammar.js';
export * from './engine/pronounce.js';
export * from './engine/progress.js';
export * from './engine/quiz.js';
export * from './engine/chat.js';
export * from './views/ui.js';
export * from './views/home.js';
export * from './views/course.js';
export * from './views/quiz.js';
export * from './views/speak.js';
export * from './views/settings.js';
export * from './engine/reviewer.js';
export * from './views/reviewer-panel.js';
export * from './views/sync-panel.js';
export * from './engine/sync.js';
export * from './engine/sync-merge.js';
export * from './views/translate.js';
export * from './views/sounds.js';
export * from './engine/exam-convo.js';
export * from './views/exam-convo.js';
export * from './engine/translate.js';
export * from './content/translate.js';
export * from './content/sounds.js';
export * from './content/exam-scenes.js';
export * from './engine/exam-score.js';
export * from './engine/write-score.js';
export * from './engine/exam-write.js';
export * from './views/exam-write.js';
export * from './content/write-tasks.js';
export * from './engine/read-score.js';
export * from './engine/exam-read.js';
export * from './engine/exam-dictation.js';
export * from './engine/cefr.js';
export * from './views/cefr.js';
export * from './content/cefr.js';
export * from './content/roadmap.js';
export * from './views/roadmap.js';
export * from './views/exam-dictation.js';
export * from './engine/srs.js';
export * from './engine/relevance.js';
export * from './views/exam-read.js';
export * from './content/read-texts.js';
export {render,renderNav,renderHead,go,goHome,applyTheme,toggleTheme,setTheme,VIEWS};
