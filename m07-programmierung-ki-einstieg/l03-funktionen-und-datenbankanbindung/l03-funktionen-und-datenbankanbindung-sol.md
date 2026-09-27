# Lab 7.3 - Loesung: Funktionen für den Datenbankzugriff

## Schritt 1: Manuelle Pruefung

```bash
sqlite3 baeckerei.db "SELECT * FROM bestellungen;"
```

## Schritt 2-4: Funktionen

```python
import sqlite3

def bestellungen_anzeigen():
    verbindung = sqlite3.connect("baeckerei.db")
    cursor = verbindung.cursor()
    cursor.execute("SELECT id, produkt, menge, status FROM bestellungen")
    zeilen = cursor.fetchall()
    for zeile in zeilen:
        print(zeile)
    verbindung.close()
    return zeilen

def offene_bestellungen():
    verbindung = sqlite3.connect("baeckerei.db")
    cursor = verbindung.cursor()
    cursor.execute("SELECT id, produkt, menge, status FROM bestellungen WHERE status = 'offen'")
    zeilen = cursor.fetchall()
    for zeile in zeilen:
        print(zeile)
    verbindung.close()
    return zeilen

bestellungen_anzeigen()
offene = offene_bestellungen()
print(f"Anzahl offener Bestellungen: {len(offene)}")
```

```powershell
function Get-Bestellungen {
    sqlite3 baeckerei.db "SELECT id, produkt, menge, status FROM bestellungen;"
}

function Get-OffeneBestellungen {
    sqlite3 baeckerei.db "SELECT id, produkt, menge, status FROM bestellungen WHERE status = 'offen';"
}

Get-Bestellungen
$offene = Get-OffeneBestellungen
Write-Host "Anzahl offener Bestellungen: $($offene.Count)"
```

## Zusatzaufgabe

```python
def bestellungen_ab_menge(mindestmenge):
    verbindung = sqlite3.connect("baeckerei.db")
    cursor = verbindung.cursor()
    cursor.execute("SELECT id, produkt, menge, status FROM bestellungen WHERE menge >= ?", (mindestmenge,))
    for zeile in cursor.fetchall():
        print(zeile)
    verbindung.close()

bestellungen_ab_menge(20)
```

```powershell
function Get-BestellungenAbMenge {
    param([int]$MindestMenge)
    sqlite3 baeckerei.db "SELECT id, produkt, menge, status FROM bestellungen WHERE menge >= $MindestMenge;"
}
Get-BestellungenAbMenge -MindestMenge 20
```

Der Python-Parameter wird ueber ein Platzhalter-`?` sicher eingesetzt (verhindert SQL-Injection bei
spaeterer Nutzereingabe) - in der einfachen PowerShell-Variante wird der Wert direkt eingesetzt, was
fuer diese Kursuebung ausreicht, aber bei echten Nutzereingaben ebenfalls ueber Parameter abgesichert
werden sollte.
