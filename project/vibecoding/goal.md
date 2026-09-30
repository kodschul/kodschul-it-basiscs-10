Wir führen gerade eine Schulung durch und möchten als einfaches Beispiel ein kleines Zahlenratespiel mit HTML, CSS, Python und Flask bauen.

Ziel des Beispiels

Der Nutzer soll über eine Weboberfläche eine Zahl eingeben und diese an ein Python-Backend senden können.

Der Ablauf soll folgendermaßen funktionieren:

Beim Start eines neuen Spiels wird im Python-Backend eine zufällige Zielzahl erzeugt. Diese Zahl soll bei jedem neuen Spiel neu generiert werden und nicht statisch sein.

Die Weboberfläche soll ein Eingabefeld enthalten, in das der Nutzer eine Zahl eingibt.

Über einen Button kann der Nutzer seinen Tipp absenden.

Der eingegebene Wert wird über Flask an das Python-Backend übertragen.

Das Python-Backend prüft, ob die eingegebene Zahl der zufällig generierten Zielzahl entspricht.

Wenn die Zahl richtig ist, soll die Weboberfläche eine entsprechende Gewinnmeldung bzw. Animation anzeigen, z. B. „Du hast gewonnen!“.

Wenn die Zahl falsch ist, soll der Nutzer einen weiteren Versuch machen können.

Der Nutzer hat insgesamt maximal drei Versuche.

Nach dem dritten erfolglosen Versuch wird das Spiel beendet.

Nach einem Neustart des Spiels wird wieder eine neue zufällige Zielzahl erzeugt und der Versuchs-Zähler zurückgesetzt.

Aufteilung der Aufgaben

Wichtig: Die eigentliche Spiellogik möchte ich selbst in Python schreiben.

Du sollst mir daher hauptsächlich bei der technischen Verbindung zwischen Frontend und Backend helfen:

Erstelle die notwendige Flask-Grundstruktur.

Erstelle die benötigten HTML-Templates.

Erstelle das benötigte CSS für eine einfache, übersichtliche Oberfläche.

Zeige, wie das HTML-Formular bzw. JavaScript die eingegebene Zahl an Flask übermittelt.

Zeige, wie Flask die Anfrage entgegennimmt und die Daten an meine Python-Logik weitergibt.

Zeige, wie das Ergebnis der Python-Logik wieder an das Frontend zurückgegeben und dort angezeigt wird.

Berücksichtige den Neustart eines Spiels und die dafür notwendige Speicherung der aktuellen Zielzahl bzw. des Spielzustands.

Wichtig für die Schulung

Bitte schreibe nicht die komplette Spiellogik für mich. Ich möchte insbesondere die Logik für:

Generierung bzw. Verwaltung der Zufallszahl,

Vergleich des Tipps mit der Zielzahl,

Verwaltung der drei Versuche,

Gewinn- und Verlustbedingungen

selbst implementieren.

Gib mir stattdessen eine saubere Flask-Struktur mit klar markierten Stellen, an denen ich meine eigene Python-Logik einsetzen kann.

Der Code soll bewusst einfach und anfängerfreundlich gehalten sein. Vermeide unnötige Frameworks oder komplexe Architektur. Erkläre außerdem kurz, wie die einzelnen Dateien und die Kommunikation zwischen HTML → Flask → Python-Logik → HTML funktionieren.
