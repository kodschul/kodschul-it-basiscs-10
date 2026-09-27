import os
import sqlite3
import urllib.parse
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer


def kategorie_vorschlagen(produkt):
    try:
        antwort = requests.post(
            os.environ["KI_ENDPOINT"],
            headers={"Authorization": f"Bearer {os.environ['KI_API_KEY']}"},
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system",
                        "content": "Antworte nur mit: Brot, Gebaeck oder Sonstiges."},
                    {"role": "user", "content": f"Kategorie fuer: {produkt}"},
                ],
            },
            timeout=5,
        )
        return antwort.json()["choices"][0]["message"]["content"].strip()
    except Exception:
        return "Unbekannt"


def zeile_html(z):
    return f"""
    <tr>
      <td>{z[0]}</td><td>{z[1]}</td><td>{z[2]}</td><td>{z[3]}</td><td>{z[4]}</td>
      <td>
        <form method="POST" action="/bestellungen/{z[0]}/erledigt" style="display:inline">
          <button>Erledigt</button>
        </form>
        <form method="POST" action="/bestellungen/{z[0]}/loeschen" style="display:inline">
          <button>Löschen</button>
        </form>
      </td>
    </tr>"""


def tabelle_html(zeilen):
    kopf = "<tr><th>ID</th><th>Produkt</th><th>Menge</th><th>Status</th><th>Kategorie</th><th></th></tr>"
    return f"<table>{kopf}{''.join(zeile_html(z) for z in zeilen)}</table>"


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/bestellungen":
            conn = sqlite3.connect("baeckerei.db")
            zeilen = conn.execute(
                "SELECT id, produkt, menge, status, kategorie FROM bestellungen"
            ).fetchall()
            conn.close()
            self._html_antwort(tabelle_html(zeilen))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        laenge = int(self.headers["Content-Length"])
        daten = urllib.parse.parse_qs(self.rfile.read(laenge).decode())
        conn = sqlite3.connect("baeckerei.db")

        if self.path == "/bestellungen":
            produkt = daten["produkt"][0]
            kategorie = kategorie_vorschlagen(produkt)
            conn.execute(
                "INSERT INTO bestellungen (produkt, menge, status, kategorie) VALUES (?, ?, 'offen', ?)",
                (produkt, daten["menge"][0], kategorie),
            )
        elif self.path.endswith("/erledigt"):
            bestellung_id = self.path.split("/")[-2]
            conn.execute(
                "UPDATE bestellungen SET status = 'erledigt' WHERE id = ?", (bestellung_id,))
        elif self.path.endswith("/loeschen"):
            bestellung_id = self.path.split("/")[-2]
            conn.execute("DELETE FROM bestellungen WHERE id = ?",
                         (bestellung_id,))

        conn.commit()
        conn.close()
        self.send_response(303)
        self.send_header("Location", "/bestellungen")
        self.end_headers()

    def _html_antwort(self, html):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))


# Vorbereitung (einmalig): ALTER TABLE bestellungen ADD COLUMN kategorie TEXT;
HTTPServer(("localhost", 8000), Handler).serve_forever()
