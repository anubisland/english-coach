/* محطّةُ المفردات: تولّد تدريبَ الوحدة من بنك كلماتها.

   والبنكُ وحده قائمةٌ لا تُعلِّم: من قرأ خمسمئة كلمةٍ مرّةً لم يملك
   منها شيئاً. فتُولَّد منه أسئلةٌ تُجيب عن الجهتين — من العربيّة إلى
   الإنجليزيّة ومن الإنجليزيّة إلى العربيّة — لأنّ التعرّف أسهلُ من
   الاستحضار، ومن عرف المعنى حين يراه قد لا يجده حين يحتاجه.

   والمشوّشاتُ من الحقل نفسه لا من البنك كلِّه: «أخت» بين «أمّ» و«بنت»
   سؤالٌ يقيس، وبينها و«مطار» سؤالٌ يُجاب بلا معرفة. */
import {wordsOf, topicsOf} from '../content/words.js';
import {shuffle} from './shuffle.js';
import {S} from './state.js';

export const WORDS_PASS = 70;

/* ثلاثةُ مشوّشاتٍ من حقل الكلمة أوّلاً، فإن لم تكفِ فمن وحدتها.

   والتنقيةُ بما يُعرَض: too وalso كلتاهما «أيضاً»، فلا تُعرضان في
   سؤالٍ واحد. وكان الإسقاطُ يَنقص السؤالَ خياراً، فيُكمَل من البركة
   الأوسع بدل أن يُترك ناقصاً. */
function distractors(word, topic, unit, key) {
  const seen = new Set([word[key]]);
  const take = (list, out) => {
    shuffle(list).forEach(x => {
      if (out.length >= 3 || seen.has(x[key])) return;
      seen.add(x[key]); out.push(x);
    });
    return out;
  };
  const out = take(topic, []);
  return out.length >= 3 ? out : take(wordsOf(unit), out);
}

/* سؤالٌ واحد. dir: 'ar' يسأل بالعربيّة، و'en' يسأل بالإنجليزيّة. */
function ask(word, topic, unit, dir) {
  const key = dir === 'ar' ? 'w' : 'ar';
  const opts = shuffle([word, ...distractors(word, topic, unit, key)]);
  return {
    k: 'mcq',
    q: dir === 'ar' ? word.ar : word.w,
    ar: dir === 'ar' ? 'ما مقابلها بالإنجليزيّة؟' : 'ما معناها؟',
    o: opts.map(x => x[key]),
    a: opts.indexOf(word),
    tip: word.w + ' — ' + word.ar
  };
}

/* ورقةُ الوحدة: من كلّ حقلٍ نصيبُه، والجهتان معاً.

   ولا تُعرَض الكلماتُ كلُّها في جلسةٍ واحدة: مئةٌ وعشرون سؤالاً
   تُتعب فتُترَك. فجلسةٌ من عشرين، والباقي في المراجعة المتباعدة. */
export const WORDS_N = 20;

export function wordsItems(unit, n) {
  const groups = topicsOf(unit);
  if (!groups.length) return [];
  const flat = wordsOf(unit);
  const want = Math.min(n || WORDS_N, flat.length);

  /* التوزيعُ على الحقول بالتساوي حتى لا تغيب حقلٌ كاملة. */
  const per = Math.max(1, Math.ceil(want / groups.length));
  const picked = [];
  groups.forEach(g => {
    const list = g.list.map(([w, ar]) => ({w, ar, u: unit, t: g.t}));
    shuffle(list).slice(0, per).forEach(x => picked.push([x, list]));
  });

  return shuffle(picked).slice(0, want)
    .map(([word, topic], i) => ask(word, topic, unit, i % 2 ? 'en' : 'ar'));
}

/* ما بلغه من كلمات الوحدة: الدرجةُ تُحفظ ولا تُنقَص. */
export function keepWords(unit, pc) {
  const all = S.words || (S.words = {});
  const v = Math.max(0, Math.min(100, Math.round(Number(pc) || 0)));
  all[unit] = Math.max(all[unit] === undefined ? -1 : all[unit], v);
}

/* قد تُقرأ قبل إقلاع الحالة — كما في cefr.js — فلا تنهار. */
export const wordsScore = unit => ((S && S.words) || {})[unit];
export const wordsDone = unit => wordsScore(unit) !== undefined;
