/* تَعرَّف على الكلمات قبل أن تُختبَر فيها.

   وكانت المحطّةُ تَفتح على اختبارٍ في عشرين كلمةً لم تُعرَض عليه
   قطّ، فيُصيب منها ما يُصيبه التخمين — وقد وقع هذا لصاحب البرنامج
   فجاءت نتيجتُه سبعةَ عشرَ في المئة. وبطاقةُ المحطّة تَعِده بأن
   «يتعلّمها قبل أن يراها في جملة»، فتُخلف.

   والعرضُ بالحقول لا مبعثراً: الكلمةُ تَثبت بجوار أخواتها. */
import {S, save} from '../engine/state.js';
import {hooks} from '../engine/bus.js';
import {topicsOf} from '../content/words.js';
import {UNITS} from '../content/lessons.js';
import {ar, esc, card} from './ui.js';

export function learnWords(u){ S.peek = Number(u) || null; save(); hooks.render() }
export function closeLearn(){ S.peek = null; save(); hooks.render() }

export function wordsLearnView(){
  const u = S.peek;
  const groups = topicsOf(u);
  const title = (UNITS.find(x => x.n === u) || {}).t || '';
  const total = groups.reduce((n, g) => n + g.list.length, 0);

  return card(`كلماتُ الوحدة ${ar(u)}`,
    `<p class="muted">${esc(title)} — ${ar(total)} كلمةً في ${ar(groups.length)} ${
      groups.length === 2 ? 'مجموعتين' : groups.length <= 10 ? 'مجموعات' : 'مجموعة'}.
      اقرأها الآن، ثمّ أسألك في عشرين منها.</p>`)
    + groups.map(g => `<div class="card">
        <h2 style="font-size:15px">${esc(g.t)}</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px 14px;margin-top:8px">${
          g.list.map(([w, m]) => `<span style="display:flex;gap:8px;align-items:baseline;
            padding:5px 0;border-bottom:1px solid var(--line)">
            <b class="en" style="font-size:14.5px;min-width:0;flex:1">${esc(w)}</b>
            <span class="muted" style="font-size:13px;flex:1;min-width:0">${esc(m)}</span>
          </span>`).join('')}</div></div>`).join('')
    + `<div class="card" style="position:sticky;bottom:12px">
         <div class="row" style="justify-content:flex-start">
           <button class="btn" onclick="closeLearn();launch('words',${u})">قرأتُها — اختبرني</button>
           <button class="btn ghost" onclick="closeLearn()">لاحقاً</button>
         </div></div>`;
}
