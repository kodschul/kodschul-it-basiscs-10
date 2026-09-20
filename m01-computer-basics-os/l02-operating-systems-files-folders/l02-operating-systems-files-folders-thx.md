# Modul 1: Bausteine eines Computersystems & Betriebssysteme

## Lab 1.2 – Betriebssystem, Dateien & Ordner

---

**Ziel:** Dateien, Ordner, Pfade und Dateiendungen sicher einordnen und eine
nachvollziehbare Ablage im Dateimanager erstellen.

Ein Betriebssystem organisiert Hardware, Programme, Dateien und Rechte.
Ordner schaffen eine nachvollziehbare Ablage für diese Dateien.

**Leitfragen:**

<details>
<summary>Was macht ein Betriebssystem eigentlich?</summary>

Es vermittelt zwischen Hardware und Programmen: Programme fragen beim
Betriebssystem an, wenn sie z. B. eine Datei speichern oder etwas anzeigen
wollen, statt direkt mit der Hardware zu sprechen.

</details>

<details>
<summary>Was bedeutet "Baumstruktur" bei Dateien und Ordnern?</summary>

Ordner können weitere Ordner und Dateien enthalten, wodurch eine
verschachtelte, hierarchische Struktur entsteht – wie ein Baum mit Ästen
(Ordnern) und Blättern (Dateien), beginnend bei einer Wurzel.

</details>

<details>
<summary>Woran erkennt man, welches Programm eine Datei öffnen soll?</summary>

An der Dateiendung (z. B. `.txt`, `.jpg`, `.exe`) – das Betriebssystem nutzt
sie, um die Datei automatisch mit einem passenden Programm zu verknüpfen.

</details>

---

## Was ist ein Betriebssystem?

| Begriff        | Definition                                      | Beispiel                                  |
| -------------- | ----------------------------------------------- | ----------------------------------------- |
| Betriebssystem | Grundsoftware zwischen Hardware und Anwendungen | Windows, macOS, Linux                     |
| Anwendung      | Programm für eine konkrete Aufgabe              | Browser, Textverarbeitung, Bildbetrachter |
| Hardware       | anfassbare Teile eines Computers                | Tastatur, SSD, Bildschirm                 |
| Nutzerrecht    | erlaubte Aktion einer Person                    | Datei lesen oder ändern                   |

| Aufgabe des Betriebssystems     | Beispiel                                  |
| ------------------------------- | ----------------------------------------- |
| Programme starten und verwalten | mehrere Fenster gleichzeitig offen halten |
| Dateien organisieren            | Ordnerstruktur und Dateisystem            |
| Hardware ansprechen             | Tastatur, Maus, Bildschirm, Netzwerkkarte |
| Nutzerrechte verwalten          | festlegen, wer lesen oder ändern darf     |

---

## Dateien und Ordner als Baumstruktur

![Aktenordner als Sinnbild für verschachtelte Ordnerstrukturen](https://commons.wikimedia.org/wiki/Special:FilePath/Manila_Folders.jpg?width=640)

| Begriff     | Definition                                              |
| ----------- | ------------------------------------------------------- |
| Datei       | gespeicherter Inhalt mit einem Namen                    |
| Ordner      | Sammlung für Dateien und weitere Ordner                 |
| Pfad        | Weg von der Wurzel bis zu einer Datei oder einem Ordner |
| Wurzel      | oberster Startpunkt einer Ordnerstruktur                |
| Dateiendung | Teil eines Dateinamens nach dem letzten Punkt           |

- Windows trennt Ordner im Pfad mit `\`.
- Linux und macOS trennen Ordner im Pfad mit `/`.

```text
/ (Wurzel)
└── home
    └── anna
        └── dokumente
            └── rechnung.pdf
```

## Häufige Dateiendungen

| Endung  | Typ                           | Übliches Programm |
| ------- | ----------------------------- | ----------------- |
| `.txt`  | reiner Text                   | Texteditor        |
| `.jpg`  | Bild                          | Bildbetrachter    |
| `.pdf`  | formatiertes Dokument         | PDF-Reader        |
| `.docx` | bearbeitbares Textdokument    | Textverarbeitung  |
| `.exe`  | ausführbares Windows-Programm | startet direkt    |

- Eine Dateiendung ist ein Hinweis, kein Schutz. Umbenennen ändert nicht den Inhalt.
- Pfade verwenden unter Windows `\`, unter Linux und macOS `/`.

## Fazit

- Das Betriebssystem vermittelt zwischen Hardware, Programmen und Dateien.
- Ein Pfad beschreibt den Ort einer Datei im Ordnerbaum.
- Dateiendungen helfen bei der Wahl eines passenden Programms.
