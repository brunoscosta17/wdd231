const ts = document.querySelector("#timestamp");
if (ts) ts.value = new Date().toISOString();

let lastFocus = null;

function openDialog(dialog) {
    if (!dialog) return;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === "function") dialog.showModal();

    const focusable = dialog.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (focusable) focusable.focus();
}

function closeDialog(dialog) {
    if (!dialog) return;
    dialog.close();
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) {
        const id = openBtn.getAttribute("data-open");
        const dialog = document.getElementById(id);
        openDialog(dialog);
    }

    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
        const dialog = closeBtn.closest("dialog");
        closeDialog(dialog);
    }
});

document.querySelectorAll("dialog.modal").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
        const content = dialog.querySelector(".modal__content");
        if (content && !content.contains(e.target)) closeDialog(dialog);
    });

    dialog.addEventListener("close", () => {
        if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    });
});
