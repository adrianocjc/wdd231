const apiKey = "your_actual_api_key";
const city = "Parnamirim,BR";
let usingCelsius = true;

async function fetchWeather() {
  try {
    const units = usingCelsius ? "metric" : "imperial";
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentURL),
      fetch(forecastURL)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const temp = Math.round(currentData.main.temp);
    const desc = currentData.weather[0].description;
    const iconCode = currentData.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("temp").textContent = temp;
    document.getElementById("description").textContent = desc;
    document.getElementById("weather-icon").src = iconURL;

    // Forecast
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    const forecastContainer = document.getElementById("forecast-list");
    forecastContainer.innerHTML = "";

    forecastList.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt);
      const li = document.createElement("li");
      const dayTemp = Math.round(day.main.temp);
      const dayLabel = date.toLocaleDateString("en-BR", { weekday: "short", day: "numeric" });
      li.textContent = `${dayLabel}: ${dayTemp}°${usingCelsius ? "C" : "F"}`;
      forecastContainer.appendChild(li);
    });
  } catch (error) {
    console.error("Weather API error:", error);
  }
}

document.getElementById("unit-toggle").addEventListener("click", () => {
  usingCelsius = !usingCelsius;
  document.getElementById("unit-toggle").textContent = usingCelsius ? "Switch to °F" : "Switch to °C";
  fetchWeather();
});

fetchWeather();