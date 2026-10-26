/* يبني الـAPK من الصفر: يجهّز www/، ويولّد مشروع أندرويد، ويضع فيه
   هوية التطبيق وأيقوناته، ثم يشغّل gradle.

   ومشروع أندرويد لا يُحفظ في المستودع: يولّده Capacitor في كل مرّة،
   وكلُّ ما نخصّه به مكتوبٌ هنا — فلا يضيع تعديلٌ يدويّ لأن أحداً لم
   يعرف أنه كان هناك.

   التوقيع: مفتاحٌ خارج المستودع، وكلماته تُقرأ من ملفّه وقت النداء ولا
   تُمرَّر في سطر الأمر. انظر android-signing في README. */
import {spawnSync} from 'node:child_process';
import {cp, mkdir, readFile, writeFile, rm, readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {homedir} from 'node:os';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ANDROID = join(ROOT, 'android');
const SDK = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT
  || join(homedir(), 'AppData', 'Local', 'Android', 'Sdk');
/* دليل المفاتيح: خارج المستودع دائماً، بصلاحيّات 700. */
const KEYDIR = join(homedir(), '.config', 'english-coach');

const release = process.argv.includes('--release');

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {stdio: 'inherit', shell: true, cwd: ROOT, ...opts});
  if (r.status !== 0) { console.error('✗ فشل: ' + cmd + ' ' + args.join(' ')); process.exit(1) }
}

const JAVA_MIN = 21;

/* لا يُفحص JDK ويُبنى بآخر: يُسأل gradle نفسه أيَّ آلةٍ اختار، بالوسائط
   والبيئة نفسها التي سيُبنى بها. ولولا ذلك لفحصنا ما في PATH وبنينا
   بما في إعداد المستخدم العامّ — وهما غير واحد هنا فعلاً. */
function checkGradleJava(wrapper, args, opts) {
  const r = spawnSync('"' + wrapper + '"', ['--version', ...args], opts);
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { console.error('✗ تعذّر سؤال gradle:\n' + out); process.exit(1) }
  const m = out.match(/^\s*(?:Launcher |Daemon )?JVM:\s*(\d+)/mi)
    || out.match(/JVM:\s*(\d+)/i);
  if (!m) { console.error('✗ لم أعرف أيّ JVM يستعمل gradle:\n' + out); process.exit(1) }
  const v = Number(m[1]);
  if (v < JAVA_MIN) {
    console.error('✗ gradle يبني بـ Java ' + v + ' والمطلوب ' + JAVA_MIN + ' فأعلى.');
    console.error('  اضبط JAVA_HOME، أو راجع org.gradle.java.home في ~/.gradle.');
    process.exit(1);
  }
  console.log('  gradle يبني بـ Java ' + v);
}

/* رقم النسخة من package.json، ورقم البناء من عدد الالتزامات — فلا
   يُنسى رفعُه يدويّاً، ولا يرفض المتجر تحديثاً لأن رقمه لم يتغيّر.

   ولا يُخمَّن: «|| 1» كانت تبتلع غياب git والنسخةَ الضحلة والمستودعَ
   التالف في رقمٍ واحد هو 1، ثم يُطبع الرقم الصحيح وكأنّ شيئاً لم يكن —
   فيُرفض الرفع أو يرفض الجهاز التثبيت فوق ما عنده، بلا سببٍ ظاهر. */
