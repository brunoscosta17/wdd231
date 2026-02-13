export function createModalController(dialogSelector) {
    const dialog = document.querySelector(dialogSelector);
    const closeBtn = document.querySelector("#dialogClose");
    const body = document.querySelector("#dialogBody");
    const title = document.querySelector("#dialogTitle");

    if (!dialog || !closeBtn || !body || !title) {
        return {
            open: () => { },
            close: () => { }
        };
    }

    function close() {
        if (dialog.open) dialog.close();
    }

    closeBtn.addEventListener("click", close);

    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        const clickedInDialog =
            rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
        if (!clickedInDialog) close();
    });

    function open({ heading, html }) {
        title.textContent = heading;
        body.innerHTML = html;
        dialog.showModal();
        closeBtn.focus();
    }

    return { open, close };
}
