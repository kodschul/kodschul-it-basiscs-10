# Modul 6: Datenschutz & IT-Sicherheit Grundlagen

## Lab 6.3 - Phishing erkennen & Cloud-Backup

---

**Ziel:** Phishing-Merkmale in einer E-Mail erkennen und ein Backup mit
OneDrive/SharePoint einordnen.

- Phishing nutzt Dringlichkeit, Autorität oder Neugier, um zum Klicken oder Preisgeben von Daten zu verleiten.
- Kleine Auffälligkeiten (Absenderadresse, Link-Ziel, Rechtschreibung) verraten die meisten Phishing-Mails.
- Ein Cloud-Backup (OneDrive/SharePoint) ergänzt lokale Sicherung um einen ortsunabhängigen Wiederherstellungspunkt.

<details><summary>Woran erkennt man eine Phishing-Mail?</summary>

An einer Absenderadresse, die nur ähnlich aussieht wie die echte, an Druck ("sofort handeln"), an einem Link, dessen Ziel-URL nicht zur angezeigten Domain passt, und an ungewöhnlicher Sprache oder Rechtschreibfehlern.

</details>

<details><summary>Warum reicht Misstrauen allein nicht als Schutz?</summary>

Manche Phishing-Mails sind sehr gut gemacht und kaum von echten Nachrichten zu unterscheiden. Technische Schutzmaßnahmen (Spamfilter, MFA, Linkprüfung) fangen einen Teil ab, den Menschen allein übersehen würden.

</details>

<details><summary>Was sichert ein Cloud-Backup zusätzlich zu einer lokalen Sicherung?</summary>

Ein Cloud-Backup bleibt erreichbar, selbst wenn der lokale Rechner oder Datenträger verloren geht, beschädigt wird oder gestohlen wird - die Kopie liegt an einem anderen Ort.

</details>

## Merkmale einer Phishing-Mail

| Merkmal         | Beispiel                                                                      |
| --------------- | ----------------------------------------------------------------------------- |
| Absenderadresse | `support@baeckerei-kunden.info` statt `support@baeckerei.de`                  |
| Dringlichkeit   | "Ihr Konto wird in 24 Stunden gesperrt"                                       |
| Link-Ziel       | angezeigter Text "Jetzt anmelden", tatsächliches Link-Ziel eine fremde Domain |
| Anrede          | "Sehr geehrter Kunde" statt des echten Namens                                 |

![Symbolbild E-Mail und Warnzeichen](https://loremflickr.com/640/360/email,warning)

## Fazit

- Phishing zielt auf Menschen, nicht auf eine technische Lücke.
- Absenderadresse, Link-Ziel und Dringlichkeit sind die drei wichtigsten Prüfpunkte.
- Ein Cloud-Backup ergänzt lokale Sicherung um Ortsunabhängigkeit.

Weiter geht es mit der Übung `l03-phishing-und-cloud-backup-exc.md` (Lösung: `l03-phishing-und-cloud-backup-sol.md`).
