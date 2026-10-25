/* شاشة «أين أنت من A1».

   تعرض ثلاثة أشياء، والثالث أهمّها: ما أثبتَّه، وما بقي عليك، وما
   **لا يغطّيه البرنامج أصلاً**. إخفاء الأخير يجعل المتعلّم يظنّ أنّه
   أتمّ A1 وهو لم يتمّ نصفه. */
import {cefrReport, PASS} from '../engine/cefr.js';
import {card, ar, esc, count} from './ui.js';

const TONE = {proven: 'var(--green)', weak: 'var(--amber)', untested: 'var(--ind2)', locked: 'var(--faint)'};
const MARK = {proven: '✓', weak: '!', untested: '•', locked: '🔒'};

export function cefrView() {
  const r = cefrReport();
  const pc = Math.round(r.proven / r.total * 100);

  /* «٣ / ٩» بشرطة مفصولة تنعكس في السياق العربي فتُقرأ ٩ من ٣. */
  const label = r.state === 'all' ? 'أتممتَ أساسيات A1 في هذا البرنامج'
    : r.state === 'none' ? 'لم تُثبت قدرةً بعد'
    : 'أثبتَّ ' + ar(r.proven) + ' من ' + ar(r.total);

  return `<div class="card" style="text-align:center;padding-top:22px">
      <div class="dsp" style="font-size:48px;line-height:1.1;color:${pc >= 70 ? 'var(--green)' : 'var(--ind2)'}">
        ${ar(r.proven)}<span style="font-size:22px;color:var(--mute)"> من ${ar(r.total)}</span></div>
      <p style="font-weight:800;margin-top:2px">${esc(label)}</p>
      <p class="muted" style="margin-top:6px">القدرة تُحتسب مُثبَتة إذا أتممتَ دروسها
        ونلتَ ${ar(PASS)}٪ فأكثر في اختبارها.</p>
    </div>

    ${card('القدرات التسع', r.rows.map(row).join(''))}

    ${r.gaps.length
      ? card('ما لا يغطّيه هذا البرنامج من A1',
        `<p class="muted">البرنامج يغطّي <b>${ar(r.coverage)}٪</b> من قدرات A1 الكاملة.
           وهذه بقيّتها، نذكرها لك صراحةً حتى تعرف أين تقف:</p>`
        + r.gaps.map(g => `<div style="display:flex;gap:8px;margin-top:8px">
            <span style="color:var(--faint)">○</span>
            <span style="flex:1"><b style="font-size:13.5px">${esc(g.t)}</b>
              <span class="muted en" dir="ltr" style="display:block;font-size:11.5px;text-align:left">${esc(g.why)}</span></span>
          </div>`).join('')
        + `<p class="muted" style="margin-top:10px;font-size:11.5px">ولذلك نقول «أساسيات A1»
            ولا نقول «A1 كامل».</p>`)
      /* اكتمل A1، فينتقل إعلان الحدّ إلى السلّم: لا يختفي لمجرّد تمام مستوى. */
      : card('حدّ هذا البرنامج',
        `<p class="muted">البرنامج يغطّي <b>A1 كاملاً</b> — كل قدراته الثلاث عشرة.</p>
         <p class="muted" style="margin-top:6px">ولا يغطّي شيئاً ممّا فوقه: <b>A2</b> و<b>B1</b>
           و<b>B2</b> و<b>C1</b> و<b>C2</b>. فالإطار الأوروبي ستّة مستويات، وهذا أوّلها.</p>
         <p class="muted" style="margin-top:6px;font-size:11.5px">ومن أتمّه يستطيع أن يعرّف بنفسه
           ويسأل ويطلب ويصف يومه — ولا يستطيع بعدُ أن يتكلّم عن الماضي ولا المستقبل.</p>`)}

    <div class="row"><button class="btn" onclick='go("roadmap")'>خريطة المنهج كاملة</button><button class="btn ghost" onclick="goHome()">رجوع</button></div>`;
}

function row(c) {
  const col = TONE[c.level];
  return `<div style="display:flex;gap:9px;margin-top:11px;align-items:flex-start">
      <span style="color:${col};font-weight:800;min-width:18px">${MARK[c.level]}</span>
      <span style="flex:1;min-width:0">
        <b style="font-size:13.5px;color:${c.level === 'proven' ? 'var(--green)' : 'inherit'}">${esc(c.t)}</b>
        <span class="muted" style="display:block;font-size:11.5px">${esc(c.skill)}${
          c.sc !== null && c.sc !== undefined ? ' · نتيجتك ' + ar(c.sc) + '٪' : ''}</span>
        ${c.why ? `<span class="muted" style="display:block;font-size:11.5px;color:${col}">${esc(c.why)}</span>` : ''}
      </span></div>`;
}
