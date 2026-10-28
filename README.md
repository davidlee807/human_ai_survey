# AITA discussion study (jsPsych)

Open `index.html` in a browser to try it. All libraries are in `lib/`, so it needs no internet connection.

## What to edit

- `src/content.js`: the two AITA posts, the agents' self-introductions and the Host's opening lines (`INTRO_LINES`), the five agents' explanations (`agent_messages[agent verdict][participant verdict][agent]`, six per agent per post), the Host lines, the survey items, and the consent and debrief text. Search for `[PLACEHOLDER]`.
- `src/config.js`: your DataPipe ID, your Prolific completion code, and the typing speed.

Participants choose from four verdicts: YTA, NTA, ESH (everyone sucks here), and NAH (no assholes here). The agents' verdict depends on the participant's first verdict on that post: YTA gets NTA, NTA gets YTA, and ESH or NAH gets YTA or NTA at random (50/50). Each agent has its own explanation for every pair of agent verdict and participant verdict, so there are three YTA explanations (replying to NTA, ESH or NAH) and three NTA explanations (replying to YTA, ESH or NAH) per agent and post.

## Conditions

Every participant reads both posts. The chat page differs by condition:

In every condition the discussion chat opens with the Host asking for the participant's verdict (YTA, NTA, ESH, or NAH), which they give with buttons in the chat, followed by a typed explanation of a sentence or two. What follows depends on the condition:

| Condition | Chat shown after the verdict |
|---|---|
| baseline | Host neutral line, then the 5 agents |
| preemptive (Group 1) | Host freedom-restoring line, then the 5 agents |
| post (Group 2) | the 5 agents, then the Host freedom-restoring line |

Each participant is put into one of 8 cells: group (preemptive / post) × which post comes first (A / B) × whether the baseline is Discussion 1 or 2. Set `COUNTERBALANCE_BASELINE_POSITION: false` to always make Discussion 1 the baseline (that leaves 4 cells).

| cell | group | first post | baseline is |
|---|---|---|---|
| 0 | preemptive | A | Disc 1 |
| 1 | post | A | Disc 1 |
| 2 | preemptive | B | Disc 1 |
| 3 | post | B | Disc 1 |
| 4 | preemptive | A | Disc 2 |
| 5 | post | A | Disc 2 |
| 6 | preemptive | B | Disc 2 |
| 7 | post | B | Disc 2 |

To test a specific cell, add `?cell=5` to the URL.

## Flow

Consent → instructions → for each post: read the post → chat → perceived threat (4 items, 1–5; the attention check is mixed into the second set) → final verdict → save data → thank-you page → redirect to Prolific.

The first chat opens with introductions: the Host welcomes everyone, each agent introduces themselves, and the participant types a one-sentence intro. Then, in every chat, the Host asks for the verdict (four buttons), the participant types a sentence or two explaining it, and the Host line and agents follow by condition.

A reminder of what YTA, NTA, ESH and NAH mean stays at the top of the page from the first post on. The 2nd and 4th agents open with "I agree with <previous agent>." (`AGREE_PREFIX` in `src/content.js`). The explanation after the verdict is optional.

## Saving responses (Firebase)

When `CONFIG.FIREBASE.apiKey` is set, each participant's data is saved at the end as one document in the Firestore collection `responses` (document ID = Prolific ID or a random ID). The document holds the summary row as fields plus the full trial CSV in `trials_csv`. Participants see "Saving your responses..." and a "Try again" button if the save fails.

1. Create a project at https://console.firebase.google.com (Google Analytics not needed).
2. Build → Firestore Database → Create database (production mode, any location).
3. Firestore → Rules: paste `firestore.rules` from this repo and Publish.
4. Project settings → Your apps → add a Web app. Copy `apiKey` and `projectId` into `CONFIG.FIREBASE` in `src/config.js`.
5. To download the data: `pip install firebase-admin`, save a service-account key (Project settings → Service accounts → Generate new private key) as `tools/service-account.json`, and run `python tools/export_responses.py`. It writes `data/summary.csv` and `data/trials/<id>.csv`. Never commit the key.

Without DataPipe, participants are assigned to one of the 8 cells at random rather than in strict balance.

## Data

Two CSV files are saved for each participant:
- `<id>_summary.csv`: one row with group, cell, and for each discussion the post, condition, initial and final verdict, the agents' verdict, `changed` (final verdict is the one the agents argued), `verdict_changed` (any change of verdict), the four threat items, the threat mean, plus `attention_pass`, `self_intro` (the sentence the participant typed), and each discussion's `explanation`. Stack these files for the analysis.
- `<id>_trials.csv`: every screen with timestamps, response times, and the exact chat messages that were shown.

If no DataPipe ID is set, nothing is saved. For testing, add `?download=1` to the URL and both files download at the end.

## Going live (free)

1. **DataPipe + OSF:** make an OSF project, then sign in at https://pipe.jspsych.org, connect OSF, and create an experiment. Turn on data collection, and turn on condition assignment with 8 conditions (or 4). Paste the experiment ID into `src/config.js`.
2. **GitHub Pages:** create a public repo, upload this whole folder, then go to Settings → Pages → deploy from the main branch. Your study URL will be `https://<user>.github.io/<repo>/`.
3. **Prolific:** set the study URL to
   `https://<user>.github.io/<repo>/?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}`
   and paste the completion code into `src/config.js`.
4. Pilot it with a few people, then check that their files appear in OSF.

## Hosting on Cognition.run instead

Cognition.run hosts the study and saves the data, so you don't need GitHub Pages or DataPipe. The free plan allows 60 completed runs per task, so check that's enough for your sample. A paid plan raises the limit.

1. Create a task: go to Tasks → **+New task**. If the task settings let you pick a jsPsych version, choose the newest. The code works with 7.3 and 8.
2. In the task settings, set the number of conditions to **8** (or 4 if `COUNTERBALANCE_BASELINE_POSITION` is false). Cognition spreads participants evenly across them, and the study maps condition 1–8 to cells 0–7 in the table above.
3. Upload `cognition/style.css` as an external library (CSS).
4. Open **Source code** and paste in all of `cognition/task.js`. The posts and messages are in the `src/content.js` section of that file, so you can edit them right there. Or edit `src/` and run `sh cognition/build.sh` to regenerate the file.
5. Use the preview's **Set condition** option to check each of the 8 conditions.
6. In Prolific, set the study URL to `<your task URL>?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}`, and put your completion code in the `CONFIG` section. At the end, participants get a "Return to Prolific" button.
7. Download the data from the task's dashboard as CSV. You get one row per screen. The `final_verdict` rows have `changed_to_agents`, and the `threat` rows have `threat_mean`. (The one-row summary file is only made in the GitHub Pages + DataPipe setup.)
