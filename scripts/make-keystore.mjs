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
import {mkdir, writeFile, chmod, access, stat, rm} from 'node:fs/promises';
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

  /* ويُتحقَّق من ثلاثة: ألّا يصل غيرُك، وأن تصل أنت، وأن يكون وصولُك
     هو الذي طلبناه. فلو فُحص الأول وحده لمرّ ملفٌّ بلا صلاحيّات أصلاً،
     ولو فُحص «مَن» دون «ماذا» لمرّ منحٌ نزل قراءةً فقط أو نزل منعاً —
     وهي عينُ العلّة الأولى: icacls يضع غير ما طُلب ولا يقول. */
  const acl = spawnSync('powershell', ['-NoProfile', '-Command',
    '(Get-Acl -LiteralPath ' + JSON.stringify(path) + ').Access | ForEach-Object {'
    + ' Write-Output ("{0}|{1}|{2}|{3}" -f $_.IdentityReference.Value,'
    + ' $_.AccessControlType, $_.FileSystemRights, $_.InheritanceFlags) }'],
    {encoding: 'utf8'});
  const rows = (acl.stdout || '').split('\n').map(x => x.trim()).filter(Boolean)
    .map(l => { const [who, type, rights, inherit] = l.split('|'); return {who, type, rights, inherit} });

  const isMine = r => r.who.toLowerCase().endsWith('\\' + me.toLowerCase());
  const others = rows.filter(r => !isMine(r));
  if (others.length)
    throw new Error('غيرُك يصل إلى ' + path + ': '
      + others.map(r => r.who + ' (' + r.rights + ')').join('، '));

  const mine = rows.filter(isMine);
  if (!mine.length) throw new Error('لا أحد يصل إلى ' + path + ' — ولا أنت');
  const full = mine.find(r => r.type === 'Allow' && /FullControl/.test(r.rights));
  if (!full)
    throw new Error('وصولُك إلى ' + path + ' ليس كما طُلب: '
      + mine.map(r => r.type + ' ' + r.rights).join('، '));
  /* ووراثةُ الدليل حمّالةٌ لما يُكتب فيه قبل أن يُحكَم بنفسه. */
  if (isDir && !/ContainerInherit/.test(full.inherit || ''))
    throw new Error('الدليل ' + path + ' لا يورّث صلاحيّاته: ' + full.inherit);
}

const DIR = join(homedir(), '.config', 'english-coach');
const STORE = join(DIR, 'release.keystore');
const PROPS = join(DIR, 'keystore.properties');
const ALIAS = 'english-coach';

const exists = async p => access(p).then(() => true, () => false);

async function main() {
  const hasStore = await exists(STORE), hasProps = await exists(PROPS);
  if (hasStore && hasProps) {
    console.log('المفتاح موجود: ' + STORE);
    console.log('ولا يُستبدل: استبدالُه يمنع تحديث ما نُشر بالقديم.');
    /* ويُعاد إحكامُه في كل مرّة: لو أخفق الإحكام يوماً لبقي مكشوفاً إلى
       الأبد، لأن هذا الفرع كان يقول «موجود» ويخرج بنجاح بلا فحص. */
    await lockDown(DIR, true);
    await lockDown(STORE, false);
    await lockDown(PROPS, false);
    console.log('وأُعيد التحقّق: لا يصل إليه غيرُك.');
    return;
  }
  /* ونصفُ مفتاحٍ أسوأ من لا مفتاح: كان هذا السكربت يقول «موجود» ويخرج
     بنجاح، والبناء يقول «لا مفتاح، أنشئه بهذا السكربت» — فيُحال
     المستخدم بينهما بلا مخرجٍ ولا بيان. */
  if (hasStore !== hasProps) {
    console.error('✗ نصفُ مفتاح: ' + (hasStore ? 'المفتاح موجود وسجلّ كلمته مفقود'
      : 'سجلّ الكلمة موجود والمفتاح مفقود'));
    console.error('  في ' + DIR);
    if (hasStore) {
      console.error('  والكلمة لا تُستخرج من المفتاح — استعِدها من نسختك');
      console.error('  الاحتياطيّة في مدير الأسرار.');
      console.error('  ولا تحذف المفتاح إن كنت قد نشرتَ به: من ثبّت');
      console.error('  التطبيق لن يستطيع تحديثه بمفتاحٍ آخر.');
    } else {
      console.error('  احذف السجلّ ثم أعد الإنشاء — إن لم تكن نشرتَ به.');
    }
    process.exit(1);
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

  /* ما بعد keytool يتمّ كلُّه أو لا شيء منه: مفتاحٌ كُتب ثم أخفق
     إحكامُه يبقى مكشوفاً، ويظنّه التشغيلُ التالي سليماً. */
  try {
    await lockDown(STORE, false);
    await writeFile(PROPS,
      'storePassword=' + pass + '\n'
      + 'keyPassword=' + pass + '\n'
      + 'keyAlias=' + ALIAS + '\n', {mode: 0o600});
    await lockDown(PROPS, false);
  } catch (e) {
    await rm(STORE, {force: true});
    await rm(PROPS, {force: true});
    throw e;
  }

  console.log('\n✓ أُنشئ المفتاح في ' + DIR);
  console.log('  لا يصل إليه غيرُك، وهو خارج المستودع.');
  console.log('  احفظ نسخةً احتياطيّة في مدير أسرارك: فقدانُه يمنع التحديث.');
}

main().catch(e => { console.error('✗ ' + e.message); process.exit(1) });
