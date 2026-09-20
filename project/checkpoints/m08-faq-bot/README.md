# Checkpoint: Modul 7-8 - KI-API-Skript & FAQ-Bot

Referenzstand nach Lab 8.1 (`ki-anfrage.ps1`, einfache API-Anfrage) und Lab 8.3 (`faq-bot.ps1`, Systemkontext + Nutzerfrage).

## Voraussetzung

Beide Skripte erwarten die Umgebungsvariablen `KI_ENDPOINT` und `KI_API_KEY`. Diese werden separat und sicher (z. B. lokale `.env`-Datei, nicht eingecheckt) bereitgestellt - niemals echte Schlüssel in dieses Repo committen.

```powershell
$env:KI_ENDPOINT = "<vom Trainer bereitgestellte Test-Adresse>"
$env:KI_API_KEY = "<Test-Zugangsschluessel>"
```

## `ki-anfrage.ps1` (Lab 8.1)

Minimalbeispiel: ein fester Prompt, eine Antwort.

## `faq-bot.ps1` (Lab 8.3)

Erweitert um einen `system`-Kontext mit den Kernfakten der Bäckerei Sonnenkorn (Öffnungszeiten, Standardprodukte, Lieferzeit) und eine `Read-Host`-Nutzerfrage - das fertige Miniprojekt aus Modul 8.

## Sicherheitshinweis

Kein Skript enthält einen echten API-Schlüssel. `$env:KI_API_KEY` muss lokal/pro Teilnehmer:in gesetzt werden, nie hartkodiert.
