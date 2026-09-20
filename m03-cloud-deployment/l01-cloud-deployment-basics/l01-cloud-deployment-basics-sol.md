# Lab 3.1 - Loesung: Den Weg zur erreichbaren Website planen

## Schritt 1: Bereitstellungsstrecke

Eine passende Strecke lautet: `Website-Dateien` -> `Dockerfile` -> `Image` ->
`Container` -> `Port` -> `Browser`. Das Dockerfile beschreibt den Bau, das
Image ist das Ergebnis des Baus und der Container laeuft.

## Schritt 2: Laufende Website markieren

Der Container stellt die laufende Website dar. Der Browser kann sie ueber den
veroefentlichten Port aufrufen.

## Schritt 3: Service-Modelle zuordnen

| Angebot | Modell |
| --- | --- |
| virtuelle Maschine | IaaS |
| vorbereitete Web-Plattform | PaaS |
| fertige Mail-Anwendung | SaaS |

## Schritt 4: Verantwortlichkeiten vergleichen

Bei IaaS betreibt der Anbieter Hardware und Virtualisierung. Das Team betreibt
Betriebssystem und Anwendung. Bei PaaS betreibt der Anbieter auch die Plattform;
das Team verantwortet Anwendung und Daten.

## Schritt 5: Partnererklaerung

Die Website-Dateien werden mit einem Dockerfile zu einem Image gebaut. Startet
das Image als Container, liefert ein Webserver die Dateien aus. Der Port macht
den Webserver im Browser erreichbar.

## Zusatzaufgabe

Gueltige Beispiele sind ein Browser-Test, Rechtepruefung, Backup oder ein Test
der Anwendung mit einer ungefaehrlichen Beispieldatei.