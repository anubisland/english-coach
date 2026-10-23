/* محرّك التصحيح بالقواعد. كل قاعدة لها re للكشف، وf للإصلاح، وar للشرح،
   وrid يربطها ببطاقة الشرح الكاملة. */

export function base(v){if(/ies$/.test(v))return v.replace(/ies$/,'y');if(/(sses|shes|ches|xes|oes)$/.test(v))return v.replace(/es$/,'');if(/s$/.test(v))return v.slice(0,-1);return v}
export function s3(v){if(v==='have')return 'has';if(v==='do')return 'does';if(/[^aeiou]y$/.test(v))return v.slice(0,-1)+'ies';if(/(s|sh|ch|x|o)$/.test(v))return v+'es';return v+'s'}

export const GR=[
{re:/\bi is\b/gi,f:()=>'I am',rid:'be-subject',ar:'مع I نستخدم am وليس is'},
{re:/\b(he|she|it) are\b/gi,f:(m,p)=>p+' is',rid:'be-subject',ar:'مع he / she / it نستخدم is وليس are'},
{re:/\b(we|you|they) is\b/gi,f:(m,p)=>p+' are',rid:'be-subject',ar:'مع we / you / they نستخدم are وليس is'},
{re:/\bthere is (two|three|four|five|many|some|several)\b/gi,f:(m,n)=>'there are '+n,rid:'there-is-are',ar:'مع الجمع نستخدم there are'},
{re:/\bthere are (a|an|one)\b/gi,f:(m,n)=>'there is '+n,rid:'there-is-are',ar:'مع المفرد نستخدم there is'},
{re:/\bin my home\b/gi,f:()=>'at home',ar:'نقول at home وليس in my home'},
{re:/(?<!\b(?:does|do|don't|doesn't|did) )\b(he|she|it) (go|like|work|study|live|stay|watch|play|want|need|speak|know|think|have|do|read|write|drink|eat|wake|get|come)\b/gi,f:(m,p,v)=>p+' '+s3(v.toLowerCase()),rid:'present-s',ar:'مع he / she / it نضيف s للفعل'},
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
{re:/\bi very\b/gi,f:()=>'I am very',ar:'بعد I نحتاج فعلاً، مثل I am very'},
{re:/\bmore better\b/gi,f:()=>'better',ar:'better وحدها تكفي بدون more'},
{re:/\bwhat you do\b/gi,f:()=>'what do you do',rid:'present-base',ar:'في السؤال نحتاج do: what do you do?'},
{re:/\bwhere you from\b/gi,f:()=>'where are you from',rid:'be-question',ar:'في السؤال نحتاج are: where are you from?'},
{re:/\bwhat your name\b/gi,f:()=>'what is your name',rid:'be-question',ar:'نقول what is your name?'}
];
export function fixText(t){let o=t;GR.forEach(r=>{o=o.replace(r.re,r.f)});return o.charAt(0).toUpperCase()+o.slice(1)}
export function checkGrammar(t){const out=[];GR.forEach(r=>{if(new RegExp(r.re.source,'i').test(t)&&!out.some(x=>x.ar===r.ar))out.push({ar:r.ar,rid:r.rid})});return out}
