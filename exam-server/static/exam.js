// Abschlusspruefung exam-server — TN frontend.
// Never fetches correct answers/reference solutions ahead of time: the server only ever
// sends question text + options, and only after the trainer opened the exam and this TN
// has created a session. Resumes an in-progress session from localStorage on reload.

const App = {
  session: null,
  name: null,

  async api(path, options) {
    const res = await fetch(path, options);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Request fehlgeschlagen (${res.status})`);
    }
    return res.json();
  },

  letters: ["a", "b", "c", "d"],

  async init() {
    this.session = localStorage.getItem("exam-session-id");
    this.pollStatus();
  },

  async pollStatus() {
    const root = document.getElementById("app");
    let status;
    try {
      status = await this.api("/api/status");
    } catch (e) {
      root.innerHTML = `<div class="text-red-400">Server nicht erreichbar. Neu laden...</div>`;
      setTimeout(() => this.pollStatus(), 3000);
      return;
    }

    if (!status.open) {
      root.innerHTML = `
        <div class="text-center mt-24 space-y-3">
          <div class="text-2xl font-semibold">Abschlussprüfung</div>
          <div class="text-slate-400">Warte auf die Freigabe durch den Trainer...</div>
          <div class="animate-pulse text-sky-400">●</div>
        </div>
      `;
      setTimeout(() => this.pollStatus(), 3000);
      return;
    }

    if (this.session) {
      try {
        const mine = await this.api(`/api/mysession?session=${this.session}`);
        this.name = mine.name;
        if (mine.status === "submitted") return this.renderSubmitted();
        if (mine.status === "wahlteil") return this.renderWahlteilPicker();
        return this.renderPflichtteil();
      } catch (e) {
        localStorage.removeItem("exam-session-id");
        this.session = null;
      }
    }

    this.renderNameForm();
  },

  renderNameForm() {
    const root = document.getElementById("app");
    root.innerHTML = `
      <div class="max-w-md mx-auto mt-16 space-y-4">
        <div class="text-2xl font-semibold text-center">Abschlussprüfung</div>
        <p class="text-slate-400 text-center">Die Prüfung ist freigegeben. Bitte Namen eingeben, um zu starten.</p>
        <input id="name-input" class="w-full p-2 rounded border border-slate-700 bg-slate-900" placeholder="Vor- und Nachname" />
        <button id="start-btn" class="w-full px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 font-medium">Prüfung starten</button>
        <p id="name-error" class="text-red-400 text-sm"></p>
      </div>
    `;
    root.querySelector("#start-btn").addEventListener("click", async () => {
      const name = root.querySelector("#name-input").value.trim();
      if (!name) {
        root.querySelector("#name-error").textContent = "Bitte Namen eingeben.";
        return;
      }
      try {
        const res = await this.api("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });
        this.session = res.session_id;
        this.name = name;
        localStorage.setItem("exam-session-id", this.session);
        this.renderPflichtteil();
      } catch (e) {
        root.querySelector("#name-error").textContent = e.message;
      }
    });
  },

  async renderPflichtteil() {
    const root = document.getElementById("app");
    const data = await this.api(`/api/pflichtteil?session=${this.session}`);
    const questions = data.questions;
    const answers = new Array(questions.length).fill(null);
    let current = 0;

    root.innerHTML = `
      <div class="space-y-4">
        <div class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border border-slate-700 rounded p-3 flex items-center justify-between">
          <div class="text-xs uppercase tracking-wide text-slate-400">Pflichtteil</div>
          <div id="exam-timer" class="text-lg font-semibold"></div>
          <div id="exam-progress" class="text-sm text-slate-400"></div>
        </div>
        <div id="exam-stage"></div>
      </div>
    `;
    const stage = root.querySelector("#exam-stage");
    const timerEl = root.querySelector("#exam-timer");
    const progressEl = root.querySelector("#exam-progress");

    let submitted = false;
    const finish = async () => {
      if (submitted) return;
      submitted = true;
      clearInterval(tick);
      stage.innerHTML = `<div class="text-slate-400">Wird abgegeben...</div>`;
      const result = await this.api("/api/pflichtteil/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session: this.session, answers }),
      });
      this.renderPflichtteilResults(result);
    };

    const tick = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((data.deadline - Date.now()) / 1000)
      );
      const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
      const ss = String(remaining % 60).padStart(2, "0");
      timerEl.textContent = `⏱ ${mm}:${ss}`;
      timerEl.classList.toggle("text-red-400", remaining <= 60);
      if (remaining <= 0) finish();
    }, 250);

    const renderQuestion = () => {
      const q = questions[current];
      const isLast = current === questions.length - 1;
      progressEl.textContent = `Frage ${current + 1} / ${questions.length}`;
      stage.innerHTML = `
        <div class="p-3 rounded border border-slate-700 bg-slate-800">
          <div class="text-xs text-slate-500 mb-1">${q.module}</div>
          <div class="font-medium mb-3">${q.q}</div>
          <div class="space-y-2">
            ${q.options
              .map(
                (opt, oi) => `
              <button data-i="${oi}" class="exam-option-btn w-full text-left flex items-center gap-2 p-2 rounded border ${
                  answers[current] === oi
                    ? "border-sky-500 bg-sky-900/30"
                    : "border-slate-700"
                } hover:border-sky-500 bg-slate-900 text-sm">
                <span class="text-slate-500">${this.letters[oi]})</span> ${opt}
              </button>
            `
              )
              .join("")}
          </div>
        </div>
        <div class="flex items-center justify-between mt-4">
          <button id="exam-back" class="px-3 py-1.5 rounded border border-slate-700 text-sm${
            current === 0
              ? " opacity-40 cursor-not-allowed"
              : " hover:border-sky-500"
          }"${current === 0 ? " disabled" : ""}>← Zurück</button>
          <button id="exam-next" class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm font-medium">${
            isLast ? "Abgeben" : "Weiter →"
          }</button>
        </div>
      `;
      stage.querySelectorAll(".exam-option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          answers[current] = Number(btn.dataset.i);
          renderQuestion();
        });
      });
      stage.querySelector("#exam-back").addEventListener("click", () => {
        if (current > 0) {
          current -= 1;
          renderQuestion();
        }
      });
      stage.querySelector("#exam-next").addEventListener("click", () => {
        if (isLast) {
          if (
            confirm(
              "Pflichtteil wirklich abgeben? Danach geht es direkt in den Wahlteil."
            )
          )
            finish();
        } else {
          current += 1;
          renderQuestion();
        }
      });
    };
    renderQuestion();
  },

  renderPflichtteilResults(result) {
    const root = document.getElementById("app");
    const moduleLines = result.moduleGaps
      .map((g) => `<li>${g.module}: ${g.wrongCount} falsch beantwortet</li>`)
      .join("");
    root.innerHTML = `
      <div class="space-y-4">
        <div class="p-4 rounded ${
          result.passed
            ? "bg-emerald-900/40 border border-emerald-600"
            : "bg-amber-900/40 border border-amber-600"
        }">
          <div class="flex items-center justify-between gap-4">
            <div class="text-lg font-semibold">Pflichtteil: ${result.score} / ${
      result.total
    }</div>
            <div class="text-right">
              <div class="text-2xl font-bold">Note ${result.grade.note}</div>
              <div class="text-xs text-slate-300">${result.grade.label}</div>
            </div>
          </div>
          <div class="text-sm text-slate-300 mt-1">${
            result.passed
              ? "Pflichtteil bestanden"
              : "Pflichtteil nicht bestanden"
          } (Grenze: ${Math.round(result.total * 0.6)} richtige Antworten)</div>
        </div>
        ${
          moduleLines
            ? `<div><div class="text-sm text-slate-400 mb-1">Offene Wissenslücken je Modul:</div><ul class="list-disc list-inside text-sm">${moduleLines}</ul></div>`
            : ""
        }
        <div class="p-3 rounded border border-slate-700 bg-slate-800">
          <div class="font-medium mb-1">Weiter geht's</div>
          <div class="text-sm text-slate-300">Jetzt folgt der Wahlteil (ca. 20 Min). Internet und eigene Notizen sind ab jetzt erlaubt, KI-Tools bleiben verboten. Ein Zurück zum Pflichtteil ist nicht mehr möglich.</div>
        </div>
        <button id="to-wahlteil" class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-sm font-medium">Weiter zum Wahlteil →</button>
      </div>
    `;
    root
      .querySelector("#to-wahlteil")
      .addEventListener("click", () => this.renderWahlteilPicker());
  },

  async renderWahlteilPicker() {
    const root = document.getElementById("app");
    const data = await this.api(`/api/wahlteil?session=${this.session}`);
    root.innerHTML = `
      <div class="space-y-4">
        <div class="text-lg font-semibold">Wahlteil: Szenario wählen</div>
        <div class="grid gap-3">
          ${data.variants
            .map(
              (v) => `
            <button data-id="${v.id}" class="wahlteil-pick text-left p-3 rounded border border-slate-700 hover:border-sky-500 bg-slate-800">
              <div class="font-medium">${v.label}</div>
              <div class="text-sm text-slate-400 mt-1">${v.scenario}</div>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    root.querySelectorAll(".wahlteil-pick").forEach((btn) => {
      btn.addEventListener("click", () => {
        const variant = data.variants.find((v) => v.id === btn.dataset.id);
        this.startWahlteil(variant, data.deadline);
      });
    });
  },

  startWahlteil(variant, deadline) {
    const root = document.getElementById("app");
    const effectiveDeadline = deadline || Date.now() + 20 * 60 * 1000;
    root.innerHTML = `
      <div class="space-y-4">
        <div class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border border-slate-700 rounded p-3 flex items-center justify-between">
          <div class="text-xs uppercase tracking-wide text-slate-400">Wahlteil</div>
          <div id="exam-timer" class="text-lg font-semibold"></div>
        </div>
        <div class="p-3 rounded border border-slate-700 bg-slate-800">
          <div class="font-medium mb-1">${variant.label}</div>
          <div class="text-sm text-slate-300">${variant.scenario}</div>
        </div>
        <textarea id="wahlteil-python" rows="14" class="w-full font-mono text-xs p-2 rounded border border-slate-700 bg-slate-900 text-emerald-300" style="color:#6ee7b7">${variant.pythonSkeleton}</textarea>
        <button id="wahlteil-submit" class="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm font-medium">Wahlteil abgeben</button>
      </div>
    `;
    const timerEl = root.querySelector("#exam-timer");
    let submitted = false;
    const finish = async () => {
      if (submitted) return;
      submitted = true;
      clearInterval(tick);
      const code = root.querySelector("#wahlteil-python").value;
      await this.api("/api/wahlteil/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session: this.session,
          variant_id: variant.id,
          code,
        }),
      });
      this.renderSubmitted();
    };
    const tick = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((effectiveDeadline - Date.now()) / 1000)
      );
      const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
      const ss = String(remaining % 60).padStart(2, "0");
      timerEl.textContent = `⏱ ${mm}:${ss}`;
      timerEl.classList.toggle("text-red-400", remaining <= 60);
      if (remaining <= 0) finish();
    }, 250);
    root.querySelector("#wahlteil-submit").addEventListener("click", () => {
      if (confirm("Wahlteil wirklich abgeben? Danach ist die Prüfung beendet."))
        finish();
    });
  },

  renderSubmitted() {
    const root = document.getElementById("app");
    root.innerHTML = `
      <div class="space-y-4 mt-16 text-center">
        <div class="text-2xl font-semibold">Abgeben erfolgreich</div>
        <div class="text-slate-300">Name: ${this.name || ""}</div>
        <div class="text-slate-400">Die Prüfung ist eingereicht und wartet auf den Trainer-Check. Dieses Fenster kann geschlossen werden.</div>
      </div>
    `;
  },
};

App.init();
