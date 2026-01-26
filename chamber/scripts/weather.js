const apiKey = "0eeec77aa733e2fc43dd75a9f7e37458";
const units = "imperial"; // "imperial" = Fahrenheit, "metric" = Celsius

// Replace with your chamber location coordinates
const latitude = 43.8250;
const longitude = -111.7920;

const currentTempEl = document.querySelector("#currentTemp");
const weatherDescEl = document.querySelector("#weatherDesc");
const forecastListEl = document.querySelector("#forecastList");

async function getWeatherData() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        const response = await fetch(url);

        if (!response.ok) {
            // Read the error body to see the exact OpenWeather message
            const errorText = await response.text();
            throw new Error(`OpenWeather request failed: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // OpenWeather sometimes returns cod as a string even on errors
        if (String(data.cod) !== "200") {
            throw new Error(`OpenWeather API error: cod=${data.cod}, message=${data.message}`);
        }

        displayCurrentWeather(data);
        displayThreeDayForecast(data);
    } catch (error) {
        if (weatherDescEl) weatherDescEl.textContent = "Weather unavailable.";
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;

    if (currentTempEl) currentTempEl.textContent = temp;
    if (weatherDescEl) weatherDescEl.textContent = capitalizeWords(desc);
}

function displayThreeDayForecast(data) {
    if (!forecastListEl) return;

    const middayForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    const nextThree = middayForecasts.slice(0, 3);

    forecastListEl.innerHTML = "";

    nextThree.forEach(item => {
        const date = new Date(item.dt_txt);
        const label = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(item.main.temp);

        const li = document.createElement("li");
        li.innerHTML = `<span>${label}</span><span>${temp}°</span>`;
        forecastListEl.appendChild(li);
    });
}

function capitalizeWords(text) {
    return text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

getWeatherData();
