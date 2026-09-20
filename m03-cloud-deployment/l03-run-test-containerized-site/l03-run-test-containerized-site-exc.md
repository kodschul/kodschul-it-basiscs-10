# Lab 3.3 - Uebung: Die Baeckerei-Website erreichbar machen

## Auftrag

Das Image `baeckerei-site` starten, die Website im Browser pruefen und nach einer
Aenderung erneut bereitstellen.

## Start

Das Image `baeckerei-site` aus Lab 3.2 ist vorhanden. Der Website-Ordner kann
weiter bearbeitet werden.

## Schritte

1. Einen Container `baeckerei-web` mit Portweiterleitung von 8080 auf 80 starten.
2. Mit `docker ps` pruefen, dass der Container laeuft.
3. `http://localhost:8080` im Browser oeffnen und die Website zeigen.
4. Den Website-Text aendern, ein neues Image bauen und den bisherigen Container beenden.
5. Den neuen Container starten und die geaenderte Seite einer Partnerperson zeigen.

## Fertig, wenn

- die Website zuerst und nach der Aenderung im Browser sichtbar war,
- der Partner die geaenderte Ueberschrift bestaetigt,
- kein alter Container mehr denselben Port belegt.

## Hilfe

1. `docker ps` zeigt laufende Container.
2. Ein laufender Container kann mit `docker stop baeckerei-web` beendet werden.
3. Falls 8080 belegt ist, einen freien Port vereinbaren und Browser-Adresse anpassen.

## Zusatzaufgabe

Den Container mit einem anderen lokalen Port starten und erklaeren, welcher
Teil der Zuordnung zum Rechner und welcher zum Container gehoert.
