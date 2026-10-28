"""Download all study responses from Firestore into CSV files.

Setup (once):
  1. pip install firebase-admin
  2. Firebase console > Project settings > Service accounts > Generate new private key.
     Save the file as tools/service-account.json. Keep it private: never commit it
     (it is listed in .gitignore) and never share it.

Run:
  python tools/export_responses.py

Writes:
  data/summary.csv       one row per participant (ready for analysis)
  data/trials/<id>.csv   every screen for each participant
"""
import csv
import os
import sys

import firebase_admin
from firebase_admin import credentials, firestore

HERE = os.path.dirname(os.path.abspath(__file__))
KEY = os.path.join(HERE, "service-account.json")
OUT = os.path.join(HERE, "..", "data")
COLLECTION = "responses"

if not os.path.exists(KEY):
    sys.exit(f"Missing {KEY}. See the setup notes at the top of this file.")

firebase_admin.initialize_app(credentials.Certificate(KEY))
docs = [d.to_dict() for d in firestore.client().collection(COLLECTION).stream()]
os.makedirs(os.path.join(OUT, "trials"), exist_ok=True)

columns = []
for d in docs:
    for k in d:
        if k not in ("trials_csv",) and k not in columns:
            columns.append(k)

with open(os.path.join(OUT, "summary.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=columns, extrasaction="ignore")
    w.writeheader()
    for d in docs:
        w.writerow(d)

for d in docs:
    with open(os.path.join(OUT, "trials", f"{d['participant_id']}.csv"), "w", encoding="utf-8") as f:
        f.write(d.get("trials_csv", ""))

print(f"Saved {len(docs)} participants to {os.path.abspath(OUT)}")
