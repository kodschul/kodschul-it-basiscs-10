# Lab 7.2 - Uebung: Notizdatei per Skript & eigene Prompts testen

## Auftrag

Ein PowerShell-Skript schreiben, das eine Eingabe in eine Datei speichert und wieder ausliest, und anschliessend 3-5 eigene Prompts in der bereitgestellten KI-Oberflaeche ausprobieren.

## Start

PowerShell ist geoeffnet. Ein Zugang zur bereitgestellten KI-Oberflaeche (z. B. ChatGPT/Playground) steht bereit.

## Schritte

1. Mit `New-Item` eine leere Datei `notizen.txt` anlegen.
2. Ein Skript schreiben, das per `Read-Host` eine Notiz abfragt und sie mit `Add-Content` in `notizen.txt` speichert.
3. Das Skript zweimal mit unterschiedlichen Notizen ausfuehren.
4. Mit `Get-Content notizen.txt` beide gespeicherten Notizen anzeigen.
5. In der KI-Oberflaeche einen vagen Prompt eingeben (z. B. "Schreib was ueber Brot") und das Ergebnis lesen.
6. Denselben Wunsch als konkreten Prompt formulieren (Aufgabe, Ton, Laenge nennen) und das Ergebnis vergleichen.
7. Zwei weitere eigene Prompts zu einem selbst gewaehlten Thema ausprobieren (insgesamt mindestens 3-5 Prompts).

## Fertig, wenn

- `notizen.txt` mindestens zwei gespeicherte Eintraege enthaelt und beide mit `Get-Content` angezeigt wurden,
- mindestens 3-5 eigene Prompts ausprobiert wurden,
- der Unterschied zwischen vagem und konkretem Prompt in eigenen Worten erklaert werden kann.

## Hilfe

1. `Add-Content datei.txt $variable` haengt eine Variable als neue Zeile an eine Datei an.
2. `Get-Content` zeigt alle Zeilen einer Datei, auch mehrere.
3. Ein konkreter Prompt nennt Aufgabe, gewuenschten Ton und ungefaehre Laenge.

## Zusatzaufgabe

Denselben konkreten Prompt zweimal in die KI-Oberflaeche eingeben und pruefen, ob beide Antworten identisch oder unterschiedlich sind.
