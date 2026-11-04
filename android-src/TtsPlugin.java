package org.elwazir.englishcoach;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import android.speech.tts.TextToSpeech;
import android.speech.tts.Voice;

import java.util.HashMap;
import java.util.Locale;
import java.util.Set;

/**
 * جسرُ النطق إلى محرّك الجهاز مباشرةً.
 *
 * <p>والمتصفّحُ الداخليُّ في الأندرويد لا يَرى أصواتَ النظام: يَردّ
 * getVoices() فارغةً وإن كان المحرّكُ مثبّتاً واللغاتُ منزّلة — وقد
 * وقع هذا على لوح صاحب البرنامج، فتعطّلت محطّةُ الإملاء كلُّها وهي
 * لا تقوم بغير الصوت، ولم يكن في إعداداته ما يُصلحها.
 *
 * <p>ولم تُجلَب مكتبةٌ خارجيّةٌ لهذا: ما يَلزم سطورٌ من TextToSpeech
 * التي في الأندرويد أصلاً، وجلبُ تبعيّةٍ لها زيادةٌ في سطح الخطر بلا
 * حاجة.
 */
@CapacitorPlugin(name = "Tts")
public class TtsPlugin extends Plugin {

    private TextToSpeech tts;
    private boolean ready = false;

    @Override
    public void load() {
        tts = new TextToSpeech(getContext(), status -> {
            ready = (status == TextToSpeech.SUCCESS);
        });
    }

    /** أمُهيَّأٌ المحرّك، وأفيه صوتٌ لهذه اللغة؟ */
    @PluginMethod
    public void available(PluginCall call) {
        String lang = call.getString("lang", "en");
        JSObject out = new JSObject();
        out.put("ready", ready);
        out.put("hasVoice", ready && hasVoice(lang));
        call.resolve(out);
    }

    private boolean hasVoice(String lang) {
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null || voices.isEmpty()) {
                /* بعضُ المحرّكات لا تُعلن أصواتَها وتَنطق: فيُسأل عن اللغة. */
                int r = tts.isLanguageAvailable(localeOf(lang));
                return r >= TextToSpeech.LANG_AVAILABLE;
            }
            String p = lang.toLowerCase(Locale.ROOT);
            for (Voice v : voices) {
                Locale vl = v.getLocale();
                if (vl != null && vl.toString().toLowerCase(Locale.ROOT).startsWith(p)) return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    private Locale localeOf(String lang) {
        if (lang == null) return Locale.US;
        String l = lang.toLowerCase(Locale.ROOT);
        if (l.startsWith("ar")) return new Locale("ar");
        return Locale.US;
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String text = call.getString("text", "");
        String lang = call.getString("lang", "en");
        Float rate = call.getFloat("rate", 1.0f);

        if (!ready || text == null || text.isEmpty()) {
            call.reject("المحرّك غير مهيّأ");
            return;
        }
        try {
            tts.stop();
            tts.setLanguage(localeOf(lang));
            tts.setSpeechRate(rate == null ? 1.0f : rate);
            /* QUEUE_FLUSH: نطقٌ واحدٌ في كلّ مرّة — وإلّا تراكمت الجملُ
               إن ضغط «استمع» مرّاتٍ متتابعة. */
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, new HashMap<String, String>());
            call.resolve();
        } catch (Exception e) {
            call.reject(String.valueOf(e.getMessage()));
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        try { if (tts != null) tts.stop(); } catch (Exception ignored) {}
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        try { if (tts != null) { tts.stop(); tts.shutdown(); } } catch (Exception ignored) {}
    }
}
