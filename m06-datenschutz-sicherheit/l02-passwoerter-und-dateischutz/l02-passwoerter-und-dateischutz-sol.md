# Lab 6.2 - Loesung: Passwortschutz und sichere Passwoerter

## Schritt 1-2: ZIP mit Passwort erstellen

```bash
cd baeckerei/kunden
zip -e kundendaten.zip kundendaten.txt
# Passwort wird beim Erstellen abgefragt und bestaetigt
unzip kundendaten.zip
# Nur mit korrektem Passwort wird die Datei entpackt
```

## Schritt 3-4: Passwoerter bewerten

| Passwort                 | Laenge | Zeichenvielfalt                 | Erratbar?                                                            |
| ------------------------ | ------ | ------------------------------- | -------------------------------------------------------------------- |
| `passwort123`            | kurz   | nur Kleinbuchstaben und Zahlen  | ja, Woerterbuchwort plus Zahl                                        |
| `B4ck3rei!2025#Mont`     | lang   | Gross/Klein/Zahl/Sonderzeichen  | eher nein, aber Firmenname plus Jahr ist ein erkennbares Muster      |
| `12345678`               | kurz   | nur Zahlen in Reihenfolge       | ja, eines der haeufigsten Passwoerter ueberhaupt                     |
| `MeinHundHeisstBruno99!` | lang   | Woerter, Zahl und Sonderzeichen | ja, falls der Hundename oeffentlich bekannt ist (z. B. Social Media) |

## Schritt 5: Eigenes Muster erklaeren

Ein sicheres Muster kombiniert mehrere zufaellige Woerter oder eine lange Zeichenkette, die nicht aus oeffentlich bekannten persoenlichen Fakten (Name, Geburtsdatum, Haustier) besteht.

## Zusatzaufgabe

Ein Passwort-Manager erzeugt und speichert fuer jeden Dienst ein eigenes, zufaelliges Passwort. Faellt ein Dienst einem Datenleck zum Opfer, bleiben alle anderen Konten geschuetzt, weil kein Passwort wiederverwendet wurde.
