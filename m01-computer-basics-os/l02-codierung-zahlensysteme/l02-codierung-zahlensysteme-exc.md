# Lab 1.2 - Übung: Der Backzettel wird zum Binärcode

## Auftrag

Die Bäckerei will einen kurzen Code für die Backliste testen. Rechnet kleine
Zahlen ins Binärsystem um und übersetzt ein kurzes Wort mit Hilfe der
ASCII-Tabelle in Binärzahlen.

## Start

Ihr habt Zettel und Stift sowie die ASCII-Tabelle aus dem Theorieteil
(`A` = 65, `a` = 97, `0` = 48; jede weitere Ziffer/Buchstabe zählt fortlaufend).

## Schritte

1. Rechnet die Dezimalzahl `6` in eine 4-stellige Binärzahl um.
2. Rechnet die Dezimalzahl `13` in eine 4-stellige Binärzahl um.
3. Rechnet die Binärzahl `1001` zurück in eine Dezimalzahl.
4. Bestimmt für die Buchstaben `B` und `C` den jeweiligen ASCII-Wert (ausgehend
   von `A` = 65, fortlaufend gezählt) und notiert ihn als Dezimalzahl.
5. Übersetzt den ASCII-Wert von `B` zusätzlich in eine 8-stellige Binärzahl.
6. Partner-Check: Tauscht eure Zettel und rechnet die Binärzahl des Partners
   aus Schritt 5 zurück in eine Dezimalzahl – sie muss dem ASCII-Wert von `B`
   entsprechen.
7. Rechnet die Dezimalzahl `20` mit der Divisions-Methode (immer wieder durch
   2 teilen, Reste von unten nach oben ablesen) in eine Binärzahl um. Notiert
   dabei jede Teilung einzeln, so wie in der Tabelle aus dem Theorieteil.
8. Prüft euer Ergebnis aus Schritt 7, indem ihr die Binärzahl über die
   Zweierpotenzen zurückrechnet – das Ergebnis muss wieder `20` sein.

## Fertig, wenn

- alle drei Umrechnungen aus Schritt 1-3 korrekt sind,
- die ASCII-Werte von `B` und `C` richtig bestimmt wurden,
- die 8-stellige Binärzahl aus Schritt 5 korrekt ist,
- der Partner-Check in Schritt 6 dieselbe Zahl wie in Schritt 4 ergibt,
- die Divisions-Tabelle aus Schritt 7 vollständig ist und `20` als `10100`
  ergibt,
- die Rückrechnung aus Schritt 8 wieder `20` ergibt.

## Wenn ihr nicht weiterkommt

1. Die Stellen einer Binärzahl stehen von rechts nach links für 1, 2, 4, 8
   (Zweierpotenzen). Addiert die Werte der Stellen, die eine `1` enthalten.
2. `A` = 65; jeder weitere Buchstabe im Alphabet erhöht den Wert um 1
   (`B` = 66, `C` = 67).
3. Für 8-stellige Binärzahlen kommen die Stellen 32, 64 und 128 dazu.
4. Bei der Divisions-Methode wird so lange durch 2 geteilt, bis das Ergebnis
   `0` ist; die Reste (0 oder 1) von unten nach oben gelesen ergeben die
   Binärzahl.

## Zusatzaufgabe

Übersetzt das Wort `Hi` vollständig in ASCII-Werte und anschließend in
Binärzahlen. Vergleicht mit einem anderen Team, ob eure Binärzahlen
übereinstimmen.
