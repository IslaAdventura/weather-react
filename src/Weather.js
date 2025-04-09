import React from "react";
//import axios from "axios";
//import PacmanLoader from "react-spinners/PacmanLoader";
import "./Weather.css";

export default function Weather() {
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
      <h1>Sarasota, Florida</h1>
      <ul>
        <li>Wednesday 7:00 pm</li>
        <li>Mostly cloudy</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6>">
          <div className="clearfix">
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
              alt="Mostly cloudy"
              className="float-left"
            />
            <div className="float-left">
              <span className="temperature-number">69</span>
              <span className="unit">℉</span>
            </div>
          </div>
        </div>
        <div className="col-6>">
          <ul>
            <li>Precipitation: 15%</li>
            <li>Humidity: 85%</li>
            <li>Wind: 15mph NW</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
