export async function fetchJson(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Data error:", err);
        return [];
    }
}
