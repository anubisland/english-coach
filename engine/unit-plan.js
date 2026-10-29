/* محطّاتُ الوحدة: المصدرُ الواحد لما تحتويه ولترتيبه.

   وكانت الوحدةُ دروساً ومحادثةً وبوابة، والمهاراتُ الأربع بطاقاتٍ
   في ذيل الشاشة خارج المسار — فيمضي المتعلّم إلى آخر المنهج ولم
   يقرأ نصّاً ولا كتب جملةً ولا أملى عليه أحد. وبرنامجٌ يُطرح للناس
   لا يقوم على أن يتذكّر صاحبُه أن ينزل إلى الأسفل.

   فصارت المحطّات هنا كلُّها في قائمةٍ واحدة: يقرؤها «الخطوة
   التالية»، وتُرسم منها خريطةُ الوحدة، وتُفتح بها البوابة. وثلاثتُها
   من مصدرٍ واحد فلا تختلف — ولو زِيدت محطّةٌ يوماً ظهرت في الثلاثة
   معاً بلا أن يُعدَّل موضعان. */
import {S} from './state.js';
import {LESSONS} from '../content/lessons.js';
import {CONVO} from '../content/convo.js';
import {READS} from '../content/read-texts.js';
import {TRANSLATE} from '../content/translate.js';
import {WRITE} from '../content/write-tasks.js';
import {wordsOf, topicsOf} from '../content/words.js';
import {wordsScore, WORDS_PASS} from './words.js';
import {scenesOf, sceneDone} from './scene.js';

export const PASS_SKILL = 60;

const lessonsOf = u => LESSONS.filter(l => l.u === u);
const convosOf = u => CONVO.filter(c => c.u === u);
export const readOf = u => READS.filter(r => r.u === u);
export const transOf = u => TRANSLATE.filter(t => t.u === u);
export const writeOf = u => WRITE.filter(w => w.u === u);
export const dictOf = u => lessonsOf(u)
  .flatMap(l => l.items.filter(i => i.k === 'listen'));

/* قد تُقرأ الحالةُ قبل إقلاعها، كما في cefr.js، فلا تنهار. */
const st = () => S || {};
const skill = (u, k) => ((st().skills || {})[u] || {})[k];

/* المهاراتُ الأربع: ما لا مادّةَ له في وحدةٍ لا يُطلب فيها.

   فلا تُقفل بوابةٌ على محطّةٍ لا محتوى لها — وهذا يقع: وحدتان بلا
   نصّ قراءة. والشرطُ يُشتقّ من المادّة الموجودة لا من قائمةٍ ثابتة. */
const SKILLS = [
  {k: 'read',  t: 'قراءة الوحدة',  has: readOf,  act: u => `examReadStart(0, ${u})`,
   cta: 'ابدأ القراءة',  meta: 'نصٌّ وأسئلة فهم'},
  {k: 'write', t: 'كتابة الوحدة',  has: writeOf, act: u => `examWriteStart(${u})`,
   cta: 'ابدأ الكتابة',  meta: 'ترتيب وإكمال وإنشاء'},
  {k: 'dict',  t: 'إملاء الوحدة',  has: dictOf,  act: u => `examDictStart(${u})`,
   cta: 'ابدأ الإملاء',  meta: 'تسمع الجملة وتكتبها'},
  {k: 'tr',    t: 'ترجمة الوحدة',  has: transOf, act: u => `startTranslation(${u}, ${u})`,
   cta: 'ابدأ الترجمة',  meta: 'من العربية إلى الإنجليزية'}
];

export const unitSkills = u => SKILLS.filter(s => s.has(u).length);

/* قائمةُ المحطّات بترتيبها، ولكلٍّ حالُها.

   والمفرداتُ أوّلاً: من لم يملك الكلمةَ لم تنفعه القاعدةُ التي
   تَحكمها. وهي محطّةٌ قائمةٌ بذاتها في المطلب (standard.js) بعد أن
   كانت تأتي عَرَضاً في جمل التمارين.

   والمشهدُ الحيّ ليس هنا: هو ساحةُ تدريبٍ مفتوحةٌ بلا سجلِّ إتمام،
   فلا تُقفَل عليه بوابةٌ بما لا يُقاس. وإضافتُه تنتظر سجلَّه. */
