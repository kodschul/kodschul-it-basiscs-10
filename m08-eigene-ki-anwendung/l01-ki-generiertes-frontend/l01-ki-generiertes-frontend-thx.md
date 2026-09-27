# Modul 8: Eigene KI-Anwendung entwickeln

## Lab 8.1 - KI-generiertes Frontend für die Bäckerei-Todo-App

---

**Ziel:** Mit einem gezielten KI-Prompt ein einfaches HTML/CSS-Grundgerüst für eine
Bestell-/Todo-Liste erzeugen lassen und im Browser prüfen.

- Frontend-Entwicklung ist bewusst kein Kursziel - die KI übernimmt das HTML/CSS-Grundgerüst nach
  Beschreibung.
- Ein guter Prompt nennt Kontext, gewünschte Elemente und das gewünschte Ergebnis - nicht nur ein
  Stichwort.
- Das erzeugte Ergebnis wird direkt im Browser geprüft, bevor es weiterverwendet wird.

<details><summary>Warum übernimmt hier die KI das Frontend?</summary>

Der Kurs konzentriert sich auf Programmier-Grundlagen und KI-Einsatz, nicht auf HTML/CSS-Design -
die KI liefert ein brauchbares Grundgerüst, ohne dass Frontend-Techniken einzeln gelernt werden
müssen.

</details>

<details><summary>Was macht einen guten Prompt für ein UI-Grundgerüst aus?</summary>

Kontext (wofür ist die Seite gedacht), konkrete Elemente (welche Eingabefelder, welche Liste),
gewünschtes Format (reines HTML/CSS, keine externen Bibliotheken) und ein Beispiel für den
erwarteten Inhalt.

</details>

<details><summary>Woran erkennt man, ob das Ergebnis brauchbar ist?</summary>

Die Seite lädt fehlerfrei im Browser, zeigt alle angeforderten Elemente (Formular, Liste) und lässt
sich ohne zusätzliche Bibliotheken direkt öffnen.

</details>

## Prompt-Bestandteile

| Bestandteil | Beispiel                                                           |
| ----------- | ------------------------------------------------------------------ |
| Kontext     | "Todo-Liste für Bestellungen einer Bäckerei"                       |
| Elemente    | Formular mit Feldern Produkt/Menge, darunter eine Liste            |
| Format      | "nur HTML und CSS in einer Datei, kein JavaScript-Framework"       |
| Beispiel    | ein Beispieleintrag ("Roggenbrot, Menge 10") zur Veranschaulichung |

```text
Erstelle eine einzelne HTML-Datei mit eingebettetem CSS für eine Bestell-Todo-Liste
einer Baeckerei. Oben ein Formular mit Feldern "Produkt" und "Menge" und einem Button
"Hinzufuegen". Darunter eine Liste, die vorerst einen Beispieleintrag zeigt
("Roggenbrot - Menge 10"). Kein JavaScript-Framework, kein externes CSS, nur eine
Datei index.html.
```

Das erzeugte Grundgerüst (Ausschnitt):

```html
<form>
  <input name="produkt" placeholder="Produkt" />
  <input name="menge" placeholder="Menge" />
  <button type="submit">Hinzufügen</button>
</form>
<ul id="bestellliste">
  <li>Roggenbrot - Menge 10</li>
</ul>
```

> **Merksatz:** Das Formular sendet noch nirgendwohin - erst Lab 8.2/8.3 verbinden es mit einem
> echten Backend.

## Fazit

- Ein Prompt mit Kontext, Elementen, Format und Beispiel liefert ein brauchbares HTML-Grundgerüst.
- Das Ergebnis wird direkt im Browser geprüft, nicht blind übernommen.
- Das Formular ist an dieser Stelle bewusst noch ohne Funktion - die Anbindung folgt in Lab 8.2/8.3.

Weiter geht es mit der Übung `l01-ki-generiertes-frontend-exc.md` (Lösung:
`l01-ki-generiertes-frontend-sol.md`).
