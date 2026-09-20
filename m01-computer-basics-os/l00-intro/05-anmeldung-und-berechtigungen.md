# Anmeldung, Authentifizierung und Berechtigung

## Leitfragen

<details><summary>Was ist der Unterschied zwischen Authentifizierung und Berechtigung?</summary>

Authentifizierung prüft, wer sich anmeldet. Berechtigung bestimmt, welche
Aktionen dieses Konto danach ausführen darf.

</details>

<details><summary>Warum schützt MFA zusätzlich zum Passwort?</summary>

MFA verlangt einen weiteren Nachweis. Ein gestohlenes Passwort allein reicht
dann normalerweise nicht für die Anmeldung.

</details>

| Begriff           | Definition                                                    | Beispiel                                        |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| Konto             | digitale Identität für einen Dienst                           | M365-Benutzerkonto                              |
| Anmeldung         | Vorgang, mit dem ein Konto verwendet wird                     | Name und Passwort eingeben                      |
| Authentifizierung | Prüfung, wer sich anmeldet                                    | Passwort, App-Bestätigung, Sicherheitsschlüssel |
| Berechtigung      | Regel, was ein Konto tun darf                                 | Datei lesen, Datei ändern, Nutzer verwalten     |
| MFA               | Multi-Faktor-Authentifizierung mit mindestens zwei Nachweisen | Passwort plus Bestätigung in einer App          |

![Sicherheitsschlüssel für die Multi-Faktor-Authentifizierung](https://commons.wikimedia.org/wiki/Special:FilePath/Black_YubiKey_06.jpg?width=640)

## Häufige Irrtümer

| Irrtum                               | Einordnung                                                                |
| ------------------------------------ | ------------------------------------------------------------------------- |
| "Ein Passwort reicht immer."         | Falsch: MFA schützt zusätzlich bei gestohlenem Passwort.                  |
| "Angemeldet bedeutet alles erlaubt." | Falsch: Berechtigungen begrenzen erlaubte Aktionen.                       |
| "Ein Konto ist eine Person."         | Nicht immer: Auch Dienste und Anwendungen können eigene Konten verwenden. |

- Dieses Thema wird in Modul 5 und Modul 6 praktisch vertieft.
- Zugangsdaten gehören nie in Kursdateien, Chats oder Screenshots.
