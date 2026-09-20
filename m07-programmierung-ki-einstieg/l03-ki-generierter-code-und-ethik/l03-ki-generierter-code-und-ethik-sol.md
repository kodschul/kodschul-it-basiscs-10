# Lab 7.3 - Loesung: KI-Skript erzeugen, ausfuehren und Ethik-Fragen beantworten

## Schritt 1-3: Erstes Skript (Rechnung)

```powershell
$zahl1 = Read-Host "Erste Zahl"
$zahl2 = Read-Host "Zweite Zahl"
$summe = [int]$zahl1 + [int]$zahl2
Write-Host "Die Summe ist $summe"
```

## Schritt 4: Zweites Skript (Notiz speichern)

```powershell
$notiz = Read-Host "Was moechtest du speichern?"
Add-Content notizen.txt $notiz
Get-Content notizen.txt
```

## Schritt 5: Typischer Fehler und Behebung

Ohne `[int]` vor `$zahl1`/`$zahl2` haengt PowerShell die Eingaben als Text aneinander statt zu addieren (z. B. `"5" + "3"` ergibt `"53"` statt `8`). Die Korrektur mit `[int]` erzwingt eine echte Zahlenrechnung.

## Schritt 6: Eigene Anpassung

Beispiel: Rechenart von `+` auf `*` aendern und pruefen, dass das Ergebnis jetzt eine Multiplikation zeigt.

## Schritt 7: Ethik-Fragen

- KI-generiertem Code sollte nicht blind vertraut werden, wenn er Berechnungen, Sicherheitsfunktionen oder Daten verarbeitet, deren Korrektheit nicht selbst geprueft werden kann.
- In einen Prompt sollten keine personenbezogenen, vertraulichen oder Firmendaten eingegeben werden, die nicht fuer externe Dienste bestimmt sind.
- Eine Offenlegung von KI-Unterstuetzung schafft Transparenz und Vertrauen, besonders wenn das Ergebnis von anderen genutzt oder bewertet wird.

## Zusatzaufgabe

Die KI-Oberflaeche liefert bei einer eingereichten Fehlermeldung meist einen konkreten Korrekturvorschlag (z. B. Typumwandlung ergaenzen) - dieser sollte trotzdem selbst nachvollzogen werden, bevor er uebernommen wird.
