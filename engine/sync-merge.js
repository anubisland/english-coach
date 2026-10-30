/* دمجُ تقدّمين، لا استبدالُ أحدهما بالآخر.

   وهذا هو الموضع الذي تُخسر فيه المزامنةُ السيّئة عملَ صاحبها:
   «آخرُ من يكتب يفوز» يعني أنّ من درس على التابلت ثمّ فتح الموبيل
   رفع حالةَ الموبيل القديمة فوق الجديدة فمحا درسه. ومزامنةٌ تمحو
   أسوأ من لا مزامنة.

   فالقاعدة هنا أنّ الدمج **لا ينقص أبداً**: ما أُتقن على أيّ جهازٍ
   يبقى متقناً، والعددُ يأخذ الأكبر، والصندوقُ يأخذ الأبعد. ومهما
   اختلف ترتيبُ الاتّصال فالنتيجة واحدة، ولا يستطيع جهازٌ أن يُفني
   عمل الآخر.

   وما لا يُزامَن: ما كان لحظيّاً (اختبارٌ جارٍ)، وما كان تفضيلَ
   جهازٍ بعينه (السمة، وهدف الدقائق) — فلا يُفرض ليلُ جهازٍ على نهار
   آخر. وكتابةُ المتعلّم الحرّة ورأيُ المراجع لا يغادران جهازه. */

import {migrate} from './state.js';

/* الحقول المنقولة، ولكلٍّ طريقةُ دمجه. وما ليس هنا لا يُرسَل أصلاً. */
const UNION = ['lessons', 'conv', 'cp', 'ret', 'skipped', 'levelDone', 'scenes'];
const MAXNUM = ['xp'];
const ANYTRUE = ['placed', 'exam'];
/* words: {الوحدة: نسبة} — الأعلى يغلب كبقيّة الدرجات.

   وكانت خارج السياسة هي وskills، وكلتاهما تُقفل بوابةَ الوحدة: فمن
   أتمّ مفرداتِ وحدةٍ ومهاراتِها على هاتفه وجد بوابتَها مغلقةً على
   لوحه، وأعادها. ومزامنةٌ تُعيد العملَ كمزامنةٍ تمحوه. */
const MAXMAP = ['errs', 'attempts', 'words'];

/* skills: {الوحدة: {read,write,dict,tr}} — خريطةٌ في خريطة، فلا
   يكفيها maxMap: هي تأخذ الأكبرَ من القيم لا من الكائنات. */
const MAXMAP2 = ['skills'];

