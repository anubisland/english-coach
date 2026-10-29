/* فهرسُ بنوك المفردات: بنكٌ لكلّ مستوى، ومدخلٌ واحدٌ لمن يسأل.

   وكان كلُّ قارئٍ يستورد words-a1.js باسمه، فإضافةُ A2 كانت تحتاج
   تعديلَ كلّ موضعٍ قرأ منه — المحرّكَ والمخطّطَ والمدقّقَ والشاشة.
   فصار السؤالُ عن وحدةٍ لا عن ملفّ. */
import {WORDS as W_A1} from './words-a1.js';
import {WORDS as W_A2} from './words-a2.js';
import {WORDS as W_B1} from './words-b1.js';
import {WORDS as W_B2} from './words-b2.js';
import {UNITS} from './lessons.js';

export const BANKS = {A1: W_A1, A2: W_A2, B1: W_B1, B2: W_B2};

const unitLv = new Map(UNITS.map(u => [u.n, u.lv || 'A1']));

/* كلُّ الحقول مسطّحةً، ولكلّ كلمةٍ وحدتُها وحقلُها ومستواها. */
export const WORD_LIST = Object.entries(BANKS).flatMap(([lv, groups]) =>
  groups.flatMap(g => g.list.map(([w, ar]) => ({w, ar, u: g.u, t: g.t, lv}))));

export const wordsOf = u => WORD_LIST.filter(x => x.u === u);
export const topicsOf = u => (BANKS[unitLv.get(u)] || []).filter(g => g.u === u);

/* مفرداتُ المستوى تراكميّةٌ: هدفُ A2 ألفٌ ومئتان يشمل ما قبله، فمن
   بلغه يعرف مفرداتِ A1 وA2 معاً. */
const LADDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const wordsUpTo = lv => {
  const i = LADDER.indexOf(lv);
  return i < 0 ? [] : WORD_LIST.filter(x => LADDER.indexOf(x.lv) <= i);
};
