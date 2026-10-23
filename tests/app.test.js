/* اختبارات سلوكية للتطبيق. التشغيل:  node tests/app.test.js  */
const { run, report } = require('./harness.js');

(async () => {
  console.log('— الحالة والترقية —');

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
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true } }) },
    (ctx, ev) => {
      const h = ctx.homeView();
      if (!h.includes('تابع من حيث توقفت')) throw new Error('لا بطاقة استئناف');
      if (!h.includes('الدرس 1.2')) throw new Error('الخطوة التالية خاطئة');
    });

  await run('بطاقة الاستئناف تنتقل إلى المحادثة ثم البوابة',
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true, '1.2': true, '1.3': true } }) },
    (ctx, ev) => { if (!ctx.homeView().includes('محادثة:')) throw new Error('لم تُقترح المحادثة بعد إتمام الدروس') });

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
      if (c.sc !== 0 || c.ti !== 0) throw new Error('لم يُضبط المؤشر');
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
      if (!(it.a >= 0 && it.a < it.o.length)) throw new Error(`${l.id}#${i + 1}: فهرس إجابة خاطئ`);
      if (new Set(it.o).size !== it.o.length) throw new Error(`${l.id}#${i + 1}: خيار مكرر`);
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

  await run('اجتياز درس يفتح الدرس التالي', {}, (ctx, ev) => {
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

  await run('الامتحان النهائي يسحب 10 أسئلة بلا تكرار', {}, (ctx, ev) => {
    for (let t = 0; t < 40; t++) {
      ctx.launch('exam');
      const qs = ev('S.q.items.map(x=>x.q)');
      if (new Set(qs).size !== 10) throw new Error('سؤال مكرر داخل الامتحان');
    }
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
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
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
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
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
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
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
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
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
    { 'eng-coach-v3': JSON.stringify({ placed: true, lessons: { '1.1': true } }) },
    (ctx, ev) => {
      const h = ctx.homeView();
      if (!h.includes('<svg')) throw new Error('لا حلقة');
      if (!h.includes('stroke-dashoffset')) throw new Error('الحلقة بلا تقدّم');
      if (!h.includes('هدف الكلام اليومي')) throw new Error('لا اختيار للهدف');
    });

  await run('خريطة الرحلة ترسم خطاً ومحطات',
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
      const h = ctx.courseView();
      if (!h.includes('class="spine')) throw new Error('لا خط رحلة');
      if (!h.includes('stopCard')) throw new Error('لا محطات');
      if (!h.includes('dot now')) throw new Error('لا محطة حالية بارزة');
    });

  console.log('— البنية بعد التقسيم —');

  await run('تقييم النطق يحسب درجة ونصائح', {}, (ctx, ev) => {
    const p = ctx.pronScore('I am a teacher', 'I am a teacher');
    if (p.sc !== 100) throw new Error('جملة مطابقة لم تُعطَ 100: ' + p.sc);
    const q = ctx.pronScore('three brothers', 'tree brothers');
    if (q.sc === 100) throw new Error('كلمة خاطئة لم تُرصد');
    if (!q.tips.some(t => t.includes('th'))) throw new Error('لا نصيحة لصوت th');
  });

  await run('كتابة الإجابة النموذجية تُظهر تقييم النطق', {}, (ctx, ev) => {
    ctx.go('speak');
    ctx.chatReply('I am a teacher');
    ctx._els.chatPr.value = 'My name is Ahmed';
    ctx.chatModelTyped();
    if (!ev('S').chat.pr) throw new Error('لم يُحسب تقييم النطق');
    if (!ctx.speakView().includes('دقة النطق')) throw new Error('التقييم لا يظهر على الشاشة');
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

  await run('المستخدم الجديد يُكمل الاختبار العشرة ويصل إلى النتيجة', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < 10; i++) {
      const q = ev('S').q;
      if (q.done) throw new Error('انتهى مبكراً عند ' + i);
      ctx.pick(q.items[q.i].a);
      ctx.nextQ();
    }
    const q = ev('S').q;
    if (!q.done) throw new Error('لم ينتهِ بعد عشرة أسئلة');
    if (!ev('S').placed) throw new Error('لم يُسجَّل تحديد المستوى');
    if (!['A1','A2'].includes(ev('S').level)) throw new Error('مستوى غير صالح: ' + ev('S').level);
    if (!ctx.quizView().includes('نتيجة تحديد المستوى')) throw new Error('لا شاشة نتيجة');
    ctx.closeQ();
    if (ev('S').q) throw new Error('لم تُغلق شاشة الاختبار');
  });

  await run('اختبار تحديد المستوى لا يكرر سؤالاً', {}, (ctx, ev) => {
    ctx.launch('place');
    for (let i = 0; i < 9; i++) { ctx.pick(ev('S').q.items[ev('S').q.i].a); ctx.nextQ() }
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
    { 'eng-coach-v3': JSON.stringify({ placed: true }) }, (ctx, ev) => {
    [['lesson','1.1'],['cp',1],['exam',null],['conv','c1']].forEach(([k,id]) => {
      ctx.launch(k, id);
      const html = ctx._els.app.innerHTML;
      if (html.includes('تعذّر عرض هذه الشاشة')) throw new Error('انهار الرسم في النوع ' + k);
      if (!html.length) throw new Error('شاشة فارغة في النوع ' + k);
    });
  });

  await report();
})();