export function unitPlan(u) {
  const out = [];

  if (wordsOf(u).length) {
    const sc = wordsScore(u);
    out.push({
      kind: 'words', id: 'st-w-' + u, key: 'words',
      /* بلا رقمٍ كأخواتها («قراءة الوحدة»): الرقمُ اللاتينيّ هنا
         يخالف أرقامَ الواجهة العربيّة، وموضعُ المحطّة يُغني عنه. */
      t: 'مفردات الوحدة',
      meta: sc === undefined
        ? wordsOf(u).length + ' كلمة في ' + topicsOf(u).length + ' حقول'
        : 'نتيجتك ' + sc + '٪' + (sc >= WORDS_PASS ? '' : ' — المطلوب ' + WORDS_PASS + '٪'),
      done: sc >= WORDS_PASS, score: sc,
      act: `launch('words', ${u})`, cta: 'ابدأ المفردات'
    });
  }

  lessonsOf(u).forEach(l => out.push({
    kind: 'lesson', id: 'st-l-' + l.id, key: l.id,
    t: 'الدرس ' + l.id + ': ' + l.t, meta: l.items.length + ' تمرين',
    done: !!(st().lessons || {})[l.id], act: `openLesson('${l.id}')`, cta: 'ابدأ الدرس'
  }));

  convosOf(u).forEach(c => out.push({
    kind: 'convo', id: 'st-c-' + c.id, key: c.id,
    t: 'محادثة: ' + c.t, meta: 'تدرّب على القاعدة في حوار',
    done: !!(st().conv || {})[c.id], act: `launch('conv','${c.id}')`, cta: 'ابدأ المحادثة'
  }));

  unitSkills(u).forEach(s => {
    const sc = skill(u, s.k);
    out.push({
      kind: 'skill', id: 'st-s-' + s.k + '-' + u, key: s.k,
      t: s.t,
      meta: sc === undefined ? s.meta
        : 'نتيجتك ' + sc + '٪' + (sc >= PASS_SKILL ? '' : ' — المطلوب ' + PASS_SKILL + '٪'),
      /* بالعتبة لا بمجرّد المحاولة: كان done يعني «خاضها»، فمن نال
         عشرةً في المئة فُتحت له البوابةُ على وحدةٍ لا يعرفها — وهو
         الخللُ الذي كُتبت هذه الوحدةُ لمنعه. وPASS_SKILL كانت
         مكتوبةً ولا تُقرأ.

         ومن أتاها بصفرٍ من جهازٍ آخر لا يفتحها كذلك: المزامنةُ تنقل
         رقماً، والرقمُ دون العتبة لا يَخدم وحدة. */
      done: sc >= PASS_SKILL, score: sc, act: s.act(u), cta: s.cta
    });
  });

  /* المشهدُ الحيّ آخرَ المحطّات: تنميةُ الطلاقة تأتي على ما تُعلّم،
     لا قبله. وكان خارج الرحلة كلِّها — تبويبٌ حرٌّ يعرض مشاهدَ
     المنهج كلِّه، فيستطيع المتعلّم أن يترك الوحدةَ ويقضي وقته فيه.
     ولم يكن يُقفَل عليه شيءٌ لأنّه بلا سجلّ، فبُني السجلُّ ودخل. */
  const sc = scenesOf(u);
  if (sc.length) {
    const left = sc.filter(x => !sceneDone(x)).length;
    out.push({
      kind: 'scene', id: 'st-sc-' + u, key: 'scene',
      t: 'المشهد الحيّ',
      meta: left ? 'تتكلّم بصوتك في ' + sc.length + ' مواقف — بقي ' + left
                 : 'أدّيتَ مواقفَ الوحدة كلَّها',
      done: left === 0,
      act: `startUnitScene(${u})`, cta: 'ابدأ المشهد'
    });
  }

  return out;
}

/* ما قبل البوابة كلُّه: فلا تُفتح على وحدةٍ لم تُخدَم. */
export const gateReady = u => unitPlan(u).every(st => st.done);

/* الخطوةُ الأولى غيرُ التامّة في الوحدة. */
export const nextInUnit = u => unitPlan(u).find(st => !st.done) || null;

/* يُسجَّل إنجازُ المهارة بوحدتها. ولا يُنقَص: من أعاد فجاءت أقلَّ
   بقيت الأعلى — الإعادةُ للتحسين لا للعقاب. */
export function keepSkill(u, k, pc) {
  if (!u || !k) return;
  const all = S.skills || (S.skills = {});
  const one = all[u] || (all[u] = {});
  /* نسبةٌ ليست رقماً لا تُسجَّل: كان Number(pc)||0 يبتلع undefined
     فيُخزَّن صفرٌ، فتبدو المهارةُ مخوضةً وراسبةً وهي لم تُقَس. وقد
     وقع هذا حين سُمّي الحقلُ percent وقُرئ pc. */
  const n = Number(pc);
  if (!Number.isFinite(n)) return;
  const v = Math.max(0, Math.min(100, Math.round(n)));
  one[k] = Math.max(one[k] === undefined ? -1 : one[k], v);
}
