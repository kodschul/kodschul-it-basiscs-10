# Lab 7.2 - Loesung: Bestelliste mit Schleifen auswerten

## Schritt 1-4: Liste, Schleife, Summe

```powershell
$produkte = @("Roggenbrot", "Croissant", "Brezel", "Kuchen")
$mengen = @(10, 25, 40, 2)
$summe = 0
for ($i = 0; $i -lt $produkte.Count; $i++) {
    Write-Host "$($produkte[$i]): $($mengen[$i]) Stueck"
    $summe += $mengen[$i]
}
Write-Host "Gesamtmenge: $summe"
```

```python
produkte = ["Roggenbrot", "Croissant", "Brezel", "Kuchen"]
mengen = [10, 25, 40, 2]
summe = 0
for p, m in zip(produkte, mengen):
    print(f"{p}: {m} Stueck")
    summe += m
print(f"Gesamtmenge: {summe}")
```

## Schritt 6: while-Schleife bis "fertig"

```powershell
$eingaben = @()
while ($true) {
    $wert = Read-Host "Menge eingeben (oder 'fertig')"
    if ($wert -eq "fertig") { break }
    $eingaben += $wert
}
Write-Host "Anzahl eingegebener Werte: $($eingaben.Count)"
```

```python
eingaben = []
while True:
    wert = input("Menge eingeben (oder 'fertig'): ")
    if wert == "fertig":
        break
    eingaben.append(wert)
print(f"Anzahl eingegebener Werte: {len(eingaben)}")
```

## Zusatzaufgabe

```python
maximum = mengen[0]
minimum = mengen[0]
for m in mengen:
    if m > maximum:
        maximum = m
    if m < minimum:
        minimum = m
print(f"Hoechste Menge: {maximum}, niedrigste Menge: {minimum}")
```

Gleiches Muster in PowerShell mit `foreach` und zwei Vergleichsvariablen `$maximum`/`$minimum`.
