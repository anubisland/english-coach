/* صفحةُ اليوم من كتابك: المدرّبُ يفتحها معك ويُعلّق.

   وليست لوحةَ أرقام. المتعلّمُ يرى جُمَلَه هو، ويُطلَب منه أن يَدُلَّ
   على غلطته بنفسه — فإن عجز شُرحت له. وأسلوبُ الشرح يتبدّل بتكرار
   الغلطة لا يُعاد كما هو، لأنّ ما لا يُعالَج يتحجّر.

   وزرُّ «ابدأ» يبقى فوق كلّ شيء: الحسابُ على الأمس لا يُقعِد عن
   اليوم. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {linesOf, errHistory, errLevel, wrongIndex, bookStats, lines} from '../engine/book.js';
import {dayKey, lastActiveDay, dayReport} from '../engine/journal.js';
import {hasPlan, paceStatus, arNum} from '../engine/plan.js';
import {focusOf} from '../engine/focus.js';
import {RULE} from '../content/rules.js';
import {GR} from '../engine/grammar.js';
import {currentLevel} from '../engine/cefr.js';
import {LESSONS} from '../content/lessons.js';
import {ar, esc, card, svg} from './ui.js';

/* الدرسُ الذي يُصلح القاعدة — به يُرَدّ المتعلّم إلى علاج غلطته. */
const lessonFor = rid => {
  const l = LESSONS.find(x => (x.rules || []).some(r => (r.id || r) === rid));
  return l ? l.id : null;
};

export function todayFound(i){
  const f = S.found || (S.found = {});
  f[i] = true; save(); hooks.render();
}
export function todayMiss(i){
  const f = S.found || (S.found = {});
  f['x' + i] = (f['x' + i] || 0) + 1; save(); hooks.render();
}

const say = (txt, sub) => `<div class="coach-row"><div class="coach-ava">${svg('coach',18,'#fff')}</div>
  <div class="coach-says">${txt}${sub ? `<span class="coach-sub">${sub}</span>` : ''}</div></div>`;

/* يُستقبَل ثمّ يُؤمَر.

   وكان بطاقةُ «ابدأ الآن» فوق وتحتها «أهلاً بك، ابدأ بكذا» — أي
   أنّه يُؤمَر ثمّ يُحيَّا ثمّ يُؤمَر بالشيء نفسه مرّتين. فصار كلامُ
   المدرّب أوّلَ الشاشة، والبطاقةُ تحته تَحمل الزرّ. */
