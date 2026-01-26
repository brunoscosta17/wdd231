const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#primaryNav");

if (menuButton && navList) {
    function setMenu(open) {
        navList.classList.toggle("open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navList.classList.contains("open");
        setMenu(!isOpen);
    });

    document.addEventListener("click", (e) => {
        if (!navList.classList.contains("open")) return;
        const clickedInside = navList.contains(e.target) || menuButton.contains(e.target);
        if (!clickedInside) setMenu(false);
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });
}
