import React, { useState } from "react";
import axios from "axios";
//import PacmanLoader from "react-spinners/PacmanLoader";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  function displayWeather(response) {
    setLoaded(true);
    setError(false);
    console.log(response.data);
    setWeather({
      temperature: (response.data.main.temp * 9) / 5 + 32,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
      city: response.data.main.name,
    });
  }

  function handleError(error) {
    console.error("API Error:", error);
    setError(true);
    setLoaded(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim().length === 0) {
      return;
    }
    let units = "metric";
    let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
    axios.get(apiUrl).then(displayWeather).catch(handleError);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="🧭   Enter a city   🧭"
        onChange={updateCity}
        value={city}
      />
      <button type="submit">Search</button>
    </form>
  );

  if (error) {
    return (
      <div>
        {form}
        <p>
          Sorry, we couldn't find weather data for that location. Please try
          another city.
        </p>
      </div>
    );
  } else if (loaded) {
    return (
      <div>
        {form}
        <h2>{weather.city}</h2>

        <ul>
          <li>Temperature: {Math.round(weather.temperature)}℉</li>
          <br />
          <li>Description: {weather.description}</li>
          <br />
          <li>Humidity: {weather.humidity}%</li>
          <br />
          <li>Wind: {Math.round(weather.wind)} mph</li>
          <br />
          {weather.icon && (
            <li>
              <img src={weather.icon} alt={weather.description} />
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
