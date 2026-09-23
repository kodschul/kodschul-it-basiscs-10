// Nexus prototype — modules/zwischenpruefung.js
// Self-check "Zwischenprüfung": ~30 MC questions spanning M1-M3 (Computer & Betriebssysteme,
// Netzwerke, Cloud & Container). Timed (20 min countdown, auto-submit at 0), TN can submit
// early; results screen reveals every question's correct answer. Unlike the topic quizzes in
// js/quiz-bank.js this doesn't gate anything on a pass ratio — it's a Wissensstand self-check,
// so Progress.complete() fires on any submit regardless of score.

const ExamModule = {
  id: "zwischenpruefung",
  title: "Zwischenprüfung (M1–M3)",
  day: "Zwischenprüfung",

  durationSeconds: 20 * 60,

  // Required to reset/retry the exam once submitted, so TN can't just spam retries.
  trainerPassword: "K4SCHUL26",

  questions: [
    {
      q: "Was ist die Aufgabe der CPU?",
      options: [
        "Daten dauerhaft speichern",
        "Berechnungen ausführen und Befehle verarbeiten",
        "Strom umwandeln",
        "Bilder anzeigen",
      ],
      correct: 1,
    },
    {
      q: "Welcher Speicher verliert seinen Inhalt beim Ausschalten des Computers?",
      options: ["SSD", "RAM", "Festplatte (HDD)", "USB-Stick"],
      correct: 1,
    },
    {
      q: 'Wofür steht "SSD"?',
      options: [
        "Solid State Drive",
        "System Storage Device",
        "Standard Save Disk",
        "Secure Software Drive",
      ],
      correct: 0,
    },
    {
      q: "Welche Zahl im Dezimalsystem entspricht der Binärzahl 1010?",
      options: ["8", "9", "10", "12"],
      correct: 2,
    },
    {
      q: "Wie viele Bits ergeben ein Byte?",
      options: ["4", "8", "10", "16"],
      correct: 1,
    },
    {
      q: "Welches Eingabegerät wandelt Handbewegungen in Cursor-Bewegungen um?",
      options: ["Monitor", "Tastatur", "Maus", "Lautsprecher"],
      correct: 2,
    },
    {
      q: "Was ist ein Betriebssystem?",
      options: [
        "Ein Textverarbeitungsprogramm",
        "Software, die Hardware verwaltet und Programme ausführen lässt",
        "Ein Kabel zwischen CPU und RAM",
        "Ein Antivirenprogramm",
      ],
      correct: 1,
    },
    {
      q: "Welches ist KEIN Betriebssystem?",
      options: ["Windows", "macOS", "Linux", "Photoshop"],
      correct: 3,
    },
    {
      q: "Wozu dient ein Dateisystem?",
      options: [
        "Um Dateien in Ordnern zu organisieren und wiederzufinden",
        "Um das Internet zu durchsuchen",
        "Um Bilder zu bearbeiten",
        "Um Strom zu sparen",
      ],
      correct: 0,
    },
    {
      q: "Welcher Terminal-Befehl zeigt den Inhalt eines Ordners an?",
      options: ["cd", "ls", "rm", "pwd"],
      correct: 1,
    },
    {
      q: "Womit wechselt man im Terminal das Verzeichnis?",
      options: ["ls", "mkdir", "cd", "touch"],
      correct: 2,
    },
    {
      q: "Welcher Befehl erstellt einen neuen Ordner im Terminal (Unix/Linux)?",
      options: ["mkdir", "rmdir", "cat", "mv"],
      correct: 0,
    },
    {
      q: "Welche Rolle fordert im Client-Server-Modell typischerweise Daten an?",
      options: ["Server", "Client", "Router", "DNS"],
      correct: 1,
    },
    {
      q: "Was ist eine IP-Adresse?",
      options: [
        "Ein Name für eine Webseite",
        "Eine eindeutige Adresse eines Geräts im Netzwerk",
        "Ein Passwort für WLAN",
        "Ein Dateiformat",
      ],
      correct: 1,
    },
    {
      q: "Welcher Port wird typischerweise für normale Webseiten (HTTP) benutzt?",
      options: ["22", "80", "443", "3306"],
      correct: 1,
    },
    {
      q: "Welcher Port wird typischerweise für verschlüsselte Webseiten (HTTPS) benutzt?",
      options: ["21", "80", "443", "25"],
      correct: 2,
    },
    {
      q: "Wofür steht DNS?",
      options: [
        "Data Network System",
        "Domain Name System",
        "Digital Network Security",
        "Direct Network Service",
      ],
      correct: 1,
    },
    {
      q: "Welche Aufgabe hat DNS?",
      options: [
        "Es übersetzt Domainnamen in IP-Adressen",
        "Es verschlüsselt Passwörter",
        "Es speichert Dateien in der Cloud",
        "Es zeigt Bilder an",
      ],
      correct: 0,
    },
    {
      q: "Was passiert beim Aufruf einer Webseite zuerst?",
      options: [
        "Der Server sendet eine Antwort",
        "Der Client sendet eine Anfrage (Request)",
        "Die Seite wird gespeichert",
        "Der Router wird neu gestartet",
      ],
      correct: 1,
    },
    {
      q: "Welcher Port wird häufig für SSH-Verbindungen benutzt?",
      options: ["22", "80", "443", "3306"],
      correct: 0,
    },
    {
      q: 'Was bedeutet es, wenn ein Server "offline" ist?',
      options: [
        "Er ist über das Netzwerk nicht erreichbar",
        "Er ist besonders schnell",
        "Er hat mehr Speicherplatz",
        "Er läuft nur lokal ohne Internet",
      ],
      correct: 0,
    },
    {
      q: "Was ist ein Vorteil von Cloud-Hosting gegenüber einem eigenen Server im Keller?",
      options: [
        "Man muss die Hardware nicht selbst warten",
        "Es ist immer kostenlos",
        "Es funktioniert nur offline",
        "Es braucht keine Internetverbindung",
      ],
      correct: 0,
    },
    {
      q: "Was ist Docker?",
      options: [
        "Ein Betriebssystem",
        "Ein Tool zum Verpacken und Ausführen von Anwendungen in Containern",
        "Ein Texteditor",
        "Ein Netzwerkprotokoll",
      ],
      correct: 1,
    },
    {
      q: "Was ist ein Docker-Container?",
      options: [
        "Eine physische Festplatte",
        "Eine isolierte, leichtgewichtige Laufzeitumgebung für eine Anwendung",
        "Ein Kabel zur Cloud",
        "Eine Art Passwort-Manager",
      ],
      correct: 1,
    },
    {
      q: "Woraus wird ein Docker-Container erstellt?",
      options: [
        "Aus einem Docker-Image",
        "Aus einer Textdatei ohne Struktur",
        "Aus einem USB-Stick",
        "Aus einer IP-Adresse",
      ],
      correct: 0,
    },
    {
      q: "Welche Datei beschreibt, wie ein Docker-Image gebaut wird?",
      options: ["README.md", "Dockerfile", "package.json", "index.html"],
      correct: 1,
    },
    {
      q: "Was ist ein Vorteil von Containern gegenüber klassischen virtuellen Maschinen?",
      options: [
        "Sie sind meist leichter/schneller startbar",
        "Sie brauchen immer ein eigenes Betriebssystem",
        "Sie können nicht in der Cloud laufen",
        "Sie sind komplett unveränderlich",
      ],
      correct: 0,
    },
    {
      q: 'Was beschreibt am besten "Deployment"?',
      options: [
        "Das Löschen einer Anwendung",
        "Das Bereitstellen/Veröffentlichen einer Anwendung, damit sie live nutzbar ist",
        "Das Schreiben von Kommentaren im Code",
        "Das Formatieren einer Festplatte",
      ],
      correct: 1,
    },
    {
      q: "Welcher Befehl startet typischerweise einen Docker-Container aus einem Image?",
      options: ["docker build", "docker run", "docker ls", "docker rm"],
      correct: 1,
    },
    {
      q: "Warum testet man eine containerisierte Webseite lokal, bevor man sie deployt?",
      options: [
        "Um Fehler frühzeitig zu erkennen, bevor sie live geht",
        "Weil Docker sonst nicht startet",
        "Weil es gesetzlich vorgeschrieben ist",
        "Weil lokale Tests automatisch deployen",
      ],
      correct: 0,
    },
  ],

  render(container) {
    this.renderIntro(container);
  },

  renderIntro(container) {
    container.innerHTML = `
      <div class="max-w-2xl space-y-4">
        <div class="kd-mission">
          <div class="kd-mission-label">📝 Zwischenprüfung</div>
          <div class="kd-mission-text">
            ${this.questions.length} Fragen zu Modul 1-3 (Computer &amp; Betriebssysteme,
            Netzwerke, Cloud &amp; Container). Zeit: 20 Minuten — danach wird automatisch
            abgegeben. Du kannst aber auch jederzeit früher abgeben. Am Ende siehst du dein
            Ergebnis und alle richtigen Antworten.
          </div>
        </div>
        <button id="exam-start" class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 text-sm font-medium">Prüfung starten</button>
      </div>
    `;
    container
      .querySelector("#exam-start")
      .addEventListener("click", () => this.startExam(container));
  },

  startExam(container) {
    const answers = new Array(this.questions.length).fill(null);
    const deadline = Date.now() + this.durationSeconds * 1000;
    const letters = ["a", "b", "c", "d"];
    let current = 0;

    container.innerHTML = `
      <div class="max-w-2xl space-y-4">
        <div class="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border border-slate-700 rounded p-3 flex items-center justify-between">
          <div id="exam-timer" class="text-lg font-semibold"></div>
          <div id="exam-progress" class="text-sm text-slate-400"></div>
        </div>
        <div id="exam-stage"></div>
      </div>
    `;

    const stage = container.querySelector("#exam-stage");
    const timerEl = container.querySelector("#exam-timer");
    const progressEl = container.querySelector("#exam-progress");

    let submitted = false;
    const finish = () => {
      if (submitted) return;
      submitted = true;
      clearInterval(tick);
      this.renderResults(container, answers);
    };

    const tick = setInterval(() => {
      const remaining = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
      const ss = String(remaining % 60).padStart(2, "0");
      timerEl.textContent = `⏱ ${mm}:${ss}`;
      timerEl.classList.toggle("text-red-400", remaining <= 60);
      if (remaining <= 0) finish();
    }, 250);

    // One question at a time: pick an answer, then move on — result only appears after submit.
    const renderQuestion = () => {
      const q = this.questions[current];
      const isLast = current === this.questions.length - 1;
      progressEl.textContent = `Frage ${current + 1} / ${
        this.questions.length
      }`;

      stage.innerHTML = `
        <div class="p-3 rounded border border-slate-700 bg-slate-800">
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
                <span class="text-slate-500">${letters[oi]})</span> ${opt}
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
          if (confirm("Prüfung wirklich abgeben?")) finish();
        } else {
          current += 1;
          renderQuestion();
        }
      });
    };

    renderQuestion();
  },

  // German school-grade scale (1 = sehr gut ... 5 = mangelhaft) derived from the score ratio.
  gradeFor(ratio) {
    if (ratio >= 0.9) return { note: 1, label: "sehr gut" };
    if (ratio >= 0.75) return { note: 2, label: "gut" };
    if (ratio >= 0.6) return { note: 3, label: "befriedigend" };
    if (ratio >= 0.45) return { note: 4, label: "ausreichend" };
    return { note: 5, label: "mangelhaft" };
  },

  renderResults(container, answers) {
    const letters = ["a", "b", "c", "d"];
    const score = this.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0),
      0
    );
    const passed = score >= Math.ceil(this.questions.length * 0.5);
    const grade = this.gradeFor(score / this.questions.length);

    if (!Progress.isComplete(this.id)) {
      Progress.complete(this.id);
      App.refreshNav();
    }

    container.innerHTML = `
      <div class="max-w-2xl space-y-4">
        <div class="p-4 rounded ${
          passed
            ? "bg-emerald-900/40 border border-emerald-600"
            : "bg-amber-900/40 border border-amber-600"
        }">
          <div class="flex items-center justify-between gap-4">
            <div class="text-lg font-semibold">Ergebnis: ${score} / ${
      this.questions.length
    }</div>
            <div class="text-right">
              <div class="text-2xl font-bold">Note ${grade.note}</div>
              <div class="text-xs text-slate-300">${grade.label}</div>
            </div>
          </div>
          <div class="text-sm text-slate-300 mt-1">Das ist eine Selbsteinschätzung deines Wissensstands zu M1-M3, keine offizielle Bewertung.</div>
        </div>
        <div id="exam-review" class="space-y-4"></div>
        <button id="exam-retry" class="text-sm text-sky-400 hover:text-sky-300">↺ Nochmal versuchen</button>
      </div>
    `;

    const review = container.querySelector("#exam-review");
    review.innerHTML = this.questions
      .map((q, qi) => {
        const chosen = answers[qi];
        const isRight = chosen === q.correct;
        return `
        <div class="p-3 rounded border ${
          isRight ? "border-emerald-700" : "border-red-700"
        } bg-slate-800">
          <div class="text-sm text-slate-400 mb-1">Frage ${qi + 1}</div>
          <div class="font-medium mb-2">${q.q}</div>
          <div class="space-y-1 text-sm">
            ${q.options
              .map((opt, oi) => {
                let cls = "text-slate-400";
                let marker = "";
                if (oi === q.correct) {
                  cls = "text-emerald-400";
                  marker = " ✓";
                } else if (oi === chosen) {
                  cls = "text-red-400";
                  marker = " ✗ (deine Antwort)";
                }
                return `<div class="${cls}">${letters[oi]}) ${opt}${marker}</div>`;
              })
              .join("")}
            ${
              chosen === null
                ? '<div class="text-amber-400 text-xs mt-1">nicht beantwortet</div>'
                : ""
            }
          </div>
        </div>
      `;
      })
      .join("");

    container.querySelector("#exam-retry").addEventListener("click", () => {
      const input = prompt("Trainer-Passwort zum Zurücksetzen eingeben:");
      if (input === null) return;
      if (input === this.trainerPassword) {
        this.renderIntro(container);
      } else {
        alert("Falsches Passwort.");
      }
    });
  },
};
