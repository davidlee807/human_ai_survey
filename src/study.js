const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true,
  on_trial_finish: (data) => { data.timestamp = new Date().toISOString(); },
});

const url = jsPsych.data.urlVariables();
const participantId = url.PROLIFIC_PID || jsPsych.randomization.randomID(10);
const N_CELLS = CONFIG.COUNTERBALANCE_BASELINE_POSITION ? 8 : 4;
// On Cognition.run the platform saves the data and assigns a balanced CONDITION itself.
const ON_COGNITION = typeof CONDITION !== "undefined" || location.hostname.endsWith("cognition.run");
// The verdict the agents argue: YTA -> NTA, NTA -> YTA, and ESH or NAH -> YTA or NTA at random.
const agentVerdictFor = (v) =>
  v === "YTA" ? "NTA" : v === "NTA" ? "YTA" : jsPsych.randomization.sampleWithoutReplacement(["YTA", "NTA"], 1)[0];

// Balanced assignment through DataPipe if set up; "?cell=0..7" in the URL forces a cell for testing.
async function getCell() {
  if (url.cell !== undefined) return Number(url.cell) % N_CELLS;
  if (typeof CONDITION !== "undefined" && !isNaN(Number(CONDITION))) {
    return (((Number(CONDITION) - 1) % N_CELLS) + N_CELLS) % N_CELLS; // Cognition conditions start at 1
  }
  if (CONFIG.DATAPIPE_ID) {
    const c = await jsPsychPipe.getCondition(CONFIG.DATAPIPE_ID);
    if (typeof c === "number") return c % N_CELLS;
  }
  return Math.floor(Math.random() * N_CELLS);
}

function decodeCell(cell) {
  const group = cell % 2 === 0 ? "preemptive" : "post";
  const firstPost = Math.floor(cell / 2) % 2 === 0 ? "A" : "B";
  const baselinePosition = N_CELLS === 8 && Math.floor(cell / 4) % 2 === 1 ? 2 : 1;
  return { cell, group, firstPost, baselinePosition };
}

function postHtml(post) {
  return `<div class="post"><h3>${post.title}</h3>${post.body}</div>`;
}

const verdictButtons = {
  choices: VERDICTS.map((v) => v.label),
  grid_rows: null,
  grid_columns: 2,
};

const host = (text) => ({ name: HOST.name, color: HOST.color, role: "host", text });

// Shown once before the first post: Host welcome, each agent's intro, then the participant's.
function introChat() {
  return {
    type: jsPsychChat,
    script: [
      host(INTRO_LINES.welcome),
      ...AGENTS.map((a) => ({ name: a.name, color: a.color, role: "agent", text: a.intro })),
      host(INTRO_LINES.ask_participant),
      { input: "text", key: "self_intro", placeholder: INTRO_LINES.participant_placeholder, min_chars: 2 },
      host(INTRO_LINES.thanks),
    ],
    typing: CONFIG.TYPING,
    data: { measure: "intro_chat" },
    on_finish: (data) => { data.self_intro = data.responses.self_intro; },
  };
}

// Host asks for the verdict, then (by condition) the Host line and the agents arguing against it.
function discussionScript(postId, condition) {
  return [
    host(HOST_LINES.ask_verdict),
    { input: "choice", key: "verdict", choices: VERDICTS.map((v) => ({ label: v.label, value: v.code, say: v.code })) },
    (r) => {
      r.agent_verdict = agentVerdictFor(r.verdict);
      const agentMsgs = AGENTS.map((a) => ({
        name: a.name, color: a.color, role: "agent",
        text: POSTS[postId].agent_messages[r.agent_verdict][r.verdict][a.name],
      }));
      if (condition === "baseline") return [host(HOST_LINES.neutral), ...agentMsgs];
      if (condition === "preemptive") return [host(HOST_LINES.preemptive), ...agentMsgs];
      return [...(HOST_LINES.post_intro ? [host(HOST_LINES.post_intro)] : []), ...agentMsgs, host(HOST_LINES.post)];
    },
  ];
}

