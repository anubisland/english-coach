/* امتحانُ المستوى النهائيّ: يُبنى من مطلبه، لا من حيث اتّفق.

   وكان عشرةَ أسئلةٍ تُسحَب عشوائياً من دروس المستوى. والعشوائيُّ من
   تسعين تمريناً قد يُخرج ثلاثةً عن المضارع ولا شيءَ عن الأدوات ولا
   عن الملكيّة ولا عن can — فيُقال لمن لم يُسأل عن نصف المستوى
   «أتممتَ A1». والشهادةُ لا تُعطى على عيّنةٍ لا تمثّل.

   فصار لكلّ تركيبٍ فارقٍ في المستوى سؤالُه: يُؤخذ من دروس قاعدته
   هو. فإن لم يُقَس تركيبٌ ظهر ذلك عدداً لا ظنّاً — ويحرسه اختبار.

   والمؤجَّلُ بقرارٍ مُسنَد (was/were إلى A2) لا يُسأل عنه هنا: ما
   لم يُعلَّم في المستوى لا يُمتحَن فيه. */
import {STANDARD, LEVELS_SPECD} from '../content/standard.js';

/* يُعاد تصديرُها هنا ليصلها ما يستورد أدواتِ الامتحان. */
export {LEVELS_SPECD};
import {UNITS, LESSONS} from '../content/lessons.js';
import {shuffle} from './shuffle.js';

/* ما يُقاس في المستوى: تراكيبُه الفارقة إلّا ما أُجّل. */
export function examSpec(lv) {
  const s = STANDARD[lv];
  return s ? s.grammar.filter(g => g.r && !g.defer) : [];
}

/* تمارينُ المستوى مجموعةً بقاعدتها. */
function byRule(lv) {
  const units = UNITS.filter(u => (u.lv || 'A1') === lv).map(u => u.n);
  const map = new Map();
  LESSONS.filter(l => units.includes(l.u)).forEach(l =>
    (l.rules || []).forEach(r => {
      if (!map.has(r)) map.set(r, []);
      /* الاختيارُ من متعدّدٍ وحده: الامتحانُ النهائيّ يُقاس آلياً،
         وبنودُ الكتابة الحرّة لها اختبارُها الخاصّ. */
      map.get(r).push(...l.items.filter(i => Array.isArray(i.o) && typeof i.a === 'number'));
    }));
  return map;
}

/* سؤالٌ لكلّ تركيب، ثمّ خلطُ الترتيب حتى لا يُحفظ تسلسلُ المنهج.

   والسحبُ بلا إعادة: الدرسُ الواحد قد يحمل قاعدتين، فيقع تمرينُه في
   بركتيهما معاً ويُسحَب مرّتين — فيرى المتعلّم السؤال نفسه مكرّراً
   في ورقةٍ واحدة. فما خرج لا يعود. */
export function examItems(lv) {
  const pool = byRule(lv);
  const used = new Set();
  const out = [];
  examSpec(lv).forEach(g => {
    const items = shuffle(pool.get(g.r) || []).filter(i => !used.has(i));
    if (items.length) { used.add(items[0]); out.push(items[0]) }
  });
  return shuffle(out);
}

/* ما لم يجد له سؤالاً — يُعلَن ولا يُبتلَع. */
export const examUncovered = lv => {
  const pool = byRule(lv);
  return examSpec(lv).filter(g => !(pool.get(g.r) || []).length);
};

/* العتبةُ ٦٥٪ كعتبة «أثبتَ» في cefr.js: كلمةٌ واحدةٌ لا كلمتان. */
export const EXAM_PASS = 65;
export const examNeed = n => Math.ceil(n * EXAM_PASS / 100);
