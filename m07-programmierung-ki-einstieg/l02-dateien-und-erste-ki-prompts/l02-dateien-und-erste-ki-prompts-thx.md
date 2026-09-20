# Modul 7: Einstieg in Programmierung & KI

## Lab 7.2 - Dateien mit PowerShell & erste KI-Prompts

---

**Ziel:** Mit PowerShell eine Datei erzeugen und wieder auslesen, und die
Grundidee von KI-Prompts an eigenen Beispielen ausprobieren.

- `New-Item` legt eine Datei an, `Get-Content` liest ihren Inhalt wieder aus.
- Ein Skript kann eine Nutzereingabe in eine Datei schreiben, statt sie nur anzuzeigen.
- Ein Prompt ist eine Anweisung in normaler Sprache an ein KI-Modell.
- Dieselbe Aufgabe liefert je nach Formulierung des Prompts unterschiedlich gute Ergebnisse.

<details><summary>Was macht `New-Item`?</summary>

`New-Item -Path datei.txt -ItemType File` legt eine neue, leere Datei mit diesem Namen an. Existiert die Datei schon, meldet PowerShell einen Fehler, wenn sie nicht ueberschrieben werden soll.

</details>

<details><summary>Was macht `Get-Content`?</summary>

`Get-Content datei.txt` liest den Inhalt einer Textdatei und zeigt ihn im Terminal an - das Gegenstueck zum Schreiben mit `Out-File` oder `Add-Content`.

</details>

<details><summary>Was ist ein Prompt?</summary>

Ein Prompt ist die Eingabe in normaler Sprache, mit der ein KI-Modell zu einer Aufgabe aufgefordert wird, zum Beispiel "Schreibe eine kurze Werbeanzeige fuer eine Baeckerei". Das Modell erzeugt daraus eine Antwort, die von der genauen Formulierung des Prompts abhaengt.

</details>

## Dateien mit PowerShell

| Befehl                                    | Wirkung                                |
| ----------------------------------------- | -------------------------------------- |
| `New-Item -Path datei.txt -ItemType File` | legt eine neue leere Datei an          |
| `Add-Content datei.txt "Text"`            | haengt eine Zeile Text an die Datei an |
| `Get-Content datei.txt`                   | zeigt den Inhalt der Datei an          |

```powershell
$eintrag = Read-Host "Was soll gespeichert werden?"
Add-Content notizen.txt $eintrag
Get-Content notizen.txt
```

## Guter vs. schwacher Prompt

| Prompt                                                                                                                | Ergebnis-Qualitaet                         |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| "Schreib was ueber Brot."                                                                                             | vage, Ergebnis kann in jede Richtung gehen |
| "Schreibe einen kurzen Werbetext (max. 3 Saetze) fuer frisches Roggenbrot einer kleinen Baeckerei, freundlicher Ton." | konkret, Ergebnis passt zur Aufgabe        |

![KI Chat Symbolbild](https://loremflickr.com/640/360/chatbot,artificial)

## Fazit

- `New-Item`/`Add-Content` schreiben Daten in eine Datei, `Get-Content` liest sie wieder aus.
- Ein Prompt ist umso brauchbarer, je konkreter Aufgabe, Ton und gewuenschte Laenge benannt sind.
- Ein KI-Modell antwortet auf jeden Prompt - eine vage Frage liefert meist eine vage Antwort.

Weiter geht es mit der Übung `l02-dateien-und-erste-ki-prompts-exc.md` (Lösung: `l02-dateien-und-erste-ki-prompts-sol.md`).
