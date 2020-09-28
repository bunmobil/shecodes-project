// for displaying date & time...

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
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h1 = document.querySelector("h1");
h1.innerHTML = `${day} ${hours}:${minutes}`;

// for displaying city name and retrieving for search...

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
  let apiHourly = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=630544eeb9009e9606d92c6646dd2297&units=metric`;
  axios.get(apiHourly).then(showTemperature);
}

// for displaying city temperature...

function showTemperature(response) {
  if (Array.isArray(response.data.list)) {
    let smone = document.querySelector("#smone");
    let smtwo = document.querySelector("#smtwo");
    let smthree = document.querySelector("#smthree");
    let smfour = document.querySelector("#smfour");
    let smfive = document.querySelector("#smfive");
    smone.innerHTML = `${Math.round(response.data.list[0].main.temp)}°C`;
    smtwo.innerHTML = `${Math.round(response.data.list[1].main.temp)}°C`;
    smthree.innerHTML = `${Math.round(response.data.list[2].main.temp)}°C`;
    smfour.innerHTML = `${Math.round(response.data.list[3].main.temp)}°C`;
    smfive.innerHTML = `${Math.round(response.data.list[4].main.temp)}°C`;

    let smIconOne = document.querySelector("#smIconOne");
    let smIconTwo = document.querySelector("#smIconTwo");
    let smIconThree = document.querySelector("#smIconThree");
    let smIconFour = document.querySelector("#smIconFour");
    let smIconFive = document.querySelector("#smIconFive");
    smIconOne.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@4x.png`
    );
    smIconTwo.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@4x.png`
    );
    smIconThree.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@4x.png`
    );
    smIconFour.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@4x.png`
    );
    smIconFive.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@4x.png`
    );
  } else if (response.data.main) {
    let temperature = Math.round(response.data.main.temp);
    let newTemp = document.querySelector(".temp");
    let descript = document.querySelector("#descript");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let icon = document.querySelector("#icon");
    descript.innerHTML = `Weather: ${response.data.weather[0].description}`;
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windSpeed.innerHTML = `Windspeed: ${response.data.wind.speed}km/h`;
    newTemp.innerHTML = `${temperature} °C`;
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
    );
  } else {
    alert("eereeeeeeeeeeeeeee");
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySearch);

// for using geolocation to obtain city...

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

// geolocation button function...

let pinButton = document.querySelector(".pin");
pinButton.addEventListener("click", geoTemp);

// change between celcius & far

function switchFar(event) {
  event.preventDefault();
  let normTemp = document.querySelector("#temp");
  if (normTemp.innerHTML.includes("°F")) {
    return;
  }
  let farTemp = (parseInt(normTemp.innerHTML) * 9) / 5 + 32;
  normTemp.innerHTML = `${Math.round(farTemp)}°F`;
}
function switchCel(event) {
  event.preventDefault();
  let normTemp = document.querySelector("#temp");
  if (normTemp.innerHTML.includes("°C")) {
    return;
  }
  let celTemp = ((parseInt(normTemp.innerHTML) - 32) * 5) / 9;
  normTemp.innerHTML = `${Math.round(celTemp)}°C `;
}

let far = document.querySelector("#far");
far.addEventListener("click", switchFar);

let cel = document.querySelector("#cel");
cel.addEventListener("click", switchCel);
