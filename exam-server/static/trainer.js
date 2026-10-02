// Abschlusspruefung exam-server — trainer control panel.
// The trainer password is sent with every request (same-network classroom tool,
// not internet-exposed); it never touches the TN-facing exam.html/exam.js.

function md5(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  const lowLength = bitLength >>> 0;
  const highLength = Math.floor(bitLength / 0x100000000);
  for (let shift = 0; shift < 32; shift += 8) bytes.push((lowLength >>> shift) & 0xff);
  for (let shift = 0; shift < 32; shift += 8) bytes.push((highLength >>> shift) & 0xff);

  const shifts = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const constants = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000));
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = Array.from({ length: 16 }, (_, i) => {
      const index = offset + i * 4;
      return (bytes[index] | (bytes[index + 1] << 8) | (bytes[index + 2] << 16) | (bytes[index + 3] << 24)) >>> 0;
    });
    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;

    for (let i = 0; i < 64; i++) {
      let f;
      let g;
      if (i < 16) {
        f = (b & c) | (~b & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | (~d & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | ~d);
        g = (7 * i) % 16;
      }
      const sum = (a + f + constants[i] + words[g]) >>> 0;
      const rotated = (sum << shifts[i]) | (sum >>> (32 - shifts[i]));
      [a, d, c, b] = [d, c, b, (b + rotated) >>> 0];
    }

    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  return [a0, b0, c0, d0]
    .map((word) => [0, 8, 16, 24].map((shift) => ((word >>> shift) & 0xff).toString(16).padStart(2, "0")).join(""))
    .join("");
}

