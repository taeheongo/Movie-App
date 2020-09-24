import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <iframe
          id="ytplayer"
          type="text/html"
          style={{}}
          src="https://www.youtube.com/embed/JuNz4Zpuqys"
          frameborder="0"
          allowFullScreen="1"
        ></iframe>
      </header>
    </div>
  );
}

export default App;
