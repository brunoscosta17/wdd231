const params = new URLSearchParams(window.location.search);

const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "—";
};

setText("out-fname", params.get("fname"));
setText("out-lname", params.get("lname"));
setText("out-email", params.get("email"));
setText("out-phone", params.get("phone"));
setText("out-org", params.get("org"));

const ts = params.get("timestamp");
if (ts) {
    const d = new Date(ts);
    setText("out-ts", isNaN(d.getTime()) ? ts : d.toLocaleString());
} else {
    setText("out-ts", "—");
}
