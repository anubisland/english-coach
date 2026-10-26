/* يبني الـAPK من الصفر: يجهّز www/، ويولّد مشروع أندرويد، ويضع فيه
   هوية التطبيق وأيقوناته، ثم يشغّل gradle.

   ومشروع أندرويد لا يُحفظ في المستودع: يولّده Capacitor في كل مرّة،
   وكلُّ ما نخصّه به مكتوبٌ هنا — فلا يضيع تعديلٌ يدويّ لأن أحداً لم
   يعرف أنه كان هناك.

   التوقيع: مفتاحٌ خارج المستودع، وكلماته تُقرأ من ملفّه وقت النداء ولا
   تُمرَّر في سطر الأمر. انظر android-signing في README. */
import {spawnSync} from 'node:child_process';
import {cp, mkdir, readFile, writeFile, rm} from 'node:fs/promises';
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

function checkJava(javaHome) {
  const bin = javaHome ? join(javaHome, 'bin', 'javac') : 'javac';
  const r = spawnSync('"' + bin + '"', ['-version'], {shell: true, encoding: 'utf8'});
  const v = Number(((r.stdout || '') + (r.stderr || '')).match(/\b(\d+)\./)?.[1]);
  if (!v) { console.error('✗ لا مترجم Java. ثبّت JDK ' + JAVA_MIN + ' فأعلى.'); process.exit(1) }
  if (v < JAVA_MIN) {
    console.error('✗ Java ' + v + ' والمطلوب ' + JAVA_MIN + ' فأعلى.');
    console.error('  اضبط JAVA_HOME على JDK ' + JAVA_MIN + '.');
    process.exit(1);
  }
  console.log('  Java ' + v);
}

/* رقم النسخة من package.json، ورقم البناء من عدد الوسوم — فلا يُنسى
   رفعُه يدويّاً، ولا يرفض المتجر تحديثاً لأن رقمه لم يتغيّر. */
async function version() {
  const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf8'));
  const n = spawnSync('git', ['rev-list', '--count', 'HEAD'], {cwd: ROOT, encoding: 'utf8'});
  const code = Number((n.stdout || '').trim()) || 1;
  return {name: pkg.version, code};
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
  g = g.replace(/versionCode \d+/, 'versionCode ' + v.code)
       .replace(/versionName "[^"]*"/, 'versionName "' + v.name + '"');
  await writeFile(gradle, g);
  console.log('  النسخة ' + v.name + ' (' + v.code + ')');

  if (release) await signingConfig(gradle);

  console.log('— gradle —');
  const task = release ? 'assembleRelease' : 'assembleDebug';
  /* بالمسار الكامل: الصدفة هنا قد تكون bash أو cmd، ولا يبحث كلاهما في
     دليل العمل بالطريقة نفسها. */
  const wrapper = join(ANDROID, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');
  /* Capacitor 7 يترجم إلى Java 21، وJAVA_HOME هنا ينتهي بشرطة مائلة
     فلا يهتدي إليه gradle — فتُنزع، ويُفحص الإصدار قبل البناء بدل أن
     يُكتشف الخطأ بعد دقيقةٍ من الترجمة. */
  const javaHome = (process.env.JAVA_HOME || '').replace(/[\\/]+$/, '');
  checkJava(javaHome);
  /* ويُمرَّر org.gradle.java.home صراحةً: قد يثبّت المستخدم في إعداده
     العامّ (~/.gradle) إصداراً أقدم لمشاريعه الأخرى، وليس لنا أن نغيّر
     إعداده العامّ لأجل هذا المشروع. */
  run('"' + wrapper + '"',
    [task, '--no-daemon', '-Dorg.gradle.java.home=' + JSON.stringify(javaHome)],
    {cwd: ANDROID, env: {...process.env, ANDROID_HOME: SDK, ANDROID_SDK_ROOT: SDK,
      JAVA_HOME: javaHome}});

  const out = join(ANDROID, 'app', 'build', 'outputs', 'apk',
    release ? 'release' : 'debug', 'app-' + (release ? 'release' : 'debug') + '.apk');
  if (!existsSync(out)) { console.error('✗ لم يُنتَج APK'); process.exit(1) }

  const dest = join(ROOT, 'english-coach-' + v.name + (release ? '' : '-debug') + '.apk');
  await cp(out, dest);
  console.log('\n✓ ' + dest);
}

/* يقرأ المفتاح وكلماته من دليل المفاتيح، ويكتب إعداد التوقيع في ملفّ
   خصائص داخل android/ — وandroid/ يُولَّد ولا يُحفظ، فلا تصل الكلمات
   إلى المستودع. ولا تمرّ في سطر أمرٍ أيضاً، فلا تدخل سجلّ الصدفة. */
async function signingConfig(gradle) {
  const store = join(KEYDIR, 'release.keystore');
  const creds = join(KEYDIR, 'keystore.properties');
  if (!existsSync(store) || !existsSync(creds)) {
    console.error('✗ لا مفتاح توقيع. أنشئه بـ: node scripts/make-keystore.mjs');
    process.exit(1);
  }
  await cp(creds, join(ANDROID, 'keystore.properties'));
  await cp(store, join(ANDROID, 'release.keystore'));

  let g = await readFile(gradle, 'utf8');
  const cfg = `
def keyProps = new Properties()
file("../keystore.properties").withInputStream { keyProps.load(it) }
android {
    signingConfigs {
        release {
            storeFile file("../release.keystore")
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

main();
