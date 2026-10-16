// A jsPsych trial that plays a pre-written group chat as if it were live:
// a typing indicator appears, then each message streams in, one speaker at a time.
var jsPsychChat = (function (jspsych) {
  "use strict";

  const info = {
    name: "chat",
    version: "1.0.0",
    parameters: {
      // HTML shown in a collapsible box above the chat (e.g. the AITA post)
      context_html: { type: jspsych.ParameterType.HTML_STRING, default: "" },
      context_label: { type: jspsych.ParameterType.STRING, default: "Show the post again" },
      // Shown as the participant's own bubble at the top, e.g. "My verdict: YTA"
      participant_message: { type: jspsych.ParameterType.STRING, default: null },
      // [{ name, color, text, role: "host" | "agent" }]
      messages: { type: jspsych.ParameterType.COMPLEX, array: true, default: [] },
      typing: { type: jspsych.ParameterType.OBJECT, default: {} },
      button_label: { type: jspsych.ParameterType.STRING, default: "Continue" },
    },
    data: {
      messages_shown: { type: jspsych.ParameterType.STRING },
      chat_done_ms: { type: jspsych.ParameterType.INT },
      rt: { type: jspsych.ParameterType.INT },
    },
  };

  class ChatPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      const t = Object.assign(
        { first_delay: 800, indicator_min: 900, indicator_max: 2200, ms_per_char: 28, pause_after_message: 700 },
        trial.typing
      );
      const start = performance.now();
      let chatDone = null;
      const timers = [];
      const later = (fn, ms) => timers.push(setTimeout(fn, ms));

      display_element.innerHTML = `
        <div class="chat-wrap">
          ${trial.context_html ? `<details class="chat-context"><summary>${trial.context_label}</summary>${trial.context_html}</details>` : ""}
          <div class="chat-log" id="chat-log"></div>
          <button class="jspsych-btn chat-continue" id="chat-continue" disabled>${trial.button_label}</button>
        </div>`;
      const log = display_element.querySelector("#chat-log");
      const btn = display_element.querySelector("#chat-continue");

      if (trial.participant_message) {
        log.insertAdjacentHTML("beforeend", `<div class="msg msg-self"><div class="bubble">${escapeHtml(trial.participant_message)}</div><div class="avatar avatar-self"></div></div>`);
      }

      const scroll = () => { log.scrollTop = log.scrollHeight; };

      const addRow = (m) => {
        const row = document.createElement("div");
        row.className = `msg msg-${m.role || "agent"}`;
        row.innerHTML = `
          <div class="avatar" style="background:${m.color}">${m.name[0]}</div>
          <div class="bubble"><div class="name" style="color:${m.role === "host" ? "inherit" : m.color}">${m.name}</div><div class="text"><span class="typing"><i></i><i></i><i></i></span></div></div>`;
        log.appendChild(row);
        scroll();
        return row.querySelector(".text");
      };

      const play = (i) => {
        if (i >= trial.messages.length) {
          chatDone = Math.round(performance.now() - start);
          btn.disabled = false;
          btn.classList.add("ready");
          return;
        }
        const m = trial.messages[i];
        const textEl = addRow(m);
        const indicator = Math.min(t.indicator_max, Math.max(t.indicator_min, m.text.length * 15));
        later(() => {
          // Stream the text a few characters at a time
          textEl.textContent = "";
          let pos = 0;
          const step = () => {
            pos = Math.min(m.text.length, pos + 2);
            textEl.textContent = m.text.slice(0, pos);
            scroll();
            if (pos < m.text.length) later(step, t.ms_per_char * 2);
            else later(() => play(i + 1), t.pause_after_message);
          };
          step();
        }, indicator);
      };

      later(() => play(0), t.first_delay);

      btn.addEventListener("click", () => {
        timers.forEach(clearTimeout);
        display_element.innerHTML = "";
        this.jsPsych.finishTrial({
          messages_shown: JSON.stringify(trial.messages.map((m) => ({ name: m.name, text: m.text }))),
          chat_done_ms: chatDone,
          rt: Math.round(performance.now() - start),
        });
      });
    }
  }
  ChatPlugin.info = info;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  return ChatPlugin;
})(jsPsychModule);
