// Google Apps Script that stores study responses in this Google Sheet.
// Setup: open your Sheet > Extensions > Apps Script, replace everything with this
// file, then Deploy > New deployment > Web app (Execute as: Me, Who has access:
// Anyone). Copy the web app URL into GOOGLE_SHEETS_URL in src/config.js.
//
// Writes one row per participant to the "summary" tab (created on first use).
// New columns are added automatically. A participant ID that is already in
// "summary" is ignored, so a repeated send can't create duplicate rows.
//
// It also hands out cells (doGet ?action=assign) so the 4 cells fill evenly. Each new
// participant gets the cell with the fewest people so far, counting finished rows in
// "summary" plus people who started in the last PENDING_MINUTES and haven't finished
// (kept in the "assignments" tab). Ties are broken at random. Someone who reloads the
// page gets the cell they were given before.

// If this script was created from a Google Form or on its own (script.google.com),
// paste the ID of the Google Sheet to write to here. It is the long code in the
// Sheet's address: docs.google.com/spreadsheets/d/THIS_PART/edit
// Leave it empty if you created the script from the Sheet (Extensions > Apps Script).
const SHEET_ID = "";

const N_CELLS = 4;
// How long a started-but-unfinished participant still holds a place in their cell.
// Set it a bit above the longest time the study normally takes.
const PENDING_MINUTES = 60;

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== "assign") return reply_("ok");
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    const id = String(p.pid || "");
    const finished = rows_(getSheet_(ss, "summary"));
    const assignSheet = getSheet_(ss, "assignments");
    const assigned = rows_(assignSheet);

    // Same participant again (e.g. a page reload): keep their cell.
    const prev = assigned.filter((r) => id && String(r.participant_id) === id).pop();
    if (prev && prev.cell !== "") return reply_("ok", { cell: Number(prev.cell), counts: null });

    const counts = new Array(N_CELLS).fill(0);
    const done = new Set();
    finished.forEach((r) => {
      done.add(String(r.participant_id));
      const c = Number(r.cell);
      if (r.cell !== "" && c >= 0 && c < N_CELLS) counts[c]++;
    });
    const cutoff = Date.now() - PENDING_MINUTES * 60 * 1000;
    assigned.forEach((r) => {
      const c = Number(r.cell);
      if (done.has(String(r.participant_id)) || !(c >= 0 && c < N_CELLS)) return;
      if (new Date(r.assigned_at).getTime() >= cutoff) counts[c]++;
    });

    const min = Math.min.apply(null, counts);
    const options = counts.map((n, c) => (n === min ? c : -1)).filter((c) => c >= 0);
    const cell = options[Math.floor(Math.random() * options.length)];
    appendRows_(assignSheet, [{ participant_id: id, cell: cell, assigned_at: new Date() }]);
    return reply_("ok", { cell: cell, counts: counts });
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    const id = String(data.summary.participant_id);
    const summary = getSheet_(ss, "summary");
    if (summary.getLastRow() > 1) {
      const col = headers_(summary).indexOf("participant_id") + 1;
      if (col > 0) {
        const ids = summary.getRange(2, col, summary.getLastRow() - 1, 1).getValues().flat().map(String);
        if (ids.includes(id)) return reply_("duplicate");
      }
    }
    appendRows_(summary, [Object.assign({ received_at: new Date() }, data.summary)]);
    return reply_("ok");
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function headers_(sheet) {
  if (sheet.getLastColumn() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
}

// All rows of a tab as objects keyed by the header row.
function rows_(sheet) {
  if (sheet.getLastRow() < 2) return [];
  const headers = headers_(sheet);
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues()
    .map((v) => Object.fromEntries(headers.map((h, i) => [h, v[i]])));
}

function appendRows_(sheet, rows) {
  if (!rows.length) return;
  const headers = headers_(sheet);
  rows.forEach((r) => Object.keys(r).forEach((k) => { if (!headers.includes(k)) headers.push(k); }));
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  const values = rows.map((r) => headers.map((h) => (r[h] === undefined || r[h] === null ? "" : r[h])));
  sheet.getRange(sheet.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
}

function reply_(status, extra) {
  const body = Object.assign({ status: status }, extra || {});
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
