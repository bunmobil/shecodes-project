let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();

let h1 = document.querySelector("h1");
h1.innerHTML = `${day} ${hours}:${minutes}`;

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h2 = document.querySelector(".city");
  let city = searchInput.value.trim();
  if (!city) {
    return;
  }
  h2.innerHTML = `${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=630544eeb9009e9606d92c6646dd2297&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector(".temp");
  newTemp.innerHTML = `${temperature} °C`;
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", citySearch);

function longLat(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=630544eeb9009e9606d92c6646dd2297&units=metric`;

  axios.get(apiUrl).then(changeCity).then(showTemperature);
}
function geoTemp() {
  navigator.geolocation.getCurrentPosition(longLat);
}
function changeCity(response) {
  let city = response.data.name;
  let newPlace = document.querySelector(".city");
  newPlace.innerHTML = city;
  return response;
}
let pinButton = document.querySelector(".pin");
pinButton.addEventListener("click", geoTemp);