async function version() {
  /* الرقم من حيث يراه المستخدم — views/settings.js — لا من package.json:
     كان لكلٍّ رقمُه، فنزّل المستخدم ١٫١٫٠ ورأى في التطبيق «إصدار ٤». */
  const src = await readFile(join(ROOT, 'views', 'settings.js'), 'utf8');
  const m = src.match(/APP_VERSION\s*=\s*'([^']+)'/);
  if (!m) { console.error('✗ لم أجد APP_VERSION في views/settings.js'); process.exit(1) }
  const pkg = {version: m[1]};
  if (!/^\d+\.\d+\.\d+$/.test(pkg.version))
    { console.error('✗ نسخة غير صالحة: ' + pkg.version); process.exit(1) }

  /* وpackage.json يتبعه، ولا يسبقه. */
  const meta = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
  if (meta.version !== pkg.version) {
    console.error('✗ package.json يقول ' + meta.version + ' وAPP_VERSION يقول ' + pkg.version);
    console.error('  الرقم يُكتب في views/settings.js، ويُنسخ إلى package.json.');
    process.exit(1);
  }

  const n = spawnSync('git', ['rev-list', '--count', 'HEAD'], {cwd: ROOT, encoding: 'utf8'});
  const raw = (n.stdout || '').trim();
  if (n.error || n.status !== 0 || !/^\d+$/.test(raw)) {
    console.error('✗ تعذّر عدّ الالتزامات: ' + (n.error?.message || (n.stderr || '').trim()
      || 'مخرجات غير متوقّعة: ' + JSON.stringify(raw)));
    console.error('  ورقم البناء لا يُخمَّن — تحديثُ التطبيق يتوقّف عليه.');
    process.exit(1);
  }
  const code = Number(raw);
  /* النسخة الضحلة تعطي رقماً صغيراً صحيح الشكل، وهو أسوأ من الخطأ. */
  if (existsSync(join(ROOT, '.git', 'shallow'))) {
    console.error('✗ مستودع ضحل: عدّ الالتزامات ناقص ورقم البناء سيتراجع.');
    process.exit(1);
  }
  return {name: pkg.version, code};
}

/* استبدالٌ لم يجد ما يستبدله يعود بالنصّ كما هو ولا يقول شيئاً. */
function must(text, re, to, what) {
  const out = text.replace(re, to);
  if (out === text) { console.error('✗ لم أجد ' + what + ' في build.gradle'); process.exit(1) }
  return out;
}

