/* بنك الأصوات: ما يصعب على المتعلّم العربي في الإنجليزية، ولماذا.

   كل صوت فيه:
     test   متى نشكّ أن الكلمة تحمل هذا الصوت
     t      اسم الصوت كما يُعرض
     why    سبب الصعوبة من منظور العربية — لا وصف عام
     fix    ماذا تفعل بفمك ولسانك بالضبط
     pairs  أزواج صغرى: كلمتان لا تختلفان إلا في هذا الصوت.
            هي أصدق تدريب، لأن الخطأ فيها يغيّر الكلمة لا لكنتها.
     bad    الخطأ الشائع، لنُسمّيه للمتعلّم بدل «نطقك غير دقيق»

   المصدر: أنماط التداخل المعروفة بين العربية والإنجليزية. */
/* الكلمات التي th فيها مجهورة. تُستثنى من المهموس، وإلا نُصح المتعلّم على
   كلمة واحدة بنصيحتين متناقضتين — «انفخ بلا صوت» و«أخرج صوتاً» معاً — وحُسب
   خطؤه فيها مرّتين فتصدّر th قائمة المشتبه بهم بلا وجه حق. */
const TH_VOICED = /^(this|that|these|those|the|they|them|then|there|their|theirs|than|other|another|others|father|mother|brother|weather|together|either|neither|breathe|although|though|rather|with|without|clothes)$/i;

