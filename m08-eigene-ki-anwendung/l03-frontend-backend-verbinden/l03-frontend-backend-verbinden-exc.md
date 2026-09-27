# Lab 8.3 - Uebung: Todo-App mit vollständigem CRUD über die Oberfläche

## Auftrag

Das Frontend aus Lab 8.1 und das Backend aus Lab 8.2 so verbinden, dass alle vier
CRUD-Operationen über den Browser bedienbar sind.

## Start

`frontend/index.html` (Lab 8.1) und `backend/server.py` (Lab 8.2) liegen in
`baeckerei-todo-app/`. Der Server aus Lab 8.2 kann bereits `/bestellungen` anzeigen.

## Schritte

1. Im Formular von `index.html` `action="/bestellungen"` und `method="POST"` ergaenzen, Feldnamen
   `produkt`/`menge` beibehalten.
2. In `server.py` eine `do_POST`-Methode ergaenzen, die Formulardaten liest und per
   `INSERT INTO bestellungen (...)` speichert, danach mit Status 303 zurueck zu `/bestellungen`
   leitet.
3. `/bestellungen` so erweitern, dass jede Zeile zwei Buttons zeigt ("Erledigt", "Löschen"), die
   jeweils ein eigenes kleines Formular mit den Routen aus der Tabelle oben absenden.
4. Zwei neue `POST`-Routen im Backend ergaenzen: `/bestellungen/<id>/erledigt` (Status aendern) und
   `/bestellungen/<id>/loeschen` (Zeile entfernen) - danach jeweils zurueck zu `/bestellungen`
   leiten.
5. Einen vollstaendigen Durchlauf im Browser testen: neue Bestellung anlegen, in der Liste sehen,
   auf "Erledigt" klicken, auf "Löschen" klicken und pruefen, dass sie verschwindet.

## Fertig, wenn

- eine im Formular eingetragene Bestellung nach dem Absenden in der Liste erscheint,
- ein Klick auf "Erledigt" den Status in der Datenbank und in der Liste aendert,
- ein Klick auf "Löschen" die Zeile aus Liste und Datenbank entfernt,
- alle vier Operationen ohne manuelles Neuladen der Seite durch die Person selbst funktionieren
  (die Weiterleitung erledigt das automatisch).

## Hilfe

1. Jeder Button fuer "Erledigt"/"Löschen" braucht ein eigenes `<form>` mit der passenden ID in der
   `action`-URL, da HTML-Buttons sonst nicht individuell pro Zeile unterschieden werden koennen.
2. `Content-Length` im Header muss ausgelesen werden, bevor der `POST`-Body vollstaendig gelesen
   werden kann.
3. Ein 500-Fehler nach dem Absenden deutet meist auf einen falschen Feldnamen zwischen Formular und
   `parse_qs`-Zugriff hin.

## Eigene Projektidee

Soweit sinnvoll: das gleiche Frontend+Backend+DB-Muster auf die eigene Projektidee uebertragen,
oder alternativ die generische Todo-App um eine eigene Idee vertiefen (z. B. ein zusaetzliches
Feld). Kurzer Zwischenstand: was funktioniert schon, was ist noch offen?

## Zusatzaufgabe

Eine Bestätigung vor dem Löschen ergänzen (z. B. ein JavaScript-`confirm(...)` im Löschen-Button),
damit ein versehentlicher Klick nicht sofort löscht.
