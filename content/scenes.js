/* مشاهد المحادثة الحيّة: جملة المحاور، وregex للإجابة المقبولة، والإجابة النموذجية. */

export const SCENES=[
{t:'التعارف',turns:[
{p:"Hi! I'm Sara. What's your name?",need:/name|i am|i'm|my name/i,model:'My name is Ahmed.'},
{p:'Nice to meet you! Where are you from?',need:/from/i,model:'I am from Egypt.'},
{p:'Oh, really? What do you do?',need:/i am|i'm|i work|i study|student|teacher|engineer|doctor|nurse|driver|manager/i,model:'I am a teacher.'},
{p:'That sounds interesting! Do you like your job?',need:/yes|no|like|love|enjoy|hate|don't|do not/i,model:'Yes, I like it very much.'}]},
{t:'المطعم',turns:[
{p:'Welcome! What would you like to order?',need:/like|want|have|please|can i/i,model:'I would like a salad, please.'},
{p:'Would you like something to drink?',need:/yes|no|water|juice|tea|coffee|drink|thanks|thank you/i,model:"No, thanks. I don't want a drink."},
{p:'Do you want it here or to go?',need:/here|go|take|away|stay/i,model:'Here, please. Thank you.'}]},
{t:'درس 1.1: هل أنت طالب؟',les:'1.1',turns:[
{p:'Hi! Are you a student?',need:/yes|no|i am|i'm|not/i,model:'Yes, I am a student.'},
{p:'Is your friend a student too?',need:/yes|no|he is|she is|he's|she's|not/i,model:'Yes, he is a student.'},
{p:'Are you and your friends at school today?',need:/yes|no|we are|we're|i am|i'm|not/i,model:'Yes, we are at school today.'}]},
{t:'درس 1.2: من هذا؟',les:'1.2',turns:[
{p:'Who is that man over there?',need:/he is|he's|that is|that's|he|my/i,model:'He is my brother.'},
{p:'Is he a student?',need:/yes|no|he is|he's|not|isn't/i,model:'No, he is not a student. He is a teacher.'},
{p:'Is your sister a teacher too?',need:/yes|no|she is|she's|not/i,model:'Yes, she is a teacher too.'}]},
{t:'درس 1.3: أسئلة وأجوبة',les:'1.3',turns:[
{p:'Are you ready for the test?',need:/yes|no|i am|i'm|not/i,model:'Yes, I am ready.'},
{p:'Is your room clean?',need:/yes|no|it is|it's|not/i,model:'Yes, it is clean.'},
{p:'Are your friends coming to the party?',need:/yes|no|they are|they're|not/i,model:'Yes, they are coming.'}]},
{t:'درس 2.1: روتينك اليومي',les:'2.1',turns:[
{p:'What do you do in the morning?',need:/i |i'm|work|go|study|wake|drink|eat|have|usually/i,model:'I wake up early and drink coffee.'},
{p:'Do you work or study?',need:/work|study|both|i am|yes|no/i,model:'I work in an office.'},
{p:'Where do you go on weekends?',need:/go|visit|stay|home|park|friends/i,model:'I usually visit my friends.'}]},
{t:'درس 2.2: أخبرني عن أهلك',les:'2.2',turns:[
{p:'Tell me about your family. Do you have a brother?',need:/yes|no|have|i have|don't/i,model:'Yes, I have a brother.'},
{p:'What does your brother do?',need:/he |works|studies|plays|goes|teaches|is a|my brother/i,model:'He works in a bank.'},
{p:'Does your sister live here too?',need:/yes|no|she|lives|doesn't/i,model:'No, she lives in another city.'}]},
{t:'درس 2.3: ماذا لا تفعل؟',les:'2.3',turns:[
{p:'Do you like fish?',need:/no|yes|i don't|i do|don't|do/i,model:"No, I don't like fish."},
{p:'Does your brother drink coffee?',need:/no|yes|he doesn't|he does|doesn't|does/i,model:"No, he doesn't drink coffee."},
{p:'Do you and your friends play football?',need:/yes|no|we|don't|do/i,model:"No, we don't play football."}]},
{t:'درس 3.1: في المقهى',les:'3.1',turns:[
{p:'What would you like to drink?',need:/a |an |coffee|tea|juice|water|please|like/i,model:'I would like a coffee, please.'},
{p:'Would you like a sandwich too?',need:/yes|no|a |an |sandwich|thanks/i,model:'Yes, I would like a sandwich, please.'},
{p:'Anything else?',need:/no|thanks|nothing|that's all|that is all|apple|a /i,model:"No, thanks. That is all."}]},
{t:'درس 3.2: في الشارع',les:'3.2',turns:[
{p:'Excuse me, where is the post office?',need:/it is|it's|next|near|on|across|straight|left|right|there/i,model:'It is across from the bank.'},
{p:'Is it far from here?',need:/yes|no|far|close|near|not/i,model:'No, it is very close.'},
{p:'Thanks! Is the bank open today?',need:/yes|no|it is|it's|open|not/i,model:'Yes, it is open today.'}]},
{t:'درس 3.3: في البيت',les:'3.3',turns:[
{p:'Is there a bank near here?',need:/yes|no|there is|there's|there are|not/i,model:'Yes, there is a bank on the corner.'},
{p:'Are there any restaurants near the bank?',need:/yes|no|there are|there is|there's|not/i,model:'Yes, there are two restaurants.'},
{p:'Is there a pharmacy too?',need:/yes|no|there is|there's|not/i,model:'No, there is not a pharmacy here.'}]},
{t:'الاتجاهات',turns:[
{p:'Excuse me, where is the bank?',need:/it is|it's|there|next|near|across|left|right|straight|corner|on the/i,model:'It is next to the park.'},
{p:'Is it far from here?',need:/yes|no|far|close|near|walk|minutes|not/i,model:'No, it is very close.'},
{p:'Thanks a lot! Have a nice day.',need:/thank|you too|bye|same|nice/i,model:'Thank you, you too!'}]}
];
