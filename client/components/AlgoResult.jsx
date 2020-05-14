import React, { useState, useEffect } from 'react';

const AlgoResults = (props) => {
  // Empty at first
  let resultsDiv = <div></div>;

  // Text is set to empty string if no category is selected
  let expectedOutcome = '';
  // If this prop exists(activated when a category is selected by passing a prop down), show the function of the snippet
  if (props.content.expected) {
    expectedOutcome = 'The expected outcome is:';
  }

  return (
    <div className="resultsContainer">
      {resultsDiv}
      <div id="expected">
        {expectedOutcome}
        <p id="outcome">{props.content.expected}</p>
      </div>
    </div>
  );
};

export default AlgoResults;
