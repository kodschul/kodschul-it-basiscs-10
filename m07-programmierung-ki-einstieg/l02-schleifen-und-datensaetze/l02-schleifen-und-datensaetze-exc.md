# Lab 7.2 - Uebung: Bestelliste mit Schleifen auswerten

## Auftrag

Eine Liste von Bäckerei-Bestellungen anlegen, mit einer Schleife durchgehen und die Gesamtmenge
berechnen - in PowerShell und Python.

## Start

Der Ordner `programmieren-uebung` aus Lab 7.1 steht bereit.

## Schritte

1. Eine Liste mit mindestens 4 Produktnamen anlegen (`$produkte`/`produkte`), z. B. Roggenbrot,
   Croissant, Brezel, Kuchen.
2. Eine passende Liste mit Bestellmengen anlegen (`$mengen`/`mengen`), gleiche Anzahl Eintraege.
3. Mit einer Schleife jeden Produktnamen zusammen mit seiner Menge ausgeben (z. B.
   `"Roggenbrot: 10 Stueck"`).
4. Eine laufende Summe der Mengen mitzaehlen und am Ende die Gesamtmenge ausgeben.
5. Beides in PowerShell **und** in Python umsetzen.
6. Eine `while`-Schleife schreiben, die so lange nach weiteren Mengen fragt (`Read-Host`/`input()`),
   bis `fertig` eingegeben wird, und am Ende die Anzahl der eingegebenen Werte ausgibt.

## Fertig, wenn

- beide Sprachen jede Produkt-Mengen-Kombination einzeln ausgeben,
- beide Sprachen am Ende dieselbe korrekte Gesamtmenge zeigen,
- die `while`-Schleife zuverlaessig bei `fertig` stoppt.

## Hilfe

1. `foreach ($p in $produkte)` in PowerShell braucht dieselbe Reihenfolge wie `$mengen`, wenn beide
   Listen ueber ihre Position kombiniert werden (`$produkte[$i]`/`$mengen[$i]` mit einem Zaehler `$i`).
2. Python-Listen lassen sich mit `for p, m in zip(produkte, mengen):` bequem gemeinsam durchlaufen.
3. Eine `while`-Schleife ohne Aenderung der Abbruchbedingung im Schleifenkoerper laeuft endlos -
   Strg+C bricht ab.

## Zusatzaufgabe

Zusaetzlich den hoechsten und den niedrigsten Mengenwert der Liste waehrend der Schleife
mitverfolgen und am Ende ausgeben.
