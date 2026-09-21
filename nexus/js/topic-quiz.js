// Nexus prototype — shared topic-quiz renderer.
// Renders a small multiple-choice check into an existing stage element. Used as the final
// "Quiz" station appended to every topic module (gates that module's Progress.complete),
// and reused by the topic-picker hub in js/modules/quiz.js for standalone review/retry.

const TopicQuiz = {
  mount(stage, questions, { passRatio = 0.7, onPass } = {}) {
    const needed = Math.ceil(questions.length * passRatio);
    let index = 0;
    let score = 0;
    let passedAlready = false;

    const renderIntro = () => {
      stage.innerHTML = `
        <h2 class="text-lg font-semibold mb-1">Quiz — Wissen zu diesem Thema</h2>
        <p class="text-slate-400 text-sm mb-4">
          ${questions.length} Fragen. Mindestens ${needed} richtige Antworten nötig, um dieses
          Thema als bestanden zu markieren.
        </p>
        <div id="quiz-body"></div>
      `;
      index = 0;
      score = 0;
      renderQuestion();
    };

    const renderQuestion = () => {
      const body = stage.querySelector("#quiz-body");
      if (index >= questions.length) {
        const passed = score >= needed;
        body.innerHTML = `
          <div class="p-4 rounded ${
            passed
              ? "bg-emerald-900/40 border border-emerald-600"
              : "bg-red-900/40 border border-red-600"
          }">
            <div class="text-lg font-semibold">${
              passed ? "✓ Quiz bestanden" : "✗ Noch nicht bestanden"
            }</div>
            <div class="text-sm text-slate-300">Ergebnis: ${score} / ${
          questions.length
        } (mind. ${needed} nötig)</div>
          </div>
          ${
            passed
              ? ""
              : `<button id="quiz-retry" class="mt-4 text-sm text-sky-400 hover:text-sky-300">↺ Nochmal versuchen</button>`
          }
        `;
        if (passed && !passedAlready) {
          passedAlready = true;
          onPass && onPass();
        }
        if (!passed) {
          body
            .querySelector("#quiz-retry")
            .addEventListener("click", renderIntro);
        }
        return;
      }

      const q = questions[index];
      body.innerHTML = `
        <div class="text-sm text-slate-400 mb-2">Frage ${index + 1} / ${
        questions.length
      }</div>
        <div class="font-medium mb-4">${q.q}</div>
        <div class="space-y-2">
          ${q.options
            .map(
              (opt, i) =>
                `<button data-i="${i}" class="option-btn w-full text-left p-2 rounded border border-slate-700 hover:border-sky-500 bg-slate-800 text-sm">${opt}</button>`
            )
            .join("")}
        </div>
      `;

      body.querySelectorAll(".option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = Number(btn.dataset.i);
          if (chosen === q.correct) {
            score += 1;
            btn.classList.add("border-emerald-500", "bg-emerald-900/40");
          } else {
            btn.classList.add("border-red-500", "bg-red-900/40");
          }
          body
            .querySelectorAll(".option-btn")
            .forEach((b) => (b.disabled = true));
          setTimeout(() => {
            index += 1;
            renderQuestion();
          }, 400);
        });
      });
    };

    renderIntro();
  },
};
