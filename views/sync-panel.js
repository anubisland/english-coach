/* شاشةُ المزامنة: رمزٌ يُنشأ هنا ويُكتب هناك، مرّةً واحدة.

   وكلُّ ما يراه المتعلّم ثلاثةُ أشياء: رمزُه، وزرُّ مزامنةٍ الآن،
   وسطرٌ يقول متى زامن آخرَ مرّة بنجاح. وما عدا ذلك شرحٌ مطويّ.

   والصراحةُ في موضعها: الرمزُ ككلمة السرّ، والتقدّمُ يُحفظ على
   خادمٍ خارجيّ. يُقال ذلك قبل الزرّ لا بعده. */
import {S, save, logError} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {esc, ar, toast} from './ui.js';
import {syncCode, syncOn, syncSeenAt, newCode, setSyncCode, forgetSync,
        syncNow, CODE_LEN} from '../engine/sync.js';

/* «شغّالة» لا تُقال لمجرّد وجود رمز: كانت تُقال فوق سطرٍ يقول «لم
   تُزامن بعد»، فيطمئنّ صاحبُها إلى خضرةٍ لا تدلّ على شيء. فالحالةُ
   من آخر نجاحٍ فعليّ. */
function state() {
  const t = syncSeenAt();
  if (!t) return {cls: 'var(--amber)', t: 'مهيّأة ولم تنجح بعد'};
  const mins = Math.round((Date.now() - t) / 60000);
  const ago = mins < 1 ? 'الآن' : mins < 60 ? 'قبل ' + ar(mins) + ' دقيقة'
    : mins < 1440 ? 'قبل ' + ar(Math.round(mins / 60)) + ' ساعة'
    : 'قبل ' + ar(Math.round(mins / 1440)) + ' يوم';
  /* ويومان بلا نجاحٍ خبرٌ يستحقّ لوناً: الصمتُ هنا هو العطل. */
  return {cls: mins > 2880 ? 'var(--amber)' : 'var(--green)',
    t: 'آخر مزامنة ناجحة ' + ago};
}

export function syncCard() {
  if (S.syncBusy) return `<p class="muted">… يزامن الآن</p>`;

  if (!syncOn()) return `<p class="muted">تقدّمك محفوظٌ على هذا الجهاز وحده.
      ولتراه على جهازٍ آخر، شغّل المزامنة مرّةً واحدة.</p>

    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="syncStart()">شغّل المزامنة</button>
      <button class="btn ghost" onclick="syncJoinBox()">عندي رمزٌ بالفعل</button>
    </div>

    <div id="joinBox" style="display:none;margin-top:10px">
      <input id="syncIn" dir="ltr" class="en" placeholder="اكتب الرمز هنا"
        autocomplete="off" spellcheck="false" autocapitalize="off" autocorrect="off"
        style="width:100%;max-width:280px;padding:10px;border:2px solid var(--line);
               border-radius:12px;background:var(--surf);color:var(--ink);font-size:16px">
      <div class="row" style="justify-content:flex-start;margin-top:6px">
        <button class="btn" onclick="syncJoin()">اربط هذا الجهاز</button>
      </div>
    </div>

    <details style="margin-top:12px">
      <summary class="muted" style="cursor:pointer;font-size:12px">ماذا يعني هذا؟</summary>
      <ul class="muted" style="margin:8px 0 0;padding-inline-start:18px;line-height:1.9;font-size:12.5px">
        <li><b>على جهازٍ واحدٍ فقط</b> اضغط «شغّل المزامنة»، وعلى الآخر «عندي رمزٌ بالفعل».
            ولو ضغطتَ «شغّل» على الاثنين صار لكلٍّ رمزٌ وحده ولم يلتقيا.</li>
        <li>يُحفظ تقدّمك (الدروس والنقاط والنتائج) على خادمٍ خارجيّ ليقرأه جهازك الآخر.</li>
        <li><b>لا تُرسَل كتابتك الحرّة</b> ولا رأيُ المراجع: يبقيان على جهازك.</li>
        <li>الرمزُ ككلمة السرّ — من عرفه رأى تقدّمك. فلا تنشره.</li>
        <li>الدمجُ يزيد ولا ينقص: ما أتقنتَه على أيّ جهازٍ يبقى.</li>
      </ul>
    </details>`;

  const st = state();
  return `<p class="muted">المزامنة · <b style="color:${st.cls}">${esc(st.t)}</b></p>

    <p class="muted" style="margin-top:10px;font-size:12.5px">رمزك — اكتبه على جهازك الآخر:</p>
    <div class="en" dir="ltr" style="margin-top:4px;padding:12px;border:2px dashed var(--line);
      border-radius:12px;font-size:20px;font-weight:700;letter-spacing:2px;text-align:center;
      user-select:all">${esc(syncCode())}</div>

    <div class="row" style="justify-content:flex-start;margin-top:10px">
      <button class="btn" onclick="syncRun()">زامن الآن</button>
      <button class="btn ghost" onclick="syncCopyCode()">انسخ الرمز</button>
    </div>
    <div class="row" style="justify-content:flex-start;margin-top:4px">
      <button class="btn ghost" style="color:var(--coral)" onclick="syncStop()">أوقف المزامنة على هذا الجهاز</button>
    </div>`;
}

