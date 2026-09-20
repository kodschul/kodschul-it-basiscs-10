# Lab 4.3 - Loesung: Die Baeckerei-Datenbank in MongoDB nachbauen

## Schritt 1: Umgebung oeffnen

Die vom Trainer bereitgestellte MongoDB-Umgebung oeffnen und die Datenbank auswaehlen.

## Schritt 2: Sammlung `produkte` anlegen

```javascript
db.produkte.insertMany([
  { name: "Roggenbrot", preis: 4.5 },
  { name: "Croissant", preis: 1.8 },
  { name: "Kuchen", preis: 18.0 },
]);
```

## Schritt 3-4: Sammlung `bestellungen` und Dokument einfuegen

```javascript
db.bestellungen.insertOne({
  kunde: "Beispiel GmbH",
  produkte: ["Roggenbrot", "Croissant"],
  gesamtpreis: 6.3,
});
```

## Schritt 5: Beide Sammlungen anzeigen

```javascript
db.produkte.find();
db.bestellungen.find();
```

Die drei Produkte und das Bestell-Dokument erscheinen jeweils in ihrer eigenen Sammlung.

## Schritt 6: Mit SQL vergleichen

Die Sammlung `produkte` entspricht der SQL-Tabelle `produkte` aus Lab 4.2, eine Sammlung pro Tabelle. In `bestellungen` liegen die bestellten Produktnamen direkt als eingebettete Liste im Dokument, waehrend eine SQL-Loesung dafuer meist eine zusaetzliche Verknuepfungstabelle braeuchte.

## Zusatzaufgabe

```javascript
db.bestellungen.insertOne({
  kunde: "Muster KG",
  produkte: ["Kuchen"],
  gesamtpreis: 18.0,
});
db.bestellungen.find();
```
