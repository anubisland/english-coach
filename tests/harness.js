/* بيئة متصفح مبسّطة لتشغيل index.html خارج المتصفح، بلا أي مكتبة خارجية.
   تستخرج محتوى <script> من الملف وتشغّله في سياق معزول لكل اختبار.

   كل مسارات الخطأ تحتاج حقن عطل، فالمتصفح الطبيعي لا ينتجها عند الطلب:
   opts.throwOnRead / throwOnWrite  — تخزين محجوب أو ممتلئ
   opts.recognition                 — 'missing' | 'throws' | 'works'
   opts.synthesisThrows             — نطق غير متاح
*/
const fs = require('fs'), path = require('path'), vm = require('vm');

const FILE = path.join(__dirname, '..', 'index.html');

function appSource() {
  const html = fs.readFileSync(FILE, 'utf8');
  const open = html.indexOf('<script>'), close = html.indexOf('</script>');
  if (open < 0 || close < 0) throw new Error('لم يُعثر على وسم <script> في index.html');
  if (html.indexOf('<script>', open + 1) !== -1)
    throw new Error('أكثر من وسم <script> في index.html — حدّث appSource');
  return html.slice(open + '<script>'.length, close);
}

function makeContext(stored, opts) {
  opts = opts || {};
  const els = {};
  ['app', 'nav', 'toast', 'cres', 'ctxt', 'ctxt2', 'chatTxt', 'chatPr'].forEach(id => {
    els[id] = { id, innerHTML: '', textContent: '', style: {}, value: '' };
  });

  const store = Object.assign({}, stored);
  const localStorage = {
    getItem: k => { if (opts.throwOnRead) throw new Error('storage blocked'); return k in store ? store[k] : null },
    setItem: (k, v) => { if (opts.throwOnWrite) throw new Error('quota exceeded'); store[k] = String(v) },
    removeItem: k => { delete store[k] }
  };

  /* التعرّف على الصوت: غائب، أو يرمي عند البدء (ضغط مزدوج)، أو يعمل */
  const started = [];
  let Recognition;
  if (opts.recognition === 'throws') {
    Recognition = function () { this.start = () => { started.push(1); throw new Error('InvalidStateError') } };
  } else if (opts.recognition === 'works') {
    Recognition = function () { this.start = () => { started.push(1) } };
  }

  const logged = [];
  const quietConsole = Object.assign({}, console, {
    error: (...a) => logged.push(a.map(x => (x && x.message) ? x.message : String(x)).join(' '))
  });

  const handlers = {};
  const utterances = [];

  const ctx = vm.createContext({
    console: quietConsole, setTimeout, clearTimeout,
    Math, JSON, Object, Array, String, Number, RegExp, Date, Error, Boolean,
    document: { getElementById: id => els[id] || null, querySelectorAll: () => [] },
    localStorage,
    window: {
      scrollTo() {},
      addEventListener: (t, f) => { (handlers[t] = handlers[t] || []).push(f) },
      SpeechRecognition: Recognition
    },
    speechSynthesis: {
      cancel() { if (opts.synthesisThrows) throw new Error('synthesis unavailable') },
      speak(u) { utterances.push(u) }
    },
    SpeechSynthesisUtterance: function () {},
    _els: els, _store: store
  });

  ctx._logged = logged;
  ctx._handlers = handlers;
  ctx._started = started;
  ctx._utterances = utterances;
  return ctx;
}

const results = { pass: 0, fail: 0 };

/* يشغّل التطبيق من الصفر بحالة محفوظة معيّنة، ثم ينفّذ خطوات الاختبار.
   ev('S') تقرأ المتغيرات المعرَّفة بـ let/const، فهي لا تظهر على كائن السياق. */
function run(label, stored, steps, opts) {
  const ctx = makeContext(stored, opts);
  const ev = expr => vm.runInContext(expr, ctx);
  try { vm.runInContext(appSource(), ctx, { filename: 'index.html' }) }
  catch (e) { results.fail++; console.log('  ✗ ' + label + '\n      انهار عند الإقلاع: ' + e.message); return }
  try { steps(ctx, ev); results.pass++; console.log('  ✓ ' + label) }
  catch (e) { results.fail++; console.log('  ✗ ' + label + '\n      ' + e.constructor.name + ': ' + e.message) }
}

function report() {
  console.log('\n' + (results.fail === 0 ? '✓' : '✗') + ' نجح ' + results.pass + ' واخفق ' + results.fail);
  process.exit(results.fail === 0 ? 0 : 1);
}

module.exports = { run, report, appSource };
