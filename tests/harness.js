/* بيئة متصفح مبسّطة لتشغيل وحدات التطبيق خارج المتصفح، بلا أي مكتبة.

   بعد التقسيم صار التطبيق وحدات ES، فلا يمكن تشغيله في vm لكل اختبار.
   بدلاً من ذلك نستورده مرة واحدة، ونجعل كل ما يلمس المتصفح (التخزين،
   العناصر، التعرّف على الصوت) قابلاً للتبديل بين اختبار وآخر، ثم نعيد
   بناء الحالة بـ bootState() في كل مرة.

   opts.throwOnRead / throwOnWrite — تخزين محجوب أو ممتلئ
   opts.recognition 'missing' | 'throws' | 'works'
   opts.synthesisThrows — نطق غير متاح
*/
const path = require('path');
const { pathToFileURL } = require('url');

/* الحالة الحيّة للاختبار الجاري، تُبدَّل قبل كل تشغيل */
const handlers = {};   // تُسجَّل مرة عند استيراد app.js، فلا تُصفَّر بين الاختبارات
let cur = { els: {}, store: {}, opts: {}, logged: [], started: [], utterances: [] };

function freshEls() {
  const els = {};
  ['app', 'nav', 'toast', 'cres', 'ctxt', 'ctxt2', 'chatTxt', 'chatPr', 'themeBtn', 'hTitle', 'hSub']
    .forEach(id => { els[id] = { id, innerHTML: '', textContent: '', style: {}, value: '' } });
  return els;
}

/* عناصر عامة ثابتة المرجع، ومحتواها يتبدّل — فالوحدات تستوردها مرة واحدة */
const el = {
  documentElement: { attrs: {}, setAttribute(k, v) { this.attrs[k] = v } },
  getElementById: id => cur.els[id] || null,
  querySelectorAll: () => []
};
global.document = el;
global.localStorage = {
  getItem(k) { if (cur.opts.throwOnRead) throw new Error('storage blocked'); return k in cur.store ? cur.store[k] : null },
  setItem(k, v) { if (cur.opts.throwOnWrite) throw new Error('quota exceeded'); cur.store[k] = String(v) },
  removeItem(k) { delete cur.store[k] }
};
global.window = {
  scrollTo() {},
  addEventListener(t, f) { (handlers[t] = handlers[t] || []).push(f) },
  get SpeechRecognition() {
    if (cur.opts.recognition === 'throws')
      return function () { this.start = () => { cur.started.push(1); throw new Error('InvalidStateError') } };
    if (cur.opts.recognition === 'works')
      return function () { this.start = () => { cur.started.push(1) } };
    return undefined;
  }
};
global.speechSynthesis = {
  cancel() { if (cur.opts.synthesisThrows) throw new Error('synthesis unavailable') },
  speak(u) { cur.utterances.push(u) }
};
global.SpeechSynthesisUtterance = function () {};
global.console = Object.assign(Object.create(console), {
  error: (...a) => cur.logged.push(a.map(x => (x && x.message) ? x.message : String(x)).join(' '))
});

let app = null;
async function load() {
  if (app) return app;
  app = await import(pathToFileURL(path.join(__dirname, '..', 'app.js')).href);
  return app;
}

const results = { pass: 0, fail: 0 };

/* نبني كائناً يُقرأ منه أي اسم كما لو كان متغيّراً عاماً في التطبيق،
   فتبقى الاختبارات مكتوبة بأسماء الكود نفسها. */
function makeScope(mod) {
  const bag = Object.assign({}, mod, global.window);
  return new Proxy(bag, {
    has: () => true,
    get: (t, k) => (k === 'S' ? mod.S : (k in t ? t[k] : undefined))
  });
}

async function run(label, stored, steps, opts) {
  const mod = await load();
  cur = { els: freshEls(), store: Object.assign({}, stored), opts: opts || {}, logged: [], started: [], utterances: [] };
  const ctx = Object.assign({}, global.window, {
    get _els() { return cur.els }, get _store() { return cur.store },
    get _logged() { return cur.logged }, get _started() { return cur.started },
    get _handlers() { return handlers }, get _utterances() { return cur.utterances }
  });
  const scope = makeScope(mod);
  const ev = expr => new Function('__s', 'with(__s){return (' + expr + ')}')(scope);

  try { mod.bootState(); mod.render() }
  catch (e) { results.fail++; console.log('  ✗ ' + label + '\n      انهار عند الإقلاع: ' + e.message); return }
  try { steps(ctx, ev); results.pass++; console.log('  ✓ ' + label) }
  catch (e) { results.fail++; console.log('  ✗ ' + label + '\n      ' + e.constructor.name + ': ' + e.message) }
}

function report() {
  console.log('\n' + (results.fail === 0 ? '✓' : '✗') + ' نجح ' + results.pass + ' واخفق ' + results.fail);
  process.exit(results.fail === 0 ? 0 : 1);
}

module.exports = { run, report, load };
