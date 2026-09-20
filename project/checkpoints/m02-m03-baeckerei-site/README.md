# Checkpoint: Modul 2-3 - Bäckerei-Website

Referenzstand nach Lab 2.2 (Client/Server-Demo) und Lab 3.2/3.3 (eigenes Docker-Image).

## `baeckerei-netzwerk/` (Modul 2, Lab 2.2)

Zwei Container per `docker compose up -d`: `client` (Alpine, für `ping`-Tests) und `server` (nginx, liefert `site/index.html`). Start:

```bash
cd baeckerei-netzwerk
docker compose up -d
docker compose exec client ping -c 3 server
# Browser: http://localhost:8080
docker compose down
```

## `baeckerei-site/` (Modul 3, Lab 3.2-3.3)

Dieselbe Website, jetzt als eigenes Image gebaut und eigenständig gestartet:

```bash
cd baeckerei-site
docker build -t baeckerei-site .
docker run --rm -d -p 8080:80 --name baeckerei-web baeckerei-site
# Browser: http://localhost:8080
docker stop baeckerei-web
```

`site/index.html` ist in beiden Ordnern identisch - Modul 3 verpackt dieselbe Website nur anders (eigenes Image statt fertigem `nginx:alpine` + Bind-Mount).
