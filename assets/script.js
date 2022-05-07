let inputSearchEl = document.querySelector(".card-body");
let cityNameEl = document.querySelector("#city");
let searchHistory = document.querySelector("#city-history");
let rightContainerTop = document.querySelector(".right-top");
let rightContainerBottom = document.querySelector(".right-bottom");
let APIkey = "c7e0e04a00149ed8c81b5f6dfbaa9ac7";
let globalCityName = ""

//prevent page for refreshing
let formSubmitHandler = function (event) {
  event.preventDefault();

  //get value from input element
  globalCityName = cityNameEl.value.trim();


  if (globalCityName) {
    locationFunction(globalCityName);

    // clear old content
    rightContainerTop.textContent = "";
    rightContainerBottom.textContent = "";
   
  } else {
    alert("Please enter a city name!");
  }
};

let locationFunction = function (globalCityName) {
  let locationApi = `http://api.openweathermap.org/geo/1.0/direct?q=${globalCityName}&appid=${APIkey}`;

  fetch(locationApi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    console.log(data);
    let lat = data[0].lat;
    let lon = data[0].lon;
    getWeatherReport(lat, lon);
    addSearchResult(globalCityName);
    displaySearchResult(getcities());
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
      let temperature = data.current.temp
      let humidity = data.current.humidity
      let windSpeed = data.current.wind_speed 
      let uvIndex = data.current.uvi;
      let currentDate = data.current.dt

      for (let i = 1; i < 6; i++) {

      const temp = data.daily[i]
      displayWeatherReport(temp.weather[0].icon, temp.temp.day, temp.humidity, temp.wind_speed, false, "",data.daily[i].dt, rightContainerBottom);
      }

      displayWeatherReport(weatherIcon, temperature, humidity, windSpeed, uvIndex, globalCityName, currentDate, rightContainerTop);

    })
 };

let displayWeatherReport = function(weatherIcon, temperature, humidity, windSpeed, uvIndex, cityName, date, container) {
  var iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

let rightTopDiv = document.createElement("div")
let targetCity = document.createElement("h2")
targetCity.innerText = cityName
let weatherImg = document.createElement("img")
weatherImg.setAttribute("src", iconurl)
let currentDate = document.createElement("h2")
currentDate.innerText = moment.unix(date).format("MM/DD/YYYY");
let temp = document.createElement("p")
temp.innerText = "Temperature: " + temperature + "°F";
let humid = document.createElement("p")
humid.innerText = "Humidity: " + humidity + "%";
let wind = document.createElement("p")
wind.innerText = "Windspeed: " + windSpeed + "mph";



rightTopDiv.appendChild(weatherImg);
rightTopDiv.appendChild(targetCity);
rightTopDiv.appendChild(currentDate);
rightTopDiv.appendChild(temp);
rightTopDiv.appendChild(humid);
rightTopDiv.appendChild(wind);
if (uvIndex !== false) {
  let uv = document.createElement("p")
  uv.innerText = "UV Index: " + uvIndex
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
  rightTopDiv.appendChild(uv);
}
container.appendChild(rightTopDiv);




};

var getcities = function() {
  let citiesName = []
  // get item to see if theres anything stored beforehand
  var returnCities = JSON.parse(localStorage.getItem("citiesName"))
  console.log(returnCities)
  if (returnCities) {
    citiesName = returnCities

  }
  console.log(citiesName)
  return citiesName
}


let addSearchResult = function(cityName){
console.log(cityName)
var resultCities = getcities()
console.log(resultCities)
console.log(resultCities.indexOf(cityName) < 0)
if (resultCities.indexOf(cityName) < 0) {
  // push new search into resultCities array
  resultCities.push(cityName)
  console.log(resultCities)
localStorage.setItem("citiesName", JSON.stringify(resultCities));
}
}

let displaySearchResult = function(resultCities) {
searchHistory.innerHTML = ""
let displayResult = document.createElement("ul")
for (let i = 0; i < resultCities.length; i++) {
let displayResultel = document.createElement("li") 
displayResultel.innerText = resultCities[i]
displayResultel.addEventListener("click", function() {
  globalCityName = resultCities[i]
  citySearchDirect()
})
displayResult.appendChild(displayResultel)              
}
searchHistory.appendChild(displayResult)
}

let citySearchDirect = function() {
  if (globalCityName) {
    locationFunction(globalCityName);

    // clear old content
    rightContainerTop.textContent = "";
    rightContainerBottom.textContent = "";
   
  } else {
    alert("Please enter a city name!");
  }
}
displaySearchResult(getcities());
inputSearchEl.addEventListener("submit", formSubmitHandler);
