// A jsPsych trial that plays a pre-written group chat as if it were live:
// a typing indicator appears, then each message streams in, one speaker at a time.
// The script can pause for the participant to type a message or click a button.
var jsPsychChat = (function (jspsych) {
  "use strict";

  const info = {
    name: "chat",
    version: "2.0.0",
    parameters: {
      // HTML shown in a collapsible box above the chat (e.g. the AITA post)
      context_html: { type: jspsych.ParameterType.HTML_STRING, default: "" },
      context_label: { type: jspsych.ParameterType.STRING, default: "Show the post again" },
      // Steps played in order. Each step is one of:
      //   { name, color, role: "host" | "agent", text }                 a message
      //   { input: "text", key, placeholder, min_chars, max_chars }     participant types a reply
      //   { input: "choice", key, choices: [{ label, value, say }] }    participant clicks a button
      //   (responses) => [steps]   steps built from earlier replies, e.g. agents answering the verdict
      script: { type: jspsych.ParameterType.COMPLEX, array: true, default: [] },
      typing: { type: jspsych.ParameterType.OBJECT, default: {} },
      button_label: { type: jspsych.ParameterType.STRING, default: "Continue" },
    },
    data: {
      messages_shown: { type: jspsych.ParameterType.STRING },
      responses: { type: jspsych.ParameterType.OBJECT },
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
      const queue = [...trial.script];
      const responses = {};
      const shown = [];

      display_element.innerHTML = `
        <div class="chat-wrap">
          ${trial.context_html ? `<details class="chat-context"><summary>${trial.context_label}</summary>${trial.context_html}</details>` : ""}
          <div class="chat-log" id="chat-log"></div>
          <div class="chat-input" id="chat-input"></div>
          <button class="jspsych-btn chat-continue" id="chat-continue" disabled>${trial.button_label}</button>
        </div>`;
      const log = display_element.querySelector("#chat-log");
      const inputArea = display_element.querySelector("#chat-input");
      const btn = display_element.querySelector("#chat-continue");

      const scroll = () => { log.scrollTop = log.scrollHeight; };

      const addSelf = (text) => {
        log.insertAdjacentHTML("beforeend", `<div class="msg msg-self"><div class="bubble">${escapeHtml(text)}</div><div class="avatar avatar-self">You</div></div>`);
        shown.push({ name: "You", text });
        scroll();
      };

      const addRow = (m) => {
        const row = document.createElement("div");
        row.className = `msg msg-${m.role || "agent"}`;
        row.innerHTML = `
          <div class="avatar" style="background:${m.color}">${m.role === "host" ? "Host" : m.name[0]}</div>
          <div class="bubble"><div class="name" style="color:${m.role === "host" ? "inherit" : m.color}">${m.name}</div><div class="text"><span class="typing"><i></i><i></i><i></i></span></div></div>`;
        log.appendChild(row);
        scroll();
        return row.querySelector(".text");
      };

      const answer = (key, value, said) => {
        responses[key] = value;
        inputArea.innerHTML = "";
        if (said) addSelf(said); // a blank reply (allowed when min_chars is 0) adds no bubble
        later(next, t.pause_after_message);
      };

      const askText = (s) => {
        inputArea.innerHTML = `<input type="text" class="chat-text" placeholder="${escapeHtml(s.placeholder || "Type your message...")}" maxlength="${s.max_chars || 300}"><button class="jspsych-btn chat-send"${(s.min_chars ?? 2) > 0 ? " disabled" : ""}>Send</button>`;
        const field = inputArea.querySelector(".chat-text");
        const send = inputArea.querySelector(".chat-send");
        const ok = () => field.value.trim().length >= (s.min_chars ?? 2);
        field.addEventListener("input", () => { send.disabled = !ok(); });
        const submit = () => { if (ok()) answer(s.key, field.value.trim(), field.value.trim()); };
        send.addEventListener("click", submit);
        field.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } });
        field.focus();
      };

      const askChoice = (s) => {
        inputArea.innerHTML = s.choices.map((c, i) => `<button class="jspsych-btn chat-choice" data-i="${i}">${c.label}</button>`).join("");
        inputArea.querySelectorAll(".chat-choice").forEach((b) => b.addEventListener("click", () => {
          const c = s.choices[Number(b.dataset.i)];
          answer(s.key, c.value, c.say || c.label);
        }));
      };

      const say = (m) => {
        const textEl = addRow(m);
        shown.push({ name: m.name, text: m.text });
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
            else later(next, t.pause_after_message);
          };
          step();
        }, indicator);
      };

      const next = () => {
        let s = queue.shift();
        while (typeof s === "function") {
          queue.unshift(...s(responses));
          s = queue.shift();
        }
        if (!s) {
          chatDone = Math.round(performance.now() - start);
          btn.disabled = false;
          btn.classList.add("ready");
          return;
        }
        if (s.input === "text") askText(s);
        else if (s.input === "choice") askChoice(s);
        else say(s);
      };

      later(next, t.first_delay);

      btn.addEventListener("click", () => {
        timers.forEach(clearTimeout);
        display_element.innerHTML = "";
        this.jsPsych.finishTrial({
          messages_shown: JSON.stringify(shown),
          responses,
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
