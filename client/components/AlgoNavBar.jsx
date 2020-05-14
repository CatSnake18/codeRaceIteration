import React, { Component, useState, useEffect } from 'react';

const AlgoNavBar = (props) => {
  let problemArray;
  // If the race has NOT started (passed from MainContainer)
  // if (props.isRaceStarted === false) {
  // User has access to choose category
  problemArray = props.problems.map((problem, i) => (
    <li
      key={`problem${i}`}
      id={`problem${i}`}
      onClick={() => props.handleClick(problem)}
    >
      {' '}
      {problem.name}{' '}
    </li>
  ));

  return (
    <div className="navBarContainer">
      <div className="navBar">
        <ul id="problems">{problemArray}</ul>
      </div>
    </div>
  );
};

export default AlgoNavBar;
