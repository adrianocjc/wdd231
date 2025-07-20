const apiKey = "10eebc2e80727fc32bfa10f05a9943cb"; // OpenWeatherMap API key
const city = "Parnamirim,BR";
let usingCelsius = true;

// 🎨 Temperature-based color function
function getTempColor(temp) {
  if (usingCelsius) {
    if (temp >= 30) return "red";
    if (temp >= 20) return "orange";
    if (temp >= 10) return "green";
    return "blue";
  } else {
    if (temp >= 86) return "red";
    if (temp >= 68) return "orange";
    if (temp >= 50) return "green";
    return "blue";
  }
}

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

    // 🌡️ Current Conditions
    const tempEl = document.getElementById("temp");
    const unitEl = document.getElementById("unit");
    const descEl = document.getElementById("description");
    const highEl = document.getElementById("high");
    const lowEl = document.getElementById("low");
    const humidityEl = document.getElementById("humidity");
    const sunriseEl = document.getElementById("sunrise");
    const sunsetEl = document.getElementById("sunset");

    if (tempEl) tempEl.textContent = Math.round(currentData.main.temp);
    if (unitEl) unitEl.textContent = usingCelsius ? "C" : "F";
    if (descEl) descEl.textContent = currentData.weather[0].description;
    if (highEl) highEl.textContent = Math.round(currentData.main.temp_max);
    if (lowEl) lowEl.textContent = Math.round(currentData.main.temp_min);
    if (humidityEl) humidityEl.textContent = currentData.main.humidity;

    const sunrise = new Date(currentData.sys.sunrise * 1000);
    const sunset = new Date(currentData.sys.sunset * 1000);
    const timeFormat = { hour: "2-digit", minute: "2-digit" };

    if (sunriseEl) sunriseEl.textContent = sunrise.toLocaleTimeString("en-BR", timeFormat);
    if (sunsetEl) sunsetEl.textContent = sunset.toLocaleTimeString("en-BR", timeFormat);

    // 📆 3-Day Forecast at noon
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));
    if (forecastList.length >= 3) {
      const todayTemp = Math.round(forecastList[0].main.temp);
      const wedTemp = Math.round(forecastList[1].main.temp);
      const thuTemp = Math.round(forecastList[2].main.temp);

      const todayEl = document.getElementById("forecast-today");
      const wedEl = document.getElementById("forecast-wed");
      const thuEl = document.getElementById("forecast-thu");

      if (todayEl) {
        todayEl.textContent = `${todayTemp}°`;
        todayEl.style.color = getTempColor(todayTemp);
      }

      if (wedEl) {
        wedEl.textContent = `${wedTemp}°`;
        wedEl.style.color = getTempColor(wedTemp);
      }

      if (thuEl) {
        thuEl.textContent = `${thuTemp}°`;
        thuEl.style.color = getTempColor(thuTemp);
      }
    }
  } catch (error) {
    console.error("Weather API error:", error);
  }
}

// 🔁 °C/°F toggle button
const toggleBtn = document.getElementById("unit-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    usingCelsius = !usingCelsius;
    toggleBtn.textContent = usingCelsius ? "Switch to °F" : "Switch to °C";
    fetchWeather();
  });
}

// ⏱️ Initial load
fetchWeather();