// Nexus prototype — modules/quiz.js
// Topic-based hub for the Modul 9/10 review (idea/nexus_spec.md): instead of one flat mixed
// question list, mirrors the actual course structure — one tile per Tag-1/2 topic module,
// each reusing that module's own QuizBank/TopicQuiz so results stay consistent whether a
// participant does the quiz here or inline at the end of the topic module itself. This
// module's own Progress ("quiz") completes once every topic tile below is passed.

const QuizModule = {
  id: "quiz",
  title: "Quiz / Prüfung",
  day: "Tag 10 · Modul 9-10 (Vorschau)",

  topics: [
    { id: "computer", title: "Der Computer" },
    { id: "coding", title: "Codierung & Zahlensysteme" },
    { id: "io-devices", title: "Ein-/Ausgabegeräte" },
    { id: "os", title: "Betriebssysteme" },
    { id: "filesystem", title: "Dateien & Ordner" },
    { id: "terminal", title: "Terminal" },
    { id: "networking", title: "Netzwerke" },
  ],

  render(container) {
    this.renderOverview(container);
  },

  checkAllTopicsPassed() {
    const allPassed = this.topics.every((t) => Progress.isComplete(t.id));
    if (allPassed && !Progress.isComplete("quiz")) {
      Progress.complete("quiz");
      App.refreshNav();
    }
  },

  renderOverview(container) {
    this.checkAllTopicsPassed();
    const passedCount = this.topics.filter((t) =>
      Progress.isComplete(t.id)
    ).length;
    container.innerHTML = `
      <div class="max-w-2xl space-y-4">
        <div class="kd-mission">
          <div class="kd-mission-label">Fortschritt</div>
          <div class="kd-mission-text">${passedCount} von ${this.topics.length} Themen bestanden</div>
        </div>
        <div id="quiz-topic-list" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
      </div>
    `;

    const list = container.querySelector("#quiz-topic-list");
    list.innerHTML = this.topics
      .map((t) => {
        const passed = Progress.isComplete(t.id);
        return `
          <button data-topic="${t.id}" class="topic-tile kd-tile${
          passed ? " is-done" : ""
        }">
            <div class="font-medium">${t.title}</div>
            <div class="kd-tile-status${passed ? " is-done" : ""}">${
          passed ? "✓ bestanden" : "offen"
        }</div>
          </button>
        `;
      })
      .join("");

    list.querySelectorAll(".topic-tile").forEach((btn) => {
      btn.addEventListener("click", () =>
        this.renderTopicQuiz(container, btn.dataset.topic)
      );
    });
  },

  renderTopicQuiz(container, topicId) {
    const topic = this.topics.find((t) => t.id === topicId);
    container.innerHTML = `
      <div class="max-w-2xl space-y-4">
        <button id="quiz-back" class="kd-back-link-inline">← Zurück zur Übersicht</button>
        <div class="kd-mission">
          <div class="kd-mission-label">Thema</div>
          <div class="kd-mission-text">${topic.title}</div>
        </div>
        <div id="quiz-stage"></div>
      </div>
    `;
    container
      .querySelector("#quiz-back")
      .addEventListener("click", () => this.renderOverview(container));

    const stage = container.querySelector("#quiz-stage");
    TopicQuiz.mount(stage, QuizBank[topicId], {
      onPass: () => {
        Progress.complete(topicId);
        App.refreshNav();
        this.checkAllTopicsPassed();
      },
    });
  },
};
