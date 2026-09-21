// Nexus prototype — modules/computer.js
// Maps to approved_agenda.md Modul 1 Praxis: "Komponenten auf Bildkarten zuordnen" +
// "Wasser-Eimer-Modell" zur Erklärung von RAM vs. HDD.
// v4: station-wizard layout (one screen at a time, skippable, pill nav with checkmarks)
// + real, verified Wikimedia Commons photos per component (stable Special:FilePath URLs,
// public domain / CC-licensed) instead of drawn icons + drag-and-drop PC assembly for "Build".

const ComputerPhotos = {
  cpu: "https://commons.wikimedia.org/wiki/Special:FilePath/Intel_i9-14900KF_CPU.jpg?width=160",
  ram: "https://commons.wikimedia.org/wiki/Special:FilePath/Swissbit_2GB_PC2-5300U-555.jpg?width=160",
  ssd: "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_SSD_840_120GB_MZ-7TD120--4_LID_REMOVED.JPG?width=160",
  gpu: "https://commons.wikimedia.org/wiki/Special:FilePath/SAPPHIRE_Radeon_HD_7970.jpg?width=160",
  mainboard:
    "https://commons.wikimedia.org/wiki/Special:FilePath/MicroATX_Motherboard_with_AMD_Athlon_Processor_2_Digon3.jpg?width=160",
  psu: "https://commons.wikimedia.org/wiki/Special:FilePath/Thermaltake_TR2-430NW.jpg?width=160",
  cooling:
    "https://commons.wikimedia.org/wiki/Special:FilePath/AMD_heatsink_and_fan.jpg?width=160",
};

function componentPhoto(id, sizeClasses) {
  return `<img src="${ComputerPhotos[id]}" alt="${id}" loading="lazy" class="${sizeClasses} object-cover rounded" />`;
}

