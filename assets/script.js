let inputSearchEl = document.querySelector(".card-body");
let cityNameEl = document.querySelector("#city");
let searchHistory = document.querySelector("#city-history");
let rightContainerTop = document.querySelector(".right-top");
let rightContainerBottom = document.querySelector(".right-bottom");
let APIkey = "c7e0e04a00149ed8c81b5f6dfbaa9ac7";
let cityName = ""
//prevent page for refreshing
let formSubmitHandler = function (event) {
  event.preventDefault();

  //get value from input element
  cityName = cityNameEl.value.trim();
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
    forecast(lat, lon);
    displaySearchResult();
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

      displayWeatherReport(weatherIcon, temperature, humidity, windSpeed, uvIndex, cityName, rightContainerTop);
    })
 };

let displayWeatherReport = function(weatherIcon, temperature, humidity, windSpeed, uvIndex, cityName, el) {
  var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
  console.log(iconurl)
let rightTopDiv = document.createElement("div")

let targetCity = document.createElement("h2")
targetCity.innerText = cityName
let weatherImg = document.createElement("img")
weatherImg.setAttribute("src", iconurl)
let currentDate = document.createElement("h2")
currentDate.innerText = (new Date).toLocaleDateString();
let temp = document.createElement("p")
temp.innerText = "Temperature: " + temperature
let humid = document.createElement("p")
humid.innerText = "Humidity: " + humidity
let wind = document.createElement("p")
wind.innerText = "Windspeed: " + windSpeed
let uv = document.createElement("p")
uv.innerText = "UV Index: " + uvIndex

rightTopDiv.appendChild(weatherImg);
rightTopDiv.appendChild(targetCity);
rightTopDiv.appendChild(currentDate);
rightTopDiv.appendChild(temp);
rightTopDiv.appendChild(humid);
rightTopDiv.appendChild(wind);
rightTopDiv.appendChild(uv);
el.appendChild(rightTopDiv);

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
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`


fetch(forecastUrl)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);



let forecastDiv = document.createElement("div")
for (let i=0; i < 5; i++) {
const temp = data.list[i]
displayWeatherReport(temp.weather[0].icon, temp.main.temp, temp.main.humidity, temp.wind.speed, "", "", rightContainerBottom);
}

})

}

let displaySearchResult = function(){
console.log(cityName)
let citySearched = document.createElement("li")
citySearched.innerText = cityName
searchHistory.appendChild(citySearched)
}


inputSearchEl.addEventListener("submit", formSubmitHandler);
