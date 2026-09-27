-- Seed-Daten fuer Lab 4.4 (MySQL/Adminer)
-- Voraussetzung: Tabelle `produkte` aus Lab 4.2 existiert bereits mit den Werten nach den
-- UPDATE-Schritten (Roggenbrot 4.50, Brezel 1.30). Falls die Tabelle fehlt, zuerst die
-- folgenden Zeilen ausfuehren:

-- CREATE TABLE produkte (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(100) NOT NULL,
--   preis DECIMAL(6,2) NOT NULL
-- );
--
-- INSERT INTO produkte (name, preis) VALUES
--   ('Roggenbrot', 4.50),
--   ('Croissant', 1.80),
--   ('Kuchen', 18.00),
--   ('Brezel', 1.30),
--   ('Vollkornbrot', 3.90);

-- Schritt 1: Tabelle `bestellungen` anlegen
CREATE TABLE bestellungen (
  id INT PRIMARY KEY AUTO_INCREMENT,
  produkt_id INT NOT NULL,
  menge INT NOT NULL,
  bestelldatum DATE NOT NULL,
  FOREIGN KEY (produkt_id) REFERENCES produkte(id)
);

-- Schritt 2: Bestellungen einfuegen (produkt_id 1-5 = Roggenbrot, Croissant, Kuchen, Brezel, Vollkornbrot)
INSERT INTO bestellungen (produkt_id, menge, bestelldatum) VALUES
  (1, 10, '2026-09-01'),
  (2, 25, '2026-09-01'),
  (1, 5, '2026-09-02'),
  (4, 40, '2026-09-02'),
  (3, 2, '2026-09-03');
