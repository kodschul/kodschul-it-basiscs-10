// Nexus prototype — modules/filesystem.js
// Maps to output/m01-computer-basics-os/l05-grafische-oberflaeche (Lab 1.5 "Den Download-Ordner
// der Bäckerei aufräumen"): sort the same 6 files into the same 3 target folders.

const FilesystemModule = {
  id: "filesystem",
  title: "Dateien & Ordner",
  day: "Tag 1 · Modul 1",

  files: [
    {
      name: "rechnung-mai.pdf",
      ext: "pdf",
      folder: "PDF",
      opensWith: "PDF-Reader",
    },
    {
      name: "anleitung.pdf",
      ext: "pdf",
      folder: "PDF",
      opensWith: "PDF-Reader",
    },
    {
      name: "speisekarte.docx",
      ext: "docx",
      folder: "Dokumente",
      opensWith: "Textverarbeitung",
    },
    {
      name: "notizen.txt",
      ext: "txt",
      folder: "Dokumente",
      opensWith: "Texteditor",
    },
    {
      name: "brot.jpg",
      ext: "jpg",
      folder: "Bilder",
      opensWith: "Bildbetrachter",
    },
    {
      name: "teamfoto.png",
      ext: "png",
      folder: "Bilder",
      opensWith: "Bildbetrachter",
    },
  ],

  folders: ["Dokumente", "Bilder", "PDF"],

  render(container) {
    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 01b",
      missionText:
        "Der Download-Ordner der Bäckerei ist unsortiert. Bring Ordnung rein.",
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
      <h2 class="text-lg font-semibold mb-1">Explore — download-chaos/ der Bäckerei</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf eine Datei, um zu sehen, womit sie geöffnet wird.</p>
      <div id="file-list" class="flex flex-wrap gap-2"></div>
      <div id="file-info" class="mt-4 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;

    const list = stage.querySelector("#file-list");
    const info = stage.querySelector("#file-info");
    list.innerHTML = this.files
      .map(
        (f) =>
          `<button data-name="${f.name}" class="level-card px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm">${f.name}</button>`
      )
      .join("");

    list.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = this.files.find((x) => x.name === btn.dataset.name);
        info.textContent = `.${f.ext} → geöffnet mit: ${f.opensWith}`;
        StationWizard.markDone(container, this, idx);
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Checkpoint — Räume download-chaos/ auf</h2>
      <p class="text-slate-400 text-sm mb-4">Ziehe jede Datei in den passenden Zielordner: Dokumente, Bilder oder PDF.</p>
      <div class="grid grid-cols-2 gap-6">
        <div id="fs-pool" class="space-y-2"></div>
        <div id="fs-folders" class="grid grid-cols-2 gap-2"></div>
      </div>
      <div id="fs-result" class="mt-4 text-sm"></div>
      <p class="text-slate-500 text-xs mt-3">
        Bonus aus der echten Übung: <code>rechnung-mai.pdf</code> zieht danach zusätzlich in einen
        Unterordner <code>Dokumente/Rechnungen_2025/</code> um — der volle Pfad lautet
        <code>download-chaos/Dokumente/Rechnungen_2025/rechnung-mai.pdf</code>.
      </p>
    `;

    const pool = stage.querySelector("#fs-pool");
    const foldersEl = stage.querySelector("#fs-folders");
    const result = stage.querySelector("#fs-result");

    const shuffled = [...this.files].sort(() => Math.random() - 0.5);
    pool.innerHTML = shuffled
      .map(
        (f) =>
          `<div draggable="true" data-name="${f.name}" data-folder="${f.folder}" class="draggable p-2 rounded bg-slate-800 border border-slate-700 text-sm">📄 ${f.name}</div>`
      )
      .join("");

    foldersEl.innerHTML = this.folders
      .map(
        (folder) =>
          `<div data-folder="${folder}" class="drop-zone p-3 rounded border border-dashed border-slate-600 text-sm min-h-[4rem]">📁 ${folder}</div>`
      )
      .join("");

    let dragged = null;
    pool.querySelectorAll(".draggable").forEach((el) => {
      el.addEventListener("dragstart", () => (dragged = el));
    });

    foldersEl.querySelectorAll(".drop-zone").forEach((zone) => {
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
        if (dragged.dataset.folder === zone.dataset.folder) {
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
        result.innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — alle Dateien sortiert. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
        StationWizard.markDone(container, this, idx);
      }
    };
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.filesystem, {
      onPass: () => {
        Progress.complete("filesystem");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
