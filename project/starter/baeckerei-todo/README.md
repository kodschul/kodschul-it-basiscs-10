# Starter: `baeckerei.db` (Modul 7-8)

SQLite-Startdatei für die Konsolen-/Web-Anwendung aus Modul 7 (Lab 7.3 ff.) und Modul 8. Tabelle
`bestellungen` (`id`, `produkt`, `menge`, `status`) mit 3 Beispielzeilen.

Neu erzeugen (falls die Datei fehlt oder zurückgesetzt werden soll):

```bash
sqlite3 baeckerei.db < schema.sql
```

Modul 8 Lab 8.4 (agentische Erweiterung) ergänzt zusätzlich eine Spalte `kategorie`
(`ALTER TABLE bestellungen ADD COLUMN kategorie TEXT;`) - das passiert direkt in dieser Datei, kein
separater Startzustand nötig.