export function syncStart() {
  if (!setSyncCode(newCode())) { toast('تعذّر حفظ الرمز في هذا المتصفح'); return }
  hooks.render();
  toast('أُنشئ رمزك — اكتبه على جهازك الآخر');
  syncRun();
}

export function syncJoinBox() {
  const b = document.getElementById('joinBox');
  if (b) { b.style.display = 'block'; const i = document.getElementById('syncIn'); if (i) i.focus() }
}

export function syncJoin() {
  const el = document.getElementById('syncIn');
  const v = (el ? el.value : '').trim();
  if (!v) { toast('اكتب الرمز أولاً'); return }
  if (v.length !== CODE_LEN) {
    toast('الرمز ' + ar(CODE_LEN) + ' محرفاً، وكتبتَ ' + ar(v.length)); return;
  }
  /* الطولُ صحيحٌ والمحارف لا: أندرويد يُكبّر أوّل حرفٍ تلقائياً،
     فيُقال له ذلك بدل شكوى الطول التي لا تدلّه على شيء. */
  if (!setSyncCode(v)) {
    toast('الرمز غير مطابق — انتبه لحالة الحروف (كبيرة/صغيرة)'); return;
  }
  hooks.render();
  syncRun();
}

export function syncCopyCode() {
  const c = syncCode();
  try {
    if (navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(c).then(
        () => toast('نُسخ الرمز'), () => toast('انسخه بيدك من الصندوق'));
  } catch (e) { logError('نسخ رمز المزامنة', e) }
  toast('انسخه بيدك من الصندوق');
}

export function syncStop() {
  /* الرمزُ يُمحى ولا يُستعاد، والوثيقةُ على الوسيط لا تُحذف ولا
     تُبلَغ بعده. فيُقال ذلك صراحةً قبل الضغط لا بعده. */
  if (typeof confirm === 'function'
      && !confirm('سيُمحى رمزك من هذا الجهاز ولا يمكن استرجاعه.\n'
        + 'تقدّمك المحفوظ هنا يبقى، لكنّك لن تصل إلى نسخة الوسيط إلّا إن كنتَ\n'
        + 'كتبتَ الرمز في مكانٍ آمن. متأكد؟')) return;
  forgetSync(); hooks.render();
  toast('أُوقفت المزامنة على هذا الجهاز');
}

/* هل يكتب المتعلّم الآن؟ إعادةُ الرسم تبني الشجرة من جديد، وما في
   الحقول نصٌّ لا يُحفظ في S إلّا عند الإرسال — فتضيع فقرتُه وهو
   يكتبها. وهذه الميزةُ وُضعت لتحفظ عمله لا لتمحوه. */
function typing() {
  const a = document.activeElement;
  if (a && /^(TEXTAREA|INPUT)$/.test(a.tagName) && a.value) return true;
  return ['wxTxt', 'chatPr', 'syncIn'].some(id => {
    const el = document.getElementById(id);
    return el && el.value;
  });
}

/* الزرُّ اليدويّ، وهو نفسه ما يُنادى عند الفتح — وبذلك يحرسهما
   syncBusy معاً، ولا يجري نداءان على حالةٍ واحدة. */
export async function syncRun(quiet) {
  if (!syncOn()) { if (!quiet) toast('المزامنة غير مُشغَّلة'); return }
  if (S.syncBusy) { if (!quiet) toast('المزامنة جاريةٌ الآن'); return }
  S.syncBusy = true;
  if (!quiet) hooks.render();
  let r;
  try { r = await syncNow(S, save) }
  catch (e) { logError('المزامنة', e); r = {ok: false, why: 'عطلٌ غير متوقّع'} }
  S.syncBusy = false;

  if (!r.ok) logError('المزامنة', r.why);
  /* ولا يُعاد الرسمُ على يدٍ تكتب: الخبرُ يصل بالتنبيه، والشاشةُ
     تُحدَّث عند أوّل انتقالٍ طبيعيّ. */
  if (!typing()) hooks.render();
  if (!quiet) toast(r.ok ? (r.merged ? 'زُومن تقدّمك' : 'رُفع تقدّمك')
    : 'تعذّرت المزامنة: ' + r.why);
}
