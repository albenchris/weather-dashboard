// CHECKLIST:
// style using grid system

// city typed into input is added to search history section
// style UV index with color based on favorable, moderate or severe conditions
// 5-day forecast displays date, weather icon, temp, humidity
// cities in search history act as buttons to gather information

var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("city-name");
var currentWeatherEl = document.getElementById("current-weather-container");
var fiveDayEl = document.getElementById("five-day-container");

function getWeather(city) {
    var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + 
        city + 
        "&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092"; // api key
    
    fetch(OpenWeatherUrl).then(function(response) {
        return response.json();
    }).then(function(response) {
        // console.log(response); // use to display city name on page
        document.getElementById("city-header").textContent = response.city.name;

        if (response) {
            return fetch("https://api.openweathermap.org/data/2.5/onecall?" + 
                "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + 
                "&exclude=minutely,hourly&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092");
        }
    }).then(function(secondResponse) {
        return secondResponse.json();
    }).then(function(weather) {
        displayCurrent(weather);
    });
    
};

function displayCurrent(weather) {
    currentWeatherEl.classList.remove("hide")

    document.getElementById("date-span").textContent = new Date();
    document.getElementById("current-temp").textContent = weather.current.temp + "°F";
    document.getElementById("feels-like").textContent = weather.current.feels_like + "°F";
    document.getElementById("current-humidity").innerHTML = weather.current.humidity + "%";
    document.getElementById("uv-index").innerHTML = weather.current.uvi;
    document.getElementById("wind-speed").innerHTML = weather.current.wind_speed + "mph";
    document.getElementById("wind-chill").innerHTML = weather.current.wind_deg + "°F";
};

function displayFiveDay() {

    
};

// displayFiveDay();





function formSubmitHandler(event) {
    event.preventDefault();

    var cityName = userInput.value.trim();
    if (cityName) {
        getWeather(cityName);
        userInput.value = "";
    } else {
        console.log("something went wrong");
    }

    


};

searchFormEl.addEventListener("submit", formSubmitHandler);