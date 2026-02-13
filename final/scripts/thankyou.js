import "../app.js";

const target = document.querySelector("#submission");

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

if (target) {
    const params = new URLSearchParams(window.location.search);

    const fields = [
        ["First name", params.get("first") || ""],
        ["Last name", params.get("last") || ""],
        ["Email", params.get("email") || ""],
        ["Travel style", params.get("style") || ""],
        ["Message", params.get("message") || ""],
        ["Submitted at", params.get("timestamp") || ""]
    ];

    target.innerHTML = `
    <dl class="dl">
      ${fields
            .map(([label, value]) => `
          <div class="dl__row">
            <dt class="dl__term">${escapeHtml(label)}</dt>
            <dd class="dl__desc">${escapeHtml(value)}</dd>
          </div>
        `)
            .join("")}
    </dl>
  `;
}
