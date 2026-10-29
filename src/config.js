// Study settings. Edit these before going live.
const CONFIG = {
  // Google Apps Script web app URL that writes responses into your Google Sheet
  // (see google/Code.gs and the README). Looks like
  // https://script.google.com/macros/s/AKfy.../exec . Leave empty to turn it off.
  GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/AKfycbxUP8OJlzjuYNwy4A54C6HsyT-Y9oo9qskJ-ox8NSXVUPaQzkb9HZy77RlEuOtTqeNG/exec",

  // DataPipe experiment ID from https://pipe.jspsych.org.
  // Leave empty while testing: the data then downloads as a CSV at the end.
  DATAPIPE_ID: "",

  // Prolific completion code (Study > Completion paths). Leave empty to show
  // a plain "thank you" page instead of redirecting.
  PROLIFIC_COMPLETION_CODE: "",

  // Live-typing feel for the chat. All times are in milliseconds.
  TYPING: {
    first_delay: 800,            // pause before the first message starts
    indicator_min: 2000,         // "..." typing dots are shown for between these
    indicator_max: 2000,         //   two durations (both 2000 = always 2 s); set them
    indicator_ms_per_char: 15,   //   apart to scale with message length x this
    pause_after_message: 0,      // gap after a Host or agent message before the next one starts typing
    pause_after_reply: 700,      // gap after the participant answers before the Host replies
  },
};
