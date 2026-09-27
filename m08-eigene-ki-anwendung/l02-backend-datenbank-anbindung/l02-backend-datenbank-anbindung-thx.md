# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.2 - Backend: Bestellungen aus der Datenbank bereitstellen

---

**Ziel:** Einen kleinen Python-Webserver bauen, der Bestellungen aus `baeckerei.db` (Modul 7)
ausliest und als Webseite bereitstellt.

- Ein Backend nimmt Anfragen entgegen, holt/verändert Daten und schickt eine Antwort zurück - das
  Frontend zeigt nur an, was das Backend liefert.
- Jede Route (z. B. `/bestellungen`) ist mit genau einer Aktion verbunden.
- Python eignet sich hier besser als PowerShell, weil es einfache eingebaute Werkzeuge für
  Webserver mitbringt.

<details><summary>Was macht ein Backend anders als ein Frontend?</summary>

Das Frontend zeigt Inhalte an und nimmt Eingaben entgegen, das Backend verarbeitet diese Eingaben,
greift auf die Datenbank zu und schickt das Ergebnis zurück.

</details>

<details><summary>Wie hängt eine HTTP-Anfrage aus Modul 2 mit einer Backend-Route zusammen?</summary>

Aus Modul 2: ein Client fragt, ein Server antwortet. Eine Route ist die genaue Adresse
(`/bestellungen`), unter der das Backend auf eine bestimmte Art von Anfrage reagiert.

</details>

<details><summary>Warum eignet sich Python hier eher als PowerShell?</summary>

Python bringt mit `http.server` ein einfaches eingebautes Werkzeug für einen Webserver mit -
PowerShell braucht dafür deutlich mehr Zusatzaufwand, deshalb übernimmt hier Python den
Backend-Teil.

</details>

## Routen-Übersicht

| Route           | HTTP-Methode | Aktion                                        |
| --------------- | ------------ | --------------------------------------------- |
| `/bestellungen` | GET          | alle Bestellungen aus der DB als HTML-Tabelle |

```python
import sqlite3
from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/bestellungen":
            conn = sqlite3.connect("baeckerei.db")
            zeilen = conn.execute("SELECT id, produkt, menge, status FROM bestellungen").fetchall()
            conn.close()
            html = "<table>" + "".join(f"<tr><td>{z[0]}</td><td>{z[1]}</td><td>{z[2]}</td><td>{z[3]}</td></tr>" for z in zeilen) + "</table>"
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

HTTPServer(("localhost", 8000), Handler).serve_forever()
```

> **Merksatz:** Eine Route, die es nicht gibt, sollte einen klaren 404-Fehler zeigen, statt
> stillschweigend nichts zu tun.

## Fazit

- Das Backend liest die Datenbank aus und liefert das Ergebnis über eine feste Route.
- Jede Route ist einer klaren HTTP-Methode und Aktion zugeordnet.
- Ein einfacher Python-Webserver reicht für diese erste Route ohne zusätzliche Bibliotheken.

Weiter geht es mit der Übung `l02-backend-datenbank-anbindung-exc.md` (Lösung:
`l02-backend-datenbank-anbindung-sol.md`).
