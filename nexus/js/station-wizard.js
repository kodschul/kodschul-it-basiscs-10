// Nexus prototype — shared station-wizard shell.
// Splits one module's mission into several full-screen steps (pill nav + prev/next) instead
// of one long scrolling page, so only one exercise is visible at a time. Used by
// filesystem.js, terminal.js, networking.js — computer.js keeps its own copy (built first,
// has extra per-station bookkeeping like buildState/electricState).

const StationWizard = {
  mount(container, module, { missionLabel, missionText, stations }) {
    module.stations = stations;
    module.stationsDone = new Set();
    module.current = 0;

    container.innerHTML = `
      <div class="max-w-3xl space-y-4">
        ${
          missionLabel
            ? `<div class="kd-mission">
                <div class="kd-mission-label">${missionLabel}</div>
                <div class="kd-mission-text">${missionText}</div>
              </div>`
            : ""
        }
        <div id="station-pills" class="kd-pill-row"></div>
        <div id="station-stage" class="kd-stage"></div>
        <div class="kd-wizard-footer">
          <button id="station-prev" class="kd-btn kd-btn-ghost">← Zurück</button>
          <div id="station-label" class="kd-wizard-step"></div>
          <button id="station-next" class="kd-btn kd-btn-primary">Weiter →</button>
        </div>
      </div>
    `;

    container
      .querySelector("#station-prev")
      .addEventListener("click", () =>
        StationWizard.goTo(container, module, Math.max(0, module.current - 1))
      );
    container
      .querySelector("#station-next")
      .addEventListener("click", () =>
        StationWizard.goTo(
          container,
          module,
          Math.min(stations.length - 1, module.current + 1)
        )
      );

    StationWizard.goTo(container, module, 0);
  },

  goTo(container, module, idx) {
    module.current = idx;
    const stage = container.querySelector("#station-stage");
    stage.innerHTML = "";
    module.stations[idx].render(container, stage, idx);
    StationWizard.renderPills(container, module);
    container.querySelector("#station-label").textContent = `${idx + 1}/${
      module.stations.length
    } · ${module.stations[idx].label}`;
    container.querySelector("#station-prev").disabled = idx === 0;
    container.querySelector("#station-next").textContent =
      idx === module.stations.length - 1 ? "Fertig" : "Weiter →";
  },

  renderPills(container, module) {
    const pills = container.querySelector("#station-pills");
    pills.innerHTML = module.stations
      .map(
        (s, i) =>
          `<button data-i="${i}" class="kd-pill${
            i === module.current ? " is-active" : ""
          }${module.stationsDone.has(i) ? " is-done" : ""}">${
            module.stationsDone.has(i) ? "✓" : i + 1
          }. ${s.label}</button>`
      )
      .join("");
    pills.querySelectorAll(".kd-pill").forEach((btn) => {
      btn.addEventListener("click", () =>
        StationWizard.goTo(container, module, Number(btn.dataset.i))
      );
    });
  },

  markDone(container, module, idx) {
    module.stationsDone.add(idx);
    StationWizard.renderPills(container, module);
  },
};
