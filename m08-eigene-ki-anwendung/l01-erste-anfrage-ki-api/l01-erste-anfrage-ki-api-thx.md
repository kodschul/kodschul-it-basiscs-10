# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.1 - Erste Anfrage an eine KI-API

---

**Ziel:** Die Bestandteile eines KI-Chatbots (Modell, API, Ausgabe) einordnen
und selbst ein PowerShell-Skript schreiben, das eine Anfrage an eine KI-API sendet.

- Ein Chatbot besteht aus einem Modell (erzeugt die Antwort), einer API (Schnittstelle dorthin) und einer Ausgabe (was am Ende angezeigt wird).
- Eine API-Anfrage braucht einen Zugangsschlüssel, einen Prompt und meist ein paar Parameter (z. B. gewünschte Antwortlänge).
- Ein eigenes Projektziel (z. B. FAQ-Bot für eine Bäckerei) gibt der weiteren Arbeit eine klare Richtung.

<details><summary>Was ist eine API in diesem Zusammenhang?</summary>

Eine API (Programmierschnittstelle) ist der Weg, auf dem ein eigenes Skript eine Anfrage an ein KI-Modell schickt und dessen Antwort zurückbekommt - ohne dass das Modell selbst auf dem eigenen Rechner läuft.

</details>

<details><summary>Was braucht eine minimale API-Anfrage?</summary>

Mindestens: eine Adresse (Endpoint), einen Zugangsschlüssel zur Authentifizierung, den eigentlichen Prompt als Text und optionale Parameter wie die maximale Antwortlänge.

</details>

<details><summary>Warum lohnt sich ein eigenes Projektziel vor dem Programmieren?</summary>

Ein konkretes Ziel (z. B. "FAQ-Bot beantwortet Fragen zu Öffnungszeiten und Produkten einer Bäckerei") macht greifbar, welche Prompts und welche Ausgabe gebraucht werden - ein Skript "irgendwas mit KI" bleibt sonst beliebig.

</details>

## Bestandteile eines Chatbots

| Baustein | Aufgabe                                                                      |
| -------- | ---------------------------------------------------------------------------- |
| Modell   | erzeugt aus dem Prompt eine Antwort                                          |
| API      | Schnittstelle, über die die Anfrage geschickt und die Antwort empfangen wird |
| Ausgabe  | zeigt die Antwort im eigenen Skript/Programm an                              |

```powershell
$antwort = Invoke-RestMethod -Uri $endpoint -Method Post -Headers $headers -Body $body
Write-Host $antwort.choices[0].message.content
```

![API und Code Symbolbild](https://loremflickr.com/640/360/api,code)

## Fazit

- Modell, API und Ausgabe sind die drei Bausteine eines Chatbots.
- Eine API-Anfrage braucht Zugangsschlüssel, Prompt und optionale Parameter.
- Ein klares Projektziel lenkt die folgenden Übungen (Datenanalyse, eigenes Projekt).

Weiter geht es mit der Übung `l01-erste-anfrage-ki-api-exc.md` (Lösung: `l01-erste-anfrage-ki-api-sol.md`).
