# Modul 6: Datenschutz & IT-Sicherheit Grundlagen

## Lab 6.2 - Passwörter, Passwort-Manager & Dateischutz

---

**Ziel:** Sichere Passwörter von unsicheren unterscheiden, einen Passwort-Manager
einordnen und eine Datei mit einem Passwort schützen.

- Microsoft-Sicherheitsfeatures (MFA, Conditional Access, Defender) schützen den Zugang zusätzlich zum Passwort.
- Ein starkes Passwort allein schützt den Zugang nicht vollständig - Social Engineering umgeht es.
- Ein Passwort-Manager merkt sich viele starke Passwörter, damit niemand ein einziges Passwort mehrfach verwendet.
- Eine ZIP-Archivierung mit Passwort schützt eine einzelne Datei zusätzlich zu Ordnerrechten.

<details><summary>Warum reicht ein starkes Passwort allein nicht?</summary>

Ein starkes Passwort verhindert Erraten, schützt aber nicht vor Phishing, Weitergabe oder einem mitgelesenen Login. Multi-Faktor-Authentifizierung (MFA) verlangt einen zweiten Nachweis, selbst wenn das Passwort bekannt wird.

</details>

<details><summary>Was macht ein Passwort-Manager?</summary>

Er erzeugt und speichert lange, zufällige Passwörter pro Dienst, sodass ein einzelnes gestohlenes Passwort nicht automatisch weitere Konten öffnet. Nur ein Master-Passwort muss gemerkt werden.

</details>

<details><summary>Was bedeutet Social Engineering?</summary>

Der Angriff zielt auf den Menschen statt auf die Technik: Eine Person wird durch Vortäuschen von Dringlichkeit oder Vertrauen dazu gebracht, Zugangsdaten preiszugeben oder eine schädliche Datei zu öffnen.

</details>

## Microsoft Security Features im Überblick

| Feature            | Wirkung                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| MFA (Multi-Faktor) | zweiter Nachweis zusätzlich zum Passwort, z. B. Code auf dem Smartphone |
| Conditional Access | Zugriff nur unter bestimmten Bedingungen erlaubt (Ort, Gerät, Risiko)   |
| Microsoft Defender | erkennt und blockiert Schadsoftware und verdächtige Aktivität           |

## Passwort-Checkliste

- Mindestens 12 Zeichen, keine echten Wörter allein.
- Für jeden Dienst ein eigenes Passwort.
- MFA aktivieren, wo verfügbar.
- Passwort niemals per E-Mail oder Chat weitergeben.

![Passwort und Schloss Symbolbild](https://loremflickr.com/640/360/password,security)

## Fazit

- MFA ergänzt ein Passwort um einen zweiten, unabhängigen Nachweis.
- Ein Passwort-Manager verhindert Mehrfachnutzung eines einzigen Passworts.
- Eine ZIP-Archivierung mit Passwort schützt eine einzelne Datei zusätzlich zu Dateirechten.

Weiter geht es mit der Übung `l02-passwoerter-und-dateischutz-exc.md` (Lösung: `l02-passwoerter-und-dateischutz-sol.md`).
