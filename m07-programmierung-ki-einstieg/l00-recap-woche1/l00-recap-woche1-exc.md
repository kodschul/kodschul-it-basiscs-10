# Recap Woche 1: Docker & Datenbanken - Einzelarbeit (20 Minuten)

## Auftrag

Allein und ohne Hilfe von Nachbarn oder Trainer prüfen, was von Docker (Modul 2-3) und
Datenbanken (Modul 4) aus der letzten Woche noch sicher sitzt - bevor es mit Modul 7
(Programmieren) weitergeht.

## Start

`baeckerei-netzwerk/` (Docker-Compose-Projekt aus Modul 2-3) und die MySQL-Datenbank mit den
Tabellen `produkte`/`bestellungen` aus Modul 4 (per Adminer erreichbar) stehen unverändert bereit.

## Aufgaben (20 Minuten, in Einzelarbeit)

1. `baeckerei-netzwerk/` Container starten (`docker compose up -d`) und mit `docker compose ps`
   prüfen, dass `client` und `server` laufen.
2. Mit `docker compose exec client ping -c 3 server` bestätigen, dass sich beide Container
   erreichen.
3. In Adminer die Tabelle `produkte` öffnen und den Preis eines Produkts erst aus dem Gedächtnis
   nennen, dann mit der Tabelle verifizieren.
4. Eine eigene SQL-Abfrage schreiben, die per JOIN alle Bestellungen eines bestimmten Produkts
   zeigt (Tabellen `produkte` und `bestellungen`).
5. Eine Sache zu Docker und eine Sache zu Datenbanken notieren, die noch unsicher ist - Grundlage
   für den kurzen gemeinsamen Check danach.

## Fertig, wenn

- `client` und `server` laufen und sich per `ping` erreichen,
- die eigene SQL-Abfrage ein sichtbares, korrektes Ergebnis liefert,
- eine persönliche Notiz zu offenen Fragen vorliegt.

## Hilfe

1. Startet `baeckerei-netzwerk/` nicht, zuerst `docker compose down` und danach erneut
   `docker compose up -d` versuchen.
2. Der JOIN verbindet über den gemeinsamen Schlüssel `produkt_id` zwischen `bestellungen` und
   `produkte`.
3. Diese Aufgabe wird allein bearbeitet - bei einer offenen Frage wird sie notiert, nicht sofort
   nachgefragt.

## Zusatzaufgabe

Zusätzlich mit `GROUP BY` und `SUM` den Gesamtumsatz für das gewählte Produkt berechnen.
