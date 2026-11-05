/* النطق: من محرّك الجهاز إن كان، وإلّا فمن المتصفّح.

   والمتصفّحُ الداخليُّ في تطبيق الأندرويد لا يَرى أصواتَ النظام —
   يَردّ getVoices() فارغةً وإن كان المحرّكُ مثبّتاً واللغاتُ منزّلة.
   فتعطّلت محطّةُ الإملاء على لوح صاحب البرنامج وهي لا تقوم بغير
   الصوت، ولم يكن في إعداداته ما يُصلحها.

   فصار للتطبيق جسرٌ إلى TextToSpeech مباشرةً، ويبقى المتصفّحُ
   للنسخة التي تُفتَح في المتصفّح — ولا تُجلَب مكتبةٌ خارجيّةٌ لهذا:
   ما يلزم سطورٌ ممّا في الأندرويد أصلاً. */

const native = () => {
  try {
    const C = typeof window !== 'undefined' && window.Capacitor;
    return C && C.isNativePlatform && C.isNativePlatform() && C.Plugins && C.Plugins.Tts;
  } catch (e) { return null }
};

/* ما أجابه الجسرُ عن كلّ لغة، لئلّا يُسأل في كلّ رسمة. */
const asked = {};

export function probeVoice(lang){
  const T = native();
  if (!T) return;
  const k = lang || 'en';
  if (asked[k] !== undefined) return;
  asked[k] = null;                       // جارٍ
  T.available({lang: k})
    .then(r => { asked[k] = (r && r.ready === false) ? undefined : !!(r && r.hasVoice) })
    /* ولا يُلتَقط «لم يُهيَّأ بعد» على أنّه «لا صوت»: الجسرُ يُهيَّأ
       بعد الإقلاع، فسؤالٌ يقع في الفجوة يُرجع false فيُحذَّر صاحبُ
       جهازٍ سليمٍ طولَ الجلسة. فيُترَك مجهولاً ليُعاد السؤال. */
    .then(() => {})
    .catch(() => { asked[k] = undefined });
}

/* أفي الجهاز صوتٌ لهذه اللغة؟

   وفي التطبيق يُسأل الجسر، وفي المتصفّح تُقرأ قائمةُ الأصوات.
   وما لم يُعرَف بعدُ يُحمَل على الوجود: تحذيرٌ كاذبٌ يَصرف المتعلّم
   عن محطّةٍ سليمة أسوأُ من سكوتٍ يَنكشف بالتجربة. */
export function hasVoice(lang){
  const k = lang || 'en';
  if (native()) {
    if (asked[k] === undefined) { probeVoice(k); return true }
    return asked[k] === null ? true : asked[k];
  }
  try {
    const v = speechSynthesis.getVoices() || [];
    if (!v.length) return true;          // لم تَجئ بعد
    return v.some(x => String(x.lang || '').toLowerCase().startsWith(k));
  } catch (e) { return false }
}

/* ومن يُبلَّغ بالصمت المتأخّر: يُضبَط من views/ui.js. */
let onSilent = () => {};
export function setSilentHandler(fn){ onSilent = fn || (() => {}) }

export function speak(text, lang, rate){
  const t = String(text || '');
  if (!t) return false;
  const k = lang || 'en';
  const T = native();

  if (T) {
    T.stop().catch(() => {});
    /* والفشلُ هنا يقع بعد العودة، فلا يَبلغه say() — فيُبلَّغ من
       هنا. وإلّا ضغط المتعلّم «استمع» فلم يَسمع ولم يُقَل له شيء.

       ولا يُرجَع إلى المتصفّح هنا: هو الطريقُ الميتُ في التطبيق —
       وهذا سببُ وجود الجسر أصلاً — ويَقول «تمّ» ولا يَنطق، فتُبتلَع
       الرسالةُ ولا يَعلم المتعلّمُ لماذا صَمَت. */
    T.speak({text: t, lang: k, rate: rate || 1}).catch(e => onSilent(e));
    return true;
  }
  return fallback(t, k, rate);
}

function fallback(t, lang, rate){
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    u.rate = rate || 1;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false }
}

export function stopSpeak(){
  const T = native();
  if (T) { T.stop().catch(() => {}); return }
  try { speechSynthesis.cancel() } catch (e) {}
}
