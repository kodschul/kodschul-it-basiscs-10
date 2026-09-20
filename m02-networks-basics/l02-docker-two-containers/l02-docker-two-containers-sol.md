# Lab 2.2 - Lösung: Client und Server der Baeckerei verbinden

## Schritt 1: Dienste starten

```bash
docker compose up -d
```

## Schritt 2: Laufende Dienste pruefen

```bash
docker compose ps
```

Die Ausgabe zeigt die Dienste `client` und `server` als laufend an.

## Schritt 3: Verbindung im Docker-Netz pruefen

```bash
docker compose exec client ping -c 3 server
```

Eine erfolgreiche Ausgabe hat das folgende Muster:

```text
PING server (172.x.x.x): 56 data bytes
64 bytes from 172.x.x.x: seq=0 ttl=64 time=0.1 ms
...
3 packets transmitted, 3 packets received, 0% packet loss
```

## Schritt 4: Website im Browser oeffnen

Im Browser unter `http://localhost:8080` erscheint die Standardseite des
Webservers oder die vorbereitete Baeckerei-Seite.

## Schritt 5: Sichtbares Ergebnis pruefen

Die Browserseite bestaetigt mehr als der Ping: Der Server ist nicht nur im
Container-Netz erreichbar, sondern stellt auch einen Webdienst fuer den
lokalen Browser bereit.

## Schritt 6: Partnererklaerung

`client` fragt an, `server` beantwortet die Anfrage. Der Compose-Servicename
`server` funktioniert im internen Docker-Netz. Die Zuordnung `8080:80`
verbindet den lokalen Port 8080 des Rechners mit dem Webserver-Port 80 im
Container.

## Schritt 7: Umgebung beenden

```bash
docker compose down
```

## Grenze

Ein erfolgreicher Ping prueft nur die Netzwerk-Erreichbarkeit. Erst die
sichtbare Browserseite zeigt, dass der Webserver-Dienst ebenfalls funktioniert.
