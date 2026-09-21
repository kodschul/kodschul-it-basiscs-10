// Nexus prototype — modules/networking.js
// Maps to approved_agenda.md Modul 2 Praxis: Netzwerkdiagramm erstellen, Server/Client-
// Rollenverteilung, Browseranfrage mit Paket-Beispiel nachspielen, Webserver-Grundlagen.
// Framed per idea/interactive_idea.md's "Become the Internet" Tag-2 rewrite: request/response
// animation, IP addressing, ports, DNS, and a "break something" diagnostic simulator.

const NetworkingModule = {
  id: "networking",
  title: "Netzwerke",
  day: "Tag 2 · Modul 2",

  hosts: {
    A: { name: "Computer A", ip: "192.168.1.10" },
    B: { name: "Computer B (bakery.local)", ip: "192.168.1.20" },
  },

  ports: [
    { port: 22, service: "SSH" },
    { port: 80, service: "Web" },
    { port: 443, service: "HTTPS" },
    { port: 3306, service: "Datenbank" },
  ],

  breakables: { dns: false, port: false, offline: false },

  render(container) {
    this.breakables = { dns: false, port: false, offline: false };

    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 02",
      missionText:
        "Gestern hattest du einen Computer. Heute verbindest du Computer miteinander.",
      stations: [
        {
          label: "Client & Server",
          render: (c, s, i) => this.renderClientServer(c, s, i),
        },
        {
          label: "IP-Adressen",
          render: (c, s, i) => this.renderIpChallenge(c, s, i),
        },
        {
          label: "Ports",
          render: (c, s, i) => this.renderPortChallenge(c, s, i),
        },
        { label: "DNS", render: (c, s, i) => this.renderDnsLookup(c, s, i) },
        {
          label: "Fehler-Simulator",
          render: (c, s, i) => this.renderBreakSimulator(c, s, i),
        },
        {
          label: "Checkpoint",
          render: (c, s, i) => this.renderCheckpoint(c, s, i),
        },
        { label: "Quiz", render: (c, s, i) => this.renderQuiz(c, s, i) },
      ],
    });
  },

  renderClientServer(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🧠 Explore — Client & Server</h2>
      <p class="text-slate-400 text-sm mb-4">Klicke "Anfrage senden" und beobachte, was zwischen Client und Server passiert.</p>
      <div class="flex items-center justify-between max-w-md mx-auto">
        <div id="net-client" class="net-box px-2 py-2 rounded border border-slate-700 bg-slate-800 text-sm text-center w-32">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Macbook_Air.jpg?width=120" alt="Client" loading="lazy" class="w-full h-16 object-cover rounded mb-1" />CLIENT
        </div>
        <div class="flex-1 relative h-8 mx-2">
          <div id="net-packet" class="absolute top-1/2 -translate-y-1/2 left-0 text-lg transition-all duration-700">📨</div>
          <div class="border-t border-dashed border-slate-600 mt-4"></div>
        </div>
        <div id="net-server" class="net-box px-2 py-2 rounded border border-slate-700 bg-slate-800 text-sm text-center w-32">
          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/My_Opera_Server.jpg?width=120" alt="Server" loading="lazy" class="w-full h-16 object-cover rounded mb-1" />SERVER
        </div>
      </div>
      <div class="text-center mt-4">
        <button id="net-send" class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-sm font-medium">📨 Anfrage senden</button>
      </div>
      <div id="net-explain" class="mt-3 text-sm text-slate-300 min-h-[1.5rem] text-center"></div>
    `;

    const btn = stage.querySelector("#net-send");
    const packet = stage.querySelector("#net-packet");
    const explain = stage.querySelector("#net-explain");

    btn.addEventListener("click", async () => {
      btn.disabled = true;
      explain.textContent = "Client sendet eine Anfrage (Request) ...";
      packet.style.left = "0%";
      packet.textContent = "📨";
      await new Promise((r) => setTimeout(r, 50));
      packet.style.left = "calc(100% - 1.5rem)";
      await new Promise((r) => setTimeout(r, 750));
      explain.textContent =
        "Server empfängt die Anfrage und sendet eine Antwort (Response) zurück ...";
      packet.textContent = "📩";
      await new Promise((r) => setTimeout(r, 50));
      packet.style.left = "0%";
      await new Promise((r) => setTimeout(r, 750));
      explain.textContent =
        "Fertig — das ist der Grundzyklus jeder Webseite: Request → Response.";
      btn.disabled = false;
      StationWizard.markDone(container, this, idx);
    });
  },

  renderIpChallenge(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🎮 Experiment — IP-Adressen</h2>
      <p class="text-slate-400 text-sm mb-4">Computer A will Computer B erreichen. Trage die richtige IP-Adresse ein.</p>
      <div class="flex items-center gap-4">
        <div class="p-3 rounded border border-slate-700 bg-slate-800 text-sm">💻 ${this.hosts.A.name}<br/><span class="text-slate-500">${this.hosts.A.ip}</span></div>
        <span class="text-slate-500">→ ?</span>
        <div class="p-3 rounded border border-slate-700 bg-slate-800 text-sm">🖥️ ${this.hosts.B.name}</div>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <input id="ip-input" placeholder="z.B. 192.168.1.20" class="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm w-48" />
        <button id="ip-check" class="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm">Senden</button>
      </div>
      <div id="ip-result" class="mt-2 text-sm"></div>
    `;

    const input = stage.querySelector("#ip-input");
    const result = stage.querySelector("#ip-result");
    stage.querySelector("#ip-check").addEventListener("click", () => {
      if (input.value.trim() === this.hosts.B.ip) {
        result.innerHTML = `<span class="text-emerald-400">✓ Richtig — die Nachricht kommt bei ${this.hosts.B.name} an.</span>`;
        StationWizard.markDone(container, this, idx);
      } else {
        result.innerHTML = `<span class="text-red-400">✗ Falsche Adresse — die Nachricht geht ins Leere.</span>`;
      }
    });
  },

  renderPortChallenge(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🎮 Experiment — Ports (welche Tür?)</h2>
      <p class="text-slate-400 text-sm mb-4">Du willst die Website von ${this.hosts.B.name} öffnen. Welche Tür (Port) klopfst du an?</p>
      <div id="port-doors" class="flex gap-3"></div>
      <div id="port-result" class="mt-2 text-sm"></div>
    `;

    const doors = stage.querySelector("#port-doors");
    const result = stage.querySelector("#port-result");
    doors.innerHTML = this.ports
      .map(
        (p) =>
          `<button data-port="${p.port}" class="port-btn px-3 py-2 rounded border border-slate-700 bg-slate-800 hover:border-sky-500 text-sm">:${p.port} ${p.service}</button>`
      )
      .join("");
    doors.querySelectorAll(".port-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (Number(btn.dataset.port) === 80) {
          result.innerHTML = `<span class="text-emerald-400">✓ Port 80 — das ist die Web-Tür.</span>`;
          StationWizard.markDone(container, this, idx);
        } else {
          result.innerHTML = `<span class="text-red-400">✗ Das ist die falsche Tür für eine Website.</span>`;
        }
      });
    });
  },

  renderDnsLookup(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🎮 Experiment — DNS-Lookup</h2>
      <p class="text-slate-400 text-sm mb-4">Niemand merkt sich IP-Adressen. Gib den Namen ein und beobachte die Auflösung.</p>
      <div class="flex items-center gap-2">
        <input id="dns-input" value="bakery.local" class="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm w-48" />
        <button id="dns-lookup" class="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm">🔍 Lookup</button>
      </div>
      <div id="dns-flow" class="mt-3 flex items-center gap-2 text-sm text-slate-400"></div>
    `;

    const input = stage.querySelector("#dns-input");
    const flow = stage.querySelector("#dns-flow");
    stage.querySelector("#dns-lookup").addEventListener("click", async () => {
      const name = input.value.trim();
      flow.innerHTML = `<span>${name}</span>`;
      await new Promise((r) => setTimeout(r, 300));
      flow.innerHTML += ` <span class="text-slate-600">→</span> <span class="text-sky-400">DNS-Server fragt nach ...</span>`;
      await new Promise((r) => setTimeout(r, 600));
      if (this.breakables.dns) {
        flow.innerHTML += ` <span class="text-slate-600">→</span> <span class="text-red-400">❌ keine Antwort (DNS kaputt)</span>`;
      } else if (name === "bakery.local") {
        flow.innerHTML += ` <span class="text-slate-600">→</span> <span class="text-emerald-400">${this.hosts.B.ip}</span>`;
        StationWizard.markDone(container, this, idx);
      } else {
        flow.innerHTML += ` <span class="text-slate-600">→</span> <span class="text-red-400">❌ unbekannter Name</span>`;
      }
    });
  },

  renderBreakSimulator(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🧪 Playground — Netzwerk-Fehlersimulator</h2>
      <p class="text-slate-400 text-sm mb-4">Brich etwas absichtlich kaputt und beobachte, was sich ändert. Was ist die Ursache?</p>
      <div class="flex gap-2 mb-3">
        <button data-break="dns" class="break-btn px-3 py-1 rounded border border-red-700 text-red-300 text-sm hover:bg-red-950">💥 DNS brechen</button>
        <button data-break="port" class="break-btn px-3 py-1 rounded border border-red-700 text-red-300 text-sm hover:bg-red-950">💥 Port schließen</button>
        <button data-break="offline" class="break-btn px-3 py-1 rounded border border-red-700 text-red-300 text-sm hover:bg-red-950">💥 Server offline</button>
        <button id="break-reset" class="px-3 py-1 rounded border border-slate-700 text-slate-300 text-sm hover:bg-slate-800">↺ Reparieren</button>
      </div>
      <div id="break-status" class="p-3 rounded bg-slate-800 text-sm min-h-[2rem]"></div>
    `;

    const status = stage.querySelector("#break-status");
    const render = () => {
      const active = Object.entries(this.breakables)
        .filter(([, v]) => v)
        .map(([k]) => k);
      if (active.length === 0) {
        status.innerHTML = `<span class="text-emerald-400">Alles funktioniert normal.</span>`;
        return;
      }
      const labels = {
        dns: "DNS antwortet nicht — Namen funktionieren nicht, aber die IP direkt schon.",
        port: "Port 80 ist geschlossen — die Website ist nicht erreichbar, ping funktioniert trotzdem.",
        offline:
          "Server ist komplett offline — nichts kommt mehr an, auch kein ping.",
      };
      status.innerHTML = active
        .map((k) => `<div class="text-amber-400">⚠️ ${labels[k]}</div>`)
        .join("");
      StationWizard.markDone(container, this, idx);
    };

    stage.querySelectorAll(".break-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.breakables[btn.dataset.break] = true;
        render();
      });
    });
    stage.querySelector("#break-reset").addEventListener("click", () => {
      this.breakables = { dns: false, port: false, offline: false };
      render();
    });
    render();
  },

  renderCheckpoint(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">🏁 Checkpoint — Baue eine Docker-Verbindung</h2>
      <p class="text-slate-400 text-sm mb-4">
        Jetzt real: verbinde zwei Container per <code>docker compose</code> und teste mit <code>ping</code> in der
        <button id="goto-terminal" class="underline text-sky-400 hover:text-sky-300">Terminal-Sandbox</button>. Bestätige hier, wenn es funktioniert hat.
      </p>
      <button id="net-checkpoint-btn" class="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-sm">✓ Ping erfolgreich — Checkpoint abschließen</button>
      <div id="net-checkpoint-result" class="mt-3 text-sm"></div>
    `;

    stage
      .querySelector("#goto-terminal")
      .addEventListener("click", () => App.openModuleById("terminal"));
    stage.querySelector("#net-checkpoint-btn").addEventListener("click", () => {
      stage.querySelector(
        "#net-checkpoint-result"
      ).innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — Netzwerk-Grundlagen verstanden. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
      StationWizard.markDone(container, this, idx);
    });
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.networking, {
      onPass: () => {
        Progress.complete("networking");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
