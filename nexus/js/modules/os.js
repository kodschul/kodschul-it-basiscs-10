// Nexus prototype — modules/os.js
// Maps to output/m01-computer-basics-os/l04-betriebssysteme (Lab 1.4 "Welches Betriebssystem
// passt zur Bäckerei-Station?"): match Windows/macOS/Linux to a bakery workstation.

const OsModule = {
  id: "os",
  title: "Betriebssysteme",
  day: "Tag 1 · Modul 1",

  systems: [
    {
      name: "Windows",
      info: "weit verbreitet, kostenpflichtig, üblich an Büro- und Kassenarbeitsplätzen.",
    },
    {
      name: "macOS",
      info: "von Apple, oft an Kreativ-Arbeitsplätzen für Bild-/Videobearbeitung.",
    },
    {
      name: "Linux",
      info: "quelloffen, frei anpassbar, sehr verbreitet auf Servern und in Containern.",
    },
  ],

  workplaces: [
    {
      name: "Kasse",
      os: "Windows",
      info: "klassischer Kassenarbeitsplatz im Büroalltag.",
    },
    {
      name: "Grafik-Arbeitsplatz",
      os: "macOS",
      info: "Werbeplakate, Bild- und Videobearbeitung.",
    },
    {
      name: "Server",
      os: "Linux",
      info: "läuft dauerhaft im Hintergrund, meist ohne grafische Oberfläche.",
    },
  ],

  render(container) {
    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 04",
      missionText:
        "Die Bäckerei richtet drei Arbeitsplätze ein. Ordne jedem Arbeitsplatz ein passendes Betriebssystem zu.",
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
      <h2 class="text-lg font-semibold mb-1">Explore — Betriebssysteme im Überblick</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf ein Betriebssystem, um sein typisches Merkmal zu sehen.</p>
      <div id="os-list" class="flex flex-wrap gap-2"></div>
      <div id="os-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;

    const list = stage.querySelector("#os-list");
    const info = stage.querySelector("#os-info");
    list.innerHTML = this.systems
      .map(
        (o) =>
          `<button data-name="${o.name}" class="level-card px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm">${o.name}</button>`
      )
      .join("");

    list.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const o = this.systems.find((x) => x.name === btn.dataset.name);
        info.textContent = `${o.name}: ${o.info}`;
        StationWizard.markDone(container, this, idx);
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Checkpoint — Arbeitsplätze zuordnen</h2>
      <p class="text-slate-400 text-sm mb-4">Wähle für jeden Arbeitsplatz das passende Betriebssystem.</p>
      <div id="station-picks" class="space-y-4"></div>
      <div id="os-result" class="mt-4 text-sm"></div>
    `;

    const picks = stage.querySelector("#station-picks");
    const result = stage.querySelector("#os-result");
    const answers = {};

    picks.innerHTML = this.workplaces
      .map(
        (st) => `
        <div>
          <div class="text-sm font-medium mb-1">${st.name}</div>
          <div class="flex gap-2">
            ${this.systems
              .map(
                (o) =>
                  `<button data-station="${st.name}" data-os="${o.name}" class="os-pick px-3 py-1 rounded border border-slate-700 bg-slate-800 hover:border-sky-500 text-sm">${o.name}</button>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");

    const checkDone = () => {
      const allCorrect = this.workplaces.every(
        (st) => answers[st.name] === st.os
      );
      if (
        allCorrect &&
        Object.keys(answers).length === this.workplaces.length
      ) {
        result.innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — alle Arbeitsplätze richtig zugeordnet. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
        StationWizard.markDone(container, this, idx);
      }
    };

    picks.querySelectorAll(".os-pick").forEach((btn) => {
      btn.addEventListener("click", () => {
        const station = btn.dataset.station;
        const chosenOs = btn.dataset.os;
        answers[station] = chosenOs;
        picks
          .querySelectorAll(`[data-station="${station}"]`)
          .forEach((b) =>
            b.classList.remove(
              "border-emerald-500",
              "bg-emerald-900/40",
              "border-red-500",
              "bg-red-900/40"
            )
          );
        const st = this.workplaces.find((s) => s.name === station);
        btn.classList.add(
          ...(chosenOs === st.os
            ? ["border-emerald-500", "bg-emerald-900/40"]
            : ["border-red-500", "bg-red-900/40"])
        );
        checkDone();
      });
    });
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.os, {
      onPass: () => {
        Progress.complete("os");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
