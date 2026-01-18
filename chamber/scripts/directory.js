const membersEl = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Não foi possível carregar members.json");

        const data = await response.json();
        displayMembers(data.members);
    } catch (err) {
        membersEl.innerHTML = `<p class="error">Erro ao carregar membros.</p>`;
        console.error(err);
    }
}

function displayMembers(members) {
    membersEl.innerHTML = "";

    members.forEach((m) => {
        const card = document.createElement("article");
        card.classList.add("member");

        const levelText =
            m.membership === 3 ? "Gold" : m.membership === 2 ? "Silver" : "Member";

        card.innerHTML = `
      <h2>${m.name}</h2>
      <p class="tagline">${m.tagline ?? ""}</p>

      <img class="logo" src="images/${m.image}" alt="Logo de ${m.name}" loading="lazy" width="240" height="120">

      <p><strong>Address:</strong> ${m.address}</p>
      <p><strong>Phone:</strong> ${m.phone}</p>
      <p><strong>Level:</strong> ${levelText}</p>
      <p><a href="${m.website}" target="_blank" rel="noopener">Visit Website</a></p>
    `;

        membersEl.appendChild(card);
    });
}

// Toggle Grid/List
gridBtn.addEventListener("click", () => {
    membersEl.classList.add("grid");
    membersEl.classList.remove("list");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
    membersEl.classList.add("list");
    membersEl.classList.remove("grid");
    gridBtn.setAttribute("aria-pressed", "false");
    listBtn.setAttribute("aria-pressed", "true");
});

// Menu mobile (se você usar o botão ☰)
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".site-nav");

menuBtn?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

getMembers();
