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

// Opens the first chat, after the first post: Host welcome, each agent's intro, then the participant's.
function introScript() {
  return [
    host(INTRO_LINES.welcome),
    ...AGENTS.map((a) => ({ name: a.name, color: a.color, role: "agent", text: a.intro })),
    host(INTRO_LINES.ask_participant),
    { input: "text", key: "self_intro", placeholder: INTRO_LINES.participant_placeholder, min_chars: 2 },
    host(INTRO_LINES.thanks),
  ];
}

// Host asks for the verdict and a short explanation, then (by condition) the Host line and the agents arguing against it.
function discussionScript(postId, condition) {
  return [
    host(HOST_LINES.ask_verdict),
    { input: "choice", key: "verdict", choices: VERDICTS.map((v) => ({ label: v.label, value: v.code, say: v.code })) },
    host(HOST_LINES.ask_explanation),
    { input: "text", key: "explanation", placeholder: HOST_LINES.explanation_placeholder, min_chars: 0, max_chars: 600 },
    (r) => {
      r.agent_verdict = agentVerdictFor(r.verdict);
      const agentMsgs = AGENTS.map((a, i) => ({
        name: a.name, color: a.color, role: "agent",
        text: (i === 1 || i === 3 ? AGREE_PREFIX.replace("{name}", AGENTS[i - 1].name) : "") +
          POSTS[postId].agent_messages[r.agent_verdict][r.verdict][a.name],
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
    on_start: () => document.body.classList.add("show-verdict-key"),
    stimulus: `<p class="step">Post ${d.n} of 2</p>${postHtml(post)}<p>${TEXT.read_post}</p>`,
    choices: ["Go to the group chat"],
    data: { ...tag, measure: "read_post" },
  };

  // The initial verdict and explanation are given in the chat (and, in the first chat,
  // the introductions), so this trial also holds them.
  const chat = {
    type: jsPsychChat,
    context_html: postHtml(post),
    script: [...(d.n === 1 ? introScript() : []), ...discussionScript(d.postId, d.condition)],
    typing: CONFIG.TYPING,
    data: { ...tag, measure: "chat" },
    on_finish: (data) => {
      initialVerdict = data.responses.verdict;
      data.verdict = initialVerdict;
      data.explanation = data.responses.explanation;
      if (d.n === 1) data.self_intro = data.responses.self_intro;
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

  return [read, chat, threat, final];
}

// One row per participant, ready for analysis.
function summaryRow(info) {
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
    row[`d${n}_explanation`] = get("chat").explanation;
    row[`d${n}_agent_verdict`] = f.agent_verdict;
    row[`d${n}_final`] = f.verdict;
    row[`d${n}_changed`] = f.changed_to_agents;
    row[`d${n}_verdict_changed`] = f.verdict_changed;
    THREAT_ITEMS.forEach((q) => { row[`d${n}_${q.name}`] = th[q.name]; });
    row[`d${n}_threat_mean`] = th.threat_mean;
    if (n === 2) row.attention_pass = th.attention_pass;
  });
  row.self_intro = (all.filter({ discussion: 1, measure: "chat" }).values()[0] || {}).self_intro;
  row.total_time_ms = all.last(1).values()[0].time_elapsed;
  return row;
}

function summaryCsv(info) {
  const row = summaryRow(info);
  const keys = Object.keys(row);
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return keys.join(",") + "\n" + keys.map((k) => cell(row[k])).join(",") + "\n";
}

// Save one Firestore document per participant: the summary row as fields, plus the
// full trial-by-trial CSV as text. Uses the Firestore REST API, so no SDK is needed.
async function saveToFirebase(info) {
  const fb = CONFIG.FIREBASE;
  const value = (v) =>
    v === null || v === undefined ? { nullValue: null }
    : typeof v === "boolean" ? { booleanValue: v }
    : typeof v === "number" ? { doubleValue: v }
    : { stringValue: String(v) };
  const fields = {};
  Object.entries(summaryRow(info)).forEach(([k, v]) => { fields[k] = value(v); });
  fields.trials_csv = value(jsPsych.data.get().csv());
  fields.saved_at = { timestampValue: new Date().toISOString() };
  const endpoint = `https://firestore.googleapis.com/v1/projects/${fb.projectId}/databases/(default)/documents/` +
    `${fb.collection}?documentId=${encodeURIComponent(participantId)}&key=${fb.apiKey}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields }) });
      if (res.ok || res.status === 409) return true; // 409: already saved
    } catch (e) { /* network error, retry */ }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  return false;
}

async function main() {
  document.body.insertAdjacentHTML("afterbegin", `<div class="verdict-key">${TEXT.verdict_key}</div>`);
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

  const firebaseSave = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Saving your responses, please wait...</p>",
    choices: [],
    data: { measure: "save" },
    on_load: async () => {
      const ok = await saveToFirebase(info);
      if (ok) jsPsych.finishTrial({ saved: true });
      else jsPsych.getDisplayElement().innerHTML = `<p>Sorry, we could not save your responses.
        Please check your internet connection and try again.</p>
        <button class="jspsych-btn" id="retry-save">Try again</button>`;
      const retry = document.getElementById("retry-save");
      if (retry) retry.addEventListener("click", async () => {
        retry.disabled = true;
        if (await saveToFirebase(info)) jsPsych.finishTrial({ saved: true });
        else retry.disabled = false;
      });
    },
  };

  const save = ON_COGNITION ? [] : CONFIG.FIREBASE.apiKey ? [firebaseSave] : CONFIG.DATAPIPE_ID
    ? [
        { type: jsPsychPipe, action: "save", experiment_id: CONFIG.DATAPIPE_ID,
          filename: `${participantId}_trials.csv`, data_string: () => jsPsych.data.get().csv() },
        { type: jsPsychPipe, action: "save", experiment_id: CONFIG.DATAPIPE_ID,
          filename: `${participantId}_summary.csv`, data_string: () => summaryCsv(info) },
      ]
    : url.download === undefined ? [] : [{
        // Testing only: add ?download=1 to the URL to download your own data when no DataPipe ID is set
        type: jsPsychHtmlButtonResponse,
        stimulus: "<p><b>Test mode:</b> download your data.</p>",
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
    on_start: () => document.body.classList.remove("show-verdict-key"),
    stimulus: TEXT.debrief,
    choices: [code ? "Finish and return to Prolific" : "Finish"],
    on_finish: () => {
      if (code && !ON_COGNITION) window.location.href = `https://app.prolific.com/submissions/complete?cc=${code}`;
    },
  };

  await jsPsych.run([
    consent,
    instructions,
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