export const SOUNDS = [
  {id:'p', t:'الصوت p', test:/p/i,
   why:'العربية ليس فيها صوت p إطلاقاً، فيستبدله المتعلّم بـ b تلقائياً — وهو أشهر ما يُعرف به المتحدّث العربي.',
   fix:'أطبق شفتيك كأنك تقول «ب»، لكن احبس الهواء ثم أطلقه **دفعة واحدة بلا صوت من الحلق**. ضع ورقة أمام فمك: يجب أن تهتزّ مع p ولا تهتزّ مع b.',
   bad:'يُنطق b',
   pairs:[['pen','Ben'],['pat','bat'],['cap','cab'],['pig','big'],['rope','robe'],['pear','bear']]},

  {id:'v', t:'الصوت v', test:/v/i,
   why:'لا وجود لـ v في العربية، فيُنطق f أو و. و«very» تصير «fery».',
   fix:'ضع أسنانك العليا على شفتك السفلى — نفس وضع f تماماً — لكن **أخرج صوتاً من حلقك** معها. ضع يدك على حنجرتك: تهتزّ مع v ولا تهتزّ مع f.',
   bad:'يُنطق f',
   pairs:[['very','ferry'],['van','fan'],['vine','fine'],['leave','leaf'],['save','safe'],['vest','best']]},

  {id:'th-voiceless', t:'الصوت th المهموس (think)',
   test:/^(?!(?:this|that|these|those|the|they|them|then|there|their|theirs|than|other|another|others|father|mother|brother|weather|together|either|neither|breathe|although|though|rather|with|without|clothes)$)\w*th/i,
   why:'قريب من الثاء العربية لكنه ليس إياها تماماً، وكثيرون يستبدلونه s أو t فتصير «think» إما «sink» أو «tink».',
   fix:'أخرج **طرف لسانك قليلاً بين أسنانك** وانفخ بهدوء بلا صوت من الحلق. إن لم يلمس لسانك أسنانك فأنت تقول s.',
   bad:'يُنطق s أو t',
   pairs:[['think','sink'],['thin','sin'],['three','tree'],['path','pass'],['mouth','mouse'],['thick','sick']]},

  {id:'th-voiced', t:'الصوت th المجهور (this)', test:TH_VOICED,
   why:'نفس وضع الذال العربية، لكنه يأتي في كلمات شديدة الشيوع (this, the, they) فيُسمع الخطأ فيه كثيراً، ويُستبدل d فتصير «dis».',
   fix:'طرف اللسان بين الأسنان كما في think، لكن **مع صوت من الحلق**. جرّب: ضع يدك على حنجرتك وقل this — يجب أن تهتزّ من أول حرف.',
   bad:'يُنطق d أو z',
   pairs:[['they','day'],['then','den'],['breathe','breed'],['other','udder'],['those','doze'],['that','dat']]},

  {id:'ng', t:'الصوت ng', test:/ng\b|ng[^aeiou]/i,
   why:'العربية تنطق النون ثم الجيم منفصلتين، فتصير «sing» وكأنها «sing-g». والصوت الإنجليزي واحد لا اثنان.',
   fix:'ارفع **مؤخّرة لسانك** إلى سقف الحلق كأنك ستقول g، لكن أخرج الصوت من أنفك ولا تُطلق الجيم. قل «سِنـ» ثم أغلق الحلق بلا جيم.',
   bad:'تُضاف g في الآخر',
   pairs:[['sing','sin'],['thing','thin'],['ring','rin'],['long','lon'],['bring','brin'],['song','son']]},

  {id:'cluster', t:'تجمّع السواكن في أول الكلمة', test:/^(st|sp|sk|sc|str|spr|scr|spl|sl|sm|sn|sw|tw)/i,
   why:'العربية لا تبدأ كلمةً بساكنين، فيُدخل المتعلّم حركة قبلها أو بينها: «street» تصير «istreet» أو «siteret».',
   fix:'ابدأ بالسين مباشرة والصق بها الحرف التالي **بلا أي حركة بينهما**. تمرين: قل الكلمة بطيئاً جداً مع إبقاء الشفتين متهيّئتين للحرف الثاني من البداية.',
   bad:'تُضاف حركة في الأول أو بين الحرفين',
   pairs:[['street','estreet'],['spring','esipring'],['school','eschool'],['stop','estop'],['speak','espeak'],['small','esmall']]},

  {id:'silent', t:'الحروف الصامتة', test:/\b(know|knife|knee|write|wrong|hour|honest|island|listen|castle|half|talk|walk|could|would|should|climb|thumb|debt|doubt)\b/i,
   why:'العربية تنطق كل حرف مكتوب، فيميل المتعلّم إلى نطق الحروف الصامتة: «know» تصير «كنو»، و«hour» تصير «هاور».',
   fix:'هذه الكلمات تُحفظ بصوتها لا بشكلها. اسمعها ثم كرّرها بلا النظر إلى كتابتها.',
   bad:'يُنطق الحرف الصامت',
   pairs:[['know','no'],['hour','our'],['write','right'],['knight','night'],['whole','hole'],['two','too']]},

  {id:'vowel-i', t:'الفرق بين ship و sheep', broad:true,
   test:/\b(ship|sheep|live|leave|sit|seat|bit|beat|fill|feel|these|slip|sleep|bin|bean|hill|heal|rich|reach)\b/i,
   why:'العربية تميّز الكسرة القصيرة من الطويلة، لكن المتعلّم يخلط بين /ɪ/ و/iː/ في الإنجليزية فتختلط «ship» بـ«sheep» و«live» بـ«leave».',
   fix:'القصيرة /ɪ/ فمها أكثر انفتاحاً وأقصر زمناً، والطويلة /iː/ تمدّ الشفتين إلى الجانبين كأنك تبتسم. امدد الطويلة ضعف القصيرة.',
   bad:'تُخلط القصيرة بالطويلة',
   pairs:[['ship','sheep'],['live','leave'],['sit','seat'],['bit','beat'],['fill','feel'],['this','these']]},

  {id:'vowel-ae', t:'الصوت æ في cat', broad:true,
   test:/\b(cat|cut|bad|bed|man|men|hat|hot|sat|set|bag|beg|bat|bet|ran|run|had|head|match|much|sad|said)\b/i,
   why:'لا مقابل له في العربية: ليس فتحة ولا كسرة، فيُنطق فتحة فتصير «cat» قريبة من «cot».',
   fix:'افتح فمك كأنك تقول «آ» ثم **افرد شفتيك إلى الجانبين** قليلاً في الوقت نفسه. الصوت بين الفتحة والكسرة.',
   bad:'يُنطق فتحة عادية',
   pairs:[['cat','cut'],['bad','bed'],['man','men'],['hat','hot'],['sat','set'],['bag','beg']]},

  {id:'r', t:'الصوت r الإنجليزي', broad:true,
   test:/\b(red|rice|right|rock|free|pray|very|sorry|world|water|road|really|problem|try|great|street)\b/i,
   why:'الراء العربية مكرّرة يرتجف فيها طرف اللسان، والإنجليزية لا ارتجاف فيها إطلاقاً.',
   fix:'ارفع طرف لسانك نحو سقف الحلق **دون أن يلمسه ودون أن يرتجف**، واجمع شفتيك قليلاً. الصوت أقرب إلى «و» منه إلى الراء العربية.',
   bad:'راء مكرّرة',
   pairs:[['red','led'],['rice','lice'],['right','light'],['rock','lock'],['free','flee'],['pray','play']]}
];

export const SOUND = Object.fromEntries(SOUNDS.map(s => [s.id, s]));
