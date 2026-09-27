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
