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
    conn.execute(
        "INSERT INTO bestellungen (produkt, menge, status) VALUES (?, ?, 'offen')", (produkt, menge))
    conn.commit()
    conn.close()


def aendern(bestellung_id):
    conn = verbindung_oeffnen()
    conn.execute(
        "UPDATE bestellungen SET status = 'erledigt' WHERE id = ?", (bestellung_id,))
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
