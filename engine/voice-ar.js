/* صوتُ المدرّب بالعربيّة.

   و«say» في ui.js للإنجليزيّة: تَفرض lang='en-US'، فلو مُرِّر إليها
   نصٌّ عربيٌّ قرأه صوتٌ إنجليزيٌّ حرفاً حرفاً — وهو أسوأُ من الصمت.

   وليس كلُّ جهازٍ فيه صوتٌ عربيّ، فيُفحَص قبل أن يُعرَض الزرّ: زرٌّ
   لا يَنطق أسوأُ من لا زرّ.

   والأصواتُ تُحمَّل بعد الإقلاع في بعض المتصفّحات، فيُستمَع إلى
   voiceschanged ولا يُحكَم من أوّل سؤال. */
let voices = [];

const load = () => {
  try { voices = speechSynthesis.getVoices() || [] } catch (e) { voices = [] }
  return voices;
};

export function initVoiceAr(onReady){
  try {
    load();
    if (typeof speechSynthesis.addEventListener === 'function')
      speechSynthesis.addEventListener('voiceschanged', () => { load(); if (onReady) onReady() });
  } catch (e) { /* لا نطقَ في هذه البيئة */ }
}

const isArabic = v => {
  const L = String((v && v.lang) || '').toLowerCase();
  return L === 'ar' || L.startsWith('ar-') || L.startsWith('ar_');
};
const arVoice = () => (voices.length ? voices : load()).find(isArabic);

export const hasVoiceAr = () => !!arVoice();

export function sayAr(text, onEnd){
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || ''));
    const v = arVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || 'ar-SA';
    /* أبطأُ من المعتاد قليلاً: هذا تعريفٌ يُفهَم لا خبرٌ يُذاع. */
    u.rate = 0.92;
    u.pitch = 1;
    if (onEnd) u.onend = onEnd;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false }
}

export function stopAr(){ try { speechSynthesis.cancel() } catch (e) {} }
