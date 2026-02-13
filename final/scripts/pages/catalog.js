import "../app.js";
import { fetchJson } from "../data.js";
import { createModalController } from "../modal.js";
import {
    getCategoryPreference,
    getFavorites,
    getViewPreference,
    setCategoryPreference,
    setViewPreference,
    toggleFavorite
} from "../storage.js";

const DATA_URL = "data/destinations.json";

const grid = document.querySelector("#destinationsGrid");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const viewGridBtn = document.querySelector("#viewGrid");
const viewListBtn = document.querySelector("#viewList");
const toggleFavBtn = document.querySelector("#toggleFavorites");
const countShown = document.querySelector("#countShown");
const countTotal = document.querySelector("#countTotal");

const modal = createModalController("#itemDialog");

let allItems = [];
let showFavoritesOnly = false;

function setViewUI(view) {
    grid.classList.toggle("destinations--list", view === "list");
    viewGridBtn.classList.toggle("is-selected", view === "grid");
    viewListBtn.classList.toggle("is-selected", view === "list");
}

function uniqueCategories(items) {
    const set = new Set(items.map((x) => x.category));
    return ["all", ...Array.from(set).sort()];
}

function updateCategoryOptions(items) {
    const options = uniqueCategories(items);
    categorySelect.innerHTML = options
        .map((c) => `<option value="${c.toLowerCase()}">${c === "all" ? "All" : c}</option>`)
        .join("");

    const saved = getCategoryPreference();
    categorySelect.value = saved;
}

function matchesSearch(item, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    const haystack = `${item.name} ${item.city} ${item.state} ${item.category} ${item.summary}`.toLowerCase();
    return haystack.includes(q);
}

function currentFilters() {
    const q = (searchInput?.value || "").trim();
    const cat = (categorySelect?.value || "all").toLowerCase();
    const favs = new Set(getFavorites());

    let items = allItems;

    if (cat !== "all") {
        items = items.filter((x) => x.category.toLowerCase() === cat);
    }

    items = items.filter((x) => matchesSearch(x, q));

    if (showFavoritesOnly) {
        items = items.filter((x) => favs.has(x.id));
    }

    return items;
}

function statsUpdate(shown, total) {
    if (countShown) countShown.textContent = String(shown);
    if (countTotal) countTotal.textContent = String(total);
}

function favoriteButtonLabel() {
    toggleFavBtn.textContent = showFavoritesOnly ? "Show all" : "Show favorites";
}

function render(items) {
    if (!grid) return;

    const favs = new Set(getFavorites());

    grid.innerHTML = items
        .map((item) => {
            const isFav = favs.has(item.id);
            return `
        <article class="destination" data-id="${item.id}">
          <div class="destination__top">
            <h3 class="destination__name">${item.name}</h3>
            <button class="icon-btn js-fav" type="button" aria-label="${isFav ? "Remove from favorites" : "Add to favorites"}" aria-pressed="${isFav}">
              ${isFav ? "★" : "☆"}
            </button>
          </div>

          <p class="destination__meta">
            <span class="pill">${item.category}</span>
            <span class="pill">${item.city}, ${item.state}</span>
            <span class="pill">Rating: ${item.rating.toFixed(1)}</span>
          </p>

          <p class="destination__summary">${item.summary}</p>

          <div class="destination__actions">
            <button class="btn btn--ghost js-details" type="button">Details</button>
          </div>
        </article>
      `;
        })
        .join("");

    // Event delegation (DOM manipulation + event handling)
    grid.addEventListener("click", onGridClick, { once: true });

    statsUpdate(items.length, allItems.length);
}

function onGridClick(e) {
    const card = e.target.closest(".destination");
    if (!card) return;

    const id = card.dataset.id;
    const item = allItems.find((x) => x.id === id);
    if (!item) return;

    if (e.target.closest(".js-fav")) {
        toggleFavorite(id);
        render(currentFilters());
        return;
    }

    if (e.target.closest(".js-details")) {
        modal.open({
            heading: item.name,
            html: `
        <div class="details">
          <p class="details__line"><strong>Location:</strong> ${item.city}, ${item.state}</p>
          <p class="details__line"><strong>Category:</strong> ${item.category}</p>
          <p class="details__line"><strong>Rating:</strong> ${item.rating.toFixed(1)}</p>
          <p class="details__line"><strong>Best season:</strong> ${item.bestSeason}</p>
          <p class="details__summary">${item.summary}</p>
        </div>
      `
        });
        return;
    }

    // Re-attach handler for future clicks
    grid.addEventListener("click", onGridClick, { once: true });
}

function applyAndRender() {
    setCategoryPreference(categorySelect.value);
    render(currentFilters());
    favoriteButtonLabel();
}

async function init() {
    const view = getViewPreference();
    setViewUI(view);

    allItems = await fetchJson(DATA_URL);

    // Ensure we have at least 15 items
    if (!Array.isArray(allItems) || allItems.length < 15) {
        allItems = [];
    }

    updateCategoryOptions(allItems);
    applyAndRender();

    viewGridBtn.addEventListener("click", () => {
        setViewPreference("grid");
        setViewUI("grid");
    });

    viewListBtn.addEventListener("click", () => {
        setViewPreference("list");
        setViewUI("list");
    });

    searchInput.addEventListener("input", applyAndRender);
    categorySelect.addEventListener("change", applyAndRender);

    toggleFavBtn.addEventListener("click", () => {
        showFavoritesOnly = !showFavoritesOnly;
        applyAndRender();
    });

    favoriteButtonLabel();
}

init();
