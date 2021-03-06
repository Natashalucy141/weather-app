let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
dateElement.innerHTML = `${day}`;
timeElement.innerHTML = `${hours}:${minutes}`;

//Get time to display on forecast predictions:
function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Search bar weather input:

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// Get the current location from pin button
function searchLocation(position) {
  let apiKey = "c8d55d809a6c73b609c6c00f06672c2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  //update forcast weather from current city button.
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// New function display forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let timezone = response.data.city.timezone;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
  
              <div class="col-4">
              <div class="pred-day">
              <div class="weather-predictions">
                  <img
                    class="predictionIcons"
                    src="images/${forecast.weather[0].icon}.png"
                  /><br />
                  ${Math.round(forecast.main.temp_max)}°
                  <br />
                  ${Math.round(forecast.main.temp_min)}°
  <br /><span class="days">${formatHours(
    (forecast.dt + timezone) * 1000
  )}</span>
</div>
 </div>
  `;
  }
}

//this link can be used ubove src in the display forecast function to pull the icon images from the api website
//src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"

function searchCity(city) {
  let apiKey = "c8d55d809a6c73b609c6c00f06672c2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  //create another api call to get forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// gives data from API
function showTemperature(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionSky = document.querySelector("#temperature-description");
  descriptionSky.innerHTML = `${response.data.weather[0].description},`;

  let currentTempDescription = Math.round(response.data.main.temp);
  let descriptionCurrent = document.querySelector("#currentTempDescription");
  descriptionCurrent.innerHTML = `Currently ${currentTempDescription}°`;

  let highsDescription = Math.round(response.data.main.temp_max);
  let descriptionHighs = document.querySelector("#highsDescription");
  descriptionHighs.innerHTML = `Highs today of ${highsDescription}°C`;

  let descriptionHumidity = document.querySelector("#humidity");
  descriptionHumidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let descriptionWind = document.querySelector("#wind");
  descriptionWind.innerHTML = `${wind}km/h`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let descriptionFeelsLike = document.querySelector("#feelsLike");
  descriptionFeelsLike.innerHTML = `${feelsLike}°`;

  let descriptionSunrise = document.querySelector("#sunrise");
  descriptionSunrise.innerHTML = formatHours(response.data.sys.sunrise * 1000);

  //console.log(response.data.timezone);

  let descriptionSunset = document.querySelector("#sunset");
  descriptionSunset.innerHTML = formatHours(response.data.sys.sunset * 1000);

  let timeAtLocation = response.data.dt + response.data.timezone;
  timeElement.innerHTML = formatHours(timeAtLocation * 1000);

  // this code allows me to use my own images for the main weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", //changing the origional src attribute to the link
    `images/${response.data.weather[0].icon}.png`
  );

  /* this code will show api forecast icons from the openweather website: 

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", //changing the origional src attribute to the link
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  */

  celsiusTemperature = response.data.main.temp;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let pinButton = document.querySelector("#pin-button");
pinButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("London");
