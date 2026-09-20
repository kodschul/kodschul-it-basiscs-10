# Lab 6.1 - Uebung: Rechte setzen und vergleichen

## Auftrag

In der vorbereiteten Konsole Zugriffsrechte fuer eine geschuetzte und eine offene Datei setzen und den Unterschied im Zugriffsversuch zeigen.

## Start

Der Alpine-Container aus Tag 1 laeuft. Der Ordner `baeckerei/kunden` existiert.

## Schritte

1. Im Ordner `kunden` eine Datei `kundendaten.txt` mit `touch` anlegen.
2. Mit `ls -l kundendaten.txt` die aktuellen Rechte zeigen.
3. Mit `chmod 600 kundendaten.txt` die Datei auf Owner-only setzen und die Aenderung mit `ls -l` pruefen.
4. Einen zweiten Ordner `oeffentlich` mit einer Testdatei anlegen und mit `chmod 777` bewusst fuer alle freigeben.
5. Mit `ls -l` beide Dateien nebeneinander zeigen und die Rechte-Buchstaben (`rwx`) fuer Owner, Gruppe und Andere benennen.
6. Im Partnerpaar erklaeren, welche der beiden Dateien fuer ein echtes Kundenformular geeignet waere und warum.

## Fertig, wenn

- `kundendaten.txt` nach `chmod 600` nur fuer den Owner weiterhin lesbar ist,
- `oeffentlich` sichtbar mit `777` versehen ist,
- der Unterschied zwischen beiden Dateien in eigenen Worten erklaert werden kann.

## Hilfe

1. `chmod 600` = Owner liest/schreibt, Gruppe und Andere nichts.
2. `chmod 777` = alle duerfen lesen, schreiben und ausfuehren.
3. `ls -l` zeigt die Rechte immer als zehn Zeichen, z. B. `-rw-r--r--`.

## Zusatzaufgabe

Anhand der CIA-Triade erklaeren, welches Schutzziel `chmod 600` staerkt (Vertraulichkeit) und welches Schutzziel ein zusaetzliches Backup staerken wuerde (Verfuegbarkeit).
