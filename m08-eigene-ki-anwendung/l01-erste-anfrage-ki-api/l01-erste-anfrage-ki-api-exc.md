# Lab 8.1 - Uebung: Eigenes Skript mit KI-API & Projektziel waehlen

## Auftrag

Ein PowerShell-Skript schreiben, das eine Anfrage an die bereitgestellte OpenAI/Copilot-API sendet, und ein eigenes kleines KI-Projektziel festlegen.

## Start

Ein Testzugang zur KI-API (Endpoint + Zugangsschluessel) wird bereitgestellt. VS Code mit PowerShell ist geoeffnet.

## Schritte

1. Die Live-Demo-Anfrage des Trainers als Vorlage in eine eigene Datei `ki-anfrage.ps1` kopieren.
2. Den Prompt in der Vorlage durch eine eigene Frage ersetzen (z. B. "Was sind drei Vorteile von Frischbrot ohne Zusatzstoffe?").
3. Das Skript ausfuehren und die Antwort im Terminal pruefen.
4. Die Antwortlaenge ueber den Parameter (z. B. `max_tokens`) einmal verkuerzen und einmal verlaengern, jeweils erneut ausfuehren.
5. Ein eigenes kleines Projektziel fuer die naechsten beiden Uebungen festlegen (z. B. FAQ-Bot fuer eine Baeckerei: Oeffnungszeiten, Standardprodukte, Lieferzeiten) und in einem Satz notieren.

## Fertig, wenn

- `ki-anfrage.ps1` erfolgreich eine Antwort von der API anzeigt,
- der Effekt der Antwortlaenge an mindestens zwei verschiedenen Werten beobachtet wurde,
- ein eigenes Projektziel in einem Satz schriftlich festgehalten ist.

## Hilfe

1. Der Zugangsschluessel steht in der bereitgestellten Testkonfiguration - nicht selbst erfinden oder weitergeben.
2. `Invoke-RestMethod` gibt ein Objekt zurueck - die eigentliche Antwort steht meist unter `.choices[0].message.content`.
3. Bei einer Fehlermeldung zuerst pruefen, ob der Zugangsschluessel und der Endpoint korrekt eingetragen sind.

## Zusatzaufgabe

Denselben Prompt zweimal ausfuehren und pruefen, ob die beiden Antworten identisch oder unterschiedlich formuliert sind.
