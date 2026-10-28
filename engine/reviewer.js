/* المراجع الاختياريّ: رأيُ نموذجٍ لغويّ في الكتابة الحرّة.

   وهو خارج ميزان البرنامج عمداً. كلُّ ما عداه يُقاس بمفتاح إجابةٍ
   أو بمحرّك أنماط: حكمٌ واحدٌ لا يختلف بين مرّةٍ وأخرى. والنموذج
   يختلف، فلو دخل حكمُه في عدّاد «أثبتَ كذا من كذا» لصار الرقمُ
   رأياً متقلّباً — وهو ما أخرجناه من هذا البرنامج. فالمراجع يَصِف
   ولا يَحكم، ولا يمسّ S.res ولا القدرات.

   ومفتاحُ المستخدم في مفتاح تخزينٍ على حدة، لا في حالة التطبيق:
   فلا يخرج في ملفّ تصدير التقدّم، ولا يُرفع مع نسخةٍ احتياطية.
   ولا يُكتب في مستودعٍ ولا في إعدادٍ، وإنما يُدخله صاحبُه هنا. */
import {logError} from './state.js';

const KEY = 'ec-reviewer-key';     /* خارج S عمداً */
const CFG = 'ec-reviewer-cfg';
const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const TIMEOUT_MS = 60000;

/* الافتراضيّ أقدرُ النماذج. ومن أراد أرخص فليغيّره بنفسه. */
export const MODELS = [
  ['claude-opus-5-5', 'الأدقّ (الأغلى)'],
  ['claude-sonnet-5-5', 'متوازن'],
  ['claude-haiku-5-5', 'الأسرع (الأرخص)']
];

const read = (k, d) => { try { return localStorage.getItem(k) ?? d } catch { return d } };

export function reviewerKey() { return read(KEY, '') || '' }

/* الإعدادُ التالف يُعاد إلى الفراغ، ولكن بصوت: لولا التسجيل لظنّ
   صاحبُه أنّه لم يوافق قطّ، والبرنامج يراه موافقاً مفقوداً. */
export function reviewerCfg() {
  const raw = read(CFG, 'null');
  try { return JSON.parse(raw) || {} }
  catch (e) { logError('إعداد المراجع تالف', e); return {} }
}

export function reviewerModel() {
  const m = reviewerCfg().model;
  return MODELS.some(x => x[0] === m) ? m : MODELS[0][0];
}

/* مُفعَّلٌ يعني: وافق صاحبُه صراحةً، وأدخل مفتاحه. وأحدُهما وحده لا يكفي. */
export function reviewerOn() { return !!reviewerKey() && !!reviewerCfg().agreed }

/* المفتاح يُرسَل ترويسةً، والترويسة لا تحتمل إلا المحارف المطبوعة.
   ومفتاحٌ فيه سطرٌ مكسور من لصقٍ ملتفّ يُسقط fetch قبل أيّ شبكة،
   فيُقال لصاحبه «تحقّق من الشبكة» ويبحث حيث لا شيء. فيُردّ هنا. */
export const KEY_OK = s => /^[\x21-\x7e]+$/.test(s);

export function setReviewerKey(k) {
  try {
    const v = (k || '').trim();
    if (v) localStorage.setItem(KEY, v); else localStorage.removeItem(KEY);
    return true;
  } catch (e) { logError('حفظ مفتاح المراجع', e); return false }
}

export function setReviewerCfg(patch) {
  try {
    localStorage.setItem(CFG, JSON.stringify({...reviewerCfg(), ...patch}));
    return true;
  } catch (e) { logError('حفظ إعداد المراجع', e); return false }
}

export function forgetReviewer() {
  try { localStorage.removeItem(KEY); localStorage.removeItem(CFG); return true }
  catch (e) { logError('حذف مفتاح المراجع', e); return false }
}

const SYSTEM = `You are an Arabic-speaking English writing tutor.

The learner is an Arabic speaker. You will be given the task they were set
and what they wrote. Reply in ARABIC only, in at most six short lines:

1. One line: what they did well, concretely.
2. Then up to four lines, each naming ONE problem: quote the learner's exact
   English words, then give the corrected English, then say why in Arabic.
   Prefer errors that come from Arabic interference.
3. One final line: the single thing to work on next.

Rules:
- Judge only what they wrote. Do not invent errors. If a sentence is correct,
  do not "fix" it.
- Keep every English quotation exactly as they wrote it.
- Give no score, no mark, no percentage. You are not grading.
- If the writing is empty or not English, say so in one line and stop.`;

