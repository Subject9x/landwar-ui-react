
import React from "react";

//import logo from './logo.svg';
import HomePage from "./pages/landing/homepage.js"
import RulebooksPage from "./pages/landing/RulebooksPage.js";
import UnitEditor from "./pages/units/UnitEditor.js";

import './App.css';

//import './css/base_responsive.css'
import './css/styles.css'

import 'foundation-sites/dist/css/foundation.min.css';

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
        <UnitEditor />
    </div>
  );
}

export default App;
