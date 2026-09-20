# Lab 4.2 - Uebung: Produkte in der Baeckerei verwalten

## Auftrag

Eine Tabelle `produkte` anlegen, Produkte erfassen, einen Preis aendern und ein Testprodukt loeschen.

## Start

Adminer ist mit der Kursdatenbank verbunden. Der SQL-Bereich ist geoeffnet.

## Schritte

1. Eine Tabelle `produkte` mit ID, Name und Preis anlegen.
2. Mindestens fuenf Produkte als Testdaten einfuegen.
3. Den Preis von zwei Produkten aendern.
4. Ein Produkt mit dem Namen `Testprodukt` einfuegen und anschliessend nur dieses Produkt loeschen.
5. Die verbleibenden Produkte in Adminer zeigen.

## Fertig, wenn

- die Tabelle drei passende Spalten besitzt,
- mindestens fuenf echte Testprodukte sichtbar sind,
- zwei Preis-Aenderungen und das Entfernen von `Testprodukt` nachweisbar sind.

## Hilfe

1. ID, Name und Preis brauchen passende Datentypen.
2. Vor `DELETE` mit einer Abfrage pruefen, welche Zeile betroffen ist.
3. Eine Bedingung nach `WHERE` grenzt die Loeschung ein.

## Zusatzaufgabe

Ein weiteres Produkt mit einem gueltigen Preis einfuegen und nach Preis sortiert anzeigen.
