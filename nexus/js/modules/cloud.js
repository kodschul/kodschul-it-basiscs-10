// Nexus prototype — modules/cloud.js
// Maps to output/m03-cloud-deployment (Day 3, full hands-on like Day 1/2): Lab 3.1 orders the
// deployment path + IaaS/PaaS/SaaS, Lab 3.2 builds a Docker image, Lab 3.3 runs + tests the
// container. Uses its own small virtual command runner (not the shared terminal.js one, since
// it only needs a handful of docker-flavoured commands).

const CloudModule = {
  id: "cloud",
  title: "Cloud Deployment",
  day: "Tag 3 · Modul 3",

  pathCards: [
    "Website-Dateien",
    "Dockerfile",
    "Image",
    "Container",
    "Port",
    "Browser",
  ],
  serviceModels: [
    { item: "VM", model: "IaaS" },
    { item: "Plattform", model: "PaaS" },
    { item: "fertige Mail-Anwendung", model: "SaaS" },
  ],

  render(container) {
    this.built = false;
    this.running = false;

    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 03",
      missionText:
        "Bring die Bäckerei-Website vom Ordner auf dem Kursrechner bis in den Browser.",
      stations: [
        { label: "Weg planen", render: (c, s, i) => this.renderPlan(c, s, i) },
        {
          label: "Image bauen",
          render: (c, s, i) => this.renderBuild(c, s, i),
        },
        {
          label: "Container starten",
          render: (c, s, i) => this.renderRun(c, s, i),
        },
        {
          label: "Checkpoint",
          render: (c, s, i) => this.renderCheckpoint(c, s, i),
        },
      ],
    });
  },

  renderPlan(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Weg planen — vom Ordner zum Browser</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke die Karten in der richtigen Reihenfolge an, wie die Website den Browser erreicht.</p>
      <div id="path-pool" class="flex flex-wrap gap-2"></div>
      <div id="path-chosen" class="flex flex-wrap gap-2 mt-4 min-h-[2.5rem] p-2 rounded border border-dashed border-slate-700"></div>
      <div id="path-result" class="mt-3 text-sm"></div>

      <h3 class="text-sm font-semibold mt-6 mb-2">Service-Modelle zuordnen</h3>
      <p class="text-slate-400 text-sm mb-3">Ordne jeden Begriff seinem Service-Modell zu.</p>
      <div id="model-items" class="flex flex-wrap gap-2"></div>
      <div id="model-result" class="mt-2 text-sm"></div>
    `;

    const pool = stage.querySelector("#path-pool");
    const chosen = stage.querySelector("#path-chosen");
    const result = stage.querySelector("#path-result");
    let picked = [];

    const renderPool = () => {
      const shuffled = this.pathCards.filter((c) => !picked.includes(c));
      pool.innerHTML = shuffled
        .map(
          (c) =>
            `<button data-c="${c}" class="level-card px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-sky-500 text-sm">${c}</button>`
        )
        .join("");
      pool.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          picked.push(btn.dataset.c);
          renderPool();
          renderChosen();
        });
      });
    };

    const renderChosen = () => {
      chosen.innerHTML = picked
        .map(
          (c, i) =>
            `<span class="px-2 py-1 rounded bg-sky-900/40 border border-sky-700 text-sm">${
              i + 1
            }. ${c}</span>`
        )
        .join("");
      if (picked.length === this.pathCards.length) {
        const correct = picked.every((c, i) => c === this.pathCards[i]);
        result.innerHTML = correct
          ? `<span class="text-emerald-400">✓ Genau dieser Weg: Website-Dateien → Dockerfile → Image → Container → Port → Browser.</span>`
          : `<span class="text-red-400">✗ Noch nicht in der richtigen Reihenfolge — Reset und nochmal probieren.</span>`;
        if (correct) this.maybeMarkDone(container, idx);
      }
    };

    stage.insertAdjacentHTML(
      "beforeend",
      `<button id="path-reset" class="mt-2 text-xs text-red-400 hover:text-red-300">↺ Reihenfolge zurücksetzen</button>`
    );
    stage.querySelector("#path-reset").addEventListener("click", () => {
      picked = [];
      result.textContent = "";
      renderPool();
      renderChosen();
    });

    renderPool();
    renderChosen();

    const modelItems = stage.querySelector("#model-items");
    const modelResult = stage.querySelector("#model-result");
    const answers = {};
    modelItems.innerHTML = this.serviceModels
      .map(
        (m) => `
        <div class="p-2 rounded bg-slate-800 border border-slate-700 text-sm flex items-center gap-2">
          <span>${m.item}</span>
          <select data-item="${m.item}" class="bg-slate-900 border border-slate-700 rounded text-xs px-1 py-0.5">
            <option value="">?</option>
            <option value="IaaS">IaaS</option>
            <option value="PaaS">PaaS</option>
            <option value="SaaS">SaaS</option>
          </select>
        </div>`
      )
      .join("");
    modelItems.querySelectorAll("select").forEach((sel) => {
      sel.addEventListener("change", () => {
        answers[sel.dataset.item] = sel.value;
        const allSet = this.serviceModels.every((m) => answers[m.item]);
        if (allSet) {
          const correct = this.serviceModels.every(
            (m) => answers[m.item] === m.model
          );
          modelResult.innerHTML = correct
            ? `<span class="text-emerald-400">✓ Richtig zugeordnet.</span>`
            : `<span class="text-red-400">✗ Noch nicht ganz — VM = IaaS, Plattform = PaaS, fertige App = SaaS.</span>`;
          if (correct) this.maybeMarkDone(container, idx);
        }
      });
    });
  },

  maybeMarkDone(container, idx) {
    StationWizard.markDone(container, this, idx);
  },

  makeCloudFs() {
    return {
      "site/index.html": "<h1>Bäckerei Sonnenkorn</h1>",
      Dockerfile: "FROM nginx:alpine\nCOPY site/ /usr/share/nginx/html/",
    };
  },

  terminalBoxHtml() {
    return `
      <div class="bg-black rounded border border-slate-700 p-3">
        <div id="cloud-output" class="text-sm min-h-[3rem] max-h-48 overflow-y-auto mb-2"></div>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-sky-400">baeckerei-site $</span>
          <input id="cloud-input" class="flex-1 bg-transparent outline-none" style="color:#4ade80" autocomplete="off" />
        </div>
      </div>
    `;
  },

  printLine(stage, text) {
    const out = stage.querySelector("#cloud-output");
    out.innerHTML += `<div>${text}</div>`;
    out.scrollTop = out.scrollHeight;
  },

  renderBuild(container, stage, idx) {
    this.fs = this.makeCloudFs();
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Image bauen</h2>
      <div class="kd-cmd-row"><code>ls</code><code>cat Dockerfile</code><code>docker build -t baeckerei-site .</code><code>docker image ls</code></div>
      ${this.terminalBoxHtml()}
    `;
    this.printLine(
      stage,
      "Willkommen im Deployment-Terminal. Tippe 'help' für Befehle."
    );
    const input = stage.querySelector("#cloud-input");
    input.addEventListener("focus", () =>
      input.scrollIntoView({ block: "center", behavior: "smooth" })
    );
    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const val = e.target.value.trim();
      e.target.value = "";
      this.printLine(stage, `baeckerei-site $ ${val}`);
      this.runBuildCmd(val, stage, container, idx);
    });
  },

  runBuildCmd(cmdline, stage, container, idx) {
    if (cmdline === "help") {
      this.printLine(
        stage,
        "Befehle: ls, cat Dockerfile, docker build -t baeckerei-site ., docker image ls"
      );
    } else if (cmdline === "ls") {
      this.printLine(stage, Object.keys(this.fs).join("  "));
    } else if (cmdline === "cat Dockerfile") {
      this.printLine(stage, this.fs.Dockerfile.replace(/\n/g, "<br/>"));
    } else if (cmdline === "docker build -t baeckerei-site .") {
      this.printLine(
        stage,
        "Sending build context...<br/>Step 1/2 : FROM nginx:alpine<br/>Step 2/2 : COPY site/ /usr/share/nginx/html/<br/>Successfully built baeckerei-site"
      );
      this.built = true;
    } else if (cmdline === "docker image ls") {
      this.printLine(
        stage,
        this.built
          ? "REPOSITORY&nbsp;&nbsp;&nbsp;&nbsp;TAG<br/>baeckerei-site&nbsp;&nbsp;&nbsp;&nbsp;latest"
          : "(kein Image gefunden — erst 'docker build -t baeckerei-site .' ausführen)"
      );
      if (this.built) this.maybeMarkDone(container, idx);
    } else {
      this.printLine(stage, `Befehl nicht gefunden: ${cmdline}`);
    }
  },

  renderRun(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Container starten &amp; testen</h2>
      <div class="kd-cmd-row"><code>docker run -p 8080:80 --name baeckerei-web baeckerei-site</code><code>docker ps</code></div>
      ${this.terminalBoxHtml()}
      <div id="cloud-preview" class="mt-4 p-4 rounded border border-slate-700 bg-slate-900 text-center text-sm text-slate-500">
        🌐 http://localhost:8080 — noch nicht erreichbar
      </div>
    `;
    this.printLine(
      stage,
      "Container-Sandbox bereit. Tippe 'help' für Befehle."
    );
    const input = stage.querySelector("#cloud-input");
    input.addEventListener("focus", () =>
      input.scrollIntoView({ block: "center", behavior: "smooth" })
    );
    input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const val = e.target.value.trim();
      e.target.value = "";
      this.printLine(stage, `baeckerei-site $ ${val}`);
      this.runRunCmd(val, stage, container, idx);
    });
  },

  runRunCmd(cmdline, stage, container, idx) {
    const preview = stage.querySelector("#cloud-preview");
    if (cmdline === "help") {
      this.printLine(
        stage,
        "Befehle: docker run -p 8080:80 --name baeckerei-web baeckerei-site, docker ps"
      );
    } else if (
      cmdline === "docker run -p 8080:80 --name baeckerei-web baeckerei-site"
    ) {
      if (!this.built) {
        this.printLine(
          stage,
          "Fehler: kein Image 'baeckerei-site' — erst in 'Image bauen' erstellen."
        );
        return;
      }
      this.printLine(stage, "Container baeckerei-web gestartet.");
      this.running = true;
      preview.innerHTML =
        "🌐 http://localhost:8080 — <span class='text-emerald-400'>Bäckerei Sonnenkorn</span> ist online.";
      this.maybeMarkDone(container, idx);
    } else if (cmdline === "docker ps") {
      this.printLine(
        stage,
        this.running
          ? "CONTAINER&nbsp;&nbsp;&nbsp;&nbsp;IMAGE&nbsp;&nbsp;&nbsp;&nbsp;PORTS<br/>baeckerei-web&nbsp;&nbsp;&nbsp;&nbsp;baeckerei-site&nbsp;&nbsp;&nbsp;&nbsp;0.0.0.0:8080->80"
          : "(kein laufender Container)"
      );
    } else {
      this.printLine(stage, `Befehl nicht gefunden: ${cmdline}`);
    }
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🏁 Checkpoint — Website erreichbar gemacht</h2>
      <p class="text-slate-400 text-sm mb-4">
        Website-Ordner → Dockerfile → Image → Container → Port → Browser: du hast den ganzen Weg einmal durchlaufen.
      </p>
      <button id="cloud-checkpoint-btn" class="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-sm">✓ Checkpoint abschließen</button>
      <div id="cloud-checkpoint-result" class="mt-3 text-sm"></div>
    `;
    stage
      .querySelector("#cloud-checkpoint-btn")
      .addEventListener("click", () => {
        stage.querySelector(
          "#cloud-checkpoint-result"
        ).innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — Deployment-Weg verstanden.</span>`;
        Progress.complete("cloud");
        App.refreshNav();
        this.maybeMarkDone(container, idx);
      });
  },
};
