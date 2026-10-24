/* التكرار المتباعد بصناديق لايتنر.

   المشكلة التي يحلّها: المتعلّم يجتاز الدرس ثم ينساه. والمراجعة العشوائية
   تضيّع الوقت على ما يتقنه وتترك ما ينساه. فالصواب أن يعود السؤال في
   اللحظة التي يوشك أن يُنسى فيها — لا قبلها ولا بعدها.

   خمسة صناديق: كلّما أصاب ارتفع السؤال صندوقاً وطال أجله، وإن أخطأ رجع
   إلى الأول. فالخطأ لا يُنقص صندوقاً بل يُعيد من البداية، لأن ما نُسي
   مرّة يحتاج أن يُبنى من جديد لا أن يُرقَّع.

   المفتاح هو نصّ السؤال: فريد عبر البنك كلّه (يحرسه اختبار)، ويبقى ثابتاً
   بين الجلسات بخلاف هوية الكائن في الذاكرة. */

/* الأيام حتى الموعد التالي لكل صندوق. التدرّج مضاعف تقريباً، وهو ما تقوله
   منحنى النسيان: كل استرجاع ناجح يُطيل البقاء أكثر من سابقه. */
export const BOXES = [1, 3, 7, 16, 35];
export const DAY = 86400000;

export const boxDays = b => BOXES[Math.max(0, Math.min(BOXES.length - 1, b - 1))];

/* موعد الاستحقاق يُحسب من لحظة الإجابة لا من موعد سابق، حتى لا تتراكم
   ديونٌ على من غاب أسبوعاً فيُفاجأ بمئة سؤال. */
export function nextDue(box, now) {
  return (now || Date.now()) + boxDays(box) * DAY;
}

export function record(srs, key, ok, now) {
  const t = now || Date.now();
  const cur = srs[key];
  /* الإصابة من أوّل مرّة تبدأ من الصندوق الثاني لا الأوّل: لو بدأت من الأوّل
     لاستوى من أصاب ومن أخطأ، وعاد عليه غداً ما أتقنه اليوم. */
  const box = ok ? Math.min(BOXES.length, (cur ? cur.b : 1) + 1) : 1;
  srs[key] = {b: box, due: nextDue(box, t), seen: t};
  return srs[key];
}

export function isDue(entry, now) {
  return !!entry && entry.due <= (now || Date.now());
}

/* المستحقّ الآن، الأقدم استحقاقاً أولاً: ما طال انتظاره أولى بالمراجعة. */
export function dueKeys(srs, now) {
  const t = now || Date.now();
  return Object.keys(srs)
    .filter(k => isDue(srs[k], t))
    .sort((a, b) => srs[a].due - srs[b].due);
}

/* عدّ ما سيستحقّ غداً يُطمئن المتعلّم أن الغد ليس فارغاً ولا ساحقاً. */
export function dueSoon(srs, within, now) {
  const t = now || Date.now();
  const end = t + (within || 1) * DAY;
  return Object.keys(srs).filter(k => srs[k].due > t && srs[k].due <= end).length;
}

/* توزيع الصناديق: يُظهر للمتعلّم أين هو من الإتقان لا رقماً مجرّداً. */
export function boxCounts(srs) {
  const out = BOXES.map(() => 0);
  Object.values(srs).forEach(e => {
    const i = Math.max(0, Math.min(BOXES.length - 1, (e.b || 1) - 1));
    out[i]++;
  });
  return out;
}

/* الصندوق الأخير يعني أنّ أجله خمسة وثلاثون يوماً، وهو أقرب ما يكون
   إلى الإتقان في نظام كهذا. ولا نسمّيه «محفوظاً للأبد» لأنه ليس كذلك. */
export function masteredCount(srs) {
  return Object.values(srs).filter(e => (e.b || 1) >= BOXES.length).length;
}
