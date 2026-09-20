# Modul 6: Datenschutz & IT-Sicherheit Grundlagen

## Lab 6.1 - Rechte, Schutzbedarf und Berechtigungen

---

**Ziel:** Datenschutz und IT-Sicherheit als Grundschutzfragen einordnen und
Berechtigungen am Alpine-Container aus Tag 1 setzen.

- Ein Kundenformular macht sichtbar, welche Daten die DSGVO schuetzt.
- Die CIA-Triade ordnet, welches Schutzziel jeweils betroffen ist.
- `chmod`/`chown` sind die technische Umsetzung dieser Schutzziele auf Dateiebene.

<details><summary>Was regelt die DSGVO bei einem Kundenformular?</summary>

Sie verlangt, dass nur notwendige Daten erhoben, sicher gespeichert und nur berechtigten Personen zugaenglich gemacht werden.

</details>

<details><summary>Was bedeuten die drei Buchstaben der CIA-Triade?</summary>

Vertraulichkeit (nur Berechtigte sehen die Daten), Integritaet (Daten bleiben unveraendert/nachvollziehbar), Verfuegbarkeit (Daten sind erreichbar, wenn sie gebraucht werden).

</details>

<details><summary>Was aendert `chmod`, was aendert `chown`?</summary>

`chmod` aendert die Zugriffsrechte einer Datei oder eines Ordners; `chown` aendert, wem die Datei gehoert.

</details>

## Begriffe

| Begriff                 | Bedeutung                                                    |
| ----------------------- | ------------------------------------------------------------ |
| DSGVO                   | EU-Regelwerk zum Schutz personenbezogener Daten              |
| CIA-Triade              | Vertraulichkeit, Integritaet, Verfuegbarkeit als Schutzziele |
| Owner / Gruppe / Andere | die drei Rechteebenen einer Linux-Datei                      |
| `chmod`                 | setzt Lese-, Schreib- und Ausfuehrrechte (z. B. `chmod 600`) |
| `chown`                 | weist eine Datei einem anderen Besitzer zu                   |

## Schutzmassnahmen

| Art       | Beispiel                                   |
| --------- | ------------------------------------------ |
| Physisch  | abgeschlossener Serverraum, Zutrittskarte  |
| Technisch | Verschluesselung, Zugriffsrechte, Firewall |

Die Baeckerei-Verwaltung sammelt Name, Adresse und Bestellhistorie ihrer Kunden im Kundenformular - genau die Art Daten, die die DSGVO schuetzt.

![Serverschrank mit abgeschlossenem Zugang](https://loremflickr.com/640/360/padlock,security)

## Demo: Rechte lesen und setzen

```bash
ls -l kundendaten.txt
# -rw-r--r-- 1 trainer trainer 120 kundendaten.txt
chmod 600 kundendaten.txt
ls -l kundendaten.txt
# -rw------- 1 trainer trainer 120 kundendaten.txt
```

Nach `chmod 600` darf nur der Owner lesen und schreiben; Gruppe und Andere haben keinen Zugriff mehr.

- Falsch gesetzte Rechte (z. B. `chmod 777`) machen eine Datei fuer alle less-/schreibbar - ein haeufiger, unauffaelliger Fehler.

## Fazit

- DSGVO und CIA-Triade beschreiben, WARUM Daten geschuetzt werden.
- `chmod`/`chown` sind ein WIE: technische Umsetzung von Vertraulichkeit auf Dateiebene.
- Rechte lassen sich mit `ls -l` jederzeit sichtbar pruefen, bevor sie geaendert werden.

> **Merksatz:** Rechte zuerst pruefen (`ls -l`), dann gezielt aendern (`chmod`/`chown`) - nie blind auf `777` setzen.

Weiter geht es mit der Uebung `l01-rechte-und-datenschutz-exc.md` (Loesung: `l01-rechte-und-datenschutz-sol.md`).
