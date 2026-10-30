/* اختبارات سلوكية للتطبيق. التشغيل:  node tests/app.test.js  */
const { run, report } = require('./harness.js');

(async () => {
  console.log('— الحالة والترقية —');

  /* محطّةُ المفردات أوّلُ محطّاتِ الوحدة، فبذرةٌ تصف ما بعدها
     تُتمّها — وإلّا كانت الخطوةُ التالية هي المفرداتِ أبداً. */
  /* المشهدُ الحيّ صار محطّةً في الرحلة، فبذرةٌ تصف ما بعده تُتمّه. */
  const SCENES_DONE = Object.fromEntries(
    (await (await import('../content/scenes.js')).SCENES || [])
      .map(s => [s.les || ('t:' + s.t), true]));

  const WORDS_DONE = Object.fromEntries(
    Array.from({ length: 24 }, (_, i) => [i + 1, 100]));

  await run('مستخدم جديد يُقلع بحالة كاملة', {}, (ctx, ev) => {
    const S = ev('S');
    for (const k of ['errs', 'chat', 'lessons', 'conv', 'cp', 'ret'])
      if (S[k] === undefined) throw new Error(`الحقل ${k} غير مهيّأ`);
    if (S.v !== 4) throw new Error('رقم نسخة البنية خاطئ: ' + S.v);
  });

  await run('ترقية حالة محفوظة قديمة بلا errs ولا chat',
    { 'eng-coach-v3': JSON.stringify({ placed: true, level: 'A1', lessons: { '1.1': true }, cp: { 1: true }, xp: 120, tab: 'speak' }) },
    (ctx, ev) => {
      const S = ev('S');
      if (S.xp !== 120) throw new Error('ضاعت نقاط XP: ' + S.xp);
      if (!S.lessons['1.1']) throw new Error('ضاع تقدّم الدروس');
      if (!S.cp[1]) throw new Error('ضاع اجتياز الوحدة');
      if (!S.errs) throw new Error('errs غير مهيّأ بعد الترقية');
      if (S.v !== 4) throw new Error('رقم النسخة لم يُحدَّث');
    });

  await run('درس محفوظ لم يعد موجوداً لا يترك شاشة بيضاء',
    { 'eng-coach-v3': JSON.stringify({ tab: 'course', open: '9.9' }) },
    (ctx, ev) => {
      if (ev('S').open !== null) throw new Error('لم يُصفَّر الدرس المفقود');
      ctx.render();
      if (!ctx._els.app.innerHTML) throw new Error('الشاشة فارغة');
      if (!ctx._els.nav.innerHTML) throw new Error('شريط التنقل فارغ');
    });

  await run('xp كنصّ لا يفسد النقاط بالدمج',
    { 'eng-coach-v3': JSON.stringify({ xp: '120' }) },
    (ctx, ev) => {
      ctx.addXp(5);
      if (ev('S').xp !== 5) throw new Error('النقاط صارت: ' + JSON.stringify(ev('S').xp));
    });

  await run('مستوى غير معروف يعود إلى A1',
    { 'eng-coach-v3': JSON.stringify({ level: '<img src=x>' }) },
    (ctx, ev) => { if (ev('S').level !== 'A1') throw new Error('مستوى غير مُتحقَّق منه: ' + ev('S').level) });

  await run('مستخدم جديد يُقابَل باختبار تحديد المستوى', {}, (ctx, ev) => {
    if (ev('S').placed !== false) throw new Error('المستخدم الجديد يُعتبر محدَّد المستوى');
    if (!ctx.homeView().includes('اختبار تحديد المستوى')) throw new Error('لم يُعرض الاختبار عند أول دخول');
  });

  await run('مستخدم قديم بلا علامة placed لا يُعاد إلى الاختبار',
    { 'eng-coach-v3': JSON.stringify({ xp: 80, lessons: { '1.1': true } }) },
    (ctx, ev) => {
      if (ev('S').placed !== true) throw new Error('أُعيد مستخدم قديم إلى اختبار تحديد المستوى');
      if (ctx.homeView().includes('اختبار تحديد المستوى')) throw new Error('عُرض الاختبار لمستخدم قديم');
    });

  await run('المستخدم القديم يُستأنف من خطوته التالية بالضبط',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true } , words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      const h = ctx.homeView();
      if (!h.includes('ابدأ الآن')) throw new Error('لا بطاقة استئناف');
      if (!h.includes('الدرس 1.2')) throw new Error('الخطوة التالية خاطئة');
      /* وباسمِ وحدتها: «مفردات الوحدة» وحدَها لا تقول أيَّ وحدة. */
      if (!/الوحدة\s*[١٢٣٤٥٦٧٨٩٠\d]/.test(h)) throw new Error('الخطوة التالية بلا رقم وحدتها');
    });

  await run('بطاقة الاستئناف تنتقل إلى المحادثة ثم البوابة',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true, '1.3': true } , words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => { if (!ctx.homeView().includes('حوار:')) throw new Error('لم تُقترح المحادثة بعد إتمام الدروس') });

  await run('تبويب محفوظ غير صالح يعود إلى الرئيسية',
    { 'eng-coach-v3': JSON.stringify({ tab: 'hacked' }) },
    (ctx, ev) => { if (ev('S').tab !== 'home') throw new Error('لم يُصحَّح التبويب: ' + ev('S').tab); ctx.render() });

  console.log('— التخزين المعطّل —');

  await run('حالة محفوظة تالفة: تُستبدل ويُخبَر المستخدم',
    { 'eng-coach-v3': '{ليست JSON' },
    (ctx, ev) => {
      if (ev('S').xp !== 0) throw new Error('لم تُستبدل الحالة التالفة');
      if (!ctx._logged.some(l => l.includes('قراءة التقدم المحفوظ'))) throw new Error('الخطأ لم يُسجَّل — فشل صامت');
      ctx.render();
      if (!ctx._els.app.innerHTML.includes('تعذّرت قراءة تقدّمك السابق')) throw new Error('لم يُعرض تحذير للمستخدم');
    });

  await run('تخزين محجوب عند القراءة: تحذير ظاهر لا رسالة في الـ console فقط', {}, (ctx, ev) => {
    ctx.render();
    if (!ctx._els.app.innerHTML.includes('تعذّرت قراءة تقدّمك السابق')) throw new Error('لم يُعرض تحذير للمستخدم');
  }, { throwOnRead: true });

  await run('تعذّر الحفظ: تحذير ثابت يبقى على كل الشاشات', {}, (ctx, ev) => {
    ctx.go('course');
    if (!ctx._logged.some(l => l.includes('حفظ التقدم'))) throw new Error('فشل الحفظ لم يُسجَّل');
    if (!ctx._els.app.innerHTML.includes('تقدّمك لا يُحفظ')) throw new Error('لا تحذير بعد أول فشل');
    ctx.go('speak');
    if (!ctx._els.app.innerHTML.includes('تقدّمك لا يُحفظ')) throw new Error('التحذير اختفى بعد تغيير الشاشة');
  }, { throwOnWrite: true });

  console.log('— الصوت —');

  await run('الضغط المزدوج على ميكروفون المحادثة يُبلّغ ولا يصمت', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatMic();
    if (ctx._started.length !== 1) throw new Error('لم تُستدعَ start');
    const fb = ev('S').chat.fb || '';
    if (!fb.includes('تعذّر بدء التسجيل')) throw new Error('لا رسالة للمستخدم: ' + fb);
    if (!ctx.speakView().includes('تعذّر بدء التسجيل')) throw new Error('الرسالة لا تظهر على الشاشة');
  }, { recognition: 'throws' });

  await run('الضغط المزدوج على ميكروفون التمرين يُبلّغ ولا يصمت', {}, (ctx, ev) => {
    ctx.launch('conv', 'c1');
    ctx.pick(ev('S').q.items[0].a);
    ctx.mic2();
    if (ctx._started.length !== 1) throw new Error('لم تُستدعَ start');
    const fb = ev('S').q.feedback || '';
    if (!fb.includes('تعذّر بدء التسجيل')) throw new Error('لا رسالة للمستخدم: ' + fb);
    if (!ctx._logged.some(l => l.includes('بدء التسجيل'))) throw new Error('الخطأ لم يُسجَّل');
  }, { recognition: 'throws' });

  await run('غياب التعرّف على الصوت يُشرَح بالعربية', {}, (ctx, ev) => {
    ctx.go('speak'); ctx.chatMic();
    if (!(ev('S').chat.fb || '').includes('غير متاح')) throw new Error('لا رسالة عند غياب الميزة');
  }, { recognition: 'missing' });

  await run('تعذّر النطق يُخبر المستخدم بدل الصمت', {}, (ctx, ev) => {
    ctx.say('Hello');
    if (!ctx._els.toast.textContent.includes('الصوت')) throw new Error('لا رسالة: ' + ctx._els.toast.textContent);
    if (!ctx._logged.some(l => l.includes('تشغيل الصوت'))) throw new Error('الخطأ لم يُسجَّل');
  }, { synthesisThrows: true });

  console.log('— المحادثة —');

  await run('إجابة بها خطأ جرامري تُسجَّل ولا تُسقط التطبيق', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatReply('he go to school');
    if (Object.keys(ev('S').errs).length === 0) throw new Error('لم يُسجَّل الخطأ في errs');
    ctx.speakView();
  });

  await run('إجابة سليمة جرامرياً', {}, (ctx, ev) => {
    ctx.go('speak'); ctx.chatReply('I am a teacher'); ctx.speakView();
  });

  await run('مؤشر مشهد خارج الحدود لا يعرض تصحيح مشهد آخر',
    { 'eng-coach-v3': JSON.stringify({ tab: 'speak', chat: { sc: 99, ti: 2, stage: 'fb', ok: false, g: [{ ar: 'ملاحظة قديمة' }], fixed: 'He goes to school' } }) },
    (ctx, ev) => {
      const html = ctx.speakView();
      const c = ev('S').chat;
      /* لا إلى الفهرس صفر بالضرورة: المشهدُ الأوّل قد يكون فوق ما
         بلغ المتعلّم، فالضابطُ يردّ إلى أوّل ما بلغه. */
      const u = ev('sceneUnit')(ev('SCENES')[c.sc]);
      if (c.ti !== 0) throw new Error('لم يُضبط المؤشر');
      if (u !== undefined && u > ev('reachedUnit')())
        throw new Error('رُدّ إلى مشهدٍ فوق ما بلغ');
      if (html.includes('ملاحظة قديمة')) throw new Error('عُرضت ملاحظة جرامر من مشهد آخر');
      if (html.includes('He goes to school')) throw new Error('عُرضت جملة مصححة من مشهد آخر');
      if (c.stage !== 'reply') throw new Error('بقيت مرحلة التغذية الراجعة القديمة');
      if (!c.fb) throw new Error('لم يُفسَّر للمستخدم سبب نقله');
    });

  await run('التنقل بين كل مشاهد المحادثة', {}, (ctx, ev) => {
    const n = ev('SCENES.length');
    for (let i = 0; i < n; i++) {
      ctx.chatPick(i); ctx.speakView();
      const t = ev('SCENES[' + i + '].turns.length');
      for (let j = 0; j < t; j++) { ctx.chatReply('I am a teacher'); ctx.chatNext() }
    }
  });

  console.log('— بنك الأسئلة —');

  await run('لا تمارين مكررة ولا إجابات خاطئة الفهرس', {}, (ctx, ev) => {
    const L = ev('LESSONS');
    const qs = L.flatMap(l => l.items).map(i => i.q);
    const dup = qs.length - new Set(qs).size;
    if (dup) throw new Error(`${dup} تمرين مكرر`);
    L.forEach(l => l.items.forEach((it, i) => {
      /* لكل نوع شرطه: الاختيار له فهرس صحيح، والمكتوب له إجابات مقبولة. */
      if (ctx.itemTyped(it)) {
        if (!Array.isArray(it.ok) || !it.ok.length) throw new Error(`${l.id}#${i + 1}: بلا إجابة مقبولة`);
        if (it.ok.some(o => !ctx.typedOk(o, it.ok))) throw new Error(`${l.id}#${i + 1}: صيغة مقبولة تُرفض`);
        if (it.k === 'order') {
          const given = it.w.map(x => x.toLowerCase()).sort().join(' ');
          const need = it.ok[0].toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).sort().join(' ');
          if (given !== need) throw new Error(`${l.id}#${i + 1}: الكلمات لا تكوّن الجملة`);
        }
        if (it.k === 'type' && !/___/.test(it.q)) throw new Error(`${l.id}#${i + 1}: بلا فراغ`);
        /* جملة «صحّح» الصحيحة يجب ألّا يرصدها محرّك النحو خطأً. */
        if (it.k === 'correct' && ctx.checkGrammar(it.ok[0]).length)
          throw new Error(`${l.id}#${i + 1}: النموذج يُرصد خطأً`);
      } else {
        if (!(it.a >= 0 && it.a < it.o.length)) throw new Error(`${l.id}#${i + 1}: فهرس إجابة خاطئ`);
        if (new Set(it.o).size !== it.o.length) throw new Error(`${l.id}#${i + 1}: خيار مكرر`);
      }
      if (!it.tip || !/[؀-ۿ]/.test(it.tip)) throw new Error(`${l.id}#${i + 1}: tip ليس بالعربية`);
    }));
  });

  /* المتعلم يضغط موضعاً لا نصّاً. الاختبار السابق قارن نصّ الإجابة،
     فمرّت دروس كل إجاباتها في الموضع نفسه وهي تُجتاز بالضغط على زر واحد. */
  await run('لا يمكن اجتياز درس بالضغط على الموضع نفسه دائماً', {}, (ctx, ev) => {
    ev('LESSONS').forEach(l => {
      for (let k = 0; k < 3; k++) {
        const hits = l.items.filter(it => it.a === k).length;
        if (hits === l.items.length)
          throw new Error(`الدرس ${l.id}: كل الإجابات في الموضع ${k} — يُجتاز بالضغط على الزر نفسه`);
      }
    });
  });

  await run('لا يتجاوز أي موضع ٧٠٪ من إجابات الدرس', {}, (ctx, ev) => {
    ev('LESSONS').forEach(l => {
      for (let k = 0; k < 3; k++) {
        const share = l.items.filter(it => it.a === k).length / l.items.length;
        if (share > 0.7)
          throw new Error(`الدرس ${l.id}: ${Math.round(share * 100)}٪ من الإجابات في الموضع ${k}`);
      }
    });
  });

  console.log('— المسار والاختبارات —');

  await run('اجتياز درس يفتح الدرس التالي',
    { 'eng-coach-v3': JSON.stringify({ placed: true, words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const n = ev('S.q.items.length');
    for (let i = 0; i < n; i++) { ctx.pick(ev('S.q.items[S.q.i].a')); ctx.nextQ() }
    if (!ev('S').lessons['1.1']) throw new Error('لم يُسجَّل اجتياز الدرس');
    ctx.closeQ();
    if (ev('S').open !== '1.2') throw new Error('لم يُفتح الدرس التالي: ' + ev('S').open);
  });

  await run('اختبار الوحدة يسحب 8 أسئلة بلا تكرار داخل الاختبار', {}, (ctx, ev) => {
    for (let t = 0; t < 40; t++) {
      ctx.launch('cp', 1);
      const qs = ev('S.q.items.map(x=>x.q)');
      if (qs.length !== 8) throw new Error('عدد الأسئلة ' + qs.length);
      if (new Set(qs).size !== 8) throw new Error('سؤال مكرر داخل اختبار الوحدة');
    }
  });

  /* كان الامتحانُ عشرةَ أسئلةٍ عشوائيّة، فكان يمكن أن يخرج بلا سؤالٍ
     عن نصف تراكيب المستوى ثمّ يُقال «أتممتَ A1». فصار لكلّ تركيبٍ
     فارقٍ سؤالُه — والحارسُ يقيس التغطية لا العدد.

     والتكرارُ يبقى ممنوعاً: الدرسُ الواحد قد يحمل قاعدتين فيقع
     تمرينُه في بركتيهما، وقد وقع هذا فعلاً. */
  await run('الامتحان النهائي يقيس كلَّ تركيبٍ بلا تكرار', {}, (ctx, ev) => {
    /* كلُّ مستوًى كُتب مطلبُه، لا A1 وحده: كان الاسمُ مثبّتاً،
       فحين يأتي A2 يبقى الحارسُ أخضرَ وA2 بلا قياس. */
    const specd = ev('LEVELS_SPECD').filter(l => ev('LEVELS_BUILT').includes(l));
    const lv = specd[0];
    const want = ev('examSpec')(lv).length;
    for (let t = 0; t < 40; t++) {
      ctx.launch('exam', lv);
      const qs = ev('S.q.items.map(x=>x.q)');
      if (new Set(qs).size !== qs.length) throw new Error('سؤال مكرر داخل الامتحان');
      if (qs.length !== want)
        throw new Error('الامتحان ' + qs.length + ' سؤالاً والمطلوب قياسُه ' + want + ' تركيباً');
    }
    const un = specd.flatMap(l => ev('examUncovered')(l));
    if (un.length) throw new Error('تراكيبُ بلا سؤال: ' + un.map(g => g.t).join('، '));
  });

  await run('كل الشاشات تُرسَم بلا خطأ', {}, (ctx, ev) => {
    ['home', 'course', 'speak'].forEach(t => { ctx.go(t); ctx.render() });
  });

  console.log('— شبكة الأمان —');

  await run('استثناء أثناء الرسم يعرض بطاقة خطأ لا شاشة بيضاء', {}, (ctx, ev) => {
    ctx.go('home');
    const keep = ev('VIEWS.home');
    try {
      ev('VIEWS.home=function(){throw new Error("عطل مُفتعل")}');
      ctx.render();
    } finally { ev('VIEWS').home = keep }   // وإلا تعطّلت كل الاختبارات بعده
    const html = ctx._els.app.innerHTML;
    if (!html) throw new Error('الشاشة فارغة');
    if (!html.includes('تعذّر عرض هذه الشاشة')) throw new Error('لا بطاقة خطأ: ' + html.slice(0, 80));
    if (!ctx._logged.some(l => l.includes('رسم الشاشة'))) throw new Error('الخطأ لم يُسجَّل');
  });

  await run('معالج أخطاء عام مركَّب على النافذة', {}, (ctx, ev) => {
    const hs = ctx._handlers.error;
    if (!hs || !hs.length) throw new Error('لا معالج أخطاء عام');
    hs[0]({ error: new Error('عطل من onclick') });
    if (!ctx._els.toast.textContent.includes('خطأ غير متوقع')) throw new Error('لم يُبلَّغ المستخدم');
    if (!ctx._logged.some(l => l.includes('خطأ غير متوقع'))) throw new Error('الخطأ لم يُسجَّل');
  });

  await run('أدوات المطور محذوفة من الكود والواجهة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    if (typeof ctx.devUnlock !== 'undefined' || typeof ctx.devReset !== 'undefined')
      throw new Error('دوال المطور ما زالت معرَّفة');
    if (ctx.courseView().includes('فتح كل الدروس')) throw new Error('زر المطور ما زال في الواجهة');
  });

  console.log('— بنك الشرح —');

  await run('كل قاعدة مكتملة الحقول', {}, (ctx, ev) => {
    const R = ev('RULES');
    if (!R.length) throw new Error('بنك القواعد فارغ');
    R.forEach(r => {
      for (const k of ['id','t','rule','why','table','more','ex','bad','ar'])
        if (!r[k] || (Array.isArray(r[k]) && !r[k].length))
          throw new Error('القاعدة ' + r.id + ': الحقل ' + k + ' ناقص');
      if (!/[؀-ۿ]/.test(r.ar)) throw new Error('القاعدة ' + r.id + ': شرح المقارنة بالعربية ناقص');
      r.ex.forEach(e => { if (!e.en || !e.ar) throw new Error('القاعدة ' + r.id + ': مثال بلا ترجمة') });
    });
  });

  await run('كل درس مربوط بقاعدة موجودة', {}, (ctx, ev) => {
    const RULE = ev('RULE');
    ev('LESSONS').forEach(l => {
      if (!l.rules || !l.rules.length) throw new Error('الدرس ' + l.id + ' بلا قاعدة');
      l.rules.forEach(id => { if (!RULE[id]) throw new Error('الدرس ' + l.id + ' يشير إلى قاعدة غير موجودة: ' + id) });
    });
  });

  await run('الشرح يظهر قبل الدرس',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.openLesson('1.1');
    const h = ctx.courseView();
    if (!h.includes('لماذا يخطئ العربي هنا؟')) throw new Error('لا بطاقة قاعدة في شاشة الدرس');
    if (!h.includes('I student')) throw new Error('الأخطاء الشائعة غير معروضة');
  });

  await run('الخطأ في التمرين يفتح الشرح تلقائياً', {}, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const it = ev('S.q.items[0]');
    ctx.pick(it.a === 0 ? 1 : 0);
    const h = ctx.quizView();
    if (!h.includes('فعل الكون')) throw new Error('لم يُعرض الشرح بعد الخطأ');
    if (!h.includes('الشرح كاملاً')) throw new Error('لا زر للشرح الكامل');
  });

  await run('الإجابة الصحيحة تعرض زر المراجعة لا الشرح كاملاً', {}, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    ctx.pick(ev('S.q.items[0].a'));
    const h = ctx.quizView();
    if (!h.includes('راجع القاعدة')) throw new Error('لا زر مراجعة بعد الإجابة الصحيحة');
    if (h.includes('لماذا يخطئ العربي')) throw new Error('فُتح الشرح الكامل بلا داعٍ');
  });

  await run('الشرح يظهر داخل المحادثة عند الخطأ', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatReply('he are my brother');
    const g = ev('S.chat.g');
    if (!g.some(x => x.rid)) throw new Error('ملاحظة الجرامر بلا معرّف قاعدة');
    if (!ctx.speakView().includes('فعل الكون')) throw new Error('لم تُعرض بطاقة القاعدة في المحادثة');
  });

  await run('فتح وإغلاق الشرح لا يكسر الشاشة', {}, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    ctx.pick(ev('S.q.items[0].a') === 0 ? 1 : 0);
    ctx.toggleRule('be-subject');
    if (!ctx.quizView().includes('لماذا يخطئ العربي')) throw new Error('لم يُفتح الشرح');
    ctx.toggleRule('be-subject');
    if (ev('S').ruleOpen !== null) throw new Error('لم يُغلق الشرح');
  });

  await run('بطاقة الشرح تظهر في كل درس من التسعة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ev('LESSONS.map(l=>l.id)').forEach(id => {
      ctx.openLesson(id);
      if (!ctx.courseView().includes('لماذا يخطئ العربي هنا؟'))
        throw new Error('الدرس ' + id + ': لا بطاقة شرح');
    });
  });

  console.log('— التصميم —');

  await run('قلم المصحّح يضع الصواب فوق الخطأ في علامة واحدة', {}, (ctx, ev) => {
    const h = ctx.penDiff('he go to school', 'He goes to school');
    if ((h.match(/class="fix"/g) || []).length !== 1)
      throw new Error('الاستبدال رُسم كعلامتين بدل واحدة: ' + h);
    if (!h.includes('<u>goes</u><s>go</s>')) throw new Error('ترتيب الصواب والخطأ خاطئ: ' + h);
    if (!h.startsWith('He ') || !h.endsWith('to school')) throw new Error('الكلمات السليمة تغيّرت: ' + h);
  });

  await run('قلم المصحّح لا يعلّم شيئاً في جملة سليمة', {}, (ctx, ev) => {
    const h = ctx.penDiff('I am a teacher', 'I am a teacher');
    if (h.includes('class="fix"')) throw new Error('عُلّمت جملة سليمة: ' + h);
  });

  await run('قلم المصحّح يهرّب وسوم HTML من نصّ المتعلم', {}, (ctx, ev) => {
    const h = ctx.penDiff('<img src=x onerror=alert(1)> go', 'He goes');
    if (h.includes('<img')) throw new Error('وسم خام وصل إلى الصفحة: ' + h);
  });

  await run('المحادثة تعرض تصحيح قلم المدرّس', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatReply('he are my brother');
    const h = ctx.speakView();
    if (!h.includes('class="fix"')) throw new Error('لا تصحيح داخل الفقاعة');
    if (!h.includes('bub me')) throw new Error('لا فقاعة للمتعلم');
    if (!h.includes('bub them')) throw new Error('لا فقاعة للمحاور');
  });

  await run('الوضع الليلي والنهاري يُحفظان', {}, (ctx, ev) => {
    if (ev('S').theme !== 'light') throw new Error('الوضع الافتراضي ليس نهارياً');
    ctx.toggleTheme();
    if (ev('S').theme !== 'dark') throw new Error('لم يتبدّل الوضع');
    if (!ctx._store['eng-coach-v3'].includes('"theme":"dark"')) throw new Error('الوضع لم يُحفظ');
  });

  await run('الوضع المحفوظ يُستعاد',
    { 'eng-coach-v3': JSON.stringify({ placed: true, theme: 'dark' }) },
    (ctx, ev) => { if (ev('S').theme !== 'dark') throw new Error('لم يُستعد الوضع المحفوظ') });

  await run('هدف الكلام اليومي يُحفظ',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.setGoal(20);
    if (ev('S').goal !== 20) throw new Error('لم يتغيّر الهدف');
    if (!ctx._store['eng-coach-v3'].includes('"goal":20')) throw new Error('الهدف لم يُحفظ');
  });

  await run('شريط التنقل يستخدم أيقونات مرسومة لا إيموجي', {}, (ctx, ev) => {
    ctx.render();
    const nav = ctx._els.nav.innerHTML;
    if (!nav.includes('<svg')) throw new Error('لا أيقونات مرسومة');
    if (/[\u{1F300}-\u{1FAFF}]/u.test(nav)) throw new Error('ما زال فيه إيموجي');
  });

  await run('الرئيسية تعرض حلقة التقدّم',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true } , words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      const h = ctx.homeView();
      /* ولا نسبةَ مجرّدةٌ في «اليوم»: مكانُها الرحلةُ والتفصيل.
         وكانت نسبةٌ من المستوى كلِّه تُعرَض بجانب أصفارٍ تَنقضها. */
      if (/d+s*٪|٪/.test(h.replace(/٨٧٪/g,''))) throw new Error('عادت النسبةُ المجرّدة إلى اليوم');
      if (!h.includes('ابدأ الآن')) throw new Error('لا بيانَ لما يفعله الآن');
      if (!/كتابُك|صفحتك|ما خطّتُك|متأخّر|ماشٍ على خطّتك/.test(h))
        throw new Error('لا بيانَ لحاله: لا كتابَ ولا خطّة');
    });

  await run('خريطة الرحلة ترسم خطاً ومحطات',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
      const h = ctx.courseView();
      if (!h.includes('class="spine')) throw new Error('لا خط رحلة');
      if (!h.includes('stopCard')) throw new Error('لا محطات');
      if (!h.includes('dot now')) throw new Error('لا محطة حالية بارزة');
    });

  console.log('— البنية بعد التقسيم —');

  await run('تقييم النطق يحسب درجة ويشخّص الصوت', {}, (ctx, ev) => {
    const p = ctx.pronScore('I am a teacher', 'I am a teacher');
    if (p.sc !== 100) throw new Error('جملة مطابقة لم تُعطَ 100: ' + p.sc);
    if (p.suspects.length) throw new Error('شخّص خطأً في نطق سليم');

    const q = ctx.pronScore('three brothers', 'tree brothers');
    if (q.sc === 100) throw new Error('كلمة خاطئة لم تُرصد');
    if (!q.suspects.some(x => x.id.startsWith('th'))) throw new Error('لم يُشخَّص صوت th');
    if (!q.items.length) throw new Error('لا تحليل لكل كلمة');
  });

  await run('التشخيص يقدّم الصوت الدقيق على القاعدة الواسعة', {}, (ctx, ev) => {
    const p = ctx.pronScore('I think this is very good', 'I sink dis is fery good');
    const ids = p.suspects.map(x => x.id);
    if (!ids.includes('th-voiceless')) throw new Error('لم يُشخَّص th');
    const broadAt = p.suspects.findIndex(x => x.sound.broad);
    const narrowAt = p.suspects.findIndex(x => !x.sound.broad);
    if (broadAt >= 0 && narrowAt >= 0 && broadAt < narrowAt)
      throw new Error('قاعدة واسعة سبقت صوتاً دقيقاً');
  });

  await run('القواعد الواسعة لا تُطلق إنذاراً على كل كلمة', {}, (ctx, ev) => {
    /* كانت قاعدة ship/sheep تُطابق أي كلمة فيها حرف i فتزاحم التشخيص. */
    const p = ctx.pronScore('I will sit in it', 'I will sit in it');
    if (p.suspects.length) throw new Error('إنذار كاذب على جملة سليمة');
    const q = ctx.pronScore('I have a big dog', 'I have a big dug');
    if (q.suspects.some(x => x.id === 'vowel-i')) throw new Error('ship/sheep أُطلقت بلا داعٍ');
  });

  await run('الكتابة لا تُحتسب نطقاً في المحادثة', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatReply('I am a teacher');
    ctx._els.chatPr.value = 'My name is Ahmed';
    ctx.chatModelTyped();
    const pr = ev('S').chat.pr;
    if (!pr) throw new Error('لم تُسجَّل المحاولة أصلاً');
    if (!pr.typed) throw new Error('لم تُعلَّم المحاولة بأنها مكتوبة');
    const h = ctx.speakView();
    if (!h.includes('لم يُقَس النطق')) throw new Error('الشاشة لا توضّح أن النطق لم يُقَس');
    if (h.includes('دقة النطق')) throw new Error('ادّعت الشاشة قياس نطق لنصّ مكتوب');
  });

  await run('كل وحدة تصدّر ما تستورده الوحدات الأخرى', {}, (ctx, ev) => {
    ['LESSONS','RULES','RULE','SCENES','S','save','bootState','render','penDiff',
     'homeView','courseView','speakView','quizView','launch','pick','nextQ','closeQ',
     'chatReply','chatClamp','checkGrammar','fixText','pronScore','ruleCard','ITEM_RULE']
      .forEach(n => { if (ev(n) === undefined) throw new Error('الاسم غير مُصدَّر: ' + n) });
  });

  console.log('— اختبار تحديد المستوى —');

  await run('اختبار تحديد المستوى يبدأ بلا انهيار', {}, (ctx, ev) => {
    ctx.launch('place');
    const q = ev('S').q;
    if (!q) throw new Error('لم يبدأ الاختبار');
    if (!q.items || q.items.length !== 1) throw new Error('لم يُسحب أول سؤال');
    if (!q.items[0].q) throw new Error('السؤال فارغ');
    if (!ctx.quizView().includes(q.items[0].q)) throw new Error('السؤال لا يظهر على الشاشة');
  });

  await run('المستخدم الجديد يُكمل اختبار تحديد المستوى ويصل إلى النتيجة', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < ctx.PLACE_N; i++) {
      const q = ev('S').q;
      if (q.done) throw new Error('انتهى مبكراً عند ' + i);
      ctx.pick(q.items[q.i].a);
      ctx.nextQ();
    }
    const q = ev('S').q;
    if (!q.done) throw new Error('لم ينتهِ بعد ' + ctx.PLACE_N + ' أسئلة');
    if (!ev('S').placed) throw new Error('لم يُسجَّل تحديد المستوى');
    if (!['A1','A2'].includes(ev('S').level)) throw new Error('مستوى غير صالح: ' + ev('S').level);
    const res = ctx.quizView();
    if (!res.includes('أين أنت من كل وحدة؟')) throw new Error('لا تفصيل لكل وحدة في النتيجة');
    if (!res.includes('startFrom(')) throw new Error('لا زر لبدء الدورة');
    ctx.startFrom(1);
    if (ev('S').q) throw new Error('لم تُغلق شاشة الاختبار');
  });

  await run('اختبار تحديد المستوى لا يكرر سؤالاً', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < ctx.PLACE_N - 1; i++) { ctx.pick(ev('S').q.items[ev('S').q.i].a); ctx.nextQ() }
    const qs = ev('S').q.items.map(x => x.q);
    if (new Set(qs).size !== qs.length) throw new Error('تكرر سؤال داخل الاختبار');
  });

  await run('render يرسم شاشة الاختبار فعلياً لا بطاقة خطأ', {}, (ctx, ev) => {
    ctx.launch('place');
    const html = ctx._els.app.innerHTML;
    if (html.includes('تعذّر عرض هذه الشاشة')) throw new Error('render انهار داخل الاختبار');
    if (!html.includes(ev('S').q.items[0].q)) throw new Error('السؤال لا يظهر في app بعد render');
    if (ctx._logged.some(l => l.includes('رسم الشاشة'))) throw new Error('سُجّل خطأ رسم: ' + ctx._logged.join(' | '));
  });

  await run('render يرسم كل أنواع الاختبارات بلا انهيار',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    [['lesson','1.1'],['cp',1],['exam',null],['conv','c1']].forEach(([k,id]) => {
      ctx.launch(k, id);
      const html = ctx._els.app.innerHTML;
      if (html.includes('تعذّر عرض هذه الشاشة')) throw new Error('انهار الرسم في النوع ' + k);
      if (!html.length) throw new Error('شاشة فارغة في النوع ' + k);
    });
  });

  const finishQuiz = (ctx, ev) => {
    const n = ev('S').q.items.length;
    for (let i = 0; i < n; i++) { ctx.pick(ev('S').q.items[ev('S').q.i].a); ctx.nextQ() }
    ctx.closeQ();
  };

  console.log('— متابعة الرحلة —');

  await run('بعد آخر درس في الوحدة، أعلى المسار يعرض الخطوة التالية لا أولها',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true }, words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      ctx.launch('lesson', '1.3'); finishQuiz(ctx, ev);
      const html = ctx._els.app.innerHTML;
      const iNext = html.indexOf('الخطوة التالية');
      const iFirst = html.indexOf('1.1 —');
      if (iNext < 0) throw new Error('لا بطاقة «الخطوة التالية» في المسار');
      if (iFirst >= 0 && iFirst < iNext) throw new Error('أول الوحدة يسبق الخطوة التالية على الشاشة');
    });

  await run('nextStep تعطي مرساة موجودة فعلاً في صفحة المسار',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true } , words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      const nx = ctx.nextStep();
      if (!nx || !nx.anchor) throw new Error('nextStep بلا مرساة');
      if (!ctx.courseView().includes('id="' + nx.anchor + '"'))
        throw new Error('المرساة ' + nx.anchor + ' غير موجودة في الصفحة');
    });

  await run('إغلاق الاختبار ينقل إلى مرساة الخطوة التالية لا إلى الأعلى',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true }, words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      ctx.launch('lesson', '1.3'); finishQuiz(ctx, ev);
      if (!ctx._scrolledTo) throw new Error('لم يُطلب أي انتقال');
      if (ctx._scrolledTo === 'top') throw new Error('انتقل إلى أعلى الصفحة بدل الخطوة التالية');
      if (!ctx._scrolledTo.startsWith('st-')) throw new Error('مرساة غير متوقعة: ' + ctx._scrolledTo);
    });

  await run('بعد اجتياز بوابة الوحدة واستبقائها، الخطوة التالية هي الوحدة التالية',
    {
      'eng-coach-v3': JSON.stringify({
        placed: true,
        lessons: { '1.1': true, '1.2': true, '1.3': true },
        conv: { c1: true, c2: true },
        skills: { 1: { read: 80, write: 80, dict: 80, tr: 80 } },
        words: WORDS_DONE, scenes: SCENES_DONE,
        cp: { 1: true }
      })
    },
    (ctx, ev) => {
      ctx.launch('ret', 1); finishQuiz(ctx, ev);
      const nx = ctx.nextStep();
      if (!nx) throw new Error('لا خطوة تالية بعد إتمام الوحدة 1');
      if (!nx.label.includes('2.1')) throw new Error('الخطوة التالية ليست أول الوحدة 2: ' + nx.label);
      const html = ctx._els.app.innerHTML;
      if (!html.includes('الخطوة التالية')) throw new Error('لا بطاقة متابعة بعد إتمام الوحدة');
    });

  console.log('— مشاهد المحادثة —');

  await run('كل إجابة نموذجية يقبلها شرطها', {}, (ctx, ev) => {
    const bad = [];
    ev('SCENES').forEach(sc => sc.turns.forEach((t, i) => {
      if (!t.need.test(t.model)) bad.push(sc.t + ' #' + (i + 1) + ': «' + t.model + '»');
    }));
    if (bad.length) throw new Error('إجابة نموذجية يرفضها التطبيق: ' + bad.join(' / '));
  });

  await run('كل مشهد مكتمل البنية', {}, (ctx, ev) => {
    const names = new Set();
    ev('SCENES').forEach(sc => {
      if (!sc.t) throw new Error('مشهد بلا عنوان');
      if (names.has(sc.t)) throw new Error('عنوان مشهد مكرر: ' + sc.t);
      names.add(sc.t);
      if (!sc.turns || sc.turns.length < 3) throw new Error(sc.t + ': أقل من ثلاثة أدوار');
      sc.turns.forEach((t, i) => {
        if (!t.p) throw new Error(sc.t + ' #' + (i + 1) + ': لا سؤال');
        if (!(t.need instanceof RegExp)) throw new Error(sc.t + ' #' + (i + 1) + ': need ليس regex');
        if (!t.model) throw new Error(sc.t + ' #' + (i + 1) + ': لا إجابة نموذجية');
      });
    });
  });

  await run('تغطية أماكن الحياة اليومية', {}, (ctx, ev) => {
    const titles = ev('SCENES').map(s => s.t).join(' | ');
    ['المواصلات', 'النادي', 'المدرسة', 'السوبر ماركت', 'الطبيب', 'الفندق', 'الجيران', 'العمل', 'المقهى', 'المطعم', 'المطار']
      .forEach(p => { if (!titles.includes(p)) throw new Error('لا مشهد عن: ' + p) });
  });

  await run('كل مشهد مصنَّف، والتصنيفات معروفة', {}, (ctx, ev) => {
    const known = ['درس','يومي','اجتماعي','تسوّق','سفر','صحة','عمل'];
    ev('SCENES').forEach(sc => {
      if (!sc.cat) throw new Error('مشهد بلا تصنيف: ' + sc.t);
      if (!known.includes(sc.cat)) throw new Error(sc.t + ': تصنيف مجهول ' + sc.cat);
    });
  });

  await run('شريط التصنيفات يرشّح المشاهد', {}, (ctx, ev) => {
    ctx.go('speak');
    const all = ctx.speakView();
    ctx.chatCat('صحة');
    const health = ctx.speakView();
    if (!health.includes('عند الطبيب')) throw new Error('مشهد صحي مفقود بعد الترشيح');
    if (health.includes('في البنك')) throw new Error('مشهد من تصنيف آخر ظهر');
    if (all.length <= health.length) throw new Error('الترشيح لم يقلّل القائمة');
    ctx.chatCat('الكل');
    if (!ctx.speakView().includes('في البنك')) throw new Error('«الكل» لا يعرض كل المشاهد');
  });

  await run('اختيار مشهد لا يفقد المتعلم مكانه', {}, (ctx, ev) => {
    ctx.chatCat('سفر');
    const i = ev('SCENES').findIndex(x => x.t === 'في المطار');
    ctx.chatPick(i);
    if (ev('S').chat.sc !== i) throw new Error('لم يُختر المشهد');
    if (!ctx.speakView().includes('في المطار')) throw new Error('المشهد المختار اختفى من الشريط');
  });

  console.log('— اقتراح نقطة البداية —');

  await run('إتقان الوحدات الأولى يقترح البدء من بعدها', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < ctx.PLACE_N; i++) {
      const q = ev('S').q, it = q.items[q.i], u = ctx.unitOf(it);
      ctx.pick(u === 1 || u === 2 ? it.a : (it.a === 0 ? 1 : 0));   // أتقن 1 و2 وأخطأ الباقي
      ctx.nextQ();
    }
    const p = ev('S').place;
    if (!p.acc) throw new Error('لا دقة لكل وحدة');
    if (!p.suggest || p.suggest < 2) throw new Error('لم يُقترح تخطٍّ رغم الإتقان: ' + p.suggest);
    if (!ctx.quizView().includes('نقترح أن تبدأ من الوحدة')) throw new Error('لا اقتراح على الشاشة');
  });

  await run('الضعف في الوحدة الأولى يبدأ من الأول', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < ctx.PLACE_N; i++) {
      const q = ev('S').q, it = q.items[q.i];
      ctx.pick(it.a === 0 ? 1 : 0);   // أخطئ في كل شيء
      ctx.nextQ();
    }
    if (ev('S').place.suggest !== 1) throw new Error('اقترح تخطياً رغم الضعف');
    if (!ctx.quizView().includes('نبدأ من البداية')) throw new Error('لا رسالة بدء من الأول');
  });

  await run('التخطي يفتح الوحدة ولا يدّعي إتمامها',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startFrom(2);
    const S = ev('S');
    if (!S.skipped[1]) throw new Error('لم تُسجَّل الوحدة 1 متخطّاة');
    if (S.cp[1] || S.lessons['1.1']) throw new Error('ادّعى إتمام ما لم يُنجَز');
    if (!ctx.unitOpen(2)) throw new Error('الوحدة 2 ما زالت مقفلة');
    const nx = ctx.nextStep();
    if (!nx || !nx.label.includes('2.1')) throw new Error('الخطوة التالية ليست أول الوحدة 2: ' + (nx && nx.label));
    const html = ctx.courseView();
    if (!html.includes('تخطّيتها بالاختبار')) throw new Error('لا توضيح أن الوحدة متخطّاة');

    /* والوحداتُ مطويّةٌ إلّا التي عليها الدور، فلا يُطلَب ظهورُ
       محطّاتها في الصفحة ابتداءً — بل أن تكون مفتوحةَ المنال:
       لها بطاقةٌ وزرُّ فتحٍ يُظهر محطّاتها. */
    if (!html.includes('toggleUnit(1)'))
      throw new Error('الوحدة المتخطّاة اختفت: لا بطاقةَ لها ولا زرَّ فتح');
    ctx.toggleUnit(1);
    if (!ctx.courseView().includes('الدرس 1.1'))
      throw new Error('فُتحت الوحدة المتخطّاة فلم تَظهر محطّاتُها');
  });

  await run('كل تمرين موسوم بمهارة معروفة', {}, (ctx, ev) => {
    const known = Object.keys(ev('SKILL_UNIT'));
    ev('LESSONS').forEach(l => l.items.forEach((it, i) => {
      const sk = ctx.skillOf(it);
      if (!sk) throw new Error(l.id + '#' + (i + 1) + ': بلا مهارة');
      if (!known.includes(sk)) throw new Error(l.id + '#' + (i + 1) + ': مهارة مجهولة ' + sk);
      if (ctx.unitOf(it) !== l.u) throw new Error(l.id + '#' + (i + 1) + ': وحدة خاطئة');
    }));
  });

  console.log('— التدريب الموجَّه عند الرسوب —');

  /* حالة: الوحدة 1 جاهزة لبوابتها */
  /* وحدةٌ أُتمّت محطّاتُها كلُّها: مفرداتٌ ودروسٌ ومحادثةٌ ومهارات.
     والمفرداتُ والمهاراتُ أُضيفتا حين صارتا محطّتين في المسار. */
  const READY = JSON.stringify({
    placed: true,
    words: WORDS_DONE, scenes: SCENES_DONE,
    lessons: { '1.1': true, '1.2': true, '1.3': true },
    conv: { c1: true, c2: true },
    skills: { 1: { read: 80, write: 80, dict: 80, tr: 80 } }
  });

  const failGate = (ctx, ev, kind) => {
    ctx.launch(kind, 1);
    const n = ev('S').q.items.length;
    for (let i = 0; i < n; i++) {
      const it = ev('S').q.items[ev('S').q.i];
      ctx.pick(it.a === 0 ? 1 : 0);          // أخطئ في كل شيء
      ctx.nextQ();
    }
  };

  await run('الرسوب في البوابة يُنشئ تدريباً من المهارات التي سقط فيها',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      const d = ev('S').drill;
      if (!d) throw new Error('لم يُنشأ تدريب بعد الرسوب');
      if (d.unit !== 1) throw new Error('تدريب لوحدة خاطئة: ' + d.unit);
      if (!d.skills.length) throw new Error('تدريب بلا مهارات');
      const wrongSkills = new Set(ev('S').q.wrong.map(it => ctx.skillOf(it)));
      d.skills.forEach(sk => { if (!wrongSkills.has(sk)) throw new Error('مهارة لم يخطئ فيها: ' + sk) });
    });

  await run('شاشة الرسوب توجّه إلى التدريب لا إلى إعادة الاختبار',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      const html = ctx.quizView();
      if (!html.includes("launch('drill'")) throw new Error('لا زر تدريب على شاشة الرسوب');
      if (html.includes('retryQ()')) throw new Error('ما زال يعرض «أعد المحاولة» مباشرة');
    });

  await run('البوابة تُستبدل بالتدريب حتى يُجتاز',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      ctx.closeQ();
      const course = ctx.courseView();
      if (!course.includes('درّبني على ما أخطأت فيه')) throw new Error('البوابة لا تعرض التدريب');
      if (course.includes("launch('cp',1)")) throw new Error('ما زال يمكن إعادة الاختبار قبل التدريب');
      const nx = ctx.nextStep();
      if (!nx || !nx.label.includes('تدريب')) throw new Error('الخطوة التالية ليست التدريب: ' + (nx && nx.label));
    });

  await run('التدريب يسحب من المهارات المطلوبة وحدها',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      ctx.closeQ();
      const skills = ev('S').drill.skills;
      ctx.launch('drill', 1);
      const items = ev('S').q.items;
      if (!items.length) throw new Error('تدريب بلا تمارين');
      items.forEach(it => {
        if (skills.indexOf(ctx.skillOf(it)) < 0)
          throw new Error('تمرين خارج المهارات المطلوبة: ' + ctx.skillOf(it));
      });
    });

  await run('اجتياز التدريب يفتح البوابة من جديد',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      ctx.closeQ();
      ctx.launch('drill', 1);
      const n = ev('S').q.items.length;
      for (let i = 0; i < n; i++) { ctx.pick(ev('S').q.items[ev('S').q.i].a); ctx.nextQ() }
      if (!ev('S').q.pass) throw new Error('لم يُحتسب اجتياز التدريب');
      if (ev('S').drill) throw new Error('التدريب لم يُغلق بعد اجتيازه');
      ctx.closeQ();
      if (!ctx.courseView().includes("launch('cp',1)")) throw new Error('البوابة لم تُفتح من جديد');
    });

  await run('الخطأ في التدريب يُبقيه مفتوحاً',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      failGate(ctx, ev, 'cp');
      ctx.closeQ();
      ctx.launch('drill', 1);
      const n = ev('S').q.items.length;
      for (let i = 0; i < n; i++) {
        const it = ev('S').q.items[ev('S').q.i];
        ctx.pick(i === 0 ? (it.a === 0 ? 1 : 0) : it.a);   // خطأ واحد يكفي
        ctx.nextQ();
      }
      if (ev('S').q.pass) throw new Error('اجتاز التدريب رغم خطأ');
      if (!ev('S').drill) throw new Error('أُغلق التدريب رغم الإخفاق');
    });

  await run('اجتياز البوابة من أول مرة لا يُنشئ تدريباً',
    { 'eng-coach-v3': READY }, (ctx, ev) => {
      ctx.launch('cp', 1);
      const n = ev('S').q.items.length;
      for (let i = 0; i < n; i++) { ctx.pick(ev('S').q.items[ev('S').q.i].a); ctx.nextQ() }
      if (ev('S').drill) throw new Error('أُنشئ تدريب رغم النجاح');
      if (!ev('S').cp[1]) throw new Error('لم تُسجَّل البوابة');
    });

  console.log('— الأيقونة والتثبيت —');

  await run('لون شريط المتصفح يتبع الوضع', {}, (ctx, ev) => {
    if (ctx._meta.content !== '#F6F5FB') throw new Error('لون نهاري خاطئ: ' + ctx._meta.content);
    ctx.toggleTheme();
    if (ctx._meta.content !== '#0B0D1C') throw new Error('لم يتبدّل مع الوضع الليلي: ' + ctx._meta.content);
  });

  console.log('— الإعدادات —');

  await run('شاشة الإعدادات تعرض كل الأقسام',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.go('settings');
    const h = ctx._els.app.innerHTML;
    ['المظهر','هدف الكلام','نقل تقدّمك','إعادة البداية','عن التطبيق']
      .forEach(t => { if (!h.includes(t)) throw new Error('قسم مفقود: ' + t) });
  });

  await run('تبديل الوضع من الإعدادات يُحفظ', {}, (ctx, ev) => {
    ctx.setTheme('dark');
    if (ev('S').theme !== 'dark') throw new Error('لم يتبدّل');
    if (!ctx._store['eng-coach-v3'].includes('"theme":"dark"')) throw new Error('لم يُحفظ');
  });

  await run('الاستيراد يستعيد تقدّماً كاملاً', {}, (ctx, ev) => {
    const file = JSON.stringify({ placed: true, xp: 340, lessons: { '1.1': true, '1.2': true }, cp: { 1: true }, level: 'A1' });
    if (!ctx.applyImport(file)) throw new Error('رُفض ملف سليم');
    const S = ev('S');
    if (S.xp !== 340) throw new Error('ضاعت النقاط: ' + S.xp);
    if (!S.lessons['1.2']) throw new Error('ضاع تقدّم الدروس');
    if (!ctx._store['eng-coach-v3'].includes('340')) throw new Error('لم يُحفظ المستورَد');
  });

  await run('الاستيراد يرفض ملفاً تالفاً ولا يمسح التقدّم',
    { 'eng-coach-v3': JSON.stringify({ placed: true, xp: 120 }) }, (ctx, ev) => {
    if (ctx.applyImport('{ليس JSON')) throw new Error('قبل ملفاً تالفاً');
    if (ev('S').xp !== 120) throw new Error('مُحي التقدّم بسبب ملف تالف');
    if (!ctx._els.toast.textContent.includes('غير صالح')) throw new Error('لا رسالة للمستخدم');
  });

  await run('الاستيراد يمرّ بالتحقق كأي حالة محفوظة', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ xp: 'كثير', level: '<img src=x>', open: '9.9', tab: 'hacked' }));
    const S = ev('S');
    if (S.xp !== 0) throw new Error('قَبِل xp غير رقمي');
    if (S.level !== 'A1') throw new Error('قَبِل مستوى مجهول');
    if (S.open !== null) throw new Error('قَبِل درساً غير موجود');
    if (S.tab !== 'home') throw new Error('قَبِل تبويباً غير صالح');
  });

  console.log('— ملف مستورَد خبيث —');

  /* الاستيراد حوّل الحالة المحفوظة من ذاكرة المتصفح إلى ملف قد يصل المتعلم
     من شخص آخر. كل حقل يُعرض في الصفحة صار مدخلاً غير موثوق. */
  const EVIL = '<img src=x onerror=alert(1)>';

  const renderedAll = ctx => [
    ctx.homeView(), ctx.courseView(), ctx.speakView(), ctx._els.app.innerHTML
  ].join(' ');

  await run('مفاتيح errs المُلفَّقة لا تصل إلى الصفحة', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, errs: { [EVIL]: 9 } }));
    if (Object.keys(ev('S').errs).includes(EVIL)) throw new Error('قُبل مفتاح مجهول في errs');
    if (renderedAll(ctx).includes('<img src=x')) throw new Error('وسم خام وصل إلى الصفحة');
  });

  await run('مهارات drill المُلفَّقة لا تصل إلى الصفحة',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true, '1.3': true }, conv: { c1: true, c2: true } }) },
    (ctx, ev) => {
      ctx.applyImport(JSON.stringify({
        placed: true,
        lessons: { '1.1': true, '1.2': true, '1.3': true }, conv: { c1: true, c2: true },
        drill: { unit: 1, skills: [EVIL, 'be-subject'] }
      }));
      const d = ev('S').drill;
      if (d && d.skills.includes(EVIL)) throw new Error('قُبلت مهارة مجهولة');
      if (renderedAll(ctx).includes('<img src=x')) throw new Error('وسم خام وصل إلى الصفحة');
    });

  await run('drill.unit المُلفَّق لا يُحقن في onclick', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({
      placed: true, drill: { unit: "1);alert(1)//", skills: ['be-subject'] }
    }));
    const d = ev('S').drill;
    if (d && typeof d.unit !== 'number') throw new Error('unit ليس رقماً: ' + JSON.stringify(d.unit));
    if (renderedAll(ctx).includes('alert(1)')) throw new Error('حُقنت شيفرة في معالج مضمَّن');
  });

  await run('place.suggest المُلفَّق لا يُحقن في onclick', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, place: { suggest: "2);alert(1)//", acc: {} } }));
    ctx.launch('place');
    ev('S.q.done=true');
    if (ctx.quizView().includes('alert(1)')) throw new Error('حُقنت شيفرة في شاشة النتيجة');
  });

  await run('نصوص المحادثة اللحظية لا تُستورد إطلاقاً', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({
      placed: true, tab: 'speak',
      chat: { sc: 0, ti: 0, stage: 'fb', fb: EVIL, said: EVIL, fixed: EVIL, g: [{ ar: EVIL }] }
    }));
    const c = ev('S').chat;
    if (c.fb || c.said || c.fixed || c.g) throw new Error('استُورد نصّ لحظي');
    if (c.stage !== 'reply') throw new Error('استُوردت مرحلة تغذية راجعة بلا بياناتها');
    if (renderedAll(ctx).includes('<img src=x')) throw new Error('وسم خام وصل إلى الصفحة');
  });

  await run('مفاتيح التقدّم المجهولة تُسقَط', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({
      placed: true,
      lessons: { '1.1': true, '9.9': true, [EVIL]: true },
      cp: { 1: true, 99: true }, skipped: { 2: true, 77: true }
    }));
    const S = ev('S');
    if (S.lessons['9.9'] || S.lessons[EVIL]) throw new Error('قُبل درس مجهول');
    if (!S.lessons['1.1']) throw new Error('ضاع درس صحيح');
    if (S.cp['99'] || S.skipped['77']) throw new Error('قُبلت وحدة مجهولة');
    if (!S.cp['1'] || !S.skipped['2']) throw new Error('ضاعت وحدة صحيحة');
  });

  await run('esc يهرّب كل المحارف الخطرة', {}, (ctx, ev) => {
    const out = ctx.esc('<a href="x" onclick=\'y\'>&</a>');
    ['<', '>', '"', "'"].forEach(ch => { if (out.includes(ch)) throw new Error('لم يُهرَّب: ' + ch) });
    if (!out.includes('&amp;')) throw new Error('لم تُهرَّب &');
  });

  console.log('— اختبار الترجمة —');

  const TR_ITEM = ctx => ctx.TRANSLATE ? null : null;

  await run('كل جملة لها صيغة مقبولة واحدة على الأقل، والأولى نموذجية', {}, (ctx, ev) => {
    ev('TRANSLATE').forEach((t, i) => {
      if (!t.ar || !/[؀-ۿ]/.test(t.ar)) throw new Error('#' + i + ': لا جملة عربية');
      if (!Array.isArray(t.en) || !t.en.length) throw new Error(t.ar + ': لا ترجمة مقبولة');
      if (!ev('UNIT_NS').includes(t.u)) throw new Error(t.ar + ': وحدة خاطئة');
      if (!Object.keys(ev('RULE')).includes(t.skill)) throw new Error(t.ar + ': مهارة مجهولة ' + t.skill);
    });
  });

  await run('كل صيغة مقبولة تحصل على 100٪', {}, (ctx, ev) => {
    ev('TRANSLATE').forEach(t => t.en.forEach(acc => {
      const g = ctx.gradeOne(t, acc);
      if (g.score !== 100) throw new Error(t.ar + ' / «' + acc + '» → ' + g.score + '٪ وهي صيغة مقبولة');
    }));
  });

  await run('الدرجة تميّز بين درجات الخطأ', {}, (ctx, ev) => {
    const it = ev('TRANSLATE').find(t => t.ar === 'أنا طالب.');
    const sc = x => ctx.gradeOne(it, x).score;
    const exact = sc('I am a student.'), article = sc('I am student.');
    const copula = sc('I student.'), other = sc('He is a teacher.'), empty = sc('');
    if (exact !== 100) throw new Error('التطابق التام ليس 100: ' + exact);
    if (!(exact > article)) throw new Error('نقص الأداة لم يُخصم');
    if (!(article > copula)) throw new Error('حذف فعل الكون ليس أسوأ من نقص الأداة');
    if (!(copula > other)) throw new Error('جملة أخرى تماماً ليست أسوأ من حذف الفعل');
    if (empty !== 0) throw new Error('الفارغة ليست صفراً');
  });

  await run('جملة سليمة لكنها ليست المطلوبة لا تُنقَذ بالجرامر', {}, (ctx, ev) => {
    const it = ev('TRANSLATE').find(t => t.ar === 'أنا طالب.');
    const g = ctx.gradeOne(it, 'He is a teacher.');
    if (g.grammar < 90) throw new Error('الجملة سليمة جرامرياً فعلاً');
    if (g.score > 35) throw new Error('الجرامر أنقذ جملة خاطئة: ' + g.score + '٪');
  });

  await run('الاختبار يوزّع الجمل على الوحدات', {}, (ctx, ev) => {
    const items = ctx.pickTranslation(6, 3);
    if (items.length !== 6) throw new Error('عدد خاطئ: ' + items.length);
    if (new Set(items.map(i => i.ar)).size !== 6) throw new Error('جملة مكررة');
    if (new Set(items.map(i => i.u)).size < 3) throw new Error('لم تُغطَّ الوحدات الثلاث');
  });

  await run('دورة الاختبار كاملة حتى النسبة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startTranslation(3);
    for (let i = 0; i < ctx.TRANSLATE_N; i++) {
      const t = ev('S').tr;
      ctx._els.trInput.value = t.items[t.i].en[0];     // أجب صحيحاً
      ctx.submitTranslation();
      if (!ev('S').tr.graded) throw new Error('لم تُقيَّم الجملة ' + i);
      ctx.nextTranslation();
    }
    const t = ev('S').tr;
    if (!t.done) throw new Error('لم ينتهِ الاختبار');
    if (t.summary.percent !== 100) throw new Error('إجابات صحيحة ونسبتها ' + t.summary.percent);
    const html = ctx.translateView();
    if (!html.includes('نتيجة الترجمة')) throw new Error('لا شاشة نتيجة');
    if (!html.includes('حسب المهارة')) throw new Error('لا تفصيل بالمهارة');
  });

  await run('جملة فارغة لا تُقبل', {}, (ctx, ev) => {
    ctx.startTranslation(3);
    ctx._els.trInput.value = '   ';
    ctx.submitTranslation();
    if (ev('S').tr.graded) throw new Error('قُيّمت جملة فارغة');
    if (!ctx.translateView().includes('اكتب ترجمتك أولاً')) throw new Error('لا تنبيه');
  });

  await run('اختبار الترجمة لا يُستورد من ملف', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, tr: { items: [], results: [], done: true } }));
    if (ev('S').tr) throw new Error('استُوردت جلسة اختبار');
  });

  await run('قلم المصحّح يظهر للجملة القريبة فقط',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startTranslation(3);
    const t = ev('S').tr, it = t.items[0];
    // قريبة: نحذف كلمة واحدة من الصيغة المقبولة
    ctx._els.trInput.value = it.en[0].split(' ').slice(1).join(' ');
    ctx.submitTranslation();
    if (!ctx.translateView().includes('class="fix"')) throw new Error('لا تصحيح لجملة قريبة');
    ev('S.tr.graded=null');
    // بعيدة تماماً
    ctx._els.trInput.value = 'zzz qqq www';
    ctx.submitTranslation();
    const h = ctx.translateView();
    if (h.includes('class="fix"')) throw new Error('عُرض تصحيح متراكم لجملة لا تشترك مع الصواب');
    if (!h.includes('zzz qqq www')) throw new Error('لم تُعرض محاولته');
  });

  await run('المسار لا يسأل عن تحديد المستوى بعد أدائه',
    { 'eng-coach-v3': JSON.stringify({ placed: true, skipped: { 1: true, 2: true }, place: { suggest: 3, acc: {} } }) },
    (ctx, ev) => {
      const h = ctx.courseView();
      if (h.includes('تحديد المستوى')) throw new Error('ما زال يعرض اختبار تحديد المستوى في المسار');
      if (!ctx.settingsView().includes('أعد تحديد نقطة البداية')) throw new Error('لا إعادة في الإعدادات');
    });

  await run('الوحدة المتخطّاة بلا محطة حالية',
    { 'eng-coach-v3': JSON.stringify({ placed: true, skipped: { 1: true, 2: true }, words: WORDS_DONE, scenes: SCENES_DONE }) },
    (ctx, ev) => {
      const h = ctx.courseView();
      const nows = (h.match(/dot now/g) || []).length;
      if (nows !== 1) throw new Error('عدد المحطات الحالية ' + nows + ' والمتوقع واحدة فقط');
      const nx = ctx.nextStep();
      if (!nx.anchor.includes('3.1')) throw new Error('المحطة الحالية ليست في الوحدة 3: ' + nx.anchor);

      /* ومحطّاتُ المتخطّاة تُقرأ بعد فتحها، فالوحداتُ مطويّة. */
      ctx.toggleUnit(1);
      if (!ctx.courseView().includes('متاح للمراجعة'))
        throw new Error('لا توضيح أن دروس الوحدة المتخطّاة للمراجعة');
    });

  console.log('— صدق القياس —');

  await run('الكتابة في اختبار المحادثة لا تُسجَّل درجة نطق',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('conv', 'c1');
    ctx.pick(ev('S').q.items[0].a);
    ctx._els.ctxt2.value = ev('S').q.items[0].o[ev('S').q.items[0].a];
    ctx.typed2();
    const q = ev('S').q;
    if (q.spoke !== null) throw new Error('سُجّلت درجة نطق لنصّ مكتوب: ' + q.spoke);
    if (!q.typed) throw new Error('لم تُعلَّم المحاولة بأنها مكتوبة');
    if (!ctx.quizView().includes('لم يُقَس النطق')) throw new Error('الشاشة لا توضّح ذلك');
  });

  await run('النطق الحقيقي يُسجَّل درجةً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('conv', 'c1');
    const it = ev('S').q.items[0];
    ctx.pick(it.a);
    ctx.speakTurn(it.o[it.a]);          // كما لو نطقها
    const q = ev('S').q;
    if (q.spoke !== 100) throw new Error('لم تُسجَّل درجة النطق: ' + q.spoke);
    if (q.typed) throw new Error('عُلّمت كمكتوبة وهي منطوقة');
  });

  await run('كل محاولة في البوابة تُسجَّل',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true, '1.3': true }, conv: { c1: true, c2: true } }) },
    (ctx, ev) => {
      const fail = () => {
        ctx.launch('cp', 1);
        const n = ev('S').q.items.length;
        for (let i = 0; i < n; i++) { const it = ev('S').q.items[ev('S').q.i]; ctx.pick(it.a === 0 ? 1 : 0); ctx.nextQ() }
      };
      fail();
      if (ev('S').attempts.cp1 !== 1) throw new Error('لم تُسجَّل المحاولة الأولى');
      if (ev('S').q.attempt !== 1) throw new Error('رقم المحاولة لا يظهر في النتيجة');
      ctx.closeQ();
      fail();
      if (ev('S').attempts.cp1 !== 2) throw new Error('لم تُسجَّل المحاولة الثانية: ' + ev('S').attempts.cp1);
      if (!ctx.quizView().includes('المحاولة')) throw new Error('رقم المحاولة لا يُعرض');
    });

  await run('عدد المحاولات يُستورد محقَّقاً', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, attempts: { cp1: 4, hack: 9, cp2: 'كثير' } }));
    const a = ev('S').attempts;
    if (a.cp1 !== 4) throw new Error('ضاع عدد صحيح');
    if ('hack' in a) throw new Error('قُبل مفتاح مجهول');
    if ('cp2' in a) throw new Error('قُبلت قيمة غير عددية');
  });

  console.log('— تدريب الأصوات —');

  await run('بنك الأصوات مكتمل', {}, (ctx, ev) => {
    const S2 = ev('SOUNDS');
    if (S2.length < 8) throw new Error('بنك صغير: ' + S2.length);
    const ids = new Set();
    S2.forEach(s => {
      ['id','t','why','fix','bad'].forEach(k => { if (!s[k]) throw new Error(s.id + ': الحقل ' + k + ' ناقص') });
      if (!/[؀-ۿ]/.test(s.why)) throw new Error(s.id + ': الشرح ليس بالعربية');
      if (!(s.test instanceof RegExp)) throw new Error(s.id + ': test ليس regex');
      if (!Array.isArray(s.pairs) || s.pairs.length < 4) throw new Error(s.id + ': أزواج قليلة');
      s.pairs.forEach(p => { if (!Array.isArray(p) || p.length !== 2 || p[0] === p[1]) throw new Error(s.id + ': زوج غير صالح') });
      if (ids.has(s.id)) throw new Error('معرّف مكرر: ' + s.id);
      ids.add(s.id);
    });
  });

  await run('كل صوت يُطابق كلماته هو', {}, (ctx, ev) => {
    ev('SOUNDS').forEach(s => {
      const first = s.pairs[0][0];
      if (!s.test.test(first)) throw new Error(s.id + ': لا يُطابق كلمته «' + first + '»');
    });
  });

  await run('التدريب يميّز الكلمة المنطوقة من أختها',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('p');
    const pair = ev("SOUND['p'].pairs")[0];      // ['pen','Ben']
    ctx.soundHeard(pair[0]);
    if (ev('S').snd.slots['0:0'] !== 'ok') throw new Error('لم يُحتسب الصحيح');
    ctx.soundNext();
    ctx.soundHeard(pair[0]);                     // والمطلوب الآن الأخرى
    if (ev('S').snd.slots['0:1'] !== 'swapped') throw new Error('لم يرصد نطق الكلمة الأخرى');
    if (!ctx.soundsView().includes('سمعتُ')) throw new Error('لا تغذية راجعة على الشاشة');
  });

  await run('العبارة حول الكلمة لا تُحسب خطأ',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('p');
    const want = ev("SOUND['p'].pairs")[0][0];
    ctx.soundHeard('a ' + want + ' please');     // المحرّك يردّ عبارة أحياناً
    if (ev('S').snd.slots['0:0'] !== 'ok') throw new Error('عُوقب نطق سليم داخل عبارة');
  });

  await run('الصمت يُفرَّق عن النطق غير الواضح',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('p');
    ctx.soundHeard('   ');
    if (ev('S').snd.slots['0:0'] !== 'silent') throw new Error('الصمت حُسب نطقاً خاطئاً');
    const h = ctx.soundsView();
    if (!h.includes('لم يصل صوت')) throw new Error('لا رسالة عن غياب الصوت');
    if (h.includes('«»')) throw new Error('عرض اقتباساً فارغاً');
  });

  await run('الإعادة تستبدل ولا تخفض النتيجة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('p');
    const pairs = ev("SOUND['p'].pairs");
    ctx.soundHeard(pairs[0][1]);                 // أخطأ
    ctx.soundHeard(pairs[0][1]);                 // وأخطأ
    ctx.soundHeard(pairs[0][0]);                 // ثم أصاب
    const d = ev('S').snd;
    if (Object.keys(d.slots).length !== 1) throw new Error('المحاولات تُجمع: ' + Object.keys(d.slots).length);
    if (d.slots['0:0'] !== 'ok') throw new Error('الإعادة لم تستبدل');
    const r = ctx.soundResult(d);
    if (r.total !== pairs.length * 2) throw new Error('المقام ليس عدد المطالبات');
    if (r.ok !== 1) throw new Error('عدّ الصحيح خطأ');
  });

  await run('نتيجة متأخّرة بعد إنهاء التدريب تُهمَل',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('p');
    ctx.closeSound();
    ctx.startSound('v');                         // جلسة جديدة
    ctx.soundHeard('pen', 0);                    // نتيجة الجلسة القديمة تصل الآن
    const d = ev('S').snd;
    if (d.id !== 'v') throw new Error('تغيّر الصوت');
    if (Object.keys(d.slots).length) throw new Error('سُجّلت نتيجة جلسة منتهية');
  });

  await run('التدريب ينتهي بنسبة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.startSound('v');
    const pairs = ev("SOUND['v'].pairs");
    for (let i = 0; i < pairs.length * 2; i++) {
      const d = ev('S').snd;
      ctx.soundHeard(pairs[d.i][d.side]);
      ctx.soundNext();
    }
    if (!ev('S').snd.done) throw new Error('لم ينتهِ');
    const h = ctx.soundsView();
    if (!h.includes('٪')) throw new Error('لا نسبة');
    if (!h.includes('أعد التدريب')) throw new Error('لا إعادة');
  });

  await run('الصمت لا يُعرض كصفر في تقييم النطق', {}, (ctx, ev) => {
    const p = ctx.pronScore('I am a teacher', '');
    if (!p.nothing) throw new Error('لم يُعلَّم الصمت');
    const h = ctx.pronHtml(p);
    if (h.includes('٪')) throw new Error('عرض نسبة على صمت: ' + h);
    if (!h.includes('لم يصل صوت')) throw new Error('لا رسالة');
  });

  await run('th المهموس والمجهور لا يختلطان', {}, (ctx, ev) => {
    const voiceless = ev("SOUND['th-voiceless'].test"), voiced = ev("SOUND['th-voiced'].test");
    [['think', true, false], ['path', true, false], ['this', false, true],
     ['father', false, true], ['with', false, true]].forEach(([w, a, b]) => {
      if (voiceless.test(w) !== a) throw new Error(w + ': المهموس خطأ');
      if (voiced.test(w) !== b) throw new Error(w + ': المجهور خطأ');
    });
    const sus = ctx.pronScore('I think this is good', 'I sink dis is good').suspects.map(x => x.id);
    if (!sus.includes('th-voiceless') || !sus.includes('th-voiced')) throw new Error('لم يفصل: ' + sus);
  });

  await run('تدريب الأصوات لا يُستورد من ملف', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, snd: { id: 'p', i: 0, results: [] } }));
    if (ev('S').snd) throw new Error('استُوردت جلسة تدريب');
  });

  await run('التشديد يُشدّد ولا يسمح بوسم', {}, (ctx, ev) => {
    const out = ctx.emph('قل **ب** بلا صوت');
    if (!out.includes('<b>ب</b>')) throw new Error('لم يُشدّد: ' + out);
    if (out.includes('**')) throw new Error('بقيت النجمات');
    const bad = ctx.emph('<img src=x onerror=alert(1)> و**كذا**');
    if (bad.includes('<img')) throw new Error('نفذ وسم: ' + bad);
    if (!bad.includes('<b>كذا</b>')) throw new Error('فقد التشديد بعد التهريب');
  });

  console.log('— اختبار المحادثة الكاملة —');

  await run('مشاهد الاختبار محجوزة ولا تتداخل مع التدريب', {}, (ctx, ev) => {
    const X = ev('EXAM_SCENES'), trained = ev('SCENES');
    if (X.length < 5) throw new Error('مشاهد قليلة: ' + X.length);
    const prompts = new Set();
    trained.forEach(s => s.turns.forEach(t => prompts.add(t.p)));
    X.forEach(x => {
      if (x.turns.length < 8) throw new Error(x.id + ': أدوار قليلة ' + x.turns.length);
      x.turns.forEach(t => {
        if (prompts.has(t.p)) throw new Error(x.id + ': سؤال مكرر من التدريب «' + t.p + '»');
        if (!(t.need instanceof RegExp)) throw new Error(x.id + ': need ليس regex');
        if (!t.need.test(t.model)) throw new Error(x.id + ': النموذج نفسه لا يمرّ «' + t.model + '»');
      });
    });
  });

  await run('الرُبريك: الصلة والنحو والوضوح والطلاقة', {}, (ctx, ev) => {
    const turn = {p: 'Do you have any bags?', need: /yes|no/i, want: ['yes']};
    const good = ctx.scoreTurn(turn, 'Yes, I have two bags', 0.95, 2000);
    if (good.rel !== 100) throw new Error('الصلة لم تُحتسب');
    if (good.fl < 80) throw new Error('طلاقة منخفضة لرد جيد سريع: ' + good.fl);
    const off = ctx.scoreTurn(turn, 'The weather is nice today', 0.9, 3000);
    /* جملة تامّة لكنّها لا تمسّ السؤال: درجة قليلة لا صفر ولا نصف. */
    if (off.rel > 30) throw new Error('رد خارج الموضوع أخذ أكثر ممّا يستحقّ: ' + off.rel);
    if (off.rel >= good.rel) throw new Error('لم يُفرّق بين المجيب والخارج عن الموضوع');
    const slow = ctx.scoreTurn(turn, 'Yes', 0.9, 20000);
    if (slow.fl >= good.fl) throw new Error('البطء والاختصار لم يخفضا الطلاقة');
    const typed = ctx.scoreTurn(turn, 'Yes, two bags', null, 2000);
    if (typed.cl !== null) throw new Error('قيس النطق على نصّ مكتوب');
  });

  await run('الكلمات المتوقّعة ترفع ولا تخفض', {}, (ctx, ev) => {
    const turn = {need: /yes/i, want: ['passport', 'here']};
    const withWords = ctx.scoreTurn(turn, 'yes here is my passport', 0.6, 2000).cl;
    const without = ctx.scoreTurn(turn, 'yes of course take it', 0.6, 2000).cl;
    if (withWords < without) throw new Error('الكلمات المتوقّعة خفضت الدرجة');
    if (without < 60) throw new Error('عوقب من أجاب بكلمات أخرى: ' + without);
  });

  await run('الأوزان تُعاد قسمتها حين يسقط محور', {}, (ctx, ev) => {
    const turn = {need: /yes/i, want: ['yes']};
    const typed = [0, 1, 2].map(() => {
      const r = ctx.scoreTurn(turn, 'yes I do', null, 2000); r.g = []; return r;
    });
    const res = ctx.examTotals(typed);
    const cl = res.axes.find(a => a.k === 'cl');
    if (cl.sc !== null) throw new Error('قيس النطق بلا صوت');
    if (cl.share !== 0) throw new Error('محور ساقط ما زال له وزن');
    const sum = res.axes.reduce((s, a) => s + a.share, 0);
    if (Math.abs(sum - 100) > 2) throw new Error('الأوزان لا تساوي ١٠٠: ' + sum);
    if (res.pc < 60) throw new Error('عوقب من اختبر بالكتابة: ' + res.pc);
  });

  await run('النحو يخفض النتيجة', {}, (ctx, ev) => {
    const mk = errs => [0, 1, 2, 3].map(() => {
      const r = ctx.scoreTurn({need: /yes/i, want: []}, 'yes I am going', 0.9, 2000);
      r.g = errs; return r;
    });
    const clean = ctx.examTotals(mk([])).pc;
    const dirty = ctx.examTotals(mk(['خطأ', 'خطأ'])).pc;
    if (dirty >= clean) throw new Error('الأخطاء لم تخفض: ' + dirty + ' مقابل ' + clean);
  });

  await run('اختبار المحادثة يمشي إلى النهاية ويعطي تقريراً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examConvStart('x-air');
    const sc = ev("EXAM_SCENE['x-air']");
    sc.turns.forEach(t => ctx.examConvAnswer(t.model, 0.9));
    const c = ev('S').cx;
    if (!c.done) throw new Error('لم ينتهِ');
    const r = ctx.examConvResult();
    if (r.n !== sc.turns.length) throw new Error('عدد الأدوار');
    if (r.pc < 70) throw new Error('الإجابات النموذجية نفسها رسبت: ' + r.pc);
    const h = ctx.examConvView();
    if (!h.includes('٪')) throw new Error('لا نسبة في التقرير');
    if (!h.includes(r.band.t)) throw new Error('لا تقدير');
    ['الصلة بالسؤال', 'سلامة النحو', 'وضوح النطق', 'الطلاقة'].forEach(a => {
      if (!h.includes(a)) throw new Error('محور ناقص من التقرير: ' + a);
    });
  });

  await run('الاختبار لا يسرّب الإجابة قبل أن تُجيب',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examConvStart('x-bank');
    const h = ctx.examConvView();
    const sc = ev("EXAM_SCENE['x-bank']");
    if (h.includes(sc.turns[0].model)) throw new Error('الإجابة النموذجية ظاهرة أثناء الاختبار');
    if (h.includes('تلميح')) throw new Error('يوجد تلميح');
  });

  await run('النتيجة تُحفظ والجلسة تُمحى',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examConvStart('x-shop');
    ev("EXAM_SCENE['x-shop']").turns.forEach(t => ctx.examConvAnswer(t.model, 0.9));
    const pc = ctx.examConvResult().pc;
    ctx.examConvFinish();
    if (ev('S').cx) throw new Error('الجلسة لم تُمحَ');
    const rc = ev('S').res.conv;
    if (!rc || rc.last !== pc) throw new Error('لم تُحفظ النتيجة الأخيرة');
    if (rc.n !== 1) throw new Error('عدد المحاولات خطأ');
  });

  await run('جلسة الاختبار لا تُستورد من ملف', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, cx: { id: 'x-air', ti: 0, turns: [] } }));
    if (ev('S').cx) throw new Error('استُوردت جلسة اختبار');
    if (Object.keys(ev('S').res).length) throw new Error('استُورد سجلّ نتائج مزروع');
  });

  console.log('— قواعد المستوى الأول —');

  await run('المحرّك يمسك أخطاء A1 الشائعة', {}, (ctx, ev) => {
    [['No I healthy', 'am'], ['I have bad headache', 'a bad headache'],
     ['she dont like fish', "doesn't"], ['I am go to school', 'I go'],
     ['I have 20 years', 'years old'], ['I want car', 'a car'],
     ['peoples are nice', 'People']].forEach(([bad, want]) => {
      if (!ctx.checkGrammar(bad).length) throw new Error('مرّ صامتاً: ' + bad);
      const fixed = ctx.fixText(bad);
      if (!fixed.includes(want)) throw new Error(bad + ' -> ' + fixed + ' (ينقصه ' + want + ')');
    });
  });

  /* الحارس الأهم: الإنذار الكاذب يُعلّم خطأً، وهو أسوأ من تفويت خطأ.
     كل جملة سليمة في بنوك المحتوى يجب أن تمرّ بلا ملاحظة واحدة. */
  await run('لا إنذار كاذب على أي جملة سليمة في البرنامج', {}, (ctx, ev) => {
    const good = [];
    ev('SCENES').forEach(s => s.turns.forEach(t => { good.push(t.model); good.push(t.p) }));
    ev('EXAM_SCENES').forEach(s => s.turns.forEach(t => { good.push(t.model); good.push(t.p) }));
    ev('CONVO').forEach(s => s.turns.forEach(t => { good.push(t.p); good.push(t.o[t.a]) }));
    ev('WRITE').forEach(t => t.ok.forEach(o => good.push(o)));
    ev('TRANSLATE').forEach(t => good.push(t.en[0]));
    ev('READS').forEach(t => t.qs.filter(q => q.k === 'tf').forEach(q => good.push(q.q)));
    /* وأقوى شبكة: جمل الدروس نفسها بعد ملء الفراغ بالإجابة الصحيحة. */
    ev('LESSONS').forEach(l => {
      l.s.forEach(x => good.push(x));
      l.items.forEach(it => {
        if (it.ok) good.push(it.ok[0]);
        else if (it.o) good.push(it.q.replace('___', it.o[it.a]));
      });
    });
    const bad = good.filter(Boolean).filter(x => ctx.checkGrammar(x).length);
    if (bad.length) throw new Error(bad.length + ' إنذار كاذب، أولها: «' + bad[0] + '» → '
      + ctx.checkGrammar(bad[0]).map(g => g.ar).join(' · '));
    if (good.length < 650) throw new Error('عيّنة صغيرة: ' + good.length);
  });

  await run('الفعل بعد modal يبقى مجرّداً', {}, (ctx, ev) => {
    ['Can he go?', 'She will come tomorrow', 'He must study', 'I would like to go'].forEach(t => {
      if (ctx.checkGrammar(t).length) throw new Error('إنذار كاذب على: ' + t);
    });
    if (!ctx.checkGrammar('He go to work').length) throw new Error('فات الخطأ الحقيقي');
  });

  await run('الصلة تضع سقفاً: لا نجاح بكلام سليم خارج الموضوع',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examConvStart('x-clinic');
    /* نحو سليم ونطق واضح، ولا إجابة واحدة عن السؤال المطروح. */
    ['I like football very much', 'The sun is hot today', 'My car is red', 'I like pizza',
     'The sky is blue', 'Cars are fast', 'I like tea', 'My house is big']
      .forEach(a => ctx.examConvAnswer(a, 0.95));
    const r = ctx.examConvResult();
    if (r.axes[1].sc < 90) throw new Error('المفترض أن نحوه سليم');
    if (!r.capped) throw new Error('لم يُطبَّق سقف الصلة');
    if (r.pc > 50) throw new Error('نجح بكلام لا صلة له: ' + r.pc + '٪');
    if (r.band.t === 'متمكّن' || r.band.t === 'جيد') throw new Error('تقدير مرتفع: ' + r.band.t);
  });

  await run('الترتيب بين المتعلّمين صادق',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const runOne = ans => {
      ctx.examConvStart('x-clinic');
      ans.forEach(a => ctx.examConvAnswer(a, 0.9));
      return ctx.examConvResult().pc;
    };
    const sc = ev("EXAM_SCENE['x-clinic']");
    const perfect = runOne(sc.turns.map(t => t.model));
    const broken = runOne(['Yes I have appointment at four', 'My name is Ahmed', 'I have bad headache',
      'three days', 'The weather is nice', 'No I healthy', 'Yes thank you', 'No thank you']);
    const silent = runOne(['', '', '', '', '', '', '', '']);
    if (!(perfect > broken && broken > silent)) throw new Error(`الترتيب خطأ: ${perfect} / ${broken} / ${silent}`);
    if (perfect < 90) throw new Error('الإجابات النموذجية لم تبلغ التمكّن: ' + perfect);
    if (broken >= 90) throw new Error('«I healthy» نال لقب متمكّن: ' + broken);
  });

  await run('من لم ينطق لا يُمنح نحواً سليماً', {}, (ctx, ev) => {
    const mute = [0, 1, 2].map(() => { const r = ctx.scoreTurn({need: /yes/i, want: []}, '', 0.1, 3000); r.g = []; return r });
    const res = ctx.examTotals(mute);
    if (res.axes.find(a => a.k === 'gr').sc !== null) throw new Error('مُنح النحو بلا كلام');
  });

  console.log('— اختبار الكتابة —');

  await run('بنك الكتابة سليم ولا خيارات فيه', {}, (ctx, ev) => {
    const W = ev('WRITE');
    if (W.length < 40) throw new Error('بنك صغير: ' + W.length);
    const kinds = {};
    W.forEach(t => {
      kinds[t.k] = (kinds[t.k] || 0) + 1;
      if (t.o || t.options) throw new Error('مسألة فيها خيارات: ' + t.ar);
      if (!Array.isArray(t.ok) || !t.ok.length) throw new Error('بلا إجابة: ' + t.ar);
      if (!/[؀-ۿ]/.test(t.ar)) throw new Error('التعليمات ليست بالعربية');
      if (t.k === 'order' && t.w.length < 3) throw new Error('كلمات قليلة للترتيب');
      if (t.k === 'free' && (!t.ask || t.ask.length < 3)) throw new Error('كتابة حرّة بلا شروط معلنة');
    });
    ['order', 'gap', 'build', 'free'].forEach(k => {
      if (!kinds[k]) throw new Error('نوع غائب: ' + k);
    });
  });

  /* لو لم ينل النموذج نفسه العلامة الكاملة فالميزان معطوب لا المتعلّم. */
  await run('كل نموذج في البنك ينال العلامة الكاملة', {}, (ctx, ev) => {
    const bad = ev('WRITE').filter(t => ctx.gradeWrite(t, t.ok[0]).sc < 100);
    if (bad.length) throw new Error(bad.length + ' نموذجاً ناقصاً، أولها: ' + bad[0].ar
      + ' => ' + ctx.gradeWrite(bad[0], bad[0].ok[0]).sc + '٪');
  });

  await run('كلمات الترتيب تكفي لتكوين الجملة', {}, (ctx, ev) => {
    ev('WRITE').filter(t => t.k === 'order').forEach(t => {
      const given = t.w.map(x => x.toLowerCase()).sort().join(' ');
      const need = t.ok[0].toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).sort().join(' ');
      if (given !== need) throw new Error('الكلمات لا تطابق الجملة · معطى: ' + given + ' · مطلوب: ' + need);
    });
  });

  await run('خطأ القاعدة لا يُعامَل زلّةَ إملاء', {}, (ctx, ev) => {
    const gap = ev('WRITE').find(t => t.k === 'gap' && t.ok[0] === 'works');
    const rule = ctx.gradeWrite(gap, 'work');       // صيغة صحيحة في غير موضعها
    const typo = ctx.gradeWrite(gap, 'workes');     // ليست صيغة أصلاً
    if (rule.sc >= 40) throw new Error('خطأ القاعدة أخذ درجة الإملاء: ' + rule.sc);
    if (typo.sc <= rule.sc) throw new Error('زلّة الإملاء عوقبت كخطأ قاعدة');
    if (ctx.gradeWrite(gap, 'is').sc !== 0) throw new Error('جواب خطأ تماماً أخذ درجة');
  });

  await run('الكتابة الحرّة تقيس الشروط والنحو معاً', {}, (ctx, ev) => {
    const t = ev('WRITE').find(x => x.k === 'free');
    const clean = ctx.gradeWrite(t, t.ok[0]);
    /* نفس الشروط مستوفاة، لكن بإنجليزية مكسورة. */
    const broken = ctx.gradeWrite(t, 'My name is Ali. I from Egypt. I am work in office. I healthy.');
    if (clean.sc !== 100) throw new Error('النموذج لم ينل العلامة: ' + clean.sc);
    if (broken.sc >= 80) throw new Error('نصّ مكسور نال ' + broken.sc + '٪');
    if (!broken.g.length) throw new Error('لم تُرصد أخطاؤه');
    if (!clean.asked.every(a => a.ok)) throw new Error('شروط النموذج لم تُستوفَ');
    const short = ctx.gradeWrite(t, 'I like football.');
    if (!short.short) throw new Error('لم يُنبّه على قلّة الجمل');
    if (short.short.wrote >= short.short.need) throw new Error('عدّ الجمل خطأ');
    /* العدد يُصاغ على الشاشة بمطابقة عربية سليمة وبأرقام عربية. */
    ctx.examWriteStart(0);
    const w = ev('S').wx;
    while (w.items[w.i] && w.items[w.i].k !== 'free') w.i++;
    ctx.examWriteAnswer('I like football.');
    const html = ctx.examWriteView();
    if (!html.includes('أربع جمل') && !html.includes('جمل')) throw new Error('لا تنبيه على الشاشة');
    const line = (html.match(/كتبتَ[^<]*/) || [''])[0];
    if (!line) throw new Error('لا تنبيه على الشاشة');
    if (/[0-9]/.test(line)) throw new Error('أرقام غربية في التنبيه: ' + line);
    if (line.includes('٢ جملة') || line.includes('٣ جملة')) throw new Error('مطابقة العدد خطأ: ' + line);
  });

  await run('الورقة متوازنة بين الأنواع',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    for (let i = 0; i < 5; i++) {
      const paper = ctx.pickWrite(0);
      const kinds = new Set(paper.map(t => t.k));
      ['order', 'gap', 'build', 'free'].forEach(k => {
        if (!kinds.has(k)) throw new Error('نوع غائب من الورقة: ' + k);
      });
      /* التكرار بالهوية لا بنص التعليمات: «رتّب الكلمات» واحدة لمسائل مختلفة. */
      if (new Set(paper).size !== paper.length) throw new Error('مسألة مكررة في الورقة');
    }
  });

  /* حارسٌ ساكن، لا يُشغّل شيئاً. وهو هنا أصدقُ من التشغيل: مُشغِّل
     الاختبارات يجمع الوحدات في نطاقٍ واحد، فيجد اسماً لم يُستورَد
     ويمضي — والمتصفّحُ يرميه ReferenceError. فسقط اسمٌ غيرُ مستوردٍ
     في askReview ومرّ على اختبارٍ يضغط الزرّ فعلاً. فالاستيراد
     يُفحص نصّاً لا تشغيلاً. */
  await run('كل اسمٍ مستعمَلٍ في وحدةٍ مستوردٌ فيها', {}, (ctx, ev) => {
    const fs = require('fs'), path = require('path');
    const ROOT = path.join(__dirname, '..');
    const dirs = ['views', 'engine'];
    const files = [];
    for (const d of dirs)
      for (const f of fs.readdirSync(path.join(ROOT, d)))
        if (f.endsWith('.js')) files.push(d + '/' + f);

    /* ما تُصدّره كلُّ وحدة، ومن يملكه. */
    const src = {}, owner = {};
    for (const rel of files) {
      const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      src[rel] = text;
      for (const m of text.matchAll(/^export\s+(?:async\s+)?(?:function|const|let|var)\s+(\w+)/gm))
        (owner[m[1]] = owner[m[1]] || []).push(rel);
    }

    /* ونصُّ السلاسل يُمحى قبل الفحص: معالجاتُ onclick مكتوبةٌ داخلها،
       وهي تُحلّ على window وقت الضغط لا بالاستيراد — فعدُّها استعمالاً
       يُغرق الفحص بإنذارٍ كاذب. */
    const strip = t => t
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/`(?:\\.|[^`\\])*`/g, ' ')
      .replace(/'(?:\\.|[^'\\\n])*'/g, ' ')
      .replace(/"(?:\\.|[^"\\\n])*"/g, ' ');

    /* ومعاملاتُ الدوالّ أسماءٌ محلّية لا تُستورَد: mergeInto(S, remote)
       تأخذ S معاملاً، وsyncNow(S, save) تأخذ save. فلولا استثناؤها
       لطُولبت كلُّ وحدةٍ باستيراد ما يُمرَّر إليها. */
    const params = code => {
      const names = new Set();
      const add = list => String(list).split(',').forEach(p => {
        const m = p.trim().match(/^([a-zA-Z_$][\w$]*)/);
        if (m) names.add(m[1]);
      });
      for (const m of code.matchAll(/function\s*[\w$]*\s*\(([^)]*)\)/g)) add(m[1]);
      for (const m of code.matchAll(/\(([^)]*)\)\s*=>/g)) add(m[1]);
      for (const m of code.matchAll(/(?<![\w.$])([a-zA-Z_$][\w$]*)\s*=>/g)) names.add(m[1]);
      for (const m of code.matchAll(/catch\s*\(([^)]*)\)/g)) add(m[1]);
      return names;
    };

    const bad = [];
    for (const rel of files) {
      const code = strip(src[rel]);
      const local = params(code);
      const imports = (src[rel].match(/^import[\s\S]*?from\s*'[^']+';/gm) || []).join('\n');
      const seen = new Set();
      /* يُلتقط الاسمُ مُنادىً «name(» ومُضافاً إليه «name.» جميعاً:
         hooks لا يُنادى قطّ، وإنما يُقال hooks.render() — فالقصرُ على
         النداء يُفلته، وهو أوّلُ ما سقط هنا. */
      for (const m of code.matchAll(/(?<![\w.$])([a-zA-Z_$][\w$]*)\s*[(.]/g)) {
        const name = m[1];
        if (seen.has(name) || !owner[name] || owner[name].includes(rel)) continue;
        seen.add(name);
        if (local.has(name)) continue;
        /* ومن عرّف الاسم عنده لا يستورده: esc في chat.js دالّةٌ
           محلّية، وtoast في bus.js عضوٌ في كائن. والعضوُ يُعرف بقوسٍ
           يتلوه قوسٌ معقوف — ولولا ذلك لمرّ كلُّ نداءٍ يفتتح كتلةً
           («catch (e) { logError(…)») على أنّه تعريفُ عضو. */
        if (new RegExp('(?:const|let|var|function|class)\\s+' + name + '\\b').test(code)) continue;
        if (new RegExp('[{,]\\s*' + name + '\\s*\\([^)]*\\)\\s*\\{').test(code)) continue;
        if (new RegExp('\\b' + name + '\\b').test(imports)) continue;
        bad.push(rel + ': ' + name);
      }
    }
    if (bad.length) throw new Error('اسمٌ مستعمَلٌ بلا استيراد: ' + bad.join('، '));
  });

  /* استوردتُ الوحدة في المتصفّح فعملت، ولم أضغط الزرّ قطّ — فبقي
     askReview يستدعي hooks وreviewWriting بلا استيراد، فيرمي قبل
     النداء. والرمية في دالّةٍ async لا ينتظرها أحد تضيع صامتة: لا
     رسم، ولا خبر، ولا طلب. فالحارس يسلك الطريق الذي يسلكه المتعلّم:
     يضغط ويقرأ ما ظهر. */
  await run('زرّ المراجعة يسلك طريقه كاملاً ولا يسقط صامتاً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, async (ctx, ev) => {
    const S = ev('S');
    ctx.examWriteStart(0);
    /* بلا مفتاحٍ ولا موافقة: لا زرّ أصلاً، ولا نداء. */
    if (ctx.examWriteView().includes('اطلب رأي المراجع'))
      throw new Error('عُرض الزرّ بلا تفعيل');

    let called = 0;
    const realFetch = global.fetch;
    global.fetch = () => { called++; return Promise.reject(new TypeError('offline')) };
    try {
      /* نُفعّله كما يفعّله صاحبُه، ثمّ نبلغ بنداً حرّاً.

         والتفعيلُ من المحرّك مباشرةً لا من النافذة: setReviewerKey
         تمسّ مفتاحاً، فلا تُصدَّر عالمياً لمجرّد أن يصلها اختبار. */
      const rev = await import('../engine/reviewer.js');
      rev.setReviewerKey('sk-ant-test-not-a-real-key');
      rev.setReviewerCfg({agreed: true});
      while (!S.wx.finished && (ctx.examWriteTask() || {}).k !== 'free') {
        ctx.examWriteAnswer('x'); ctx.examWriteNext();
      }
      if (S.wx.finished) return;   /* لا بند حرّ في هذه الورقة */
      ctx.examWriteAnswer('I go to the school every day.');
      if (!ctx.examWriteView().includes('اطلب رأي المراجع'))
        throw new Error('فُعِّل ولم يظهر الزرّ');

      await ctx.askReview();
      if (!called) throw new Error('ضُغط الزرّ ولم يُطلب شيء — سقط قبل النداء');
      const html = ctx.examWriteView();
      if (html.includes('… يراجع'))
        throw new Error('بقي «يراجع» بعد انتهاء الطلب');
      if (!html.includes('تعذّرت المراجعة'))
        throw new Error('فشل الطلب ولم يُخبَر المتعلّم');
    } finally {
      global.fetch = realFetch;
      /* المصدَّرُ إلى النافذة هو reviewerForget من اللوحة، لا
         forgetReviewer من المحرّك — وهذا طريقُ الزرّ نفسه. */
      ctx.reviewerForget();
    }
  });

  await run('اختبار الكتابة يمشي إلى النهاية',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examWriteStart(0);
    const n = ev('S').wx.items.length;
    for (let i = 0; i < n; i++) {
      ctx.examWriteAnswer(ctx.examWriteTask().ok[0]);
      if (!ev('S').wx.shown) throw new Error('لا تصحيح للمسألة ' + i);
      ctx.examWriteNext();
    }
    if (!ev('S').wx.finished) throw new Error('لم ينتهِ');
    const r = ctx.examWriteResult();
    if (r.pc !== 100) throw new Error('الإجابات النموذجية لم تنل العلامة: ' + r.pc);
    const h = ctx.examWriteView();
    if (!h.includes('٪')) throw new Error('لا نسبة');
    if (!h.includes('رتّب الكلمات')) throw new Error('لا تفصيل حسب النوع');
  });

  await run('من ترك كل شيء فارغاً لا ينجح',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examWriteStart(0);
    const n = ev('S').wx.items.length;
    for (let i = 0; i < n; i++) { ctx.examWriteAnswer(''); ctx.examWriteNext() }
    const r = ctx.examWriteResult();
    if (r.pc > 10) throw new Error('الفراغ نال ' + r.pc + '٪');
    if (r.band.t !== 'تحتاج تدريباً') throw new Error('تقدير متساهل: ' + r.band.t);
  });

  await run('النتيجة تُحفظ وجلسة الكتابة لا تُستورد',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examWriteStart(0);
    const n = ev('S').wx.items.length;
    for (let i = 0; i < n; i++) { ctx.examWriteAnswer(ctx.examWriteTask().ok[0]); ctx.examWriteNext() }
    ctx.examWriteFinish();
    if (ev('S').wx) throw new Error('الجلسة لم تُمحَ');
    if (!ev('S').res.write || ev('S').res.write.last !== 100) throw new Error('لم تُحفظ النتيجة');
    ctx.applyImport(JSON.stringify({ placed: true, wx: { items: [], i: 0 } }));
    if (ev('S').wx) throw new Error('استُوردت جلسة كتابة');
    if (Object.keys(ev('S').res).length) throw new Error('استُورد سجلّ نتائج مزروع');
  });

  await run('مسح الإنذار الكاذب يشمل بنوك الكتابة والترجمة', {}, (ctx, ev) => {
    const good = [];
    ev('WRITE').forEach(t => t.ok.forEach(o => good.push(o)));
    ev('TRANSLATE').forEach(t => good.push(t.en[0]));
    const bad = good.filter(x => ctx.checkGrammar(x).length);
    if (bad.length) throw new Error('إنذار كاذب على «' + bad[0] + '» → '
      + ctx.checkGrammar(bad[0]).map(g => g.ar).join(' · '));
  });

  await run('مطابقة العدد العربية في تقرير الكتابة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examWriteStart(0);
    const n = ev('S').wx.items.length;
    for (let i = 0; i < n; i++) { ctx.examWriteAnswer(ctx.examWriteTask().ok[0]); ctx.examWriteNext() }
    const h = ctx.examWriteView();
    /* الواحد مفرد والاثنان مثنّى وما بين ٣ و١٠ جمع: «١ مسائل» خطأ. */
    ['١ مسائل', '٢ مسائل', '1 مسائل'].forEach(bad => {
      if (h.includes(bad)) throw new Error('مطابقة العدد خطأ: «' + bad + '»');
    });
  });

  /* الاختباراتُ الأربعة تسحب ممّا بلغه المتعلّم، لا من المنهج كلِّه.

     وكان اثنان منها يخالفان: ورقةُ الكتابة تُنادى من الشاشة بلا
     وحدةٍ معيَّنة فتأتي فيها مهامُّ A1 وB2 وC1 معاً، والإملاءُ
     يُملي جملةً من C2 على مَن في الوحدة الثالثة. والقياسُ بما لم
     يُدرَّس ليس قياساً. */
  await run('كل اختبارٍ يسحب ممّا بلغه المتعلّم وحده', {}, (ctx, ev) => {
    const S = ev('S'), LESSONS = ev('LESSONS');
    S.lessons = {'1.1': true, '1.2': true, '1.3': true, '2.1': true};
    const upto = ctx.reachedUnit();
    const unitOf = it => (LESSONS.find(l => l.items.includes(it)) || {}).u;

    const beyond = (name, list, u) => {
      const bad = list.filter(x => (u(x) || 0) > upto);
      if (bad.length) throw new Error(name + ': ' + bad.length
        + ' بنداً فوق الوحدة ' + upto);
    };
    beyond('الكتابة', ctx.pickWrite(0), t => t.u);
    beyond('الإملاء', ctx.dictationPool(), unitOf);
    beyond('القراءة', ctx.readPool(), t => t.u);
    beyond('الترجمة', ctx.pickTranslation(20, upto), t => t.u);
  });

  console.log('— المزامنة بين الأجهزة —');

  /* دالّةٌ كلُّ غرضها «لا تُضيّع تقدّماً» شُحنت بلا اختبارٍ واحد.
     وهذه الحراسُ تقيس الوعد نفسه: يزيد ولا ينقص، ولا يتأثّر
     بالترتيب، ولا يسقط أمام وثيقةٍ تالفة. */
  const progress = () => ({
    lessons: {'1.1': true, '1.2': true}, conv: {c1: true}, cp: {1: true},
    ret: {}, skipped: {}, levelDone: {A1: true}, errs: {s3: 7},
    attempts: {cp1: 3}, xp: 450, placed: true, exam: true, level: 'A2',
    res: {write: {last: 80, best: 95, n: 4, at: 5000}},
    srs: {'I am Ahmed.': {b: 6, due: 90, seen: 9}},
    cxSeen: ['s1', 's2'], place: {suggest: 2}
  });
  const weigh = o => ({
    lessons: Object.values(o.lessons || {}).filter(Boolean).length,
    cp: Object.values(o.cp || {}).filter(Boolean).length,
    levelDone: Object.values(o.levelDone || {}).filter(Boolean).length,
    xp: o.xp || 0, placed: !!o.placed, exam: !!o.exam,
    best: ((o.res || {}).write || {}).best || 0,
    box: ((o.srs || {})['I am Ahmed.'] || {}).b || 0,
    seen: (o.cxSeen || []).length
  });
  const shrank = (before, after) => Object.keys(before).filter(k =>
    typeof before[k] === 'boolean' ? (before[k] && !after[k]) : (after[k] < before[k]));

  await run('الدمج يزيد ولا ينقص مهما كان المُدخل', {}, (ctx, ev) => {
    const base = weigh(progress());
    const inputs = {
      'فارغ': {}, 'null': null, 'نصّ': 'x', 'رقم': 7, 'مصفوفة': [1],
      'حقولٌ null': {lessons: null, xp: null, res: null, srs: null, cxSeen: null},
      'أنواعٌ خاطئة': {lessons: 'x', xp: 'كثير', res: [], srs: 9, cxSeen: {}},
      'قيمٌ كاذبة': {lessons: {'1.1': 0}, cp: {1: false}, xp: 0, placed: false,
        exam: false, res: {write: {last: 0, best: 0, n: 0, at: 9e9}},
        srs: {'I am Ahmed.': {b: 0, due: 0, seen: 0}}, levelDone: {A1: false}},
      'سجلٌّ تالف': {res: {write: null}, srs: {'I am Ahmed.': 'نصّ'}},
      /* مفتاحٌ جديدٌ لا مقابلَ له: يُتبنّى بلا فحصٍ لولا الحارس. */
      'سجلٌّ جديدٌ تالف': {srs: {'X': null, 'Y': 'نصّ', 'Z': 5},
        res: {read: null, conv: 'نصّ'}},
      'لانهاية': {xp: Infinity}, 'سالب': {xp: -5},
      'جهازٌ جديد': {lessons: {}, xp: 0, placed: false, res: {}, srs: {}}
    };
    Object.entries(inputs).forEach(([name, remote]) => {
      const S = progress();
      ev('mergeInto')(S, remote);
      const lost = shrank(base, weigh(S));
      if (lost.length) throw new Error(name + ': نقص ' + lost.join('، '));
      /* وما دخل الحالةَ يجب أن يُقرأ بلا رمية: النقصُ ليس العطلَ
         الوحيد — سجلُّ مراجعةٍ نصُّه «نصّ» يُسقط شاشة اليوم. */
      Object.entries(S.srs || {}).forEach(([q, v]) => {
        if (!v || typeof v !== 'object' || !Number.isFinite(Number(v.b)))
          throw new Error(name + ': سجلُّ مراجعةٍ غيرُ صالح — ' + q);
      });
      Object.entries(S.res || {}).forEach(([k, v]) => {
        if (!v || typeof v !== 'object' || !Number.isFinite(Number(v.last)))
          throw new Error(name + ': نتيجةٌ غيرُ صالحة — ' + k);
      });
    });
  });

  await run('الدمج لا يتغيّر بترتيب الاتّصال ولا بتكراره', {}, (ctx, ev) => {
    /* الطرفان مُنقَّيان قبل المقارنة: التنقيةُ تُطبَّق على ما يأتي من
       الوسيط لا على ما في الجهاز، فمقارنةُ خامٍ بمُنقّى مقارنةُ
       شيئين مختلفين لا كشفُ فرقٍ في الترتيب. */
    const a = ctx.migrate(progress());
    const b = ctx.migrate({lessons: {'3.1': true}, xp: 900, cxSeen: ['s3'],
      levelDone: {A2: true}, res: {write: {last: 60, best: 60, n: 9, at: 9000}},
      level: 'B1'});
    const x = JSON.parse(JSON.stringify(a)); ev('mergeInto')(x, b);
    const y = JSON.parse(JSON.stringify(b)); ev('mergeInto')(y, a);
    if (JSON.stringify(weigh(x)) !== JSON.stringify(weigh(y)))
      throw new Error('النتيجة تختلف بترتيب الاتّصال');
    const once = JSON.stringify(x); ev('mergeInto')(x, b);
    if (JSON.stringify(x) !== once) throw new Error('الدمج المكرّر يغيّر النتيجة');
  });

  /* ما يصمد في الجلسة ثمّ يسقط عند الإقلاع ضياعٌ مؤجَّل: المتعلّم
     يرى تقدّمه ليلاً ولا يجده صباحاً. فما يُدمج يجب أن ينجو من
     migrate — ولذلك يمرّ به قبل الدمج لا بعده. */
  await run('المدموج ينجو من migrate، فلا يضيع عند الإقلاع', {}, (ctx, ev) => {
    const S = ctx.migrate(progress());
    const before = weigh(S);
    ev('mergeInto')(S, ctx.migrate({lessons: {'2.1': true}, xp: 700}));
    const after = weigh(ctx.migrate(JSON.parse(JSON.stringify(S))));
    const lost = shrank(before, after);
    if (lost.length) throw new Error('سقط عند الإقلاع: ' + lost.join('، '));
    if (after.xp !== 700) throw new Error('النقاط لم تنجُ: ' + after.xp);
  });

  await run('المُرسَل لا يحمل كتابةً حرّةً ولا مفتاحاً ولا تفضيلَ جهاز', {}, (ctx, ev) => {
    const S = Object.assign(progress(), {
      wx: {done: [{ans: 'SECRET-WRITING'}]}, rev: {text: 'SECRET-REVIEW'},
      theme: 'dark', goal: 20, q: {x: 1}, chat: {sc: 5}, syncBusy: true
    });
    const out = JSON.stringify(ev('syncable')(S));
    ['SECRET-WRITING', 'SECRET-REVIEW', 'wx', 'rev', 'theme', 'goal', 'chat', 'syncBusy']
      .forEach(k => { if (out.includes(k)) throw new Error('سُرّب: ' + k) });
  });

  /* في التصفّح الخاصّ يفشل التخزين صامتاً. وكان setSyncCode يُرجع
     النجاح دائماً، فيُقال لصاحبه «أُنشئ رمزك» ثمّ لا يرى رمزاً ولا
     يفهم. فالردُّ يجب أن يصدق. */
  await run('تعذّرُ التخزين يُقال ولا يُدّعى نجاحٌ كاذب', {}, (ctx, ev) => {
    const real = globalThis.localStorage.setItem;
    globalThis.localStorage.setItem = () => { throw new Error('ممنوع') };
    try {
      if (ev('setSyncCode')(ev('newCode')()) !== false)
        throw new Error('ادّعى الحفظ نجاحاً والتخزين ممنوع');
    } finally { globalThis.localStorage.setItem = real }
  });

  await run('الرمز لا يُقبل إلّا بطوله وحروفه', {}, (ctx, ev) => {
    if (ev('validCode')('short')) throw new Error('قُبل رمزٌ قصير');
    if (ev('validCode')('')) throw new Error('قُبل رمزٌ فارغ');
    if (ev('validCode')('AAAAAAAAAAA0')) throw new Error('قُبل حرفٌ ملتبس');
    const c = ev('newCode')();
    if (!ev('validCode')(c)) throw new Error('رمزٌ مولَّدٌ مرفوض: ' + c);
    const many = new Set();
    for (let i = 0; i < 200; i++) many.add(ev('newCode')());
    if (many.size !== 200) throw new Error('تكرّر رمزٌ مولَّد');
  });

  console.log('— اختبار القراءة —');

  await run('بنك القراءة سليم ولا اختيار من متعدّد فيه', {}, (ctx, ev) => {
    const R = ev('READS');
    if (R.length < 5) throw new Error('نصوص قليلة: ' + R.length);
    /* الطول يتبع المستوى. وكان ٤٠–١٤٠ لكلّ نصٍّ لأنّ النصوص كلَّها
       كانت A1 — ومقالٌ حجاجيٌّ في C2 لا يُقال في مئةٍ وأربعين كلمة،
       فالسقف الثابت يمنع المستوى الأعلى أن يكون أعلى.

       والحدُّ الأدنى ليس تدرّجاً في الصعوبة، بل ضمانُ نصٍّ يحتمل خمسة
       أسئلة. والرسالةُ الرسمية قصيرةٌ بطبعها — تسعٌ وسبعون كلمةً في
       B2 نصٌّ سليم، فلا يُرفع الحدُّ الأدنى حتى يُدينها. */
    const SPAN = {A1:[40,140], A2:[50,170], B1:[60,210],
                  B2:[70,250], C1:[90,300], C2:[110,360]};
    R.forEach(t => {
      const n = ctx.countWords(t.text);
      const lv = ctx.unitLevel(t.u);
      const [lo, hi] = SPAN[lv] || SPAN.A1;
      if (n < lo || n > hi)
        throw new Error(t.id + ': طول غير مناسب لـ ' + lv + ': ' + n
          + ' (المدى ' + lo + '–' + hi + ')');
      if (t.qs.length < 5) throw new Error(t.id + ': أسئلة قليلة');
      t.qs.forEach((q, i) => {
        if (!['tf', 'short', 'word'].includes(q.k)) throw new Error(t.id + ': نوع غريب ' + q.k);
        if (q.o || q.options) throw new Error(t.id + ': سؤال اختيار من متعدّد');
        if (q.k === 'tf' && typeof q.a !== 'boolean') throw new Error(t.id + ':' + i + ' بلا إجابة');
        if (q.k === 'tf' && !q.why) throw new Error(t.id + ':' + i + ' بلا تعليل');
        if (q.k !== 'tf' && (!q.ok || !q.ok.length)) throw new Error(t.id + ':' + i + ' بلا إجابة');
        if (q.k !== 'tf' && !/[؀-ۿ]/.test(q.ar)) throw new Error(t.id + ': السؤال ليس بالعربية');
      });
      if (!t.qs.some(q => q.k === 'word')) throw new Error(t.id + ': لا سؤال مفردات');
      if (!t.qs.some(q => q.k === 'short')) throw new Error(t.id + ': لا سؤال كتابي');
    });
  });

  /* سؤال «استخرج الكلمة» لا يُستخرج جوابه إن لم يكن في النصّ أصلاً. */
  await run('كل كلمة مطلوبة موجودة في نصّها', {}, (ctx, ev) => {
    ev('READS').forEach(t => {
      const low = t.text.toLowerCase();
      t.qs.filter(q => q.k === 'word').forEach(q => {
        if (!q.ok.some(o => low.includes(o.toLowerCase())))
          throw new Error(t.id + ': «' + q.ok[0] + '» ليست في النصّ');
      });
    });
  });

  /* مبرّر «صح أو خطأ» يقتبس النصّ، فإن لم يكن فيه فالمتعلّم يُحال على
     شيء لا يجده — وهو أسوأ من ألّا يُعطى مبرّراً. */
  await run('مبرّر صح/خطأ موجودٌ في نصّه', {}, (ctx, ev) => {
    const norm = x => x.toLowerCase().replace(/[’']/g, "'")
      .replace(/["«»]/g, '').replace(/\s+/g, ' ').trim();
    ev('READS').forEach(t => {
      const low = norm(t.text);
      t.qs.filter(q => q.k === 'tf').forEach(q => {
        if (!q.why) throw new Error(t.id + ': عبارة بلا مبرّر');
        /* المبرّر إمّا اقتباسٌ إنجليزيّ وإمّا شرحٌ عربيّ. والاقتباس هو
           ما تصدّره من حروف لاتينية، وما بعده شرحٌ لا يُطلب في النصّ. */
        const en = norm(q.why).match(/^[a-z0-9 ,.'’-]+/);
        if (!en) return;
        const quote = en[0].replace(/[.,\s]+$/, '');
        if (quote.split(' ').length < 2) return;
        if (!low.includes(quote))
          throw new Error(t.id + ': المبرّر ليس في النصّ — «' + quote + '»');
      });
    });
  });

  await run('كل إجابة نموذجية تنال العلامة الكاملة', {}, (ctx, ev) => {
    ev('READS').forEach(t => t.qs.forEach((q, i) => {
      const sc = ctx.gradeRead(q, q.k === 'tf' ? q.a : q.ok[0]).sc;
      if (sc !== 100) throw new Error(t.id + ':' + i + ' نموذج ينال ' + sc);
    }));
  });

  await run('الإجابة القصيرة تقبل المعنى لا الصيغة وحدها', {}, (ctx, ev) => {
    const q = {k: 'short', ar: 'س', ok: ['in a big park']};
    if (ctx.gradeRead(q, 'in a big park').sc !== 100) throw new Error('النموذج');
    if (ctx.gradeRead(q, 'They are in a big park.').sc < 80) throw new Error('جملة أطول تحوي الجواب رُفضت');
    if (ctx.gradeRead(q, 'in a big prak').sc < 80) throw new Error('زلّة حرف واحد عوقبت كخطأ');
    if (ctx.gradeRead(q, 'at the hotel').sc !== 0) throw new Error('جواب خطأ نال درجة');
    if (ctx.gradeRead(q, '').sc !== 0) throw new Error('الفراغ نال درجة');
  });

  await run('السرعة مؤشّر خفيف لا حَكَم', {}, (ctx, ev) => {
    if (ctx.speedScore(85) !== 100) throw new Error('السرعة المعتادة لم تنل العلامة');
    if (ctx.speedScore(30) >= 70) throw new Error('البطء الشديد لم يُرصد');
    if (ctx.speedScore(200) >= 40) throw new Error('من قلّب الصفحة نال درجة السرعة');
    if (ctx.wpm(100, 60000) !== 100) throw new Error('حساب الكلمات في الدقيقة خطأ');
  });

  /* المقصد كلّه: من لم يفهم لم يقرأ، مهما أسرع ومهما عرف من مفردات. */
  await run('الفهم سقفٌ على السرعة والمفردات', {}, (ctx, ev) => {
    const t = ev('READS')[0];
    const items = t.qs.map((q, i) => ({
      ...ctx.gradeRead(q, q.k === 'word' ? q.ok[0] : (q.k === 'tf' ? !q.a : 'xyz')), q, i}));
    const r = ctx.readTotals(items, 85);
    if (r.axes.find(a => a.k === 'vocab').sc !== 100) throw new Error('المفردات المفترض كاملة');
    if (r.axes.find(a => a.k === 'speed').sc !== 100) throw new Error('السرعة المفترض كاملة');
    if (!r.capped) throw new Error('لم يُطبَّق سقف الفهم');
    if (r.pc > 40) throw new Error('نجح بلا فهم: ' + r.pc + '٪');
  });

  await run('البطيء الفاهم أعلى من السريع غير الفاهم', {}, (ctx, ev) => {
    const t = ev('READS')[0];
    const make = (pick, rate) => ctx.readTotals(
      t.qs.map((q, i) => ({...ctx.gradeRead(q, pick(q)), q, i})), rate);
    const slowGood = make(q => q.k === 'tf' ? q.a : q.ok[0], 35);
    const fastBad = make(q => q.k === 'tf' ? !q.a : 'xyz', 150);
    if (slowGood.pc <= fastBad.pc) throw new Error('الترتيب مقلوب: ' + slowGood.pc + ' / ' + fastBad.pc);
    if (slowGood.pc < 85) throw new Error('عوقب الفاهم على بطئه: ' + slowGood.pc);
  });

  await run('اختبار القراءة يمشي إلى النهاية',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examReadStart('r-note');
    if (ev('S').rx.stage !== 'read') throw new Error('لم يبدأ بالقراءة');
    const html = ctx.examReadView();
    if (!html.includes('Sami')) throw new Error('النصّ غير معروض');
    if (html.includes('صح أم خطأ')) throw new Error('الأسئلة ظهرت قبل القراءة');
    /* نؤخّر لحظة البدء لنحاكي قراءة في زمن معقول (نحو ٨٥ كلمة/دقيقة). */
    ev('S').rx.began = Date.now() - 47000;
    ctx.examReadDone();
    if (!ev('S').rx.ms) throw new Error('لم يُقَس زمن القراءة');
    const t = ev("READ['r-note']");
    t.qs.forEach(q => ctx.examReadAnswer(q.k === 'tf' ? q.a : q.ok[0]));
    const r = ctx.examReadResult();
    if (r.pc < 90) throw new Error('الإجابات النموذجية نالت ' + r.pc);
    const rep = ctx.examReadView();
    if (!rep.includes('٪')) throw new Error('لا نسبة');
    if (!rep.includes('كلمة في الدقيقة')) throw new Error('لا قياس للسرعة');
    if (r.rate < 60 || r.rate > 110) throw new Error('حساب السرعة غير معقول: ' + r.rate);

    /* من ضغط «انتهيتُ» فوراً لم يقرأ، فلا ينال درجة السرعة. */
    ctx.examReadStart('r-note');
    ctx.examReadDone();
    if (!ev('S').rx.ms) throw new Error('الضغطة الفورية لم تُسجّل');
    if (ctx.speedScore(ctx.examReadRate()) !== 0) throw new Error('من لم يقرأ نال درجة السرعة');
  });

  await run('النصّ يبقى متاحاً أثناء الأسئلة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examReadStart('r-note');
    ctx.examReadDone();
    const h = ctx.examReadView();
    if (!h.includes('Sami')) throw new Error('النصّ اختفى — صار اختبار حفظ لا قراءة');
    if (!h.includes('اعرض النصّ مرّة أخرى')) throw new Error('لا مدخل لمراجعة النصّ');
  });

  await run('«لا أعرف» تُحتسب خطأ لا تُتجاهَل',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examReadStart('r-note');
    ctx.examReadDone();
    const n = ev("READ['r-note']").qs.length;
    for (let i = 0; i < n; i++) ctx.examReadSkip();
    const r = ctx.examReadResult();
    if (r.pc !== 0) throw new Error('من لم يُجب نال ' + r.pc + '٪');
    if (r.right !== 0) throw new Error('عُدّت إجابات صحيحة');
  });

  await run('النتيجة تُحفظ وجلسة القراءة لا تُستورد',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examReadStart('r-note');
    ctx.examReadDone();
    ev("READ['r-note']").qs.forEach(q => ctx.examReadAnswer(q.k === 'tf' ? q.a : q.ok[0]));
    const pc = ctx.examReadResult().pc;
    ctx.examReadFinish();
    if (ev('S').rx) throw new Error('الجلسة لم تُمحَ');
    if (!ev('S').res.read || ev('S').res.read.last !== pc) throw new Error('لم تُحفظ النتيجة');
    ctx.applyImport(JSON.stringify({ placed: true, rx: { id: 'r-note', i: 0 } }));
    if (ev('S').rx) throw new Error('استُوردت جلسة قراءة');
    if (Object.keys(ev('S').res).length) throw new Error('استُورد سجلّ نتائج مزروع');
  });

  await run('مطابقة العدد العربية صحيحة مع المؤنث والمذكّر', {}, (ctx, ev) => {
    const c = ctx.count;
    const cases = [
      [1, 'كلمة', 'كلمات', 'كلمة'],
      [2, 'كلمة', 'كلمات', 'كلمتان'],
      [2, 'درس', 'دروس', 'درسان'],
      [3, 'كلمة', 'كلمات', '٣ كلمات'],
      [10, 'درس', 'دروس', '١٠ دروس'],
      [15, 'درس', 'دروس', '١٥ درساً'],
      [64, 'كلمة', 'كلمات', '٦٤ كلمةً']
    ];
    cases.forEach(([n, s, p, want]) => {
      const got = c(n, s, p);
      if (got !== want) throw new Error(n + ' ' + s + ' => «' + got + '» والمطلوب «' + want + '»');
    });
    /* الأرقام في واجهة عربية تُكتب بالأرقام العربية. */
    if (/[0-9]/.test(c(64, 'كلمة', 'كلمات'))) throw new Error('رقم غربي');
  });

  console.log('— التمارين المكتوبة —');

  await run('بنك الدروس فيه أنواع لا نوع واحد', {}, (ctx, ev) => {
    const items = ev('LESSONS').flatMap(l => l.items);
    const kinds = {};
    items.forEach(i => { kinds[i.k || 'mcq'] = (kinds[i.k || 'mcq'] || 0) + 1 });
    if (items.length < 150) throw new Error('البنك صغير: ' + items.length);
    ['type', 'order', 'correct'].forEach(k => {
      if (!kinds[k]) throw new Error('نوع غائب من الدروس: ' + k);
    });
    const typed = items.length - kinds.mcq;
    if (typed / items.length < 0.3) throw new Error('المكتوب أقلّ من الثلث: ' + typed + '/' + items.length);
    /* كل درس فيه نوع مكتوب واحد على الأقل، وإلا بقي درسٌ كلّه ضغط أزرار. */
    ev('LESSONS').forEach(l => {
      if (!l.items.some(i => ctx.itemTyped(i))) throw new Error('الدرس ' + l.id + ' كلّه اختيار');
    });
  });

  /* التنويع لا يفيد إن جاء كتلةً واحدة في الآخر. */
  await run('الأنواع موزّعة لا مكدّسة في آخر الدرس', {}, (ctx, ev) => {
    ev('LESSONS').forEach(l => {
      const half = Math.floor(l.items.length / 2);
      const early = l.items.slice(0, half).filter(i => ctx.itemTyped(i)).length;
      if (!early) throw new Error('الدرس ' + l.id + ': لا تمرين مكتوب في نصفه الأول');
    });
  });

  await run('التمرين المكتوب يُصحَّح بلا خيارات',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const q = ev('S').q;
    while (q.i < q.items.length && !ctx.itemTyped(q.items[q.i])) { ctx.pick(q.items[q.i].a); ctx.nextQ() }
    const it = q.items[q.i];
    if (!it) throw new Error('لا تمرين مكتوب في الدرس');
    const html = ctx.quizView();
    if (html.includes('class="opt')) throw new Error('ظهرت خيارات في تمرين مكتوب');
    if (!html.includes('qtxt')) throw new Error('لا مربع كتابة');
    ctx.answerTyped(it.ok[0]);
    if (!ev('S').q.choiceOk) throw new Error('الإجابة الصحيحة حُسبت خطأ');
    if (!ctx.quizView().includes('التالي') && !ctx.quizView().includes('النتيجة'))
      throw new Error('لا زر انتقال بعد التصحيح');
  });

  await run('الإجابة الخطأ تعرض الصواب ولا تُقبل',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const q = ev('S').q;
    while (q.i < q.items.length && !ctx.itemTyped(q.items[q.i])) { ctx.pick(q.items[q.i].a); ctx.nextQ() }
    const it = q.items[q.i];
    ctx.answerTyped('zzz');
    if (ev('S').q.choiceOk) throw new Error('جواب خطأ قُبل');
    const html = ctx.quizView();
    if (!html.includes(it.ok[0])) throw new Error('لم يُعرض الصواب');
    if (!html.includes('zzz')) throw new Error('لم تُعرض إجابة المتعلّم');
  });

  await run('«لا أعرف» تُحتسب خطأ وتكشف الصواب',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const q = ev('S').q;
    while (q.i < q.items.length && !ctx.itemTyped(q.items[q.i])) { ctx.pick(q.items[q.i].a); ctx.nextQ() }
    const it = q.items[q.i];
    ctx.revealTyped();
    if (ev('S').q.choiceOk) throw new Error('حُسبت صحيحة');
    if (!ctx.quizView().includes(it.ok[0])) throw new Error('لم يُكشف الصواب');
  });

  await run('لا يُحتسب الجواب مرّتين ولا يُقبل الفراغ',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '1.1');
    const q = ev('S').q;
    while (q.i < q.items.length && !ctx.itemTyped(q.items[q.i])) { ctx.pick(q.items[q.i].a); ctx.nextQ() }
    const it = q.items[q.i];
    ctx.answerTyped('');                       // الفراغ لا يُنهي السؤال
    if (ev('S').q.picked != null) throw new Error('الفراغ احتُسب جواباً');
    ctx.answerTyped(it.ok[0]);
    const before = ev('S').q.got.length;
    ctx.answerTyped('zzz');                    // ضغطة ثانية
    if (ev('S').q.got.length !== before) throw new Error('احتُسب الجواب مرّتين');
  });

  await run('درس كامل يُجتاز بالكتابة والاختيار معاً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.launch('lesson', '2.2');
    const q = ev('S').q;
    const n = q.items.length;
    for (let i = 0; i < n; i++) {
      const it = q.items[q.i];
      if (ctx.itemTyped(it)) ctx.answerTyped(it.ok[0]); else ctx.pick(it.a);
      ctx.nextQ();
    }
    if (!ev('S').q.done) throw new Error('لم ينتهِ');
    if (!ev('S').q.pass) throw new Error('كل الإجابات صحيحة ولم يُجتز: ' + ev('S').q.score + '/' + n);
    if (!ev('S').lessons['2.2']) throw new Error('لم يُسجَّل الدرس');
  });

  await run('تمارين الترتيب تُقبل بعلامات الترقيم وبدونها', {}, (ctx, ev) => {
    const orders = ev('LESSONS').flatMap(l => l.items).filter(i => i.k === 'order');
    if (!orders.length) throw new Error('لا تمارين ترتيب');
    orders.forEach(it => {
      const plain = it.ok[0];
      if (!ctx.typedOk(plain + '.', it.ok)) throw new Error('نقطة في آخر الجملة رُفضت: ' + plain);
      if (!ctx.typedOk(plain.toLowerCase(), it.ok)) throw new Error('حالة الأحرف رُفضت: ' + plain);
    });
  });

  await run('تحديد المستوى لا يطلب إنشاء جملة', {}, (ctx, ev) => {
    const heavy = ev('PLACE').filter(i => i.k === 'order' || i.k === 'correct');
    if (heavy.length) throw new Error(heavy.length + ' سؤال إنشاء في تحديد المستوى');
  });

  /* «١٣ / ٢١» في سياق عربي تنعكس فتُقرأ ٢١ من ١٣. الفاصل كلمةٌ لا شرطة. */
  await run('عدّادات التقدّم لا تنعكس في الاتجاه العربي', {}, (ctx, ev) => {
    const screens = [];
    ctx.launch('lesson', '1.1');
    screens.push(['الاختبار', ctx.quizView()]);
    ctx.closeQ();
    ctx.startTranslation(3);
    screens.push(['الترجمة', ctx.translateView()]);
    ctx.startSound('p');
    screens.push(['الأصوات', ctx.soundsView()]);
    ctx.examConvStart('x-air');
    screens.push(['المحادثة', ctx.examConvView()]);
    ctx.examWriteStart(0);
    screens.push(['الكتابة', ctx.examWriteView()]);
    ctx.examReadStart('r-note');
    ctx.examReadDone();
    screens.push(['القراءة', ctx.examReadView()]);
    /* شاشة النتيجة أيضاً: وهي التي كان فيها «٤/٥». */
    ctx.launch('lesson', '1.3');
    const lq = ev('S').q;
    for (let i = 0; i < lq.items.length; i++) {
      const it = lq.items[lq.i];
      if (ctx.itemTyped(it)) ctx.answerTyped(it.ok[0]); else ctx.pick(it.a);
      ctx.nextQ();
    }
    screens.push(['النتيجة', ctx.quizView()]);

    /* الممنوع هو الشرطة بين مسافتين: هي التي تكسر مجرى العدد فينعكس.
       أمّا «٤/٥» ملتصقة فتبقى مجرى عددياً واحداً ولا تنعكس. */
    screens.forEach(([name, html]) => {
      if (/[٠-٩]\s+\/|\/\s+[٠-٩]/.test(html)) throw new Error('عدّاد بشرطة مفصولة في شاشة ' + name);
    });
  });

  console.log('— المراجعة المتباعدة —');

  await run('الصندوق يرتفع بالإصابة ويرجع للأول بالخطأ', {}, (ctx, ev) => {
    const DAY = ev('DAY'), t0 = 1700000000000;
    const srs = {};
    ctx.record(srs, 'a', false, t0);
    ctx.record(srs, 'b', true, t0);
    if (srs.a.b !== 1) throw new Error('الخطأ لم يرجع للصندوق الأول: ' + srs.a.b);
    /* لو بدأت الإصابة الأولى من الصندوق الأول لاستوى المصيب والمخطئ. */
    if (srs.b.b !== 2) throw new Error('الإصابة الأولى لم تبدأ من الثاني: ' + srs.b.b);
    if (srs.b.due <= srs.a.due) throw new Error('أجل المصيب ليس أطول من أجل المخطئ');

    for (let i = 0; i < 9; i++) ctx.record(srs, 'b', true, t0);
    if (srs.b.b !== ev('BOXES').length) throw new Error('لم يبلغ الصندوق الأخير');
    ctx.record(srs, 'b', false, t0);
    if (srs.b.b !== 1) throw new Error('الخطأ لم يُرجعه من الصندوق الأخير إلى الأول');
  });

  await run('لا يستحقّ شيء قبل أجله', {}, (ctx, ev) => {
    const DAY = ev('DAY'), t0 = 1700000000000;
    const srs = {};
    ctx.record(srs, 'wrong', false, t0);
    ctx.record(srs, 'right', true, t0);
    if (ctx.dueKeys(srs, t0).length) throw new Error('استحقّ شيء في لحظة الإجابة');
    const d1 = ctx.dueKeys(srs, t0 + DAY + 1000);
    if (d1.length !== 1 || d1[0] !== 'wrong') throw new Error('بعد يوم: ' + d1.join(','));
    const d3 = ctx.dueKeys(srs, t0 + 3 * DAY + 1000);
    if (d3.length !== 2) throw new Error('بعد ثلاثة أيام: ' + d3.join(','));
    /* الأقدم استحقاقاً أولاً. */
    if (d3[0] !== 'wrong') throw new Error('الترتيب ليس بالأقدم استحقاقاً');
  });

  await run('الأجل يُحسب من لحظة الإجابة فلا تتراكم الديون', {}, (ctx, ev) => {
    const DAY = ev('DAY'), t0 = 1700000000000;
    const srs = {};
    ctx.record(srs, 'x', true, t0);
    /* غاب شهراً ثم أجاب: الموعد التالي من اليوم لا من موعد فائت. */
    const late = t0 + 30 * DAY;
    ctx.record(srs, 'x', true, late);
    if (srs.x.due <= late) throw new Error('الموعد التالي في الماضي');
    if (srs.x.due - late > 40 * DAY) throw new Error('أجل غير معقول');
  });

  await run('الإجابة في الدرس تُسجَّل في المراجعة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    if (Object.keys(ev('S').srs).length) throw new Error('بدأ غير فارغ');
    ctx.launch('lesson', '1.1');
    const q = ev('S').q;
    const it = q.items[0];
    if (ctx.itemTyped(it)) ctx.answerTyped(it.ok[0]); else ctx.pick(it.a);
    const e = ev('S').srs[it.q];
    if (!e) throw new Error('لم تُسجَّل الإجابة');
    if (e.b !== 2) throw new Error('الإجابة الصحيحة لم ترفع الصندوق: ' + e.b);
    ctx.nextQ();
    const it2 = q.items[1];
    if (ctx.itemTyped(it2)) ctx.answerTyped('zzz'); else ctx.pick((it2.a + 1) % it2.o.length);
    if (ev('S').srs[it2.q].b !== 1) throw new Error('الخطأ لم يُسجَّل في الصندوق الأول');
  });

  /* المحادثة أدوارها ليست تمارين مستقلّة، وتحديد المستوى قياس قبل التعلّم. */
  await run('المحادثة وتحديد المستوى لا يدخلان المراجعة',
    { 'eng-coach-v3': JSON.stringify({ placed: false }) }, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < 4; i++) { ctx.pick(0); ctx.nextQ() }
    if (Object.keys(ev('S').srs).length) throw new Error('تحديد المستوى دخل المراجعة');
  });

  await run('جلسة المراجعة تبني طابورها من المستحقّ',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), DAY = ev('DAY');
    const items = ev('LESSONS')[0].items.slice(0, 3);
    items.forEach(it => { S.srs[it.q] = { b: 1, due: Date.now() - DAY, seen: Date.now() - 2 * DAY } });
    const queue = ctx.reviewQueue();
    if (queue.length !== 3) throw new Error('الطابور: ' + queue.length);
    ctx.launch('review');
    if (ev('S').q.items.length !== 3) throw new Error('جلسة المراجعة لم تأخذ المستحقّ');
    if (!ev('S').q.title.includes('مراجعة')) throw new Error('لا عنوان');
  });

  await run('المراجعة لا تتجاوز اثني عشر في الجلسة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), DAY = ev('DAY');
    ev('LESSONS').flatMap(l => l.items).forEach(it => {
      S.srs[it.q] = { b: 1, due: Date.now() - DAY, seen: Date.now() - 2 * DAY };
    });
    const stats = ctx.reviewStats();
    if (stats.due < 100) throw new Error('المستحقّ قليل: ' + stats.due);
    if (ctx.reviewQueue().length !== 12) throw new Error('الجلسة: ' + ctx.reviewQueue().length);
  });

  await run('بطاقة المراجعة تظهر في الصفحة الأولى',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), DAY = ev('DAY');
    if (ctx.homeView().includes('راجِع قبل أن تُنسى')) throw new Error('ظهرت بلا أي سجلّ');
    const it = ev('LESSONS')[0].items[0];
    /* مستحقّ الآن */
    S.srs[it.q] = { b: 1, due: Date.now() - 1000, seen: Date.now() - DAY };
    const h = ctx.homeView();
    if (!h.includes('راجِع قبل أن تُنسى')) throw new Error('لم تظهر مع وجود مستحقّ');
    /* وبلغةِ المتعلّم: «صندوق ٣٥ يوماً» اصطلاحٌ داخليّ. */
    if (h.includes('صندوق')) throw new Error('عاد اصطلاحُ الصناديق إلى وجه المتعلّم');
    if (!h.includes('ابدأ المراجعة')) throw new Error('لا زر');
    /* لم يحن بعد */
    S.srs[it.q] = { b: 2, due: Date.now() + 2 * DAY, seen: Date.now() };
    const h2 = ctx.homeView();
    if (h2.includes('ابدأ المراجعة')) throw new Error('عرضت زراً بلا مستحقّ');
    if (!h2.includes('لا شيء مستحقّ اليوم')) throw new Error('لا طمأنة');
  });

  await run('المراجعة لا تُستورد إلا لأسئلة موجودة', {}, (ctx, ev) => {
    const real = ev('LESSONS')[0].items[0].q;
    ctx.applyImport(JSON.stringify({
      placed: true,
      srs: {
        [real]: { b: 3, due: 123, seen: 1 },
        '<img src=x onerror=alert(1)>': { b: 1, due: 1, seen: 1 },
        'سؤال غير موجود': { b: 2, due: 1, seen: 1 },
        'آخر': 'ليس كائناً'
      }
    }));
    const srs = ev('S').srs;
    const keys = Object.keys(srs);
    if (keys.length !== 1 || keys[0] !== real) throw new Error('قبل مفاتيح غريبة: ' + keys.join(' | '));
    if (srs[real].b !== 3) throw new Error('لم يُحفظ الصندوق الصحيح');
    if (!ctx.homeView || ctx.homeView().includes('<img src=x')) throw new Error('وسم وصل إلى الشاشة');
  });

  await run('قيم المراجعة الفاسدة تُقسر إلى مداها', {}, (ctx, ev) => {
    const real = ev('LESSONS')[0].items[0].q;
    ctx.applyImport(JSON.stringify({
      placed: true, srs: { [real]: { b: 999, due: 'غداً', seen: null } }
    }));
    const e = ev('S').srs[real];
    if (e.b !== 5) throw new Error('الصندوق لم يُقسر: ' + e.b);
    if (!Number.isFinite(e.due)) throw new Error('الموعد ليس عدداً');
  });

  await run('المراجعة لا تعرض «أعد المحاولة»',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), DAY = ev('DAY');
    const items = ev('LESSONS')[0].items.filter(i => !ctx.itemTyped(i)).slice(0, 2);
    items.forEach(it => { S.srs[it.q] = { b: 1, due: Date.now() - DAY, seen: Date.now() } });
    ctx.launch('review');
    const q = ev('S').q;
    for (let i = 0; i < q.items.length; i++) {
      const it = q.items[q.i];
      ctx.pick((it.a + 1) % it.o.length);          // أخطأ في الكل
      ctx.nextQ();
    }
    const html = ctx.quizView();
    if (html.includes('أعد المحاولة')) throw new Error('عرضت إعادة المحاولة');
    /* ما أخطأ فيه رجع إلى الصندوق الأول ليعود غداً وحده. */
    items.forEach(it => {
      if (ev('S').srs[it.q].b !== 1) throw new Error('الخطأ لم يُرجع السؤال للصندوق الأول');
    });
  });

  console.log('— قياس الصلة بالسؤال —');

  await run('نوع السؤال يُستنتج من نصّه', {}, (ctx, ev) => {
    const cases = [
      ['How many bags do you have?', 'amount'],
      ['How much is it?', 'amount'],
      ['How long have you been here?', 'duration'],
      ['How old are you?', 'duration'],
      ['What time does it start?', 'time'],
      ['When do you finish?', 'time'],
      ['Where is the bank?', 'place'],
      ['What is your name?', 'person'],
      ['Who is that man?', 'person'],
      ['Why are you late?', 'reason'],
      ['How are you?', 'manner'],
      ['What would you like?', 'thing'],
      ['Do you like coffee?', 'yesno'],
      ['Are you ready?', 'yesno'],
      ['Nice day today, isn\'t it?', 'yesno'],
      ['See you tomorrow. Bye!', 'open']
    ];
    cases.forEach(([p, want]) => {
      const got = ctx.questionType(p);
      if (got !== want) throw new Error(`«${p}» => ${got} والمطلوب ${want}`);
    });
  });

  /* ردّ الصواب خطأً أسوأ من قبول الخطأ صواباً: يُشكّك المتعلّم فيما أحسن فيه. */
  await run('كل إجابة نموذجية في البرنامج تُقبل', {}, (ctx, ev) => {
    const turns = [];
    ev('SCENES').forEach(s => s.turns.forEach(t => turns.push(t)));
    ev('EXAM_SCENES').forEach(s => s.turns.forEach(t => turns.push(t)));
    const bad = turns.filter(t => ctx.relevance(t.p, t.model, t.need).level !== 'on');
    if (bad.length) throw new Error(bad.length + ' نموذجاً مرفوضاً، أولها: «'
      + bad[0].p + '» ← «' + bad[0].model + '» — ' + ctx.relevance(bad[0].p, bad[0].model, bad[0].need).why);
    if (turns.length < 150) throw new Error('عيّنة صغيرة: ' + turns.length);
  });

  await run('الإجابات التافهة لا تمرّ إلا نادراً', {}, (ctx, ev) => {
    const turns = [];
    ev('SCENES').forEach(s => s.turns.forEach(t => turns.push(t)));
    ev('EXAM_SCENES').forEach(s => s.turns.forEach(t => turns.push(t)));
    const junk = ['I like football', 'the sun is hot today', 'blah blah blah', 'from',
                  'yes', 'ok', 'I like pizza very much', 'my car is red'];
    let on = 0;
    turns.forEach(t => junk.forEach(j => {
      if (ctx.relevance(t.p, j, t.need).level === 'on') on++;
    }));
    const pc = on / (turns.length * junk.length) * 100;
    /* كان ١١٪ قبل قياس شكل الجواب. */
    if (pc > 8) throw new Error('تمرّ ' + Math.round(pc) + '٪ من التافه');
  });

  await run('صدى الكلمة المفتاحية وحده لا يُجيز الجواب', {}, (ctx, ev) => {
    /* هذه هي الحالة التي بدأ منها العمل. */
    const need = /from/i;
    if (ctx.relevance('Where are you from?', 'from', need).level === 'on')
      throw new Error('«from» وحدها مرّت');
    if (ctx.relevance('Where are you from?', 'I am from Egypt.', need).level !== 'on')
      throw new Error('الجواب الصحيح رُفض');
  });

  await run('سؤال العدد يطلب عدداً وسؤال الوقت يطلب وقتاً', {}, (ctx, ev) => {
    const any = /./;
    const amount = ctx.relevance('How many bags are you checking in?', 'I like football', any);
    if (amount.level === 'on') throw new Error('جواب بلا عدد مرّ على سؤال «كم»');
    if (!amount.why || !amount.why.includes('العدد')) throw new Error('لا تشخيص للعدد');
    if (ctx.relevance('How many bags are you checking in?', 'two bags', any).level !== 'on')
      throw new Error('«two bags» رُفضت');

    const time = ctx.relevance('What time would you like to eat?', 'in the park', any);
    if (time.level === 'on') throw new Error('جواب بلا وقت مرّ على سؤال «متى»');
    if (ctx.relevance('What time would you like to eat?', 'at eight', any).level !== 'on')
      throw new Error('«at eight» رُفضت');

    /* المدّة جوابها زمن لا عدد مجرّد. */
    if (ctx.relevance('How long have you had it?', 'Since yesterday morning.', any).level !== 'on')
      throw new Error('جواب المدّة رُفض');
  });

  await run('المجاملة جواب تامّ في موضعها', {}, (ctx, ev) => {
    const any = /./;
    ['Goodbye!', 'Thank you!', "You're welcome.", 'Thank you, you too!'].forEach(a => {
      if (ctx.relevance('See you tomorrow. Bye!', a, any).level !== 'on')
        throw new Error('رُفضت مجاملة: ' + a);
    });
  });

  await run('المحادثة تعرض سبب عدم المناسبة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.chatPick(0);
    const turn = ctx.chatTurn();
    ctx.chatReply('blah');
    const c = ev('S').chat;
    if (c.ok) throw new Error('قبل جواباً تافهاً');
    if (!c.rel) throw new Error('لم تُسجَّل درجة الصلة');
    if (!c.relWhy) throw new Error('بلا سبب');
    const html = ctx.speakView();
    if (!html.includes(c.relWhy.slice(0, 15))) throw new Error('السبب لا يظهر على الشاشة');
  });

  await run('اختبار المحادثة يفرّق بين المجيب والخارج عن الموضوع',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const sc = ev("EXAM_SCENE['x-air']");
    const run1 = ans => {
      ctx.examConvStart('x-air');
      sc.turns.forEach((t, i) => ctx.examConvAnswer(ans(t, i), 0.92));
      return ctx.examConvResult();
    };
    const good = run1(t => t.model);
    const fluentOff = run1(() => 'I like football very much');
    if (good.axes[0].sc <= fluentOff.axes[0].sc)
      throw new Error('الصلة لم تفرّق: ' + good.axes[0].sc + ' مقابل ' + fluentOff.axes[0].sc);
    if (fluentOff.pc > 50) throw new Error('الفصيح خارج الموضوع نال ' + fluentOff.pc + '٪');
  });

  await run('بنك التمارين بلغ الحجم المتّفق عليه وأنواعه الخمسة', {}, (ctx, ev) => {
    const items = ev('LESSONS').flatMap(l => l.items);
    if (items.length < 480) throw new Error('البنك ' + items.length + ' والمتّفق عليه ~٤٨٠');
    const kinds = {};
    items.forEach(i => { kinds[i.k || 'mcq'] = (kinds[i.k || 'mcq'] || 0) + 1 });
    ['mcq', 'type', 'order', 'correct', 'listen'].forEach(k => {
      if (!kinds[k] || kinds[k] < 20) throw new Error('النوع ' + k + ': ' + (kinds[k] || 0));
    });
    const typed = items.length - kinds.mcq;
    if (typed / items.length < 0.5) throw new Error('المكتوب أقلّ من النصف');
  });

  /* الموضع الثابت يُعلّم المتعلّم الخانة لا القاعدة. */
  await run('مواضع الإجابة الصحيحة موزّعة', {}, (ctx, ev) => {
    const mcq = ev('LESSONS').flatMap(l => l.items).filter(i => !i.k || i.k === 'mcq');
    const pos = {};
    mcq.forEach(i => { pos[i.a] = (pos[i.a] || 0) + 1 });
    const top = Math.max(...Object.values(pos)) / mcq.length;
    if (top > 0.5) throw new Error('موضع واحد يحوي ' + Math.round(top * 100) + '٪ من الإجابات');
  });

  await run('تمارين الإملاء سليمة ولا تكشف نصّها', {}, (ctx, ev) => {
    const items = ev('LESSONS').flatMap(l => l.items).filter(i => i.k === 'listen');
    if (items.length < 30) throw new Error('إملاء قليل: ' + items.length);
    items.forEach(it => {
      if (!it.ok || !it.ok[0]) throw new Error('إملاء بلا نصّ');
      if (ctx.checkGrammar(it.ok[0]).length) throw new Error('جملة إملاء تُرصد خطأً: ' + it.ok[0]);
      if (!/[\u0600-\u06FF]/.test(it.ar || '')) throw new Error('بلا تعليمات عربية');
    });
  });

  await run('شاشة الإملاء تُسمع ولا تعرض الجملة',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    let found = null, lesson = null;
    ev('LESSONS').forEach(l => l.items.forEach((it, i) => {
      if (!found && it.k === 'listen') { found = it; lesson = {id: l.id, i} }
    }));
    if (!found) throw new Error('لا تمرين إملاء');
    ctx.launch('lesson', lesson.id);
    ev('S').q.i = lesson.i;
    const html = ctx.quizView();
    /* عرض النصّ يحوّل الإملاء إلى نقل. */
    if (html.includes(found.ok[0])) throw new Error('نصّ الإملاء ظاهر على الشاشة');
    if (!html.includes('sayItem')) throw new Error('لا زرّ استماع');
    if (!html.includes('qtxt')) throw new Error('لا مربع كتابة');
    ctx.answerTyped(found.ok[0]);
    if (!ev('S').q.choiceOk) throw new Error('الإجابة الصحيحة حُسبت خطأ');
    /* وبعد التصحيح يُعرض النصّ ليتعلّم منه. */
    if (!ctx.quizView().includes(found.ok[0])) throw new Error('لم يُعرض النصّ بعد الإجابة');
  });

  console.log('— حراسة الملل —');

  /* الملل لا يأتي من التطابق بل من التشابه والتكتّل. هذه الاختبارات
     تقيس الثلاثة التي قِيست فعلاً قبل الإصلاح: السلاسل، والمتشابهات
     المتجاورة، والشرح المكرّر. */
  await run('لا نوعان متتاليان من جنس واحد', {}, (ctx, ev) => {
    let worst = 0, where = '';
    ev('LESSONS').forEach(l => {
      let run = 1;
      for (let i = 1; i < l.items.length; i++) {
        const same = (l.items[i].k || 'mcq') === (l.items[i - 1].k || 'mcq');
        run = same ? run + 1 : 1;
        if (run > worst) { worst = run; where = l.id }
      }
    });
    if (worst > 2) throw new Error(`${worst} تمارين متتالية من نوع واحد في الدرس ${where}`);
  });

  await run('المتشابهان لا يتجاوران', {}, (ctx, ev) => {
    const txt = i => i.q || (i.ok && i.ok[0]) || '';
    const norm = s => String(s).toLowerCase().replace(/[^a-z0-9_ ]/g, '').split(/\s+/).filter(Boolean);
    let close = 0, sample = '';
    ev('LESSONS').forEach(l => {
      for (let a = 0; a < l.items.length; a++)
        for (let b = a + 1; b < Math.min(l.items.length, a + 5); b++) {
          const A = l.items[a], B = l.items[b];
          if ((A.k || 'mcq') !== (B.k || 'mcq')) continue;
          const x = norm(txt(A)), y = norm(txt(B));
          if (x.length !== y.length || x.length < 3) continue;
          let d = 0;
          for (let k = 0; k < x.length; k++) if (x[k] !== y[k]) d++;
          if (d === 1) { close++; if (!sample) sample = l.id + ': «' + txt(A) + '» ثم «' + txt(B) + '»' }
        }
    });
    if (close > 6) throw new Error(close + ' زوجاً متشابهاً متجاوراً، منها ' + sample);
  });

  await run('الشروح مخصّصة لا مكرّرة', {}, (ctx, ev) => {
    const items = ev('LESSONS').flatMap(l => l.items);
    const tips = {};
    items.forEach(i => { tips[i.tip] = (tips[i.tip] || 0) + 1 });
    const unique = Object.keys(tips).length;
    if (unique / items.length < 0.7)
      throw new Error('الشروح الفريدة ' + unique + ' من ' + items.length);
    const top = Math.max(...Object.values(tips));
    if (top > 8) throw new Error('شرح واحد يتكرّر ' + top + ' مرّة');
  });

  /* التطابق الحرفي عبر البنوك كلّها لا تمارين الدروس وحدها. */
  await run('لا تكرار حرفي في أي بنك', {}, (ctx, ev) => {
    const seen = new Map();
    const add = (bank, text) => {
      if (!text) return;
      if (seen.has(text)) throw new Error('مكرر بين ' + seen.get(text) + ' و' + bank + ': «' + text + '»');
      seen.set(text, bank);
    };
    ev('LESSONS').forEach(l => l.items.forEach(i => add('الدروس', i.q || (i.ok && i.ok[0]))));
    ev('WRITE').forEach(t => add('الكتابة', t.ar + '|' + t.ok[0]));
    ev('TRANSLATE').forEach(t => add('الترجمة', t.ar));
    ev('READS').forEach(t => t.qs.forEach(q => add('القراءة', (q.q || q.ar) + '|' + t.id)));
    if (seen.size < 550) throw new Error('عيّنة صغيرة: ' + seen.size);
  });

  console.log('— صدق النتائج —');

  /* الرقم المعروض يجب أن يصف القدرة لا أحسن الحظّ. */
  await run('المعروض هو النتيجة الأخيرة لا أفضلها',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.keepResult('conv', 40);
    ctx.keepResult('conv', 90);
    ctx.keepResult('conv', 55);
    const r = ev('S').res.conv;
    if (r.last !== 55) throw new Error('الأخيرة ليست ٥٥: ' + r.last);
    if (r.n !== 3) throw new Error('المحاولات ليست ٣: ' + r.n);
    if (r.best !== 90) throw new Error('الأفضل لم يُحفظ للتشجيع');
    const line = ctx.resultLine('conv');
    if (!line.includes('٥٥')) throw new Error('الأخيرة لا تظهر');
    if (!line.includes('٣')) throw new Error('عدد المحاولات لا يظهر');
    if (line.indexOf('٩٠') >= 0 && line.indexOf('٩٠') < line.indexOf('٥٥'))
      throw new Error('الأفضل معروض قبل الأخيرة');
  });

  await run('المحاولة الأولى لا تعرض عدّاداً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.keepResult('read', 70);
    const line = ctx.resultLine('read');
    if (!line.includes('٧٠')) throw new Error('لا نتيجة');
    if (line.includes('محاول')) throw new Error('عدّاد في المحاولة الأولى');
    if (ctx.resultLine('write')) throw new Error('عرض نتيجة لاختبار لم يُخض');
  });

  await run('سجلّ النتائج يُنقّى عند الاستيراد', {}, (ctx, ev) => {
    ctx.applyImport(JSON.stringify({ placed: true, res: {
      conv: {last: 77, best: 88, n: 4, at: 123},
      '<img src=x onerror=alert(1)>': {last: 99, best: 99, n: 1},
      write: {last: 'كثير', best: 999, n: -5, at: 'أمس'}
    }}));
    const res = ev('S').res;
    const keys = Object.keys(res);
    if (keys.some(k => /img|script|</.test(k))) throw new Error('مفتاح غريب: ' + keys.join('|'));
    if (!res.conv || res.conv.last !== 77 || res.conv.n !== 4) throw new Error('السجلّ الصحيح لم يُحفظ');
    if (!res.write) throw new Error('السجلّ الفاسد حُذف بدل أن يُقسر');
    if (res.write.last !== 0) throw new Error('نصّ لم يُقسر صفراً: ' + res.write.last);
    if (res.write.best > 100) throw new Error('تجاوز المئة: ' + res.write.best);
    if (res.write.n < 0) throw new Error('محاولات سالبة');
    /* ولا يصل شيء من ذلك إلى الشاشة. */
    if (/<img|onerror/.test(ctx.courseView())) throw new Error('وسم وصل إلى الشاشة');
  });

  console.log('— الإملاء والمعيار الدولي —');

  await run('اختبار الإملاء يمشي إلى النهاية',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    if (ctx.dictationPool().length < 30) throw new Error('مخزون قليل');
    ctx.examDictStart();
    const d = ev('S').dx;
    if (d.items.length !== 10) throw new Error('عدد الجمل: ' + d.items.length);
    for (let i = 0; i < d.items.length; i++) {
      const it = ctx.examDictItem();
      /* النصّ لا يظهر قبل الإجابة. */
      if (ctx.examDictView().includes(it.ok[0])) throw new Error('نصّ الإملاء مكشوف');
      ctx.examDictAnswer(i < 8 ? it.ok[0] : 'zzz');
      ctx.examDictNext();
    }
    const r = ctx.examDictResult();
    if (r.right !== 8 || r.pc !== 80) throw new Error('الحساب: ' + r.right + '/' + r.n + ' = ' + r.pc);
    if (!ctx.examDictView().includes('٪')) throw new Error('لا نسبة');
    ctx.examDictFinish();
    if (ev('S').dx) throw new Error('الجلسة لم تُمحَ');
    if (ev('S').res.dictation.last !== 80) throw new Error('لم تُحفظ النتيجة');
  });

  await run('مرّات السماع تُحصى وتُعرض',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ctx.examDictStart();
    ctx.examDictPlay(); ctx.examDictPlay(); ctx.examDictPlay();
    if (ev('S').dx.plays !== 3) throw new Error('العدّ: ' + ev('S').dx.plays);
    if (!ctx.examDictView().includes('سمعتَها')) throw new Error('لا يظهر العدّ');
    ctx.examDictAnswer(ctx.examDictItem().ok[0]);
    if (ev('S').dx.shown.plays !== 3) throw new Error('لم يُسجَّل مع الإجابة');
  });

  /* إعادة الاختبار على مشهدٍ جُرّب تقيس الحفظ لا القدرة. */
  await run('مشهد المحادثة لا يتكرّر قبل أن تدور المواقف',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const total = ev('EXAM_SCENES').length;
    const seen = [];
    for (let i = 0; i < total; i++) {
      ctx.examConvStart();
      const id = ev('S').cx.id;
      if (seen.includes(id)) throw new Error('تكرّر «' + id + '» في الدورة الأولى');
      seen.push(id);
    }
    if (seen.length !== total) throw new Error('لم تدر كلها');
    /* وبعد أن دارت كلّها تبدأ دورة جديدة. */
    ctx.examConvStart();
    if (!ev('S').cx) throw new Error('توقّف بعد نفاد المشاهد');
  });

  await run('القدرة لا تُحتسب مُثبَتة بالدرس وحده',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const cap = ev('CEFR_A1').find(c => c.exam === 'read');
    let st = ctx.capabilityState(cap);
    if (st.level !== 'locked') throw new Error('بدأ غير مقفل: ' + st.level);
    cap.lessons.forEach(id => { ev('S').lessons[id] = true });
    st = ctx.capabilityState(cap);
    if (st.level !== 'untested') throw new Error('الدرس وحده أثبت القدرة: ' + st.level);
    /* نتيجة دون العتبة لا تُثبت. */
    ctx.keepResult('read', 50);
    if (ctx.capabilityState(cap).level !== 'weak') throw new Error('٥٠٪ أثبتت القدرة');
    ctx.keepResult('read', 80);
    if (ctx.capabilityState(cap).level !== 'proven') throw new Error('٨٠٪ لم تُثبتها');
  });

  /* المصداقية في إعلان النقص لا إخفائه. */
  /* إعلان الحدّ لا يختفي بتمام مستوى، بل ينتقل إلى ما فوقه. */
  await run('شاشة المعيار تُعلن حدّ البرنامج دائماً', {}, (ctx, ev) => {
    const r = ctx.cefrReport();
    const html = ctx.cefrView();
    if (r.gaps.length) {
      if (r.coverage >= 100) throw new Error('نواقص معلنة مع ادّعاء التمام');
      if (!html.includes('ما لا يغطّيه')) throw new Error('النواقص لا تظهر');
      r.gaps.slice(0, 3).forEach(g => {
        if (!html.includes(g.t)) throw new Error('نقص غائب عن الشاشة: ' + g.t);
      });
    } else {
      /* اكتمل A1: يجب أن يُعلن أنّه لا يغطّي ما فوقه. */
      if (!html.includes('حدّ هذا البرنامج')) throw new Error('لا إعلان للحدّ بعد تمام المستوى');
      ['A2', 'B1', 'C2'].forEach(lv => {
        if (!html.includes(lv)) throw new Error('لا يذكر أنّه لا يغطّي ' + lv);
      });
      if (!html.includes('ستّة مستويات')) throw new Error('لا يذكر أنّ السلّم ستّة');
    }
  });

  await run('كل قدرة مرتبطة بدروس واختبار موجودين', {}, (ctx, ev) => {
    const slots = ['conv', 'write', 'read', 'dictation', 'translate'];
    const ids = ev('LESSONS').map(l => l.id);
    ev('CEFR_A1').forEach(c => {
      if (!c.lessons || !c.lessons.length) throw new Error(c.id + ': بلا دروس');
      c.lessons.forEach(id => { if (!ids.includes(id)) throw new Error(c.id + ': درس غير موجود ' + id) });
      if (!slots.includes(c.exam)) throw new Error(c.id + ': اختبار غير معروف ' + c.exam);
      if (!/[\u0600-\u06FF]/.test(c.t)) throw new Error(c.id + ': الوصف ليس بالعربية');
    });
  });

  console.log('— صدق الخريطة —');

  /* السبب الذي من أجله وُجدت هذه الشاشة: ألّا يُكتشف النقص بالسؤال. */
  await run('الخريطة تعرض المستويات الستّة لا مستوانا وحده', {}, (ctx, ev) => {
    const ids = ev('LEVELS').map(l => l.id);
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(id => {
      if (!ids.includes(id)) throw new Error('مستوى غائب: ' + id);
    });
    const html = ctx.roadmapView();
    ['A2', 'B1', 'C2'].forEach(id => {
      if (!html.includes(id)) throw new Error('لا يظهر ' + id + ' على الشاشة');
    });
    if (!html.includes('ستّة مستويات')) throw new Error('لا يذكر أنّ السلّم ستّة');
  });

  await run('لا يُعلَن مستوى لا محتوى خلفه', {}, (ctx, ev) => {
    /* عُرض «A2» يوماً بلا درس واحد خلفه. */
    ev('LEVELS').filter(l => l.state === 'done' || l.state === 'doing').forEach(l => {
      const built = ev('STAGES').filter(s => s.level === l.id)
        .flatMap(s => s.units).flatMap(u => u.lessons).filter(x => x.state === 'done');
      if (!built.length) throw new Error('المستوى ' + l.id + ' معلَن بلا دروس مبنيّة');
    });
    /* القاعدة عامّة لا تخصّ مستوىً بعينه: ما عُرض مبنيّاً فله دروس
       مبنيّة، وما له دروس مبنيّة فلا يُعرض كأنّه لم يبدأ. */
    ev('LEVELS').forEach(lv => {
      const n = ev('STAGES').filter(st => st.level === lv.id)
        .flatMap(st => st.units).flatMap(u => u.lessons).filter(x => x.state === 'done').length;
      const shown = lv.state === 'done' || lv.state === 'doing';
      if (shown && !n) throw new Error(lv.id + ' معروض كمبنيّ بلا دروس');
      if (!shown && n) throw new Error(lv.id + ' فيه دروس مبنيّة ولم يُعلَن');
      /* و«done» تعني تمام دروسه كلّها لا بعضها. */
      const all = ev('STAGES').filter(st => st.level === lv.id)
        .flatMap(st => st.units).flatMap(u => u.lessons).length;
      if (lv.state === 'done' && n < all) throw new Error(lv.id + ': معلَن تامّاً وفيه ناقص');
    });
  });

  await run('خريطة الشاشة تطابق الدروس الموجودة فعلاً', {}, (ctx, ev) => {
    const real = ev('LESSONS').map(l => l.id).sort();
    const claimedDone = ev('STAGES').flatMap(s => s.units).flatMap(u => u.lessons)
      .filter(l => l.state === 'done').map(l => l.id).sort();
    if (claimedDone.join() !== real.join())
      throw new Error('الخريطة تدّعي: ' + claimedDone.join('،') + ' والموجود: ' + real.join('،'));
  });

  await run('الخريطة تعدّ المبنيّ من المخطَّط', {}, (ctx, ev) => {
    const c = ctx.roadmapCounts();
    if (c.done !== ev('LESSONS').length) throw new Error('العدّ لا يطابق الواقع');
    /* كان هنا شرطُ total > done، أي أنّ في الخطة باقياً. وقد تمّ
       المنهج كلُّه فسقط الشرط — وليس هذا عيباً فيه بل بلوغاً لغايته.
       والحارسُ الباقي هو الأهمّ: المعدود يطابق الموجود، لا أكثر. */
    if (c.total < c.done) throw new Error('المبنيّ يتجاوز المخطَّط — عدٌّ فاسد');
    /* نصٌّ كُتب لحالٍ ثمّ تغيّر الحال: بقيت الشاشة تقول «البرنامج
       اليوم داخل الأول منها» بعد بناء الستّة، وبقيت بطاقةُ «ما بعد
       A2» تَعِد بـB1 بعد بنائه. فلا وعدَ بما تمّ. */
    if (c.done === c.total && /أمامك|داخل الأول/.test(ctx.roadmapView()))
      throw new Error('الخطة تمّت والشاشة ما زالت تَعِد بما بُني');
    const html = ctx.roadmapView();
    if (!html.includes(ctx.ar(c.done)) || !html.includes(ctx.ar(c.total)))
      throw new Error('العدد لا يظهر على الشاشة');
  });

  console.log('— المحرّك يتّسع للوحدات الجديدة —');

  /* كانت [1,2,3] مكتوبة في خمسة عشر موضعاً، فإضافة وحدة رابعة تُسقطها
     من الامتحان النهائي وتحديد المستوى وفتح الوحدات — صامتةً بلا خطأ. */
  await run('أرقام الوحدات مشتقّة من المحتوى لا مكتوبة', {}, (ctx, ev) => {
    const ns = ev('UNIT_NS'), units = ev('UNITS');
    if (ns.length !== units.length) throw new Error('العدد لا يطابق المحتوى');
    units.forEach(u => { if (!ns.includes(u.n)) throw new Error('وحدة غائبة: ' + u.n) });
    if (ev('LAST_UNIT') !== Math.max(...units.map(u => u.n))) throw new Error('آخر وحدة خطأ');
  });

  await run('الامتحان النهائي يسحب من كل الوحدات',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const last = ev('LAST_UNIT');
    const all = ctx.itemsUpTo(last).length;
    const allItems = ev('LESSONS').flatMap(l => l.items).length;
    if (all !== allItems) throw new Error('itemsUpTo لا يشمل الكل: ' + all + ' من ' + allItems);
    /* ولا يسحب من وحدة لم تُفتح بعد حين نطلب ما دونها. */
    const upTo1 = ctx.itemsUpTo(1).length;
    if (upTo1 >= all) throw new Error('itemsUpTo(1) يشمل أكثر ممّا ينبغي');
  });

  await run('تحديد المستوى يقيس كل الوحدات',
    { 'eng-coach-v3': JSON.stringify({ placed: false }) }, (ctx, ev) => {
    ctx.launch('place');
    const n = ev('PLACE_N') || 12;
    for (let i = 0; i < n + 2 && ev('S').q; i++) {
      const q = ev('S').q;
      if (q.done) break;
      const it = q.items[q.i];
      if (!it) break;
      if (ctx.itemTyped(it)) ctx.answerTyped(it.ok[0]); else ctx.pick(it.a);
      ctx.nextQ();
    }
    const acc = ev('S').place && ev('S').place.acc;
    if (!acc) throw new Error('لا قياس');
    ev('UNIT_NS').forEach(u => {
      if (!(u in acc)) throw new Error('الوحدة ' + u + ' لم تدخل القياس');
    });
  });

  /* صار لكل مستوى امتحانه، فالاختبار على مستوىً لا على البرنامج كلّه.
     والأهمّ هنا: وحدات A2 لا تؤثّر في فتح امتحان A1 ولا في إغلاقه. */
  await run('امتحان المستوى لا تؤثّر فيه وحدات مستوىً آخر',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S');
    const built = ev('LEVELS_BUILT');
    const first = built[0];
    const own = ctx.levelUnits(first), last = own[own.length - 1];
    S.cp = {}; S.ret = {};
    if (ctx.levelExamOpen(first)) throw new Error('مفتوح بلا اجتياز شيء');
    own.forEach(u => { S.cp[u] = true });
    own.filter(u => u < last).forEach(u => { S.ret[u] = true });
    if (!ctx.levelExamOpen(first)) throw new Error('لم يُفتح بعد اجتياز وحداته');

    /* وحدة من مستوىً آخر لا تغلقه ولا تفتحه. */
    const other = ev('UNIT_NS').filter(u => own.indexOf(u) < 0);
    other.forEach(u => { delete S.cp[u]; delete S.ret[u] });
    if (!ctx.levelExamOpen(first)) throw new Error('أغلقته وحدةٌ من مستوىً آخر');

    delete S.cp[last];
    if (ctx.levelExamOpen(first)) throw new Error('مفتوح والوحدة الأخيرة لم تُجتَز');
  });

  console.log('— المحرّك يتّسع للمستويات —');

  await run('كل وحدة موسومة بمستواها، والمستويات مشتقّة منها', {}, (ctx, ev) => {
    ev('UNITS').forEach(u => {
      if (!u.lv) throw new Error('الوحدة ' + u.n + ' بلا مستوى');
      if (!/^[ABC][12]$/.test(u.lv)) throw new Error('مستوى غريب: ' + u.lv);
    });
    const built = ev('LEVELS_BUILT');
    if (!built.length) throw new Error('لا مستوى مبنيّ');
    built.forEach(lv => {
      if (!ctx.levelUnits(lv).length) throw new Error(lv + ' معلَن مبنيّاً بلا وحدات');
    });
  });

  /* ولولا هذا لسأل امتحانُ A1 عن الماضي بمجرّد إضافة وحدات A2. */
  await run('امتحان المستوى يسحب من وحداته وحدها',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    ev('LEVELS_BUILT').forEach(lv => {
      const own = new Set(ctx.levelItems(lv));
      ctx.launch('exam', lv);
      const q = ev('S').q;
      if (q.lv !== lv) throw new Error('الامتحان لم يلتزم المستوى: ' + q.lv);
      if (!q.title.includes(lv)) throw new Error('العنوان بلا المستوى: ' + q.title);
      q.items.forEach(it => {
        if (!own.has(it)) throw new Error('سؤال من خارج ' + lv);
      });
      ctx.closeQ();
    });
  });

  await run('امتحان المستوى يُفتح باجتياز وحداته هو',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), lv = ev('LEVELS_BUILT')[0];
    S.cp = {}; S.ret = {};
    if (ctx.levelExamOpen(lv)) throw new Error('مفتوح بلا اجتياز');
    const us = ctx.levelUnits(lv), last = us[us.length - 1];
    us.forEach(u => { S.cp[u] = true });
    us.filter(u => u < last).forEach(u => { S.ret[u] = true });
    if (!ctx.levelExamOpen(lv)) throw new Error('لم يُفتح بعد اجتياز كل وحداته');
    delete S.cp[last];
    if (ctx.levelExamOpen(lv)) throw new Error('مفتوح والوحدة الأخيرة لم تُجتَز');
  });

  await run('تقرير القدرات لكل مستوى على حدة', {}, (ctx, ev) => {
    const ids = ev('LEVEL_IDS');
    ['A1', 'A2', 'B1', 'C2'].forEach(x => {
      if (!ids.includes(x)) throw new Error('مستوى غائب من الخريطة: ' + x);
    });
    const a1 = ctx.cefrReport('A1');
    if (!a1.total) throw new Error('A1 بلا قدرات');
    /* كل قدرة معلنة لها دروس موجودة فعلاً، ولا تُحتسب تغطية بلا بناء. */
    ids.forEach(id => {
      const r = ctx.cefrReport(id);
      const lessons = ev('LESSONS').map(l => l.id);
      r.rows.forEach(c => c.lessons.forEach(ls => {
        if (!lessons.includes(ls)) throw new Error(id + '/' + c.id + ': درس غير موجود ' + ls);
      }));
      if (!r.total && r.coverage) throw new Error(id + ': تغطية بلا قدرات');
      if (r.total && r.gaps.length && r.coverage >= 100)
        throw new Error(id + ': يدّعي التمام وفيه نواقص');
    });
    /* المستوى الحالي هو أوّل ما لم يُتمّ، ولا يكون مستوىً خالياً. */
    const here = ctx.currentLevel();
    if (!ctx.cefrReport(here).total) throw new Error('المستوى الحالي خالٍ: ' + here);
  });

  /* الرئيسية كانت تقول «أين أنت من A1» و«من أساسيات A1» و«الامتحان
     النهائي A1» و«/٣ وحدات» — أربعةُ نصوصٍ كُتبت يوم كان البرنامج
     A1 وثلاثَ وحدات. فبقيت تقولها لمن بلغ C2، وcefrReport بلا وسيطٍ
     ترجع A1 دائماً فكانت الأرقامُ أرقامَ A1 أيضاً. */
  await run('الرئيسية تتبع مستوى المتعلّم لا مستوىً مكتوباً',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const S = ev('S'), ids = ev('LEVEL_IDS');
    /* أثبِت قدرات المستوى الأول كلَّها، فينتقل «الحاليّ» إلى ما بعده. */
    const first = ids.find(id => ctx.cefrReport(id).total);
    S.res = S.res || {};
    ctx.cefrReport(first).rows.forEach(c => {
      c.lessons.forEach(id => { S.lessons[id] = true });
      S.res[c.exam] = {n: 1, last: 90};
    });
    const now = ctx.currentLevel();
    if (now === first) throw new Error('لم ينتقل المستوى رغم إثبات قدراته');
    const html = ctx.homeView();
    if (!html.includes(now)) throw new Error('الرئيسية لا تذكر مستواه ' + now);
    /* ولا تذكر مستوىً أتمّه كأنّه موضعُه الآن. */
    if (new RegExp('(أين أنت من|أساسيات|الامتحان النهائي)[^<]*<[^>]*>' + first)
        .test(html) || html.includes('من قدرات ' + first))
      throw new Error('الرئيسية ما زالت تنسبه إلى ' + first);
    if (html.includes('/٣<') || html.includes('>٣<'))
      throw new Error('عدد الوحدات مكتوبٌ ثلاثةً لا مشتقّاً');
  });

  /* تمّ المنهج المخطَّط كلُّه، فسقط الحارسُ الذي كان يكفي: «فيه باقٍ
     إذن لا يدّعي التمام». ولو حُذف آخرُ نقصٍ مُعلَنٍ بعد اليوم لقال
     البرنامج إنّه يعلّم الإنجليزية كلَّها — وفيها ما لا يقيسه محرّك
     أنماطٍ أبداً: السخرية والتلميح والمجاز. فهذا حارسُ الدعوى. */
  await run('لا يدّعي البرنامج تمامَ اللغة ولو تمّت خطّته', {}, (ctx, ev) => {
    const planLeft = ev('STAGES').flatMap(s => s.units).flatMap(u => u.lessons)
      .some(l => l.state !== 'done');
    const gaps = ev('LEVEL_IDS').reduce((n, id) => n + ctx.cefrReport(id).gaps.length, 0);
    if (!planLeft && !gaps)
      throw new Error('الخطة تمّت ولا نقصَ مُعلَن — دعوى تمامٍ لا تصحّ');
  });

  await run('الشاشة تعرض السلّم كلّه لا المبنيّ وحده', {}, (ctx, ev) => {
    const html = ctx.cefrView();
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lv => {
      if (!html.includes(lv)) throw new Error('لا يذكر ' + lv);
    });
    const rep = ctx.levelsReport();
    rep.filter(l => !l.built).forEach(l => {
      if (l.coverage) throw new Error(l.id + ': تغطية بلا بناء');
    });
  });

  /* السهم يدلّ على موضع واحد. ووحداتٌ كثيرة تكون مفتوحة معاً، فلو وُسمت
     كلّها «الوحدة الحالية» لم يَدُلّ السهم على شيء. */
  await run('سهم «الوحدة الحالية» يشير إلى وحدة واحدة لا إلى كل المفتوح',
    { 'eng-coach-v3': JSON.stringify({ placed: true , words: WORDS_DONE, scenes: SCENES_DONE }) }, (ctx, ev) => {
    const lessons = ev('LESSONS'), units = ev('UNIT_NS');
    units.forEach(u => { ev('S').cp[u] = true; ev('S').ret[u] = true });
    lessons.forEach(l => { ev('S').lessons[l.id] = 100 });
    const h = ctx.courseView();
    const n = (h.match(/الوحدة الحالية/g) || []).length;
    if (n > 1) throw new Error('السهم على ' + n + ' وحدات');
    const open = units.filter(u => ev('unitOpen')(u) && !ev('unitDone')(u));
    if (open.length > 1 && n !== 1) throw new Error('وحدات مفتوحة بلا سهم على إحداها');
  });

  /* نصٌّ عربيّ داخل نطاقٍ إنجليزيّ ينقلب ترتيبه على الشاشة، فيقرأ
     المتعلّم القاعدة معكوسة. والاختبار لا يراه، ولا تراه أنا إلا بالعين. */
  await run('لا نصّ عربيّ داخل نطاق إنجليزيّ', {}, (ctx, ev) => {
    const arabic = /[؀-ۿ]/;
    const bad = [];
    const scan = (where, html) => {
      const re = /<span class=en>([^<]*)<\/span>/g;
      let m; while ((m = re.exec(html || ''))) if (arabic.test(m[1])) bad.push(where + ': ' + m[1]);
    };
    ev('RULES').forEach(r => scan(r.id, [r.rule, r.why, ...(r.more || []),
      ...(r.bad || []), r.ar].join(' ')));
    ev('LESSONS').forEach(l => scan(l.id, l.more));
    if (bad.length) throw new Error(bad.length + ' نطاقاً: ' + bad[0]);
  });

  /* المستوى المبنيّ نصفَ بناء لا هو تامّ ولا هو غائب، فمن السهل أن
     يسقط من الإعلان بين الاثنين. وهذا ما وقع فعلاً حين بُني نصف A2. */
  await run('كل مستوى بُني منه شيء ولم يتمّ يُعلَن على الشاشة', {}, (ctx, ev) => {
    const html = ctx.cefrView();
    ctx.levelsReport().filter(l => l.built && l.gaps).forEach(l => {
      if (!html.includes(l.id)) throw new Error(l.id + ' مبنيّ ناقص ولا يُذكر');
    });
    const silent = ctx.levelsReport().filter(l => l.built && l.gaps)
      .filter(l => !/ناقص|بقي|بقيّتها|قيد البناء/.test(html));
    if (silent.length) throw new Error('نقص ' + silent[0].id + ' مذكورٌ بلا بيان');
  });

  /* ولا يُذكر مستوىً تامٌّ دون أخيه: البطاقة كانت تسمّي المستوى الذي
     يقف عنده المتعلّم وحده، فلمّا تمّ A2 بقي الإعلان يقول «A1 كاملاً». */
  await run('كل مستوى تامّ يُذكر في حدّ البرنامج', {}, (ctx, ev) => {
    const html = ctx.cefrView();
    const full = ctx.levelsReport().filter(l => l.built && !l.gaps);
    full.forEach(l => {
      if (!html.includes('<b>' + l.id + '</b>')) throw new Error(l.id + ' تامّ ولا يُذكر');
    });
  });

  /* أداةُ الصدر تحكم: «Where did you live when you were a child?» سؤالٌ
     عن مكان، وwhen فيه ظرفٌ تابع. وكان الماسحُ العامُّ يسبق إلى when
     فيطلب ساعةً ممّن سأل عن مدينة — ويُرفض الجواب الصحيح. */
  await run('أداة السؤال في صدره تحكم، لا أيُّ أداةٍ وردت فيه', {}, (ctx, ev) => {
    const cases = [
      ['Where did you live when you were a child?', 'place'],
      ['Will you call me when you arrive?', 'yesno'],
      ['Did you go out when it stopped raining?', 'yesno'],
      ['When is your birthday?', 'time'],
      ['Excuse me, where is the station?', 'place'],
      ['Why were you late?', 'reason'],
      ['How many books do you have?', 'amount'],
      ['Is there any milk?', 'yesno']
    ];
    cases.forEach(([q, want]) => {
      const got = ctx.questionType(q);
      if (got !== want) throw new Error('«' + q + '» → ' + got + ' والمتوقَّع ' + want);
    });
  });

  /* محتوىً مبنيٌّ لا يبلغه المتعلّم أسوأ من محتوىً لم يُبنَ: العدّ
     يقول إنه موجود، والشاشة لا تعرضه أبداً. وقد وقع هذا فعلاً — كان
     سقف اختبار الترجمة الرقمَ ٣ مكتوباً، فبقيت إحدى وأربعون جملة في
     البنك لا يراها أحد، منها وحدتان سبقتا A2. */
  /* كان بندُ الاختيار يعرض q وحدَه، وar لا تُعرض له ألبتة. فمئةٌ
     وستّةٌ وخمسون بنداً كُتبت لها تعليماتٌ عربية لم يرَها أحد، ومنها
     ستّةٌ وثلاثون لا فراغَ فيها — فكان المتعلّم يرى موقفاً وثلاثة
     خيارات ولا يدري عمّ يُسأل. فلا سؤالَ مخفيّ بعد اليوم. */
  await run('السؤال يصل المتعلّم: لا تعليماتٍ مكتوبةً لا تُعرَض', {}, (ctx, ev) => {
    const S = ev('S');
    ev('LESSONS').forEach(l => l.items.forEach((it, i) => {
      if (it.k && it.k !== 'mcq') return;
      const blank = /___/.test(it.q || '');
      if (!blank && !it.ar)
        throw new Error(l.id + '#' + (i + 1) + ': اختيارٌ بلا فراغٍ ولا تعليمات');
      if (!it.ar) return;
      /* والمكتوب يُعرض فعلاً، لا يُكتفى بوجوده في البيانات. */
      S.q = {items: [it], i: 0, picked: null, title: 'فحص', kind: 'lesson'};
      const html = ctx.quizView();
      if (!html.includes(ctx.esc(it.ar)))
        throw new Error(l.id + '#' + (i + 1) + ': تعليماتُه لا تظهر على الشاشة');
    }));
    S.q = null;
  });

  /* فاصلةٌ زائدةٌ بين مدخلين تصنع ثقباً في المصفوفة: [a, , b]. وطولُها
     يعدّه، وfilter وforEach وmap تتخطّاه جميعاً — فلا يظهر في أيّ
     فحصٍ يمرّ عليها، ويظهر عند أوّل قراءةٍ بالفهرس بصورة undefined.
     وقد وقع هذا عند إلحاق بنوك C1. */
  await run('لا ثقب في بنوك المحتوى', {}, (ctx, ev) => {
    [['CONVO', ev('CONVO')], ['READS', ev('READS')],
     ['TRANSLATE', ev('TRANSLATE')], ['WRITE', ev('WRITE')],
     ['LESSONS', ev('LESSONS')]].forEach(([name, bank]) => {
      for (let i = 0; i < bank.length; i++)
        if (!(i in bank) || !bank[i])
          throw new Error(name + ': ثقبٌ عند الموضع ' + i + ' — فاصلةٌ زائدة');
    });
  });

  /* migrate لا تُنقص تقدّماً مشروعاً.

     وكانت قوائمُ السماح مكتوبةً بأرقامٍ ثابتة: الوحداتُ ['1','2','3']
     والمحادثاتُ c1..c6، والمنهجُ أربعٌ وعشرون وحدةً وثمانٍ وأربعون
     محادثة. فمن اجتاز بوابةَ الوحدة الرابعة فقدها عند أوّل فتحٍ
     للتطبيق — صامتاً، بلا خطأ. وmergeInto تمرّ بـmigrate كذلك،
     فتقدّمُ الجهاز الآخر يُجرَّد قبل أن يُدمَج.

     والحارسُ يمشي على المحتوى لا على أرقام: تُعلَّم كلُّ وحدةٍ وكلُّ
     محادثةٍ ثمّ يُطلَب استرجاعُها. */
  await run('migrate لا تُسقط تقدّماً من أيّ وحدةٍ أو محادثة', {}, (ctx, ev) => {
    const migrate = ev('migrate'), UNITS = ev('UNITS'), CONVO = ev('CONVO');
    const all = {placed: true, cp: {}, ret: {}, skipped: {}, conv: {}};
    UNITS.forEach(u => { all.cp[u.n] = true; all.ret[u.n] = true; all.skipped[u.n] = true });
    CONVO.forEach(c => { all.conv[c.id] = true });

    const back = migrate(JSON.parse(JSON.stringify(all)));
    ['cp', 'ret', 'skipped'].forEach(k => {
      const lost = UNITS.filter(u => !back[k][u.n]).map(u => u.n);
      if (lost.length) throw new Error(k + ': سقطت الوحدات ' + lost.join('، '));
    });
    const lostC = CONVO.filter(c => !back.conv[c.id]).map(c => c.id);
    if (lostC.length) throw new Error('conv: سقطت ' + lostC.length + ' محادثة، منها ' + lostC[0]);
  });

  /* سؤالُ المفردات يُجاب بالمعرفة لا بالحظّ.

     وكان too وalso كلاهما «أيضاً» في حقلٍ واحد، فيُعرض زرّان
     متطابقان ويُخطَّأ أحدُهما — والمتعلّم يرى ما يُرسَم لا ما
     يُخزَّن. ثمّ لمّا نُقّيت نَقَص السؤالُ خياراً، فتُكمَل من بركةٍ
     أوسع: لا متطابقان ولا ناقص. */
  await run('خياراتُ المفردات أربعةٌ متمايزة', {}, (ctx, ev) => {
    const wordsItems = ev('wordsItems');
    let dup = 0, short = 0, badA = 0, n = 0;
    for (let k = 0; k < 60; k++) [1, 2, 3, 4, 5].forEach(u => {
      wordsItems(u).forEach(it => {
        n++;
        if (new Set(it.o).size !== it.o.length) dup++;
        if (it.o.length !== 4) short++;
        if (typeof it.a !== 'number' || it.a < 0 || it.a >= it.o.length) badA++;
      });
    });
    if (!n) throw new Error('لم يُولَّد سؤالٌ واحد');
    if (dup) throw new Error(dup + ' سؤالاً فيه خياران متطابقان من ' + n);
    if (short) throw new Error(short + ' سؤالاً خياراتُه ليست أربعة');
    if (badA) throw new Error(badA + ' سؤالاً فهرسُ جوابه خارج خياراته');
  });

  /* تبويبُ التحدّث ليس باباً جانبيّاً.

     وكان يعرض المشاهدَ الستّةَ والسبعين جميعاً بلا تصفية، فيرى
     المبتدئُ في وحدته الأولى مشاهدَ C2 ويستطيع أن يترك الرحلةَ
     كلَّها ويقضي وقته فيه.

     والقاعدة: مشاهدُ الدروس إلى ما بلغ، والموضوعيّةُ حرّةٌ دائماً —
     فهي عونٌ لا طريقٌ بديل. */
  await run('تبويبُ التحدّث يعرض ما بلغه المتعلّم لا المنهجَ كلَّه',
    { 'eng-coach-v3': JSON.stringify({placed: true, lessons: {'1.1': true}}) },
    (ctx, ev) => {
      const SC = ev('SCENES'), sceneUnit = ev('sceneUnit');
      const html = ctx.speakView();
      const beyond = SC.filter(s => {
        const u = sceneUnit(s);
        return u !== undefined && u > ev('reachedUnit')();
      });
      if (!beyond.length) throw new Error('لا مشاهدَ فوق ما بلغ — البذرةُ لا تقيس شيئاً');
      const leaked = beyond.filter(s => html.includes('درس ' + s.les));
      if (leaked.length)
        throw new Error(leaked.length + ' مشهداً فوق ما بلغ معروضٌ في التبويب، منها درس ' + leaked[0].les);

      /* والموضوعيّةُ تبقى: هي عونٌ لا طريقٌ بديل. */
      const free = SC.filter(s => sceneUnit(s) === undefined);
      if (free.length && !free.some(s => html.includes(s.t)))
        throw new Error('المشاهدُ الحرّةُ اختفت، وهي ليست من المنهج حتى تُقفَل');
    });

  /* القرارُ: مشهدُ الدرس محطّةٌ في وحدته، والتبويبُ للعامّ وحده.

     وكان التبويبُ يعرض مشاهدَ الدروس أيضاً «إلى ما بلغ» — وهذا
     يُغني عن المرور بالوحدة، وهو البابُ الجانبيُّ نفسُه الذي أُغلق. */
  await run('تبويبُ التحدّث للمشاهد الحرّة وحدها: لا درسَ فيه',
    { 'eng-coach-v3': JSON.stringify({placed: true, u: 24, cp: {}, lessons: {}}) },
    (ctx, ev) => {
      const SC = ev('SCENES'), sceneUnit = ev('sceneUnit');
      const html = ctx.speakView();

      const lessons = SC.filter(s => s.les);
      if (!lessons.length) throw new Error('لا مشاهدَ دروسٍ — البذرةُ لا تقيس شيئاً');

      const leaked = lessons.filter(s => html.includes('درس ' + s.les));
      if (leaked.length)
        throw new Error(leaked.length + ' مشهدَ درسٍ معروضٌ في تبويب التحدّث، منها ' + leaked[0].les
          + ' — مكانُه محطّةُ المشهد في وحدته');

      if (html.includes('>درس<') || html.includes('>درس '))
        throw new Error('تصنيفُ «درس» ما زال في شريط التصنيفات');

      /* والحرُّ يبقى معروضاً، وإلّا فالتبويبُ فارغ. */
      const free = SC.filter(s => sceneUnit(s) === undefined);
      if (!free.some(s => html.includes(s.t)))
        throw new Error('التبويبُ خلا من المشاهد الحرّة أيضاً');
    });

  /* البوابةُ مقفلةٌ في الخريطة كما هي في «الخطوة التالية».

     وكان زرُّ البوابة يفحص الدروسَ والمحادثةَ وحدهما، فمن نزل إلى
     الخريطة وجده مفتوحاً على وحدةٍ لم تُقرأ ولم تُكتب — بابٌ من
     جهةٍ مُقفَلٌ ومن أخرى مفتوح. */
  await run('زرُّ البوابة لا يظهر على وحدةٍ لم تُخدَم',
    { 'eng-coach-v3': JSON.stringify({
        placed: true, words: { 1: 100 }, scenes: SCENES_DONE,
        lessons: { '1.1': true, '1.2': true, '1.3': true },
        conv: { c1: true, c2: true }
      }) },
    (ctx, ev) => {
      if (ev('gateOpen')(1)) throw new Error('البوابة مفتوحةٌ والمهاراتُ لم تُؤدَّ');
      if (ctx.cpBtn(1).includes('launch(\'cp\''))
        throw new Error('زرُّ البوابة معروضٌ على وحدةٍ لم تُخدَم');
      if (!ctx.cpBtn(1).includes('تبقى قبل البوابة'))
        throw new Error('لا يُقال للمتعلّم ما الذي يُبقي بوابتَه مغلقة');

      /* ومتى خُدمت ظهر الزرّ. */
      ev('S').skills = { 1: { read: 80, write: 80, dict: 80, tr: 80 } };
      if (!ctx.cpBtn(1).includes('launch(\'cp\''))
        throw new Error('خُدمت الوحدةُ ولم يظهر زرُّ البوابة');
    });

  /* محطّةُ الوحدة تقيس الوحدةَ نفسَها.

     وكانت «قراءةُ الوحدة ١» تنادي examReadStart(0, 1)، وREAD[0] لا
     وجودَ له (المفاتيحُ نصوصٌ كـr-note)، فتسقط إلى سحبٍ عشوائيٍّ من
     المستوى: يأتي نصُّ الوحدة الثانية، ثمّ تُسجَّل درجتُه في
     S.skills[1].read فتُفتح به بوابةُ وحدةٍ لم تُقرأ. */
  await run('محطّاتُ المهارة تسحب من وحدتها هي', {}, (ctx, ev) => {
    const readPool = ev('readPool'), dictationPool = ev('dictationPool');
    const READS = ev('READS'), LESSONS = ev('LESSONS');
    [1, 4, 5].forEach(u => {
      const r = readPool(u);
      const bad = r.filter(t => t.u !== u);
      if (!r.length || bad.length)
        throw new Error('قراءةُ الوحدة ' + u + ' تسحب من ' + (bad[0] ? 'الوحدة ' + bad[0].u : 'لا شيء'));

      const ids = new Set(LESSONS.filter(l => l.u === u).flatMap(l => l.items));
      const d = dictationPool(u);
      if (!d.length || d.some(i => !ids.has(i)))
        throw new Error('إملاءُ الوحدة ' + u + ' يسحب من خارجها');
    });
    /* وبلا وحدة يبقى السلوكُ القديم: ما بلغه المتعلّم. */
    if (!readPool().length) throw new Error('السحبُ بلا وحدةٍ صار فارغاً');
  });

  /* وحدةٌ تُمشى إلى آخرها تَفتح بوابتَها.

     وكانت keepSkill مكتوبةً بلا نادٍ: الاختباراتُ الأربعة تُسجّل في
     S.res ولا تمسّ S.skills، فلا تتمّ محطّةُ مهارةٍ أبداً، فلا تُفتح
     بوابةُ وحدةٍ واحدة في البرنامج كلِّه. ومرّ ذلك لأنّ كلَّ اختبارٍ
     كان يزرع S.skills في بذرته فيقفز فوق الثقب.

     فالحارسُ هنا لا يزرع شيئاً: يمشي الطريقَ الذي يمشيه المتعلّم. */
  await run('وحدةٌ تُمشى إلى آخرها تَفتح بوابتَها',
    { 'eng-coach-v3': JSON.stringify({
        placed: true,
        lessons: { '1.1': true, '1.2': true, '1.3': true, '2.4': false },
        conv: { c1: true, c2: true },
        words: { 1: 100 }
      }) },
    (ctx, ev) => {
      /* gateOpen من progress.js: هي unitOpen وgateReady معاً، وكانت
         مصدَّرةً بلا نادٍ — فيُختبَر بها البابُ والمفتاح. */
      const gateReady = ev('gateOpen');
      if (gateReady(1)) throw new Error('البوابة مفتوحةٌ قبل المهارات');

      /* القراءة */
      ctx.examReadStart(0, 1);
      const t = ctx.examReadText();
      t.qs.forEach((q, i) => { ev('S').rx.ans[i] = q.k === 'tf' ? q.a : (q.ok ? q.ok[0] : '') });
      ev('S').rx.done = true;
      ctx.examReadFinish();

      /* الكتابة */
      ctx.examWriteStart(1);
      while (ev('S').wx && !ev('S').wx.finished) {
        ctx.examWriteAnswer((ctx.examWriteTask().ok || [''])[0]);
        ctx.examWriteNext();
      }
      ctx.examWriteFinish();

      /* الإملاء */
      ctx.examDictStart(1);
      while (ev('S').dx && !ev('S').dx.finished) {
        ctx.examDictAnswer((ctx.examDictItem().ok || [''])[0]);
        ctx.examDictNext();
      }
      ctx.examDictFinish();

      /* الترجمة */
      ctx.startTranslation(1, 1);
      while (ev('S').tr && !ev('S').tr.done) {
        /* submitTranslation تقرأ من الحقل لا من وسيط — كبقيّة
           اختبارات الترجمة في هذا الملفّ. */
        ctx._els.trInput.value = ev('S').tr.items[ev('S').tr.i].en[0];
        ctx.submitTranslation();
        ctx.nextTranslation();
      }

      /* والمشهدُ الحيّ: يُؤدّى دوراً دوراً كما يفعل المتعلّم. */
      const SC = ev('SCENES');
      const mine = SC.map((x, i) => ({x, i})).filter(o => ['1.1','1.2','1.3'].includes(o.x.les));
      if (!mine.length) throw new Error('لا مشاهدَ للوحدة ١');
      mine.forEach(({i}) => {
        ctx.chatPick(i);
        for (let t = 0; t < SC[i].turns.length; t++) ctx.chatNext();
      });
      const notDone = mine.filter(({x}) => !ev('S').scenes[x.les]);
      if (notDone.length) throw new Error('مشاهدُ أُدّيت ولم تُسجَّل: ' + notDone.length);

      const sk = ev('S').skills[1] || {};
      const missing = ['read', 'write', 'dict', 'tr'].filter(k => sk[k] === undefined);
      if (missing.length)
        throw new Error('مهاراتٌ لم تُسجَّل بعد أداء اختبارها: ' + missing.join('، '));
      if (!gateReady(1))
        throw new Error('مُشِيت الوحدةُ كلُّها والبوابةُ لم تُفتح');
    });

  /* كلُّ ما يُقفل بوابةَ الوحدة يجب أن يَعبر المزامنة.

     وكانت skills وwords خارج السياسة، وكلتاهما محطّةٌ في المسار:
     فمن أتمّهما على هاتفه وجد البوابة مغلقةً على لوحه فأعاد العمل.
     ومزامنةٌ تُعيد العملَ كمزامنةٍ تمحوه.

     والحارسُ يقارن حقولَ defaultState كلَّها بما يُرسَل: فحقلٌ جديد
     لا يُزامَن ولا يُذكر سببُ استثنائه يُسقطه. فلا يُنسى حقلٌ صامتاً،
     ولا يُكتشف ذلك على جهاز المتعلّم. */
  /* أرقامُ الشاشة الواحدة لا تتناقض.

     وشكا صاحبُ البرنامج بحقّ: الحلقةُ تقول «تقدّمك صفر» والبرنامجُ
     يسوقه إلى الوحدة الثالثة. والسببُ أنّ الحلقةَ تعدّ ما أنجزه
     بيده وحدَه، وما أعفاه منه اختبارُ التحديد لا يُعَدّ شيئاً. */
  await run('لا رقمَ في الرئيسية يناقض وجهةَ البرنامج',
    { 'eng-coach-v3': JSON.stringify({placed:true, skipped:{1:true,2:true}}) },
    (ctx, ev) => {
      const nx = ctx.nextStep();
      if (!nx || nx.unit < 3) throw new Error('البذرةُ لا تقيس: الوجهةُ ' + (nx && nx.unit));

      /* ما أعفاه منه اختبارُ التحديد ليس عليه، فلا يُحسَب في الباقي
         ولا يُطوّل موعدَه. وكان يُحسَب، فيُحاسَب على ما لم يُطلَب. */
      const all = ctx.levelLeft('A1').left;
      ctx.clearPlan();
      const S = ev('S');
      const was = S.skipped; S.skipped = {};
      const withSkipped = ctx.levelLeft('A1').left;
      S.skipped = was;
      if (!(all < withSkipped))
        throw new Error('الوحدتان المُعفى منهما محسوبتان في الباقي: ' + all + ' من ' + withSkipped);
    });

  /* ولا يُقال «مقفول» لما هو مفتوح. */
  await run('بطاقةُ الامتحان النهائيّ تقول حالَه كما هو',
    { 'eng-coach-v3': JSON.stringify({placed:true,
        cp:{1:true,2:true,3:true,4:true,5:true}, ret:{1:true,2:true,3:true,4:true,5:true}}) },
    (ctx, ev) => {
      if (!ctx.levelExamOpen('A1')) throw new Error('البذرةُ لا تقيس: الامتحانُ غيرُ مفتوح');
      const h = ctx.homeView();
      if (h.includes('يُفتح بعد اجتياز وحدات'))
        throw new Error('الامتحانُ مفتوحٌ والبطاقةُ تقول إنّه مقفول');
      if (!/launch\('exam'/.test(h))
        throw new Error('الامتحانُ مفتوحٌ ولا زرَّ يدخل به المتعلّم');
    });

  /* «كتابُك»: جملةُ المتعلّم تعود إليه تمريناً، والتصحيحُ يتصاعد.

     والغلطةُ التي لا تُعالَج تتحجّر، فلا يُقال فيها القولُ نفسُه
     كلَّ مرّة: تُصحَّح، ثمّ يُطلَب منه أن يجدها، ثمّ تُشرَح. */
  await run('جملةُ المتعلّم تعود تمريناً، والتصحيحُ يتصاعد',
    { 'eng-coach-v3': JSON.stringify({placed:true}) },
    (ctx, ev) => {
      const add = (t,f) => ctx.noteSentence({text:t,fix:f,rids:['present-s'],src:'ترجمة',u:3});
      add('My brother go to school.','My brother goes to school.');
      if (ctx.errLevel('present-s') !== 1) throw new Error('أوّلُ مرّةٍ ليست المرتبة الأولى');

      add('She go home early.','She goes home early.');
      if (ctx.errLevel('present-s') !== 2) throw new Error('ثانيةٌ ليست المرتبة الثانية');

      add('He go there often.','He goes there often.');
      if (ctx.errLevel('present-s') !== 3) throw new Error('ثالثةٌ ليست المرتبة الثالثة');

      /* وموضعُ الكلمة يُستخرَج بموازنةِ الأصل بالمُصحَّح. */
      if (ctx.wrongIndex(ctx.lines()[0]) !== 2) throw new Error('لم يُعرَف موضعُ الكلمة الغلط');

      const h = ctx.homeView();
      if (!h.includes('brother')) throw new Error('جملةُ المتعلّم لا تُعرَض');
      if (!h.includes('دُلَّ عليها')) throw new Error('أُعطي الجوابَ بلا أن يُطلَب منه أن يجده');
      if (h.includes('goes')) throw new Error('كُشف الصوابُ قبل أن يَدُلَّ عليه');

      ctx.todayFound(0);
      const h2 = ctx.homeView();
      if (!h2.includes('goes')) throw new Error('دلَّ عليها فلم يُعرَض الصواب');
      if (!/ارجع إلى درس/.test(h2)) throw new Error('لا سبيلَ من الغلطة إلى درسها');
      if (!/العرب/.test(h2)) throw new Error('المرتبةُ الثالثة بلا شرحِ سببِ وقوع العربيّ فيها');
    });

  await run('كلُّ حقلٍ في الحالة مُصنَّفٌ: يُزامَن أو يُستثنى بقصد', {}, (ctx, ev) => {
    /* من نطاق الوحدة لا النافذة: sync-merge تُصدَّر ولا تُبَثّ. */
    const syncable = ev('syncable'), mergeInto = ev('mergeInto');

    /* ما لا يُزامَن عن قصد، ولكلٍّ سببُه. وحقلٌ جديد لا في المزامنة
       ولا هنا يُسقط هذا الاختبار — وهو المقصود: يُجبَر كاتبُه على
       أن يقرّر، لا أن ينسى. */
    const NOT_SYNCED = {
      q: 'اختبارٌ جارٍ — لحظيّ',
      wx: 'ورقةُ كتابةٍ جارية — لحظيّة',
      rx: 'ورقةُ قراءةٍ جارية — لحظيّة',
      dx: 'ورقةُ إملاءٍ جارية — لحظيّة',
      tr: 'ورقةُ ترجمةٍ جارية — لحظيّة',
      rev: 'رأيُ المراجع في نصٍّ بعينه — لا يغادر الجهاز',
      chat: 'مشهدٌ جارٍ — لحظيّ',
      drill: 'تدريبٌ مشتقٌّ من بوابةٍ على جهازه',
      theme: 'تفضيلُ جهازٍ: لا يُفرض ليلُ جهازٍ على نهار آخر',
      goal: 'تفضيلُ جهازٍ: دقائقُ اليوم',
      open: 'آخرُ درسٍ مفتوحٍ على الشاشة — عرضٌ لا تقدّم',
      tab: 'التبويبُ المعروض — عرضٌ لا تقدّم',
      v: 'رقمُ مخطّط الحالة — محلّيّ',
      syncBusy: 'مزامنةٌ جاريةٌ على هذا الجهاز — لحظيّة',
      snd: 'تدريبُ أصواتٍ جارٍ — لحظيّ',
      cx: 'اختبارُ محادثةٍ جارٍ — لحظيّ',
      ruleOpen: 'بطاقةُ القاعدة المفتوحة — عرضٌ لا تقدّم',
      openUnit: 'الوحدةُ المفرودةُ على الشاشة — عرضٌ لا تقدّم',
      setup: 'مفاوضةُ الخطّة الجارية — لحظيّة، والخطّةُ نفسُها تُزامَن',
      found: 'ما دُلَّ عليه في صفحة اليوم — عرضٌ لا تقدّم'
    };

    const sent = syncable(ev('S'));
    const fields = Object.keys(ev('defaultState')());
    const unclassified = fields.filter(k => !(k in sent) && !(k in NOT_SYNCED));
    if (unclassified.length)
      throw new Error('حقولٌ بلا تصنيف: ' + unclassified.join('، ')
        + ' — إمّا تُزامَن أو تُذكر في NOT_SYNCED بسببها');

    /* وما يُقفل البوابة يُزامَن قطعاً. */
    const gating = ['lessons', 'conv', 'cp', 'ret', 'skipped', 'skills', 'words'];
    const missing = gating.filter(k => !(k in sent));
    if (missing.length)
      throw new Error('خارج المزامنة: ' + missing.join('، ') + ' — وهي تُقفل البوابة');

    /* ولا يكفي أن تُرسَل: يجب أن تُدمَج بلا نقص. */
    const S = ev('S');
    S.words = {1: 100};
    S.skills = {1: {read: 80}};
    mergeInto(S, {words: {2: 60}, skills: {1: {write: 70}}});
    if (S.words[1] !== 100 || S.words[2] !== 60)
      throw new Error('دمجُ words ينقص: ' + JSON.stringify(S.words));
    if (S.skills[1].read !== 80 || S.skills[1].write !== 70)
      throw new Error('دمجُ skills ينقص: ' + JSON.stringify(S.skills));
  });

  /* التركيبُ يُدرَّس في موضعه ثمّ يتسرّب إلى جملةٍ حاملةٍ في مستوًى
     أدنى: درسُ الملكيّة في A1 كان يسأل «Have you seen ___ bag?»،
     فالمقصودُ your وهو A1 والجملةُ حاضرٌ تامٌّ وهو B1. والمتعلّم
     يقرأ الجملة كلَّها لا الفراغَ وحده.

     ومدقّقُ التراكيب لا يجد هذا: هو يسأل «أنُعلّم هذا؟» لا «أنستعمل
     ما لم نُعلّمه؟». فحارسٌ ثانٍ لسؤالٍ ثانٍ. */
  await run('لا تركيبَ فوق المستوى في محتواه', {}, async (ctx, ev) => {
    const {leaks} = await import('../scripts/level-fit.mjs');
    /* كلُّ مستوًى كُتب مطلبُه لا A1 وحده. */
    const found = ev('LEVELS_SPECD').flatMap(l => leaks(l));
    if (found.length)
      throw new Error(found.length + ' تسرّباً — مثاله ' + found[0].where
        + ': ' + found[0].t + ' في «' + found[0].s + '»');
  });

  /* بنكُ المفردات مولَّدٌ من المحتوى، فإن أُضيف درسٌ ولم يُعَد توليدُه
     انفصل عنه صامتاً: يقول البرنامج «بلغتَ ٣٦٨» وهي أكثر، ولا خطأ
     يظهر. فيُعاد الاستخراجُ هنا ويُقارَن بالمكتوب. */
  await run('بنكُ المفردات مطابقٌ للمحتوى', {}, async () => {
    const {lexicon, CORE_MIN} = await import('../scripts/vocab.mjs');
    /* كلُّ مستوًى وُلِّد بنكُه، لا A1 وحده. */
    const banks = {A1: (await import('../content/vocab-a1.js')).VOCAB_A1,
                   A2: (await import('../content/vocab-a2.js')).VOCAB_A2};
    for (const [lv, bank] of Object.entries(banks)) {
      const fresh = lexicon(lv).filter(x => x.n >= CORE_MIN);
      if (fresh.length !== bank.length)
        throw new Error(lv + ': البنك ' + bank.length + ' والمحتوى ' + fresh.length
          + ' — أعد توليده: node scripts/vocab.mjs ' + lv + ' --write');
      const have = new Set(bank.map(x => x.w));
      const miss = fresh.filter(x => !have.has(x.w)).map(x => x.w);
      if (miss.length) throw new Error(lv + ': كلماتٌ في المحتوى وليست في البنك: ' + miss.slice(0, 5).join('، '));
    }
  });

  /* pickWrite تصفّي المهامّ بوحدتها، فإن خلت الوحدةُ منها سقطت صامتةً
     إلى shuffle(WRITE) كلِّه. ولمّا لم تكن للوحدات ٢٠–٢٤ مهامٌّ كان
     المتعلّم يُثبت قدرةَ C1 بورقةٍ من مهامّ A1 — والقدرةُ لا تُثبَت
     بما لا يقيسها. فلا وحدةَ بلا مهامّ، ولا ورقةَ من غير وحدتها. */
  await run('ورقةُ الكتابة من وحدتها هي، لا من حيث اتّفق', {}, (ctx, ev) => {
    ev('UNIT_NS').forEach(u => {
      const paper = ctx.pickWrite(u);
      if (!paper.length) throw new Error('الوحدة ' + u + ': ورقةٌ فارغة');
      const alien = paper.filter(t => t.u !== u);
      if (alien.length)
        throw new Error('الوحدة ' + u + ': ' + alien.length
          + ' مهمّةً من وحدةٍ أخرى (' + [...new Set(alien.map(t => t.u))].join('،') + ')');
    });
  });

  await run('كل ما في البنوك يبلغه المتعلّم عند تمام المنهج', {}, (ctx, ev) => {
    const last = ev('LAST_UNIT');
    const reach = { 'الترجمة': ev('TRANSLATE'), 'الكتابة': ev('WRITE') };
    Object.entries(reach).forEach(([name, bank]) => {
      const beyond = bank.filter(x => x.u > last);
      if (beyond.length)
        throw new Error(name + ': ' + beyond.length + ' مدخلاً لوحدةٍ غير مبنيّة');
    });
    /* وسقف الترجمة يبلغ آخر وحدة متى أتمّ المتعلّم المنهج. */
    ev('LESSONS').forEach(l => { ev('S').lessons[l.id] = 100 });
    if (ctx.reachedUnit() !== last)
      throw new Error('من أتمّ كل الدروس سقفُه ' + ctx.reachedUnit() + ' لا ' + last);
    const picked = ctx.pickTranslation(60, ctx.reachedUnit());
    const units = new Set(picked.map(x => x.u));
    const have = new Set(ev('TRANSLATE').map(x => x.u));
    have.forEach(u => {
      if (!units.has(u)) throw new Error('الترجمة: الوحدة ' + u + ' لا تُسحب أبداً');
    });
  });

  /* حالةُ المستوى تُشتقّ من دروسه ولا تُكتب بيد. كانت مكتوبةً في
     LEVELS وفي STAGES معاً فافترقا: تمّ A2 وبقي «doing»، وبُنيت
     دروس B1 وبقي «todo». */
  await run('حالة كل مستوى ومرحلة مطابقةٌ لدروسها', {}, (ctx, ev) => {
    const want = ls => !ls.length ? 'todo'
      : ls.every(l => l.state === 'done') ? 'done'
      : ls.some(l => l.state === 'done') ? 'doing' : 'todo';
    ev('STAGES').forEach(st => {
      const w = want(st.units.flatMap(u => u.lessons));
      if (st.state !== w) throw new Error('المرحلة ' + st.id + ': ' + st.state + ' والواقع ' + w);
    });
    ev('LEVELS').forEach(lv => {
      const w = want(ev('STAGES').filter(st => st.level === lv.id)
        .flatMap(st => st.units).flatMap(u => u.lessons));
      if (lv.state !== w) throw new Error('المستوى ' + lv.id + ': ' + lv.state + ' والواقع ' + w);
    });
  });

  await report();













})();
