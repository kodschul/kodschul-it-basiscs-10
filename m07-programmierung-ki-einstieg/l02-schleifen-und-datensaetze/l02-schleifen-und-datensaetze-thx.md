# Modul 7: Programmieren mit PowerShell und Python

## Lab 7.2 - Schleifen und Datensätze

---

**Ziel:** Mit einer Schleife eine Liste von Bäckerei-Bestellungen durchgehen, dabei Werte
ausgeben und zusammenrechnen - in PowerShell und Python.

- Eine Schleife wiederholt einen Codeblock, statt ihn fuer jeden Fall einzeln zu schreiben.
- Eine `for`-Schleife laeuft ueber eine bekannte Liste, eine `while`-Schleife laeuft, solange eine
  Bedingung wahr ist.
- Eine Liste (PowerShell `@(...)`, Python `[...]`) fasst mehrere Werte unter einem Namen zusammen.

<details><summary>Was ist eine Schleife?</summary>

Eine Schleife fuehrt denselben Codeblock mehrfach aus, ohne ihn mehrfach hinzuschreiben - z. B.
einmal pro Eintrag einer Liste.

</details>

<details><summary>Wann `for`, wann `while`?</summary>

`for` passt, wenn die Anzahl der Durchlaeufe von vornherein feststeht (z. B. eine Liste mit 5
Bestellungen). `while` passt, wenn erst zur Laufzeit klar wird, wie lange weitergemacht wird (z. B.
"bis die Person `fertig` eingibt").

</details>

<details><summary>Was ist eine Liste/ein Array?</summary>

Eine Liste speichert mehrere Werte unter einem Namen in fester Reihenfolge, z. B. mehrere
Bestellmengen - einzelne Werte werden ueber ihre Position angesprochen.

</details>

## Schleifen im Vergleich

| Aufgabe            | PowerShell                        | Python                     |
| ------------------ | --------------------------------- | -------------------------- |
| Liste anlegen      | `$mengen = @(10, 25, 5, 40)`      | `mengen = [10, 25, 5, 40]` |
| Ueber Liste laufen | `foreach ($m in $mengen) { ... }` | `for m in mengen: ...`     |
| Solange-Schleife   | `while ($weiter) { ... }`         | `while weiter: ...`        |

```powershell
$mengen = @(10, 25, 5, 40)
$summe = 0
foreach ($m in $mengen) {
    Write-Host "Bestellmenge: $m"
    $summe += $m
}
Write-Host "Gesamtmenge: $summe"
```

```python
mengen = [10, 25, 5, 40]
summe = 0
for m in mengen:
    print(f"Bestellmenge: {m}")
    summe += m
print(f"Gesamtmenge: {summe}")
```

## Fazit

- Eine Schleife spart wiederholten Code - eine Liste liefert ihr die Werte zum Durchgehen.
- `for`/`foreach` passt zu einer bekannten Liste, `while` passt zu einer offenen Anzahl an
  Durchlaeufen.
- Eine laufende Summe braucht eine Variable, die vor der Schleife startet und in der Schleife
  aktualisiert wird.

Weiter geht es mit der Übung `l02-schleifen-und-datensaetze-exc.md` (Lösung:
`l02-schleifen-und-datensaetze-sol.md`).
