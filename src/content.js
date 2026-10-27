// Everything participants read. Replace the [PLACEHOLDER] text.
//
// Agent messages are keyed first by the AGENTS' verdict, then by the
// PARTICIPANT's verdict: agent_messages.YTA.ESH.Cody is what Cody says when he
// argues YTA to someone who said ESH. Which verdict the agents argue:
//   participant YTA -> agents NTA
//   participant NTA -> agents YTA
//   participant ESH or NAH -> agents YTA or NTA, 50/50 at random
// So each agent has three explanations for YTA and three for NTA, per post.

// "intro" is what each agent says when introducing themselves at the start of the chat.
const AGENTS = [
  { name: "Cody",   color: "#7b9bd1", intro: "Hi everyone, my name is Cody. Nice to meet you!" },
  { name: "Bella",  color: "#8fbf9a", intro: "Hey! I'm Bella. Looking forward to chatting with you all." },
  { name: "Nathan", color: "#d4a95f", intro: "Hello, I'm Nathan. Glad to be here." },
  { name: "Zoe",    color: "#b98cc0", intro: "Hi, I'm Zoe! Nice to meet you." },
  { name: "Mario",  color: "#d9897a", intro: "Hi all, Mario here. Great to meet everyone." },
];

const HOST = { name: "Host", color: "#333333" };

