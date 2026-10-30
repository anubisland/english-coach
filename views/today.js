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
import {hasPlan, paceStatus, arDate, arWeeks, arNum} from '../engine/plan.js';
import {RULE} from '../content/rules.js';
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

const say = (txt, sub) => `<div class="coach-row"><div class="coach-ava">م</div>
  <div class="coach-says">${txt}${sub ? `<span class="coach-sub">${sub}</span>` : ''}</div></div>`;

export function todayView(nx){
  /* آخرُ جلسةٍ عمل فيها، وإن كانت اليوم.

     وكان يُؤخَذ آخرُ يومٍ قبلَ اليوم وحدَه، فمن ذاكر الآن ثمّ فتح
     الصفحةَ لم يجد فيها شيئاً — وهو أحوجُ ما يكون إلى جُمَله وهي
     طريّةٌ في ذهنه. */
  const prev = lastActiveDay() || (linesOf(dayKey()).length ? dayKey() : null);
  const rep = prev ? dayReport(prev) : null;
  const mine = prev ? linesOf(prev).filter(x => x.fix) : [];
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
    h += say(did + (mine.length
      ? `<br>وفي <b>${ar(mine.length)}</b> من جُمَلك غلطة — ما أقولُها لك، <b>دُلَّ عليها</b>.`
      : '<br>ولا غلطةَ في جُمَلك. أحسنتَ.'));
  } else {
    h += say('لم تبدأ بعد. أوّلُ محطّةٍ تحتها، وأنا أُسجّل لك من اليوم.');
  }

  /* ٢ — جُمَلُك: كلُّ واحدةٍ تمرينٌ قائمٌ بذاته. */
  if (mine.length) {
    h += `<div class="page"><div class="pageHead">📖 <b>صفحتك</b>
      <span>${esc(srcOf(mine))}</span></div><div class="lines">`
      + mine.slice(0, 4).map((rec, i) => lineHtml(rec, i)).join('')
      + '</div></div>';
  }

  /* ٣ — الكتاب: ما كتبتَه حتّى الآن. */
  if (st.total)
    h += `<div class="bookbar">
      <b>كتابُك</b>
      <span>${ar(st.total)} جملةً من كلامك · ${ar(st.clean)} سليمةً ·
        <b>${ar(st.wrong)}</b> كانت غلطاً</span></div>`;

  /* ٤ — أين أنت من خطّتك. */
  h += planLine();
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

function planLine(){
  if (!hasPlan())
    return card('ما خطّتُك؟',
      '<p class="muted">لم نتّفق على خطّةٍ بعد — دقائقُك وأيّامُك وموعدُ فراغك من <span class="en">'+esc(currentLevel())+'</span>.</p>'
      + '<div class="row" style="justify-content:flex-start">'
      + '<button class="btn" onclick="planStart()">ضَع خطّتك</button></div>');

  const p = paceStatus();
  if (!p) return '';
  const late = !p.onTrack;
  return `<div class="plan-line ${late ? 'late' : 'ok'}">
    <b>${late ? 'متأخّرٌ عن خطّتك' : 'ماشٍ على خطّتك'}</b>
    <span>وعدتَ بـ${ar(p.plan.mins)} دقيقةً ${ar(p.plan.days)} أيّامٍ في الأسبوع ·
      أنجزتَ ${ar(p.stations)} محطّةً هذا الأسبوع من ${ar(p.stationsPerWeek)}.<br>
      وبهذه السرعة تُنهي <span class="en">${esc(currentLevel())}</span> في ${arWeeks(p.weeks)} — يوم ${arDate(p.date)}.</span>
    <button class="btn ghost sm" onclick="planStart()">غيّر خطّتك</button></div>`;
}

const ORD = ['', 'أوّل', 'ثاني', 'ثالث', 'رابع', 'خامس', 'سادس'];
const ordinal = n => ORD[n] || arNum(n);
const dayAr = d => {
  if (!d) return '';
  const [, m, dd] = d.split('-');
  const M = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  return arNum(+dd) + ' ' + M[+m - 1];
};
