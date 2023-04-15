// https://openweathermap.org/forecast5
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a1047546fe81633c2e3518e52e559420}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={a1047546fe81633c2e3518e52e559420}
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// api-key = a1047546fe81633c2e3518e52e559420

// Store the API key and URL
const apiKey = "66ac126bfb2288118482057eda0846d6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Fetch weather data for a city
// JavaScript code for Weather Dashboard

// Wait for DOM to be ready
$(document).ready(function () {
  // Event listener for form submission
  var cities = JSON.parse(localStorage.getItem("cities")) || [];

  // Render city buttons on page load
  renderCityButtons();

  // Event listener for form submission
  $("form").on("submit", function (event) {
    event.preventDefault();

    // Get city name input
    var city = $("#exampleDataList").val().trim();

    // Call function to get weather data for the city
    getWeather(city);

    // Add city to cities array and save to local storage
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));

    // Render city buttons
    renderCityButtons();

    // Clear input field
    $("#city-input").val("");
  });

  // Event delegation for city buttons

  $("#city-buttons").on("click", ".city-btn", function () {
    // Get city name from button text
    var city = $(this).text();

    // Call function to get weather data for the city
    getWeather(city);
  });

  // Function to render city buttons
  function renderCityButtons() {
    // Clear previous city buttons
    $("#citybtns").empty();

    // Loop through cities array and create buttons
    for (var i = 0; i < cities.length; i++) {
      var cityBtn = $("<button>")
        .addClass("btn btn-primary city-btn")
        .text(cities[i]);
      var li = $("<li>").append(cityBtn);
      $("#citybtns").append(li);
    }
  }
  // Event delegation for city buttons
  $("#citybtns").on("click", ".city-btn", function (event) {
    event.preventDefault();
    // Get city name from button text
    var city = $(this).text();

    // Set the city name input value
    $("#exampleDataList").val(city);

    // Trigger form submission
    $("form").submit;
  });

  // Function to get weather data for a city
  function getWeather(city) {
    // API key for OpenWeatherMap API
    var apiKey = "66ac126bfb2288118482057eda0846d6";

    var currentday = dayjs().format("YYYY/MM/DD");

    // Construct URL for current weather data API
    var currentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey;

    // Call current weather API

    fetch(currentWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(function (response) {
        // Update city name, current temperature, wind speed, and humidity in the DOM
        $("#cityname").text(response.name + " (" + currentday + ")");
        var currentWeather = response.weather[0].icon;
        var weatherIcon = `https://openweathermap.org/img/wn/${currentWeather}@2x.png`;
        $("#currentweather").text("");
        $("#currentweather").append($("<img>").attr("src", weatherIcon));
        $("#currenttemp").text(
          "Temperature: " +
            Math.round(((response.main.temp - 273.15) * 9) / 5 + 32) +
            "°F"
        );
        $("#currentwind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#currenthumidity").text("Humidity: " + response.main.humidity + "%");

        // Call function to get 5-day forecast data
        getForecast(city);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Function to get 5-day forecast data for a city
  function getForecast(city) {
    // API key for OpenWeatherMap API
    var apiKey = "66ac126bfb2288118482057eda0846d6";

    // Construct URL for 5-day forecast data API
    var forecastUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey;

    // Call 5-day forecast API
    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        // Clear previous forecast data from cards
        console.log(data);
        $(".card-title").empty();
        $(".weather").empty();
        $(".temp").empty();
        $(".wind").empty();
        $(".humidity").empty();

        // Loop through forecast data and update forecast cards in the DOM
        for (var i = 0; i < data.list.length; i += 8) {
          // Get forecast data for a specific day
          var forecastData = data.list[i];
          var date = forecastData.dt_txt.split(" ")[0];
          var weather = forecastData.weather[0].icon;
          var weatherIcon = `https://openweathermap.org/img/wn/${weather}@2x.png `;
          var temp =
            Math.round(((forecastData.main.temp - 273.15) * 9) / 5 + 32) + "°F";
          var wind = forecastData.wind.speed + " MPH";
          var humidity = forecastData.main.humidity + "%";

          // Update forecast card in the DOM based on the day
          $("#day" + (i / 8 + 1) + " .card-title").text(date);
          $("#day" + (i / 8 + 1) + " .weather").text(""); // Clear existing weather text
          $("#day" + (i / 8 + 1) + " .weather").append(
            $("<img>").attr("src", weatherIcon)
          );
          $("#day" + (i / 8 + 1) + " .temp").text("Temperature: " + temp);
          $("#day" + (i / 8 + 1) + " .wind").text("Wind: " + wind);
          $("#day" + (i / 8 + 1) + " .humidity").text("Humidity: " + humidity);
        }
      })

      .catch(function (error) {
        console.error("Error fetching forecast data:", error);
      });
  }
});
