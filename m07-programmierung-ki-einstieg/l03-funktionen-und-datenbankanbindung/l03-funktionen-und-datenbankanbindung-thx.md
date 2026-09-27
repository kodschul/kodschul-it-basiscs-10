# Modul 7: Programmieren mit PowerShell und Python

## Lab 7.3 - Funktionen und Datenbankanbindung

---

**Ziel:** Wiederkehrenden Code in einer Funktion kapseln und aus PowerShell und Python auf eine
SQLite-Datenbank mit Bäckerei-Bestellungen zugreifen.

- Eine Funktion fasst mehrere Schritte unter einem Namen zusammen und macht sie wiederverwendbar.
- SQLite speichert eine ganze Datenbank in einer einzelnen Datei (`baeckerei.db`) - anders als die
  Server-Datenbanken MySQL/MongoDB aus Modul 4 braucht sie keinen laufenden Dienst.
- Eine Verbindung (`connection`) oeffnet den Zugriff auf die Datei, ein `cursor` fuehrt einzelne
  SQL-Befehle darauf aus.

<details><summary>Was ist eine Funktion und wozu kapselt man Code?</summary>

Eine Funktion ist ein benannter, wiederverwendbarer Codeblock. Statt denselben SQL-Zugriff mehrfach
zu tippen, wird er einmal in einer Funktion definiert und danach nur noch aufgerufen.

</details>

<details><summary>Wie unterscheidet sich SQLite von MySQL/MongoDB aus Modul 4?</summary>

MySQL und MongoDB laufen als eigener Dienst (Server), zu dem sich ein Client verbindet - SQLite
ist nur eine Datei auf der Festplatte, die direkt gelesen/geschrieben wird. Das macht SQLite gut
geeignet fuer ein einzelnes Konsolen-Skript ohne eigenen Serverbetrieb.

</details>

<details><summary>Welche Rolle spielen `connection` und `cursor`?</summary>

Die `connection` oeffnet den Zugriff auf die Datenbankdatei, der `cursor` fuehrt darauf einzelne
SQL-Anweisungen aus und liefert das Ergebnis zurueck.

</details>

## Funktionen im Vergleich

| Aufgabe             | PowerShell                          | Python                             |
| ------------------- | ----------------------------------- | ---------------------------------- |
| Funktion definieren | `function Get-Bestellungen { ... }` | `def bestellungen_anzeigen(): ...` |
| Funktion aufrufen   | `Get-Bestellungen`                  | `bestellungen_anzeigen()`          |
| Rueckgabewert       | `return $ergebnis`                  | `return ergebnis`                  |

Die Datei `baeckerei.db` (Tabelle `bestellungen`: `id`, `produkt`, `menge`, `status`) steht als
Startdatei bereit (siehe `../../project/starter/baeckerei-todo/`).

```python
import sqlite3

def bestellungen_anzeigen():
    verbindung = sqlite3.connect("baeckerei.db")
    cursor = verbindung.cursor()
    cursor.execute("SELECT id, produkt, menge, status FROM bestellungen")
    for zeile in cursor.fetchall():
        print(zeile)
    verbindung.close()

bestellungen_anzeigen()
```

```powershell
function Get-Bestellungen {
    sqlite3 baeckerei.db "SELECT id, produkt, menge, status FROM bestellungen;"
}
Get-Bestellungen
```

> **Merksatz:** PowerShell greift hier ueber das Kommandozeilenwerkzeug `sqlite3` auf die
> Datenbankdatei zu, Python nutzt sein eingebautes `sqlite3`-Modul direkt.

## Fazit

- Eine Funktion macht einen Datenbankzugriff wiederverwendbar, statt ihn jedes Mal neu zu tippen.
- SQLite braucht keinen laufenden Server - eine Datei reicht, passend fuer ein Konsolen-Skript.
- `connection`/`cursor` oeffnen die Datei und fuehren SQL-Befehle darauf aus.

Weiter geht es mit der Übung `l03-funktionen-und-datenbankanbindung-exc.md` (Lösung:
`l03-funktionen-und-datenbankanbindung-sol.md`).
