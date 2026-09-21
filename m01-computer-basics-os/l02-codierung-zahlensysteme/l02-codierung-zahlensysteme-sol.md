# Lab 1.2 - Lösung: Der Backzettel wird zum Binärcode

## Schritt 1: 6 in Binär

`6` = 4 + 2 → `0110`.

## Schritt 2: 13 in Binär

`13` = 8 + 4 + 1 → `1101`.

## Schritt 3: 1001 in Dezimal

`1001` = 8 + 0 + 0 + 1 = `9`.

## Schritt 4: ASCII-Werte von B und C

`A` = 65, also `B` = 66 und `C` = 67.

## Schritt 5: B in 8-stelliger Binärzahl

`66` = 64 + 2 → `01000010`.

## Schritt 6: Partner-Check

`01000010` zurückgerechnet: 64 + 2 = `66`, was dem ASCII-Wert von `B` aus
Schritt 4 entspricht. Stimmen die Zahlen nicht überein, wurde vermutlich eine
Zweierpotenz-Stelle (32, 64, 128) falsch zugeordnet.

## Schritt 7: 20 mit der Divisions-Methode

| Teilung | Rechnung    | Ergebnis | Rest |
| ------- | ----------- | -------- | ---- |
| 1       | 20 \u00f7 2 | 10       | 0    |
| 2       | 10 \u00f7 2 | 5        | 0    |
| 3       | 5 \u00f7 2  | 2        | 1    |
| 4       | 2 \u00f7 2  | 1        | 0    |
| 5       | 1 \u00f7 2  | 0        | 1    |

Die Reste von unten nach oben gelesen ergeben `10100`.

## Schritt 8: R\u00fcckrechnung

`10100` = 1\u00b716 + 0\u00b78 + 1\u00b74 + 0\u00b72 + 0\u00b71 = `20`, was die Umrechnung aus
Schritt 7 best\u00e4tigt.

## Zusatzaufgabe

`H` = 72 → `01001000`; `i` = 105 → `01101001`. Beide Teams sollten für `Hi`
dieselben zwei Binärzahlen erhalten, sofern beide von den gleichen ASCII-
Startwerten (`A` = 65, `a` = 97) ausgehen.
