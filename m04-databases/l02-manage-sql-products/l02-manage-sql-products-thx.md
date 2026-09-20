# Modul 4: Datenbanken verstehen & anwenden

## Lab 4.2 - Produkte mit SQL verwalten

---

**Ziel:** Eine Produkttabelle anlegen und sichtbare Baeckerei-Daten mit SQL aendern.

- Eine Demo zeigt zuerst eine Tabelle als leere Liste.
- Danach entstehen Produkte, eine Preis-Aenderung und eine geloeschte Testzeile.
- Jede SQL-Anweisung hat eine sichtbare Wirkung in Adminer.

<details><summary>Was ist SQL eigentlich?</summary>

SQL (Structured Query Language) ist keine Programmiersprache im ueblichen Sinn, sondern eine Abfragesprache: Ein SQL-Befehl beschreibt, WAS mit den Daten passieren soll ("lege diese Zeile an", "aendere diesen Wert", "loesche diese Zeile"), nicht WIE die Datenbank das intern umsetzt. MySQL liest den Befehl, prueft ihn gegen die Tabellenstruktur und fuehrt ihn aus.

</details>

<details><summary>Warum braucht eine Tabelle einen eindeutigen Schluessel?</summary>

Eine ID unterscheidet Datensaetze auch dann, wenn zwei Produkte denselben Namen haben.

</details>

<details><summary>Was aendert INSERT, UPDATE und DELETE?</summary>

INSERT fuegt eine Zeile hinzu, UPDATE aendert vorhandene Werte und DELETE entfernt ausgewaehlte Zeilen.

</details>

## SQL als Arbeitssprache

| Befehl         | Wirkung           | Sichtbarer Beleg             |
| -------------- | ----------------- | ---------------------------- |
| `CREATE TABLE` | Tabelle anlegen   | Tabelle erscheint in Adminer |
| `INSERT`       | Zeile hinzufuegen | Produkt erscheint            |
| `UPDATE`       | Wert aendern      | Preis ist neu                |
| `DELETE`       | Zeile entfernen   | Testprodukt fehlt            |

![Datenbank-Tastatur und Bildschirm](https://commons.wikimedia.org/wiki/Special:FilePath/IBM_Model_F_XT.png?width=640)

- `DELETE` ohne Bedingung kann alle Zeilen loeschen.
- Testdaten duerfen immer geloescht werden; echte Daten nur mit Freigabe.

## Fazit

- Tabellen halten gleichartige Datensaetze in Spalten und Zeilen.
- SQL-Aenderungen muessen im Ergebnis kontrolliert werden.
- Eine `WHERE`-Bedingung begrenzt Aenderungen auf passende Zeilen.

Weiter geht es mit der Uebung `l02-manage-sql-products-exc.md` (Loesung: `l02-manage-sql-products-sol.md`).
