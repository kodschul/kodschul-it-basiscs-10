$endpoint = $env:KI_ENDPOINT
$apiKey = $env:KI_API_KEY

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

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
