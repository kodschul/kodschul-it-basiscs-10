# Modul 1: Bausteine eines Computersystems & Betriebssysteme

## Lab 1.6 – Grafische Oberfläche vs. Konsole & erste Konsolenbefehle

---

**Ziel:** GUI und Konsole unterscheiden und mit `mkdir`, `cd`, `touch` und
`ls` eine Ordnerstruktur im Übungscomputer erstellen.

In Lab 1.5 habt ihr Dateien und Ordner über die grafische Oberfläche (GUI)
verwaltet. GUI und Konsole sind zwei Wege, dasselbe Betriebssystem zu bedienen.

**Leitfragen:**

<details>
<summary>Was ist der Unterschied zwischen GUI und Konsole?</summary>

Die GUI (grafische Oberfläche) steuert den Computer über Fenster, Symbole
und Mausklicks. Die Konsole (Terminal) steuert ihn über getippte
Textbefehle – langsamer zu lernen, aber oft schneller, präziser und
automatisierbar.

</details>

<details>
<summary>Warum arbeiten IT-Fachleute trotzdem oft mit der Konsole?</summary>

Konsolenbefehle lassen sich wiederholen, in Skripten speichern und auf
Servern nutzen, die oft gar keine grafische Oberfläche haben (z. B. viele
Docker-Container und Cloud-Server).

</details>

<details>
<summary>Was ist ein Container in diesem Zusammenhang?</summary>

Ein Container ist eine leichtgewichtige, isolierte Umgebung, die wie ein
eigener kleiner Computer mit eigenem Dateisystem funktioniert, aber die
Ressourcen des Host-Systems nutzt – hier: ein Alpine-Linux-Container zum
Üben von Konsolenbefehlen.

</details>

---

## GUI vs. Konsole

![Terminal-Fenster mit Tastatur im Vordergrund](https://commons.wikimedia.org/wiki/Special:FilePath/DEC_VT100_terminal_transparent.png?width=640)

| Begriff           | Definition                      | GUI                    | Konsole                               |
| ----------------- | ------------------------------- | ---------------------- | ------------------------------------- |
| Bedienoberfläche  | Weg, einen Computer zu steuern  | Maus, Fenster, Symbole | getippte Befehle                      |
| Wiederholbarkeit  | gleiche Aktion erneut ausführen | Klicks wiederholen     | Befehl erneut eingeben oder speichern |
| typischer Einsatz | übliche Verwendung              | Alltagsprogramme       | Server, Container, Automatisierung    |

- GUI und Konsole steuern dasselbe Betriebssystem.
- Die Konsole ist kein geheimer Zugang, sondern eine textbasierte Bedienoberfläche.

## Übungscomputer

Der Übungscomputer ist ein vorbereiteter Alpine-Container: ein kleines Linux-
System mit eigenem Dateisystem. Die folgenden Befehle laufen in seiner Konsole.

## Die vier Grundbefehle

| Befehl          | Definition                 | Ergebnis                                 | Beispiel          |
| --------------- | -------------------------- | ---------------------------------------- | ----------------- |
| `mkdir <name>`  | make directory             | legt einen Ordner an                     | `mkdir projekte`  |
| `ls`            | list                       | zeigt den Inhalt des aktuellen Ordners   | `ls`              |
| `cd <name>`     | change directory           | wechselt in einen Ordner                 | `cd projekte`     |
| `touch <datei>` | Datei-Zeitstempel berühren | legt eine leere Datei an, wenn sie fehlt | `touch notiz.txt` |

```bash
mkdir projekte
cd projekte
mkdir tag1
cd tag1
touch notiz.txt
ls
```

- `cd` in einen nicht vorhandenen Ordner meldet einen Fehler. `ls` prüft die Schreibweise.
- Ein Container ist hier ein vorbereiteter Übungscomputer mit eigenem Dateisystem.

## Fazit

- GUI und Konsole steuern dasselbe Betriebssystem.
- `mkdir`, `cd`, `touch` und `ls` reichen für eine erste Ordnerstruktur.
- Befehle sind wiederholbar und auf Servern ohne grafische Oberfläche nutzbar.
