# Lab 8.4 - Loesung: Agentische Erweiterung der Todo-App

## Schritt 1: Beispiel-Ziel

```text
Erweitere die Todo-App (backend/server.py, frontend/index.html) um ein Feld
"Kategorie" pro Bestellung. Nutze die KI-API (Umgebungsvariablen KI_ENDPOINT/
KI_API_KEY), um bei "Anlegen" automatisch eine Kategorie (Brot/Gebaeck/
Sonstiges) aus dem Produktnamen vorzuschlagen. Zeige die Kategorie zusaetzlich
in der Uebersicht. Bei nicht erreichbarer KI-API: Kategorie "Unbekannt" setzen
und Anlegen trotzdem durchfuehren.
```

## Schritt 2: Beispielhaft erzeugte Erweiterung (Ausschnitt)

```python
import os
import requests

def kategorie_vorschlagen(produkt):
    try:
        antwort = requests.post(
            os.environ["KI_ENDPOINT"],
            headers={"Authorization": f"Bearer {os.environ['KI_API_KEY']}"},
            json={
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "system", "content": "Antworte nur mit: Brot, Gebaeck oder Sonstiges."},
                    {"role": "user", "content": f"Kategorie fuer: {produkt}"},
                ],
            },
            timeout=5,
        )
        return antwort.json()["choices"][0]["message"]["content"].strip()
    except Exception:
        return "Unbekannt"
```

`server.py`s `do_POST` für `/bestellungen` ruft `kategorie_vorschlagen(daten["produkt"][0])` auf
und speichert das Ergebnis in einer neuen Spalte `kategorie` (Tabelle vorher per
`ALTER TABLE bestellungen ADD COLUMN kategorie TEXT;` erweitert).

## Schritt 3: Test

```
Formular: Produkt "Baguette", Menge 6 -> "Hinzufügen"
Übersicht zeigt: Baguette | 6 | offen | Brot
```

## Schritt 4: Erklärung einer Codestelle (Beispiel)

`try/except` fängt einen nicht erreichbaren KI-API-Aufruf ab und setzt "Unbekannt" statt die ganze
Anfrage abstürzen zu lassen - die Bestellung wird trotzdem gespeichert.

## Schritt 5: Reflexion (Beispielantworten)

- Schnell/hilfreich: das Anlegen der neuen Spalte und der Route-Anpassung ohne manuelles Nachschlagen
  jeder Detailsyntax.
- Eingriff nötig: der erste Vorschlag hatte den API-Schlüssel zunächst fest im Code stehen - musste
  auf Umgebungsvariablen korrigiert werden, bevor das Ergebnis übernommen wurde.

## Zusatzaufgabe

Keine feste Lösung - Übertragung auf die eigene Projektidee hängt vom individuellen Vorhaben ab.