/* الحالاتُ المسمّاة. والمسمّى خيرٌ من رقمٍ عارٍ: ٤٠٢ تعني رصيداً
   نفد، وهو أكثر ما يقع لمن جاء بمفتاحه — لا عطلاً في البرنامج. */
const STATUS = {
  400: 'الطلب مرفوض — قد يكون النموذج المختار غير متاح لمفتاحك',
  401: 'المفتاح غير مقبول',
  402: 'رصيد حسابك نفد',
  403: 'المفتاح لا يملك هذا الإذن',
  404: 'النموذج المختار غير موجود — جرّب غيره من الإعدادات',
  429: 'تجاوزتَ حدّ الاستعمال — أعد المحاولة بعد قليل',
  529: 'الخدمة مزدحمة الآن'
};

/* نداءٌ واحدٌ قصير، وخطؤه يُعلَن ولا يُبتلع: الصمتُ هنا يوهم المتعلّم
   أنّ كتابته سليمة، والسكوتُ عن العطل أسوأ من العطل. */
export async function reviewWriting({ask, text}) {
  const key = reviewerKey();
  if (!key) return {ok: false, why: 'لا مفتاح — أدخله في الإعدادات'};
  if (!KEY_OK(key)) return {ok: false, why: 'في المفتاح محرفٌ لا يصلح — أعد لصقه في سطرٍ واحد'};
  if (!reviewerCfg().agreed) return {ok: false, why: 'لم تُوافق بعدُ على إرسال كتابتك'};
  const wrote = (text || '').trim();
  if (!wrote) return {ok: false, why: 'لا نصّ لمراجعته'};

  /* مهلةٌ صريحة: الاتّصال المعلَّق لا يرفض من نفسه أبداً، فتبقى
     «… يراجع» إلى الأبد بلا زرٍّ ولا خبر. */
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      signal: ctl.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': API_VERSION,
        /* نداءٌ من المتصفّح مباشرةً بلا خادمٍ وسيط. */
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: reviewerModel(),
        max_tokens: 2048,
        system: SYSTEM,
        messages: [{role: 'user', content:
          'TASK (in Arabic): ' + (ask || '—') + '\n\nLEARNER WROTE:\n' + wrote}]
      })
    });
  } catch (e) {
    logError('نداء المراجع', e);
    if (e && e.name === 'AbortError')
      return {ok: false, why: 'طالت المراجعة أكثر من دقيقة — جرّب ثانية'};
    /* fetch يرفض بالخطأ نفسه للانقطاع ولمنع الإضافة ولحجب CORS.
       فيُفرَّق بما نملك: أمتّصلٌ الجهاز أصلاً؟ */
    return {ok: false, why: navigator.onLine === false
      ? 'جهازك غير متّصل بالإنترنت'
      : 'تعذّر الوصول إلى الخدمة — قد يحجبها مانعُ إعلانات أو إعدادُ شبكة'};
  } finally { clearTimeout(timer) }

  if (!res.ok) {
    let detail = '';
    try { const j = await res.json(); detail = (j && j.error && j.error.message) || '' }
    catch (e) { /* ردُّ البوّابات HTML لا JSON، وهذا متوقَّع */ }
    const named = STATUS[res.status] || (res.status >= 500
      ? 'عطلٌ مؤقّت في الخدمة (' + res.status + ')'
      : 'الخدمة ردّت بخطأ ' + res.status);
    /* التفصيل إنجليزيٌّ من الخدمة، فيُوسَم ويُقصَر لئلّا يطغى. */
    return {ok: false, why: named
      + (detail ? ' · التفصيل التقنيّ: ' + detail.slice(0, 160) : '')};
  }

  let data;
  try { data = await res.json() }
  catch (e) { logError('ردّ المراجع', e); return {ok: false, why: 'ردٌّ غير مفهوم من الخدمة'} }
  if (data && data.stop_reason === 'refusal')
    return {ok: false, why: 'امتنع النموذج عن الردّ على هذا النصّ'};
  const out = (data && Array.isArray(data.content) ? data.content : [])
    .filter(b => b && b.type === 'text').map(b => b.text).join('\n').trim();
  if (!out) return {ok: false, why: 'جاء الردّ فارغاً'};
  /* المبتورُ يشبه الموجز تماماً، فيُقال إنّه بُتر. */
  const cut = data.stop_reason === 'max_tokens';
  return {ok: true, text: cut ? out + '\n\n— انقطع الردّ قبل تمامه —' : out};
}
