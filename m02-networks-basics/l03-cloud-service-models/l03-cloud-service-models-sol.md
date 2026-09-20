# Lab 2.3 - Loesung: Die Baeckerei ausserhalb des Ladens erreichbar machen

## Schritt 1: Service-Modelle auslegen

Die drei Cloud-Modelle heissen IaaS, PaaS und SaaS. Sie beschreiben nicht die
Qualitaet eines Angebots, sondern wie viel technische Grundlage der Anbieter
bereitstellt und betreibt.

## Schritt 2: Cloud-Angebote zuordnen

| Angebot | Modell | Begruendung |
| --- | --- | --- |
| virtuelle Maschine mit selbst installiertem Linux und Webserver | IaaS | Der Anbieter liefert Infrastruktur; das Team betreibt Betriebssystem und Anwendung. |
| vorbereitete Web-App-Plattform | PaaS | Die Plattform fuer Deployment und Betrieb ist vorbereitet; das Team liefert die Anwendung. |
| fertige Online-Mailbox | SaaS | Die Anwendung ist fertig; das Team verwaltet Inhalte, Nutzer und Einstellungen. |

## Schritt 3: Lokalen Server einordnen

Ein eigener Server im Laden ist keine Cloud-Nutzungsform. Die Baeckerei
beschafft, betreibt, aktualisiert und sichert den Rechner selbst. Er kann
trotzdem mit dem Internet verbunden sein.

## Schritt 4: Verantwortungen vergleichen

Bei IaaS betreibt der Anbieter Hardware und Virtualisierung, das Team aber
Betriebssystem, Updates und Webserver. Bei PaaS betreibt der Anbieter auch die
Plattform; das Team verantwortet Anwendung und Daten. Bei SaaS betreibt der
Anbieter die Anwendung; das Team verantwortet vor allem Nutzerrechte und
Inhalte.

## Schritt 5: Auswahl begruenden

Fuer eine kleine, einfache Website ist PaaS oft passend, weil kein eigener
Server verwaltet werden muss. IaaS ist ebenfalls korrekt, wenn mehr Kontrolle
ueber das Betriebssystem erforderlich ist. Die Aufgabe verlangt eine
begruendete Entscheidung, keine allgemeingueltige Wahl.

## Schritt 6: Weg der Website erklaeren

Der Kunde nutzt einen Browser. Die Anfrage geht ueber das Internet zur
Cloud-Umgebung, dort zum Webserver und anschliessend zur Website. Die Antwort
geht denselben Weg zurueck zum Browser.

## Zusatzaufgabe

Vor dem Speichern von Kundendaten sind mindestens Zugriffsrechte, Speicherort,
Auftragsverarbeitung und Backup-Konzept zu klaeren. Diese Fragen gelten bei
allen Service-Modellen, aber die technische Aufteilung der Verantwortung ist
unterschiedlich.