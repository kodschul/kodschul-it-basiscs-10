"""Abschlusspruefung exam server (courses/it-basics-10-com).

Trainer runs this on their laptop (`python3 server.py`), TN access it over the
local network via the trainer's gateway/LAN IP + port (no internet needed,
stdlib only - no pip install required on the trainer machine).

Design goals (per trainer request):
- Questions/correct answers/reference solutions live ONLY in this process
  (exam_data.json, read once at startup) - never shipped to the TN browser.
- TN get an isolated per-session attempt (uuid4 session id), persisted in
  SQLite (exam.db) so a page refresh/reconnect resumes instead of losing work.
- The exam stays locked (no questions released) until the trainer calls
  POST /api/trainer/open - TN opening the page earlier just see a waiting
  screen and poll /api/status.
- Both PDF-style reports (Kurzbericht/Detaillierter Bericht) are generated and
  PERSISTED server-side the moment a TN submits the Wahlteil, so TN can't see/
  tamper with them - only reachable via the password-gated /api/trainer/report
  endpoint.
"""

import json
import os
import random
import re
import sqlite3
import threading
import uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DB_PATH = os.path.join(BASE_DIR, "exam.db")
DATA_PATH = os.path.join(BASE_DIR, "exam_data.json")

TRAINER_PASSWORD_MD5 = "f6036f2a9d06330f8768c9a4e19e3cad"
# Fallback defaults only - the trainer can change these live via /trainer, the
# active values are persisted in exam_state and snapshotted onto each session.
DEFAULT_PFLICHTTEIL_DURATION_SECONDS = 35 * 60
DEFAULT_WAHLTEIL_DURATION_SECONDS = 15 * 60
PASS_RATIO = 0.6

with open(DATA_PATH, encoding="utf-8") as f:
    EXAM_DATA = json.load(f)
SLOTS = EXAM_DATA["slots"]
WAHLTEIL_VARIANTEN = EXAM_DATA["wahlteilVarianten"]
REFERENCE_SOLUTIONS = EXAM_DATA["wahlteilReferenceSolutions"]

