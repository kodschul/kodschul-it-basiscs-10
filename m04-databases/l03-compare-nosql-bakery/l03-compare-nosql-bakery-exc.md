# Lab 4.3 - Uebung: Die Baeckerei-Datenbank in MongoDB nachbauen

## Auftrag

Die gleiche Datenstruktur aus Lab 4.1/4.2 (Produkte und Bestellungen) in der
vorbereiteten MongoDB-Umgebung nachbauen und mit der SQL-Version vergleichen.

## Start

Eine laufende MongoDB-Umgebung mit dem Namen der Datenbank steht bereit. Die
`produkte`-Tabelle aus Lab 4.2 dient als Vorlage.

## Schritte

1. Die vorbereitete MongoDB-Oberflaeche oder Konsole oeffnen.
2. Eine Sammlung `produkte` anlegen und mindestens drei Produkte aus Lab 4.2
   (Name und Preis) als eigene Dokumente einfuegen.
3. Eine Sammlung `bestellungen` anlegen oder auswaehlen.
4. Ein Bestell-Dokument mit einem Kunden, mindestens zwei Produkten und einem
   Gesamtpreis einfuegen.
5. Beide Sammlungen anzeigen und pruefen, dass Produkte und Bestellungen als
   getrennte Sammlungen sichtbar sind.
6. Mit dem Partner vergleichen: Welche SQL-Tabelle entspricht welcher
   Sammlung? Liegen die Produkte in der Bestellung als eigene Dokumente oder
   eingebettet in der Bestellung?

## Fertig, wenn

- die Sammlung `produkte` mindestens drei Dokumente mit Name und Preis enthaelt,
- ein sichtbares Bestell-Dokument in `bestellungen` existiert,
- Produkte als zusammengehoerige Daten im Bestell-Dokument sichtbar sind,
- ein Unterschied zur Tabellenstruktur aus Lab 4.2 erklaert werden kann.

## Hilfe

1. JSON verwendet geschweifte Klammern fuer ein Dokument.
2. Eine Liste wird mit eckigen Klammern geschrieben.
3. Zwei Sammlungen (`produkte`, `bestellungen`) entsprechen den zwei SQL-Tabellen aus Lab 4.1/4.2.
4. Die Kursumgebung verwendet nur Beispieldaten.

## Zusatzaufgabe

Eine zweite Bestellung mit einem anderen Kunden anlegen und beide
Bestell-Dokumente anzeigen.
