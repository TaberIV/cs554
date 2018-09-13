import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Navigation />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
