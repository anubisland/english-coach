/* الإعدادات: الوضع، هدف الكلام، نقل التقدّم بين الأجهزة، وإعادة البداية. */
import {S, save, logError, defaultState, migrate, K} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {LESSONS} from '../content/lessons.js';
import {card, svg, ar, toast} from './ui.js';

export const APP_VERSION = '4';

/* ما يُصدَّر: الحالة بلا الاختبار الجاري، فهو لحظي لا يُنقل. */
function snapshot() {
  const c = Object.assign({}, S);
  delete c.q;
  return c;
}

/* المزامنة بين الأجهزة بلا خادم ولا حساب: ملف ينزل من هنا ويُرفع هناك. */
export function exportProgress() {
  try {
    const name = 'english-coach-' + new Date().toISOString().slice(0, 10) + '.json';
    const blob = new Blob([JSON.stringify(snapshot(), null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('نُزّل ملف تقدّمك');
  } catch (e) {
    logError('تصدير التقدم', e);
    toast('تعذّر تنزيل الملف في هذا المتصفح');
  }
}

/* الاستيراد يمرّ بـ migrate كأي حالة محفوظة، فلا يدخل ملفٌ تالف إلى التطبيق. */
export function applyImport(text) {
  let parsed;
  try { parsed = JSON.parse(text) }
  catch (e) { logError('قراءة ملف التقدم', e); toast('الملف غير صالح'); return false }

  const next = migrate(parsed);
  if (!next || typeof next !== 'object') { toast('الملف غير صالح'); return false }

  Object.keys(S).forEach(k => { delete S[k] });
  Object.assign(S, next);
  S.q = null;
  save();
  hooks.render();
  toast('استُعيد تقدّمك من الملف');
  return true;
}

export function importProgress(ev) {
  const f = ev && ev.target && ev.target.files && ev.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => applyImport(String(r.result));
  r.onerror = () => { logError('قراءة الملف', r.error); toast('تعذّر قراءة الملف') };
  r.readAsText(f);
}

export function resetProgress() {
  if (typeof confirm === 'function' && !confirm('سيُمحى كل تقدّمك ولا يمكن التراجع. متأكد؟')) return;
  const theme = S.theme;
  Object.keys(S).forEach(k => { delete S[k] });
  Object.assign(S, defaultState());
  S.theme = theme;                      // الوضع تفضيل عرض لا تقدّم
  save(); hooks.render();
  toast('بدأنا من جديد');
}

export function settingsView() {
  const done = LESSONS.filter(l => S.lessons[l.id]).length;
  const pick = (on) => 'margin:0;padding:9px 16px;min-height:0;border-radius:999px;font-size:13px'
    + (on ? '' : ';background:var(--surf2);color:var(--mute)');

  return card('المظهر',
    `<p class="muted">الوضع النهاري هو الافتراضي.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn${S.theme === 'light' ? '' : ' ghost'}" style="${pick(S.theme === 'light')}" onclick="setTheme('light')">نهاري</button>
       <button class="btn${S.theme === 'dark' ? '' : ' ghost'}" style="${pick(S.theme === 'dark')}" onclick="setTheme('dark')">ليلي</button>
     </div>`)
  + card('هدف الكلام اليومي',
    `<p class="muted">كم دقيقة تريد أن تتكلّم كل يوم؟</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       ${[5, 10, 20].map(g =>
         `<button class="btn${g === S.goal ? '' : ' ghost'}" style="${pick(g === S.goal)}" onclick="setGoal(${g})">${ar(g)} دقائق</button>`).join('')}
     </div>`)
  + card('نقل تقدّمك إلى جهاز آخر',
    `<p class="muted">لا حساب ولا خادم: نزّل ملف تقدّمك من هنا، وارفعه على الجهاز الآخر.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn" onclick="exportProgress()">نزّل ملف تقدّمي</button>
       <label class="btn ghost" style="cursor:pointer">استورد ملفاً
         <input id="impFile" type="file" accept="application/json,.json" style="display:none" onchange="importProgress(event)">
       </label>
     </div>`)
  + card('تقدّمك الآن',
    `<p class="muted">${ar(done)} من ${ar(LESSONS.length)} دروس · ${ar(Object.keys(S.cp).length)} وحدات مجتازة · ${ar(S.xp)} نقطة</p>`)
  /* لا نقول «مستواك A1» — البرنامج يغطّي أساسيات A1 وحدها، فلا يملك
     أن يُحدّد مستوى المتعلّم على السلّم العالمي، وإنّما نقطةَ بدايته فيه. */
  + card('نقطة بدايتك',
    `<p class="muted">بدأتَ من الوحدة ${ar((S.place && S.place.suggest) || 1)} من ثلاث.
      أعد الاختبار إن شعرت أنها لم تناسبك.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn ghost" onclick="launch('place')">أعد تحديد نقطة البداية</button>
     </div>`)
  + card('إعادة البداية',
    `<p class="muted">يمحو كل تقدّمك ويعيدك إلى اختبار تحديد المستوى. لا يمكن التراجع.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn ghost" style="color:var(--coral)" onclick="resetProgress()">امحُ كل شيء وابدأ من جديد</button>
     </div>`)
  + card('عن التطبيق',
    `<p class="muted">مدرب الإنجليزية · إصدار ${ar(APP_VERSION)}<br>
     تعلّم بالكلام: شرح بالعربية، تمارين، ومحادثة حيّة مع تصحيح فوري.</p>`);
}
