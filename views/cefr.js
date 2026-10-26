/* شاشة «أين أنت من الإطار الأوروبي».

   تعرض ثلاثة أشياء، والثالث أهمّها: ما أثبتَّه، وما بقي عليك، وما
   **لا يغطّيه البرنامج أصلاً**. إخفاء الأخير يجعل المتعلّم يظنّ أنّه
   أتمّ المستوى وهو لم يتمّ نصفه.

   وصارت تعرض كل مستوى بُني منه شيء، لا A1 وحده. */
import {cefrReport, levelsReport, currentLevel, PASS} from '../engine/cefr.js';
import {card, ar, esc} from './ui.js';

const TONE = {proven:'var(--green)', weak:'var(--amber)', untested:'var(--ind2)', locked:'var(--faint)'};
const MARK = {proven:'✓', weak:'!', untested:'•', locked:'🔒'};

export function cefrView() {
  const here = currentLevel();
  const r = cefrReport(here);
  const pc = r.total ? Math.round(r.proven / r.total * 100) : 0;

  /* «٣ / ٩» بشرطة مفصولة تنعكس في السياق العربي فتُقرأ ٩ من ٣. */
  const label = r.state === 'all' ? 'أتممتَ ' + r.id + ' في هذا البرنامج'
    : r.state === 'none' ? 'لم تُثبت قدرةً بعد'
    : 'أثبتَّ ' + ar(r.proven) + ' من ' + ar(r.total);

  return `<div class="card" style="text-align:center;padding-top:22px">
      <span class="muted" style="font-size:12px">مستواك الحالي في البرنامج</span>
      <div class="dsp en" style="font-size:34px;line-height:1.1;margin-top:2px">${esc(r.id)}</div>
      <div class="dsp" style="font-size:40px;line-height:1.15;color:${pc >= 70 ? 'var(--green)' : 'var(--ind2)'}">
        ${ar(r.proven)}<span style="font-size:20px;color:var(--mute)"> من ${ar(r.total)}</span></div>
      <p style="font-weight:800;margin-top:2px">${esc(label)}</p>
      <p class="muted" style="margin-top:6px">القدرة تُحتسب مُثبَتة إذا أتممتَ دروسها
        ونلتَ ${ar(PASS)}٪ فأكثر في اختبارها.</p>
    </div>

    ${card('قدرات ' + r.id, r.rows.length ? r.rows.map(row).join('')
      : '<p class="muted">لم يُبنَ من هذا المستوى شيء بعد.</p>')}

    ${card('أين أنت من السلّم', levelsReport().map(levelRow).join('')
      + `<p class="muted" style="margin-top:10px;font-size:11.5px">الإطار الأوروبي ستّة مستويات،
          والبرنامج يبني منها ما تراه هنا. وما لم يُبنَ يُعلَن ولا يُخفى.</p>`)}

    ${gapsCard(r)}

    <div class="row"><button class="btn" onclick='go("roadmap")'>خريطة المنهج كاملة</button>
      <button class="btn ghost" onclick="goHome()">رجوع</button></div>`;
}

/* إعلان الحدّ لا يختفي بتمام مستوى، بل ينتقل إلى ما فوقه. */
function gapsCard(r) {
  if (r.gaps.length)
    return card('ما لا يغطّيه البرنامج من ' + r.id,
      `<p class="muted">البرنامج يغطّي <b>${ar(r.coverage)}٪</b> من قدرات ${esc(r.id)} الكاملة.
         وهذه بقيّتها، نذكرها لك صراحةً حتى تعرف أين تقف:</p>`
      + r.gaps.map(g => `<div style="display:flex;gap:8px;margin-top:8px">
          <span style="color:var(--faint)">○</span>
          <span style="flex:1"><b style="font-size:13.5px">${esc(g.t)}</b>
            <span class="muted en" dir="ltr" style="display:block;font-size:11.5px;text-align:left">${esc(g.why)}</span></span>
        </div>`).join('')
      + `<p class="muted" style="margin-top:10px;font-size:11.5px">ولذلك نقول «أساسيات ${esc(r.id)}»
          ولا نقول «${esc(r.id)} كامل».</p>`);

  const rest = levelsReport().filter(l => !l.built).map(l => l.id);
  return card('حدّ هذا البرنامج',
    `<p class="muted">البرنامج يغطّي <b>${esc(r.id)} كاملاً</b> — كل قدراته ${ar(r.total)}.</p>`
    + (rest.length ? `<p class="muted" style="margin-top:6px">ولا يغطّي بعدُ:
        ${rest.map(x => '<b>' + esc(x) + '</b>').join(' و')}. فالإطار ستّة مستويات.</p>` : '')
    + `<p class="muted" style="margin-top:6px;font-size:11.5px">ومن أتمّ ${esc(r.id)} يستطيع أن يعرّف
        بنفسه ويسأل ويطلب ويصف يومه وما يحدث الآن.</p>`);
}

function levelRow(l) {
  const col = l.built && !l.gaps ? 'var(--green)' : l.built ? 'var(--ind2)' : 'var(--faint)';
  const mark = l.built && !l.gaps ? '✓' : l.built ? '●' : '○';
  return `<div style="display:flex;gap:9px;margin-top:9px;align-items:baseline">
      <span style="color:${col};font-weight:800;min-width:16px">${mark}</span>
      <span style="flex:1;min-width:0">
        <b class="en" style="font-size:14px">${esc(l.id)}</b>
        <span style="font-size:13px"> — ${esc(l.t)}</span>
        <span class="muted" style="display:block;font-size:11.5px">${
          l.built ? 'بُني ' + ar(l.built) + ' من قدراته · أثبتَّ ' + ar(l.proven)
            : 'لم يُبنَ بعد'}</span>
      </span></div>`;
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
