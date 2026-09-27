# Lab 8.4 - Uebung: Agentische Erweiterung der Todo-App

## Auftrag

Ein Ziel für ein agentisches KI-Coding-Werkzeug formulieren, die Todo-App damit um eine
KI-API-gestützte Funktion erweitern lassen, das Ergebnis prüfen und testen.

## Start

Die vollständige Todo-App aus Lab 8.3 (`frontend/index.html`, `backend/server.py`,
`baeckerei.db`) liegt bereit. Zugang zu einem agentischen KI-Coding-Werkzeug und einer KI-API
(Testzugangsdaten als Umgebungsvariablen `KI_ENDPOINT`/`KI_API_KEY`) ist eingerichtet.

## Schritte

1. Ein konkretes Ziel formulieren (z. B. automatische Kategorie-Vorschläge beim Anlegen, oder eine
   automatische Zusammenfassung aller offenen Bestellungen) - Datei(en), gewünschtes Verhalten und
   zu verwendende KI-API explizit nennen.
2. Das agentische Werkzeug mit diesem Ziel arbeiten lassen und die vorgeschlagenen Änderungen
   Datei für Datei durchlesen, bevor sie übernommen werden.
3. Die neue Funktion im Browser testen: funktioniert sie mit einer neuen Bestellung wie
   beschrieben?
4. Mindestens eine Stelle im erzeugten Code benennen, die verstanden und erklärt werden kann (was
   macht diese Zeile/Funktion, warum).
5. In Kleingruppen austauschen: wo war das agentische Vorgehen schnell/hilfreich, wo musste
   eingegriffen oder korrigiert werden?

## Fertig, wenn

- die neue, agentisch erzeugte Funktion im Browser nachweislich funktioniert,
- der erzeugte Code durchgelesen und mindestens eine Stelle daraus erklärt wurde,
- die eigene Einschätzung zu Chancen/Grenzen des agentischen Vorgehens notiert ist.

## Hilfe

1. Ein zu vages Ziel ("mach die App besser") liefert unvorhersehbare Ergebnisse - je konkreter
   Datei und gewünschtes Verhalten benannt sind, desto passender das Ergebnis.
2. KI-API-Zugangsdaten gehören in Umgebungsvariablen, nie direkt in den Code - bei einem Vorschlag
   mit fest eingetragenem Schlüssel wird das explizit korrigiert.
3. Schlägt die KI-API nicht erreichbar fehl, zeigt die Anwendung idealerweise eine erkennbare
   Fehlermeldung statt abzustürzen - das kann als zusätzliche Anforderung ins Ziel aufgenommen
   werden.

## Zusatzaufgabe

Dasselbe agentische Vorgehen auf die eigene Projektidee aus Tag 6 anwenden, sofern sie eine
vergleichbare Erweiterung zulässt.
