import React, { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function displayWeather(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      windDeg: response.data.wind.deg,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
    });
  }

  function formatTime(date) {
    let hours = date.getHours() % 12 || 12;
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let amPm = date.getHours() < 12 ? "am" : "pm";
    return `${hours}:${minutes} ${amPm}`;
  }

  function getWindDirection(degrees) {
    let directions = [
      { min: 348.75, max: 360, cardinal: "N" },
      { min: 0, max: 11.25, cardinal: "N" },
      { min: 11.25, max: 33.75, cardinal: "NNE" },
      { min: 33.75, max: 56.25, cardinal: "NE" },
      { min: 56.25, max: 78.75, cardinal: "ENE" },
      { min: 78.75, max: 101.25, cardinal: "E" },
      { min: 101.25, max: 123.75, cardinal: "ESE" },
      { min: 123.75, max: 146.25, cardinal: "SE" },
      { min: 146.25, max: 168.75, cardinal: "SSE" },
      { min: 168.75, max: 191.25, cardinal: "S" },
      { min: 191.25, max: 213.75, cardinal: "SSW" },
      { min: 213.75, max: 236.25, cardinal: "SW" },
      { min: 236.25, max: 258.75, cardinal: "WSW" },
      { min: 258.75, max: 281.25, cardinal: "W" },
      { min: 281.25, max: 303.75, cardinal: "WNW" },
      { min: 303.75, max: 326.25, cardinal: "NW" },
      { min: 326.25, max: 348.75, cardinal: "NNW" },
    ];

    for (let direction of directions) {
      if (degrees >= direction.min && degrees < direction.max) {
        return direction.cardinal;
      }
    }

    return "N";
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
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
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
              <li>
                Wind: {Math.round(weatherData.wind)} mph{" "}
                {getWindDirection(weatherData.windDeg)}
              </li>
              <br />
              <li>Sunrise: {formatTime(weatherData.sunrise)}</li>
              <li>Sunset: {formatTime(weatherData.sunset)}</li>
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
