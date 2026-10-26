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

check('الصفحة لا تتمرّر أفقياً ولا يثقل تمريرها رأسياً', () => {
  if (!/body\{[^}]*overflow-x:\s*clip/.test(css)) throw new Error('body بلا overflow-x:clip');
  /* hidden على html يجعله حاوية تمرير تنافس body، فيثقل التمرير على الهاتف
     أو يتوقف. clip على body يمنع الفيض بلا إنشاء حاوية. */
  const h = /^html\{([^}]*)\}/m.exec(css);
  if (h && /overflow/.test(h[1])) throw new Error('html يحمل overflow فيصير حاوية تمرير');
});

check('الارتداد مضبوط بلا تعطيل التمرير', () => {
  if (!/overscroll-behavior-y:\s*contain/.test(css)) throw new Error('لا ضبط للارتداد الرأسي');
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
  if (!/nav \.inner\{[^}]*max-width/.test(css)) throw new Error('شريط التنقل يمتد بلا حدّ');
  if (!/header \.inner\{[^}]*max-width/.test(css)) throw new Error('الشريط العلوي يمتد بلا حدّ');
});

console.log('— التجاوب مع المقاسات —');

check('ثلاث نقاط توقّف: هاتف وتابلت وكمبيوتر', () => {
  if (!/@media \(min-width:700px\)/.test(css)) throw new Error('لا نقطة توقّف للتابلت');
  if (!/@media \(min-width:1024px\)/.test(css)) throw new Error('لا نقطة توقّف للكمبيوتر');
});

check('شريط التنقل داخل الترويسة في الـ DOM', () => {
  if (!/<header>[\s\S]*<nav id="nav">[\s\S]*<\/header>/.test(html))
    throw new Error('شريط التنقل خارج الترويسة، فلا يمكن نقله بالأنماط وحدها');
});

check('على الكمبيوتر يترك الشريط أسفل الشاشة ويعود إلى الترويسة', () => {
  const desktop = css.slice(css.indexOf('@media (min-width:1024px)'));
  if (!/nav\{[^}]*position:\s*static/.test(desktop)) throw new Error('شريط التنقل ما زال مثبتاً أسفل الشاشة');
  if (!/\.tab\{[^}]*flex-direction:\s*row/.test(desktop)) throw new Error('التبويبات ما زالت عمودية');
});

check('عرض المحتوى يتدرّج مع المقاس', () => {
  const base = /\.wrap\{[^}]*max-width:\s*(\d+)px/.exec(css);
  const tablet = /@media \(min-width:700px\)[\s\S]*?\.wrap\{[^}]*max-width:\s*(\d+)px/.exec(css);
  const desktop = /@media \(min-width:1024px\)[\s\S]*?\.wrap\{[^}]*max-width:\s*(\d+)px/.exec(css);
  if (!base || !tablet || !desktop) throw new Error('عرض المحتوى غير معرَّف لكل مقاس');
  const [b, t, d] = [base[1], tablet[1], desktop[1]].map(Number);
  if (!(b < t && t < d)) throw new Error('العرض لا يتدرّج: ' + b + ' / ' + t + ' / ' + d);
});

check('عمود القراءة محدود حتى على الشاشة العريضة جداً', () => {
  if (!/@media \(min-width:1400px\)/.test(css)) throw new Error('لا حدّ للشاشة العريضة جداً');
  const wide = /@media \(min-width:1400px\)[\s\S]*?max-width:\s*(\d+)px/.exec(css);
  if (!wide || Number(wide[1]) > 900) throw new Error('السطر يطول أكثر مما يُقرأ بارتياح');
});

console.log('— هوية الشريط —');

