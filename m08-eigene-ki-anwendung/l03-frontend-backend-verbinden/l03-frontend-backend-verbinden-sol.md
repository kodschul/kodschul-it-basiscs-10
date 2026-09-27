# Lab 8.3 - Loesung: Todo-App mit vollständigem CRUD über die Oberfläche

## Schritt 1: Formular

```html
<form method="POST" action="/bestellungen">
  <input name="produkt" placeholder="Produkt" required />
  <input name="menge" type="number" placeholder="Menge" required />
  <button type="submit">Hinzufügen</button>
</form>
```

## Schritt 2-4: `server.py` (Ausschnitt)

```python
import urllib.parse

class Handler(BaseHTTPRequestHandler):
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
            conn.execute("UPDATE bestellungen SET status = 'erledigt' WHERE id = ?", (bestellung_id,))
        elif self.path.endswith("/loeschen"):
            bestellung_id = self.path.split("/")[-2]
            conn.execute("DELETE FROM bestellungen WHERE id = ?", (bestellung_id,))

        conn.commit()
        conn.close()
        self.send_response(303)
        self.send_header("Location", "/bestellungen")
        self.end_headers()
```

## Schritt 3: Zeile mit Buttons (Übersicht)

```python
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
```

## Schritt 5: Testdurchlauf

```
Formular: Produkt "Zimtschnecke", Menge 8 -> "Hinzufügen"
Liste zeigt Zimtschnecke mit Status "offen"
Klick "Erledigt" -> Status wird "erledigt"
Klick "Löschen" -> Zeile verschwindet aus der Liste
```

## Zusatzaufgabe

```html
<form
  method="POST"
  action="/bestellungen/{z[0]}/loeschen"
  style="display:inline"
  onsubmit="return confirm('Wirklich löschen?')"
>
  <button>Löschen</button>
</form>
```
