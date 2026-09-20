# Modul 5: Virtualisierung & Cloud im Microsoft-Umfeld

## Lab 5.2 - Snapshot, Backup und Wiederherstellung

---

**Ziel:** Einen Snapshot erzeugen, eine Test-VM veraendern und den frueheren Zustand wiederherstellen.

- Eine Demo zeigt eine sichtbare Aenderung vor und nach dem Snapshot.
- Danach erzeugen Gruppen ihren eigenen Wiederherstellungspunkt.
- Gruppen pruefen anschliessend das Zuruecksetzen.

<details><summary>Was sichert ein Snapshot?</summary>

Ein Snapshot speichert den Zustand einer VM zu einem Zeitpunkt. Er ist fuer kurze Testschritte geeignet.

</details>

<details><summary>Warum ersetzt ein Snapshot kein Backup?</summary>

Ein Snapshot liegt oft beim selben System. Ein Backup ist fuer Wiederherstellung nach groesseren Schaeden oder Verlust getrennt aufzubewahren.

</details>

## Drei Begriffe unterscheiden

![Externe Sicherung und Laptop](https://commons.wikimedia.org/wiki/Special:FilePath/WD_External_Hard_Drives_IMG_7899.jpg?width=640)

| Begriff  | Zweck                              | Beispiel                        |
| -------- | ---------------------------------- | ------------------------------- |
| Snapshot | Zustand vor einem Test merken      | vor Software-Aenderung          |
| Backup   | Daten langfristig sichern          | getrennte Kopie wichtiger Daten |
| Restore  | frueheren Zustand wiederherstellen | Snapshot zurueckspielen         |

> **Merksatz:** Ein Snapshot hilft beim Testen; ein getrenntes Backup hilft beim Verlust.

- Einen Snapshot nur fuer die bereitgestellte Test-VM verwenden.
- Das Zuruecksetzen verwirft spaetere Aenderungen in der VM.

## Fazit

- Snapshot und Backup haben unterschiedliche Aufgaben.
- Vor einem riskanten Test wird ein Wiederherstellungspunkt erstellt.
- Eine Wiederherstellung muss sichtbar geprueft werden.

Weiter geht es mit der Uebung `l02-snapshots-local-backups-exc.md` (Loesung: `l02-snapshots-local-backups-sol.md`).
