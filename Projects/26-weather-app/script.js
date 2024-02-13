const apiKey = "1d9fae1648e32081c1fc54203f0bc9d0";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const res = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (res.status == 404) {
    error.style.display = "inline-block";
    weather.style.display = "none";
  } else {
    error.style.display = "none";
  }

  const data = await res.json();

  const cityName = document.querySelector(".city");
  const temp = document.querySelector(".temp");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");

  cityName.innerHTML = data.name;
  temp.innerHTML = Math.round(data.main.temp) + "°c";
  humidity.innerHTML = data.main.humidity + "%";
  wind.innerHTML = data.wind.speed + " km/hr";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "images/mist.png";
  }

  weather.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  if (searchBox.value == "") {
    weather.style.display = "none";
  }
});
