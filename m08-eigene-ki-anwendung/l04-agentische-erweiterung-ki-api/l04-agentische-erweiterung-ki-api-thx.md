# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.4 - Agentische Erweiterung mit Python und KI-API

---

**Ziel:** Ein KI-Coding-Werkzeug ein Ziel formulieren lassen, damit es die Todo-App in Python
eigenständig erweitert - inklusive einer Anbindung an eine KI-API für eine automatische Funktion.

- Ein einzelner Prompt (Tag 8) liefert eine Antwort - agentisches Vorgehen plant, schreibt, testet
  und passt Code iterativ selbst an, bis ein Ziel erreicht ist.
- Der Mensch bleibt Auftraggeber und Prüfinstanz: Ziel setzen, Ergebnis lesen, Freigabe erteilen
  oder nachsteuern.
- Eine KI-API (z. B. für Textkategorisierung) wird wie jede andere Bibliothek in den bestehenden
  Python-Code eingebaut - Zugangsdaten kommen aus Umgebungsvariablen, nie fest im Code.

<details><summary>Was unterscheidet einen einzelnen Prompt von agentischem Vorgehen?</summary>

Ein einzelner Prompt liefert eine einmalige Antwort. Agentisches Vorgehen (Vibecoding) plant
mehrere Schritte selbst, schreibt Code, prüft das Ergebnis und passt es bei Bedarf erneut an - ohne
dass für jeden Einzelschritt ein neuer Prompt formuliert werden muss.

</details>

<details><summary>Welche Rolle behält der Mensch bei agentischer Entwicklung?</summary>

Ziel und Rahmen vorgeben, das Ergebnis Zeile für Zeile lesen und verstehen, und über Freigabe oder
Nachsteuerung entscheiden - die KI übernimmt die Ausführung, nicht die Verantwortung für das
Ergebnis.

</details>

<details><summary>Welches Risiko birgt ungeprüft übernommener KI-Code?</summary>

Fehlerhafte Logik, unsichere Datenverarbeitung (z. B. fehlender Schutz gegen ungültige Eingaben)
oder unpassende Annahmen über die eigene Datenbank können unbemerkt bleiben, wenn das Ergebnis
nicht durchgelesen und getestet wird.

</details>

## Prompting vs. agentisches Vorgehen

| Aspekt    | Einzelner Prompt (Tag 8)     | Agentisch (Tag 9)                                   |
| --------- | ---------------------------- | --------------------------------------------------- |
| Ablauf    | ein Prompt, eine Antwort     | Plan, Code schreiben, testen, anpassen - wiederholt |
| Kontrolle | jede Antwort einzeln geprüft | Zwischenschritte werden vom Werkzeug selbst geprüft |
| Ergebnis  | ein Codeschnipsel            | eine funktionsfähige Erweiterung                    |

Beispiel-Ziel für das agentische Werkzeug:

```text
Erweitere die Todo-App (backend/server.py, frontend/index.html) um ein Feld
"Kategorie" pro Bestellung. Nutze die KI-API (Umgebungsvariable KI_API_KEY),
um bei "Anlegen" automatisch eine Kategorie (Brot/Gebaeck/Sonstiges) aus dem
Produktnamen vorzuschlagen. Zeige die Kategorie zusaetzlich in der Uebersicht.
```

```python
import os
import requests

def kategorie_vorschlagen(produkt):
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
    )
    return antwort.json()["choices"][0]["message"]["content"].strip()
```

> **Merksatz:** Ein agentisches Werkzeug ersetzt nicht das Lesen des Ergebnisses - jede
> eigenständig erzeugte Änderung wird vor der Übernahme durchgelesen.

## Fazit

- Agentisches Vorgehen erledigt Plan-Schreiben-Testen-Anpassen selbst, ersetzt aber nicht die
  menschliche Prüfung des Ergebnisses.
- Ein klar formuliertes Ziel (welche Datei, welches Verhalten) liefert bessere Ergebnisse als eine
  vage Anweisung.
- KI-API-Zugangsdaten kommen aus Umgebungsvariablen, nie fest im Code.

Weiter geht es mit der Übung `l04-agentische-erweiterung-ki-api-exc.md` (Lösung:
`l04-agentische-erweiterung-ki-api-sol.md`).
