// CHECKLIST:
// style using grid system

// city typed into input is added to search history section
// search function to gather weather information for city selected
    // (city name, date, icon representing weather conditions, temp, humidity, wind speed, UV index)
// style UV index with color based on favorable, moderate or severe conditions
// 5-day forecast displays date, weather icon, temp, humidity
// cities in search history act as buttons to gather information

var searchButtonEl = document.getElementById("search-btn");

function findCity(event) {
    event.preventDefault();
    var userInput = document.getElementById("user-input").value;
    var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/find?q=" + 
        userInput + 
        "&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092"; // api key

    fetch(OpenWeatherUrl).then(function(response) {
        return response.json();
    }).then(function(response) {
        // console.log(response.list[0].main.temp_max);
        // console.log(response.list[0].main.temp_min);
        // console.log(response.list[0].main.feels_like);
        console.log(response);
    });
    
};

searchButtonEl.addEventListener("click", findCity);