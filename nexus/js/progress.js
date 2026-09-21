// Nexus prototype — progress.js
// Tracks per-module checkpoint completion in localStorage. No login, no server.

const Progress = (() => {
  const KEY = "nexus-progress-v1";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  }

  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function isComplete(moduleId) {
    const state = load();
    return !!state[moduleId];
  }

  function complete(moduleId) {
    const state = load();
    state[moduleId] = true;
    save(state);
  }

  function reset(moduleId) {
    const state = load();
    delete state[moduleId];
    save(state);
  }

  function resetAll() {
    localStorage.removeItem(KEY);
  }

  function completedCount(moduleIds) {
    const state = load();
    return moduleIds.filter((id) => state[id]).length;
  }

  return { isComplete, complete, reset, resetAll, completedCount };
})();
