# Lab 6.2 - Uebung: Passwortschutz und sichere Passwoerter

## Auftrag

Eine Datei per ZIP-Archiv mit Passwort schuetzen und die Staerke mehrerer Passwortvorschlaege bewerten.

## Start

Der Alpine-Container aus Tag 1 mit dem Ordner `baeckerei/kunden` steht bereit. Ein ZIP-Werkzeug ist installiert.

## Schritte

1. Im Ordner `kunden` ein passwortgeschuetztes ZIP-Archiv aus `kundendaten.txt` erstellen (z. B. `zip -e kundendaten.zip kundendaten.txt`).
2. Das Archiv einmal entsperren und pruefen, dass nur das richtige Passwort funktioniert.
3. Vier vorgeschlagene Passwoerter bewerten: `passwort123`, `B4ck3rei!2025#Mont`, `12345678`, `MeinHundHeisstBruno99!`.
4. Fuer jedes Passwort in Stichpunkten notieren: Laenge, Zeichenvielfalt, erratbar durch Woerterbuch/Alltagswissen ja/nein.
5. Im Partnerpaar das eigene staerkste Passwortmuster erklaeren, ohne das eigene echte Passwort zu nennen.

## Fertig, wenn

- ein passwortgeschuetztes ZIP-Archiv existiert und sich mit dem richtigen Passwort oeffnen laesst,
- alle vier Passwortvorschlaege bewertet sind,
- ein eigenes sicheres Passwortmuster erklaert werden kann, ohne das Passwort selbst zu verraten.

## Hilfe

1. `zip -e archiv.zip datei.txt` fragt beim Erstellen nach einem Passwort.
2. Lange Passwoerter aus mehreren Woertern sind oft sicherer als kurze mit Sonderzeichen-Wirrwarr.
3. Ein Passwort aus echtem Namen und Jahreszahl ist leicht zu erraten, auch mit Sonderzeichen.

## Zusatzaufgabe

Erklaeren, welchen Vorteil ein Passwort-Manager gegenueber selbst ausgedachten Passwoertern fuer mehrere Dienste hat.