export function todayView(nx, startHtml){
  /* آخرُ جلسةٍ عمل فيها، وإن كانت اليوم.

     وكان يُؤخَذ آخرُ يومٍ قبلَ اليوم وحدَه، فمن ذاكر الآن ثمّ فتح
     الصفحةَ لم يجد فيها شيئاً — وهو أحوجُ ما يكون إلى جُمَله وهي
     طريّةٌ في ذهنه. */
  const prev = lastActiveDay() || (linesOf(dayKey()).length ? dayKey() : null);
  const rep = prev ? dayReport(prev) : null;
  /* وما لا موضعَ لغلطه لا يَصير تمريناً: البطاقةُ تَسأل «دوس على
     الكلمة» فإن لم تكن ثمّةَ كلمةٌ مختلفة قالت لكلّ ما يَدوس «لا،
     ليست هذه» بلا مخرج. وقد يقع هذا بفرقٍ في علامةٍ أو حرفِ كبيرٍ
     يَراه fix ولا يَراه wrongIndex. */
  const mine = prev ? linesOf(prev).filter(x => x.fix && wrongIndex(x) >= 0) : [];
  const st = bookStats();

  let h = '';

  /* ١ — محضرُ أمس بصوت المدرّب، من أرقامٍ حقيقيّة. */
  if (rep || mine.length) {
    const when = prev === dayKey() ? 'اليوم' : 'آخرَ مرّة';
    const did = rep
      ? `${when} أنهيتَ <b>${ar(rep.stations)}</b> محطّة`
        + (rep.total ? ` وأجبتَ عن <b>${ar(rep.total)}</b> سؤالاً، أصبتَ <b>${ar(rep.right)}</b>` : '')
        + '.'
      : `${when} كتبتَ <b>${ar(linesOf(prev).length)}</b> جملة.`;
    /* والشرحُ يُقال مرّةً واحدة: أوّلَ يومٍ تَظهر فيه جُمَلُه. */
    const firstTime = mine.length && lines().length <= mine.length;
    h += say(did + (mine.length
      ? (firstTime
          ? '<br>وكلُّ جملةٍ تكتبها أحفظها لك — هذه جُمَلُك، كما كتبتَها.'
            + `<br>وفي <b>${ar(mine.length)}</b> منها غلطة. ما أقولُها لك، <b>دُلَّ عليها</b>.`
          : `<br>وفي <b>${ar(mine.length)}</b> من جُمَلك غلطة — ما أقولُها لك، <b>دُلَّ عليها</b>.`)
      : '<br>ولا غلطةَ في جُمَلك. أحسنتَ.'));
  } else {
    /* ومن له تاريخٌ قبل أن يُبنى السجلُّ اليوميّ لا يُستقبَل استقبالَ
       الغريب.

       فالسجلُّ بالأيّام جديد، ومن كان في وحدته الثالثة قبلَه ليس له
       فيه يوم — فكان يُقال له «أهلاً بك، هذه أوّلُ محطّةٍ في طريقك»
       وهو في منتصف الطريق. والبرنامجُ يَعرف ما أتمّه وما يُخطئ فيه،
       وإن لم يَعرف متى، فيُقال له ذلك. */
    const past = legacy();
    if (past) h += say(past);
    else

    /* أوّلُ يومٍ: جملةٌ واحدةٌ تُسمّي ما يبدأ به، لا أكثر.

       وكانت تقول «ابدأ بالمحطّة التي فوق» — وموضعُ الشيء على الشاشة
       ليس اسماً له — ثمّ تَشرح له أنّي «أُسجّل كلَّ ما تكتبه وأُريك
       إيّاه هنا»، وهو وعدٌ عن شيءٍ لم يَره بعد، فلا يَعلق منه شيء.
       وموضعُ ذلك الشرحِ أوّلُ يومٍ يجد فيه جُمَلَه معروضةً. */
    /* ولا يُؤمَر بالبدء وعليه خطوةٌ لم تتمّ: أمرانِ متنازعان. */
    h += say(!hasPlan()
      ? 'أهلاً بك. حدّدتَ نقطةَ بدايتك — بقيت خطوةٌ واحدةٌ ثمّ ننطلق.'
      : nx ? 'أهلاً بك. هذه أوّلُ محطّةٍ في طريقك — ابدأ بها.'
           : 'أهلاً بك.');
  }

  /* ومن بقيت عليه خطوةٌ من خطوات البداية تُقدَّم على «ابدأ الآن».

     وكانت تُعرَضان معاً: «ابدأ بها» و«بقيت خطوةٌ واحدة» في شاشةٍ
     واحدة — أمرانِ متنازعان، ولا يَعلم أيَّهما يُجيب. فتُقدَّم
     الخطوةُ الباقيةُ ويُؤخَّر الأمرُ بالبدء حتّى تتمّ. */
  /* وما دامت خطوةٌ من خطوات البداية باقيةً فهي وحدَها المعروضة.

     وقيل له «ثلاثُ خطواتٍ قبل أن تبدأ»، فلو بقي زرُّ «ابدأ الآن»
     معها كان باباً جانبيّاً يتخطّاها منه — وشاشةُ «اليوم» كلُّها
     تُحاسبه على خطّته، فبغيرها أرقامٌ بلا مرجع.

     ولا يُحبَس بهذا من بدأ فعلاً: من كان له تقدّمٌ قبل أن تُبنى
     الخطّةُ أصلاً ليس في مرحلة البداية، فالخطّةُ له تذكيرٌ لا بوّابة. */
  const started = Object.keys(S.lessons || {}).length
    || Object.keys(S.conv || {}).length
    || (S.book || []).length;
  const pending = !hasPlan() && !started;
  if (pending) return h + planLine();

  /* ثمّ البطاقةُ التي فيها الزرّ — بعد أن يُحيَّا ويُقال له بماذا يبدأ. */
  h += startHtml || '';

  /* ٢ — جُمَلُك: كلُّ واحدةٍ تمرينٌ قائمٌ بذاته. */
  if (mine.length) {
    h += `<div class="page"><div class="pageHead">📖 <b>صفحتك</b>
      <span>${esc(srcOf(mine))}</span></div><div class="lines">`
      + mine.slice(0, 4).map((rec, i) => lineHtml(rec, i)).join('')
      + '</div></div>';
  }

  /* ٣ — الكتاب: ما كتبتَه حتّى الآن، وبابٌ إليه.

     وكان يُعرَض عدَدُه بلا باب: «كتابُك ٤٠ جملة» ولا سبيلَ إلى
     قراءتها. فتُجمَع له مئتان وأربعون جملةً لا يَبلغ منها إلّا
     جُمَلَ آخر جلسةٍ في البطاقة فوق. */
  if (st.total)
    h += `<div class="bookbar">
      <b>كتابُك</b>
      <span>${ar(st.total)} جملةً من كلامك · ${ar(st.clean)} سليمةً ·
        <b>${ar(st.wrong)}</b> كانت غلطاً</span>
      <button class="btn ghost sm" onclick="go('book')">اقرأه من أوّله</button></div>`;

  /* ٤ — أين أنت من خطّتك. */
  /* وقد عُرضت فوق إن كانت خطوةً باقية، فلا تُعاد. */
  if (!pending) h += planLine();
  return h;
}