const ComputerModule = {
  id: "computer",
  title: "Der Computer",
  day: "Tag 1 · Modul 1",

  components: [
    {
      id: "cpu",
      label: "CPU",
      required: true,
      what: "Der Prozessor führt Befehle aus — das 'Gehirn' des Rechners.",
      does: [
        "führt Berechnungen aus",
        "verarbeitet Programmbefehle",
        "koordiniert alle anderen Bauteile",
      ],
      example:
        "Chrome + Spotify + Word laufen gleichzeitig → alle schicken Befehle an die CPU.",
    },
    {
      id: "ram",
      label: "RAM",
      required: true,
      what: "Kurzfristiger Arbeitsspeicher: sehr schnell, aber leer sobald der Strom weg ist.",
      does: [
        "hält gerade laufende Programme bereit",
        "ermöglicht schnellen Zugriff für die CPU",
        "wird beim Ausschalten geleert",
      ],
      example: "Jeder offene Tab in Chrome belegt ein Stück RAM.",
    },
    {
      id: "ssd",
      label: "SSD",
      required: false,
      what: "Dauerhafter Speicher: langsamer als RAM, aber bleibt auch ohne Strom erhalten.",
      does: [
        "speichert Dateien und das Betriebssystem dauerhaft",
        "lädt Programme beim Start",
        "kein Datenverlust bei Stromausfall",
      ],
      example:
        "Deine Fotos, Dokumente und installierten Programme liegen hier.",
    },
    {
      id: "gpu",
      label: "GPU",
      required: false,
      what: "Spezialisiert auf Bildberechnung — Grafik, Videos, Spiele, KI-Training.",
      does: [
        "berechnet Bilder/Pixel parallel",
        "entlastet die CPU bei Grafik-Aufgaben",
        "optional für reine Büro-PCs",
      ],
      example: "Ein Spiel in hoher Auflösung braucht eine leistungsfähige GPU.",
    },
    {
      id: "mainboard",
      label: "Mainboard",
      required: true,
      what: "Verbindet alle Komponenten miteinander — das 'Nervensystem' des PCs.",
      does: [
        "verbindet CPU, RAM, Storage, GPU",
        "leitet Strom und Daten weiter",
        "bestimmt, welche Bauteile kompatibel sind",
      ],
      example: "Ohne Mainboard kann kein Bauteil mit einem anderen sprechen.",
    },
    {
      id: "psu",
      label: "Netzteil",
      required: true,
      what: "Versorgt alle Komponenten mit der richtigen Menge Strom.",
      does: [
        "wandelt Netzstrom in nutzbare Spannungen um",
        "versorgt Mainboard, CPU, Laufwerke, GPU",
      ],
      example:
        "Ohne Netzteil bleibt der Bildschirm komplett schwarz — nichts bekommt Strom.",
    },
    {
      id: "cooling",
      label: "Kühlung",
      required: false,
      what: "Hält CPU/GPU auf einer sicheren Temperatur.",
      does: [
        "führt Abwärme ab",
        "verhindert Leistungsdrosselung (Throttling)",
        "verhindert Abschalten bei Überhitzung",
      ],
      example:
        "Unter Volllast ohne Kühlung schaltet sich ein PC zum Selbstschutz ab.",
    },
  ],

  requirements: [
    { id: "boot", label: "muss starten (booten)" },
    { id: "os", label: "muss Windows/Linux ausführen" },
    { id: "files", label: "muss Dateien speichern" },
    { id: "browser", label: "muss einen Browser öffnen können" },
  ],

  buildState: {},
  electricState: {},
  current: 0,
  stationsDone: null,

  stations: [
    {
      label: "Explore",
      render: (c, s, i) => ComputerModule.renderExplore(c, s, i),
    },
    {
      label: "Build",
      render: (c, s, i) => ComputerModule.renderBuild(c, s, i),
    },
    {
      label: "Power-On",
      render: (c, s, i) => ComputerModule.renderPowerSequence(c, s, i),
    },
    {
      label: "CPU-Sim",
      render: (c, s, i) => ComputerModule.renderCpuSimulator(c, s, i),
    },
    {
      label: "RAM-Sim",
      render: (c, s, i) => ComputerModule.renderRamSimulator(c, s, i),
    },
    {
      label: "Storage",
      render: (c, s, i) => ComputerModule.renderStorageLab(c, s, i),
    },
    {
      label: "Mainboard",
      render: (c, s, i) => ComputerModule.renderMainboardExplorer(c, s, i),
    },
    {
      label: "Strom",
      render: (c, s, i) => ComputerModule.renderElectricity(c, s, i),
    },
    {
      label: "Fehlersuche",
      render: (c, s, i) => ComputerModule.renderTroubleshooting(c, s, i),
    },
    {
      label: "Checkpoint",
      render: (c, s, i) => ComputerModule.renderFinalCheckpoint(c, s, i),
    },
    {
      label: "Quiz",
      render: (c, s, i) => ComputerModule.renderQuiz(c, s, i),
    },
  ],

  render(container) {
    this.buildState = {};
    this.electricState = Object.fromEntries(
      this.components.map((c) => [c.id, true])
    );
    this.stationsDone = new Set();
    this.current = 0;

    container.innerHTML = `
      <div class="max-w-3xl space-y-4">
        <div class="kd-mission">
          <div class="kd-mission-label">🕵️ Mission 01</div>
          <div class="kd-mission-text">Der Rechner startet nicht. Werde zum Techniker: erkunde, baue, simuliere, brich etwas — und diagnostiziere am Ende einen echten Fall.</div>
        </div>

        <div id="station-pills" class="kd-pill-row"></div>
        <div id="station-stage" class="kd-stage"></div>

        <div class="kd-wizard-footer">
          <button id="station-prev" class="kd-btn kd-btn-ghost">← Zurück</button>
          <div id="station-label" class="kd-wizard-step"></div>
          <button id="station-next" class="kd-btn kd-btn-primary">Weiter →</button>
        </div>
      </div>
    `;

    container
      .querySelector("#station-prev")
      .addEventListener("click", () =>
        this.goToStation(container, Math.max(0, this.current - 1))
      );
    container
      .querySelector("#station-next")
      .addEventListener("click", () =>
        this.goToStation(
          container,
          Math.min(this.stations.length - 1, this.current + 1)
        )
      );

    this.goToStation(container, 0);
  },

  goToStation(container, idx) {
    this.current = idx;
    const stage = container.querySelector("#station-stage");
    stage.innerHTML = "";
    this.stations[idx].render(container, stage, idx);
    this.renderPills(container);
    container.querySelector("#station-label").textContent = `Station ${
      idx + 1
    }/${this.stations.length}: ${this.stations[idx].label}`;
    container.querySelector("#station-prev").disabled = idx === 0;
    container.querySelector("#station-next").textContent =
      idx === this.stations.length - 1
        ? "Fertig"
        : "Weiter → (überspringen möglich)";
  },

  renderPills(container) {
    const pills = container.querySelector("#station-pills");
    pills.innerHTML = this.stations
      .map(
        (s, i) =>
          `<button data-i="${i}" class="station-pill px-2 py-1 rounded-full text-xs border ${
            i === this.current
              ? "border-sky-500 bg-sky-900/40"
              : "border-slate-700 bg-slate-800"
          }">${this.stationsDone.has(i) ? "✓" : i + 1}. ${s.label}</button>`
      )
      .join("");
    pills.querySelectorAll(".station-pill").forEach((btn) => {
      btn.addEventListener("click", () =>
        this.goToStation(container, Number(btn.dataset.i))
      );
    });
  },

  markDone(container, idx) {
    this.stationsDone.add(idx);
    this.renderPills(container);
  },

  // Station 1 — Explore: click a component, get a rich inspection panel (what/does/example)
  renderExplore(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Klicke auf ein Bauteil für ein Inspektions-Panel (nicht nur eine Definition).</p>
      <div id="pc-diagram" class="grid grid-cols-4 gap-3 max-w-lg"></div>
      <div id="component-info" class="mt-4 min-h-[7rem] p-4 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;
    const grid = stage.querySelector("#pc-diagram");
    const info = stage.querySelector("#component-info");
    grid.innerHTML = this.components
      .map(
        (c) =>
          `<button data-id="${
            c.id
          }" class="level-card part-icon flex flex-col items-center gap-1 p-2 rounded border border-slate-700 hover:border-sky-500 bg-slate-800">${componentPhoto(
            c.id,
            "w-16 h-16"
          )}<span class="text-xs">${c.label}</span></button>`
      )
      .join("");

    grid.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = this.components.find((x) => x.id === btn.dataset.id);
        info.innerHTML = `
          <div class="flex gap-4">
            ${componentPhoto(c.id, "w-32 h-32 flex-shrink-0")}
            <div>
              <div class="font-medium mb-1">${c.label}</div>
              <div class="mb-2">🧠 <b>Was ist es?</b> ${c.what}</div>
              <div class="mb-2">⚙️ <b>Was tut es?</b><ul class="list-disc list-inside">${c.does
                .map((d) => `<li>${d}</li>`)
                .join("")}</ul></div>
              <div>📊 <b>Beispiel:</b> ${c.example}</div>
            </div>
          </div>
        `;
        this.markDone(container, idx);
      });
    });
  },

  // Station 2 — Build: drag real parts onto a visual case with labeled slots, then Start
  renderBuild(container, stage, idx) {
    const slots = [
      { id: "cpu", label: "CPU-Sockel", required: true },
      { id: "ram", label: "RAM-Slot", required: true },
      { id: "psu", label: "Netzteil-Bucht", required: true },
      { id: "ssd", label: "M.2 Storage", required: false },
      { id: "gpu", label: "GPU-Slot", required: false },
      { id: "cooling", label: "Kühler-Halterung", required: false },
    ];
    this.buildState = {};

    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-2">Anforderungen an den PC:</p>
      <ul class="text-sm text-slate-400 list-disc list-inside mb-4">${this.requirements
        .map((r) => `<li>${r.label}</li>`)
        .join("")}</ul>
      <p class="text-slate-400 text-sm mb-3">Ziehe die Bauteile in die passenden Steckplätze auf dem Mainboard.</p>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <div class="text-xs text-slate-500 mb-2">Bauteile-Fach</div>
          <div id="parts-tray" class="flex flex-wrap gap-2"></div>
        </div>
        <div>
          <div class="text-xs text-slate-500 mb-2">Mainboard / Gehäuse</div>
          <div id="case-slots" class="grid grid-cols-2 gap-2 p-3 rounded border-2 border-emerald-800 bg-emerald-950/20"></div>
        </div>
      </div>
      <div class="text-center mt-4">
        <button id="start-btn" disabled class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed">▶ Starten</button>
      </div>
      <div id="build-result" class="mt-3 text-sm min-h-[1.5rem] text-center"></div>
    `;

    const tray = stage.querySelector("#parts-tray");
    const caseSlots = stage.querySelector("#case-slots");
    const startBtn = stage.querySelector("#start-btn");
    const result = stage.querySelector("#build-result");

    tray.innerHTML = this.components
      .filter((c) => c.id !== "mainboard")
      .map(
        (c) =>
          `<div draggable="true" data-id="${
            c.id
          }" class="draggable part-icon p-2 rounded border border-slate-700 bg-slate-800 text-center w-20">${componentPhoto(
            c.id,
            "w-14 h-14 mx-auto"
          )}<span class="text-[10px]">${c.label}</span></div>`
      )
      .join("");

    caseSlots.innerHTML = slots
      .map(
        (s) =>
          `<div data-accepts="${
            s.id
          }" class="case-slot drop-zone p-2 rounded border-2 border-dashed border-slate-600 text-center min-h-[5.5rem] flex flex-col items-center justify-center text-[10px] text-slate-500">${
            s.label
          }${s.required ? "" : " (optional)"}</div>`
      )
      .join("");

    let dragged = null;
    tray
      .querySelectorAll(".draggable")
      .forEach((el) => el.addEventListener("dragstart", () => (dragged = el)));

    const updateStartButton = () => {
      const filledRequired = slots
        .filter((s) => s.required)
        .every((s) => this.buildState[s.id]);
      startBtn.disabled = !filledRequired;
    };

    caseSlots.querySelectorAll(".case-slot").forEach((zone) => {
      zone.addEventListener("dragover", (e) => e.preventDefault());
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!dragged) return;
        if (dragged.dataset.id === zone.dataset.accepts) {
          this.buildState[zone.dataset.accepts] = true;
          zone.classList.add("filled");
          zone.innerHTML = `${componentPhoto(
            dragged.dataset.id,
            "w-14 h-14 mx-auto"
          )}<span class="text-[10px]">${
            dragged.querySelector("span").textContent
          }</span>`;
          dragged.remove();
          updateStartButton();
        } else {
          zone.classList.add("reject");
          setTimeout(() => zone.classList.remove("reject"), 300);
        }
      });
    });

    startBtn.addEventListener("click", () => {
      const missingRequired = this.components.filter(
        (c) => c.required && c.id !== "mainboard" && !this.buildState[c.id]
      );
      if (missingRequired.length > 0) {
        result.innerHTML = `<span class="text-red-400">❌ Fehlt noch: ${missingRequired
          .map((c) => c.label)
          .join(", ")}.</span>`;
        return;
      }
      if (!this.buildState.ssd) {
        result.innerHTML = `<span class="text-amber-400">🟡 Startet elektrisch, aber ohne Speicher gibt es kein Betriebssystem und keine Dateien.</span>`;
      } else {
        result.innerHTML = `<span class="text-emerald-400 font-semibold">✓ Erfüllt alle Anforderungen: bootet, führt ein OS aus, speichert Dateien, kann einen Browser öffnen.</span>`;
      }
      this.markDone(container, idx);
    });
  },

  // Station 3 — Power-on sequence with staged highlight + explanation
  renderPowerSequence(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Drücke POWER und gehe die Kette Schritt für Schritt durch.</p>
      <div class="text-center mb-3"><button id="power-btn" class="px-5 py-2 rounded-full bg-red-700 hover:bg-red-600 text-sm font-semibold">🔴 POWER</button></div>
      <div id="power-chain" class="flex flex-col items-center gap-1 text-sm"></div>
      <div id="power-explain" class="mt-3 text-sm text-slate-300 min-h-[1.5rem] text-center"></div>
    `;
    const chain = stage.querySelector("#power-chain");
    const explain = stage.querySelector("#power-explain");
    const btn = stage.querySelector("#power-btn");
    const steps = [
      {
        label: "🔌 Netzteil (PSU)",
        text: "Das Netzteil beginnt, Strom in nutzbare Spannungen umzuwandeln.",
      },
      {
        label: "🔗 Mainboard",
        text: "Das Mainboard verteilt den Strom an alle angeschlossenen Bauteile.",
      },
      {
        label: "⚡ CPU",
        text: "Die CPU wacht auf und beginnt, erste Befehle auszuführen.",
      },
      {
        label: "🧩 Firmware / UEFI",
        text: "Die Firmware prüft die Hardware (Selbsttest) und sucht ein Boot-Gerät.",
      },
      {
        label: "🧠 RAM",
        text: "Das Betriebssystem wird vom Speicher in den RAM geladen.",
      },
      {
        label: "💾 Boot-Gerät",
        text: "Von der SSD/HDD werden die Systemdateien gelesen.",
      },
      {
        label: "🧩 Betriebssystem",
        text: "Das Betriebssystem übernimmt die Kontrolle über die Hardware.",
      },
      {
        label: "🔑 Login-Bildschirm",
        text: "Fertig — du kannst dich anmelden.",
      },
    ];
    chain.innerHTML = steps
      .map(
        (s, i) =>
          `<div id="pw-${i}" class="power-step px-3 py-1 rounded border border-slate-700 bg-slate-800 w-64 text-center">${s.label}</div>`
      )
      .join(`<div class="text-slate-600">↓</div>`);

    btn.addEventListener("click", async () => {
      btn.disabled = true;
      for (let i = 0; i < steps.length; i++) {
        const el = stage.querySelector(`#pw-${i}`);
        el.classList.add("border-sky-400", "bg-sky-900/40");
        explain.textContent = steps[i].text;
        await new Promise((r) => setTimeout(r, 500));
      }
      explain.textContent +=
        " Fertig — jeder Klick am Computer nutzt eigentlich diese ganze Kette.";
      btn.disabled = false;
      this.markDone(container, idx);
    });
  },

  // Station 4 — CPU simulator: core lights, single task vs 100 parallel tasks
  renderCpuSimulator(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Lass ein Programm durch die CPU-Kerne laufen.</p>
      <div id="cpu-cores" class="grid grid-cols-4 gap-2 max-w-xs mb-2 text-xs"></div>
      <div class="text-xs text-slate-400 mb-3">Cache: <div class="inline-block w-32 h-2 bg-slate-700 rounded overflow-hidden align-middle"><div class="h-full bg-sky-500" style="width:35%"></div></div></div>
      <div class="flex gap-2">
        <button id="cpu-run-1" class="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm">▶ 1 Aufgabe ausführen</button>
        <button id="cpu-run-100" class="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm">▶ 100 Aufgaben gleichzeitig</button>
      </div>
      <div id="cpu-explain" class="mt-3 text-sm text-slate-300 min-h-[1.5rem]"></div>
    `;
    const cores = stage.querySelector("#cpu-cores");
    const explain = stage.querySelector("#cpu-explain");
    const coreIds = [1, 2, 3, 4];
    cores.innerHTML = coreIds
      .map(
        (n) =>
          `<div id="core-${n}" class="p-2 rounded border border-slate-700 bg-slate-800 text-center">Core ${n}</div>`
      )
      .join("");

    const pulse = async (n, ms) => {
      const el = stage.querySelector(`#core-${n}`);
      el.classList.add("border-sky-400", "bg-sky-900/40");
      await new Promise((r) => setTimeout(r, ms));
      el.classList.remove("border-sky-400", "bg-sky-900/40");
    };

    stage.querySelector("#cpu-run-1").addEventListener("click", async () => {
      explain.textContent = "Programm 'Berechne 25 + 17' läuft auf Core 1 ...";
      await pulse(1, 500);
      explain.textContent =
        "Ergebnis: 42. Ein einzelner Kern reicht für einfache Aufgaben.";
      this.markDone(container, idx);
    });

    stage.querySelector("#cpu-run-100").addEventListener("click", async () => {
      explain.textContent = "100 Aufgaben werden auf alle 4 Kerne verteilt ...";
      await Promise.all(coreIds.map((n) => pulse(n, 700)));
      explain.textContent =
        "Alle Kerne waren gleichzeitig beschäftigt — so verarbeitet eine moderne CPU viele Aufgaben parallel.";
      this.markDone(container, idx);
    });
  },

  // Station 5 — RAM simulator: open/close named apps, memory pressure at >100%
  renderRamSimulator(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Öffne und schließe Programme — beobachte den Speicherverbrauch.</p>
      <div class="text-sm mb-2">Verfügbarer RAM: 8 GB — belegt: <span id="ram-used">0.0</span> GB</div>
      <div class="w-full h-4 bg-slate-800 rounded overflow-hidden mb-3"><div id="ram-bar" class="h-full bg-sky-500 transition-all" style="width:0%"></div></div>
      <div id="ram-apps" class="grid grid-cols-2 gap-2 text-sm mb-2"></div>
      <div id="ram-warning" class="text-sm min-h-[1.5rem]"></div>
    `;
    const apps = [
      { name: "Chrome", gb: 1.2 },
      { name: "Teams", gb: 1.0 },
      { name: "VS Code", gb: 0.8 },
      { name: "Photoshop", gb: 2.4 },
      { name: "Spiel", gb: 3.1 },
    ];
    const total = 8;
    const open = new Set();
    const appsEl = stage.querySelector("#ram-apps");
    const bar = stage.querySelector("#ram-bar");
    const used = stage.querySelector("#ram-used");
    const warning = stage.querySelector("#ram-warning");

    appsEl.innerHTML = apps
      .map(
        (a) =>
          `<button data-app="${a.name}" class="ram-app-btn px-3 py-2 rounded border border-slate-700 bg-slate-800 text-left hover:border-sky-500">${a.name} — ${a.gb} GB</button>`
      )
      .join("");

    const update = () => {
      const usedGb = apps
        .filter((a) => open.has(a.name))
        .reduce((s, a) => s + a.gb, 0);
      const pct = Math.min(100, (usedGb / total) * 100);
      used.textContent = usedGb.toFixed(1);
      bar.style.width = `${pct}%`;
      bar.classList.toggle("bg-sky-500", usedGb <= total);
      bar.classList.toggle("bg-red-500", usedGb > total);
      warning.innerHTML =
        usedGb > total
          ? `<span class="text-amber-400">⚠️ Speicherdruck — der PC muss Daten auslagern und wird spürbar langsamer.</span>`
          : "";
      if (open.size > 0) this.markDone(container, idx);
    };

    appsEl.querySelectorAll(".ram-app-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.app;
        if (open.has(name)) {
          open.delete(name);
          btn.classList.remove("border-sky-500", "bg-sky-900/30");
        } else {
          open.add(name);
          btn.classList.add("border-sky-500", "bg-sky-900/30");
        }
        update();
      });
    });
    update();
  },

  // Station 6 — Storage lab: animate HDD vs SSD "open 2 GB file" at different speeds
  renderStorageLab(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Vergleiche Geschwindigkeit, Kapazität und Preis.</p>
      <div class="grid grid-cols-2 gap-4 mb-3">
        <div class="p-3 rounded border border-slate-700 bg-slate-800 text-sm">💾 HDD<br/>Kapazität: 2 TB<br/>Geschwindigkeit: 🐢 langsam<br/>Preis/GB: günstig</div>
        <div class="p-3 rounded border border-slate-700 bg-slate-800 text-sm">💾 SSD<br/>Kapazität: 512 GB<br/>Geschwindigkeit: 🚀 schnell<br/>Preis/GB: teurer</div>
      </div>
      <button id="storage-run" class="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm mb-3">▶ 2 GB Datei öffnen</button>
      <div class="space-y-2 text-xs">
        <div>HDD <div class="inline-block w-64 h-2 bg-slate-700 rounded overflow-hidden align-middle"><div id="hdd-bar" class="h-full bg-amber-500" style="width:0%"></div></div> <span id="hdd-time"></span></div>
        <div>SSD <div class="inline-block w-64 h-2 bg-slate-700 rounded overflow-hidden align-middle"><div id="ssd-bar" class="h-full bg-emerald-500" style="width:0%"></div></div> <span id="ssd-time"></span></div>
      </div>
      <div id="storage-explain" class="mt-3 text-sm text-slate-300"></div>
    `;
    const hddBar = stage.querySelector("#hdd-bar");
    const ssdBar = stage.querySelector("#ssd-bar");
    const hddTime = stage.querySelector("#hdd-time");
    const ssdTime = stage.querySelector("#ssd-time");
    const explain = stage.querySelector("#storage-explain");

    stage.querySelector("#storage-run").addEventListener("click", () => {
      hddBar.style.transition = "width 4.8s linear";
      ssdBar.style.transition = "width 0.4s linear";
      hddBar.style.width = "0%";
      ssdBar.style.width = "0%";
      requestAnimationFrame(() => {
        hddBar.style.width = "100%";
        ssdBar.style.width = "100%";
      });
      hddTime.textContent = "4.8 Sek.";
      ssdTime.textContent = "0.4 Sek.";
      explain.textContent =
        "Für ein Betriebssystem lohnt sich die SSD (Geschwindigkeit); für günstigen Massenspeicher (Backups, Archive) bleibt die HDD attraktiv (Preis pro GB).";
      this.markDone(container, idx);
    });
  },

  // Station 7 — Mainboard explorer: clickable zones with short explanations
  renderMainboardExplorer(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Klicke die Bereiche eines Mainboards an.</p>
      <div id="mb-zones" class="grid grid-cols-3 gap-2 text-sm"></div>
      <div id="mb-info" class="mt-3 min-h-[3rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;
    const zones = [
      {
        id: "socket",
        label: "CPU-Sockel",
        info: "Hier wird die CPU eingesetzt — Sockel-Typ muss zum Mainboard passen.",
      },
      {
        id: "ramslots",
        label: "RAM-Slots",
        info: "Steckplätze für Arbeitsspeicher-Module, meist 2-4 Stück.",
      },
      {
        id: "pcie",
        label: "PCIe",
        info: "Erweiterungsschnittstelle — hier werden Grafikkarten und andere Zusatzkarten angeschlossen.",
      },
      {
        id: "m2",
        label: "M.2",
        info: "Gängiges Anschlussformat für moderne, sehr schnelle SSDs.",
      },
      {
        id: "sata",
        label: "SATA",
        info: "Älterer Anschluss für HDDs, SSDs und Laufwerke.",
      },
      {
        id: "usb",
        label: "USB",
        info: "Anschluss für externe Geräte: Tastatur, Maus, Sticks.",
      },
      {
        id: "network",
        label: "Netzwerk",
        info: "LAN-Anschluss für eine kabelgebundene Internetverbindung.",
      },
    ];
    const grid = stage.querySelector("#mb-zones");
    const info = stage.querySelector("#mb-info");
    grid.innerHTML = zones
      .map(
        (z) =>
          `<button data-id="${z.id}" class="px-3 py-2 rounded border border-slate-700 bg-slate-800 hover:border-sky-500">${z.label}</button>`
      )
      .join("");
    grid.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const z = zones.find((x) => x.id === btn.dataset.id);
        info.textContent = `${z.label}: ${z.info}`;
        this.markDone(container, idx);
      });
    });
  },

  // Station 8 — Follow the electricity: toggle components, see chain reaction
  renderElectricity(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Schalte Bauteile aus und beobachte, was passiert.</p>
      <div id="electric-toggles" class="grid grid-cols-4 gap-2 mb-3"></div>
      <div id="electric-result" class="text-sm min-h-[1.5rem]"></div>
    `;
    const toggles = stage.querySelector("#electric-toggles");
    const result = stage.querySelector("#electric-result");

    toggles.innerHTML = this.components
      .map(
        (c) =>
          `<button data-id="${
            c.id
          }" class="electric-toggle part-icon p-2 rounded border border-emerald-600 bg-emerald-900/30 text-xs">${componentPhoto(
            c.id,
            "w-12 h-12 mx-auto"
          )}${c.label}</button>`
      )
      .join("");

    const evaluate = () => {
      if (!this.electricState.psu) {
        result.innerHTML = `<span class="text-red-400">⚫ Kein Netzteil → gar nichts bekommt Strom. Der Bildschirm bleibt komplett schwarz.</span>`;
      } else if (!this.electricState.mainboard) {
        result.innerHTML = `<span class="text-red-400">⚫ Strom da, aber kein Mainboard → keine Komponente kann miteinander kommunizieren.</span>`;
      } else if (!this.electricState.cpu) {
        result.innerHTML = `<span class="text-red-400">⚫ Strom fließt, aber ohne CPU passiert nichts — keine Befehle werden ausgeführt.</span>`;
      } else if (!this.electricState.ram) {
        result.innerHTML = `<span class="text-amber-400">🟡 CPU läuft, aber ohne RAM kann kein Betriebssystem geladen werden.</span>`;
      } else if (!this.electricState.ssd) {
        result.innerHTML = `<span class="text-amber-400">🟡 Der PC startet elektrisch, meldet aber "kein Boot-Gerät gefunden".</span>`;
      } else {
        result.innerHTML = `<span class="text-emerald-400">✓ Alle nötigen Bauteile haben Strom — der PC läuft normal.</span>`;
      }
    };

    toggles.querySelectorAll(".electric-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.electricState[id] = !this.electricState[id];
        const on = this.electricState[id];
        btn.classList.toggle("border-emerald-600", on);
        btn.classList.toggle("bg-emerald-900/30", on);
        btn.classList.toggle("border-red-600", !on);
        btn.classList.toggle("bg-red-900/30", !on);
        evaluate();
        this.markDone(container, idx);
      });
    });
    evaluate();
  },

  // Station 9 — Troubleshooting lab: component → function → symptom → hypothesis
  renderTroubleshooting(container, stage, idx) {
    stage.innerHTML = `
      <p class="text-slate-400 text-sm mb-4">Vier Fälle. Finde jeweils die wahrscheinlichste Ursache.</p>
      <div id="cases" class="space-y-4"></div>
    `;
    const cases = [
      {
        id: 1,
        symptom:
          "🟢 Power &nbsp; 🟢 Lüfter &nbsp; 🔴 Bildschirm bleibt schwarz",
        options: ["RAM/GPU/Kabel", "Netzteil", "Festplatte"],
        correct: 0,
        feedback:
          "Strom und Lüfter laufen, also ist die Grundversorgung ok — meist liegt es an RAM, GPU oder dem Bildschirmkabel.",
      },
      {
        id: 2,
        symptom:
          "🟢 Power &nbsp; 🟢 Bildschirm &nbsp; ❌ 'No boot device found'",
        options: ["CPU", "SSD/HDD", "Netzwerk"],
        correct: 1,
        feedback:
          "Die Meldung zeigt: Hardware läuft, aber kein Speichermedium mit Betriebssystem wird gefunden — SSD/HDD prüfen.",
      },
      {
        id: 3,
        symptom:
          "Der Computer wird bei vielen offenen Programmen extrem langsam.",
        options: ["RAM", "GPU", "Netzteil"],
        correct: 0,
        feedback:
          "Klassisches Symptom für zu wenig RAM — der PC muss ständig Daten auslagern.",
      },
      {
        id: 4,
        symptom: "Der Computer schaltet sich unter hoher Last plötzlich ab.",
        options: ["Netzwerkkarte", "Kühlung/Netzteil", "USB"],
        correct: 1,
        feedback:
          "Plötzliches Abschalten unter Last deutet meist auf Überhitzung (Kühlung) oder ein überlastetes Netzteil hin.",
      },
    ];

    const wrap = stage.querySelector("#cases");
    wrap.innerHTML = cases
      .map(
        (c) => `
      <div class="p-3 rounded border border-slate-700 bg-slate-800">
        <div class="text-sm mb-2">Fall #${c.id}: ${c.symptom}</div>
        <div class="flex gap-2 flex-wrap">
          ${c.options
            .map(
              (o, i) =>
                `<button data-case="${c.id}" data-opt="${i}" class="case-opt px-2 py-1 rounded border border-slate-600 text-xs hover:border-sky-500">${o}</button>`
            )
            .join("")}
        </div>
        <div id="case-result-${c.id}" class="mt-2 text-xs"></div>
      </div>`
      )
      .join("");

    wrap.querySelectorAll(".case-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = cases.find((x) => x.id === Number(btn.dataset.case));
        const res = stage.querySelector(`#case-result-${c.id}`);
        const correct = Number(btn.dataset.opt) === c.correct;
        res.innerHTML = correct
          ? `<span class="text-emerald-400">✓ ${c.feedback}</span>`
          : `<span class="text-red-400">✗ Nicht ganz — überlege: welches Bauteil erklärt das Symptom am direktesten?</span>`;
        if (correct) this.markDone(container, idx);
      });
    });
  },

  // Station 10 — Final checkpoint: diagnose mission, completes module
  renderFinalCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <div class="p-4 rounded border border-slate-700 bg-slate-800 text-sm mb-3">
        <div class="font-medium mb-1">Kundenauftrag:</div>
        <div>CPU: ✓ &nbsp; RAM: 4 GB &nbsp; Storage: 500 GB HDD &nbsp; GPU: integriert &nbsp; PSU: ✓</div>
        <div class="mt-2 italic text-slate-400">"Der PC funktioniert, wird aber extrem langsam, wenn ich viele Programme gleichzeitig öffne."</div>
      </div>
      <div class="text-sm mb-2">Welches Bauteil ist am wahrscheinlichsten die Ursache?</div>
      <div id="mission-options" class="flex gap-2 mb-3"></div>
      <div id="mission-result" class="text-sm"></div>
    `;
    const options = ["CPU", "RAM", "SSD"];
    const correct = 1;
    const wrap = stage.querySelector("#mission-options");
    const result = stage.querySelector("#mission-result");
    wrap.innerHTML = options
      .map(
        (o, i) =>
          `<button data-i="${i}" class="mission-opt px-3 py-2 rounded border border-slate-700 bg-slate-800 hover:border-sky-500 text-sm">${o}</button>`
      )
      .join("");

    wrap.querySelectorAll(".mission-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (Number(btn.dataset.i) === correct) {
          result.innerHTML = `
            <div class="checkpoint-passed text-emerald-400 font-semibold">✓ CHECKPOINT PASSED</div>
            <div class="mt-2 text-slate-300">Richtig: nur 4 GB RAM sind bei vielen offenen Programmen zu wenig. Ein Upgrade auf 16 GB RAM würde das Problem direkt lösen — CPU und Storage sind hier nicht der Engpass. Weiter zum Quiz, um das Modul abzuschließen.</div>
          `;
          this.markDone(container, idx);
        } else {
          result.innerHTML = `<span class="text-red-400">✗ Denk an das Symptom: "langsam bei vielen offenen Programmen" — welches Bauteil hält laufende Programme bereit?</span>`;
        }
      });
    });
  },

  // Station 11 — Quiz: multiple-choice check that gates this module's Progress.complete
  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.computer, {
      onPass: () => {
        Progress.complete("computer");
        App.refreshNav();
        this.markDone(container, idx);
      },
    });
  },
};
