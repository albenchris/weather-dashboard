// CHECKLIST:
// style using grid system

// city typed into input is added to search history section
// style UV index with color based on favorable, moderate or severe conditions
// display results
// 5-day forecast displays date, weather icon, temp, humidity
// cities in search history act as buttons to gather information

var searchFormEl = document.getElementById("search-form");
var userInput = document.getElementById("city-name");

function getWeather(city) {
    console.log(city);

    var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + 
        city + 
        "&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092"; // api key
    if (userInput === "") {
        alert("something went wrong!")
    } else {
        fetch(OpenWeatherUrl).then(function(response) {
            return response.json();
        }).then(function(response) {
            console.log(response); // use to display city name on page
            document.getElementById("city-header").textContent = response.city.name;

            if (response) {
                return fetch("https://api.openweathermap.org/data/2.5/onecall?" + 
                    "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + 
                    "&exclude=minutely,hourly&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092");
            }
        }).then(function(secondResponse) {
            return secondResponse.json();
        }).then(function(secondResponse) {
            console.log(secondResponse); // find UV Index
            // console.log(new Date()); // current date
            // console.log(secondResponse.current.weather[0].icon); // use to pull up icon
            // console.log(secondResponse.current.temp) // current temp
            // console.log(secondResponse.current.feels_like); // feels like temp
            // console.log(secondResponse.current.humidity); // humidity
            // console.log(secondResponse.current.wind_speed); // wind speed
            // console.log(secondResponse.current.wind_deg); // wind chill

            
            document.getElementById("date-span").innerHTML = new Date();
            document.getElementById("current-temp").innerHTML = secondResponse.current.temp;
            document.getElementById("feels-like").innerHTML = secondResponse.current.feels_like;
            document.getElementById("current-humidity").innerHTML = secondResponse.current.humidity;
            document.getElementById("uv-index").innerHTML = secondResponse.current.uvi;
            document.getElementById("wind-speed").innerHTML = secondResponse.current.wind_speed;
            document.getElementById("wind-chill").innerHTML = secondResponse.current.wind_deg;
        });
    }
    
};

function displayCurrent(secondResponse) {
    var currentWeatherEl = document.getElementById("current-weather-container");
    currentWeatherEl.innerHTML = "";
};

function displayFiveDay(secondResponse) {
    var fiveDayEl = document.getElementById("five-day-container");
    fiveDayEl.innerHTML = "";
};

// displayCurrent();
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