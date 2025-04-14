import React, { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import WeatherDailyForecast from "./WeatherDailyForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function displayWeather(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description,
      city: response.data.name,
      country: response.data.sys.country,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      windDeg: response.data.wind.deg,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
      highTemp: response.data.main.temp_max,
      lowTemp: response.data.main.temp_min,
    });
  }

  function search() {
    const apiKey = "1d038ee28ef2727a9f0310860ac10ae9"; //"57821c3b75b60c68ecd1a8d0dd1aa8d3";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="🧭       Enter a city       🧭"
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <button type="submit" className="button">
                Search
              </button>
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherDailyForecast />
      </div>
    );
  } else {
    search();
    return (
      <PacmanLoader
        className="loader"
        color={"#904F6C"}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
}
