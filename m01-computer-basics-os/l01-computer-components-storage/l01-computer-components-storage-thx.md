# Modul 1: Bausteine eines Computersystems & Betriebssysteme

## Lab 1.1 – Bauteile eines Computers & Speicherarten

---

**Ziel:** CPU, RAM, Mainboard, Netzteil und Storage unterscheiden sowie
begrunden, welches Bauteil zu einem einfachen Fehlerbild passt.

Ein Rechner braucht Strom, Verbindung, Rechenleistung, Arbeitsspeicher und
dauerhaften Speicher. Die Komponenten unten decken diese Aufgaben ab.

<details>
<summary>Welche Bauteile braucht ein Computer mindestens, um zu funktionieren?</summary>

CPU (rechnet), RAM (kurzfristiger Arbeitsspeicher), Mainboard (verbindet
alles), Netzteil (liefert Strom) und Storage/SSD (speichert dauerhaft). Ohne
eines dieser fünf läuft kein PC.

</details>

<details>
<summary>Warum reicht nicht ein einziger Speichertyp für alles?</summary>

Schneller Speicher (RAM) ist teuer und verliert seinen Inhalt beim
Ausschalten; langsamer Speicher (SSD/HDD) ist günstiger und behält den
Inhalt dauerhaft. Ein Computer braucht beides für unterschiedliche Aufgaben.

</details>

<details>
<summary>Was passiert, wenn der RAM voll ist?</summary>

Das Betriebssystem muss Daten auslagern oder Programme schließen; alles wird
spürbar langsamer, weil der langsamere Ersatzspeicher (z. B. Auslagerungsdatei
auf der SSD) einspringen muss.

</details>

---

## Die fünf Kernbauteile

<table>
	<tr>
		<td><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Intel_i9-14900KF_CPU.jpg?width=320" alt="CPU oder Prozessor" /><br /><strong>CPU</strong></td>
		<td><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Swissbit_2GB_PC2-5300U-555.jpg?width=320" alt="RAM-Arbeitsspeicher" /><br /><strong>RAM</strong></td>
		<td><img src="https://commons.wikimedia.org/wiki/Special:FilePath/MicroATX_Motherboard_with_AMD_Athlon_Processor_2_Digon3.jpg?width=320" alt="Mainboard" /><br /><strong>Mainboard</strong></td>
		<td><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Thermaltake_TR2-430NW.jpg?width=320" alt="PC-Netzteil" /><br /><strong>Netzteil</strong></td>
		<td><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_SSD_840_120GB_MZ-7TD120--4_LID_REMOVED.JPG?width=320" alt="SSD-Speicher" /><br /><strong>SSD</strong></td>
	</tr>
</table>

| Bauteil               | Definition                        | Aufgabe                                      | Alltagsvergleich             |
| --------------------- | --------------------------------- | -------------------------------------------- | ---------------------------- |
| CPU (Prozessor)       | Recheneinheit des Computers       | führt Befehle und Berechnungen aus           | Gehirn                       |
| RAM (Arbeitsspeicher) | schneller, kurzfristiger Speicher | hält aktuelle Daten bereit                   | Schreibtisch                 |
| Mainboard             | zentrale Platine                  | verbindet die Bauteile                       | Verkabelung                  |
| Netzteil              | Stromversorgung                   | wandelt Steckdosenstrom in nutzbare Spannung | Stromversorgung eines Hauses |
| Storage               | dauerhafter Datenspeicher         | behält Dateien ohne Strom                    | Aktenschrank                 |

CPU rechnet, RAM hält aktuelle Daten bereit, das Mainboard verbindet, das
Netzteil versorgt und Storage bewahrt Daten nach dem Ausschalten.

---

## Speicherarten im Wasser-Eimer-Modell

Ein kleiner, schneller Eimer in direkter Reichweite (RAM) lässt sich sofort
befüllen und leeren, fasst aber wenig. Ein großer Eimer im Keller (HDD/SSD)
fasst viel mehr, ist aber langsamer zu erreichen.

| Speicherart | Definition                                                | Geschwindigkeit | Inhalt bleibt ohne Strom? | Typische Grösse |
| ----------- | --------------------------------------------------------- | --------------- | ------------------------- | --------------- |
| RAM         | Arbeitsspeicher für aktuelle Programme                    | sehr schnell    | Nein                      | 8-32 GB         |
| ROM         | meist nicht veränderbarer Speicher für Startinformationen | schnell         | Ja                        | wenige MB       |
| SSD         | elektronischer Speicher ohne bewegliche Teile             | schnell         | Ja                        | 256 GB-2 TB     |
| HDD         | magnetischer Speicher mit beweglichen Teilen              | langsamer       | Ja                        | 1-8 TB          |

- RAM ersetzt keinen Storage: Sein Inhalt geht beim Ausschalten verloren.
- ROM enthält meist kleine, feste Startinformationen und ersetzt keine SSD.
- **GB (Gigabyte):** Einheit für Datenmenge und Speicherkapazität.
- **TB (Terabyte):** vereinfacht etwa tausend GB.

## Fazit

- CPU, RAM, Mainboard, Netzteil und SSD haben klar getrennte Aufgaben.
- RAM ist schnell und kurzfristig; SSD und HDD speichern dauerhaft.
- Geschwindigkeit, Kapazität und Dauerhaftigkeit sind unterschiedliche Eigenschaften.
