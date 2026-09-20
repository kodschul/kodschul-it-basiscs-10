# Lab 7.2 - Loesung: Notizdatei per Skript & eigene Prompts testen

## Schritt 1-4: Notizdatei per Skript

```powershell
New-Item -Path notizen.txt -ItemType File

$notiz = Read-Host "Was moechtest du speichern?"
Add-Content notizen.txt $notiz

# Skript ein zweites Mal mit anderer Eingabe ausfuehren

Get-Content notizen.txt
# zeigt beide gespeicherten Notizen als eigene Zeilen
```

## Schritt 5-7: Prompts vergleichen

Vager Prompt: "Schreib was ueber Brot." - Ergebnis oft allgemein, Thema und Laenge unklar.

Konkreter Prompt: "Schreibe einen kurzen Werbetext (max. 3 Saetze) fuer frisches Roggenbrot einer kleinen Baeckerei, freundlicher Ton." - Ergebnis passt zu Thema, Laenge und Ton.

Zwei weitere Prompts zu einem selbst gewaehlten Thema liefern je nach Konkretheit unterschiedlich brauchbare Ergebnisse - je genauer die Vorgabe, desto passender die Antwort.

## Zusatzaufgabe

Derselbe konkrete Prompt liefert meist ein aehnliches, aber nicht wortgleiches Ergebnis bei zwei Durchlaeufen - das KI-Modell erzeugt keine exakt reproduzierbare Antwort.
