/* مفرداتُ C1 في حقولٍ موضوعيّة.

   وهدفُ المستوى تراكميٌّ (٦٠٠٠ معنًى يشمل ما قبله)، فنصيبُ C1 منه
   نحو ألفين: ثلاثُ وحداتٍ × نحو ستّ مئةٍ وخمسين.

   وحقولُ C1 أسلوبيّةٌ ومعجميّةٌ دقيقة: مصاحباتٌ وتعابيرُ وفروقُ
   مترادفات — لم يعد المطلوبُ أن يَفهم، بل أن يختار.

   والترتيب: [الكلمة, معناها]. */

export const WORDS = [

/* ══ الوحدة ٢٠ — التركيبُ المعقّدُ والإبراز ══ */
{u:20, t:'الإبرازُ والترتيب', list:[
 ['emphasis','توكيد'],['focus','بؤرة'],['foreground','يُبرز'],['background (verb)','يُؤخّر إلى الخلفيّة'],
 ['highlight a point','يُجلّي نقطة'],['downplay','يُهوّن'],['understate deliberately','يُهوّن قصداً'],['draw attention to','يلفت النظر إلى'],
 ['bring to the fore','يُقدّم إلى الصدارة'],['relegate','يُنزل إلى الهامش'],['prioritise clearly','يُرتّب الأولويّات'],['subordinate','يُخضع'],
 ['word order','ترتيب الكلمات'],['sentence structure','بنية الجملة'],['clause','جملة فرعيّة'],['main clause','الجملة الرئيسة'],
 ['subordinate clause','جملة تابعة'],['embedded','مُضمَّن'],['parenthetical','اعتراضيّ'],['appositive','بدل'],
 ['end weight','ثقل النهاية'],['end focus','بؤرة النهاية'],['given information','المعلوم'],['new information','الجديد'],
 ['topic','المُسنَد إليه'],['comment','المُسنَد'],['theme','المبتدأ المعنويّ'],['rheme','الخبر المعنويّ']]},

{u:20, t:'الحجّةُ والبرهان', list:[
 ['premise','مقدّمة'],['inference','استنباط'],['deduction','استنتاج'],['induction','استقراء'],
 ['fallacy','مغالطة'],['circular reasoning','استدلال دائريّ'],['straw man','مغالطة رجل القشّ'],['false dilemma','معضلة زائفة'],
 ['burden of proof','عبء الإثبات'],['counterexample','مثال نقضيّ'],['necessary condition','شرط لازم'],['sufficient condition','شرط كافٍ'],
 ['valid','سليم منطقيّاً'],['sound','صحيح مقدّمةً ونتيجةً'],['cogent','مُحكَم'],['tenuous','واهٍ'],
 ['substantiate','يُدعّم بالأدلّة'],['corroborate','يُعضّد'],['refute','يُفنّد'],['concede a point','يُسلّم بنقطة'],
 ['qualify a claim','يُقيّد دعوى'],['overstate the case','يُبالغ في الحجّة'],['beg the question','يُصادر على المطلوب'],['follow logically','يترتّب منطقيّاً'],
 ['hold water','يصمد'],['fall apart','ينهار'],['stand up to scrutiny','يحتمل التمحيص'],['be open to challenge','قابل للطعن']]},

{u:20, t:'البحثُ والنشرُ الأكاديميّ', list:[
 ['hypothesis testing','اختبار الفرضيّات'],['null hypothesis','فرضيّة العدم'],['significance level','مستوى الدلالة'],['confidence interval','فترة الثقة'],
 ['margin of error','هامش الخطأ'],['sample size','حجم العيّنة'],['random sampling','معاينة عشوائيّة'],['control variable','متغيّر ضابط'],
 ['longitudinal study','دراسة طوليّة'],['cross-sectional','مقطعيّة'],['meta-analysis','تحليل بَعديّ'],['systematic review','مراجعة منهجيّة'],
 ['replication crisis','أزمة التكرار'],['publication bias','تحيّز النشر'],['conflict of interest statement','بيان تضارب المصالح'],['ethical approval','موافقة أخلاقيّة'],
 ['informed consent','موافقة مستنيرة'],['anonymised data','بيانات مُغفَلة'],['raw data','بيانات خام'],['data availability','إتاحة البيانات'],
 ['preprint','مسوّدة منشورة'],['impact factor','معامل التأثير'],['citation index','مؤشّر الاستشهاد'],['open access','وصول مفتوح'],
 ['corresponding author','المؤلّف المراسِل'],['co-author','مؤلّف مشارك'],['acknowledgements','شكر وتقدير'],['funding body','جهة مموّلة']]},

{u:20, t:'الزمنُ والسببيّةُ الدقيقة', list:[
 ['antecedent','سابق'],['consequent','لاحق'],['concurrent','متزامن'],['successive','متعاقب'],
 ['cumulative','تراكميّ'],['incremental','تدريجيّ'],['abrupt','مفاجئ'],['protracted','مُطوَّل'],
 ['transient','عابر'],['enduring','باقٍ'],['recurrent','متكرّر'],['sporadic','متقطّع'],
 ['trigger','مُحفّز'],['catalyst for change','محفّز تغيير'],['precipitate','يُعجّل بـ'],['hasten','يُسرّع'],
 ['impede','يُعيق'],['hinder','يُعرقل'],['facilitate','يُيسّر'],['expedite','يُعجّل'],
 ['give way to','يُفسح المجال لـ'],['culminate in','يبلغ ذروته في'],['result in','يُسفر عن'],['stem directly from','ينبع مباشرةً من'],
 ['in the interim','في الأثناء'],['henceforth','من الآن فصاعداً'],['hitherto','حتّى الآن'],['thereupon','عند ذلك']]},

{u:20, t:'الحكمُ والموقف', list:[
 ['stance','موقف'],['conviction','قناعة'],['reservation','تحفّظ'],['misgiving','تخوّف'],
 ['scepticism','تشكّك'],['endorsement','تأييد'],['reservation about','تحفّظ على'],['objection to','اعتراض على'],
 ['commendable','جدير بالثناء'],['regrettable','مؤسف'],['indefensible','لا يُدافَع عنه'],
 ['warranted','مُبرَّر'],['unwarranted','غير مُبرَّر'],['justified','مسوَّغ'],['arbitrary','اعتباطيّ'],
 ['prudent','حصيف'],['reckless','متهوّر'],['judicious','سديد'],['ill-judged','سيّئ التقدير'],
 ['pragmatic','عمليّ'],['idealistic','مثاليّ'],['principled','مبدئيّ'],['expedient','نفعيّ'],
 ['on reflection','بعد التأمّل'],['on the face of it','في ظاهره'],['in the final reckoning','في الحساب الأخير']]},

{u:20, t:'الوصفُ الاسميُّ للأفعال', list:[
 ['analysis','تحليل'],['implementation','تنفيذ'],['interpretation','تأويل'],['consideration','اعتبار'],['provision','توفير'],
 ['acquisition','اكتساب'],['retention','احتفاظ'],['allocation','تخصيص'],['distribution','توزيع'],
 ['intervention','تدخّل'],['adaptation','تكيّف'],['transformation','تحوّل'],
 ['expansion','توسّع'],['contraction','انكماش'],['disruption','اضطراب'],['restoration','استعادة'],
 ['emergence','بزوغ'],['revival','إحياء'],['persistence','استمرار'],
 ['divergence','تباعد'],['convergence','تقارب'],['alignment','مواءمة'],['discrepancy in data','تباين في البيانات']]}
,

/* ══ الوحدة ٢١ — الأسلوبُ والسجلّ ══ */
{u:21, t:'السجلُّ الرسميُّ ومقابلُه', list:[
 ['commence','يَشرع'],['terminate','يُنهي'],['end','ينتهي'],
 ['purchase','يبتاع'],['reside','يقيم'],['require','يستلزم'],['obtain','يحصل على'],['get','ينال'],
 ['inform','يُبلّغ'],['request','يلتمس'],['endeavour','يسعى'],['ascertain','يتحقّق'],['find out','يعرف'],
 ['sufficient','كافٍ'],['enough','يكفي'],['additional','إضافيّ'],['extra','زائد'],
 ['subsequent','لاحق'],['later','بعدئذٍ'],['prior','سابق'],['assist','يُعين'],['utilise','يستخدم'],['facilitate access','يُيسّر الوصول'],['make easier','يُسهّل']]},

{u:21, t:'التلطيفُ والتحفّظ', list:[
 ['it would appear','يبدو ظاهراً'],['one might argue','قد يُحتجّ'],['arguably so','ولعلّ ذلك'],['to some degree','إلى درجةٍ ما'],
 ['with respect','مع التقدير'],['if I may','إن سمحتَ'],['I would suggest','أقترح'],['perhaps we might','لعلّنا'],
 ['not entirely','ليس تماماً'],['somewhat limited','محدود نوعاً ما'],['less than ideal','دون المثاليّ'],['room for improvement','مجال للتحسين'],
 ['a slight concern','قلقٌ طفيف'],['a minor issue','مسألة ثانويّة'],['a possible oversight','سهوٌ محتمل'],['an apparent gap','فجوة ظاهرة'],
 ['I am afraid','يؤسفني'],['regrettably','مع الأسف'],['unfortunately','لسوء الحظّ'],['I am inclined to think','أميل إلى الظنّ'],
 ['as far as I can tell','على قدر علمي'],['correct me if I am wrong','صحّحني إن أخطأت'],['I stand to be corrected','قد أكون مخطئاً'],
 ['broadly in agreement','متّفقٌ في الجملة'],['largely true','صحيحٌ في معظمه'],['open to discussion','قابل للنقاش'],['worth revisiting','جدير بإعادة النظر']]},

{u:21, t:'المراسلةُ والمهنيّة', list:[
 ['further to our conversation','إلحاقاً بحديثنا'],['with reference to your email','بالإشارة إلى رسالتكم'],['as discussed','كما اتّفقنا'],['as agreed','حسب الاتّفاق'],
 ['please find enclosed','تجدون طيّه'],['I am writing to confirm','أكتب لتأكيد'],['I would be grateful if','أكون ممتنّاً لو'],['at your earliest convenience','في أقرب فرصة'],
 ['should you require','إن احتجتم'],['do not hesitate to','لا تتردّدوا في'],['I look forward to','أتطلّع إلى'],['thank you in advance','شكراً مقدّماً'],
 ['on behalf of the team','نيابةً عن الفريق'],['in my capacity as','بصفتي'],['for your information','للعلم'],['for your action','للتنفيذ'],
 ['please be advised','يُرجى العلم'],['kindly note','يُرجى ملاحظة'],['with immediate effect','بأثر فوريّ'],['until further notice','حتّى إشعار آخر'],
 ['subject to approval','رهناً بالموافقة'],['pending review','قيد المراجعة'],['without prejudice','دون المساس بالحقوق'],
 ['I trust this is clear','أثق أنّ الأمر واضح'],['should you have questions','إن كانت لديكم أسئلة'],['we apologise for any inconvenience','نعتذر عن أيّ إزعاج'],['we value your feedback','نُقدّر ملاحظاتكم']]},

{u:21, t:'النبرةُ والعلاقة', list:[
 ['courteous','دَمِث'],['curt','مقتضب جافّ'],['brusque','فظّ مختصر'],['warm','ودود'],
 ['detached','متحفّظ بارد'],['cordial','ودّيّ'],['patronising','متعالٍ'],['condescending','متنازل بتعالٍ'],
 ['respectful','محترم'],['dismissive','مُستخفّ'],['tactful','لبِق'],['blunt','صريح بلا مواربة'],
 ['diplomatic','دبلوماسيّ'],['confrontational','تصادميّ'],['conciliatory','تصالحيّ'],['defensive tone','نبرة دفاعيّة'],
 ['measured','متّزن'],['heated','محتدّ'],['restrained','مكبوح'],['effusive','مُفرط الودّ'],
 ['impersonal','غير شخصيّ'],['personal touch','لمسة شخصيّة'],['over-familiar','مُفرط الألفة'],['appropriately formal','رسميٌّ بقدر'],
 ['strike the right note','يُصيب النبرة'],['misjudge the tone','يُخطئ النبرة'],['soften the blow','يُلطّف الوقع'],['stand one\u2019s ground','يثبت على موقفه']]},

/* ══ الوحدة ٢٢ — المصاحباتُ والتعابير ══ */
{u:22, t:'مصاحباتُ الأفعال', list:[
 ['make a decision','يتّخذ قراراً'],['take a decision','يتّخذ قراراً'],['reach a conclusion','يخلص إلى نتيجة'],['draw a distinction','يعقد تمييزاً'],
 ['pay attention','يُولي انتباهاً'],['give consideration','يُولي اعتباراً'],['raise an issue','يُثير مسألة'],['address a concern','يُعالج قلقاً'],
 ['meet a deadline','يَفي بموعد'],['miss a deadline','يُخلّ بموعد'],['set a target','يضع هدفاً'],['exceed expectations','يفوق التوقّعات'],
 ['take responsibility','يتحمّل مسؤوليّة'],['assume a role','يتولّى دوراً'],['play a part','يؤدّي دوراً'],['bear the cost','يتحمّل الكلفة'],
 ['run a risk','يُجازف'],['present an opportunity','يُتيح فرصة'],['offer an explanation','يُقدّم تفسيراً'],
 ['place emphasis on','يُركّز على'],['lay the blame on','يُلقي اللوم على'],['cast doubt on','يُلقي ظلال الشكّ'],['shed light on a matter','يُنير مسألة'],
 ['strike a balance between','يُوازن بين'],['draw a comparison','يعقد مقارنة'],['make an exception','يستثني'],['set a precedent in law','يُرسي سابقة']]},

{u:22, t:'مصاحباتُ الصفات', list:[
 ['heavy traffic','زحام كثيف'],['strong opposition','معارضة شديدة'],['deep concern','قلق بالغ'],['high priority','أولويّة قصوى'],
 ['wide range','نطاق واسع'],['narrow margin','هامش ضيّق'],['sharp increase','ارتفاع حادّ'],['steady decline','تراجع مطّرد'],
 ['serious consequence','عاقبة خطيرة'],['grave error','خطأ جسيم'],['minor setback','نكسة طفيفة'],['significant improvement','تحسّن ملحوظ'],
 ['vital role','دور حيويّ'],['key factor','عامل أساسيّ'],['major obstacle','عقبة كبرى'],['common misconception','مفهوم خاطئ شائع'],
 ['valid point','نقطة وجيهة'],['fair assessment','تقويم منصف'],['harsh criticism','نقد قاسٍ'],['glowing review','مراجعة مُشيدة'],
 ['tight schedule','جدول ضيّق'],['busy period','فترة مزدحمة'],['quiet spell','فترة هدوء'],['peak season','ذروة الموسم'],
 ['bitter dispute','نزاع مرير'],['lasting impression','أثر باقٍ'],['passing remark','ملاحظة عابرة'],['growing concern','قلق متنامٍ']]},

{u:22, t:'الأفعالُ المركّبةُ الدقيقة', list:[
 ['account for a gap','يُفسّر فجوة'],['allow for delays','يَحسب حساب التأخير'],['bank on','يعوّل على'],['bear out','يُثبت صحّته'],
 ['brush aside','ينحّي جانباً'],['carry through','يُتمّ إلى النهاية'],['come up against','يصطدم بـ'],['cut back on','يُقلّص'],
 ['draw up a plan','يُعدّ خطّة'],['fall back on','يلجأ إلى'],['figure out','يستنبط'],['follow through','يُتابع حتّى النهاية'],
 ['gloss over','يَطمس بالتمويه'],['go over the details','يُراجع التفاصيل'],['head off a problem','يستبق مشكلة'],['iron out differences','يُذلّل الخلافات'],
 ['live up to a promise','يفي بوعد'],['look into a complaint','ينظر في شكوى'],['opt out of','ينسحب من'],['pin down a cause','يُحدّد سبباً'],
 ['put forward a case','يطرح حجّة'],['rule out an option','يستبعد خياراً'],['see through a scheme','يتفطّن لحيلة'],['sort out a dispute','يَفضّ نزاعاً'],
 ['stand in for','ينوب عن'],['step up efforts','يُكثّف الجهود'],['take on a task','يتولّى مهمّة'],['weigh up options','يُوازن الخيارات']]},

{u:22, t:'التعابيرُ في العمل', list:[
 ['get the ball rolling','يُطلق العمل'],['touch base','يتواصل سريعاً'],['in the pipeline','قيد الإعداد'],['on the back burner','مؤجَّل'],
 ['back to the drawing board','العودة إلى نقطة البداية'],['a steep learning curve','منحنى تعلّم حادّ'],['think outside the box','يُفكّر خارج المألوف'],['keep an eye on','يراقب'],
 ['play it by ear','يتصرّف حسب الظرف'],['bite the bullet','يتجرّع المرّ'],['call it a day','يكتفي بما أنجز'],['go the extra mile','يبذل فوق المطلوب'],
 ['take it with a pinch of salt','يأخذه بتحفّظ'],['read between the lines','يقرأ ما بين السطور'],['a blessing in disguise','نعمةٌ في ثوب نقمة'],['a double-edged sword','سلاح ذو حدّين'],
 ['the tip of the iceberg','قمّة جبل الجليد'],['a drop in the ocean','قطرة في بحر'],['cost an arm and a leg','يُكلّف الكثير'],['worth its weight in gold','يساوي وزنه ذهباً'],
 ['get to grips with','يُحكم قبضته على'],['have a lot on one\u2019s plate','مشغولٌ جدّاً'],['put something on hold','يُعلّق أمراً'],['be up to speed','مُلِمٌّ بالمستجدّات'],
 ['raise the bar','يرفع سقف المعايير'],['move the goalposts','يُغيّر القواعد أثناء اللعب'],['level the playing field','يُسوّي الفرص'],['pull one\u2019s weight','يؤدّي نصيبه']]},

{u:22, t:'فروقُ المترادفات', list:[
 ['remark','يُعلّق'],['observe','يُلاحظ'],
 ['maintain','يُصرّ قولاً'],['contend','يحتجّ'],
 ['gaze','يُطيل النظر'],['peer','يُحدّق متفحّصاً'],
 ['stride','يخطو واسعاً'],['stroll','يتمشّى'],['trudge','يجرّ قدميه'],
 ['tiny','ضئيل'],['minute','بالغ الصغر'],['annoyed','منزعج'],['furious','ساخط'],['irritated','متبرّم'],
 ['pivotal','محوريّ'],['peripheral','هامشيّ'],
 ['alter','يُعدّل'],['amend','يُنقّح'],['revise','يُراجع ويُصلح']]}
,

{u:20, t:'الفلسفةُ والمنهج', list:[
 ['epistemology','نظريّة المعرفة'],['ontology','علم الوجود'],['methodology debate','جدل المنهج'],['positivism','وضعيّة'],
 ['empiricism','تجريبيّة'],['rationalism','عقلانيّة'],['relativism','نسبيّة'],['determinism','حتميّة'],
 ['causality','سببيّة'],['correlation not causation','الارتباط لا السببيّة'],['reductionism','اختزاليّة'],['holism','كلّيّة'],
 ['axiom','بديهيّة'],['corollary','نتيجة لازمة'],['postulate','مُصادرة'],['conjecture','حدس علميّ'],
 ['falsifiable','قابل للتكذيب'],['verifiable','قابل للتحقّق'],['parsimony','اقتصاد التفسير'],['elegance of theory','أناقة النظريّة'],
 ['paradigm shift','تحوّل نموذجيّ'],['anomaly','شذوذ'],['consensus view','الرأي المجمَع عليه'],['heterodox','خارج المألوف'],
 ['a priori','قبليّ'],['a posteriori','بعديّ'],['necessary truth','حقيقة ضروريّة'],['contingent','عَرَضيّ'],
 ['normative','معياريّ'],['descriptive','وصفيّ'],['prescriptive','إلزاميّ'],['value-laden','محمّل بالقيم']]},

{u:20, t:'الاقتصادُ والتحليل', list:[
 ['opportunity cost','كلفة الفرصة البديلة'],['marginal utility','المنفعة الحدّيّة'],['diminishing returns','تناقص الغلّة'],['economies of scale','وفورات الحجم'],
 ['externality','أثر خارجيّ'],['public good','منفعة عامّة'],['market failure','إخفاق السوق'],['moral hazard','خطر أخلاقيّ'],
 ['elasticity','مرونة'],['substitute good','سلعة بديلة'],['complementary good','سلعة مكمّلة'],['price signal','إشارة سعريّة'],
 ['equilibrium','توازن'],['surplus value','قيمة فائضة'],['rent-seeking','سعي للريع'],['arbitrage','مراجحة'],
 ['leverage ratio','نسبة الرفع'],['solvency','ملاءة'],['default risk','خطر التعثّر'],['credit rating','تصنيف ائتمانيّ'],
 ['hedging','تحوّط'],['speculation','مضاربة'],['volatility','تقلّبيّة'],['benchmark rate','سعر مرجعيّ'],
 ['stagflation','ركود تضخّميّ'],['deflation','انكماش سعريّ'],['soft landing','هبوط هادئ'],['overheating','فرط نشاط']]},

{u:21, t:'القانونُ والحوكمةُ الدقيقة', list:[
 ['statute','تشريع مكتوب'],['common law','قانون عامّ'],['case law','سوابق قضائيّة'],['doctrine','مبدأ قانونيّ'],
 ['injunction','أمر قضائيّ'],['writ','أمر رسميّ'],['subpoena','استدعاء قضائيّ'],['deposition','إفادة مسجّلة'],
 ['litigation','تقاضٍ'],['counsel','مستشار قانونيّ'],['retainer','أتعاب احتجاز'],['contingency fee','أتعاب مشروطة'],
 ['mitigating circumstance','ظرف مخفّف'],['aggravating factor','ظرف مشدّد'],['statute of limitations','التقادم'],['legal standing','صفة قانونيّة'],
 ['fiduciary duty','واجب ائتمانيّ'],['good faith','حسن نيّة'],['undue influence','تأثير غير مشروع'],['duress','إكراه'],
 ['void contract','عقد باطل'],['voidable','قابل للإبطال'],['enforceable','واجب النفاذ'],['binding precedent','سابقة ملزمة'],
 ['de facto','بحكم الواقع'],['de jure','بحكم القانون'],['prima facie','للوهلة الأولى'],['pro bono','تطوّعاً']]},

{u:21, t:'الإدارةُ والقيادة', list:[
 ['vision statement','بيان الرؤية'],['mission','رسالة المؤسّسة'],['core value','قيمة جوهريّة'],['culture change','تغيير الثقافة'],
 ['change management','إدارة التغيير'],['stakeholder mapping','رسم خريطة المصالح'],['buy-in','تبنٍّ وقبول'],['resistance to change','مقاومة التغيير'],
 ['empower a team','يُمكّن فريقاً'],['devolve authority','يُفوّض السلطة'],['micromanagement','إدارة تفصيليّة مُرهقة'],['autonomy','استقلاليّة'],
 ['accountability framework','إطار مساءلة'],['performance dialogue','حوار الأداء'],['development plan','خطّة تطوير'],['succession pipeline','خطّ الخلافة'],
 ['strategic alignment','مواءمة استراتيجيّة'],['operational excellence','تميّز تشغيليّ'],['continuous learning','تعلّم مستمرّ'],['psychological safety','أمان نفسيّ'],
 ['servant leadership','القيادة الخادمة'],['transformational','تحويليّ'],['transactional','تبادليّ'],['laissez-faire','متساهل'],
 ['crisis leadership','قيادة الأزمات'],['decision fatigue','إرهاق القرار'],['groupthink','تفكير القطيع'],['devil\u2019s advocate','محامي الشيطان']]},

{u:22, t:'الطبُّ والعلومُ الحيويّة', list:[
 ['pathology','علم الأمراض'],['aetiology','علم الأسباب'],['epidemiology','علم الأوبئة'],['prevalence','انتشار'],
 ['incidence','معدّل الحدوث'],['comorbidity','اعتلال مصاحب'],['remission','هدأة'],['relapse','انتكاس'],
 ['benign','حميد'],['malignant','خبيث'],['invasive procedure','إجراء باضع'],['non-invasive','غير باضع'],
 ['clinical trial','تجربة سريريّة'],['placebo','دواء وهميّ'],['double-blind','مزدوج التعمية'],['adverse event','حدث ضائر'],
 ['contraindication','مانع استعمال'],['prophylaxis','وقاية'],['palliative','مُلطِّف'],['curative','شافٍ'],
 ['genome','جينوم'],['mutation','طفرة'],['hereditary','وراثيّ'],['congenital','خِلقيّ'],
 ['metabolism','أيض'],['hormone','هرمون'],['enzyme','إنزيم'],['antibody','جسم مضادّ'],
 ['immunisation','تمنيع'],['herd immunity','مناعة القطيع'],['vector','ناقل مرضيّ'],['zoonotic','حيوانيّ المنشأ']]},

{u:22, t:'التقنيةُ والمعلوماتيّة', list:[
 ['architecture (software)','معماريّة برمجيّة'],['microservice','خدمة مصغّرة'],['monolith','نظام كتليّ'],['API endpoint','نقطة واجهة'],
 ['payload','حمولة بيانات'],['protocol stack','طبقات البروتوكول'],['handshake','مصافحة اتّصال'],['token','رمز وصول'],
 ['hash','بصمة تجزئة'],['checksum','مجموع تحقّق'],['idempotent','غير متغيّر بالتكرار'],['atomic operation','عمليّة ذرّيّة'],
 ['race condition','تضارب تزامن'],['deadlock','جمود'],['memory leak','تسرّب ذاكرة'],['garbage collection','تجميع المهملات'],
 ['refactor','يُعيد الهيكلة'],['technical debt','دَين تقنيّ'],['code review','مراجعة شفرة'],['continuous integration','تكامل مستمرّ'],
 ['regression test','اختبار انحدار'],['edge case','حالة حدّيّة'],['fail gracefully','يُخفق بلُطف'],['graceful degradation','تدهور مُتدرّج'],
 ['observability','قابليّة الرصد'],['telemetry','قياس عن بُعد'],['tracing','تتبّع'],['alert threshold','عتبة الإنذار']]},

{u:20, t:'الأدبُ والنقد', list:[
 ['allusion','تلميح أدبيّ'],['motif','ثيمة متكرّرة'],['leitmotif','لازمة'],['foreshadowing','استباق'],
 ['flashback','ارتجاع'],['stream of consciousness','تيّار الوعي'],['unreliable narrator','راوٍ غير موثوق'],['omniscient narrator','راوٍ عليم'],
 ['first person','ضمير المتكلّم'],['third person','ضمير الغائب'],['point of view','زاوية السرد'],['free indirect speech','خطاب غير مباشر حرّ'],
 ['verse','شِعر'],['prose','نثر'],['metre','وزن'],['rhyme scheme','نظام القافية'],
 ['alliteration','جِناس استهلاليّ'],['assonance','توافق صوتيّ'],['hyperbole','مبالغة'],['litotes','تأكيد بالنفي'],
 ['satire','هجاء'],['parody','محاكاة ساخرة'],['pastiche','معارضة أسلوبيّة'],['elegy','مرثيّة'],
 ['canon','مُدوّنة أدبيّة'],['genre convention','عُرف النوع'],['intertextuality','تناصّ'],['close reading','قراءة فاحصة']]},

{u:21, t:'السياسةُ والمجتمعُ الدقيق', list:[
 ['constituency','دائرة انتخابيّة'],['turnout','نسبة الإقبال'],['mandate (political)','تفويض شعبيّ'],['coalition','ائتلاف'],
 ['opposition bench','مقاعد المعارضة'],['backbencher','نائب من الصفوف الخلفيّة'],['filibuster','تعطيل بالخطابة'],['referendum','استفتاء'],
 ['separation of powers','فصل السلطات'],['judicial review','مراجعة قضائيّة'],['checks and balances','ضوابط وتوازنات'],['rule of law','سيادة القانون'],
 ['civil liberties','حرّيّات مدنيّة'],['due process','إجراءات قانونيّة واجبة'],['habeas corpus','أمر إحضار'],['freedom of assembly','حرّيّة التجمّع'],
 ['lobbying','ضغط سياسيّ'],['vested interest','مصلحة راسخة'],['patronage','محسوبيّة'],['clientelism','زبائنيّة'],
 ['populism','شعبويّة'],['technocracy','تكنوقراطيّة'],['bureaucratic inertia','قصور بيروقراطيّ'],['policy drift','انجراف السياسات'],
 ['social contract','عقد اجتماعيّ'],['civic duty','واجب مدنيّ'],['public discourse','الخطاب العامّ'],['polarisation','استقطاب']]},

{u:22, t:'الترجمةُ والوساطة', list:[
 ['source text','النصّ المصدر'],['target text','النصّ الهدف'],['fidelity','أمانة'],['readability','قابليّة القراءة'],
 ['literal translation','ترجمة حرفيّة'],['free translation','ترجمة بتصرّف'],['transliteration','نقحرة'],['calque','نسخ تركيبيّ'],
 ['false friend','صديق كاذب'],['untranslatable','عصيّ على الترجمة'],['cultural equivalent','مكافئ ثقافيّ'],['functional equivalence','تكافؤ وظيفيّ'],
 ['register mismatch','اختلال السجلّ'],['tone loss','فقدان النبرة'],['over-translation','إفراط في الترجمة'],['under-translation','تقصير في الترجمة'],
 ['back-translation','ترجمة عكسيّة'],['glossary','مسرد'],['term base','قاعدة مصطلحات'],['style sheet','ورقة أسلوب'],
 ['internationalisation','تدويل'],['subtitling','سترجة'],['dubbing','دبلجة'],
 ['consecutive interpreting','ترجمة تتابعيّة'],['simultaneous interpreting','ترجمة فوريّة'],['sight translation','ترجمة بالنظر'],['note-taking system','نظام تدوين']]}
,

{u:20, t:'صفاتُ التحليلِ الدقيقة', list:[
 ['nuanced','دقيق التمييز'],['simplistic','تبسيطيّ'],['sophisticated','مُحكَم مركّب'],['crude','خام فجّ'],
 ['granular','تفصيليّ'],['sweeping','شامل مُعمَّم'],['tentative','مبدئيّ'],['conclusive','قاطع'],
 ['indicative','دالّ'],['suggestive','مُلمِح'],['definitive','نهائيّ'],['provisional','مؤقّت'],
 ['exhaustive','مستوعِب'],['cursory','عَجِل سطحيّ'],['meticulous','دقيق متأنٍّ'],['slapdash','مُتعجّل مُهمَل'],
 ['disjointed','مفكّك'],['cogent','مُقنع محكم'],['muddled','مشوّش'],
 ['incisive','نافذ'],['vague','مبهم'],['precise','مضبوط'],['approximate (adj)','تقريبيّ'],
 ['lopsided','مائل'],['even-handed','منصف'],['tendentious','موجَّه بغرض'],
 ['transparent reasoning','استدلال شفّاف'],['opaque argument','حجّة غامضة'],['self-consistent','متّسق ذاتيّاً'],['internally contradictory','متناقض داخليّاً']]},

{u:20, t:'أفعالُ التفكيرِ الدقيقة', list:[
 ['conceive of','يتصوّر'],['postulate','يفترض'],['surmise','يستنتج ظنّاً'],['deduce','يستنبط'],
 ['extrapolate','يَستقرئ امتداداً'],['interpolate','يَستكمل بينيّاً'],['approximate (verb)','يُقارب'],['quantify precisely','يُقدّر بدقّة'],
 ['differentiate','يُفرّق'],['conflate','يَخلط بين'],['equate','يُساوي'],['juxtapose','يُقابل'],
 ['synthesise','يُركّب'],['dissect','يُشرّح'],['unpack an idea','يُفكّك فكرة'],['tease out','يَستخلص بتأنٍّ'],
 ['pin down','يُحدّد بدقّة'],['circumscribe','يَحدّ نطاقاً'],['delineate','يرسم الحدود'],['demarcate','يفصل بحدّ'],
 ['reconcile','يُوفّق بين'],['resolve a tension','يحسم تعارضاً'],['account for variance','يُفسّر التباين'],['control for','يَضبط أثر'],
 ['presuppose','يَفترض سلفاً'],['take for granted','يَعدّه مسلَّماً'],['call into doubt','يُشكّك'],['subject to scrutiny','يُخضع للتمحيص']]},

{u:21, t:'التعليمُ والتربيةُ الدقيقة', list:[
 ['pedagogy','بيداغوجيا'],['andragogy','تعليم الكبار'],['didactic','تلقينيّ'],['heuristic','استكشافيّ'],
 ['constructivist','بنائيّ'],['behaviourist','سلوكيّ'],['metacognition','ما وراء المعرفة'],['self-regulation','تنظيم ذاتيّ'],
 ['prior knowledge','معرفة سابقة'],['cognitive load','حِمل معرفيّ'],['working memory','ذاكرة عاملة'],['spaced repetition','مراجعة متباعدة'],
 ['retrieval practice','استرجاع تدريبيّ'],['interleaving','تشبيك الموضوعات'],['desirable difficulty','صعوبة مرغوبة'],['transfer of learning','انتقال أثر التعلّم'],
 ['formative feedback','تغذية راجعة تكوينيّة'],['growth mindset','عقليّة النموّ'],['fixed mindset','عقليّة ثابتة'],['motivation intrinsic','دافع داخليّ'],
 ['extrinsic reward','مكافأة خارجيّة'],['engagement','انخراط'],['differentiated instruction','تعليم مُمايَز'],['universal design','تصميم شامل'],
 ['learning disability','صعوبة تعلّم'],['giftedness','موهبة'],['intervention programme','برنامج تدخّل'],['attainment gap','فجوة التحصيل']]},

{u:21, t:'الثقافةُ والهويّة', list:[
 ['identity','هويّة'],['assimilation','استيعاب ثقافيّ'],['acculturation','تثاقف'],
 ['multiculturalism','تعدّديّة ثقافيّة'],['pluralism','تعدّديّة'],['ethnocentrism','مركزيّة عرقيّة'],['cultural relativism','نسبيّة ثقافيّة'],
 ['diaspora','شتات'],['homeland','وطن أمّ'],['mother tongue','لغة أمّ'],['heritage language','لغة موروثة'],
 ['bilingualism','ثنائيّة لغويّة'],['code-switching','تناوب لغويّ'],['language shift','تحوّل لغويّ'],['language loss','فقدان لغويّ'],
 ['custom and practice','عُرف وممارسة'],['rite','طقس'],['taboo','محظور'],['norm','عُرف سائد'],
 ['stereotype','صورة نمطيّة'],['prejudice','تحامل'],['bias (social)','تحيّز اجتماعيّ'],['inclusion','دمج'],
 ['intangible heritage','تراث غير مادّيّ'],['oral tradition','تقليد شفويّ'],['folklore','فلكلور'],['collective memory','ذاكرة جمعيّة']]},

{u:22, t:'الهندسةُ والتصنيع', list:[
 ['tolerance band','نطاق السماحيّة'],['alloy','سبيكة'],['composite','مركّب'],['brittle','قصف'],
 ['ductile','مطيل'],['tensile strength','مقاومة الشدّ'],['fatigue (material)','كلال المادّة'],['corrosion','تآكل'],
 ['stress load','حمل إجهاد'],['strain','انفعال'],['deflection','انحراف'],['buckling','انبعاج'],
 ['prototype testing','اختبار النموذج'],['failure mode','نمط الإخفاق'],['redundant system','نظام احتياطيّ'],['fail-safe','آمن عند الإخفاق'],
 ['assembly line','خطّ تجميع'],['lean manufacturing','تصنيع رشيق'],['just in time','في الوقت المحدّد'],['throughput rate','معدّل الإنتاجيّة'],
 ['quality assurance','ضمان الجودة'],['statistical control','ضبط إحصائيّ'],['defect density','كثافة العيوب'],['root cause analysis','تحليل الأسباب الجذريّة'],
 ['calibration drift','انحراف المعايرة'],['preventive maintenance','صيانة وقائيّة'],['downtime cost','كلفة التوقّف'],['life cycle cost','كلفة دورة الحياة']]},

{u:22, t:'البيئةُ والجغرافيا', list:[
 ['topography','تضاريس'],['terrain','أرض'],['catchment','مستجمع'],['basin','حوض'],
 ['tributary','رافد'],['estuary','مصبّ'],['delta','دلتا'],['plateau','هضبة'],
 ['arid','قاحل'],['semi-arid','شبه قاحل'],['temperate','معتدل'],['tropical','مداريّ'],
 ['precipitation','هطول'],['evaporation','تبخّر'],['runoff','جريان سطحيّ'],['infiltration','تسرّب'],
 ['sediment','رسوبيّات'],['erosion rate','معدّل التعرية'],['weathering','تجوية'],['salinity','ملوحة'],
 ['biome','منطقة حيويّة'],['canopy','مظلّة الغابة'],['undergrowth','أعشاب سفليّة'],['migration corridor','ممرّ هجرة'],
 ['carrying capacity','طاقة استيعابيّة'],['overgrazing','رعي جائر'],['desertification','تصحّر'],['land degradation','تدهور الأراضي']]},

{u:21, t:'الإعلامُ والاتّصالُ الدقيق', list:[
 ['narrative framing','تأطير سرديّ'],['agenda setting','صناعة الأجندة'],['gatekeeping','حراسة البوّابة'],['echo chamber','غرفة صدى'],
 ['filter bubble','فقّاعة ترشيح'],['confirmation bias','تحيّز التأكيد'],['astroturfing','حراك مُفتعَل'],['soundbite','مقتطف مؤثّر'],
 ['spin','تدوير إعلاميّ'],['damage limitation','تقليل الضرر'],['embargo (news)','حظر نشر مؤقّت'],['scoop','سبق صحفيّ'],
 ['byline','توقيع الكاتب'],['masthead','ترويسة'],['op-ed','مقال رأي'],['leader column','افتتاحيّة'],
 ['circulation decline','تراجع التوزيع'],['paywall','جدار اشتراك'],['clickbait','طُعم نقر'],['engagement metric','مقياس التفاعل'],
 ['defamation','تشهير'],['libel','قذف مكتوب'],['slander','قذف شفويّ'],['right of reply','حقّ الردّ'],
 ['source protection','حماية المصادر'],['off the record remark','قولٌ غير مُسجَّل'],['background briefing','إحاطة خلفيّة'],['press freedom','حرّيّة الصحافة']]},

{u:20, t:'التعابيرُ الفكريّة', list:[
 ['by the same token','وبالمنطق نفسه'],['in much the same way','وعلى النحو ذاته'],['for that matter','بل وكذلك'],['not to mention','ناهيك عن'],
 ['let alone','فضلاً عن'],['if anything else','إن كان ثمّة شيء'],['to say nothing of','ودع عنك'],['all the more so','بل أشدّ'],
 ['far from it','بل على النقيض'],['quite the opposite','العكس تماماً'],['in a sense','بمعنًى ما'],['in no small part','بقدرٍ غير يسير'],
 ['more often than one thinks','أكثرَ ممّا يُظنّ'],['as a rule of thumb','كقاعدة تقريبيّة'],['by any measure','بأيّ مقياس'],['on any reading','على أيّ تأويل'],
 ['for all intents','عمليّاً'],['in point of fact','والحقّ أنّ'],['per se','بذاته'],
 ['ipso facto','بحكم الواقع نفسه'],['mutatis mutandis','مع إجراء التعديلات اللازمة'],['ceteris paribus','مع ثبات العوامل الأخرى'],['vice versa','والعكس بالعكس'],
 ['a fortiori','من باب أولى'],['inter alia','من بين أمور أخرى'],['sui generis','فريد في بابه'],['status quo ante','الوضع السابق']]}
,

{u:20, t:'الإحصاءُ والقياس', list:[
 ['mean','متوسّط حسابيّ'],['median','وسيط'],['mode','منوال'],['standard deviation','انحراف معياريّ'],
 ['variance (stat)','تباين'],['skew','التواء'],['outlier','قيمة شاذّة'],['distribution curve','منحنى توزيع'],
 ['normal distribution','توزيع طبيعيّ'],['probability density','كثافة احتماليّة'],['regression','انحدار'],['coefficient','معامل'],
 ['weighted average','متوسّط مرجّح'],['index number','رقم قياسيّ'],['base year','سنة الأساس'],['seasonal adjustment','تعديل موسميّ'],
 ['time series','سلسلة زمنيّة'],['moving average','متوسّط متحرّك'],['extrapolation','استقراء'],['interpolation','استكمال'],
 ['statistically significant','دالّ إحصائيّاً'],['spurious correlation','ارتباط زائف'],['confounding variable','متغيّر مُربِك'],['selection bias','تحيّز الاختيار'],
 ['response rate','معدّل الاستجابة'],['attrition','تسرّب العيّنة'],['weighting scheme','نظام ترجيح'],['raw score','درجة خام']]},

{u:20, t:'الوصفُ المجرَّد', list:[
 ['abstraction','تجريد'],['specificity','تخصيص'],['instance','مثالٌ جزئيّ'],
 ['manifestation','تجلٍّ'],['embodiment','تجسيد'],['dimension','بُعد'],['facet','وجه'],
 ['attribute','سمة'],['property','خاصّيّة'],['characteristic','صفة مميّزة'],['trait','سجيّة'],
 ['continuum','متّصل'],['spectrum','طيف'],['threshold point','نقطة عتبة'],['tipping point','نقطة تحوّل'],
 ['hierarchy','تراتبيّة'],['taxonomy','تصنيف منهجيّ'],['typology','نمطيّة'],['schema','مخطّط ذهنيّ'],
 ['framework of analysis','إطار تحليل'],['model of behaviour','نموذج سلوك'],['mechanism','آليّة'],['dynamic','ديناميّة'],
 ['interplay','تفاعل متبادل'],['tension between','توتّر بين'],['trade-off between','مقايضة بين'],['synergy','تآزر']]},

{u:21, t:'الاجتماعُ والسلوك', list:[
 ['social norm','معيار اجتماعيّ'],['conformity','امتثال'],['deviance','انحراف عن المعيار'],['sanction (social)','جزاء اجتماعيّ'],
 ['status','مكانة'],['role expectation','توقّع الدور'],['socialisation','تنشئة اجتماعيّة'],['peer group','جماعة الأقران'],
 ['in-group','الجماعة الداخليّة'],['out-group','الجماعة الخارجيّة'],['solidarity','تضامن'],['alienation','اغتراب'],
 ['social capital','رأس مال اجتماعيّ'],['network effect','أثر الشبكة'],['reciprocity','تبادليّة'],['trust deficit','عجز الثقة'],
 ['collective action','فعل جماعيّ'],['free rider','متطفّل على الجهد'],['tragedy of the commons','مأساة المشاعات'],['coordination problem','مشكلة التنسيق'],
 ['bystander effect','أثر المتفرّج'],['diffusion of responsibility','تشتّت المسؤوليّة'],['cognitive dissonance','تنافر معرفيّ'],['self-fulfilling prophecy','نبوءة محقّقة لذاتها'],
 ['social mobility upward','حراك صاعد'],['intergenerational','بين الأجيال'],['stratification','تطبّق اجتماعيّ'],['meritocracy','جدارة']]},

{u:21, t:'الخطابُ والإقناع', list:[
 ['rhetoric','بلاغة إقناعيّة'],['ethos','مصداقيّة المتكلّم'],['pathos','استمالة الوجدان'],['logos','الحجّة العقليّة'],
 ['appeal to authority','احتكامٌ إلى سلطة'],['appeal to emotion','استثارة عاطفيّة'],['anecdote','حكاية شاهدة'],['testimonial','شهادة'],
 ['framing effect','أثر التأطير'],['loaded language','لغة محمّلة'],['euphemism','تلطيف'],['dysphemism','تقبيح'],
 ['repetition for effect','تكرار مؤثّر'],['tricolon','ثلاثيّة بلاغيّة'],['antithesis','طباق'],['rhetorical device','أداة بلاغيّة'],
 ['concession then rebuttal','تسليمٌ ثمّ ردّ'],['preemptive rebuttal','ردٌّ استباقيّ'],['straw man avoided','تفادي رجل القشّ'],
 ['audience analysis','تحليل الجمهور'],['common ground appeal','مخاطبة المشترك'],['credibility building','بناء المصداقيّة'],['tone calibration','ضبط النبرة'],
 ['persuasive structure','بنية إقناعيّة'],['signposting','لافتات الخطاب'],['memorable closing','خاتمة راسخة'],['quotable line','عبارة تُقتبس']]},

{u:22, t:'المالُ والأعمالُ الدقيقة', list:[
 ['due diligence review','فحص نافٍ للجهالة'],['valuation multiple','مضاعف التقييم'],['discounted cash flow','تدفّق نقديّ مخصوم'],['net present value','صافي القيمة الحاليّة'],
 ['internal rate of return','معدّل العائد الداخليّ'],['payback period','فترة الاسترداد'],['capital expenditure','نفقة رأسماليّة'],['operating expenditure','نفقة تشغيليّة'],
 ['depreciation','إهلاك'],['amortisation','إطفاء'],['accrual','استحقاق'],['provision for loss','مخصّص خسارة'],
 ['working capital','رأس مال عامل'],['gearing','رفع ماليّ'],['covenant','تعهّد ائتمانيّ'],['collateral','ضمان عينيّ'],
 ['underwriting','اكتتاب'],['syndicate','تحالف تمويليّ'],['tranche','شريحة'],['maturity date','تاريخ الاستحقاق'],
 ['yield curve','منحنى العائد'],['spread (finance)','فارق العائد'],['liquidity risk','خطر السيولة'],['counterparty','طرف مقابل'],
 ['governance failure','إخفاق حوكميّ'],['shareholder activism','نشاط المساهمين'],['hostile takeover','استحواذ عدائيّ'],['poison pill','حبّة السمّ']]},

{u:22, t:'الصحّةُ النفسيّةُ والسلوك', list:[
 ['resilience (psych)','مرونة نفسيّة'],['burnout','احتراق وظيفيّ'],['coping mechanism','آليّة تكيّف'],['stressor','مُجهِد'],
 ['trigger (psych)','مُحفّز نفسيّ'],['avoidance','تجنّب'],['rumination','اجترار فكريّ'],['catastrophising','تهويل'],
 ['reframing','إعادة تأطير'],['mindfulness','يقظة ذهنيّة'],['grounding technique','تقنية تثبيت'],['self-compassion','شفقة بالذات'],
 ['boundaries setting','وضع حدود'],['assertiveness','توكيديّة'],['people-pleasing','إرضاء الآخرين'],['perfectionism','كماليّة'],
 ['imposter syndrome','متلازمة المحتال'],['self-efficacy','فاعليّة ذاتيّة'],['locus of control','مركز الضبط'],['learned helplessness','عجز متعلَّم'],
 ['intrusive thought','فكرة اقتحاميّة'],['hypervigilance','فرط يقظة'],['dissociation','انفصال'],['emotional regulation','تنظيم انفعاليّ'],
 ['therapeutic alliance','تحالف علاجيّ'],['relapse prevention','وقاية من الانتكاس'],['stigma','وصمة'],['help-seeking','طلب المساعدة']]},

{u:20, t:'أفعالُ الكتابةِ الدقيقة', list:[
 ['assert without evidence','يجزم بلا دليل'],['hedge appropriately','يتحفّظ بقدر'],['attribute correctly','يُسند صحيحاً'],['paraphrase faithfully','يُعيد الصياغة أميناً'],
 ['quote selectively','يقتبس انتقاءً'],['cite accurately','يستشهد بدقّة'],['summarise fairly','يُلخّص منصفاً'],['contextualise','يَضع في سياقه'],
 ['foreground an argument','يُبرز حجّة'],['subordinate a detail','يُؤخّر تفصيلاً'],['signpost a section','يُلافِت قسماً'],['transition smoothly','ينتقل بسلاسة'],
 ['define a term','يُعرّف مصطلحاً'],['operationalise','يُجرئن المفهوم'],['delimit scope','يَحدّ النطاق'],['acknowledge limitation','يُقرّ بالقيود'],
 ['anticipate objection','يستبق اعتراضاً'],['rebut persuasively','يردّ مُقنعاً'],['qualify strongly','يُقيّد بشدّة'],['conclude cautiously','يَخلص بحذر'],
 ['avoid repetition','يتفادى التكرار'],['vary sentence length','يُنوّع طول الجملة'],['prune redundancy','يُقلّم الزائد'],['tighten prose','يَشُدّ النصّ'],
 ['maintain register','يُحافظ على السجلّ'],['sustain tone','يُثبّت النبرة'],['revise for clarity','يُنقّح للوضوح'],['proof for consistency','يُراجع للاتّساق']]}
,

{u:21, t:'الرعايةُ والخدماتُ العامّة', list:[
 ['entitlement','استحقاق'],['eligibility criteria','معايير الأهليّة'],['means test','اختبار الدخل'],['benefit claim','مطالبة بإعانة'],
 ['safety net','شبكة أمان'],['universal provision','توفير شامل'],['targeted support','دعم موجَّه'],['taper rate','معدّل التدرّج'],
 ['waiting time','زمن الانتظار'],['referral pathway','مسار الإحالة'],['triage','فرز'],['capacity constraint','قيد الطاقة'],
 ['service user','مستفيد'],['caseload','عبء الحالات'],['key worker','أخصّائيّ مرافق'],['care plan','خطّة رعاية'],
 ['safeguarding','حماية'],['duty of care','واجب العناية'],['confidentiality breach','خرق السرّيّة'],['informed choice','اختيار مستنير'],
 ['outreach','تواصل ميدانيّ'],['early intervention','تدخّل مبكّر'],['prevention agenda','أجندة الوقاية'],['joined-up services','خدمات متكاملة'],
 ['postcode lottery','تفاوت جغرافيّ في الخدمة'],['unmet need','حاجة غير ملبّاة'],['service gap','فجوة خدميّة'],['continuity of care','استمراريّة الرعاية']]},

{u:21, t:'العملُ والتوظيفُ الدقيق', list:[
 ['job security','أمان وظيفيّ'],['precarious work','عمل هشّ'],['zero-hours','بلا ساعات مضمونة'],['gig economy','اقتصاد الوظائف المؤقّتة'],
 ['collective bargaining','مفاوضة جماعيّة'],['industrial action','إضراب'],['grievance procedure','إجراء تظلّم'],['disciplinary hearing','جلسة تأديبيّة'],
 ['unfair dismissal','فصل تعسّفيّ'],['constructive dismissal','فصل ضمنيّ'],['notice period','مهلة إشعار'],['severance','تعويض نهاية خدمة'],
 ['restrictive covenant','شرط تقييديّ'],['non-compete','عدم منافسة'],['garden leave','إجازة مدفوعة قبل المغادرة'],['probation review','مراجعة فترة التجربة'],
 ['appraisal cycle','دورة التقويم'],['competency framework','إطار الجدارات'],['pay band','شريحة أجر'],
 ['equal pay','أجر متساوٍ'],['pay gap','فجوة أجور'],['flexible working','عمل مرن'],['compressed hours','ساعات مضغوطة'],
 ['remote-first','قائم على العمل عن بُعد'],['hybrid model','نموذج هجين'],['onboarding','تهيئة الموظّف'],['offboarding','إنهاء الخدمة']]},

{u:22, t:'الرياضياتُ والمنطق', list:[
 ['theorem','مبرهنة'],['lemma','قضيّة مساعدة'],['proof by contradiction','برهان بالخلف'],
 ['set','مجموعة'],['subset','مجموعة جزئيّة'],['union','اتّحاد'],['intersection','تقاطع'],
 ['function','دالّة'],['domain','مجال'],['range (maths)','مدى'],['inverse','معكوس'],
 ['linear','خطّيّ'],['exponential','أُسّيّ'],['logarithmic','لوغاريتميّ'],['asymptote','خطّ مقارب'],
 ['derivative','مشتقّة'],['integral','تكامل'],['limit','نهاية'],['convergent series','متسلسلة متقاربة'],
 ['matrix','مصفوفة'],['vector','متّجه'],['scalar','كمّيّة قياسيّة'],['dimensionality','بُعديّة'],
 ['permutation','تبديلة'],['combination','توفيقة'],['factorial','مضروب'],['recursive','تكراريّ ذاتيّ'],
 ['necessary and sufficient','لازم وكافٍ'],['if and only if','إذا وفقط إذا'],['without loss of generality','دون إخلال بالعموميّة'],['by induction','بالاستقراء']]},

{u:22, t:'الطعامُ والضيافةُ الراقية', list:[
 ['cuisine','مطبخ'],['palate','ذائقة'],['seasoning balance','توازن التتبيل'],['umami','أومامي'],
 ['marinate','يُنقع بالتتبيلة'],['sear','يَقلي سريعاً'],['braise','يُطهى ببطء'],['poach','يَسلق برفق'],
 ['reduction','تكثيف بالتبخير'],['emulsion','مستحلب'],['garnish','زينة الطبق'],['plating','تقديم الطبق'],
 ['tasting menu','قائمة تذوّق'],['pairing','مزاوجة'],['seasonal menu','قائمة موسميّة'],['sourcing','توريد المكوّنات'],
 ['farm to table','من المزرعة إلى المائدة'],['provenance of produce','منشأ المنتج'],['organic certification','شهادة عضويّة'],['service standard','معيار الخدمة'],['front of house','صالة الضيوف'],['back of house','المطبخ والإدارة'],['covers','عدد الزبائن'],
 ['hospitality','ضيافة'],['ambience','أجواء'],['dietary requirement','متطلّب غذائيّ'],['allergen notice','إشعار المواد المسبّبة للحساسيّة']]},

{u:20, t:'الزمنُ والتاريخُ الفكريّ', list:[
 ['antiquity','العصر القديم'],['medieval','وسيط'],['renaissance','نهضة'],['enlightenment','تنوير'],
 ['modernity','حداثة'],['postmodern','ما بعد حداثيّ'],['industrial revolution','ثورة صناعيّة'],['digital age','عصر رقميّ'],
 ['periodisation','تقسيم الحِقَب'],['anachronism','مفارقة تاريخيّة'],['historiography','تأريخيّة'],['primary source','مصدر أوّليّ'],
 ['secondary source','مصدر ثانويّ'],['archival research','بحث أرشيفيّ'],['provenance of document','سَنَد الوثيقة'],['authenticity check','فحص الأصالة'],
 ['continuity and change','الاستمرار والتغيّر'],['turning point in history','منعطف تاريخيّ'],['legacy of an era','إرث حقبة'],['revisionist','مراجِع للتأريخ'],
 ['colonial','استعماريّ'],['post-colonial','ما بعد استعماريّ'],['nation-building','بناء الدولة'],['sovereign state','دولة ذات سيادة'],
 ['treaty obligation','التزام تعاهديّ'],['geopolitical','جيوسياسيّ'],['sphere of influence','منطقة نفوذ'],['balance of power','توازن القوى']]}
,

{u:20, t:'العمارةُ والتصميم', list:[
 ['proportion','تناسب'],['symmetry','تناظر'],['asymmetry','لاتناظر'],['scale (design)','مقياس'],
 ['massing','تكتيل'],['void and solid','الفراغ والمصمت'],['articulation','تمفصل'],['ornament','زخرف'],
 ['vernacular','عمارة محلّيّة'],['monumental','نُصُبيّ'],['minimalist','تقليليّ'],['brutalist','وحشيّ الطراز'],
 ['load path','مسار الأحمال'],['cantilever','كابولي'],['truss','جَمَلون'],['span','بحر إنشائيّ'],
 ['daylighting','إضاءة نهاريّة'],['thermal mass','كتلة حراريّة'],['passive design','تصميم سلبيّ'],['orientation','توجيه'],
 ['circulation (building)','حركة داخل المبنى'],['threshold space','فراغ عتبة'],['public frontage','واجهة عامّة'],['setback','ارتداد'],
 ['conservation area','منطقة حفاظ'],['listed building','مبنى مُدرَج'],['adaptive reuse','إعادة توظيف'],['infill','بناء بينيّ']]},

{u:21, t:'التفاوضُ والدبلوماسيّة', list:[
 ['mandate limits','حدود التفويض'],['red line','خطّ أحمر'],['fallback position','موقف احتياطيّ'],['best alternative','أفضل بديل'],
 ['reservation price','سعر التحفّظ'],['zone of agreement','منطقة الاتّفاق'],['anchoring','تثبيت أوّليّ'],['framing a proposal','تأطير مقترح'],
 ['package deal','صفقة متكاملة'],['linkage','ربط الملفّات'],['sequencing','ترتيب الخطوات'],['confidence-building','بناء الثقة'],
 ['back channel','قناة خلفيّة'],['shuttle diplomacy','دبلوماسيّة مكوكيّة'],['good offices','مساعٍ حميدة'],['facilitator role','دور الميسّر'],
 ['interim agreement','اتّفاق مرحليّ'],['framework accord','اتّفاق إطاريّ'],['implementation phase','مرحلة التنفيذ'],['monitoring mechanism','آليّة رصد'],
 ['dispute settlement','تسوية المنازعات'],['escalation clause','شرط التصعيد'],['sunset clause','شرط الانقضاء'],['exit provision','بند الانسحاب'],
 ['reciprocal concession','تنازل متبادل'],['face-saving formula','صيغة حافظة لماء الوجه'],['constructive ambiguity','غموض بنّاء'],['agreed language','صياغة متّفق عليها']]},

{u:22, t:'التعابيرُ العامّةُ الراقية', list:[
 ['by all accounts','بشهادة الجميع'],['to all appearances','في كلّ الظواهر'],['on balance of probability','على ترجيح الاحتمال'],['beyond reasonable doubt','بما لا يدع مجالاً لشكّ معقول'],
 ['in the main','في الأعمّ'],['to a man','بلا استثناء'],['across the board','شاملاً'],
 ['at a stretch','على أقصى تقدير'],['at a pinch','عند الضرورة'],['in a pinch','في ضيق'],['by a whisker','بفارق ضئيل'],
 ['at cross purposes','على غير تفاهم'],['of one mind','على رأي واحد'],['at loggerheads','في خصام'],['on common ground','على أرضيّة مشتركة'],
 ['take issue with','يعترض على'],['make allowance for','يُراعي'],['take stock of','يُقيّم الموقف'],['set great store by','يُعلّق أهمّيّة كبرى'],
 ['be at pains to','يحرص أشدّ الحرص'],['go to great lengths','يبذل غاية الجهد'],['leave no stone unturned','لا يترك سبيلاً'],['err on the side of caution','يميل إلى الحذر'],
 ['in no uncertain terms','بعباراتٍ لا لبس فيها'],['to put it mildly','وهذا أقلّ ما يُقال'],['to say the least','على أقلّ تقدير'],['not by any stretch','ولا بأيّ حال']]},

{u:22, t:'أفعالُ العلاقاتِ الدقيقة', list:[
 ['defer to','يُذعن لرأي'],['concede to','يُسلّم لـ'],['accommodate a view','يستوعب رأياً'],['entertain a proposal','ينظر في مقترح'],
 ['dismiss out of hand','يرفض ابتداءً'],['brush off a concern','يستخفّ بقلق'],['take on board','يأخذ بعين الاعتبار'],['bear in mind fully','يُراعي تماماً'],
 ['reconcile differences','يُوفّق بين الخلافات'],['bridge a divide','يَردم هوّة'],['patch up','يُرقّع خلافاً'],['smooth over','يُهدّئ'],
 ['fall out with','يتخاصم مع'],['make amends','يُصلح ما أفسد'],['extend an olive branch','يمدّ غصن الزيتون'],['burn bridges','يُحرق المراكب'],
 ['stand by someone','يقف بجانبه'],['let someone down','يُخذل'],['live up to expectations','يرقى إلى التوقّعات'],['fall short of hopes','يخيب الآمال'],
 ['give the benefit of the doubt','يُحسن الظنّ'],['hold against','يَحمل ضغينةً لأجل'],['hold in high regard','يُقدّر عالياً'],['think little of','يَستخفّ بـ'],
 ['look up to','يَقتدي بـ'],['look down on','يَزدري'],['see eye to eye','يتّفق تماماً'],['agree to differ','يتّفقان على الاختلاف']]},

{u:21, t:'الوصفُ الأسلوبيّ', list:[
 ['succinct','موجز بليغ'],['verbose','مُسهِب مُملّ'],['elliptical','مُقتضَب غامض'],['discursive','استطراديّ'],
 ['lucid','جليّ'],['turgid','منتفخ ثقيل'],['pedestrian','عاديّ ممل'],['evocative','موحٍ'],
 ['laboured','متكلَّف'],['effortless','سَلِس'],['polished','مصقول'],['rough-hewn','خشن غير مُهذَّب'],
 ['understated','مُهوَّن بقصد'],['overwrought','مُفرط التكلّف'],['restrained prose','نثر مكبوح'],['florid','مُزخرف مُفرط'],
 ['idiomatic','جارٍ على سنن اللغة'],['stilted','متخشّب'],['natural-sounding','طبيعيّ الوقع'],['contrived','مصطنع'],
 ['economical','مُقتصد'],['padded','محشوّ'],['tightly argued','مُحكم الحجّة'],['loosely structured','رخو البناء'],
 ['authoritative','ذو سلطة معرفيّة'],['tentative in tone','متردّد النبرة'],['assured','واثق'],['hesitant','متلعثم']]}
,

{u:20, t:'الموسيقى والفنونُ الأدائيّة', list:[
 ['composition (music)','تأليف موسيقيّ'],['melody','لحن'],['harmony','توافق'],['rhythm','إيقاع'],
 ['tempo','سرعة الأداء'],['dynamics','تدرّج الشدّة'],['timbre','جَرس الصوت'],['pitch','طبقة صوتيّة'],
 ['improvisation','ارتجال'],['repertoire','ذخيرة أعمال'],['ensemble','فرقة'],['conductor','قائد أوركسترا'],
 ['rehearsal','بروفة'],['performance anxiety','قلق الأداء'],['stage presence','حضور المسرح'],['encore','إعادة بطلب الجمهور'],
 ['choreography','تصميم رقص'],['blocking (theatre)','توزيع الحركة'],['monologue','مناجاة'],['dialogue delivery','أداء الحوار'],
 ['set design','تصميم المنظر'],['lighting design','تصميم الإضاءة'],['costume','زيّ مسرحيّ'],['props','مستلزمات'],
 ['rehearsed spontaneity','عفويّة مُتدرَّبة'],['audience rapport','تواصل مع الجمهور'],['critical reception','استقبال نقديّ'],['box office success','نجاح جماهيريّ']]},

{u:21, t:'السفرُ والجغرافيا البشريّة', list:[
 ['itinerary','خطّ سير'],['layover','توقّف عابر'],['jet lag','اضطراب الرحلات'],['visa on arrival','تأشيرة عند الوصول'],
 ['border control','مراقبة الحدود'],['residency permit','إقامة'],['work permit','تصريح عمل'],['naturalisation','تجنّس'],
 ['expatriate','مغترب'],['repatriation','إعادة إلى الوطن'],['remittance','تحويلات المغتربين'],['brain drain','هجرة الكفاءات'],
 ['urban migration','هجرة حضريّة'],['rural depopulation','تفريغ الريف'],['shanty town','عشوائيّات'],['gentrification','استطباق'],
 ['tourist season','موسم السياحة'],['overtourism','فرط السياحة'],['ecotourism','سياحة بيئيّة'],['heritage tourism','سياحة تراثيّة'],
 ['carrying capacity of a site','طاقة الموقع الاستيعابيّة'],['seasonal workforce','عمالة موسميّة'],['hospitality sector','قطاع الضيافة'],['local economy impact','أثر على الاقتصاد المحلّيّ'],
 ['cultural sensitivity','حسّ ثقافيّ'],['responsible travel','سفر مسؤول'],['low-impact','قليل الأثر'],['community-based','قائم على المجتمع']]},

{u:22, t:'الدينُ والفكرُ والقيم', list:[
 ['belief system','منظومة اعتقاد'],['worldview','تصوّر للعالم'],['doctrine (religion)','عقيدة'],['ritual','شعيرة'],
 ['scripture','نصّ مقدّس'],['exegesis','تفسير'],['hermeneutics','تأويليّة'],['commentary tradition','تقليد شرحيّ'],
 ['orthodoxy','تقليد راسخ'],['heterodoxy','خروج عن المألوف'],['reform movement','حركة إصلاح'],['piety','تقوى'],['asceticism','زهد'],['devotion','تعبّد'],['pilgrimage','حجّ'],
 ['moral philosophy','فلسفة أخلاقيّة'],['virtue ethics','أخلاق الفضيلة'],['consequentialism','نتائجيّة'],['deontology','واجبيّة'],
 ['conscience','ضمير'],['moral dilemma','معضلة أخلاقيّة'],['ethical framework','إطار أخلاقيّ'],['competing values','قيم متزاحمة'],
 ['tolerance of difference','تسامح مع الاختلاف'],['coexistence','تعايش'],['interfaith dialogue','حوار الأديان'],['secular space','فضاء مدنيّ']]},

{u:20, t:'اللغويّاتُ والأسلوب', list:[
 ['syntax','نحو'],['morphology','صرف'],['semantics','دلالة'],['pragmatics','تداوليّة'],
 ['phonology','علم الأصوات'],['prosody','تنغيم وإيقاع'],['lexis','معجم'],['corpus','مدوّنة'],
 ['collocation strength','قوّة المصاحبة'],['colligation','تلازم نحويّ'],['register variation','تنوّع السجلّ'],['dialect continuum','متّصل لهجيّ'],
 ['idiolect','لغة الفرد'],['sociolect','لهجة اجتماعيّة'],['jargon','مصطلح فنّيّ'],['neologism','كلمة مُستحدَثة'],
 ['semantic shift','انزياح دلاليّ'],['broadening','توسّع دلاليّ'],['narrowing','تضييق دلاليّ'],['pejoration','انحطاط دلاليّ'],
 ['speech act','فعل كلاميّ'],['implicature','استلزام حواريّ'],['presupposition','افتراض مسبق'],['deixis','إشاريّة'],
 ['cohesive device','أداة اتّساق'],['discourse marker','علامة خطاب'],['turn-taking','تناوب الأدوار'],['adjacency pair','زوج متجاور']]}
,

{u:21, t:'المخاطرُ والأزمات', list:[
 ['crisis response','استجابة للأزمة'],['contingency','طارئ محتمل'],['worst-case planning','تخطيط لأسوأ الفروض'],['stress test','اختبار تحمّل'],
 ['vulnerability assessment','تقييم الهشاشة'],['exposure to risk','تعرّض للمخاطر'],['systemic risk','خطر نظاميّ'],['cascading failure','إخفاق متتالٍ'],
 ['single point of failure','نقطة إخفاق وحيدة'],['resilience planning','تخطيط الصمود'],['business continuity','استمراريّة الأعمال'],['disaster recovery','تعافٍ من الكوارث'],
 ['early warning indicator','مؤشّر إنذار مبكّر'],['escalation trigger','مُحفّز تصعيد'],['command centre','غرفة عمليّات'],['situation report','تقرير موقف'],
 ['rapid assessment','تقييم سريع'],['resource mobilisation','حشد الموارد'],['prioritisation matrix','مصفوفة أولويّات'],['decision under uncertainty','قرار في ظلّ عدم اليقين'],
 ['reputational damage','ضرر سمعيّ'],['crisis communication','اتّصال الأزمات'],['holding statement','بيان مؤقّت'],['transparency in crisis','شفافيّة في الأزمة'],
 ['after-action review','مراجعة بعديّة'],['lesson identification','تحديد الدروس'],['corrective plan','خطّة تصحيح'],['institutional memory','ذاكرة مؤسّسيّة']]},

{u:22, t:'الزراعةُ والأمنُ الغذائيّ', list:[
 ['yield gap','فجوة الغلّة'],['crop resilience','صمود المحصول'],['drought-tolerant','مقاوم للجفاف'],['soil fertility','خصوبة التربة'],
 ['nutrient cycle','دورة المغذّيات'],['crop residue','مخلّفات المحصول'],['no-till farming','زراعة بلا حرث'],['cover crop','محصول تغطية'],
 ['precision agriculture','زراعة دقيقة'],['drip irrigation','ريّ بالتنقيط'],['water-use efficiency','كفاءة استعمال المياه'],['salinisation','تملّح'],
 ['post-harvest loss','فقد ما بعد الحصاد'],['cold chain','سلسلة تبريد'],['storage capacity','سعة التخزين'],['market access','نفاذ إلى السوق'],
 ['smallholder support','دعم صغار المزارعين'],['extension service','خدمة إرشاديّة'],['cooperative marketing','تسويق تعاونيّ'],['price volatility','تقلّب الأسعار'],
 ['strategic reserve','احتياطيّ استراتيجيّ'],['import substitution','إحلال الواردات'],['food sovereignty','سيادة غذائيّة'],['nutrition security','أمن تغذويّ'],
 ['dietary diversity','تنوّع غذائيّ'],['fortification','تدعيم غذائيّ'],['stunting','تقزّم'],['wasting','هزال']]},

{u:20, t:'التعابيرُ الزمنيّةُ الدقيقة', list:[
 ['in the fullness of time','مع تمام الوقت'],['before long','عمّا قريب'],['sooner rather than later','عاجلاً لا آجلاً'],['any time now','في أيّ لحظة'],
 ['at this juncture','في هذا المفصل'],['as things stand','بحال الأمور'],['for the foreseeable future','في المدى المنظور'],['for years to come','لسنين قادمة'],
 ['in living memory','في الذاكرة الحيّة'],['of late','مؤخّراً'],['as of yet','حتّى اللحظة'],['to this day','إلى يومنا'],
 ['once and for all time','مرّةً أخيرة'],['time and again','مراراً وتكراراً'],['on occasion','أحياناً'],['few and far between','نادرةٌ متباعدة'],
 ['in short order','في وقتٍ وجيز'],['at length','بعد طول'],['in the long haul','على المدى الطويل'],['over the years','عبر السنين'],
 ['ahead of its time','سابقٌ لعصره'],['behind the times','متخلّفٌ عن عصره'],['of its day','في زمانه'],['timeless','خالد'],
 ['in retrospect','بأثر رجعيّ'],['with hindsight','بعلم ما بعدُ'],['at the outset','في البدء'],['in the event','عند وقوع الأمر']]}
,

{u:21, t:'الأخلاقياتُ المهنيّةُ الدقيقة', list:[
 ['professional judgement','تقدير مهنيّ'],['scope of practice','نطاق الممارسة'],['standard of care','معيار العناية'],['best interest','المصلحة الفضلى'],
 ['informed refusal','رفض مستنير'],['capacity to consent','أهليّة الموافقة'],['proxy decision','قرار بالوكالة'],['advance directive','توجيه مسبق'],
 ['dual loyalty','ازدواج الولاء'],['boundary violation','تجاوز الحدود المهنيّة'],['gift policy','سياسة الهدايا'],['disclosure obligation','واجب الإفصاح'],
 ['peer accountability','مساءلة الأقران'],['reporting duty','واجب الإبلاغ'],['protected disclosure','إفصاح محميّ'],['retaliation','انتقام وظيفيّ'],
 ['competence limit','حدّ الكفاءة'],['continuing education','تعليم مستمرّ'],['licence renewal','تجديد الترخيص'],['revalidation','إعادة اعتماد'],
 ['documentation standard','معيار التوثيق'],['record retention','حفظ السجلّات'],['audit readiness','جاهزيّة التدقيق'],['corrective guidance','توجيه تصحيحيّ'],
 ['reflective practice','ممارسة تأمّليّة'],['supervision session','جلسة إشراف'],['case conference','مؤتمر حالة'],['second opinion','رأي ثانٍ']]},

{u:22, t:'الحوسبةُ والبياناتُ الدقيقة', list:[
 ['data pipeline','خطّ معالجة البيانات'],['ingestion','استيعاب البيانات'],['transformation layer','طبقة تحويل'],['warehouse','مستودع بيانات'],
 ['data lake','بحيرة بيانات'],['normalisation','تطبيع'],['denormalisation','إلغاء التطبيع'],['partitioning','تجزئة'],
 ['sharding','تشظية'],['replication lag','تأخّر النسخ'],['eventual consistency','اتّساق نهائيّ'],['strong consistency','اتّساق صارم'],
 ['read replica','نسخة للقراءة'],['write-ahead log','سجلّ مسبق للكتابة'],['snapshot','لقطة'],['point-in-time recovery','استرجاع لنقطة زمنيّة'],
 ['query plan','خطّة الاستعلام'],['full scan','مسح كامل'],['covering index','فهرس شامل'],['cardinality','عدديّة'],
 ['batch job','مهمّة دفعيّة'],['stream processing','معالجة تدفّقيّة'],['back pressure','ضغط عكسيّ'],['dead letter queue','طابور الرسائل الميتة'],
 ['schema evolution','تطوّر المخطّط'],['backward compatible','متوافق مع السابق'],['breaking change','تغيير كاسر'],['deprecation notice','إشعار إهمال']]},

{u:20, t:'النقدُ والتقويمُ الدقيق', list:[
 ['critique constructively','ينقد بناءً'],['identify a weakness','يرصد ضعفاً'],['commend a strength','يُثني على قوّة'],['suggest an improvement','يقترح تحسيناً'],
 ['assess fairly','يُقوّم منصفاً'],['benchmark against','يُقارن بمرجع'],['rate consistently','يُقدّر باطّراد'],['moderate a mark','يَضبط درجة'],
 ['justify a judgement','يُسوّغ حكماً'],['evidence a claim','يُدلّل على دعوى'],['cite an example','يَستشهد بمثال'],['generalise cautiously','يُعمّم بحذر'],
 ['weigh competing views','يُوازن آراءً متنازعة'],['acknowledge merit','يُقرّ بوجاهة'],['note a limitation','يُنبّه إلى قيد'],['flag an omission','يُشير إلى إغفال'],
 ['distinguish fact from opinion','يُفرّق الواقعة عن الرأي'],['detect a bias','يكشف تحيّزاً'],['test an assumption','يختبر افتراضاً'],['probe a conclusion','يَسبر نتيجة'],
 ['recommend with caveats','يوصي بتحفّظات'],['withhold judgement','يُرجئ الحكم'],['revise an assessment','يُراجع تقويماً'],['stand by a conclusion','يَثبت على نتيجة'],
 ['overall verdict','حكم إجماليّ'],['balanced appraisal','تقويم متوازن'],['measured praise','مدحٌ متّزن'],['qualified criticism','نقدٌ مُقيَّد']]}
,

{u:20, t:'الحجّةُ المكتوبةُ وأدواتُها', list:[
 ['thesis-driven','قائم على أطروحة'],['evidence-led','مُستنِد إلى الدليل'],['claim and warrant','الدعوى والمسوّغ'],['data and backing','البيانات والسند'],
 ['qualifier in argument','مُقيّد الحجّة'],['rebuttal clause','شرط النقض'],['scope of claim','نطاق الدعوى'],['strength of claim','قوّة الدعوى'],
 ['line of argument','خطّ الحجاج'],['thread of reasoning','خيط الاستدلال'],['logical leap','قفزة منطقيّة'],['missing step','خطوة مفقودة'],
 ['supporting study','دراسة داعمة'],['contrary finding','نتيجة مخالفة'],['weight of evidence','ثقل الأدلّة'],['preponderance','رجحان'],
 ['methodological flaw','خلل منهجيّ'],['small sample caveat','تحفّظ صغر العيّنة'],['generalisability','قابليّة التعميم'],['external validity','صدق خارجيّ'],
 ['internal validity','صدق داخليّ'],['construct validity','صدق البناء'],['reliability measure','مقياس الثبات'],['inter-rater agreement','اتّفاق المحكّمين'],
 ['peer critique','نقد الأقران'],['response to reviewers','ردّ على المحكّمين'],['revision memo','مذكّرة تنقيح'],['final submission','التقديم النهائيّ']]},

{u:22, t:'الجسمُ والحركةُ والرياضة', list:[
 ['cardiovascular','قلبيّ وعائيّ'],['musculoskeletal','عضليّ هيكليّ'],['flexibility','مرونة جسديّة'],['mobility','قابليّة الحركة'],
 ['core strength','قوّة الجذع'],['range of motion','مدى الحركة'],['posture','قوام'],['alignment of body','استقامة الجسم'],
 ['warm-up routine','روتين إحماء'],['recovery period','فترة تعافٍ'],['overtraining','إفراط في التدريب'],['rest day','يوم راحة'],
 ['aerobic','هوائيّ'],['anaerobic','لاهوائيّ'],['interval training','تدريب متقطّع'],['endurance base','قاعدة التحمّل'],
 ['strain injury','إصابة إجهاد'],['sprain','التواء'],['rehabilitation plan','خطّة تأهيل'],['physiotherapy','علاج طبيعيّ'],
 ['hydration','ترطيب'],['electrolyte','شوارد'],['caloric intake','مدخول سعريّ'],['macronutrient','مغذٍّ كبير'],
 ['body composition','تركيب الجسم'],['resting heart rate','نبض الراحة'],['sleep quality','جودة النوم'],['training load','حمل التدريب']]},

{u:21, t:'المدنُ والسياساتُ العمرانيّة', list:[
 ['master plan','مخطّط شامل'],['land use','استعمال الأرض'],['mixed use','استعمال مختلط'],['density target','هدف الكثافة'],
 ['transit-oriented','موجّه بالنقل العامّ'],['walkability','قابليّة المشي'],['active travel','تنقّل نشط'],['car dependency','اعتماد على السيّارة'],
 ['public realm quality','جودة الحيّز العامّ'],['street furniture','أثاث الشارع'],['shading strategy','استراتيجيّة التظليل'],['microclimate','مناخ محلّيّ'],
 ['affordability ratio','نسبة القدرة على التحمّل'],['housing supply','عرض المساكن'],['tenure mix','مزيج الحيازة'],['displacement risk','خطر النزوح'],
 ['community consultation','استشارة مجتمعيّة'],['participatory design','تصميم تشاركيّ'],['planning objection','اعتراض تخطيطيّ'],['appeal process','إجراء الطعن'],
 ['development levy','رسم تطوير'],['infrastructure charge','رسم بنية تحتيّة'],['phasing plan','خطّة مراحل'],['delivery vehicle','أداة تنفيذ'],
 ['brownfield','أرض مستعملة سابقاً'],['greenfield','أرض بكر'],['green belt','حزام أخضر'],['urban boundary','حدّ عمرانيّ']]}
,

{u:22, t:'الملابسُ والمظهرُ الدقيق', list:[
 ['tailored','مُفصَّل'],['off-the-peg','جاهز'],['bespoke','حسب الطلب'],['lining','بطانة'],
 ['seam','درزة'],['hem','حاشية'],['cuff','أسورة الكمّ'],['lapel','طية الصدر'],
 ['fabric weight','وزن القماش'],['weave','نسيج'],['texture of cloth','ملمس القماش'],['drape','انسدال'],
 ['understated elegance','أناقة هادئة'],['overdressed','مُفرط التأنّق'],['underdressed','دون المناسبة'],['dress code','قواعد اللباس'],
 ['black tie','بدلة رسميّة'],['business formal','رسميّ مهنيّ'],['smart casual','أنيق غير رسميّ'],['workwear','ملابس عمل'],
 ['wardrobe staple','قطعة أساسيّة'],['capsule wardrobe','خزانة مُقتصدة'],['seasonal rotation','تبديل موسميّ'],['care label','بطاقة العناية'],
 ['dry clean only','تنظيف جافّ فقط'],['colour-fast','ثابت اللون'],['shrinkage','انكماش'],['wear and tear','بلًى بالاستعمال']]},

{u:20, t:'الرقمُ والمقدارُ في الحِجاج', list:[
 ['order of magnitude','رتبة الحجم'],['ballpark figure','رقم تقريبيّ'],['back-of-envelope','حساب سريع'],['rough estimate','تقدير خشن'],
 ['upper bound','حدّ أعلى'],['lower bound','حدّ أدنى'],['best estimate','أفضل تقدير'],['central scenario','السيناريو المركزيّ'],
 ['sensitivity analysis','تحليل الحساسيّة'],['what-if scenario','سيناريو افتراضيّ'],['base case','الحالة الأساس'],['stress scenario','سيناريو إجهاد'],
 ['per head','للفرد'],['per unit','للوحدة'],['pro rata','بالتناسب'],['on aggregate','في المجموع'],
 ['net of','صافياً من'],['gross of','شاملاً'],['inclusive of','متضمّناً'],['exclusive of','غير شامل'],
 ['year-on-year change','تغيّر سنويّ'],['quarter-on-quarter','تغيّر ربعيّ'],['compound growth','نموّ مركّب'],['annualised','محسوب سنويّاً'],
 ['nominal value','قيمة اسميّة'],['real terms','بالقيمة الحقيقيّة'],['constant prices','أسعار ثابتة'],['current prices','أسعار جارية']]}


,

{u:20, t:'الإعلامُ والخطابُ العامّ', list:[
 ['editorial line','الخطّ التحريريّ'],['newsroom','غرفة الأخبار'],['beat reporter','مراسل متخصّص'],['dateline','سطر المكان والتاريخ'],
 ['byline','سطر الكاتب'],['lead paragraph','فقرة الاستهلال'],['on background','للخلفيّة فقط'],
 ['attribution of source','نسبة المصدر'],['correction notice','إشعار تصويب'],['retraction','سحب الخبر'],
 ['embargo','حظر النشر المؤقّت'],['news cycle','دورة الأخبار'],
 ['investigative piece','تحقيق استقصائيّ'],['media literacy','الوعي الإعلاميّ'],
 ['agenda setting','ترتيب الأولويّات'],['framing of news','تأطير الخبر'],['echo chamber','غرفة الصدى'],['talking point','نقطة محوريّة مكرّرة'],
 ['sound bite','مقتطف مؤثّر'],['spin','تلوين الخبر'],['damage limitation','تحجيم الضرر'],['public statement','تصريح علنيّ']]},

{u:21, t:'المفاوضةُ والاتّفاق', list:[
 ['opening position','الموقف الافتتاحيّ'],['fallback position','الموقف البديل'],['walk-away point','نقطة الانسحاب'],['bargaining chip','ورقة تفاوضيّة'],
 ['concession','تنازل'],['sticking point','نقطة عالقة'],['middle ground','حلّ وسط'],['memorandum of understanding','مذكّرة تفاهم'],['binding clause','بند مُلزِم'],
 ['escape clause','بند الخروج'],['sunset clause','بند الانقضاء'],['good faith','حسن النيّة'],['bad faith','سوء النيّة'],
 ['stalemate','طريق مسدود'],['third party','طرف ثالث'],
 ['ratify an agreement','يُصدّق اتّفاقاً'],['withdraw from a deal','ينسحب من اتّفاق'],['renegotiate','يُعيد التفاوض'],['compromise text','نصّ توفيقيّ']]},

{u:22, t:'الذاكرةُ والتعلّم', list:[
 ['working memory','الذاكرة العاملة'],['long-term retention','احتفاظ بعيد المدى'],['retrieval practice','التدرّب بالاسترجاع'],['spaced repetition','التكرار المتباعد'],
 ['interleaving','التشبيك بين الموضوعات'],['elaboration','الإفاضة التفسيريّة'],['dual coding','الترميز المزدوج'],['cognitive load','الحمل المعرفيّ'],['chunking','التجميع في كتل'],['schema building','بناء المخطّطات'],['prior knowledge','المعرفة السابقة'],
 ['near transfer','انتقال قريب'],['far transfer','انتقال بعيد'],['overlearning','إفراط في الإتقان'],
 ['illusion of competence','وهم الإتقان'],['fluency illusion','وهم الطلاقة'],
 ['corrective feedback','تغذية راجعة تصحيحيّة'],['deliberate practice','ممارسة مقصودة'],['plateau effect','أثر الهضبة'],
 ['motivation to learn','دافعيّة التعلّم'],['self-efficacy','الكفاءة الذاتيّة']]},

{u:20, t:'الهندسةُ والبناء', list:[
 ['structural integrity','سلامة إنشائيّة'],['foundation works','أعمال الأساسات'],['reinforcement','تسليح'],
 ['compressive strength','مقاومة الضغط'],['span of a beam','بحر الكمرة'],['specification sheet','ورقة المواصفات'],['bill of quantities','جدول الكمّيّات'],['snagging list','قائمة الملاحظات'],['site survey','مسح الموقع'],
 ['soil test','فحص التربة'],['subsidence','هبوط أرضيّ'],['damp proofing','عزل رطوبة'],['thermal bridge','جسر حراريّ'],
 ['insulation value','قيمة العزل'],['ventilation rate','معدّل التهوية'],['acoustic insulation','عزل صوتيّ'],['prefabrication','تصنيع مسبق'],
 ['modular build','بناء وحداتيّ'],['on-site assembly','تجميع بالموقع'],['commissioning','تشغيل تجريبيّ'],['handover','تسليم'],
 ['defects liability','مسؤوليّة العيوب'],['maintenance schedule','جدول صيانة'],['life-cycle cost','كلفة دورة الحياة'],['scaffolding','سقالة']]},

{u:21, t:'الطاقةُ والمناخ', list:[
 ['baseload','الحمل الأساس'],['peak demand','الذروة الطلبيّة'],['intermittency','تقطّع التوليد'],
 ['capacity factor','معامل السعة'],['smart metering','عدّ ذكيّ'],['carbon intensity','كثافة كربونيّة'],
 ['emissions trading','تداول الانبعاثات'],['carbon pricing','تسعير الكربون'],['offset scheme','نظام التعويض'],['net zero','صافي صفر'],
 ['decarbonisation','إزالة الكربون'],['transition pathway','مسار التحوّل'],['stranded asset','أصل عالق'],['feed-in tariff','تعريفة التغذية'],
 ['levelised cost','الكلفة المستوية'],['payback period','مدّة الاسترداد'],['adaptation measure','تدبير تكيّف'],['mitigation measure','تدبير تخفيف'],
 ['climate resilience','صمود مناخيّ'],['sea-level rise','ارتفاع مستوى البحر'],['heat island','جزيرة حراريّة'],['extreme event','حدث متطرّف'],
 ['tipping point','نقطة انقلاب'],['renewable share','حصّة المتجدّدات'],['energy mix','مزيج الطاقة'],['fuel poverty','فقر الطاقة']]},

{u:22, t:'المالُ والأسواق', list:[
 ['leverage','رافعة ماليّة'],['collateral','ضمانة'],
 ['yield','عائد'],['spread','فارق السعر'],['hedge','تحوّط'],['bull market','سوق صاعدة'],['bear market','سوق هابطة'],['correction in markets','تصحيح سوقيّ'],['bubble','فقاعة'],
 ['book value','القيمة الدفتريّة'],['market capitalisation','القيمة السوقيّة'],['free float','الأسهم الحرّة'],
 ['dividend policy','سياسة التوزيعات'],['retained earnings','أرباح محتجزة'],['cash burn','استنزاف نقديّ'],['runway','مدّة الاحتمال النقديّ'],
 ['due diligence','العناية الواجبة'],['term sheet','ورقة الشروط'],['equity stake','حصّة ملكيّة'],['dilution','تخفيف الحصص'],
 ['monetary tightening','تشديد نقديّ'],['quantitative easing','تيسير كمّيّ'],['policy rate','سعر الفائدة المرجعيّ'],['inflation target','مستهدف التضخّم']]},

{u:20, t:'القانونُ والإجراءات', list:[
 ['statute','تشريع'],['bylaw','لائحة'],['jurisdiction','اختصاص قضائيّ'],
 ['plaintiff','المدّعي'],['defendant','المدّعى عليه'],['counsel','محامٍ مُرافع'],['bench','هيئة القضاء'],
 ['affidavit','إفادة مشفوعة بيمين'],['cross-examination','استجواب مضادّ'],['admissible evidence','دليل مقبول'],['injunction','أمر قضائيّ مانع'],['damages','تعويضات'],
 ['appeal court','محكمة استئناف'],['quash a ruling','ينقض حكماً'],['uphold a ruling','يُثبّت حكماً'],
 ['due process','الإجراءات الواجبة'],['presumption of innocence','قرينة البراءة'],['statute of limitations','مدّة التقادم'],
 ['legal remedy','وسيلة انتصاف'],['breach of contract','إخلال بالعقد'],['binding precedent','سابقة مُلزِمة'],['legal standing','الصفة القانونيّة']]}
,

{u:22, t:'الفلسفةُ والمنطق', list:[
 ['inference','استنتاج'],['deduction','استنباط'],['syllogism','قياس منطقيّ'],['valid argument','حجّة صحيحة الصورة'],['sound argument','حجّة سليمة'],['false dichotomy','ثنائيّة زائفة'],['ad hominem','مهاجمة الشخص'],
 ['slippery slope','المنحدر الزلق'],['appeal to authority','احتكام إلى السلطة'],['counterexample','مثال ناقض'],['thought experiment','تجربة ذهنيّة'],['metaphysics','ما وراء الطبيعة'],['free will','إرادة حرّة'],['scepticism','شكّيّة'],
 ['first principles','المبادئ الأولى'],
 ['axiom','مُسلّمة']]}

];
