/* «كتابُك»: كلُّ جملةٍ قالها المتعلّم أو كتبها، بنسختَيها.

   وكان البرنامج يُعطي الجملةَ درجةً ثمّ يرميها. فلا المتعلّمُ يرى
   إنجليزيّتَه وهي تتعدّل، ولا البرنامجُ يستطيع أن يُريه غلطةً بعينها
   وقعت منه يومَ كذا في موضع كذا — وإنّما يقول «تكرّر ٧ مرّات».

   وجملتُه هو أبقى في ذهنه من جملةٍ من بنك: هو الذي قالها، ويذكر
   متى ولماذا. فمنها تُبنى المراجعةُ والتصحيح.

   والتصعيد: الغلطةُ التي لا تُعالَج تتحجّر — وهذا مُقرَّرٌ في أدب
   التصحيح اللغويّ. فلا يُقال فيها القولُ نفسُه كلَّ مرّة:

     ١  تُصحَّح في هدوءٍ ويُمضى
     ٢  لا يُعطى الجواب — يُقال «فيها غلطة، جِدها»
     ٣  تُشرَح القاعدةُ وسببُ وقوع العربيّ فيها
     ٤  تُرفَع إلى رأس القائمة وتُسمّى باسمها

   وكان المكتوبُ ها هنا في الرابعة: «تصير دَيناً، لا يُمضى إلى
   الجديد قبل أن تُسدَّد» — وعدٌ لم يُنفّذه سطرٌ واحد: debts()
   مكتوبةٌ ولا يُناديها أحد. وما كان ليُنفَّذ لو حُوول: صاحبُ
   البرنامج اشتراه ليتعلّم، يُسرع أو يُبطئ كما شاء، وحبسُه عن
   الجديد حتّى يُسدّد قاعدةً هو جنسُ ما رُفع يومَ رُفع موعدُ الفراغ
   و«متأخّرٌ عن خطّتك».

   فالرابعةُ إعلامٌ لا بوّابة: تُعرَض له غلطاتُه المفتوحةُ مرتَّبةً
   في كتابه، ويُقال له في أيّ جملةٍ وقعت وكم مرّة. والقرارُ له. */
import {S, save} from './state.js';
import {dayKey} from './journal.js';
import {UNIT_NS} from './progress.js';
import {unitPlan} from './unit-plan.js';

/* سقفُ الكتاب: الحالةُ تُحفظ في التخزين المحلّيّ وتُزامَن، فلا
   تُترك تنمو بلا حدّ. والأقدمُ يُنزَع، إلّا ما لم تُصلَح غلطتُه. */
const CAP = 240;

export const lines = () => (S.book = Array.isArray(S.book) ? S.book : []);

/* أخطأ في هذه الجملة؟

   وكان الجوابُ «أفيها أرقامُ قواعد؟» — وهو صحيحٌ يومَ كان الكتابُ
   يُملأ من المشهد والترجمة وحدهما، وقد فسد يومَ دخله الإملاءُ
   والفراغ: للإملاء تصحيحٌ مقطوعٌ به ولا قاعدةَ له، وللنصّ الحرّ
   قواعدُ ولا نموذجَ يُقابَل به. فصار ثلثُ الكتاب يُعَدّ سليماً وهو
   غلط، ويُنزَع أوّلَ ما يُنزَع عند امتلائه.

   فالعلامةُ ها هنا: تصحيحٌ، أو قاعدةٌ وقع فيها. */
export const wrongLine = x => !!(x && (x.fix || (x.r && x.r.length)));

/* جملةٌ أنتجها المتعلّم. ولا تُسجَّل الفارغةُ ولا المكرّرةُ في جلسة. */
/* وسقفُ الجملة ثلاثمئة حرف، يُقَصّ عند الكتابة لا عند القراءة
   وحدها: كان القصُّ في cleanBook، أي بعد أن يَستقرّ النصُّ بطوله
   في التخزين وفي حمولة المزامنة إلى أوّل إقلاعٍ تالٍ. ونصُّ الكتابة
   الحرّة لا حدَّ لطوله. */
const CUT = 300;

