import React from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Weather(props) {
  function handleResponse(response) {
    alert(
      `The weather in ${response.data.name} is ${Math.round(
        response.data.main.temp
      )}℃`
    );
  }

  let units = "metric";
  let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(handleResponse);

  return (
    <PacmanLoader
      color={"#904F6C"}
      size={35}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