db_lock = threading.Lock()


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS exam_state (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            is_open INTEGER NOT NULL DEFAULT 0,
            opened_at TEXT,
            pflichtteil_duration_seconds INTEGER NOT NULL DEFAULT 2100,
            wahlteil_duration_seconds INTEGER NOT NULL DEFAULT 900
        );
        INSERT OR IGNORE INTO exam_state (id, is_open, pflichtteil_duration_seconds, wahlteil_duration_seconds)
            VALUES (1, 0, 2100, 900);

        CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            created_at TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pflichtteil',
            assigned_questions TEXT NOT NULL,
            pflichtteil_answers TEXT,
            pflichtteil_result TEXT,
            pflichtteil_duration_seconds INTEGER,
            wahlteil_duration_seconds INTEGER,
            wahlteil_started_at TEXT,
            wahlteil_variant TEXT,
            wahlteil_code TEXT,
            wahlteil_submitted_at TEXT,
            report_detailed_html TEXT,
            report_summary_html TEXT
        );
        """
    )
    conn.commit()
    conn.close()


def grade_for(ratio):
    if ratio >= 0.9:
        return 1, "sehr gut"
    if ratio >= 0.75:
        return 2, "gut"
    if ratio >= 0.6:
        return 3, "befriedigend"
    if ratio >= 0.45:
        return 4, "ausreichend"
    return 5, "mangelhaft"


def draw_pflichtteil():
    order = SLOTS[:]
    random.shuffle(order)
    drawn = []
    for slot in order:
        variant = random.choice(slot["variants"])
        drawn.append(
            {
                "module": slot["module"],
                "q": variant["q"],
                "options": variant["options"],
                "correct": variant["correct"],
            }
        )
    return drawn


def get_exam_state(conn):
    row = conn.execute(
        "SELECT is_open, pflichtteil_duration_seconds, wahlteil_duration_seconds FROM exam_state WHERE id = 1"
    ).fetchone()
    if not row:
        return {
            "open": False,
            "pflichtteilDurationSeconds": DEFAULT_PFLICHTTEIL_DURATION_SECONDS,
            "wahlteilDurationSeconds": DEFAULT_WAHLTEIL_DURATION_SECONDS,
        }
    return {
        "open": bool(row["is_open"]),
        "pflichtteilDurationSeconds": row["pflichtteil_duration_seconds"],
        "wahlteilDurationSeconds": row["wahlteil_duration_seconds"],
    }


# ---------------------------------------------------------------------------
# Report HTML generation (ported from the old client-side exportSummaryReport
# / exportDetailedReport logic) - runs server-side only, persisted in SQLite.
# ---------------------------------------------------------------------------

REPORT_STYLE = """
body { font-family: Arial, Helvetica, sans-serif; color: #111; padding: 32px; max-width: 700px; margin: 0 auto; }
h1 { font-size: 20px; margin-bottom: 4px; }
h2 { font-size: 15px; margin-top: 28px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
.meta { color: #555; font-size: 13px; margin-bottom: 20px; }
.badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 13px; font-weight: bold; }
.pass { background: #d1fae5; color: #065f46; }
.fail { background: #fee2e2; color: #991b1b; }
.pending { background: #dbeafe; color: #1e40af; }
pre { background: #f3f4f6; padding: 10px; border-radius: 4px; font-size: 12px; white-space: pre-wrap; word-break: break-word; }
.q-block { margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
.q-module { font-size: 11px; color: #888; text-transform: uppercase; }
.q-text { font-size: 13px; margin: 2px 0 6px; }
.q-options { list-style: none; padding: 0; margin: 0; font-size: 12.5px; }
.q-options li { padding: 2px 0; }
.q-options li.correct { color: #065f46; font-weight: bold; }
.q-options li.chosen-wrong { color: #991b1b; font-weight: bold; }
"""


def esc(text):
    if text is None:
        return ""
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def report_shell(title, name, body_html):
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<title>{esc(title)} - {esc(name)}</title>
<style>{REPORT_STYLE}</style>
</head>
<body>
{body_html}
</body>
</html>"""


def pflichtteil_summary_html(result):
    badge_cls = "pass" if result["passed"] else "fail"
    badge_txt = "bestanden" if result["passed"] else "nicht bestanden"
    return f"""
  <h2>Pflichtteil</h2>
  <p>Punktzahl: {result['score']} / {result['total']} &middot; Note {result['grade']['note']} ({result['grade']['label']})
  <br/><span class="badge {badge_cls}">{badge_txt}</span></p>
"""


def wahlteil_html(variant_label, code):
    return f"""
  <h2>Wahlteil</h2>
  <p>Szenario: {esc(variant_label)}
  <br/><span class="badge pending">eingereicht, wartet auf Trainer-Check</span></p>
  <p><b>Python-Lösung:</b></p>
  <pre>{esc(code)}</pre>
"""


def gesamtentscheidung_html():
    return """
  <h2>Gesamtentscheidung</h2>
  <p>Beide Teile müssen für sich bestanden sein. Die endgültige Entscheidung steht erst nach dem Trainer-Check des Wahlteils fest.</p>
"""


def build_summary_report(name, timestamp, result, variant_label, code):
    body = (
        "<h1>Abschlussprüfung - Kurzbericht</h1>"
        f'<div class="meta">Name: <b>{esc(name)}</b> &middot; Eingereicht: {esc(timestamp)}</div>'
        + pflichtteil_summary_html(result)
        + wahlteil_html(variant_label, code)
        + gesamtentscheidung_html()
    )
    return report_shell("Abschlussprüfung Kurzbericht", name, body)


def build_detailed_report(name, timestamp, result, variant_label, code):
    letters = ["a", "b", "c", "d"]
    gaps = result["moduleGaps"]
    if gaps:
        gaps_html = "<h2>Wissenslücken je Modul</h2><ul>" + "".join(
            f"<li>{esc(g['module'])}: {g['wrongCount']} falsch beantwortet</li>" for g in gaps
        ) + "</ul>"
    else:
        gaps_html = "<h2>Wissenslücken je Modul</h2><p>Alle Fragen richtig beantwortet.</p>"

    question_blocks = []
    for i, q in enumerate(result["questions"]):
        options_html = []
        for oi, opt in enumerate(q["options"]):
            is_correct = oi == q["correctIndex"]
            is_chosen = oi == q["chosenIndex"]
            cls = "correct" if is_correct else (
                "chosen-wrong" if is_chosen else "")
            if is_correct and is_chosen:
                suffix = " ✓ richtig gewählt"
            elif is_correct:
                suffix = " ✓ richtige Antwort"
            elif is_chosen:
                suffix = " ← gewählt (falsch)"
            else:
                suffix = ""
            options_html.append(
                f'<li class="{cls}">{letters[oi]}) {esc(opt)}{suffix}</li>')
        question_blocks.append(
            f"""
      <div class="q-block">
        <div class="q-module">{esc(q['module'])}</div>
        <div class="q-text"><b>{i + 1}.</b> {esc(q['question'])}</div>
        <ul class="q-options">{''.join(options_html)}</ul>
      </div>
"""
        )

    body = (
        "<h1>Abschlussprüfung - Detaillierter Bericht</h1>"
        f'<div class="meta">Name: <b>{esc(name)}</b> &middot; Eingereicht: {esc(timestamp)}</div>'
        + pflichtteil_summary_html(result)
        + gaps_html
        + "<h2>Fragen und Antworten (Pflichtteil)</h2>"
        + "".join(question_blocks)
        + wahlteil_html(variant_label, code)
        + gesamtentscheidung_html()
    )
    return report_shell("Abschlussprüfung Detaillierter Bericht", name, body)


# ---------------------------------------------------------------------------
# HTTP handler
# ---------------------------------------------------------------------------

MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
}


class ExamHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # keep the terminal quiet; trainer doesn't need per-request noise

    # -- helpers -----------------------------------------------------------
    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_html(self, html, status=200):
        body = html.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_static(self, rel_path):
        safe_path = os.path.normpath(rel_path).lstrip(os.sep)
        full_path = os.path.join(STATIC_DIR, safe_path)
        if not full_path.startswith(STATIC_DIR) or not os.path.isfile(full_path):
            self.send_json({"error": "not found"}, 404)
            return
        ext = os.path.splitext(full_path)[1]
        with open(full_path, "rb") as f:
            body = f.read()
        self.send_response(200)
        self.send_header("Content-Type", MIME_TYPES.get(ext,
                         "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        length = int(self.headers.get("Content-Length", 0) or 0)
        if length == 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode("utf-8"))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return {}

    def check_trainer(self, payload, query):
        pw = payload.get("password") or (query.get("password", [None])[0])
        return pw == TRAINER_PASSWORD_MD5

    # -- routing -------------------------------------------------------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        if path == "/":
            return self.send_static("exam.html")
        if path == "/trainer":
            return self.send_static("trainer.html")
        if path.startswith("/static/"):
            return self.send_static(path[len("/static/"):])

        if path == "/api/status":
            with db_lock:
                conn = get_db()
                state = get_exam_state(conn)
                conn.close()
            return self.send_json({"open": state["open"]})

        if path == "/api/trainer/config":
            if not self.check_trainer({}, query):
                return self.send_json({"error": "forbidden"}, 403)
            with db_lock:
                conn = get_db()
                state = get_exam_state(conn)
                conn.close()
            return self.send_json(
                {
                    "pflichtteilMinutes": state["pflichtteilDurationSeconds"] / 60,
                    "wahlteilMinutes": state["wahlteilDurationSeconds"] / 60,
                }
            )

        if path == "/api/pflichtteil":
            session_id = query.get("session", [None])[0]
            return self.handle_get_pflichtteil(session_id)

        if path == "/api/wahlteil":
            session_id = query.get("session", [None])[0]
            return self.handle_get_wahlteil(session_id)

        if path == "/api/mysession":
            session_id = query.get("session", [None])[0]
            return self.handle_get_mysession(session_id)

        if path == "/api/trainer/sessions":
            if not self.check_trainer({}, query):
                return self.send_json({"error": "forbidden"}, 403)
            return self.handle_trainer_sessions()

        if path == "/api/trainer/report":
            if not self.check_trainer({}, query):
                return self.send_html("<p>Falsches Passwort.</p>", 403)
            session_id = query.get("session", [None])[0]
            report_type = query.get("type", ["summary"])[0]
            return self.handle_trainer_report(session_id, report_type)

        return self.send_json({"error": "not found"}, 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)
        payload = self.read_json_body()

        if path == "/api/session":
            return self.handle_create_session(payload)
        if path == "/api/pflichtteil/submit":
            return self.handle_submit_pflichtteil(payload)
        if path == "/api/wahlteil/submit":
            return self.handle_submit_wahlteil(payload)

        if path == "/api/trainer/open":
            if not self.check_trainer(payload, query):
                return self.send_json({"error": "forbidden"}, 403)
            return self.handle_trainer_open()
        if path == "/api/trainer/close":
            if not self.check_trainer(payload, query):
                return self.send_json({"error": "forbidden"}, 403)
            return self.handle_trainer_close()
        if path == "/api/trainer/reset":
            if not self.check_trainer(payload, query):
                return self.send_json({"error": "forbidden"}, 403)
            return self.handle_trainer_reset(payload)
        if path == "/api/trainer/config":
            if not self.check_trainer(payload, query):
                return self.send_json({"error": "forbidden"}, 403)
            return self.handle_trainer_config(payload)

        return self.send_json({"error": "not found"}, 404)

    # -- TN endpoints --------------------------------------------------------
    def handle_create_session(self, payload):
        name = (payload.get("name") or "").strip()
        if not name:
            return self.send_json({"error": "name required"}, 400)
        with db_lock:
            conn = get_db()
            state = get_exam_state(conn)
            if not state["open"]:
                conn.close()
                return self.send_json({"error": "exam not open"}, 409)
            session_id = str(uuid.uuid4())
            drawn = draw_pflichtteil()
            conn.execute(
                """INSERT INTO sessions (id, name, created_at, status, assigned_questions,
                   pflichtteil_duration_seconds, wahlteil_duration_seconds)
                   VALUES (?, ?, ?, 'pflichtteil', ?, ?, ?)""",
                (
                    session_id,
                    name,
                    now_iso(),
                    json.dumps(drawn, ensure_ascii=False),
                    state["pflichtteilDurationSeconds"],
                    state["wahlteilDurationSeconds"],
                ),
            )
            conn.commit()
            conn.close()
        return self.send_json({"session_id": session_id})

    def handle_get_pflichtteil(self, session_id):
        if not session_id:
            return self.send_json({"error": "session required"}, 400)
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
            conn.close()
        if not row:
            return self.send_json({"error": "session not found"}, 404)
        drawn = json.loads(row["assigned_questions"])
        questions = [{"module": q["module"], "q": q["q"],
                      "options": q["options"]} for q in drawn]
        created_at = datetime.fromisoformat(row["created_at"])
        duration = row["pflichtteil_duration_seconds"] or DEFAULT_PFLICHTTEIL_DURATION_SECONDS
        deadline_ms = int((created_at.timestamp() + duration) * 1000)
        return self.send_json({"questions": questions, "deadline": deadline_ms, "name": row["name"]})

    def handle_submit_pflichtteil(self, payload):
        session_id = payload.get("session")
        answers = payload.get("answers") or []
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
            if not row:
                conn.close()
                return self.send_json({"error": "session not found"}, 404)
            drawn = json.loads(row["assigned_questions"])
            score = sum(1 for i, q in enumerate(drawn) if i <
                        len(answers) and answers[i] == q["correct"])
            total = len(drawn)
            passed = score >= round(total * PASS_RATIO)
            note, label = grade_for(score / total if total else 0)

            by_module = {}
            for i, q in enumerate(drawn):
                chosen = answers[i] if i < len(answers) else None
                if chosen != q["correct"]:
                    by_module[q["module"]] = by_module.get(q["module"], 0) + 1
            module_gaps = [{"module": m, "wrongCount": c}
                           for m, c in sorted(by_module.items())]

            questions_detail = [
                {
                    "module": q["module"],
                    "question": q["q"],
                    "options": q["options"],
                    "correctIndex": q["correct"],
                    "chosenIndex": answers[i] if i < len(answers) else None,
                }
                for i, q in enumerate(drawn)
            ]

            result = {
                "score": score,
                "total": total,
                "passed": passed,
                "grade": {"note": note, "label": label},
                "questions": questions_detail,
                "moduleGaps": module_gaps,
            }

            conn.execute(
                "UPDATE sessions SET status='wahlteil', pflichtteil_answers=?, pflichtteil_result=?, wahlteil_started_at=? WHERE id=?",
                (json.dumps(answers), json.dumps(
                    result, ensure_ascii=False), now_iso(), session_id),
            )
            conn.commit()
            conn.close()
        return self.send_json(
            {
                "score": score,
                "total": total,
                "passed": passed,
                "grade": result["grade"],
                "moduleGaps": module_gaps,
            }
        )

    def handle_get_wahlteil(self, session_id):
        if not session_id:
            return self.send_json({"error": "session required"}, 400)
        variants = [
            {"id": v["id"], "label": v["label"], "scenario": v["scenario"],
                "pythonSkeleton": v["pythonSkeleton"]}
            for v in WAHLTEIL_VARIANTEN
        ]
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT wahlteil_started_at, wahlteil_duration_seconds FROM sessions WHERE id = ?", (
                    session_id,)
            ).fetchone()
            conn.close()
        if not row:
            return self.send_json({"error": "session not found"}, 404)
        started_at = row["wahlteil_started_at"]
        deadline_ms = None
        if started_at:
            duration = row["wahlteil_duration_seconds"] or DEFAULT_WAHLTEIL_DURATION_SECONDS
            deadline_ms = int((datetime.fromisoformat(
                started_at).timestamp() + duration) * 1000)
        return self.send_json({"variants": variants, "deadline": deadline_ms})

    def handle_submit_wahlteil(self, payload):
        session_id = payload.get("session")
        variant_id = payload.get("variant_id")
        code = payload.get("code") or ""
        variant = next(
            (v for v in WAHLTEIL_VARIANTEN if v["id"] == variant_id), None)
        if not variant:
            return self.send_json({"error": "invalid variant"}, 400)
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
            if not row:
                conn.close()
                return self.send_json({"error": "session not found"}, 404)
            result = json.loads(row["pflichtteil_result"]
                                ) if row["pflichtteil_result"] else None
            if not result:
                conn.close()
                return self.send_json({"error": "pflichtteil not submitted yet"}, 409)
            timestamp = now_iso()
            summary_html = build_summary_report(
                row["name"], timestamp, result, variant["label"], code)
            detailed_html = build_detailed_report(
                row["name"], timestamp, result, variant["label"], code)
            conn.execute(
                """UPDATE sessions SET status='submitted', wahlteil_variant=?, wahlteil_code=?,
                   wahlteil_submitted_at=?, report_summary_html=?, report_detailed_html=? WHERE id=?""",
                (variant["label"], code, timestamp,
                 summary_html, detailed_html, session_id),
            )
            conn.commit()
            conn.close()
        return self.send_json({"ok": True})

    def handle_get_mysession(self, session_id):
        if not session_id:
            return self.send_json({"error": "session required"}, 400)
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
            conn.close()
        if not row:
            return self.send_json({"error": "session not found"}, 404)
        result = json.loads(row["pflichtteil_result"]
                            ) if row["pflichtteil_result"] else None
        payload = {
            "name": row["name"],
            "status": row["status"],
        }
        if result:
            payload["pflichtteilResult"] = {
                "score": result["score"],
                "total": result["total"],
                "passed": result["passed"],
                "grade": result["grade"],
                "moduleGaps": result["moduleGaps"],
            }
        return self.send_json(payload)

    # -- trainer endpoints ----------------------------------------------------
    def handle_trainer_open(self):
        with db_lock:
            conn = get_db()
            conn.execute(
                "UPDATE exam_state SET is_open = 1, opened_at = ? WHERE id = 1", (now_iso(),))
            conn.commit()
            conn.close()
        return self.send_json({"ok": True})

    def handle_trainer_close(self):
        with db_lock:
            conn = get_db()
            conn.execute("UPDATE exam_state SET is_open = 0 WHERE id = 1")
            conn.commit()
            conn.close()
        return self.send_json({"ok": True})

    def handle_trainer_config(self, payload):
        try:
            pflichtteil_minutes = float(payload.get("pflichtteil_minutes"))
            wahlteil_minutes = float(payload.get("wahlteil_minutes"))
        except (TypeError, ValueError):
            return self.send_json({"error": "pflichtteil_minutes/wahlteil_minutes must be numbers"}, 400)
        if pflichtteil_minutes <= 0 or wahlteil_minutes <= 0:
            return self.send_json({"error": "durations must be positive"}, 400)
        with db_lock:
            conn = get_db()
            conn.execute(
                "UPDATE exam_state SET pflichtteil_duration_seconds = ?, wahlteil_duration_seconds = ? WHERE id = 1",
                (round(pflichtteil_minutes * 60), round(wahlteil_minutes * 60)),
            )
            conn.commit()
            conn.close()
        return self.send_json({"ok": True})

    def handle_trainer_sessions(self):
        with db_lock:
            conn = get_db()
            state = get_exam_state(conn)
            rows = conn.execute(
                "SELECT id, name, status, created_at, pflichtteil_result, wahlteil_variant, wahlteil_submitted_at FROM sessions ORDER BY created_at"
            ).fetchall()
            conn.close()
        sessions = []
        for row in rows:
            result = json.loads(row["pflichtteil_result"]
                                ) if row["pflichtteil_result"] else None
            sessions.append(
                {
                    "id": row["id"],
                    "name": row["name"],
                    "status": row["status"],
                    "pflichtteilScore": f"{result['score']}/{result['total']}" if result else None,
                    "pflichtteilGrade": result["grade"]["label"] if result else None,
                    "wahlteilVariant": row["wahlteil_variant"],
                    "wahlteilSubmittedAt": row["wahlteil_submitted_at"],
                }
            )
        return self.send_json(
            {
                "open": state["open"],
                "pflichtteilMinutes": state["pflichtteilDurationSeconds"] / 60,
                "wahlteilMinutes": state["wahlteilDurationSeconds"] / 60,
                "sessions": sessions,
            }
        )

    def handle_trainer_report(self, session_id, report_type):
        with db_lock:
            conn = get_db()
            row = conn.execute(
                "SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
            conn.close()
        if not row:
            return self.send_html("<p>Session nicht gefunden.</p>", 404)
        column = "report_detailed_html" if report_type == "detailed" else "report_summary_html"
        html = row[column]
        if not html:
            return self.send_html("<p>Noch kein Wahlteil eingereicht - Bericht noch nicht verfügbar.</p>", 409)
        return self.send_html(html)

    def handle_trainer_reset(self, payload):
        session_id = payload.get("session")
        with db_lock:
            conn = get_db()
            if session_id:
                conn.execute(
                    "DELETE FROM sessions WHERE id = ?", (session_id,))
            else:
                conn.execute("DELETE FROM sessions")
                conn.execute("UPDATE exam_state SET is_open = 0")
            conn.commit()
            conn.close()
        return self.send_json({"ok": True})


def main():
    init_db()
    port = int(os.environ.get("PORT", "8950"))
    server = ThreadingHTTPServer(("0.0.0.0", port), ExamHandler)
    print(f"Abschlusspruefung-Server laeuft auf Port {port}.")
    print(f"TN-Seite:      http://<deine-lokale-IP>:{port}/")
    print(f"Trainer-Seite: http://<deine-lokale-IP>:{port}/trainer")
    print("Trainer-Passwort: im Trainer-Login eingeben.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
