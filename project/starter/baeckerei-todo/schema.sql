CREATE TABLE bestellungen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produkt TEXT NOT NULL,
    menge INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'offen'
);

INSERT INTO bestellungen (produkt, menge, status) VALUES ('Roggenbrot', 10, 'offen');
INSERT INTO bestellungen (produkt, menge, status) VALUES ('Zimtschnecke', 6, 'erledigt');
INSERT INTO bestellungen (produkt, menge, status) VALUES ('Baguette', 4, 'offen');
