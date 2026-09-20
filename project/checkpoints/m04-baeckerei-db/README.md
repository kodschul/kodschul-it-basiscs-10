# Checkpoint: Modul 4 - Bäckerei-Datenbank

Referenzstand nach Lab 4.1-4.3 (MySQL/Adminer + MongoDB).

## MySQL (`baeckerei-db/`, Lab 4.1-4.2)

```bash
cd baeckerei-db
docker compose up -d
# Adminer: http://localhost:8081 (Server: mysql, Nutzer: root, Passwort: testpasswort)
```

`schema.sql` wird beim ersten Start automatisch eingespielt (Tabelle `produkte`, 5 Testprodukte, Preise nach den Änderungen aus Lab 4.2 Schritt 3).

## MongoDB (`mongo-init.js`, Lab 4.3)

Gegen eine laufende MongoDB-Instanz ausführen (z. B. `mongosh < mongo-init.js`), legt die Sammlungen `produkte` und `bestellungen` mit denselben Beispieldaten wie die MySQL-Tabelle an - zeigt den Modellunterschied (Tabelle+Zeilen vs. Dokumente mit eingebetteter Liste).

## Sicherheitshinweis

`testpasswort` ist ein reines Testpasswort für die lokale Kursumgebung, keine echten Zugangsdaten - vor produktivem Einsatz niemals wiederverwenden.
