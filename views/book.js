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
import {lines, bookStats, wrongIndex, wrongLine, openErrors, errHistory, nextFilling} from '../engine/book.js';
import {RULE} from '../content/rules.js';
import {card, ar, esc, count} from './ui.js';

/* المعروض: الكلُّ أو ما فيه تصحيح. */
export function bookFilter(k){ S.bookF = (k === 'bad') ? 'bad' : 'all'; save(); hooks.render() }

/* ما يُعرَض عند الترشيح هو ما يَعُدّه العنوانُ غلطاً، لا غيرَه.

   وكان العنوانُ يَعُدّ بالأرقام والمُرشَّحُ يُرشّح بالتصحيح، فيَقرأ
   «أربعون جملةً، في أربعين منها لم تُخطئ» ثمّ يَدوس «ما أخطأتُ فيه»
   فيَجد اثنتي عشرة. مِقياسان لشيءٍ واحد. */

/* ولمن لا تاريخَ له عنوانُه: جُمَلُ المتعلّم قبل أن يُبنى السجلُّ
   اليوميُّ تَخرج من التنقية بـd فارغة، فكان يُرسَم لها عنوانٌ هو
   نقطةٌ وعدد — «· ١ جملة» فوق أقدم ما كتب. وكذلك تاريخٌ يَعبُر
   DATE_KEY وشهرُه خارج الاثني عشر. */
const UNDATED = 'ممّا كتبتَ قبلُ';
const MON = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
             'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const dayAr = d => {
  if (!d) return UNDATED;
  const [, m, dd] = String(d).split('-').map(Number);
  return Number.isFinite(dd) && MON[m - 1] ? ar(dd) + ' ' + MON[m - 1] : UNDATED;
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

/* يومٌ وجُمَلُه. والعددُ بـcount لا بشرطٍ مكتوبٍ ها هنا: مطابقةُ
   العدد في العربيّة أداتُها واحدةٌ في views/ui.js، و«١٥ جُمَل» في
   برنامجٍ لتعليم اللغة لحنٌ يَنقض ما يُعلّمه. */
const dayBlock = (d, recs) => `<div style="margin-top:14px">
  <p class="muted" style="font-size:12.5px;margin:0 0 4px">${esc(dayAr(d))}
    · ${esc(count(recs.length, 'جملة', 'جُمَل'))}</p>
  <div class="lines">${recs.map(sentence).join('')}</div>
</div>`;

/* ولا يُستقبَل الفارغُ بصفحةٍ فارغة: يُقال له بمَ تَمتلئ، وأين هو
   منها.

   وكانت تَعُدّ له المحطّاتِ الأربعَ بأسمائها ولا تَصِلها بموضعه —
   ففتَحها صاحبُ البرنامج وهو في درسه الأوّل من وحدته، فوجدها خاليةً
   ولم يَدرِ أعطلٌ هو أم أنّ أوانَه لم يَحِن. وبينه وبين أوّل محطّةٍ
   تَملؤه ثمانٍ، والخبرُ عندنا فيُقال. */
function empty(){
  const nx = nextFilling();
  const where = nx
    ? `<p class="muted" style="margin-top:10px;line-height:1.95">
         وأقربُ محطّةٍ تَملؤه: <b>${esc(nx.t)}</b> في الوحدة
         <b>${ar(nx.u)}</b>${nx.before
           ? ` — وأمامك ${esc(count(nx.before, 'محطّة', 'محطّات'))} قبلها`
           : ' — وهي محطّتك التالية'}.</p>`
    : '';

  return card('كتابك',
    '<p class="muted">لم تكتب جملةً بعد.</p>'
    + '<p class="muted" style="margin-top:8px;line-height:1.95">وكلُّ جملةٍ تكتبها '
    + 'بنفسك تُحفَظ لك ها هنا بنسختيها — في <b>المشهد الحيّ</b>، '
    + 'و<b>الترجمة</b>، و<b>الكتابة</b>، و<b>الإملاء</b>. أمّا المفرداتُ '
    + 'والدروسُ والحوارُ فاختياراتٌ لا جُمَلٌ من إنشائك.</p>'
    + where
    + '<div class="row" style="justify-content:flex-start;margin-top:12px">'
    + '<button class="btn ghost" onclick="goHome()">رجوع</button></div>');
}

