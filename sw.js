/* عامل الخدمة: يجعل التطبيق قابلاً للتثبيت حقّاً، ويعمل بلا إنترنت.

   لماذا وُجد؟ بلا عامل خدمة لا يعدّ كروم الصفحةَ تطبيقاً، فيصنع «اختصاراً»
   بدل أن يُثبّت تطبيقاً — والاختصارات لا يوحّدها كروم، فكل ضغطة على
   «تثبيت» تصنع أيقونة جديدة على سطح المكتب وعلى الشاشة الرئيسية.

   والاستراتيجية: الشبكة أولاً ثم المخزَّن.

   وهذا الترتيب مقصود. العكس (المخزَّن أولاً) أسرع، لكنه يُجمّد التطبيق على
   نسخة قديمة: يفتح المتعلّم البرنامج بعد تحديثٍ فلا يرى الجديد، ولا يملك
   حيلة إلا مسح بيانات المتصفّح. والبرنامج يُحدَّث كثيراً، فالصواب أن تفوز
   الشبكة متى وُجدت، ويبقى المخزَّن شبكةَ أمانٍ للانقطاع وحده. */

const CACHE = 'english-coach-v1';

/* هيكل التطبيق: ما يكفي لفتحه بلا إنترنت. وبقيةُ الوحدات تُخزَّن عند أول
   زيارة، فلا نُثقل التثبيت الأول بقائمة طويلة تتغيّر مع كل ملفّ جديد. */
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      /* ملفّ واحد مفقود لا يُسقط التثبيت كلّه. */
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  /* لا نتدخّل إلا في طلبات GET من أصلنا: الصوت والخطوط الخارجية شأنها للمتصفّح. */
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        /* نُخزّن نسخةً للانقطاع القادم، والردّ الناقص لا يُخزَّن. */
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});

/* رسالة من الصفحة تطلب تفعيل النسخة الجديدة فوراً بلا انتظار إغلاق التبويبات. */
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
