/* ينشئ مفتاح توقيع التطبيق خارج المستودع.

   قاعدة المنظّمة: لا اعتمادٌ في مستودع، ولا في إعدادات وكيل. فالمفتاح
   وكلماته في ~/.config/english-coach بصلاحيّات 700 للدليل و600 للملفّ،
   وتُقرأ وقت النداء.

   والكلمة تُولَّد هنا عشوائيّةً ولا تُطبع ولا تُمرَّر في سطر أمر —
   لأن سطر الأمر يدخل سجلّ الصدفة وقائمةَ العمليّات، وقائمةَ الأذونات
   في إعدادات Claude Code. وقد وُجد اعتمادٌ حيٌّ بهذه الطريقة في هذه
   المنظّمة من قبل.

   ولا يُفقد هذا المفتاح: تحديثُ تطبيقٍ منشور لا يُقبل إلا بمفتاحه
   نفسه. احفظ نسخةً منه في مدير أسرارك. */
import {spawnSync} from 'node:child_process';
import {mkdir, writeFile, chmod, access, stat} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {join} from 'node:path';
import {homedir, userInfo} from 'node:os';

/* chmod على NTFS لا يفعل شيئاً ويعود بنجاح — فالصلاحيّات تبقى 644 ومن
   ظنّها 600 فقد ظنّ خطأً. فعلى ويندوز تُضبط قوائم التحكّم صراحةً، ثم
   يُتحقّق من النتيجة ولا يُكتفى بأن الأمر لم يفشل. */
async function lockDown(path, isDir) {
  if (process.platform !== 'win32') {
    await chmod(path, isDir ? 0o700 : 0o600);
    const m = (await stat(path)).mode & 0o777;
    if (m & 0o077) throw new Error('الصلاحيّات لم تُضبط على ' + path + ': ' + m.toString(8));
    return;
  }
  const me = userInfo().username;
  /* (OI)(CI) علمان للأدلّة وحدها، ويُسقطهما icacls على الملفّ بصمت
     ويعود بنجاح — فيبقى الملفّ بلا مدخل وصولٍ واحد، لا لك ولا لغيرك. */
  const grant = isDir ? me + ':(OI)(CI)F' : me + ':F';
  const r = spawnSync('icacls', [path, '/inheritance:r', '/grant:r', grant],
    {encoding: 'utf8'});
  if (r.status !== 0) throw new Error('icacls فشل على ' + path + ': ' + (r.stderr || '').trim());

  /* ويُتحقَّق من الطرفين: ألّا يصل غيرُك، وأن تصل أنت. ولو فُحص الأول
     وحده لمرّ ملفٌّ بلا صلاحيّات أصلاً — وهو ما وقع فعلاً. */
  const acl = spawnSync('powershell', ['-NoProfile', '-Command',
    '(Get-Acl -LiteralPath ' + JSON.stringify(path)
    + ').Access | ForEach-Object { Write-Output $_.IdentityReference.Value }'],
    {encoding: 'utf8'});
  const who = (acl.stdout || '').split('\n').map(x => x.trim()).filter(Boolean);
  const mine = who.filter(x => x.toLowerCase().endsWith('\\' + me.toLowerCase()));
  const others = who.filter(x => !mine.includes(x));
  if (others.length) throw new Error('غيرُك يصل إلى ' + path + ': ' + others.join('، '));
  if (!mine.length) throw new Error('لا أحد يصل إلى ' + path + ' — ولا أنت');
}

const DIR = join(homedir(), '.config', 'english-coach');
const STORE = join(DIR, 'release.keystore');
const PROPS = join(DIR, 'keystore.properties');
const ALIAS = 'english-coach';

const exists = async p => access(p).then(() => true, () => false);

async function main() {
  if (await exists(STORE)) {
    console.log('المفتاح موجود: ' + STORE);
    console.log('ولا يُستبدل: استبدالُه يمنع تحديث ما نُشر بالقديم.');
    return;
  }
  await mkdir(DIR, {recursive: true});
  await lockDown(DIR, true);

  /* 32 بايتاً عشوائيّة بترميز base64url: لا تُطبع ولا تُمرَّر وسيطاً. */
  const pass = randomBytes(32).toString('base64url');

  const r = spawnSync('keytool', [
    '-genkeypair', '-v',
    '-keystore', STORE,
    '-alias', ALIAS,
    '-keyalg', 'RSA', '-keysize', '4096',
    '-validity', '10950',
    '-dname', 'CN=English Coach, OU=anubisland, O=anubisland, C=EG',
    '-storetype', 'PKCS12',
    '-storepass:env', 'KS_PASS',
    '-keypass:env', 'KS_PASS'
  ], {stdio: ['ignore', 'inherit', 'inherit'], env: {...process.env, KS_PASS: pass}});

  if (r.status !== 0) { console.error('✗ فشل keytool'); process.exit(1) }
  await lockDown(STORE, false);

  await writeFile(PROPS,
    'storePassword=' + pass + '\n'
    + 'keyPassword=' + pass + '\n'
    + 'keyAlias=' + ALIAS + '\n', {mode: 0o600});
  await lockDown(PROPS, false);

  console.log('\n✓ أُنشئ المفتاح في ' + DIR);
  console.log('  لا يصل إليه غيرُك، وهو خارج المستودع.');
  console.log('  احفظ نسخةً احتياطيّة في مدير أسرارك: فقدانُه يمنع التحديث.');
}

main();
