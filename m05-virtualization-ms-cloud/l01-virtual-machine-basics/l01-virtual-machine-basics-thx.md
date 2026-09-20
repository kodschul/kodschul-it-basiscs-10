# Modul 5: Virtualisierung & Cloud im Microsoft-Umfeld

## Lab 5.1 - Einen virtuellen Testcomputer verstehen

---

**Ziel:** Zeigen, warum ein virtueller Computer fuer gefahrloses Testen genutzt wird.

- Ein echter Kursrechner und ein virtueller Bildschirm werden verglichen.
- Eine VM entsteht einmal sichtbar vor der Gruppe.
- Danach legt jede Gruppe eine vorbereitete Test-VM an.

<details><summary>Was ist eine virtuelle Maschine?</summary>

Eine VM ist ein softwarebasierter Computer mit virtuellem Prozessor, Arbeitsspeicher, Festplatte und Betriebssystem.

</details>

<details><summary>Warum ist eine VM fuer Tests sinnvoll?</summary>

Aenderungen bleiben von dem eigentlichen Kursrechner getrennt. Die VM kann bei Problemen zurueckgesetzt oder neu erstellt werden.

</details>

## Echter und virtueller Computer

![Laptop mit virtualisiertem Arbeitsplatz](https://commons.wikimedia.org/wiki/Special:FilePath/Macbook_Air.jpg?width=640)

| Teil             | Physischer Computer        | VM                                 |
| ---------------- | -------------------------- | ---------------------------------- |
| Hardware         | real im Geraet             | vom Host bereitgestellt            |
| Betriebssystem   | direkt installiert         | als Gastbetriebssystem             |
| Risiko beim Test | kann den Rechner betreffen | bleibt in der VM begrenzt          |
| Start            | Einschalten                | in VirtualBox oder Hyper-V starten |

```mermaid
flowchart LR
    H[Host-Rechner] --> V[Virtualisierungssoftware]
    V --> G[VM mit Gastbetriebssystem]
```

- Eine VM nutzt Ressourcen des Host-Rechners und braucht genug RAM und Speicher.
- Eine VM ist kein Backup. Sie kann aber mit einem Snapshot in einen frueheren Zustand zurueck.

## Fazit

- Eine VM ist ein Computer in Software, nicht nur ein Fenster.
- Sie trennt Tests vom Host-Rechner.
- CPU, RAM und Speicher werden bei der VM-Erstellung bewusst vergeben.

Weiter geht es mit der Uebung `l01-virtual-machine-basics-exc.md` (Loesung: `l01-virtual-machine-basics-sol.md`).
