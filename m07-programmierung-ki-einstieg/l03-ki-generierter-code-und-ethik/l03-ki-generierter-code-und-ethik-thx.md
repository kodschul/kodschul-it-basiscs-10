# Modul 7: Einstieg in Programmierung & KI

## Lab 7.3 - KI-generierter Code, Fehlerbehebung & Ethik

---

**Ziel:** Ein KI-Modell per Prompt ein PowerShell-Skript erzeugen lassen, es
in VS Code ausführen und Fehler beheben, und den Umgang mit KI kritisch einordnen.

- Ein Prompt kann direkt fertigen Code anfordern, nicht nur Text.
- Von der KI erzeugter Code muss trotzdem gelesen und verstanden werden, bevor er ausgeführt wird.
- Eine Fehlermeldung in VS Code zeigt meist Zeile und Ursache und ist der erste Ansatzpunkt zur Korrektur.
- KI-generierter Code kann falsch, veraltet oder unpassend sein - Verantwortung bleibt bei der Person, die ihn nutzt.

<details><summary>Wie fordert man Code statt Text an?</summary>

Der Prompt nennt die gewünschte Sprache und die genaue Aufgabe, z. B. "Schreibe ein PowerShell-Skript, das nach einem Namen fragt und ihn dreimal ausgibt." Je konkreter die Aufgabe, desto passender der erzeugte Code.

</details>

<details><summary>Warum reicht es nicht, KI-Code einfach auszuführen?</summary>

Ein KI-Modell kann syntaktisch korrekten, aber inhaltlich falschen oder unsicheren Code erzeugen. Nur wer den Code liest und versteht, erkennt, ob er wirklich das Gewünschte tut.

</details>

<details><summary>Was ist beim ethischen Umgang mit KI zu beachten?</summary>

Dazu gehören unter anderem: keine sensiblen/personenbezogenen Daten in einen Prompt eingeben, KI-Ergebnisse als Vorschlag statt als sichere Wahrheit behandeln, und offenlegen, wenn ein Ergebnis KI-unterstützt entstanden ist.

</details>

## Vom Prompt zum lauffähigen Skript

1. Prompt an das KI-Modell senden (z. B. "Schreibe ein PowerShell-Skript, das zwei Zahlen abfragt und deren Summe ausgibt").
2. Erzeugten Code in VS Code in eine `.ps1`-Datei einfügen.
3. Skript ausführen und die Ausgabe prüfen.
4. Bei einer Fehlermeldung: Zeile und Fehlertext lesen, Ursache im Code suchen.
5. Skript anpassen (z. B. andere Rechenart, zusätzliche Ausgabe) und erneut ausführen.

![VS Code mit Terminal und Skript](https://loremflickr.com/640/360/code,editor)

## Fazit

- Ein Prompt kann direkt Code anfordern, muss aber die Aufgabe konkret benennen.
- KI-generierter Code ersetzt nicht das Lesen und Verstehen des Codes vor der Ausführung.
- Fehlermeldungen in VS Code sind Werkzeug, nicht Hindernis: Zeile und Text zeigen den Ansatzpunkt.
- Verantwortung für Ergebnis und Einsatz von KI-Code bleibt bei der Person, die ihn nutzt.

Weiter geht es mit der Übung `l03-ki-generierter-code-und-ethik-exc.md` (Lösung: `l03-ki-generierter-code-und-ethik-sol.md`).
