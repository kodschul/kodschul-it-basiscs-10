# Checkpoint: Modul 6 - Rechte & Dateischutz

Referenzstand nach Lab 6.1 (chmod/chown) und Lab 6.2 (ZIP-Passwortschutz).

## Rechte setzen (Lab 6.1)

```bash
cd baeckerei/kunden
chmod 600 kundendaten.txt   # nur Owner darf lesen/schreiben
ls -l kundendaten.txt
# -rw------- 1 trainer trainer ... kundendaten.txt

cd ../oeffentlich
chmod 777 hinweis.txt       # bewusst offenes Gegenbeispiel
ls -l hinweis.txt
# -rwxrwxrwx 1 trainer trainer ... hinweis.txt
```

`kundendaten.txt` (600) ist für echte Kundendaten geeignet; `hinweis.txt` (777) ist absichtlich das ungeeignete Gegenbeispiel aus Lab 6.1 Zusatzaufgabe.

## Passwortschutz (Lab 6.2)

```bash
zip -e kundendaten.zip kundendaten.txt
```

Erzeugt ein passwortgeschütztes Archiv - siehe `l02-passwoerter-und-dateischutz-sol.md` für die vollständige Übung.

## Sicherheitshinweis

`kundendaten.txt` enthält nur einen fiktiven Platzhaltersatz, keine echten Kundendaten.
