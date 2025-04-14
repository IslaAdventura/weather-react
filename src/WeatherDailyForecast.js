import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherDailyForecast.css";

export default function WeatherDailyForecast() {
  return (
    <div className="WeatherDailyForecast">
      <div className="row">
        <div className="col">
          <div className="ForecastDay">Thu</div>
          <WeatherIcon code="01d" size={36} />
          <div className="ForecastTemp">
            <span className="ForecastTempMax">85°</span>
            <span className="ForecastTempMin"> | 65°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
