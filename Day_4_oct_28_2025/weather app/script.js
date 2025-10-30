const API_KEY = "e2a5d7f1aaf28f0ecd25044d37fecac7";
const weatherResult = document.getElementById("weatherResult");
const fetchBtn = document.getElementById("fetchWeatherBtn");

fetchBtn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }
  await fetchWeatherData(city);
});

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

function displayWeatherData(data) {
  const tempCelsius = (data.main.temp - 273.15).toFixed(2);
  weatherResult.innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡️ Temperature: ${tempCelsius}°C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}
