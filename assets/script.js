let inputSearchEl = document.querySelector(".card-body");
let cityNameEl = document.querySelector("#city");
let searchHistory = document.querySelector("#city-history");
let rightContainerTop = document.querySelector(".right-top");
let rightContainerBottom = document.querySelector(".right-bottom");

//prevent page for refreshing
let formSubmitHandler = function (event) {
  event.preventDefault();

  //get value from input element
  let cityName = cityNameEl.value.trim();
  console.log(cityName);

  if (cityName) {
    getWeatherReport(cityName);

    // clear old content
    rightContainerTop.textContent = "";
    rightContainerBottom.textContent = "";
  } else {
    alert("Please enter a city name!");
  }
};

let getWeatherReport = function (city) {
  // format the weather api url
  let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?";

  fetch(apiUrl)
    .then(function (response) {
      //request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayWeatherReport(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Weather Report");
    });
};

let displayWeatherReport = function() {
    // check if api returned any weather report
    
}

inputSearchEl.addEventListener("submit", formSubmitHandler);
