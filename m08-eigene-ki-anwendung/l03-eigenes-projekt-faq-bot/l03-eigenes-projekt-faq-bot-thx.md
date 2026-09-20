# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.3 - Eigenes Projekt: FAQ-Bot fertigstellen

---

**Ziel:** Ein eigenes kleines KI-Projekt (z. B. FAQ-Bot für eine Bäckerei) auf
Basis der eigenen API-Anfrage aus Lab 8.1 fertigstellen und präsentationsreif machen.

- Ein FAQ-Bot beantwortet wiederkehrende Fragen mit einem festen Kontext (z. B. Öffnungszeiten, Standardprodukte, Lieferzeiten).
- Der Kontext wird dem Modell im Prompt mitgegeben, damit die Antworten zum eigenen Projekt passen statt allgemein zu bleiben.
- Ein kurzer Testlauf mit mehreren Beispielfragen zeigt, ob der Bot zuverlässig im eigenen Themenbereich bleibt.

<details><summary>Wie bringt man dem Bot den eigenen Kontext bei?</summary>

Der Kontext (z. B. Öffnungszeiten, Produktliste) wird als Systemtext oder als Teil des Prompts mitgeschickt, bevor die eigentliche Nutzerfrage kommt - das Modell bezieht sich dann auf diese Angaben statt zu raten.

</details>

<details><summary>Woran erkennt man, dass ein FAQ-Bot fertig genug ist?</summary>

Er beantwortet mehrere unterschiedliche Testfragen aus dem eigenen Themenbereich korrekt und bleibt bei einer themenfremden Frage erkennbar zurückhaltend, statt frei zu erfinden.

</details>

<details><summary>Was gehört zu einer kurzen Projektpräsentation?</summary>

Das eigene Projektziel in einem Satz, eine kurze Live-Vorführung mit 1-2 Beispielfragen, und eine Einschätzung, was noch verbessert werden könnte.

</details>

## Aufbau eines einfachen FAQ-Bots

```powershell
$kontext = @"
Du bist der FAQ-Bot der Baeckerei Sonnenkorn.
Oeffnungszeiten: Mo-Fr 6-18 Uhr, Sa 6-13 Uhr, So geschlossen.
Standardprodukte: Roggenbrot, Croissant, Vollkornbroetchen.
Lieferzeit fuer Grossbestellungen: 2 Werktage.
Beantworte nur Fragen zu diesen Themen. Bei anderen Fragen: hoeflich auf das eigentliche Thema verweisen.
"@

$frage = Read-Host "Deine Frage an den FAQ-Bot"

$body = @{
    model = "gpt-4o-mini"
    messages = @(
        @{ role = "system"; content = $kontext }
        @{ role = "user"; content = $frage }
    )
} | ConvertTo-Json -Depth 5

$antwort = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Body $body
Write-Host $antwort.choices[0].message.content
```

![Chatbot Symbolbild](https://loremflickr.com/640/360/chatbot,assistant)

## Fazit

- Ein Systemkontext gibt dem Modell die eigenen Fakten mit, statt sich auf Allgemeinwissen zu verlassen.
- Mehrere Testfragen zeigen, ob der Bot zuverlässig im eigenen Themenbereich antwortet.
- Eine kurze Präsentation braucht Projektziel, Live-Beispiel und eine ehrliche Einschätzung offener Punkte.

Weiter geht es mit der Übung `l03-eigenes-projekt-faq-bot-exc.md` (Lösung: `l03-eigenes-projekt-faq-bot-sol.md`).
