# Lab 5.2 - Uebung: Test-VM per Snapshot zuruecksetzen

## Auftrag

Vor einer sichtbaren Test-Aenderung einen Snapshot erstellen und die VM danach in den Ausgangszustand zuruecksetzen.

## Start

Die Test-VM aus Lab 5.1 laeuft. Die Snapshot-Funktion der verwendeten Software wurde bereits gezeigt.

## Schritte

1. Einen Snapshot mit dem Namen `vor-test` anlegen.
2. In der VM eine sichtbare Test-Aenderung erstellen, etwa eine Datei `test.txt` auf dem Desktop.
3. Die Aenderung im VM-Fenster zeigen.
4. Den Snapshot `vor-test` wiederherstellen.
5. Pruefen, dass `test.txt` nicht mehr vorhanden ist.

## Fertig, wenn

- der Snapshot `vor-test` sichtbar ist,
- die Testdatei vor dem Restore sichtbar war,
- die Testdatei nach dem Restore fehlt.

## Hilfe

1. Der Snapshotname muss eindeutig sein.
2. Nur die bereitgestellte Test-VM zuruecksetzen.
3. Vor Restore pruefen, ob die Testdatei wirklich sichtbar ist.

## Zusatzaufgabe

Erklaeren, warum ein Snapshot auf derselben Hardware kein vollwertiges Backup ersetzt.
