# Modul 1: Bausteine eines Computersystems & Betriebssysteme

## Lab 1.5 – Grafische Oberfläche: Dateien & Ordner

---

**Ziel:** Dateien, Ordner, Pfade und Dateiendungen sicher einordnen und eine
nachvollziehbare Ablage im Dateimanager (der grafischen Oberfläche) erstellen.

Die grafische Oberfläche (GUI) zeigt Dateien und Ordner als Symbole und
Fenster, die sich mit der Maus verschieben, öffnen und sortieren lassen.

**Leitfragen:**

<details>
<summary>Was ist eine grafische Oberfläche (GUI)?</summary>

Die GUI zeigt Dateien, Ordner und Programme als Symbole und Fenster, die sich
per Mausklick bedienen lassen – im Gegensatz zur Konsole, die getippte
Befehle nutzt (siehe Lab 1.6).

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

## Die grafische Oberfläche als Werkzeug

| Begriff                    | Definition                                               | Beispiel                       |
| -------------------------- | -------------------------------------------------------- | ------------------------------ |
| Grafische Oberfläche (GUI) | Bedienung über Fenster, Symbole und Mausklicks           | Windows-Explorer, macOS Finder |
| Dateimanager               | Anwendung zum Anzeigen/Verschieben von Dateien & Ordnern | Explorer, Finder, Nautilus     |
| Anwendung                  | Programm für eine konkrete Aufgabe                       | Browser, Textverarbeitung      |

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

- Die grafische Oberfläche zeigt Dateien und Ordner als Symbole und Fenster.
- Ein Pfad beschreibt den Ort einer Datei im Ordnerbaum.
- Dateiendungen helfen bei der Wahl eines passenden Programms.
