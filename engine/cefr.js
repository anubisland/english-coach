/* أي قدرات A1 أثبتها المتعلّم فعلاً؟

   القدرة تُعدّ مُثبَتة بشرطين معاً: أن يُتقن دروسها، وأن ينال في
   الاختبار الذي يقيسها نتيجةً معتبرة. والدرس وحده لا يكفي — التمرين
   داخل الدرس يأتي بعد شرحه فيُستعان عليه بالتوقّع، والاختبار يسحب
   من بعيد.

   والعتبة ٦٥٪ لا ٥٠: «أثبتَ» كلمةٌ تُقال لمن يُؤدّي لا لمن يكاد. */
import {CEFR_A1, CEFR_GAPS, A1_COVERAGE} from '../content/cefr.js';
import {S} from './state.js';

export const PASS = 65;

export function examScore(slot) {
  const r = ((S && S.res) || {})[slot];
  return r && r.n ? r.last : null;
}

export function capabilityState(c) {
  /* قد تُستدعى قبل إقلاع الحالة، فلا تنهار. */
  const L = (S && S.lessons) || {};
  const done = (c.lessons || []).filter(id => L[id]).length;
  const need = (c.lessons || []).length || 1;
  const sc = examScore(c.exam);

  if (done < need) return {level: 'locked', done, need, sc,
    why: 'أتمّ دروسها أولاً: ' + (c.lessons || []).filter(id => !L[id]).join('، ')};
  if (sc === null) return {level: 'untested', done, need, sc,
    why: 'أتممتَ دروسها، وبقي أن تُثبتها في الاختبار'};
  if (sc >= PASS) return {level: 'proven', done, need, sc, why: null};
  return {level: 'weak', done, need, sc,
    why: 'نتيجتك ' + sc + '٪، والمطلوب ' + PASS + '٪ لإثباتها'};
}

export function cefrReport() {
  const rows = CEFR_A1.map(c => ({...c, ...capabilityState(c)}));
  const proven = rows.filter(r => r.level === 'proven').length;
  return {
    rows, proven, total: CEFR_A1.length,
    gaps: CEFR_GAPS,
    coverage: A1_COVERAGE,
    /* الصياغة والأرقام العربية شأن الشاشة لا المحرّك، فنُعطيها الحالة
       وتتولّى هي العبارة — وبلا ذلك تظهر أرقام غربية في واجهة عربية. */
    state: proven === CEFR_A1.length ? 'all' : proven === 0 ? 'none' : 'some'
  };
}
