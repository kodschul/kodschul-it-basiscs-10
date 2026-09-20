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