function discussionBlock(d) {
  const post = POSTS[d.postId];
  const tag = { discussion: d.n, post_id: d.postId, condition: d.condition };
  let initialVerdict = null;
  let agentVerdict = null;

  const read = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<p class="step">Post ${d.n} of 2</p>${postHtml(post)}<p>${TEXT.read_post}</p>`,
    choices: ["Go to the group chat"],
    data: { ...tag, measure: "read_post" },
  };

  // The initial verdict is given in the chat, so this trial also holds it.
  const chat = {
    type: jsPsychChat,
    context_html: postHtml(post),
    script: discussionScript(d.postId, d.condition),
    typing: CONFIG.TYPING,
    data: { ...tag, measure: "chat" },
    on_finish: (data) => {
      initialVerdict = data.responses.verdict;
      data.verdict = initialVerdict;
      agentVerdict = data.responses.agent_verdict;
      data.agent_verdict = agentVerdict;
    },
  };

  const items = THREAT_ITEMS.map((q) => ({ ...q, labels: LIKERT_5, required: true }));
  if (d.n === 2) items.push({ ...ATTENTION_CHECK, labels: LIKERT_5, required: true });
  const threat = {
    type: jsPsychSurveyLikert,
    preamble: "<p>Think about the discussion you just read. How much do you agree with each statement?</p>",
    questions: items,
    randomize_question_order: true,
    data: { ...tag, measure: "threat" },
    on_finish: (data) => {
      const scores = THREAT_ITEMS.map((q) => data.response[q.name] + 1); // 1-5
      THREAT_ITEMS.forEach((q, i) => { data[q.name] = scores[i]; });
      data.threat_mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (d.n === 2) data.attention_pass = data.response[ATTENTION_CHECK.name] + 1 === ATTENTION_CHECK.correct;
    },
  };

  const final = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => `<details class="chat-context"><summary>Show the post again</summary>${postHtml(post)}</details>
      <p>You first said <b>${initialVerdict}</b>.</p><p><b>What is your final verdict on this post?</b></p>`,
    ...verdictButtons,
    data: { ...tag, measure: "final_verdict" },
    on_finish: (data) => {
      data.verdict = VERDICTS[data.response].code;
      data.initial_verdict = initialVerdict;
      data.verdict_changed = data.verdict !== initialVerdict;
      data.agent_verdict = agentVerdict;
      // Final verdict is the one the agents argued
      data.changed_to_agents = data.verdict === agentVerdict;
    },
  };

  const manipulation = {
    type: jsPsychSurveyMultiChoice,
    questions: [{ name: "manip", prompt: MANIPULATION_CHECK.prompt, options: MANIPULATION_CHECK.options, required: true }],
    data: { ...tag, measure: "manipulation_check" },
    on_finish: (data) => { data.manip_answer = data.response.manip; },
  };

  return [read, chat, threat, final, manipulation];
}

// One row per participant, ready for analysis.
function summaryCsv(info) {
  const all = jsPsych.data.get();
  const row = {
    participant_id: participantId, prolific_pid: url.PROLIFIC_PID || "", study_id: url.STUDY_ID || "",
    session_id: url.SESSION_ID || "", cell: info.cell, group: info.group,
    first_post: info.firstPost, baseline_position: info.baselinePosition,
  };
  [1, 2].forEach((n) => {
    const get = (measure) => all.filter({ discussion: n, measure }).values()[0] || {};
    const f = get("final_verdict"), th = get("threat");
    row[`d${n}_post`] = f.post_id;
    row[`d${n}_condition`] = f.condition;
    row[`d${n}_initial`] = f.initial_verdict;
    row[`d${n}_agent_verdict`] = f.agent_verdict;
    row[`d${n}_final`] = f.verdict;
    row[`d${n}_changed`] = f.changed_to_agents;
    row[`d${n}_verdict_changed`] = f.verdict_changed;
    THREAT_ITEMS.forEach((q) => { row[`d${n}_${q.name}`] = th[q.name]; });
    row[`d${n}_threat_mean`] = th.threat_mean;
    row[`d${n}_manip`] = get("manipulation_check").manip_answer;
    if (n === 2) row.attention_pass = th.attention_pass;
  });
  row.self_intro = (all.filter({ measure: "intro_chat" }).values()[0] || {}).self_intro;
  row.total_time_ms = all.last(1).values()[0].time_elapsed;
  const keys = Object.keys(row);
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return keys.join(",") + "\n" + keys.map((k) => cell(row[k])).join(",") + "\n";
}

async function main() {
  const info = decodeCell(await getCell());
  const secondPost = info.firstPost === "A" ? "B" : "A";
  const discussions = [
    { n: 1, postId: info.firstPost, condition: info.baselinePosition === 1 ? "baseline" : info.group },
    { n: 2, postId: secondPost, condition: info.baselinePosition === 2 ? "baseline" : info.group },
  ];

  jsPsych.data.addProperties({
    participant_id: participantId, prolific_pid: url.PROLIFIC_PID || "", study_id: url.STUDY_ID || "",
    session_id: url.SESSION_ID || "", cell: info.cell, group: info.group,
    first_post: info.firstPost, baseline_position: info.baselinePosition,
  });

  const consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus: TEXT.consent,
    choices: ["I agree to take part", "I do not agree"],
    data: { measure: "consent" },
    on_finish: (data) => {
      if (data.response !== 0) (jsPsych.abortExperiment || jsPsych.endExperiment).call(jsPsych, "<p>You chose not to take part. You can close this page.</p>");
    },
  };
  const instructions = { type: jsPsychHtmlButtonResponse, stimulus: TEXT.instructions, choices: ["Start"] };

  const save = ON_COGNITION ? [] : CONFIG.DATAPIPE_ID
    ? [
        { type: jsPsychPipe, action: "save", experiment_id: CONFIG.DATAPIPE_ID,
          filename: `${participantId}_trials.csv`, data_string: () => jsPsych.data.get().csv() },
        { type: jsPsychPipe, action: "save", experiment_id: CONFIG.DATAPIPE_ID,
          filename: `${participantId}_summary.csv`, data_string: () => summaryCsv(info) },
      ]
    : [{
        type: jsPsychHtmlButtonResponse,
        stimulus: "<p><b>Test mode:</b> no DataPipe ID is set, so the data will download to this computer.</p>",
        choices: ["Download data"],
        on_finish: () => {
          const blob = (text, name) => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
            a.download = name;
            a.click();
          };
          blob(jsPsych.data.get().csv(), `${participantId}_trials.csv`);
          blob(summaryCsv(info), `${participantId}_summary.csv`);
        },
      }];

  const code = CONFIG.PROLIFIC_COMPLETION_CODE;
  const debrief = {
    type: jsPsychHtmlButtonResponse,
    stimulus: TEXT.debrief,
    choices: [code ? "Finish and return to Prolific" : "Finish"],
    on_finish: () => {
      if (code && !ON_COGNITION) window.location.href = `https://app.prolific.com/submissions/complete?cc=${code}`;
    },
  };

  await jsPsych.run([
    consent,
    instructions,
    introChat(),
    ...discussionBlock(discussions[0]),
    ...discussionBlock(discussions[1]),
    ...save,
    debrief,
  ]);
  // On Cognition, send people back with a link only after the run has ended, so the platform has saved the data.
  jsPsych.getDisplayElement().innerHTML = code && ON_COGNITION
    ? `<p>Thank you! <a class="jspsych-btn" href="https://app.prolific.com/submissions/complete?cc=${code}">Return to Prolific</a></p>`
    : "<p>Thank you! You can close this page.</p>";
}

main();
