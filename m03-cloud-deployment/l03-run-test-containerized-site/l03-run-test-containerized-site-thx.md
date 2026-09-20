# Modul 3: Cloud Computing & erste Webanwendung deployen

## Lab 3.3 - Container starten und Website testen

---

**Ziel:** Das gebaute Image starten, die Website im Browser pruefen und eine Aenderung sichtbar machen.

- Aus dem Image wird ein laufender Container.
- Eine Demo zeigt Portweiterleitung und Browser-Test einmal.
- Gruppen starten ihren Container, testen sich gegenseitig und bauen nach einer Textaenderung ein neues Image.

<details><summary>Warum braucht der Browser eine Portweiterleitung?</summary>

Die Portweiterleitung verbindet einen lokalen Port des Kursrechners mit dem
Webserver-Port im Container.

</details>

<details><summary>Warum reicht ein erfolgreicher Build nicht aus?</summary>

Ein Build beweist nur, dass ein Image entstand. Erst der Browser-Test zeigt,
dass der gestartete Dienst die erwartete Seite liefert.

</details>

## Starten, pruefen, aendern

![Browser zeigt eine Website](https://commons.wikimedia.org/wiki/Special:FilePath/Macbook_Air.jpg?width=640)

```bash
docker run --rm -d -p 8080:80 --name baeckerei-web baeckerei-site
```

| Pruefung                | Erwartung                            |
| ----------------------- | ------------------------------------ |
| `docker ps`             | Container `baeckerei-web` laeuft     |
| `http://localhost:8080` | Website erscheint im Browser         |
| Partner-Test            | andere Person sieht denselben Inhalt |

> **Merksatz:** Ein Deployment ist erst fertig, wenn die Anwendung an ihrem
> Zugangspunkt mit dem erwarteten Ergebnis getestet wurde.

- Port 8080 kann bereits belegt sein. Dann ist ein Ersatzport noetig.
- Ein Neustart mit unveraendertem Image zeigt keine spaetere Dateiaenderung.

## Fazit

- Ein Container ist die laufende Form eines Images.
- Browser-Test und Partner-Test pruefen das sichtbare Ergebnis.
- Nach einer Aenderung wird ein neues Image gebaut und gestartet.

Weiter geht es mit der Uebung `l03-run-test-containerized-site-exc.md` (Loesung: `l03-run-test-containerized-site-sol.md`).
