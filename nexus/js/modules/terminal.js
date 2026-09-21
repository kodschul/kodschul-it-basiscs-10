// Nexus prototype — modules/terminal.js
// Maps to output/m01-computer-basics-os/l06-konsole-erste-befehle (Lab 1.6 "Die Bäckerei im
// Terminal verwalten"): Teil A baut die Ordnerstruktur baeckerei/produkte,kunden,
// bestellungen auf, Teil B sucht rechnung_2025.txt in suchspiel/. Same four commands
// (mkdir/cd/touch/ls) plus cat to read the found file. JS-only virtual filesystem, no
// real container (see Open Questions in idea/nexus_spec.md).

const TerminalModule = {
  id: "terminal",
  title: "Terminal",
  day: "Tag 1 · Modul 1",

  makeFs() {
    // suchspiel: rechnung_2025.txt sits 3 levels deep, surrounded by dead-end folders,
    // matching l06-konsole-erste-befehle-exc.md Teil B exactly.
    return {
      name: "/",
      type: "dir",
      children: {
        home: {
          name: "home",
          type: "dir",
          children: {
            baeckerei: { name: "baeckerei", type: "dir", children: {} },
            suchspiel: {
              name: "suchspiel",
              type: "dir",
              children: {
                archiv: {
                  name: "archiv",
                  type: "dir",
                  children: {
                    2024: { name: "2024", type: "dir", children: {} },
                    2025: {
                      name: "2025",
                      type: "dir",
                      children: {
                        angebote: {
                          name: "angebote",
                          type: "dir",
                          children: {},
                        },
                        rechnungen: {
                          name: "rechnungen",
                          type: "dir",
                          children: {
                            "rechnung_2025.txt": {
                              name: "rechnung_2025.txt",
                              type: "file",
                              content:
                                "Rechnung Mai 2025 — Bäckerei Sonnenkorn",
                            },
                          },
                        },
                      },
                    },
                  },
                },
                temp: {
                  name: "temp",
                  type: "dir",
                  children: {
                    backup: { name: "backup", type: "dir", children: {} },
                  },
                },
              },
            },
          },
        },
      },
    };
  },

  render(container) {
    this.rootContainer = container;
    this.fs = this.makeFs();
    this.cwd = ["/", "home"]; // start at /home
    this.foundCode = false;

    StationWizard.mount(container, this, {
      missionLabel: "🕵️ Mission 01c",
      missionText:
        "Verwalte die Bäckerei im Terminal — erst aufbauen, dann eine verlorene Datei finden.",
      stations: [
        {
          label: "Teil A: Bauen",
          render: (c, s, i) => this.renderPartA(c, s, i),
        },
        {
          label: "Teil B: Suchen",
          render: (c, s, i) => this.renderPartB(c, s, i),
        },
        {
          label: "Teil C: Quiz",
          render: (c, s, i) => this.renderQuiz(c, s, i),
        },
      ],
    });
  },

  renderPartA(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Teil A — Die Bäckerei im Terminal bauen</h2>
      <p class="kd-hint">Baue unter <code>baeckerei/</code> die Ordner <code>produkte</code>, <code>kunden</code>, <code>bestellungen</code> — je mit einer Datei darin.</p>
      <div class="kd-cmd-row"><code>pwd</code><code>ls</code><code>cd &lt;ordner&gt;</code><code>mkdir &lt;name&gt;</code><code>touch &lt;name&gt;</code><code>cat &lt;datei&gt;</code></div>
      ${this.terminalBoxHtml()}
      <button id="terminal-reset" class="mt-2 text-xs text-red-400 hover:text-red-300">↺ Sandbox zurücksetzen</button>
    `;
    this.wireTerminal(stage);
    stage.querySelector("#terminal-reset").addEventListener("click", () => {
      this.render(this.rootContainer);
    });
  },

  renderPartB(container, stage, idx) {
    stage.innerHTML = `
      <h2 class="text-lg font-semibold mb-1">Teil B — Mission "Finde die Datei"</h2>
      <p class="kd-hint">Unter <code>suchspiel/</code> liegt <code>rechnung_2025.txt</code>, umgeben von Sackgassen-Ordnern.</p>
      <div class="kd-cmd-row"><code>ls</code><code>cd</code><code>cd ..</code><code>cat</code></div>
      ${this.terminalBoxHtml()}
      <div id="escape-status" class="text-sm text-slate-400 mt-3">Noch nicht gefunden.</div>
    `;
    this.wireTerminal(stage);
    this.escapeStage = stage;
    this.escapeStationIdx = idx;
  },

  terminalBoxHtml() {
    return `
      <div class="bg-black rounded border border-slate-700 p-3">
        <div id="terminal-output" class="text-sm min-h-[3rem] max-h-56 overflow-y-auto mb-2"></div>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-sky-400" id="terminal-prompt" style="color:#4ade80"></span>
          <input id="terminal-input" class="flex-1 bg-transparent outline-none" style="color:#4ade80" autocomplete="off" spellcheck="false" />
        </div>
      </div>
    `;
  },

  wireTerminal(stage) {
    this.printLine(
      stage,
      "Willkommen in der Nexus-Terminal-Sandbox. Tippe 'help' für Befehle."
    );
    this.updatePrompt(stage);

    const input = stage.querySelector("#terminal-input");
    // keeps the input line on screen even if the box sits low on a short viewport
    input.addEventListener("focus", () =>
      input.scrollIntoView({ block: "center", behavior: "smooth" })
    );
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = e.target.value;
        e.target.value = "";
        this.printLine(stage, `${this.promptText()} ${val}`);
        this.run(val.trim(), stage);
      }
    });
  },

  cwdNode() {
    let node = this.fs;
    for (const part of this.cwd.slice(1)) node = node.children[part];
    return node;
  },

  promptText() {
    return `${this.cwd.join("/").replace("//", "/")} $`;
  },

  updatePrompt(stage) {
    stage.querySelector("#terminal-prompt").textContent = this.promptText();
  },

  printLine(stage, text) {
    const out = stage.querySelector("#terminal-output");
    out.innerHTML += `<div>${text}</div>`;
    out.scrollTop = out.scrollHeight;
  },

  run(cmdline, stage) {
    if (!cmdline) return;
    const [cmd, ...args] = cmdline.split(/\s+/);
    const node = this.cwdNode();

    switch (cmd) {
      case "help":
        this.printLine(stage, "Befehle: pwd, ls, cd, mkdir, touch, cat");
        break;
      case "pwd":
        this.printLine(stage, this.cwd.join("/").replace("//", "/"));
        break;
      case "ls":
        this.printLine(
          stage,
          Object.keys(node.children || {}).join("  ") || "(leer)"
        );
        break;
      case "cd": {
        const target = args[0];
        if (!target || target === ".") break;
        if (target === "..") {
          if (this.cwd.length > 1) this.cwd.pop();
        } else if (
          node.children[target] &&
          node.children[target].type === "dir"
        ) {
          this.cwd.push(target);
        } else {
          this.printLine(stage, `cd: ${target}: kein solcher Ordner`);
        }
        break;
      }
      case "mkdir": {
        const name = args[0];
        if (!name) {
          this.printLine(stage, "mkdir: Name fehlt");
          break;
        }
        node.children[name] = { name, type: "dir", children: {} };
        break;
      }
      case "touch": {
        const name = args[0];
        if (!name) {
          this.printLine(stage, "touch: Name fehlt");
          break;
        }
        node.children[name] = { name, type: "file", content: "" };
        break;
      }
      case "cat": {
        const name = args[0];
        const file = node.children[name];
        if (!file || file.type !== "file") {
          this.printLine(stage, `cat: ${name}: keine Datei`);
          break;
        }
        this.printLine(stage, file.content || "(leer)");
        if (name === "rechnung_2025.txt") {
          this.foundCode = true;
          const status = this.escapeStage?.querySelector("#escape-status");
          if (status) {
            status.innerHTML = `<span class="checkpoint-passed inline-block text-emerald-400 font-semibold">✓ CHECKPOINT PASSED — Datei gefunden: ${file.content}. Weiter zum Quiz, um das Modul abzuschließen.</span>`;
          }
          StationWizard.markDone(
            this.rootContainer,
            this,
            this.escapeStationIdx
          );
        }
        break;
      }
      default:
        this.printLine(stage, `${cmd}: Befehl nicht gefunden`);
    }
    this.updatePrompt(stage);
  },

  renderQuiz(container, stage, idx) {
    TopicQuiz.mount(stage, QuizBank.terminal, {
      onPass: () => {
        Progress.complete("terminal");
        App.refreshNav();
        StationWizard.markDone(container, this, idx);
      },
    });
  },
};
