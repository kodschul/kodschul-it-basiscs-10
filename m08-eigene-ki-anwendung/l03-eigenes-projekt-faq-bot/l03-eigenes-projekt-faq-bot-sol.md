# Lab 8.3 - Loesung: FAQ-Bot fertigstellen und kurz praesentieren

## Schritt 1-2: Eigener Kontext im Skript

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

## Schritt 3: Beispiel-Testfragen

- "Wann habt ihr samstags geoeffnet?" -> "Samstags von 6 bis 13 Uhr."
- "Wie lange dauert eine Grossbestellung?" -> "Zwei Werktage."
- "Habt ihr Vollkornbroetchen?" -> "Ja, Vollkornbroetchen gehoeren zu unseren Standardprodukten."

## Schritt 4: Themenfremde Frage

Bei "Wie wird das Wetter morgen?" verweist der Bot dank des Kontext-Hinweises hoeflich darauf, dass er nur Fragen zur Baeckerei beantworten kann, statt eine erfundene Wetterprognose zu liefern.

## Schritt 5-6: Praesentation (Beispiel)

"Mein FAQ-Bot beantwortet Fragen zu Oeffnungszeiten, Standardprodukten und Lieferzeiten der Baeckerei Sonnenkorn. Live-Beispiel: 'Wann habt ihr samstags geoeffnet?' Verbesserungspotenzial: weitere Produkte und Preise ergaenzen."

## Zusatzaufgabe

Ein vierter Fakt (z. B. "Jeden Freitag 10% Rabatt auf Sonntagsbrote") wird korrekt beantwortet, sobald er im Kontext-Text ergaenzt ist - eine passende Testfrage dazu bestaetigt das.
