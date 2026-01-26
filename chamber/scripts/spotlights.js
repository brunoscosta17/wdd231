const spotlightsContainer = document.querySelector("#spotlights");
const membersUrl = "data/members.json";

// Membership mapping: 1 = Bronze, 2 = Silver, 3 = Gold
function getMembershipLabel(value) {
    const level = Number(value);
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    if (level === 1) return "Bronze";
    return "Member";
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`Members fetch failed: ${response.status}`);

        const data = await response.json();
        const members = data.members;

        // Gold (3) or Silver (2) only
        const eligible = members.filter(member => member.membership === 3 || member.membership === 2);

        const shuffled = shuffleArray(eligible);

        // Randomly choose 2 or 3
        const count = Math.random() < 0.5 ? 2 : 3;
        const selected = shuffled.slice(0, count);

        renderSpotlights(selected);
    } catch (error) {
        if (spotlightsContainer) spotlightsContainer.innerHTML = `<p class="muted">Spotlights unavailable.</p>`;
        console.error(error);
    }
}

function renderSpotlights(selectedMembers) {
    if (!spotlightsContainer) return;

    spotlightsContainer.innerHTML = "";

    selectedMembers.forEach(member => {
        const name = member.name;
        const phone = member.phone;
        const address = member.address;
        const website = member.website;
        const membershipLabel = getMembershipLabel(member.membership);

        const logoSrc = `images/${member.image}`;

        const card = document.createElement("article");
        card.className = "spotlight";

        card.innerHTML = `
      <h4>${name}</h4>
      <img src="${logoSrc}" alt="${name} logo" loading="lazy">
      <p><strong>Membership:</strong> ${membershipLabel}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><a href="${website}" target="_blank" rel="noopener">Visit website</a></p>
    `;

        spotlightsContainer.appendChild(card);
    });
}

loadSpotlights();
