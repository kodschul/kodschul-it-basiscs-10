# Modul 1: Bausteine eines Computersystems & Betriebssysteme

## Lab 1.2 – Codierung & Zahlensysteme

---

**Ziel:** Bit und Byte erklären, eine kleine Dezimalzahl ins Binärsystem
umrechnen und begründen, warum Computer nur mit Nullen und Einsen arbeiten.

Computer speichern und verarbeiten alles – Zahlen, Buchstaben, Bilder – als
Folgen von Nullen und Einsen. Das Binärsystem ist die Sprache der Hardware.

**Leitfragen:**

<details>
<summary>Warum rechnet ein Computer mit Nullen und Einsen statt mit den zehn Ziffern 0-9?</summary>

Elektronische Schaltungen unterscheiden zuverlässig nur zwei Zustände: Strom
an oder aus, Spannung hoch oder niedrig. Das Binärsystem (Basis 2) bildet
diese zwei Zustände direkt ab; zehn unterscheidbare Spannungsstufen wären
technisch viel fehleranfälliger.

</details>

<details>
<summary>Was ist der Unterschied zwischen einem Bit und einem Byte?</summary>

Ein Bit ist die kleinste Einheit und kann nur 0 oder 1 sein. Ein Byte besteht
aus 8 Bit und kann damit 256 unterschiedliche Werte darstellen (0 bis 255).

</details>

<details>
<summary>Wie liest man eine Binärzahl wie 1011?</summary>

Von rechts nach links stehen die Stellen für 1, 2, 4, 8, 16 usw. (Zweierpotenzen).
`1011` bedeutet: 1·8 + 0·4 + 1·2 + 1·1 = 11 im Dezimalsystem.

</details>

<details>
<summary>Was hat ASCII mit Buchstaben und Zahlen zu tun?</summary>

ASCII ist eine Code-Tabelle, die jedem Buchstaben, jeder Ziffer und jedem
Satzzeichen eine feste Zahl zuordnet (z. B. `A` = 65). Der Computer speichert
dann nur diese Zahl als Binärzahl – der Buchstabe selbst existiert für ihn nicht.

</details>

---

## Bit und Byte

| Begriff      | Definition                           | Beispiel                            |
| ------------ | ------------------------------------ | ----------------------------------- |
| Bit          | kleinste Speichereinheit, 0 oder 1   | `1`                                 |
| Byte         | 8 Bit zusammen                       | `01001101`                          |
| Zahlensystem | Art, Zahlen mit Ziffern darzustellen | Dezimal (Basis 10), Binär (Basis 2) |

## Dezimal- und Binärsystem im Vergleich

| Dezimal | Binär  | Rechenweg             |
| ------- | ------ | --------------------- |
| 0       | `0000` | –                     |
| 1       | `0001` | 1                     |
| 2       | `0010` | 1·2                   |
| 5       | `0101` | 1·4 + 1·1             |
| 11      | `1011` | 1·8 + 0·4 + 1·2 + 1·1 |

- Im Dezimalsystem steht jede Stelle für eine Zehnerpotenz (1, 10, 100 …).
- Im Binärsystem steht jede Stelle für eine Zweierpotenz (1, 2, 4, 8, 16 …).
- Beide Systeme stellen dieselbe Zahl dar, nur mit unterschiedlichen Ziffernvorräten.

## Dezimalzahl in Binär umrechnen: Schritt für Schritt

Eine Dezimalzahl wird so lange durch 2 geteilt, bis nichts mehr übrig bleibt.
Jeder Rest (0 oder 1) ergibt eine Stelle der Binärzahl – gelesen von unten nach oben.

Beispiel: `13` in Binär umrechnen.

| Schritt | Rechnung | Ergebnis | Rest |
| ------- | -------- | -------- | ---- |
| 1       | 13 ÷ 2   | 6        | 1    |
| 2       | 6 ÷ 2    | 3        | 0    |
| 3       | 3 ÷ 2    | 1        | 1    |
| 4       | 1 ÷ 2    | 0        | 1    |

Die Reste von unten nach oben gelesen ergeben `1101` – das ist `13` in Binär.

- Solange weiterteilen, bis das Ergebnis `0` ist.
- Die Reste rückwärts (letzter zuerst) aneinanderreihen ergibt die Binärzahl.
- Zur Kontrolle rechnet man die Binärzahl über die Zweierpotenzen zurück
  (siehe Tabelle oben): `1101` = 1·8 + 1·4 + 0·2 + 1·1 = `13`. ✓

## Zeichen als Code: ASCII

![Lochkarte als frühe Form der Zeichencodierung](https://commons.wikimedia.org/wiki/Special:FilePath/Blue-punch-card-front-horizontal.png?width=640)

| Zeichen | ASCII-Wert (dezimal) | Binär      |
| ------- | -------------------- | ---------- |
| `A`     | 65                   | `01000001` |
| `a`     | 97                   | `01100001` |
| `0`     | 48                   | `00110000` |

- Jedes Zeichen einer Nachricht wird über eine Code-Tabelle wie ASCII in eine
  Zahl übersetzt, bevor der Computer sie als Binärzahl speichert.
- Groß- und Kleinbuchstaben haben unterschiedliche ASCII-Werte, obwohl sie
  für Menschen "derselbe" Buchstabe sind.

## Fazit

- Computer speichern alles als Folgen von Bits (0/1).
- 8 Bit ergeben 1 Byte mit 256 möglichen Werten.
- Binärzahlen lassen sich über Zweierpotenzen in Dezimalzahlen umrechnen.
- ASCII ordnet Zeichen feste Zahlenwerte zu, die dann binär gespeichert werden.
