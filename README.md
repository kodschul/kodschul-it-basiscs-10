# IT-Basics für Einsteiger:innen (10 Tage) - Kursmaterial

Einstiegspunkt für Teilnehmer:innen. Jedes Modul enthält Theorie (`-thx.md`), eine Übung (`-exc.md`) und die passende Lösung (`-sol.md`).

## Module

| #   | Modul                                  | Ordner                                                                 |
| --- | -------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Computer-Basics & Betriebssysteme      | [m01-computer-basics-os/](m01-computer-basics-os/)                     |
| 2   | Netzwerke Grundlagen                   | [m02-networks-basics/](m02-networks-basics/)                           |
| 3   | Cloud & Deployment                     | [m03-cloud-deployment/](m03-cloud-deployment/)                         |
| 4   | Datenbanken                            | [m04-databases/](m04-databases/)                                       |
| 5   | Virtualisierung & Microsoft Cloud      | [m05-virtualization-ms-cloud/](m05-virtualization-ms-cloud/)           |
| 6   | Datenschutz & IT-Sicherheit Grundlagen | [m06-datenschutz-sicherheit/](m06-datenschutz-sicherheit/)             |
| 7   | Einstieg in Programmierung & KI        | [m07-programmierung-ki-einstieg/](m07-programmierung-ki-einstieg/)     |
| 8   | Eigene KI-Anwendung entwickeln         | [m08-eigene-ki-anwendung/](m08-eigene-ki-anwendung/)                   |
| 9   | Wiederholung & Präsentation            | [m09-wiederholung-praesentation/](m09-wiederholung-praesentation/)     |
| 10  | Abschlussprüfung & Zertifikat          | [m10-abschlusspruefung-zertifikat/](m10-abschlusspruefung-zertifikat/) |

Es gibt kein einzelnes durchgehendes Projekt (bewusste Entscheidung: "Breite statt Tiefe", siehe [../01-concept.md](../01-concept.md)). Stattdessen begleitet die wiederkehrende Beispielfirma **"Bäckerei-Verwaltung"** mehrere Module als roter Faden.

## Projekt-Assets (roter Faden "Bäckerei-Verwaltung")

Geteilte Start- und Referenzzustände, siehe [project/README.md](project/README.md):

```
project/
├── starter/                     # Ausgangszustände für Übungen (Modul 1, 2)
└── checkpoints/                 # Referenzstände je Modul-Meilenstein
    ├── m01-baeckerei-terminal/  # Ordnerstruktur nach Modul 1
    ├── m02-m03-baeckerei-site/  # Client/Server-Demo + Docker-Image nach Modul 2-3
    ├── m04-baeckerei-db/        # MySQL/Adminer + MongoDB nach Modul 4
    ├── m06-datenschutz/         # Rechte-Beispiel nach Modul 6
    └── m08-faq-bot/             # KI-API-Skript + FAQ-Bot nach Modul 8
```

Ein Checkpoint ist ein Referenzstand, kein Lückenfüller für nicht selbst bearbeitete Übungen - er zeigt, wie das Ergebnis nach dem jeweiligen Modul aussehen sollte, falls der eigene Stand verglichen oder wiederhergestellt werden muss.
