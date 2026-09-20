# Netzwerk, IoT und Durchsatz

## Leitfragen

<details><summary>Warum ist hohe Bandbreite nicht automatisch eine schnelle Reaktion?</summary>

Bandbreite beschreibt Kapazität. Hohe Latenz kann Antworten trotz hoher
Kapazität verzögern.

</details>

<details><summary>Was unterscheidet einen Sensor von einem Aktor?</summary>

Ein Sensor misst einen Zustand. Ein Aktor führt eine Aktion aus, etwa eine
Warnleuchte einschalten oder ein Ventil öffnen.

</details>

## Grundbegriffe

| Begriff    | Definition                                                     | Beispiel                         |
| ---------- | -------------------------------------------------------------- | -------------------------------- |
| Netzwerk   | verbundene Geräte, die Daten austauschen                       | Bürogeräte im Firmennetz         |
| IoT        | Internet of Things: vernetzte Geräte mit Sensoren oder Aktoren | Temperaturfühler, smarte Kasse   |
| Sensor     | Bauteil, das einen Zustand misst                               | Temperatur, Bewegung, Helligkeit |
| Aktor      | Bauteil, das eine Aktion ausführt                              | Motor, Ventil, Warnleuchte       |
| Durchsatz  | tatsächlich übertragene Datenmenge pro Zeit                    | 50 Mbit/s gemessen               |
| Bandbreite | mögliche Kapazität einer Verbindung                            | 100 Mbit/s Leitung               |
| Latenz     | Wartezeit für eine Datenübertragung                            | 20 ms Antwortzeit                |

![Heim-Router verbindet Geräte mit dem Internet](https://commons.wikimedia.org/wiki/Special:FilePath/SpeedStream_6520_Derri%C3%A8re.JPG?width=640)

## Irrglauben

| Irrtum                                              | Einordnung                                                                 |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| "Hohe Bandbreite bedeutet immer schnelle Reaktion." | Falsch: Hohe Latenz kann Reaktionen trotzdem verzögern.                    |
| "IoT ist nur ein WLAN-Gerät."                       | Falsch: IoT verbindet Messung, Verarbeitung, Netzwerk und oft eine Aktion. |
| "Ein Ping beweist, dass eine Website funktioniert." | Falsch: Ping prüft Erreichbarkeit, nicht den Webdienst.                    |

- Netzwerkbegriffe werden an Tag 2 mit Client, Server, DNS und Port angewendet.
