// Everything participants read. Replace the [PLACEHOLDER] text.
//
// Agent messages are keyed by the AGENTS' verdict. The study always shows the
// set that disagrees with the participant: if they say YTA, the agents use
// the "NTA" set, and the other way around.

const AGENTS = [
  { name: "Cody",   color: "#7b9bd1" },
  { name: "Bella",  color: "#8fbf9a" },
  { name: "Nathan", color: "#d4a95f" },
  { name: "Zoe",    color: "#b98cc0" },
  { name: "Mario",  color: "#d9897a" },
];

const HOST = { name: "Host", color: "#333333" };

const POSTS = {
  A: {
    title: "[PLACEHOLDER] AITA for ... ? (Post A)",
    body: `<p>[PLACEHOLDER] Paste the full text of AITA Post A here. You can use
      several &lt;p&gt; paragraphs.</p>`,
    agent_messages: {
      // Shown when the participant said YTA
      NTA: {
        Cody:   "[PLACEHOLDER] Honestly? NTA. That boundary was totally fair.",
        Bella:  "[PLACEHOLDER] Agree with Cody, they overreacted a bit. NTA.",
        Nathan: "[PLACEHOLDER] NTA. You were honest and still kind about it.",
        Zoe:    "[PLACEHOLDER] Zoe's NTA message for Post A.",
        Mario:  "[PLACEHOLDER] Mario's NTA message for Post A.",
      },
      // Shown when the participant said NTA
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

const HOST_LINES = {
  // Baseline: neutral line, shown before the agents
  neutral: "Here is what the agents think about this post.",
  // Group 1: freedom-restoring line, shown before the agents
  preemptive: "You might not agree with what you are about to hear, and that's completely okay. The agents just want to share one way of looking at it.",
  // Group 2: freedom-restoring line, shown after the agents
  post: "We respect your view, and thank you for considering theirs.",
  // Group 2 only: optional line before the agents. null = agents start right away (as in the study figure).
  post_intro: null,
};

const VERDICTS = [
  { code: "YTA", label: "YTA (You're the Asshole)" },
  { code: "NTA", label: "NTA (Not the Asshole)" },
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
    <p>You will read two posts from Reddit's "Am I the Asshole?" (AITA) community.</p>
    <p>For each post you will give your verdict, read what a group of AI agents think,
    and then answer a few questions.</p>`,
  debrief: `<h2>[PLACEHOLDER] Debrief</h2>
    <p>[PLACEHOLDER] Explain that the agents' messages were written in advance and always
    disagreed with your first verdict, why this was done, and who to contact with questions.</p>`,
};
