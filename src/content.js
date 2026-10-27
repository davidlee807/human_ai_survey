// Everything participants read. Replace the [PLACEHOLDER] text.
//
// Agent messages are keyed by the AGENTS' verdict. The study always shows the
// set that disagrees with the participant: if they say YTA, the agents use
// the "NTA" set, and the other way around.

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
    title: "[PLACEHOLDER] AITA for ... ? (Post A)",
    body: `<p>[PLACEHOLDER] Paste the full text of AITA Post A here. You can use
      several &lt;p&gt; paragraphs.</p>`,
    agent_messages: {
      // Shown when the participant said YTA or ESH
      NTA: {
        Cody:   "[PLACEHOLDER] Honestly? NTA. That boundary was totally fair.",
        Bella:  "[PLACEHOLDER] Agree with Cody, they overreacted a bit. NTA.",
        Nathan: "[PLACEHOLDER] NTA. You were honest and still kind about it.",
        Zoe:    "[PLACEHOLDER] Zoe's NTA message for Post A.",
        Mario:  "[PLACEHOLDER] Mario's NTA message for Post A.",
      },
      // Shown when the participant said NTA or NAH
      YTA: {
        Cody:   "[PLACEHOLDER] Cody's YTA message for Post A.",
        Bella:  "[PLACEHOLDER] Bella's YTA message for Post A.",
        Nathan: "[PLACEHOLDER] Nathan's YTA message for Post A.",
        Zoe:    "[PLACEHOLDER] Zoe's YTA message for Post A.",
        Mario:  "[PLACEHOLDER] Mario's YTA message for Post A.",
      },
    },
  },
  B: {
    title: "[PLACEHOLDER] AITA for ... ? (Post B)",
    body: `<p>[PLACEHOLDER] Paste the full text of AITA Post B here.</p>`,
    agent_messages: {
      NTA: {
        Cody:   "[PLACEHOLDER] Cody's NTA message for Post B.",
        Bella:  "[PLACEHOLDER] Bella's NTA message for Post B.",
        Nathan: "[PLACEHOLDER] Nathan's NTA message for Post B.",
        Zoe:    "[PLACEHOLDER] Zoe's NTA message for Post B.",
        Mario:  "[PLACEHOLDER] Mario's NTA message for Post B.",
      },
      YTA: {
        Cody:   "[PLACEHOLDER] Cody's YTA message for Post B.",
        Bella:  "[PLACEHOLDER] Bella's YTA message for Post B.",
        Nathan: "[PLACEHOLDER] Nathan's YTA message for Post B.",
        Zoe:    "[PLACEHOLDER] Zoe's YTA message for Post B.",
        Mario:  "[PLACEHOLDER] Mario's YTA message for Post B.",
      },
    },
  },
};

// The opening of the group chat, shown once before the first post.
const INTRO_LINES = {
  welcome: "Welcome! Today we'll read some posts from Reddit's \"Am I the Asshole?\" community and share our thoughts on them. Before we start, let's all introduce ourselves!",
  ask_participant: "Now it's your turn. Could you please introduce yourself briefly in a single sentence?",
  participant_placeholder: "Introduce yourself in one sentence...",
  thanks: "Thanks! Now that we know each other, we'll take turns to discuss our thoughts on these posts.",
};

const HOST_LINES = {
  // Shown at the start of each discussion chat: the Host asks for the participant's verdict
  ask_verdict: "Having read the post, what is your verdict: YTA (You're the Asshole), NTA (Not the Asshole), ESH (Everyone Sucks Here), or NAH (No Assholes Here)?",
  // Baseline: neutral line, shown after the verdict and before the agents
  neutral: "Here is what the agents think about this post.",
  // Group 1: freedom-restoring line, shown after the verdict and before the agents
  preemptive: "You might not agree with what you are about to hear, and that's completely okay. The agents just want to share one way of looking at it.",
  // Group 2: freedom-restoring line, shown after the agents
  post: "We respect your view, and thank you for considering theirs.",
  // Group 2 only: optional line before the agents. null = agents start right away (as in the study figure).
  post_intro: null,
};

// "side" decides which argument set the agents use: they always argue the other side.
// YTA and ESH both put the poster at fault, so the agents argue NTA; NTA and NAH
// don't, so the agents argue YTA.
const VERDICTS = [
  { code: "YTA", label: "YTA (You're the Asshole)", side: "at_fault" },
  { code: "NTA", label: "NTA (Not the Asshole)", side: "not_at_fault" },
  { code: "ESH", label: "ESH (Everyone Sucks Here)", side: "at_fault" },
  { code: "NAH", label: "NAH (No Assholes Here)", side: "not_at_fault" },
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
    <p>You will join a group chat with a Host and five AI agents. Everyone will first
    introduce themselves, and you will be asked to introduce yourself in one sentence.</p>
    <p>You will then read two posts from Reddit's "Am I the Asshole?" (AITA) community.
    For each post you will give your verdict in the chat, read what the agents think,
    and then answer a few questions.</p>`,
  read_post: "Please read this post carefully. You will give your verdict in the group chat next.",
  debrief: `<h2>[PLACEHOLDER] Debrief</h2>
    <p>[PLACEHOLDER] Explain that the agents' messages were written in advance and always
    disagreed with your first verdict, why this was done, and who to contact with questions.</p>`,
};
