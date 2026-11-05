/* «اقرأ كتابك»: جُمَلُه كلُّها من أوّلها، لا جملةَ أمسِ وحدَها.

   وكان الكتابُ يُجمَع ولا يُقرأ: شاشةُ «اليوم» تَعرض جُمَلَ آخر
   جلسةٍ تمريناً، ثمّ تَمضي — فما مضى محفوظٌ لا يَبلغه صاحبُه. وقد
   جُمعت له مئتان وأربعون جملةً لا بابَ إليها.

   وأنفعُ ما فيه أن يَرى إنجليزيّتَه وهي تَتعدّل: جملةٌ كتبها في
   الوحدة الثانية وأخرى في السادسة، والفرقُ بينهما بخطّ يده. وهذا
   ما لا يُعطيه رقمٌ ولا نسبة.

   ولا يُعاد ها هنا تمرينُ «دُلَّ على الغلطة»: ذاك موضعُه «اليوم»
   حيث الجملةُ طريّة. وها هنا يُقرأ ويُراجَع — والصوابُ مكشوفٌ لا
   يُسأل عنه، فمن جاء يقرأ لا يُمتحَن. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {lines, bookStats, wrongIndex, wrongLine} from '../engine/book.js';
import {RULE} from '../content/rules.js';
import {card, ar, esc} from './ui.js';

/* المعروض: الكلُّ أو ما فيه تصحيح. */
export function bookFilter(k){ S.bookF = (k === 'bad') ? 'bad' : 'all'; save(); hooks.render() }

/* ما يُعرَض عند الترشيح هو ما يَعُدّه العنوانُ غلطاً، لا غيرَه.

   وكان العنوانُ يَعُدّ بالأرقام والمُرشَّحُ يُرشّح بالتصحيح، فيَقرأ
   «أربعون جملةً، في أربعين منها لم تُخطئ» ثمّ يَدوس «ما أخطأتُ فيه»
   فيَجد اثنتي عشرة. مِقياسان لشيءٍ واحد. */

const dayAr = d => {
  if (!d) return '';
  const [y, m, dd] = String(d).split('-').map(Number);
  const MON = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
               'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  return Number.isFinite(dd) && MON[m - 1] ? ar(dd) + ' ' + MON[m - 1] : '';
};

/* الجملةُ بنسختيها، والكلمةُ المختلفةُ مُعلَّمةٌ في الأصل.

   ولا تُعلَّم في المُصحَّح: المقصودُ أن يَرى أين زلَّ، لا أين
   أصاب غيرُه. */
/* وesc على رقم الوحدة وإن قَسَره cleanBook عدداً: ar لا تَهرب من
   شيء، وسلامةُ هذا الموضع تقوم كلُّها على قسرٍ في ملفٍّ آخر. والقالبُ
   يَكفي نفسَه، فلا يَنقضه تعديلٌ هناك لا يَعلم به من يَقرأ ها هنا. */
function sentence(rec){
  const wi = wrongIndex(rec);
  const words = rec.t.split(/\s+/).map((w, i) =>
    `<span class="${i === wi ? 'bad' : ''}">${esc(w)}</span>`).join(' ');

  return `<div class="ln">
    <div class="meta">${esc(rec.src || '')}${rec.u ? ' · الوحدة ' + esc(ar(rec.u)) : ''}</div>
    <div class="en">${words}</div>
    ${rec.fix ? `<span class="lbl">الصواب</span>
      <div class="en"><span class="good">${esc(rec.fix)}</span></div>`
     : rules(rec)}
  </div>`;
}

/* وما لا نموذجَ له — النصُّ الحرّ — تُسمّى قواعدُه التي وقع فيها.

   وإلّا عُرضت جملتُه بلا بيانٍ وقد عُدَّت عليه غلطاً، فلا يَعرف
   أيَّ شيءٍ أخطأ. */
function rules(rec){
  const names = (rec.r || []).map(rid => (RULE[rid] || {}).t).filter(Boolean);
  return names.length
    ? `<span class="lbl">القاعدة</span>
       <div class="meta">${names.map(esc).join(' · ')}</div>`
    : '';
}

/* يومٌ وجُمَلُه. */
const dayBlock = (d, recs) => `<div style="margin-top:14px">
  <p class="muted" style="font-size:12.5px;margin:0 0 4px">${esc(dayAr(d))}
    · ${ar(recs.length)} ${recs.length === 1 ? 'جملة' : recs.length === 2 ? 'جملتان' : 'جُمَل'}</p>
  <div class="lines">${recs.map(sentence).join('')}</div>
</div>`;

/* ولا يُستقبَل الفارغُ بصفحةٍ فارغة: يُقال له بمَ تَمتلئ. */
const empty = () => card('كتابك',
  '<p class="muted">لم تكتب جملةً بعد.</p>'
  + '<p class="muted" style="margin-top:8px;line-height:1.95">وكلُّ جملةٍ تكتبها '
  + 'في <b>المشهد الحيّ</b> أو <b>الترجمة</b> أو <b>الكتابة</b> أو <b>الإملاء</b> '
  + 'تُحفَظ لك ها هنا بنسختيها — كما كتبتَها، وكما تُكتَب.</p>'
  + '<div class="row" style="justify-content:flex-start;margin-top:10px">'
  + '<button class="btn ghost" onclick="goHome()">رجوع</button></div>');

export function bookView(){
  const all = lines().slice().sort((a, b) => b.at - a.at);
  if (!all.length) return empty();

  const st = bookStats();
  const bad = S.bookF === 'bad';
  const shown = bad ? all.filter(wrongLine) : all;

  /* بالأيّام، من الأحدث. والترتيبُ داخل اليوم من الأحدث كذلك. */
  const days = [];
  shown.forEach(r => {
    const last = days[days.length - 1];
    if (last && last[0] === r.d) last[1].push(r);
    else days.push([r.d, [r]]);
  });

  const pick = on => 'margin:0;padding:9px 16px;min-height:0;border-radius:999px;font-size:13px'
    + (on ? '' : ';background:var(--surf2);color:var(--mute)');

  return card('كتابك',
    `<p class="muted">كلُّ جملةٍ كتبتَها، بنسختيها — كما كتبتَها وكما تُكتَب.</p>
     <p class="muted" style="margin-top:6px">
       <b style="color:var(--ind2)">${ar(st.total)}</b> جملة،
       في <b style="color:var(--ind2)">${ar(st.clean)}</b> منها لم تُخطئ.</p>
     <div class="row" style="justify-content:flex-start;margin-top:10px">
       <button class="btn${bad ? ' ghost' : ''}" style="${pick(!bad)}" onclick="bookFilter('all')">كلُّها</button>
       <button class="btn${bad ? '' : ' ghost'}" style="${pick(bad)}" onclick="bookFilter('bad')">ما أخطأتَ فيه</button>
     </div>`
    + (shown.length
       ? days.map(([d, recs]) => dayBlock(d, recs)).join('')
       : '<p class="muted" style="margin-top:14px">ولا غلطةَ في جُمَلك. أحسنتَ.</p>')
    + '<div class="row" style="justify-content:flex-start;margin-top:14px">'
    + '<button class="btn ghost" onclick="goHome()">رجوع</button></div>');
}