const srcOf = mine => {
  const s = [...new Set(mine.map(x => x.src).filter(Boolean))];
  return s.length ? s[0] : '';
};

function lineHtml(rec, i){
  const found = !!(S.found || {})[i];
  const misses = (S.found || {})['x' + i] || 0;
  const wi = wrongIndex(rec);
  const rid = rec.r[0];
  const lvl = rid ? errLevel(rid) : 1;
  const hist = rid ? errHistory(rid) : [];

  const words = rec.t.split(/\s+/).map((w, j) => {
    const cls = found && j === wi ? 'w miss' : 'w';
    return `<span class="${cls}" onclick="${j === wi ? `todayFound(${i})` : `todayMiss(${i})`}">${esc(w)}</span>`;
  }).join(' ');

  let ask;
  if (found) ask = `<div class="ask done">✓ لقيتَها.${
    hist.length > 1 ? ` وهذه <b>${ordinal(hist.length)}</b> مرّة.` : ''}</div>`;
  else if (misses) ask = `<div class="ask">لا، ليست هذه. جرّب مرّةً أخرى.${
    misses >= 2 && lvl >= 3 ? ' <span class="muted">الغلطةُ في الفعل.</span>' : ''}</div>`;
  else ask = '<div class="ask">فين الغلطة؟ دوس على الكلمة.</div>';

  return `<div class="ln">
    <div class="meta">${esc(rec.src || '')} · كتبتَها بنفسك</div>
    <div class="en">${words}</div>
    ${ask}
    ${found ? after(rec, rid, lvl, hist) : ''}
  </div>`;
}

