# Lab 1.3 - Lösung: Die Bäckerei im Terminal verwalten

## Teil A - Schritt 1-4: Bäckerei-Struktur anlegen

```bash
mkdir baeckerei
cd baeckerei
mkdir produkte kunden bestellungen

cd produkte
touch brot.txt
ls
cd ..

cd kunden
touch kunden.txt
ls
cd ..

cd bestellungen
touch bestellungen.txt
ls
cd ..

ls
```

Die abschliessende Ausgabe von `ls` zeigt `bestellungen`, `kunden` und
`produkte`. Jedes `ls` im jeweiligen Unterordner zeigt die passende Datei.

## Teil A - Schritt 5: Partnercheck

Der Partnercheck prüft die drei Unterordner in `baeckerei/` sowie deren
jeweilige Datei. Person A nennt einen Ordnernamen, Person B wechselt mit
`cd` dorthin und zeigt den Inhalt mit `ls`; danach werden die Rollen
getauscht. Die Kontrolle erfolgt nur mit `ls`; ein Bildschirmfoto ist nicht
erforderlich.

## Teil B - Schritt 6: Rechnung finden

Der genaue Weg hängt von der vorbereiteten Ordnerlandschaft ab. Der
Lösungsweg ist immer gleich: `ls` zeigt die möglichen nächsten Ordner,
`cd <ordnername>` folgt einem davon. Mit `cd ..` geht es zurück, wenn dort
keine passende Spur liegt. Die Suche endet, wenn `ls` die Datei
`rechnung_2025.txt` ausgibt. Der notierte Suchweg (z. B.
`suchspiel -> archiv -> 2025 -> rechnungen`) sollte jeden tatsächlich
besuchten Ordner nennen, auch Sackgassen, aus denen mit `cd ..`
zurückgegangen wurde.

## Teil B - Schritt 7: "Kann ich?"-Check

`mkdir` erstellt einen Ordner, `cd` wechselt hinein (`cd ..` eine Ebene
zurück), `ls` zeigt den Inhalt des aktuellen Ortes, `touch` legt eine leere
Datei an. Wer eine dieser vier Zuordnungen nicht sicher benennen kann, sollte
das als offenen Punkt für die Trainer-Rückfrage notieren statt zu raten.

## Zulässige Alternativen

`mkdir produkte kunden bestellungen` kann auch durch drei einzelne
`mkdir`-Befehle ersetzt werden. Die Reihenfolge der drei Unterordner ist
nicht relevant. Nur die Namen und die Dateien sind für das Ergebnis fest.

## Grenzen

Verlässt man den Container (`exit`), gehen alle angelegten Ordner/Dateien
standardmäßig verloren, sofern kein Volume gemountet wurde – das ist
gewolltes Verhalten für diese Übung, nicht ein Fehler.
