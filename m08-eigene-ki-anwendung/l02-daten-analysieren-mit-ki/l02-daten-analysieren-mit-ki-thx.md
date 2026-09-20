# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.2 - Daten analysieren mit KI

---

**Ziel:** Einen Beispieldatensatz (Verkaufszahlen) per KI-Prompt auswerten
lassen und den Prompt gezielt verfeinern, um bessere Analyseergebnisse zu erhalten.

- Eine KI kann Textdaten (z. B. eine CSV-Tabelle als Text im Prompt) zusammenfassen und interpretieren.
- Ein erster Analyse-Prompt liefert oft nur eine grobe Übersicht - gezieltes Nachfragen bringt konkretere Antworten.
- Der Vergleich mehrerer Prompt-Varianten zeigt, welche Formulierung zur eigenen Fragestellung passt.

<details><summary>Wie kann eine KI eine CSV-Tabelle analysieren, ohne eine Datenbank zu sein?</summary>

Die Tabelle wird als Text in den Prompt eingefügt (oder hochgeladen, je nach Werkzeug). Das Modell liest den Text wie jeden anderen und sucht Muster, Summen oder Auffälligkeiten - es rechnet dabei nicht wie ein Tabellenkalkulationsprogramm, sondern schätzt auf Basis von Sprache.

</details>

<details><summary>Warum liefert eine erste Analyse-Anfrage oft nur eine grobe Antwort?</summary>

Ein Prompt wie "Analysiere diese Daten" lässt offen, welche Kennzahl oder welcher Zeitraum interessiert. Ein gezielterer Prompt (z. B. "Welches Produkt hatte im März die höchsten Verkaufszahlen?") liefert eine konkretere Antwort.

</details>

<details><summary>Worauf sollte man bei KI-Analyseergebnissen achten?</summary>

Ein Modell kann Zahlen falsch lesen oder runden - ein Ergebnis mit auffälligem Wert sollte gegen die Rohdaten geprüft werden, statt ungeprüft übernommen zu werden.

</details>

## Beispieldatensatz Verkaufszahlen (Auszug)

| Datum  | Produkt    | Menge | Umsatz (€) |
| ------ | ---------- | ----- | ---------- |
| 01.03. | Roggenbrot | 42    | 168,00     |
| 01.03. | Croissant  | 65    | 130,00     |
| 15.03. | Roggenbrot | 58    | 232,00     |
| 15.03. | Croissant  | 40    | 80,00      |

## Vom groben zum gezielten Prompt

| Prompt                                                                                      | Ergebnis-Qualität                             |
| ------------------------------------------------------------------------------------------- | --------------------------------------------- |
| "Analysiere diese Verkaufsdaten."                                                           | vage Zusammenfassung, keine konkrete Kennzahl |
| "Welches Produkt hatte in diesem Datensatz den höchsten Gesamtumsatz, und wie hoch war er?" | konkrete, prüfbare Antwort                    |

![Diagramm und Tabellen Symbolbild](https://loremflickr.com/640/360/chart,dataanalysis)

## Fazit

- Eine KI analysiert Tabellendaten als Text und schätzt Muster, statt exakt wie eine Tabellenkalkulation zu rechnen.
- Ein gezielter, konkreter Prompt liefert eine brauchbarere Analyse als eine allgemeine Aufforderung.
- Auffällige KI-Ergebnisse sollten gegen die Rohdaten geprüft werden, bevor sie weiterverwendet werden.

Weiter geht es mit der Übung `l02-daten-analysieren-mit-ki-exc.md` (Lösung: `l02-daten-analysieren-mit-ki-sol.md`).
