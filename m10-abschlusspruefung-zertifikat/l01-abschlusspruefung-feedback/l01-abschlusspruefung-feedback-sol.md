# Lab 10.1 - Loesung: Abschlusspruefung bearbeiten & Feedbackrunde

## Schritt 1-2: Beispielhafte Musterloesung

Multiple Choice (Auszug):

| Frage                                                       | Richtige Antwort                           |
| ----------------------------------------------------------- | ------------------------------------------ |
| Welcher `chmod`-Wert erlaubt nur dem Owner Lesen/Schreiben? | `600`                                      |
| Was übersetzt DNS?                                          | Domainnamen in IP-Adressen                 |
| Was speichert MongoDB typischerweise?                       | Dokumente statt starrer Tabellen           |
| Wofür steht die CIA-Triade?                                 | Vertraulichkeit, Integrität, Verfügbarkeit |
| Was macht `Read-Host`?                                      | Nimmt eine Nutzereingabe entgegen          |

Mini-Aufgabe (Beispiel): Datei `pruefung.txt` anlegen und auf `640` setzen.

```bash
touch pruefung.txt
chmod 640 pruefung.txt
ls -l pruefung.txt
# -rw-r----- 1 trainer trainer 0 pruefung.txt
```

## Schritt 4: Zuordnung falscher Antworten zu Modulen (Beispiel)

Eine falsch beantwortete DNS-Frage wird Modul 2 (Netzwerke) zugeordnet, eine falsch beantwortete MongoDB-Frage Modul 4 (Datenbanken).

## Schritt 5: Feedbackrunde (Beispiel)

"Besonders hilfreich war der direkte Bezug zur Baeckerei-Verwaltung durch alle Module hindurch. Mehr Zeit fuer die KI-API-Uebungen waere hilfreich gewesen."

## Zusatzaufgabe

Beispiel: "Der Unterschied zwischen relationaler und dokumentenbasierter Datenbank sollte noch einmal nachgelesen werden."
