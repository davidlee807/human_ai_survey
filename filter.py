"""Find AITA posts in the Scruples anecdotes data where YTA and NTA votes are closely split.

Usage:
    python filter_scruples.py path/to/anecdotes [--min-votes 50] [--max-share 0.6] [--out split_posts.csv]

Scruples label names map to Reddit verdicts as:
    AUTHOR = YTA, OTHER = NTA, EVERYBODY = ESH, NOBODY = NAH, INFO = INFO
"""
import argparse
import csv
import glob
import json
import os

parser = argparse.ArgumentParser()
parser.add_argument("data_dir", help="folder containing the *.scruples-anecdotes.jsonl files")
parser.add_argument("--min-votes", type=int, default=50, help="minimum YTA + NTA votes")
parser.add_argument("--max-share", type=float, default=0.6, help="max share of YTA+NTA votes either side may have")
parser.add_argument("--max-esh-nah", type=float, default=0.3, help="max share of all votes that are ESH or NAH")
parser.add_argument("--max-words", type=int, default=None, help="drop posts longer than this many words")
parser.add_argument("--out", default="split_posts.csv")
args = parser.parse_args()

rows = []
for path in sorted(glob.glob(os.path.join(args.data_dir, "*.jsonl"))):
    with open(path, encoding="utf-8") as f:
        for line in f:
            post = json.loads(line)
            s = post["label_scores"]
            yta, nta = s["AUTHOR"], s["OTHER"]
            esh, nah, info = s["EVERYBODY"], s["NOBODY"], s["INFO"]
            total = yta + nta + esh + nah + info
            binary = yta + nta
            if binary < args.min_votes:
                continue
            yta_share = yta / binary
            if max(yta_share, 1 - yta_share) > args.max_share:
                continue
            if (esh + nah) / total > args.max_esh_nah:
                continue
            words = len(post["text"].split())
            if args.max_words and words > args.max_words:
                continue
            rows.append({
                "post_id": post["post_id"],
                "url": f"https://www.reddit.com/comments/{post['post_id']}",
                "title": post["title"],
                "yta": yta, "nta": nta, "esh": esh, "nah": nah, "info": info,
                "yta_share": round(yta_share, 3),
                # 0 = perfect 50/50 split, 0.5 = unanimous
                "imbalance": round(abs(yta_share - 0.5), 3),
                "words": words,
                "text": post["text"].strip(),
            })

rows.sort(key=lambda r: (r["imbalance"], -(r["yta"] + r["nta"])))

with open(args.out, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["post_id"])
    writer.writeheader()
    writer.writerows(rows)

print(f"Kept {len(rows)} posts, most evenly split first -> {args.out}")
