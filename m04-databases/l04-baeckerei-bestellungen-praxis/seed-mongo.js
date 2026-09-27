// Seed-Daten fuer Lab 4.4 (MongoDB Shell / mongosh)
// Legt bei Bedarf die Sammlung `produkte` aus Lab 4.3 an (falls noch nicht vorhanden) und fuellt
// danach die neue Sammlung `bestellungen_referenziert` mit Bestellungen, die per `produkt_id` auf
// die jeweiligen Produkt-Dokumente verweisen.

if (db.produkte.countDocuments() === 0) {
  db.produkte.insertMany([
    { name: "Roggenbrot", preis: 4.5 },
    { name: "Croissant", preis: 1.8 },
    { name: "Kuchen", preis: 18.0 },
    { name: "Brezel", preis: 1.3 },
    { name: "Vollkornbrot", preis: 3.9 },
  ]);
}

const produktId = (name) => db.produkte.findOne({ name: name })._id;

db.bestellungen_referenziert.insertMany([
  {
    produkt_id: produktId("Roggenbrot"),
    menge: 10,
    bestelldatum: "2026-09-01",
  },
  { produkt_id: produktId("Croissant"), menge: 25, bestelldatum: "2026-09-01" },
  { produkt_id: produktId("Roggenbrot"), menge: 5, bestelldatum: "2026-09-02" },
  { produkt_id: produktId("Brezel"), menge: 40, bestelldatum: "2026-09-02" },
  { produkt_id: produktId("Kuchen"), menge: 2, bestelldatum: "2026-09-03" },
]);
