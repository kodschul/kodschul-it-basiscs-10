# Lab 1.3 - Übung: Die Bäckerei im Terminal verwalten

## Auftrag

Diese Übung deckt zwei Blöcke des Tagesplans ab und dauert dadurch insgesamt
etwa 3 Stunden, nicht 20-30 Minuten: Teil A baut die Dateistruktur einer
Bäckerei im Terminal auf (13:15-14:45), Teil B sucht darin eine verlorene
Datei (15:00-16:30). Die vier Befehle `mkdir`, `cd`, `touch` und `ls` reichen
für beide Teile aus.

## Start

- Die vorbereitete Konsole ist geöffnet.
- Der Ordner `suchspiel/` ist vorhanden (nur für Teil B).
- `rechnung_2025.txt` liegt mindestens drei Ebenen tief in der Ordnerstruktur
  von `suchspiel/`, umgeben von mehreren Ordnern ohne die gesuchte Datei
  (Sackgassen).

---

## Teil A - Mission "Die Bäckerei im Terminal bauen" (ca. 90 Minuten, 13:15-14:45)

- 15 Min. Live-Demo: dieselbe Ordneraufgabe einmal im Dateimanager, einmal im
  Terminal. Beobachtungsfrage: Was ist gleich, was anders?
- 15 Min. Trainer startet den Übungscomputer; Linux, Alpine, Docker und
  Container werden heute nur gezeigt, nicht erklärt. Leitfrage: "Wie gebe ich
  diesem Computer Befehle?"
- 35 Min. Gruppen- oder Einzelarbeit: Schritte 1-4 unten, Befehl für Befehl,
  mit Zwischenstopp nach jedem Ordner.
- 15 Min. Partnerkontrolle mit `ls` (Schritt 5): Struktur und Dateinamen
  gegeneinander prüfen.
- 10 Min. Kurzreflexion: Welcher Befehl erstellt, wechselt, zeigt oder legt
  eine Datei an?

### Schritte (Teil A)

1. Erstellt den Ordner `baeckerei` und wechselt hinein.
2. Erstellt darin die Ordner `produkte`, `kunden` und `bestellungen`.
3. Erstellt die Dateien `brot.txt`, `kunden.txt` und `bestellungen.txt` in
   den passenden Ordnern.
4. Zeigt mit `ls` die drei Ordner und mit `ls` in jedem Ordner die passende
   Datei.
5. Im Partnercheck die Bäckerei-Struktur zeigen: Eine Person nennt einen
   Ordnernamen, die andere navigiert dorthin und zeigt den Inhalt mit `ls`.
   Anschliessend Rollen tauschen.

### Fertig, wenn (Teil A)

```text
baeckerei/
|- produkte/
|  `- brot.txt
|- kunden/
|  `- kunden.txt
`- bestellungen/
   `- bestellungen.txt
```

---

## Teil B - Mission "Finde die Datei" (ca. 90 Minuten, 15:00-16:30)

- 10 Min. Auftrag erklären: `rechnung_2025.txt` liegt irgendwo in
  `suchspiel/`. Erlaubt sind nur `ls`, `cd` und `cd ..`.
- 30 Min. Einzel- oder Partnerarbeit: Schritt 6 unten (Ordner mit `ls`
  prüfen, mit `cd` navigieren, bei Sackgassen mit `cd ..` zurückgehen).
- 15 Min. Partnerkontrolle: Zielordner und `rechnung_2025.txt` mit `ls`
  zeigen; anschliessend erklärt jede Person ihren Suchweg.
- 20 Min. "Kann ich?"-Check (Schritt 7) zu Hardware, Dateien, `cd`, `mkdir`,
  `touch` und `ls`; offene Punkte im Plenum sichtbar sammeln.
- 15 Min. Tagesabschluss und Ausblick auf Tag 2 (Netzwerke).

### Schritte (Teil B)

6. Wechselt in `suchspiel/`. Sucht `rechnung_2025.txt`, indem ihr die Inhalte
   jedes erreichten Ordners mit `ls` prüft, mit `cd` weitergeht und bei einer
   Sackgasse mit `cd ..` zurückgeht. Notiert euren Suchweg als Liste von
   Ordnernamen (z. B. `suchspiel -> archiv -> 2025 -> rechnungen`).
7. "Kann ich?"-Check: Beantwortet ohne Notizen, welcher Befehl einen Ordner
   erstellt, welcher hineinwechselt, welcher den Inhalt zeigt und welcher eine
   leere Datei anlegt. Notiert offene Punkte für die Trainer-Rückfrage.

## Fertig, wenn (Teil B)

Zusätzlich zeigt `ls` im Zielordner der Suchmission die Datei
`rechnung_2025.txt`, und der Suchweg dorthin kann Ordner für Ordner genannt
werden.

## Wenn ihr nicht weiterkommt

1. `mkdir` erstellt einen Ordner, `touch` eine leere Datei.
2. `ls` zeigt den Inhalt des aktuellen Ortes, `cd name` wechselt in den
   Ordner `name` und `cd ..` geht eine Ebene zurück.
3. Bei "No such file or directory" zuerst mit `ls` die genaue Schreibweise
   prüfen.
4. In Sackgassen ohne Unterordner hilft nur `cd ..`, dann ein anderer
   Ordner aus der letzten `ls`-Ausgabe.

## Zusatzaufgabe

Erstellt unter `produkte/` einen Ordner `saison` mit der Datei
`kuerbiskernbrot.txt`. Zeigt anschliessend die vollständige Struktur mit
`ls` in den einzelnen Ebenen.

Die gleiche Befehlsfolge funktioniert in einer macOS-, Linux- oder WSL-Konsole.
