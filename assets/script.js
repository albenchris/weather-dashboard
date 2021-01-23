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
    var OpenWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + 
        userInput + 
        "&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092"; // api key
    if (userInput === "") {
        alert("something went wrong!")
    } else {
        fetch(OpenWeatherUrl).then(function(response) {
            return response.json();
        }).then(function(response) {
            console.log(response); // use to display city name on page

            if (response) {
                return fetch("https://api.openweathermap.org/data/2.5/onecall?" + 
                    "lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + 
                    "&exclude=minutely,hourly&units=imperial&appid=90a1a6aec56ae63b28d2c0abbe206092");
            }
        }).then(function(secondResponse) {
            return secondResponse.json();
        }).then(function(secondResponse) {
            // console.log(secondResponse);
            console.log(new Date()); // current date
            console.log(secondResponse.current.weather[0].icon); // use to pull up icon
            console.log(secondResponse.current.temp) // current temp
            console.log(secondResponse.current.feels_like); // feels like temp
            console.log(secondResponse.current.humidity); // humidity
            console.log(secondResponse.current.wind_speed); // wind speed
            console.log(secondResponse.current.wind_deg); // wind chill
        });
    }
    
};

searchButtonEl.addEventListener("click", findCity);