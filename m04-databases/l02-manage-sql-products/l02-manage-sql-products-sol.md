# Lab 4.2 - Loesung: Produkte in der Baeckerei verwalten

## Schritt 1: Tabelle anlegen

```sql
CREATE TABLE produkte (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  preis DECIMAL(6,2) NOT NULL
);
```

## Schritt 2: Produkte einfuegen

```sql
INSERT INTO produkte (name, preis) VALUES
  ('Roggenbrot', 4.20),
  ('Croissant', 1.80),
  ('Kuchen', 18.00),
  ('Brezel', 1.20),
  ('Vollkornbrot', 3.90);
```

## Schritt 3: Preis aendern

```sql
UPDATE produkte SET preis = 4.50 WHERE name = 'Roggenbrot';
UPDATE produkte SET preis = 1.30 WHERE name = 'Brezel';
```

## Schritt 4: Testprodukt loeschen

```sql
INSERT INTO produkte (name, preis) VALUES ('Testprodukt', 0.01);
DELETE FROM produkte WHERE name = 'Testprodukt';
```

## Schritt 5: Ergebnis pruefen

```sql
SELECT * FROM produkte;
```

Die fuenf Produkte bleiben sichtbar. `Testprodukt` fehlt.

## Zusatzaufgabe

```sql
SELECT * FROM produkte ORDER BY preis;
```
