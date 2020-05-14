import MainContainer from './MainContainer.jsx';
import AlgoContainer from './algoContainer.jsx';
import React, { Component, useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';

const Choice = () => {
  const socket = io('http://localhost:3000');

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route path="/maincontainer">
            <MainContainer />
          </Route>
          <Route path="/algocontainer">
            <AlgoContainer />
          </Route>
          <Route>404 mother fuck.</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Choice;
