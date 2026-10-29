/* كم كلمةً بلغها المتعلّم؟

   وكان البرنامج لا يملك أن يجيب: لا قائمةَ مفرداتٍ فيه ولا عدد، فهو
   يقول «أتممتَ ٨٠٪ من الدروس» ولا يقول «تعرف أربعمئة كلمة» — والثاني
   هو ما يفهمه المتعلّم ويقيس به نفسه.

   والبلوغُ هنا بالدرس لا بالاختبار: الكلمةُ تُنسَب إلى أوّل وحدةٍ
   وردت فيها، فمن أتمّ دروسَ وحدةٍ فقد مرّ بكلماتها كلِّها. ولا
   نقول «أتقن» بل «بلغ» — فالإتقان يقيسه الاختبار، والمرورُ شيءٌ
   والتملّكُ شيء.

   والقائمةُ مولَّدةٌ من المحتوى (scripts/vocab.mjs)، فلا تنفصل عنه
   حين يُضاف درس. */
/* العدُّ من بنك المفردات المنهجيّ لا من المستخرَج.

   والمستخرَجُ (vocab-a1.js) يقيس ما وقع في جمل التمارين اتّفاقاً،
   وهو مقياسُ تغطيةٍ لنا نحن. أمّا المتعلّم فيُقال له ما نُعلّمه
   قصداً: كلماتُ المحطّة في حقولها. */
import {wordsUpTo} from '../content/words.js';
import {STANDARD, LEVELS_SPECD} from '../content/standard.js';
import {S} from './state.js';
import {unitLessons} from './progress.js';

/* لكلّ مستوًى بنكُه، والعدُّ تراكميّ: هدفُ A2 ألفٌ ومئتان يشمل A1،
   فمن بلغه يعرف مفرداتِ المستويين معاً — وقسمةُ العدد على هدفِ
   المستوى وحده تُنقص ما يعرفه. */
const BANKS = Object.fromEntries(LEVELS_SPECD
  .filter(lv => STANDARD[lv] && STANDARD[lv].vocab)
  .map(lv => [lv, {list: wordsUpTo(lv), target: STANDARD[lv].vocab.target}]));

export const vocabLevels = () => Object.keys(BANKS);

/* الوحدةُ مقروءةٌ إذا أُتمّت دروسُها كلُّها. */
const unitRead = u => {
  const ls = unitLessons(u);
  return ls.length > 0 && ls.every(l => ((S && S.lessons) || {})[l.id]);
};

export function vocabReport(lv) {
  const bank = BANKS[lv];
  if (!bank) return null;

  const units = [...new Set(bank.list.map(x => x.u))].sort((a, b) => a - b);
  const reached = units.filter(unitRead);
  const met = bank.list.filter(x => reached.includes(x.u)).length;

  return {
    lv, met, total: bank.list.length, target: bank.target,
    /* نسبتان لا واحدة: ما بلغه من قائمتنا، وما تغطّيه قائمتُنا من
       المستوى. وخلطُهما يوهمه أنّه أتمّ المستوى وهو أتمّ قائمتَنا. */
    pct: bank.list.length ? Math.round(met / bank.list.length * 100) : 0,
    coverage: Math.round(bank.list.length / bank.target * 100),
    nextUnit: units.find(u => !reached.includes(u)) || null,
    nextCount: (u => u ? bank.list.filter(x => x.u === u).length : 0)
      (units.find(u => !reached.includes(u)))
  };
}
