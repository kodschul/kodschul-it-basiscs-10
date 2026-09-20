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