const Trainer = {
  password: null,

  async api(path, options = {}) {
    const url = new URL(path, window.location.origin);
    if (options.method === "POST") {
      options.headers = { "Content-Type": "application/json" };
      const body = options.body ? JSON.parse(options.body) : {};
      body.password = this.password;
      options.body = JSON.stringify(body);
    } else {
      url.searchParams.set("password", this.password);
    }
    const res = await fetch(url, options);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Request fehlgeschlagen (${res.status})`);
    }
    return res.json();
  },

  init() {
    sessionStorage.removeItem("exam-trainer-pw");
    this.password = sessionStorage.getItem("exam-trainer-pw-md5");
    if (this.password) {
      this.renderDashboard();
    } else {
      this.renderLogin();
    }
  },

  renderLogin() {
    const root = document.getElementById("app");
    root.innerHTML = `
      <div class="max-w-sm mx-auto mt-24 space-y-4">
        <div class="text-2xl font-semibold text-center">Trainer-Login</div>
        <input id="pw-input" type="password" class="w-full p-2 rounded border border-slate-700 bg-slate-900" placeholder="Trainer-Passwort" />
        <button id="login-btn" class="w-full px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 font-medium">Anmelden</button>
        <p id="login-error" class="text-red-400 text-sm"></p>
      </div>
    `;
    const tryLogin = async () => {
      this.password = md5(root.querySelector("#pw-input").value);
      try {
        await this.api("/api/trainer/sessions");
        sessionStorage.setItem("exam-trainer-pw-md5", this.password);
        this.renderDashboard();
      } catch (e) {
        root.querySelector("#login-error").textContent = "Falsches Passwort.";
        this.password = null;
      }
    };
    root.querySelector("#login-btn").addEventListener("click", tryLogin);
    root.querySelector("#pw-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryLogin();
    });
  },

  statusLabel(status) {
    if (status === "submitted")
      return '<span class="text-emerald-400">eingereicht</span>';
    if (status === "wahlteil")
      return '<span class="text-amber-400">Wahlteil läuft</span>';
    return '<span class="text-slate-400">Pflichtteil läuft</span>';
  },

  async renderDashboard() {
    const root = document.getElementById("app");
    let data;
    try {
      data = await this.api("/api/trainer/sessions");
    } catch (e) {
      sessionStorage.removeItem("exam-trainer-pw-md5");
      return this.renderLogin();
    }

    root.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-semibold">Abschlussprüfung — Trainer</div>
          <div class="flex items-center gap-2">
            <span class="text-sm ${
              data.open ? "text-emerald-400" : "text-slate-400"
            }">${data.open ? "● freigegeben" : "○ gesperrt"}</span>
            <button id="toggle-open" class="px-3 py-1.5 rounded text-sm font-medium ${
              data.open
                ? "bg-amber-700 hover:bg-amber-600"
                : "bg-emerald-700 hover:bg-emerald-600"
            }">${data.open ? "Prüfung sperren" : "Prüfung freigeben"}</button>
            <button id="reset-all" class="px-3 py-1.5 rounded text-sm font-medium bg-red-800 hover:bg-red-700">Alles zurücksetzen</button>
          </div>
        </div>
        <div class="flex items-end gap-3 p-3 rounded border border-slate-700 bg-slate-800">
          <label class="text-sm">
            <div class="text-slate-400 mb-1">Pflichtteil (Min.)</div>
            <input id="pflichtteil-minutes" type="number" min="1" step="1" value="${
              data.pflichtteilMinutes
            }" class="w-20 p-1.5 rounded border border-slate-600 bg-slate-900" />
          </label>
          <label class="text-sm">
            <div class="text-slate-400 mb-1">Wahlteil (Min.)</div>
            <input id="wahlteil-minutes" type="number" min="1" step="1" value="${
              data.wahlteilMinutes
            }" class="w-20 p-1.5 rounded border border-slate-600 bg-slate-900" />
          </label>
          <button id="save-config" class="px-3 py-1.5 rounded text-sm font-medium bg-sky-700 hover:bg-sky-600">Speichern</button>
          <span class="text-xs text-slate-500">Gilt für neu gestartete TN-Sessions, nicht rückwirkend.</span>
        </div>
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="text-left text-slate-400 border-b border-slate-700">
              <th class="py-2">Name</th>
              <th>Status</th>
              <th>Pflichtteil</th>
              <th>Wahlteil</th>
              <th>Berichte</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${data.sessions
              .map(
                (s) => `
              <tr class="border-b border-slate-800">
                <td class="py-2">${s.name}</td>
                <td>${this.statusLabel(s.status)}</td>
                <td>${
                  s.pflichtteilScore
                    ? `${s.pflichtteilScore} (${s.pflichtteilGrade})`
                    : "–"
                }</td>
                <td>${s.wahlteilVariant || "–"}</td>
                <td>
                  ${
                    s.status === "submitted"
                      ? `<a class="text-sky-400 hover:underline" target="_blank" href="/api/trainer/report?session=${
                          s.id
                        }&type=summary&password=${encodeURIComponent(
                          this.password
                        )}">Kurzbericht</a> ·
                         <a class="text-sky-400 hover:underline" target="_blank" href="/api/trainer/report?session=${
                           s.id
                         }&type=detailed&password=${encodeURIComponent(
                          this.password
                        )}">Detailliert</a>`
                      : "–"
                  }
                </td>
                <td><button data-id="${
                  s.id
                }" class="reset-one text-red-400 hover:underline text-xs">zurücksetzen</button></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        ${
          data.sessions.length === 0
            ? '<p class="text-slate-500 text-sm">Noch keine Teilnehmenden.</p>'
            : ""
        }
      </div>
    `;

    root.querySelector("#toggle-open").addEventListener("click", async () => {
      await this.api(data.open ? "/api/trainer/close" : "/api/trainer/open", {
        method: "POST",
        body: "{}",
      });
      this.renderDashboard();
    });
    root.querySelector("#reset-all").addEventListener("click", async () => {
      if (
        !confirm(
          "Wirklich ALLE Sessions und Berichte löschen? Das sperrt die Prüfung auch wieder."
        )
      )
        return;
      await this.api("/api/trainer/reset", { method: "POST", body: "{}" });
      this.renderDashboard();
    });
    root.querySelector("#save-config").addEventListener("click", async () => {
      const pflichtteil_minutes = Number(
        root.querySelector("#pflichtteil-minutes").value
      );
      const wahlteil_minutes = Number(
        root.querySelector("#wahlteil-minutes").value
      );
      await this.api("/api/trainer/config", {
        method: "POST",
        body: JSON.stringify({ pflichtteil_minutes, wahlteil_minutes }),
      });
      this.renderDashboard();
    });
    root.querySelectorAll(".reset-one").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (!confirm("Diese Session wirklich zurücksetzen?")) return;
        await this.api("/api/trainer/reset", {
          method: "POST",
          body: JSON.stringify({ session: btn.dataset.id }),
        });
        this.renderDashboard();
      });
    });

    this._poll = setTimeout(() => this.renderDashboard(), 5000);
  },
};

Trainer.init();
