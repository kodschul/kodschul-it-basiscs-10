import sqlite3
import urllib.parse
from http.server import BaseHTTPRequestHandler, HTTPServer


def zeile_html(z):
    return f"""
    <tr>
      <td>{z[0]}</td><td>{z[1]}</td><td>{z[2]}</td><td>{z[3]}</td>
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
    kopf = "<tr><th>ID</th><th>Produkt</th><th>Menge</th><th>Status</th><th></th></tr>"
    return f"<table>{kopf}{''.join(zeile_html(z) for z in zeilen)}</table>"


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/bestellungen":
            conn = sqlite3.connect("baeckerei.db")
            zeilen = conn.execute(
                "SELECT id, produkt, menge, status FROM bestellungen").fetchall()
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
            conn.execute(
                "INSERT INTO bestellungen (produkt, menge, status) VALUES (?, ?, 'offen')",
                (daten["produkt"][0], daten["menge"][0]),
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


HTTPServer(("localhost", 8000), Handler).serve_forever()
