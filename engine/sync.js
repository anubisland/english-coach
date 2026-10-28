/* وسيطُ المزامنة: رفعُ التقدّم وجلبُه برمزٍ واحد.

   ولا حزمةَ Firebase: التطبيق بلا بناءٍ ولا مُجمِّع، وإضافةُ حزمةٍ
   بمئات الكيلوبايتات لأجل قراءةِ وثيقةٍ وكتابتها بذخٌ لا يُحتمل في
   تطبيقٍ كلُّه ٣٫٤ م.ب. وواجهةُ Firestore الشبكية تكفي: طلبان.

   والرمزُ ككلمة السرّ — من علمه قرأ وكتب. ولذلك يُولَّد من
   crypto.getRandomValues لا من Math.random: الثاني يُتوقَّع. */
import {logError} from './state.js';
import {syncable, mergeInto} from './sync-merge.js';

/* قيمٌ عامّةٌ تُشحن في كلّ نسخة، وليست سرّاً: الحمايةُ في
   firestore.rules لا هنا. */
const PROJECT = 'english-coach-sync';
const API_KEY = 'AIzaSyDCfpAyznZegFlYUyhCi5Ot551r0oHM4KY';
const BASE = 'https://firestore.googleapis.com/v1/projects/' + PROJECT
  + '/databases/(default)/documents/sync/';
const CODE_KEY = 'ec-sync-code';
const SEEN_KEY = 'ec-sync-at';
const TIMEOUT_MS = 20000;
export const CODE_LEN = 12;

/* بلا حرفٍ يلتبس بآخر: لا O ولا 0، ولا I ولا l ولا 1 — فالرمز
   يُنقل بالعين واليد بين جهازين. */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';

const read = (k, d) => {
  try { return localStorage.getItem(k) ?? d }
  catch (e) { logError('قراءة تخزين المزامنة', e); return d }
};
const write = (k, v) => {
  try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); return true }
  catch (e) { logError('حفظ رمز المزامنة', e); return false }
};

export const syncCode = () => read(CODE_KEY, '') || '';
export const syncOn = () => syncCode().length === CODE_LEN;
export const forgetSync = () => { write(CODE_KEY, ''); write(SEEN_KEY, '') };

export const validCode = c => typeof c === 'string'
  && c.length === CODE_LEN
  && [...c].every(ch => ALPHABET.includes(ch));

export function newCode() {
  const a = new Uint32Array(CODE_LEN);
  crypto.getRandomValues(a);
  return [...a].map(n => ALPHABET[n % ALPHABET.length]).join('');
}

/* ردُّ الحفظ لا يُهمَل: كان يُرجع true دائماً، فالحارسُ الذي كُتب
   لتعذّر التخزين لم يكن يعمل قطّ — يُقال لصاحبه «أُنشئ رمزك» ثمّ
   لا يرى رمزاً ولا يفهم لماذا. */
export function setSyncCode(c) {
  const v = (c || '').trim();
  if (!validCode(v)) return false;
  if (!write(CODE_KEY, v)) return false;
  write(SEEN_KEY, '');
  return true;
}

/* متى زامن هذا الجهاز بنجاح. وهو خارج S عمداً: شأنُ جهازٍ لا يُزامَن،
   ويبقى بعد إعادة التشغيل — وS.syncAt كان يسقط في migrate فيقول
   «لم تُزامن بعد» أبداً، وهو الأثرُ الوحيد الذي عُوّل عليه. */
export const syncSeenAt = () => Number(read(SEEN_KEY, '0')) || 0;

async function call(url, opts) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try { return await fetch(url, {...opts, signal: ctl.signal}) }
  finally { clearTimeout(timer) }
}

const why = e => e && e.name === 'AbortError' ? 'طال الاتّصال — جرّب ثانية'
  : (navigator.onLine === false ? 'لا إنترنت على هذا الجهاز'
    : 'تعذّر الوصول إلى الوسيط');

/* الجلب: غيابُ الوثيقة ليس خطأً — هو أوّلُ مرّةٍ يُستعمل فيها الرمز. */
export async function pull() {
  const code = syncCode();
  if (!validCode(code)) return {ok: false, why: 'لا رمز مزامنة'};
  let res;
  try { res = await call(BASE + code + '?key=' + API_KEY, {method: 'GET'}) }
  catch (e) { logError('جلب المزامنة', e); return {ok: false, why: why(e)} }
  if (res.status === 404) return {ok: true, empty: true};
  if (!res.ok) {
    logError('جلب المزامنة', 'HTTP ' + res.status);
    return {ok: false, why: 'الوسيط ردّ بخطأ ' + res.status};
  }

  let doc;
  try { doc = await res.json() }
  catch (e) { logError('قراءة ردّ المزامنة', e); return {ok: false, why: 'ردٌّ غير مفهوم'} }
  const f = (doc && doc.fields) || {};
  const raw = f.data && f.data.stringValue;
  /* وثيقةٌ موجودةٌ بشكلٍ لا نعرفه ليست وثيقةً غائبة: لو عُدّت غائبةً
     لكتبنا فوقها وقلنا «رُفع تقدّمك» — ومحونا عمل نسخةٍ أحدث. */
  if (f.v && Number(f.v.integerValue) > 1)
    return {ok: false, why: 'الوسيط كتبته نسخةٌ أحدث من التطبيق — حدّثه أوّلاً'};
  if (!raw) return {ok: true, empty: true};
  let data;
  try { data = JSON.parse(raw) }
  catch (e) { logError('قراءة بيانات المزامنة', e); return {ok: false, why: 'بياناتُ الوسيط تالفة'} }
  return {ok: true, data, at: Number(f.at && f.at.integerValue) || 0};
}

export async function push(S) {
  const code = syncCode();
  if (!validCode(code)) return {ok: false, why: 'لا رمز مزامنة'};
  const payload = JSON.stringify(syncable(S));
  /* القواعدُ ترفض فوق ٢٠٠ ألف محرف، والرفضُ دائمٌ لا عابر. فيُقال
     لصاحبه ما يفهمه بدل «خطأ ٤٠٣» يتكرّر إلى الأبد. */
  if (payload.length >= 200000)
    return {ok: false, why: 'تقدّمك أكبر من أن يُرفع — أخبر من صنع التطبيق'};
  const body = {fields: {
    v: {integerValue: '1'},
    at: {integerValue: String(Date.now())},
    data: {stringValue: payload}
  }};
  let res;
  try {
    res = await call(BASE + code + '?key=' + API_KEY, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    });
  } catch (e) { logError('رفع المزامنة', e); return {ok: false, why: why(e)} }
  if (!res.ok) {
    logError('رفع المزامنة', 'HTTP ' + res.status);
    return {ok: false, why: 'الوسيط ردّ بخطأ ' + res.status};
  }
  write(SEEN_KEY, String(Date.now()));
  return {ok: true};
}

/* دورةٌ كاملة: اجلب، ادمج في الحالة، ثمّ ارفع المدموج.

   والرفعُ بعد الدمج لا قبله: فلو رفع كلُّ جهازٍ حالته أوّلاً لمحا
   ما لم يكن يعرفه. وبهذا الترتيب يَخرج من الدورة تقدّمٌ يحوي عمل
   الجهازين معاً، أيُّهما بدأ. */
export async function syncNow(S, save) {
  const got = await pull();
  if (!got.ok) return got;
  if (got.data) { mergeInto(S, got.data); if (save) save() }
  const sent = await push(S);
  if (!sent.ok) return sent;
  return {ok: true, merged: !!got.data};
}
