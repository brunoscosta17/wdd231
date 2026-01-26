const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#primaryNav");

if (menuButton && navList) {
    menuButton.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
}
