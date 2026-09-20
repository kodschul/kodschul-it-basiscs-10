# Lab 7.1 - Loesung: Erstes PowerShell-Skript mit Variablen und Eingabe

## Schritt 1-2: Ausgabe

```powershell
Write-Host "Hallo Welt"
Write-Host "Das ist meine erste Zeile"
Write-Host "Und eine zweite Zeile"
```

## Schritt 3-4: Variablen und Rechnung

```powershell
$a = 5
$b = 10
Write-Host ($a + $b)

$c = 4
$d = 3
Write-Host ($c * $d)
```

## Schritt 5-6: Eingabe und Begruessung

```powershell
$name = Read-Host "Wie heisst du?"
Write-Host "Hallo $name!"
```

## Zusatzaufgabe

```powershell
$name = Read-Host "Wie heisst du?"
$zahl = Read-Host "Was ist deine Lieblingszahl?"
Write-Host "Hallo $name! Deine Lieblingszahl $zahl mal 2 ist $($zahl * 2)."
```
