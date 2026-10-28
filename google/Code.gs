// Google Apps Script that stores study responses in this Google Sheet.
// Setup: open your Sheet > Extensions > Apps Script, replace everything with this
// file, then Deploy > New deployment > Web app (Execute as: Me, Who has access:
// Anyone). Copy the web app URL into GOOGLE_SHEETS_URL in src/config.js.
//
// Writes two tabs, created on first use:
//   summary  one row per participant (ready for analysis)
//   trials   one row per screen, for every participant
// New columns are added automatically. A participant ID that is already in
// "summary" is ignored, so a repeated send can't create duplicate rows.

// If this script was created from a Google Form or on its own (script.google.com),
// paste the ID of the Google Sheet to write to here. It is the long code in the
// Sheet's address: docs.google.com/spreadsheets/d/THIS_PART/edit
// Leave it empty if you created the script from the Sheet (Extensions > Apps Script).
const SHEET_ID = "";

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
    appendRows_(getSheet_(ss, "trials"), data.trials || []);
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

function appendRows_(sheet, rows) {
  if (!rows.length) return;
  const headers = headers_(sheet);
  rows.forEach((r) => Object.keys(r).forEach((k) => { if (!headers.includes(k)) headers.push(k); }));
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  const values = rows.map((r) => headers.map((h) => (r[h] === undefined || r[h] === null ? "" : r[h])));
  sheet.getRange(sheet.getLastRow() + 1, 1, values.length, headers.length).setValues(values);
}

function reply_(status) {
  return ContentService.createTextOutput(JSON.stringify({ status: status })).setMimeType(ContentService.MimeType.JSON);
}
