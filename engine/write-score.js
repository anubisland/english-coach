/* تصحيح الكتابة: دوالّ خالصة، كل نوع بميزانه.

   لماذا لكل نوع ميزان؟ لأن «رتّب الكلمات» إمّا صواب أو خطأ في الترتيب،
   أمّا «اكتب جملة» فبينهما درجات: من كتب جملة مفهومة فيها خطأ نحوي واحد
   ليس كمن كتب كلاماً لا يُفهم. ميزانٌ واحد لهما يظلم أحدهما.

   وفي الكتابة الحرّة لا نحكم بالذوق: نَعُدّ الشروط التي أُعلنت للمتعلّم
   قبل أن يكتب. الشرط الخفيّ ظلم، والحكم الذوقي لا يُراجَع. */
import {normalize} from './translate.js';
import {checkGrammar, base, s3} from './grammar.js';
import {lev} from './pronounce.js';

const clamp = n => Math.max(0, Math.min(100, Math.round(n)));
const toks = s => normalize(s).split(' ').filter(Boolean);

/* أقرب صيغة مقبولة هي التي نُصحّح عليها، لا الأولى دائماً. */
function closest(said, list) {
  const a = normalize(said);
  let best = list[0], bestScore = -1;
  list.forEach(o => {
    const sc = overlap(a, normalize(o));
    if (sc > bestScore) { bestScore = sc; best = o }
  });
  return {model: best, score: bestScore};
}

/* نسبة كلمات النموذج التي أنتجها المتعلّم بترتيبها. */
function overlap(a, b) {
  const x = a.split(' ').filter(Boolean), y = b.split(' ').filter(Boolean);
  if (!y.length) return 0;
  const d = Array.from({length: x.length + 1}, () => new Array(y.length + 1).fill(0));
  for (let i = x.length - 1; i >= 0; i--)
    for (let j = y.length - 1; j >= 0; j--)
      d[i][j] = x[i] === y[j] ? d[i + 1][j + 1] + 1 : Math.max(d[i + 1][j], d[i][j + 1]);
  const extra = Math.max(0, (x.length - d[0][0]) / Math.max(1, x.length));
  return Math.max(0, (d[0][0] / y.length) * (1 - 0.5 * extra));
}

/* الترتيب: إمّا أصاب الترتيب أو لا. لكن من استعمل كلمات أخرى غير المعطاة
   أخطأ خطأً آخر، فنفرّق بين «رتّبتها خطأ» و«غيّرت الكلمات». */
function gradeOrder(t, said) {
  const hit = t.ok.some(o => normalize(o) === normalize(said));
  if (hit) return {sc: 100, note: null};
  const given = t.w.map(w => w.toLowerCase()).sort().join(' ');
  const mine = toks(said).sort().join(' ');
  return {sc: Math.round(overlap(normalize(said), normalize(t.ok[0])) * 70),
    note: given === mine ? 'الكلمات صحيحة والترتيب خطأ.' : 'استعمل الكلمات المعطاة كلها، بلا زيادة ولا نقصان.'};
}

/* الفراغ: كلمة واحدة.

   والتفريق المهم هنا بين زلّة الإملاء وخطأ القاعدة: من كتب «workes» أخطأ
   في الهجاء وهو يعرف أن الفعل يأخذ صيغة ثالثة، ومن كتب «work» لم يعرف
   القاعدة أصلاً — وهي بعينها القاعدة التي يقيسها السؤال. منحُه نصف الدرجة
   على أنها «زلّة إملاء» يُخفي عنه أنه لم يفهم الدرس. */
function gradeGap(t, said) {
  const a = normalize(said);
  if (t.ok.some(o => normalize(o) === a)) return {sc: 100, note: null};
  if (!a) return {sc: 0, note: 'لم تكتب شيئاً.'};
  /* «work» صيغة إنجليزية صحيحة في غير موضعها — خطأ قاعدة.
     «workes» ليست صيغة أصلاً — زلّة إملاء. والفرق بينهما أن الأولى
     في قائمة تصريفات الكلمة والثانية خارجها. */
  if (t.ok.some(o => forms(normalize(o)).includes(a)))
    return {sc: 15, note: 'الصيغة إنجليزية صحيحة لكنها ليست المطلوبة هنا — وهذه هي القاعدة التي يقيسها السؤال.'};
  const near = t.ok.some(o => lev(normalize(o), a) <= 1);
  return near ? {sc: 55, note: 'الصيغة قريبة — راجع إملاءها.'} : {sc: 0, note: null};
}

/* تصريفات الكلمة الصحيحة وحدها، لا كل ما يقاربها حرفاً. */
function forms(w) { const b = base(w); return [b, s3(b)] }

