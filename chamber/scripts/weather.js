// scripts/weather.js

const apiKey = "YOUR_API_KEY";
const city = "Parnamirim,BR";
const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);
    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    // Display current temperature and conditions
    document.getElementById("temp").textContent = Math.round(currentData.main.temp);
    document.getElementById("description").textContent = currentData.weather[0].description;

    // Extract 3 distinct days from forecast
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastContainer = document.getElementById("forecast-list");
    forecastContainer.innerHTML = "";

    forecastList.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt);
      const li = document.createElement("li");
      li.textContent = `${date.toLocaleDateString("en-BR", { weekday: "short", day: "numeric" })}: ${Math.round(day.main.temp)}°C`;
      forecastContainer.appendChild(li);
    });
  } catch (error) {
    console.error("Weather API error:", error);
  }
}

fetchWeather();