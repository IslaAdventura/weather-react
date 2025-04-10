import React from "react";
import Weather from "./Weather";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <Weather defaultCity="Sarasota" />
        </header>
        <footer>
          <span className="emoji">✨</span>This project was coded by
          <a
            href="https://www.linkedin.com/in/stephanie-anderson-rn-bsn-4658b336/"
            target="_blank"
            rel="noreferrer"
          >
            {""} Stephanie Anderson
          </a>
          , is open source on
          <a
            href="https://github.com/IslaAdventura/weather-react"
            target="_blank"
            rel="noreferrer"
          >
            {""} GitHub
          </a>
          , and hosted on
          <a
            href="https://resplendent-caramel-d48712.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            {""} Netlify <span className="emoji">✨</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
export default App;
