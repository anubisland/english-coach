/* لوحة المراجع الاختياريّ في الإعدادات.

   والإفصاحُ قبل الزرّ لا بعده: من يُشغّل هذا يُرسل كتابته إلى خدمةٍ
   خارجية بمفتاحه هو، ويدفع ثمن كلّ نداء. فيُقال له ذلك صراحةً قبل
   أن يوافق، لا في سطرٍ صغيرٍ تحت. */
import {card, esc, toast} from './ui.js';
import {hooks} from '../engine/bus.js';
import {MODELS, KEY_OK, reviewerKey, reviewerCfg, reviewerModel, reviewerOn,
        setReviewerKey, setReviewerCfg, forgetReviewer} from '../engine/reviewer.js';

/* لا يُعرض المفتاح ولو نجوماً: يكفي أن يُعلَم أنّه محفوظ. */
const stored = () => reviewerKey() ? 'محفوظٌ على هذا الجهاز' : 'لا مفتاح';

export function reviewerPanel() {
  const on = reviewerOn(), cfg = reviewerCfg();
  const opts = MODELS.map(([id, t]) =>
    `<option value="${esc(id)}"${id === reviewerModel() ? ' selected' : ''}>${esc(t)}</option>`).join('');

  /* مطويّةٌ افتراضاً. صاحبُ البرنامج فتح الإعدادات يبحث عن تقدّمه
     فاستقبله صندوقٌ يسأله عن «مفتاح» لا يملكه ولا يعرف ما هو، فظنّ
     أنّ عليه شيئاً. والميزةُ الاختيارية لا تقف في طريق من لا يريدها:
     سطرٌ واحدٌ يطمئن، ولا يُفتح ما تحته إلّا بطلبه. */
  return card('ميزة إضافية — لستَ بحاجة إليها',
    `<p class="muted">البرنامج كاملٌ بدونها: الدروس والاختبارات والمحادثة
       والتصحيح تعمل كلُّها بلا إنترنت وبلا أيّ اشتراك.
       <b>ولا شيء عليك أن تفعله هنا.</b></p>

     <details style="margin-top:10px">
       <summary class="muted" style="cursor:pointer;font-weight:700">ما هذه الميزة؟ (للفضول فقط)</summary>

     <p class="muted" style="margin-top:10px">تُظهر رأيَ نموذجٍ لغويّ في كتابتك
       الحرّة: ما أحسنتَ فيه وما أخطأت ولماذا. <b>وهو رأيٌ يُعرض لا درجةٌ
       تُحتسب</b> — لا يدخل في «أثبتَ كذا من كذا» ولا يغيّر نتيجة.</p>

     <p class="muted" style="margin-top:10px">وتشغيلها يحتاج <b>اشتراكاً مدفوعاً</b>
       لدى خدمةٍ خارجية (<span class="en" dir="ltr">api.anthropic.com</span>)،
       يشتريه المبرمجون ويُسمّى «مفتاحاً». ولكلّ مراجعةٍ ثمنٌ يُحسب على صاحبه.
       <b>فإن لم يكن عندك مفتاح فلا تشغلْ بالك به</b> — واترك ما تحت هذا السطر
       كما هو.</p>

     <ul class="muted" style="margin:10px 0 0;padding-inline-start:18px;line-height:1.9">
       <li>كتابتُك لا تخرج من جهازك إلّا إن أدخلتَ مفتاحاً ووافقتَ وضغطتَ الزرّ.</li>
       <li>المفتاح يُحفظ على هذا الجهاز وحده، ولا يخرج في ملفّ تصدير تقدّمك.</li>
       <li>هذا الجزء وحده يحتاج إنترنت، وما عداه يعمل بلا شبكة.</li>
     </ul>

     <div style="margin-top:12px">
       <label class="muted" style="font-size:12px;display:block">المفتاح (${esc(stored())})</label>
       <input id="revKey" type="password" autocomplete="off" spellcheck="false"
         placeholder="sk-ant-…" class="en" dir="ltr"
         style="width:100%;max-width:340px;margin-top:4px;padding:10px;border:2px solid var(--line);
                border-radius:12px;background:var(--surf);color:var(--ink)">
     </div>

     <div style="margin-top:10px">
       <label class="muted" style="font-size:12px;display:block">النموذج</label>
       <select id="revModel" onchange="reviewerPickModel(event)"
         style="margin-top:4px;padding:10px;border:2px solid var(--line);border-radius:12px;
                background:var(--surf);color:var(--ink)">${opts}</select>
     </div>

     <label style="display:flex;gap:8px;align-items:flex-start;margin-top:12px;cursor:pointer">
       <input type="checkbox" id="revAgree" ${cfg.agreed ? 'checked' : ''}
         onchange="reviewerAgree(event)" style="margin-top:3px">
       <span class="muted">أوافق على إرسال نصّ كتابتي الحرّة إلى الخدمة الخارجية
         عند طلبي المراجعة.</span>
     </label>

     <div class="row" style="justify-content:flex-start;margin-top:12px">
       <button class="btn" onclick="reviewerSaveKey()">احفظ المفتاح</button>
       <button class="btn ghost" onclick="reviewerForget()">احذف المفتاح والإعداد</button>
     </div>

     <p class="muted" style="margin-top:10px;font-size:12px">
       الحالة: ${on ? '<b style="color:var(--green)">مُشغَّلة</b>'
         : '<b>مُطفأة</b> — وهذا هو الوضع الطبيعيّ'}</p>
     </details>`);
}

export function reviewerSaveKey() {
  const el = document.getElementById('revKey');
  const v = el ? el.value : '';
  if (!v.trim()) { toast('اكتب المفتاح أولاً'); return }
  /* اللصقُ الملتفّ يُدخل سطراً مكسوراً، وfetch يسقط به قبل أيّ شبكة. */
  if (!KEY_OK(v.trim())) { toast('في المفتاح محرفٌ لا يصلح — الصقه في سطرٍ واحد'); return }
  if (!setReviewerKey(v)) { toast('تعذّر الحفظ في هذا المتصفح'); return }
  if (el) el.value = '';
  toast('حُفظ المفتاح على هذا الجهاز');
  hooks.render();
}

export function reviewerForget() {
  if (!forgetReviewer()) { toast('تعذّر الحذف في هذا المتصفح'); return }
  toast('حُذف المفتاح والإعداد');
  hooks.render();
}

/* نتيجةُ الحفظ لا تُهمَل: في التصفّح الخاصّ يفشل التخزين صامتاً،
   فيرى المتعلّم مربّعه مؤشَّراً ثمّ يعود فارغاً بلا سبب. وأسوأُ منه
   النموذج: يظنّ أنّه اختار الأرخص وتُحسب عليه كلفةُ الأغلى. */
export function reviewerAgree(e) {
  if (!setReviewerCfg({agreed: !!(e && e.target && e.target.checked)}))
    toast('تعذّر حفظ الإعداد في هذا المتصفح');
  hooks.render();
}

export function reviewerPickModel(e) {
  if (!setReviewerCfg({model: e && e.target ? e.target.value : MODELS[0][0]}))
    toast('تعذّر حفظ اختيار النموذج في هذا المتصفح');
  /* ويُعاد الرسم ليعود المختارُ إلى ما حُفظ فعلاً لا ما نُقر. */
  hooks.render();
}
