# Lab 3.2 - Uebung: Die Baeckerei-Website verpacken

## Auftrag

Aus der vorbereiteten Website ein Docker-Image mit dem Namen `baeckerei-site`
bauen.

## Start

Der Ordner `baeckerei-site/` enthaelt `site/index.html`. Docker Desktop laeuft.

## Schritte

1. Den Ordner `baeckerei-site/` im Terminal oeffnen und `site/index.html` ansehen.
2. Eine Datei `Dockerfile` im Stammordner anlegen.
3. Die Anweisungen aus der Theorie so eintragen, dass Nginx die Dateien aus `site/` ausliefert.
4. Das Image mit dem Namen `baeckerei-site` bauen.
5. Mit `docker image ls` pruefen, ob das Image sichtbar ist.

## Fertig, wenn

- das Dockerfile im Stammordner liegt,
- der Build ohne Fehler endet,
- `docker image ls` ein Image `baeckerei-site` zeigt.

## Hilfe

1. Der Dockerfile-Name hat keine Dateiendung.
2. `COPY` braucht Quell- und Zielordner.
3. Der Build-Befehl endet mit einem Punkt fuer den aktuellen Ordner.

## Zusatzaufgabe

Die Ueberschrift in `site/index.html` auf "Baeckerei online" aendern und ein
zweites Image mit dem Tag `v2` bauen.