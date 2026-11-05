/* الإعدادات: الوضع، هدف الكلام، نقل التقدّم بين الأجهزة، وإعادة البداية. */
import {S, save, logError, defaultState, migrate, K} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {LESSONS} from '../content/lessons.js';
import {card, svg, ar, toast, esc} from './ui.js';
import {reviewerPanel} from './reviewer-panel.js';
import {syncCard} from './sync-panel.js';
import {helpCard} from './help.js';
import {syncOn, forgetSync} from '../engine/sync.js';
import {hasPlan} from '../engine/plan.js';
import {currentUnit, UNIT_NS, levelUnits, unitLessons} from '../engine/progress.js';
import {currentLevel} from '../engine/cefr.js';

/* مصدرُ رقم النسخة الوحيد. يقرؤه scripts/build-apk.mjs ليضعه في
   الـAPK، ويحرس tests/apk.test.mjs أنّ package.json يطابقه.

   وكان رقماً مستقلّاً («٤») لا صلة له برقم الحزمة، فنزّل المستخدم
   ١٫١٫٠ ورأى في التطبيق «إصدار ٤». الحقيقة الواحدة تُكتب مرّةً. */
export const APP_VERSION = '1.18.1';

/* ما يُصدَّر: الحالة بلا الاختبار الجاري، فهو لحظي لا يُنقل. */
function snapshot() {
  const c = Object.assign({}, S);
  delete c.q;
  /* ونصُّ الكتابة الحرّة ورأيُ المراجع فيه: لحظيّان، وmigrate
     يُسقطهما عند الاستيراد — فحملُهما في الملفّ تعريضٌ بلا فائدة. */
  delete c.wx;
  delete c.rev;
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
  /* ويُفصَل عن المزامنة معه.

     والدمجُ يزيد ولا ينقص — وهو الصوابُ لئلّا يَمحوَ جهازٌ متأخّرٌ
     تقدّمَ غيره. فمن مَحا هنا والمزامنةُ موصولةٌ رَجع إليه تقدّمُه
     كلُّه عند أوّل سحب، فيَظنّ أنّ «إعادة البداية» لا تعمل.

     وكودُ المزامنة خارج الحالة، فلا يَمحوه إفراغُها.

     ولا تُمحى النسخةُ في الوسيط: أجهزتُه الأخرى قد تكون عليها، ومن
     أراد العودةَ إليها أدخل الكودَ من جديد. */
  const wasSynced = syncOn();
  const msg = wasSynced
    ? 'سيُمحى كل تقدّمك على هذا الجهاز، وسيُفصَل عن المزامنة لئلّا يعود.\n'
      + 'والنسخة في السحابة تبقى، وتستعيدها بإدخال الكود من جديد. متأكد؟'
    : 'سيُمحى كل تقدّمك ولا يمكن التراجع. متأكد؟';
  if (typeof confirm === 'function' && !confirm(msg)) return;

  const theme = S.theme;
  Object.keys(S).forEach(k => { delete S[k] });
  Object.assign(S, defaultState());
  S.theme = theme;                      // الوضع تفضيل عرض لا تقدّم
  if (wasSynced) forgetSync();
  save(); hooks.render();
  toast(wasSynced ? 'بدأنا من جديد، وفُصلت المزامنة' : 'بدأنا من جديد');
}

