# Lab 4.4 - Loesung: Bestellungen, Verknuepfungen und Auswertungen

## Schritt 1: Tabelle `bestellungen` anlegen

```sql
CREATE TABLE bestellungen (
  id INT PRIMARY KEY AUTO_INCREMENT,
  produkt_id INT NOT NULL,
  menge INT NOT NULL,
  bestelldatum DATE NOT NULL,
  FOREIGN KEY (produkt_id) REFERENCES produkte(id)
);
```

## Schritt 2: Bestellungen einfuegen

```sql
INSERT INTO bestellungen (produkt_id, menge, bestelldatum) VALUES
  (1, 10, '2026-09-01'),
  (2, 25, '2026-09-01'),
  (1, 5, '2026-09-02'),
  (4, 40, '2026-09-02'),
  (3, 2, '2026-09-03');
```

## Schritt 3-4: JOIN mit Zeilensumme

```sql
SELECT
  b.id,
  p.name,
  p.preis,
  b.menge,
  b.bestelldatum,
  (p.preis * b.menge) AS zeilensumme
FROM bestellungen b
JOIN produkte p ON b.produkt_id = p.id;
```

## Schritt 5: Umsatz je Produkt mit GROUP BY und SUM

```sql
SELECT
  p.name,
  SUM(p.preis * b.menge) AS gesamtumsatz
FROM bestellungen b
JOIN produkte p ON b.produkt_id = p.id
GROUP BY p.name;
```

## Schritt 6: MongoDB - Bestellungen mit Produkt-Referenz

```javascript
db.produkte.find({}, { _id: 1, name: 1 }); // Produkt-IDs zum Verweisen ablesen

db.bestellungen_referenziert.insertMany([
  {
    produkt_id: ObjectId("<id-von-Roggenbrot>"),
    menge: 10,
    bestelldatum: "2026-09-01",
  },
  {
    produkt_id: ObjectId("<id-von-Croissant>"),
    menge: 25,
    bestelldatum: "2026-09-01",
  },
  {
    produkt_id: ObjectId("<id-von-Roggenbrot>"),
    menge: 5,
    bestelldatum: "2026-09-02",
  },
  {
    produkt_id: ObjectId("<id-von-Brezel>"),
    menge: 40,
    bestelldatum: "2026-09-02",
  },
  {
    produkt_id: ObjectId("<id-von-Kuchen>"),
    menge: 2,
    bestelldatum: "2026-09-03",
  },
]);
```

## Schritt 7-8: `$lookup` und `$group` mit `$sum`

```javascript
db.bestellungen_referenziert.aggregate([
  {
    $lookup: {
      from: "produkte",
      localField: "produkt_id",
      foreignField: "_id",
      as: "produkt",
    },
  },
  { $unwind: "$produkt" },
  {
    $group: {
      _id: "$produkt.name",
      gesamtumsatz: { $sum: { $multiply: ["$produkt.preis", "$menge"] } },
    },
  },
]);
```

Das Ergebnis zeigt denselben Gesamtumsatz je Produktname wie die SQL-Abfrage aus Schritt 5, nur ueber `$lookup` statt JOIN gebildet.

## Zusatzaufgabe

```sql
SELECT p.name, COUNT(*) AS anzahl_bestellungen
FROM bestellungen b
JOIN produkte p ON b.produkt_id = p.id
GROUP BY p.name;
```

```javascript
db.bestellungen_referenziert.aggregate([
  {
    $lookup: {
      from: "produkte",
      localField: "produkt_id",
      foreignField: "_id",
      as: "produkt",
    },
  },
  { $unwind: "$produkt" },
  {
    $group: {
      _id: "$produkt.name",
      anzahl_bestellungen: { $sum: 1 },
    },
  },
]);
```