const obj = v => (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
const num = v => (typeof v === 'number' && isFinite(v)) ? v : 0;

/* ما أُتقن يبقى متقناً: الاتّحاد، والقيمةُ الصادقة تغلب. */
function unionTruthy(a, b) {
  const out = {...obj(a)};
  Object.entries(obj(b)).forEach(([k, v]) => { if (v && !out[k]) out[k] = v });
  return out;
}

/* عدّادان لشيءٍ واحد: الأكبر أصدق — أخطأ فيه أكثر، أو حاوله أكثر. */
function maxMap(a, b) {
  const out = {...obj(a)};
  Object.entries(obj(b)).forEach(([k, v]) => {
    if (typeof v === 'number') out[k] = Math.max(num(out[k]), v);
    else if (!(k in out)) out[k] = v;
  });
  return out;
}

/* خريطةٌ في خريطة: لكلّ وحدةٍ درجاتُها، ويُؤخذ الأعلى لكلّ درجةٍ على
   حدة — فمن أتقن القراءةَ هنا والكتابةَ هناك بقيتا له معاً. */
function maxMap2(a, b) {
  const out = {};
  Object.entries(obj(a)).forEach(([k, v]) => { out[k] = {...obj(v)} });
  Object.entries(obj(b)).forEach(([k, v]) => {
    out[k] = maxMap(out[k], v);
  });
  return out;
}

/* سجلُّ اختبار: {last,best,n,at}. الأفضلُ أفضلُهما، والأخيرُ أحدثُهما
   زمناً — ولولا at لصار «الأخير» رهنَ ترتيب الاتّصال لا ترتيب الزمن. */
function mergeRes(a, b) {
  const out = {...obj(a)};
  Object.entries(obj(b)).forEach(([slot, r]) => {
    if (!r || typeof r !== 'object') return;      /* سجلٌّ ليس كائناً يُترك */
    const mine = out[slot];
    if (!mine || typeof mine !== 'object') { out[slot] = r; return }
    const newer = num(r.at) > num(mine.at) ? r : mine;
    /* last لا يُنسخ كما جاء: هو الرقمُ الذي يقرؤه صاحبه على الشاشة،
       فلو جاء نصّاً من وثيقةٍ معبوثٍ بها لبلغ الصفحةَ بلا تهريب.
       والرقمُ هنا، والتنقيةُ في migrate — حارسان لا واحد. */
    const last = Number.isFinite(Number(newer.last))
      ? Number(newer.last) : num(mine.last);
    out[slot] = {
      ...newer, last,
      best: Math.max(num(mine.best), num(r.best)),
      n: Math.max(num(mine.n), num(r.n)),
      at: Math.max(num(mine.at), num(r.at))
    };
  });
  return out;
}

/* صناديق المراجعة: الأبعدُ صندوقاً أرسخُ حفظاً، فيُؤخذ. ومعه موعدُه
   هو — ولو أُخذ أبعدُ صندوقٍ مع أقربِ موعدٍ لعاد السؤال قبل أوانه. */
function mergeSrs(a, b) {
  const out = {...obj(a)};
  Object.entries(obj(b)).forEach(([q, r]) => {
    /* الفحصُ قبل التبنّي لا بعده: كان يُتبنّى r حين لا يوجد محلّيٌّ
       مقابلُه، فيدخل null فيرمي engine/srs.js عند قراءة due. */
    if (!r || typeof r !== 'object') return;
    const mine = out[q];
    if (!mine || typeof mine !== 'object') { out[q] = r; return }
    out[q] = num(r.b) > num(mine.b) ? r : mine;
  });
  return out;
}

/* سجلُّ الأيّام: اتّحادُ الأيّام، وفي اليوم الواحد يُؤخَذ الأكبر.

   ولا يُجمَع: الرفعُ يقع مرّاتٍ في اليوم، فلو جُمع تضاعف عملُ اليوم
   بكلّ مزامنةٍ — والدمجُ يجب أن يكون عديمَ الأثر عند التكرار. */
function mergeDays(a, b) {
  const A = obj(a), B = obj(b), out = {};
  new Set(Object.keys(A).concat(Object.keys(B))).forEach(k => {
    const x = obj(A[k]), y = obj(B[k]);
    const done = new Set((Array.isArray(x.done) ? x.done : [])
      .concat(Array.isArray(y.done) ? y.done : []));
    out[k] = {
      done: [...done].sort(),
      right: Math.max(num(x.right), num(y.right)),
      wrong: Math.max(num(x.wrong), num(y.wrong)),
      errs: maxMap(obj(x.errs), obj(y.errs))
    };
  });
  return out;
}

/* ما يُرسَل إلى الوسيط: المنقولُ وحده، لا الحالةُ كلُّها. */
export function syncable(S) {
  const out = {};
  UNION.concat(MAXMAP, MAXMAP2).forEach(k => { out[k] = obj(S[k]) });
  MAXNUM.forEach(k => { out[k] = num(S[k]) });
  ANYTRUE.forEach(k => { out[k] = !!S[k] });
  out.res = obj(S.res);
  out.srs = obj(S.srs);
  out.cxSeen = Array.isArray(S.cxSeen) ? S.cxSeen : [];
  out.days = obj(S.days);
  out.plan = S.plan || null;
  out.place = S.place || null;
  out.level = S.level || 'A1';
  return out;
}

/* يُطبَّق على الحالة الحيّة: يزيد ولا ينقص. */
export function mergeInto(S, remote) {
  /* التنقيةُ هنا لا في طبقة الشبكة: ما يأتي من الوسيط مُدخلٌ غير
     موثوقٍ كملفٍّ يستورده من غيره، وmigrate لا تنسخ إلّا ما تعرفه
     بالاسم وتُنقّيه. ووضعُها داخل الدمج يمنع أيَّ نداءٍ أن يتخطّاها
     — وكانت في sync.js وحدها، فكان تخطّيها سطراً واحداً. */
  const r = obj(migrate(obj(remote)));
  UNION.forEach(k => { S[k] = unionTruthy(S[k], r[k]) });
  MAXMAP.forEach(k => { S[k] = maxMap(S[k], r[k]) });
  MAXMAP2.forEach(k => { S[k] = maxMap2(S[k], r[k]) });
  MAXNUM.forEach(k => { S[k] = Math.max(num(S[k]), num(r[k])) });
  ANYTRUE.forEach(k => { S[k] = !!S[k] || !!r[k] });
  S.days = mergeDays(S.days, r.days);
  S.plan = S.plan || r.plan || null;
  S.res = mergeRes(S.res, r.res);
  S.srs = mergeSrs(S.srs, r.srs);
  /* مرتَّبةٌ لا بترتيب الاتّحاد: لولا الترتيب لاختلفت الحمولةُ بين
     جهازين تقدّمُهما واحد، فكتب كلٌّ منهما فوق الآخر بلا داعٍ. */
  const seen = new Set((Array.isArray(S.cxSeen) ? S.cxSeen : [])
    .concat(Array.isArray(r.cxSeen) ? r.cxSeen : []));
  S.cxSeen = [...seen].sort();
  if (!S.place && r.place && typeof r.place === 'object') S.place = r.place;
  /* المستوى المعروض: الأعلى على السلّم، فلا يَعرض الجهازُ الثاني
     «مستواك A1» وقد أثبت صاحبُه ما فوقه. */
  const LADDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  if (LADDER.indexOf(r.level) > LADDER.indexOf(S.level)) S.level = r.level;
  return S;
}
