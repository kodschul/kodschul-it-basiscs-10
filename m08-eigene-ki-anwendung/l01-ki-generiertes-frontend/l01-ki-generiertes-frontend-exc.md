# Lab 8.1 - Uebung: Frontend per KI-Prompt erzeugen

## Auftrag

Einen Prompt formulieren, der ein einfaches HTML/CSS-Grundgerüst für die Bäckerei-Todo-App liefert,
und das Ergebnis im Browser prüfen.

## Start

Zugang zu einem KI-Chat/Coding-Werkzeug steht bereit. Ein leerer Ordner `baeckerei-todo-app` mit
Unterordner `frontend/` ist angelegt.

## Schritte

1. Einen ersten Prompt schreiben, der Kontext ("Bestell-Todo-Liste einer Bäckerei"), gewünschte
   Elemente (Formular mit Produkt/Menge, darunter eine Liste) und Format (eine HTML-Datei, kein
   Framework) nennt.
2. Die KI-Antwort als `frontend/index.html` speichern und im Browser öffnen.
3. Pruefen: sind alle geforderten Elemente vorhanden (Formular mit zwei Feldern, Button, Liste mit
   mindestens einem Beispieleintrag)?
4. Falls etwas fehlt oder unpassend aussieht, den Prompt einmal gezielt nachschärfen (z. B. "Der
   Button soll 'Hinzufügen' heissen", "Die Liste soll eine sichtbare Umrandung haben") und neu
   erzeugen.
5. Das Ergebnis mit einer Partnerperson vergleichen: welche Formulierung im Prompt hat zu welchem
   Unterschied im Ergebnis gefuehrt?

## Fertig, wenn

- `frontend/index.html` im Browser fehlerfrei angezeigt wird,
- Formular (Produkt-Feld, Mengen-Feld, Button) und eine Liste mit Beispieleintrag sichtbar sind,
- mindestens eine gezielte Prompt-Anpassung durchgefuehrt und ihr Effekt beschrieben wurde.

## Hilfe

1. Ein zu kurzer Prompt ("mach mir ein Todo-Frontend") liefert meist ein generisches Ergebnis -
   konkrete Feldnamen/Beispieltexte im Prompt helfen.
2. Enthaelt das Ergebnis JavaScript-Frameworks oder externe Links, im Prompt nochmal explizit "nur
   HTML und CSS, eine Datei" fordern.
3. Ein Rechtsklick "Element untersuchen" im Browser zeigt, ob HTML wirklich wie erwartet aufgebaut
   ist.

## Zusatzaufgabe

Den Prompt um ein optisches Detail erweitern (z. B. "Farbschema in Warmtönen passend zu einer
Bäckerei") und das Ergebnis mit der ersten Version vergleichen.
