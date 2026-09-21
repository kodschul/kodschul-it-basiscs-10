// Nexus prototype — modules/virtualization.js
// Maps to output/m05-virtualization-ms-cloud (Day 5, covered CONCEPTUALLY — Nexus focuses on
// Day 1-3 hands-on; VirtualBox/Hyper-V/Azure/M365 itself is done live in the real course
// environment). Lab 5.1 starts a local test-VM, Lab 5.2 snapshots/restores it, Lab 5.3 tours
// Azure/M365 admin basics.

const VirtualizationModule = {
  id: "virtualization",
  title: "Virtualisierung & Cloud",
  day: "Tag 5 · Modul 5",

  clouds: [
    {
      id: "vm",
      label: "VM in der Cloud",
      text: "Ein virtueller Rechner, der bei Azure statt im Kursraum läuft — gleiche Idee wie Lab 5.1, nur beim Anbieter.",
    },
    {
      id: "admin",
      label: "M365 Admin Center",
      text: "Zentrale Verwaltung von Nutzerkonten, Lizenzen und Zugriffsrechten für die ganze Bäckerei-Belegschaft.",
    },
    {
      id: "backup",
      label: "Cloud-Backup",
      text: "Automatische Sicherung von Daten in der Cloud — gleiches Prinzip wie ein VM-Snapshot, aber für Dateien.",
    },
  ],

  render(container) {
    this.snapshotTaken = false;
    this.broken = false;

    StationWizard.mount(container, this, {
      missionLabel: "🧠 Konzept · Modul 5",
      missionText:
        "Live läuft das in VirtualBox/Hyper-V und Azure/M365 — hier geht es nur ums Verständnis: was ist eine VM, und was macht die Cloud damit?",
      stations: [
        {
          label: "Host vs. VM",
          render: (c, s, i) => this.renderHostVm(c, s, i),
        },
        {
          label: "Snapshot & Restore",
          render: (c, s, i) => this.renderSnapshot(c, s, i),
        },
        {
          label: "Azure/M365 Übersicht",
          render: (c, s, i) => this.renderCloudTour(c, s, i),
        },
        {
          label: "Checkpoint",
          render: (c, s, i) => this.renderCheckpoint(c, s, i),
        },
      ],
    });
  },

  maybeMarkDone(container, idx) {
    StationWizard.markDone(container, this, idx);
  },

  renderHostVm(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Explore — Host und VM sind getrennte Rechner</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf den Host oder die VM, um zu sehen, was jeweils dazugehört.</p>
      <div class="flex items-center justify-center gap-6">
        <button id="vm-host" class="p-4 rounded border-2 border-slate-700 bg-slate-800 text-sm w-40 hover:border-sky-500">🖥️ Host-Rechner<br/><span class="text-xs text-slate-500">der echte Kursrechner</span></button>
        <div class="text-slate-600">enthält →</div>
        <button id="vm-guest" class="p-4 rounded border-2 border-slate-700 bg-slate-800 text-sm w-40 hover:border-sky-500">📦 VM (Gast)<br/><span class="text-xs text-slate-500">eigenes Betriebssystem</span></button>
      </div>
      <div id="vm-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;
    const info = stage.querySelector("#vm-info");
    stage.querySelector("#vm-host").addEventListener("click", () => {
      info.textContent =
        "Der Host stellt CPU, RAM und Festplatte für die VM bereit — genug davon muss frei bleiben, sonst wird beides langsam.";
      this.maybeMarkDone(container, idx);
    });
    stage.querySelector("#vm-guest").addEventListener("click", () => {
      info.textContent =
        "Die VM verhält sich wie ein eigener Computer mit eigenem Betriebssystem — ein Absturz in der VM betrifft den Host normalerweise nicht.";
      this.maybeMarkDone(container, idx);
    });
  },

  renderSnapshot(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Playground — Snapshot &amp; Restore</h2>
      <p class="text-slate-400 text-sm mb-4">Erzeuge einen Snapshot, "zerstöre" danach etwas in der VM und stelle den Snapshot wieder her.</p>
      <div class="flex gap-2 mb-4">
        <button id="vm-snap" class="px-3 py-2 rounded border border-sky-700 text-sky-300 text-sm hover:bg-sky-950">📸 Snapshot erstellen</button>
        <button id="vm-break" class="px-3 py-2 rounded border border-red-700 text-red-300 text-sm hover:bg-red-950">💥 Etwas kaputt machen</button>
        <button id="vm-restore" class="px-3 py-2 rounded border border-emerald-700 text-emerald-300 text-sm hover:bg-emerald-950">↺ Snapshot zurückspielen</button>
      </div>
      <div id="vm-status" class="p-3 rounded bg-slate-800 text-sm min-h-[2rem]"></div>
    `;
    const status = stage.querySelector("#vm-status");
    const render = () => {
      if (this.broken) {
        status.innerHTML = `<span class="text-red-400">⚠️ Die VM ist kaputt — ein wichtiges Programm wurde gelöscht.</span>`;
      } else if (this.snapshotTaken) {
        status.innerHTML = `<span class="text-emerald-400">Snapshot vorhanden — der aktuelle Zustand kann jederzeit wiederhergestellt werden.</span>`;
      } else {
        status.innerHTML = `<span class="text-slate-400">Kein Snapshot vorhanden.</span>`;
      }
    };
    stage.querySelector("#vm-snap").addEventListener("click", () => {
      this.snapshotTaken = true;
      this.broken = false;
      render();
      this.maybeMarkDone(container, idx);
    });
    stage.querySelector("#vm-break").addEventListener("click", () => {
      this.broken = true;
      render();
    });
    stage.querySelector("#vm-restore").addEventListener("click", () => {
      if (!this.snapshotTaken) {
        status.innerHTML = `<span class="text-red-400">Kein Snapshot vorhanden — erst einen erstellen.</span>`;
        return;
      }
      this.broken = false;
      status.innerHTML = `<span class="text-emerald-400">✓ VM auf den Snapshot-Zustand zurückgesetzt — alles wieder wie vorher.</span>`;
      this.maybeMarkDone(container, idx);
    });
    render();
  },

  renderCloudTour(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Explore — Azure &amp; M365 auf einen Blick</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke jede Karte an, um eine kurze Erklärung zu sehen.</p>
      <div id="cloud-cards" class="grid grid-cols-3 gap-3"></div>
      <div id="cloud-tour-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;
    const cards = stage.querySelector("#cloud-cards");
    const info = stage.querySelector("#cloud-tour-info");
    cards.innerHTML = this.clouds
      .map(
        (c) =>
          `<button data-id="${c.id}" class="level-card p-3 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm text-left">${c.label}</button>`
      )
      .join("");
    cards.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = this.clouds.find((x) => x.id === btn.dataset.id);
        info.textContent = c.text;
        this.maybeMarkDone(container, idx);
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🏁 Checkpoint — Virtualisierung &amp; Cloud verstanden</h2>
      <p class="text-slate-400 text-sm mb-4">
        Eine VM ist ein eigener Rechner im Rechner, ein Snapshot ist ihr Rücksetzpunkt, und Azure/M365 bieten
        genau diese Bausteine (VM, Backup, Nutzerverwaltung) fertig in der Cloud an.
        Live geübt wird das in VirtualBox/Hyper-V und im Azure/M365-Portal direkt im Kurs.
      </p>
      <button id="vm-checkpoint-btn" class="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-sm">✓ Checkpoint abschließen</button>
      <div id="vm-checkpoint-result" class="mt-3 text-sm"></div>
    `;
    stage.querySelector("#vm-checkpoint-btn").addEventListener("click", () => {
      stage.querySelector(
        "#vm-checkpoint-result"
      ).innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — Virtualisierung &amp; Cloud verstanden.</span>`;
      Progress.complete("virtualization");
      App.refreshNav();
      this.maybeMarkDone(container, idx);
    });
  },
};
