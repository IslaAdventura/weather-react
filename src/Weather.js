import React, { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function displayWeather(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      city: response.data.name,
      date: response.data.dt,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="🧭       Enter a city       🧭"
                className="form-control"
                autoFocus="on"
              />
            </div>
            <div className="col-3">
              <button type="submit" className="button">
                Search
              </button>
            </div>
          </div>
        </form>
        <h1>{weatherData.city}</h1>
        <ul>
          <li>{weatherData.date}******Wednesday</li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <div className="clearfix">
              <img
                src={weatherData.iconUrl}
                alt={weatherData.description}
                className="float-left"
              />

              <span className="temperature-number">
                {Math.round(weatherData.temperature)}
              </span>
              <span className="unit">℉</span>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Precipitation: ****15%****</li>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {Math.round(weatherData.wind)} mph ****NW****</li>
              <br />
              <li>Sunrise: ****{weatherData.sunrise}8:00**** am</li>
              <li>Sunset: ****{weatherData.sunset}**** pm</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);

    return (
      <PacmanLoader
        color={"#904F6C"}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="pacmanLoader"
      />
    );
  }
}
