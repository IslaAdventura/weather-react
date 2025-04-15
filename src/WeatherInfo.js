import React, { useState, useEffect } from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";
import MoonPhase from "./MoonPhase";
import axios from "axios";

export default function WeatherInfo(props) {
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);

  useEffect(() => {
    function getHighLow() {
      try {
        let latitude = props.data.coordinates.lat;
        let longitude = props.data.coordinates.lon;
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=dbbf0b0ffte4fa30oaa8d9a8aa2bc032&units=imperial`;

        axios.get(apiUrl).then(function (response) {
          if (
            response.data &&
            response.data.daily &&
            response.data.daily[0] &&
            response.data.daily[0].temperature
          ) {
            setHigh(Math.round(response.data.daily[0].temperature.maximum));
            setLow(Math.round(response.data.daily[0].temperature.minimum));
          }
        });
      } catch (error) {
        console.error("Error fetching high/low temperatures:", error);
      }
    }

    if (props.data && props.data.coordinates) {
      getHighLow();
    }
  }, [props.data]);

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

  return (
    <div className="WeatherInfo">
      <h2>
        <FormattedDate date={props.data.date} />
      </h2>
      <h1>
        {props.data.city}, {props.data.country}
      </h1>

      <div className="row">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <div className="me-2 mb-3">
              <WeatherIcon code={props.data.icon} size={50} />
            </div>
            <WeatherTemperature fahrenheit={props.data.temperature} />
          </div>

          <div className="WeatherForecast-temperatures">
            {high !== null && low !== null && (
              <div>
                <span className="WeatherForecast-temperature-label">HIGH:</span>{" "}
                <span className="WeatherForecast-temperature-max">{high}°</span>{" "}
                |{" "}
                <span className="WeatherForecast-temperature-label">LOW:</span>
                <span className="WeatherForecast-temperature-min ms-1">
                  {low}°
                </span>{" "}
              </div>
            )}
          </div>
        </div>

        <div className="col-6">
          <ul>
            <li className="text-capitalize">
              <strong>~ {props.data.description} ~</strong>
            </li>

            <li>
              <strong>Humidity</strong>: {props.data.humidity}%
            </li>
            <li>
              <strong>Wind</strong>: {Math.round(props.data.wind)} mph{" "}
              {getWindDirection(props.data.windDeg)}
            </li>

            <li>
              <strong>🐓 Sunrise</strong>: {formatTime(props.data.sunrise)}
            </li>
            <li>
              <strong>🦇 Sunset</strong>: {formatTime(props.data.sunset)}
            </li>
            <li className="WeatherInfo-moon">
              <MoonPhase date={props.data.date} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
