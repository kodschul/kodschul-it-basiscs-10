# Lab 7.3 - Uebung: Funktionen für den Datenbankzugriff

## Auftrag

Zwei Funktionen schreiben, die Bestellungen aus `baeckerei.db` auslesen - einmal alle, einmal nur
die mit Status `offen` - in PowerShell und Python.

## Start

Die Datei `baeckerei.db` aus `../../project/starter/baeckerei-todo/` liegt im Ordner
`programmieren-uebung` und enthaelt die Tabelle `bestellungen` mit 5 Testeintraegen (Spalten `id`,
`produkt`, `menge`, `status`, Status-Werte `offen`/`erledigt`). Das Kommandozeilenwerkzeug `sqlite3`
ist installiert.

## Schritte

1. Mit `sqlite3 baeckerei.db "SELECT * FROM bestellungen;"` einmal manuell pruefen, was in der
   Tabelle steht.
2. Eine Funktion `Get-Bestellungen`/`bestellungen_anzeigen()` schreiben, die alle Zeilen ausgibt.
3. Eine zweite Funktion `Get-OffeneBestellungen`/`offene_bestellungen()` schreiben, die nur Zeilen
   mit `status = 'offen'` ausgibt (SQL: `WHERE status = 'offen'`).
4. Beide Funktionen in PowerShell **und** in Python umsetzen und ausfuehren.
5. Die Anzahl der offenen Bestellungen zusaetzlich als Zahl ausgeben (z. B. Laenge der
   Ergebnisliste in Python, Anzahl Zeilen der `sqlite3`-Ausgabe in PowerShell zaehlen).

## Fertig, wenn

- beide Funktionen in beiden Sprachen ausfuehrbar sind,
- die zweite Funktion nachweislich nur Zeilen mit Status `offen` zeigt,
- die Anzahl offener Bestellungen sichtbar ausgegeben wird.

## Hilfe

1. `sqlite3.connect("baeckerei.db")` erzeugt die Datei, falls sie noch nicht existiert - bei einem
   Tippfehler im Dateinamen entsteht sonst leise eine neue, leere Datenbank.
2. In PowerShell liefert `sqlite3 datei.db "SQL;"` das Ergebnis direkt als Textzeilen zurueck -
   `.Count` auf das Ergebnis eines Arrays zaehlt die Zeilen.
3. Anfuehrungszeichen in SQL-Statements (`'offen'`) nicht mit den umschliessenden
   PowerShell-/Python-Anfuehrungszeichen verwechseln.

## Zusatzaufgabe

Eine dritte Funktion ergaenzen, die nur Bestellungen ab einer Mindestmenge zeigt (Parameter statt
festem Wert, z. B. `Get-Bestellungen -MindestMenge 20`/`bestellungen_ab_menge(20)`).
