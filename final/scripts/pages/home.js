import "../app.js";
import { getFavorites, getViewPreference } from "../storage.js";

const favoriteCount = document.querySelector("#favoriteCount");
const preferredView = document.querySelector("#preferredView");
const totalDestinations = document.querySelector("#totalDestinations");

if (favoriteCount) favoriteCount.textContent = String(getFavorites().length);
if (preferredView) {
    const view = getViewPreference();
    preferredView.textContent = view === "list" ? "List" : "Grid";
}
if (totalDestinations) totalDestinations.textContent = "20";
