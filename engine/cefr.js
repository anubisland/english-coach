/* أي قدرات أثبتها المتعلّم فعلاً، في كل مستوى؟

   القدرة تُعدّ مُثبَتة بشرطين معاً: أن يُتقن دروسها، وأن ينال في
   الاختبار الذي يقيسها نتيجةً معتبرة. والدرس وحده لا يكفي — التمرين
   داخل الدرس يأتي بعد شرحه فيُستعان عليه بالتوقّع، والاختبار يسحب
   من بعيد.

   والعتبة ٦٥٪ لا ٥٠: «أثبتَ» كلمةٌ تُقال لمن يُؤدّي لا لمن يكاد.

   والحساب هنا لكل مستوى على حدة، فإضافة A2 لا تحتاج نسخ المنظومة. */
import {CEFR, LEVEL_IDS, levelCoverage} from '../content/cefr.js';
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

/* تقرير مستوىً واحد. */
export function cefrReport(levelId) {
  const id = CEFR[levelId] ? levelId : 'A1';
  const lv = CEFR[id];
  const rows = lv.caps.map(c => ({...c, ...capabilityState(c)}));
  const proven = rows.filter(r => r.level === 'proven').length;
  return {
    id, t: lv.t, rows, proven, total: lv.caps.length,
    gaps: lv.gaps,
    coverage: levelCoverage(id),
    /* الصياغة والأرقام العربية شأن الشاشة لا المحرّك. */
    state: lv.caps.length && proven === lv.caps.length ? 'all'
      : proven === 0 ? 'none' : 'some'
  };
}

/* نظرة على السلّم كلّه: ما بُني من كل مستوى، وما أثبته المتعلّم منه. */
export function levelsReport() {
  return LEVEL_IDS.map(id => {
    const r = cefrReport(id);
    return {id, t: r.t, built: r.total, gaps: r.gaps.length,
      coverage: r.coverage, proven: r.proven};
  });
}

/* المستوى الذي يعمل فيه المتعلّم الآن: أوّل مستوى لم يُتمّ قدراته.
   ولا يُعلَن مستوىً لا محتوى خلفه، فالخالي من القدرات يُتخطّى. */
export function currentLevel() {
  for (const id of LEVEL_IDS) {
    const r = cefrReport(id);
    if (r.total && r.proven < r.total) return id;
  }
  const built = LEVEL_IDS.filter(id => cefrReport(id).total);
  return built[built.length - 1] || 'A1';
}