/* غلطاتُك المفتوحة: ما تَكرّر ولم يُصحَّح بعدُ، مرتَّباً.

   وهي ثمرةُ الكتاب التي لا تُعطيها جملةٌ وحدها: «وقعتَ في هذه
   القاعدة أربع مرّات، آخرُها أمس، وهذه الجُمَل» — بيانٌ لا يُستخرَج
   من درجةٍ ولا من نسبة.

   وإعلامٌ لا بوّابة: لا يُحبَس عن الجديد حتّى يُسدّد. يُقال له
   ما هو، والقرارُ له. */
const LVL = [
  null,
  {t: 'وقعت مرّة',      c: 'var(--mute)'},
  {t: 'تكرّرت',          c: 'var(--amber)'},
  {t: 'تكرّرت كثيراً',   c: 'var(--amber)'},
  {t: 'أكثر ما تُخطئ فيه', c: 'var(--coral)'}
];

function openBlock(){
  const open = openErrors().filter(e => RULE[e.rid]).slice(0, 5);
  if (!open.length) return '';

  const row = e => {
    const R = RULE[e.rid], lv = LVL[e.level] || LVL[1];
    const hist = errHistory(e.rid);
    const last = hist[hist.length - 1];
    return `<div class="ln">
      <div class="meta"><span style="color:${lv.c}">${esc(lv.t)}</span>
        · ${esc(count(e.n, 'مرّة', 'مرّات'))}</div>
      <div style="font-size:14.5px;font-weight:700;margin:2px 0 4px">${esc(R.t)}</div>
      <p class="muted" style="font-size:13px;line-height:1.9;margin:0">${esc(R.rule || '')}</p>
      ${last ? `<span class="lbl">آخرُ مرّة</span>
        <div class="en"><span class="bad">${esc(last.t)}</span></div>` : ''}
    </div>`;
  };

  return `<div style="margin-top:18px">
    <p style="font-size:15px;font-weight:700;margin:0 0 2px">غلطاتُك المفتوحة</p>
    <p class="muted" style="font-size:12.5px;margin:0 0 6px">
      قواعدُ تَكرّر وقوعُك فيها ولم يَأتِ بعدها صوابٌ يُغلقها.</p>
    <div class="lines">${open.map(row).join('')}</div>
  </div>`;
}

export function bookView(){
  const all = lines().slice().sort((a, b) => b.at - a.at);
  if (!all.length) return empty();

  const st = bookStats();
  const bad = S.bookF === 'bad';
  const shown = bad ? all.filter(wrongLine) : all;

  /* بالأيّام، من الأحدث. والترتيبُ داخل اليوم من الأحدث كذلك.

     وبخريطةٍ لا بمقارنةِ المتجاور: mergeBook تَدسّ جُمَلَ الجهاز
     الآخر بأوقاتها هي، فيَقَع فرقُ ساعةٍ أو جملةٌ بلا تاريخٍ بين
     جملتين من يومٍ واحد — فيَنقسم اليومُ عنوانين أو ثلاثة. */
  const byDay = new Map();
  shown.forEach(r => {
    const k = r.d || '';
    if (!byDay.has(k)) byDay.set(k, []);
    byDay.get(k).push(r);
  });
  const days = [...byDay.entries()];

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
    + openBlock()
    + (shown.length
       ? days.map(([d, recs]) => dayBlock(d, recs)).join('')
       : '<p class="muted" style="margin-top:14px">ولا غلطةَ في جُمَلك. أحسنتَ.</p>')
    + '<div class="row" style="justify-content:flex-start;margin-top:14px">'
    + '<button class="btn ghost" onclick="goHome()">رجوع</button></div>');
}
