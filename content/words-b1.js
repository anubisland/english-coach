/* مفرداتُ B1 في حقولٍ موضوعيّة — على نسق words-a1.js وwords-a2.js.

   وهدفُ المستوى تراكميٌّ (٢٥٠٠ معنًى يشمل ما قبله)، فنصيبُ B1 منه
   نحو تسعمئة: خمسُ وحداتٍ × مئةٍ وثمانين.

   وحقولُ B1 أوسعُ وأكثرُ تجريداً ممّا قبله: لم تعد أشياءَ تُرى
   وتُلمَس وحدها، بل أفكاراً وعلاقاتٍ وأحكاماً — وهذا ما يفصل
   المتوسّطَ عن المبتدئ أكثرَ من القواعد.

   والترتيب: [الكلمة, معناها]. */

export const WORDS = [

/* ══ الوحدة ١٠ — الحاضر التامّ: الخبرةُ والإنجاز ══ */
{u:10, t:'الخبرةُ والإنجاز', list:[
 ['achieve','يُحقّق'],['achievement','إنجاز'],['success','نجاح'],['failure','فشل'],['attempt','محاولة'],
 ['progress','تقدّم'],['improvement','تحسُّن'],['develop','يُطوّر'],
 ['development','تطوّر'],['ability','قدرة'],['talent','موهبة'],
 ['effort','جهد'],['practice','ممارسة'],['master','يُتقن'],['manage','يتدبّر'],
 ['complete','يُتمّ'],['accomplish','يُنجز'],['reach','يبلغ'],['gain','يكسب'],
 ['earn','يستحقّ · يكسب'],['chance','فرصة'],['opportunity','فرصة سانحة'],
 ['challenge','تحدٍّ'],['difficulty','صعوبة']]},

{u:10, t:'العملُ والمسيرة', list:[
 ['employer','ربّ عمل'],['employee','موظّف'],['colleague','زميل'],['department','قسم'],
 ['position','منصب'],['promotion','ترقية'],['responsibility','مسؤوليّة'],['duty','واجب'],
 ['overtime','عمل إضافيّ'],['shift','نوبة عمل'],['resign','يستقيل'],
 ['retire','يتقاعد'],['hire','يوظّف'],['fire','يفصل'],['apply for','يتقدّم لـ'],
 ['qualification','مؤهّل'],['reference','تزكية'],['income','دخل'],
 ['benefit','ميزة'],['insurance','تأمين'],['union','نقابة'],
 ['presentation','عرض تقديميّ'],['client','عميل'],['supplier','مورّد'],
 ['profit','ربح'],['loss','خسارة']]},

{u:10, t:'التغيُّرُ والزمن', list:[
 ['change','تغيير'],['recent','حديث'],['lately','في الآونة الأخيرة'],
 ['yet','بعدُ'],['just','للتوّ'],['ever','قطّ'],
 ['for','لمدّة'],['so far','حتّى الآن'],
 ['until now','إلى الآن'],['no longer','لم يعد'],['become','يصير'],
 ['remain','يبقى'],['continue','يستمرّ'],['begin','يبدأ'],
 ['last','يدوم'],['period','فترة'],['stage','مرحلة'],['moment','لحظة'],
 ['century','قرن'],['decade','عقد'],['generation','جيل'],['era','عصر']]},

{u:10, t:'الإعلامُ والأخبار', list:[
 ['article','مقال'],['headline','عنوان رئيس'],
 ['journalist','صحفيّ'],['source','مصدر'],['evidence','دليل'],
 ['fact','واقعة'],['claim','ادّعاء'],['announce','يُعلن'],
 ['publish','ينشر'],['broadcast','يبثّ'],['channel','قناة'],['programme','برنامج'],
 ['audience','جمهور'],['viewer','مشاهد'],['reader','قارئ'],['comment','تعليق'],
 ['discuss','يناقش'],['describe','يصف'],['mention','يذكر'],['deny','ينفي'],['reveal','يكشف'],['warn','يحذّر']]},

{u:10, t:'أفعالُ الإنجاز وصيغُها', list:[
 ['been','كان (الثالث)'],['gone','ذهب (الثالث)'],['done','فعل (الثالث)'],['seen','رأى (الثالث)'],
 ['taken','أخذ (الثالث)'],['given','أعطى (الثالث)'],['written','كتب (الثالث)'],['eaten','أكل (الثالث)'],
 ['spoken','تكلّم (الثالث)'],['broken','كسر (الثالث)'],['chosen','اختار (الثالث)'],['forgotten','نسي (الثالث)'],
 ['known','عرف (الثالث)'],['grown','نما (الثالث)'],['flown','طار (الثالث)'],['driven','قاد (الثالث)'],
 ['beaten','هزم (الثالث)'],['hidden','أخفى (الثالث)'],['risen','ارتفع (الثالث)'],['fallen','سقط (الثالث)'],
 ['built','بنى'],['kept','احتفظ'],['taught','علّم'],['caught','أمسك'],
 ['sought','سعى']]},

{u:10, t:'الحكمُ والتقدير', list:[
 ['important','مهمّ'],['necessary','ضروريّ'],['possible','ممكن'],['impossible','مستحيل'],
 ['likely','مُرجَّح'],['unlikely','بعيد'],['certain','أكيد'],['probable','محتمل'],
 ['obvious','واضح'],['clear','بيّن'],['true','صحيح'],['false','باطل'],
 ['correct','سليم'],['useful','نافع'],['harmful','ضارّ'],
 ['valuable','ثمين'],['worth','يستحقّ'],['extra','إضافيّ'],
 ['main','رئيس'],['special','خاصّ'],['common','شائع'],['rare','نادر'],
 ['normal','عاديّ'],['strange','غريب'],['serious','جادّ · خطير'],['simple','بسيط']]},

/* ══ الوحدة ١١ — السردُ والماضي المستمرّ ══ */
{u:11, t:'السردُ والقصّة', list:[
 ['scene','مشهد'],['character','شخصيّة'],
 ['plot','حبكة'],['beginning','بداية'],['middle','وسط'],['ending','نهاية'],
 ['happen','يقع'],['occur','يحدث'],['take place','يجري'],
 ['meanwhile','في تلك الأثناء'],['immediately','فوراً'],['eventually','في النهاية'],
 ['at first','في البداية'],['afterwards','بعد ذلك'],
 ['as','بينما · إذ'],['just as','في اللحظة التي'],
 ['realise','يُدرك']]},

{u:11, t:'الحوادثُ والطوارئ', list:[
 ['accident','حادث'],['danger','خطر'],['risk','مخاطرة'],
 ['safety','سلامة'],['injure','يُصيب'],['hurt','يؤذي'],['damage','ضرر'],['destroy','يُدمّر'],['break down','يتعطّل'],
 ['crash','يصطدم'],['fall','يسقط'],['burn','يحترق'],['fire','حريق'],
 ['flood','فيضان'],['escape','يهرب'],['rescue','ينقذ'],['ambulance','إسعاف'],
 ['survive','ينجو'],
 ['warn','يُحذّر'],['avoid','يتجنّب'],['prevent','يمنع'],['protect','يحمي']]},

{u:11, t:'الوصفُ الحسّيّ', list:[
 ['notice','يلاحظ'],['watch','يُراقب'],['stare','يُحدّق'],['glance','يلمح'],
 ['hear','يسمع'],['listen','يُصغي'],['sound','صوت'],['silent','صامت'],['loud','عالٍ'],['smell','رائحة · يشمّ'],['taste','طعم · يتذوّق'],
 ['touch','يلمس'],['bright','ساطع'],['dark','مظلم'],
 ['shine','يسطع'],['shadow','ظلّ'],['smooth','ناعم'],['cool','بارد'],['fresh','منعش']]},

{u:11, t:'العلاقاتُ والناس', list:[
 ['relationship','علاقة'],['friendship','صداقة'],['trust','ثقة · يثق'],['respect','احترام'],
 ['support','يدعم'],['advise','ينصح'],['encourage','يشجّع'],
 ['argue','يتجادل'],['quarrel','يتخاصم'],['forgive','يسامح'],
 ['lie','يكذب'],['truth','حقيقة'],['loyal','وفيّ'],['jealous','غيور'],['stranger','غريب'],['partner','شريك']]},

{u:11, t:'أفعالُ الحركة الدقيقة', list:[
 ['jump','يقفز'],['climb','يتسلّق'],
 ['crawl','يزحف'],['slip','ينزلق'],['lift','يرفع'],['drop','يُسقط'],['throw','يرمي'],['catch','يلتقط'],
 ['move','يتحرّك'],['turn','يستدير'],
 ['approach','يقترب'],['enter','يدخل'],['follow','يتبع'],['chase','يطارد'],['hide','يختبئ'],['knock','يطرق'],['ring','يرنّ'],['wave','يلوّح'],['point','يشير']]},

{u:11, t:'الذاكرةُ والشعور', list:[
 ['memory','ذاكرة'],['recall','يستحضر'],['regret','يندم'],['fear','يخاف'],['surprise','يُفاجئ'],['shock','يصدم'],['relax','يسترخي'],['enjoy','يستمتع'],
 ['suffer','يعاني'],['shout','يصرخ'],['whisper','يهمس'],['sigh','يتنهّد'],['calm','هادئ'],
 ['disappointed','خائب'],
 ['grateful','ممتنّ'],['satisfied','راضٍ'],['upset','مُنزعج']]},

/* ══ الوحدة ١٢ — الشرطُ والافتراض ══ */
{u:12, t:'الاحتمالُ والفرض', list:[
 ['unless','ما لم'],['otherwise','وإلّا'],['suppose','يفترض'],
 ['assume','يُسلّم بـ'],['predict','يتنبّأ'],['guess','يحزر'],
 ['depend','يعتمد'],['condition','شرط'],['situation','وضع'],['case','حالة'],
 ['decision','قرار'],['consider','ينظر في'],['compare','يُقارن'],['prefer','يُفضّل'],['doubt','يشكّ'],
 ['sure','متيقّن'],['perhaps','لعلّ'],['maybe','ربّما'],['definitely','قطعاً']]},

{u:12, t:'النتائجُ والعواقب', list:[
 ['effect','أثر'],['affect','يؤثّر في'],['cause','سبب · يسبّب'],
 ['consequence','عاقبة'],['lead to','يؤدّي إلى'],['because of','بسبب'],
 ['due to','نتيجةً لـ'],['therefore','لذلك'],['thus','وهكذا'],['as a result','نتيجةً لذلك'],
 ['solve','يحلّ'],['issue','قضيّة'],
 ['error','غلط'],['fix','يُصلح'],['repair','يُرمّم'],
 ['worsen','يُفاقم'],['benefit','فائدة'],['cost','كلفة'],['save','يوفّر'],['waste','يُهدر']]},

{u:12, t:'المالُ والقرار', list:[
 ['budget','ميزانيّة'],['expense','نفقة'],['invest','يستثمر'],
 ['loan','قرض'],['debt','دَين'],['interest','فائدة'],['transfer','يُحوّل'],['withdraw','يسحب'],['deposit','يودع'],['tax','ضريبة'],['value','قيمة'],['worth','يساوي'],['increase','يزيد'],
 ['decrease','ينقص'],['rise','يرتفع'],['fall','ينخفض'],['double','يُضاعف'],
 ['amount','مبلغ'],['total','مجموع'],['average','متوسّط'],['rate','معدّل'],
 ['percent','بالمئة'],['expensive','باهظ'],['free','مجّانيّ']]},

{u:12, t:'البيئةُ والمناخ', list:[
 ['environment','بيئة'],['nature','طبيعة'],['climate','مناخ'],['pollution','تلوّث'],
 ['pollute','يلوّث'],['waste','نفايات'],['fuel','وقود'],['solar','شمسيّ'],['dirty','ملوَّث'],['forest','غابة'],['ocean','محيط'],['planet','كوكب'],['earth','الأرض'],['air','هواء'],
 ['soil','تربة'],['plant','نبات · يزرع'],['grow','ينمو'],
 ['species','نوع أحيائيّ'],['destroy','يُتلف'],['disappear','يختفي']]},

{u:12, t:'الصحّةُ والسلامة', list:[
 ['health','صحّة'],['healthy','صحّيّ'],['illness','مرض'],
 ['disease','داء'],['infection','عدوى'],['symptom','عَرَض'],['pill','حبّة دواء'],['patient','مريض'],
 ['surgery','جراحة · عيادة'],['cure','شفاء · يشفي'],['heal','يلتئم'],
 ['diet','حمية'],['sleep','نوم'],['stress','إجهاد'],
 ['smoke','يدخّن'],['drug','عقّار'],['vitamin','فيتامين'],['blood','دم'],
 ['lung','رئة'],['brain','دماغ'],['bone','عظم']]},

{u:12, t:'الطموحُ والمستقبل', list:[
 ['ambition','طموح'],['dream','حلم'],['goal','هدف'],['aim','غاية'],
 ['plan','خطّة'],['study abroad','يدرس في الخارج'],
 ['scholarship','منحة'],['degree','شهادة'],['start up','يُنشئ'],
 ['business','عمل تجاريّ'],['product','منتج'],['quality','جودة'],['brand','علامة تجاريّة']]}
,

/* ══ الوحدة ١٣ — الواجبُ والنصيحةُ والاستنتاج ══ */
{u:13, t:'القواعدُ والأنظمة', list:[
 ['rule','قاعدة'],['law','قانون'],['legal','قانونيّ'],['illegal','غير قانونيّ'],
 ['allow','يسمح'],['permit','يُجيز'],['forbid','يمنع'],['ban','يحظر'],
 ['require','يشترط'],['obey','يُطيع'],['break (a rule)','يخالف'],['punish','يعاقب'],
 ['fine','غرامة'],['warning','إنذار'],['permission','إذن'],['licence','رخصة'],
 ['official','رسميّ'],['authority','سلطة'],['government','حكومة'],['policy','سياسة'],
 ['regulation','لائحة'],['standard','معيار'],['right','حقّ'],['responsible','مسؤول'],['liable','ملزَم'],['strict','صارم'],['flexible','مرن']]},

{u:13, t:'النصيحةُ والالتزام', list:[
 ['advice','نصيحة'],['suggest','يقترح'],['suggestion','اقتراح'],
 ['recommend','يوصي'],['insist','يُصرّ'],
 ['persuade','يُقنع'],['convince','يُقنع بالحجّة'],['agree to','يوافق على'],['commit','يلتزم'],['obligation','التزام'],['must','يجب'],['should','ينبغي'],['ought','يجدر'],['better','أجدر'],['allow for','يُراعي'],['consider','يأخذ في الحسبان'],['ignore','يتجاهل'],
 ['follow','يتّبع'],['apply','يُطبّق'],['respect','يحترم'],['refuse','يأبى']]},

{u:13, t:'الاستنتاجُ والرأي', list:[
 ['suppose','يظنّ'],['seem','يبدو'],
 ['appear','يظهر'],['prove','يُثبت'],['proof','برهان'],['conclude','يستنتج'],['conclusion','استنتاج'],['logical','منطقيّ'],['reasonable','معقول'],
 ['obvious','بيّن'],['apparently','فيما يبدو'],['probably','غالباً'],
 ['possibly','لعلّه'],['certainly','يقيناً'],['impossible','محال'],['unlikely','مستبعَد'],
 ['argue','يحتجّ'],['argument','حجّة'],['point','نقطة'],['view','وجهة نظر'],
 ['attitude','موقف'],['assume','يفترض'],['judge','يحكم'],['estimate','يُقدّر']]},

{u:13, t:'الأخلاقُ والسلوك', list:[
 ['behave','يسلك'],['behaviour','سلوك'],['manner','أسلوب'],['habit','عادة'],
 ['tradition','تقليد'],['principle','مبدأ'],
 ['fair','منصف'],['unfair','جائر'],['honest','أمين'],['dishonest','غير أمين'],
 ['cheat','يغشّ'],['steal','يسرق'],['blame','يلوم'],['excuse','عذر'],
 ['apology','اعتذار'],['forgive','يغفر'],['guilty','مُذنب'],['innocent','بريء'],
 ['deserve','يستحقّ'],['reward','مكافأة'],['punishment','عقوبة'],['justice','عدل'],
 ['freedom','حرّيّة'],['duty-bound','مُلزَم']]},

{u:13, t:'العملُ والمسؤوليّة', list:[
 ['manage','يُدير'],['control','يتحكّم'],['supervise','يُشرف'],
 ['lead','يقود'],['leader','قائد'],['assistant','مساعد'],
 ['role','دور'],['instruction','تعليمة'],['order','أمر'],
 ['request','طلب'],['complaint','شكوى'],['complain','يشتكي'],['report to','يرفع إلى'],
 ['deadline','أجل'],['schedule','يُجدول'],['approve','يعتمد'],['reject','يرفض'],['review','يُراجع'],
 ['check','يفحص'],['ensure','يضمن'],['handle','يُعالج'],['deal with','يتعامل مع']]},

{u:13, t:'الوقتُ والترتيب', list:[
 ['urgent','عاجل'],['immediate','فوريّ'],['temporary','مؤقّت'],['permanent','دائم'],
 ['regular','منتظم'],['occasional','عارض'],['frequent','متكرّر'],['constant','مستمرّ'],
 ['sudden','مفاجئ'],['gradual','تدريجيّ'],['previous','سابق'],['following','تالٍ'],
 ['current','حاليّ'],['former','أسبق'],['latest','أحدث'],
 ['soon','وشيكاً'],['shortly','بعد قليل'],['meanwhile','في الأثناء'],['afterwards','بعدئذٍ'],
 ['in advance','مقدّماً'],['on time','في موعده'],['in time','قبل فواته'],['at once','على الفور'],
 ['whenever','متى ما'],['as soon as','حالما'],['by then','عندئذٍ'],['from now on','من الآن']]},

/* ══ الوحدة ١٤ — المجهولُ وجملةُ الوصل ══ */
{u:14, t:'العلمُ والتقنية', list:[
 ['science','علم'],['scientist','عالِم'],['technology','تقنيّة'],['experiment','تجربة'],['discover','يكتشف'],['discovery','اكتشاف'],['invent','يخترع'],
 ['invention','اختراع'],['design','يُصمّم'],['test','يختبر'],
 ['data','بيانات'],['method','منهج'],['theory','نظريّة'],
 ['device','جهاز'],['machine','آلة'],['engine','محرّك'],['tool','أداة'],
 ['material','مادّة'],['metal','معدن'],['plastic','بلاستيك'],['chemical','كيميائيّ'],
 ['electric','كهربائيّ'],['digital','رقميّ'],['software','برمجيّة'],['system','نظام']]},

{u:14, t:'العمليّاتُ والصناعة', list:[
 ['produce','يُنتج'],['manufacture','يُصنّع'],['factory','مصنع'],
 ['industry','صناعة'],['process','عمليّة'],['stage','طور'],['method','طريقة'],
 ['supply','يُورّد'],['deliver','يُسلّم'],['transport','ينقل'],['store','يُخزّن'],
 ['package','يُغلّف'],['label','يُعنوِن'],['inspect','يُفتّش'],['approve','يُجيز'],
 ['reject','يَرفض'],['replace','يستبدل'],['install','يُركّب'],
 ['construct','يُشيّد'],['raw material','مادّة خام'],['machine-made','مصنوع آليّاً'],
 ['handmade','مصنوع يدويّاً'],['quantity','كمّيّة'],['waste','هدر']]},

{u:14, t:'التعليمُ والمعرفة', list:[
 ['education','تعليم'],['knowledge','معرفة'],['subject','مادّة'],['topic','موضوع'],
 ['lecture','محاضرة'],['test','اختبار'],
 ['mark','درجة'],['grade','تقدير'],['pass','ينجح'],['fail','يرسب'],
 ['revise','يُراجع'],['memorise','يحفظ'],['explain','يُفسّر'],
 ['essay','مقالة'],
 ['textbook','كتاب مقرّر'],['dictionary','معجم'],['note','ملحوظة'],
 ['teacher','مُعلّم'],['term','فصل دراسيّ']]},

{u:14, t:'الوصفُ الدقيق', list:[
 ['which','الذي · التي'],['who','الذي (للعاقل)'],['whose','الذي ـه'],['where','حيث'],
 ['that','الذي'],['whom','الذي (مفعولاً)'],['such as','مثل'],['including','بما فيه'],
 ['especially','لا سيّما'],['mainly','أساساً'],['partly','جزئيّاً'],['entirely','كلّيّاً'],
 ['exactly','تماماً'],['approximately','تقريباً'],['roughly','على وجه التقريب'],['mostly','في الغالب'],['generally','عموماً'],
 ['specifically','تحديداً'],['in particular','بوجه خاصّ'],['in general','بوجه عامّ'],['namely','أي'],
 ['detail','تفصيل'],['feature','سمة'],['aspect','جانب'],['element','عنصر']]},

{u:14, t:'التاريخُ والمجتمع', list:[
 ['history','تاريخ'],['ancient','قديم'],['civilisation','حضارة'],
 ['culture','ثقافة'],['society','مجتمع'],['community','جماعة'],
 ['citizen','مواطن'],['foreign','أجنبيّ'],['immigrant','مهاجر'],['war','حرب'],
 ['peace','سلام'],['empire','إمبراطوريّة'],['king','ملك'],['leader','زعيم'],
 ['monument','نُصُب'],['ruins','أطلال'],['temple','معبد'],['palace','قصر'],
 ['exhibition','معرض'],['tradition','تراث'],['heritage','إرث'],
 ['period','حقبة'],['found','يُؤسّس']]},

{u:14, t:'المدينةُ والعمران', list:[
 ['city centre','وسط المدينة'],['street light','مصباح شارع'],
 ['pavement','رصيف'],['square','ميدان'],
 ['monument','تمثال تذكاريّ'],['fountain','نافورة'],['park','متنزّه'],['playground','ملعب أطفال'],
 ['car park','مرآب'],['petrol station','محطّة وقود'],['shopping centre','مركز تسوّق'],['market place','ساحة السوق'],
 ['town hall','دار البلديّة'],['police station','مركز شرطة'],['fire station','مركز إطفاء'],['public','عامّ'],['private','خاصّ'],['local','محلّيّ'],['central','مركزيّ'],
 ['urban','حضريّ'],['rural','ريفيّ'],['built','مبنيّ'],['planned','مخطَّط']]},

{u:10, t:'الإدارةُ والتخطيط', list:[
 ['strategy','استراتيجيّة'],['target','هدف محدَّد'],['priority','أولويّة'],['resource','مورد'],['schedule','جدول زمنيّ'],['milestone','محطّة فارقة'],['progress report','تقرير تقدّم'],
 ['team leader','قائد فريق'],['staff meeting','اجتماع الموظّفين'],['agenda','جدول أعمال'],['minutes','محضر'],
 ['proposal','مقترح'],['approval','موافقة'],['feedback','تغذية راجعة'],['evaluation','تقييم'],
 ['performance','أداء'],['efficiency','كفاءة'],['extension','تمديد'],
 ['workload','عبء عمل'],['teamwork','عمل جماعيّ'],['cooperate','يتعاون'],['coordinate','ينسّق'],
 ['delegate','يُفوّض'],['monitor','يُتابع'],['assess','يُقيّم'],['adjust','يُعدّل']]},

{u:10, t:'اللغةُ والتواصل', list:[
 ['express','يُعبّر'],['state','يُصرّح'],['claim','يزعم'],['admit','يعترف'],
 ['refuse to','يأبى أن'],['offer','يَعرض'],['request','يطلب'],
 ['reply','يردّ'],['respond','يستجيب'],['translate','يترجم'],['interpret','يُفسّر'],
 ['pronounce','ينطق'],['spell','يتهجّى'],['repeat','يُكرّر'],['summarise','يُلخّص'],
 ['phrase','عبارة'],['sentence','جملة'],['paragraph','فقرة'],['accent','لهجة'],
 ['formal','رسميّ'],['informal','غير رسميّ'],['polite form','صيغة التأدّب'],['slang','عامّيّة'],
 ['misunderstand','يُسيء الفهم'],['clarify','يُوضّح'],['confirm in writing','يؤكّد كتابةً'],['note down','يُدوّن']]},

{u:11, t:'الطبيعةُ والرحلات', list:[
 ['valley','وادٍ'],['hill','تلّ'],['cliff','جُرف'],['cave','كهف'],
 ['lake','بحيرة'],['stream','جدول'],['waterfall','شلّال'],['coast','ساحل'],
 ['sand','رمل'],['rock','صخر'],['mud','طين'],['grass','عشب'],
 ['leaf','ورقة شجر'],['branch','غصن'],['root','جذر'],['seed','بذرة'],
 ['insect','حشرة'],['snake','أفعى'],['camel','جمل'],['donkey','حمار'],
 ['path','درب'],['tent','خيمة'],['campfire','نار المخيّم'],['sunrise','شروق'],
 ['sunset','غروب'],['view point','مطلّ'],['guide book','دليل'],['backpack','حقيبة ظهر']]},

{u:11, t:'الوصفُ الأدبيّ', list:[
 ['silence','صمت'],['echo','صدى'],['breeze','نسيم'],['dust','غبار'],
 ['smoke','دخان'],['steam','بخار'],['flame','لهب'],['spark','شرارة'],
 ['glow','توهّج'],['reflection','انعكاس'],['shape','شكل'],
 ['edge','حافّة'],['corner of the eye','طرف العين'],['distance','مسافة'],['horizon','أفق'],
 ['crowd','حشد'],['queue of cars','طابور سيّارات'],['empty street','شارع خالٍ'],['narrow lane','زقاق'],
 ['sudden sound','صوت مفاجئ'],['low voice','صوت خافت'],['sharp cry','صيحة حادّة'],['deep breath','نفَس عميق'],
 ['tired face','وجه مُتعَب'],['warm hand','يد دافئة'],['cold wind','ريح باردة'],['heavy rain','مطر غزير']]},

{u:12, t:'المجتمعُ والسياسة', list:[
 ['council','مجلس'],['election','انتخاب'],['vote','يُصوّت'],['candidate','مرشّح'],
 ['campaign','حملة'],['support','تأييد'],['oppose','يُعارض'],['majority','أغلبيّة'],
 ['minority','أقلّيّة'],['public opinion','الرأي العامّ'],['survey','استطلاع'],['statistics','إحصاءات'],
 ['poverty','فقر'],['wealth','ثروة'],['unemployment','بطالة'],['charity','عمل خيريّ'],
 ['volunteer','متطوّع'],['donate','يتبرّع'],['organisation','منظّمة'],['committee','لجنة'],
 ['member','عضو'],['represent','يُمثّل'],['demand','يطالب'],['protest','احتجاج'],
 ['reform','إصلاح'],['improve services','يُحسّن الخدمات'],['raise awareness','ينشر الوعي'],['citizenship','مواطنة']]},

{u:12, t:'الوقتُ والاحتمال', list:[
 ['probability','احتماليّة'],['chance of','فرصة حدوث'],['risk of','خطر وقوع'],['in case','تحسّباً'],
 ['provided that','بشرط أن'],['as long as','ما دام'],['even if','حتّى لو'],['whether','سواء'],
 ['would rather','يُؤثر أن'],['had better','من الأجدر'],['be about to','يوشك'],['be likely to','يُرجَّح أن'],
 ['tend to','يميل إلى'],['happen to','يصادف أن'],['turn out','يتبيّن'],['end up','ينتهي به الأمر'],
 ['so far so good','حتّى الآن بخير'],['sooner or later','عاجلاً أو آجلاً'],['at any rate','على أيّ حال'],['in the long run','على المدى البعيد'],
 ['for the time being','في الوقت الراهن'],['from time to time','بين الحين والآخر'],['now and then','أحياناً'],['all of a sudden','بغتةً']]}
,

{u:13, t:'العدالةُ والقضاء', list:[
 ['court','محكمة'],['judge','قاضٍ'],['lawyer','محامٍ'],['witness','شاهد'],
 ['trial','محاكمة'],['case','قضيّة'],['sentence (legal)','حكم'],['appeal','استئناف'],
 ['crime','جريمة'],['criminal','مجرم'],['theft','سرقة'],['fraud','احتيال'],
 ['arrest','يعتقل'],['accuse','يتّهم'],['defend','يُدافع'],['acquit','يُبرّئ'],
 ['convict','يُدين'],['prison','سجن'],['release','يُفرج'],['bail','كفالة'],
 ['contract term','بند العقد'],['agreement','اتّفاق'],['witness statement','إفادة'],
 ['claim damages','يطالب بتعويض'],['settle','يُسوّي'],['dispute','نزاع'],['mediate','يتوسّط']]},

{u:13, t:'الصحّةُ العامّةُ والسلامة', list:[
 ['hygiene','نظافة صحّيّة'],['vaccine','لقاح'],['clinic hours','ساعات العيادة'],['appointment card','بطاقة موعد'],
 ['prescription','وصفة طبّيّة'],['dose','جرعة'],['side effect','أثر جانبيّ'],['allergy','حساسيّة'],
 ['first aid','إسعاف أوّليّ'],['bandage','ضمادة'],['wound','جرح'],['burn','حرق'],
 ['fracture','كسر'],['faint','يُغشى عليه'],['breathe','يتنفّس'],['pulse','نبض'],
 ['fever','حمّى'],['cough','سعال'],['headache','صداع'],['stomach ache','ألم معدة'],
 ['check-up','فحص دوريّ'],['specialist','اختصاصيّ'],['referral','إحالة'],['waiting list','قائمة انتظار'],
 ['emergency exit','مخرج طوارئ'],['fire alarm','إنذار حريق'],['helmet','خوذة'],['warning sign','لافتة تحذير']]},

{u:14, t:'الحاسوبُ والشبكة', list:[
 ['hardware','عتاد'],['server','خادم'],['database','قاعدة بيانات'],['backup','نسخة احتياطيّة'],
 ['virus','فيروس'],['firewall','جدار حماية'],['encryption','تشفير'],['privacy','خصوصيّة'],
 ['settings','إعدادات'],['default','الافتراضيّ'],['link','رابط'],['browser','متصفّح'],
 ['search engine','محرّك بحث'],['keyword','كلمة مفتاحيّة'],['attachment','مرفق'],['inbox','صندوق الوارد'],
 ['spam','بريد مزعج'],['notification','إشعار'],['profile','ملفّ شخصيّ'],['post','منشور'],
 ['follower','متابع'],['stream','بثّ'],['storage','تخزين'],['cloud','سحابة'],
 ['connect to','يتّصل بـ'],['log out','يخرج'],['restart','يُعيد التشغيل'],['crash','يتعطّل']]},

{u:14, t:'الفنُّ والعمارة', list:[
 ['architecture','عمارة'],['architect','معماريّ'],['column','عمود'],['arch','قوس'],
 ['dome','قبّة'],['tower','برج'],['wall painting','جدارية'],['sculpture','نحت'],
 ['statue','تمثال'],['portrait','بورتريه'],['landscape','منظر طبيعيّ'],['artist','فنّان'],
 ['painter','رسّام'],['gallery','صالة عرض'],['style','أسلوب فنّيّ'],['influence','تأثير'],
 ['restore','يُرمّم'],['preserve','يحفظ'],['decorate','يُزخرف'],['carve','ينقش'],
 ['marble','رخام'],['stone','حجر'],['brick','طوب'],['wood carving','نقش خشبيّ'],
 ['craft','حرفة'],['craftsman','حرفيّ'],['workshop','ورشة'],['exhibition hall','قاعة معرض']]},

{u:14, t:'الاقتصادُ والتجارة', list:[
 ['economy','اقتصاد'],['trade','تجارة'],['export','يُصدّر'],['import','يستورد'],
 ['demand','طلب'],['supply chain','سلسلة توريد'],['wholesale','بالجملة'],['retail','بالتجزئة'],
 ['competition','منافسة'],['competitor','منافس'],['partnership','شراكة'],['investor','مستثمر'],
 ['share','سهم'],['stock','مخزون'],['inflation','تضخّم'],['recession','ركود'],
 ['growth','نموّ'],['decline','تراجع'],['supply and demand','العرض والطلب'],['agreement price','سعر متّفق عليه'],
 ['supplier contract','عقد توريد'],['invoice','فاتورة'],['payment','دفعة'],['refund','استرداد'],
 ['guarantee','ضمان'],['warranty','كفالة'],['delivery note','إشعار تسليم'],['order form','استمارة طلب']]},

{u:14, t:'أفعالٌ أكاديميّة', list:[
 ['analyse','يُحلّل'],['compare and contrast','يُوازن'],['define','يُعرّف'],['identify','يُحدّد'],
 ['classify','يُصنّف'],['illustrate','يُوضّح بمثال'],['demonstrate','يُبرهن'],['indicate','يُشير إلى'],
 ['imply','يتضمّن'],['infer','يستدلّ'],['refer to','يُحيل إلى'],['quote','يقتبس'],
 ['cite','يستشهد'],['support an idea','يُعزّز فكرة'],['challenge a view','يُناقش رأياً'],['raise a point','يُثير نقطة'],
 ['draw a conclusion','يخلص إلى'],['provide evidence','يُقدّم دليلاً'],['make a case','يبني حجّة'],['present findings','يعرض النتائج'],
 ['outline','يُجمل'],['expand on','يُفصّل'],['revise a draft','يُنقّح مسوّدة'],['proofread','يُراجع لغويّاً'],
 ['submit','يُقدّم'],['deadline extension','تمديد الأجل'],['plagiarism','انتحال'],['originality','أصالة']]}
,

{u:10, t:'أفعالٌ مركّبةٌ شائعة', list:[
 ['give up','يتخلّى عن'],['carry on','يُواصل'],['put off','يُؤجّل'],['take over','يتولّى'],
 ['set up','يُنشئ'],['bring up','يُثير · يُربّي'],['look after','يرعى'],['look into','يبحث في'],
 ['run out of','ينفد منه'],['get on with','ينسجم مع'],['come across','يصادف'],['turn down','يرفض'],
 ['turn up','يحضر'],['work out','ينجح · يحسب'],['find out','يكتشف'],['point out','يُنبّه إلى'],
 ['break down','ينهار · يتعطّل'],['cut down on','يُقلّل من'],['keep up with','يُجاري'],['catch up with','يلحق بـ'],
 ['go through','يمرّ بـ'],['get over','يتجاوز'],['deal with','يُعالج'],['count on','يعتمد على'],
 ['stand for','يرمز إلى'],['make up','يختلق'],['take up','يبدأ هواية'],['put up with','يتحمّل']]},

{u:11, t:'سردُ الحياةِ والسيرة', list:[
 ['born in','وُلد في'],['raised in','نشأ في'],['move away','ينتقل بعيداً'],['settle down','يستقرّ'],
 ['get married','يتزوّج'],['bring up children','يُربّي أولاداً'],['start a career','يبدأ مسيرة'],['change jobs','يُغيّر عمله'],
 ['retire from','يتقاعد من'],['pass away','يتوفّى'],['generation gap','فجوة الأجيال'],['family tree','شجرة العائلة'],
 ['ancestor','سَلَف'],['descendant','سَليل'],['childhood home','بيت الطفولة'],['school years','سنو الدراسة'],
 ['first job','أوّل عمل'],['turning point','نقطة تحوّل'],['hard times','أوقات عصيبة'],['golden years','سنو العمر الجميلة'],
 ['look back','يسترجع'],['move on','يمضي قدماً'],['keep in touch','يبقى على اتّصال'],['lose touch','ينقطع'],
 ['make friends','يُصادق'],['fall out','يتخاصم'],['make up with','يُصالح'],['grow apart','يتباعدان']]},

{u:12, t:'الحجّةُ والنقاش', list:[
 ['argument for','حجّة مؤيّدة'],['argument against','حجّة معارضة'],['strong point','نقطة قوّة'],['weak point','نقطة ضعف'],
 ['on balance','في المحصّلة'],['to some extent','إلى حدٍّ ما'],['in contrast','في المقابل'],['similarly','وبالمثل'],
 ['furthermore','وعلاوةً'],['moreover','وفضلاً عن ذلك'],['nevertheless','ومع ذلك'],['despite this','رغم ذلك'],
 ['it is said that','يُقال إنّ'],['some people believe','يرى بعضهم'],['others argue','ويحتجّ آخرون'],['personally','شخصيّاً'],
 ['from my point of view','من وجهة نظري'],['as far as I know','على حدّ علمي'],['it seems to me','يبدو لي'],['I would say','أقول'],
 ['convincing','مُقنع'],['doubtful','مشكوك فيه'],['exaggerated','مُبالَغ فيه'],['realistic','واقعيّ'],
 ['practical','عمليّ'],['theoretical','نظريّ'],['relevant','ذو صلة'],['irrelevant','لا صلة له']]},

{u:13, t:'العاداتُ والحياةُ العصريّة', list:[
 ['lifestyle','نمط حياة'],['routine','روتين'],['balance','توازن'],['pressure','ضغط'],
 ['deadline stress','توتّر المواعيد'],['burn out','إنهاك'],['take a break','يأخذ استراحة'],['day off','يوم إجازة'],
 ['work from home','يعمل من البيت'],['commute','تنقّل يوميّ'],['rush hour','ساعة الذروة'],['overtime pay','أجر إضافيّ'],
 ['screen time','وقت الشاشة'],['social media','وسائل التواصل'],['online shopping','تسوّق إلكترونيّ'],['delivery app','تطبيق توصيل'],
 ['fast food','وجبات سريعة'],['home cooking','طبخ منزليّ'],['gym membership','اشتراك نادٍ'],['walking distance','مسافة مشي'],
 ['save time','يوفّر وقتاً'],['waste money','يُهدر مالاً'],['cut costs','يُقلّص نفقات'],['plan ahead','يُخطّط مقدّماً'],
 ['keep a diary','يُدوّن يوميّاته'],['set a goal','يضع هدفاً'],['stick to','يلتزم بـ'],['give in','يستسلم']]},

{u:14, t:'الوصفُ الموضوعيّ', list:[
 ['consist of','يتكوّن من'],['be made up of','يتألّف من'],['contain','يحتوي'],['include','يشمل'],
 ['be based on','يقوم على'],['be related to','يتّصل بـ'],['depend upon','يتوقّف على'],['result from','ينشأ عن'],
 ['be divided into','يُقسم إلى'],['be followed by','يَليه'],['take the form of','يأخذ شكل'],['be known as','يُعرف بـ'],
 ['be used for','يُستعمل لـ'],['be found in','يوجد في'],['be considered','يُعَدّ'],['be regarded as','يُنظر إليه بوصفه'],
 ['be described as','يُوصف بأنّه'],['be designed to','صُمّم لـ'],['be intended for','مُعَدٌّ لـ'],['be replaced by','يُستبدل بـ'],
 ['approximately equal','متساوٍ تقريباً'],['the same as','مثلَ'],['different from','مختلف عن'],['typical of','نموذجيّ لـ'],
 ['common to','مشترك بين'],['unique to','خاصّ بـ'],['in terms of','من حيث'],['with regard to','فيما يخصّ']]},

{u:12, t:'المشاعرُ المركّبة', list:[
 ['relief','ارتياح'],['anxiety','قلق'],['sympathy','تعاطف'],['pity','شفقة'],
 ['envy','حسد'],['pride','كبرياء'],['shame','خزي'],['guilt','ذنب'],
 ['courage','شجاعة'],['patience','صبر'],['curiosity','فضول'],['boredom','ملل'],
 ['loneliness','وحدة'],['comfort','سلوى'],['trust in','ثقة بـ'],['doubt about','شكّ في'],
 ['look forward to','يتطلّع إلى'],['be fed up with','يسأم من'],['be proud of','يفخر بـ'],['be ashamed of','يخجل من'],
 ['care about','يهتمّ بـ'],['worry about','يقلق على'],['complain about','يتذمّر من'],['apologise for','يعتذر عن'],
 ['blame for','يلوم على'],['thank for','يشكر على'],['forgive for','يصفح عن'],['congratulate on','يُهنّئ بـ']]}
,

{u:10, t:'المالُ والعملُ تفصيلاً', list:[
 ['bonus','علاوة'],['allowance','بدل'],['pension','معاش'],['tax return','إقرار ضريبيّ'],
 ['bank statement','كشف حساب'],['balance','رصيد'],['overdraft','سحب على المكشوف'],['instalment','قسط'],
 ['mortgage','رهن عقاريّ'],['landlord fee','أجر المالك'],['deposit money','عربون'],['receipt copy','نسخة إيصال'],
 ['annual','سنويّ'],['monthly','شهريّ'],['weekly','أسبوعيّ'],['hourly','بالساعة'],
 ['full-time','بدوام كامل'],['part-time','بدوام جزئيّ'],['freelance','عمل حرّ'],['self-employed','يعمل لحسابه']]},

{u:11, t:'الطعامُ والمطبخُ تفصيلاً', list:[
 ['ingredient list','قائمة المكوّنات'],['measure out','يَكيل'],['stir','يُقلّب'],['pour','يصبّ'],
 ['chop','يُقطّع'],['peel','يُقشّر'],['slice thinly','يُشرّح رقيقاً'],['season','يُتبّل'],
 ['simmer','يَغلي على نار هادئة'],['roast','يُحمّر في الفرن'],['steam','يُطهى بالبخار'],['serve hot','يُقدّم ساخناً'],
 ['leftovers','بقايا الطعام'],['portion','حصّة'],['flavour','نكهة'],['texture','قوام'],
 ['overcooked','مُفرَط الطهو'],['undercooked','غير ناضج'],['tasteless','بلا طعم'],['filling','مُشبِع']]},

{u:12, t:'التعليمُ والمهارات', list:[
 ['curriculum','منهج'],['syllabus','مقرّر'],['module','وحدة دراسيّة'],['assignment','تكليف'],
 ['coursework','أعمال الفصل'],['tutorial','حصّة إرشاديّة'],['seminar','حلقة نقاش'],['workshop session','جلسة ورشة'],
 ['peer','قرين'],['mentor','مُرشد'],['supervisor','مشرف'],['scholar','باحث'],
 ['distance learning','تعلُّم عن بُعد'],['self-study','دراسة ذاتيّة'],['group work','عمل جماعيّ'],['presentation skills','مهارات العرض'],
 ['time management','إدارة الوقت'],['note taking','تدوين الملحوظات'],['critical thinking','تفكير ناقد'],['problem solving','حلّ المشكلات']]},

{u:13, t:'النقلُ والمرور', list:[
 ['driving licence','رخصة قيادة'],['speed limit','حدّ السرعة'],['seat belt rule','قاعدة حزام الأمان'],['roundabout','دوّار'],
 ['junction','تقاطع'],['lane','حارة'],['motorway','طريق سريع'],['toll','رسم عبور'],
 ['traffic jam','اختناق مروريّ'],['diversion','تحويلة'],['roadworks','أعمال طريق'],['breakdown service','خدمة الأعطال'],
 ['insurance policy','وثيقة تأمين'],['registration','تسجيل'],['inspection','فحص فنّيّ'],['fuel consumption','استهلاك الوقود'],
 ['public transport','نقل عامّ'],['season ticket','اشتراك'],['timetable change','تغيير المواعيد'],['platform number','رقم الرصيف']]},

{u:14, t:'المراسلةُ الرسميّة', list:[
 ['Dear Sir','سيّدي المحترم'],['Yours faithfully','وتفضّلوا بقبول الاحترام'],['Yours sincerely','مع خالص التحيّة'],['subject line','سطر الموضوع'],
 ['reference number','رقم مرجعيّ'],['enclosed','مُرفق طيّه'],['further to','إلحاقاً بـ'],['with reference to','بالإشارة إلى'],
 ['I am writing to','أكتب إليكم لـ'],['I would be grateful','أكون ممتنّاً'],['please find attached','تجدون مرفقاً'],['look forward to hearing','أتطلّع إلى ردّكم'],
 ['apply in writing','يتقدّم كتابةً'],['submit an application','يُقدّم طلباً'],['acknowledge receipt','يُقرّ بالاستلام'],['respond within','يردّ خلال'],
 ['on behalf of','نيابةً عن'],['to whom it may concern','إلى من يهمّه الأمر'],['sign and date','وقّع وأرّخ'],['official stamp','ختم رسميّ'],
 ['valid until','صالح حتّى'],['issued by','صادر عن'],['required documents','المستندات المطلوبة'],['processing time','مدّة المعالجة'],
 ['approved','مُعتمَد'],['rejected','مرفوض'],['pending','قيد النظر'],['under review','قيد المراجعة']]}
,

{u:10, t:'المواعيدُ والترتيبُ الدقيق', list:[
 ['in advance of','قُبيل'],['ahead of time','قبل الموعد'],['at short notice','بإخطار قصير'],['without delay','دون إبطاء'],
 ['on a daily basis','يوميّاً'],['round the clock','على مدار الساعة'],['in due course','في حينه'],['at the latest','على أقصى تقدير'],
 ['no later than','في موعد أقصاه'],['as scheduled','حسب الجدول'],['behind schedule','متأخّر عن الجدول'],['ahead of schedule','متقدّم على الجدول'],
 ['first thing','أوّل شيء'],['last thing','آخر شيء'],['in the meantime','في غضون ذلك'],['from then on','منذ ذلك الحين'],
 ['up to now','حتّى اللحظة'],['by the time','حين يحلّ'],['once and for all','مرّةً وإلى الأبد'],['over and over','مراراً']]}
];
