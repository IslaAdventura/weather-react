import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
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
      <h1>{props.data.city}</h1>
      <ul>
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>

      <div className="row mt-3">
        <div className="col-6">
          <div className="clearfix">
            <div className="float-left">
              <WeatherIcon code={props.data.icon} />
            </div>

            <div className="float-left">
              <WeatherTemperature fahrenheit={props.data.temperature} />
            </div>
          </div>
        </div>

        <div className="col-6">
          <ul>
            <li>Precipitation: ****15%****</li>
            <li>Humidity: {props.data.humidity}%</li>
            <li>
              Wind: {Math.round(props.data.wind)} mph{" "}
              {getWindDirection(props.data.windDeg)}
            </li>
            <br />
            <li>Sunrise: {formatTime(props.data.sunrise)}</li>
            <li>Sunset: {formatTime(props.data.sunset)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
