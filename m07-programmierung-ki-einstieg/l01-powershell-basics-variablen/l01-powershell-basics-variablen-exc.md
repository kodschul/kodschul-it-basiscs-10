# Lab 7.1 - Uebung: Erstes PowerShell-Skript mit Variablen und Eingabe

## Auftrag

Ein PowerShell-Skript schreiben, das eine Begruessung ausgibt, mit Variablen rechnet und eine Eingabe abfragt.

## Start

PowerShell ist auf dem Uebungscomputer geoeffnet. Ein leerer Ordner `powershell-uebung` steht bereit.

## Schritte

1. `Write-Host "Hallo Welt"` eingeben und ausfuehren.
2. Eine eigene Variante mit anderem Text und mit mehreren `Write-Host`-Zeilen hintereinander ausprobieren.
3. Zwei Variablen anlegen (`$a = 5`, `$b = 10`) und ihre Summe mit `Write-Host ($a + $b)` ausgeben.
4. Zwei eigene Zahlen und eine andere Rechenart (Minus oder Mal) ausprobieren.
5. Mit `Read-Host` den eigenen Namen abfragen und in einer Variable speichern.
6. Eine Begruessung ausgeben, die den eingegebenen Namen enthaelt (`Write-Host "Hallo $name!"`).

## Fertig, wenn

- mindestens drei eigene `Write-Host`-Ausgaben sichtbar sind,
- eine Rechnung mit zwei selbst gewaehlten Zahlen ein sichtbares Ergebnis zeigt,
- das Skript den eigenen eingegebenen Namen in der Begruessung zeigt.

## Hilfe

1. Ein PowerShell-Befehl steht in der Regel in einer eigenen Zeile.
2. Text in `Write-Host` braucht Anfuehrungszeichen, Zahlen nicht.
3. Ein Variablenname beginnt immer mit `$`.
4. Eine Fehlermeldung nennt meist die Zeile - dort zuerst nach einem Tippfehler suchen.

## Zusatzaufgabe

Das Skript um eine zweite `Read-Host`-Abfrage (z. B. Lieblingszahl) erweitern und diese Zahl in der Ausgabe mitverwenden.
