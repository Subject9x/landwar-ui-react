
import React from "react";

//import logo from './logo.svg';
import HomePage from "./pages/landing/homepage.js"
import RulebooksPage from "./pages/landing/RulebooksPage.js";

import './App.css';

import './css/base_responsive.css'
import './css/styles.css'

require ('furtive/css/furtive.min.css')

function App() {
  return (
    <div id="mainView">
      {/*<header className="App-header">
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
      </header>*/}
      {/* <HomePage /> */}
        <RulebooksPage />
    </div>
  );
}

export default App;
