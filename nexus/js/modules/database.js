// Nexus prototype — modules/database.js
// Maps to output/m04-databases (Day 4, covered CONCEPTUALLY not fully hands-on — Nexus focuses
// on Day 1-3; Adminer/MySQL/MongoDB itself is done live in the real course environment). Lab 4.1
// starts Adminer/MySQL, Lab 4.2 manages a `produkte` SQL table, Lab 4.3 compares with MongoDB.

const DatabaseModule = {
  id: "database",
  title: "Datenbanken",
  day: "Tag 4 · Modul 4",

  produkte: [
    { id: 1, name: "Brot", preis: "2.50" },
    { id: 2, name: "Brötchen", preis: "0.60" },
    { id: 3, name: "Croissant", preis: "1.80" },
    { id: 4, name: "Kuchen", preis: "3.20" },
    { id: 5, name: "Baguette", preis: "2.10" },
  ],

  sortStatements: [
    { text: "feste Spalten (ID, Name, Preis)", model: "SQL" },
    { text: "Zeilen und Spalten wie eine Tabelle", model: "SQL" },
    { text: "flexible Struktur pro Dokument", model: "NoSQL" },
    { text: "JSON-ähnliche Dokumente", model: "NoSQL" },
    {
      text: "gut für Bestellungen mit verschachtelten Produkten",
      model: "NoSQL",
    },
    { text: "gut für strikt gleich aufgebaute Datensätze", model: "SQL" },
  ],

  render(container) {
    StationWizard.mount(container, this, {
      missionLabel: "🧠 Konzept · Modul 4",
      missionText:
        "Live läuft das in Adminer/MySQL und MongoDB — hier geht es nur ums Verständnis: wie organisiert die Bäckerei ihre Daten?",
      stations: [
        {
          label: "SQL-Tabelle erkunden",
          render: (c, s, i) => this.renderTable(c, s, i),
        },
        {
          label: "SQL vs. NoSQL",
          render: (c, s, i) => this.renderSort(c, s, i),
        },
        {
          label: "Checkpoint",
          render: (c, s, i) => this.renderCheckpoint(c, s, i),
        },
      ],
    });
  },

  renderTable(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Explore — Tabelle produkte</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke auf eine Zeile oder Spalte, um zu sehen, was sie bedeutet.</p>
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th data-col="id" class="col-head border border-slate-700 p-2 text-left cursor-pointer bg-slate-800">id</th>
            <th data-col="name" class="col-head border border-slate-700 p-2 text-left cursor-pointer bg-slate-800">name</th>
            <th data-col="preis" class="col-head border border-slate-700 p-2 text-left cursor-pointer bg-slate-800">preis</th>
          </tr>
        </thead>
        <tbody id="db-rows"></tbody>
      </table>
      <div id="db-info" class="mt-3 min-h-[2.5rem] p-3 rounded bg-slate-800 text-sm text-slate-300"></div>
    `;

    const info = stage.querySelector("#db-info");
    const rows = stage.querySelector("#db-rows");
    rows.innerHTML = this.produkte
      .map(
        (p) => `
        <tr data-id="${p.id}" class="db-row cursor-pointer hover:bg-slate-800">
          <td class="border border-slate-700 p-2">${p.id}</td>
          <td class="border border-slate-700 p-2">${p.name}</td>
          <td class="border border-slate-700 p-2">${p.preis} €</td>
        </tr>`
      )
      .join("");

    const colInfo = {
      id: "Die Spalte id ist der eindeutige Schlüssel jeder Zeile (Primärschlüssel).",
      name: "Die Spalte name enthält den Produktnamen — jede Zeile hat genau ein Feld dafür.",
      preis:
        "Die Spalte preis ist immer eine Zahl mit gleichem Format, egal welches Produkt.",
    };

    stage.querySelectorAll(".col-head").forEach((th) => {
      th.addEventListener("click", () => {
        info.textContent = colInfo[th.dataset.col];
        this.maybeMarkDone(container, idx);
      });
    });
    stage.querySelectorAll(".db-row").forEach((tr) => {
      tr.addEventListener("click", () => {
        const p = this.produkte.find((x) => x.id === Number(tr.dataset.id));
        info.textContent = `Zeile ${p.id}: ein vollständiger Datensatz — ${p.name} kostet ${p.preis} €.`;
        this.maybeMarkDone(container, idx);
      });
    });
  },

  maybeMarkDone(container, idx) {
    StationWizard.markDone(container, this, idx);
  },

  renderSort(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">SQL oder NoSQL?</h2>
      <p class="text-slate-400 text-sm mb-4">Ordne jede Aussage der passenden Datenbankart zu.</p>
      <div id="db-pool" class="space-y-2 mb-4"></div>
      <div class="grid grid-cols-2 gap-4">
        <div id="db-sql" data-model="SQL" class="db-bucket min-h-[8rem] p-3 rounded border-2 border-dashed border-slate-700 text-sm">
          <div class="font-semibold mb-2">🗂️ SQL (Tabellen)</div>
        </div>
        <div id="db-nosql" data-model="NoSQL" class="db-bucket min-h-[8rem] p-3 rounded border-2 border-dashed border-slate-700 text-sm">
          <div class="font-semibold mb-2">📄 NoSQL (Dokumente)</div>
        </div>
      </div>
      <div id="db-sort-result" class="mt-3 text-sm"></div>
    `;

    const pool = stage.querySelector("#db-pool");
    const result = stage.querySelector("#db-sort-result");
    const placed = {};

    const checkDone = () => {
      if (Object.keys(placed).length !== this.sortStatements.length) return;
      const correct = this.sortStatements.every(
        (s) => placed[s.text] === s.model
      );
      result.innerHTML = correct
        ? `<span class="text-emerald-400">✓ Alle Aussagen richtig zugeordnet.</span>`
        : `<span class="text-red-400">✗ Noch nicht alles richtig — schau nochmal, welche Aussage zu Tabellen und welche zu Dokumenten passt.</span>`;
      if (correct) this.maybeMarkDone(container, idx);
    };

    pool.innerHTML = [...this.sortStatements]
      .sort(() => Math.random() - 0.5)
      .map(
        (s, i) => `
        <div class="flex items-center gap-2">
          <span class="flex-1 p-2 rounded bg-slate-800 border border-slate-700 text-sm">${s.text}</span>
          <button data-i="${i}" data-target="SQL" class="place-btn px-2 py-1 rounded border border-slate-700 text-xs hover:border-sky-500">→ SQL</button>
          <button data-i="${i}" data-target="NoSQL" class="place-btn px-2 py-1 rounded border border-slate-700 text-xs hover:border-sky-500">→ NoSQL</button>
        </div>`
      )
      .join("");

    stage.querySelectorAll(".place-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const row = btn.closest("div");
        const text = row.querySelector("span").textContent;
        placed[text] = btn.dataset.target;
        const bucket = stage.querySelector(
          btn.dataset.target === "SQL" ? "#db-sql" : "#db-nosql"
        );
        bucket.insertAdjacentHTML(
          "beforeend",
          `<div class="p-1.5 rounded bg-slate-800/60 border border-slate-700 text-xs mb-1">${text}</div>`
        );
        row.remove();
        checkDone();
      });
    });
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🏁 Checkpoint — Datenbanken verstanden</h2>
      <p class="text-slate-400 text-sm mb-4">
        SQL: feste Tabellen mit Zeilen/Spalten. NoSQL: flexible Dokumente, gut für verschachtelte Daten wie Bestellungen.
        Live geübt wird das in Adminer (MySQL) und MongoDB direkt im Kurs.
      </p>
      <button id="db-checkpoint-btn" class="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-sm">✓ Checkpoint abschließen</button>
      <div id="db-checkpoint-result" class="mt-3 text-sm"></div>
    `;
    stage.querySelector("#db-checkpoint-btn").addEventListener("click", () => {
      stage.querySelector(
        "#db-checkpoint-result"
      ).innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — SQL vs. NoSQL verstanden.</span>`;
      Progress.complete("database");
      App.refreshNav();
      this.maybeMarkDone(container, idx);
    });
  },
};
