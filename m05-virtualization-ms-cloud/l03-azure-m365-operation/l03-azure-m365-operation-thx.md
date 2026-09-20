# Modul 5: Virtualisierung & Cloud im Microsoft-Umfeld

## Lab 5.3 - Azure-VM und Microsoft 365 betreiben

---

**Ziel:** Lokale Virtualisierung mit Azure-VMs und der Nutzerverwaltung im Microsoft 365 Admin Center verbinden.

- Eine Demo zeigt die bereitgestellte Testumgebung.
- Danach arbeiten Gruppen ausschliesslich mit Testkonten.
- Nutzer, Lizenz und VM-Einstellung werden als Betriebsaufgaben erkannt, nicht als private Cloud-Nutzung.

<details><summary>Was bleibt bei einer Azure-VM Verantwortung des Teams?</summary>

Das Team waehlt Groesse, Zugriffsweg, Betriebssystem-Konfiguration und Anwendung. Azure betreibt die zugrunde liegende Rechenzentrumsinfrastruktur.

</details>

<details><summary>Was verwaltet ein Microsoft-365-Admin?</summary>

Zum Beispiel Nutzer, Lizenzen, Gruppen und den Zugang zu Diensten. Rechte sollen nach dem kleinsten notwendigen Umfang vergeben werden.

</details>

## Betrieb im Vergleich

![Cloud-Rechenzentrum](https://commons.wikimedia.org/wiki/Special:FilePath/My_Opera_Server.jpg?width=640)

| Aufgabe           | lokale VM        | Azure-VM                   | Microsoft 365               |
| ----------------- | ---------------- | -------------------------- | --------------------------- |
| Computer starten  | lokale Software  | Azure-Portal               | nicht zutreffend            |
| Nutzer verwalten  | lokal im Gast-OS | Zugang zur VM              | Admin Center                |
| Wiederherstellung | lokaler Snapshot | Azure-Backup oder Snapshot | Dienst- und Datenrichtlinie |

- Azure- und M365-Oberflaechen sind versions- und berechtigungsabhaengig.
- Nur vom Trainer bereitgestellte Testtenants und Testkonten verwenden.

## Fazit

- Cloud verlagert Teile des Betriebs, aber nicht jede Verantwortung.
- Azure-VMs brauchen Zugriff, Groesse und Wiederherstellungsplanung.
- M365-Administration steuert Nutzer und Dienste, nicht nur E-Mail.

Weiter geht es mit der Uebung `l03-azure-m365-operation-exc.md` (Loesung: `l03-azure-m365-operation-sol.md`).
