# Lab 7.4 - Uebung: Vollständige CRUD-Konsolenanwendung

## Auftrag

Ein Menue-gesteuertes PowerShell-Skript bauen, das alle vier CRUD-Operationen auf `baeckerei.db`
anbietet: Anzeigen, Anlegen, Aendern, Loeschen.

## Start

`baeckerei.db` mit der Tabelle `bestellungen` (Spalten `id`, `produkt`, `menge`, `status`) und den
Funktionen aus Lab 7.3 steht bereit.

## Schritte

1. Ein Menue ausgeben, das die 5 Optionen (Anzeigen/Anlegen/Aendern/Loeschen/Beenden) mit Nummern
   zeigt.
2. Die Schleife bauen, die das Menue nach jeder Aktion erneut zeigt, bis "Beenden" gewaehlt wird.
3. Option "Anzeigen" mit der Funktion aus Lab 7.3 verbinden.
4. Option "Anlegen" umsetzen: Produkt, Menge und Status per `Read-Host` abfragen und per
   `INSERT INTO bestellungen (produkt, menge, status) VALUES (...)` einfuegen.
5. Option "Aendern" umsetzen: eine ID abfragen und deren Status auf `erledigt` setzen
   (`UPDATE bestellungen SET status = 'erledigt' WHERE id = ...`).
6. Option "Loeschen" umsetzen: eine ID abfragen und die zugehoerige Zeile loeschen
   (`DELETE FROM bestellungen WHERE id = ...`).
7. Einen vollstaendigen Durchlauf testen: eine neue Bestellung anlegen, sie in "Anzeigen"
   wiederfinden, ihren Status aendern, sie am Ende loeschen und mit "Anzeigen" bestaetigen, dass
   sie verschwunden ist.

## Fertig, wenn

- alle vier Operationen ueber das Menue erreichbar sind,
- eine neu angelegte Bestellung in "Anzeigen" sichtbar ist,
- eine geaenderte Bestellung den neuen Status zeigt,
- eine geloeschte Bestellung in "Anzeigen" nicht mehr auftaucht.

## Hilfe

1. Text-Werte in SQL-Statements brauchen einfache Anfuehrungszeichen (`'Roggenbrot'`), Zahlen
   nicht.
2. Eine ungueltige Menue-Eingabe sollte eine Meldung zeigen und das Menue erneut anzeigen, statt das
   Skript abzubrechen.
3. Bei "Aendern"/"Loeschen" zuerst mit "Anzeigen" pruefen, welche ID ueberhaupt existiert.

## Eigene Projektidee

Soweit die eigene Projektidee aus Tag 6 eine Datenbank braucht: dasselbe Muster (Menue + CRUD +
DB) probeweise darauf uebertragen - welche Tabelle/Collection und welche Menue-Optionen wuerden
dort gebraucht? Ergebnis mit einer Partnerperson im Review vergleichen.

## Zusatzaufgabe

Dieselbe Menue-Logik zusaetzlich in Python umsetzen (`sqlite3`-Modul statt `sqlite3`-Kommandozeile)
und pruefen, ob beide Versionen auf derselben `baeckerei.db` dieselben Ergebnisse liefern.
