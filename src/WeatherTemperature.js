import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("fahrenheit");
  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  if (unit === "fahrenheit") {
    return (
      <div className="temperature-number">
        <span className="temperature">{Math.round(props.fahrenheit)}</span>
        <span className="unit">
          ℉{" "}
          <a href="/" onClick={showCelsius}>
            ℃
          </a>
        </span>
      </div>
    );
  } else {
    let celsius = ((props.fahrenheit - 32) * 5) / 9;

    return (
      <div className="temperature-number">
        <span className="temperature">{Math.round(celsius)}</span>
        <span className="unit">
          <a href="/" onClick={showFahrenheit}>
            ℉
          </a>
          ℃
        </span>
      </div>
    );
  }
}
