/* مفرداتُ B2 في حقولٍ موضوعيّة — على نسق ما قبله.

   وهدفُ المستوى تراكميٌّ (٤٠٠٠ معنًى يشمل ما قبله)، فنصيبُ B2 منه
   نحو خمسَ عشرةَ مئة: خمسُ وحداتٍ × ثلاثِ مئة.

   وحقولُ B2 مجرَّدةٌ وتخصّصيّة: لم تعد أشياءَ وأفعالاً يوميّة، بل
   مفاهيمَ وأحكاماً واصطلاحاتِ مجالات — وهذا ما يفصل المتوسّطَ
   المتقدّمَ عن المتوسّط.

   والترتيب: [الكلمة, معناها]. */

export const WORDS = [

/* ══ الوحدة ١٥ — الأزمنةُ التامّةُ والسردُ المركّب ══ */
{u:15, t:'الزمنُ والتسلسل', list:[
 ['previously','سابقاً'],['subsequently','لاحقاً'],['simultaneously','في آنٍ واحد'],['beforehand','مسبقاً'],
 ['thereafter','بعدئذٍ'],['initially','مبدئيّاً'],['ultimately','في نهاية المطاف'],['momentarily','للحظة'],
 ['duration','مدّة'],['interval','فترة فاصلة'],['sequence','تسلسل'],['chronology','ترتيب زمنيّ'],
 ['overlap','تداخل'],['precede','يسبق'],['follow on','يتبع'],['coincide','يتزامن'],
 ['prolong','يُطيل'],['postpone','يُرجئ'],['anticipate','يستبق'],['elapse','ينقضي'],
 ['ongoing','جارٍ'],['prior to','قبل'],['in the wake of','في أعقاب'],['over the course of','على امتداد'],
 ['by the end of','بحلول نهاية'],['as of','اعتباراً من'],['no sooner','ما إن'],['hardly had','ما كاد']]},

{u:15, t:'الخبرةُ المهنيّة', list:[
 ['expertise','خبرة متخصّصة'],['competence','كفاية'],['proficiency','إتقان'],['credential','وثيقة اعتماد'],
 ['portfolio','ملفّ أعمال'],['track record','سجلّ إنجاز'],['accomplishment','مُنجَز'],['milestone','محطّة'],
 ['mentorship','إرشاد مهنيّ'],['apprenticeship','تدرُّج مهنيّ'],['internship','تدريب عمليّ'],['probation','فترة اختبار'],
 ['appraisal','تقويم أداء'],['benchmark','مرجع قياس'],['best practice','أفضل ممارسة'],['workflow','سير عمل'],
 ['bottleneck','عنق زجاجة'],['turnover','دوران الموظّفين'],['retention','استبقاء'],['morale','روح معنويّة'],
 ['incentive','حافز'],['compensation','تعويض مالي'],['redundancy','تسريح'],['restructure','يُعيد الهيكلة'],
 ['outsource','يُسند خارجيّاً'],['streamline','يُبسّط'],['scale up','يُوسّع'],['wind down','يُقلّص تدريجيّاً']]},

{u:15, t:'التحليلُ والبيانات', list:[
 ['figure','رقم'],['chart','رسم بيانيّ'],['trend','اتّجاه'],['fluctuation','تذبذب'],
 ['peak','ذروة'],['trough','حضيض'],['steady','ثابت'],['sharp rise','ارتفاع حادّ'],
 ['gradual fall','انخفاض تدريجيّ'],['proportion','نسبة'],['ratio','معدّل نسبيّ'],['margin','هامش'],
 ['sample','عيّنة'],['variable','متغيّر'],['correlation','ارتباط'],['bias','تحيّز'],
 ['reliable','موثوق'],['valid','صالح منهجيّاً'],['accurate','دقيق'],['approximate','تقريبيّ'],
 ['underestimate','يُقلّل التقدير'],['overestimate','يُبالغ في التقدير'],['forecast','يتنبّأ'],['project (verb)','يُسقِط مستقبلاً'],
 ['breakdown of','تفصيل'],['in terms of figures','من حيث الأرقام'],['account for','يُفسّر نسبة'],['range from','يتراوح بين']]},

{u:15, t:'الذاكرةُ والسيرة', list:[
 ['recollection','استذكار'],['nostalgia','حنين'],['reminisce','يسترجع ذكرياته'],['trace back','يعود بجذوره'],
 ['formative','مُشكِّل للشخصيّة'],['upbringing','تنشئة'],['background','خلفيّة'],['heritage','موروث'],
 ['legacy','إرث'],['milestone event','حدث فارق'],['setback','نكسة'],['breakthrough','اختراق'],
 ['perseverance','مثابرة'],['resilience','صلابة'],['determination','عزيمة'],['regret','ندم'],['gratitude','امتنان'],['humility','تواضع'],['confidence','ثقة'],
 ['self-aware','مُدرك لذاته'],['reflective','تأمّليّ'],['defining moment','لحظة فاصلة'],['life-changing','مُغيِّر للحياة'],
 ['in hindsight','بأثرٍ رجعيّ'],['looking back','بالنظر إلى الوراء'],['at the time','آنذاك'],['little did I know','لم أكن أدري']]},

{u:15, t:'الوصفُ الدقيقُ للأحداث', list:[
 ['incident','واقعة'],['circumstance','ملابسة'],['context','سياق'],['aftermath','ما بعد الحدث'],
 ['eyewitness','شاهد عيان'],['account of','رواية'],['version','صيغة'],['discrepancy','تضارب'],
 ['allegedly','بزعمهم'],['reportedly','بحسب ما ذُكر'],['evidently','بيّناً'],
 ['unfold','يتكشّف'],['escalate','يتصاعد'],['subside','يهدأ'],['intervene','يتدخّل'],
 ['witness (verb)','يشهد'],['recall details','يسترجع التفاصيل'],['confirm an account','يؤكّد رواية'],['contradict','يناقض'],
 ['chain of events','سلسلة الأحداث'],['prior warning','إنذار سابق'],['immediate cause','السبب المباشر'],['underlying cause','السبب الكامن'],
 ['contributing factor','عامل مساهم'],['turning point','منعطف'],['lasting effect','أثر باقٍ'],['short-lived','قصير الأمد']]},

{u:15, t:'أحكامٌ وتقديرات', list:[
 ['significant','ذو دلالة'],['substantial','جوهريّ'],['considerable','معتبَر'],['marginal','هامشيّ'],
 ['negligible','لا يُذكر'],['crucial','حاسم'],['vital','حيويّ'],['essential','لا غنى عنه'],
 ['desirable','مرغوب'],['inevitable','حتميّ'],['unavoidable','لا مفرّ منه'],['questionable','مشكوك فيه'],
 ['controversial','مثير للجدل'],['debatable','قابل للنقاش'],['plausible','معقول'],['implausible','بعيد الاحتمال'],
 ['consistent with','متّسق مع'],['inconsistent','متناقض'],['comparable','قابل للمقارنة'],['unprecedented','غير مسبوق'],
 ['remarkable','لافت'],['modest','متواضع'],['adequate','كافٍ'],['insufficient','غير كافٍ'],
 ['premature','سابق لأوانه'],['overdue','متأخّر عن أوانه'],['timely','في أوانه'],['far-reaching','بعيد الأثر']]}
,

/* ══ الوحدة ١٦ — الكلامُ المنقولُ والإعلام ══ */
{u:16, t:'النقلُ والشهادة', list:[
 ['assert','يجزم'],['allege','يزعم'],['acknowledge','يُقرّ'],['concede','يُسلّم بـ'],
 ['insist on','يُصرّ على'],['deny firmly','ينفي بشدّة'],['clarify a point','يُجلّي نقطة'],['elaborate','يُسهب'],
 ['paraphrase','يُعيد بصياغته'],['misquote','يسيء الاقتباس'],['distort','يُشوّه'],['exaggerate','يُبالغ'],
 ['understate','يُهوّن'],['imply','يُلمّح'],['hint at','يُشير تلميحاً'],['state explicitly','يُصرّح'],
 ['off the record','خارج التسجيل'],['on condition','بشرط'],['anonymous source','مصدر مجهول'],['official statement','بيان رسميّ'],
 ['press release','بيان صحفيّ'],['briefing','إحاطة'],['transcript','نصّ مفرَّغ'],['quotation','اقتباس'],
 ['attribution','نسبة القول'],['credibility','مصداقيّة'],['verify','يتحقّق'],['corroborate','يُعزّز بدليل']]},

{u:16, t:'الإعلامُ والرأيُ العامّ', list:[
 ['coverage','تغطية'],['bias in media','تحيّز إعلاميّ'],['censorship','رقابة'],['propaganda','دعاية'],
 ['misinformation','معلومات مغلوطة'],['rumour','شائعة'],['fact-check','يتحقّق من الوقائع'],['correction','تصحيح'],
 ['editorial','افتتاحيّة'],['column','عمود رأي'],['commentator','مُعلّق'],['analyst','محلّل'],
 ['outlet','منبر إعلاميّ'],['circulation','توزيع'],['viewership','نسبة المشاهدة'],['ratings','تقييمات'],
 ['sensational','مثير'],['objective','موضوعيّ'],['subjective','ذاتيّ'],['balanced','متوازن'],
 ['one-sided','أحاديّ الجانب'],['in-depth','مُعمَّق'],['breaking news','خبر عاجل'],['exclusive','حصريّ'],
 ['follow-up','متابعة'],['archive','أرشيف'],['publication date','تاريخ النشر'],['retract','يسحب خبراً']]},

{u:16, t:'العلاقاتُ الدوليّة', list:[
 ['diplomacy','دبلوماسيّة'],['treaty','معاهدة'],['alliance','تحالف'],['sanction','عقوبة'],
 ['negotiation','مفاوضة'],['mediation','وساطة'],['summit','قمّة'],['delegation','وفد'],
 ['ambassador','سفير'],['embassy','سفارة'],['sovereignty','سيادة'],['territory','إقليم'],
 ['border dispute','نزاع حدوديّ'],['ceasefire','وقف إطلاق نار'],['humanitarian','إنسانيّ'],['refugee','لاجئ'],
 ['aid','معونة'],['development programme','برنامج تنمية'],['cooperation','تعاون'],['tension','توتّر'],
 ['escalation','تصعيد'],['de-escalation','خفض التصعيد'],['resolution','قرار'],['veto','نقض'],
 ['bilateral','ثنائيّ'],['multilateral','متعدّد الأطراف'],['foreign policy','سياسة خارجيّة'],['national interest','مصلحة وطنيّة']]},

/* ══ الوحدة ١٧ — الشرطُ الثالثُ والندم ══ */
{u:17, t:'الندمُ والاختيار', list:[
 ['hindsight','إدراكٌ متأخّر'],['missed chance','فرصة ضائعة'],['second thoughts','تردّد لاحق'],['what if','ماذا لو'],
 ['alternative','بديل'],['trade-off','مقايضة'],['compromise','تسوية'],['sacrifice','تضحية'],
 ['prioritise','يُقدّم أولويّة'],['weigh up','يُوازن'],['think twice','يتروّى'],['rush into','يتسرّع في'],
 ['hold back','يتريّث'],['take a risk','يُخاطر'],['play it safe','يحتاط'],['gamble','يُقامر'],
 ['back out','ينسحب'],['stick with','يُلازم'],['change course','يُغيّر مساره'],['stand by','يثبت على'],
 ['worth the effort','يستحقّ الجهد'],['counterproductive','عكسيّ الأثر'],['ill-advised','غير سديد'],['well-judged','مُحكَم التقدير'],
 ['foresee','يستشرف'],['overlook','يغفل عن'],['underrate','يبخس'],['bear in mind','يأخذ في الحسبان']]},

{u:17, t:'المشاعرُ المركّبةُ والأحكام', list:[
 ['remorse','ندم عميق'],['resentment','امتعاض'],['frustration','إحباط'],['satisfaction','رضا'],
 ['relief at','ارتياح لـ'],['apprehension','تحسُّب قلق'],['indifference','لا مبالاة'],['enthusiasm','حماسة'],
 ['reluctance','إحجام'],['willingness','استعداد'],['determination to','تصميم على'],['hesitation','تردّد'],
 ['empathy','تفهّم وجدانيّ'],['compassion','رحمة'],['tolerance','تسامح'],['prejudice','حُكم مسبق'],
 ['assume wrongly','يفترض خطأً'],['jump to conclusions','يتسرّع في الحكم'],['give benefit of doubt','يُحسن الظنّ'],['hold a grudge','يحمل ضغينة'],
 ['let go','يتجاوز'],['come to terms with','يتصالح مع'],['make peace with','يُسالم'],['move past','يتخطّى'],
 ['take responsibility','يتحمّل المسؤوليّة'],['shift blame','يُحمّل غيره'],['own a mistake','يُقرّ بخطئه'],['learn a lesson','يتّعظ']]},

{u:17, t:'الفلسفةُ والتفكير', list:[
 ['concept','مفهوم'],['assumption','مُسلَّمة'],['premise','مقدّمة منطقيّة'],
 ['hypothesis','فرضيّة'],['logic','منطق'],['contradiction','تناقض'],['paradox','مفارقة'],
 ['abstract idea','فكرة مجرّدة'],['concrete example','مثال ملموس'],['generalise','يُعمّم'],['oversimplify','يُفرط في التبسيط'],
 ['distinguish','يُميّز'],['categorise','يُصنّف'],['interpret meaning','يُؤوّل'],['question an idea','يُساءل'],
 ['reasoning','استدلال'],['justification','تسويغ'],['rationale','مسوّغ'],['implication','لازم'],
 ['perspective','منظور'],['worldview','رؤية للعالم'],['value judgement','حكم قيميّ'],['objectivity','موضوعيّة'],
 ['subjectivity','ذاتيّة'],['relative','نسبيّ'],['absolute','مطلق'],['universal','كلّيّ']]},

/* ══ الوحدة ١٨ — المصدرُ والـ ing ══ */
{u:18, t:'الأفعالُ وتراكيبُها', list:[
 ['manage to','يتمكّن من'],['afford to','يسعه أن'],['happen to do','يصادف أن يفعل'],['pretend to','يتظاهر بـ'],
 ['claim to','يدّعي أنّه'],['seem to','يبدو أنّه'],['fail to','يُخفق في'],['hesitate to','يتردّد في'],
 ['avoid doing','يتفادى'],['consider doing','ينظر في'],['postpone doing','يُؤجّل'],['risk doing','يُجازف بـ'],
 ['keep doing','يظلّ يفعل'],['give up doing','يكفّ عن'],['end up doing','ينتهي به الأمر'],['feel like doing','يميل إلى'],
 ['be used to doing','اعتاد'],['look forward to doing','يتطلّع إلى'],['object to doing','يعترض على'],['succeed in doing','ينجح في'],
 ['insist on doing','يُصرّ على'],['accuse of doing','يتّهم بـ'],['blame for doing','يلوم على'],['prevent from doing','يمنع من'],
 ['remember to','يتذكّر أن يفعل'],['remember doing','يتذكّر أنّه فعل'],['stop to','يتوقّف ليفعل'],['stop doing','يكفّ عن الفعل']]},

{u:18, t:'الدراسةُ والبحث', list:[
 ['methodology','منهجيّة'],['literature review','مراجعة الأدبيّات'],['framework','إطار'],['paradigm','نموذج إرشاديّ'],
 ['qualitative','كيفيّ'],['quantitative','كمّيّ'],['empirical','تجريبيّ'],['theoretical basis','أساس نظريّ'],
 ['field work','عمل ميدانيّ'],['questionnaire','استبانة'],['respondent','مستجيب'],['case study','دراسة حالة'],
 ['finding','نتيجة بحثيّة'],['limitation','قَيد'],['scope','نطاق'],['significance','دلالة'],
 ['peer review','تحكيم الأقران'],['journal','دوريّة'],['abstract','مستخلص'],['bibliography','ثبت المراجع'],
 ['footnote','حاشية'],['appendix','ملحق'],['thesis','أطروحة'],['dissertation','رسالة علميّة'],
 ['supervise research','يُشرف على بحث'],['defend a thesis','يُناقش أطروحة'],['publish findings','ينشر نتائج'],['replicate','يُكرّر التجربة']]},

{u:18, t:'التقنيةُ والمستقبل', list:[
 ['innovation','ابتكار'],['automation','أتمتة'],['artificial intelligence','ذكاء اصطناعيّ'],['algorithm','خوارزميّة'],
 ['robotics','روبوتيّات'],['simulation','محاكاة'],['prototype','نموذج أوّليّ'],['breakthrough tech','تقنية فارقة'],
 ['cybersecurity','أمن سيبرانيّ'],['data protection','حماية البيانات'],['surveillance','مراقبة'],['anonymity','إغفال الهويّة'],
 ['digital divide','فجوة رقميّة'],['accessibility','إتاحة'],['user interface','واجهة المستخدم'],['usability','قابليّة الاستعمال'],
 ['obsolete','مُتقادم'],['cutting edge','طليعيّ'],['scalable','قابل للتوسّع'],['sustainable tech','تقنية مستدامة'],
 ['disrupt','يُحدث قطيعة'],['adapt to','يتكيّف مع'],['adopt a system','يتبنّى نظاماً'],['phase out','يُلغي تدريجيّاً'],
 ['rely heavily on','يعتمد اعتماداً كبيراً'],['raise concerns','يُثير مخاوف'],['pose a threat','يُشكّل تهديداً'],['offer potential','ينطوي على إمكان']]},

/* ══ الوحدة ١٩ — الحِجاجُ والأسلوب ══ */
{u:19, t:'بناءُ الحجّة', list:[
 ['thesis statement','عبارة الأطروحة'],['topic sentence','جملة الموضوع'],['supporting detail','تفصيل داعم'],['counterargument','حجّة مضادّة'],
 ['rebuttal','ردّ'],['concession','تسليم جزئيّ'],['qualification','تقييد'],['generalisation','تعميم'],
 ['evidence-based','قائم على الدليل'],['anecdotal','قائم على حكايات'],['statistically','إحصائيّاً'],['arguably','يمكن القول'],
 ['undeniably','لا يُنكَر'],['admittedly','لا ننكر أنّ'],['granted','مُسلَّمٌ به'],['on the contrary','بل على العكس'],
 ['by contrast','وفي المقابل'],['likewise','وكذلك'],['correspondingly','وبالمقابل'],['conversely','وعلى العكس'],
 ['to illustrate','للتوضيح'],['for instance','على سبيل المثال'],['in essence','في الجوهر'],['in short','باختصار'],
 ['to sum up','وخلاصةً'],['in conclusion','وختاماً'],['overall','إجمالاً']]},

{u:19, t:'الأسلوبُ والدقّة', list:[
 ['concise','موجز'],['verbose','مُسهِب'],['redundant','زائد'],['ambiguous','ملتبس'],
 ['explicit','صريح'],['implicit','ضمنيّ'],['coherent','متماسك'],['cohesive','مترابط'],
 ['fluent','سَلِس'],['awkward','متعثّر'],['formal register','سجلّ رسميّ'],['colloquial','عامّيّ'],
 ['tone','نبرة'],['nuance','فارق دقيق'],['connotation','إيحاء'],['denotation','دلالة حرفيّة'],
 ['emphasis on','تشديد على'],['understatement','تهوين بلاغيّ'],['overstatement','تهويل'],['irony','سخرية'],
 ['rhetorical question','سؤال بلاغيّ'],['metaphor','استعارة'],['analogy','قياس تمثيليّ'],['repetition','تكرار'],
 ['parallel structure','تواز تركيبيّ'],['transition','انتقال'],['flow','انسياب'],['draft','مسوّدة']]},

{u:19, t:'المجتمعُ والقضايا', list:[
 ['inequality','لامساواة'],['discrimination','تمييز'],['integration','اندماج'],['segregation','فصل'],
 ['urbanisation','تحضُّر'],['migration','هجرة'],['demographic','ديموغرافيّ'],['ageing population','شيخوخة السكّان'],
 ['welfare','رعاية اجتماعيّة'],['social mobility','حراك اجتماعيّ'],['class divide','انقسام طبقيّ'],['marginalised','مُهمَّش'],
 ['empowerment','تمكين'],['advocacy','مناصرة'],['grassroots','قاعديّ'],['stakeholder','صاحب مصلحة'],
 ['accountability','مساءلة'],['transparency','شفافيّة'],['corruption','فساد'],['bureaucracy','بيروقراطيّة'],
 ['legislation','تشريع'],['enforcement','إنفاذ'],['compliance','امتثال'],['incentivise','يُحفّز'],
 ['subsidy','دعم ماليّ'],['taxation','فرض الضرائب'],['public spending','إنفاق عامّ'],['austerity','تقشّف']]},

{u:19, t:'البيئةُ والاستدامة', list:[
 ['sustainability','استدامة'],['renewable','متجدّد'],['emission','انبعاث'],['carbon footprint','بصمة كربونيّة'],
 ['greenhouse gas','غاز دفيئة'],['global warming','احترار عالميّ'],['deforestation','إزالة الغابات'],['biodiversity','تنوّع حيويّ'],
 ['ecosystem','نظام بيئيّ'],['habitat','موئل'],['endangered','مهدَّد بالانقراض'],['conservation','صون'],
 ['landfill','مكبّ'],['single-use','أحاديّ الاستعمال'],['biodegradable','قابل للتحلّل'],['offset','يُعوّض'],
 ['efficiency measure','إجراء ترشيد'],['green energy','طاقة نظيفة'],['solar panel','لوح شمسيّ'],['wind farm','مزرعة رياح'],
 ['water scarcity','شحّ المياه'],['drought','جفاف'],['flooding','فيضان'],['erosion','تعرية'],
 ['mitigate','يُخفّف'],['adapt measures','يُكيّف إجراءات'],['phase out plastic','يُلغي البلاستيك تدريجيّاً'],['raise standards','يرفع المعايير']]}
,

{u:15, t:'الصحّةُ والطبّ', list:[
 ['diagnosis','تشخيص'],['prognosis','مآل'],['chronic','مزمن'],['acute','حادّ'],
 ['symptom onset','بدء الأعراض'],['immune system','جهاز مناعيّ'],['antibiotic','مضادّ حيويّ'],['painkiller','مسكّن'],
 ['anaesthetic','مخدّر'],['therapy','علاج تأهيليّ'],['rehabilitation','إعادة تأهيل'],['side-effect risk','خطر الآثار'],
 ['dosage','جرعة محدّدة'],['overdose','جرعة مفرطة'],['immunity','مناعة'],['outbreak','تفشٍّ'],
 ['epidemic','وباء'],['pandemic','جائحة'],['quarantine','حجر صحّيّ'],['contagious','مُعدٍ'],
 ['screening','فحص استباقيّ'],['transplant','زرع عضو'],['donor','متبرّع'],['intensive care','عناية مركّزة'],
 ['life expectancy','متوسّط العمر'],['mortality','وفيّات'],['well-being','عافية'],['mental health','صحّة نفسيّة'],
 ['disorder','اضطراب'],['anxiety disorder','اضطراب قلق'],['counselling','إرشاد نفسيّ'],['coping strategy','استراتيجيّة تكيّف']]},

{u:15, t:'العمارةُ والمدن', list:[
 ['infrastructure','بنية تحتيّة'],['zoning','تقسيم مناطقيّ'],['density','كثافة'],['sprawl','تمدّد عشوائيّ'],
 ['regeneration','تجديد حضريّ'],['renovation','ترميم'],['demolition','هدم'],['heritage site','موقع تراثيّ'],
 ['skyline','أفق المدينة'],['landmark','معلَم'],['facade','واجهة'],['foundation','أساس'],
 ['load-bearing','حامل للأحمال'],['insulation','عزل'],['ventilation','تهوية'],['drainage','صرف'],
 ['pedestrian zone','منطقة مشاة'],['cycle lane','مسار درّاجات'],['green space','مساحة خضراء'],['public realm','الحيّز العامّ'],
 ['affordable housing','إسكان ميسور'],['social housing','إسكان اجتماعيّ'],['tenancy','حيازة إيجاريّة'],['planning permission','رخصة بناء'],
 ['surveyor','مساح'],['contractor','مقاول'],['blueprint','مخطّط'],['site plan','مخطّط موقع']]},

{u:16, t:'القانونُ والتعاقد', list:[
 ['clause','بند'],['provision','نصّ تنظيميّ'],['liability','مسؤوليّة قانونيّة'],['indemnity','تعويض تعاقديّ'],
 ['breach','إخلال'],['termination','إنهاء'],['renewal','تجديد'],['amendment','تعديل'],
 ['jurisdiction','ولاية قضائيّة'],['arbitration','تحكيم'],['settlement','تسوية'],['precedent','سابقة قضائيّة'],
 ['testimony','شهادة'],['affidavit','إفادة خطّيّة'],['plaintiff','مدّعٍ'],['defendant','مدّعى عليه'],
 ['prosecution','نيابة'],['defence counsel','هيئة الدفاع'],['verdict','قرار الهيئة'],['acquittal','براءة'],
 ['conviction','إدانة'],['probation','وقف تنفيذ'],['custody','حبس احتياطيّ'],['parole','إفراج مشروط'],
 ['intellectual property','ملكيّة فكريّة'],['copyright','حقّ نشر'],['patent','براءة اختراع'],['trademark','علامة تجاريّة'],
 ['confidentiality','سرّيّة'],['non-disclosure','عدم إفشاء'],['due diligence','عناية واجبة'],['compliance officer','مسؤول امتثال']]},

{u:16, t:'الماليّةُ والأعمال', list:[
 ['revenue','إيراد'],['expenditure','إنفاق'],['turnover rate','معدّل دوران'],['liquidity','سيولة'],
 ['asset','أصل'],['liability (finance)','التزام ماليّ'],['equity','حقوق ملكيّة'],['dividend','توزيعات أرباح'],
 ['shareholder','مساهم'],['merger','اندماج'],['acquisition','استحواذ'],['valuation','تقييم'],
 ['forecasting','تنبّؤ ماليّ'],['cash flow','تدفّق نقديّ'],['overhead','نفقات عامّة'],['break-even','نقطة التعادل'],
 ['audit','تدقيق'],['balance sheet','ميزانيّة عموميّة'],['fiscal year','سنة ماليّة'],['quarter','ربع سنويّ'],
 ['stakeholder value','قيمة لأصحاب المصلحة'],['market share','حصّة سوقيّة'],['niche','سوق متخصّصة'],['monopoly','احتكار'],
 ['supply shortage','نقص توريد'],['logistics','لوجستيّات'],['procurement','مشتريات'],['tender','مناقصة'],
 ['contractor bid','عطاء'],['penalty clause','شرط جزائيّ'],['warranty period','مدّة الضمان'],['after-sales','ما بعد البيع']]},

{u:17, t:'التعليمُ والتقويم', list:[
 ['assessment','تقويم'],['criterion','معيار'],['rubric','سُلَّم تقدير'],['weighting','ترجيح نسبيّ'],
 ['formative','تكوينيّ'],['summative','ختاميّ'],['benchmarking','قياس مرجعيّ'],['attainment','تحصيل'],
 ['curriculum design','تصميم منهج'],['learning outcome','ناتج تعلّم'],['competency','جدارة'],['differentiation','تمايز تعليميّ'],
 ['scaffolding','دعم متدرّج'],['remedial','علاجيّ'],['enrichment','إثرائيّ'],['inclusive','دامج'],
 ['dropout rate','نسبة التسرّب'],['retention rate','نسبة البقاء'],['literacy','معرفة القراءة والكتابة'],['numeracy','معرفة حسابيّة'],
 ['vocational','مهنيّ'],['academic track','مسار أكاديميّ'],['accreditation','اعتماد'],['transcript (academic)','كشف درجات'],
 ['plagiarism check','فحص انتحال'],['invigilate','يُراقب امتحاناً'],['moderation','ضبط تقدير'],['appeal a grade','يتظلّم من درجة']]},

{u:17, t:'الزراعةُ والغذاء', list:[
 ['agriculture','زراعة'],['crop rotation','دورة زراعيّة'],['irrigation','ريّ'],['fertiliser','سماد'],
 ['pesticide','مبيد'],['harvest yield','غلّة'],['soil quality','جودة التربة'],['arable','صالح للزراعة'],
 ['livestock','ماشية'],['dairy','ألبان'],['poultry','دواجن'],['grain','حبوب'],
 ['food security','أمن غذائيّ'],['supply shortage of food','نقص غذائيّ'],['import dependency','اعتماد على الاستيراد'],['self-sufficiency','اكتفاء ذاتيّ'],
 ['organic','عضويّ'],['processed food','غذاء مصنَّع'],['preservative','مادّة حافظة'],['additive','مضاف'],
 ['nutrition','تغذية'],['protein','بروتين'],['carbohydrate','نشويّات'],['malnutrition','سوء تغذية'],
 ['famine','مجاعة'],['subsistence farming','زراعة كفاف'],['smallholder','صغير الملكيّة'],['cooperative','تعاونيّة']]},

{u:18, t:'الهندسةُ والطاقة', list:[
 ['circuit','دارة'],['voltage','جهد'],['current','تيّار'],['resistance','مقاومة'],
 ['conductor','ناقل'],['insulator','عازل'],['generator','مولّد'],['turbine','توربين'],
 ['grid','شبكة كهرباء'],['capacity','سعة'],['output','خَرج'],['input','دَخل'],
 ['efficiency rate','نسبة كفاءة'],['consumption','استهلاك'],['storage battery','بطّاريّة تخزين'],['transmission','نقل'],
 ['pipeline','خطّ أنابيب'],['refinery','مصفاة'],['reservoir','خزّان'],['dam','سدّ'],
 ['hydroelectric','كهرومائيّ'],['nuclear','نوويّ'],['fossil fuel','وقود أحفوريّ'],['alternative energy','طاقة بديلة'],
 ['maintenance','صيانة'],['overhaul','إصلاح شامل'],['malfunction','خلل'],['safety protocol','بروتوكول سلامة'],
 ['tolerance (eng)','سماحيّة'],['calibrate','يُعاير'],['specification','مواصفة'],['durability','متانة']]},

{u:18, t:'النقلُ واللوجستيّات', list:[
 ['freight','شحن'],['cargo','حمولة'],['container','حاوية'],['port authority','سلطة الميناء'],
 ['customs clearance','تخليص جمركيّ'],['tariff','تعريفة'],['quota','حصّة'],['embargo','حظر'],
 ['shipping route','خطّ ملاحيّ'],['transit time','زمن العبور'],['lead time','مهلة التنفيذ'],['warehouse','مستودع'],
 ['inventory','مخزون'],['stock level','مستوى المخزون'],['distribution centre','مركز توزيع'],['last mile','الميل الأخير'],
 ['fleet','أسطول'],['haulage','نقل برّيّ'],['rail freight','شحن بالسكك'],['air cargo','شحن جوّيّ'],
 ['bill of lading','بوليصة شحن'],['consignment','إرساليّة'],['dispatch','يُرسل'],['track a shipment','يتتبّع شحنة'],
 ['delay penalty','غرامة تأخير'],['insurance claim','مطالبة تأمين'],['damage report','تقرير تلف'],['route optimisation','تحسين المسار']]},

{u:19, t:'الثقافةُ والفنون', list:[
 ['aesthetic','جماليّ'],['composition (art)','تكوين'],['perspective (art)','منظور'],['contemporary','معاصر'],
 ['classical','كلاسيكيّ'],['avant-garde','طليعيّ'],['genre','نوع أدبيّ'],['narrative','سرد'],
 ['protagonist','بطل'],['antagonist','خصم'],['symbolism','رمزيّة'],['imagery','تصوير فنّيّ'],
 ['critique','نقد'],['review (art)','مراجعة نقديّة'],['acclaim','استحسان نقديّ'],['box office','شبّاك التذاكر'],
 ['adaptation','اقتباس'],['screenplay','سيناريو'],['soundtrack','موسيقى تصويريّة'],['cinematography','تصوير سينمائيّ'],
 ['curator','أمين معرض'],['patron','راعٍ'],['commission a work','يُكلّف بعمل'],['exhibit','يَعرض'],
 ['authenticity','أصالة'],['forgery','تزوير'],['provenance','مصدر العمل'],['appraise','يُثمّن']]},

{u:19, t:'التواصلُ والخطابة', list:[
 ['audience awareness','وعي بالجمهور'],['delivery','إلقاء'],['pacing','إيقاع'],['intonation','تنغيم'],
 ['eye contact','تواصل بصريّ'],['body language','لغة جسد'],['gesture','إيماءة'],['pause for effect','وقفة مؤثّرة'],
 ['opening remark','استهلال'],['closing statement','خاتمة'],['key message','رسالة محوريّة'],['takeaway','خلاصة عمليّة'],
 ['visual aid','وسيلة إيضاح'],['handout','نشرة'],['slide deck','شرائح عرض'],['Q and A','أسئلة وأجوبة'],
 ['moderate a panel','يُدير حلقة'],['chair a meeting','يرأس اجتماعاً'],['take the floor','يأخذ الكلمة'],['yield the floor','يُفسح المجال'],
 ['interrupt politely','يقاطع بأدب'],['build on a point','يبني على نقطة'],['seek clarification','يستوضح'],['summarise views','يُلخّص الآراء'],
 ['reach consensus','يبلغ توافقاً'],['table a proposal','يطرح مقترحاً'],['second a motion','يؤيّد اقتراحاً'],['adjourn','يرفع الجلسة']]},

{u:16, t:'الرياضةُ والمنافسة', list:[
 ['tournament','بطولة'],['league','دوري'],['fixture','مباراة مجدولة'],['qualifier','تصفية'],
 ['knockout','خروج المغلوب'],['semi-final','نصف نهائي'],['runner-up','وصيف'],['underdog','الطرف الأضعف'],
 ['squad','تشكيلة'],['substitute','بديل'],['tactics','تكتيك'],['formation','تشكيل'],
 ['possession','استحواذ'],['penalty','ركلة جزاء'],['foul','مخالفة'],['offside','تسلّل'],
 ['injury time','وقت بدل الضائع'],['sportsmanship','روح رياضيّة'],['doping','تنشيط محظور'],['disqualify','يستبعد'],
 ['record holder','حامل الرقم'],['personal best','أفضل إنجاز شخصيّ'],['endurance','تحمّل'],['stamina','جَلَد'],
 ['warm-up','إحماء'],['cool-down','تهدئة'],['sponsorship','رعاية'],['spectator','متفرّج']]}
,

{u:15, t:'أفعالٌ مجرّدةٌ شائعة', list:[
 ['account for','يُعلّل'],['amount to','يبلغ'],['arise from','ينشأ من'],['attribute to','يعزو إلى'],
 ['bring about','يُحدث'],['call for','يستدعي'],['carry out','يُنفّذ'],['come down to','يتلخّص في'],
 ['constitute','يُشكّل'],['derive from','يُشتقّ من'],['draw on','يستند إلى'],['entail','يستلزم'],
 ['give rise to','يُفضي إلى'],['hinge on','يتوقّف على'],['lend itself to','يصلح لـ'],['pave the way','يُمهّد'],
 ['pertain to','يتعلّق بـ'],['rest on','يقوم على'],['set out','يَعرض · ينطلق'],['stem from','ينبع من'],
 ['undergo','يخضع لـ'],['undertake','يتعهّد بـ'],['warrant','يستوجب'],['yield results','يُثمر'],
 ['bear in mind that','يُراعي أنّ'],['take into account','يأخذ بالحسبان'],['put forward','يطرح'],['rule out','يستبعد'],
 ['single out','يخصّ بالذكر'],['sum up','يُجمل'],['touch on','يتطرّق إلى'],['zero in on','يُركّز على']]},

{u:16, t:'صفاتٌ تقويميّة', list:[
 ['compelling','آسر مقنع'],['persuasive','مُقنع'],['questionable claim','دعوى مشكوك فيها'],['sound (argument)','سليم'],
 ['flawed','مَعيب'],['coherent case','حجّة متماسكة'],['superficial','سطحيّ'],['thorough','مستفيض'],
 ['rigorous','صارم منهجيّاً'],['anecdotal evidence','دليل حكائيّ'],['robust','متين'],['fragile','هشّ'],
 ['far-fetched','متكلَّف'],['self-evident','بديهيّ'],['counterintuitive','مخالف للحدس'],['consistent','مطّرد'],
 ['selective','انتقائيّ'],['representative','ممثّل'],['comprehensive','شامل'],['narrow in scope','ضيّق النطاق'],
 ['up to date','محدَّث'],['outdated','متقادم'],['well-documented','موثَّق جيّداً'],['unsubstantiated','بلا سند'],
 ['transparent','شفّاف'],['opaque','غامض'],['impartial','محايد'],['partisan','متحيّز']]},

{u:17, t:'العملُ والمهنُ المتخصّصة', list:[
 ['consultant','استشاريّ'],['analyst role','دور تحليليّ'],['practitioner','ممارس'],['specialist field','مجال تخصّص'],
 ['freelancer','مستقلّ'],['contractor role','متعاقد'],['stakeholder group','جماعة مصلحة'],['board member','عضو مجلس'],
 ['executive','تنفيذيّ'],['administrator','إداريّ'],['coordinator','منسّق'],['facilitator','مُيسّر'],
 ['appraiser','مُقيّم'],['auditor','مدقّق'],['inspector','مفتّش'],['technician','فنّيّ'],
 ['researcher','باحث'],['editor','محرّر'],['translator','مترجم'],['interpreter role','مترجم فوريّ'],
 ['curriculum developer','مطوّر مناهج'],['data analyst','محلّل بيانات'],['project manager','مدير مشروع'],['quality controller','مراقب جودة'],
 ['job description','وصف وظيفيّ'],['person specification','مواصفات المتقدّم'],['shortlist','قائمة مختصرة'],['vacancy','شاغر']]},

{u:17, t:'السلوكُ والأخلاقُ المهنيّة', list:[
 ['integrity','نزاهة'],['professionalism','مهنيّة'],['discretion','تكتّم'],['impartiality','حياد'],
 ['conflict of interest','تضارب مصالح'],['code of conduct','مدوّنة سلوك'],['whistleblower','مُبلّغ عن مخالفة'],['misconduct','سوء سلوك'],
 ['negligence','إهمال'],['diligence','مثابرة'],['punctuality','التزام بالمواعيد'],['reliability','يُعتمد عليه'],
 ['initiative','مبادرة'],['adaptability','قابليّة التكيّف'],['teamwork skill','مهارة العمل الجماعيّ'],['leadership','قيادة'],
 ['delegation','تفويض'],['micromanage','يُدير بتفصيل مُفرط'],['constructive criticism','نقد بنّاء'],['defensive','متحفّز للدفاع'],
 ['receptive','متقبّل'],['assertive','حازم'],['passive','سلبيّ'],['aggressive tone','نبرة عدوانيّة'],
 ['mutual respect','احترام متبادل'],['common ground','أرضيّة مشتركة'],['working relationship','علاقة عمل'],['rapport','ألفة']]},

{u:18, t:'الصيغُ الاصطلاحيّةُ الشائعة', list:[
 ['in light of','في ضوء'],['with a view to','بغية'],['in the event of','في حال'],['subject to','رهناً بـ'],
 ['regardless of','بصرف النظر عن'],['irrespective of','دون اعتبار لـ'],['owing to','بسبب'],['on account of','نظراً لـ'],
 ['by means of','بواسطة'],['in accordance with','وفقاً لـ'],['in line with','انسجاماً مع'],['contrary to','خلافاً لـ'],
 ['as opposed to','خلافاً لِـ'],['in relation to','فيما يتّصل بـ'],['with respect to','بخصوص'],['in response to','استجابةً لـ'],
 ['for the sake of','من أجل'],['at the expense of','على حساب'],['in favour of','لصالح'],['at odds with','متعارض مع'],
 ['in the long term','على المدى البعيد'],['in the short term','على المدى القريب'],['to a large extent','إلى حدٍّ كبير'],['to a lesser degree','بدرجة أقلّ'],
 ['more often than not','في الأعمّ الأغلب'],['by and large','على وجه العموم'],['all things considered','بالنظر إلى كلّ شيء'],['in any case','على كلّ حال']]},

{u:18, t:'العلومُ الطبيعيّة', list:[
 ['molecule','جزيء'],['atom','ذرّة'],['element (chem)','عنصر'],['compound','مركّب'],
 ['reaction','تفاعل'],['catalyst','حفّاز'],['solution (chem)','محلول'],['density (phys)','كثافة'],
 ['gravity','جاذبيّة'],['friction','احتكاك'],['velocity','سرعة متّجهة'],['acceleration','تسارع'],
 ['mass','كتلة'],['volume','حجم'],['temperature scale','مقياس حرارة'],['cell','خليّة'],['organism','كائن حيّ'],['gene','جين'],['evolution','تطوّر'],
 ['adaptation (bio)','تكيّف'],['photosynthesis','تمثيل ضوئيّ'],['respiration','تنفّس خلويّ'],['bacteria','بكتيريا'],
 ['orbit','مدار'],['galaxy','مجرّة'],['telescope','مقراب'],['satellite','قمر صناعيّ'],
 ['observation','ملاحظة'],['measurement','قياس'],['control group','مجموعة ضابطة'],['variable factor','عامل متغيّر']]},

{u:19, t:'الكتابةُ الأكاديميّةُ والمهنيّة', list:[
 ['executive summary','ملخّص تنفيذيّ'],['terms of reference','الإطار المرجعيّ'],['recommendation','توصية'],['action point','بند إجرائيّ'],
 ['appendix item','بند ملحق'],['annotation','تعليق توضيحيّ'],['citation style','نمط التوثيق'],['reference list','قائمة مراجع'],
 ['proofreading','تدقيق لغويّ'],['copy editing','تحرير نصّيّ'],['layout','تنسيق الصفحة'],['heading level','مستوى العنوان'],
 ['bullet point','نقطة تعداد'],['numbered list','قائمة مرقّمة'],['caption','تعليق صورة'],['cross-reference','إحالة مرجعيّة'],
 ['word limit','حدّ الكلمات'],['submission portal','بوّابة التقديم'],['version control','ضبط الإصدارات'],['final draft','المسوّدة النهائيّة'],
 ['peer feedback','ملحوظات الأقران'],['revision cycle','دورة تنقيح'],['style guide','دليل أسلوب'],['house style','أسلوب المؤسّسة'],
 ['tone of voice','نبرة الخطاب'],['target reader','القارئ المستهدف'],['call to action','دعوة إلى الفعل'],['key finding','نتيجة رئيسة']]},

{u:19, t:'الاقتصادُ الكلّيّ', list:[
 ['gross domestic product','الناتج المحلّيّ'],['per capita','للفرد'],['purchasing power','قوّة شرائيّة'],['cost of living','كلفة المعيشة'],
 ['wage growth','نموّ الأجور'],['labour market','سوق العمل'],['productivity','إنتاجيّة'],['output gap','فجوة الناتج'],
 ['monetary policy','سياسة نقديّة'],['fiscal policy','سياسة ماليّة'],['interest rate','سعر الفائدة'],['exchange rate','سعر الصرف'],
 ['devaluation','خفض قيمة العملة'],['trade deficit','عجز تجاريّ'],['surplus','فائض'],['national debt','دَين عامّ'],
 ['budget deficit','عجز الميزانيّة'],['stimulus','تحفيز'],['bailout','إنقاذ ماليّ'],['privatisation','خصخصة'],
 ['nationalisation','تأميم'],['deregulation','رفع القيود'],['free market','سوق حرّة'],['protectionism','حمائيّة'],
 ['globalisation','عولمة'],['emerging market','سوق ناشئة'],['informal economy','اقتصاد غير رسميّ'],['black market','سوق سوداء']]},

{u:16, t:'الأمنُ والمخاطر', list:[
 ['threat assessment','تقدير التهديد'],['vulnerability','مَكمن ضعف'],['contingency plan','خطّة طوارئ'],['risk management','إدارة المخاطر'],
 ['safeguard','ضمانة وقائيّة'],['precaution','احتياط'],['evacuation','إخلاء'],['drill (safety)','تمرين إخلاء'],
 ['hazard','خطر محتمل'],['exposure','تعرّض'],['containment','احتواء'],['mitigation measure','إجراء تخفيف'],
 ['surveillance system','نظام مراقبة'],['access control','ضبط الدخول'],['authorisation','تفويض'],['clearance level','مستوى تصريح'],
 ['breach of security','خرق أمنيّ'],['incident report','بلاغ حادث'],['first responder','مستجيب أوّل'],['chain of command','تسلسل القيادة'],
 ['protocol','بروتوكول'],['guideline','إرشاد'],['checklist','قائمة تحقّق'],['audit trail','أثر تدقيقيّ'],
 ['liability insurance','تأمين مسؤوليّة'],['damage assessment','تقدير الأضرار'],['recovery plan','خطّة تعافٍ'],['lessons learned','دروس مستفادة']]}
,

{u:15, t:'الوصفُ الكمّيُّ والنسبيّ', list:[
 ['a fraction of','جزء يسير من'],['the bulk of','الجزء الأعظم'],['a handful of','حفنة من'],['the majority of','غالبيّة'],
 ['a minority of','أقلّيّة من'],['twice as many','ضِعف العدد'],['half as much','نصف الكمّيّة'],['threefold','ثلاثة أضعاف'],
 ['steadily','باطّراد'],['sharply','بحدّة'],['slightly','قليلاً'],['dramatically','بصورة لافتة'],
 ['considerably more','أكثر بكثير'],['far fewer','أقلّ بكثير'],['relatively high','مرتفع نسبيّاً'],['comparatively low','منخفض بالمقارنة'],
 ['at most','على الأكثر'],['at least','على الأقلّ'],['up to','حتّى'],['in excess of','بما يزيد على'],
 ['on average','في المتوسّط'],['per annum','سنويّاً'],['year on year','سنةً بعد سنة'],['to date','حتّى تاريخه']]},

{u:16, t:'العلاقاتُ المنطقيّة', list:[
 ['whereas','في حين أنّ'],['while acknowledging','مع الإقرار بـ'],['even though','مع أنّ'],['no matter how','مهما'],
 ['provided','شريطة'],['assuming that','بافتراض أنّ'],['given that','نظراً إلى أنّ'],['seeing that','بما أنّ'],
 ['insofar as','بقدر ما'],['to the extent that','إلى الحدّ الذي'],['so much so that','حتّى إنّ'],['such that','بحيث'],
 ['hence','ومن ثمّ'],['accordingly','وبناءً عليه'],['consequently','وبالتالي'],['as such','بصفته كذلك'],
 ['in other words','بعبارة أخرى'],['namely that','أي أنّ'],['that is to say','بمعنى'],['put simply','ببساطة'],
 ['first and foremost','أوّلاً وقبل كلّ شيء'],['last but not least','وأخيراً لا آخراً'],['above all','وفوق ذلك كلّه']]},

{u:17, t:'الحياةُ الأسريّةُ والاجتماعيّة', list:[
 ['household','أسرة معيشيّة'],['dependant','مُعال'],['guardian','وصيّ'],['custody of children','حضانة'],
 ['maternity leave','إجازة أمومة'],['childcare','رعاية أطفال'],['elderly care','رعاية مسنّين'],['extended family','أسرة ممتدّة'],
 ['nuclear family','أسرة نواة'],['single parent','أب أو أمّ وحيد'],['sibling rivalry','تنافس الإخوة'],['peer pressure','ضغط الأقران'],
 ['role model','قدوة'],['upbringing style','أسلوب تنشئة'],['discipline','انضباط'],['boundaries','حدود سلوكيّة'],
 ['quality time','وقت نوعيّ'],['work-life balance','توازن العمل والحياة'],['social circle','دائرة اجتماعيّة'],['isolation','عزلة'],
 ['belonging','انتماء'],['community spirit','روح الجماعة'],['mutual aid','تكافل'],['neighbourliness','حُسن الجوار']]},

{u:18, t:'أفعالُ البحثِ والتقرير', list:[
 ['investigate','يُحقّق في'],['examine closely','يفحص عن كثب'],['explore an idea','يستكشف فكرة'],['probe','يسبر'],
 ['assess impact','يُقيّم الأثر'],['evaluate options','يُوازن الخيارات'],['review evidence','يُراجع الأدلّة'],['verify a claim','يتثبّت من دعوى'],
 ['establish a link','يُثبت صلة'],['determine cause','يُحدّد سبباً'],['quantify','يُقدّر كمّيّاً'],['categorise data','يُصنّف البيانات'],
 ['highlight','يُبرز'],['underline a point','يُشدّد على'],['note that','يُلاحظ أنّ'],['observe a pattern','يرصد نمطاً'],
 ['suggest a reason','يقترح سبباً'],['propose a model','يَعرض نموذجاً'],['test a hypothesis','يختبر فرضيّة'],['refute','يدحض'],
 ['confirm a trend','يؤكّد اتّجاهاً'],['identify a gap','يرصد فجوة'],['address a question','يتناول سؤالاً'],['recommend action','يوصي بإجراء']]},

{u:19, t:'التفاوضُ والإقناع', list:[
 ['bargaining power','قوّة تفاوضيّة'],['leverage','ورقة ضغط'],['concede a point','يتنازل عن نقطة'],['hold firm','يتمسّك'],
 ['meet halfway','يلتقي في المنتصف'],['win-win','مكسبٌ للطرفين'],['deadlock','طريق مسدود'],['breakthrough in talks','انفراج'],
 ['opening offer','عرض افتتاحيّ'],['counteroffer','عرض مضادّ'],['final offer','عرض نهائيّ'],['walk away','ينسحب'],
 ['common interest','مصلحة مشتركة'],['mutual benefit','منفعة متبادلة'],['goodwill','حُسن نيّة'],['bad faith','سوء نيّة'],
 ['binding agreement','اتّفاق ملزم'],['non-binding','غير ملزم'],['memorandum','مذكّرة'],['letter of intent','خطاب نوايا'],
 ['sign off on','يعتمد نهائيّاً'],['back down','يتراجع'],['stand firm on','يصمد على'],['save face','يحفظ ماء الوجه']]},

{u:19, t:'القياسُ والجودة', list:[
 ['indicator','مؤشّر'],['metric','مقياس'],['threshold','عتبة'],['baseline','خطّ أساس'],
 ['target figure','رقم مستهدف'],['shortfall','قصور'],['overrun','تجاوز'],['variance','انحراف'],
 ['certification','شهادة مطابقة'],['standardisation','توحيد المعايير'],['specification sheet','ورقة مواصفات'],['tolerance level','مستوى السماحيّة'],
 ['defect rate','نسبة العيوب'],['rework','إعادة عمل'],['scrap','هدر إنتاجيّ'],['yield rate','نسبة الصلاحيّة'],
 ['continuous improvement','تحسين مستمرّ'],['root cause','السبب الجذريّ'],['corrective action','إجراء تصحيحيّ'],['preventive action','إجراء وقائيّ'],
 ['customer satisfaction','رضا العميل'],['complaint rate','نسبة الشكاوى'],['service level','مستوى الخدمة'],['turnaround','زمن الإنجاز']]}
,

{u:17, t:'الطاقةُ والمناخُ تفصيلاً', list:[
 ['carbon tax','ضريبة كربون'],['emission target','هدف انبعاثات'],['net zero','صفر صافٍ'],['carbon capture','احتجاز الكربون'],
 ['heat wave','موجة حرّ'],['cold snap','موجة برد'],['sea level rise','ارتفاع منسوب البحر'],['glacier','نهر جليديّ'],
 ['permafrost','تربة صقيعيّة'],['coral reef','شعاب مرجانيّة'],['wetland','أرض رطبة'],['watershed','مستجمع مائيّ'],
 ['aquifer','طبقة مياه جوفيّة'],['desalination','تحلية'],['wastewater','مياه عادمة'],['sanitation','صرف صحّيّ'],
 ['crop failure','فشل المحصول'],['food miles','مسافة الغذاء'],['seasonal produce','محصول موسميّ'],['supply resilience','مرونة التوريد'],
 ['circular economy','اقتصاد دائريّ'],['upcycle','يُعيد الاستعمال برفع القيمة'],['landfill tax','ضريبة المكبّات'],['extended producer responsibility','مسؤوليّة منتج ممتدّة'],
 ['climate adaptation','تكيّف مناخيّ'],['climate finance','تمويل مناخيّ'],['green transition','تحوّل أخضر'],['energy poverty','فقر الطاقة'],
 ['grid stability','استقرار الشبكة'],['peak demand','ذروة الطلب'],['smart meter','عدّاد ذكيّ'],['demand response','استجابة الطلب'],
 ['retrofit','تحديث المباني'],['thermal efficiency','كفاءة حراريّة'],['heat pump','مضخّة حراريّة'],['district heating','تدفئة مركزيّة'],
 ['biofuel','وقود حيويّ'],['hydrogen','هيدروجين'],['geothermal','حراريّ أرضيّ'],['tidal energy','طاقة المدّ'],
 ['subsidy reform','إصلاح الدعم'],['levy','رسم'],['offsetting scheme','برنامج تعويض'],['verification body','جهة تحقّق'],
 ['life-cycle analysis','تحليل دورة الحياة'],['embodied carbon','كربون مُجسَّد'],['supply chain audit','تدقيق سلسلة التوريد'],['disclosure','إفصاح'],
 ['stranded asset','أصل مُعطَّل'],['just transition','انتقال عادل'],['green bond','سند أخضر'],['ESG criteria','معايير بيئيّة واجتماعيّة وحوكميّة'],
 ['biodiversity loss','فقدان التنوّع'],['rewilding','إعادة تبرير'],['reforestation','إعادة تحريج'],['soil carbon','كربون التربة'],
 ['monoculture','زراعة أحاديّة'],['agroforestry','زراعة حرجيّة'],['pollinator','مُلقِّح'],['invasive species','نوع غازٍ'],
 ['conservation area','منطقة محميّة'],['buffer zone','منطقة عازلة'],['ecosystem service','خدمة بيئيّة'],['natural capital','رأس مال طبيعيّ'],
 ['resource depletion','استنزاف الموارد'],['overfishing','صيد جائر'],['quota system','نظام حصص'],['sustainable yield','غلّة مستدامة'],
 ['waste hierarchy','هرم النفايات'],['composting','تسبيخ'],['incineration','ترميد'],['leachate','عُصارة مكبّ'],
 ['air quality','جودة الهواء'],['particulate matter','جسيمات عالقة'],['noise pollution','تلوّث ضوضائيّ'],['light pollution','تلوّث ضوئيّ'],
 ['urban heat island','جزيرة حرارة حضريّة'],['permeable surface','سطح نفّاذ'],['flood defence','دفاع ضدّ الفيضان'],['early warning','إنذار مبكّر']]},

{u:18, t:'البياناتُ والرقمنة', list:[
 ['dataset','مجموعة بيانات'],['metadata','بيانات وصفيّة'],['query','استعلام'],['index (data)','فهرس'],
 ['schema','مخطّط بيانات'],['migration (data)','ترحيل بيانات'],['redundancy (data)','تكرار بيانات'],['integrity (data)','سلامة البيانات'],
 ['latency','زمن استجابة'],['bandwidth','عرض نطاق'],['throughput','معدّل إنجاز'],['uptime','زمن التشغيل'],
 ['downtime','زمن التعطّل'],['failover','تجاوز الفشل'],['load balancing','موازنة الحمل'],['caching','تخزين مؤقّت'],
 ['open source','مفتوح المصدر'],['proprietary','مملوك'],['licence agreement','اتّفاق ترخيص'],['version release','إصدار'],
 ['deployment','نشر'],['rollback','تراجع عن إصدار'],['patch','رقعة إصلاح'],['bug report','بلاغ خلل'],
 ['user story','قصّة مستخدم'],['requirement','متطلّب'],['specification doc','وثيقة مواصفات'],['acceptance test','اختبار قبول'],
 ['interface design','تصميم واجهة'],['responsive','متجاوب'],['accessibility standard','معيار إتاحة'],['localisation','توطين'],
 ['two-factor','ثنائيّ العامل'],['credential','بيانات اعتماد'],['breach notification','إخطار اختراق'],['penetration test','اختبار اختراق'],
 ['phishing','تصيّد'],['malware','برمجيّة خبيثة'],['ransomware','برمجيّة فدية'],['sandbox','بيئة معزولة'],
 ['audit log','سجلّ تدقيق'],['retention policy','سياسة احتفاظ'],['anonymisation','إخفاء الهويّة'],['consent','موافقة'],
 ['terms of service','شروط الخدمة'],['opt in','اشتراك اختياريّ'],['opt out','انسحاب اختياريّ'],['data subject','صاحب البيانات'],
 ['machine learning','تعلُّم آليّ'],['training data','بيانات تدريب'],['model accuracy','دقّة النموذج'],['overfitting','إفراط في المطابقة'],
 ['automation bias','تحيّز الأتمتة'],['human oversight','إشراف بشريّ'],['explainability','قابليّة التفسير'],['accountability gap','فجوة المساءلة'],
 ['digital literacy','ثقافة رقميّة'],['screen fatigue','إجهاد الشاشة'],['information overload','تخمة معلوماتيّة'],['attention economy','اقتصاد الانتباه'],
 ['remote collaboration','تعاون عن بُعد'],['asynchronous','غير متزامن'],['shared workspace','مساحة عمل مشتركة'],['digital nomad','رحّالة رقميّ']]},

{u:16, t:'الإدارةُ والحوكمة', list:[
 ['governance','حوكمة'],['mandate','تفويض'],['oversight','رقابة'],['remit','نطاق اختصاص'],
 ['charter','ميثاق'],['bylaw','لائحة داخليّة'],['quorum','نصاب'],['resolution passed','قرار صادر'],
 ['agenda item','بند جدول'],['action log','سجلّ إجراءات'],['escalation path','مسار التصعيد'],['reporting line','خطّ تبعيّة'],
 ['matrix structure','هيكل مصفوفيّ'],['flat hierarchy','هيكل أفقيّ'],['span of control','نطاق الإشراف'],['succession plan','خطّة خلافة'],
 ['performance indicator','مؤشّر أداء'],['dashboard','لوحة مؤشّرات'],['quarterly review','مراجعة ربعيّة'],['annual report','تقرير سنويّ'],
 ['risk register','سجلّ مخاطر'],['mitigation owner','مسؤول التخفيف'],['residual risk','خطر متبقٍّ'],['appetite for risk','قابليّة المخاطرة'],
 ['policy framework','إطار سياسات'],['standard operating procedure','إجراء تشغيل معياريّ'],['delegation of authority','تفويض الصلاحيّة'],['segregation of duties','فصل المهامّ'],
 ['internal control','ضبط داخليّ'],['external audit','تدقيق خارجيّ'],['assurance','توكيد'],['attestation','إقرار']]}
,

{u:15, t:'السياقُ والمرجعيّة', list:[
 ['framework agreement','اتّفاق إطاريّ'],['guiding principle','مبدأ موجّه'],['frame of reference','إطار مرجعيّ'],['point of departure','منطلق'],
 ['common denominator','قاسم مشترك'],['underlying theme','موضوع كامن'],['recurring pattern','نمط متكرّر'],['exception to the rule','استثناء'],
 ['rule of thumb','قاعدة تقريبيّة'],['benchmark case','حالة مرجعيّة'],['worst case','أسوأ الفروض'],['best case','أفضل الفروض'],
 ['middle ground','حلٌّ وسط'],['grey area','منطقة رماديّة'],['clear-cut','قاطع'],['borderline','حدّيّ'],
 ['prevailing view','الرأي السائد'],['minority view','رأي الأقلّيّة'],['emerging consensus','توافق ناشئ'],['long-standing','قائم منذ زمن'],
 ['well-established','راسخ'],['newly adopted','حديث الاعتماد'],['widely accepted','مقبول على نطاق واسع'],['hotly debated','شديد الجدل'],
 ['in principle','من حيث المبدأ'],['in practice','في التطبيق'],['on paper','نظريّاً'],['in reality','في الواقع'],
 ['as a rule','كقاعدة'],['by definition','بحكم التعريف'],['strictly speaking','بدقّة'],['broadly speaking','على وجه العموم'],
 ['in essence of the matter','في لبّ المسألة'],['at face value','بظاهره'],['on closer inspection','عند التدقيق'],['all else being equal','مع تساوي الظروف'],
 ['for the most part','في معظمه'],['to varying degrees','بدرجات متفاوتة'],['across the board','على كلّ المستويات'],['case by case','حالةً بحالة'],
 ['in due proportion','بالنسبة الواجبة'],['out of proportion','خارج النسبة'],['in keeping with','اتّساقاً مع'],['at variance with','متبايناً مع'],
 ['subject matter','موضوع المادّة'],['frame the question','يصوغ السؤال'],['set the scene','يُمهّد'],['take stock','يُقيّم الموقف'],
 ['draw a parallel','يعقد موازاة'],['make a distinction','يعقد تمييزاً'],['strike a balance','يُحقّق توازناً'],['bridge a gap','يسدّ فجوة'],
 ['shed light on','يُلقي ضوءاً'],['call into question','يضع موضع الشكّ'],['lay the groundwork','يضع الأساس'],['open the door to','يفتح الباب لـ'],
 ['give rise to debate','يُثير جدلاً'],['stand the test','يصمد للاختبار'],['hold true','يصحّ'],['fall short of','يقصر عن'],
 ['live up to','يرقى إلى'],['keep pace with','يُواكب'],['lag behind','يتخلّف عن'],['set a precedent','يُرسي سابقة'],['carry weight','يكون له وزن'],['bear scrutiny','يحتمل التمحيص']]}
,

{u:16, t:'النقلُ الدقيق', list:[
 ['as stated','كما ذُكر'],['according to','بحسب'],['allegedly said','قيل زعماً'],['quoted as saying','نُقل عنه قولُه'],
 ['went on to say','ثمّ أضاف'],['added that','وأضاف أنّ'],['stressed that','وشدّد على أنّ'],['pointed out that','ونبّه إلى أنّ'],
 ['declined to comment','امتنع عن التعليق'],['was unavailable','تعذّر الوصول إليه'],['could not be reached','لم يمكن بلوغه'],['has yet to respond','لم يردّ بعدُ'],
 ['in a statement','في بيان']]},

{u:17, t:'الندمُ والتمنّي', list:[
 ['if only','ليت أنّ']]},

{u:18, t:'الفعلُ والمصدر', list:[
 ['agree to do','يوافق على فعل'],['arrange to do','يُرتّب لفعل'],['deserve to do','يستحقّ أن'],['expect to do','يتوقّع أن'],
 ['intend to do','ينوي أن'],['offer to do','يَعرض أن'],['prepare to do','يستعدّ لأن'],['threaten to do','يُهدّد بأن'],
 ['admit doing','يُقرّ بفعل']]},

{u:19, t:'الأسلوبُ الحِجاجيّ', list:[
 ['it could be argued','يمكن أن يُقال'],['one might object','قد يعترض معترض'],['a common objection','اعتراض شائع'],['a fair point','نقطة وجيهة'],
 ['this overlooks','وهذا يغفل'],['this assumes','وهذا يفترض'],['the evidence suggests','تُشير الأدلّة'],['the data indicate','تدلّ البيانات'],
 ['it follows that','ويترتّب على ذلك'],['which implies','ممّا يعني'],['to put it another way','وبعبارة أخرى'],['in that case','في تلك الحال'],
 ['if anything','بل لعلّ'],['at the very least','على أقلّ تقدير'],['not least because','لا سيّما لأنّ'],['for one thing','أوّلاً'],
 ['for another','وثانياً'],['on the face of it','في ظاهر الأمر'],['deep down','في العمق'],['in the final analysis','في التحليل الأخير'],
 ['a matter of degree','مسألة درجة'],['a question of priorities','مسألة أولويّات'],['beside the point','خارج الموضوع'],['to the point','في صميم الموضوع'],
 ['worth noting','جديرٌ بالذكر'],['worth stressing','جديرٌ بالتشديد'],['hard to deny','يصعب إنكاره'],['open to question','قابل للتساؤل'],
 ['a reasonable assumption','افتراض معقول']]}
];
