
import React from "react";

//import logo from './logo.svg'

import './App.css';
import './css/styles.css'
import '../node_modules/furtive/css/furtive.min.css';
import SiteRouter from "./components/SiteRouter.js";

function App() {
  return (
    <div id="mainView">
      <SiteRouter />
    </div>
  );
}

export default App;
