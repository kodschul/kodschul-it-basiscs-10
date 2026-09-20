# Checkpoint: Modul 1 - Bäckerei im Terminal

Referenzstand nach Lab 1.3 (Terminal-Basics). Entstanden per:

```bash
mkdir baeckerei
cd baeckerei
mkdir produkte kunden bestellungen
cd produkte && touch brot.txt && cd ..
cd kunden && touch kunden.txt && cd ..
cd bestellungen && touch bestellungen.txt && cd ..
```

## Struktur

```
baeckerei/
├── produkte/
│   └── brot.txt
├── kunden/
│   └── kunden.txt
└── bestellungen/
    └── bestellungen.txt
```

Wird in Modul 6 (`l01-rechte-und-datenschutz`, `l02-passwoerter-und-dateischutz`) wiederverwendet: dort entsteht zusätzlich `baeckerei/kunden/kundendaten.txt` mit gesetzten Zugriffsrechten (siehe `../m06-datenschutz/`).
