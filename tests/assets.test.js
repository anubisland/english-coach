/* يتحقق أن ملفات الأيقونة والتثبيت موجودة وسليمة فعلاً، لا مذكورة فقط.
   التشغيل:  node tests/assets.test.js  */
const fs = require('fs'), path = require('path');
const R = p => fs.readFileSync(path.join(__dirname, '..', p));
let pass = 0, fail = 0;
const check = (label, fn) => {
  try { fn(); pass++; console.log('  \u2713 ' + label) }
  catch (e) { fail++; console.log('  \u2717 ' + label + '\n      ' + e.message) }
};

const html = R('index.html').toString();
const man = JSON.parse(R('manifest.webmanifest').toString());

console.log('— ملفات الأيقونة —');

check('كل أيقونة في manifest موجودة وبالمقاس المعلن', () => {
  man.icons.forEach(ic => {
    const b = R(ic.src);
    if (b.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error(ic.src + ' ليس PNG');
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    const [dw, dh] = ic.sizes.split('x').map(Number);
    if (w !== dw || h !== dh) throw new Error(ic.src + ': المقاس الحقيقي ' + w + '×' + h + ' والمعلن ' + ic.sizes);
  });
});

check('manifest يحوي أيقونة مقنَّعة للأندرويد', () => {
  if (!man.icons.some(i => i.purpose === 'maskable')) throw new Error('لا أيقونة purpose=maskable');
});

check('كل ما تشير إليه الصفحة موجود على القرص', () => {
  const refs = [...html.matchAll(/(?:href|src)="((?!http|\.\/|#)[^"]+\.(?:png|svg|webmanifest|css|js))"/g)].map(m => m[1]);
  if (!refs.length) throw new Error('لم تُقرأ أي مراجع');
  refs.forEach(r => { try { R(r) } catch (e) { throw new Error('مرجع مفقود: ' + r) } });
});

check('الصفحة تربط الأيقونة والmanifest وapple-touch', () => {
  [['rel="icon"', 'أيقونة'], ['rel="apple-touch-icon"', 'أيقونة iOS'], ['rel="manifest"', 'manifest'], ['name="theme-color"', 'لون الشريط']]
    .forEach(([needle, label]) => { if (!html.includes(needle)) throw new Error('ناقص: ' + label) });
});

check('ملف SVG سليم ولا يعتمد على خط مثبَّت', () => {
  const svg = R('icon.svg').toString();
  if (!svg.includes('<svg')) throw new Error('ليس SVG');
  if (/<text|font-family/.test(svg)) throw new Error('يعتمد على خط قد لا يكون مثبَّتاً');
  if (!svg.includes('viewBox="0 0 512 512"')) throw new Error('viewBox غير متوقع');
});

check('ألوان manifest تطابق ألوان التطبيق', () => {
  const tokens = R('styles/tokens.css').toString();
  if (!tokens.includes(man.theme_color.replace('#', '').toUpperCase()) && !tokens.includes(man.theme_color))
    throw new Error('theme_color ' + man.theme_color + ' ليس من ألوان النظام');
});

console.log('— هيكل الصفحة —');

const css = R('styles/app.css').toString();

check('الصفحة لا تتمرّر أفقياً', () => {
  if (!/html\{[^}]*overflow-x:\s*hidden/.test(css)) throw new Error('html بلا overflow-x:hidden');
  if (!/body\{[^}]*overflow-x:\s*hidden/.test(css)) throw new Error('body بلا overflow-x:hidden');
});

check('الارتداد المطاطي مقفل', () => {
  if (!/overscroll-behavior:\s*none/.test(css)) throw new Error('لا overscroll-behavior على الصفحة');
  if (!/overscroll-behavior-x:\s*contain/.test(css)) throw new Error('الأشرطة الأفقية تجرّ الصفحة معها');
});

check('الشريط العلوي ثابت ويحمل هوية التطبيق', () => {
  if (!/header\{[^}]*position:\s*fixed/.test(css)) throw new Error('الشريط ليس ثابتاً');
  if (!html.includes('مدرب الإنجليزية</h1>')) throw new Error('لا اسم للتطبيق في الشريط');
  if (!/<header>[\s\S]*icon\.svg[\s\S]*<\/header>/.test(html)) throw new Error('لا أيقونة في الشريط');
});

check('شريط التنقل ثابت أسفل الشاشة', () => {
  if (!/nav\{[^}]*position:\s*fixed/.test(css)) throw new Error('شريط التنقل ليس ثابتاً');
});

check('المحتوى لا يختفي تحت الشريطين', () => {
  if (!/body\{[^}]*padding-top:/.test(css)) throw new Error('لا مساحة للشريط العلوي');
  if (!/body\{[^}]*padding-bottom:/.test(css)) throw new Error('لا مساحة لشريط التنقل');
  if (!/safe-area-inset-top/.test(css)) throw new Error('لا مراعاة لنتوء الشاشة');
});

check('عنوان الشاشة داخل المحتوى لا في الشريط', () => {
  if (!html.includes('class="screenTitle"')) throw new Error('لا عنوان شاشة');
  if (!html.includes('id="hTitle"') || !html.includes('id="hSub"')) throw new Error('عناصر العنوان مفقودة');
});

check('الواجهة متمركزة ومحدودة العرض على الشاشات العريضة', () => {
  if (!/\.wrap\{[^}]*max-width/.test(css)) throw new Error('المحتوى بلا حدّ عرض');
  if (!/nav\{[^}]*max-width/.test(css)) throw new Error('شريط التنقل يمتد بلا حدّ');
  if (!/header\{[^}]*max-width/.test(css)) throw new Error('الشريط العلوي يمتد بلا حدّ');
});

console.log('\n' + (fail === 0 ? '\u2713' : '\u2717') + ' نجح ' + pass + ' واخفق ' + fail);
process.exit(fail === 0 ? 0 : 1);
