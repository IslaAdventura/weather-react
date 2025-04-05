import React from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span className="emoji">✨</span> Welcome to your Weather{" "}
          <span className="emoji">✨</span>
        </h1>

        <Weather />
      </header>
      <footer>
        This project was coded by
        <a
          href="https://www.linkedin.com/in/stephanie-anderson-rn-bsn-4658b336/"
          target="_blank"
          rel="noreferrer"
        >
          {""} Stephanie Anderson
        </a>
        , is open sourced on
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
          {""} Netlify
        </a>
      </footer>
    </div>
  );
}
export default App;
