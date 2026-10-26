/* يستقبل ما رسمه make-icons.html ويكتبه في android-res/.

   خادمٌ محليّ يعيش حتى يصله الإرسال ثم يموت: الصفحة لا تستطيع الكتابة
   على القرص، وهذا أقصرُ جسرٍ بينها وبينه.

   وخادمٌ محليّ يكتب ملفّاتٍ بأسماء تأتيه في الطلب هو ثغرةُ كتابةٍ
   حيثما شاء الطالب: أيُّ صفحةٍ يفتحها المستخدم وقتَ عمله تستطيع أن
   ترسل إليه، و«../..» في الاسم تخرج من دليل الإخراج. فهنا أربعة أقفال:
     • المَنشأ المسموح واحدٌ بعينه، لا «*».
     • ورمزٌ عشوائيّ في ترويسةٍ مخصّصة — وهي تُلزم المتصفّح بطلب إذنٍ
       مسبق، فلا يصل طلبُ صفحةٍ أجنبيّة أصلاً.
     • والأسماء من قائمةٍ مغلقة، لا نمطٍ فضفاض.
     • ثم يُتحقَّق أن المسار الناتج داخل دليل الإخراج فعلاً. */
import {createServer} from 'node:http';
import {mkdir, writeFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {join, dirname, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const OUT = resolve(join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'android-res'));
const PORT = 9099;
const ORIGIN = process.env.ICONS_ORIGIN || 'http://localhost:8099';
const TOKEN = randomBytes(24).toString('hex');

const DPI = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
const ALLOWED = new Set([
  ...DPI.flatMap(d => ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png']
    .map(f => 'mipmap-' + d + '/' + f)),
  'play-store-512.png'
]);

const MAX = 2 * 1024 * 1024;

function bad(res, code, msg) { res.statusCode = code; res.end(msg); console.error('✗ ' + msg) }

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'x-icons-token, content-type');
  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'POST') return bad(res, 405, 'POST فقط');
  if (req.headers.origin !== ORIGIN) return bad(res, 403, 'منشأ غير مسموح');
  if (req.headers['x-icons-token'] !== TOKEN) return bad(res, 403, 'رمز غير صحيح');

  const chunks = [];
  let size = 0;
  req.on('data', c => {
    size += c.length;
    if (size > MAX) { req.destroy(); return bad(res, 413, 'أكبر من الحدّ') }
    chunks.push(c);
  });
  req.on('end', async () => {
    if (size > MAX) return;
    try {
      const files = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const names = Object.keys(files);
      const unknown = names.filter(n => !ALLOWED.has(n));
      if (unknown.length) return bad(res, 400, 'أسماء غير مسموحة: ' + unknown.join('، '));

      for (const name of names) {
        const p = resolve(OUT, name);
        /* حزامٌ فوق حمّالة: القائمة المغلقة تكفي، وهذا يمسك ما لو
           تُساهل فيها يوماً. */
        if (p !== OUT && !p.startsWith(OUT + sep)) return bad(res, 400, 'مسار خارج الدليل');
        await mkdir(dirname(p), {recursive: true});
        await writeFile(p, Buffer.from(files[name], 'base64'));
      }
      res.end('كُتب ' + names.length);
      console.log('كُتب ' + names.length + ' ملفاً في android-res/');
    } catch (e) {
      bad(res, 400, e.message);
    } finally {
      server.close();
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('بانتظار الأيقونات من ' + ORIGIN);
  console.log('TOKEN=' + TOKEN);
});
setTimeout(() => { console.error('✗ لم يصل شيء'); server.close(); process.exit(1) }, 120000);
