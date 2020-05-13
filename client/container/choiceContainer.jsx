import MainContainer from "./MainContainer.jsx";
import AlgoContainer from "./algoContainer.jsx";
import React, { Component, useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Choice = () => {
  return (
    <div>
      <Router>
        <div className="choice">
          <div className="loadscreen">
            <h1 className="crtSpecial welcome">Choose between ....</h1>
            <Link to="/algocontainer">
              <button className="crtSpecial algo">ALGORITHM</button>
            </Link>
            <Link to="/maincontainer">
              <button className="crtSpecial code">CODE</button>
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/maincontainer">
            <MainContainer />
          </Route>
          <Route path="/algocontainer">
            <p>123</p>
            <AlgoContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Choice;
