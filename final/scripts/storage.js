const KEYS = {
    view: "wdd231_final_view",
    category: "wdd231_final_category",
    favorites: "wdd231_final_favorites"
};

export function getViewPreference() {
    return localStorage.getItem(KEYS.view) || "grid";
}

export function setViewPreference(view) {
    localStorage.setItem(KEYS.view, view);
}

export function getCategoryPreference() {
    return localStorage.getItem(KEYS.category) || "all";
}

export function setCategoryPreference(category) {
    localStorage.setItem(KEYS.category, category);
}

export function getFavorites() {
    try {
        const raw = localStorage.getItem(KEYS.favorites);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function toggleFavorite(id) {
    const favs = new Set(getFavorites());
    if (favs.has(id)) favs.delete(id);
    else favs.add(id);
    localStorage.setItem(KEYS.favorites, JSON.stringify([...favs]));
    return [...favs];
}
