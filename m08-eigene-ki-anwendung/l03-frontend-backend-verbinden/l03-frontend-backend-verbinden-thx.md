# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.3 - Frontend und Backend verbinden: die Todo-App komplett

---

**Ziel:** Das KI-generierte Frontend (Lab 8.1) mit dem Backend (Lab 8.2) verbinden, sodass
Anlegen, Anzeigen, Ändern und Löschen über die Oberfläche funktionieren.

- Ein Formular sendet Daten an eine Backend-Route, sobald es abgeschickt wird.
- Nach dem Absenden lädt die Seite die aktuelle Liste neu, damit Änderungen sichtbar werden.
- Erst wenn Anlegen, Anzeigen, Ändern und Löschen alle über die Oberfläche funktionieren, ist die
  Todo-App vollständig.

<details><summary>Wie sendet ein Formular Daten an eine Backend-Route?</summary>

Das `<form>`-Element bekommt ein `action`-Attribut (die Ziel-Route) und eine `method` (z. B.
`POST`) - beim Absenden schickt der Browser die Feldwerte an genau diese Route.

</details>

<details><summary>Was muss nach dem Absenden passieren, damit die Liste aktuell bleibt?</summary>

Das Backend verarbeitet die Anfrage und leitet danach zurück zur Übersichtsseite - die Übersicht
liest die Datenbank jedes Mal frisch aus, zeigt also automatisch den neuen Stand.

</details>

<details><summary>Welche CRUD-Operation fehlt noch, wenn nur "anzeigen" und "anlegen" funktionieren?</summary>

Ändern (Update) und Löschen (Delete) - ohne sie lässt sich eine bestehende Bestellung nicht als
erledigt markieren oder entfernen.

</details>

## CRUD zu Route

| CRUD-Operation | Route                              | Ausloeser im Frontend      |
| -------------- | ---------------------------------- | -------------------------- |
| Create         | `POST /bestellungen`               | Formular "Hinzufügen"      |
| Read           | `GET /bestellungen`                | Seitenaufruf               |
| Update         | `POST /bestellungen/<id>/erledigt` | Button "Erledigt" je Zeile |
| Delete         | `POST /bestellungen/<id>/loeschen` | Button "Löschen" je Zeile  |

```html
<form method="POST" action="/bestellungen">
  <input name="produkt" placeholder="Produkt" />
  <input name="menge" type="number" placeholder="Menge" />
  <button type="submit">Hinzufügen</button>
</form>
```

```python
def do_POST(self):
    laenge = int(self.headers["Content-Length"])
    daten = urllib.parse.parse_qs(self.rfile.read(laenge).decode())
    conn = sqlite3.connect("baeckerei.db")
    conn.execute(
        "INSERT INTO bestellungen (produkt, menge, status) VALUES (?, ?, 'offen')",
        (daten["produkt"][0], daten["menge"][0]),
    )
    conn.commit()
    conn.close()
    self.send_response(303)
    self.send_header("Location", "/bestellungen")
    self.end_headers()
```

> **Merksatz:** Der HTTP-Status 303 nach einem `POST` leitet den Browser sofort zur aktuellen
> Übersicht weiter, statt die veraltete Formularseite stehen zu lassen.

## Fazit

- Ein Formular mit `action`/`method` sendet Daten direkt an eine Backend-Route.
- Nach jeder Änderung liest die Übersicht die Datenbank neu, dadurch bleibt sie aktuell.
- Erst Create, Read, Update und Delete zusammen ergeben eine vollständige Todo-App.

Weiter geht es mit der Übung `l03-frontend-backend-verbinden-exc.md` (Lösung:
`l03-frontend-backend-verbinden-sol.md`).
