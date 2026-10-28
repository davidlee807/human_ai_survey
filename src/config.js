// Study settings. Edit these before going live.
const CONFIG = {
  // Firebase (Firestore) project that stores the responses. Copy these two values
  // from Firebase console > Project settings > Your apps > Web app config.
  // They are safe to publish: the security rules (firestore.rules) only let
  // participants add new responses, never read or change them.
  // Leave apiKey empty to turn Firebase saving off.
  FIREBASE: {
    apiKey: "",
    projectId: "",
    collection: "responses",
  },

  // DataPipe experiment ID from https://pipe.jspsych.org.
  // Leave empty while testing: the data then downloads as a CSV at the end.
  DATAPIPE_ID: "",

  // Prolific completion code (Study > Completion paths). Leave empty to show
  // a plain "thank you" page instead of redirecting.
  PROLIFIC_COMPLETION_CODE: "",

  // Counterbalancing. Cells are: group (preemptive / post) x which post comes
  // first (A / B), and optionally x whether the baseline is Discussion 1 or 2.
  // In DataPipe, set the number of conditions to 8 if this is true, 4 if false.
  COUNTERBALANCE_BASELINE_POSITION: true,

  // Live-typing feel for the chat. All times are in milliseconds.
  TYPING: {
    first_delay: 800,          // pause before the first message starts
    indicator_min: 900,        // "Cody is typing..." dots are shown for
    indicator_max: 2200,       //   between these two durations, longer for longer messages
    ms_per_char: 28,           // speed text streams into the bubble
    pause_after_message: 700,  // gap before the next speaker starts
  },
};
