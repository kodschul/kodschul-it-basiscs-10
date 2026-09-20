# Lab 4.1 - Uebung: Die Baeckerei-Datenbank starten

## Auftrag

Die vorbereitete MySQL- und Adminer-Umgebung starten und die Datenbankoberflaeche im Browser zeigen.

## Start

Der Ordner `baeckerei-db/` enthaelt eine vorbereitete `docker-compose.yml` mit den Diensten `mysql` und `adminer`.

## Schritte

1. Den Ordner im Terminal oeffnen und `docker compose up -d` ausfuehren.
2. Mit `docker compose ps` pruefen, dass beide Dienste laufen.
3. Adminer unter der vorbereiteten lokalen Adresse im Browser oeffnen.
4. Mit den vom Trainer bereitgestellten Testzugangsdaten anmelden.
5. Die Datenbank `baeckerei` und ihre vorhandenen Tabellen zeigen.

## Fertig, wenn

- beide Dienste laufen,
- Adminer im Browser sichtbar ist,
- die Datenbank `baeckerei` geoeffnet werden kann.

## Hilfe

1. Bei fehlender Seite zuerst `docker compose ps` pruefen.
2. Zugangsdaten werden nur als Testdaten vom Trainer bereitgestellt.
3. Keine echten Kunden- oder Zugangsdaten eingeben.

## Zusatzaufgabe

Eine Tabelle auswaehlen und benennen, welche Spalten und Zeilen sichtbar sind.
