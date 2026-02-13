function currentPageKey() {
    const file = (window.location.pathname.split("/").pop() || "").toLowerCase();
    if (file.includes("catalog")) return "catalog";
    if (file.includes("join")) return "join";
    if (file.includes("thankyou")) return "join";
    return "home";
}

export function initNav() {
    const menuButton = document.querySelector("#menuButton");
    const navList = document.querySelector("#primaryNav");

    const key = currentPageKey();
    document.querySelectorAll("[data-nav]").forEach((link) => {
        const isActive = link.getAttribute("data-nav") === key;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });

    if (!menuButton || !navList) return;

    function setMenu(open) {
        navList.classList.toggle("is-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navList.classList.contains("is-open");
        setMenu(!isOpen);
    });

    document.addEventListener("click", (e) => {
        if (!navList.classList.contains("is-open")) return;
        const clickedInside = navList.contains(e.target) || menuButton.contains(e.target);
        if (!clickedInside) setMenu(false);
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });
}
