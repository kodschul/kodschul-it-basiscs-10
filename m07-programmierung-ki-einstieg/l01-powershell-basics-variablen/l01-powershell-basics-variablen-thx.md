# Modul 7: Einstieg in Programmierung & KI

## Lab 7.1 - PowerShell-Basics: Ausgeben, Variablen & Eingaben

---

**Ziel:** Ein PowerShell-Skript mit `Write-Host` ausgeben, mit Variablen
rechnen und mit `Read-Host` eine Eingabe entgegennehmen.

- Ein Programm ist eine Schritt-fuer-Schritt-Anleitung, so wie ein Kochrezept.
- `Write-Host` gibt Text auf dem Bildschirm aus - der einfachste sichtbare Programmschritt.
- Eine Variable speichert einen Wert unter einem Namen und kann diesen Wert spaeter wiederverwenden.
- `Read-Host` nimmt eine Eingabe entgegen, damit ein Skript auf die Person reagieren kann, die es ausfuehrt.

<details><summary>Was ist ein Programm eigentlich?</summary>

Ein Programm ist eine Abfolge von Anweisungen, die der Computer Schritt fuer Schritt genau so ausfuehrt, wie sie geschrieben wurden - wie ein Rezept, das exakt befolgt wird.

</details>

<details><summary>Was ist eine Variable?</summary>

Eine Variable ist ein benannter Speicherplatz fuer einen Wert, zum Beispiel eine Zahl oder einen Text. `$name = "Anna"` speichert den Text `Anna` unter dem Namen `$name`.

</details>

<details><summary>Was macht `Read-Host` anders als `Write-Host`?</summary>

`Write-Host` gibt etwas aus, `Read-Host` nimmt etwas entgegen. Ein Skript mit `Read-Host` wartet, bis eine Person etwas eintippt und Enter drueckt, und kann diese Eingabe danach weiterverwenden.

</details>

## Die ersten Befehle

| Befehl                       | Wirkung                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `Write-Host "Hallo Welt"`    | gibt den Text `Hallo Welt` aus                          |
| `$a = 5`                     | speichert die Zahl 5 in der Variable `$a`               |
| `$a + $b`                    | addiert zwei Variablen                                  |
| `Read-Host "Wie heisst du?"` | fragt eine Eingabe ab und zeigt dabei einen Hinweistext |

```powershell
$name = Read-Host "Wie heisst du?"
Write-Host "Hallo $name!"
```

![Terminal mit Codezeilen](https://loremflickr.com/640/360/terminal,code)

## Fazit

- `Write-Host` zeigt Text, `Read-Host` nimmt Text entgegen.
- Eine Variable merkt sich einen Wert unter einem Namen fuer die weitere Verwendung im Skript.
- Ein Tippfehler im Befehlsnamen ist die haeufigste erste Fehlerquelle - die Fehlermeldung nennt meist die betroffene Zeile.

Weiter geht es mit der Übung `l01-powershell-basics-variablen-exc.md` (Lösung: `l01-powershell-basics-variablen-sol.md`).
