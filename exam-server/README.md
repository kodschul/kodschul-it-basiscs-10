# Abschlussprüfung — Exam Server

Ersetzt das alte client-seitige Nexus-Modul. Fragen, richtige Antworten und
Musterlösungen liegen jetzt **nur** auf diesem Server (`exam_data.json`,
nie an den Browser der TN ausgeliefert). Die Prüfung bleibt gesperrt, bis der
Trainer sie über die Trainer-Seite freigibt — vorher sehen TN nur einen
Wartebildschirm, keine Fragen.

## Starten (Trainer-Laptop, keine Installation nötig — nur Python 3 Standardbibliothek)

```bash
cd courses/it-basics-10-com/exam-server
python3 server.py
```

Default-Port: `8950` (überschreibbar mit `PORT=1234 python3 server.py`).

## Eigene LAN-IP herausfinden

```bash
# macOS
ipconfig getifaddr en0
# Linux
hostname -I
```

TN verbinden sich dann im selben WLAN/LAN mit z. B. `http://192.168.1.23:8950/`.

## URLs

- TN-Seite: `http://<lan-ip>:8950/`
- Trainer-Seite (Freigabe, Live-Übersicht, Berichte, Reset): `http://<lan-ip>:8950/trainer`
- Trainer-Passwort: dem Trainer bekannt; `server.py` speichert nur den MD5-Prüfwert.

## Ablauf

1. Trainer öffnet `/trainer`, loggt sich ein, stellt bei Bedarf die Dauer von Pflichtteil/Wahlteil ein (Standard: 35 / 15 Min., Gesamt 45 Min.) und klickt "Prüfung freigeben".
2. TN öffnen `/`, geben ihren Namen ein, bearbeiten den Pflichtteil (30 Fragen, serverseitig zusammengestellt/bewertet, Zeitlimit laut Trainer-Einstellung).
3. Direkt danach folgt der Wahlteil (Szenario wählen, Python-Code schreiben, Zeitlimit laut Trainer-Einstellung).
4. Nach Abgabe werden Detaillierter Bericht + Kurzbericht sofort serverseitig generiert und in `exam.db` persistiert — nur über die Trainer-Seite (Passwort) abrufbar, TN sehen sie nie.
5. Trainer kann einzelne TN oder alle Sessions zurücksetzen (z. B. für eine neue Prüfungsrunde).

`exam.db` wird beim ersten Start automatisch angelegt und ist in `.gitignore`
eingetragen (enthält echte TN-Daten/Ergebnisse, soll nicht ins Repo).
