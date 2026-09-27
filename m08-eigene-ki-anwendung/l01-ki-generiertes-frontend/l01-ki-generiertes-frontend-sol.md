# Lab 8.1 - Loesung: Frontend per KI-Prompt erzeugen

## Schritt 1: Beispiel-Prompt

```text
Erstelle eine einzelne HTML-Datei mit eingebettetem CSS für eine Bestell-Todo-Liste
einer Baeckerei. Oben ein Formular mit Feldern "Produkt" und "Menge" und einem Button
"Hinzufuegen". Darunter eine Liste, die vorerst einen Beispieleintrag zeigt
("Roggenbrot - Menge 10"). Kein JavaScript-Framework, kein externes CSS, nur eine
Datei index.html.
```

## Schritt 2-3: Ergebnis (`frontend/index.html`)

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>Bäckerei-Bestellungen</title>
    <style>
      body {
        font-family: sans-serif;
        max-width: 480px;
        margin: 2rem auto;
      }
      form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      ul {
        border: 1px solid #ccc;
        padding: 1rem 1.5rem;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <h1>Bäckerei-Bestellungen</h1>
    <form>
      <input name="produkt" placeholder="Produkt" required />
      <input name="menge" type="number" placeholder="Menge" required />
      <button type="submit">Hinzufügen</button>
    </form>
    <ul id="bestellliste">
      <li>Roggenbrot - Menge 10</li>
    </ul>
  </body>
</html>
```

## Schritt 4: Nachgeschärfter Prompt (Beispiel)

```text
Passe die HTML-Datei an: der Button soll "Hinzufuegen" heissen (bereits korrekt),
und die Liste soll einen sichtbaren Rahmen mit abgerundeten Ecken haben.
```

Das obige Ergebnis erfüllt beide Punkte bereits (`border`, `border-radius` in der `ul`-Regel).

## Schritt 5: Vergleich

Keine feste Loesung - typischer Unterschied: ein Prompt ohne genanntes Format erzeugt haeufig ein
Ergebnis mit externem CSS-Framework (z. B. Bootstrap-Link), waehrend die explizite Formulierung
"kein externes CSS" ein in sich geschlossenes Ergebnis liefert.

## Zusatzaufgabe

```text
Passe das Farbschema an: warme Toene (Beige/Braun/Orange), passend zu einer Baeckerei.
```

Ergänzt z. B. `background: #fdf6ec;` am `body` und `background: #e8b26a;` am Button - Struktur der
Datei bleibt unveraendert, nur CSS-Werte passen sich an.
