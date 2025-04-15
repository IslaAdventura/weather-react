import React, { useState, useEffect } from "react";
import "./WeatherDailyForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherDailyForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);

    if (props.coordinates) {
      const latitude = props.coordinates.latitude || props.coordinates.lat;
      const longitude = props.coordinates.longitude || props.coordinates.lon;

      if (latitude && longitude) {
        const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=dbbf0b0ffte4fa30oaa8d9a8aa2bc032&units=imperial`;

        axios.get(apiUrl).then((response) => {
          if (response.data && response.data.daily) {
            setForecast(response.data.daily);
            setLoaded(true);
          }
        });
      }
    }
  }, [props.coordinates]);

  if (!loaded || !forecast) {
    return <div className="WeatherForecast-loading">Loading forecast...</div>;
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
}