const POSTS = {
  A: {
    title: "AITA for telling a mother that maybe her teenage son needs to toughen up?",
    body: `<p>Earlier in the week the mother of one of my son’s classmates came over to discuss a problem between our boys. I guess my son has been telling her son that he stinks, is gross, and so on. I told her I would talk to my son about it and we exchanged numbers in case there were any other problems.

I talked to my son and he didn’t deny it. He says the boy does smell really bad and is assigned to sit next to him in one of their classes. I told him to just try to ignore it and just stay away from him otherwise.

Last night I got a call from the classmate’s mother saying that my son had picked on her’s again during lunch and that he was upset again. I confronted my son about it and he said that her son has been purposely sitting across from him at lunch because he knows that it bothers my son.

I called the classmate’s mother back and told her what my son had said. I told her that it’s not ok that my son was rude, but to be fair no one wants to smell bad hygiene while they’re trying to eat. And also if her son was going to go out of his way to put himself in that position then maybe he should toughen up a bit.

She just hung up on me. I don’t condone bullying and have talked to my son about it again, but at the same time I don’t feel my viewpoint on it is all that ridiculous.</p>`,
    agent_messages: {
      NTA: {
        // The participant said YTA
        YTA: {
          Cody:   "I'd say NTA. YTA doesn't really fit, since OP took the complaint seriously both times and talked to their son after each one. A parent who keeps following up like that isn't brushing the bullying off, so the conflict isn't coming from OP.",
          Bella:  "To me this is NTA. YTA feels off because OP opened the callback by saying their son's rudeness wasn't okay, which shows real respect for how the other boy felt. The mother hanging up meant OP's honest attempt to explain both kids' sides never got heard.",
          Nathan: "This reads as NTA. YTA skips the order of events: after the first visit, OP told their son to stay away from the boy outside of class. The next problem happened when the classmate sat across from him at lunch, so the new conflict started with the classmate's choice.",
          Zoe:    "I'm going with NTA. YTA overlooks the lunch detail, where the classmate sat across from OP's son on purpose because he knew it bothered him. OP's toughen-up comment was a response to that specific choice, and pointing out that someone keeps walking into the same situation is fair.",
          "Mario": "My take is NTA. YTA treats OP's phone call as the problem, but OP was entitled to pass along their own son's account when the mother called with a complaint. Sharing both sides is a normal part of two parents working out a problem between their kids.",
        },
        // The participant said ESH
        ESH: {
          "Cody": "I'd say NTA. The classmate sitting across from OP's son on purpose wasn't great, but ESH doesn't fit because OP's toughen-up line was blunt, not cruel. It was tied directly to the boy choosing that seat, not a dig at him as a person.",
      "Bella": "To me this is NTA. I get why ESH comes up, since the mother hanging up was cold, but OP started the call by admitting their son's rudeness wasn't okay. That kind of honesty about your own kid's behavior is caring toward the other family, not something to count against OP.",
      "Nathan": "This reads as NTA. The mother ending the call was a poor move, but ESH misses how OP handled each step: listening at the first visit, exchanging numbers, talking to their son, then calling back. Every step OP took was aimed at solving the problem rather than adding to it.",
      "Zoe": "I'm going with NTA. The classmate choosing that lunch seat wasn't fair to OP's son, and ESH counts OP's hygiene remark against them, but the point was specifically about eating. Not wanting to smell something unpleasant during a meal is an ordinary reaction, not an insult from OP.",
      "Mario": "My take is NTA. The mother hanging up was rude, but ESH asks OP to have handled it perfectly, and OP was entitled to report what their son said when she called. Relaying your own kid's account is a reasonable thing for a parent to do, not a wrong.",
        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say NTA. NAH lets the mother off too easily, because she hung up on OP in the middle of a conversation about their kids. Ending a call that way isn't a misunderstanding, it's refusing to hear the other side out at all.",
      "Bella": "To me this is NTA. NAH treats the lunch trouble like bad luck, but the classmate sat across from OP's son because he knew it would bother him. Deliberately setting up a situation that upsets someone else is unkind, even if he was hurt by the insults earlier.",
      "Nathan": "This reads as NTA. NAH assumes things just went wrong, but look at the sequence: OP told their son to keep away, and then the classmate moved toward him at lunch. The second incident followed a step the classmate took after the first one had been handled.",
      "Zoe": "I'm going with NTA. NAH would make sense for the classroom, since the seating there was assigned and nobody chose it. Lunch is different, because the classmate picked the seat across from OP's son himself, so that part was a decision rather than bad luck.",
      "Mario": "My take is NTA. NAH doesn't account for the mother asking OP to handle their son twice, then hanging up once OP raised her own son's part. Expecting one family to fix things while refusing to consider the other side isn't a mix-up, it's a real failing on her end.",
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
          "Cody": "I'd say YTA. NTA leans on the classmate sitting nearby, but OP's son admitted calling him gross and smelly, and OP answered the mother by telling her son to toughen up. That turns a bullying complaint into the bullied kid's problem.",
      "Bella": "To me this is YTA. NTA focuses on OP's son being bothered, but the other boy was upset enough that his mother came over and then called again. Hearing that her son ought to toughen up after all that would hurt any parent, so hanging up makes sense.",
      "Nathan": "This reads as YTA. NTA gives OP credit for talking to their son, but in that first talk OP only told him to ignore the smell and stay away. The insults themselves weren't addressed then, so the lunch incident followed from how OP handled the first complaint.",
      "Zoe": "I'm going with YTA. NTA treats the hygiene point as fair, but OP used the boy's smell to explain why their son's comments were understandable. Pointing to a kid's body odor as the reason he gets picked on puts the blame on him for being bullied.",
      "Mario": "My take is YTA. NTA says the classmate chose to sit there, but even if that's true, OP's son could move seats at lunch. OP could have simply agreed to talk to their son again instead of adding a lecture about the other boy toughening up."
        },
        // The participant said ESH
        ESH: {
          "Cody": "I'd say YTA. ESH counts the mother hanging up, but that's a small thing next to OP telling her that her bullied son ought to toughen up. Ending a call after hearing that is a pretty normal reaction from a parent.",
      "Bella": "To me this is YTA. ESH puts some blame on the classmate, but he's a teenager who has been called gross and smelly, and the idea that he sits there on purpose is only OP's son's account. The hurt on his side is real, while OP chose to make it worse.",
      "Nathan": "This reads as YTA. ESH suggests both parents slipped, but the mother came over in person, agreed to swap numbers, and called when it happened again. She followed a reasonable process each time, and the only escalation in that sequence came from OP's comments.",
      "Zoe": "I'm going with YTA. ESH treats the classmate's smell as part of the problem, but having poor hygiene isn't doing anything wrong to anyone. OP brought it up as if it explained the insults, which shifts blame onto a kid for something that isn't a fault.",
      "Mario": "My take is YTA. ESH spreads the blame, but the mother did about all a parent can do, which is raise it with the other parent. OP had promised to deal with their son and could have stuck to that, rather than turning the call back on her son."

        },
        // The participant said NAH
        NAH: {
          "Cody": "I'd say YTA. NAH makes it sound like a misunderstanding, but OP knowingly told a mother her son ought to toughen up after he was bullied. That was a choice OP made on the call, not an accident or a slip of the tongue.",
      "Bella": "To me this is YTA. NAH misses how upset the boy already was, since his mother had to step in twice. OP's words told her that her son's hurt didn't count for much, and that adds to the harm rather than being a harmless difference of opinion.",
      "Nathan": "This reads as YTA. NAH would fit if OP lacked information, but by the second call OP knew their son had insulted the boy and kept doing it. Blaming the classmate with all of that known is a decision, not an honest mistake.",
      "Zoe": "I'm going with YTA. NAH frames this as a clash over the smell, but OP's son calling a classmate gross and stinky is bullying, not a preference. OP then repeated the hygiene point to the boy's mother, which goes past disagreeing into shaming.",
      "Mario": "My take is YTA. NAH overlooks OP's first instruction, which was to ignore the smell and stay away instead of stopping the insults. That treated the other boy as the problem, and the insults came up again at lunch soon after."
        },
      },
    },
  },
  B: {
    title: "[PLACEHOLDER] AITA for ... ? (Post B)",
    body: `<p>[PLACEHOLDER] Paste the full text of AITA Post B here.</p>`,
    agent_messages: {
      NTA: {
        // The participant said YTA
        YTA: {
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post B, replying to a YTA verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post B, replying to a YTA verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post B, replying to a YTA verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post B, replying to a YTA verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post B, replying to a YTA verdict.",
        },
        // The participant said ESH
        ESH: {
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post B, replying to an ESH verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post B, replying to an ESH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post B, replying to an ESH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post B, replying to an ESH verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post B, replying to an ESH verdict.",
        },
        // The participant said NAH
        NAH: {
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post B, replying to an NAH verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post B, replying to an NAH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post B, replying to an NAH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post B, replying to an NAH verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post B, replying to an NAH verdict.",
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post B, replying to an NTA verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post B, replying to an NTA verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post B, replying to an NTA verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post B, replying to an NTA verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post B, replying to an NTA verdict.",
        },
        // The participant said ESH
        ESH: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post B, replying to an ESH verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post B, replying to an ESH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post B, replying to an ESH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post B, replying to an ESH verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post B, replying to an ESH verdict.",
        },
        // The participant said NAH
        NAH: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post B, replying to an NAH verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post B, replying to an NAH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post B, replying to an NAH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post B, replying to an NAH verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post B, replying to an NAH verdict.",
        },
      },
    },
  },
};

