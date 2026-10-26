/* يحرس حزمة التطبيق: ما يدخل الـAPK هو قائمةٌ مكتوبة بيد، ومن أضاف
   ملفّاً جديداً إلى الويب ونسي القائمة شحن تطبيقاً ناقصاً — ولا يظهر
   النقص إلا على الهاتف. */
import {readdir, readFile} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ASSETS} from '../scripts/stage-web.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0, fail = 0;

async function run(name, fn) {
  try { await fn(); console.log('  ✓ ' + name); pass++ }
  catch (e) { console.log('  ✗ ' + name + '\n      ' + e.message); fail++ }
}

/* ما لا يُشحن: أدواتٌ وبناءٌ وما يولّده، لا محتوى. */
const NOT_SHIPPED = new Set([
  'tests', 'scripts', 'android', 'android-res', 'www', 'node_modules',
  '.git', '.github', '.claude', '.remember', '.gitignore',
  'package.json', 'package-lock.json', 'capacitor.config.json',
  'README.md', 'ROADMAP.md', 'PROMPT_FOR_CLAUDE_CODE.md',
  'sw.js'   /* عن قصد: الملفّات محليّة داخل التطبيق */
]);

console.log('— حزمة التطبيق —');

await run('كل ملفّ يحتاجه الويب مذكورٌ في قائمة الحزمة', async () => {
  const here = await readdir(ROOT, {withFileTypes: true});
  const missing = here
    .map(d => d.name)
    .filter(n => !n.startsWith('.') && !NOT_SHIPPED.has(n) && !n.endsWith('.apk'))
    .filter(n => !ASSETS.includes(n));
  if (missing.length)
    throw new Error('خارج الحزمة ولم يُستثنَ صراحةً: ' + missing.join('، '));
});

await run('لا نداء شبكةٍ في الكود إلا ما نعلمه', async () => {
  /* الخطوط من جوجل هي الاستثناء الوحيد المعلوم، وهي تتدهور بلطف:
     بلا شبكةٍ يعمل التطبيق ويتغيّر شكل الخطّ وحده. وما جاوزها يكسر
     العملَ دون إنترنت، فلا يمرّ صامتاً. */
  const KNOWN = /fonts\.(googleapis|gstatic)\.com/;
  const files = ['index.html', 'app.js'];
  const dirs = ['engine', 'views', 'content', 'styles'];
  for (const d of dirs)
    for (const f of await readdir(join(ROOT, d)))
      if (/\.(js|css)$/.test(f)) files.push(join(d, f));

  const bad = [];
  for (const f of files) {
    const text = await readFile(join(ROOT, f), 'utf8');
    for (const m of text.matchAll(/https?:\/\/[\w.-]+/g))
      if (!KNOWN.test(m[0]) && !/w3\.org/.test(m[0])) bad.push(f + ': ' + m[0]);
    if (/\bfetch\s*\(|XMLHttpRequest/.test(text)) bad.push(f + ': نداء شبكة');
  }
  if (bad.length) throw new Error(bad.join(' | '));
});

await run('هوية التطبيق ونسخته متّسقتان', async () => {
  const cap = JSON.parse(await readFile(join(ROOT, 'capacitor.config.json'), 'utf8'));
  const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(cap.appId))
    throw new Error('appId غير صالح: ' + cap.appId);
  if (cap.webDir !== 'www') throw new Error('webDir ليس www');
  if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) throw new Error('نسخة غير صالحة');
});

console.log('\n' + (fail ? '✗' : '✓') + ' نجح ' + pass + ' واخفق ' + fail);
process.exit(fail ? 1 : 0);
