# Modul 3: Cloud Computing & erste Webanwendung deployen

## Lab 3.1 - Von der lokalen Website zum Deployment

---

**Ziel:** Die Baeckerei-Website aus Tag 2 mit dem Begriff Deployment verbinden.

- Ausgangspunkt: Die Website ist bisher nur auf einem Kursrechner sichtbar.
- Leitfrage: Was muss passieren, damit Kunden sie verlaesslich erreichen?
- Ein realer Server, eine lokale Website und ein Rechenzentrum machen die drei moeglichen Orte sichtbar.

<details><summary>Was bedeutet Deployment?</summary>

Deployment bedeutet, eine Anwendung so bereitzustellen, dass sie in ihrer
Zielumgebung gestartet, erreicht und betrieben werden kann.

</details>

<details><summary>Warum ist ein laufender Kursrechner nicht automatisch eine Cloud-Anwendung?</summary>

Ein Kursrechner ist nur erreichbar, solange er laeuft und sein lokales Netzwerk
den Zugriff erlaubt. Cloud-Betrieb nutzt bereitgestellte Infrastruktur.

</details>

## Lokal, Container, Cloud

![Server im Rechenzentrum](https://commons.wikimedia.org/wiki/Special:FilePath/My_Opera_Server.jpg?width=640)

So wird das Diagramm gelesen: Von links nach rechts wandert dieselbe Website in
eine besser reproduzierbare Betriebsumgebung.

```mermaid
flowchart LR
    L[Dateien auf dem Laptop] --> C[Website im Container]
    C --> D[Deployment-Umgebung]
    D --> B[Browser der Kunden]
```

| Begriff         | Bedeutung                            | Beispiel in diesem Kurs               |
| --------------- | ------------------------------------ | ------------------------------------- |
| lokale Umgebung | Arbeit auf dem eigenen Rechner       | HTML-Datei im Kursordner              |
| Container       | abgepackte, startbare Umgebung       | Nginx mit Website-Dateien             |
| Deployment      | Bereitstellung in einer Zielumgebung | Container wird gestartet und getestet |
| Cloud           | fremd betriebene Rechenressourcen    | VM oder Plattform eines Anbieters     |

## Service-Modelle wiederholen

| Modell | Anbieter stellt bereit | Team verantwortet weiter           |
| ------ | ---------------------- | ---------------------------------- |
| IaaS   | VM, Speicher, Netzwerk | Betriebssystem, Updates, Anwendung |
| PaaS   | Laufzeit und Plattform | Anwendung, Daten, Einstellungen    |
| SaaS   | fertige Anwendung      | Nutzer, Inhalte, Berechtigungen    |

> **Merksatz:** Deployment ist nicht nur "online stellen". Es macht klar,
> wo eine Anwendung laeuft, wie sie erreichbar ist und wer sie betreibt.

- Ein Image ist eine Vorlage; ein Container ist die laufende Instanz davon.
- Ein Container ersetzt keine Zugriffsrechte, Backups oder Sicherheitspruefungen.

## Fazit

- Die gleiche Website kann lokal, im Container oder in einer Cloud-Umgebung laufen.
- Deployment verbindet Anwendung, Zielumgebung und Erreichbarkeit.
- IaaS, PaaS und SaaS unterscheiden Verantwortlichkeiten, nicht Wertigkeit.

Weiter geht es mit der Uebung `l01-cloud-deployment-basics-exc.md` (Loesung: `l01-cloud-deployment-basics-sol.md`).
