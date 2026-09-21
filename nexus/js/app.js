// Nexus prototype — app.js
// Module-only navigation: a full-screen module picker is the only entry point, no sidebar.
// Later Nexus modules (networking, docker, web, database, exam) plug into this same App object.

const App = (() => {
  const modules = [
    ComputerModule,
    CodingModule,
    IoDevicesModule,
    OsModule,
    FilesystemModule,
    TerminalModule,
    NetworkingModule,
    CloudModule,
    DatabaseModule,
    VirtualizationModule,
    QuizModule,
  ];

  function updateProgress() {
    const done = Progress.completedCount(modules.map((m) => m.id));
    document.getElementById(
      "module-progress"
    ).textContent = `${done}/${modules.length}`;
    document.getElementById("progress-fill").style.width = `${
      (done / modules.length) * 100
    }%`;
  }

  function renderHome() {
    document.getElementById("module-title").textContent = "";
    updateProgress();

    const content = document.getElementById("module-content");
    content.innerHTML = `
      <div class="kd-home">
        <h1 class="kd-home-heading">Module</h1>
        <div id="home-grid" class="kd-module-grid"></div>
      </div>
    `;

    const grid = content.querySelector("#home-grid");
    grid.innerHTML = modules
      .map((m, i) => {
        const done = Progress.isComplete(m.id);
        return `
        <button data-id="${m.id}" class="kd-module-card${
          done ? " is-done" : ""
        }">
          ${done ? '<span class="kd-module-check">✓</span>' : ""}
          <div class="kd-module-number">${i + 1}</div>
          <div class="kd-module-name">${m.title}</div>
          <div class="kd-module-status${done ? " is-done" : ""}">${
          done ? "Abgeschlossen" : "Noch offen"
        }</div>
        </button>`;
      })
      .join("");

    grid.querySelectorAll(".kd-module-card").forEach((btn) => {
      btn.addEventListener("click", () => openModule(btn.dataset.id));
    });
  }

  function openModule(id) {
    const mod = modules.find((m) => m.id === id);
    if (!mod) return;
    document.getElementById("module-title").textContent = mod.title;
    updateProgress();

    const content = document.getElementById("module-content");
    content.innerHTML = `
      <button id="back-to-overview" class="kd-back-link">← Zur Übersicht</button>
      <div id="module-mount"></div>
    `;
    content
      .querySelector("#back-to-overview")
      .addEventListener("click", renderHome);
    mod.render(content.querySelector("#module-mount"));
  }

  function refreshNav() {
    updateProgress();
  }

  function openModuleById(id) {
    openModule(id);
  }

  function init() {
    document.getElementById("go-home").addEventListener("click", renderHome);
    document.getElementById("reset-all").addEventListener("click", () => {
      if (confirm("Gesamten Fortschritt zurücksetzen?")) {
        Progress.resetAll();
        renderHome();
      }
    });
    renderHome();
  }

  return { init, refreshNav, openModuleById };
})();

document.addEventListener("DOMContentLoaded", App.init);
