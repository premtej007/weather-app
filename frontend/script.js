const API_URL = "https://weather-app-backend-jl9w.onrender.com/api";

// change this to your Render backend URL


// elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const card = document.getElementById("card");
const errorBox = document.getElementById("error");

// card fields
const cityName = document.getElementById("cityName");
const timeEl = document.getElementById("time");
const countryEl = document.getElementById("country");
const weatherIcon = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temp");
const descEl = document.getElementById("desc");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");

// dashboard container
let dashboardDiv;
function ensureDashboard() {
  if (!dashboardDiv) {
    dashboardDiv = document.createElement("div");
    dashboardDiv.className = "card";
    dashboardDiv.style.marginTop = "16px";
    dashboardDiv.innerHTML = `<h3 style="margin:0 0 10px">Recent Searches</h3><div id="history"></div>`;
    document.querySelector(".app").appendChild(dashboardDiv);
  }
}

// fetch weather and store in DB
async function fetchWeather(city) {
  try {
    errorBox.classList.add("hidden");
    const res = await fetch(`${API_URL}/weather`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city })
    });
    if (!res.ok) throw new Error("Failed to fetch weather");
    const data = await res.json();
    showWeather(data);
    loadHistory();
  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.classList.remove("hidden");
  }
}

// display weather on card
function showWeather(data) {
  card.classList.remove("hidden");
  cityName.textContent = data.city;
  timeEl.textContent = data.time;
  countryEl.textContent = data.country || "";
  tempEl.textContent = `${Math.round(data.temp)}°C`;
  descEl.textContent = data.description;
  humidityEl.textContent = data.humidity;
  windEl.textContent = data.wind;
  pressureEl.textContent = data.pressure || "--";

  // icon (simple: first letter of desc)
  weatherIcon.textContent = data.description ? data.description[0].toUpperCase() : "☁️";
}

// load history from backend
async function loadHistory() {
  try {
    const res = await fetch(`${API_URL}/history`);
    if (!res.ok) throw new Error("Failed to load history");
    const history = await res.json();

    ensureDashboard();
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = history
      .map(item => `
        <div style="padding:6px 0; border-bottom:1px solid #eee; font-size:14px">
          <b>${item.city}</b> — ${Math.round(item.temp)}°C, ${item.description} <br>
          <small style="color:#6b7280">${item.time}</small>
        </div>
      `)
      .join("");
  } catch (err) {
    console.error(err);
  }
}

// event listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

// load initial history on page load
loadHistory();
