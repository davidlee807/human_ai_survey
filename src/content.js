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
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post A, replying to a YTA verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post A, replying to a YTA verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post A, replying to a YTA verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post A, replying to a YTA verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post A, replying to a YTA verdict.",
        },
        // The participant said ESH
        ESH: {
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post A, replying to an ESH verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post A, replying to an ESH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post A, replying to an ESH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post A, replying to an ESH verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post A, replying to an ESH verdict.",
        },
        // The participant said NAH
        NAH: {
          Cody:   "[PLACEHOLDER] Cody's NTA explanation for Post A, replying to an NAH verdict.",
          Bella:  "[PLACEHOLDER] Bella's NTA explanation for Post A, replying to an NAH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's NTA explanation for Post A, replying to an NAH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's NTA explanation for Post A, replying to an NAH verdict.",
          Mario:  "[PLACEHOLDER] Mario's NTA explanation for Post A, replying to an NAH verdict.",
        },
      },
      YTA: {
        // The participant said NTA
        NTA: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post A, replying to an NTA verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post A, replying to an NTA verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post A, replying to an NTA verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post A, replying to an NTA verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post A, replying to an NTA verdict.",
        },
        // The participant said ESH
        ESH: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post A, replying to an ESH verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post A, replying to an ESH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post A, replying to an ESH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post A, replying to an ESH verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post A, replying to an ESH verdict.",
        },
        // The participant said NAH
        NAH: {
          Cody:   "[PLACEHOLDER] Cody's YTA explanation for Post A, replying to an NAH verdict.",
          Bella:  "[PLACEHOLDER] Bella's YTA explanation for Post A, replying to an NAH verdict.",
          Nathan: "[PLACEHOLDER] Nathan's YTA explanation for Post A, replying to an NAH verdict.",
          Zoe:    "[PLACEHOLDER] Zoe's YTA explanation for Post A, replying to an NAH verdict.",
          Mario:  "[PLACEHOLDER] Mario's YTA explanation for Post A, replying to an NAH verdict.",
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
