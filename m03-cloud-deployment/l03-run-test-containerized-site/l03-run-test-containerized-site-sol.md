# Lab 3.3 - Loesung: Die Baeckerei-Website erreichbar machen

## Schritt 1: Container starten

```bash
docker run --rm -d -p 8080:80 --name baeckerei-web baeckerei-site
```

## Schritt 2: Laufzeit pruefen

```bash
docker ps
```

Die Ausgabe zeigt `baeckerei-web` als laufenden Container.

## Schritt 3: Website pruefen

`http://localhost:8080` zeigt die Website im Browser.

## Schritt 4: Aenderung bereitstellen

```bash
docker stop baeckerei-web
docker build -t baeckerei-site:v2 .
```

Die Textaenderung liegt erst im neuen Image vor.

## Schritt 5: Neue Version testen

```bash
docker run --rm -d -p 8080:80 --name baeckerei-web baeckerei-site:v2
```

Der Browser zeigt die geaenderte Ueberschrift. Die Partnerpruefung bestaetigt
das sichtbare Ergebnis.

## Zusatzaufgabe

`-p 8081:80` verbindet Port 8081 des Kursrechners mit Port 80 im Container.
Die Browser-Adresse lautet dann `http://localhost:8081`.
