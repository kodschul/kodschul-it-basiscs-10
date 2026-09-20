# Lab 4.1 - Loesung: Die Baeckerei-Datenbank starten

## Schritt 1: Umgebung starten

```bash
docker compose up -d
```

## Schritt 2: Dienste pruefen

```bash
docker compose ps
```

`mysql` und `adminer` werden als laufend angezeigt.

## Schritt 3-4: Adminer oeffnen und anmelden

Die vorbereitete lokale Adminer-Adresse im Browser aufrufen. Die Testzugangsdaten kommen vom Trainer und gelten nur fuer die Kursumgebung.

## Schritt 5: Datenbank zeigen

Nach der Anmeldung ist `baeckerei` sichtbar. Tabellen enthalten Spalten als Eigenschaften und Zeilen als Datensaetze.

## Zusatzaufgabe

In einer Produkttabelle ist `name` eine Spalte; ein einzelnes Brot ist eine Zeile.
