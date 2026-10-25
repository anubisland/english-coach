/* محرّك التصحيح بالقواعد. كل قاعدة لها re للكشف، وf للإصلاح، وar للشرح،
   وrid يربطها ببطاقة الشرح الكاملة. */

export function base(v){if(/ies$/.test(v))return v.replace(/ies$/,'y');if(/(sses|shes|ches|xes|oes)$/.test(v))return v.replace(/es$/,'');if(/s$/.test(v))return v.slice(0,-1);return v}
export function be(p){const x=p.toLowerCase();return x==='i'?'am':/^(he|she|it)$/.test(x)?'is':'are'}
export function s3(v){if(v==='have')return 'has';if(v==='do')return 'does';if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ies';if(/(s|sh|ch|x|o)$/.test(v))return v+'es';return v+'s'}

const IRREG={"childs":"children","mans":"men","womans":"women","foots":"feet","tooths":"teeth","persons":"people","mouses":"mice"};

export const GR=[
{re:/\bi is\b/gi,f:()=>'I am',rid:'be-subject',ar:'مع I نستخدم am وليس is'},
{re:/\b(he|she|it) are\b/gi,f:(m,p)=>p+' is',rid:'be-subject',ar:'مع he / she / it نستخدم is وليس are'},
{re:/\b(we|you|they) is\b/gi,f:(m,p)=>p+' are',rid:'be-subject',ar:'مع we / you / they نستخدم are وليس is'},
{re:/\bthere is (two|three|four|five|many|some|several)\b/gi,f:(m,n)=>'there are '+n,rid:'there-is-are',ar:'مع الجمع نستخدم there are'},
{re:/\bthere are (a|an|one)\b/gi,f:(m,n)=>'there is '+n,rid:'there-is-are',ar:'مع المفرد نستخدم there is'},
{re:/\bin my home\b/gi,f:()=>'at home',ar:'نقول at home وليس in my home'},
{re:/(?<!\b(?:does|do|don't|doesn't|did|can|can't|could|will|won't|would|should|must|may|might|shall|let|to) )\b(he|she|it) (go|like|work|study|live|stay|watch|play|want|need|speak|know|think|have|do|read|write|drink|eat|wake|get|come)\b/gi,f:(m,p,v)=>p+' '+s3(v.toLowerCase()),rid:'present-s',ar:'مع he / she / it نضيف s للفعل'},
{re:/\b(i|you|we|they) (goes|likes|works|studies|lives|stays|watches|plays|wants|needs|speaks|knows|thinks|has|does|reads|writes|drinks|eats|wakes|gets|comes)\b/gi,f:(m,p,v)=>p+' '+base(v.toLowerCase()),rid:'present-base',ar:'مع I / you / we / they لا نضيف s للفعل'},
{re:/\bdon't (he|she|it)\b/gi,f:(m,p)=>"doesn't "+p,rid:'present-neg',ar:"مع he / she / it نستخدم doesn't"},
{re:/\bdoesn't (i|you|we|they)\b/gi,f:(m,p)=>"don't "+p,rid:'present-neg',ar:"مع I / you / we / they نستخدم don't"},
{re:/\bdoes (i|you|we|they) /gi,f:(m,p)=>'do '+p+' ',rid:'present-neg',ar:'مع I / you / we / they نستخدم do في السؤال'},
{re:/\bdoes (he|she|it) (\w+s)\b/gi,f:(m,p,v)=>'does '+p+' '+base(v.toLowerCase()),rid:'present-neg',ar:'بعد does نستخدم الفعل بدون s'},
{re:/\bdo (he|she|it) /gi,f:(m,p)=>'does '+p+' ',rid:'present-neg',ar:'مع he / she / it نستخدم does في السؤال'},
{re:/\ba (?!(?:university|user|one|useful|unique|european|eu)\b)(?=[aeiou])/gi,f:()=>'an ',rid:'article-a-an',ar:'نستخدم an قبل الكلمة التي تبدأ بحرف متحرك'},
{re:/\ban (?=[bcdfgjklmnpqrstvwxyz])/gi,f:()=>'a ',rid:'article-a-an',ar:'نستخدم a قبل الكلمة التي تبدأ بحرف ساكن'},
{re:/\bi am agree\b/gi,f:()=>'I agree',ar:'نقول I agree بدون am'},
{re:/\bi am like\b/gi,f:()=>'I like',ar:'نقول I like بدون am'},
{re:/(?<!\b(?:is|was|are|were|got|get|take|took|hear|heard|away|apart|aside|and|or)\s)\b(i|we|they|he|she) from\b/gi,f:(m,p)=>p+' '+be(p)+' from',rid:'be-subject',ar:'قبل from نحتاج فعل الكينونة: I am from Egypt'},
{re:/\bi very\b/gi,f:()=>'I am very',ar:'بعد I نحتاج فعلاً، مثل I am very'},
{re:/\bmore better\b/gi,f:()=>'better',ar:'better وحدها تكفي بدون more'},
{re:/\bwhat you do\b/gi,f:()=>'what do you do',rid:'present-base',ar:'في السؤال نحتاج do: what do you do?'},
{re:/\bwhere you from\b/gi,f:()=>'where are you from',rid:'be-question',ar:'في السؤال نحتاج are: where are you from?'},
{re:/\bwhat your name\b/gi,f:()=>'what is your name',rid:'be-question',ar:'نقول what is your name?'},

/* أخطاء المستوى الأول التي كان المحرّك يمرّرها صامتاً، وهي أكثر ما يقع فيه
   المتعلّم العربي: «I healthy» و«I have bad headache» و«she dont like».
   مرورها كان يجعل اختبار المحادثة يقول «متمكّن» لمن لا يُتقن، فيسقط معناه.

   وكل قاعدة هنا ضيّقة عمداً — قائمة كلمات مغلقة لا نمط عام — لأن الإنذار
   الكاذب أسوأ من الصمت: الصمت يفوّت خطأً، والإنذار الكاذب يُعلّم خطأً. */
{re:/(?<!\b(?:am|is|are|was|were|be|been|feel|feels|look|looks|get|gets|got|very|so|too|not|and|or|but|that|if|when)\s)\b(i|we|they|he|she|it) (happy|sad|tired|ready|fine|healthy|hungry|thirsty|late|early|busy|sick|ill|angry|afraid|sure|married|student|teacher|doctor|engineer|nurse|driver)\b/gi,f:(m,p,w)=>p+' '+be(p)+' '+w,rid:'be-subject',ar:'الجملة بلا فعل كينونة: نحتاج am / is / are'},
{re:/\b(we|you|they|he|she|it) am\b/gi,f:(m,p)=>p+' '+be(p),rid:'be-subject',ar:'am لا تأتي إلا مع I'},
{re:/\b(doesn't|does not|don't|do not|didn't|did not) (\w+(?:ies|es|s))\b/gi,f:(m,n,v)=>n+' '+base(v.toLowerCase()),rid:'present-neg',ar:'بعد أداة النفي يبقى الفعل مجرّداً بلا s'},
{re:/\b(stud|tr|cr|fl|carr|marr|worr|hurr|cop|appl|repl|suppl)ys\b/gi,f:(m,r)=>r+'ies',rid:'present-s',ar:'الفعل المنتهي بـ y بعد ساكن يصير ies لا ys'},
{re:/\b(he|she|it) (?:don't|dont)\b/gi,f:(m,p)=>p+" doesn't",rid:'present-neg',ar:"مع he / she / it نستخدم doesn't"},
{re:/\b(i|you|we|they) (?:doesn't|doesnt)\b/gi,f:(m,p)=>p+" don't",rid:'present-neg',ar:"مع I / you / we / they نستخدم don't"},
{re:/\b(dont|doesnt|didnt|isnt|arent|wasnt|cant|wont|havent|hasnt|im|youre|theyre)\b/gi,f:m=>({dont:"don't",doesnt:"doesn't",didnt:"didn't",isnt:"isn't",arent:"aren't",wasnt:"wasn't",cant:"can't",wont:"won't",havent:"haven't",hasnt:"hasn't",im:"I'm",youre:"you're",theyre:"they're"})[m.toLowerCase()],ar:'الاختصار يحتاج فاصلة عليا: don’t لا dont'},
{re:/\bi am (go|work|study|live|want|need|have|like|eat|drink|play|read|write|speak|know|come|stay)\b/gi,f:(m,v)=>'I '+v,rid:'present-base',ar:'بعد am لا يأتي فعل مجرّد: قل I go لا I am go'},
{re:/\b(have|has|want|wants|need|needs|buy|see)\s+((?:bad|good|big|small|new|old|nice|long|short|young|free)\s+)?(headache|car|book|pen|bag|house|room|job|problem|question|brother|sister|friend|dog|cat|phone|ticket|appointment|fever|meeting|shower|idea|minute|seat|bottle|table)\b/gi,f:(m,v,adj,n)=>v+' '+(/^[aeiou]/i.test(adj||n)?'an ':'a ')+(adj||'')+n,rid:'article-a-an',ar:'الاسم المفرد المعدود يحتاج a أو an قبله'},
{re:/\bi have (\d+) years?\b/gi,f:(m,n)=>'I am '+n+' years old',ar:'العمر: I am 20 years old لا I have 20 years'},
{re:/\bto (goes|works|likes|studies|wants|needs|lives|eats|drinks|comes|gets|makes|takes)\b/gi,f:(m,v)=>'to '+base(v.toLowerCase()),rid:'present-base',ar:'بعد to يأتي الفعل مجرّداً بلا s'},
{re:/\b(peoples|informations|advices|moneys|furnitures|homeworks|luggages)\b/gi,f:m=>m.toLowerCase().slice(0,-1),ar:'هذه الأسماء لا تُجمع: people وinformation بلا s'},
/* قواعد الوحدة الرابعة: الجمع، والملكية، والإشارة، و have got. */
{re:/\b(child|man|woman|foot|tooth|person|mouse)s\b/gi,f:m=>IRREG[m.toLowerCase()]||m,rid:'plural',ar:'جمع شاذّ: child → children و man → men، ولا يُجمع بـ s'},
{re:/\b(two|three|four|five|six|seven|eight|nine|ten|many|several|both)\s+(brother|sister|book|car|friend|student|teacher|room|day|week|year|hour|house|shop|thing|place|word|question|box|city|watch|dish|bus|baby|country|boy|key|phone|bag|chair|shoe|photo|dog|cat|table|window|door|street|office|school|letter|minute|month|idea|problem)\b/gi,f:(m,n,w)=>n+' '+w+(/(s|sh|ch|x)$/i.test(w)?'es':/[^aeiou]y$/i.test(w)?w.slice(-1)&&'':'s'),rid:'plural',ar:'العدد أكبر من واحد فيلزم الجمع'},
{re:/\bthis\s+are\b/gi,f:()=>'These are',rid:'demonstrative',ar:'this للمفرد؛ ومع الجمع نقول These are'},
{re:/\bthat\s+are\b/gi,f:()=>'Those are',rid:'demonstrative',ar:'that للمفرد؛ ومع الجمع نقول Those are'},
{re:/\b(this|that)\s+([a-z]+s)\s+(are|were)\b/gi,f:(m,d,n,v)=>(d.toLowerCase()==='this'?'These':'Those')+' '+n+' '+v,rid:'demonstrative',ar:'الاسم جمع فتلزم الإشارة الجمع: these أو those'},
{re:/\b(these|those)\s+([a-z]+[^s\W])\s+(is|was)\b/gi,f:(m,d,n,v)=>d+' '+n+'s '+(v.toLowerCase()==='is'?'are':'were'),rid:'demonstrative',ar:'these و those للجمع: يُجمع الاسم ويصير الفعل are'},
{re:/\b(do|does|did)\s+(i|you|we|they|he|she|it)\s+have\s+got\b/gi,f:(m,d,p)=>(/^(he|she|it)$/i.test(p)?'Has ':'Have ')+p+' got',rid:'have-got',ar:'السؤال بـ have got يُقلب بلا do'},
{re:/\bis\s+(me|him|them|us)\s+(book|car|bag|house|phone|friend|name|room|idea|turn|seat|sister|brother|school|office|father|mother|son|daughter|wife|husband|job|address|family|teacher|doctor|boss|city|town|street|shop|keys|money|work)\b/gi,f:(m,p,n)=>'is '+({me:'my',him:'his',them:'their',us:'our'})[p.toLowerCase()]+' '+n,rid:'possessive',ar:'قبل الاسم نستخدم صفة الملكية: my لا me'},
{re:/\bthe\s+(my|your|his|her|our|their)\b/gi,f:(m,p)=>p,rid:'possessive',ar:'صفة الملكية تُغني عن the فلا تجتمعان'},
{re:/\bthe most (\w+est)\b/gi,f:(m,w)=>'the '+w,ar:'لا نجمع most مع est: the biggest لا the most biggest'}
];
export function fixText(t){let o=t;GR.forEach(r=>{o=o.replace(r.re,r.f)});return o.charAt(0).toUpperCase()+o.slice(1)}
export function checkGrammar(t){const out=[];GR.forEach(r=>{if(new RegExp(r.re.source,'i').test(t)&&!out.some(x=>x.ar===r.ar))out.push({ar:r.ar,rid:r.rid})});return out}
