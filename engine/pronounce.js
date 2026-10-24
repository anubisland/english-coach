/* تقييم النطق.

   النسخة الأولى كانت تعدّ الكلمات المتطابقة وتعطي نسبة، مع ثلاث نصائح عامة
   تظهر لأي جملة فيها الحرف. ذلك يقول للمتعلّم «٦٠٪» ولا يقول **أين** أخطأ
   ولا **لماذا**.

   هنا نحلّل كلمةً كلمة: ما سُمع صحيحاً، وما قارب، وما ضاع. ثم نستنتج من
   الكلمات الضائعة أي صوت إنجليزي هو المشتبه به، اعتماداً على أنماط التداخل
   المعروفة بين العربية والإنجليزية (bank/content/sounds.js). */
import {SOUNDS} from '../content/sounds.js';

export function words(s) {
  return String(s || '').toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);
}

/* مسافة التحرير: كم تعديلاً يلزم لتحويل كلمة إلى أخرى. */
export function lev(a, b) {
  const m = a.length, n = b.length, d = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

/* أي الأصوات الصعبة تحملها هذه الكلمة؟ */
export function soundsIn(word) {
  return SOUNDS.filter(s => s.test.test(word)).map(s => s.id);
}

/* تحليل كلمة واحدة: هل سُمعت؟ وإن لم تُسمع، أي صوت فيها المشتبه به؟ */
function judge(target, heardWords) {
  if (heardWords.includes(target)) return {w: target, state: 'ok'};
  const near = heardWords.find(h => lev(h, target) <= 2 && Math.abs(h.length - target.length) <= 2);
  return {w: target, state: near ? 'near' : 'miss', heardAs: near || null, sounds: soundsIn(target)};
}

/* الأصوات التي تكرّر ظهورها في الكلمات المتعثّرة، مرتّبة بالأكثر.
   الصوت الذي أخطأ فيه في ثلاث كلمات أولى بالتدريب من صوت أخطأ فيه مرة. */
function suspectSounds(items) {
  const count = {};
  items.filter(i => i.state !== 'ok').forEach(i =>
    (i.sounds || []).forEach(id => { count[id] = (count[id] || 0) + 1 }));
  /* الصوت الدقيق (p، v، th) أولى بالذكر من قاعدة واسعة كحركة العلّة،
     حتى لو تساوى عددهما: الأول تشخيص، والثاني احتمال. */
  return Object.entries(count)
    .map(([id, n]) => ({id, n, sound: SOUNDS.find(s => s.id === id)}))
    .filter(x => x.sound)
    .sort((x, y) => (!!x.sound.broad - !!y.sound.broad) || (y.n - x.n))
    .slice(0, 3);
}

export function pronScore(target, heard) {
  const T = words(target), H = words(heard);
  const blank = {sc: 0, items: [], miss: [], near: [], suspects: [], tips: [], heard};

  /* لا جملة نقيس عليها. */
  if (!T.length) return {...blank, nothing: 'لا توجد جملة لقياسها.'};

  /* لم يصل صوت. لو حسبناها صفراً لقلنا له «أخطأتَ في كل الكلمات» وهو لم يتكلّم
     أصلاً — وهذا أسوأ من ألّا نقول شيئاً، لأنه خطأ واثق. */
  if (!H.length) return {...blank, empty: true,
    nothing: 'لم يصل صوت، فلم أقِس شيئاً. تأكّد أن الميكروفون غير مكتوم ثم أعد المحاولة.'};

  const items = T.map(w => judge(w, H));
  const ok = items.filter(i => i.state === 'ok').length;
  const nearN = items.filter(i => i.state === 'near').length;

  /* الكلمة القريبة تُحتسب نصف درجة: سُمعت لكن لم تُنطق كما ينبغي. */
  const sc = Math.round(((ok + nearN * 0.5) / T.length) * 100);

  const suspects = suspectSounds(items);
  return {
    sc, items,
    miss: items.filter(i => i.state === 'miss').map(i => i.w),
    near: items.filter(i => i.state === 'near').map(i => i.w),
    suspects,
    /* نُبقي tips لتوافق ما يعرضها، لكنها الآن مشتقّة من الخطأ لا من وجود الحرف. */
    tips: suspects.map(s => s.sound.fix),
    heard
  };
}
