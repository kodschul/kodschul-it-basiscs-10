# Checkpoint: Modul 7-8 - Konsolen-App, Web-Frontend/Backend & agentische Erweiterung

Referenzstand für den Tag 6-9 Bogen aus `idea/part2_course_agenda.md`: dieselbe
Bäckerei-Bestellliste wandert von einer PowerShell/Python-Konsolenanwendung (Modul 7) zu einer
Web-Anwendung mit KI-generiertem Frontend + Python-Backend (Modul 8) und einer agentisch
erweiterten Version (Modul 8, Fortsetzung/Tag 9).

## Voraussetzung

`baeckerei.db` (SQLite, Tabelle `bestellungen`: `id`, `produkt`, `menge`, `status`) aus Modul 4/
Lab 7.3 liegt bereit. Für die agentische Erweiterung (Lab 8.4) werden zusätzlich die
Umgebungsvariablen `KI_ENDPOINT`/`KI_API_KEY` separat und sicher bereitgestellt - niemals echte
Schlüssel in dieses Repo committen.

## `konsolen-app.ps1` (Lab 7.4)

Menü-gesteuerte CRUD-Konsolenanwendung (Anzeigen/Anlegen/Ändern/Löschen/Beenden) auf
`baeckerei.db`, primär in PowerShell - `konsolen-app.py` daneben als Python-Referenz/
Zusatzaufgabe.

## `frontend/index.html` + `backend/server.py` (Lab 8.1-8.3)

KI-generiertes HTML/CSS-Grundgerüst, verbunden mit einem Python-Webserver: volles CRUD
(Anlegen/Anzeigen/Erledigt-markieren/Löschen) direkt über die Oberfläche, jede Aktion schreibt in
dieselbe `baeckerei.db`.

## `backend/server_agentisch.py` (Lab 8.4)

Erweiterung um ein Feld "Kategorie" pro Bestellung inkl. automatischem Vorschlag über eine KI-API
(`KI_ENDPOINT`/`KI_API_KEY`) - Ergebnis einer agentischen ("Vibecoding") Erweiterung, mit
Fallback auf "Unbekannt" bei nicht erreichbarer API.

## Sicherheitshinweis

Kein Skript enthält einen echten API-Schlüssel. `$env:KI_API_KEY`/`KI_API_KEY` muss lokal/pro
Teilnehmer:in gesetzt werden, nie hartkodiert.
