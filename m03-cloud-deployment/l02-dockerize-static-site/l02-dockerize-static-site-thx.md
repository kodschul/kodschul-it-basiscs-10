# Modul 3: Cloud Computing & erste Webanwendung deployen

## Lab 3.2 - Eine Website in ein Docker-Image packen

---

**Ziel:** Aus einer vorbereiteten Baeckerei-Website ein startbares Docker-Image erzeugen.

- Eine Demo zeigt Dateien, Dockerfile und Build einmal.
- Danach uebernimmt jede Gruppe dieselbe Vorlage.
- Sichtbares Ergebnis vor dem Start: das gebaute Image.

<details><summary>Wofuer braucht eine Website ein Dockerfile?</summary>

Das Dockerfile beschreibt reproduzierbar, welches Grundsystem und welche
Dateien ein Image enthalten soll.

</details>

<details><summary>Was ist der Unterschied zwischen Image und Container?</summary>

Ein Image ist eine Vorlage. Ein Container ist eine gestartete Instanz dieser
Vorlage.

</details>

## Die drei Anweisungen

![Container und Server-Hardware](https://commons.wikimedia.org/wiki/Special:FilePath/My_Opera_Server.jpg?width=640)

| Anweisung                          | Wirkung                                         |
| ---------------------------------- | ----------------------------------------------- |
| `FROM nginx:alpine`                | verwendet einen kleinen Webserver als Grundlage |
| `COPY site/ ...`                   | kopiert Website-Dateien in den Webserver        |
| `docker build -t baeckerei-site .` | baut ein Image mit einem Namen                  |

```dockerfile
FROM nginx:alpine
COPY site/ /usr/share/nginx/html/
```

- Schreibfehler im Dateipfad verhindern den Build.
- Das Image enthaelt Dateien, ist aber noch kein erreichbarer Webserver.

## Fazit

- Das Dockerfile ist eine Bauanleitung fuer ein Image.
- `COPY` bringt die Website in das Image.
- Erst ein gestarteter Container liefert die Website aus.

Weiter geht es mit der Uebung `l02-dockerize-static-site-exc.md` (Loesung: `l02-dockerize-static-site-sol.md`).
