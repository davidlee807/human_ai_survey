const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true,
  on_trial_finish: (data) => { data.timestamp = new Date().toISOString(); },
});

const url = jsPsych.data.urlVariables();
const STARTED_AT = new Date().toISOString(); // when the page was opened
const participantId = url.PROLIFIC_PID || jsPsych.randomization.randomID(10);
const N_CELLS = 4;
// On Cognition.run the platform saves the data and assigns a balanced CONDITION itself.
const ON_COGNITION = typeof CONDITION !== "undefined" || location.hostname.endsWith("cognition.run");
// The verdict the agents argue: YTA -> NTA, NTA -> YTA, and ESH or NAH -> YTA or NTA at random.
const agentVerdictFor = (v) =>
  v === "YTA" ? "NTA" : v === "NTA" ? "YTA" : jsPsych.randomization.sampleWithoutReplacement(["YTA", "NTA"], 1)[0];

// Ask the Google Apps Script for the cell with the fewest participants so far (see
// google/Code.gs). Returns null if it can't be reached in time, so the caller falls back.
async function getCellFromSheet() {
  if (!CONFIG.GOOGLE_SHEETS_URL || ON_COGNITION) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const q = `?action=assign&pid=${encodeURIComponent(participantId)}`;
    const res = await fetch(CONFIG.GOOGLE_SHEETS_URL + q, { signal: ctrl.signal });
    const out = await res.json();
    const c = Number(out.cell);
    return out.status === "ok" && Number.isInteger(c) && c >= 0 ? c % N_CELLS : null;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Balanced assignment: from the Google Sheet (or DataPipe) if set up, else random.
// "?cell=0..3" in the URL forces a cell for testing (and isn't counted in the Sheet's assignments).
async function getCell() {
  if (url.cell !== undefined) return Number(url.cell) % N_CELLS;
  if (typeof CONDITION !== "undefined" && !isNaN(Number(CONDITION))) {
    return (((Number(CONDITION) - 1) % N_CELLS) + N_CELLS) % N_CELLS; // Cognition conditions start at 1
  }
  const fromSheet = await getCellFromSheet();
  if (fromSheet !== null) return fromSheet;
  if (CONFIG.DATAPIPE_ID) {
    const c = await jsPsychPipe.getCondition(CONFIG.DATAPIPE_ID);
    if (typeof c === "number") return c % N_CELLS;
  }
  return Math.floor(Math.random() * N_CELLS);
}

// Within subjects: everyone sees both styles, one per post. The 4 cells are
// which style comes first (factual / humanlike) x which post comes first (A / B),
// so both the style order and which post gets which style are balanced.
//   cell 0: factual on A, then humanlike on B     cell 2: factual on B, then humanlike on A
//   cell 1: humanlike on A, then factual on B     cell 3: humanlike on B, then factual on A
function decodeCell(cell) {
  const firstStyle = cell % 2 === 0 ? "factual" : "humanlike";
  const firstPost = Math.floor(cell / 2) % 2 === 0 ? "A" : "B";
  return { cell, group: `${firstStyle}_first`, firstStyle, firstPost };
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

// Opens the humanlike chat: Host welcome, each agent's intro, then the participant's.
function introScript() {
  return [
    host(INTRO_LINES.welcome),
    ...AGENTS.map((a) => ({ name: a.name, color: a.color, role: "agent", text: a.intro })),
    host(INTRO_LINES.ask_participant),
    { input: "text", key: "self_intro", placeholder: INTRO_LINES.participant_placeholder, min_chars: 2 },
    host(INTRO_LINES.thanks),
  ];
}

const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// The factual condition's list page: the agents' verdict, then PROS and CONS, each point
// with the agents that agree with it. Shown as a plain page, not in the chat.
function factualListHtml(postId, agentVerdict, verdict) {
  const list = FACTUAL_LISTS[postId][agentVerdict][verdict];
  const who = (p) => p.agents.map((n) => FACTUAL.labels[n] || n).join(", ");
  // Every "gen" element is typed out in order by generateList() below.
  const items = (points) => points.map((p) => `<li><span class="gen">${escapeHtml(p.text)}</span><span class="fl-agents gen">Agreed by: ${who(p)} (${p.agents.length}/${AGENTS.length})</span></li>`).join("");
  return `<details class="chat-context"><summary>Show the post again</summary>${postHtml(POSTS[postId])}</details>
    <div class="factual factual-page"><div class="fl-title">${FACTUAL.title}</div>
    <div class="fl-verdict gen">Verdict: ${agentVerdict} (${AGENTS.length}/${AGENTS.length} agents)</div>
    <div class="fl-head gen">PROS: points for ${agentVerdict}</div><ul>${items(list.pros)}</ul>
    <div class="fl-head gen">CONS: points against ${verdict}</div><ul>${items(list.cons)}</ul></div>`;
}

// Makes the list look machine-generated: each line is typed out character by character,
// one line after another, with a cursor. Continue is enabled once the whole list is out.
function generateList(root, button, onDone) {
  const t = CONFIG.LIST_TYPING;
  const lines = [...root.querySelectorAll(".gen")].map((el) => ({ el, text: el.textContent }));
  lines.forEach(({ el }) => { el.textContent = ""; el.classList.add("gen-wait"); });
  root.querySelectorAll("li").forEach((li) => li.classList.add("gen-wait"));
  if (button) button.disabled = true;
  let i = 0;
  const nextLine = () => {
    if (i > 0) lines[i - 1].el.classList.remove("gen-now");
    if (i >= lines.length) { if (button) button.disabled = false; onDone && onDone(); return; }
    const { el, text } = lines[i++];
    el.classList.remove("gen-wait");
    el.closest("li")?.classList.remove("gen-wait");
    el.classList.add("gen-now");
    let n = 0;
    const tick = () => {
      n = Math.min(text.length, n + t.chars_per_step);
      el.textContent = text.slice(0, n);
      if (n < text.length) setTimeout(tick, t.ms_per_step);
      else setTimeout(nextLine, t.pause_between_lines);
    };
    setTimeout(tick, t.ms_per_step);
  };
  setTimeout(nextLine, t.first_delay);
}

// Humanlike chat: Host asks for the verdict, then the five named agents argue against it.
function discussionScript(postId) {
  return [
    host(HOST_LINES.ask_verdict),
    { input: "choice", key: "verdict", choices: VERDICTS.map((v) => ({ label: v.label, value: v.code, say: v.code })) },
    (r) => {
      r.agent_verdict = agentVerdictFor(r.verdict);
      return [host(HOST_LINES.neutral), ...AGENTS.map((a, i) => ({
        name: a.name, color: a.color, role: "agent",
        text: (i === 1 || i === 3 ? AGREE_PREFIX.replace("{name}", AGENTS[i - 1].name) : "") +
          POSTS[postId].agent_messages[r.agent_verdict][r.verdict][a.name],
      }))];
    },
  ];
}

function discussionBlock(d) {
  const post = POSTS[d.postId];
  const tag = { discussion: d.n, post_id: d.postId, style: d.style };
  let initialVerdict = null;
  let agentVerdict = null;
  let finalVerdict = null;

  const read = {
    type: jsPsychHtmlButtonResponse,
    on_start: () => document.body.classList.add("show-verdict-key"),
    stimulus: `<p class="step">Post ${d.n} of 2</p>${postHtml(post)}<p>${TEXT.read_post}</p>`,
    choices: ["Go to the group chat"],
    data: { ...tag, measure: "read_post" },
  };

  // Humanlike: the initial verdict is given in the chat (after the introductions),
  // so this trial also holds it.
  const chat = {
    type: jsPsychChat,
    context_html: postHtml(post),
    script: [...introScript(), ...discussionScript(d.postId)],
    typing: CONFIG.TYPING,
    data: { ...tag, measure: "agents" },
    on_finish: (data) => {
      initialVerdict = data.responses.verdict;
      data.verdict = initialVerdict;
      data.self_intro = data.responses.self_intro;
      agentVerdict = data.responses.agent_verdict;
      data.agent_verdict = agentVerdict;
    },
  };

  // Factual: the post with the four verdict buttons on one page, then the pros/cons list page.
  const readAndVote = {
    type: jsPsychHtmlButtonResponse,
    on_start: () => document.body.classList.add("show-verdict-key"),
    stimulus: `<p class="step">Post ${d.n} of 2</p>${postHtml(post)}<p><b>${TEXT.factual_verdict}</b></p>`,
    ...verdictButtons,
    data: { ...tag, measure: "read_post" },
    on_finish: (data) => {
      initialVerdict = VERDICTS[data.response].code;
      data.verdict = initialVerdict;
      agentVerdict = agentVerdictFor(initialVerdict);
      data.agent_verdict = agentVerdict;
    },
  };
  const factualList = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => factualListHtml(d.postId, agentVerdict, initialVerdict),
    choices: ["Continue"],
    data: { ...tag, measure: "agents" },
    on_load: () => {
      const disp = jsPsych.getDisplayElement();
      generateList(disp.querySelector(".factual-page"), disp.querySelector("button.jspsych-btn"));
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
      finalVerdict = data.verdict;
      data.initial_verdict = initialVerdict;
      data.verdict_changed = data.verdict !== initialVerdict;
      data.agent_verdict = agentVerdict;
      // Final verdict is the one the agents argued
      data.changed_to_agents = data.verdict === agentVerdict;
    },
  };

  // Why the participant changed or kept their verdict (free text, required).
  let reasonText = "";
  const reason = {
    type: jsPsychHtmlButtonResponse,
    stimulus: () => {
      const q = (finalVerdict === initialVerdict ? REASON_QUESTION.unchanged : REASON_QUESTION.changed)
        .replace("{initial}", initialVerdict).replace("{final}", finalVerdict);
      return `<p><b>${q}</b></p><textarea id="reason-box" class="reason-box" maxlength="1000" placeholder="${REASON_QUESTION.placeholder}"></textarea>`;
    },
    choices: ["Continue"],
    data: { ...tag, measure: "reason" },
    on_load: () => {
      reasonText = "";
      const box = document.getElementById("reason-box");
      const btn = jsPsych.getDisplayElement().querySelector("button.jspsych-btn");
      const update = () => {
        reasonText = box.value.trim();
        if (btn) btn.disabled = reasonText.length < REASON_QUESTION.min_chars;
      };
      box.addEventListener("input", update);
      update();
      box.focus();
    },
    on_finish: (data) => {
      data.reason = reasonText;
    },
  };

  const shown = d.style === "factual" ? [readAndVote, factualList] : [read, chat];
  return [...shown, final, reason];
}

// One row per participant, ready for analysis. This is all that goes to the Google Sheet.
// Times are in milliseconds.
function summaryRow(info) {
  const all = jsPsych.data.get();
  const one = (filter) => all.filter(filter).values()[0] || {};
  const row = {
    participant_id: participantId, prolific_pid: url.PROLIFIC_PID || "", study_id: url.STUDY_ID || "",
    session_id: url.SESSION_ID || "", cell: info.cell, group: info.group,
    first_style: info.firstStyle, first_post: info.firstPost,
    started_at: STARTED_AT,
    finished_at: new Date().toISOString(),
    is_mobile: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent),
    instructions_ms: one({ measure: "instructions" }).rt,
  };
  [1, 2].forEach((n) => {
    const get = (measure) => one({ discussion: n, measure });
    const r = get("read_post"), c = get("agents"), f = get("final_verdict"), why = get("reason");
    row[`d${n}_post`] = f.post_id;
    row[`d${n}_style`] = f.style;
    row[`d${n}_initial`] = f.initial_verdict;
    row[`d${n}_agent_verdict`] = f.agent_verdict;
    row[`d${n}_final`] = f.verdict;
    row[`d${n}_changed`] = f.changed_to_agents;
    row[`d${n}_verdict_changed`] = f.verdict_changed;
    row[`d${n}_reason`] = why.reason;
    row[`d${n}_read_post_ms`] = r.rt;
    row[`d${n}_agents_ms`] = c.rt; // time on the chat (humanlike) or the pros/cons list (factual)
    row[`d${n}_final_verdict_ms`] = f.rt;
    row[`d${n}_reason_ms`] = why.rt;
    // Times the participant left the tab or window while on this post's pages.
    const idx = new Set([r, c, f, why].map((t) => t.trial_index));
    row[`d${n}_tab_switches`] = jsPsych.data.getInteractionData()
      .filter({ event: "blur" }).values().filter((e) => idx.has(e.trial)).length;
  });
  row.self_intro = one({ style: "humanlike", measure: "agents" }).self_intro;
  row.total_time_ms = all.last(1).values()[0].time_elapsed;
  return row;
}

