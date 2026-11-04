import {speak, hasVoice, stopSpeak, probeVoice} from './voice.js';
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
  probeVoice('ar'); probeVoice('en');
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

export const hasVoiceAr = () => hasVoice('ar');

export function sayAr(text, onEnd){
  /* ومن الجسر إن كان: المتصفّحُ الداخليُّ لا يَرى أصواتَ النظام. */
  const ok = speak(String(text || ''), 'ar', 0.92);
  if (ok && onEnd) setTimeout(onEnd, Math.max(2000, String(text||'').length * 60));
  return ok;
}

export function stopAr(){ stopSpeak() }
