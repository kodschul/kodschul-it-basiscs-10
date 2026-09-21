// Nexus prototype — modules/coding.js
// Maps to output/m01-computer-basics-os/l02-codierung-zahlensysteme (Lab 1.2 "Der Backzettel
// wird zum Binärcode"): ASCII lookup + decimal-to-binary division-method drills.

const CodingModule = {
  id: "coding",
  title: "Codierung & Zahlensysteme",
  day: "Tag 1 · Modul 1",

  asciiTable: [
    { char: "0", value: 48 },
    { char: "A", value: 65 },
    { char: "B", value: 66 },
    { char: "C", value: 67 },
    { char: "H", value: 72 },
    { char: "a", value: 97 },
    { char: "i", value: 105 },
  ],

  drills: [
    { decimal: 6, binary: "0110" },
    { decimal: 13, binary: "1101" },
    { decimal: 20, binary: "10100" },
    { decimal: 9, binary: "1001" },
  ],

  render(container) {
    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 02",
      missionText:
        "Die Bäckerei testet einen Binärcode für die Backliste. Übersetze Zeichen und Zahlen.",
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
      <h2 class="text-lg font-semibold mb-1">Explore — ASCII-Tabelle</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf ein Zeichen, um seinen ASCII-Wert dezimal und binär zu sehen.</p>
      <div id="ascii-list" class="flex flex-wrap gap-2"></div>
      <div id="ascii-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;

    const list = stage.querySelector("#ascii-list");
    const info = stage.querySelector("#ascii-info");
    list.innerHTML = this.asciiTable
      .map(
        (a) =>
          `<button data-char="${a.char}" class="level-card px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm font-mono">${a.char}</button>`
      )
      .join("");

    list.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const a = this.asciiTable.find((x) => x.char === btn.dataset.char);
        info.textContent = `'${a.char}' → ${a.value} (dezimal) → ${a.value
          .toString(2)
          .padStart(8, "0")} (binär)`;
        StationWizard.markDone(container, this, idx);
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Checkpoint — Dezimal in Binär umrechnen</h2>
      <p class="text-slate-400 text-sm mb-4">
        Teile jede Zahl per Kopfrechnen/Notizzettel so lange durch 2, bis nichts mehr übrig
        bleibt, und trage das Ergebnis als Binärzahl ein.
      </p>
      <div id="drill-list" class="space-y-3"></div>
      <div id="drill-result" class="mt-4 text-sm"></div>
    `;

    const list = stage.querySelector("#drill-list");
    const result = stage.querySelector("#drill-result");
    list.innerHTML = this.drills
      .map(
        (d, i) => `
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm w-16">${d.decimal} =</span>
          <input data-i="${i}" class="drill-input px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sm font-mono w-32" placeholder="Binärzahl" />
          <span class="drill-check text-sm"></span>
        </div>`
      )
      .join("");

    const checkDone = () => {
      const allCorrect = [...list.querySelectorAll(".drill-input")].every(
        (input) => {
          const d = this.drills[Number(input.dataset.i)];
          return (
            input.value.trim().replace(/^0+(?=\d)/, "") ===
            d.binary.replace(/^0+(?=\d)/, "")
          );
        }
      );
      if (allCorrect) {
        result.innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — alle Umrechnungen korrekt. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
        StationWizard.markDone(container, this, idx);
      }
    };

    list.querySelectorAll(".drill-input").forEach((input) => {
      const check = input.parentElement.querySelector(".drill-check");
      input.addEventListener("input", () => {
        const d = this.drills[Number(input.dataset.i)];
        const cleaned = input.value.trim().replace(/^0+(?=\d)/, "");
        if (cleaned === "") {
          check.textContent = "";
        } else if (cleaned === d.binary.replace(/^0+(?=\d)/, "")) {
          check.textContent = "✓";
          check.className = "drill-check text-sm text-emerald-400";
        } else {
          check.textContent = "✗";
          check.className = "drill-check text-sm text-red-400";
        }
        checkDone();
      });
    });
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.coding, {
      onPass: () => {
        Progress.complete("coding");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
