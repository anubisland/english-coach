/* السجلُّ اليوميّ: ما عمله المتعلّم في كلّ يوم، وما أخطأ فيه.

   ولم يكن للبرنامج ذاكرةٌ بالأيّام أصلاً: يَعرف أنّ الدرس تمّ، ولا
   يَعرف متى. فلم يكن يستطيع أن يقول «أمسِ عملتَ كذا» ولا «أنت
   متأخّرٌ عن خطّتك»، وهما ما يَطلبه المتعلّم من شاشةٍ اسمُها «اليوم».

   والمفتاح تاريخٌ محلّيٌّ لا UTC: من ذاكر الحاديةَ عشرةَ ليلاً في
   القاهرة فعمَلُه من يومه هو، لا من الغد.

   والسجلُّ يُزامَن: من ذاكر على هاتفه ثمّ فتح اللوح يجد يومَه كما
   تركه. والدمجُ بالجمع لا بالإحلال — انظر sync-merge. */
import {S, save} from './state.js';

export const dayKey = (d) => {
  const t = d || new Date();
  const p = n => String(n).padStart(2, '0');
  return t.getFullYear() + '-' + p(t.getMonth() + 1) + '-' + p(t.getDate());
};

export const shiftDay = (key, by) => {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + by));
};

const dayOf = (key) => {
  const all = S.days || (S.days = {});
  return all[key] || (all[key] = {done: [], errs: {}, right: 0, wrong: 0});
};

export const today = () => dayOf(dayKey());

/* محطّةٌ تمّت: يُسجَّل نوعُها وهويّتُها مرّةً واحدةً في اليوم. */
export function noteDone(kind, id, t) {
  if (!kind || !id) return;
  const rec = dayOf(dayKey());
  const tag = kind + ':' + id;
  if (!rec.done.includes(tag)) rec.done.push(tag);
  if (t) rec.t = t;
  save();
}

/* إجابةٌ صحّت أو خابت — بها يُقاس جهدُ اليوم لا بعدد المحطّات وحده. */
export function noteAnswer(ok) {
  const rec = dayOf(dayKey());
  rec[ok ? 'right' : 'wrong']++;
  save();
}

/* خطأٌ نحويٌّ بهويّة قاعدته، لا بنصِّ تنبيهه.

   وكان يُعَدّ بنصّه العربيّ في S.errs، فلا يُعرَف أيُّ قاعدةٍ هي
   ولا أيُّ درسٍ يُصلحها — فلا يُقال للمتعلّم «ارجع إلى كذا». */
export function noteError(rid) {
  if (!rid) return;
  const rec = dayOf(dayKey());
  rec.errs[rid] = (rec.errs[rid] || 0) + 1;
  save();
}

/* أيّامٌ فيها عملٌ، من الأحدث إلى الأقدم. */
export const activeDays = () =>
  Object.entries(S.days || {})
    .filter(([, r]) => r.done.length || r.right || r.wrong)
    .map(([k]) => k)
    .sort()
    .reverse();

/* آخرُ يومٍ عمل فيه قبل اليوم — وهو «اللي فات» الذي يُحاسَب عليه. */
export function lastActiveDay() {
  const k = dayKey();
  return activeDays().find(d => d < k) || null;
}

export function dayReport(key) {
  const r = (S.days || {})[key];
  if (!r) return null;
  const total = r.right + r.wrong;
  return {
    key,
    stations: r.done.length,
    kinds: r.done.reduce((m, tag) => {
      const k = tag.split(':')[0];
      m[k] = (m[k] || 0) + 1;
      return m;
    }, {}),
    right: r.right, wrong: r.wrong, total,
    pct: total ? Math.round(r.right / total * 100) : null,
    errs: r.errs
  };
}
