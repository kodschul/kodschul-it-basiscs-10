# Lab 6.1 - Loesung: Rechte setzen und vergleichen

## Schritt 1-2: Datei anlegen und Rechte pruefen

```bash
cd baeckerei/kunden
touch kundendaten.txt
ls -l kundendaten.txt
# -rw-r--r-- 1 trainer trainer 0 kundendaten.txt
```

## Schritt 3: Rechte einschraenken

```bash
chmod 600 kundendaten.txt
ls -l kundendaten.txt
# -rw------- 1 trainer trainer 0 kundendaten.txt
```

## Schritt 4: Offenen Ordner anlegen

```bash
mkdir oeffentlich
touch oeffentlich/hinweis.txt
chmod 777 oeffentlich/hinweis.txt
ls -l oeffentlich/hinweis.txt
# -rwxrwxrwx 1 trainer trainer 0 hinweis.txt
```

## Schritt 5: Rechte vergleichen

`kundendaten.txt` zeigt `rw-------`: nur der Owner darf lesen/schreiben. `hinweis.txt` zeigt `rwxrwxrwx`: alle duerfen lesen, schreiben und ausfuehren.

## Schritt 6: Eignung erklaeren

`kundendaten.txt` (600) ist fuer ein echtes Kundenformular geeignet, weil nur der Owner Zugriff hat. `hinweis.txt` (777) waere fuer Kundendaten ungeeignet, da jede Person am System sie lesen und veraendern koennte.

## Zusatzaufgabe

`chmod 600` staerkt Vertraulichkeit, da nur der Owner Zugriff hat. Ein zusaetzliches Backup staerkt Verfuegbarkeit, da die Daten auch nach einem Ausfall wieder nutzbar sind.
