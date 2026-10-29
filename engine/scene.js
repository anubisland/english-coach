/* المشهدُ الحيّ: مفتاحُه، وسجلُّ إتمامه، ومشاهدُ كلّ وحدة.

   وكان المشهدُ خارج المسار كلِّه: تبويبٌ يعرض ستّةً وسبعين مشهداً بلا
   تصفيةٍ بمستوًى ولا وحدة، فيرى المبتدئُ في وحدته الأولى مشاهدَ C2.
   وكان بابَاً جانبيّاً: يستطيع أن يترك المنهجَ كلَّه ويقضي وقته فيه.

   ولم يكن يُقفَل عليه شيء لأنّه بلا سجلِّ إتمام — وهذا سببٌ لبناء
   السجلّ لا لترك المحطّة خارج الرحلة.

   والمفتاح: les (معرّف الدرس) لمشاهد المنهج، وهو فريدٌ لسبعةٍ
   وأربعين منها. والتسعةُ والعشرون الباقيةُ موضوعيّةٌ بلا درس،
   فمفتاحُها عنوانُها — وعناوينُها فريدةٌ كذلك. والفهرسُ لا يصلح
   مفتاحاً: يتبدّل بإضافة مشهدٍ في الوسط فيَنسب الإتمامَ إلى غيره. */
import {SCENES} from '../content/scenes.js';
import {LESSONS} from '../content/lessons.js';
import {S} from './state.js';
import {unitOpen} from './progress.js';

export const sceneKey = s => s && (s.les || ('t:' + s.t));

const lessonUnit = new Map(LESSONS.map(l => [l.id, l.u]));

/* وحدةُ المشهد: من درسه. وما لا درسَ له فلا وحدةَ له — وهو إضافيٌّ
   لا يُقفل عليه بوابة. */
export const sceneUnit = s => (s && s.les) ? lessonUnit.get(s.les) : undefined;

export const scenesOf = u => SCENES.filter(s => sceneUnit(s) === u);

export const sceneDone = s => !!((S && S.scenes) || {})[sceneKey(s)];

/* مشاهدُ الوحدة كلُّها مُؤدّاة؟ */
export const unitScenesDone = u => {
  const list = scenesOf(u);
  return list.length > 0 && list.every(sceneDone);
};

/* أوّلُ مشهدٍ لم يُؤدَّ في الوحدة، وفهرسُه في SCENES ليُفتح. */
export function nextSceneIndex(u) {
  const list = scenesOf(u);
  const s = list.find(x => !sceneDone(x)) || list[0];
  return s ? SCENES.indexOf(s) : -1;
}

/* يُسجَّل عند بلوغ آخر دورٍ في المشهد. ولا يُمحى: ما أُدّي أُدّي. */
export function keepScene(s) {
  const k = sceneKey(s);
  if (!k) return;
  const all = S.scenes || (S.scenes = {});
  all[k] = true;
}

/* أيُعرَض هذا المشهدُ للمتعلّم الآن؟

   الموضوعيُّ (بلا درس) حرٌّ دائماً: عونٌ لا طريقٌ بديل. ومشهدُ
   الدرس يتبع وحدتَه: إن فُتحت فُتح.

   ولا تُستعمل reachedUnit هنا: حدُّها الأدنى ثلاثُ وحداتٍ وُضع لئلّا
   تَفرغ بِرَكُ الاختبارات، فلو قيس به العرضُ لرأى صاحبُ الوحدة
   الأولى مشاهدَ الثالثة. */
export const sceneInReach = s => {
  const u = sceneUnit(s);
  return u === undefined || unitOpen(u);
};
