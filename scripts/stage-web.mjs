/* يجمع ملفّات التطبيق في www/ ليحزمها Capacitor داخل الـAPK.

   ولا يُنسخ المستودع كلّه: فيه .git و node_modules و android والاختبارات،
   ولا شأن للهاتف بها. فالقائمة صريحة، ومَن أضاف ملفّاً جديداً أضافه هنا —
   ويكشف تخلّفَه فحصُ tests/apk.test.js. */
import {cp, mkdir, rm, writeFile, readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'www');

/* ما يُنسخ كما هو: ملفّات وأدلّة. */
export const ASSETS = [
  'index.html', 'app.js', 'manifest.webmanifest',
  'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png',
  'apple-touch-icon.png', 'favicon-16.png', 'favicon-32.png',
  'content', 'engine', 'views', 'styles'
];

/* sw.js لا يُنسخ: داخل الـAPK الملفّاتُ محليّة أصلاً، وعاملُ الخدمة
   يضيف طبقة تخزينٍ ثانية قد تُقدّم نسخةً قديمة بعد تحديث التطبيق. */

async function main() {
  await rm(OUT, {recursive: true, force: true});
  await mkdir(OUT, {recursive: true});

  const missing = ASSETS.filter(a => !existsSync(join(ROOT, a)));
  if (missing.length) {
    console.error('✗ ملفّات مفقودة: ' + missing.join('، '));
    process.exit(1);
  }
  for (const a of ASSETS) await cp(join(ROOT, a), join(OUT, a), {recursive: true});

  /* تسجيل عامل الخدمة يُنزع من نسخة الهاتف وحدها، ويبقى على الويب. */
  const html = await readFile(join(ROOT, 'index.html'), 'utf8');
  const stripped = html.replace(
    /navigator\.serviceWorker\.register\([^)]*\)[^;]*;/,
    "/* عامل الخدمة لا يُسجَّل داخل التطبيق: الملفّات محليّة. */");
  if (stripped === html) {
    console.error('✗ لم أجد تسجيل عامل الخدمة في index.html');
    process.exit(1);
  }
  await writeFile(join(OUT, 'index.html'), stripped);

  console.log('جُهّز www/ بـ ' + ASSETS.length + ' مدخلاً');
}

/* الاستيراد لا يبني شيئاً: tests/apk.test.js يستورد ASSETS وحدها. */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
