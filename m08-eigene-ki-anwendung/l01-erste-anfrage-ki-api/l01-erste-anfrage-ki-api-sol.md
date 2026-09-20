# Lab 8.1 - Loesung: Eigenes Skript mit KI-API & Projektziel waehlen

## Schritt 1-3: Grundskript mit eigenem Prompt

```powershell
$endpoint = $env:KI_ENDPOINT
$apiKey = $env:KI_API_KEY

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$body = @{
    model = "gpt-4o-mini"
    messages = @(
        @{ role = "user"; content = "Was sind drei Vorteile von Frischbrot ohne Zusatzstoffe?" }
    )
    max_tokens = 150
} | ConvertTo-Json -Depth 5

$antwort = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Body $body
Write-Host $antwort.choices[0].message.content
```

## Schritt 4: Antwortlaenge veraendern

`max_tokens = 40` liefert eine kurze, oft unvollstaendige Antwort; `max_tokens = 300` liefert eine ausfuehrlichere Antwort mit mehr Details.

## Schritt 5: Eigenes Projektziel (Beispiel)

"Mein FAQ-Bot soll Fragen zu Oeffnungszeiten, drei Standardprodukten und der Lieferzeit einer Baeckerei beantworten."

## Zusatzaufgabe

Derselbe Prompt liefert bei zwei Durchlaeufen meist eine aehnliche, aber nicht wortidentische Antwort - das Modell erzeugt keine exakt reproduzierbare Ausgabe.