/* ما يُقال بعد أن يجدها — وهو موضعُ التصعيد. */
function after(rec, rid, lvl, hist){
  const R = rid ? RULE[rid] : null;
  const les = rid ? lessonFor(rid) : null;

  let body = `<span class="lbl">الصواب</span>
    <div class="en"><span class="good">${esc(rec.fix)}</span></div>`;

  if (lvl >= 2 && hist.length > 1)
    {
      const days = [...new Set(hist.map(x => x.d).filter(Boolean))];
      body += `<p class="when">${days.map(d => esc(dayAr(d))).join(' · ')}${
        days.length < hist.length ? ` · ${ar(hist.length)} مرّات` : ''}</p>`;
    }

  /* الثالثةُ فصاعداً: تُشرَح القاعدةُ وسببُ وقوع العربيّ فيها. */
  if (lvl >= 3 && R)
    body += `<p class="when"><span class="tag t2">${ordinal(hist.length)} مرّة</span>
      ولأنّها تكرّرت، لن أمرَّ عليها: <b>${esc(R.rule || R.t)}</b>${
      R.why ? `<br>${esc(R.why)}` : ''}</p>`;

  if (lvl >= 4)
    body += `<p class="when"><span class="tag t2">دَين</span>
      وقعتَ فيها ${ar(hist.length)} مرّات. أُثبتها عليك حتّى تمرَّ بدرسها.</p>`;

  if (les)
    body += `<button class="btn sm" onclick="openLesson('${les}')">ارجع إلى درس ${les}</button>`;

  return `<div class="after show">${body}</div>`;
}

/* الخطّةُ تُوضَع في الإعدادات، وتُذكَّر هنا تذكيراً.

   وهذا قرارُ صاحب البرنامج: موضعُ التعريف والخطّة الإعدادات، و«اليوم»
   لا يُعيد سؤالَه عمّا أجاب عنه — إنّما يُذكّره بما اختار. */
function planLine(){
  if (!hasPlan())
    /* ومن فرغ من الاختبار يُسلَّم إلى الخطّة بزرٍّ يَفتحها، لا
       بإحالةٍ إلى الإعدادات يَبحث فيها. والإعداداتُ موضعُها بعدُ،
       لمن أراد أن يُغيّر. */
    return card('بقيت خطوةٌ واحدة',
      '<p>عرفتَ البرنامج، وحدّدتَ نقطةَ بدايتك — وأنت الآن في '
      + '<span class="en">' + esc(currentLevel()) + '</span>. '
      + 'يبقى أن نَضع خطّتك: بمَ تَبدأ في كلّ وحدة، وكم تُذاكر في الأسبوع.</p>'
      + '<div class="row" style="justify-content:flex-start">'
      + '<button class="btn" onclick="planStart()">ضَع خطّتك الآن</button></div>');

  const p = paceStatus();
  if (!p) return '';

  /* ولا يُقال لمن لم يَبدأ «أنت متأخّر».

     وكان يُقال: من وَضع خطّتَه قبل دقيقةٍ يُفتَح له البرنامجُ بـ«متأخّرٌ
     عن خطّتك · أنجزتَ ٠ من ١٩» — وهذا حكمٌ على عملٍ لم يُطلَب بعد،
     ولا مدرّبَ يَستقبل تلميذَه في أوّل يومٍ بأنّه قصّر.

     فالمحاسبةُ لا تبدأ إلّا بعد أن يمرَّ أسبوعٌ على الخطّة وقد عمل
     فيه شيئاً. وقبل ذلك تُذكَّر الخطّةُ تذكيراً لا تقريعاً. */
  const fresh = !p.stations && !p.worked;
  const young = p.plan.from && daysSince(p.plan.from) < 7;
  const f = focusOf(S.plan);

  /* وما يُقال له أثرُ اختياره وما وَعد به، لا موعدٌ حسبتُه له.

     وكان يُقال «وبهذه السرعة تُنهي A1 يوم ١٢ مارس» — تاريخٌ اشتُقّ
     بقسمةِ ما بقي على ما وَعد، ثمّ صار ديناً عليه يُقال له «متأخّر».
     وهو لم يَعِد به، وإنّما وَعد بأيّامه. فعليها يُحاسَب. */
  const line = f ? `<br>وبدايةُ كلّ وحدةٍ على ${esc(f.t)}: ${esc(f.sub)}.` : '';

  if (fresh || young)
    return `<div class="plan-line ok">
      <b>خطّتُك</b>
      <span>${ar(p.plan.mins)} دقيقةً، ${ar(p.plan.days)} أيّامٍ في الأسبوع.${line}
        ${fresh ? '' : `<br>أنجزتَ ${ar(p.stations)} محطّةً هذا الأسبوع.`}</span>
      <button class="btn ghost sm" onclick="go('settings')">التعريف بالبرنامج والخطّة</button></div>`;

  return `<div class="plan-line ${p.kept ? 'ok' : 'late'}">
    <b>${p.kept ? 'وفَيتَ بما وعدتَ' : `بقي عليك ${arDays(p.owed)}`}</b>
    <span>وعدتَ بـ${arDays(p.plan.days)} في الأسبوع، ${ar(p.plan.mins)} دقيقةً في اليوم ·
      ذاكرتَ ${arDays(p.worked)} وأنجزتَ ${ar(p.stations)} محطّةً.${line}</span>
    <button class="btn ghost sm" onclick="go('settings')">التعريف بالبرنامج والخطّة</button></div>`;
}

