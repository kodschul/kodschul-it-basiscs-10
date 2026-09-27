// MongoDB-Referenzstand nach Lab 4.3 (mongosh oder Adminer-aequivalentes Tool ausfuehren)
db.produkte.insertMany([
  { name: "Roggenbrot", preis: 4.5 },
  { name: "Croissant", preis: 1.8 },
  { name: "Kuchen", preis: 18.0 },
]);

db.bestellungen.insertMany([
  {
    kunde: "Beispiel GmbH",
    produkte: ["Roggenbrot", "Croissant"],
    gesamtpreis: 6.3,
  },
  { kunde: "Muster KG", produkte: ["Kuchen"], gesamtpreis: 18.0 },
]);

// Lab 4.4: eigene Sammlung mit produkt_id-Bezug statt eingebetteter Namen (fuer $lookup)
const roggenbrot = db.produkte.findOne({ name: "Roggenbrot" });
const croissant = db.produkte.findOne({ name: "Croissant" });
const kuchen = db.produkte.findOne({ name: "Kuchen" });

db.bestellungen_referenziert.insertMany([
  { produkt_id: roggenbrot._id, menge: 10, bestelldatum: "2026-09-01" },
  { produkt_id: croissant._id, menge: 25, bestelldatum: "2026-09-01" },
  { produkt_id: roggenbrot._id, menge: 5, bestelldatum: "2026-09-02" },
  { produkt_id: kuchen._id, menge: 2, bestelldatum: "2026-09-03" },
]);

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