export function noteSentence({text, fix, rids, src, u}) {
  const t = String(text || '').trim().slice(0, CUT);
  if (t.length < 2) return null;

  const all = lines();
  const last = all[all.length - 1];
  /* والتكرارُ يُطرَح في الجملة دون الكلمة: هذا الحارسُ وُضع لإعادةِ
     إرسالِ كلامٍ في مشهدٍ حيّ، فلمّا دخل الإملاءُ صار يَبتلع جوابين
     متتابعين متطابقين — وهما في الإملاء جوابان صحيحان لسؤالين. */
  if (last && last.t === t && t.split(/\s+/).length > 1
      && Date.now() - last.at < 60000) return last;

  const rec = {
    t,
    fix: fix && String(fix).slice(0, CUT) !== t ? String(fix).slice(0, CUT) : null,
    r: Array.isArray(rids) ? rids.filter(Boolean).slice(0, 4) : [],
    src: String(src || '').slice(0, 40),
    u: Number(u) || null,
    at: Date.now(),
    d: dayKey()
  };
  all.push(rec);

  if (all.length > CAP) {
    /* يُنزَع الأقدمُ السليم، فإن لم يكن فالأقدمُ على الإطلاق.

       وبـwrongLine لا بالأرقام وحدها: وإلّا نُزعت جُمَلُ الإملاء
       والفراغِ أوّلاً — صوابُها وغلطُها سواءً — فيَصير ما يَبقى من
       أوّل الكتاب أثراً لمحطّةٍ بعينها لا سجلّاً لصاحبه. */
    const i = all.findIndex(x => !wrongLine(x));
    all.splice(i >= 0 ? i : 0, 1);
  }
  save();
  return rec;
}

export const linesOf = day => lines().filter(x => x.d === day);

/* ما يَملأ الكتاب: المحطّاتُ التي يُنشئ فيها المتعلّمُ جملةً من
   عنده. والقراءةُ ليست منها — أسئلةُ فهمٍ لا إنشاء. والمفرداتُ
   والدروسُ والحوارُ اختياراتٌ لا جُمَل.

   وهذه القائمةُ هي هي مواضعُ noteSentence في المحرّك، فمن زاد
   موضعاً زادها ها هنا — ويَحرس المطابقةَ اختبار. */
export const FILLS = ['scene', 'write', 'dict', 'tr'];

/* أقربُ محطّةٍ تَملأ كتابَه، وكم محطّةً أمامه قبلها.

   وكانت الصفحةُ الفارغةُ تَعُدّ له المحطّاتِ الأربعَ بأسمائها ولا
   تقول أين هو منها — فيَفتح كتابَه وهو في درسه الأوّل فيَجده خالياً
   ولا يَعلم أهو عطلٌ أم أوانُه لم يَحِن. والخبرُ عندنا، فيُقال. */
export function nextFilling(){
  let before = 0;
  for (const u of UNIT_NS) {
    if ((S.skipped || {})[u]) continue;
    for (const st of unitPlan(u)) {
      if (st.done) continue;
      if (FILLS.includes(st.key)) return {u, t: st.t, before};
      before++;
    }
  }
  return null;
}

/* تاريخُ غلطةٍ بعينها: كلُّ جملةٍ وقعت فيها، من الأقدم. */
export const errHistory = rid =>
  lines().filter(x => x.r.includes(rid)).sort((a, b) => a.at - b.at);

/* مرتبةُ التصعيد — من عدد مرّات وقوعها. */
export function errLevel(rid) {
  const n = errHistory(rid).length;
  return n <= 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : 4;
}

/* الغلطاتُ المفتوحة: ما وقع ولم يُصحَّح بعده صوابٌ في القاعدة نفسها.

   والدليلُ على الإصلاح جملةٌ سليمةٌ بعدها تمسّ القاعدةَ نفسها —
   لا مجرّدُ مرورِ الزمن. وما دام لم يأتِ فالدَّينُ قائم. */
export function openErrors() {
  const seen = new Map();
  lines().forEach(x => x.r.forEach(rid => {
    const e = seen.get(rid) || {rid, n: 0, last: 0};
    e.n++; e.last = Math.max(e.last, x.at);
    seen.set(rid, e);
  }));
  return [...seen.values()]
    .map(e => ({...e, level: errLevel(e.rid)}))
    .sort((a, b) => b.n - a.n || b.last - a.last);
}

/* ما بلغ الرابعةَ: يُقدَّم في العرض ويُسمّى، ولا يَحبس. */
export const urgent = () => openErrors().filter(e => e.level >= 4);

export function bookStats() {
  const all = lines();
  const wrong = all.filter(wrongLine).length;
  return {
    total: all.length,
    clean: all.length - wrong,
    wrong,
    open: openErrors().length,
    units: [...new Set(all.map(x => x.u).filter(Boolean))].sort((a, b) => a - b)
  };
}

/* موضعُ الكلمة الغلط في الجملة، بموازنةِ الأصل بالمُصحَّح.

   وبها تصير الجملةُ تمريناً: يُطلَب منه أن يَدُلَّ على الكلمة، فلا
   يُعطى الجوابَ مجّاناً — ومن درّب نفسَه على التقاط غلطه التقطه
   بعدُ وحدَه. */
export function wrongIndex(rec) {
  if (!rec || !rec.fix) return -1;
  const a = rec.t.split(/\s+/), b = rec.fix.split(/\s+/);
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++)
    if (norm(a[i]) !== norm(b[i])) return i;
  return a.length !== b.length ? Math.max(0, n - 1) : -1;
}
const norm = w => String(w).toLowerCase().replace(/[.,!?;:]/g, '');
