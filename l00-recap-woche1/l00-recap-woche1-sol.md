# Recap Woche 1 - Loesung: Docker & Datenbanken

## Aufgabe 1-2: Docker

```bash
cd baeckerei-netzwerk
docker compose up -d
docker compose ps
```

```txt
NAME     IMAGE    STATUS
client   alpine   running
server   nginx    running
```

```bash
docker compose exec client ping -c 3 server
```

```txt
3 packets transmitted, 3 received, 0% packet loss
```

## Aufgabe 3: Produktpreis prüfen

In Adminer die Tabelle `produkte` öffnen und den Preis der gewählten Zeile mit der eigenen
Erinnerung abgleichen - kein fester Wert, abhängig vom aktuellen Datenstand der Übungsdatenbank.

## Aufgabe 4: JOIN über Bestellungen

```sql
SELECT b.id, p.name, b.menge
FROM bestellungen b
JOIN produkte p ON b.produkt_id = p.id
WHERE p.name = 'Roggenbrot';
```

## Zusatzaufgabe: Gesamtumsatz

```sql
SELECT p.name, SUM(p.preis * b.menge) AS gesamtumsatz
FROM bestellungen b
JOIN produkte p ON b.produkt_id = p.id
WHERE p.name = 'Roggenbrot'
GROUP BY p.name;
```
