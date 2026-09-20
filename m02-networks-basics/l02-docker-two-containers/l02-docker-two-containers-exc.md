# Lab 2.2 - Mission: Client und Server der Baeckerei verbinden

## Auftrag

Die Baeckerei braucht einen kleinen Webserver. Startet einen Client und einen
Server als Container, prueft ihre Verbindung und zeigt die Website im Browser.
Der Browser ist der sichtbare Beleg, dass der Server von ausserhalb seines
Container-Netzwerks erreichbar gemacht wurde.

## Start

- Docker Desktop laeuft.
- Der vorbereitete Ordner `baeckerei-netzwerk/` enthaelt eine
  `docker-compose.yml` mit den Diensten `client` und `server`.
- Der Server ist auf den lokalen Port `8080` vorbereitet.

## Schritte

1. Wechselt in `baeckerei-netzwerk/` und startet beide Dienste mit
  `docker compose up -d`.
2. Prueft mit `docker compose ps`, dass `client` und `server` laufen.
3. Fuehrt im Client `ping -c 3 server` aus und achtet auf erfolgreiche
  Antworten.
4. Oeffnet `http://localhost:8080` im Browser.
5. Prueft, ob die Startseite des Webservers sichtbar ist.
6. Erklaert im Partnerpaar: Welcher Container ist Client, welcher ist Server,
  und wodurch kann der Browser den Server erreichen?
7. Beendet die Umgebung mit `docker compose down`.

## Fertig, wenn

- `docker compose ps` beide Dienste als laufend zeigt,
- der Ping drei Antworten ohne Paketverlust zeigt,
- die Website im Browser unter `http://localhost:8080` sichtbar war,
- die Rollen Client, Server und Portweiterleitung erklaert werden koennen.

## Wenn ihr nicht weiterkommt

1. Prueft zuerst mit `docker compose ps`, ob beide Dienste laufen.
2. Der Name `server` ist innerhalb des Compose-Netzwerks der Zielname fuer
  den Client.
3. Ist Port `8080` belegt, stimmt den Ersatzport mit dem Trainer ab und nutzt
  ihn sowohl in der Compose-Datei als auch im Browser.

## Zusatzaufgabe

Ersetzt die Startseite durch eine Datei mit der Ueberschrift
"Baeckerei online". Startet den Server neu und prueft die Aenderung im
Browser.

## Material-Alternative

Wenn Docker bei einzelnen Rechnern nicht startet, erfolgt die Partnererklaerung
an einer laufenden Trainer-Umgebung. Die Person am Rechner beschreibt jeden
Schritt, die andere Person ordnet die Netzwerkrolle zu.
