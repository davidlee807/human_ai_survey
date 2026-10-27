# AITA discussion study (jsPsych)

Open `index.html` in a browser to try it. All libraries are in `lib/`, so it needs no internet connection.

## What to edit

- `src/content.js`: the two AITA posts, the agents' self-introductions and the Host's opening lines (`INTRO_LINES`), the five agents' messages (one set for when the agents say NTA and one for when they say YTA, for each post), the Host lines, the survey items, and the consent and debrief text. Search for `[PLACEHOLDER]`.
- `src/config.js`: your DataPipe ID, your Prolific completion code, and the typing speed.

The agents always take the side opposite to the participant's first verdict on that post.

## Conditions

Every participant reads both posts. The chat page differs by condition:

In every condition the discussion chat opens with the Host asking for the participant's verdict (NTA or YTA), which they give with buttons in the chat. What follows depends on the condition:

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

Consent → instructions → introduction chat (the Host welcomes everyone, each agent introduces themselves, the Host asks the participant to introduce themselves in one sentence, which they type, and the Host thanks them) → for each post: read the post → chat (Host asks for the verdict, participant answers in the chat, then the Host line and agents by condition) → perceived threat (4 items, 1–5; the attention check is mixed into the second set) → final verdict → manipulation check → save data → debrief → redirect to Prolific.

## Data

Two CSV files are saved for each participant:
- `<id>_summary.csv`: one row with group, cell, and for each discussion the post, condition, initial and final verdict, `changed` (switched to the agents' side), the four threat items, the threat mean, the manipulation-check answer, plus `attention_pass` and `self_intro` (the sentence the participant typed). Stack these files for the analysis.
- `<id>_trials.csv`: every screen with timestamps, response times, and the exact chat messages that were shown.

If no DataPipe ID is set (test mode), both files download at the end.

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
