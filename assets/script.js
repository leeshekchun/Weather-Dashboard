let inputSearchEl = document.querySelector(".card-body");
let cityNameEl = document.querySelector("#city");
let searchHistory = document.querySelector("#city-history");
let rightContainerTop = document.querySelector(".right-top");
let rightContainerBottom = document.querySelector(".right-bottom");
let APIkey = "c7e0e04a00149ed8c81b5f6dfbaa9ac7";

//prevent page for refreshing
let formSubmitHandler = function (event) {
  event.preventDefault();

  //get value from input element
  let cityName = cityNameEl.value.trim();
  console.log(cityName);

  if (cityName) {
    locationFunction(cityName);

    // clear old content
    rightContainerTop.textContent = "";
    rightContainerBottom.textContent = "";
  } else {
    alert("Please enter a city name!");
  }
};

let locationFunction = function (cityName) {
  let locationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`;

  fetch(locationApi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    console.log(data);
    let lat = data[0].lat;
    let lon = data[0].lon;
    getWeatherReport(lat, lon);
  });
};

let getWeatherReport = function (lat, lon) {
  // format the weather api url
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);

      let weatherIcon = data.current.weather[0].icon
      console.log(weatherIcon)
      let temperature = data.current.temp + "°F";
      console.log(temperature)
      let humidity = data.current.humidity + "%";
      console.log(humidity)
      let windSpeed = data.current.wind_speed + "mph";
      console.log(windSpeed)
      let uvIndex = data.current.uvi;
      console.log(uvIndex)

      displayWeatherReport(weatherIcon, temperature, humidity, windSpeed, uvIndex);
    })
 };

let displayWeatherReport = function(weatherIcon, temperature, humidity, windSpeed, uvIndex) {

let rightTopDiv = document.createElement("div")
let temp = document.createElement("p")
temp.innerText = "Temperature: " + temperature
let humid = document.createElement("p")
humid.innerText = "Humidity: " + humidity
let wind = document.createElement("p")
wind.innerText = "Windspeed: " + windSpeed
let uv = document.createElement("p")
uv.innerText = "UV Index: " + uvIndex

rightTopDiv.appendChild(temp);
rightTopDiv.appendChild(humid);
rightTopDiv.appendChild(wind);
rightTopDiv.appendChild(uv);
rightContainerTop.appendChild(rightTopDiv);

if (uvIndex < 2) {
  uv.classList.add("low")
} else if (uvIndex < 5) {
  uv.classList.add("moderate")
} else if (uvIndex < 7) {
  uv.classList.add("high")
} else if (uvIndex < 10) {
  uv.classList.add("veryHigh")
} else {
  uv.classList.add("Extreme")
}
};


let forecast = function(lat, lon) {
let forecastUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}}`


fetch(forecastUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);


let forecastDiv = document.createElement("div")


forecastDiv.appendChild()
rightContainerBottom.appendChild(forecastDiv)
})

}
inputSearchEl.addEventListener("submit", formSubmitHandler);
