// CHECKLIST:
// style using grid system

// style UV index with color based on favorable, moderate or severe conditions
// 5-day forecast displays date, weather icon, temp, humidity

var currentDate = new Date();

var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("city-name");
var searchHistoryEl = document.getElementById("search-history-container");
var cityNamesArr = JSON.parse(localStorage.getItem("cityNamesArr")) || [];
// var cityButtonsEl = document.getElementById(""city-button-" + cityNamesArr.id");

var currentWeatherEl = document.getElementById("current-weather-container");
var fiveDayEl = document.getElementById("five-day-container");
var eachDayEl = document.getElementById("each-day-container");


function getWeather(city) {
    var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + 
        city + "&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092";
    
    fetch(OpenWeatherUrl).then(function(response) {
        return response.json();
    }).then(function(response) {
        var iconIMG = "<img src=http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png />";

        document.getElementById("city-header").innerHTML = response.city.name + " " + currentDate + iconIMG;
        saveCityName(response);

        if (response) {
            return fetch("https://api.openweathermap.org/data/2.5/onecall?" + 
                "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + 
                "&exclude=minutely,hourly&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092");
        }
    }).then(function(secondResponse) {
        return secondResponse.json();
    }).then(function(weather) {
        displayCurrent(weather);
        displayFiveDay(weather);
    }); 
};

function displayCurrent(weather) {
    currentWeatherEl.classList.remove("hide");

    document.getElementById("current-temp").textContent = weather.current.temp + "°F";
    document.getElementById("feels-like").textContent = weather.current.feels_like + "°F";
    document.getElementById("current-humidity").innerHTML = weather.current.humidity + "%";
    document.getElementById("uv-index").innerHTML = weather.current.uvi;
    document.getElementById("wind-speed").innerHTML = weather.current.wind_speed + "mph";
    document.getElementById("wind-chill").innerHTML = weather.current.wind_deg + "°F";
};

function displayFiveDay(weather) {
    // console.log(weather);
    fiveDayEl.classList.remove("hide");
    eachDayEl.innerHTML = "";

    // date, weather icon
    for (var d=0; d<5; d++) {
        var eachDateEl = document.createElement("h4");

        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        }
        eachDateEl.textContent = currentDate.addDays(d);
        var dailyWeatherIcon = document.createElement("span"); // place inside eachDateEl
        dailyWeatherIcon.textContent = "";
        eachDateEl.appendChild(dailyWeatherIcon);
        
        fiveDayEl.appendChild(eachDateEl);

        var dailyHighEl = document.createElement("p");
        dailyHighEl.textContent = "High: " + weather.daily[d].temp.max + "°F";

        var dailyLowEl = document.createElement("p");
        dailyLowEl.textContent = "Low: " + weather.daily[d].temp.min + "°F";

        var dailyHumidityEl = document.createElement("p");
        dailyHumidityEl.textContent = "Humidity: " + weather.daily[d].humidity + "%";

        fiveDayEl.appendChild(dailyHighEl);
        fiveDayEl.appendChild(dailyLowEl);
        fiveDayEl.appendChild(dailyHumidityEl);
    }
};

function saveCityName(response) {
    var cityName = response.city.name;
    cityNamesArr.push(cityName);
    cityNamesArr.reverse((a,b) => a - b);

    localStorage.setItem("cityNamesArr", JSON.stringify(cityNamesArr));

    createSearchButton();
};

function createSearchButton() {
    searchHistoryEl.innerHTML = "";

    for (var i=0; i<cityNamesArr.length; i++) {
        var cityNameButton = document.createElement("button");
        // cityNameButton.setAttribute("id", "city-button-" + i);
        cityNameButton.setAttribute("city-name", cityNamesArr[i]);
        cityNameButton.textContent = cityNamesArr[i];

        searchHistoryEl.appendChild(cityNameButton);
    }
};

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

function buttonClickHandler(event) {
    var cityName = event.target.getAttribute("city-name");

    if (cityName) {
        getWeather(cityName);
    }
};

createSearchButton();

searchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", buttonClickHandler);
