import React, { Component, useState, useEffect } from "react";

const AlgoSnippet = (props) => {
  if (Object.keys(props.content).length === 0) {
    return (
      <div className="algoContainer">
        <div id="algo">
          <p className="crtSpecial" id="noText">
            Please select a problem...
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="snippetContainer">
        <div id="algo">{/* <p>{ props.content.problem }</p> */}</div>
      </div>
    );
  }
};

export default AlgoSnippet;