export function settingsView() {
  const done = LESSONS.filter(l => S.lessons[l.id]).length;
  const pick = (on) => 'margin:0;padding:9px 16px;min-height:0;border-radius:999px;font-size:13px'
    + (on ? '' : ';background:var(--surf2);color:var(--mute)');

  /* وبابٌ إلى التعريف والخطّة بعد أوّل مرّة: كان لا يُعرَض إلّا
     للداخل حديثاً، فمن عنده تقدّمٌ لا سبيلَ له إلى مراجعته. */
  return helpCard()
  + card('البرنامج وخطّتك',
    '<p class="muted">تعريفٌ بالبرنامج وترتيبِ وحداته، ثمّ خطّتُك — بمَ تَبدأ في كلّ وحدة، وكم تُذاكر في الأسبوع.</p>'
    + '<div class="row" style="justify-content:flex-start">'
    + '<button class="btn" onclick="planIntro()">شاهد التعريف واضبط خطّتك</button></div>')
  + card('المظهر',
    `<p class="muted">الوضع النهاري هو الافتراضي.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn${S.theme === 'light' ? '' : ' ghost'}" style="${pick(S.theme === 'light')}" onclick="setTheme('light')">نهاري</button>
       <button class="btn${S.theme === 'dark' ? '' : ' ghost'}" style="${pick(S.theme === 'dark')}" onclick="setTheme('dark')">ليلي</button>
     </div>`)
  /* ودقائقُ اليوم تُؤخَذ من الخطّة، فلا تُسأَل مرّتين.
     وكان يُسأل هنا «كم دقيقة تريد أن تتكلّم كل يوم» وقد أجاب عنه
     في خطّته — فأيُّهما يُصدَّق إن اختلفا؟ */
  + (hasPlan() ? '' : card('هدف الكلام اليومي',
    `<p class="muted">كم دقيقة تريد أن تتكلّم كل يوم؟ (ويضبطها وضعُ الخطّة كذلك)</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       ${[5, 10, 20].map(g =>
         `<button class="btn${g === S.goal ? '' : ' ghost'}" style="${pick(g === S.goal)}" onclick="setGoal(${g})">${ar(g)} دقائق</button>`).join('')}
     </div>`))
  + card('نقل تقدّمك إلى جهاز آخر',
    syncCard()
    + `<details style="margin-top:12px">
       <summary class="muted" style="cursor:pointer;font-size:12px">أو بملفّ (لا يعمل داخل تطبيق الأندرويد)</summary>
       <p class="muted" style="margin-top:8px;font-size:12px">نافذةُ العرض في أندرويد
         تتجاهل تنزيل الملفّ، فاستعمل المزامنة أعلاه على الهاتف واللوح.</p>
       <div class="row" style="justify-content:flex-start;margin-top:4px">
         <button class="btn ghost" onclick="exportProgress()">نزّل ملف تقدّمي</button>
         <label class="btn ghost" style="cursor:pointer">استورد ملفاً
           <input id="impFile" type="file" accept="application/json,.json" style="display:none" onchange="importProgress(event)">
         </label>
       </div>
     </details>`)
  /* بيانٌ واحدٌ عن موضعه، لا بطاقتان تتناقضان.

     وكان فوقَها «تقدّمك الآن: ٠ من ٨٢ درساً» وتحتَها «بدأتَ من
     الوحدة ٤» — فيَسأل بحقّ: والثلاثُ قبلها؟ أليست تقدّماً؟
     والثمانون مقامُ المنهج كلِّه تحت رقمٍ يَعُدّ ما أتمّه بيده. */
  + card('أين أنت الآن',
    (() => {
      const off = Object.keys(S.skipped || {}).length;
      const at = currentUnit() || 1;
      const lv = currentLevel();
      const lvLessons = levelUnits(lv).flatMap(unitLessons);
      const lvDone = lvLessons.filter(l => S.lessons[l.id]).length;

      return '<p class="muted" style="line-height:2">'
        + `أنت في <b>الوحدة ${ar(at)}</b> من ${ar(UNIT_NS.length)}، في مستوى <span class="en">${esc(lv)}</span>.`
        + (off ? `<br>أعفاك اختبارُ التحديد من <b>${ar(off)}</b> ${off === 1 ? 'وحدة' : off === 2 ? 'وحدتين' : 'وحدات'}.` : '')
        + `<br>وأتممتَ <b>${ar(lvDone)}</b> من ${ar(lvLessons.length)} درساً في هذا المستوى`
        + (S.xp ? `، ولك ${ar(S.xp)} نقطة` : '') + '.</p>'
        + '<div class="row" style="justify-content:flex-start;margin-top:4px">'
        + '<button class="btn ghost" onclick="launch(&quot;place&quot;)">أعد تحديد نقطة البداية</button></div>';
    })())
  + card('إعادة البداية',
    `<p class="muted">يمحو كل تقدّمك ويعيدك إلى اختبار تحديد المستوى. لا يمكن التراجع.</p>
     <div class="row" style="justify-content:flex-start;margin-top:4px">
       <button class="btn ghost" style="color:var(--coral)" onclick="resetProgress()">امحُ كل شيء وابدأ من جديد</button>
     </div>`)
  /* والميزةُ الاختياريّةُ تُرفَع من هنا.

     وسألَ صاحبُ البرنامج: «ما لزومُها وهو لا يحتاجها؟» — والجوابُ
     أنّ لا لزومَ لها عند المشتري: تَحتاج اشتراكاً مدفوعاً لدى خدمةٍ
     خارجيّة، ولا تَزيد في درجةٍ ولا تَفتح محطّة. وبطاقةٌ تُطمئنه
     أنّه لا يحتاجها خيرٌ منها ألّا تُعرَض أصلاً.

     والشفرةُ باقيةٌ في views/reviewer-panel.js لمن أرادها. */
  + card('عن التطبيق',
    `<p class="muted">مدرب الإنجليزية · إصدار ${ar(APP_VERSION)}<br>
     تعلّم بالكلام: شرح بالعربية، تمارين، ومحادثة حيّة مع تصحيح فوري.</p>`);
}