// The opening of the group chat, shown once at the start of the first chat (after the first post).
const INTRO_LINES = {
  welcome: "Welcome! We'll be discussing posts from Reddit's \"Am I the Asshole?\" community, starting with the one you just read. Before we start, let's all introduce ourselves!",
  ask_participant: "Now it's your turn. Could you please introduce yourself briefly in a single sentence?",
  participant_placeholder: "Introduce yourself in one sentence...",
  thanks: "Thanks! Now that we know each other, we'll take turns to discuss our thoughts on these posts.",
};

const HOST_LINES = {
  // Shown at the start of each discussion chat: the Host asks for the participant's verdict
  ask_verdict: "Having read the post, what is your verdict: YTA (You're the Asshole), NTA (Not the Asshole), ESH (Everyone Sucks Here), or NAH (No Assholes Here)?",
  // Asked right after the verdict; the participant types a sentence or two
  ask_explanation: "Could you briefly explain your verdict in a sentence or two?",
  explanation_placeholder: "Explain your verdict in a sentence or two...",
  // Baseline: neutral line, shown after the verdict and before the agents
  neutral: "Here is what the agents think about this post.",
  // Group 1: freedom-restoring line, shown after the verdict and before the agents
  preemptive: "You might not agree with what you are about to hear, and that's completely okay. The agents just want to share one way of looking at it.",
  // Group 2: freedom-restoring line, shown after the agents
  post: "We respect your view, and thank you for considering theirs.",
  // Group 2 only: optional line before the agents. null = agents start right away (as in the study figure).
  post_intro: null,
};

const VERDICTS = [
  { code: "YTA", label: "YTA (You're the Asshole)" },
  { code: "NTA", label: "NTA (Not the Asshole)" },
  { code: "ESH", label: "ESH (Everyone Sucks Here)" },
  { code: "NAH", label: "NAH (No Assholes Here)" },
];

// Perceived threat to freedom, adapted from Dillard & Shen (2005).
// Check the wording against your LaTeX table before going live.
const THREAT_ITEMS = [
  { name: "threat_1", prompt: "The agents' messages threatened my freedom to choose." },
  { name: "threat_2", prompt: "The agents' messages tried to make a decision for me." },
  { name: "threat_3", prompt: "The agents' messages tried to manipulate me." },
  { name: "threat_4", prompt: "The agents' messages tried to pressure me." },
];
const LIKERT_5 = ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"];

// Added to the threat block of the second discussion. Correct answer = "Agree" (4).
const ATTENTION_CHECK = {
  name: "attention_check",
  prompt: "To show you are reading carefully, please select \"Agree\" for this statement.",
  correct: 4,
};

const MANIPULATION_CHECK = {
  prompt: "In this discussion, did the Host say it was okay for you to disagree with the agents?",
  options: ["Yes", "No", "I don't remember"],
};

const TEXT = {
  consent: `<h2>[PLACEHOLDER] Consent</h2>
    <p>[PLACEHOLDER] Study purpose, what participants will do, about how long it takes,
    payment, risks, data storage, contact details, and the right to stop at any time.</p>`,
  instructions: `<h2>Instructions</h2>
    <p>You will read two posts from Reddit's "Am I the Asshole?" (AITA) community and
    discuss each one in a group chat with a Host and five AI agents.</p>
    <p>After the first post, everyone in the chat will introduce themselves, and you will
    be asked to introduce yourself in one sentence. For each post you will then give your
    verdict, explain it in a sentence or two, read what the agents think, and answer a
    few questions.</p>`,
  read_post: "Please read this post carefully. You will give your verdict in the group chat next.",
  debrief: `<h2>[PLACEHOLDER] Debrief</h2>
    <p>[PLACEHOLDER] Explain that the agents' messages were written in advance and always
    disagreed with your first verdict, why this was done, and who to contact with questions.</p>`,
};
