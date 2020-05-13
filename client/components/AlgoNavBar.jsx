import React, { Component, useState, useEffect } from "react";

const AlgoNavBar = (props) => {
  let problemArray;
  console.log("Has the race started?", props.isRaceStarted);
  // If the race has NOT started (passed from MainContainer)
  if (props.isRaceStarted === false) {
    // User has access to choose category
    problemArray = props.problems.map((problem, i) => (
      <li
        key={`problem${i}`}
        id={`problem${i}`}
        onClick={() => props.handleClick(problem)}
      >
        {" "}
        {problem}{" "}
      </li>
    ));
  } else {
    // If the race started, they can't change problem
    problemArray = props.problems.map((problem, i) => (
      <li className="disabled" key={`problem${i}`} id={`problem${i}`}>
        {" "}
        {problem}{" "}
      </li>
    ));
  }

  return (
    <div className="navBarContainer">
      <div className="navBar">
        <ul id="problems">{problemArray}</ul>
      </div>
    </div>
  );
};

export default AlgoNavBar;
