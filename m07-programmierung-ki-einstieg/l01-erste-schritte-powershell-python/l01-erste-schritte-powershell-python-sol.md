# Lab 7.1 - Loesung: Erstes Skript mit Variablen, Eingabe und Verzweigung

## Schritt 1: Ausgabe

```powershell
Write-Host "Hallo Welt"
```

```python
print("Hallo Welt")
```

## Schritt 2: Variablen und Rechnung

```powershell
$a = 5
$b = 10
Write-Host ($a + $b)
```

```python
a = 5
b = 10
print(a + b)
```

## Schritt 3: Eingabe und Begruessung

```powershell
$name = Read-Host "Wie heisst du?"
Write-Host "Hallo $name!"
```

```python
name = input("Wie heisst du? ")
print(f"Hallo {name}!")
```

## Schritt 4-5: Verzweigung

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

Mit `$mehl = 2` bzw. `mehl = 2` wechselt die Ausgabe in beiden Sprachen auf "Mehl nachbestellen!".

## Schritt 6: Eigene Projektidee

Keine feste Loesung - Beispiel: eine Idee "Getraenke-Bestellliste" braucht mindestens Variablen fuer
Getraenkename, Menge und Preis.

## Zusatzaufgabe

```powershell
$mehl = 3
if ($mehl -lt 2) {
    Write-Host "Kritisch wenig Mehl!"
} elseif ($mehl -lt 5) {
    Write-Host "Eher wenig Mehl."
} else {
    Write-Host "Genug Mehl auf Lager."
}
```

```python
mehl = 3
if mehl < 2:
    print("Kritisch wenig Mehl!")
elif mehl < 5:
    print("Eher wenig Mehl.")
else:
    print("Genug Mehl auf Lager.")
```
