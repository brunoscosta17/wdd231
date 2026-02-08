import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function buildCards(items) {
    const fragment = document.createDocumentFragment();

    items.forEach((item, index) => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.classList.add(`card-${index + 1}`); // para grid-area

        const h2 = document.createElement("h2");
        h2.textContent = item.title;

        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.alt;
        img.loading = "lazy";           // Lazy loading (requisito)
        img.width = 300;                // ajuda CLS/Lighthouse
        img.height = 200;

        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = item.address;

        const p = document.createElement("p");
        p.textContent = item.description;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Learn More";

        // (Opcional) exemplo de ação do botão
        btn.addEventListener("click", () => {
            alert(item.title);
        });

        card.append(h2, figure, address, p, btn);
        fragment.appendChild(card);
    });

    cardsContainer.appendChild(fragment);
}

function showVisitMessage() {
    const key = "discoverLastVisit";
    const now = Date.now();
    const lastVisit = Number(localStorage.getItem(key));

    let msg = "";

    if (!lastVisit) {
        msg = "Welcome! Let us know if you have any questions.";
    } else {
        const diffMs = now - lastVisit;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            msg = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            msg = "You last visited 1 day ago.";
        } else {
            msg = `You last visited ${diffDays} days ago.`;
        }
    }

    visitMessage.textContent = msg;
    localStorage.setItem(key, String(now));
}

buildCards(places);
showVisitMessage();
