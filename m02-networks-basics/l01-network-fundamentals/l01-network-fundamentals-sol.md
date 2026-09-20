# Lab 2.1 - Lösung: Die Baeckerei-Website finden

## Schritt 1: Rollen auslegen

Der Client ist das Geraet mit dem Browser. DNS beantwortet Namensfragen. Der
Router leitet Daten zwischen Netzen weiter. Der Webserver liefert die Website.

## Schritt 2: Name und IP-Adresse verbinden

`baeckerei.example` liegt beim Client. Die IP-Adresse kommt als Antwort von
DNS zurueck. Der Name und die IP-Adresse sind nicht dasselbe: Der Name ist
merkbar, die IP-Adresse bezeichnet das Ziel im Netzwerk.

## Schritt 3: Port am Webserver markieren

Der Port gehoert zum erreichten Server. Fuer eine Website sind Port 80
(HTTP) oder Port 443 (HTTPS) passende Beispiele. Der Port ist nicht die
Adresse des Geraets, sondern die Adresse des Dienstes auf diesem Geraet.

## Schritt 4: DNS-Reise legen

Der Client fragt DNS nach der IP von `baeckerei.example`. DNS liefert eine
IP-Adresse zurueck. Erst danach kann der Client die Webserver-Anfrage stellen.

## Schritt 5: Website anfordern

Die Anfrage geht vom Client, bei Bedarf ueber Router und Internet, zum
Webserver an dessen IP-Adresse und Port. Der Webserver sendet die Webseite als
Antwort zurueck; der Browser stellt sie dar.

## Schritt 6: Ablauf erklaeren

Eine vollstaendige Kurzerklaerung lautet: "Der Browser fragt DNS nach der IP
von `baeckerei.example`. Mit dieser IP erreicht er den Webserver. Der Port
bestimmt den Webdienst, und der Server antwortet mit der Webseite."

## Zusatzaufgabe: Fehlerfall

Ohne DNS-Antwort kennt der Browser die Ziel-IP nicht. Bei einem falschen oder
geschlossenen Port ist der Server zwar erreichbar, aber der Webdienst nimmt
keine Verbindung an.
