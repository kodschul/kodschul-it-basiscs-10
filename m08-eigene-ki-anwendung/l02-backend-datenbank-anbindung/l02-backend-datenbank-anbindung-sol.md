# Lab 8.2 - Loesung: Backend mit Datenbankanbindung bauen

## Schritt 1-2: `server.py`

```python
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer

def tabelle_html(zeilen):
    kopf = "<tr><th>ID</th><th>Produkt</th><th>Menge</th><th>Status</th></tr>"
    inhalt = "".join(
        f"<tr><td>{z[0]}</td><td>{z[1]}</td><td>{z[2]}</td><td>{z[3]}</td></tr>" for z in zeilen
    )
    return f"<table>{kopf}{inhalt}</table>"

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        conn = sqlite3.connect("baeckerei.db")
        if self.path == "/bestellungen":
            zeilen = conn.execute("SELECT id, produkt, menge, status FROM bestellungen").fetchall()
            self._html_antwort(tabelle_html(zeilen))
        elif self.path.startswith("/bestellungen/"):
            bestellung_id = self.path.split("/")[-1]
            zeilen = conn.execute(
                "SELECT id, produkt, menge, status FROM bestellungen WHERE id = ?", (bestellung_id,)
            ).fetchall()
            self._html_antwort(tabelle_html(zeilen))
        else:
            self.send_response(404)
            self.end_headers()
        conn.close()

    def _html_antwort(self, html):
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(html.encode("utf-8"))

HTTPServer(("localhost", 8000), Handler).serve_forever()
```

## Schritt 3-4: Start und Vergleich

```bash
python server.py
# Browser: http://localhost:8000/bestellungen
```

Die Tabelle zeigt dieselben Zeilen wie `sqlite3 baeckerei.db "SELECT * FROM bestellungen;"`.

## Schritt 5: Einzelne Bestellung

```
http://localhost:8000/bestellungen/2
```

zeigt nur die Zeile mit `id = 2`.

## Schritt 6: 404-Test

```
http://localhost:8000/unbekannt
```

liefert einen leeren 404-Antwortstatus (im Browser als Fehlerseite sichtbar).

## Zusatzaufgabe

Die Kopfzeile ist bereits in `tabelle_html()` enthalten (`<th>`-Zellen). Minimales Styling:

```python
STYLE = "<style>table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px 8px}</style>"
```

`STYLE` vor `tabelle_html(...)` in `_html_antwort` einfügen.
