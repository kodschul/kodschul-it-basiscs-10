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
