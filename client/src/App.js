import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from './components/BubblePage';
import Nav from './components/Nav'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav className='center-nav'/>
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/bubble-page' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;