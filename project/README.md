# Bäckerei-Verwaltung - roter Faden

Die "Bäckerei-Verwaltung" ist die wiederkehrende Beispielfirma dieses Kurses. Sie ist **kein** durchgehendes Projekt im Sinn eines einzelnen wachsenden Repos (siehe `01-concept.md`: "Breite statt Tiefe", 10 weitgehend unabhängige Module) - sie taucht aber in mehreren Modulen als dasselbe Szenario wieder auf, damit Teilnehmer:innen nicht bei jedem Modul ein neues Beispiel lernen müssen.

Dieser Ordner sammelt die Start- und Referenzzustände, die mehr als ein Modul betreffen. Einzelne Labs verlinken nur die Dateien, die sie wirklich brauchen - nicht jede Übung führt über diesen Ordner.

## Wie sich die Bäckerei-Verwaltung entwickelt

| Modul                       | Was entsteht                                                                      | Ablageort                                                |
| --------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| M1 Computer-Basics          | Ordnerstruktur `baeckerei/{produkte,kunden,bestellungen}` im Terminal angelegt    | `checkpoints/m01-baeckerei-terminal/`                    |
| M2 Netzwerke                | Client/Server-Demo (zwei Container, Website via `docker compose`)                 | `checkpoints/m02-m03-baeckerei-site/baeckerei-netzwerk/` |
| M3 Cloud & Deployment       | Dieselbe Website als eigenes Docker-Image (`baeckerei-site`) verpackt             | `checkpoints/m02-m03-baeckerei-site/baeckerei-site/`     |
| M4 Datenbanken              | MySQL-Tabelle `produkte` (Adminer) + MongoDB-Sammlungen `produkte`/`bestellungen` | `checkpoints/m04-baeckerei-db/`                          |
| M6 Datenschutz & Sicherheit | `kundendaten.txt` mit demonstrierten Zugriffsrechten (`chmod`)                    | `checkpoints/m06-datenschutz/`                           |
| M7-M8 Programmierung & KI   | Eigenes PowerShell-Skript mit KI-API-Anfrage, daraus der FAQ-Bot                  | `checkpoints/m08-faq-bot/`                               |

Module 5, 9 und 10 nutzen die Bäckerei-Verwaltung nicht (eigenständige Szenarien: Azure/M365-Testtenant bzw. Wiederholung/Prüfung).

## Ordnerrollen

- `starter/`: bewusst unfertige/unsortierte Ausgangszustände, mit denen eine Übung beginnt (z. B. der unsortierte `download-chaos/`-Ordner für Lab 1.2).
- `checkpoints/`: funktionsfähige Referenzstände nach dem jeweiligen Modul - Vergleichsbasis, falls der eigene Stand nicht mehr zum erwarteten Ergebnis passt.

## Hinweis zu Platzhalterdateien

Dateien wie `rechnung-mai.pdf`, `teamfoto.png` etc. in `starter/download-chaos/` sind reine Textplatzhalter mit der passenden Dateiendung (zum Sortieren/Erkennen von Dateitypen reicht das) - keine echten PDF/Bild-Binärdateien. Für den echten Kurseinsatz vor Ort können sie 1:1 durch echte Beispieldateien gleichen Namens ersetzt werden, ohne dass sich die Übungstexte ändern müssen.

## Sicherheits- und Datenschutzhinweis

Alle Namen, Adressen und Zugangsdaten in diesem Ordner sind frei erfunden (fiktive Beispielfirma "Bäckerei Sonnenkorn"/"Bäckerei-Verwaltung"). Es werden keine echten Kunden- oder Firmendaten verwendet. API-Zugangsschlüssel in `checkpoints/m08-faq-bot/` sind Platzhalter (`$env:KI_API_KEY`) - vor der Schulung müssen echte Testzugangsdaten separat und sicher bereitgestellt werden, nie im Repo selbst.
