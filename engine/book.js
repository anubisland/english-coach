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
     ٤  تصير دَيناً: لا يُمضى إلى الجديد قبل أن تُسدَّد            */
import {S, save} from './state.js';
import {dayKey} from './journal.js';

/* سقفُ الكتاب: الحالةُ تُحفظ في التخزين المحلّيّ وتُزامَن، فلا
   تُترك تنمو بلا حدّ. والأقدمُ يُنزَع، إلّا ما لم تُصلَح غلطتُه. */
const CAP = 240;

export const lines = () => (S.book = Array.isArray(S.book) ? S.book : []);

/* جملةٌ أنتجها المتعلّم. ولا تُسجَّل الفارغةُ ولا المكرّرةُ في جلسة. */
export function noteSentence({text, fix, rids, src, u}) {
  const t = String(text || '').trim();
  if (t.length < 2) return null;

  const all = lines();
  const last = all[all.length - 1];
  if (last && last.t === t && Date.now() - last.at < 60000) return last;

  const rec = {
    t,
    fix: fix && fix !== t ? fix : null,
    r: Array.isArray(rids) ? rids.filter(Boolean).slice(0, 4) : [],
    src: String(src || '').slice(0, 40),
    u: Number(u) || null,
    at: Date.now(),
    d: dayKey()
  };
  all.push(rec);

  if (all.length > CAP) {
    /* يُنزَع الأقدمُ السليم، فإن لم يكن فالأقدمُ على الإطلاق. */
    const i = all.findIndex(x => !x.r.length);
    all.splice(i >= 0 ? i : 0, 1);
  }
  save();
  return rec;
}

export const linesOf = day => lines().filter(x => x.d === day);

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

/* الدَّين: ما بلغ المرتبةَ الرابعة. */
export const debts = () => openErrors().filter(e => e.level >= 4);

export function bookStats() {
  const all = lines();
  const wrong = all.filter(x => x.r.length).length;
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
