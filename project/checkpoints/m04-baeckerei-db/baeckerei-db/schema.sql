CREATE TABLE produkte (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  preis DECIMAL(6,2) NOT NULL
);

INSERT INTO produkte (name, preis) VALUES
  ('Roggenbrot', 4.50),
  ('Croissant', 1.80),
  ('Kuchen', 18.00),
  ('Brezel', 1.30),
  ('Vollkornbrot', 3.90);

-- Lab 4.4: Bestellungen mit Bezug auf produkte (JOIN + Auswertung)
CREATE TABLE bestellungen (
  id INT PRIMARY KEY AUTO_INCREMENT,
  produkt_id INT NOT NULL,
  menge INT NOT NULL,
  bestelldatum DATE NOT NULL,
  FOREIGN KEY (produkt_id) REFERENCES produkte(id)
);

INSERT INTO bestellungen (produkt_id, menge, bestelldatum) VALUES
  (1, 10, '2026-09-01'),
  (2, 25, '2026-09-01'),
  (1, 5, '2026-09-02'),
  (4, 40, '2026-09-02'),
  (3, 2, '2026-09-03');
