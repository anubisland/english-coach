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
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

let timer = null;
/* المؤقّت لا يُترك معلّقاً: server.close وحده لا ينهي العمليّة ما دام
   مؤقّتٌ قائماً، فكانت الكتابة تنجح ثم تجلس دقيقتين ثم تعلن الفشل
   وتخرج بـ 1 — فيقرأ من يلفّها في سكربت أنّ الأيقونات لم تُكتب. */
function done(code) {
  if (timer) clearTimeout(timer);
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 1000).unref();
}

function bad(res, code, msg) {
  res.statusCode = code; res.end(msg); console.error('✗ ' + msg);
  done(1);
}

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGIN);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'x-icons-token, content-type');
  if (req.method === 'OPTIONS') return res.end();
  if (req.method !== 'POST') return bad(res, 405, 'POST فقط');
  /* فحصُ المنشأ يوقف الصفحات وحدها: Origin ترويسةٌ يضعها المتصفّح،
     وأيّ عمليّةٍ محليّة تكتبها كما تشاء. فالذي يوقف العمليّات هو الرمز
     وحده. والمضيف يُفحص أيضاً حتى لا يصل الطلب باسمٍ آخر. */
  if (req.headers.host !== '127.0.0.1:' + PORT) return bad(res, 403, 'مضيف غير مسموح');
  if (req.headers.origin !== ORIGIN) return bad(res, 403, 'منشأ غير مسموح');
  if (req.headers['x-icons-token'] !== TOKEN) return bad(res, 403, 'رمز غير صحيح');

  const chunks = [];
  let size = 0;
  req.on('data', c => {
    size += c.length;
    if (size > MAX) { chunks.length = 0; return bad(res, 413, 'أكبر من الحدّ') }
    chunks.push(c);
  });
  req.on('end', async () => {
    if (size > MAX) return;
    try {
      const files = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const names = Object.keys(files);
      const unknown = names.filter(n => !ALLOWED.has(n));
      if (unknown.length) return bad(res, 400, 'أسماء غير مسموحة: ' + unknown.join('، '));

      /* يُفكّ الترميز ويُتحقَّق كلُّ شيء قبل أن يُكتب شيء: الكتابة على
         دفعتين تترك مجموعةَ أيقوناتٍ نصفُها جديد ونصفها قديم إن أخفق
         ملفٌّ في المنتصف — وتخرج منها حزمةٌ أيقوناتها مختلفة باختلاف
         كثافة الشاشة، بلا خطأٍ في أيّ مكان.
         وBuffer.from لا تفشل على base64 فاسدة: تعطي عازلاً قصيراً أو
         فارغاً، فيُكتب PNG بصفر بايت ويُعلَن النجاح. */
      const decoded = [];
      for (const name of names) {
        const p = resolve(OUT, name);
        /* حزامٌ فوق حمّالة: القائمة المغلقة تكفي، وهذا يمسك ما لو
           تُساهل فيها يوماً. */
        if (p !== OUT && !p.startsWith(OUT + sep)) return bad(res, 400, 'مسار خارج الدليل');
        const buf = Buffer.from(String(files[name] || ''), 'base64');
        if (buf.length < 64 || !buf.subarray(0, 4).equals(PNG))
          return bad(res, 400, 'ليس PNG صالحاً: ' + name);
        decoded.push([p, buf]);
      }

      for (const [p, buf] of decoded) {
        await mkdir(dirname(p), {recursive: true});
        await writeFile(p, buf);
      }
      res.end('كُتب ' + names.length);
      console.log('كُتب ' + names.length + ' ملفاً في android-res/');
      done(0);
    } catch (e) {
      bad(res, 400, e.message);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('بانتظار الأيقونات من ' + ORIGIN);
  console.log('TOKEN=' + TOKEN);
});
timer = setTimeout(() => { console.error('✗ لم يصل شيء'); done(1) }, 120000);