/* جمعُ العربيّة ليس إضافةَ لاحقة: «يومٌ» و«يومان» و«أيّام» —
   وقولُ «٢ أيّامٍ» لحنٌ يُقرأ ركيكاً فيُضعف ثقةَ القارئ. وكان في
   البرنامج arWeeks يَحمل هذه القاعدةَ مكتوبةً، فلمّا رُفع الموعدُ
   رُفعت معه فعاد اللحنُ من حيث خرج. فها هي لليوم.

   والمثنّى ها هنا مجرورٌ أبداً («بقي عليك يومين»، «ذاكرتَ يومين»)،
   فلا يُحتاج إلى إعرابه. */
const arDays = n => n === 1 ? 'يوماً' : n === 2 ? 'يومين' : ar(n) + ' أيّام';

const daysSince = key => {
  if (!key) return 999;
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor((Date.now() - new Date(y, m - 1, d).getTime()) / 86400000);
};

const ORD = ['', 'أوّل', 'ثاني', 'ثالث', 'رابع', 'خامس', 'سادس'];
const ordinal = n => ORD[n] || arNum(n);
const dayAr = d => {
  if (!d) return '';
  const [, m, dd] = d.split('-');
  const M = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  return arNum(+dd) + ' ' + M[+m - 1];
};

/* ما يُعرَف عن ماضيه بلا سجلٍّ بالأيّام: ما أتمّه، وما يُخطئ فيه.

   وS.errs تَعُدّ الخطأ بنصّه العربيّ لا بهويّة قاعدته — فيُرَدّ
   النصُّ إلى قاعدته من بنك القواعد، ومنها إلى الدرس الذي يُصلحها. */
const ridOfText = t => (GR.find(r => r.ar === t) || {}).rid;

function legacy(){
  const ls = Object.keys(S.lessons || {});
  const errs = Object.entries(S.errs || {}).sort((a, b) => b[1] - a[1]);
  if (!ls.length && !errs.length) return '';

  /* بلا pop: تَنزع عنصراً من المصفوفة، فيَنقص العددُ المعروضُ واحداً. */
  const last = ls.slice().sort()[ls.length - 1];
  let out = ls.length
    ? `أنت معنا من قبل: أتممتَ <b>${ar(ls.length)}</b> ${ls.length === 1 ? 'درساً' : 'دروس'}`
      + (last ? `، آخرُها <b>الدرس ${last}</b>` : '') + '.'
    : 'أنت معنا من قبل.';

  if (errs.length) {
    const [txt, n] = errs[0];
    const rid = ridOfText(txt);
    const les = rid ? lessonFor(rid) : null;
    out += `<br>وأكثرُ ما تُخطئ فيه: <b>${esc(txt)}</b> — وقعتَ فيه ${ar(n)} ${n === 2 ? 'مرّتين' : 'مرّات'}`
      + (les ? ` ويُصلَح في <b>درس ${les}</b>` : '') + '.';
  }

  /* ولا يُقال له متى كان ذلك: السجلُّ بالأيّام لم يكن موجوداً حينها،
     والادّعاءُ بتاريخٍ لا نَعرفه أسوأُ من السكوت عنه. */
  out += '<br><span class="coach-sub">ومن اليوم أحفظ لك كلَّ جملةٍ تكتبها وأُريك إيّاها هنا.</span>';
  return out;
}
