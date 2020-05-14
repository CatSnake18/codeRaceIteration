import React, { Component, useState, useEffect } from 'react';

const AlgoSnippet = (props) => {
  return (
    <div className="snippetContainer">
      <div id="algo">
        <p>{props.content.problem}</p>
      </div>
    </div>
  );
};

export default AlgoSnippet;
