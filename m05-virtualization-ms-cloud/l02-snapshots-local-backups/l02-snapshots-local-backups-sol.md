# Lab 5.2 - Loesung: Test-VM per Snapshot zuruecksetzen

## Schritt 1: Snapshot erstellen

In der Virtualisierungssoftware die laufende Test-VM auswaehlen und einen Snapshot `vor-test` anlegen.

## Schritt 2-3: Aenderung erstellen und pruefen

In der VM die Datei `test.txt` anlegen. Die sichtbare Datei beweist die Aenderung nach dem Snapshot.

## Schritt 4: Snapshot wiederherstellen

`vor-test` auswaehlen und die Wiederherstellung bestaetigen. Die VM wird in den gespeicherten Zustand zurueckgesetzt.

## Schritt 5: Ergebnis pruefen

Nach dem Start der wiederhergestellten VM fehlt `test.txt`.

## Zusatzaufgabe

Ein Snapshot kann mit dem Host oder derselben Festplatte verloren gehen. Ein Backup braucht eine getrennte, kontrollierte Ablage.