function summaryCsv(info) {
  const row = summaryRow(info);
  const keys = Object.keys(row);
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return keys.join(",") + "\n" + keys.map((k) => cell(row[k])).join(",") + "\n";
}

// Send the participant's one-row summary to the Google Apps Script web app, which adds
// it to the "summary" sheet. The screen-by-screen data (with the page HTML) is not sent.
// Apps Script doesn't allow reading the reply from another site ("no-cors"), so a
// request that goes out without a network error counts as saved; the script
// ignores a participant ID it has already stored, so a retry can't duplicate rows.
async function saveToGoogleSheets(info) {
  const body = JSON.stringify({ summary: summaryRow(info) });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await fetch(CONFIG.GOOGLE_SHEETS_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body });
      return true;
    } catch (e) { /* network error, retry */ }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  return false;
}

async function main() {
  document.body.insertAdjacentHTML("afterbegin", `<div class="verdict-key">${TEXT.verdict_key}</div>`);
  document.body.insertAdjacentHTML("beforeend", `<p id="loading-msg" style="text-align:center">Loading...</p>`);
  const info = decodeCell(await getCell());
  document.getElementById("loading-msg")?.remove();
  const secondPost = info.firstPost === "A" ? "B" : "A";
  const secondStyle = info.firstStyle === "factual" ? "humanlike" : "factual";
  const discussions = [
    { n: 1, postId: info.firstPost, style: info.firstStyle },
    { n: 2, postId: secondPost, style: secondStyle },
  ];

  jsPsych.data.addProperties({
    participant_id: participantId, prolific_pid: url.PROLIFIC_PID || "", study_id: url.STUDY_ID || "",
    session_id: url.SESSION_ID || "", cell: info.cell, group: info.group,
    first_style: info.firstStyle, first_post: info.firstPost,
  });

  const instructions = { type: jsPsychHtmlButtonResponse, stimulus: TEXT.instructions, choices: ["Start"], data: { measure: "instructions" } };

  const sheetsSave = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p>Saving your responses, please wait...</p>",
    choices: [],
    data: { measure: "save" },
    on_load: async () => {
      const ok = await saveToGoogleSheets(info);
      if (ok) jsPsych.finishTrial({ saved: true });
      else jsPsych.getDisplayElement().innerHTML = `<p>Sorry, we could not save your responses.
        Please check your internet connection and try again.</p>
        <button class="jspsych-btn" id="retry-save">Try again</button>`;
      const retry = document.getElementById("retry-save");
      if (retry) retry.addEventListener("click", async () => {
        retry.disabled = true;
        if (await saveToGoogleSheets(info)) jsPsych.finishTrial({ saved: true });
        else retry.disabled = false;
      });
    },
  };

  const save = ON_COGNITION ? [] : CONFIG.GOOGLE_SHEETS_URL ? [sheetsSave] : CONFIG.DATAPIPE_ID
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