check('الشريط متدرّج متناظر من الطرفين إلى الوسط', () => {
  const m = /header\{[\s\S]*?linear-gradient\(90deg([\s\S]*?)\);/.exec(css);
  if (!m) throw new Error('لا تدرّج أفقي في الشريط');
  const stops = m[1].match(/#[0-9A-Fa-f]{6}/g) || [];
  if (stops.length < 5) throw new Error('التدرّج ليس متناظراً: ' + stops.length + ' محطات');
  if (stops[0].toUpperCase() !== stops[stops.length - 1].toUpperCase())
    throw new Error('الطرفان مختلفان فالتدرّج غير متناظر');
});

/* ظهر الاسم مرة على خلفية بيضاء لأن ملف المتغيّرات لم يصل.
   لا يصحّ أن تتوقف قراءة اسم البرنامج على تحميل ملف ثانٍ. */
check('الشريط لا يعتمد على متغيّرات CSS', () => {
  /* التعليق ليس إعلاناً: شرحُ «لماذا لا نستعمل المتغيّر هنا» يحتاج
     أن يذكر اسمه، فكان يُقرأ مخالفةً. فتُحذف التعليقات قبل الفحص. */
  const bare = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
  const h = bare(/header\{([\s\S]*?)\}/.exec(css)[1]);
  if (/var\(/.test(h)) throw new Error('خلفية الشريط تعتمد على متغيّر قد لا يصل');
  const h1 = bare(/header h1\{([\s\S]*?)\}/.exec(css)[1]);
  if (/var\(/.test(h1)) throw new Error('لون الاسم يعتمد على متغيّر قد لا يصل');
  if (!/color:\s*#FFFFFF/i.test(h1)) throw new Error('الاسم ليس أبيض');
});

check('حواف الشريط دائرية من الأسفل', () => {
  const h = /header\{([\s\S]*?)\}/.exec(css)[1];
  if (!/border-radius:\s*0 0 \d+px \d+px/.test(h)) throw new Error('لا حواف دائرية سفلية');
});

check('العلم مرسوم لا إيموجي', () => {
  /* ويندوز وأندرويد لا يرسمان أعلام الإيموجي فتظهر حرفين GB. */
  if (/🇬🇧/.test(html)) throw new Error('العلم إيموجي، وسيظهر GB على ويندوز وأندرويد');
  if (!/<svg class="flag"/.test(html)) throw new Error('لا علم مرسوم');
  if (!/aria-label="الإنجليزية"/.test(html)) throw new Error('العلم بلا وصف للقارئ الصوتي');
});

check('اسم التطبيق بخط Cairo وأكبر من عنوان الشاشة', () => {
  const h1m = /header h1\{([\s\S]*?)\}/.exec(css);
  if (!h1m) throw new Error('لا قاعدة لاسم التطبيق');
  const h1 = h1m[1];
  if (!/Cairo/.test(h1)) throw new Error('ليس بخط Cairo');
  const size = Number(/font:\s*\d+\s+(\d+)px/.exec(h1)[1]);
  const screen = Number(/\.screenTitle b\{[^}]*?(\d+)px/.exec(css)[1]);
  if (!(size > screen)) throw new Error('الاسم ' + size + 'px وعنوان الشاشة ' + screen + 'px');
});

check('خط Cairo محمَّل بالوزن العريض', () => {
  if (!/family=Cairo:wght@[\d;]*800/.test(html)) throw new Error('Cairo غير محمَّل بالوزن 800');
});

check('الرئيسية لا تكرر اسم البرنامج', () => {
  const app = R('app.js').toString();
  if (/home:\['مدرب الإنجليزية'/.test(app)) throw new Error('الاسم مكرر في عنوان الشاشة');
});

/* .bar هو صنف شريط التقدّم. استُعمل مرة غلافاً للترويسة فورث خلفيته
   الرمادية وحوافه الدائرية، واختفى اسم البرنامج عليها. */
check('غلاف الشريطين لا يصطدم بصنف شريط التقدّم', () => {
  if (/class="bar"/.test(html)) throw new Error('الترويسة تستخدم .bar وهو صنف شريط التقدّم');
  const app = R('app.js').toString();
  if (/class=\\"bar\\"/.test(app)) throw new Error('شريط التنقل يستخدم .bar');
  if (!/class="inner"/.test(html)) throw new Error('لا غلاف باسم مستقل');
  if (!/header \.inner\{/.test(css)) throw new Error('لا قاعدة لغلاف الترويسة');
});


/* بلا عامل خدمة يصنع كروم «اختصاراً» لا تطبيقاً، والاختصارات لا يوحّدها،
   فتتكاثر الأيقونات على سطح المكتب مع كل ضغطة على «تثبيت». */
check('عامل الخدمة موجود ومُسجَّل في الصفحة', () => {
  if (!fs.existsSync('sw.js')) throw new Error('لا ملفّ sw.js');
  const sw = fs.readFileSync('sw.js', 'utf8');
  ['install', 'activate', 'fetch'].forEach(ev => {
    if (!new RegExp("addEventListener\\('" + ev + "'").test(sw))
      throw new Error('عامل الخدمة بلا مستمع ' + ev);
  });
  const html = fs.readFileSync('index.html', 'utf8');
  if (!/serviceWorker/.test(html)) throw new Error('الصفحة لا تُسجّل عامل الخدمة');
  if (!/register\(['"]sw\.js['"]\)/.test(html)) throw new Error('التسجيل لا يشير إلى sw.js');
  /* فشل التسجيل يجب ألّا يُسقط التطبيق. */
  if (!/\.catch\(/.test(html.slice(html.indexOf('serviceWorker'))))
    throw new Error('تسجيل بلا catch: فشله سيُظهر خطأً للمستخدم');
});

/* الشبكة أولاً: العكس يُجمّد المتعلّم على نسخة قديمة بلا حيلة. */
check('عامل الخدمة يُقدّم الشبكة على المخزَّن', () => {
  const sw = fs.readFileSync('sw.js', 'utf8');
  const fetchAt = sw.indexOf("addEventListener('fetch'");
  const body = sw.slice(fetchAt);
  const net = body.indexOf('fetch(req)');
  const cache = body.indexOf('caches.match');
  if (net < 0 || cache < 0) throw new Error('لا شبكة ولا مخزَّن في معالج الطلبات');
  if (net > cache) throw new Error('المخزَّن قبل الشبكة — سيُجمّد التطبيق على نسخة قديمة');
  if (!/skipWaiting/.test(sw)) throw new Error('بلا skipWaiting: التحديث ينتظر إغلاق كل التبويبات');
  if (!/clients\.claim/.test(sw)) throw new Error('بلا clients.claim');
  if (!/caches\.delete/.test(sw)) throw new Error('لا يُنظّف المخازن القديمة');
});

/* الهوية الثابتة تمنع كروم من عدّ التطبيق تطبيقاً جديداً بعد كل تغيير. */
check('manifest فيه هوية ثابتة ونطاق متّسق', () => {
  const m = JSON.parse(fs.readFileSync('manifest.webmanifest', 'utf8'));
  if (!m.id) throw new Error('لا id في manifest — الهوية غير مثبّتة');
  if (!m.id.startsWith('/')) throw new Error('id يجب أن يكون مساراً ثابتاً من أصل الموقع');
  if (!m.start_url || !m.scope) throw new Error('start_url أو scope ناقص');
  if (!m.display) throw new Error('لا display');
  ['name', 'icons', 'background_color', 'theme_color'].forEach(k => {
    if (!m[k]) throw new Error('ناقص في manifest: ' + k);
  });
  const big = m.icons.filter(i => parseInt(i.sizes) >= 192);
  if (big.length < 2) throw new Error('يحتاج كروم أيقونتين ١٩٢ فأكبر على الأقل');
});

console.log('\n' + (fail === 0 ? '\u2713' : '\u2717') + ' نجح ' + pass + ' واخفق ' + fail);
process.exit(fail === 0 ? 0 : 1);
