# Modul 7: Programmieren mit PowerShell und Python

## Lab 7.4 - CRUD-Konsolenanwendung für Bestellungen

---

**Ziel:** Ein menuegesteuertes Konsolen-Skript bauen, das Bestellungen in `baeckerei.db` anzeigen,
anlegen, aendern und loeschen kann (CRUD), primaer in PowerShell.

- CRUD steht fuer Create, Read, Update, Delete - die vier Grundoperationen jeder Datenverwaltung.
- Ein Text-Menue mit Zahlenauswahl macht die vier Operationen ohne SQL-Kenntnisse der Nutzenden
  bedienbar.
- Eine Schleife haelt das Menue am Laufen, bis eine Person die Anwendung ausdruecklich beendet.

<details><summary>Was bedeutet CRUD?</summary>

Create (anlegen), Read (anzeigen), Update (aendern), Delete (loeschen) - die vier Operationen, die
so gut wie jede Datenverwaltung braucht, unabhaengig von der verwendeten Datenbank.

</details>

<details><summary>Warum haelt eine Schleife das Menue am Laufen?</summary>

Ohne Schleife wuerde das Skript nach einer einzigen Aktion beenden - eine `while`-Schleife um das
Menue laesst beliebig viele Aktionen hintereinander ausfuehren, bis explizit "Beenden" gewaehlt wird.

</details>

<details><summary>Was passiert bei ungueltiger Eingabe im Menue?</summary>

Ohne Pruefung wuerde das Skript abstuerzen oder eine unklare Fehlermeldung zeigen - eine einfache
Pruefung (z. B. `switch`/`if`-Kette mit einem `else`-Zweig "ungueltige Auswahl") faengt das ab und
zeigt das Menue erneut.

</details>

## Menue-Aufbau

| Auswahl | Operation | SQL im Hintergrund                        |
| ------- | --------- | ----------------------------------------- |
| 1       | Anzeigen  | `SELECT * FROM bestellungen`              |
| 2       | Anlegen   | `INSERT INTO bestellungen ...`            |
| 3       | Aendern   | `UPDATE bestellungen SET ...`             |
| 4       | Loeschen  | `DELETE FROM bestellungen WHERE id = ...` |
| 5       | Beenden   | -                                         |

```powershell
function Show-Menu {
    Write-Host "1) Anzeigen  2) Anlegen  3) Aendern  4) Loeschen  5) Beenden"
}

while ($true) {
    Show-Menu
    $auswahl = Read-Host "Auswahl"
    switch ($auswahl) {
        "1" { sqlite3 baeckerei.db "SELECT * FROM bestellungen;" }
        "5" { break }
        default { Write-Host "Ungueltige Auswahl." }
    }
    if ($auswahl -eq "5") { break }
}
```

> **Merksatz:** Anlegen/Aendern/Loeschen veraendern echte Daten - vor dem Testen lohnt sich ein
> Blick mit "Anzeigen", ob das Ergebnis wirklich stimmt.

## Fazit

- CRUD (Create/Read/Update/Delete) deckt praktisch jede Datenverwaltungsaufgabe ab.
- Ein Menue mit Zahlenauswahl macht SQL-Operationen ohne direkte SQL-Eingabe bedienbar.
- Eine Schleife mit klarem Beenden-Punkt haelt die Anwendung interaktiv am Laufen.

Weiter geht es mit der Übung `l04-crud-konsolen-anwendung-exc.md` (Lösung:
`l04-crud-konsolen-anwendung-sol.md`).
