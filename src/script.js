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

h3.innerHTML = `Today ${day} ${hours}:${minutes}`;

//search bar weather input:

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
/* 
// challenge 3 Fahrenheit to celsius

function showFahrenheit(event) {
  event.preventDefault();
  temperature.innerHTML = "66";
}

function showCelsius(event) {
  event.preventDefault();
  temperature.innerHTML = "19";
}

let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);
celsius.addEventListener("click", showCelsius);
*/

// Bonus challenge - to get the current location from pin button
function searchLocation(position) {
  let apiKey = "be5e467edafea0de9835c92cd194e4ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//

function searchCity(city) {
  let apiKey = "be5e467edafea0de9835c92cd194e4ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionSky = document.querySelector("#temperature-description");
  descriptionSky.innerHTML = `${response.data.weather[0].description},`;

  let descriptionCurrent = document.querySelector("#current-temp-description");
  descriptionCurrent.innerHTML = `Currently ${response.data.main.temp}°`;

  let descriptionHighs = document.querySelector("#highs-description");
  descriptionHighs.innerHTML = `Highs today of ${response.data.main.temp_max}°C`;

  let descriptionHumidity = document.querySelector("#humidity");
  descriptionHumidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let descriptionWind = document.querySelector("#wind");
  descriptionWind.innerHTML = `${wind}km/h`;
}

searchCity("London");

// bonus challenege need to finish off
/*
function showPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${position.coords.latitude}`;
  let latitude = (position.coords.latitude);
  let longitude = (position.coords.longitude);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

 


*/
let pinButton = document.querySelector("#pin-button");
pinButton.addEventListener("click", getCurrentLocation);
// the bonus challenege to get current location from pin button:
