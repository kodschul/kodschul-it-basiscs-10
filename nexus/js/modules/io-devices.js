// Nexus prototype — modules/io-devices.js
// Maps to output/m01-computer-basics-os/l03-eingabe-und-ausgabegeraete (Lab 1.3 "Geräte für den
// neuen Bäckerei-Kassenplatz sortieren"): sort device cards into Eingabe/Ausgabe/beides.

const IoDevicesModule = {
  id: "io-devices",
  title: "Ein-/Ausgabegeräte",
  day: "Tag 1 · Modul 1",

  devices: [
    {
      name: "Tastatur",
      category: "eingabe",
      info: "wandelt Tastendrücke in Text/Befehle um.",
    },
    {
      name: "Scanner",
      category: "eingabe",
      info: "liest Barcodes oder Vorlagen ein.",
    },
    {
      name: "Mikrofon",
      category: "eingabe",
      info: "wandelt Schall in Daten um.",
    },
    {
      name: "Kassen-Bildschirm",
      category: "ausgabe",
      info: "zeigt Daten an, nimmt aber nichts entgegen.",
    },
    {
      name: "Bon-Drucker",
      category: "ausgabe",
      info: "überträgt Daten dauerhaft auf Papier.",
    },
    {
      name: "Lautsprecher",
      category: "ausgabe",
      info: "wandelt Daten in hörbaren Schall um.",
    },
    {
      name: "Kassen-Touchscreen",
      category: "beides",
      info: "zeigt an UND nimmt Berührungen entgegen.",
    },
    {
      name: "Netzwerkkarte",
      category: "beides",
      info: "sendet und empfängt gleichzeitig Daten.",
    },
  ],

  categories: [
    { id: "eingabe", label: "Eingabe" },
    { id: "ausgabe", label: "Ausgabe" },
    { id: "beides", label: "Ein- und Ausgabe" },
  ],

  render(container) {
    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 03",
      missionText:
        "Der neue Kassenplatz der Bäckerei wird eingerichtet. Sortiere die Geräte nach Datenfluss.",
      stations: [
        { label: "Explore", render: (c, s, i) => this.renderExplore(c, s, i) },
        {
          label: "Checkpoint",
          render: (c, s, i) => this.renderCheckpoint(c, s, i),
        },
        { label: "Quiz", render: (c, s, i) => this.renderQuiz(c, s, i) },
      ],
    });
  },

  renderExplore(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Explore — Geräte am Kassenplatz</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf ein Gerät, um seine Rolle im Datenfluss zu sehen.</p>
      <div id="device-list" class="flex flex-wrap gap-2"></div>
      <div id="device-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;

    const list = stage.querySelector("#device-list");
    const info = stage.querySelector("#device-info");
    list.innerHTML = this.devices
      .map(
        (d) =>
          `<button data-name="${d.name}" class="level-card px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm">${d.name}</button>`
      )
      .join("");

    list.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = this.devices.find((x) => x.name === btn.dataset.name);
        info.textContent = `${d.name}: ${d.info}`;
        StationWizard.markDone(container, this, idx);
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Checkpoint — Kassenplatz einrichten</h2>
      <p class="text-slate-400 text-sm mb-4">Ziehe jedes Gerät in die passende Zone: Eingabe, Ausgabe oder Ein- und Ausgabe.</p>
      <div class="grid grid-cols-2 gap-6">
        <div id="io-pool" class="space-y-2"></div>
        <div id="io-zones" class="grid grid-cols-1 gap-2"></div>
      </div>
      <div id="io-result" class="mt-4 text-sm"></div>
    `;

    const pool = stage.querySelector("#io-pool");
    const zonesEl = stage.querySelector("#io-zones");
    const result = stage.querySelector("#io-result");

    const shuffled = [...this.devices].sort(() => Math.random() - 0.5);
    pool.innerHTML = shuffled
      .map(
        (d) =>
          `<div draggable="true" data-name="${d.name}" data-category="${d.category}" class="draggable p-2 rounded bg-slate-800 border border-slate-700 text-sm">🔌 ${d.name}</div>`
      )
      .join("");

    zonesEl.innerHTML = this.categories
      .map(
        (c) =>
          `<div data-category="${c.id}" class="drop-zone p-3 rounded border border-dashed border-slate-600 text-sm min-h-[4rem]">📥 ${c.label}</div>`
      )
      .join("");

    let dragged = null;
    pool.querySelectorAll(".draggable").forEach((el) => {
      el.addEventListener("dragstart", () => (dragged = el));
    });

    zonesEl.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        zone.classList.add("drag-over");
      });
      zone.addEventListener("dragleave", () =>
        zone.classList.remove("drag-over")
      );
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
        if (!dragged) return;
        if (dragged.dataset.category === zone.dataset.category) {
          const chip = document.createElement("div");
          chip.className = "text-xs text-emerald-400";
          chip.textContent = `✓ ${dragged.dataset.name}`;
          zone.appendChild(chip);
          dragged.remove();
        } else {
          zone.classList.add("bg-red-900/40");
          setTimeout(() => zone.classList.remove("bg-red-900/40"), 400);
        }
        checkDone();
      });
    });

    const checkDone = () => {
      if (pool.children.length === 0) {
        result.innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — alle Geräte sortiert. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
        StationWizard.markDone(container, this, idx);
      }
    };
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank["io-devices"], {
      onPass: () => {
        Progress.complete("io-devices");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
