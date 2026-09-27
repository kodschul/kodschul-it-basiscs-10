# Lab 7.4 - Loesung: Vollständige CRUD-Konsolenanwendung

## Vollstaendiges PowerShell-Menue

```powershell
function Show-Menu {
    Write-Host "1) Anzeigen  2) Anlegen  3) Aendern  4) Loeschen  5) Beenden"
}

while ($true) {
    Show-Menu
    $auswahl = Read-Host "Auswahl"

    switch ($auswahl) {
        "1" {
            sqlite3 baeckerei.db "SELECT id, produkt, menge, status FROM bestellungen;"
        }
        "2" {
            $produkt = Read-Host "Produkt"
            $menge = Read-Host "Menge"
            sqlite3 baeckerei.db "INSERT INTO bestellungen (produkt, menge, status) VALUES ('$produkt', $menge, 'offen');"
            Write-Host "Bestellung angelegt."
        }
        "3" {
            $id = Read-Host "ID der Bestellung"
            sqlite3 baeckerei.db "UPDATE bestellungen SET status = 'erledigt' WHERE id = $id;"
            Write-Host "Status aktualisiert."
        }
        "4" {
            $id = Read-Host "ID der Bestellung"
            sqlite3 baeckerei.db "DELETE FROM bestellungen WHERE id = $id;"
            Write-Host "Bestellung geloescht."
        }
        "5" { Write-Host "Auf Wiedersehen."; break }
        default { Write-Host "Ungueltige Auswahl." }
    }

    if ($auswahl -eq "5") { break }
}
```

## Testdurchlauf (Schritt 7)

```
Auswahl: 2 -> Produkt "Zimtschnecke", Menge 8 -> "Bestellung angelegt."
Auswahl: 1 -> Zimtschnecke erscheint mit Status "offen"
Auswahl: 3 -> ID der neuen Zeile -> Status wird "erledigt"
Auswahl: 4 -> ID der neuen Zeile -> "Bestellung geloescht."
Auswahl: 1 -> Zimtschnecke erscheint nicht mehr
```

## Zusatzaufgabe: Python-Variante

```python
import sqlite3

def verbindung_oeffnen():
    return sqlite3.connect("baeckerei.db")

def anzeigen():
    conn = verbindung_oeffnen()
    for zeile in conn.execute("SELECT id, produkt, menge, status FROM bestellungen"):
        print(zeile)
    conn.close()

def anlegen(produkt, menge):
    conn = verbindung_oeffnen()
    conn.execute("INSERT INTO bestellungen (produkt, menge, status) VALUES (?, ?, 'offen')", (produkt, menge))
    conn.commit()
    conn.close()

def aendern(bestellung_id):
    conn = verbindung_oeffnen()
    conn.execute("UPDATE bestellungen SET status = 'erledigt' WHERE id = ?", (bestellung_id,))
    conn.commit()
    conn.close()

def loeschen(bestellung_id):
    conn = verbindung_oeffnen()
    conn.execute("DELETE FROM bestellungen WHERE id = ?", (bestellung_id,))
    conn.commit()
    conn.close()

while True:
    print("1) Anzeigen  2) Anlegen  3) Aendern  4) Loeschen  5) Beenden")
    auswahl = input("Auswahl: ")
    if auswahl == "1":
        anzeigen()
    elif auswahl == "2":
        anlegen(input("Produkt: "), int(input("Menge: ")))
    elif auswahl == "3":
        aendern(int(input("ID: ")))
    elif auswahl == "4":
        loeschen(int(input("ID: ")))
    elif auswahl == "5":
        print("Auf Wiedersehen.")
        break
    else:
        print("Ungueltige Auswahl.")
```

Die Python-Variante nutzt `?`-Platzhalter statt Zeichenketten-Zusammenbau - sicherer gegen
fehlerhafte/böswillige Eingaben als das direkte Einsetzen in der PowerShell-Version. Beide
Versionen arbeiten auf derselben Datei `baeckerei.db` und liefern bei "Anzeigen" dasselbe Ergebnis.
