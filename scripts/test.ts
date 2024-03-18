const context = `'ContactEducationaaryanpatel683@gmail.comEmailKhargone, MP, Indiahttps://developeraaryan.meAddressPortfolioAaryan PatelF u l l   S t a c k   D e v e l o p e rA Full stack developer with experience in full-stack development and mastery of the MERN stack.Completed 2 full-stack development internships and self-taught through hands-on experience andself-directed learning. Confident in their abilities and eager for new challenges.ExperienceProjectsHere I build the Stackoverflow clone website, where I integrate a chatbot that answers allprogramming  questions  and  build  a  social  community  for  StackOverflow  users  to  postimages and videos.I  learned  so  much  during  the  internship  and  after  completing  all  the  tasks  I  also  gotstipend.A website that contains the tools for the developers and ai tools.A website for my college where we can find easily our class notes, assignment, practical\n' +
'\n' +
'stipend.A website that contains the tools for the developers and ai tools.A website for my college where we can find easily our class notes, assignment, practicaland many more, and also can upload so we couldn\'t store files in mobile and get easily. Ibuild this website using Mern Stack and FirebaseI  made  a  e-commerce  website  for  a  local  shop  red  chili  masala.  This  website  is  createdusing Next.js and integrate payment method using Stripe.Intern - Full stack developerMetaSourceApniclassMadhav MasalaDec 2022 - Jan 2023Nullclasshttps://metasource.vercel.apphttps://apniclass.livehttps://madhavmasaala.vercel.appJawaharlal Institute of Technology,BorawanYoutubeB.Tech. - I.T. ( 2nd year )Full Stack Development2021 - 20252020 - ∞ReactHTML, CSSNextJSJavascriptPythonNodeJsHindiEnglishSkillsLanguageHere my work is to build an educational website for online courses and as long as to build\n' +
'\n' +
'2021 - 20252020 - ∞ReactHTML, CSSNextJSJavascriptPythonNodeJsHindiEnglishSkillsLanguageHere my work is to build an educational website for online courses and as long as to buildAI  apps  using  Langchain  and  Vercel  AI  SDK,  It  is  a  paid  internship  that  I  got  frominternshala platform.Intern - NextJs developerAug 2023 - Nov 2023Intellifythis  is  an  AI  chatbot  that  is  trained  on  Ayurveda  data  just  like  chatgpt,  build  it  usingNextJs, Langchain and Vercel AI SDK.Ayurveda GPThttps://ayurvedagpt.vercel.app'`;

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  apiKey: "AIzaSyCOpJ-XDqUgQOlRs5UfjTg6QtdBMYxegWw",
});

const ANSWER_TEMPLATE = `Give the answer of the question from the given context, If you can't find the answer from the context then try to make the answer based on the context else say 'Sorry, I can't find the answer'.\n
context: ${context}
conversation history: []
question: 'who is aaryan?'
answer: `;

// Batch and stream are also supported
model
  .invoke([["user", ANSWER_TEMPLATE]])
  .then((res: any) => {
    console.log(res);
  })
  .catch((err: any) => {
    console.log(err);
  });