/* الجملة: تغطية المعنى ثم سلامة النحو، ونُعلن الكلمة المطلوبة إن غابت. */
function gradeBuild(t, said) {
  const {model, score} = closest(said, t.ok);
  const missing = (t.must || []).filter(m => !new RegExp('\\b(' + m + ')\\b', 'i').test(said));
  const g = checkGrammar(said);
  /* وزن النحو يذوب كلما بعُدت الجملة عن المعنى: لا معنى لمدح نحو جملة
     لا تؤدّي المطلوب. */
  const w = Math.min(1, score * 1.6);
  const sc = clamp(score * 70 + (g.length ? 0 : 30) * w) - missing.length * 15;
  return {sc: clamp(sc), model, g: g.map(x => x.ar),
    note: missing.length ? 'ينقص المطلوب: ' + missing.map(m => m.split('|')[0]).join('، ') : null};
}

/* الكتابة الحرّة: أربعة قياسات معلنة، لا حكم ذوقي. */
function gradeFree(t, said) {
  const sentences = String(said || '').split(/[.!?]+/).map(x => x.trim()).filter(x => x.split(/\s+/).length >= 2);
  const asked = (t.ask || []).map(a => ({t: a.t, ok: a.re.test(said)}));
  const met = asked.filter(a => a.ok).length;
  const g = checkGrammar(said);

  const cover = asked.length ? met / asked.length : 1;
  const enough = Math.min(1, sentences.length / (t.min || 3));
  /* الخطأ يُقاس بالجملة لا بالنصّ: الجملةُ فيها خطأ جملةٌ لم تنجح.
     وبلا هذا كان نصّ «I from Egypt. I am work in office. I healthy.»
     ينال ٨٨٪ لأنه استوفى الشروط المعلنة بكلماتٍ مكسورة. */
  const clean = Math.max(0, (sentences.length - g.length) / Math.max(1, sentences.length));

  return {
    sc: clamp(100 * (cover * 0.4 + enough * 0.2 + clean * 0.4)),
    asked, sentences: sentences.length, g: g.map(x => x.ar), model: t.ok[0],
    /* الصياغة على الشاشة لا هنا: مطابقة العدد في العربية شأن عرض،
       وأداتها في views/ui.js ولا يستوردها المحرّك. */
    short: sentences.length < (t.min || 3) ? {wrote: sentences.length, need: t.min || 3} : null,
    note: null
  };
}

export function gradeWrite(task, said) {
  const text = String(said || '').trim();
  const by = {order: gradeOrder, gap: gradeGap, build: gradeBuild, free: gradeFree}[task.k];
  const r = by ? by(task, text) : {sc: 0, note: null};
  return {k: task.k, said: text, sc: r.sc, note: r.note || null, short: r.short || null,
    g: r.g || [], model: r.model || task.ok[0], asked: r.asked || null, sentences: r.sentences};
}

/* الأنواع الحرّة أثقل من المقيّدة: ترتيب كلمات معطاة أسهل من إنشاء جملة. */
const WEIGHT = {order: 1, gap: 1, build: 2, free: 3};

export function writeTotals(items) {
  if (!items.length) return {pc: 0, byKind: [], band: writeBand(0)};
  const tot = items.reduce((s, x) => s + WEIGHT[x.k], 0);
  const pc = clamp(items.reduce((s, x) => s + x.sc * WEIGHT[x.k], 0) / tot);
  const kinds = [...new Set(items.map(x => x.k))].map(k => {
    const list = items.filter(x => x.k === k);
    return {k, n: list.length, sc: clamp(list.reduce((s, x) => s + x.sc, 0) / list.length)};
  });
  const errs = {};
  items.forEach(x => (x.g || []).forEach(e => { errs[e] = (errs[e] || 0) + 1 }));
  return {pc, byKind: kinds, band: writeBand(pc), n: items.length,
    errs: Object.entries(errs).sort((a, b) => b[1] - a[1]).slice(0, 4)};
}

export function writeBand(pc) {
  if (pc >= 88) return {t:'كتابة سليمة', c:'var(--green)', d:'تكتب جملاً صحيحة وتامّة. انتقل إلى نصوص أطول.'};
  if (pc >= 72) return {t:'جيدة', c:'var(--green)', d:'المعنى يصل، وتبقى أخطاء صغيرة متكرّرة — راجعها أدناه.'};
  if (pc >= 55) return {t:'مقبولة', c:'var(--amber)', d:'تكتب الكلمات وتتعثّر في التركيب. ركّز على ترتيب الجملة.'};
  return {t:'تحتاج تدريباً', c:'var(--coral)', d:'ارجع إلى تمارين الوحدة ثم أعد الاختبار.'};
}