async function main() {
  console.log('— تجهيز الملفّات —');
  run('node', ['scripts/stage-web.mjs']);

  console.log('— توليد مشروع أندرويد —');
  await rm(ANDROID, {recursive: true, force: true});
  run('npx', ['cap', 'add', 'android'], {env: {...process.env, ANDROID_HOME: SDK, ANDROID_SDK_ROOT: SDK}});
  await writeFile(join(ANDROID, 'local.properties'),
    'sdk.dir=' + SDK.split('\\').join('/') + '\n');

  console.log('— الأيقونات والهويّة —');
  const res = join(ANDROID, 'app', 'src', 'main', 'res');
  for (const d of ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'])
    await cp(join(ROOT, 'android-res', 'mipmap-' + d), join(res, 'mipmap-' + d),
      {recursive: true, force: true});
  /* لون خلفيّة الأيقونة المتكيّفة: لون الهوية، لا الأبيض الذي يضعه
     Capacitor — والمقدّمة بيضاء، فعلى الأبيض تختفي. */
  await writeFile(join(res, 'values', 'ic_launcher_background.xml'),
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
    + '    <color name="ic_launcher_background">#5B47F5</color>\n</resources>\n');

  const v = await version();
  const gradle = join(ANDROID, 'app', 'build.gradle');
  let g = await readFile(gradle, 'utf8');
  g = must(g, /versionCode \d+/, 'versionCode ' + v.code, 'versionCode');
  g = must(g, /versionName "[^"]*"/, 'versionName "' + v.name + '"', 'versionName');
  await writeFile(gradle, g);
  /* ويُقرأ الملفّ ثانيةً: الكتابة قد تنجح والقيمة ليست التي أردنا. */
  const back = await readFile(gradle, 'utf8');
  if (!back.includes('versionCode ' + v.code) || !back.includes('versionName "' + v.name + '"'))
    { console.error('✗ النسخة لم تُكتب كما أردنا'); process.exit(1) }
  console.log('  النسخة ' + v.name + ' (' + v.code + ')');

  if (release) await signingConfig(gradle);

  console.log('— gradle —');
  const task = release ? 'assembleRelease' : 'assembleDebug';
  /* بالمسار الكامل: الصدفة هنا قد تكون bash أو cmd، ولا يبحث كلاهما في
     دليل العمل بالطريقة نفسها. */
  const wrapper = join(ANDROID, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
  /* Capacitor 7 يترجم إلى Java 21، وJAVA_HOME هنا قد ينتهي بشرطة مائلة
     فلا يهتدي إليه gradle — فتُنزع. */
  const javaHome = (process.env.JAVA_HOME || '').replace(/[\\/]+$/, '');
  if (!javaHome || !existsSync(join(javaHome, 'bin'))) {
    console.error('✗ JAVA_HOME غير مضبوط على JDK صالح.');
    console.error('  اضبطه على JDK ' + JAVA_MIN + ' فأعلى قبل البناء.');
    process.exit(1);
  }
  /* ويُمرَّر org.gradle.java.home صراحةً: قد يثبّت المستخدم في إعداده
     العامّ (~/.gradle) إصداراً أقدم لمشاريعه الأخرى، وليس لنا أن نغيّر
     إعداده العامّ لأجل هذا المشروع. والاقتباس بعلامتين لا بـ JSON:
     JSON يُضاعف الشرطات المائلة الخلفيّة وcmd لا يفكّها. */
  const args = ['--no-daemon', '-Dorg.gradle.java.home="' + javaHome + '"'];
  const opts = {cwd: ANDROID, encoding: 'utf8', shell: true,
    env: {...process.env, ANDROID_HOME: SDK, ANDROID_SDK_ROOT: SDK, JAVA_HOME: javaHome}};
  checkGradleJava(wrapper, args, opts);
  run('"' + wrapper + '"', [task, ...args],
    {cwd: ANDROID, env: opts.env});

  const out = join(ANDROID, 'app', 'build', 'outputs', 'apk',
    release ? 'release' : 'debug', 'app-' + (release ? 'release' : 'debug') + '.apk');
  if (!existsSync(out)) { console.error('✗ لم يُنتَج APK'); process.exit(1) }
  if (release) await verifySigned(out);

  const dest = join(ROOT, 'english-coach-' + v.name + (release ? '' : '-debug') + '.apk');
  await cp(out, dest);
  console.log('\n✓ ' + dest);
}

/* يشير gradle إلى المفتاح في مكانه ولا يُنسخ إلى المستودع.

   ونُسخ: fs.cp تحمل أذون POSIX ولا تحمل قوائم تحكّم ويندوز، فالنسخة
   ترث أذون دليل المستودع — ومعناه أن مجموعةَ مستخدمين أخرى تقرأ كلمةَ
   مفتاح التوقيع نصّاً صريحاً. وهذا المستودع داخل OneDrive، فالنسخة
   تُرفَع إلى السحابة أيضاً. وgitignore لا يمنع شيئاً من ذلك: يمنع git
   وحده. فلا نسخةَ أصلاً. */
async function signingConfig(gradle) {
  const store = join(KEYDIR, 'release.keystore');
  const creds = join(KEYDIR, 'keystore.properties');
  if (!existsSync(store) || !existsSync(creds)) {
    console.error('✗ لا مفتاح توقيع. أنشئه بـ: node scripts/make-keystore.mjs');
    process.exit(1);
  }

  /* gradle يقبل المسار المطلق، والشرطة المائلة تصلح على ويندوز أيضاً. */
  const q = p => JSON.stringify(p.split('\\').join('/'));
  const g = await readFile(gradle, 'utf8');
  const cfg = `
def keyProps = new Properties()
file(${q(creds)}).withInputStream { keyProps.load(it) }
android {
    signingConfigs {
        release {
            storeFile file(${q(store)})
            storePassword keyProps['storePassword']
            keyAlias keyProps['keyAlias']
            keyPassword keyProps['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
        }
    }
}
`;
  await writeFile(gradle, g + cfg);
}

/* التوقيع يُتحقَّق منه، ولا يُفترض. واسمُ الملفّ وحده لا يكفي حَكَماً:
   يمسك غيرَ الموقَّع عرَضاً، ولا يمسك الموقَّع بمفتاحٍ آخر. */
async function verifySigned(apk) {
  const tools = join(SDK, 'build-tools');
  const ver = existsSync(tools)
    ? (await readdir(tools)).filter(d => /^\d/.test(d)).sort().pop() : null;
  if (!ver) { console.error('✗ لا build-tools للتحقّق من التوقيع'); process.exit(1) }
  const signer = join(tools, ver, process.platform === 'win32' ? 'apksigner.bat' : 'apksigner');
  const r = spawnSync('"' + signer + '"', ['verify', '--print-certs', '"' + apk + '"'],
    {shell: true, encoding: 'utf8'});
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) { console.error('✗ التوقيع غير صالح:\n' + out); process.exit(1) }
  const sha = out.match(/certificate SHA-256 digest:\s*([0-9a-f]{64})/i)?.[1];
  if (!sha) { console.error('✗ لم أجد بصمة الشهادة'); process.exit(1) }
  console.log('  بصمة التوقيع ' + sha.slice(0, 16) + '…');
  return sha;
}

main();
