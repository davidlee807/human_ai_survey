# AITA discussion study (jsPsych)

Open `index.html` in a browser to try it. All libraries are in `lib/`, so it needs no internet connection.

## What to edit

- `src/content.js`: the two AITA posts, the agents' self-introductions and the Host's opening lines (`INTRO_LINES`), the five agents' humanlike messages (`agent_messages[agent verdict][participant verdict][agent]`), the factual pros/cons lists (`FACTUAL_LISTS[post][agent verdict][participant verdict]`), the Host lines, the "why did you change / keep your verdict" question (`REASON_QUESTION`), and the debrief text. There is no consent page (pilot only). Search for `[PLACEHOLDER]`.
- `src/config.js`: the Google Sheets URL, your Prolific completion code, and the typing speed.

Participants choose from four verdicts: YTA, NTA, ESH (everyone sucks here), and NAH (no assholes here). The agents always argue against the participant's first verdict on that post: YTA gets NTA, NTA gets YTA, and ESH or NAH gets YTA or NTA at random (50/50).

## Conditions (within subjects)

Every participant reads both posts and sees both agent styles, one per post. The arguments are the same in both styles; only the presentation differs.

| Style | Chat after the participant's verdict |
|---|---|
| humanlike | The chat opens with introductions (Host welcome, each named agent, the participant types a one-sentence intro). After the verdict, the Host line, then the 5 named agents each post their message. The 2nd and 4th open with "I agree with <previous agent>." |
| factual | No chat and no Host. The post is shown with the four verdict buttons under it. Then a separate page (not a chat) shows the agents' analysis: the agents' verdict (5/5), PROS (points for the agents' verdict) and CONS (points against the participant's verdict), each point marked with the agents that agree with it (Agent 1 to 5). The list types itself out line by line, as if generated (about 4–5 s; speed in `CONFIG.LIST_TYPING`), and Continue unlocks when it is done. |

Each factual point is one agent's humanlike message, and the 2nd and 4th agents are also listed on the point of the agent before them, matching "I agree with …" in the humanlike chat.

Each participant is put into one of 4 cells: which style comes first × which post comes first. This balances both the style order and which post gets which style.

| cell | Discussion 1 | Discussion 2 |
|---|---|---|
| 0 | factual, post A | humanlike, post B |
| 1 | humanlike, post A | factual, post B |
| 2 | factual, post B | humanlike, post A |
| 3 | humanlike, post B | factual, post A |

To test a specific cell, add `?cell=3` to the URL.

## Flow

Instructions → for each post: humanlike: read the post → chat (verdict given with buttons in the chat); factual: post with verdict buttons → pros/cons page; then → final verdict → "Why did you change / keep your verdict?" (free text, required) → save data → thank-you page → redirect to Prolific.

A reminder of what YTA, NTA, ESH and NAH mean stays at the top of the page from the first post on.

## Saving responses (Google Sheets)

When `CONFIG.GOOGLE_SHEETS_URL` is set, each participant's data is sent at the end to a small Google Apps Script (`google/Code.gs`) that writes it into your Google Sheet as one row per participant in the `summary` tab (see the column list below). The page HTML and screen-by-screen log are not sent. Participants see "Saving your responses..." and a "Try again" button if the send fails.

1. Create a new Google Sheet (sheets.new).
2. Extensions → Apps Script. Delete what's there, paste all of `google/Code.gs`, and click Save.
3. Deploy → New deployment → type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Click Deploy and allow access when Google asks.
4. Copy the web app URL (ends in `/exec`) into `GOOGLE_SHEETS_URL` in `src/config.js`.
5. If you edit the script later, use Deploy → Manage deployments → edit → New version, so the URL stays the same.

The URL only lets the page add rows and ask for a cell; it can't read your Sheet (the cell reply carries only the four cell counts). Anyone who finds it could send junk rows, so check `participant_id` / `prolific_pid` against Prolific when you analyse.

**Balanced cells.** When the page opens, it asks the script for a cell. The script gives the cell with the fewest participants so far, counting finished rows in `summary` plus people who started in the last 60 minutes and haven't finished yet (so a burst of Prolific sign-ups doesn't all land in one cell). Ties are broken at random. Each start is logged in an `assignments` tab (participant ID, cell, time); a participant who reloads keeps their cell. Change `PENDING_MINUTES` in the script if the study takes much longer than an hour. If the script can't be reached within 8 seconds, the page falls back to a random cell. `?cell=` test links skip the script and aren't counted, but test runs that finish do add a `summary` row, so delete test rows before going live.

**After updating `google/Code.gs`, redeploy it** (step 5: Deploy → Manage deployments → edit → Version: New version → Deploy), or the page will keep falling back to random cells.

## Data

One row per participant (the `summary` tab of the Google Sheet): `cell`, `group` (`factual_first` or `humanlike_first`), `first_style`, `first_post`, and for each discussion (`d1_`, `d2_`): `post`, `style`, `initial`, `agent_verdict`, `final`, `changed` (final verdict is the one the agents argued), `verdict_changed` (any change of verdict), `reason` (why they changed or kept it), and the times in ms `read_post_ms` (factual: includes giving the verdict), `agents_ms` (time on the chat or the pros/cons page), `final_verdict_ms`, `reason_ms`, plus `tab_switches`. Also `self_intro` (typed in the humanlike chat), `instructions_ms`, `total_time_ms`, `started_at` (page opened), `finished_at` and `is_mobile`.

For testing without the Sheet, clear `GOOGLE_SHEETS_URL` and add `?download=1` to the URL to download the data at the end.

## Going live (free)

1. **DataPipe + OSF:** make an OSF project, then sign in at https://pipe.jspsych.org, connect OSF, and create an experiment. Turn on data collection, and turn on condition assignment with 4 conditions. Paste the experiment ID into `src/config.js`.
2. **GitHub Pages:** create a public repo, upload this whole folder, then go to Settings → Pages → deploy from the main branch. Your study URL will be `https://<user>.github.io/<repo>/`.
3. **Prolific:** set the study URL to
   `https://<user>.github.io/<repo>/?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}`
   and paste the completion code into `src/config.js`.
4. Pilot it with a few people, then check that their files appear in OSF.

## Hosting on Cognition.run instead

Cognition.run hosts the study and saves the data, so you don't need GitHub Pages or DataPipe. The free plan allows 60 completed runs per task, so check that's enough for your sample. A paid plan raises the limit.

1. Create a task: go to Tasks → **+New task**. If the task settings let you pick a jsPsych version, choose the newest. The code works with 7.3 and 8.
2. In the task settings, set the number of conditions to **4**. Cognition spreads participants evenly across them, and the study maps condition 1–4 to cells 0–3 in the table above.
3. Upload `cognition/style.css` as an external library (CSS).
4. Open **Source code** and paste in all of `cognition/task.js`. The posts and messages are in the `src/content.js` section of that file, so you can edit them right there. Or edit `src/` and run `sh cognition/build.sh` to regenerate the file.
5. Use the preview's **Set condition** option to check each of the 4 conditions.
6. In Prolific, set the study URL to `<your task URL>?PROLIFIC_PID={{%PROLIFIC_PID%}}&STUDY_ID={{%STUDY_ID%}}&SESSION_ID={{%SESSION_ID%}}`, and put your completion code in the `CONFIG` section. At the end, participants get a "Return to Prolific" button.
7. Download the data from the task's dashboard as CSV. You get one row per screen. The `final_verdict` rows have `changed_to_agents`, and the `reason` rows have the participant's reason. (The one-row summary file is only made in the GitHub Pages + DataPipe setup.)
