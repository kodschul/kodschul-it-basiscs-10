# Lab 3.2 - Loesung: Die Baeckerei-Website verpacken

## Schritt 1: Website pruefen

`site/index.html` ist die Datei, die spaeter vom Webserver ausgeliefert wird.

## Schritt 2: Dockerfile anlegen

Die Datei heisst genau `Dockerfile` und liegt neben dem Ordner `site/`.

## Schritt 3: Dockerfile fuellen

```dockerfile
FROM nginx:alpine
COPY site/ /usr/share/nginx/html/
```

`nginx:alpine` liefert einen kleinen Webserver. Das Zielverzeichnis ist das
Standardverzeichnis fuer statische Nginx-Seiten.

## Schritt 4: Image bauen

```bash
docker build -t baeckerei-site .
```

## Schritt 5: Image pruefen

```bash
docker image ls
```

Die Ausgabe enthaelt `baeckerei-site` mit dem Tag `latest`.

## Zusatzaufgabe

```bash
docker build -t baeckerei-site:v2 .
```