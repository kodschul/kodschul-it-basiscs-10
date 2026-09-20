# Modul 4: Datenbanken verstehen & anwenden

## Lab 4.3 - Baeckerei-Daten als SQL und NoSQL vergleichen

---

**Ziel:** Dieselben Baeckerei-Daten als Tabelle und als Dokument vergleichen.

- Eine Bestellung wird zuerst als Zeile in einer Tabelle, dann als JSON-Dokument gezeigt.
- Gruppen entscheiden, welche Form zu einer vorgegebenen Aufgabe passt.
- Beide Formen loesen unterschiedliche Probleme.

<details><summary>Was ist eine Dokumentendatenbank wie MongoDB, und wie funktioniert sie?</summary>

MongoDB speichert keine Tabellen mit festen Spalten, sondern einzelne Dokumente (im JSON-Format) in einer Collection. Jedes Dokument kann eigene, auch verschachtelte Felder haben. Beim Speichern und Lesen prueft MongoDB kein festes Tabellenschema, sondern arbeitet direkt mit dem Dokument als Ganzes.

</details>

<details><summary>Was ist der sichtbare Unterschied zwischen SQL und NoSQL?</summary>

SQL organisiert Daten oft in Tabellen mit festgelegten Spalten. Ein NoSQL-Dokument kann verschachtelte Daten gemeinsam speichern.

</details>

<details><summary>Ist NoSQL immer besser fuer flexible Daten?</summary>

Nein. Die Wahl haengt von Abfragen, Konsistenz, Datenform und Betriebsumgebung ab.

</details>

## Zwei Darstellungen einer Bestellung

| SQL-Tabelle                | NoSQL-Dokument                       |
| -------------------------- | ------------------------------------ |
| eine Zeile pro Datensatz   | ein JSON-Dokument pro Bestellung     |
| feste Spalten              | Felder koennen verschachtelt sein    |
| gut fuer klare Beziehungen | gut fuer zusammengehoerige Dokumente |

```json
{
  "kunde": "Beispiel GmbH",
  "produkte": ["Roggenbrot", "Croissant"],
  "gesamtpreis": 6.0
}
```

![Daten und Server](https://commons.wikimedia.org/wiki/Special:FilePath/My_Opera_Server.jpg?width=640)

## Fazit

- SQL und NoSQL sind verschiedene Datenmodelle, keine Gegner.
- Tabellen sind gut lesbar, wenn Daten feste Spalten besitzen.
- Dokumente koennen zusammengehoerige Informationen verschachteln.

Weiter geht es mit der Uebung `l03-compare-nosql-bakery-exc.md` (Loesung: `l03-compare-nosql-bakery-sol.md`).
