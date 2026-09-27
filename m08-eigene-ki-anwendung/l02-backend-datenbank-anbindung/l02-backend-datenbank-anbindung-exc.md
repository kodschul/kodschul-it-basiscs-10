# Lab 8.2 - Uebung: Backend mit Datenbankanbindung bauen

## Auftrag

Einen kleinen Python-Webserver schreiben, der Bestellungen aus `baeckerei.db` über die Route
`/bestellungen` als HTML-Tabelle ausgibt.

## Start

`baeckerei.db` aus Modul 7 liegt im Ordner `baeckerei-todo-app/backend/`, Python 3 ist installiert.

## Schritte

1. Eine Datei `server.py` anlegen und einen einfachen `HTTPServer` mit `BaseHTTPRequestHandler`
   aufsetzen, der auf Port 8000 laeuft.
2. Die Route `/bestellungen` per `do_GET` umsetzen: alle Zeilen aus `bestellungen` lesen und als
   `<table>` zurueckgeben.
3. Den Server starten (`python server.py`) und `http://localhost:8000/bestellungen` im Browser
   oeffnen.
4. Pruefen: stimmen die angezeigten Bestellungen mit dem tatsaechlichen Inhalt von `baeckerei.db`
   ueberein (mit `sqlite3 baeckerei.db "SELECT * FROM bestellungen;"` vergleichen)?
5. Eine zweite Route `/bestellungen/<id>` ergaenzen, die nur eine einzelne Bestellung anhand ihrer
   ID zeigt (z. B. `/bestellungen/2`).
6. Eine nicht existierende Route (z. B. `/unbekannt`) aufrufen und pruefen, dass ein 404-Fehler
   erscheint statt einer leeren/kaputten Seite.

## Fertig, wenn

- `/bestellungen` im Browser eine Tabelle mit den echten Datenbankeintraegen zeigt,
- `/bestellungen/<id>` nur die passende einzelne Zeile zeigt,
- eine unbekannte Route erkennbar mit 404 antwortet.

## Hilfe

1. `self.path` enthaelt den aufgerufenen Pfad inklusive `/bestellungen/2` - mit
   `self.path.startswith("/bestellungen/")` und `self.path.split("/")[-1]` laesst sich die ID
   herausloesen.
2. Nach jeder Aenderung an `server.py` muss der Server neu gestartet werden (Strg+C, dann erneut
   `python server.py`).
3. Ein leerer Tabellenkoerper im Browser deutet meist auf einen falschen Tabellennamen oder
   Dateipfad zu `baeckerei.db` hin.

## Zusatzaufgabe

Die Antwort von `/bestellungen` um eine Kopfzeile ("ID | Produkt | Menge | Status") ergaenzen und
optisch minimal per eingebettetem `<style>` formatieren.
