# Lab 4.4 - Uebung: Bestellungen, Verknuepfungen und Auswertungen

## Auftrag

Eine Tabelle `bestellungen` mit Bezug zu `produkte` anlegen, per JOIN und SUM den Umsatz je Produkt berechnen, danach dieselbe Auswertung in MongoDB nachbauen.

## Start

Adminer ist mit der Tabelle `produkte` aus Lab 4.2 verbunden. Die MongoDB-Umgebung mit der Sammlung `produkte` aus Lab 4.3 steht bereit.

## Teil A: SQL - Verknuepfung und Auswertung

1. Eine Tabelle `bestellungen` mit den Spalten `id`, `produkt_id`, `menge` und `bestelldatum` anlegen. `produkt_id` verweist auf `produkte.id`.
2. Mindestens fuenf Bestellungen einfuegen, die auf vorhandene Produkte aus `produkte` verweisen.
3. Mit einem JOIN eine Ergebnistabelle aus Produktname, Preis, Menge und Bestelldatum anzeigen.
4. In derselben Abfrage die Spalte Preis mal Menge als `zeilensumme` berechnen.
5. Mit GROUP BY und SUM den Gesamtumsatz je Produkt ueber alle Bestellungen anzeigen.

## Teil B: MongoDB - dieselbe Auswertung nachbauen

6. Eine neue Sammlung `bestellungen_referenziert` anlegen (nicht die bestehende `bestellungen` aus Lab 4.3 wiederverwenden, da diese Produktnamen einbettet statt zu verweisen) und mindestens fuenf Dokumente einfuegen, die jeweils per `produkt_id` auf ein Dokument in `produkte` verweisen, sowie `menge` und `bestelldatum` enthalten.
7. Mit einer Aggregation und `$lookup` die Sammlungen `bestellungen_referenziert` und `produkte` ueber `produkt_id` verknuepfen.
8. Mit `$group` und `$sum` den Gesamtumsatz je Produkt berechnen und mit dem SQL-Ergebnis aus Schritt 5 vergleichen.

## Fertig, wenn

- `bestellungen` mindestens fuenf Zeilen mit gueltiger `produkt_id` enthaelt,
- die JOIN-Abfrage Produktname, Preis, Menge und Zeilensumme je Bestellung zeigt,
- die GROUP-BY-Abfrage einen Gesamtumsatz je Produkt zeigt,
- die MongoDB-Sammlung `bestellungen_referenziert` mindestens fuenf Dokumente mit `produkt_id`-Bezug enthaelt,
- die `$lookup`-Aggregation denselben Umsatz je Produkt wie die SQL-Abfrage zeigt.

## Hilfe

1. `produkt_id` braucht denselben Datentyp wie `produkte.id`.
2. Ein JOIN benoetigt `ON bestellungen.produkt_id = produkte.id`.
3. SUM ohne GROUP BY liefert nur eine einzige Gesamtzeile, nicht je Produkt.
4. `$lookup` braucht `from`, `localField`, `foreignField` und `as`.
5. Nach `$lookup` liegt das verknuepfte Produkt-Dokument als Liste im Ergebnis und muss mit `$unwind` oder einem Index (`arrayElemAt`) einzeln angesprochen werden.

## Zusatzaufgabe

Zusaetzlich mit COUNT (SQL) bzw. einem weiteren `$sum: 1` (MongoDB) anzeigen, wie viele Bestellungen je Produkt vorliegen.
