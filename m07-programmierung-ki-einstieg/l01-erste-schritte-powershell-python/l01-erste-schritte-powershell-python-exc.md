# Lab 7.1 - Uebung: Erstes Skript mit Variablen, Eingabe und Verzweigung

## Auftrag

Ein PowerShell-Skript und ein Python-Skript schreiben, die eine Begruessung ausgeben, mit
Variablen rechnen, eine Eingabe abfragen und mit einer Verzweigung darauf reagieren.

## Start

PowerShell und Python 3 sind auf dem Uebungscomputer verfuegbar. Ein leerer Ordner
`programmieren-uebung` steht bereit.

## Schritte

1. `Write-Host "Hallo Welt"` (PowerShell) und `print("Hallo Welt")` (Python) jeweils in einer
   eigenen Datei (`hallo.ps1` / `hallo.py`) ausfuehren.
2. Zwei Variablen anlegen (`$a = 5`, `$b = 10` bzw. `a = 5`, `b = 10`) und ihre Summe ausgeben -
   in beiden Sprachen.
3. Mit `Read-Host`/`input()` den eigenen Namen abfragen und in einer Begruessung ausgeben - in
   beiden Sprachen.
4. Eine Variable `$mehl`/`mehl` mit einer selbst gewaehlten Zahl anlegen und mit `if`/`else`
   ausgeben, ob nachbestellt werden muss (Schwelle: unter 5).
5. Die Schwelle einmal so aendern, dass der jeweils andere Fall eintritt, und pruefen, ob die
   Ausgabe wechselt.
6. Notieren: welche Variablen wuerde die eigene Projektidee aus Tag 6 (Recap) mindestens brauchen?

## Fertig, wenn

- beide Sprachen dieselbe Begruessung mit dem eigenen eingegebenen Namen zeigen,
- die Rechnung mit zwei selbst gewaehlten Zahlen in beiden Sprachen ein sichtbares Ergebnis zeigt,
- die Verzweigung in beiden Sprachen bei einer hohen und bei einer niedrigen Mehlzahl die jeweils
  richtige Meldung zeigt.

## Hilfe

1. Ein PowerShell-Variablenname beginnt immer mit `$`, ein Python-Variablenname nicht.
2. Python-Bloecke (nach `if`/`else`) werden durch Einrueckung markiert, nicht durch `{ }`.
3. `Read-Host`/`input()` liefern immer Text - eine Zahl daraus muss ggf. mit `[int]`/`int(...)`
   umgewandelt werden, bevor damit gerechnet wird.
4. Eine Fehlermeldung nennt meist die betroffene Zeile - dort zuerst nach einem Tippfehler suchen.

## Zusatzaufgabe

Eine zweite Bedingung ergaenzen (z. B. "kritisch wenig" unter 2, "ok" ab 5, "eher wenig"
dazwischen) - in PowerShell mit `elseif`, in Python mit `elif`.
