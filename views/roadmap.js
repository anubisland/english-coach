/* شاشة «خريطة المنهج»: السلّم كلّه، وموقعك منه، وما لم يُبنَ بعد. */
import {LEVELS, STAGES, roadmapCounts} from '../content/roadmap.js';
import {cefrReport, levelsReport} from '../engine/cefr.js';
import {card, ar, esc, count} from './ui.js';

const MARK = {done: '✓', doing: '●', next: '→', todo: '○'};
const TONE = {done: 'var(--green)', doing: 'var(--ind2)', next: 'var(--amber)', todo: 'var(--faint)'};

export function roadmapView() {
  const c = roadmapCounts();
  const r = cefrReport();

  return `<div class="card" style="text-align:center;padding-top:20px">
      <span class="muted" style="font-size:12px">خريطة المنهج</span>
      <div class="dsp" style="font-size:40px;line-height:1.15">${ar(c.done)} من ${ar(c.total)}</div>
      <p class="muted" style="margin-top:4px">درساً مبنيّاً من خطّة المنهج كاملة</p>
      <p class="muted" style="margin-top:8px;font-size:12px">${scope()}</p>
    </div>

    ${card('المستويات الستّة', LEVELS.map(l => `
      <div style="display:flex;gap:9px;margin-top:10px;align-items:flex-start">
        <span style="color:${TONE[l.state]};font-weight:800;min-width:16px">${MARK[l.state]}</span>
        <span style="flex:1;min-width:0">
          <b class="en" style="font-size:14px;color:${l.state === 'doing' ? 'var(--ind2)' : 'inherit'}">${esc(l.id)}</b>
          <span style="font-size:13px"> — ${esc(l.t)}</span>
          ${l.state === 'doing' ? `<span class="muted" style="font-size:11.5px"> · جارٍ (${ar(r.coverage)}٪)</span>` : ''}
          <span class="muted" style="display:block;font-size:11.5px">${esc(l.d)}</span>
        </span></div>`).join(''))}

    ${STAGES.filter(s => s.units.length).map(stageCard).join('')}

    ${ahead()}

    <div class="row"><button class="btn ghost" onclick="goHome()">رجوع</button></div>`;
}

/* سطرُ المدى. كان مكتوباً «البرنامج اليوم داخل الأول منها» فبقي
   يقول ذلك بعد أن بُنيت الستّة كلُّها — وهو العيبُ نفسه الذي تكرّر
   في هذا المشروع: حقيقةٌ تُكتب مرّةً ثمّ يتغيّر ما تصفه. فليُشتقّ. */
function scope() {
  const built = LEVELS.filter(l => l.state === 'done').length;
  if (built === LEVELS.length)
    return `الإطار الأوروبي ستّة مستويات، وقد بُنيت كلُّها —
      وما لا يقيسه المحرّك مُعلَنٌ في حدّ كلّ مستوى.`;
  const here = LEVELS.find(l => l.state === 'doing');
  return `الإطار الأوروبي ستّة مستويات، بُني منها ${ar(built)}.`
    + (here ? ` والبرنامج اليوم في <b class="en">${esc(here.id)}</b>.` : '');
}

/* بطاقةُ ما بعدُ. كانت «ما بعد A2» نصّاً ثابتاً يَعِد بـB1 بعد أن
   بُني B1 وما فوقه. فإمّا أن تُعلن ما بقي، وإمّا أن تُعلن الحدّ. */
function ahead() {
  const next = STAGES.find(s => s.state !== 'done');
  if (next) {
    const left = next.units.flatMap(u => u.lessons)
      .filter(l => l.state !== 'done').length;
    return card('ما بعدُ', `<p class="muted">${esc(next.t)} أمامك —
      ${count(left, 'درس', 'دروس')}. ويُبنى درساً درساً ولا يُوعَد به دفعةً واحدة.</p>`);
  }
  const gaps = levelsReport().filter(l => l.gaps).map(l => l.id);
  return card('حدّ البرنامج', `<p class="muted">تمّت الخطة كلُّها:
    ${count(roadmapCounts().total, 'درس', 'دروس')} في ستّة مستويات. وما بقي خارجَها
    مذكورٌ في ${gaps.length ? esc(gaps.join(' و')) : 'حدّ المستويات'} بسببه —
    لا وعداً مؤجَّلاً، بل ما لا يقيسه محرّك الأنماط أصلاً.</p>`);
}

function stageCard(s) {
  const all = s.units.flatMap(u => u.lessons);
  const done = all.filter(l => l.state === 'done').length;
  const label = {done: 'تمّت', next: 'التالية', todo: 'لم تبدأ'}[s.state] || '';

  return card(s.t + ' — ' + ar(done) + ' من ' + ar(all.length),
    `<p class="muted" style="font-size:12px">${esc(label)}</p>`
    + s.units.map(u => `
      <div style="margin-top:11px">
        <b style="font-size:13px">الوحدة ${ar(u.n)}: ${esc(u.t)}</b>
        ${u.lessons.map(l => `
          <div style="display:flex;gap:8px;margin-top:5px;padding-right:6px">
            <span style="color:${TONE[l.state]};min-width:14px">${MARK[l.state]}</span>
            <span class="muted" style="flex:1;font-size:12.5px;${l.state === 'done' ? 'color:var(--ink)' : ''}">
              ${esc(l.id)} — ${esc(l.t)}</span></div>`).join('')}
      </div>`).join(''));
}
