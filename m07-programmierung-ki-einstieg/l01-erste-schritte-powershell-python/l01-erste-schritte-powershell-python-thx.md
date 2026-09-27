# Modul 7: Programmieren mit PowerShell und Python

## Lab 7.1 - Erste Schritte: Ausgeben, Variablen, Eingaben und Verzweigungen

---

**Ziel:** Ein PowerShell- und ein Python-Skript schreiben, die Text ausgeben, mit Variablen
rechnen, eine Eingabe entgegennehmen und mit einer Verzweigung darauf reagieren.

- Ein Programm ist eine Schritt-fuer-Schritt-Anleitung, so wie ein Kochrezept.
- PowerShell ist im Kurs die Hauptsprache (Kundenvorgabe), Python steht daneben als Vergleich - dieselbe Aufgabe wird in beiden Sprachen geloest.
- Eine Variable speichert einen Wert unter einem Namen und kann diesen Wert spaeter wiederverwenden.
- Eine Verzweigung (`if`/`else`) laesst ein Skript je nach Bedingung unterschiedlich reagieren.

<details><summary>Was ist ein Programm eigentlich?</summary>

Ein Programm ist eine Abfolge von Anweisungen, die der Computer Schritt fuer Schritt genau so ausfuehrt, wie sie geschrieben wurden - wie ein Rezept, das exakt befolgt wird.

</details>

<details><summary>Was ist eine Variable?</summary>

Eine Variable ist ein benannter Speicherplatz fuer einen Wert. In PowerShell beginnt ihr Name immer mit `$` (`$name = "Anna"`), in Python steht nur der Name selbst (`name = "Anna"`).

</details>

<details><summary>Wie unterscheiden sich `Read-Host`/`Write-Host` von `input()`/`print()`?</summary>

Beide Sprachen kennen dasselbe Prinzip: eine Funktion gibt Text aus, eine andere nimmt eine Eingabe entgegen und wartet, bis Enter gedrueckt wird. Nur die Namen und die Klammer-Schreibweise in Python unterscheiden sich.

</details>

<details><summary>Wann braucht ein Skript eine Verzweigung?</summary>

Immer dann, wenn zwei unterschiedliche Antworten je nach Situation moeglich sind, z. B. "Ist noch genug Mehl da?" - ja oder nein fuehren zu unterschiedlichen naechsten Schritten.

</details>

## PowerShell und Python im Vergleich

| Aufgabe          | PowerShell                           | Python                    |
| ---------------- | ------------------------------------ | ------------------------- |
| Text ausgeben    | `Write-Host "Hallo Welt"`            | `print("Hallo Welt")`     |
| Variable anlegen | `$a = 5`                             | `a = 5`                   |
| Eingabe abfragen | `Read-Host "Wie heisst du?"`         | `input("Wie heisst du?")` |
| Verzweigung      | `if ($a -gt 0) { ... } else { ... }` | `if a > 0: ... else: ...` |

```powershell
$mehl = 12
if ($mehl -lt 5) {
    Write-Host "Mehl nachbestellen!"
} else {
    Write-Host "Genug Mehl auf Lager."
}
```

```python
mehl = 12
if mehl < 5:
    print("Mehl nachbestellen!")
else:
    print("Genug Mehl auf Lager.")
```

> **Merksatz:** Dieselbe Logik, zwei Schreibweisen - wer eine Sprache versteht, erkennt die andere schneller wieder.

## Fazit

- `Write-Host`/`print` geben aus, `Read-Host`/`input()` nehmen entgegen - beide Sprachen kennen dasselbe Grundmuster.
- Eine Variable merkt sich einen Wert unter einem Namen fuer die weitere Verwendung im Skript.
- Eine Verzweigung (`if`/`else`) laesst ein Skript auf eine Bedingung reagieren, statt immer denselben Weg zu gehen.

Weiter geht es mit der Übung `l01-erste-schritte-powershell-python-exc.md` (Lösung: `l01-erste-schritte-powershell-python-sol.md`).
