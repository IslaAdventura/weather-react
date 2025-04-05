import React from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your weather!</h1>
        <Weather city="Destin" />
      </header>
    </div>
  );
}

export default App;
